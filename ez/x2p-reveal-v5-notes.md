# Reveal video, overnight round (2026-11-08)

Your asks: Hedra for the clock and LOCKED, Hedra polish, and my own concepts, thought through strategically, operationally and as a designer.

## What the video has to do (strategy)
- **Who watches it:** crypto traders on X over the weekend. It autoplays muted in the feed, so they decide in about 1.5 s.
- **The job they hire it for:** "Is there an AI I can actually follow on earnings, and can I check it?" Our answer is one real night: four AIs, one trade each, the close settles it, and the board moves. Then "Start ~~trusting~~ tracking AI."
- **One master, three uses.** A single film can't be the hook, the explainer and the reply GIF all at once, so tonight's set is:

| File | Length | Use |
|---|---|---|
| A, the journey (`x2p-reveal-v5-A.mp4`) | 29.5 s | The pinned launch post. Full story: Upcoming, 3-2-1, the drop, LOCKED, X post, 24 h, the race, the close, the board, strike line, welcome. |
| B, cold open (`x2p-reveal-v5-B-coldopen.mp4`) | 19.6 s | The reach post. It opens on the result ("Grok wins +$29,270, 1 of 4 called it"), rewinds 24 hours, then plays the story. Showing the outcome first is a common hook for keeping viewers. |
| C, loop (`x2p-reveal-v5-C-loop.mp4`) | 6.8 s | For replies and quotes: LOCKED → 24 h → +$29,270 → "Start ~~trusting~~ tracking AI", then it loops back. |
| D, four screens (`x2p-reveal-v6-fourscreens.mp4`) | 14 s | My own concept: the round as four live P&L screens racing through the night. Three go red and one goes green. It doubles as a **per-round template** (see below). |

- **What would prove me wrong:** completion rate and follows per 1,000 views in X analytics. If B doesn't beat A on completion, the outcome-first idea is wrong for this audience. If D outperforms both, the series beats the trailer.

## How it's made (operations)
- **One renderer.** Every frame is the page's own `R(t)` built from the real terminal screens and `ez-data.js`. Cuts B and C are edit lists over the same function (`cuts5.json`, `cut5.js`), so a change to A carries into B and C automatically. B and C's sound is A's soundtrack cut the same way; the rewind plays it backwards.
- **D is automatic from the sheet** for any round with a Hyperliquid market. Change `RN` and the price path and it renders in about 10 minutes, so each round could get its own 14 s post.
- **Hedra spend tonight:** about $1.0 (four stills at about $0.05 each, a handless dial $0.07, two 5 s clips at $0.35 each). Balance now about $8.75.

## Hedra in the picture (design)
- **Ground:** a painted studio backdrop, green haze at the top and a red glow on a glossy floor, behind every scene of A and D (`hedra/img/stage-a.jpg`).
- **LOCKED:** a Hedra clip of a brass padlock snapping shut. The snap is timed to land on the LOCKED stamp (7.65 s), and the scene dims around it.
- **24 hours later:** a Hedra-painted matte clock with a glowing mint ring.
- **What didn't work:** Hedra's video of the clock's hands spinning came back with the hands barely moving. So Hedra painted the dial without hands, and the page turns the hands through exactly 24 hours. Words and numbers are never painted into the art.

## Flags
- The chart's clock reads "+24:00 since the report". The real window is the report (20:05 UTC on Oct 29) to the next close (20:00 UTC on Oct 30), which is 23 h 55 m, and the Hyperliquid candles run 19:45 to 19:45 UTC. It's rounded, and the end point matches the sheet's −29.27%.
- I fixed "$100K paper" under the win; it now reads "on a $100K trade · 24 hours", matching the site, which dropped "paper".
- Still to decide: music (licensed track, or keep the synthesized one), and whether to also export 16:9.
