// node make.js : writes a1..a3.html and b1..b3.html (X post images as EZ Terminal screens) and the post texts beside the PNGs.
// Every number is read from the close JSON and calls.csv; nothing is typed by hand.
const fs = require('fs'), path = require('path');
const HERE = __dirname, EZ = path.resolve(HERE, '../../..'), DOPA = path.resolve(HERE, '../dopa');
const J = JSON.parse(fs.readFileSync(DOPA + '/data/close-2026-11-20.json', 'utf8'));
const M5 = JSON.parse(fs.readFileSync(DOPA + '/models5.json', 'utf8'));
// Season 2 marks: Gemini sky blue, Qwen violet (the Season 2 terminal mockups, s2site/s2.js)
M5.GEMINI.fg = '#7dd3fc'; M5.QWEN.fg = '#a78bfa';
const NAME = Object.fromEntries(J.ais.map(a => [a.k, a.name]));
const EZLOGO = fs.readFileSync(DOPA + '/ezlogo.svg', 'utf8').replace(/width="400" height="400"/, '');

// ---- calls.csv (quoted CSV)
function csv(s) { const R = []; let row = [], f = '', q = false; for (let i = 0; i < s.length; i++) { const c = s[i];
  if (q) { if (c === '"') { if (s[i + 1] === '"') { f += '"'; i++ } else q = false } else f += c }
  else if (c === '"') q = true; else if (c === ',') { row.push(f); f = '' } else if (c === '\n') { row.push(f); R.push(row); row = []; f = '' } else if (c !== '\r') f += c }
  if (f || row.length) { row.push(f); R.push(row) } const H = R.shift(); return R.filter(r => r.length > 1).map(r => Object.fromEntries(H.map((h, i) => [h, r[i]]))) }
const CALLS = csv(fs.readFileSync(EZ + '/data/s2-calls/calls.csv', 'utf8'));
const KEY = { GPT: 'GPT', Claude: 'CLAUDE', Grok: 'GROK', Gemini: 'GEMINI', Qwen: 'QWEN' };
const row = (t, k) => CALLS.find(c => c.ticker === t && KEY[c.model] === k);
// cross-check the CSV against the JSON (side and called move must agree)
J.rounds.forEach(r => r.calls.forEach(c => { const x = row(r.ticker, c.k); if (!x) throw new Error('csv missing ' + r.ticker + ' ' + c.k);
  if (x.side !== c.side) throw new Error('side mismatch ' + r.ticker + ' ' + c.k);
  if (Math.abs(+x.size_pct - Math.abs(c.call)) > 1e-9) throw new Error('call mismatch ' + r.ticker + ' ' + c.k);
  c.conf = +x.confidence_pct; c.why = x.why }));
const RD = Object.fromEntries(J.rounds.map(r => [r.ticker, r]));

// ---- formats (true minus sign, thousands separators as on the site)
const MINUS = '−';
const pctS = v => (v < 0 ? MINUS : '+') + String(Math.abs(v)).replace(/^(\d+)$/, '$1') + '%';
const money = v => (v < 0 ? MINUS : '+') + '$' + Math.abs(v).toLocaleString('en-US');
const movePct = r => (r.move < 0 ? MINUS : '+') + Math.abs(r.move).toFixed(2) + '%';
// the AI's own words with punctuation turned into line breaks (the image rule), hyphens into spaces
const lines = s => s.replace(/(\w)-(\w)/g, '$1 $2').split(/[.,;:]\s+|[.]$/).map(x => x.trim()).filter(Boolean);

const mark = (k, s, cls = '') => { const m = M5[k]; return `<span class="ai ${cls}" style="width:${s}px;height:${s}px;background:${m.bg}"><svg viewBox="0 0 24 24"><path fill="${m.fg}"${m.fr ? ' fill-rule="' + m.fr + '"' : ''} d="${m.d}"/>${m.dot ? `<path fill="${m.dotc}" d="${m.dot}"/>` : ''}</svg></span>` };
const co = (t, s) => `<span class="co" style="width:${s}px;height:${s}px"><img src="../dopa/${RD[t].logo}" alt=""></span>`;
const side = s => `<span class="chip ${s === 'LONG' ? 'u' : 'd'}">${s}</span>`;

