// node test/run.mjs : everything that can be checked without Cloudflare. No network except one read of the live sheet (skipped if
// offline). Web Push is delivered to a mock push service on 127.0.0.1 that checks the VAPID signature and decrypts each message with
// node:crypto (an implementation independent of src/webpush.js); Telegram goes to a mock Bot API on 127.0.0.1.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import nodeCrypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { kvStub } from './kvstub.js';
import { setCells, addColumn } from './csvtool.js';
import { encrypt, vapidAuth, b64u } from '../src/webpush.js';
import { parseSeason2, parseCsv, SheetFormatError } from '../src/sheet.js';
import { runWatcher, releaseHeld, fetchSheet, STATE_KEY } from '../src/watcher.js';
import { makeStore } from '../src/store.js';
import { route } from '../src/api.js';
import { BANNED, one } from '../src/format.js';
import { SW_JS } from '../src/static.js';

const HERE = path.dirname(fileURLToPath(import.meta.url)), EZ = path.resolve(HERE, '../../..');
const BEFORE = fs.readFileSync(path.join(HERE, 'fixture-before.csv'), 'utf8'), AFTER = fs.readFileSync(path.join(HERE, 'fixture-after.csv'), 'utf8');
const results = [], allMessages = [];
const test = async (name, fn) => { try { await fn(); results.push(['PASS', name]) } catch (e) { results.push(['FAIL', name, e]) } };
const skip = (name, why) => results.push(['SKIP', name + ' (' + why + ')']);
const watch = (env, text, extra = {}) => runWatcher(env, { fetchText: async () => text, ...extra });
const seeded = async (text = BEFORE, env = {}) => { const kv = kvStub(); const e = { EZ_ALERTS: kv, ...env }; await watch(e, text); return e };
const twice = async (env, text, extra) => { await watch(env, text, extra); return watch(env, text, extra) }; // settle: second read alerts
const collect = r => { for (const d of r.deliveries || []) allMessages.push(d.msg) };

// calls.csv: the calls log, transcribed from the owner's screenshots; side, size and (from build.py MOVES) the P&L of every call
const LOG = (() => { const rows = parseCsv(fs.readFileSync(path.join(EZ, 'data/s2-calls/calls.csv'), 'utf8')), H = rows[0];
  return rows.slice(1).map(r => Object.fromEntries(H.map((h, i) => [h, r[i]]))) })();
const CLAUDE_MD_TOTALS = { GROK: 17660, CLAUDE: 3520, GEMINI: -7920, QWEN: -17660, GPT: -22060 }; // CLAUDE.md, the 20 Nov close

// ---------- independent Web Push receiver (node:crypto) ----------
function decryptAes128gcm(body, uaEcdh, auth) {
  const salt = body.subarray(0, 16), rs = body.readUInt32BE(16), idlen = body[20], asPublic = body.subarray(21, 21 + idlen), ct = body.subarray(21 + idlen);
  assert.equal(rs, 4096); assert.equal(idlen, 65);
  const ecdh = uaEcdh.computeSecret(asPublic);
  const ikm = Buffer.from(nodeCrypto.hkdfSync('sha256', ecdh, auth, Buffer.concat([Buffer.from('WebPush: info\0'), uaEcdh.getPublicKey(), asPublic]), 32));
  const cek = Buffer.from(nodeCrypto.hkdfSync('sha256', ikm, salt, Buffer.from('Content-Encoding: aes128gcm\0'), 16));
  const nonce = Buffer.from(nodeCrypto.hkdfSync('sha256', ikm, salt, Buffer.from('Content-Encoding: nonce\0'), 12));
  const d = nodeCrypto.createDecipheriv('aes-128-gcm', cek, nonce); d.setAuthTag(ct.subarray(ct.length - 16));
  const pt = Buffer.concat([d.update(ct.subarray(0, ct.length - 16)), d.final()]);
  let end = pt.length - 1; while (end >= 0 && pt[end] === 0) end--; assert.equal(pt[end], 2, 'last-record delimiter'); return pt.subarray(0, end).toString();
}
function verifyVapid(header, expectAud) {
  const m = /^vapid t=([^,]+), k=(\S+)$/.exec(header || ''); assert.ok(m, 'Authorization: vapid t=..., k=...');
  const [h, c, s] = m[1].split('.'), pub = Buffer.from(b64u.dec(m[2]));
  const key = nodeCrypto.createPublicKey({ key: { kty: 'EC', crv: 'P-256', x: b64u.enc(pub.subarray(1, 33)), y: b64u.enc(pub.subarray(33)) }, format: 'jwk' });
  assert.ok(nodeCrypto.verify('sha256', Buffer.from(h + '.' + c), { key, dsaEncoding: 'ieee-p1363' }, Buffer.from(b64u.dec(s))), 'ES256 signature');
  const claims = JSON.parse(Buffer.from(b64u.dec(c)).toString()), now = Date.now() / 1000;
  assert.equal(claims.aud, expectAud); assert.ok(claims.exp > now && claims.exp <= now + 24 * 3600, 'exp within 24 h'); assert.match(claims.sub, /^(mailto:|https:\/\/)/);
  return m[2];
}
function server(handler) { return new Promise(res => { const s = http.createServer(handler); s.listen(0, '127.0.0.1', () => res({ s, port: s.address().port })) }) }
const readBody = req => new Promise(r => { const c = []; req.on('data', x => c.push(x)); req.on('end', () => r(Buffer.concat(c))) });
function uaSubscription(port, name) { const ecdh = nodeCrypto.createECDH('prime256v1'); ecdh.generateKeys(); const auth = nodeCrypto.randomBytes(16);
  return { ecdh, auth, sub: { endpoint: `http://127.0.0.1:${port}/push/${name}`, keys: { p256dh: b64u.enc(ecdh.getPublicKey()), auth: b64u.enc(auth) } } } }
