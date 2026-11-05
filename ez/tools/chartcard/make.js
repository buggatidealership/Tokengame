// Round outcome as a chart video (1080x1350, 4:5, 15 s, with countdown beeps and the boom) plus its post text.
// node make.js <round> <A|B|C|K|S:<set>> <out.mp4> [hlCoin]   (S:casino, S:slot, S:sportsbook, S:den: set/sets.json)
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
const [kind, setName] = style.split(':');
(async () => {
  const res = await fetch('https://api.hyperliquid.xyz/info', { method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ type: 'candleSnapshot', req: { coin, interval: '1h', startTime: repT - 48 * 3600e3, endTime: resT - 1 } }) });
  let bars = (await res.json()).map(c => [c.t, +c.o, +c.h, +c.l, +c.c]).filter(b => b[0] < resT);
  if (bars.length < 30) throw new Error('not enough Hyperliquid candles for ' + coin);
  const ip = bars.findIndex(b => b[0] >= prevT), ir = bars.findIndex(b => b[0] >= repT);
  const prev = bars[ip - 1][4], hlMove = 100 * (bars[bars.length - 1][4] / prev - 1);
  if (Math.abs(hlMove - r.a) > 1.5) throw new Error(`Hyperliquid says ${hlMove.toFixed(2)}%, the sheet ${r.a}%: check before posting`);
  // the first hour after the report at the finest step Hyperliquid still keeps (1m for about 3 days, 5m for about 17, 15m for about 52)
  const age = Date.now() - repT, fiv = age < 3.2 * 864e5 ? 1 : age < 16.5 * 864e5 ? 5 : age < 50 * 864e5 ? 15 : 0, t1 = bars[ir][0];
  let fine = [], fineLab = [];
  if (fiv) { try { const fr = await fetch('https://api.hyperliquid.xyz/info', { method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ type: 'candleSnapshot', req: { coin, interval: fiv + 'm', startTime: t1, endTime: t1 + 3600e3 - 1 } }) });
    fine = (await fr.json()).map(c => [c.t, +c.o, +c.h, +c.l, +c.c]).filter(b => b[0] >= t1 && b[0] < t1 + 3600e3); } catch (e) { fine = [] } }
  if (fine.length > 1 && Math.abs(fine[fine.length - 1][4] / bars[ir][4] - 1) > .004) fine = []; // must land on the hourly close
  const clk = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: '2-digit' });
  fineLab = fine.map(b => clk.format(new Date(b[0] + fiv * 60e3)) + ' ET');
  const k = prev * (1 + r.a / 100) / bars[bars.length - 1][4], span = bars.length - 1 - ir;
  bars = bars.map((b, i) => { if (i < ir) return b; const f = 1 + (k - 1) * (span ? (i - ir) / span : 1); return [b[0], b[1] * f, b[2] * f, b[3] * f, b[4] * f] });
  const calls = r.calls.map(c => { const dir = /^UP/.test(c[1]) ? 1 : -1, mag = c[1].replace(/[^0-9.]/g, '');
    return { m: c[0], dir, mag, off: +c[2], lv: prev * (1 + dir * mag / 100), pl: 1000 * dir * r.a } });
  const win = r.win ? r.win.split(/\s*&\s*/).map(s => s.trim()) : [];
  const nm = { GPT: 'GPT', CLAUDE: 'Claude', KIMI: 'Kimi', GROK: 'Grok' };
  const us = t => /^[A-Z]{1,5}(\.B)?$/.test(t);
  const wc = calls.filter(c => win.includes(c.m)), fmtA = v => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v).toFixed(2) + '%';
  const title = us(r.ticker) ? '$' + r.ticker : r.co;
  const winLine = wc.length ? wc.map(c => nm[c.m]).join(' & ') + (wc.length > 1 ? ' win' : ' wins') : 'Nobody called it';
  const winSub = (wc.length ? wc[0].off.toFixed(2) + '% off  ·  ' : '') + r.co + ' closed ' + fmtA(r.a);
  // season standings (flat $100K a call) before and after this round
  const sorted = R.slice().sort((p, q) => p.n - q.n), seasonTo = lim => { const s = {}; for (const q of sorted) { if (q.n > lim) break; for (const c of q.calls) s[c[0]] = (s[c[0]] || 0) + 1000 * (/^UP/.test(c[1]) ? 1 : -1) * q.a } return s };
  const sb = seasonTo(r.n - 1), sa = seasonTo(r.n), rank = s => Object.keys(s).sort((p, q) => s[q] - s[p]);
  const rb = rank(sb), ra = rank(sa);
  const rows = ra.map(m => { const c = calls.find(q => q.m === m); return { m, dir: c ? c.dir : 0, pl: c ? c.pl : 0, season: sa[m], mv: rb.includes(m) ? rb.indexOf(m) - ra.indexOf(m) : 0 } }).filter(q => calls.some(c => c.m === q.m));
  const nx = [...R, ...P, ...U].find(q => q.n === r.n + 1);
  const lg = CL[r.ticker]; const logo = lg ? 'data:image/png;base64,' + fs.readFileSync(path.join(EZ, 'media', lg.f)).toString('base64') : '';
  const ezLogo = 'data:image/svg+xml;base64,' + fs.readFileSync(path.join(EZ, 'tools/v22/x2p-logo.svg')).toString('base64');
  const cfg = { fine, fineLab, fiv, iPrev: ip, n: r.n, co: r.co, tk: r.ticker, a: r.a, win, calls, bars, iRep: ir, prev, fin: prev * (1 + r.a / 100), style, logo, ezLogo, title,
    sub: (r.co !== r.ticker && us(r.ticker) ? r.co + '  ·  ' : '') + 'Round ' + r.n, winLine, winSub, rows,
    next: nx ? 'Next: ' + (us(nx.ticker) ? '$' + nx.ticker : nx.co) + '  ·  Round ' + nx.n : '@earningszn',
    models: Object.fromEntries(Object.entries(MO).map(([k2, v]) => [k2, { d: v.d, dot: v.dot, dotc: v.dotc, fr: v.fr, bg: v.bg, fg: v.fg, c: v.c }])) };
  // the post: no spoiler, the cashtag, the stake
  const ups = calls.filter(c => c.dir > 0).length, best = Math.min(...calls.filter(c => (c.dir > 0) === (r.a > 0)).map(c => c.off), 99);
  const post = [`4 AIs locked their ${title} calls before the print.`, `${ups} long, ${calls.length - ups} short.`,
    best < 99 ? (best < 1 ? `One landed within ${best.toFixed(2)}%.` : 'Only one call can be closest.') : 'The market had other plans.',
    'Paper, $100K per call. Not advice.\nearningszn.xyz/r/' + r.n].join('\n\n');
  if (!process.env.STILLS) fs.writeFileSync(out.replace(/\.\w+$/, '') + '.txt', post + '\n');
  const tmp = fs.mkdtempSync(path.join(process.env.CC_TMP || os.tmpdir(), 'cc-'));
  const { chromium } = require('playwright'); const b = await chromium.launch({ args: ['--allow-file-access-from-files', '--disable-web-security'] }); const pg = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  const cast = style === 'C' || style === 'K', isSet = kind === 'S';
  if (isSet) { const sets = JSON.parse(fs.readFileSync(path.join(__dirname, 'set', 'sets.json'), 'utf8')); if (!sets[setName]) throw new Error('no set ' + setName);
    cfg.set = { ...sets[setName], srcUrl: 'file://' + path.join(__dirname, 'set', sets[setName].src) }; }
  if (style === 'K') cfg.setSrc = 'file://' + path.join(__dirname, 'set', 'chalk.jpg');
  if (cast) cfg.cast = Object.fromEntries(calls.map(c => [c.m, { src: 'file://' + path.join(EZ, 'media', 'h49-cast-' + c.m.toLowerCase() + '-c.webm'),
    head: { GROK: [150, 100, 300], CLAUDE: [190, 30, 300], GPT: [230, 60, 300], KIMI: [245, 90, 290] }[c.m] }]));
  await pg.goto('file://' + path.join(__dirname, isSet ? 'render-set.html' : style === 'K' ? 'render-chalk.html' : cast ? 'render-cast.html' : 'render.html'));
  await pg.evaluate(async c => { for (const f of ['900 58px "Inter Display"', '700 20px "Inter"', '800 20px "Inter"', '700 20px "JetBrains Mono"', '600 20px "JetBrains Mono"']) await document.fonts.load(f); return await init(c) }, cfg);
  const TL = (cast || isSet) ? await pg.evaluate(() => tl) : { cd: [1.8, 3.3], boom: 3.3, close: [10.4, 11.3], T: 15 };
  if (process.env.STILLS) { for (const t of process.env.STILLS.split(',').map(Number)) { await pg.evaluate(async t => { if (typeof seek === 'function') await seek(t); draw(t) }, t);
      await pg.locator('#c').screenshot({ path: out.replace(/\.\w+$/, '') + '-' + t + '.png' }) } await b.close(); return }
  const fps = 30, DUR = Math.ceil(TL.T * 10) / 10, N = Math.round(DUR * fps);
  for (let i = 0; i < N; i++) { const d = await pg.evaluate(async t => { if (typeof seek === 'function') await seek(t); draw(t); return document.getElementById('c').toDataURL('image/jpeg', .93) }, i / fps);
    fs.writeFileSync(path.join(tmp, 'f' + String(i).padStart(4, '0') + '.jpg'), Buffer.from(d.split(',')[1], 'base64')) }
  await b.close();
  const bp = (t0, f, d, a) => `${a}*sin(2*PI*${f}*t)*between(t,${t0},${t0 + d})*sin(PI*(t-${t0})/${d})`;
  const c0 = TL.cd[0], bm = TL.boom, cl = TL.close[0];
  const ex = [bp(c0, 880, .12, .35), bp(c0 + .5, 880, .12, .35), bp(c0 + 1, 880, .12, .35),
    `0.9*sin(2*PI*(42+40*exp(-(t-${bm})*7))*(t-${bm}))*exp(-(t-${bm})*3.2)*gte(t,${bm})`,
    `0.18*sin(2*PI*1320*t)*exp(-(t-${cl})*5)*gte(t,${cl})`, `0.12*sin(2*PI*1760*t)*exp(-(t-${cl + .15})*5)*gte(t,${cl + .15})`,
    ...(cast ? [...calls.map((c, k) => { const s0 = 1.25 + k * 1.15; return `0.5*sin(2*PI*(70+50*exp(-(t-${s0})*12))*(t-${s0}))*exp(-(t-${s0})*9)*gte(t,${s0})` }),
      `0.6*sin(2*PI*(60+40*exp(-(t-${TL.lock[0] + .1})*10))*(t-${TL.lock[0] + .1}))*exp(-(t-${TL.lock[0] + .1})*7)*gte(t,${TL.lock[0] + .1})`] : []),
    ...(isSet ? [...TL.lands.map(s0 => `0.35*sin(2*PI*2400*(t-${s0}))*exp(-max(t-${s0},0)*45)*gte(t,${s0})+0.3*sin(2*PI*900*(t-${s0}))*exp(-max(t-${s0},0)*30)*gte(t,${s0})`),
      `0.55*sin(2*PI*(60+40*exp(-max(t-${TL.lock[0] + .1},0)*10))*(t-${TL.lock[0] + .1}))*exp(-max(t-${TL.lock[0] + .1},0)*7)*gte(t,${TL.lock[0] + .1})`,
      ...TL.ticks.filter((_, j, a) => a.length <= 16 || j % Math.ceil(a.length / 16) === 0).map(s0 => `0.16*sin(2*PI*3200*(t-${s0}))*exp(-max(t-${s0},0)*90)*gte(t,${s0})`),
      `0.07*sin(2*PI*(55+${r.a > 0 ? '' : '-'}12*(t-${TL.slow[0]}))*(t-${TL.slow[0]}))*between(t,${TL.slow[0]},${TL.slow[1]})`] : [])].join('+');
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(fps), '-i', path.join(tmp, 'f%04d.jpg'),
    '-f', 'lavfi', '-i', `aevalsrc='${ex}':s=44100:d=${DUR}`, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '19', '-preset', 'slow',
    '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', '-shortest', out]);
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log(`R${r.n} ${r.co}: ${bars.length} bars, report at bar ${ir}, prev ${prev.toFixed(2)}, Hyperliquid ${hlMove.toFixed(2)}% vs sheet ${r.a}% -> ${out}`);
})().catch(e => { console.error(e.message); process.exit(1) });
