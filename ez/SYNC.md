# EZ: what to do when the owner says "sheet has been updated"

The owner updates their private Google Sheet. A separate public sheet ("EZ public", shared
"Anyone with the link: Viewer") pulls only the needed columns from it with IMPORTRANGE.
Its link lives in `SHEET_CSV_URL` in `ez/ez-data.js`. The site never reads the sheet live:
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
3. **New ticker?** Add its company name once to `TICKERS` in ez-data.js (e.g. `CCL:"Carnival"`).
4. **New film?** Put the owner's file (square, ideally 1080x1080 or larger, 60 fps) through:
   ```
   F=<ffmpeg>; SRC=<upload>; N=round-7-jefferies
   $F -y -i "$SRC" -vf "scale=1080:1080:flags=lanczos,fps=60" -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 96k ez/media/$N-hd.mp4
   $F -y -i "$SRC" -vf "scale=1080:1080:flags=lanczos,fps=60" -c:v libvpx-vp9 -crf 33 -b:v 0 -row-mt 1 -deadline good -cpu-used 4 -c:a libopus -b:a 80k ez/media/$N-hd.webm
   $F -y -ss 18 -i "$SRC" -frames:v 1 -vf scale=1080:1080 -q:v 3 ez/media/$N-hd-poster.jpg
   ```
   (ffmpeg: `python3 -c "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())"`; `pip install imageio-ffmpeg` if missing.)
   Then add `7:{f:"round-7-jefferies-hd",p:"round-7-jefferies-hd-poster"}` to `FILMS` in ez-data.js.
   Check every number on screen in the film against the sheet before publishing.
   Until a film exists the round still counts everywhere and shows "Film soon".
5. **Check.** `node ez/tools/check_pages.js` must print `OK` for every page, with the expected
   round count and standings. Fix anything it reports.
6. **Commit and publish.** Commit, push the branch, and republish the preview pages
   (same file paths keep the same links):
   - Primetime: https://claude.ai/artifact/32CQftWp6gJUZiX6di64b4 (`ez/v6-primetime.html`)
   - Primetime in Variant 1's look: https://claude.ai/artifact/MHR1WUyvjBcnYkTWwdZQFp (`ez/v9-primetime-kraft.html`)
   Include `ez-data.js`, and any new `media/` files, in the publish.
7. **Report to the owner** in plain words: what changed, the new standings, any warnings,
   and what to QA.

## Notes
- Optional sheet column **REPORT TIME** (when the company reported): `BMO` (before the open), `AMC` (after the close) or `DURING`
  (market hours). Words like "after close" or "pre-market" are accepted too. It is shown on the round cards where a page supports it.
  Filling it in for a graded round is a detail, not a record edit, so it doesn't need `--allow-edits`.
- Variant 1 (`ez/v1-binder.html`) is frozen and uses its own copies of the original films. Do not touch it.
- Going live on GitHub Pages needs push access to the repository that hosts the site.
  The old site lives at buggatidealership.github.io/EZ (so, most likely, the `buggatidealership/EZ` repo).
