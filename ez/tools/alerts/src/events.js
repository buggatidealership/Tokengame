// Diff the sheet's Season 2 snapshot against the last state and decide what to alert. Pure: no I/O, the clock is passed in.
//
// Rules
// - First run (no state): every call and grade already in the sheet is recorded as sent, nothing is alerted ("seeded").
// - An alert's identity is the trade (ticker + AI), not the round number: the sheet has renumbered rounds before. A record from more
//   than SAME_TRADE_DAYS earlier (by call date) is the company's previous quarter, so the same ticker can come back next quarter.
// - Settling: a new or changed value alerts only once it has been read unchanged on settlePolls + 1 consecutive polls (default 1 + 1:
//   at a 2-minute cron, 2 to 4 minutes after it lands). It absorbs a cell typed and corrected within a minute.
// - A call already graded when first seen gets only its GRADED alert (a CALL_IN after the result would be stale).
// - Edits after an alert: a call whose side flips, or a grade whose right/wrong flips, sends one correction; a size or move edit that
//   keeps the side and the right/wrong is recorded as a note only (the sheet is always right, but $20 is not worth a phone buzz).
// - Flood guard: more than floodEvents alerts in one run (not the first) are held, not sent, until released by hand.

import { AIS, AI_BY_KEY, pnlOf } from './sheet.js';
import { NAMES } from './names.js';

export const DEFAULTS = { settlePolls: 1, sameTradeDays: 40, floodEvents: 80, maxLog: 60 };

const days = (a, b) => Math.abs(Date.parse(a + 'T00:00:00Z') - Date.parse(b + 'T00:00:00Z')) / 864e5;
const sameTrade = (rec, t, cfg) => rec && (!rec.callDate || !t.callDate || days(rec.callDate, t.callDate) <= cfg.sameTradeDays);
const rightOf = p => (p > 0 ? true : p < 0 ? false : null); // null: the stock closed flat

export function emptyState(now) {
  return { v: 1, seededAt: null, updatedAt: new Date(now).toISOString(), sent: {}, pending: {}, outbox: [], held: null, log: [] };
}

// Records: S.sent["CALL_IN:INTU:GROK"] is a list of records, one per quarter the company reported in (matched by call date), so a
// November row and next February's row of the same ticker never overwrite each other.
const findRec = (S, k, t, cfg) => (S.sent[k] || []).find(r => sameTrade(r, t, cfg)) || null;
const putRec = (S, k, t, cfg, rec) => { const l = (S.sent[k] || []).filter(r => !sameTrade(r, t, cfg)); l.push(rec); S.sent[k] = l; return rec };