async function vapidPair() { const kp = await crypto.subtle.generateKey({ name: 'ECDSA', namedCurve: 'P-256' }, true, ['sign']);
  return { VAPID_PUBLIC_KEY: b64u.enc(new Uint8Array(await crypto.subtle.exportKey('raw', kp.publicKey))), VAPID_PRIVATE_KEY: (await crypto.subtle.exportKey('jwk', kp.privateKey)).d, VAPID_SUBJECT: 'https://earningszn.xyz' } }
const req = (p, body, h = {}) => new Request('https://earningszn.xyz' + p, { method: body === undefined ? 'GET' : 'POST', headers: { origin: 'https://earningszn.xyz', 'content-type': 'application/json', ...h }, body: body === undefined ? undefined : typeof body === 'string' ? body : JSON.stringify(body) });

// ================= crypto =================
await test('RFC 8291 Appendix A: encrypt gives the RFC\'s exact bytes', async () => {
  const out = await encrypt('When I grow up, I want to be a watermelon', { p256dh: 'BCVxsr7N_eNgVRqvHtD0zTZsEc6-VV-JvLexhqUzORcxaOzi6-AYWXvTBHm4bjyPjs7Vd8pZGH6SRpkNtoIAiw4', auth: 'BTBZMqHH6r4Tts7J_aSIgg' },
    { salt: 'DGv6ra1nlYgDCS1FRnbzlw', asPrivate: 'yfWPiYE-n46HLnH0KqZOF1fJJU3MYrct3AELtAQ-oRw', asPublic: 'BP4z9KsN6nGRTbVYI_c7VJSPQTBtkgcy27mlmlMoZIIgDll6e3vCYLocInmYWAmS6TlzAC8wEqKK6PBru3jl7A8' });
  assert.equal(b64u.enc(out), 'DGv6ra1nlYgDCS1FRnbzlwAAEABBBP4z9KsN6nGRTbVYI_c7VJSPQTBtkgcy27mlmlMoZIIgDll6e3vCYLocInmYWAmS6TlzAC8wEqKK6PBru3jl7A_yl95bQpu6cVPTpK4Mqgkf1CXztLVBSt2Ks3oZwbuwXPXLWyouBWLVWGNWQexSgSxsj_Qulcy4a-fN');
});
await test('encrypt with fresh keys decrypts in an independent node:crypto receiver', async () => {
  const { ecdh, auth, sub } = uaSubscription(1, 'x'), msg = JSON.stringify({ title: 'Grok posted its Intuit trade', body: 'SHORT \u22122.4%' });
  assert.equal(decryptAes128gcm(Buffer.from(await encrypt(msg, sub.keys)), ecdh, auth), msg);
});
await test('VAPID JWT verifies with node:crypto (ES256, aud = push origin, exp under 24 h)', async () => {
  const v = await vapidPair(), h = await vapidAuth('https://fcm.googleapis.com/fcm/send/abc', { publicKey: v.VAPID_PUBLIC_KEY, privateKey: v.VAPID_PRIVATE_KEY, subject: v.VAPID_SUBJECT });
  assert.equal(verifyVapid(h, 'https://fcm.googleapis.com'), v.VAPID_PUBLIC_KEY);
});
await test('Web Push CPU cost per message (encrypt + new key pair), measured', async () => {
  const { sub } = uaSubscription(1, 'x'); const N = 200, t0 = process.cpuUsage();
  for (let i = 0; i < N; i++) await encrypt('{"title":"Grok posted its Intuit trade","body":"SHORT \u22122.4%"}', sub.keys);
  const u = process.cpuUsage(t0); results.push(['INFO', `encrypt: ${((u.user + u.system) / 1000 / N).toFixed(2)} ms CPU per message in Node ${process.version}`]);
});

