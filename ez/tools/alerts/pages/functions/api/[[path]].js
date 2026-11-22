// Optional: the same /api/* router as a Cloudflare Pages Function, if the owner prefers the endpoints inside the Pages project.
// To use it: copy ez/tools/alerts/pages/functions into the folder `wrangler pages deploy` runs from (Pages compiles ./functions
// relative to the current directory), bind the KV namespace to the Pages project as EZ_ALERTS, set the same secrets with
// `wrangler pages secret put`, and copy public/sw.js and public/manifest.webmanifest into the site root. The cron still needs the
// Worker (Pages Functions have no cron): deploy src/worker.js without routes. The recommended setup is the Worker alone (wrangler.toml).
import { route } from '../../../src/api.js';
export const onRequest = ctx => route(ctx.request, ctx.env, ctx);
