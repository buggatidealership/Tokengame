// HTTP: the follow endpoints, the Telegram webhook, status and admin, and the three static files the browser needs.
//   GET  /api/config           {vapidKey, telegramBot}
//   POST /api/follow           {subscription:{endpoint,keys:{p256dh,auth}}, ais:["grok"], confirm?:true}  adds AIs; sends "You follow Grok"
//   POST /api/unfollow         {endpoint, ais?}   removes those AIs, or all
//   POST /api/following        {endpoint}         -> {ais}
//   POST /api/tg               Telegram webhook (secret header checked)
//   GET  /api/status           health, no secrets and no follower data
//   POST /api/admin/{run,release,drop,tg-setup,stats}   Authorization: Bearer <ADMIN_TOKEN>; 404 when ADMIN_TOKEN is not set
//   GET  /sw.js, /manifest.webmanifest, /api/client.js, /api/try (a bare test page), /api/try.webmanifest

import { makeStore, cleanAis } from './store.js';
import { b64u, endpointAllowed, sendPush } from './webpush.js';
import { handleWebhook, tgSetup, same } from './telegram.js';
import { vapidOf, channels } from './dispatch.js';
import { runWatcher, releaseHeld, STATE_KEY, summary } from './watcher.js';
import { AI_BY_SLUG } from './sheet.js';
import { SW_JS, MANIFEST, CLIENT_JS, TRY_HTML } from './static.js';

const json = (v, status = 200, h = {}) => new Response(JSON.stringify(v), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...h } });
const text = (body, type, h = {}) => new Response(body, { headers: { 'content-type': type, ...h } });
const origins = env => (env.SITE_ORIGINS || 'https://earningszn.xyz,https://www.earningszn.xyz').split(',').map(s => s.trim()).filter(Boolean);

async function body(req, max = 4096) {
  const t = await req.text(); if (t.length > max) throw new Error('body too large');
  return JSON.parse(t || '{}');
}

function validSub(s) {
  if (!s || typeof s.endpoint !== 'string' || s.endpoint.length > 1024 || !s.keys) return false;
  try { const p = b64u.dec(s.keys.p256dh), a = b64u.dec(s.keys.auth); return p.length === 65 && p[0] === 4 && a.length === 16 } catch { return false }
}
const followName = ais => ais.map(s => (s === 'all' ? 'all five AIs' : AI_BY_SLUG[s].name)).join(', ');

