// node data.js : the season's flat P&L after every graded round, per AI, from ez-data.js only -> series.json
// ($100,000 on every trade: P&L = side x move% x $1,000; the same rule as the site and the outcome videos).
const fs = require('fs'), vm = require('vm'), path = require('path');
const EZ = path.resolve(__dirname, '../../..');
const ctx = {}; vm.createContext(ctx); vm.runInContext(fs.readFileSync(EZ + '/ez-data.js', 'utf8') + ';this.SHEET=SHEET;this.SHEET_HEADER=SHEET_HEADER', ctx);
const H = ctx.SHEET_HEADER.map(h => String(h).trim().toUpperCase()), g = (r, k) => String(r[H.indexOf(k)] == null ? '' : r[H.indexOf(k)]).trim();
const AIS = ['GROK', 'CLAUDE', 'GPT', 'KIMI'];
const rows = ctx.SHEET.filter(r => +g(r, 'ROUND') && isFinite(parseFloat(g(r, 'ACTUAL MOVE (%)'))) && parseFloat(g(r, 'ACTUAL MOVE (%)')) !== 0).sort((a, b) => +g(a, 'ROUND') - +g(b, 'ROUND'));
const out = { rounds: rows.length, last: +g(rows.at(-1), 'ROUND'), s: {} };
AIS.forEach(k => { let v = 0; out.s[k] = [0]; rows.forEach(r => { const d = g(r, k + ' DIR').toUpperCase(), m = parseFloat(g(r, 'ACTUAL MOVE (%)')); v += Math.round((d === 'UP' ? 1 : d === 'DOWN' ? -1 : 0) * m * 1000); out.s[k].push(v) }) });
fs.writeFileSync(path.join(__dirname, 'series.json'), JSON.stringify(out));
console.log(out.rounds, 'graded rounds, through R' + out.last, AIS.map(k => k + ' ' + out.s[k].at(-1)).join(' · '));