const CSS = `
@font-face{font-family:"Geist Mono";src:url(../dopa/fonts/geistmono.woff2) format("woff2");font-weight:100 900}
:root{--bg:#0e0c0b;--pn:#161312;--pn2:#1d1917;--ln:#2a2522;--tx:#f2ede6;--mu:#8e8680;--mu2:#5f5853;--up:#55d6a2;--dn:#e8576b;--ac:#fdbc2a;--acx:#1a1300;--mono:"Geist Mono",ui-monospace,monospace;--sans:Inter,system-ui,sans-serif}
*{box-sizing:border-box}
html,body{margin:0;width:400px;height:500px;overflow:hidden}
body{color:var(--tx);font-family:var(--sans);-webkit-font-smoothing:antialiased;
 background:radial-gradient(70% 24% at 50% 0%,rgba(46,190,122,.20),transparent 70%),linear-gradient(180deg,#0e5a3a 0%,#0b3d29 8%,#0a2e20 15%,#08190f 27%,#07120e 35%,#060a08 46%,#060a08 84%,#0d0808 95%,#140909 100%)}
.w{padding:0 12px}
.top{display:flex;align-items:center;gap:8px;height:46px}
.top .lg{width:26px;height:26px;flex:none;display:block}.top .lg svg{width:100%;height:100%;display:block}
.top b{font:800 15.5px/1 var(--sans);letter-spacing:.005em;white-space:nowrap}.top b i{font-style:normal}.top .e{color:#03c870}.top .z{color:#ff3a31}
.top .r{margin-left:auto}
.ssn{font:600 10.5px/1 var(--mono);letter-spacing:.1em;color:var(--ac);padding:6px 8px;border-radius:6px;background:rgba(253,188,42,.1);box-shadow:inset 0 0 0 1px rgba(253,188,42,.35)}
.pv{font:700 10.5px/1 var(--mono);letter-spacing:.1em;color:var(--ac);padding:6px 8px;border-radius:6px;border:1px dashed var(--ac);background:#1a160f}
.pn{background:var(--pn);border:1px solid var(--ln);border-radius:12px;overflow:hidden}
.pn+.pn{margin-top:8px}
.ai{border-radius:50%;display:inline-grid;place-items:center;flex:none;box-shadow:0 0 0 1px rgba(242,237,230,.14)}.ai svg{width:58%;height:58%}
.co{display:inline-block;flex:none;border-radius:22%;overflow:hidden}.co img{width:100%;height:100%;display:block}
.chip{display:inline-block;font:700 11px/1 var(--mono);letter-spacing:.06em;padding:5px 7px 4px;border-radius:5px}
.chip.u{background:#173328;color:var(--up)}.chip.d{background:#3a1a20;color:var(--dn)}
.u{color:var(--up)}.d{color:var(--dn)}
.hd{display:flex;align-items:center;gap:9px;padding:11px 14px;border-bottom:1px solid var(--ln);font:500 10.5px/1 var(--mono);letter-spacing:.06em;color:var(--mu);white-space:nowrap}
.hd .r{margin-left:auto;color:var(--tx)}
.st{display:inline-flex;align-items:center;gap:6px;padding:5px 7px;border-radius:6px;font:700 10px/1 var(--mono);letter-spacing:.08em;background:var(--pn2);color:var(--tx);border:1px solid var(--ln)}
.st i{width:6px;height:6px;border-radius:50%;background:var(--mu)}
.st.cl i{background:var(--tx)}
.lab{font:700 11px/1 var(--sans);letter-spacing:.04em;text-transform:uppercase;color:var(--ac)}
.tb{width:100%;border-collapse:collapse}
.tb th{font:600 9.5px/1 var(--sans);letter-spacing:.07em;text-transform:uppercase;color:var(--mu);text-align:left;padding:9px 0 8px;border-bottom:1px solid var(--ln)}
.tb td{padding:0;height:34px;border-bottom:1px solid var(--ln);vertical-align:middle}
.tb tr:last-child td{border-bottom:0}
.tb th:first-child,.tb td:first-child{padding-left:14px}.tb th:last-child,.tb td:last-child{padding-right:14px;text-align:right}
.tb .nm{display:flex;align-items:center;gap:9px;font:600 14.5px/1 var(--sans)}
.tb .n{font:500 14px/1 var(--mono);font-variant-numeric:tabular-nums}
.tb tr.on td{background:var(--pn2)}
.tb tr.on td:first-child{box-shadow:inset 3px 0 0 var(--ac)}
.tb tr.lo td{background:#241417}.tb tr.lo td:first-child{box-shadow:inset 3px 0 0 var(--dn)}
.tb tr.hi td{background:#14211b}.tb tr.hi td:first-child{box-shadow:inset 3px 0 0 var(--up)}
.note{display:flex;flex-wrap:wrap;gap:4px 18px;padding:10px 14px 11px;border-top:1px solid var(--ln);font:400 10.5px/1.4 var(--mono);color:var(--mu)}
mark{background:var(--ac);color:var(--acx);padding:1px 4px;margin:0 -4px;border-radius:3px;-webkit-box-decoration-break:clone;box-decoration-break:clone;font-weight:600}
`;

const top = right => `<div class="top"><span class="lg">${EZLOGO}</span><b><i class="e">E</i>arnings <i class="z">Z</i>eason</b><span class="r">${right}</span></div>`;
const page = (id, extra, body) => `<!doctype html><html><head><meta charset="utf-8"><title>${id}</title><style>${CSS}${extra}</style></head><body><div class="w">${body}</div></body></html>`;

