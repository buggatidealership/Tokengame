// The owner's sheet, read the way ez/tools/concepts/dopa/prep-close.js reads it: the public CSV export, columns found by their
// header text (never by position), Season 2 = every row after round 112 that has a ticker. Pure functions, no I/O.

export const SEASON1_LAST = 112; // as in ez/tools/sync_sheet.py and prep-close.js

// Season 2's five, in the sheet's column order. The sheet's own headers: "GPT DIR" / "GPT MAG (%)", ... and one reads "Gemin MAG (%)".
// CONF columns do not exist yet: if the owner adds e.g. "GROK CONF (%)", alerts carry "65% confident" without a code change.
export const AIS = [
  { key: 'GPT', name: 'GPT', slug: 'gpt', dir: /^GPT DIR$/, mag: /^GPT MAG/, conf: /^GPT CONF/ },
  { key: 'CLAUDE', name: 'Claude', slug: 'claude', dir: /^CLAUDE DIR$/, mag: /^CLAUDE MAG/, conf: /^CLAUDE CONF/ },
  { key: 'GROK', name: 'Grok', slug: 'grok', dir: /^GROK DIR$/, mag: /^GROK MAG/, conf: /^GROK CONF/ },
  { key: 'GEMINI', name: 'Gemini', slug: 'gemini', dir: /^GEMINI? DIR$/, mag: /^GEMINI? MAG/, conf: /^GEMINI? CONF/ },
  { key: 'QWEN', name: 'Qwen', slug: 'qwen', dir: /^QWEN DIR$/, mag: /^QWEN MAG/, conf: /^QWEN CONF/ },
];
export const AI_BY_SLUG = Object.fromEntries(AIS.map(a => [a.slug, a]));
export const AI_BY_KEY = Object.fromEntries(AIS.map(a => [a.key, a]));

export class SheetFormatError extends Error {}

// RFC 4180 CSV with quoted fields that may hold commas, quotes and line breaks (the sheet's prompt columns do); \r\n line ends.
export function parseCsv(t) {
  const rows = [[]]; let f = '', q = false;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (q) { if (c === '"') { if (t[i + 1] === '"') { f += '"'; i++ } else q = false } else f += c }
    else if (c === '"') q = true;
    else if (c === ',') { rows.at(-1).push(f); f = '' }
    else if (c === '\n') { rows.at(-1).push(f.replace(/\r$/, '')); f = ''; rows.push([]) }
    else f += c;
  }
  rows.at(-1).push(f.replace(/\r$/, ''));
  return rows.filter(r => r.length > 1);
}

// "11/19/26" or "11/20/26 16:00" -> "2026-11-19"; anything else -> null
export function sheetDate(s) {
  const m = /^(\d{1,2})\/(\d{1,2})\/(\d{2,4})\b/.exec(String(s || '').trim());
  if (!m) return null;
  const y = +m[3] < 100 ? 2000 + +m[3] : +m[3];
  return `${y}-${String(+m[1]).padStart(2, '0')}-${String(+m[2]).padStart(2, '0')}`;
}

// a signed number cell: "-12.77", "−2.02", "+2", "4.5%" -> number; blank or text -> null
export function num(s) {
  const t = String(s || '').trim().replace(/[−–]/g, '-').replace(/%$/, '').replace(/^\+/, '');
  if (!/^-?\d+(\.\d+)?$/.test(t)) return null;
  return +t;
}

function side(s) {
  const d = String(s || '').trim().toUpperCase();
  return d === 'UP' || d === 'LONG' ? 'LONG' : d === 'DOWN' || d === 'SHORT' ? 'SHORT' : null;
}

// The Season 2 snapshot: one trade per row (identity = ticker + call date), every AI's complete call (side and size both present).
// Throws SheetFormatError when the text is not the sheet (an HTML sign-in page, an error page, renamed columns).
export function parseSeason2(text) {
  if (typeof text !== 'string' || !text.length) throw new SheetFormatError('empty response');
  if (/^\s*</.test(text)) throw new SheetFormatError('got HTML, not CSV (is the sheet still shared by link?)');
  const rows = parseCsv(text);
  if (rows.length < 2) throw new SheetFormatError('no rows');
  const H = rows[0].map(h => h.trim().toUpperCase());
  const find = (re, req) => { const i = H.findIndex(h => re.test(h)); if (i < 0 && req) throw new SheetFormatError('sheet has no column ' + re); return i };
  const C = {
    round: find(/^ROUND$/, 1), ticker: find(/^TICKER$/, 1), call: find(/^CALL DATE/, 1),
    res: find(/^RESOLUTION DATE/, 1), move: find(/^ACTUAL MOVE/, 1),
  };
  const cols = AIS.map(a => ({ a, dir: find(a.dir, 1), mag: find(a.mag, 1), conf: find(a.conf, 0) }));
  const cell = (r, i) => (i >= 0 && i < r.length ? String(r[i]).trim() : '');
  const trades = [], notes = [];
  for (const r of rows.slice(1)) {
    const round = num(cell(r, C.round)), ticker = cell(r, C.ticker).toUpperCase();
    if (round == null || round <= SEASON1_LAST || !ticker) continue;
    const callDate = sheetDate(cell(r, C.call));
    const t = { id: `${ticker}|${callDate || 'nodate'}`, round, ticker, callDate, resDate: sheetDate(cell(r, C.res)), move: num(cell(r, C.move)), calls: {} };
    for (const { a, dir, mag, conf } of cols) {
      const s = side(cell(r, dir)), m = num(cell(r, mag)), c = num(cell(r, conf));
      if (s && m != null) t.calls[a.key] = { side: s, size: Math.abs(m), conf: c != null && c > 0 && c <= 100 ? c : null };
      else if (s || cell(r, mag)) notes.push({ type: 'INCOMPLETE', round, ticker, ai: a.key, dir: cell(r, dir), mag: cell(r, mag) });
    }
    trades.push(t);
  }
  return { trades, notes, columns: { conf: cols.filter(c => c.conf >= 0).map(c => c.a.key) } };
}

// Season 2 rule (prep-close.js): $100K on every trade, flat. P&L = $100,000 x direction x move = side x move x $1,000.
export function pnlOf(sideStr, move) {
  return Math.round((sideStr === 'LONG' ? 1 : -1) * move * 1000) + 0; // + 0 turns -0 into 0
}