// ================= the sheet =================
await test('fixture-before parses: 3 trades, 15 calls, none graded; quoted multi-line cell survives; "Gemin MAG (%)" read', async () => {
  const { trades } = parseSeason2(BEFORE);
  assert.equal(trades.length, 3); assert.equal(trades.reduce((n, t) => n + Object.keys(t.calls).length, 0), 15); assert.ok(trades.every(t => t.move == null));
  assert.deepEqual(trades.find(t => t.ticker === 'KEYS').calls.GEMINI, { side: 'SHORT', size: 6, conf: null });
});
await test('every parsed call equals the calls log (ez/data/s2-calls/calls.csv): side and size, all 15', async () => {
  const { trades } = parseSeason2(AFTER);
  for (const L of LOG) { const t = trades.find(t => t.ticker === L.ticker), c = t.calls[L.model.toUpperCase()];
    assert.equal(c.side, L.side, `${L.ticker} ${L.model}`); assert.equal(c.size, +L.size_pct, `${L.ticker} ${L.model} size`) }
  assert.equal(LOG.length, 15);
});
await test('not the sheet: HTML sign-in page, renamed column -> SheetFormatError', async () => {
  assert.throws(() => parseSeason2('<!doctype html><title>Sign in</title>'), SheetFormatError);
  assert.throws(() => parseSeason2(BEFORE.replace('GROK DIR', 'GROK SIDE')), SheetFormatError);
});

// ================= the watcher =================
let liveText = null;
try { liveText = await fetchSheet({}) } catch (e) { skip('live sheet', 'offline: ' + e.message) }
if (liveText) await test('live sheet: first run seeds silently, second run alerts nothing and writes nothing to KV', async () => {
  const kv = kvStub(), env = { EZ_ALERTS: kv };
  const r1 = await watch(env, liveText); assert.ok(r1.seeded); assert.equal(r1.events.length, 0);
  kv.reset(); const r2 = await watch(env, liveText); assert.equal(r2.events.length, 0); assert.equal(kv.ops.put, 0);
  results.push(['INFO', `live sheet: ${r1.counts.trades} Season 2 trades, ${r1.counts.calls} calls, ${r1.counts.graded} graded`]);
});

