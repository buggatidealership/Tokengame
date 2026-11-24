// node prep-close.js <YYYY-MM-DD> [--preview] : every number for one close's outcome video (Season 2: one video per market close,
// every round graded at that close in it; owner, 2026-11-20: "3 into one... there will be days where we'll have like 5, 6, or even like
// 10"). Reads the owner's sheet directly (Season 2 rows, 113 on, are held off ez-data.js by sync_sheet.py) and writes
// data/close-<date>.json plus data/close-<date>-sheet.csv, the snapshot it read. Nothing typed by hand but the company names below.
// Season 2 rules: five AIs, every AI started at P&L $0, $100K on every trade (P&L = side x move x $1,000).
// Price path per company: the exchange's 5-minute prices with pre-market and after-hours (Yahoo Finance chart API), from the close
// before the grading day to the grading close, scaled onto the sheet's move; refused when the two disagree (prep.js's rule).
// --preview (mockups only, never posted): a round without a move in the sheet takes the latest price as a provisional move and the
// path ends at that price; the page prints PREVIEW on every frame.
const fs = require('fs'), path = require('path');
const [date, flag] = process.argv.slice(2); if (!/^\d{4}-\d\d-\d\d$/.test(date || '')) { console.error('usage: node prep-close.js <YYYY-MM-DD> [--preview]'); process.exit(1) }
const PREVIEW = flag === '--preview', OUT = path.join(__dirname, 'data'); fs.mkdirSync(OUT, { recursive: true });
const SHEET = 'https://docs.google.com/spreadsheets/d/1HE0z8uxuGa0sAbsnm6ZkPjU5bCLwGlq4EUjeCOROlIE/export?format=csv&gid=352731177';
const SEASON1_LAST = 112; // as in ez/tools/sync_sheet.py
// Season 2's five, in the sheet's column order; the sheet's own headers (one reads "Gemin MAG (%)")
const AIS = [['GPT', 'GPT', 'GPT DIR', 'GPT MAG (%)'], ['CLAUDE', 'Claude', 'CLAUDE DIR', 'CLAUDE MAG (%)'], ['GROK', 'Grok', 'GROK DIR', 'GROK MAG (%)'],
  ['GEMINI', 'Gemini', 'GEMINI DIR', /^GEMINI? MAG/], ['QWEN', 'Qwen', 'QWEN DIR', 'QWEN MAG (%)']];
// company names, logo files (data/co/<ticker>.*) and TradingView exchanges; a ticker missing here stops the prep
// (a fourth entry is the market's own ticker where the sheet writes another: the sheet's ZOOM is Nasdaq ZM). Logos of the week of 23 Nov:
// Zoom, Dell, HP, Autodesk from Simple Icons (CC0) on their brand colour; Workday and Medtronic from Wikimedia Commons; Semtech, Symbotic,
// Analog Devices, Ambarella their own site icons, each squared on a tile (scratchpad tiles.js, 2026-11-23).
const CO = { INTU: ['Intuit', 'co/INTU.svg', 'NASDAQ'], KEYS: ['Keysight', 'co/KEYS.png', 'NYSE'], ESTC: ['Elastic', 'co/ESTC.svg', 'NYSE'],
  ZOOM: ['Zoom', 'co/ZOOM.png', 'NASDAQ', 'ZM'], SMTC: ['Semtech', 'co/SMTC.png', 'NASDAQ'], SYM: ['Symbotic', 'co/SYM.png', 'NASDAQ'],
  MDT: ['Medtronic', 'co/MDT.png', 'NYSE'], ADI: ['Analog Devices', 'co/ADI.png', 'NASDAQ'], DELL: ['Dell', 'co/DELL.png', 'NYSE'],
  WDAY: ['Workday', 'co/WDAY.png', 'NASDAQ'], AMBA: ['Ambarella', 'co/AMBA.png', 'NASDAQ'], HPQ: ['HP', 'co/HPQ.png', 'NYSE'],
  ADSK: ['Autodesk', 'co/ADSK.png', 'NASDAQ'] };