// a message card: the AI's own words, one clause a line, the key clause highlighted
const MSG_CSS = `
.msg .mh{display:flex;align-items:center;gap:8px;padding:9px 14px 0;white-space:nowrap}
.msg .mh b{font:700 14.5px/1 var(--sans)}.msg .mh .co{margin-left:2px}
.msg .mh .cn{font:600 12.5px/1 var(--sans);color:var(--tx)}.msg .mh .tk{font:500 10.5px/1 var(--mono);color:var(--mu)}
.msg .mh .r{margin-left:auto;font:500 9.5px/1 var(--mono);letter-spacing:.07em;color:var(--mu)}
.msg .mb{padding:7px 14px 10px}
.msg .mb p{margin:0;font:400 14.5px/1.42 var(--sans);color:#e6e0d8}
`;
const msg = (t, k, hl) => { const c = RD[t].calls.find(x => x.k === k);
  return `<div class="pn msg"><div class="mh">${mark(k, 26)}<b>${NAME[k]}</b>${side(c.side)}<span class="r">IN ITS OWN WORDS</span></div>
  <div class="mb">${lines(c.why).map(l => `<p>${l.includes(hl) ? l.replace(hl, `<mark>${hl}</mark>`) : l}</p>`).join('')}</div></div>` };

const OUT = {};
// ===================== A1: Intuit, the positions table + Qwen's message (the research's draft)
{ const r = RD.INTU, ord = [...r.calls].sort((a, b) => (a.side === b.side ? b.conf - a.conf : a.side === 'LONG' ? -1 : 1));
  const nL = r.calls.filter(c => c.side === 'LONG').length, nS = r.calls.length - nL;
  OUT.a1 = page('a1', `
.cot{display:flex;align-items:center;gap:11px;padding:12px 14px}
.cot .cn{font:800 21px/1 var(--sans)}.cot .tk{display:block;margin-top:5px;font:500 11px/1 var(--mono);color:var(--mu);letter-spacing:.05em}
.sp{margin-left:auto;display:flex;align-items:center;gap:7px;font:700 24px/1 var(--mono)}.sp i{font:500 12px/1 var(--mono);font-style:normal;color:var(--mu)}
.sp small{display:block;font:700 9.5px/1 var(--mono);letter-spacing:.08em;margin-top:4px;text-align:center}
.sp span{text-align:center}
.tb th:nth-child(2){width:66px}.tb th:nth-child(3){width:86px}
.tb td{height:32px}.tb th{padding:7px 0 6px}.cot{padding:10px 14px}
${MSG_CSS}
.msg .mb p{font-size:14px;line-height:1.38}`,
  top('<span class="ssn">SEASON 2</span>') +
  `<div class="pn"><div class="hd"><span class="st"><i></i>IN PLAY</span><span>TRADE ${r.s2n}</span><span class="r">GRADED FRI AT THE CLOSE</span></div>
   <div class="cot">${co('INTU', 36)}<div><span class="cn">${r.co}</span><span class="tk">${r.ticker}  REPORTS AFTER THE CLOSE</span></div>
     <div class="sp"><span class="u">${nL}<small>LONG</small></span><i>v</i><span class="d">${nS}<small>SHORT</small></span></div></div>
   <table class="tb"><tr><th>AI</th><th>Side</th><th>Called move</th><th>Confidence</th></tr>
   ${ord.map(c => `<tr class="${c.k === 'QWEN' || c.k === 'GROK' ? 'on' : ''}"><td><span class="nm">${mark(c.k, 22)}${NAME[c.k]}</span></td><td>${side(c.side)}</td><td class="n">${pctS(c.call)}</td><td class="n">${c.conf}%</td></tr>`).join('')}
   </table></div>` + msg('INTU', 'QWEN', 'Priced for AI ruin at 13x'));
  const g = r.calls.find(c => c.k === 'GROK'), q = r.calls.find(c => c.k === 'QWEN'), maxConf = Math.max(...J.rounds.flatMap(x => x.calls.map(c => c.conf)));
  if (g.conf !== maxConf) throw new Error('Grok is not the most confident');
  OUT.a1t = `${r.co} reports after the close. ${NAME.QWEN} is ${q.side}. ${NAME.GROK} is ${g.side}.

${nL} AIs LONG, ${nS} SHORT. ${NAME.GROK}'s ${g.side} is the most confident call of the night: ${g.conf}%. $100K a trade, graded at Friday's close.` }

