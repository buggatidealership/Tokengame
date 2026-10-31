# Round H5 · alive: small effects inside the existing X3+ modules

Mockups only. Nothing in `tools/v22/*` or any `v4x-*.html` changed; the effects are laid over the built page in
Playwright (`alive.css`, `alive.js`). No Hedra credit spent ($0 of $8): every effect is light, ink, paper or a
stamp acting on art that is already on the page, and code can draw those; no painted frame was needed.

## What the owner wants, in an expert's words
The comic is still: the pictures are good, but nothing on the page breathes. Give each panel one small, lasting
sign of life, the way a moving picture in a wizard's newspaper keeps living (lessons 32, 42): one thing per
picture, small amplitude, slow tempo, discovered rather than announced, never moving a word or a number, and
every motion acting out a fact (lessons 5, 26, 43). One-shots play when the panel has been read (lesson 55), at
reading speed (lesson 62). Nothing runs off screen; nothing moves with reduced motion.

## Where the page is already alive (left alone)
Surveyed every running animation at 390 px before adding anything:
- **Cover loop**: the bell rings, the clock hand turns, the PASS/FAIL stamps land, the golden ticket's foil drifts and floats, sparkles, the four arrows, the hub turns, the call balloons bob. It is already the busiest picture on the page; adding to it would break "one moving thing per picture". If anything, it needs fewer.
- **Meet the models**: the founders' portraits loop (kept), the P&L counts up on arrival (already in `pop_p1.js`).
- **Smart or lucky**: the coin flips on the 50% line, the lines draw in, the flags wave.
- **NVIDIA bet**: the die count flips its digits every second, "Tick... tock...".
- **Leaderboard**: the next bell rings, the faces bob, the scoreboard bars grow on a window switch.