const SYM = t => CO[t][3] || t;
// TradingView is the source of truth for moves (owner, 2026-11-20: "TradingView is our source of truth that we all use"). When the sheet
// has no move yet, the move is TradingView's close-to-close change for the day, read from the endpoint TradingView's own screener page
// uses (not an official API; its data runs 15 minutes behind, so it is read only from 4:20 pm New York on the grading day).
const tv = async t => { const r = await fetch('https://scanner.tradingview.com/america/scan', { method: 'POST', headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ symbols: { tickers: [CO[t][2] + ':' + SYM(t)] }, columns: ['close', 'change', 'description'] }) }).then(x => x.json());
  const d = r.data && r.data[0] && r.data[0].d; if (!d || !isFinite(d[1])) throw new Error('TradingView has no change for ' + t); return { close: d[0], move: +d[1].toFixed(2) } };
const csv = t => { const rows = [[]]; let f = '', q = false; for (let i = 0; i < t.length; i++) { const c = t[i];
  if (q) { if (c === '"') { if (t[i + 1] === '"') { f += '"'; i++ } else q = false } else f += c }
  else if (c === '"') q = true; else if (c === ',') { rows.at(-1).push(f); f = '' } else if (c === '\n') { rows.at(-1).push(f.replace(/\r$/, '')); f = ''; rows.push([]) } else f += c }
  rows.at(-1).push(f); return rows.filter(r => r.length > 1) };
