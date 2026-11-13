// node prep-calls.js <round> : every number for a round's prediction video (the calls, before the result), from ez-data.js only,
// written to data/c<round>.json. The season is every graded round before this one ($100K flat). The run-in is the stock's real
// path over the five sessions before the report (Hyperliquid 1h candles, in % from the first close); null when the company has
// no Hyperliquid market: nothing is invented.
const fs = require('fs'), vm = require('vm'), path = require('path');
const n = +process.argv[2]; if (!n) { console.error('usage: node prep-calls.js <round>'); process.exit(1) }
const EZ = path.resolve(__dirname, '../../..'), OUT = path.join(__dirname, 'data'); fs.mkdirSync(OUT, { recursive: true });
const ctx = {}; vm.createContext(ctx); vm.runInContext(fs.readFileSync(EZ + '/ez-data.js', 'utf8') + ';this.SHEET=SHEET;this.SHEET_HEADER=SHEET_HEADER;this.TICKERS=TICKERS;this.CO_LOGOS=CO_LOGOS', ctx);
const H = ctx.SHEET_HEADER.map(h => String(h).trim().toUpperCase()), g = (r, k) => String(r[H.indexOf(k)] == null ? '' : r[H.indexOf(k)]).trim();
const AIS = [['GPT', 'GPT'], ['KIMI', 'Kimi'], ['CLAUDE', 'Claude'], ['GROK', 'Grok']];
const rows = ctx.SHEET.filter(r => +g(r, 'ROUND')), row = rows.find(r => +g(r, 'ROUND') === n); if (!row) throw new Error('no round ' + n);
const side = (r, k) => ({ UP: 'LONG', DOWN: 'SHORT' })[g(r, k + ' DIR').toUpperCase()] || 'NO CALL';
const season = {}; AIS.forEach(([k]) => season[k] = 0);
for (const r of rows) { const m = parseFloat(g(r, 'ACTUAL MOVE (%)')); if (!isFinite(m) || +g(r, 'ROUND') >= n) continue; AIS.forEach(([k]) => { const s = side(r, k); season[k] += Math.round((s === 'LONG' ? 1 : s === 'SHORT' ? -1 : 0) * m * 1000) }) }
const ai = AIS.map(([k, name]) => { const s = side(row, k); return { k, name, side: s, size: s === 'NO CALL' ? null : Math.abs(parseFloat(g(row, k + ' MAG (%)').replace('−', '-'))) } });
const callers = ai.filter(a => a.side !== 'NO CALL'); if (!callers.length) throw new Error('round ' + n + ' has no calls yet');
const longs = callers.filter(a => a.side === 'LONG').length, shorts = callers.length - longs, nC = callers.length;
const split = longs === nC ? `ALL ${nC} LONG` : shorts === nC ? `ALL ${nC} SHORT` : `${longs} LONG vs ${shorts} SHORT`;
const kind = longs === 0 || shorts === 0 ? 'unanimous' : Math.min(longs, shorts) === 1 ? 'lone' : 'clash';
const lone = kind === 'lone' ? callers.find(a => a.side === (longs === 1 ? 'LONG' : 'SHORT')).k : null;
const t = g(row, 'TICKER').toUpperCase();
const EXCH = { DE: ['FRANKFURT', 17.5, 1, 'CET'], L: ['LONDON', 16.5, 0, 'GMT'], SW: ['ZURICH', 17.5, 1, 'CET'], AS: ['AMSTERDAM', 17.5, 1, 'CET'], T: ['TOKYO', 15.5, 9, 'JST'], KS: ['SEOUL', 15.5, 9, 'KST'], TW: ['TAIPEI', 13.5, 8, 'CST'] };
const sfx = (t.match(/\.([A-Z]+)$/) || [])[1]; const [tz, closeH, utcOff, zone] = EXCH[sfx] || ['NEW YORK', 16, -5, 'ET'];
const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'], MON = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const hr = h => { const Hh = Math.floor(h), mi = Math.round((h % 1) * 60); return (Hh % 12 || 12) + (mi ? ':' + String(mi).padStart(2, '0') : '') + (Hh >= 12 ? ' PM' : ' AM') };
const res = g(row, 'RESOLUTION DATE/TIME'); let close = null, resDay = null;
if (/^\d+\/\d+\/\d+/.test(res)) { const [mm, dd, yy] = res.split('/').map(Number); resDay = new Date(Date.UTC(2000 + yy, mm - 1, dd)); close = `${DAYS[resDay.getUTCDay()]} ${hr(closeH)} ${zone}` }
const html = fs.readFileSync(EZ + '/v53-terminal.html', 'utf8');
const rep = (() => { const m = html.match(new RegExp('[{,]"?' + t.replace('.', '\\.') + '"?:\\{t:"([^"]+)"')); return m ? Date.parse(m[1]) : null })();
let report = null; if (rep) { const loc = new Date(rep + utcOff * 3600e3); report = `${DAYS[loc.getUTCDay()]} ${hr(loc.getUTCHours() + loc.getUTCMinutes() / 60)} ${zone}` }
const hl = (() => { const m = html.match(/var HL=(\{[^;]*\});/); return m ? JSON.parse(m[1]) : {} })()[t];
(async () => {
  let run = null, note = 'no Hyperliquid market: no run-in chart';
  // the run-in ends at the last close before the result day (the report is at or after it for US after-close reporters)
  if (hl && resDay) { let prev = new Date(resDay); do { prev = new Date(prev.getTime() - 864e5) } while ([0, 6].includes(prev.getUTCDay()));
    const T0 = prev.getTime() + (closeH - utcOff) * 3600e3, end = rep && rep < T0 ? rep : T0; let d = new Date(prev), k = 0; while (k < 5) { d = new Date(d.getTime() - 864e5); if (![0, 6].includes(d.getUTCDay())) k++ }
    const start = d.getTime() + (closeH - utcOff) * 3600e3, coin = (hl[1] === 'xyz' ? 'xyz:' : hl[1] + ':') + hl[0];
    const r = await fetch('https://api.hyperliquid.xyz/info', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ type: 'candleSnapshot', req: { coin, interval: '1h', startTime: start - 3600e3, endTime: end } }) });
    const b = (await r.json()).map(x => [x.t + 3600e3, +x.c]).filter(x => x[0] >= start && x[0] <= end + 60e3);
    if (b.length > 40) { const p0 = b[0][1]; run = { pts: b.map(x => [+((x[0] - start) / 3600e3).toFixed(2), +((x[1] / p0 - 1) * 100).toFixed(3)]), hours: (end - start) / 3600e3, last: b.at(-1)[1], move: +((b.at(-1)[1] / p0 - 1) * 100).toFixed(2), from: `${DAYS[d.getUTCDay()]} ${MON[d.getUTCMonth()]} ${d.getUTCDate()}` };
      note = `Hyperliquid ${coin} 1h, ${b.length} closes over the 5 sessions into the report, ${run.move}%` } else note = `Hyperliquid ${coin}: too few candles (${b.length})` }
  const order = AIS.map(x => x[0]).sort((a, b) => season[b] - season[a]);
  const D = { n, ticker: t, co: ctx.TICKERS[t] || t, tz, zone, report, close, ai, season, order, split, longs, shorts, kind, lone, run, runNote: note };
  const Lg = ctx.CO_LOGOS[t]; if (Lg) { fs.copyFileSync(EZ + '/media/' + (Lg.f || Lg), path.join(OUT, 'logo-' + n + '.png')); D.logo = 'data/logo-' + n + '.png' }
  fs.writeFileSync(path.join(OUT, 'c' + n + '.json'), JSON.stringify(D));
  console.log(`R${n} ${D.co} · ${split} · ${kind}${lone ? ' (' + lone + ')' : ''} · report ${report} · graded ${close}\n  ${note}`);
  for (const a of ai) console.log(`  ${a.name.padEnd(7)} ${a.side.padEnd(8)} ${a.size == null ? '' : a.size + '%'}  season ${season[a.k]}`);
})();
