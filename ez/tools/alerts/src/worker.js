// ez-alerts: one Cloudflare Worker with two handlers over one KV namespace (binding EZ_ALERTS).
//   scheduled  the watcher, every 2 minutes (wrangler.toml [triggers]): sheet -> events -> followers -> Web Push / Telegram
//   fetch      /api/* (follow, unfollow, Telegram webhook, status, admin) and /sw.js, /manifest.webmanifest, reached through
//              zone routes on earningszn.xyz (there is no workers.dev subdomain; the cron needs none)
// Deployment steps and secrets: see the header of wrangler.toml.

import { route } from './api.js';
import { runWatcher, summary } from './watcher.js';

export default {
  fetch(request, env, ctx) {
    return route(request, env, ctx).catch(e => { console.error('ez-alerts fetch: ' + (e && e.stack || e)); return new Response('error', { status: 500 }) });
  },
  async scheduled(event, env, ctx) {
    try { const r = await runWatcher(env); const s = summary(r); if (s) (r.ok ? console.log : console.error)(s) }
    catch (e) { console.error('ez-alerts scheduled: ' + (e && e.stack || e)) }
  },
};
