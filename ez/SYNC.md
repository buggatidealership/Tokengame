# EZ: what to do when the owner says "sheet has been updated"

The owner updates their private Google Sheet. A separate public sheet ("EZ public", shared
"Anyone with the link: Viewer") pulls only the needed columns from it with IMPORTRANGE.
Its link lives in `ez/tools/sheet_url.txt` (since 2026-10-09 the owner's sheet "EZ Official 2", rounds tab) (kept out of `ez-data.js`, which ships with every published page; the sheet also holds the prompts). The site never reads the sheet live:
we take a checked snapshot into `ez-data.js`, then publish. The owner QAs afterwards.

## Routine

1. **Dry run.** `python3 ez/tools/sync_sheet.py`
   Downloads the sheet, checks it and prints what changed plus the new standings. Changes nothing.
   - `PROBLEM:` lines mean stop. Tell the owner exactly which cell is wrong. Do not write.
   - `RECORD EDIT` means an already graded round changed. The site promises "never edited",
     so ask the owner to confirm it is intentional; only then use `--allow-edits`.
   - `WARNING:` lines (new ticker without a company name, graded round without a film) are fine
     to publish, but mention them.
   - A call with a direction but no size (or the reverse) in a round **not graded yet** is a call still being typed in:
     the sync leaves it out with a `WARNING` and the next sync picks it up (owner, 2026-10-20: "the sheet is the most up to
     date; the page must reflect it"). In a graded round it is still a `PROBLEM`.
2. **Write.** `python3 ez/tools/sync_sheet.py --write` (only the `SHEET` rows in ez-data.js change).
3. **New ticker?** Add its company name once to `TICKERS` in ez-data.js (e.g. `CCL:"Carnival"`). Then fetch its logo: `pip install pillow` once, then `python3 ez/tools/fetch_logos.py` (adds the file to `ez/media/logos/` and rewrites `CO_LOGOS`). Look at the new logo: the source is sometimes wrong; replace the file by hand if so. Publish new logo files with the pages.
4. **New film?** Put the owner's file (square, ideally 1080x1080 or larger, 60 fps) through:
   ```
   F=<ffmpeg>; SRC=<upload>; N=round-7-jefferies
   $F -y -i "$SRC" -vf "scale=1080:1080:flags=lanczos,fps=60" -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 96k ez/media/$N-hd.mp4
   $F -y -i "$SRC" -vf "scale=1080:1080:flags=lanczos,fps=60" -c:v libvpx-vp9 -crf 33 -b:v 0 -row-mt 1 -deadline good -cpu-used 4 -c:a libopus -b:a 80k ez/media/$N-hd.webm
   $F -y -sseof -0.3 -i "$SRC" -frames:v 1 -vf scale=1080:1080:flags=lanczos -q:v 3 ez/media/$N-hd-poster.jpg
   ```
   (ffmpeg: `python3 -c "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())"`; `pip install imageio-ffmpeg` if missing.)
   The poster is the last frame (the end card with the result, the $EZ badge and the motto).
   Zoom: the cards show the full height of the film but only 63 to 90% of its width (63% on a 320px phone, 75 to 90% elsewhere).
   If the owner's frame has wide empty margins, zoom by putting `crop=S:S:X:Y,` before `scale=` in all three commands
   (e.g. `crop=2034:2034:130:65` on a 2160 film is 1.06x). If the board already fills the frame, do not zoom: it cuts the
   board's edges on phones. Look at the card with the poster at 366, 428 and 1280px before publishing; the badge and the motto must show.
   A changed film gets a new file name (e.g. `round-16-apld-wide-hd`) so no one sees a cached old one.
   Then add `7:{f:"round-7-jefferies-hd",p:"round-7-jefferies-hd-poster"}` to `FILMS` in ez-data.js.
   Check every number on screen in the film against the sheet before publishing, and the move against the official closes
   (last close before the report to the first close after it; e.g. Nasdaq's historical prices).
   Until a film exists the round still counts everywhere and shows "Film soon".
5. **Check.** `node ez/tools/check_pages.js` must print `OK` for every page, with the expected
   round count and standings. Fix anything it reports.
6. **Commit and publish (owner, 2026-10-21: only two pages now).** Rebuild (`python3 tools/v22/build.py tools/v22` from `ez/`), republish only EZ Live X2+ (https://claude.ai/artifact/9dPsU3tcgmC9RAzQZy9Mg5, with `ez-data.js` and any new media; it is near its 256 MiB cap), then `python3 tools/site/make_site.py` and deploy `site/` to the main website (see the earningszn.xyz note). Do not republish any other page. The rest of this step is history:
   6. **Commit and publish.** (While the experiments X1 and X2 exist, `build.py` also rebuilds `v23-live-x1.html` and `v24-live-x2.html`; republish those too, same file paths, and include any new film or logo files.) Commit, push the branch, rebuild the built pages (`python3 tools/v22/build.py tools/v22` from `ez/`), and republish the pages below (same file paths keep the same links):
   - EZ Season: https://claude.ai/artifact/XxQqLLfSx18hzSV9qawyeN (`ez/v15-season.html`)
   - EZ Live X2 (main page): https://claude.ai/artifact/1HuRhevBKLrUfzBR5UUaZL (`ez/v24-live-x2.html`)
   - EZ Live X3: https://claude.ai/artifact/4J3oqRt4mxzHKFi3bHuQip (`ez/v41-live-x3.html`)
   - EZ Live X4: https://claude.ai/artifact/K7xzLYcpomVXNtk6K2oioG (`ez/v42-live-x4.html`)
   - EZ Live X5: https://claude.ai/artifact/V5MQDmHsrRQkzrHfK9KQC6 (`ez/v43-live-x5.html`)
   - EZ Live X2+: https://claude.ai/artifact/9dPsU3tcgmC9RAzQZy9Mg5 (`ez/v46-live-x2plus.html`, built by build.py after X6)
   - EZ Live X3+: https://claude.ai/artifact/H1uXHpDV6GmJcaef11n8RQ (`ez/v47-live-x3plus.html`, built by build.py right after X2+; X2+ with letterpress straps; owner, 2026-10-22). Republish it with X2+ (with `ez-data.js` and any new media), and its preview branch: `SITE_OUT=<dir> SITE_PAGE=v47-live-x3plus.html python3 tools/site/make_site.py`, then `npx --yes wrangler@4 pages deploy <dir> --project-name earningszn --branch x3plus` (https://x3plus.earningszn.pages.dev; never `--branch main`).
   Include `ez-data.js`, and any new `media/` files, in the publish. (Primetime and Primetime Kraft previews were deleted on 2026-10-03; their source files are kept.)
7. **Report to the owner** in plain words: what changed, the new standings, any warnings,
   and what to QA.

## Notes
- **The film is final (owner, 2026-10-14: "whatever the animation says, that's what it should be").** If a round's film
  and the sheet or the site disagree on a number, the site follows the film: do not ask. If the sheet differs, pin the
  film's value with `KEEP` in `ez/tools/sync_sheet.py` and tell the owner in one line that the sheet still differs.
- **Small gaps to the official close (owner, 2026-10-14).** The owner reads the closing price just after the bell, so a
  move can differ from the official close by a few hundredths (R19 JPM -0.78 vs -0.86 official; R21 UNH, R23 WFC, R25 DPZ
  0.01 to 0.04). The owner's number stands ("keep as is"); report the gap, but do not hold a film for it. The owner will
  wait longer after the close for future rounds.
- **Kept values (`KEEP` in `ez/tools/sync_sheet.py`).** A graded value the owner chose to keep after the sheet changed
  it. The sync prints a KEEP note and writes the kept value, with no RECORD EDIT. Empty now: R22 GS used it (-0.27) until
  the owner chose the sheet's -0.21 on 2026-10-14, which matches the round's film (official close-to-close -0.23).
- **earningszn.xyz (owner, 2026-10-20).** The live page is now **X2+** (v46), on the owner's domain earningszn.xyz
  (registered at GoDaddy; nameservers move to Cloudflare). make_site.py builds X2+ with the host's poses
  (media/commissioner/web), canonical and share tags, security headers and robots.txt; `SITE_OUT=<dir>` builds into a
  test folder without touching site/. Deploys go by a Cloudflare API token (CLOUDFLARE_API_TOKEN and
  CLOUDFLARE_ACCOUNT_ID in the environment settings, never in chat) with wrangler direct upload to the Pages project
  `earningszn`; production deploys and domain changes only on the owner's go. The 2026-10-17 note below is history.
  **Caching (2026-10-20):** Cloudflare's zone setting (Browser Cache TTL, 4 hours) overrides `_headers` for .js files, so a
  sync once showed up in Chrome but not in Brave. make_site.py now loads ez-data.js and ez-learn.js as `?v=<content hash>`;
  the page itself refreshes within a minute, so every sync is live on the next reload. Check the live site without a
  cache-busting query (the stamped address is what visitors get).
- **Live site (2026-10-17).** The public site is X2 on Cloudflare Pages, built from the `site/` folder at the repo root
  (production branch: this working branch; build command: none; output directory: `site`). After every sync or film,
  from ez/: `python3 tools/v22/build.py tools/v22 && python3 tools/site/make_site.py`, then commit `site/` and push;
  Cloudflare redeploys in about a minute. `site/` only changes when make_site.py runs, so other pushes do not change
  the live site. Keep publishing the artifacts as previews (data only once a film no longer fits).
- **The proof on the ticket (2026-10-23)** rides the same switch: make_site.py also sets `window.__x2pClassicProof` unless `SITE_TIX=1`, so production keeps the page's own stats switch.
- **The ticket standings switch (2026-10-23).** X2+ carries the standings as printed tickets (preview only). make_site.py builds production with today's board by default (it sets `window.__x2pClassicBoard` in the page; the PRINTED lettering is not behind it and is live); `SITE_TIX=1` builds with the tickets, for the preview branch only: `SITE_TIX=1 SITE_OUT=<dir> python3 tools/site/make_site.py`, then `wrangler pages deploy <dir> --branch preview`. So a plain make_site.py + `--branch main` deploy is safe again while the tickets wait for the owner's go; when the owner approves them, make the tickets the default.
- **Production behind the preview (2026-10-22).** While X2+ carries changes the owner has not approved for earningszn.xyz, a sheet sync goes live data-only: copy `site/` (after make_site.py) to a scratch folder, put back production's own `index.html` from the last commit that went live (`git show <commit>:site/index.html`, 2026-10-22: f7a80fa), swap its `ez-data.js?v=` hash for the new one, check that every media file it names is in the folder and that `git diff <commit> -- site/` changes only `ez-data.js`, then `wrangler pages deploy <folder> --branch main`. The first time: LMT round 42, INTC round 43.
- **X2+ preview at its cap (2026-10-21).** To fit the R33 Netflix film, the preview dropped `media/round-9-micron-hd.webm` (the page falls back to the mp4, as round 6 already does). For R34 SpaceX the preview took only the mp4 and poster (no webm) and dropped `round-4-generalmills-hd.webm` and `round-13-rpm-hd.webm`. For R35 PM, again mp4 and poster only, dropping `round-7-jefferies-hd.webm` and `round-5-blackberry-hd.webm`. For the explainer film (2026-10-21), the preview took `media/ez-landing-hd.mp4` only (replaced by `ez-landing-v2.mp4` on 2026-10-22, the lip sync fix) and dropped `round-1-gamestop-hd.webm`, `round-3-autozone-hd.webm` and `round-10-accenture-hd.webm`. For R38 META (2026-10-23), mp4 and poster only on X2+ and X3+, dropping `round-11-nike-hd.webm` on both. The next film needs the same treatment (`files: {"media/<old>.webm": null}`); the live site keeps everything.
- **Artifact size cap (2026-10-17).** One artifact version holds at most 256 MiB. X2 reached it with round 30: films 26
  to 30 were encoded at crf 25 (mp4) and crf 35 (webm), and unused files were removed (old round-19-jpmorgan-hd.*,
  ez-gpu.jpg, ez-gpu-1200.jpg). Each new film adds about 4 to 9 MB, so the next films will not fit until the pages
  load films from somewhere else or older films are re-encoded smaller. Ask the owner before choosing.
- **R30 TSMC (2026-10-15), graded -2.01% (owner, 2026-10-16):** the owner grades TSMC on the Taiwan close of the
  sheet's outcome date (2490 Oct 14 -> 2440 Oct 15), although TSMC released its results with its 14:00 Taipei call,
  after that 13:30 close. The sheet's number stands for the close window too: mention a timing concern once, in one
  line, and do not hold the result. (For the record, after the report: Taipei Oct 16 -0.82%, TSM in New York Oct 15
  -1.80%.)
- **R26 ASML (2026-10-14):** Kimi's call changed in the sheet after the site had shown it (UP 2.5 -> DOWN 2). The owner
  confirmed the change and the other three calls were made before the earnings cutoff, so the sheet's calls stand.
- **Renumbering.** The sync matches rounds by ticker + call date, not by number. A renumbered sheet shows up as
  `MOVED` lines; FILMS, PREFILMS, RECEIPTS and CARDS follow their round automatically on `--write`. Moving a graded
  round changes its public link, so it is a `RECORD EDIT` (confirm with the owner, then `--allow-edits`). The same round
  entered twice (`SAME ROUND TWICE`) and a number used twice always block, whatever the flags. Rows are written in
  round order, and the new ez-data.js is syntax-checked with node before it is saved.
- **Struck rounds.** A round that must not count (e.g. calls sent after the report) goes in `VOID` in `ez/tools/sync_sheet.py`,
  keyed by ticker and call date. The sync then skips it whatever its ROUND cell says. R14 Constellation Brands (STZ, called 10/06/26)
  is struck (owner, 2026-10-07). SAP (called 10/21/26, graded +3.21%) is struck too (owner, 2026-10-22: the calls came in around 6 pm, after SAP's results in Europe; SAP released at 22:05 CEST, 16:05 New York, so this holds if the calls were after 16:05 New York time); the owner removed its row and renumbered, so LMT and SPOT moved from R42 and R43 to R41 and R42 (record edits, confirmed).
- Optional sheet column **REPORT TIME** (when the company reported): `BMO` (before the open), `AMC` (after the close) or `DURING`
  (market hours). Words like "after close" or "pre-market" are accepted too. It is shown on the round cards where a page supports it.
  Filling it in for a graded round is a detail, not a record edit, so it doesn't need `--allow-edits`.
- Variant 1 (`ez/v1-binder.html`) is frozen and uses its own copies of the original films. Do not touch it.
- Going live on GitHub Pages needs push access to the repository that hosts the site.
  The old site lives at buggatidealership.github.io/EZ (so, most likely, the `buggatidealership/EZ` repo).

- **X6 artifact size (2026-10-18):** X6 (https://claude.ai/artifact/PA6WGQyb1j7pXHboKaeTLt) holds about 265 MB of the 268 MB (256 MiB) cap. It has no low-res round 3 to 6 films (only Variant 1 uses those). Send media in publishes of under 64 MiB each (one publish is refused above that). Like X2, new films go to the live site once the artifact is full.
- **Previews full (2026-10-20):** X2, X4, X5 and X6 are at the 256 MiB cap; from round 31 (IBKR) their films go to the live
  site only (they keep their last ez-data.js). X2+ made room by dropping files the page never loads (host poses 06, 08, 14,
  19) and round 6's WebM (the page falls back to its MP4; the live site keeps both). EZ Season, X3 and X7 still take films.
- **X2+ artifact size (2026-10-19):** X2+ (https://claude.ai/artifact/9dPsU3tcgmC9RAzQZy9Mg5) holds the same 218 files as X6 (about 253 MiB of the 256 MiB cap), sent in five publishes of under 64 MiB. A new film may not fit: then it goes to the live site only, as with X2 and X6.
