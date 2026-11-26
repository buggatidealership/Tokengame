// node w6/an/prep.js (from dopa/): writes w6/an/data.json for the animation samples (an-feed1, an-feed2, an-in1, an-in2, an-in3; graded = the grading day, for in-3).
// Every word and number from the files: data/s2-calls/calls.csv (side, called move, confidence, the WHY line), tools/concepts/feed/words.json
// (the trims, the highlighted clause, our plain words for Grok) and dopa/data/close-2026-11-20.json (the PREVIEW moves and P&L).
// Refuses to write if a kept text or a highlight is not verbatim, or the sheet and the close JSON disagree (the feed mockup's own checks).
const fs = require('fs'), path = require('path');
const EZ = path.resolve(__dirname, '../../../../..'), here = __dirname;
const readCSV = require(path.join(EZ, 'tools/concepts/feed/csv.js'));
const CSV = readCSV(fs.readFileSync(path.join(EZ, 'data/s2-calls/calls.csv'), 'utf8'));
const W = JSON.parse(fs.readFileSync(path.join(EZ, 'tools/concepts/feed/words.json'), 'utf8'));
const CL = JSON.parse(fs.readFileSync(path.join(EZ, 'tools/concepts/dopa/data/close-2026-11-20.json'), 'utf8'));
const M5 = JSON.parse(fs.readFileSync(path.join(EZ, 'tools/concepts/dopa/models5.json'), 'utf8'));
const KEY = { GPT: 'GPT', Claude: 'CLAUDE', Grok: 'GROK', Gemini: 'GEMINI', Qwen: 'QWEN' }, NAME = { GPT: 'GPT', CLAUDE: 'Claude', GROK: 'Grok', GEMINI: 'Gemini', QWEN: 'Qwen' };
const LAB = { GPT: 'OpenAI', CLAUDE: 'Anthropic', GROK: 'xAI', GEMINI: 'Google', QWEN: 'Alibaba' }, FLAG = { GPT: 'US', CLAUDE: 'US', GROK: 'US', GEMINI: 'US', QWEN: 'CN' };
const fails = [], must = (ok, m) => { if (!ok) fails.push(m) };
const cos = {}, trades = [];
CL.rounds.forEach(R => {
  cos[R.ticker] = { ticker: R.ticker, co: R.co, s2n: R.s2n, logo: R.logo, move: R.move, pct: R.pct };
  Object.keys(KEY).forEach(m => { const k = KEY[m], row = CSV.find(r => r.ticker === R.ticker && r.model === m), w = W[R.ticker][m], j = R.calls.find(x => x.k === k);
    must(row && w && j, 'missing ' + R.ticker + ' ' + m); const core = w.keep.replace(/ …$/, '');
    must(row.why.indexOf(core) > -1, 'NOT VERBATIM ' + R.ticker + ' ' + m); must(w.keep.indexOf(w.hl) > -1, 'highlight outside the kept text ' + R.ticker + ' ' + m);
    must(row.side === j.side && +row.size_pct === Math.abs(j.call), 'sheet vs close JSON ' + R.ticker + ' ' + m);
    const pnl = Math.round((row.side === 'LONG' ? 1 : -1) * R.move * 1000); must(pnl === j.pnl, 'P&L ' + R.ticker + ' ' + m);
    trades.push({ k, name: NAME[k], lab: LAB[k], flag: FLAG[k], t: R.ticker, side: row.side, call: +row.size_pct, conf: +row.confidence_pct, why: row.why, keep: w.keep, hl: w.hl, plain: w.plain || '', pnl: j.pnl, right: j.right, called: row.called, graded: row.graded_at_close }) }) });
if (fails.length) { console.error('DATA CHECK FAILED\n' + fails.join('\n')); process.exit(1) }
const marks = {}; Object.keys(M5).forEach(k => marks[k] = { d: M5[k].d, fr: M5[k].fr || '', bg: M5[k].bg, fg: M5[k].fg });
marks.GEMINI.fg = '#7dd3fc'; marks.QWEN.fg = '#a78bfa';   // the Season 2 colours (feed mockup, posts)
const at = new Date(CL.previewAt), et = ((at.getUTCHours() + 24 - 5) % 24), pvClock = (et % 12 || 12) + ':' + String(at.getUTCMinutes()).padStart(2, '0') + (et >= 12 ? ' PM' : ' AM') + ' ET';
fs.writeFileSync(path.join(here, 'data.json'), JSON.stringify({ preview: CL.preview, pvClock, cos, trades, marks }, null, 1));
console.log('data.json ok:', trades.length, 'trades,', Object.keys(cos).join(' '), 'preview', CL.preview, pvClock);
