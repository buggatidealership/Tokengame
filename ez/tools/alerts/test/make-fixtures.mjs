// node test/make-fixtures.mjs <a live export of the sheet, .csv>
// Writes test/fixture-before.csv and test/fixture-after.csv from a live copy of the sheet (made 2026-11-22 from the export URL in
// src/watcher.js). The prompt columns are dropped (not needed, and they are the owner's prompts); one synthetic NOTES cell with a
// quoted comma and line break keeps the parser honest. A marker row says the file is test data.
//   before: Season 2 as it stood on 20 Nov before the close: rounds 113 to 115 with all five calls, no moves.
//   after:  the 20 Nov close graded with the moves build.py's MOVES holds (113 -12.79, 114 -7.07, 115 -2.20, as the sheet read
//           that night) and one extra call: round 116, HP (HPQ, next on the terminal's Season 2 calendar), Grok only, DOWN 3.1.
//           The HP call is invented test data.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCsv } from '../src/sheet.js';
import { writeCsv, setCells } from './csvtool.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const src = process.argv[2]; if (!src) { console.error('usage: node test/make-fixtures.mjs <sheet.csv>'); process.exit(1) }
const rows = parseCsv(fs.readFileSync(src, 'utf8')), H = rows[0].map(h => h.trim().toUpperCase());
const drop = new Set(['PROMPT USED', 'GPT PROMPT', 'SELF-EVAL LINK', 'COLUMN 23']), keep = H.map((h, j) => (drop.has(h) ? -1 : j)).filter(j => j >= 0);
const out = rows.map(r => keep.map(j => r[j] ?? ''));
out[0].push('NOTES'); out.slice(1).forEach(r => r.push(''));
const sep = out.findIndex(r => r[0].trim() === 'SEASON 2');
out.splice(sep, 0, ['FIXTURE: test data for ez/tools/alerts, not the live sheet', ...Array(out[0].length - 1).fill('')]);
out.find(r => r[0] === '113')[out[0].length - 1] = 'synthetic note, with a comma\nand a line break';
let before = writeCsv(out);
before = setCells(before, [113, 114, 115].map(n => [n, 'ACTUAL MOVE (%)', '']));
const after = setCells(before, [[113, 'ACTUAL MOVE (%)', '-12.79'], [114, 'ACTUAL MOVE (%)', '-7.07'], [115, 'ACTUAL MOVE (%)', '-2.20'],
  [116, 'TICKER', 'HPQ'], [116, 'CALL DATE (T-1)', '11/24/26'], [116, 'GROK DIR', 'DOWN'], [116, 'GROK MAG (%)', '3.1'], [116, 'RESOLUTION DATE/TIME', '11/25/26']]);
fs.writeFileSync(path.join(HERE, 'fixture-before.csv'), before + '\r\n');
fs.writeFileSync(path.join(HERE, 'fixture-after.csv'), after + '\r\n');
console.log('wrote test/fixture-before.csv and test/fixture-after.csv');