let AFTER_EVENTS;
await test('fixture: seed (before), then after: 1st read settles (0 alerts), 2nd read alerts 16, 3rd read 0 and no KV write', async () => {
  const env = await seeded();
  const r1 = await watch(env, AFTER); assert.equal(r1.events.length, 0); assert.equal(Object.keys(JSON.parse(await env.EZ_ALERTS.get(STATE_KEY)).pending).length, 16);
  const r2 = await watch(env, AFTER); AFTER_EVENTS = r2.events;
  assert.equal(r2.events.filter(e => e.type === 'CALL_IN').length, 1); assert.equal(r2.events.filter(e => e.type === 'GRADED').length, 15);
  env.EZ_ALERTS.reset(); const r3 = await watch(env, AFTER); assert.equal(r3.events.length, 0); assert.equal(env.EZ_ALERTS.ops.put, 0);
});
await test('GRADED P&L = $100,000 x direction x move: each equals calls.csv pnl_usd; totals equal CLAUDE.md (Grok +17,660 ... GPT -22,060)', async () => {
  for (const L of LOG) { const e = AFTER_EVENTS.find(e => e.type === 'GRADED' && e.ticker === L.ticker && e.ai === L.model.toUpperCase());
    assert.equal(e.pnl, +L.pnl_usd, `${L.ticker} ${L.model}`); assert.equal(e.right, L.right === 'yes') }
  const tot = {}; for (const e of AFTER_EVENTS.filter(e => e.type === 'GRADED')) tot[e.ai] = (tot[e.ai] || 0) + e.pnl;
  assert.deepEqual(tot, CLAUDE_MD_TOTALS);
});
await test('CALL_IN: R116 HP (HPQ) Grok SHORT 3.1, no confidence (not in the sheet)', async () => {
  const e = AFTER_EVENTS.find(e => e.type === 'CALL_IN');
  assert.deepEqual([e.round, e.ticker, e.company, e.aiName, e.side, e.size, e.conf], [116, 'HPQ', 'HP', 'Grok', 'SHORT', 3.1, null]);
  assert.equal(one(e).text, 'Grok posted its HP trade\nSHORT \u22123.1%');
});
await test('wording of a single result: "Grok\'s Intuit trade: SHORT, right, P&L +$12,790"', async () => {
  const e = AFTER_EVENTS.find(e => e.type === 'GRADED' && e.ticker === 'INTU' && e.ai === 'GROK');
  assert.equal(one(e).text, "Grok's Intuit trade: SHORT, right, P&L +$12,790\nIntuit \u221212.79%");
  const g = AFTER_EVENTS.find(e => e.type === 'GRADED' && e.ticker === 'ESTC' && e.ai === 'GPT'); assert.equal(one(g).text.split('\n')[0], "GPT's Elastic trade: LONG, wrong, P&L \u2212$2,200");
});
await test('optional confidence column: "GROK CONF (%)" in the sheet -> "· 65% confident"', async () => {
  const fixed = addColumn(AFTER, 'GROK MAG (%)', 'GROK CONF (%)', { 116: '65' });
  const e = (await twice(await seeded(), fixed)).events.find(e => e.type === 'CALL_IN');
  assert.equal(e.conf, 65); assert.equal(one(e).text, 'Grok posted its HP trade\nSHORT \u22123.1% \u00b7 65% confident');
});
await test('edit like the live sheet today (Intuit -12.77, Elastic -2.02 after the alerts): notes only, no alert, records updated', async () => {
  const env = await seeded(); await twice(env, AFTER);
  const edited = setCells(AFTER, [[113, 'ACTUAL MOVE (%)', '-12.77'], [115, 'ACTUAL MOVE (%)', '-2.02']]);
  const r = await twice(env, edited);
  assert.equal(r.events.length, 0); assert.equal(r.notes.filter(n => n.type === 'GRADE_EDITED').length, 10);
  const st = JSON.parse(await env.EZ_ALERTS.get(STATE_KEY)); assert.equal(st.sent['GRADED:INTU:GROK'][0].pnl, 12770); assert.equal(st.sent['GRADED:ESTC:QWEN'][0].pnl, 2020);
  assert.equal((await watch(env, edited)).notes.length, 0);
});
await test('a move edit that flips right and wrong (Keysight to +0.5): 5 corrections, once', async () => {
  const env = await seeded(); await twice(env, AFTER);
  const flipped = setCells(AFTER, [[114, 'ACTUAL MOVE (%)', '0.5']]), r = await twice(env, flipped);
  assert.equal(r.events.length, 5); assert.ok(r.events.every(e => e.type === 'GRADE_EDITED'));
  assert.equal(one(r.events.find(e => e.ai === 'GROK')).text, "Correction: Grok's Keysight trade\nSHORT, wrong, P&L \u2212$500\nKeysight +0.50%");
  assert.equal((await watch(env, flipped)).events.length, 0);
});
await test('an open trade whose side flips (HP Grok DOWN -> UP): one correction', async () => {
  const env = await seeded(); await twice(env, AFTER);
  const r = await twice(env, setCells(AFTER, [[116, 'GROK DIR', 'UP']]));
  assert.equal(r.events.length, 1); assert.equal(one(r.events[0]).text, "Correction: Grok's HP trade\nLONG +3.1% (the sheet had SHORT \u22123.1%)");
});
await test('a call that arrives already graded gets its GRADED alert only (no stale CALL_IN)', async () => {
  const env = await seeded(); await twice(env, AFTER);
  const r = await twice(env, setCells(AFTER, [[117, 'TICKER', 'DELL'], [117, 'CALL DATE (T-1)', '11/24/26'], [117, 'QWEN DIR', 'UP'], [117, 'QWEN MAG (%)', '5'], [117, 'ACTUAL MOVE (%)', '3.25']]));
  assert.deepEqual(r.events.map(e => e.type), ['GRADED']); assert.equal(r.events[0].pnl, 3250);
});
await test('settling absorbs a typo fixed within a poll: UP 3 then DOWN 3 -> one CALL_IN, SHORT', async () => {
  const env = await seeded(); await twice(env, AFTER);
  const row = v => setCells(AFTER, [[118, 'TICKER', 'CRWD'], [118, 'CALL DATE (T-1)', '12/01/26'], [118, 'GPT DIR', v], [118, 'GPT MAG (%)', '3']]);
  assert.equal((await watch(env, row('UP'))).events.length, 0); assert.equal((await watch(env, row('DOWN'))).events.length, 0);
  const r = await watch(env, row('DOWN')); assert.equal(r.events.length, 1); assert.equal(r.events[0].side, 'SHORT');
});
await test('a direction without a size waits (no alert) until the size is typed', async () => {
  const env = await seeded(); await twice(env, AFTER);
  const r = await twice(env, setCells(AFTER, [[118, 'TICKER', 'CRWD'], [118, 'CALL DATE (T-1)', '12/01/26'], [118, 'GPT DIR', 'UP']]));
  assert.equal(r.events.length, 0); assert.equal(r.incomplete.length, 1);
});
await test('same ticker: call date moved 3 days -> no new alert; next quarter (+90 days) -> a new CALL_IN', async () => {
  const env = await seeded(); await twice(env, AFTER);
  assert.equal((await twice(env, setCells(AFTER, [[116, 'CALL DATE (T-1)', '11/27/26']]))).events.length, 0);
  const r = await twice(env, setCells(AFTER, [[116, 'CALL DATE (T-1)', '02/24/27']]));
  assert.deepEqual(r.events.map(e => e.type + ' ' + e.ticker), ['CALL_IN HPQ']);
});
await test('a duplicated row (same ticker, other values) is ignored and noted once: no flapping corrections', async () => {
  const env = await seeded(); await twice(env, AFTER);
  const dup = setCells(AFTER, [[117, 'TICKER', 'HPQ'], [117, 'CALL DATE (T-1)', '11/24/26'], [117, 'GROK DIR', 'UP'], [117, 'GROK MAG (%)', '9']]);
  const rs = []; for (let i = 0; i < 5; i++) rs.push(await watch(env, dup));
  assert.equal(rs.reduce((n, r) => n + r.events.length, 0), 0); assert.deepEqual(rs.flatMap(r => r.notes.map(n => n.type)), ['DUPLICATE_ROW']);
});
await test('the same ticker in two quarters at once (Nov row kept, Feb row added): one CALL_IN for Feb, then quiet', async () => {
  const env = await seeded(); await twice(env, AFTER);
  const feb = setCells(AFTER, [[118, 'TICKER', 'HPQ'], [118, 'CALL DATE (T-1)', '02/24/27'], [118, 'GROK DIR', 'UP'], [118, 'GROK MAG (%)', '2']]);
  const r = await twice(env, feb); assert.deepEqual(r.events.map(e => `${e.type} R${e.round} ${e.side}`), ['CALL_IN R118 LONG']);
  env.EZ_ALERTS.reset(); for (let i = 0; i < 3; i++) assert.equal((await watch(env, feb)).events.length, 0); assert.equal(env.EZ_ALERTS.ops.put, 0);
});
await test('a ticker with no company name: alert uses the ticker, NO_NAME noted once, later polls write nothing', async () => {
  const env = await seeded(); await twice(env, AFTER);
  const zz = setCells(AFTER, [[118, 'TICKER', 'ZZZQ'], [118, 'CALL DATE (T-1)', '12/01/26'], [118, 'GPT DIR', 'UP'], [118, 'GPT MAG (%)', '2']]);
  const r = await twice(env, zz); assert.equal(one(r.events[0]).title, 'GPT posted its ZZZQ trade');
  env.EZ_ALERTS.reset(); const r2 = await watch(env, zz); assert.equal(r2.notes.length, 0); assert.equal(env.EZ_ALERTS.ops.put, 0);
});
await test('flood guard: more alerts than FLOOD_EVENTS in one poll are held; release queues them once', async () => {
  const env = await seeded(BEFORE, { FLOOD_EVENTS: '10' }); const r = await twice(env, AFTER);
  assert.equal(r.events.length, 0); assert.ok(r.held); assert.equal(r.held.events.length, 16);
  await makeStore(env.EZ_ALERTS).followTelegram(7, ['all']);
  const rel = await releaseHeld({ ...env, TG_TOKEN: 'x' }); assert.equal(rel.events, 16); assert.ok(rel.queued >= 1);
  assert.equal(JSON.parse(await env.EZ_ALERTS.get(STATE_KEY)).held, null);
});
await test('a broken read after seeding (HTML page): ok=false, state untouched byte for byte, no write', async () => {
  const env = await seeded(); const before = await env.EZ_ALERTS.get(STATE_KEY); env.EZ_ALERTS.reset();
  const r = await watch(env, '<html>Sign in</html>'); assert.equal(r.ok, false); assert.equal(env.EZ_ALERTS.ops.put, 0); assert.equal(await env.EZ_ALERTS.get(STATE_KEY), before);
});
await test('a read with no Season 2 rows after seeding is refused (not taken as removals)', async () => {
  const env = await seeded(), cut = AFTER.split('\r\n').filter(l => !/^11[3-9],/.test(l)).join('\r\n');
  const r = await watch(env, cut); assert.equal(r.ok, false); assert.match(r.error, /no Season 2 rows/);
});

