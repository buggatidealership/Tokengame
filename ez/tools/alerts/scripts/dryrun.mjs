// node scripts/dryrun.mjs --sheet live|<file.csv> --state <state.json> [--settle N] [--followers demo] [--fresh]
// Runs the watcher exactly as the cron does, against a local KV stand-in kept in --state, and prints the alerts it WOULD send.
// Nothing is sent and nothing reaches Cloudflare. --followers demo adds three made-up followers so the fan-out and digests show:
// Telegram chat 1001 follows Grok, chat 1002 follows Gemini and Qwen, one web push endpoint follows all five.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { kvStub } from '../test/kvstub.js';
import { runWatcher, summary, fetchSheet } from '../src/watcher.js';
import { makeStore } from '../src/store.js';

const HERE = path.dirname(fileURLToPath(import.meta.url)), ROOT = path.resolve(HERE, '..');
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d };
const sheet = arg('sheet', 'live'), stateFile = arg('state'), settle = arg('settle');
if (!stateFile) { console.error('usage: node scripts/dryrun.mjs --sheet live|<file.csv> --state <state.json> [--settle N] [--followers demo] [--fresh]'); process.exit(1) }
if (process.argv.includes('--fresh') && fs.existsSync(stateFile)) fs.unlinkSync(stateFile);

const kv = kvStub(stateFile);
const env = {
  EZ_ALERTS: kv,
  VAPID_PUBLIC_KEY: fs.existsSync(path.join(ROOT, 'vapid-public.txt')) ? fs.readFileSync(path.join(ROOT, 'vapid-public.txt'), 'utf8').trim() : 'none',
  VAPID_PRIVATE_KEY: 'dry-run-never-used', TG_TOKEN: 'dry-run-never-used', // both channels "on" so the dry run shows what each would get
  ...(settle != null ? { SETTLE_POLLS: settle } : {}),
};
if (arg('followers') === 'demo') {
  const st = makeStore(kv);
  await st.followTelegram(1001, ['grok']); await st.followTelegram(1002, ['gemini', 'qwen']);
  await st.followWebPush({ endpoint: 'https://fcm.googleapis.com/fcm/send/demo-endpoint', keys: { p256dh: 'BCVxsr7N_eNgVRqvHtD0zTZsEc6-VV-JvLexhqUzORcxaOzi6-AYWXvTBHm4bjyPjs7Vd8pZGH6SRpkNtoIAiw4', auth: 'BTBZMqHH6r4Tts7J_aSIgg' } }, ['all']);
}
kv.reset();
const fetchText = sheet === 'live' ? () => fetchSheet({}) : async () => fs.readFileSync(sheet, 'utf8');
const r = await runWatcher(env, { dryRun: true, fetchText });

console.log(`sheet: ${sheet === 'live' ? 'live export' : path.relative(process.cwd(), sheet)}   state: ${path.resolve(stateFile)}`);
console.log(summary(r) || 'ez-alerts: nothing new');
if (r.counts) console.log(`read: ${r.counts.trades} Season 2 trades, ${r.counts.calls} calls, ${r.counts.graded} graded`);
if (r.incomplete && r.incomplete.length) console.log('incomplete cells (waiting, no alert): ' + r.incomplete.map(n => `R${n.round} ${n.ticker} ${n.ai} dir=${JSON.stringify(n.dir)} size=${JSON.stringify(n.mag)}`).join('; '));
const st = r.ok ? JSON.parse(await kv.get('state:v1')) : null;
if (st && Object.keys(st.pending).length) console.log(`settling (alert on the next poll if unchanged): ${Object.keys(st.pending).join(', ')}`);
if (r.events.length) {
  console.log('\nALERTS (channel-agnostic events):');
  for (const e of r.events) {
    if (e.type === 'CALL_IN') console.log(`  CALL_IN  R${e.round} ${e.company} (${e.ticker})  ${e.aiName}  ${e.side} ${e.size}%${e.conf != null ? `  conf ${e.conf}%` : ''}`);
    else if (e.type === 'GRADED') console.log(`  GRADED   R${e.round} ${e.company} (${e.ticker})  ${e.aiName}  ${e.side}  move ${e.move}%  ${e.right ? 'right' : e.right === false ? 'wrong' : 'flat'}  P&L ${e.pnl}`);
    else console.log(`  ${e.type} R${e.round} ${e.ticker} ${e.aiName} ${JSON.stringify(e.from)} -> ${JSON.stringify(e.to)}`);
  }
  const by = {}; for (const e of r.events.filter(e => e.type === 'GRADED')) by[e.aiName] = (by[e.aiName] || 0) + e.pnl;
  if (Object.keys(by).length) console.log('  P&L of the graded trades, by AI: ' + Object.entries(by).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v >= 0 ? '+' : '−'}$${Math.abs(v).toLocaleString('en-US')}`).join(', '));
}
if (r.deliveries.length) {
  console.log(`\nWOULD SEND (${r.deliveries.length} messages):`);
  for (const d of r.deliveries) {
    console.log(`  [${d.ch === 'tg' ? 'telegram chat ' + d.to : 'web push ' + d.rid}]`);
    for (const l of (d.ch === 'tg' ? d.msg.text : d.msg.title + '\n' + d.msg.body).split('\n')) console.log('      ' + l);
    console.log(`      -> ${d.msg.url}`);
  }
}
if (r.notes.length) console.log('\nNOTES (logged, not sent): ' + r.notes.map(n => `${n.type}${n.ticker ? ' ' + n.ticker : ''}${n.ai ? ' ' + n.ai : ''}${n.from ? ' ' + JSON.stringify(n.from) + '->' + JSON.stringify(n.to) : ''}`).join('; '));
console.log(`KV this run: ${kv.ops.get} reads, ${kv.ops.put} writes, ${kv.ops.list} lists, ${kv.ops.delete} deletes`);
if (!r.ok) process.exitCode = 1;