const nyDate = s => { const [m, d, y] = s.split('/').map(Number); return `${2000 + (y % 100)}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}` };
(async () => {
  const text = await (await fetch(SHEET)).text(); const rows = csv(text), H = rows[0].map(h => h.trim().toUpperCase());
  const col = k => { const i = k instanceof RegExp ? H.findIndex(h => k.test(h)) : H.indexOf(k); if (i < 0) throw new Error('sheet has no column ' + k); return i };
  const g = (r, k) => String(r[col(k)] || '').trim();
  const s2 = rows.slice(1).filter(r => +g(r, 'ROUND') > SEASON1_LAST && g(r, 'TICKER'));
  const side = (r, a) => { const d = g(r, a[2]).toUpperCase(); return d === 'UP' ? 'LONG' : d === 'DOWN' ? 'SHORT' : null };
  const mag = (r, a) => parseFloat(g(r, a[3]).replace(/^[-−]/, ''));
  const pnl = (s, m) => s ? Math.round((s === 'LONG' ? 1 : -1) * m * 1000) : 0;
  // no resolution date in the sheet: graded at the next close after the report (CLAUDE.md rule), the report time from s2-data.js
  // (make_s2.py REPORT: 'before the open' grades the call day's close, anything else the next weekday's)
  const S2R = (() => { try { const c = {}; require('vm').runInNewContext(fs.readFileSync(path.join(__dirname, '../../../s2-data.js'), 'utf8'), c); return c.S2_REPORT || {} } catch (e) { return {} } })();
  const nextClose = r => { const c = g(r, 'CALL DATE (T-1)'); if (!/^\d+\/\d+\/\d+/.test(c)) return null; const [y, m, d] = nyDate(c).split('-').map(Number);
    let x = new Date(Date.UTC(y, m - 1, d)); const rp = S2R[g(r, 'TICKER').toUpperCase()];
    if (!(rp && /before/.test(rp[2]))) do { x = new Date(x.getTime() + 864e5) } while ([0, 6].includes(x.getUTCDay())); return x.toISOString().slice(0, 10) };
  const resOf = r => /^\d+\/\d+\/\d+/.test(g(r, 'RESOLUTION DATE/TIME')) ? nyDate(g(r, 'RESOLUTION DATE/TIME').split(' ')[0]) : (g(r, 'GPT DIR') ? nextClose(r) : null);
  // the moves of the posted close video, where the sheet now differs (owner, 2026-11-23; make_s2.py MOVE)
  const KEEP = { INTU: -12.79, ESTC: -2.20 };
  // the season before this close: every Season 2 round graded on an earlier day
  const season0 = Object.fromEntries(AIS.map(a => [a[0], 0])); let before = 0;
  for (const r of s2) { const m = KEEP[g(r, 'TICKER').toUpperCase()] ?? parseFloat(g(r, 'ACTUAL MOVE (%)')), d = resOf(r); if (!isFinite(m) || !d || d >= date) continue; before++; AIS.forEach(a => season0[a[0]] += pnl(side(r, a), m)) }
  const tonight = s2.filter(r => resOf(r) === date); if (!tonight.length) throw new Error('no Season 2 round graded on ' + date);
  // the clock: New York, the close before the grading day to the grading close
  const [Y, M, Dd] = date.split('-').map(Number), resDay = new Date(Date.UTC(Y, M - 1, Dd));
  let prev = new Date(resDay); do { prev = new Date(prev.getTime() - 864e5) } while ([0, 6].includes(prev.getUTCDay()));
  const UTCOFF = -5, at = (d, h) => d.getTime() + (h - UTCOFF) * 3600e3, T0 = at(prev, 16), T1c = at(resDay, 16), OPEN = at(resDay, 9.5);
  let T1 = T1c, provisional = false;
  const rounds = [];
  for (const r of tonight) {
    const t = g(r, 'TICKER').toUpperCase(); if (!CO[t]) throw new Error('no name and logo for ' + t + ' in prep-close.js CO');
    for (const a of AIS) if (!side(r, a)) throw new Error(`R${g(r, 'ROUND')} ${t}: ${a[1]} has no side in the sheet`);
    let move = parseFloat(g(r, 'ACTUAL MOVE (%)')), src = 'the sheet';
    if (!isFinite(move) && !PREVIEW) { if (Date.now() < T1c + 20 * 60e3) throw new Error(`R${g(r, 'ROUND')} ${t}: no move in the sheet, and TradingView's close is final only from 4:20 pm New York`);
      const q = await tv(t); move = q.move; src = `TradingView (close ${q.close}, change ${q.move}%)` }
    const y = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${SYM(t)}?interval=5m&period1=${Math.floor(T0 / 1e3) - 3600}&period2=${Math.floor(Math.min(T1c, Date.now()) / 1e3) + 600}&includePrePost=true`, { headers: { 'user-agent': 'Mozilla/5.0' } }).then(x => x.json());
    const j = y.chart.result[0], cl = j.indicators.quote[0].close, b = j.timestamp.map((x, i) => [x * 1e3, cl[i]]).filter(x => x[1] != null);
    const near = ms => b.reduce((p, x) => Math.abs(x[0] - ms) < Math.abs(p[0] - ms) ? x : p), p0 = near(T0 - 300e3);
    if (Math.abs(p0[0] - (T0 - 300e3)) > 600e3) throw new Error(t + ': no price at the close before');
    let end = T1c - 300e3, pend = near(end), note;
    if (!isFinite(move)) { if (!PREVIEW) throw new Error(`R${g(r, 'ROUND')} ${t} is not graded in the sheet yet (run with --preview for a mockup)`);
      pend = b.at(-1); end = pend[0]; move = +((pend[1] / p0[1] - 1) * 100).toFixed(2); provisional = true; T1 = Math.min(T1, end + 300e3);
      note = `PREVIEW: provisional move ${move}% from the price at ${new Date(end + 300e3).toISOString()}` }
    const hm = (pend[1] / p0[1] - 1) * 100; let pts = null;
    if (Math.abs(hm - move) <= Math.max(1.5, .15 * Math.abs(move))) { const k = move / hm;
      pts = b.filter(x => x[0] > T0 - 300e3 && x[0] < end).map(x => [Math.round((x[0] + 300e3 - T0) / 60e3), +((x[1] / p0[1] - 1) * 100 * k).toFixed(3)]);
      pts.unshift([0, 0]); pts.push([Math.round((end + 300e3 - T0) / 60e3), move]); note = note || `move from ${src}; path Yahoo ${t} 5m with pre and post, close to close ${hm.toFixed(2)}%, scaled x${k.toFixed(4)} onto ${move}%` }
    else note = `move from ${src}; Yahoo ${t} moved ${hm.toFixed(2)}% against ${move}%: path refused, only the two closes`;
    const calls = AIS.map(a => { const s = side(r, a), p = pnl(s, move); return { k: a[0], side: s, call: mag(r, a) * (s === 'LONG' ? 1 : -1), pnl: p, right: p > 0 } });
    rounds.push({ n: +g(r, 'ROUND'), s2n: +g(r, 'ROUND') - SEASON1_LAST, ticker: SYM(t), co: CO[t][0], logo: 'data/' + CO[t][1], move, pct: (move < 0 ? '−' : '+') + Math.abs(move).toFixed(2) + '%', path: pts, pathNote: note, calls });
  }
  rounds.sort((a, b) => a.n - b.n);
  const night = Object.fromEntries(AIS.map(a => [a[0], rounds.reduce((s, r) => s + r.calls.find(c => c.k === a[0]).pnl, 0)]));
  const season1 = Object.fromEntries(AIS.map(a => [a[0], season0[a[0]] + night[a[0]]]));
  const ord = o => AIS.map(a => a[0]).sort((a, b) => o[b] - o[a]);
  const DAYS = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  // the clean end: provisional paths end at the latest price, so every path is cut at the earliest of their ends
  const total = Math.round((T1 - T0) / 60e3); if (provisional) rounds.forEach(r => { if (r.path) { r.path = r.path.filter(p => p[0] <= total); if (r.path.at(-1)[0] < total) r.path.push([total, r.path.at(-1)[1]]); r.move = r.path.at(-1)[1]; r.pathNote = `PREVIEW: provisional move ${r.move}% at ${new Date(T1).toISOString()}, the earliest latest price of the night`; r.pct = (r.move < 0 ? '−' : '+') + Math.abs(r.move).toFixed(2) + '%'; r.calls.forEach(c => { c.pnl = Math.round((c.side === 'LONG' ? 1 : -1) * r.move * 1000); c.right = c.pnl > 0 }) } });
  if (provisional) { AIS.forEach(a => { night[a[0]] = rounds.reduce((s, r) => s + r.calls.find(c => c.k === a[0]).pnl, 0); season1[a[0]] = season0[a[0]] + night[a[0]] }) }
  const D = { date, day: DAYS[resDay.getUTCDay()], day0: DAYS[prev.getUTCDay()].slice(0, 3), day1: DAYS[resDay.getUTCDay()].slice(0, 3), preview: provisional,
    previewAt: provisional ? new Date(T1).toISOString() : null, total, open: OPEN < T1 ? Math.round((OPEN - T0) / 60e3) : null,
    ais: AIS.map(a => ({ k: a[0], name: a[1] })), rounds, night, season0, season1, before, after: before + rounds.length,
    order: ord(season1), order0: ord(season0), nightOrder: ord(night) };
  // checks: the season adds up, every P&L is side x move x $1,000
  for (const a of AIS) { if (season1[a[0]] !== season0[a[0]] + night[a[0]]) throw new Error('season sum fails for ' + a[0]);
    if (night[a[0]] !== rounds.reduce((s, r) => { const c = r.calls.find(x => x.k === a[0]); return s + Math.round((c.side === 'LONG' ? 1 : -1) * r.move * 1000) }, 0)) throw new Error('night sum fails for ' + a[0]) }
  fs.writeFileSync(path.join(OUT, `close-${date}.json`), JSON.stringify(D)); fs.writeFileSync(path.join(OUT, `close-${date}-sheet.csv`), text);
  const $ = v => (v < 0 ? '−' : '+') + '$' + Math.abs(v).toLocaleString('en-US');
  console.log(`${D.day} ${date} close${provisional ? ' (PREVIEW, provisional moves at ' + D.previewAt + ')' : ''}: ${rounds.length} rounds, Season 2 trades ${before} -> ${D.after}`);
  for (const r of rounds) { console.log(`  R${r.n} (S2 ${r.s2n}) ${r.co} ${r.ticker} ${r.pct}  path: ${r.pathNote}`); console.log('    ' + r.calls.map(c => `${c.k} ${c.side} ${$(c.pnl)}`).join(' · ')) }
  for (const k of D.order) console.log(`  ${k.padEnd(7)} night ${$(night[k]).padStart(10)}  season ${$(season0[k]).padStart(10)} -> ${$(season1[k]).padStart(10)}`);
})().catch(e => { console.error('STOP: ' + e.message); process.exit(1) });