// ================= delivery: Web Push end to end =================
await test('Web Push end to end: follow -> "You follow Grok" -> alerts decrypt on the device side -> 410 removes the follower', async () => {
  const got = [], rx = {}; let status = 201;
  const { s, port } = await server(async (q, w) => { const b = await readBody(q), name = q.url.split('/').pop(), r = rx[name];
    const k = verifyVapid(q.headers.authorization, `http://127.0.0.1:${port}`); assert.equal(k, env.VAPID_PUBLIC_KEY);
    assert.equal(q.headers['content-encoding'], 'aes128gcm'); assert.ok(+q.headers.ttl > 0);
    got.push({ name, topic: q.headers.topic, msg: JSON.parse(decryptAes128gcm(b, r.ecdh, r.auth)) }); w.writeHead(status); w.end() });
  const env = { EZ_ALERTS: kvStub(), ...(await vapidPair()), ALLOW_TEST_ENDPOINTS: '1' };
  try {
    const a = uaSubscription(port, 'phone-a'), b = uaSubscription(port, 'phone-b'); rx['phone-a'] = a; rx['phone-b'] = b;
    let res = await route(req('/api/follow', { subscription: a.sub, ais: ['grok'] }), env); let j = await res.json();
    assert.equal(res.status, 200); assert.deepEqual(j.ais, ['grok']); assert.equal(j.confirmed, true);
    assert.equal(got[0].msg.title, 'You follow Grok');
    j = await (await route(req('/api/follow', { subscription: b.sub, ais: ['all'], confirm: false }), env)).json(); assert.deepEqual(j.ais, ['all']);
    await watch(env, BEFORE); await watch(env, AFTER); const r = await watch(env, AFTER); collect(r);
    const A = got.filter(g => g.name === 'phone-a').map(g => g.msg), B = got.filter(g => g.name === 'phone-b').map(g => g.msg);
    assert.deepEqual(A.slice(1).map(m => m.title).sort(), ["Grok posted its HP trade", "Grok's 3 trades are graded"]);
    assert.match(A.find(m => m.title === "Grok's 3 trades are graded").body, /Total P&L \+\$17,660$/);
    assert.deepEqual(B.map(m => m.title).sort(), ['Grok posted its HP trade', 'Intuit, Keysight, Elastic graded']);
    assert.equal(r.results.length, 4); assert.ok(r.results.every(x => x.ok)); assert.equal(r.outbox, 0);
    const res2 = await route(req('/api/following', { endpoint: a.sub.endpoint }), env); assert.deepEqual((await res2.json()).ais, ['grok']);
    // the device unsubscribed: the push service answers 410, the follower disappears
    status = 410; const flip = setCells(AFTER, [[114, 'ACTUAL MOVE (%)', '0.5']]); await watch(env, flip); const r3 = await watch(env, flip);
    assert.ok(r3.results.every(x => x.gone)); assert.equal((await makeStore(env.EZ_ALERTS).recipients('grok')).length, 0);
  } finally { s.close() }
});
await test('follow refuses: a non-push endpoint, bad keys, another origin, no AI', async () => {
  const env = { EZ_ALERTS: kvStub(), ...(await vapidPair()) }, { sub } = uaSubscription(1, 'x');
  const st = async (b, h) => (await route(req('/api/follow', b, h), env)).status;
  assert.equal(await st({ subscription: { ...sub, endpoint: 'https://evil.example/collect' }, ais: ['grok'] }), 400);
  assert.equal(await st({ subscription: { endpoint: 'https://fcm.googleapis.com/fcm/send/x', keys: { p256dh: 'AAAA', auth: 'AAAA' } }, ais: ['grok'] }), 400);
  assert.equal(await st({ subscription: { ...sub, endpoint: 'https://fcm.googleapis.com/fcm/send/x' }, ais: ['grok'] }, { origin: 'https://other.example' }), 403);
  assert.equal(await st({ subscription: { ...sub, endpoint: 'https://fcm.googleapis.com/fcm/send/x' }, ais: ['kimi'] }), 400);
});
await test('send budget: 5 messages with SEND_BUDGET=2 go out 2 + 2 + 1 over three ticks, none twice', async () => {
  const seen = [];
  const { s, port } = await server(async (q, w) => { await readBody(q); seen.push(q.url); w.writeHead(201); w.end() });
  const env = { EZ_ALERTS: kvStub(), ...(await vapidPair()), ALLOW_TEST_ENDPOINTS: '1', SEND_BUDGET: '2', DIGEST_AT: '99' };
  try {
    const st = makeStore(env.EZ_ALERTS);
    for (const n of ['a', 'b', 'c', 'd', 'e']) await st.followWebPush(uaSubscription(port, n).sub, ['grok']);
    await watch(env, BEFORE); const flip = setCells(BEFORE, [[116, 'TICKER', 'HPQ'], [116, 'CALL DATE (T-1)', '11/24/26'], [116, 'GROK DIR', 'DOWN'], [116, 'GROK MAG (%)', '3.1']]);
    await watch(env, flip); const r1 = await watch(env, flip), r2 = await watch(env, flip), r3 = await watch(env, flip), r4 = await watch(env, flip);
    assert.deepEqual([r1.results.length, r2.results.length, r3.results.length, r4.results.length], [2, 2, 1, 0]);
    assert.equal(new Set(seen).size, 5); assert.equal(seen.length, 5);
  } finally { s.close() }
});

