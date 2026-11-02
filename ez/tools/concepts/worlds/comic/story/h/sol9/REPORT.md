# H28 · sol9: Smart or lucky in two beats, four new worlds (mockups)

Saved by the lead from the helper's hand-back (Write blocked). Commit 02f97cda. Nothing in tools/v22, v4*.html or media touched; nothing deployed. **Pick: D, the chain;** runner-up B, the recorder.

## Boards
`ez/x2p-h28-sol9-390.png` (75%), `-320.png` (75%), `-1280.png` (50%, three to a row); today's live T1 beside A to D.

## Shared
Two beats one under the other: 1 "Right way, round by round" (hit rate per round, the coin's exact binomial range in gold: `S7.range` mapped to the smoothed rate, drawn as sol8's envelope, exactly 31–49 of 80 at R80), 2 "Money, round by round" (flat P&L, season). No explainer beat, no coins counted, no selector, 0 buttons. Kicker, sentence, chart, ranked key (#1 a size up; the hit-rate key adds a verdict in each world's words). Beat 1: "Hit rate: how often a trade went the right way. Grok: 45 of 72. A coin flip lands 28 to 44 of 72." Beat 2: "P&L: $100K on every trade, the whole season, 80 rounds. No leverage, before fees." Gold = golden ticket holder (season P&L #1, Grok). Desktop spans the whole row; each beat words across the top, chart wide with the key beside it; beats stacked.

## Worlds
- A Etched: the green board between the chips, film4's gold rails top and bottom; traces from one pad at 50/50; the coin's range a plated, hatched gold pour ("Off the gold" / "On the gold"); $0 the ground plane.
- B The recorder: the exchange's strip-chart recorder (a lie detector): toned paper with sprocket holes and a green grid in a black case, four pens on a brass carriage at the newest round; the gold zone printed before any pen writes; the key the paper's legend torn off below.
- C The peg board: green baize in a brass frame, a coloured cord pinned every 5 rounds; the coin's range a brass plate let into the baize.
- D The chain (pick): the record's chain of blocks along the foot of each chart, one block per round, four cells per block (rows in board order, model logos), the newest sealed in gold. Beat 1: lit = right way, dark = wrong, empty = no call; the line above is those cells added up. Beat 2: green win, red loss, brighter the bigger (Accenture, Intel, ServiceNow stand out). Flat ink lines on the logo's black, no glow.

## Why D
Follows from the record as a blockchain (lesson 142); the only take where a sceptic can trace the curve back to single trades (lessons 122.7, 126); the strongest on desktop.

## Measured
Site fonts, reduced motion, DPR 2, 320/390/1280, every take: 0 errors, no sideways scroll, no SVG text outside its box, nothing outside the section, 0 buttons. Smallest cap (live 8.9 at 390): 390 A 8.8 B 8.3 C 8.8 D 8.4; 320 A 8.2 B 8.3 C 8.8 D 8.2; 1280 A 9.4 B 9.0 C 9.8 D 9.0. Height 1,164–1,253px at 390 (today 503, sol8 1,380). Data: Grok 63% 45-27 +$148,480; Claude 60% 48-32 +$102,950; GPT 54% 43-37 −$56,930; Kimi 46% 37-43 −$70,650; only Grok past the gold (coin 28–44 of 72, 31–49 of 80). Fixes: desktop key 460px wide (columns overlapped at 330); charts switch to phone proportions below 560px (was 700); B's middle axis label dropped at 320; world classes `.s9w-*` (clashed with `.s9-b`).

## How it could fail
Grok's lead is one trade (45 against a ceiling of 44); every world makes "off the gold" look decisive. The band is drawn over 80 rounds, Grok's verdict uses his 72 trades: both say "past", but his line sits on the band's edge at R80. D on a phone: blocks about 3.5px wide read as texture, marks 8.5px. B: the paper is a pale ground (rule 0); pen inks deeper than the page colours. C: the cord reads a little like beads. A: can still read as "a chart on green". Safari unchecked; no person has looked yet.

## Questions
1. D, B, C or A (or B's pens over D's chain)? 2. B's toned paper allowed? 3. D on phones: the full 80-block strip as texture, or the newest 20 big? 4. Desktop: wide chart with the key beside (built) or the beats side by side?

## Files
`_s9.js`/`_s9.css` (geometry, gold band, ranked keys, compose, mount), `a`–`d` (.js/.css), `run.js` (`node run.js <out> now,a,b,c,d <W>`, ez/ on 8991), `board.py`; shots in the scratchpad (`.gitignore`: shots/, *.mp4).