// ===================== A2: Elastic, the argument (Gemini LONG vs Qwen SHORT, both in their own words)
{ const r = RD.ESTC, L = r.calls.filter(c => c.side === 'LONG'), S = r.calls.filter(c => c.side === 'SHORT');
  const big = [...J.rounds.flatMap(x => x.calls)].sort((a, b) => Math.abs(b.call) - Math.abs(a.call))[0];
  const gm = r.calls.find(c => c.k === 'GEMINI'), qw = r.calls.find(c => c.k === 'QWEN');
  if (big !== gm) throw new Error('Gemini ESTC is not the biggest call');
  const p = c => `<span class="p${c.k === 'GEMINI' || c.k === 'QWEN' ? ' on' : ''}">${mark(c.k, 24)}<b>${NAME[c.k]}</b><small>${pctS(c.call)}</small></span>`;
  OUT.a2 = page('a2', `
.mt{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:6px;align-items:start;padding:11px 14px 8px}
.mt .cn2{display:flex;flex-direction:column;align-items:center;gap:9px}
.mt .sl{display:flex;gap:4px}
.mt .p{display:flex;flex-direction:column;align-items:center;gap:4px;width:44px}
.mt .p b{font:600 10.5px/1 var(--sans);white-space:nowrap}.mt .p small{font:500 10.5px/1 var(--mono);color:var(--mu)}
.mt .p.on small{color:var(--tx)}.mt .p.on .ai{box-shadow:0 0 0 2px var(--ac)}
.mt .p:not(.on){opacity:.6}
.mt .md{display:flex;flex-direction:column;align-items:center;gap:4px;text-align:center;align-self:center}
.mt .md .cn{font:800 16px/1 var(--sans);margin-top:2px}.mt .md .tk{font:500 10px/1 var(--mono);color:var(--mu);letter-spacing:.05em}
.mt .md .sc{font:700 22px/1 var(--mono);margin-top:3px}.mt .md .sc i{font:500 11px/1 var(--mono);font-style:normal;color:var(--mu);margin:0 4px;vertical-align:3px}
${MSG_CSS}
.msg .mb p{font-size:14px;line-height:1.38}.msg .mh{padding-top:8px}.msg .mb{padding:6px 14px 9px}.note{padding:7px 14px 8px}.mt{padding-top:10px}`,
  top('<span class="ssn">SEASON 2</span>') +
  `<div class="pn"><div class="hd"><span class="st"><i></i>IN PLAY</span><span>TRADE ${r.s2n}</span><span class="r">REPORTS AFTER THE CLOSE</span></div>
   <div class="mt"><div class="cn2">${side('LONG')}<div class="sl">${L.map(p).join('')}</div></div>
     <div class="md">${co('ESTC', 34)}<span class="cn">${r.co}</span><span class="tk">${r.ticker}</span><span class="sc"><span class="u">${L.length}</span><i>v</i><span class="d">${S.length}</span></span></div>
     <div class="cn2">${side('SHORT')}<div class="sl">${S.map(p).join('')}</div></div></div>
   <div class="note"><span>Called move under each name</span><span>Graded Fri at the close</span></div></div>` +
  msg('ESTC', 'GEMINI', 'despite four straight beats') + msg('ESTC', 'QWEN', 'not beats'));
  OUT.a2t = `${r.co} reports after the close. ${L.length} AIs are ${L[0].side}. ${NAME.QWEN} is ${qw.side}, alone.

${NAME.GEMINI} calls a ${pctS(gm.call)} move, the biggest call of the night. ${NAME.QWEN} calls ${pctS(qw.call)}.` }

// ===================== A3: the whole night on one grid (sides only, GPT's row lit)
{ const T = ['INTU', 'KEYS', 'ESTC'], ks = J.order0;
  const allLong = ks.filter(k => T.every(t => RD[t].calls.find(c => c.k === k).side === 'LONG'));
  if (allLong.length !== 1 || allLong[0] !== 'GPT') throw new Error('expected GPT alone LONG on all three');
  OUT.a3 = page('a3', `
.gr{width:100%;border-collapse:collapse;table-layout:fixed}
.gr th{padding:12px 0 10px;border-bottom:1px solid var(--ln);vertical-align:bottom}
.gr th:first-child{width:104px}
.gr .ch{display:flex;flex-direction:column;align-items:center;gap:6px}
.gr .ch b{font:700 12.5px/1 var(--sans)}.gr .ch small{font:500 10px/1 var(--mono);color:var(--mu);letter-spacing:.05em}
.gr td{height:56px;border-bottom:1px solid var(--ln);text-align:center;vertical-align:middle}
.gr tr:last-child td{border-bottom:0}
.gr td:first-child{text-align:left;padding-left:14px}
.gr .nm{display:flex;align-items:center;gap:9px;font:600 15.5px/1 var(--sans)}
.gr .cl{display:flex;flex-direction:column;align-items:center;gap:6px}
.gr .cl .chip{font-size:12.5px;width:64px;text-align:center;padding:6px 0 5px}
.gr .cl small{font:500 11px/1 var(--mono);color:var(--mu)}
.gr tr.on td{background:var(--pn2)}.gr tr.on td:first-child{box-shadow:inset 3px 0 0 var(--ac)}
.gr td:last-child,.gr th:last-child{padding-right:8px}`,
  top('<span class="ssn">SEASON 2</span>') +
  `<div class="pn"><div class="hd"><span class="st"><i></i>IN PLAY</span><span>TRADES 1 TO 3</span><span class="r">GRADED FRI AT THE CLOSE</span></div>
   <table class="gr"><tr><th></th>${T.map(t => `<th><span class="ch">${co(t, 28)}<b>${RD[t].co}</b><small>${t}</small></span></th>`).join('')}</tr>
   ${ks.map(k => `<tr class="${k === 'GPT' ? 'on' : ''}"><td><span class="nm">${mark(k, 24)}${NAME[k]}</span></td>${T.map(t => { const c = RD[t].calls.find(x => x.k === k); return `<td><span class="cl">${side(c.side)}<small>${pctS(c.call)}</small></span></td>` }).join('')}</tr>`).join('')}
   </table><div class="note"><span>Called move under each side</span><span>$100K a trade</span></div></div>`);
  OUT.a3t = `${NAME.GPT} is LONG on all three earnings tonight. The other four AIs each have a SHORT.

${T.map(t => RD[t].co).slice(0, 2).join(', ')} and ${RD.ESTC.co} report after the close. ${T.length * ks.length} trades, $100K each, graded at Friday's close.` }

