# earningszn.xyz: live status

**Date:** 2026-10-20 (Cloudflare setup run)

**Result: zone added; stopped at step 3.** The token is missing the Cloudflare Pages permission, so there is no
Pages project and no preview yet.

**Set these two nameservers at GoDaddy** (replacing ns53/ns54.domaincontrol.com):
- `bella.ns.cloudflare.com`
- `noah.ns.cloudflare.com`

## What happened

1. **Token: works, with a catch.** Both variables are set (token 53 characters, account ID 32). It is an
   account-owned token, so the usual check (`/user/tokens/verify`) answers "Invalid API Token". The account check
   (`/accounts/<id>/tokens/verify`) answers success, status active. Scripts must use the account endpoint.
2. **Zone earningszn.xyz: added** (owner's go, 2026-10-20), Free plan, status **pending** until GoDaddy points to
   the two nameservers above. No DNS records or zone settings were added or changed.
3. **Pages project `earningszn`: not created.** Cloudflare refuses every Pages call with this token
   ("Authentication error", code 10000). The token can read zones, so it is valid; it simply has no Pages access.
4. **Build: OK.** X2+ built and the site was written to a scratch folder (/tmp/ezsite; the repo's `site/` was not
   touched): 237 files, 266 MB, largest file 8.6 MB (Pages allows 25 MB per file), round 30 TSMC film included.
5. **Preview deploy and curl checks: not run** (no project to deploy to).

## What the owner needs to do

1. **Edit the token** in the Cloudflare dashboard (Manage account > Account API tokens) and add:
   - Account > **Cloudflare Pages: Edit** (needed for steps 3 and 5)

   The token value does not change when you edit its permissions, so the environment settings can stay as they are.
2. **Set the two nameservers at GoDaddy** (Domain > DNS > Nameservers > "I'll use my own nameservers"). The zone
   turns active once Cloudflare sees them, usually within hours. Safe to do now: the domain today only has GoDaddy's
   parking addresses (A 13.248.243.5 and 76.223.105.230, www pointing to the bare domain), no email (MX) or TXT
   records. The new zone has no records yet, so the domain shows nothing until the site is attached.
3. Then rerun the setup: it picks up from step 3 (Pages project, preview, checks).

Production deploy, custom domain, DNS records and zone settings were not touched and still wait for your go.
