# Resolution videos: the brief turned into checks (2026-11-12)

The owner asked for short resolution videos that excite ("dopamine", "getting people excited to see our project", "who wins, who loses", "the highest level of animation, motion, any other layer"), with five different iterations on R106 CoreWeave, and "every non-computable objective turned into a computable one before starting". This file is that translation. Every video is scored against it, and the report gives the numbers.

## The round, as the sheet has it

- R106 CoreWeave (CRWV). Trades filed Tue Nov 10 before the report (after the close). Graded at the close Wed Nov 11.
- Calls: GPT LONG (+8%), Kimi SHORT (-10%), Claude SHORT (-12%), Grok SHORT (-1.6%).
- Market +24.71%. GPT was the only AI on the right side. Flat P&L on $100K: GPT +$24,710; Kimi, Claude, Grok -$24,710 each.
- The season's biggest up move (1st of 106 rounds); 4th biggest move either way (Reddit -29.27, Intel -28.58, ServiceNow -26.97). 6.4 times the median move (3.86%).
- Season P&L before -> after: Grok +$208,870 -> +$184,160; Claude +$121,200 -> +$96,490; GPT -$24,740 -> -$30; Kimi -$104,600 -> -$129,310. The order does not change. GPT goes from a quarter of a trade in the red to break-even in one trade.
- Price path: Hyperliquid's xyz:CRWV 5-minute candles from the Nov 10 close to the Nov 11 close (+24.58% there), scaled by 1.0054 so it lands on the sheet's +24.71%. The intraday high was +27.0% (about 1:25 pm New York) before it faded into the close.

## Non-computable word -> what is measured