// ===================== B1: Intuit graded, the result table (Qwen's loss and Grok's win lit), board as footer
const board = () => `<div class="bd"><div class="bh"><span>SEASON 2 P&amp;L</span><span>AFTER ${J.after} TRADES</span></div><div class="br">${J.order.map((k, i) => `<span class="bi">${mark(k, 20)}<b class="${J.season1[k] < 0 ? 'd' : 'u'}">${money(J.season1[k])}</b><small>${NAME[k]}</small></span>`).join('')}</div></div>`;
const BOARD_CSS = `
.bd{margin-top:8px;background:var(--pn);border:1px solid var(--ln);border-radius:12px;padding:9px 6px 10px}
.bh{display:flex;justify-content:space-between;padding:0 8px 8px;font:700 10px/1 var(--sans);letter-spacing:.06em;color:var(--ac)}.bh span+span{color:var(--mu);font:500 10px/1 var(--mono)}
.br{display:grid;grid-template-columns:repeat(5,1fr)}
.bi{display:flex;flex-direction:column;align-items:center;gap:5px}
.bi b{font:600 11.5px/1 var(--mono);font-variant-numeric:tabular-nums}.bi small{font:500 9.5px/1 var(--sans);color:var(--mu)}
.bi:first-child .ai{box-shadow:0 0 0 2px var(--ac)}`;
const BIG_CSS = `
.big{display:flex;align-items:center;gap:12px;padding:13px 14px 12px}
.big .cn{font:800 20px/1 var(--sans)}.big .tk{display:block;margin-top:5px;font:500 11px/1 var(--mono);color:var(--mu);letter-spacing:.05em}
.big .mv{margin-left:auto;text-align:right}.big .mv b{display:block;font:700 34px/1 var(--sans);letter-spacing:-.01em}
.big .mv small{display:inline-block;margin-top:6px;font:700 9px/1 var(--mono);letter-spacing:.08em;color:var(--ac);border:1px dashed var(--ac);border-radius:4px;padding:3px 5px}`;
{ const r = RD.INTU, ord = [...r.calls].sort((a, b) => b.pnl - a.pnl || b.conf - a.conf);
  OUT.b1 = page('b1', BIG_CSS + BOARD_CSS + `
.tb th:nth-child(2){width:64px}.tb th:nth-child(3){width:84px}.tb td.pl{font-weight:600}.tb td{height:38px}.tb .nm{font-size:15px}.tb .n{font-size:14.5px}`,
  top(J.preview ? '<span class="pv">PREVIEW</span>' : '<span class="ssn">SEASON 2</span>') +
  `<div class="pn"><div class="hd"><span class="st cl"><i></i>GRADED</span><span>TRADE ${r.s2n}</span><span class="r">FRI CLOSE</span></div>
   <div class="big">${co('INTU', 38)}<div><span class="cn">${r.co}</span><span class="tk">${r.ticker}  AT THE CLOSE</span></div><div class="mv"><b class="${r.move < 0 ? 'd' : 'u'}">${movePct(r)}</b>${J.preview ? '<small>PREVIEW</small>' : ''}</div></div>
   <table class="tb"><tr><th>AI</th><th>Side</th><th>Called move</th><th>P&amp;L</th></tr>
   ${ord.map(c => `<tr class="${c.k === 'QWEN' ? 'lo' : c.k === 'GROK' ? 'hi' : ''}"><td><span class="nm">${mark(c.k, 22)}${NAME[c.k]}</span></td><td>${side(c.side)}</td><td class="n">${pctS(c.call)}</td><td class="n pl ${c.pnl < 0 ? 'd' : 'u'}">${money(c.pnl)}</td></tr>`).join('')}
   </table></div>` + board());
  const g = r.calls.find(c => c.k === 'GROK'), q = r.calls.find(c => c.k === 'QWEN'), sh = r.calls.filter(c => c.side === 'SHORT').map(c => NAME[c.k]);
  const lead = J.order[0];
  OUT.b1t = `${r.co} closed ${movePct(r)}. ${NAME.GROK}'s ${g.side}: P&L ${money(g.pnl)}. ${NAME.QWEN}'s ${q.side}: P&L ${money(q.pnl)}.

Only ${sh.join(' and ')} were SHORT. ${NAME[lead]} leads Season 2 after ${J.after} trades, P&L ${money(J.season1[lead])}.` }

