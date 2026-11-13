// node prep.js <round> : every number for one round's outcome video, from ez-data.js only (nothing typed by hand), written to
// data/r<round>.json, with the company's logo copied beside it. Asserts season before + round = after for every AI.
// Price path: Hyperliquid 5-minute candles when the company has a market there (the map in v53-terminal.html), from the close before
// the grading day to the grading close, scaled onto the sheet's move; refused (path:null) when Hyperliquid's own move is too far from
// the sheet's. Without a path the video shows only the two real closes: no invented intraday prices.
const fs = require('fs'), vm = require('vm'), path = require('path');
const n = +process.argv[2]; if (!n) { console.error('usage: node prep.js <round>'); process.exit(1) }
const EZ = path.resolve(__dirname, '../../..'), OUT = path.join(__dirname, 'data'); fs.mkdirSync(OUT, { recursive: true });
const ctx = {}; vm.createContext(ctx); vm.runInContext(fs.readFileSync(EZ + '/ez-data.js', 'utf8') + ';this.SHEET=SHEET;this.SHEET_HEADER=SHEET_HEADER;this.TICKERS=TICKERS;this.CO_LOGOS=CO_LOGOS', ctx);
const H = ctx.SHEET_HEADER.map(h => String(h).trim().toUpperCase()), col = k => H.indexOf(k);
const g = (r, k) => String(r[col(k)] == null ? '' : r[col(k)]).trim();
const AIS = [['GPT', 'GPT'], ['KIMI', 'Kimi'], ['CLAUDE', 'Claude'], ['GROK', 'Grok']];
const rows = ctx.SHEET.filter(r => +g(r, 'ROUND'));
const row = rows.find(r => +g(r, 'ROUND') === n); if (!row) throw new Error('no round ' + n);
const move = parseFloat(g(row, 'ACTUAL MOVE (%)')); if (!isFinite(move) || move === 0) throw new Error('round ' + n + ' is not graded');
const side = (r, k) => { const d = g(r, k + ' DIR').toUpperCase(); return d === 'UP' ? 'LONG' : d === 'DOWN' ? 'SHORT' : 'NO CALL' };
const pnl = (s, m) => Math.round((s === 'LONG' ? 1 : s === 'SHORT' ? -1 : 0) * m * 1000);
// the season: every graded round before this one, then this one
const season0 = {}, season1 = {}; AIS.forEach(([k]) => season0[k] = 0);
for (const r of rows) { const rn = +g(r, 'ROUND'), m = parseFloat(g(r, 'ACTUAL MOVE (%)')); if (!isFinite(m) || rn >= n) continue; AIS.forEach(([k]) => season0[k] += pnl(side(r, k), m)) }
const ai = AIS.map(([k, name]) => { const s = side(row, k), p = pnl(s, move); season1[k] = season0[k] + p;
  if (season1[k] !== season0[k] + p) throw new Error('season sum fails for ' + k);
  return { k, name, side: s, call: s === 'NO CALL' ? null : +g(row, k + ' MAG (%)').replace(/^[-−]/, '') * (s === 'LONG' ? 1 : -1), pnl: p, right: s !== 'NO CALL' && p > 0 } });
