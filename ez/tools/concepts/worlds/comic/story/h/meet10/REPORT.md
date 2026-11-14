# H26 · meet10: Meet the models, the quote in the chip, fed by the ledger strip (final)

Saved by the lead from the helper's hand-back (the helper's Write was blocked). Ported to X2+ and live on earningszn.xyz on 2026-11-02 (`tools/v22/story/x2p_meet10.js/.css`, loaded right after x2p_chips by build.py).

## The owner's pick (2026-11-02)
The strip S1 ("the strip × B"); no LAST 7 DAYS window. The chip reads: name and No.; SEASON P&L in the big window where LAST 7 DAYS was (full figure, green or red, the biggest figure; the painted label patched out, a live "SEASON" in its place, so the No. order "Ranked by season P&L" explains itself); W-L in the old LAST ROUND window (W green, dash amber, L red; live "W-L" label); the quote in one tall glass window where SEASON was (computed, x2p_chips.js `LINE`; one size for all four chips, a sentence per line, a wrapping sentence split where its halves are most even). The balloons are gone; the chips close up (row gap 46 → 10 px).

## Paintings
`gen.py` → `out/chip11-{grok,claude,gpt,kimi}-{1200,1800}.{jpg,webp}` from the live chip8c paintings: LAST 7 DAYS (410,248)-(516,332) and LAST ROUND (1018,367)-(1218,417) patched with clean matte, feathered; the quote window 9-sliced from the chip's SEASON window at (408,418)-(1251,603) of the 1800 px painting, aligned to the name bar and the No. box, identical on all four. No words painted. 1800x728 and 1200x485 (1800 webp about 0.26 MB), at least 3x the CSS width at 390 and 1280. Hedra $0. Round one's `chip10-*` and `_m10-first.js/.css` kept for history.

## Measured (site fonts, reduced motion on)
| | 320 | 390 | 1280 |
|---|---|---|---|
| Quote cap height | 8.5 px (under 9) | 10.75 px | 16 px |
| SEASON figure | 10.8 px | 13.6 px | 21 px |
| W-L | 9.9 px | 12.7 px | 18.3 px |
| Labels | 5 px | 6 px | 9 px |
No sideways scroll, no errors, no label overflow at any width; 9.75 px at 360. Screen readers: "No. 1 Grok 4.7, United States. Shorts almost everything. Somehow it's working. Season P&L: +$148,480. W-L: 45-27." `droptest.js` loads the drop-in as production does: no errors.

## The strip (S1)
The meetbus housing (`mb-strip`, `mb-bundle`) down the left on phones, down the column gap on desktop; the 12 newest graded rounds run up it on their side ("R80 Exxon Mobil (XOM) +2.17%"); as a round passes a chip's trace a pulse runs in, green if that model's trade went the right way (`__x2pPnl().A[m].per[n].v`), red if not, landing on the W or the L; no pulse for a model that didn't trade. Transforms, opacity and CSS variables only, only near the screen; still with reduced motion. S2 (the tape) behind `window.__M10S='s2'`.

## Lead's checks at the port
Under a 40 MB GPU cap (`--force-gpu-mem-available-mb=40`, 390, 2.75x) the live Meet the models before the port dropped tiles in 3 of 3 runs; meet10 was clean in 4 of 5.

## How it could fail
The W or L flash may not read as "this trade counted"; the strip loops 12 old rounds (may read as live); at 320 the quote is 8.5 px cap; the 9-slice stretches the painted glare 1.7x; Safari not checked; speed on a 4x slower CPU not measured.
