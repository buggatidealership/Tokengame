// node w6/d/prep.js : the trade tape of the Season 1 wrap-up, take D (terminal) -> w6/d/trades.json, from ez-data.js only
// (the same reading as prep-wrap.js: $100,000 flat on every trade, P&L = side x move% x $1,000). One row per graded round, in order:
// n round, t ticker (exchange suffix dropped for the tape), m the stock's move in %, s each AI's side (1 long, -1 short, 0 no trade), p each AI's P&L.
const fs = require('fs'), vm = require('vm'), path = require('path');
const EZ = path.resolve(__dirname, '../../../../..'), ctx = {}; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(EZ + '/ez-data.js', 'utf8') + ';this.SHEET=SHEET;this.SHEET_HEADER=SHEET_HEADER', ctx);
const H = ctx.SHEET_HEADER.map(h => String(h).trim().toUpperCase()), g = (r, k) => String(r[H.indexOf(k)] == null ? '' : r[H.indexOf(k)]).trim();
const AIS = ['GPT', 'KIMI', 'CLAUDE', 'GROK'], mv = r => parseFloat(g(r, 'ACTUAL MOVE (%)'));
const rows = ctx.SHEET.filter(r => +g(r, 'ROUND')).sort((a, b) => +g(a, 'ROUND') - +g(b, 'ROUND')).filter(r => isFinite(mv(r)));
const side = (r, k) => ({ UP: 1, DOWN: -1 })[g(r, k + ' DIR').toUpperCase()] || 0;
const out = rows.map(r => { const m = mv(r), s = {}, p = {}; AIS.forEach(k => { s[k] = side(r, k); p[k] = Math.round(s[k] * m * 1000) }); return { n: +g(r, 'ROUND'), t: g(r, 'TICKER').toUpperCase().split('.')[0], m, s, p } });
// the tape must add up to the wrap-up's own totals
const W = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/wrap.json'), 'utf8'));
AIS.forEach(k => { const sum = out.reduce((a, x) => a + x.p[k], 0); if (sum !== W.s[k].at(-1) || out.length + 1 !== W.s[k].length) throw new Error(k + ' tape ' + sum + ' != wrap.json ' + W.s[k].at(-1)) });
fs.writeFileSync(path.join(__dirname, 'trades.json'), JSON.stringify(out)); console.log(out.length + ' rounds -> w6/d/trades.json; totals match data/wrap.json');
