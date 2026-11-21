# Round H25 · sol6: Smart or lucky, four more takes

Mockups only. Each take is laid over the built `v46-live-x2plus.html` and mounted through the live P5 engine (`x2p_more.js`: `P5.data()`, `P5.mountProof()`).
- Nothing in `tools/v22/`, `v4*.html` or `media/` changed.
- Nothing was deployed or published.
- The folder `sol6/` already held round H14's sol6 (X3+), so this round lives in `sol6/h25/`.

## The want, as I read it

The owner says the scope (T1) is fine but "can be different", and should take the section's own theme. The brief's test is newcomer understanding, by word design first.

**The expert prompt:** for a crypto-native newcomer on a phone, explain one statistic, how often a trade went the right way. Explain it against one baseline, a fair coin. Show the sample size so the verdict can be weighed. Lead with one plain counting sentence in the trade's own words. Give it a visual world of its own, built on the coin and the four models' chip colours. Keep P&L with Season / 7D / 24H.

**The word design all four takes share:** counts, not percentages.
- "Grok: **45 of 72**." The sample sits inside the sentence (lesson 126).
- "A coin flip lands **28 to 44 of 72**." This is the coin's range in the same units as the AI's figure, so the reader compares two numbers of one kind. There is no "luck zone", "95% interval" or percent-of-percent.

The range is the live scope's zone converted to counts, n/2 ± 1.96·√n/2. It is the same inequality, so every verdict matches the live page:

| AI | Right | A coin's range | Verdict |
|---|---|---|---|
| Grok | 45 of 72 | 28–44 | beyond, by one trade |
| Claude | 48 of 80 | 32–48 | on the edge, inside |
| GPT | 43 of 80 | 32–48 | inside |
| Kimi | 37 of 80 | 32–48 | inside |

**Theme (lessons 129, 108).** Each AI's line, post or label is in its chip colour (slate, orange, green, blue). The coin is the logo's gold. The world is the wager, not the chip, which the owner liked about the scope ("changes away from the chip narrative"). Every painting still uses `bet-chip-h2.jpg` as its style reference: one object, warm key light, green and red rims, black void.

## Boards

| Board | What it shows |
|---|---|
| `ez/x2p-h25-sol6-390.png` | Today, A, B, C, D on the hit-rate view (390) |
| `ez/x2p-h25-sol6-390-pnl.png` | The same on P&L, Season (D shown on Last 7 days) |
| `ez/x2p-h25-sol6-1280.png` | Desktop, in the live proof column (560 px beside the MVPs) |
| `ez/x2p-h25-sol6-closeup.png` | C at 3x: the coins in the troughs, Grok's green-rimmed 45th coin past the bracket |

## The takes

### A · The tote board, "Beat the coin" ($0.52)
A 1930s racetrack odds board.
- **The lines:** each AI's **W-L, trade by trade**: right +1, wrong −1, on a horizontal axis counted in trades.
- **The coin:** the flat gold line at 0. Its band is ±1.96·√n, and it *widens* as √n while skill would grow with n. Grok's line climbs out of it; Claude's runs along its edge.
- **The words:** W-L is the word the visitor already met on the chips ("45-27").
- **The controls:** the toggles switch the view and the three square buttons switch the window. Their labels are lit on the board's own strip.
- **P&L view:** the lines are dollars in the chosen window.

### B · The coin and its piles, "Where luck lands" ($0.96: coin $0.72, coin-edge sprite $0.23)
The coin is the section's character, mid-flip, with "A coin is right 50% of the time" struck into its face.
- **The piles:** under it, 100 fair coins, each flipped as many times as the AI traded, stacked by how many came up right. This is the exact binomial spread rounded to whole coins, not a simulation.
- **Gold:** where 95 in 100 land; the rest is tarnished.
- **The posts:** each AI's count is a lit post in its colour. Grok (72 trades) gets its own pile; Claude, GPT and Kimi share one (80 each). Grok's post stands just off the gold. Claude's stands on its last gold column.
- **P&L view:** coin stacks at $5K each, with red rings for money owed.
- **The switch:** words struck on the ground beside the coin.

### C · The coin tray, "Count them" ($0.52)
A teller's counting tray.
- **The grooves:** one groove per AI, one coin on edge per trade. Gold is a trade that went the right way and tarnished bronze a wrong one, right ones first, so the gold run *is* the count.
- **The bracket:** gold leaf marks a coin's range over the same trades.
- **The fifth groove** is the coin itself: 80 flips, about 40 gold, its bracket 32–48. That gives the reader the control lane to compare against.
- **Grok** is visibly one coin past its bracket; that coin is rimmed green. Empty slots are trades not made (Grok skipped 8).
- **Header:** "One coin per trade. Gold: it went the right way."
- **P&L view:** one coin per $5K, red rings for owed.
- **The switch:** tap the coin in the corner to flip the view. The window words are stamped on the brass ruler.