## The fourteen effects
| # | Module | Effect | The fact it carries | Kind |
|---|---|---|---|---|
| 1 | Meet the models | Last 5 stamped in, oldest to newest, a small ink ring on each landing | each graded round is a stamp on the record | once, on read |
| 2 | Meet the models | the #1 stub's gold catches the light: one diagonal glint every 11 s | #1 holds the golden ticket | loop, on screen |
| 3 | Meet the models | the flag patch ripples: a fold of light runs across the cloth, a 3 degree sway | where each lab is from, alive | loop, on screen |
| 4 | Meet the models (end) | the page's bottom corner curls up, then breathes a little | end of the page: the next is there to turn (lesson 63) | once + slow loop |
| 5 | Every round so far | the newest tile's move inks onto its stub (from a wet blot to crisp) | round 80 has just been graded | once, on read |
| 6 | Every round so far | cinemagraph: the newest tile with a film keeps moving (its opening, soft-light blended into the painted thumb, edges feathered) | this round has a film; tap and it plays on | loop, on screen |
| 7 | Gutters | "Meanwhile, the big question..." / "Next time..." pop in with a small overshoot | the narrator cuts to the next scene | once, on read |
| 8 | NVIDIA bet | a coin in the vault glints, two stars a second apart, every 9 s | the gold in the vault is the pool | loop, on screen |
| 9 | NVIDIA bet | K1's green and red lamps glow in turn | right or wrong is still open: the switch is not thrown | loop, on screen |
| 10 | Who's winning | speed lines run off the challenger's corner toward the golden ticket, **only while the challenger made more than the leader over the last 7 days** (the page's own window) | the challenger is closing in | loop, on screen, gated |
| 11 | Who's winning | when a window stub changes a figure, three speed lines trail the new number | the number changed because the window changed | on change |
| 12 | Scoreboard | the Season P&L bars grow out of the $0 line, profit up, losses down | P&L stacks up from $0; a loss hangs below it | once, on read |
| 13 | Scoreboard | the best in each row is circled by hand in gold ink, row after row | the leader of each stat | once, on read |
| 14 | The race so far | the latest lead-change star twinkles once every 7 s | round 67: where the golden ticket changed hands | loop, on screen |

The numbers they act on are all the page's own (its DOM, `FILMS`); no number is typed.

## How it works (for a build)
- One `IntersectionObserver` (threshold .35): a target gets `.al-v` while on screen; loops run only under it, so off screen there is no animation object at all.
- A one-shot target that starts off screen is "armed" (its final state waits) and plays `.al-go` 500 ms after it comes on screen. A target already on screen when the page wakes is left exactly as it is (nothing blinks out and back).
- Every loop moves `transform` or `opacity` of an overlay (glints, folds, stars, lamps, speed lines), so the compositor does the work; the words and numbers underneath never move.
- Reduced motion: every animation is off, overlays hidden, armed targets shown.
- The cinemagraph `<video>` loads (`preload=none`) only when its tile comes on screen and pauses when it leaves.

## Cost on a 4x slower CPU (measured)
Headless Chromium at 390x844, DPR 2, CDP CPU throttling 4x. For every effect: a fresh page with it and the same page
without it, the target centred on screen and then two screens away, 3 s windows (frames counted with rAF, main-thread
time from `Performance.getMetrics` TaskDuration), 3 runs, medians (`cost.json`). One-shots were fired at the start
of the window.

| # | Effect | fps on screen (page alone) | long frames (page alone) | main thread, extra per 3 s on / off screen |
|---|---|---|---|---|
| 1 | Last 5, stamped in | 31.9 (31.5) | 0 (0) | +0.14 s / -0.02 s |
| 2 | The golden ticket catches the light | 32.6 (30.3) | 0 (0) | -0.01 s / +0.08 s |
| 3 | The flag ripples | 32.6 (29.9) | 1 (1) | +0.25 s / -0.38 s |
| 4 | The page corner lifts | 18.8 (17.3) | 19 (19) | +0.13 s / +0.14 s |
| 5 | The newest result, freshly printed | 26.0 (60.6) | 23 (0) | -0.08 s / -0.00 s |
| 6 | Cinemagraph on a film tile | 38.6 (60.3) | 15 (0) | -0.09 s / -0.12 s |
| 7 | The caption pops in at the cut | 60.0 (60.1) | 0 (0) | +0.01 s / -0.12 s |
| 8 | A coin in the vault glints | 54.1 (55.9) | 0 (0) | +0.00 s / +0.32 s |
| 9 | The switch, not yet thrown | 56.7 (56.1) | 0 (0) | +0.06 s / +0.17 s |
| 10 | The challenger chases (gated) | 60.2 (60.3) | 0 (0) | +0.27 s / -0.03 s |
| 11 | Speed lines on a changed number | 40.9 (50.6) | 8 (2) | +0.08 s / +0.09 s |
| 12 | P&L bars grow out of $0 | 60.3 (58.6) | 0 (1) | -0.08 s / +0.08 s |
| 13 | The best in each row, circled by hand | 60.2 (60.3) | 0 (0) | +0.48 s / -0.01 s |
| 14 | The latest lead change twinkles | 60.2 (60.6) | 0 (0) | +0.17 s / -0.00 s |

How to read it:
- **Off screen they cost nothing.** Counted directly (`offcheck.js`, all fourteen on at once): with its picture two screens away, no effect has a single running animation of its own and the cinemagraph's video is paused; the off-screen main-thread differences above (between -0.38 and +0.32 s) are run-to-run noise between two page loads, in both directions. With reduced motion, zero animations anywhere, on or off screen.
- **Main thread:** every effect is within about +0.3 s per 3 s of the page alone, except 13 (the hand rings, +0.48 s while they draw: SVG stroke animation is painted on the main thread; it plays once).
- **Meet the models (1 to 4):** the page alone runs at about 30 fps there (the four founder loops) and 17 fps at the end of the module; the effects do not lower it.
- **Every round so far (5 and 6): the real finding.** The effects drop that viewport from 60 to 26 and 39 fps. I chased it: not script (main thread went down), not the tile's filters or masks, not layer promotion, not the blur (a plain opacity fade costs the same). A 3 px blinking dot in the page corner, with no effect at all, drops the same viewport to 11.6 fps. So that view holds 60 fps only because nothing in it moves: any motion forces full-frame draws, and drawing the rack and the nine painted tiles is expensive in this software-GL setup. A real phone's GPU should draw it far cheaper, but that is not verified: measure on a mid-range Android phone before giving the tiles any life, and if it holds, flatten the tiles (bake their layers into one image) first.
- **11 (lines on a changed number):** 41 fps against 51 for the page's own switch alone; the switch's re-render is the heavy part, the lines add to it. Cut it first if the switch must stay smooth.
- **The cinemagraph's file:** the first version decoded the full 1080p, 4 MB film for a 100 px tile (12 fps). It now plays a 216 px, 2.4 s loop cut from the film's opening (`cine-r78-loop.mp4`, 28 KB). A build needs one such loop per tile that gets one.

## How each could fail
1. **Last 5 stamped**: the order is right (checked: the row is `seq.slice(-5)`, oldest to newest, left to right, so the newest round lands last). It hides five results for about two seconds on first sight; a reader who scrolls fast past the card sees blanks.
2. **Golden ticket glint**: the stub is the only gold on the card, but a passing light on a sheet of foil is the oldest trick there is; at 11 s it may read as decoration. Keep it on the #1 stub only (lesson 9).
3. **Flag ripple**: at 32 px a fold of light is close to invisible on a phone (it shows at 4x in the clip). Fine as "discovered", useless if the flag is the point.
4. **Page corner**: a curl invites a tap that does nothing; it must say "turn the page" only if the next section really follows (it does on the Overview, not at the foot of the page). Its back is code-drawn cream, not painted.
5. **Newest result printed**: a blank stub for half a second could read as a loading fault.
6. **Cinemagraph**: the tiles are Golden Age repaints and the films have their own style, so the film is only blended in (soft light, feathered); on a near-static opening (most of the films: Amazon, SanDisk, Reddit, Lilly move less than Intel in their first 3 s) nothing shows. A build should pick each tile's loop from a moving stretch of its film, or paint a 2-frame loop. It downloads a 4 MB film per tile: one tile at most, the newest with a film, and only once it is on screen.
7. **Caption pop**: overshoot on every gutter turns into a tic if there are many; two today.
8. **Vault glint**: the pool is not live yet; a glinting pile of gold could read as "there is money in it now". The bet section says the pool fills from creator fees; keep the glint small.
9. **K1 lamps**: reads as "undecided" only to someone who already read "Right / Wrong" under it; alone it could read as "broken".
10. **Chase lines**: "closing in" would be false today: over the last 7 days Grok made +$111,210 and Claude +$59,630 (computed from `__x2pPnl` and ROUNDS, equal to the page's own Last 7 days). So the effect is gated and is off on today's data; the clip forces it on to show what it looks like (lesson 8).
11. **Speed lines on a change**: the page's own bar regrow already marks the switch; the lines add a second signal on the same change. If one must go, cut these.
12. **Bars grow from $0**: duplicates the page's own grow on a window switch, but on first sight only, so the two never play together.
13. **Rings by hand**: the hand path is drawn by code (a wobbled ellipse with an overshoot); next to a real letterer's ring it is regular. A painted ring sprite would be truer.
14. **Lead-change star**: the star is 14 px; the twinkle is easy to miss, which is the point, but then it carries little.

## Checks that ran
- Rule 0 hard rules: no new containers, no pale grounds, nothing laid over a logo or a face (the chase lines were moved off Claude's face after the first take), no emoji, no pattern fills; every effect lives inside an existing module.
- 320 px not checked (only 390 for the clips and costs); no sideways scroll at 390 (scrollWidth 390 in every recording), no console errors.
- Every clip was checked frame by frame on contact sheets; four takes were fixed after looking (corner curl redrawn as a real fold, flag folds strengthened, chase lines moved and gated, lines-on-change moved to the scoreboard where figures change in place, cinemagraph moved above the painted cover).
- Not checked: Safari, a real phone.

## Not done / open
- The clips are recorded by stepping every animation frame by frame (true timing). Headless Chromium does not repaint a paused, seeked video, so in the cinemagraph clip the film's own frames (`tmp-cine/`, not committed) stand in for the video; the page itself plays the video.

## Files
- `alive.css`, `alive.js`: the effects. `cfg.js`: per effect, its name, fact and how it was filmed. `frames.json`: the frame used on the board.
- `rec.js`: records one effect on the built page by stepping every CSS animation and video frame by frame at 25 fps (true timing, however slow the screenshots), then H.264. `cost.js`: the measurements (`cost.json`). `offcheck.js`: counts each effect's live animations off screen and with reduced motion (`offcheck.json`). `board.py`, `reel.py`: the board and the reel. `cine-r78-loop.mp4`: the cinemagraph loop. `survey.js`, `shot.js`, `tree.js`, `crop.js`: page survey helpers.
- Board `ez/x2p-x3p-h5-alive-390.png`; clips `ez/x2p-x3p-h5-alive-1.mp4` ... `-14.mp4`; reel `ez/x2p-x3p-h5-alive-reel.mp4`.
