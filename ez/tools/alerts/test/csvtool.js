// Edit a sheet CSV the way the owner edits the sheet: by round number and column header.
import { parseCsv } from '../src/sheet.js';
const q = v => (/[",\r\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v);
export const writeCsv = rows => rows.map(r => r.map(q).join(',')).join('\r\n');
export function setCells(text, edits) { // edits: [[round, header, value], ...]
  const rows = parseCsv(text), H = rows[0].map(h => h.trim().toUpperCase());
  for (const [round, header, value] of edits) {
    const j = H.indexOf(header.toUpperCase()); if (j < 0) throw new Error('no column ' + header);
    const r = rows.find(r => r[0].trim() === String(round)); if (!r) throw new Error('no round ' + round);
    while (r.length <= j) r.push(''); r[j] = String(value);
  }
  return writeCsv(rows);
}
// insert a column after `afterHeader`; values: {round: value}
export function addColumn(text, afterHeader, header, values = {}) {
  const rows = parseCsv(text), j = rows[0].map(h => h.trim().toUpperCase()).indexOf(afterHeader.toUpperCase()) + 1;
  if (j < 1) throw new Error('no column ' + afterHeader);
  rows.forEach((r, i) => r.splice(j, 0, i === 0 ? header : String(values[r[0].trim()] ?? '')));
  return writeCsv(rows);
}