### D · The scope, re-worded (control, $0)
The live T1 painting and chart; only the words change:
- trace ends read "GROK / 45 OF 72";
- the zone reads "A COIN LANDS HERE";
- the measurement row gives each AI its coin's range ("28–44");
- the line under it is the shared sentence.

It shows how much the word design alone buys.

## The twelve questions (asked of the section, all four takes)

1. **Hierarchy.** The one takeaway is "Grok is past what a coin does; the rest aren't (yet)". The biggest bright things are the four lines, posts or runs and the gold coin range. A and C put the verdict on the AI's own figure (green when beyond).
2. **Sequence.** Before it, Every round so far (the record). This hands over to the bet: the pool follows the top AI, and this section says how much of that is earned.
3. **Words.**
   - One front-loaded clause per view: "Hit rate: how often a trade went the right way."
   - The trade's verbs.
   - One unit (trades, counted), the sample inside the sentence.
   - The terms "luck zone", "%" against "%", and confidence language are gone.
4. **Motion.** Nothing new loops. The only motion is the live engine's own view switch redraw, and the glass re-scan stays on the scope (D). Nothing moves with reduced motion. A count-up of the gold run in C, coin by coin on first view, would carry "counting"; not built.
5. **Interaction.** Every control is an object of the world:
   - A: the toggles and buttons;
   - B: words struck on the ground;
   - C: the coin itself.

   Each answers by redrawing at once, and each is a real `<button>` with a label.
6. **Return.** The counts change every graded round. A newcomer can watch "45 of 72" become "46 of 73", and the coin's range move by one.
7. **Trust.** Every figure is a count from the sheet. The coin's range is plain arithmetic anyone can redo. B's pile is the exact binomial, not a random draw.
8. **Share.** A screenshot of B or C reads on its own: a pile of coins with Grok's post past it, or a tray where one coin sticks out of the bracket.
9. **Edge states.**
   - No close in a window: "No close in last 24 hours" (24H is empty today).
   - An AI below the range: red in A and C. B's post colour is computed the same way.
   - A new model with a different trade count gets its own pile in B and its own groove in C. C has 5 grooves, so a fifth AI would take the coin's lane: that needs a new painting.
   - After NVIDIA: unchanged.
10. **Data honesty.** The verdicts use the live page's own rule.
    - Claude is shown *on the edge*, not beyond.
    - Grok is beyond by one trade, which is fragile, and the pictures show it as exactly that (one coin, one column).
    - Not shown, and worth the owner's call: by each AI's own calls, the first half beats the second for Grok (24/36 → 21/36) and Claude (25/40 → 23/40). Nobody is getting better yet (as flagged on 2026-10-30).
11. **Reach.**
    - 390: every live word has a cap height of 9 px or more.
    - 320: no sideways scroll, but the smallest labels drop to 7.2 to 8.9 px (C's ridge labels, A's "TRADES").
    - Screen readers get the table of right / range / verdict.
    - Reduced motion holds.
12. **Feeling.** The suspense is whether the line, post or run gets out of the gold. The payoff is the one coin that does.

## Tests (H23), measured on the built page

| | Today | A | B | C | D |
|---|---|---|---|---|---|
| Console errors at 320 / 390 / 1280 | 0 | 0 | 0 | 0 | 0 |
| Sideways scroll at 320 / 390 / 1280 (scrollWidth = viewport) | none | none | none | none | none |
| **2** Smallest cap height at 390 (CSS px) | 10.5 | 9.2 | 9.2 | 9.0 | 9.2 |
| **1** Source px across the shown crop at 390 (need 1,074) | 1,216 | 1,413 ✓ | 1,800 ✓ | 1,564 ✓ | 1,216 ✓ |
| **1** At 1280 (560 CSS, need 1,680) | 1,216 ✗ | 1,413 ✗ | ✓ | 1,564 ✗ | ✗ |

At 1280 the 2400 px-wide masters (`master/`, about 2,600 px or more across the crop) pass; the mockups served the 1800 px copies. Serve the master size at the port.

