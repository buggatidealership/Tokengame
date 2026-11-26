// One cron tick: read the sheet, diff against the state in KV, queue and send the alerts.
// Order matters for "never twice": the new state (sent markers + queued deliveries) is written BEFORE anything is sent, so a crash
// mid-send can drop an alert but never repeat one (at most once). KV writes happen only when the state actually changed: a quiet
// sheet costs one KV read per tick and no write (Workers KV Free: 1,000 writes a day; a 2-minute cron is 720 ticks).

import { parseSeason2, SheetFormatError } from './sheet.js';
import { diff } from './events.js';
import { fanOut, drain, channels } from './dispatch.js';
import { makeStore } from './store.js';

export const STATE_KEY = 'state:v1';
export const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1HE0z8uxuGa0sAbsnm6ZkPjU5bCLwGlq4EUjeCOROlIE/export?format=csv&gid=352731177'; // as prep-close.js

const int = (v, d) => (v != null && v !== '' && isFinite(+v) ? +v : d);
export const config = env => ({
  settlePolls: int(env.SETTLE_POLLS, 1), floodEvents: int(env.FLOOD_EVENTS, 80), sameTradeDays: int(env.SAME_TRADE_DAYS, 40),
  budget: int(env.SEND_BUDGET, 40), digestAt: int(env.DIGEST_AT, 3), dryRun: env.DRY_RUN === '1',
});

export async function fetchSheet(env, f = globalThis.fetch) {
  const res = await f(env.SHEET_URL || SHEET_URL, { headers: { accept: 'text/csv' }, redirect: 'follow', signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new SheetFormatError(`sheet HTTP ${res.status}`);
  const type = res.headers.get('content-type') || '';
  if (!/text\/csv/i.test(type)) throw new SheetFormatError(`sheet answered ${type || 'no content type'}, not text/csv (is it still shared by link?)`);
  return res.text();
}

const stable = s => JSON.stringify({ ...s, updatedAt: undefined });
async function save(kv, state, prevRaw) {
  if (prevRaw && stable(JSON.parse(prevRaw)) === stable(state)) return { wrote: false, raw: prevRaw };
  state.updatedAt = new Date().toISOString();
  const raw = JSON.stringify(state); await kv.put(STATE_KEY, raw); return { wrote: true, raw };
}

export async function runWatcher(env, opts = {}) {
  const kv = env.EZ_ALERTS; if (!kv) throw new Error('no EZ_ALERTS KV binding');
  const cfg = { ...config(env), ...(opts.cfg || {}) }, dryRun = opts.dryRun ?? cfg.dryRun, now = opts.now ?? Date.now();
  const store = makeStore(kv), f = opts.fetch || globalThis.fetch;
  const raw0 = await kv.get(STATE_KEY), prev = raw0 ? JSON.parse(raw0) : null;
  const report = { ok: true, dryRun, seeded: false, events: [], notes: [], deliveries: [], results: [], wrote: 0, channels: channels(env) };

  let state = prev, raw = raw0;
  try {
    const text = opts.fetchText ? await opts.fetchText() : await fetchSheet(env, f);
    const parsed = parseSeason2(text);
    if (prev && prev.seededAt && !parsed.trades.length && Object.keys(prev.sent || {}).length)
      throw new SheetFormatError('the sheet has no Season 2 rows while earlier reads had some: not treating that as removals');
    const d = diff(prev, parsed.trades, { ...cfg, now });
    state = d.state; Object.assign(report, { seeded: d.seeded, counts: d.counts, notes: d.notes, held: d.held });
    report.events = d.events;
    if (d.events.length) {
      const fo = await fanOut(d.events, store, env, { digestAt: cfg.digestAt });
      report.deliveries = fo.deliveries; report.skippedChannels = fo.skippedChannels;
      if (!dryRun) state.outbox = [...(state.outbox || []), ...fo.deliveries];
    }
    report.incomplete = parsed.notes; // a direction typed without a size (or the reverse): waits, no alert
  } catch (e) {
    report.ok = false; report.error = (e instanceof SheetFormatError ? 'sheet: ' : '') + (e && e.message || e);
    state = prev; // the state is left exactly as it was
  }
  if (!state) return report; // first run and the sheet failed: nothing to save

  const s1 = await save(kv, state, raw); raw = s1.raw; report.wrote += s1.wrote ? 1 : 0;
  if (!dryRun && state.outbox && state.outbox.length) {
    const r = await drain(state.outbox, store, env, { budget: cfg.budget, now, fetch: f });
    report.results = r.results; state.outbox = r.outbox;
    const s2 = await save(kv, state, raw); report.wrote += s2.wrote ? 1 : 0;
  }
  report.outbox = (state.outbox || []).length;
  return report;
}

// a held flood (see events.js): send it, or drop it
export async function releaseHeld(env, { drop = false, fetch: f = globalThis.fetch } = {}) {
  const kv = env.EZ_ALERTS, raw = await kv.get(STATE_KEY); if (!raw) return { ok: false, error: 'no state' };
  const state = JSON.parse(raw); if (!state.held) return { ok: true, held: 0 };
  const evs = state.held.events || []; state.held = null;
  let queued = 0;
  if (!drop) { const fo = await fanOut(evs, makeStore(kv), env, { digestAt: config(env).digestAt }); state.outbox = [...(state.outbox || []), ...fo.deliveries]; queued = fo.deliveries.length }
  await save(kv, state, raw);
  return { ok: true, events: evs.length, queued, dropped: drop };
}

// one line for the Worker's log
export function summary(r) {
  if (!r.ok) return `ez-alerts: STOP ${r.error}`;
  if (r.seeded) return `ez-alerts: seeded silently (${r.counts.trades} Season 2 trades, ${r.counts.calls} calls, ${r.counts.graded} graded)`;
  const parts = [];
  if (r.events.length) parts.push(`${r.events.length} alerts (${r.events.map(e => `${e.type} R${e.round} ${e.ticker} ${e.aiName}`).join('; ')})`);
  if (r.deliveries.length) parts.push(`${r.deliveries.length} messages queued${r.dryRun ? ' (dry run: not sent)' : ''}`);
  if (r.results.length) parts.push(`sent ${r.results.filter(x => x.ok).length}/${r.results.length}`);
  if (r.notes.length) parts.push(`notes: ${r.notes.map(n => n.type + (n.ticker ? ' ' + n.ticker : '') + (n.ai ? ' ' + n.ai : '')).join(', ')}`);
  if (r.held) parts.push('HELD: ' + r.held.reason);
  if (r.outbox) parts.push(`outbox ${r.outbox}`);
  return parts.length ? 'ez-alerts: ' + parts.join(' · ') : '';
}