// the wording rules
const W = ['ZERO', 'ONE', 'TWO', 'THREE', 'FOUR'], Wl = ['zero', 'one', 'two', 'three', 'four'];
const callers = ai.filter(a => a.side !== 'NO CALL'), right = ai.filter(a => a.right), wrong = callers.filter(a => !a.right);
const longs = callers.filter(a => a.side === 'LONG').length, shorts = callers.length - longs;
const winSide = move > 0 ? 'LONG' : 'SHORT', loseSide = move > 0 ? 'SHORT' : 'LONG';
const amt = Math.abs(pnl(winSide, move)), $ = v => (v < 0 ? '−' : '+') + '$' + Math.abs(v).toLocaleString('en-US');
const pct = (move > 0 ? '+' : '−') + Math.abs(move).toFixed(2) + '%';
const list = a => a.length === 1 ? a[0].name : a.length === 2 ? a[0].name + ' and ' + a[1].name : a.slice(0, -1).map(x => x.name).join(', ') + ' and ' + a.at(-1).name;
const nC = callers.length, all = nC === 4 ? 'All four' : 'All ' + Wl[nC];
let line1, line3, kind;
if (right.length === 0) { kind = 'all-wrong'; line1 = `${all} lost ${$(-amt)}${nC > 1 ? ' each' : ''}`; line3 = `ALL ${W[nC]} WERE ${loseSide}`.replace('ALL FOUR', 'ALL FOUR') }
else if (right.length === nC) { kind = 'unanimous'; line1 = nC === 1 ? `${right[0].name} made ${$(amt)}` : `${all} made ${$(amt)} each`; line3 = `${nC} FOR ${nC} · ALL ${winSide}` }
else if (right.length === 1) { kind = 'lone'; line1 = `${right[0].name} made ${$(amt)}`; line3 = `THE ONLY ${winSide} OF THE ${W[nC]}` }
else if (wrong.length === 1) { kind = 'majority'; line1 = `${list(right)} made ${$(amt)} each`; line3 = `${W[right.length]} ${winSide}S BANKED · ${wrong[0].name.toUpperCase()} WAS THE ONLY ${loseSide}` }
else { kind = 'split'; line1 = `${list(right)} made ${$(amt)} each`; line3 = `THE ${W[right.length]} ${winSide}S WIN A ${longs}-${shorts} SPLIT` }
const split = longs === nC ? `ALL ${nC} LONG` : shorts === nC ? `ALL ${nC} SHORT` : `${longs} LONG vs ${shorts} SHORT`;
// the clock: US listings grade at 4:00 pm New York; others named here (exchange close, local time, UTC offset in November)
const t = g(row, 'TICKER').toUpperCase();
const EXCH = { DE: ['FRANKFURT', 17.5, 9, 1], L: ['LONDON', 16.5, 8, 0], SW: ['ZURICH', 17.5, 9, 1], AS: ['AMSTERDAM', 17.5, 9, 1], T: ['TOKYO', 15.5, 9, 9], KS: ['SEOUL', 15.5, 9, 9], TW: ['TAIPEI', 13.5, 9, 8] };
const sfx = (t.match(/\.([A-Z]+)$/) || [])[1]; const [tz, closeH, openH, utcOff] = EXCH[sfx] || (/^(SIEMENS|SIE)/.test(t) ? EXCH.DE : ['NEW YORK', 16, 9.5, -5]);
const res = g(row, 'RESOLUTION DATE/TIME'), [mm, dd, yy] = res.split('/').map(Number), resDay = new Date(Date.UTC(2000 + yy, mm - 1, dd));
let prev = new Date(resDay); do { prev = new Date(prev.getTime() - 864e5) } while ([0, 6].includes(prev.getUTCDay()));
const at = (d, h) => d.getTime() + (h - utcOff) * 3600e3; // local exchange hour -> UTC ms
const T0 = at(prev, closeH), T1 = at(resDay, closeH), OPEN = at(resDay, openH);
const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const hl = (() => { const m = fs.readFileSync(EZ + '/v53-terminal.html', 'utf8').match(/var HL=(\{[^;]*\});/); return m ? JSON.parse(m[1]) : {} })()[t];
const rep = (() => { const m = fs.readFileSync(EZ + '/v53-terminal.html', 'utf8').match(new RegExp('[{,]"?' + t.replace('.', '\\.') + '"?:\\{t:"([^"]+)"')); return m ? Date.parse(m[1]) : null })();
(async () => {
  let pathPts = null, note = 'no Hyperliquid market: only the two closes are shown';
  if (hl) {
    const coin = (hl[1] === 'xyz' ? 'xyz:' : hl[1] + ':') + hl[0];
    const r = await fetch('https://api.hyperliquid.xyz/info', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ type: 'candleSnapshot', req: { coin, interval: '5m', startTime: T0 - 600e3, endTime: T1 } }) });
    const b = (await r.json()).map(x => [x.t, +x.c]);
    const near = ms => b.reduce((p, x) => Math.abs(x[0] - ms) < Math.abs(p[0] - ms) ? x : p);
    if (b.length > 50) { const p0 = near(T0 - 300e3)[1], p1 = near(T1 - 300e3)[1], hm = (p1 / p0 - 1) * 100;
      if (Math.abs(hm - move) <= Math.max(1.5, .15 * Math.abs(move))) { const k = move / hm;
        pathPts = b.filter(x => x[0] > T0 - 300e3 && x[0] < T1 - 300e3).map(x => [Math.round((x[0] + 300e3 - T0) / 60e3), +((x[1] / p0 - 1) * 100 * k).toFixed(3)]);
        pathPts[0] = [0, 0]; pathPts.push([(T1 - T0) / 60e3, move]); note = `Hyperliquid ${coin} 5m, close to close ${hm.toFixed(2)}%, scaled x${k.toFixed(4)} onto the sheet's ${move}%` }
      else note = `Hyperliquid ${coin} moved ${hm.toFixed(2)}% against the sheet's ${move}%: path refused` }
  }
  const D = { n, ticker: t, co: ctx.TICKERS[t] || t, move, pct, tz, closeLabel: (closeH % 1 ? Math.floor(closeH) - 12 + ':30' : closeH - 12 + ':00') + ' PM',
    day0: DAYS[prev.getUTCDay()], day1: DAYS[resDay.getUTCDay()], total: (T1 - T0) / 60e3, open: (OPEN - T0) / 60e3, report: rep ? Math.round((rep - T0) / 60e3) : null,
    utcOff, closeH, path: pathPts, pathNote: note, ai, season0, season1, split, longs, shorts, kind, amt, line1, line3,
    winners: right.map(a => a.k), order: [...AIS.map(x => x[0])].sort((a, b) => season1[b] - season1[a]), order0: [...AIS.map(x => x[0])].sort((a, b) => season0[b] - season0[a]) };
  const L = ctx.CO_LOGOS[t]; if (L) { fs.copyFileSync(EZ + '/media/' + (L.f || L), path.join(OUT, 'logo-' + n + '.png')); D.logo = 'data/logo-' + n + '.png' }
  fs.writeFileSync(path.join(OUT, 'r' + n + '.json'), JSON.stringify(D));
  console.log(`R${n} ${D.co} ${pct} · ${split} · ${kind} · winners ${D.winners.join(',') || 'none'}\n  ${line1}\n  THIS ROUND · ${D.co.toUpperCase()} ${pct}\n  ${line3}\n  path: ${note}`);
  for (const a of ai) console.log(`  ${a.name.padEnd(7)} ${a.side.padEnd(8)} ${$(a.pnl).padStart(10)}  season ${$(season0[a.k]).padStart(10)} -> ${$(season1[a.k]).padStart(10)}`);
})();