// ================= delivery: Telegram =================
await test('Telegram without TG_TOKEN: webhook 503, Telegram followers skipped cleanly, web push unaffected', async () => {
  const env = { EZ_ALERTS: kvStub() };
  assert.equal((await route(req('/api/tg', { message: { chat: { id: 1 }, text: '/start grok' } }), env)).status, 503);
  await makeStore(env.EZ_ALERTS).followTelegram(55, ['grok']);
  await watch(env, BEFORE); await watch(env, AFTER); const r = await watch(env, AFTER);
  assert.equal(r.events.length, 16); assert.equal(r.deliveries.length, 0); assert.deepEqual(r.skippedChannels, ['tg']); assert.equal(r.results.length, 0);
});
await test('Telegram: secret header, /start grok deep link, keyboard, /list, alerts, 429 retry, 403 removal, /stop', async () => {
  const sent = []; let mode = 'ok';
  const { s, port } = await server(async (q, w) => { const b = JSON.parse((await readBody(q)).toString()); sent.push({ url: q.url, b });
    const out = mode === 'ok' ? [200, { ok: true, result: {} }] : mode === '429' ? [429, { ok: false, error_code: 429, description: 'Too Many Requests', parameters: { retry_after: 7 } }] : [403, { ok: false, error_code: 403, description: 'Forbidden: bot was blocked by the user' }];
    w.writeHead(out[0], { 'content-type': 'application/json' }); w.end(JSON.stringify(out[1])) });
  const env = { EZ_ALERTS: kvStub(), TG_TOKEN: 'TEST:TOKEN', TG_WEBHOOK_SECRET: 's3cret', TG_API_BASE: `http://127.0.0.1:${port}` };
  const hook = (text, secret = 's3cret', extra = {}) => route(req('/api/tg', { update_id: 1, message: { chat: { id: 4242 }, text }, ...extra }, { 'x-telegram-bot-api-secret-token': secret }), env);
  try {
    assert.equal((await hook('/start grok', 'wrong')).status, 401);
    let j = await (await hook('/start grok')).json(); assert.equal(j.method, 'sendMessage'); assert.equal(j.chat_id, 4242); assert.match(j.text, /^You follow Grok\./);
    j = await (await hook('/start@ez_bot gemini')).json(); assert.match(j.text, /^You follow Gemini, Grok\./);
    j = await (await hook('/start')).json(); assert.ok(j.reply_markup.inline_keyboard.flat().some(b => b.callback_data === 'f:all'));
    j = await (await route(req('/api/tg', { callback_query: { id: 'q1', data: 'f:qwen', message: { chat: { id: 4242 } } } }, { 'x-telegram-bot-api-secret-token': 's3cret' }), env)).json();
    assert.equal(j.method, 'answerCallbackQuery'); assert.match(j.text, /Qwen/);
    j = await (await hook('/stop gemini')).json(); assert.match(j.text, /still follow Grok, Qwen/);
    await watch(env, BEFORE); await watch(env, AFTER); const r = await watch(env, AFTER); collect(r);
    const texts = sent.filter(x => x.url.endsWith('/sendMessage')).map(x => x.b.text);
    assert.ok(texts.includes('Grok posted its HP trade\nSHORT \u22123.1%'));
    assert.ok(texts.includes("Intuit, Keysight, Elastic graded\nGrok P&L +$17,660 \u00b7 2 of 3 right\nQwen P&L \u2212$17,660 \u00b7 1 of 3 right"));
    assert.ok(sent.every(x => x.url.startsWith('/botTEST:TOKEN/')));
    // 429: kept with a retry time; then 403 (blocked): the chat is removed
    mode = '429'; const flip = setCells(AFTER, [[114, 'ACTUAL MOVE (%)', '0.5']]); await watch(env, flip); const r2 = await watch(env, flip);
    // chat 4242 follows Grok and Qwen: two corrections, both refused with 429, both kept with retry_after (7 s) as their next try
    assert.equal(r2.results.length, 2); assert.equal(r2.outbox, 2); const st = JSON.parse(await env.EZ_ALERTS.get(STATE_KEY)); assert.ok(st.outbox.every(d => d.nb > Date.now() + 5000 && d.tries === 1));
    assert.equal((await watch(env, flip)).results.length, 0); // not due yet
    mode = '403'; const r3 = await watch(env, flip, { now: Date.now() + 10_000 }); assert.ok(r3.results.length === 2 && r3.results.every(x => x.gone)); assert.equal(r3.outbox, 0);
    assert.deepEqual(await makeStore(env.EZ_ALERTS).telegramFollows(4242), []);
    mode = 'ok'; await hook('/start grok'); j = await (await hook('/stop')).json(); assert.match(j.text, /No more alerts/); assert.deepEqual(await makeStore(env.EZ_ALERTS).telegramFollows(4242), []);
  } finally { s.close() }
});

