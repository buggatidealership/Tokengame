# earningszn.xyz: live status

**Date:** 2026-10-20 (Cloudflare setup run)

**Result (owner's go, 2026-10-20 evening): X2+ is in production on https://earningszn.pages.dev.** earningszn.xyz
and www.earningszn.xyz are attached to the Pages project but **wait on two DNS records** (see the end): Claude's
attempt to add them was blocked by the session's permission rules.

Production build: the working branch `claude/bugatti-dealership-redesign-845i5j` at ad72501 (X2+ with the
four-step first screen, built in a separate checkout; build.py output matched the committed page). It went to
preview first (https://7d05ba49.earningszn.pages.dev), was checked, then the same files went to `main`
(https://c141f70a.earningszn.pages.dev). The earlier preview (5002e4ca) carried the older first screen.

**Zone earningszn.xyz is active** (Cloudflare activated it at 19:31 UTC on 2026-10-20; checked 21:17 UTC).
Public DNS (Google, Cloudflare) now returns its nameservers, `bella.ns.cloudflare.com` and `noah.ns.cloudflare.com`.
The domain serves nothing yet: it has no DNS records until the site is attached.

## What happened

1. **Token: works, with a catch.** Both variables are set (token 53 characters, account ID 32). It is an
   account-owned token, so the usual check (`/user/tokens/verify`) answers "Invalid API Token". The account check
   (`/accounts/<id>/tokens/verify`) answers success, status active. Scripts must use the account endpoint.
2. **Zone earningszn.xyz: added** (owner's go, 2026-10-20), Free plan. The owner set the nameservers at GoDaddy and
   the zone went **active** at 19:31 UTC. No DNS records or zone settings were added or changed.
3. **Pages project `earningszn`: created** (production branch `main`) after the owner added Pages: Edit to the token.
   The first try had failed with "Authentication error" (code 10000) until then.
4. **Build: OK.** X2+ built and the site was written to a scratch folder (/tmp/ezsite; the repo's `site/` was not
   touched): 237 files, 266 MB, largest file 8.6 MB (Pages allows 25 MB per file), round 30 TSMC film included.
5. **Preview deploy: OK** (branch `preview`, 236 files plus `_headers`). The new subdomains refused TLS for about
   a minute while Cloudflare issued their certificate, then answered. Checks on https://preview.earningszn.pages.dev:
   - `/`: 200, text/html, 779 KB, title "$EZ · Earnings Zeason"
   - `/ez-data.js`: 200, application/javascript, 41 KB
   - `/media/commissioner/web/01-welcome.webp`: 200, image/webp, 38 KB
   - `/media/round-30-tsmc-hd.mp4` (HEAD): 200, video/mp4, cached for a year
   - `_headers` applied (nosniff, SAMEORIGIN, 60 s cache on the page). Cloudflare adds `noindex` to previews only.
   - Headless Chromium at phone width: the page renders (hero, bullets, chip timer, host), 0 failed requests,
     0 script errors.

6. **Production: OK.** On https://earningszn.pages.dev: `/` 200 (785 KB), `/ez-data.js` 200, the welcome pose 200,
   round 30 film 200 (video/mp4), no `noindex`. Headless Chromium at phone width on the same build: renders,
   0 failed requests, 0 script errors.
7. **Custom domains: attached, pending.** Cloudflare reports "CNAME record not set" for both. The zone has no
   DNS records; the API attach does not create them (the dashboard flow does).

## What the owner needs to do

Add two DNS records in Cloudflare (earningszn.xyz > DNS > Records > Add record), or open Workers & Pages >
earningszn > Custom domains and use the button there that sets them up:

| Type  | Name | Target                 | Proxy   |
|-------|------|------------------------|---------|
| CNAME | `@`  | `earningszn.pages.dev` | Proxied |
| CNAME | `www`| `earningszn.pages.dev` | Proxied |

Cloudflare then verifies both domains and issues their certificates, usually within minutes. Or allow Claude to
create DNS records in the session's permission settings and say so.

Zone settings were not changed.