export async function route(req, env, ctx = {}) {
  const url = new URL(req.url), p = url.pathname, method = req.method, origin = req.headers.get('origin');
  const allowed = origin && origins(env).includes(origin);
  const cors = allowed ? { 'access-control-allow-origin': origin, vary: 'origin' } : {};
  if (method === 'OPTIONS') return new Response(null, { status: allowed ? 204 : 403, headers: { ...cors, 'access-control-allow-methods': 'GET, POST', 'access-control-allow-headers': 'content-type', 'access-control-max-age': '86400' } });

  // static files (served only where the Worker has a route for them; the Pages site can carry its own copies instead)
  if (method === 'GET' && p === '/sw.js') return text(SW_JS, 'text/javascript; charset=utf-8', { 'cache-control': 'no-cache' });
  if (method === 'GET' && p === '/manifest.webmanifest') return text(MANIFEST, 'application/manifest+json', { 'cache-control': 'public, max-age=3600' });
  if (method === 'GET' && p === '/api/client.js') return text(CLIENT_JS, 'text/javascript; charset=utf-8', { 'cache-control': 'public, max-age=300' });
  if (method === 'GET' && p === '/api/try') return text(TRY_HTML, 'text/html; charset=utf-8', { 'x-robots-tag': 'noindex', 'cache-control': 'no-cache' });
  if (method === 'GET' && p === '/api/try.webmanifest') return text(MANIFEST.replace('"start_url": "/?source=homescreen"', '"start_url": "/api/try"'), 'application/manifest+json');

  const kv = env.EZ_ALERTS; if (!kv) return json({ ok: false, error: 'no KV binding' }, 500);
  const store = makeStore(kv);

  if (method === 'GET' && p === '/api/config') return json({ vapidKey: env.VAPID_PUBLIC_KEY || null, telegramBot: env.TG_BOT_USERNAME || null, ais: Object.keys(AI_BY_SLUG) }, 200, cors);
  if (method === 'GET' && p === '/api/status') {
    const raw = await kv.get(STATE_KEY), s = raw ? JSON.parse(raw) : null;
    return json({ ok: true, seeded: !!(s && s.seededAt), seededAt: s && s.seededAt, updatedAt: s && s.updatedAt, pending: s ? Object.keys(s.pending).length : 0,
      outbox: s ? s.outbox.length : 0, held: !!(s && s.held), channels: channels(env), log: s ? s.log.slice(0, 10).map(n => ({ type: n.type, ticker: n.ticker, ai: n.ai, at: n.at })) : [] }, 200, cors);
  }
  if (method === 'POST' && p === '/api/tg') return handleWebhook(req, env, store);

  if (method === 'POST' && (p === '/api/follow' || p === '/api/unfollow' || p === '/api/following')) {
    if (!allowed && env.ALLOW_ANY_ORIGIN !== '1') return json({ ok: false, error: 'origin not allowed' }, 403);
    let b; try { b = await body(req) } catch (e) { return json({ ok: false, error: 'bad request' }, 400, cors) }
    if (p === '/api/follow') {
      const vapid = vapidOf(env); if (!vapid) return json({ ok: false, error: 'web push is not configured' }, 503, cors);
      const sub = b.subscription, ais = cleanAis(b.ais || []);
      if (!validSub(sub)) return json({ ok: false, error: 'bad subscription' }, 400, cors);
      if (!endpointAllowed(sub.endpoint, env)) return json({ ok: false, error: 'unknown push service' }, 400, cors);
      if (!ais.length) return json({ ok: false, error: 'name an AI: gpt, claude, grok, gemini, qwen or all' }, 400, cors);
      const r = await store.followWebPush({ endpoint: sub.endpoint, keys: { p256dh: sub.keys.p256dh, auth: sub.keys.auth } }, ais);
      let confirmed = null;
      if (b.confirm !== false) {
        const n = followName(ais);
        const res = await sendPush(sub, { title: `You follow ${n}`, body: `${ais.length === 1 && ais[0] !== 'all' ? 'Its' : 'Their'} next trade lands here before the earnings report, and the P&L at the close.`, url: (env.SITE_ORIGIN || 'https://earningszn.xyz') + '/', tag: 'ez-follow', ttl: 600, urgency: 'normal' }, vapid);
        confirmed = res.ok;
        if (res.gone) { await store.remove('wp', r.id); return json({ ok: false, error: 'the push service refused this subscription' }, 400, cors) }
      }
      return json({ ok: true, ais: r.ais, confirmed }, 200, cors);
    }
    const endpoint = b.endpoint || (b.subscription && b.subscription.endpoint);
    if (typeof endpoint !== 'string') return json({ ok: false, error: 'bad request' }, 400, cors);
    if (p === '/api/following') return json({ ok: true, ais: await store.webPushFollows(endpoint) }, 200, cors);
    const r = await store.unfollowWebPush(endpoint, cleanAis(b.ais || []));
    return json({ ok: true, ais: r.ais }, 200, cors);
  }

  if (method === 'POST' && p.startsWith('/api/admin/')) {
    if (!env.ADMIN_TOKEN) return json({ ok: false, error: 'not found' }, 404);
    if (!same((req.headers.get('authorization') || '').replace(/^Bearer\s+/i, ''), env.ADMIN_TOKEN)) return json({ ok: false, error: 'forbidden' }, 401);
    const a = p.slice('/api/admin/'.length);
    if (a === 'run') { const r = await runWatcher(env, { dryRun: url.searchParams.get('dry') === '1' }); return json({ ok: r.ok, summary: summary(r), error: r.error, events: r.events.length, results: r.results }) }
    if (a === 'release' || a === 'drop') return json(await releaseHeld(env, { drop: a === 'drop' }));
    if (a === 'tg-setup') return json(await tgSetup(env));
    if (a === 'stats') return json({ ok: true, followers: await store.counts() });
  }
  return json({ ok: false, error: 'not found' }, 404, cors);
}
