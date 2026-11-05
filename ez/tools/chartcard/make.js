// Round outcome as a chart video (1080x1080, 15 s, with countdown beeps and the boom).
// node make.js <round> <A|B> <out.mp4> [hlCoin]
// Price path: Hyperliquid hourly candles of the company's HIP-3 market (xyz:<TICKER> by default).
// The close is the sheet's: the path after the report is eased onto the sheet's move, and the
// script stops if Hyperliquid's own move differs from the sheet's by more than 1.5 points.
global.window = global;
const fs = require('fs'), path = require('path'), os = require('os'), { execFileSync } = require('child_process');
const EZ = path.join(__dirname, '../..');
eval(fs.readFileSync(path.join(EZ, 'ez-data.js'), 'utf8') + ';global.R=ROUNDS;global.P=PENDING;global.U=UPCOMING;global.CL=CO_LOGOS;global.MO=MODELS');
const [n, style = 'A', out = 'out.mp4', coinArg] = process.argv.slice(2);
const r = R.find(q => q.n === +n); if (!r) throw new Error('round ' + n + ' is not graded');
const md = s => { const [m, d, y] = s.split('/').map(Number); return [2000 + (y % 100), m, d] };
function nyOffset(y, m, d) { // hours to add to UTC to get New York time on that date
  const f = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', timeZoneName: 'shortOffset' });
  const p = f.formatToParts(new Date(Date.UTC(y, m - 1, d, 12))).find(x => x.type === 'timeZoneName').value; return +(p.replace('GMT', '') || 0) }
