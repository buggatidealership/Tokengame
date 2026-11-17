// node prep-wrap.js : every number for the Season 1 conclusion video (wrap.html), from ez-data.js only -> data/wrap.json.
// $100,000 flat on every trade: P&L = side x move% x $1,000 (the site's rule). A W is a call on the right side of the move.
// final:false while any round of the sheet is still ungraded: the video then prints DRAFT and the count of graded rounds.
const fs = require('fs'), vm = require('vm'), path = require('path');
const EZ = path.resolve(__dirname, '../../..'), OUT = path.join(__dirname, 'data'); fs.mkdirSync(OUT, { recursive: true });
const ctx = {}; vm.createContext(ctx); vm.runInContext(fs.readFileSync(EZ + '/ez-data.js', 'utf8') + ';this.SHEET=SHEET;this.SHEET_HEADER=SHEET_HEADER;this.TICKERS=TICKERS;this.CO_LOGOS=CO_LOGOS', ctx);
const H = ctx.SHEET_HEADER.map(h => String(h).trim().toUpperCase()), g = (r, k) => String(r[H.indexOf(k)] == null ? '' : r[H.indexOf(k)]).trim();
const AIS = [['GPT', 'GPT'], ['KIMI', 'Kimi'], ['CLAUDE', 'Claude'], ['GROK', 'Grok']];
const all = ctx.SHEET.filter(r => +g(r, 'ROUND')).sort((a, b) => +g(a, 'ROUND') - +g(b, 'ROUND'));
const mv = r => parseFloat(g(r, 'ACTUAL MOVE (%)')), graded = all.filter(r => isFinite(mv(r)));
const side = (r, k) => ({ UP: 1, DOWN: -1 })[g(r, k + ' DIR').toUpperCase()] || 0;
const name = t => ctx.TICKERS[t] || t;
const S = {}, rec = {}; AIS.forEach(([k]) => { S[k] = [0]; rec[k] = { w: 0, l: 0, calls: 0 } });
const trades = [], lead = []; let prevLead = null;
graded.forEach((r, i) => { const m = mv(r), t = g(r, 'TICKER').toUpperCase(), n = +g(r, 'ROUND');
  AIS.forEach(([k]) => { const s = side(r, k), p = Math.round(s * m * 1000); S[k].push(S[k][i] + p); if (s && m !== 0) { rec[k].calls++; (s > 0) === (m > 0) ? rec[k].w++ : rec[k].l++ } if (s) trades.push({ k, n, t, p, s, i: i + 1 }) });
  const top = AIS.map(x => x[0]).sort((a, b) => S[b][i + 1] - S[a][i + 1])[0]; if (top !== prevLead && S[top][i + 1] !== 0) { lead.push({ i: i + 1, n, k: top }); prevLead = top } });
const order = AIS.map(x => x[0]).sort((a, b) => S[b].at(-1) - S[a].at(-1));
const ext = sign => { const best = trades.reduce((a, b) => sign * b.p > sign * a.p ? b : a), same = trades.filter(x => x.n === best.n && x.p === best.p), L = ctx.CO_LOGOS[best.t]; let logo = null;
  if (L) { fs.copyFileSync(EZ + '/media/' + (L.f || L), path.join(OUT, `logo-w${sign > 0 ? 'in' : 'loss'}.png`)); logo = `data/logo-w${sign > 0 ? 'in' : 'loss'}.png` }
  return { p: best.p, n: best.n, i: best.i, t: best.t, co: name(best.t), move: mv(graded[best.i - 1]), side: best.s > 0 ? 'LONG' : 'SHORT', ais: same.map(x => x.k), logo } };
const D = { rounds: graded.length, total: all.length, final: graded.length === all.length, last: +g(graded.at(-1), 'ROUND'), lastCo: name(g(graded.at(-1), 'TICKER').toUpperCase()), s: S, order,
  ai: order.map((k, j) => ({ k, name: AIS.find(x => x[0] === k)[1], rank: j + 1, pnl: S[k].at(-1), w: rec[k].w, l: rec[k].l, calls: rec[k].calls, hit: Math.round(rec[k].w / Math.max(1, rec[k].w + rec[k].l) * 100) })),
  win: ext(1), loss: ext(-1), lead, peak: order.map(k => ({ k, hi: Math.max(...S[k]), lo: Math.min(...S[k]) })) };
fs.writeFileSync(path.join(OUT, 'wrap.json'), JSON.stringify(D));
console.log(`${D.rounds} of ${D.total} rounds graded${D.final ? ' (final)' : ' (DRAFT)'} · through R${D.last} ${D.lastCo}`);
D.ai.forEach(a => console.log(`  #${a.rank} ${a.name.padEnd(7)} ${String(a.pnl).padStart(8)}  ${a.w}-${a.l}  ${a.hit}%  (${a.calls} calls)`));
console.log(`  biggest win  ${D.win.p} R${D.win.n} ${D.win.co} ${D.win.side} (${D.win.ais.join(', ')}), move ${D.win.move}%`);
console.log(`  biggest loss ${D.loss.p} R${D.loss.n} ${D.loss.co} ${D.loss.side} (${D.loss.ais.join(', ')}), move ${D.loss.move}%`);
console.log('  lead changes: ' + D.lead.map(x => `R${x.n} ${x.k}`).join(' · '));