- **Test 3, integration.** A and D: live text lit on glass, with bloom and the painting's glare screen-blended back over it. C: coins drawn into the troughs at the groove angle; labels sit on the ridges at the same angle; stamped words use a grain-masked ink filter. B: the claim is struck into the coin face, turned with the face; the piles are the painted coin sprite.
- **Test 4, static words painted: ✗** in all four (lettered in code, as in proof5). Do it at the port for the picked take.
- **Test 5:** not applicable (no chips); every painting carries real material detail (rivets, wood grain, milled edge).
- **Test 6, framing:** not measured numerically. A and C are cropped to the board or tray, which fills the frame edge to edge; B's coin is masked into the ground.

## Hedra

Balance at start: $30.10, shared with the other H25 helpers running at the same time, so I spent $1.99 of the $40 allowance. Masters are kept at native size in `master/` (JPG q95, converted from the PNGs; gen.py's own copies in `img/` are ≤ 2048).

| Name | Model | Settings | Cost | Time | Master | Result |
|---|---|---|---|---|---|---|
| s25-coin | gpt-image-2 | high, 4K, 1:1 | $0.7247 | 116 s | 2880×2880 | Clean hero coin, blank face, red/green rims; strong |
| s25-tote | gpt-image-2 | high, 4K, 3:4 | $0.5151 | 107 s | 2400×3200 | Blank glass as asked; slight perspective on the top edge |
| s25-tray | gpt-image-2 | high, 4K, 3:4 | $0.5150 | 103 s | 2400×3200 | Five grooves (asked four: the fifth became the coin's lane); tray tilted about 7° |
| s25-stack | gpt-image-2 | high, 2K, 16:9 | $0.2338 | 71 s | 2560×1440 | Coin edge on magenta, cut cleanly to `out/s25-coinedge.png` (1200×182) |

Served sizes in the mockups (`out/`):

| File | Size |
|---|---|
| tote | 1800×2400, 800 KB |
| tray | 1800×2400, 888 KB |
| coin | 2400×2400, 853 KB |
| coin edge | 1200×182, 396 KB |

All are over 300 KB. At the port, crop each to the area its take shows (as proof5 did): tote and tray lose about 25% of the height, the coin about 45%.

## My pick: C, the tray, with B's coin face for the claim

- **C** is the only take where a newcomer needs no chart literacy at all: *count the gold coins, see if they get past the bracket*. The control lane (a coin's own 80 flips) teaches "what a coin does" by showing it, not saying it. And one coin sticking out is the screenshot.
- **B** is the most beautiful and the most exact. But a distribution (a pile of runs) asks one more step of thought ("each stack is coins that got that many right").
- **A** is the best for return visitors (time, the widening band), and the right one if the section is meant to answer "getting better?". It is weakest on first read.
- **D** proves the words alone fix a lot. It is the cheapest change if the owner keeps T1.

## Drop-in
- **Files:** `_s25.js` + `_s25.css` (engine: rows, the coin's range, exact binomial, true-aspect stage, words, table), then one of `a.js`, `b.js` + `b.css`, `c.js`, `d.js`.
- **Mount:** `S25.mount(P5.take)` after x2p_more.js has loaded (it uses `window.P5`).
- **Port:** append to `x2p_more.js/.css` in place of T1's block.
- **Media, flat names written out in full:** `media/s25-tote.jpg`, `media/s25-tray.jpg`, `media/s25-coin.jpg`, `media/s25-coinedge.png`.
- **Tools:** `run.js` shoots and measures (serve `ez/` on 8961), `board.py` makes the boards, `gen.py` runs Hedra, `fetch.py` re-fetches native masters.

## How it could fail
- **All:** the coin's range is a 95% band; a reader may take "inside" as "lucky" rather than "can't tell yet". The words say "a coin flip lands", never "lucky", to avoid that.
- **A:** W-L lines that run as random walks look noisy on a phone, and the widening band can read as "the AIs got worse". It is also the least obvious "what am I looking at".
- **B:**
  - "100 coins flipped 72 times" is a sentence about a hypothetical, and some will read the piles as data about the AIs.
  - The owner asked in H9 to drop coin-odds captions; the picture still says "about 2 in 100 coins do this well" without the words. Flagging it.
  - The stack heights are rounded, so tails under half a coin vanish.
- **C:**
  - At 390 each coin is about 3.5 px, so the run reads as a bar more than as individual coins; the green 45th coin is small.
  - The ridge labels sit on wood at a slant (9.0 px cap at 390, 7.2 px at 320).
  - The window words on the brass ruler are low contrast.
  - Safari not checked (SVG filters, blend modes).
- **D:** still a chart of percentages with counts as labels, so two units on one screen.
- **Desktop:** all four keep the phone composition inside the live 560 px column; none is recomposed for 1280.
