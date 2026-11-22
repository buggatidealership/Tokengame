// Events -> one message per follower (a digest when a follower gets digestAt or more in one poll) -> outbox -> channels.
// The outbox lives in the state blob, so a run that hits its send budget (Workers Free: 50 subrequests per invocation) leaves the
// rest for the next cron tick instead of dropping it. Every delivery has an id; a delivery is attempted at most maxTries times.

import { one, digest } from './format.js';
import { sendPush } from './webpush.js';
import { tgSend, tgEnabled } from './telegram.js';

export const vapidOf = env => (env.VAPID_PUBLIC_KEY && env.VAPID_PRIVATE_KEY ? { publicKey: env.VAPID_PUBLIC_KEY, privateKey: env.VAPID_PRIVATE_KEY, subject: env.VAPID_SUBJECT || 'https://earningszn.xyz' } : null);
export const channels = env => ({ wp: !!vapidOf(env), tg: tgEnabled(env) });

export async function fanOut(events, store, env, { digestAt = 3 } = {}) {
  const on = channels(env), byRecipient = new Map(), skipped = [];
  for (const e of events) {
    for (const r of await store.recipients(e.slug)) {
      if (!on[r.ch]) { skipped.push(r.ch); continue }
      const k = `${r.ch}:${r.id}`; if (!byRecipient.has(k)) byRecipient.set(k, { r, evs: [] });
      byRecipient.get(k).evs.push(e);
    }
  }
  const out = [];
  for (const { r, evs } of byRecipient.values()) {
    const msgs = evs.length >= digestAt ? [{ msg: digest(evs, env), keys: evs.map(e => e.key) }] : evs.map(e => ({ msg: one(e, env), keys: [e.key] }));
    for (const { msg, keys } of msgs) out.push({ id: `${r.ch}:${r.id}:${keys.join(',')}`.slice(0, 200), ch: r.ch, rid: r.id, to: r.ch === 'wp' ? r.sub : r.chatId, msg, tries: 0 });
  }
  return { deliveries: out, skippedChannels: [...new Set(skipped)] };
}

// send what is due, up to `budget`; returns the outbox that remains and what happened
export async function drain(outbox, store, env, { budget = 40, now = Date.now(), fetch: f = globalThis.fetch, maxTries = 3, concurrency = 6 } = {}) {
  const vapid = vapidOf(env), jwtCache = new Map(), results = [], keep = [];
  const due = outbox.filter(d => !d.nb || d.nb <= now), later = outbox.filter(d => d.nb && d.nb > now);
  const batch = due.slice(0, budget), rest = due.slice(budget);
  const sendOne = async d => {
    let r;
    if (d.ch === 'wp') r = vapid ? await sendPush(d.to, d.msg, vapid, { fetch: f, now, jwtCache }) : { ok: false, skipped: 'no VAPID keys' };
    else if (d.ch === 'tg') r = await tgSend(env, d.to, d.msg, f);
    else r = { ok: false, error: 'unknown channel ' + d.ch };
    if (r.gone) await store.remove(d.ch, d.rid);
    else if (!r.ok && !r.skipped && d.tries + 1 < maxTries) keep.push({ ...d, tries: d.tries + 1, nb: now + 1000 * (r.retryAfter || 60 * 2 ** d.tries), last: r.status || r.error });
    results.push({ id: d.id, ch: d.ch, ok: r.ok, status: r.status, gone: !!r.gone, skipped: r.skipped, error: r.error });
  };
  for (let i = 0; i < batch.length; i += concurrency) await Promise.all(batch.slice(i, i + concurrency).map(sendOne)); // Workers: 6 open connections at once
  return { outbox: [...keep, ...rest, ...later], results };
}
