# H26 · meet10: Meet the models, the line in the chip, fed by the ledger strip

Brief: `../BRIEF-H.md`, Round H26, `meet10`. Mockups laid over the built `v46-live-x2plus.html` (chips8 take c, live). Nothing in `ez/tools/v22/`, `ez/v4*.html` or `ez/media/` changed; nothing deployed or published. Hedra: $0 (the chip's own paintings edited in PIL). Saved by the lead from the helper's hand-back (the helper's Write was blocked).

## Boards
- `ez/x2p-h26-meet10-390.png`: today, S1·A, S1·B, S2·A, S2·B (frozen at the moment with the most pulses landing, green and red both).
- `ez/x2p-h26-meet10-1280.png`: the same on desktop; the strip runs down the gap between the columns.
- `ez/x2p-h26-meet10-pnl.png`: A beside B, 3x at 390, on GPT and Kimi.
- `ez/x2p-h26-meet10-strips.png`: the two strips, 3x.
- `ez/x2p-h26-meet10-320.png`: the 320 check.
- `ez/x2p-h26-meet10-s2b.mp4`: S2 × B moving, 8 s, 780x1688, 30 fps.

## The chip (every take)
- The line goes in the SEASON window: `gen.py` makes `out/chip10-<m>-1800/1200.jpg/.webp` from the live `chip8c` paintings; a window 9-sliced from the chip's own SEASON window covers the SEASON label, window, gold rule and foot band at (408,418)-(1251,603) of the 1800 px painting, aligned to the name bar and the No. box, identical on all four chips. The line is read from x2p_chips.js `LINE` (computed). The balloons go; the row gap drops from 46 to 10 px.
- Fit: Anton, one sentence per line, a wrapping sentence split where its halves are most even, centred; one size for all four chips, measured on a canvas. Cap height: 10.75 (S1) / 10.25 (S2) px at 390; 9.75 / 9.25 at 360; 16 / 15.75 at 1280; 8.5 / 8 at 320 (under the 9 px floor). Longest: "Shorts almost everything. / Somehow it's working." (47 characters).
- W-L goes in the LAST ROUND window: "45-27", W in the chip's green, L in its red, the dash amber; cap 11.7 to 12.7 px at 390. The painted "LAST ROUND" label patched out; a live "W-L" label in the painted labels' size and ink.
- LAST 7 DAYS and No. untouched.

## The open question: A or B
- A: the season P&L leaves the chip (as the owner said).
- B: it stays as a small lit line under LAST 7 DAYS ("SEASON +$148,480"), about 8 px cap at 390.
- Lean B, measured: the head says "Ranked by season P&L"; in A the only money on the chip is LAST 7 DAYS, and today No. 3 GPT shows −$79,220 above No. 4 Kimi at −$34,080 (season: GPT −$56,930, Kimi −$70,650), so the order looks wrong. Any week where the 7-day order differs from the season order repeats it.

## The strip (two takes)
- Shared: meetbus's painted housing (`mb-strip`, `mb-bundle`), left on phones, the column gap on desktop; the 12 newest graded rounds run up it; as a round passes a chip's trace a pulse runs in, green if that model's trade went the right way, red if not (`__x2pPnl().A[m].per[n].v`), landing on the W-L window (W or L lights). No pulse for a model that didn't trade. Reduced motion: still, the newest round shown and its traces lit.
- S1 · the strip (meetbus A): "R80 Exxon Mobil (XOM) +2.17%" on its side, 13 px; chips 332 px wide at 390.
- S2 · the tape: each round a ticket read upright: "R80", the company logo lit in amber (dark logos inverted), the move to one decimal; chips 320 px at 390.

## Pick: S2 × B
S2 keeps the owner's strip but reads flat and leads with the logo; B keeps the ranking explainable. S1 if the round names should be spelled out.

## Checks
At 320, 390 and 1280 in all four takes: no sideways scroll, no overflow, no console errors; no painted words; every number computed; no perspective layers; each frame changes only transforms, opacity and CSS variables on fewer than 25 elements, only near the screen. Not measured on a 4x slower CPU. Safari not checked.

## Drop-in
Quick path: copy `out/chip10-{grok,claude,gpt,kimi}-{1200,1800}.{jpg,webp}` and `../meetbus/out/pub/mb-{strip,bundle}.{webp,jpg}` flat into `ez/media/`; copy `dropin/x2p_meet10.js/.css` to `ez/tools/v22/story/`; add both to build.py's X2+ story list right after `x2p_chips` (default S2 × B; `window.__M10S='s1'`, `window.__M10P='a'` for the others; media names are in the file's first comment). Proper path: fold into `x2p_chips.js` (chip10 paintings, the line window, W-L window, no `.c8-bal`, the screen-reader list updated), then add the strip.

## How it could fail
- The W or L flash may not read as "this round counted as a W".
- The tape loops 12 old rounds; a pulse may look live.
- The tape's moves are small (about 7 px at 390).
- At 320 the line is 8 to 8.5 px cap height.
- B's season line is small and adds a third money figure.
- The 9-sliced window stretches the painted glare 1.7x vertically.

## Files
`gen.py`, `_m10.js`, `_m10.css`, `run.js` (`node run.js 390 s2 b out.png`; `SEEK=1`), `close.js`, `measure.js`, `rec.js`, `board.py`, `dropin/`. Serve `ez/` on port 8963.