| Owner's word | Check | Pass |
|---|---|---|
| "getting people excited" (the hook) | C1. What frame 0 shows (the thumbnail for anyone with autoplay off, and the first thing a muted viewer reads) | the company, that four AIs traded it, and the sides (1 long vs 3 short) are all readable as words, with no spoiler of the result |
| "honest excitement" | C14. Losses as big as wins | on the final hold every P&L figure is set at the same type size (within 10%); no near-miss staged; "Simulated $100K" on screen |
| "keep them coming back" | C15. Open loop | the end names the next round (Nebius, graded at today's close) |
| "dopamine" (anticipation then reward) | C2. Reveal time T_r: the first frame where the winner can be read | T_r between 35% and 65% of the runtime; the build-up before it is at least 2.5 s and keeps changing |
| "dopamine" (the payoff lands) | C3. Sync of the reveal | the biggest frame-to-frame change and the loudest sound onset within 2 frames (67 ms) of each other |
| "who wins, who loses" | C4. After T_r | every AI's side and P&L on screen together for at least 1.5 s; the winner is marked by light, position or motion (not by shrinking the losses) |
| "highest level" (no clutter) | C5. Reading load | at most 6 words appear at once (12 on the end card); every line held at least its characters ÷ 15 s and never under 0.85 s |
| "dopamine" (the beat itself) | C16. Reveal length | the reveal beat itself (the counter or needle reaching the result) lasts at most 1.5 s |
| truth | C6 | every number equals ez-data.js or the Hyperliquid path; nothing is invented |
| brand | C7 | palcheck.py under 2% off-palette pixels |
| short form, made for X | C8 | 9 to 13 s; the last frame leads back into the first (a loop), or ends on a hold made to be screenshotted |
| shareable | C9 | a final hold of at least 1.5 s that carries the company, the move, the winner, all four P&Ls and the brand |
| sound off and sound on | C10 | every fact is on screen as text; at least 4 sound cues each land on a visual event, within one frame |
| "motion" (never dead) | C11 | a visible change at least every 1.2 s until the final hold (frame-difference over 1.5% of pixels) |
| platform safe | C12 | all text inside x 40-1040, y 55-1295 of 1080x1350 |
| "how big" (the surprise is felt) | C13 | the move is shown against a reference the viewer knows (the season's typical move, or the other rounds) |

## Five interpretations of "dopamine"

1. **The sweat** (suspense spread over time): the real price path from the report to the close, compressed, every AI's P&L ticking live; the last hour in slow motion; the bell locks it.
2. **One against three** (space as the stakes): the screen is territory; each AI holds its share; the move pushes the line and the long takes the screen from the three shorts.
3. **The P&L cards** (the format crypto already shares): four Hyperliquid-style P&L cards dealt one at a time, the three shorts first, the only long last. A slot-reel take was dropped after the research: it stages a near-miss (Clark 2009).
4. **The standings swing** (social comparison, in the app): the live leaderboard before and after the round, the bars and gaps moving; GPT climbs from -$24,740 to break-even.
5. **The number** (kinetic type on the beat): scale contrast, a normal move (3.86%) next to +24.71%, then the four sides and P&Ls cut on the music.

## Research and vocabulary

See the research summary below (filled from the research brief) and `ez/x-dopamine-research.md`.

## Scorecard of the 1080 drafts (measured 2026-11-12; `tools/concepts/dopa/measure.py`, `tools/concepts/fresh/palcheck.py`)

| Check | 1 The sweat | 2 The balance | 3 The P&L cards | 4 The standings swing | 5 The number |
|---|---|---|---|---|---|
| C8 length | 12.0 s | 10.0 s | 10.5 s | 10.0 s | 12.0 s |
| C2 reveal at | 7.5 s (63%) | 5.9 s (59%) | 4.4 s (42%) | 4.0 s (40%) | 5.5 s (46%) |
| C3 picture against sound at the reveal | 18 ms | 12 ms | 43 ms | 43 ms | 43 ms |
| C11 longest still stretch | 0.50 s | 1.20 s | 1.13 s | 1.10 s | 0.93 s |
| C7 off-palette | 0.9% | 1.0% | 0.6% | 0.2% | 0.2% |
| C16 reveal beat | the bell, instant, after a 1.9 s slow last hour | 1.6 s easing into the close (just over) | 1.2 s | 1.0 s | 1.4 s |
| C9 final hold | 3.6 s | 3.6 s | 3.5 s | 2.7 s | 2.8 s |
| C5 reading load | pass | pass | pass | pass | **fails once**: the shorts' calls line (34 characters) holds 0.92 s |

C1, C4, C6, C10, C12 to C15 pass on all five (checked frame by frame on the board `ez/x2p-r106-five-cuts.jpg`).
Fixes made after the first renders, from these checks: 2 and 3 had dead stretches after the reveal (retimed, shortened); 3 and 4 had the reveal picture late against the sound (110 ms, 443 ms); 4 trimmed to 10 s; 3 lacked the size of the move (C13); 5's end card lacked the company and ran past the safe area.

What these checks cannot settle: whether any of the five earns more copy-link shares, replies or follows per view on X (the weights that matter, per the research). Only posting them on real rounds and comparing can.

## "Smooth, more animation focused, higher quality" as numbers (owner, 2026-11-12, on cut 1)

Measured on the six drafts with `tools/concepts/dopa/smooth.py` (before the final hold):

| | 1 The sweat | 2 | 3 | 4 | 5 The number | 6 = 1 + 5's music |
|---|---|---|---|---|---|---|
| C17 motion share (frames where something moves) | **84%** | 76% | 77% | 67% | 73% | 84% |
| C18 hard cuts | **0** | 0 | 0 | 0 | 6 | 0 |
| C19 flow (moving frames within 3x of the typical rate) | 85% | 96% | 89% | 74% | 63% | 85% |

Targets from now on: C17 at least 80%, C18 zero (every change of layout is a shared-element move: the same object travels to its new place), C19 at least 85%. Plus the craft rules behind cut 1 that are not measured by frames: motion blur of at least 3 samples a frame (a 180-degree shutter), every move eased (no linear start or stop), the camera never fully still, and the motion driven by real data (290 five-minute prices here), not by hand-set keyframes.
Cut 6 is cut 1's picture with cut 5's music (m2-phonk, entered 7.29 s in so its drop lands on the bell at 7.5 s; measured 12 ms apart).
