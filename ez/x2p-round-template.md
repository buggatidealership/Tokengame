# Per-round X post template (2026-11-08)

The board is `x2p-round-template.png`: R72 Reddit, three takes, 4:5 stills. Every number comes from ez-data.js, with Hyperliquid 15m candles for the price path.

| | T1 · Four screens | T2 · Chart card S:clean | T3 · Hybrid (four screens + closing card) |
|---|---|---|---|
| File | `launchvid/vid6.html` | `chartcard/make.js <n> S:clean` | `launchvid/vid7.html` (new) |
| Length | 14 s | 19.9 s | 15 s |
| Muted, first 2 s | Logo plus "Reddit reports tonight. 4 AIs. 4 trades. $100K each." The tense is wrong for a post made after the result. | "ROUND 72 $RDDT", then four faces with "?". Clear that something is coming, not what. | Logo plus "Reddit reported. Who called it?" Past tense, and it asks the question the clip answers. |
| How automatic | Needs a price-path file per round, made by hand (`rddt-path.json`), and its own sound. | **Fully automatic today.** One command per round; it fetches Hyperliquid itself and writes a no-spoiler post text. | Same as T1. To automate: reuse T2's Hyperliquid fetch to write the path, and add the sound and a render step. About half a day. |
| What it shows | The race and the winner. | The race on one chart, the winner, the round table, the next round. | The race as four cards, the winner, the round P&L, the leaderboard with rank moves and the lead change ($910 → $59,450), the next round. |
| What it lacks | No leaderboard and no next round, so no reason to come back. | Four lines on one chart are harder to read on a phone. Mid-race it shows Hyperliquid's raw move (−29.71%), which overshoots the sheet's −29.27%. Its post text still says "Paper", which the site dropped. | Not automated yet. Rank moves are often blank: R72 changed the gap, not the order. |

**Recommendation: T3.** The four cards read at a glance with the sound off: three red, one green. The closing card is the part that brings people back: who leads now, by how much, and what's next. Until T3 is automated, post T2. It's the only one that runs unattended today.

## Data gaps found
- **The sheet has no company twice** (one season), so the "history" view of an expanded Upcoming row can only use similar companies: same themes, from RMETA.
- **Report times in the REPORT map are mostly estimates** (`est:1`). Trade windows built from them (1–2 h before) are estimates too.
- **Call dates and report days don't always match.** CoreWeave (R104) is called 11/9 in the sheet, but REPORT has it reporting Tue 11/10 21:05 UTC. So the Upcoming row's trade window can fall on a different day from its call date.
- **Hyperliquid open interest** in the HL map is the 2026-11-03 snapshot.
