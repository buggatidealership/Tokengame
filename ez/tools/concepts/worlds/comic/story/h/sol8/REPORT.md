# H27 · sol8: Smart or lucky in three beats, no selector (mockups)

Saved by the lead from the helper's hand-back (the helper's Write was blocked). Commit 1f222ccf. Laid over the built `v46-live-x2plus.html` (port 8987), mounted through the live P5 engine (`x2p_more.js`); every number from `P5.data()` (ROUNDS, `__x2pPnl`). No new painting (sol7's `s7-wide-clean` scope, sol6's `s25-coin`). **Pick: B, the coin hill;** runner-up A.

## Boards
`ez/x2p-h27-sol8-390.png`, `-320.png`, `-1280.png` (1280 at 70%).

## The want
A newcomer knows what the two charts mean before seeing them and is never asked to choose. Beat 1 is the legend as a picture (what luck looks like, where the four landed); beats 2 and 3 are the two charts, always shown, one under the other; the choices move to the Leaderboard (lesson 137).

## Shared (beats 2 and 3)
- Order: kicker, sentence, picture, ranked key (lesson 135).
- Beat 2 "Right way, round by round": the scope with the chart across the whole glass, no label column, each line ending in a dot. Gold = the coin's exact binomial range (narrowest symmetric range holding ≥95% of fair coins), mapped to the smoothed rate; drawn as an envelope (the widest exact range from that round on) since the exact range jumps by a trade between odd and even counts; at R80 exactly 31–49. The live funnel still uses the normal approximation.
- Beat 3 "Money, round by round": flat P&L, season only, $100K a trade; $50K gridlines labelled.
- Key: rows ranked, #1 a size up (lesson 136); colour trace, name, big figure, W-L; on the hit-rate key a tag "Past the gold" / "In the gold" / "Under the gold".
- Words: beat 2 keeps sol6 D's sentence in A and B; C and D say "Hit rate, round by round. Each line is an AI; the gold is where a coin's line would run." Beat 3: "P&L: $100K on every trade, the whole season, 80 rounds. No leverage, before fees."
- Colour: one per AI through all beats; gold = the golden ticket holder (season P&L #1; today Grok, who also leads hit rate).
- Desktop (1000px+): the live `#learn` sits in a 560px column with the right half empty; here the section spans the row, beat 1 words left and picture right, beats 2 and 3 side by side.

## Beat 1 takes
- A · Read the gold: the coin pouring out the band a coin's hit rate lands in (wide after 1 trade, 31–49 of 80 at 80); "BEATS A COIN" / "A COIN COULD DO THIS" / "WORSE THAN A COIN"; no AI yet (lesson 128).
- B · The coin hill: 1,000 coins x 80 trades piled as stacks (each drawn coin = 5, exact binomial); gold inside the range, bronze tails (967 of 1,000 in the gold); the four AIs as pins at their hit rate, ranked by height; Grok just past the last gold stack.
- C · The bar to beat: the coin beside the four ranked, "45 of 72" against "a coin: 28–44".
- D · Coin rolls: each AI's trades as coins on edge, right first, a bracket where a fair coin's count lands; 4.7px a trade at 390.

## Checks
0 errors, no sideways scroll, no overflow, no buttons at 320, 390, 1280. Smallest cap height 8.9 at 390 (as live), 8.9–9.9 at 1280, 7.7–8.2 at 320 (live 8.9; a 320 step could drop the tags). Data: Grok 45-27 (63%), Claude 48-32 (60%), GPT 43-37 (54%), Kimi 37-43 (46%); 72 trades 28–44, 80 trades 31–49; a coin gets 45+ of 72 2.2% of the time; P&L Grok +$148,480, Claude +$102,950, GPT −$56,930, Kimi −$70,650. Fixes: site `.u`/`.d` renamed `s8u`/`s8d`; `S8.mount` swaps in a fresh box (the live ResizeObserver redrew T1 into it); desktop span needs `html.x2p.x2p-desk main.wrap>section#learn.sec`.

## How it could fail
- B: the x axis is hit rate, so Grok (72 trades) shares a hill drawn for 80 (61.1% vs 61.25% at the edge; same verdict); Grok's and Claude's pins two stacks apart; pin labels about 8px at 320.
- C: Claude's 48 is bigger than Grok's 45 yet ranks below.
- A: an abstract band can read as decoration until beat 2.
- All: Grok is past the coin by one trade (fragile, shown as a margin); nobody is improving by their own calls (flagged 2026-10-30, not shown); the section is about 2.7x today's height on a phone (1,380 vs 503 at 390); Safari unchecked.

## Questions
1. Beat 1: B, A, C or D? 2. Desktop: charts side by side or stacked? 3. Gold: the golden ticket holder (as built) or each chart's own leader (as live)?

## Files
`_s8.js/.css` (beats 2 and 3, the band and envelope, ranked rows, compose/mount), `a`..`d` (.js/.css), `run.js` (`node run.js <out> now,a,b,c,d <W>`, serve ez/ on 8987, one width at a time), `ctx.js`, `board.py`, `probe.js`. For a build: fold `_s8.js` into the P5 block; paintings as sol7 (`media/s7-scope-wide.jpg`, `media/s7-coin.jpg`); B needs none.