// state: the last state (null on the first run); trades: parseSeason2(...).trades; returns a new state plus what to do.
export function diff(state, trades, opts = {}) {
  const cfg = { ...DEFAULTS, ...opts }, now = opts.now ?? Date.now(), iso = new Date(now).toISOString();
  const first = !state || !state.seededAt;
  const S = structuredClone(state && state.seededAt ? state : emptyState(now));
  S.once = S.once || {};
  const events = [], notes = [], seen = new Set();
  const company = t => NAMES[t.ticker] || t.ticker;

  // settle(key, sig): true once sig has been read on settlePolls + 1 consecutive polls
  const settle = (key, sig) => {
    seen.add(key);
    if (first) return true;
    const p = S.pending[key];
    if (p && p.sig === sig) p.n++; else S.pending[key] = { sig, n: 1, since: iso };
    if (S.pending[key].n > cfg.settlePolls) { delete S.pending[key]; return true }
    return false;
  };
  const emit = e => { if (!first) events.push(e) };
  const note = n => { if (!first) notes.push({ ...n, at: iso }) };
  const noteOnce = (id, n) => { if (S.once[id]) return; S.once[id] = iso; note(n) }; // logged once, so a quiet poll stays write-free

  // one row per trade: a second row of the same ticker within sameTradeDays (a duplicated row) is ignored, noted once
  const rows = [], kept = [];
  for (const t of [...trades].sort((a, b) => a.round - b.round)) {
    const dup = kept.find(k => k.ticker === t.ticker && sameTrade(k, t, cfg));
    if (dup) { noteOnce(`DUP:${t.ticker}:${t.round}`, { type: 'DUPLICATE_ROW', round: t.round, ticker: t.ticker, keeps: dup.round }); continue }
    kept.push(t); rows.push(t);
  }

  for (const t of rows) {
    const graded = t.move != null;
    if (!NAMES[t.ticker]) noteOnce('NONAME:' + t.ticker, { type: 'NO_NAME', round: t.round, ticker: t.ticker });
    for (const a of AIS) {
      const c = t.calls[a.key];
      const kC = `CALL_IN:${t.ticker}:${a.key}`, kG = `GRADED:${t.ticker}:${a.key}`;
      const base = { round: t.round, ticker: t.ticker, company: company(t), ai: a.key, aiName: a.name, slug: a.slug, callDate: t.callDate, resDate: t.resDate };
      const recC = findRec(S, kC, t, cfg), sig = c && `${c.side}|${c.size}|${c.conf}`;

      // the call
      if (c && !recC) {
        if (graded) putRec(S, kC, t, cfg, { callDate: t.callDate, round: t.round, side: c.side, size: c.size, conf: c.conf, at: iso, suppressed: 'graded when first seen', ...(first ? { seed: true } : {}) });
        else if (settle(`${kC}@${t.callDate}`, sig)) {
          putRec(S, kC, t, cfg, { callDate: t.callDate, round: t.round, side: c.side, size: c.size, conf: c.conf, at: iso, ...(first ? { seed: true } : {}) });
          emit({ type: 'CALL_IN', key: kC, ...base, side: c.side, size: c.size, conf: c.conf, deliver: true });
        }
      } else if (c && recC) {
        if (recC.removed) delete recC.removed; // a call cleared and typed back in
        if (recC.callDate !== t.callDate) { recC.callDate = t.callDate; recC.round = t.round } // the date moved within the window: same trade
        if (recC.side !== c.side || recC.size !== c.size || (c.conf != null && recC.conf !== c.conf)) {
          if (settle(`EDIT:${kC}@${t.callDate}`, sig)) {
            const from = { side: recC.side, size: recC.size, conf: recC.conf };
            Object.assign(recC, { side: c.side, size: c.size, conf: c.conf ?? recC.conf, edited: iso });
            // a correction only while the trade is open and its first alert went out; once graded, GRADE_EDITED carries the change
            const send = from.side !== c.side && !recC.suppressed && !recC.seed && !graded;
            (send ? emit : note)({ type: 'CALL_EDITED', key: 'EDIT:' + kC, ...base, from, to: { side: c.side, size: c.size, conf: c.conf }, deliver: send });
            if (send) notes.push({ type: 'CALL_EDITED', round: t.round, ticker: t.ticker, ai: a.key, from, to: c, at: iso, delivered: true });
          }
        }
      } else if (!c && recC && !recC.removed && !recC.suppressed) {
        recC.removed = iso; note({ type: 'CALL_REMOVED', round: t.round, ticker: t.ticker, ai: a.key, was: { side: recC.side, size: recC.size } });
      }

      // the grade
      if (graded && c) {
        const p = pnlOf(c.side, t.move), right = rightOf(p), recG = findRec(S, kG, t, cfg), gsig = `${c.side}|${t.move}`;
        if (!recG) {
          if (settle(`${kG}@${t.callDate}`, gsig)) {
            putRec(S, kG, t, cfg, { callDate: t.callDate, round: t.round, side: c.side, move: t.move, pnl: p, right, at: iso, ...(first ? { seed: true } : {}) });
            emit({ type: 'GRADED', key: kG, ...base, side: c.side, size: c.size, move: t.move, pnl: p, right, deliver: true });
          }
        } else {
          if (recG.callDate !== t.callDate) { recG.callDate = t.callDate; recG.round = t.round }
          if (recG.move !== t.move || recG.side !== c.side) {
            if (settle(`EDIT:${kG}@${t.callDate}`, gsig)) {
              const from = { side: recG.side, move: recG.move, pnl: recG.pnl, right: recG.right };
              Object.assign(recG, { side: c.side, move: t.move, pnl: p, right, edited: iso });
              const flip = from.right !== right && !recG.seed;
              (flip ? emit : note)({ type: 'GRADE_EDITED', key: 'EDIT:' + kG, ...base, side: c.side, size: c.size, from, to: { side: c.side, move: t.move, pnl: p, right }, deliver: flip });
              if (flip) notes.push({ type: 'GRADE_EDITED', round: t.round, ticker: t.ticker, ai: a.key, from, to: { move: t.move, pnl: p, right }, at: iso, delivered: true });
            }
          }
        }
      }
    }
  }
  // a value that vanished before it settled is forgotten; so is the pending edit of a value that went back to what was sent
  for (const k of Object.keys(S.pending)) if (!seen.has(k)) delete S.pending[k];
  // a whole trade gone from the sheet after its call was alerted: one note, records kept (so it never re-alerts if it comes back)
  if (!first) for (const [k, list] of Object.entries(S.sent)) {
    if (!k.startsWith('CALL_IN:')) continue;
    const [, ticker, ai] = k.split(':');
    for (const r of list) if (!r.removed && !r.suppressed && !r.gone && !rows.some(t => t.ticker === ticker && sameTrade(r, t, cfg))) {
      r.gone = iso; notes.push({ type: 'TRADE_REMOVED', ticker, ai, round: r.round, at: iso });
    }
  }

  let held = null;
  const deliver = events.filter(e => e.deliver);
  if (!first && deliver.length > cfg.floodEvents) {
    held = { at: iso, reason: `${deliver.length} alerts in one poll (more than ${cfg.floodEvents}): held until released`, events: [...((S.held && S.held.events) || []), ...deliver] };
    S.held = held;
    notes.push({ type: 'FLOOD_HELD', count: deliver.length, at: iso });
  }
  if (first) S.seededAt = iso;
  if (notes.length) S.log = [...notes, ...(S.log || [])].slice(0, cfg.maxLog);
  return { state: S, events: held ? [] : deliver, notes, seeded: first, held, counts: { trades: rows.length, calls: rows.reduce((n, t) => n + Object.keys(t.calls).length, 0), graded: rows.filter(t => t.move != null).length } };
}

export const aiName = k => (AI_BY_KEY[k] || {}).name || k;
