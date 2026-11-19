// node prep-s2d.js : data/s2d.json for the Season 2 announcement (s2d.html), from ez-data.js, rounds 1 to 112 (Season 1).
// For each AI: its hit rate after every round in order, as the site draws it ((right + 1) / (calls + 2), so every line starts at 50%;
// a round it skipped repeats its last value), and its final record (right, wrong, the raw rate). Season 2's first round from the sheet
// (row 113, Intuit, held off the Season 1 record): typed here from the sheet as read on 2026-11-19 (sync_sheet.py's HELD rows).
const fs = require('fs'), vm = require('vm'), c = {}; c.window = c; vm.createContext(c);
vm.runInContext(fs.readFileSync(__dirname + '/../../../ez-data.js', 'utf8'), c);
const R = c.ROUNDS.filter(r => r.n <= 112 && r.a != null).sort((a, b) => a.n - b.n), K = ['GROK', 'CLAUDE', 'GPT', 'KIMI'];
const ai = K.map(k => { let r = 0, n = 0; const s = [.5], rr = [null];
  for (const rd of R) { const c = rd.calls.find(x => x[0] === k); if (c && /UP|DOWN/.test(c[1])) { n++; if (/UP/.test(c[1]) === rd.a > 0) r++ } s.push((r + 1) / (n + 2)); rr.push(n ? +(r / n).toFixed(5) : null) }
  return { k, w: r, l: n - r, hit: 100 * r / n, s: s.map(v => +v.toFixed(5)), rr } });
const out = { rounds: R.length, ai, releg: ai.filter(a => a.hit < 50).map(a => a.k),
  s2r1: { n: 113, co: 'Intuit', tk: 'INTU', calls: { GPT: ['LONG', 4.5], CLAUDE: ['SHORT', 4], GROK: ['SHORT', 2.4], GEMINI: ['LONG', 5], QWEN: ['LONG', 4] } } };
fs.mkdirSync(__dirname + '/data', { recursive: true }); fs.writeFileSync(__dirname + '/data/s2d.json', JSON.stringify(out));
console.log(out.rounds, 'rounds;', ai.map(a => `${a.k} ${a.w}-${a.l} ${a.hit.toFixed(2)}% (line ends ${(100 * a.s[a.s.length - 1]).toFixed(1)}, min ${(100 * Math.min(...a.s.slice(3))).toFixed(1)}, max ${(100 * Math.max(...a.s.slice(3))).toFixed(1)})`).join('; '), '; relegated', out.releg);