const ny = (ymd, hh, mm = 0) => { const [y, m, d] = ymd; return Date.UTC(y, m - 1, d, hh - nyOffset(y, m, d), mm) };
const sameDay = r.called === r.resolves;
const resT = ny(md(r.resolves), 16);
// before-open reporters: the close before is the previous weekday's; the report lands at about 7am New York
function prevWeekday(ymd) { const t = new Date(Date.UTC(ymd[0], ymd[1] - 1, ymd[2])); do t.setUTCDate(t.getUTCDate() - 1); while ([0, 6].includes(t.getUTCDay())); return [t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate()] }
const prevT = sameDay ? ny(prevWeekday(md(r.resolves)), 16) : ny(md(r.called), 16);
const repT = sameDay ? ny(md(r.resolves), 7) : prevT;
const coin = coinArg || 'xyz:' + r.ticker;
(async () => {
  const res = await fetch('https://api.hyperliquid.xyz/info', { method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ type: 'candleSnapshot', req: { coin, interval: '1h', startTime: repT - 72 * 3600e3, endTime: resT - 1 } }) });
  let bars = (await res.json()).map(c => [c.t, +c.o, +c.h, +c.l, +c.c]).filter(b => b[0] < resT);
  if (bars.length < 30) throw new Error('not enough Hyperliquid candles for ' + coin);
  const ip = bars.findIndex(b => b[0] >= prevT), ir = bars.findIndex(b => b[0] >= repT);
  const prev = bars[ip - 1][4], hlMove = 100 * (bars[bars.length - 1][4] / prev - 1);
  if (Math.abs(hlMove - r.a) > 1.5) throw new Error(`Hyperliquid says ${hlMove.toFixed(2)}%, the sheet ${r.a}%: check before posting`);
  const k = prev * (1 + r.a / 100) / bars[bars.length - 1][4], span = bars.length - 1 - ir;
  bars = bars.map((b, i) => { if (i < ir) return b; const f = 1 + (k - 1) * (span ? (i - ir) / span : 1); return [b[0], b[1] * f, b[2] * f, b[3] * f, b[4] * f] });
  const calls = r.calls.map(c => { const dir = /^UP/.test(c[1]) ? 1 : -1, mag = c[1].replace(/[^0-9.]/g, '');
    return { m: c[0], dir, mag, off: +c[2], lv: prev * (1 + dir * mag / 100), pl: 1000 * dir * r.a } });
  const win = r.win ? r.win.split(/\s*&\s*/).map(s => s.trim()) : [];
  const nm = { GPT: 'GPT', CLAUDE: 'Claude', KIMI: 'Kimi', GROK: 'Grok' };
  const wc = calls.filter(c => win.includes(c.m));
  const verdictLine = wc.length ? wc.map(c => nm[c.m]).join(' & ') + (wc.length > 1 ? ' win' : ' wins') + ' · ' + wc[0].off.toFixed(2) + '% off' : 'Nobody called it';
  const nx = [...R, ...P, ...U].find(q => q.n === r.n + 1);
  const lg = CL[r.ticker]; const logo = lg ? 'data:image/png;base64,' + fs.readFileSync(path.join(EZ, 'media', lg.f)).toString('base64') : '';
  const cfg = { n: r.n, co: r.co, tk: r.ticker, a: r.a, win, calls, bars, iRep: ir, prev, style, logo, verdictLine,
    tz: nyOffset(...md(r.resolves)), endLine: (nx ? 'Next: Round ' + nx.n + ' · ' + nx.co + '   ·   ' : '') + '@earningszn  ·  earningszn.xyz/r/' + r.n,
    models: Object.fromEntries(Object.entries(MO).map(([k2, v]) => [k2, { d: v.d, dot: v.dot, dotc: v.dotc, fr: v.fr }])) };
  const tmp = fs.mkdtempSync(path.join(process.env.CC_TMP || os.tmpdir(), 'cc-'));
  const { chromium } = require('playwright'); const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 1080, height: 1080 } });
  await pg.goto('file://' + path.join(__dirname, 'render.html'));
  await pg.evaluate(async c => { for (const f of ['900 58px "Inter Display"', '700 20px "Inter"', '800 20px "Inter"', '700 20px "JetBrains Mono"', '600 20px "JetBrains Mono"']) await document.fonts.load(f); await init(c) }, cfg);
  if (process.env.STILLS) { for (const t of process.env.STILLS.split(',').map(Number)) { await pg.evaluate(t => draw(t), t);
      await pg.locator('#c').screenshot({ path: out.replace(/\.\w+$/, '') + '-' + t + '.png' }) } await b.close(); return }
  const fps = 30, N = 15 * fps;
  for (let i = 0; i < N; i++) { const d = await pg.evaluate(t => { draw(t); return document.getElementById('c').toDataURL('image/jpeg', .93) }, i / fps);
    fs.writeFileSync(path.join(tmp, 'f' + String(i).padStart(4, '0') + '.jpg'), Buffer.from(d.split(',')[1], 'base64')) }
  await b.close();
  const bp = (t0, f, d, a) => `${a}*sin(2*PI*${f}*t)*between(t,${t0},${t0 + d})*sin(PI*(t-${t0})/${d})`;
  const ex = [bp(4.5, 880, .13, .35), bp(5.3, 880, .13, .35), bp(6.1, 880, .13, .35),
    '0.9*sin(2*PI*(42+40*exp(-(t-6.9)*7))*(t-6.9))*exp(-(t-6.9)*3.2)*gte(t,6.9)',
    '0.18*sin(2*PI*1320*t)*exp(-(t-10.7)*5)*gte(t,10.7)', '0.12*sin(2*PI*1760*t)*exp(-(t-10.85)*5)*gte(t,10.85)'].join('+');
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(fps), '-i', path.join(tmp, 'f%04d.jpg'),
    '-f', 'lavfi', '-i', `aevalsrc='${ex}':s=44100:d=15`, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '19', '-preset', 'slow',
    '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', '-shortest', out]);
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log(`R${r.n} ${r.co}: ${bars.length} bars, report at bar ${ir}, prev ${prev.toFixed(2)}, Hyperliquid ${hlMove.toFixed(2)}% vs sheet ${r.a}% -> ${out}`);
})().catch(e => { console.error(e.message); process.exit(1) });
