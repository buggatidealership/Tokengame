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
6. **Commit and publish.** (While the experiments X1 and X2 exist, `build.py` also rebuilds `v23-live-x1.html` and `v24-live-x2.html`; republish those too, same file paths, and include any new film or logo files.) Commit, push the branch, rebuild Season Live (`python3 ez/tools/v22/build.py ez/tools/v22` from `ez/`), and republish the two preview pages (same file paths keep the same links):
   - EZ Season: https://claude.ai/artifact/XxQqLLfSx18hzSV9qawyeN (`ez/v15-season.html`)
   - EZ Season Live: https://claude.ai/artifact/3FJq71NA8CwsLN2rZZxNa8 (`ez/v22-season-live.html`)
   Include `ez-data.js`, and any new `media/` files, in the publish. (Primetime and Primetime Kraft previews were deleted on 2026-10-03; their source files are kept.)
7. **Report to the owner** in plain words: what changed, the new standings, any warnings,
   and what to QA.

## Notes
- **Renumbering.** The sync matches rounds by ticker + call date, not by number. A renumbered sheet shows up as
  `MOVED` lines; FILMS, PREFILMS, RECEIPTS and CARDS follow their round automatically on `--write`. Moving a graded
  round changes its public link, so it is a `RECORD EDIT` (confirm with the owner, then `--allow-edits`). The same round
  entered twice (`SAME ROUND TWICE`) and a number used twice always block, whatever the flags. Rows are written in
  round order, and the new ez-data.js is syntax-checked with node before it is saved.
- **Struck rounds.** A round that must not count (e.g. calls sent after the report) goes in `VOID` in `ez/tools/sync_sheet.py`,
  keyed by ticker and call date. The sync then skips it whatever its ROUND cell says. R14 Constellation Brands (STZ, called 10/06/26)
  is struck (owner, 2026-10-07).
- Optional sheet column **REPORT TIME** (when the company reported): `BMO` (before the open), `AMC` (after the close) or `DURING`
  (market hours). Words like "after close" or "pre-market" are accepted too. It is shown on the round cards where a page supports it.
  Filling it in for a graded round is a detail, not a record edit, so it doesn't need `--allow-edits`.
- Variant 1 (`ez/v1-binder.html`) is frozen and uses its own copies of the original films. Do not touch it.
- Going live on GitHub Pages needs push access to the repository that hosts the site.
  The old site lives at buggatidealership.github.io/EZ (so, most likely, the `buggatidealership/EZ` repo).