// ================= the rest =================
await test('every message produced: no banned word, sides only LONG or SHORT, money only as a signed P&L', async () => {
  assert.ok(allMessages.length >= 4);
  for (const e of AFTER_EVENTS) allMessages.push(one(e));
  for (const m of allMessages) { const t = m.title + '\n' + m.body + '\n' + (m.text || '');
    assert.doesNotMatch(t, BANNED, t); assert.doesNotMatch(t, /\b(UP|DOWN|BUY|SELL)\b/, t);
    assert.doesNotMatch(t.replace(/P&L (\+|\u2212)?\$[\d,]+/g, ''), /\$/, 'a dollar figure without its P&L label: ' + t);
  }
});
await test('sw.js: push and notificationclick handlers only, no fetch handler, no caching', async () => {
  const types = [...SW_JS.matchAll(/addEventListener\('(\w+)'/g)].map(m => m[1]);
  assert.deepEqual(types, ['push', 'notificationclick']); assert.doesNotMatch(SW_JS, /caches\.|'fetch'|onfetch/);
});
await test('status shows no follower data; admin is 404 without ADMIN_TOKEN and 401 with a wrong one', async () => {
  const env = await seeded(); await makeStore(env.EZ_ALERTS).followTelegram(99, ['grok']);
  const s = await (await route(req('/api/status'), env)).text(); assert.doesNotMatch(s, /99|endpoint/); assert.match(s, /"seeded":true/);
  assert.equal((await route(req('/api/admin/run', {}), env)).status, 404);
  assert.equal((await route(req('/api/admin/run', {}, { authorization: 'Bearer nope' }), { ...env, ADMIN_TOKEN: 'right' })).status, 401);
  const ok = await (await route(req('/api/admin/stats', {}, { authorization: 'Bearer right' }), { ...env, ADMIN_TOKEN: 'right' })).json(); assert.equal(ok.followers.grok, 1);
});

// ---------- report ----------
let fail = 0;
for (const [s, name, e] of results) { if (s === 'FAIL') fail++; console.log(`${s.padEnd(4)} ${name}`); if (e) console.log('     ' + String(e && e.stack || e).split('\n').slice(0, 4).join('\n     ')) }
console.log(`\n${results.filter(r => r[0] === 'PASS').length} passed, ${fail} failed, ${results.filter(r => r[0] === 'SKIP').length} skipped`);
process.exit(fail ? 1 : 0);
