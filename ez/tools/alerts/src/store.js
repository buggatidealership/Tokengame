// Followers in KV. One canonical record per endpoint, plus one index key per followed AI so a fan-out is a single prefix list
// (the subscription rides in the key's metadata, so no extra read per follower). Nothing personal is stored: a push endpoint and its
// keys, or a Telegram chat id.
//   wp:<id>                 {sub:{endpoint,keys}, ais:[...], at}           id = first 22 chars of base64url(SHA-256(endpoint))
//   tg:<chatId>             {ais:[...], at}
//   f:<slug>:wp:<id>        metadata {e, p, a} (endpoint, p256dh, auth)    slug = gpt | claude | grok | gemini | qwen | all
//   f:<slug>:tg:<chatId>    metadata {}
// KV is eventually consistent (a write can take up to 60 s to show elsewhere); follows are idempotent, so that is harmless here.

import { AIS } from './sheet.js';
import { b64u } from './webpush.js';

export const SLUGS = [...AIS.map(a => a.slug), 'all'];
export const cleanAis = list => [...new Set((Array.isArray(list) ? list : [list]).map(s => String(s || '').toLowerCase().trim()))].filter(s => SLUGS.includes(s));

export async function endpointId(endpoint) {
  const h = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(endpoint));
  return b64u.enc(new Uint8Array(h)).slice(0, 22);
}

export function makeStore(kv) {
  const getJson = async k => { const v = await kv.get(k); return v ? JSON.parse(v) : null };
  const putJson = (k, v) => kv.put(k, JSON.stringify(v));

  async function setFollows(ch, id, ais, meta) {
    const ck = `${ch}:${id}`, rec = (await getJson(ck)) || { ais: [] };
    const before = new Set(rec.ais), after = new Set(ais);
    for (const s of before) if (!after.has(s)) await kv.delete(`f:${s}:${ch}:${id}`);
    for (const s of after) if (!before.has(s) || meta.refresh) await kv.put(`f:${s}:${ch}:${id}`, '1', { metadata: meta.index || {} });
    if (!after.size) { await kv.delete(ck); return [] }
    await putJson(ck, { ...rec, ...(meta.record || {}), ais: [...after].sort(), at: new Date().toISOString() });
    return [...after].sort();
  }

  return {
    async followWebPush(sub, ais) {
      const id = await endpointId(sub.endpoint), cur = (await getJson(`wp:${id}`)) || { ais: [] };
      let index = { e: sub.endpoint, p: sub.keys.p256dh, a: sub.keys.auth };
      if (JSON.stringify(index).length > 1000) index = { id }; // KV metadata is capped at 1024 bytes; fan-out reads wp:<id> instead
      const keysChanged = !cur.sub || cur.sub.keys.p256dh !== sub.keys.p256dh || cur.sub.keys.auth !== sub.keys.auth;
      return { id, ais: await setFollows('wp', id, [...new Set([...cur.ais, ...ais])], { index, record: { sub: { endpoint: sub.endpoint, keys: sub.keys } }, refresh: keysChanged }) };
    },
    async unfollowWebPush(endpoint, ais) {
      const id = await endpointId(endpoint), cur = await getJson(`wp:${id}`);
      if (!cur) return { id, ais: [] };
      const keep = ais && ais.length ? cur.ais.filter(s => !ais.includes(s)) : [];
      return { id, ais: await setFollows('wp', id, keep, { index: { e: cur.sub.endpoint, p: cur.sub.keys.p256dh, a: cur.sub.keys.auth } }) };
    },
    async webPushFollows(endpoint) { const r = await getJson(`wp:${await endpointId(endpoint)}`); return r ? r.ais : [] },
    async followTelegram(chatId, ais) { const cur = (await getJson(`tg:${chatId}`)) || { ais: [] }; return setFollows('tg', String(chatId), [...new Set([...cur.ais, ...ais])], {}) },
    async unfollowTelegram(chatId, ais) {
      const cur = await getJson(`tg:${chatId}`); if (!cur) return [];
      return setFollows('tg', String(chatId), ais && ais.length ? cur.ais.filter(s => !ais.includes(s)) : [], {});
    },
    async telegramFollows(chatId) { const r = await getJson(`tg:${chatId}`); return r ? r.ais : [] },
    // a recipient the channel reports as gone (push 404/410, Telegram 403 blocked): every index key and the record
    async remove(ch, id) {
      const r = await getJson(`${ch}:${id}`);
      for (const s of (r ? r.ais : SLUGS)) await kv.delete(`f:${s}:${ch}:${id}`);
      await kv.delete(`${ch}:${id}`);
    },
    // every recipient of an AI's alerts: its followers and the followers of "all", each once
    async recipients(slug) {
      const out = new Map();
      for (const s of [slug, 'all']) {
        let cursor;
        do {
          const page = await kv.list({ prefix: `f:${s}:`, cursor });
          for (const k of page.keys) {
            const [, , ch, ...rest] = k.name.split(':'), id = rest.join(':'), m = k.metadata || {};
            if (out.has(`${ch}:${id}`)) continue;
            if (ch === 'wp') {
              let sub = m.e ? { endpoint: m.e, keys: { p256dh: m.p, auth: m.a } } : null;
              if (!sub) { const r = await getJson(`wp:${id}`); sub = r && r.sub }
              if (sub) out.set(`wp:${id}`, { ch: 'wp', id, sub });
            } else if (ch === 'tg') out.set(`tg:${id}`, { ch: 'tg', id, chatId: id });
          }
          cursor = page.list_complete ? null : page.cursor;
        } while (cursor);
      }
      return [...out.values()];
    },
    async counts() {
      const c = {};
      for (const s of SLUGS) { let n = 0, cursor; do { const p = await kv.list({ prefix: `f:${s}:`, cursor }); n += p.keys.length; cursor = p.list_complete ? null : p.cursor } while (cursor); c[s] = n }
      return c;
    },
  };
}
