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