// ===================== B2: Intuit's path from Thursday's close, falling through every called move
{ const r = RD.INTU, P = r.path, cut0 = 240, cut1 = 725;   // after hours ends at 240 min, pre-market starts at 725 (no prints between)
  const W = 372, H = 214, padL = 34, padR = 96, padT = 14, padB = 22, gapW = 16;
  const seg1 = P.filter(p => p[0] <= cut0), seg2 = P.filter(p => p[0] >= cut1);
  const span1 = cut0, span2 = J.total - cut1, inner = W - padL - padR - gapW;
  const X = m => m <= cut0 ? padL + inner * (m / (span1 + span2)) : padL + inner * (span1 / (span1 + span2)) + gapW + inner * ((m - cut1) / (span1 + span2));
  const calls = r.calls.map(c => c.call), vals = P.map(p => p[1]).concat(calls, [0]);
  const hi = Math.ceil(Math.max(...vals) + 1), lo = Math.floor(Math.min(...vals) - 1);
  const Y = v => padT + (H - padT - padB) * (hi - v) / (hi - lo);
  const d = s => s.map((p, i) => (i ? 'L' : 'M') + X(p[0]).toFixed(1) + ' ' + Y(p[1]).toFixed(1)).join(' ');
  const xe = X(J.total), ye = Y(r.move);
  // called-move ticks at the right edge; labels spread to a 17px gap in value order
  const tk = [...r.calls].sort((a, b) => b.call - a.call).map(c => ({ c, y: Y(c.call) }));
  for (let i = 1; i < tk.length; i++) if (tk[i].y - tk[i - 1].y < 21) tk[i].y = tk[i - 1].y + 21;
  const xt = W - padR + 14;
  const grid = [hi, 0, lo].filter((v, i, a) => a.indexOf(v) === i);
  const svg = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
   ${[5, 0, -5, -10].filter(v => v <= hi && v >= lo).map(v => `<line x1="${padL}" x2="${W - padR + 6}" y1="${Y(v)}" y2="${Y(v)}" stroke="${v === 0 ? '#5f5853' : '#2a2522'}" stroke-width="1" ${v === 0 ? 'stroke-dasharray="3 3"' : ''}/><text x="${padL - 6}" y="${Y(v) + 3}" class="ax" text-anchor="end">${v === 0 ? '0%' : pctS(v)}</text>`).join('')}
   <rect x="${X(cut0) + 2}" y="${padT}" width="${gapW - 4}" height="${H - padT - padB}" fill="#1d1917" rx="2"/>
   <rect x="${padL}" y="${Y(Math.max(...calls))}" width="${W - padR - padL + 4}" height="${Y(Math.min(...calls)) - Y(Math.max(...calls))}" fill="rgba(242,237,230,.06)"/>
   <line x1="${padL}" x2="${W - padR + 4}" y1="${Y(Math.max(...calls))}" y2="${Y(Math.max(...calls))}" stroke="#5f5853" stroke-dasharray="2 3"/><line x1="${padL}" x2="${W - padR + 4}" y1="${Y(Math.min(...calls))}" y2="${Y(Math.min(...calls))}" stroke="#5f5853" stroke-dasharray="2 3"/>
      <path d="${d(seg1)}" fill="none" stroke="#e8576b" stroke-width="2" stroke-linejoin="round"/>
   <path d="${d(seg2)}" fill="none" stroke="#e8576b" stroke-width="2" stroke-linejoin="round"/>
   <line x1="${X(seg1.at(-1)[0])}" x2="${X(seg2[0][0])}" y1="${Y(seg1.at(-1)[1])}" y2="${Y(seg2[0][1])}" stroke="#e8576b" stroke-width="1.4" stroke-dasharray="2 3"/>
   <circle cx="${xe}" cy="${ye}" r="4.5" fill="#e8576b"/><circle cx="${xe}" cy="${ye}" r="9" fill="#e8576b" opacity=".22"/>
${tk.map(({ c, y }) => `<line x1="${W - padR - 2}" x2="${W - padR + 4}" y1="${Y(c.call)}" y2="${Y(c.call)}" stroke="${c.side === 'LONG' ? '#55d6a2' : '#e8576b'}" stroke-width="2"/><path d="M${W - padR + 4} ${Y(c.call)} L${xt - 2} ${y}" stroke="#4a423c" fill="none"/>`).join('')}
   <text x="${padL}" y="${H - 6}" class="ax">THU CLOSE</text><text x="${X(cut1) + 2}" y="${H - 6}" class="ax">FRI PRE MARKET</text>
  </svg>`;
  const lab = tk.map(({ c, y }) => `<span class="tl" style="top:${y - 9}px;left:${xt}px">${mark(c.k, 18)}<b class="${c.side === 'LONG' ? 'u' : 'd'}">${pctS(c.call)}</b></span>`).join('');
  const endLab = `<span class="el" style="top:${ye + 12}px;left:${xe - 64}px"><b>${movePct(r)}</b></span>`;
  const grp = s => r.calls.filter(c => c.side === s);
  const sr = s => { const g = grp(s), p = g[0].pnl; return `<div class="sr">${side(s)}<span class="ms">${g.map(c => mark(c.k, 20)).join('')}</span><span class="nmz">${g.map(c => NAME[c.k]).join('  ')}</span><b class="${p < 0 ? 'd' : 'u'}">P&amp;L ${money(p)}<small>EACH</small></b></div>` };
  const lead = J.order[0];
  OUT.b2 = page('b2', BIG_CSS + `
.cw{position:relative;padding:4px 0 2px 0;margin:0 0 0 0}
.cw svg{display:block}
.ax{font:500 9px var(--mono);fill:#8e8680;letter-spacing:.04em}
.tl{position:absolute;display:flex;align-items:center;gap:5px;white-space:nowrap}
.tl b{font:600 11.5px/1 var(--mono)}
.el{position:absolute;width:56px;text-align:right}.el b{font:700 11.5px/1 var(--mono);color:var(--dn)}
.cap{display:flex;justify-content:space-between;padding:0 14px 0;font:500 9.5px/1 var(--mono);letter-spacing:.06em;color:var(--mu)}
.sr{display:grid;grid-template-columns:62px auto minmax(0,1fr) auto;gap:8px;align-items:center;padding:9px 14px;border-top:1px solid var(--ln)}
.sr .ms{display:flex}.sr .ms .ai+.ai{margin-left:-5px}
.sr .chip{justify-self:start}
.sr .nmz{font:600 12px/1 var(--sans);white-space:nowrap;color:#d9d2ca;word-spacing:3px}
.sr b{font:600 13px/1 var(--mono);text-align:right;white-space:nowrap}.sr b small{display:block;margin-top:4px;font:500 9px/1 var(--mono);color:var(--mu);letter-spacing:.08em}
.ft{margin-top:8px;display:flex;align-items:center;gap:8px;padding:10px 14px;background:var(--pn);border:1px solid var(--ln);border-radius:12px;font:600 12.5px/1 var(--sans)}
.ft .ai{box-shadow:0 0 0 2px var(--ac)}.ft b{margin-left:auto;font:600 13px/1 var(--mono)}`,
  top(J.preview ? '<span class="pv">PREVIEW</span>' : '<span class="ssn">SEASON 2</span>') +
  `<div class="pn"><div class="big" style="padding-bottom:6px">${co('INTU', 38)}<div><span class="cn">${r.co}</span><span class="tk">${r.ticker}  SINCE THU CLOSE</span></div><div class="mv"><b class="d">${movePct(r)}</b>${J.preview ? '<small>PREVIEW</small>' : ''}</div></div>
   <div class="cap"><span>PRICE</span><span>CALLED MOVE</span></div>
   <div class="cw" style="margin-left:12px">${svg}${lab}</div>
   ${sr('SHORT')}${sr('LONG')}</div>
   <div class="ft">${mark(lead, 22)}${NAME[lead]} leads Season 2<b class="${J.season1[lead] < 0 ? 'd' : 'u'}">P&amp;L ${money(J.season1[lead])}</b></div>`);
  const maxAbs = Math.max(...r.calls.map(c => Math.abs(c.call)));
  if (Math.abs(r.move) <= maxAbs) throw new Error('the move is not bigger than every call');
  const s = grp('SHORT'), l = grp('LONG');
  OUT.b2t = `${r.co} fell ${Math.abs(r.move).toFixed(2)}% after earnings, more than any AI called. ${s.map(c => NAME[c.k]).join(' and ')} were SHORT: P&L ${money(s[0].pnl)} each.

${l.map(c => NAME[c.k]).slice(0, -1).join(', ')} and ${NAME[l.at(-1).k]} were LONG: P&L ${money(l[0].pnl)} each.` }

// ===================== B3: the whole close on one grid, graded (GPT's row lit), totals at the right
{ const T = ['INTU', 'KEYS', 'ESTC'], ks = J.order;
  const gptL = T.every(t => RD[t].calls.find(c => c.k === 'GPT').side === 'LONG'), allFell = T.every(t => RD[t].move < 0);
  if (!gptL || !allFell) throw new Error('B3 story does not hold');
  OUT.b3 = page('b3', `
.gl{padding:12px 14px 4px}
.gr{width:100%;border-collapse:collapse;table-layout:fixed}
.gr th{padding:10px 0 9px;border-bottom:1px solid var(--ln);vertical-align:bottom}
.gr th:first-child{width:104px}.gr th:last-child{width:80px}
.gr .ch{display:flex;flex-direction:column;align-items:center;gap:5px}
.gr .ch b{font:700 11.5px/1 var(--sans)}.gr .ch small{font:500 9.5px/1 var(--mono);color:var(--mu);letter-spacing:.04em}
.gr .ch em{font:700 11px/1 var(--mono);font-style:normal}
.gr .tt{font:600 9.5px/1.25 var(--sans);letter-spacing:.06em;color:var(--ac);text-transform:uppercase;text-align:right;display:block}
.gr td{height:52px;border-bottom:1px solid var(--ln);text-align:center;vertical-align:middle}
.gr tr:last-child td{border-bottom:0}
.gr td:first-child{text-align:left;padding-left:12px}
.gr td:last-child,.gr th:last-child{padding-right:12px;text-align:right}
.gr .nm{display:flex;align-items:center;gap:6px;font:600 13.5px/1 var(--sans)}
.gr .nm i{font:600 11px/1 var(--mono);font-style:normal;color:var(--mu);width:9px}
.gr tr:first-child+tr .nm i{color:var(--ac)}
.gr .cl{display:flex;flex-direction:column;align-items:center;gap:4px}
.gr .cl small{font:600 9px/1 var(--mono);letter-spacing:.08em;color:var(--mu)}
.gr .cl b{font:600 12.5px/1 var(--mono);font-variant-numeric:tabular-nums;white-space:nowrap}
.gr .tot{font:700 13.5px/1 var(--mono);font-variant-numeric:tabular-nums;white-space:nowrap}
.gr tr.lo td{background:#241417}.gr tr.lo td:first-child{box-shadow:inset 3px 0 0 var(--dn)}
.gr tr.ld td:first-child .ai{box-shadow:0 0 0 2px var(--ac)}`,
  top(J.preview ? '<span class="pv">PREVIEW</span>' : '<span class="ssn">SEASON 2</span>') +
  `<div class="pn"><div class="hd"><span class="st cl"><i></i>GRADED</span><span>FRI CLOSE</span><span class="r">FIRST 3 TRADES OF SEASON 2</span></div>
   <table class="gr"><tr><th></th>${T.map(t => `<th><span class="ch">${co(t, 26)}<b>${RD[t].co}</b><small>${t}</small><em class="${RD[t].move < 0 ? 'd' : 'u'}">${movePct(RD[t])}</em></span></th>`).join('')}<th><span class="tt">Season 2<br>P&amp;L</span></th></tr>
   ${ks.map((k, i) => `<tr class="${k === 'GPT' ? 'lo' : i === 0 ? 'ld' : ''}"><td><span class="nm"><i>${i + 1}</i>${mark(k, 20)}${NAME[k]}</span></td>${T.map(t => { const c = RD[t].calls.find(x => x.k === k); return `<td><span class="cl"><small>${c.side}</small><b class="${c.pnl < 0 ? 'd' : 'u'}">${money(c.pnl)}</b></span></td>` }).join('')}<td class="tot ${J.season1[k] < 0 ? 'd' : 'u'}">${money(J.season1[k])}</td></tr>`).join('')}
   </table><div class="note">P&amp;L on $100K a trade</div></div>`);
  const lead = J.order[0], last = J.order.at(-1);
  if (last !== 'GPT') throw new Error('GPT is not last');
  OUT.b3t = `${NAME.GPT} went LONG on all three. All three fell.

${NAME.GPT}'s P&L after ${J.after} trades: ${money(J.season1.GPT)}, last of ${ks.length}. ${NAME[lead]} leads Season 2, P&L ${money(J.season1[lead])}.` }

const PRE = `[PREVIEW numbers from pre-market prices at ${J.previewAt.slice(11, 16)} UTC. Replace with the close at 4:20 pm New York before posting.]\n\n`;
for (const id of ['a1', 'a2', 'a3', 'b1', 'b2', 'b3']) {
  fs.writeFileSync(HERE + '/' + id + '.html', OUT[id]);
  fs.writeFileSync(EZ + '/x2p-post-' + id + '.txt', (id[0] === 'b' && J.preview ? PRE : '') + OUT[id + 't'] + '\n');
  console.log('--- ' + id + ' (' + OUT[id + 't'].length + ' chars)\n' + OUT[id + 't']);
}
