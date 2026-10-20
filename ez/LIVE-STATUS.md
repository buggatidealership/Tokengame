# earningszn.xyz: live status

**Date:** 2026-10-20 (Cloudflare setup run)

**Result: all five steps done.** Zone added, Pages project created, X2+ deployed as a preview and checked.
Preview: **https://preview.earningszn.pages.dev** (this deployment: https://5002e4ca.earningszn.pages.dev).
Nothing is in production yet: https://earningszn.pages.dev answers 404 and the domain is not attached.

**Set these two nameservers at GoDaddy** (replacing ns53/ns54.domaincontrol.com):
- `bella.ns.cloudflare.com`
- `noah.ns.cloudflare.com`

## What happened

1. **Token: works, with a catch.** Both variables are set (token 53 characters, account ID 32). It is an
   account-owned token, so the usual check (`/user/tokens/verify`) answers "Invalid API Token". The account check
   (`/accounts/<id>/tokens/verify`) answers success, status active. Scripts must use the account endpoint.
2. **Zone earningszn.xyz: added** (owner's go, 2026-10-20), Free plan, status **pending** until GoDaddy points to
   the two nameservers above. No DNS records or zone settings were added or changed.
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

## What the owner needs to do

1. **Check the preview** on your phone: https://preview.earningszn.pages.dev
2. **Set the two nameservers at GoDaddy** (Domain > DNS > Nameservers > "I'll use my own nameservers"). The zone
   turns active once Cloudflare sees them, usually within hours. Safe to do now: the domain today only has GoDaddy's
   parking addresses (A 13.248.243.5 and 76.223.105.230, www pointing to the bare domain), no email (MX) or TXT
   records. The new zone has no records yet, so the domain shows nothing until the site is attached.
3. **Say go for production** when ready: Claude then deploys to `main` and attaches earningszn.xyz (and www) to the
   Pages project, which adds the DNS records. The domain only serves once the zone is active (step 2).

Production deploy, custom domain, DNS records and zone settings were not touched and still wait for your go.
