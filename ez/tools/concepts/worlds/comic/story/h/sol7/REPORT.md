# Round H26 · sol7: Smart or lucky in two beats, T1 refined

Mockups only. Every take is laid over the built `v46-live-x2plus.html` and mounted through the live P5 engine (`x2p_more.js`):
- the numbers come from `P5.data()` (`ROUNDS` and `__x2pPnl`);
- `P5.mountProof()` does the mount.

Nothing in `tools/v22/`, `v4*.html` or `media/` changed. Nothing was deployed or published.

## The want, as I read it
The owner keeps T1. What fails today is the order of understanding: the section opens straight on a busy instrument, and a newcomer doesn't know what they are looking at.

The expert prompt: for a crypto newcomer on a phone, first set up the benchmark, then show the instrument.
- **The benchmark:** what a fair coin does over the same number of trades, against what the AIs did.
- **The instrument:** the scope, as the proof over time.
- **The chart:** the full width of the glass, with the colour key moved into rows under it.
- **The view switch:** one obvious, thumb-sized control, and nothing decorative that looks pressable.
- **The words:** keep the approved ones (sol6 D).

## What every take shares (beat 2: the scope, refined)
- **New painting `s7-wide-clean`:** the T1 scope rebuilt wide (4:3), with no knobs or buttons.
- **The chart:** it runs the full width of the glass, 286 CSS px at 390 against about 190 today. The y labels are on the left and there is no label column. A dot in the model's colour marks each line's end; the hit-rate leader (Grok) is gold, as live.
- **The key, in rows under the chart:** name and hit rate over the W-L, both in the AI's colour (`GROK 63%` / `45-27`). On P&L: the name in its colour over the P&L in green or red.
- **The coin's zone:** labelled "A COIN LANDS IN THE GOLD", under the funnel at its right end, where no line passes. The old "COIN" sat on the lines.
- **Axis labels:** drawn above the painted glare (an `over` layer), so "+$150K" and "80%" no longer wash out.
- **P&L view:** keeps Season / 7 days / 24 hours (A, C). An empty window reads "NO CLOSE IN LAST 24 HOURS", with "–" in the rows, not "$0".
- **Still:** no loop and no scan or flicker (`p5-vis` is not used). State changes only on a tap, or on scroll in B.

## Words (sol6 D, as approved)
"**Hit rate:** how often a trade went the right way. Grok: **45 of 72**. A coin flip lands **28 to 44 of 72**." The name and counts come from `X.arank[0]`.

**Flag:** the coin's range is now the binomial one, as the brief asks: the narrowest symmetric count range that holds at least 95 in 100 fair coins.

| trades | binomial range | coins inside | live scope (normal approximation) |
|---|---|---|---|
| 72 | 28 to 44 | 95.6% | same as sol6 |
| 80 | **31 to 49** | 96.7% | 32 to 48, which holds only 94.5% |

No verdict changes:
- **Grok:** 45 of 72, past the range by one trade. A coin does 45 or more 2.2% of the time.
- **Claude, GPT, Kimi:** 48, 43 and 37 of 80, all inside.

## The takes
Boards: `ez/x2p-h26-sol7-390.png`, `-1280.png`, `-320.png`. Columns: Today, A hit rate, A P&L, A 24 hours (empty), B beat 1, B beat 2, B P&L, C hit rate, C P&L.

### A · The tally, then the scope
- **Beat 1, "A coin vs the four":** a painted bar-graph module (`s7-tally`) with the coin set into it; "A COIN FLIP / 50% / RIGHT WAY" is struck into the face.
  - One slot per AI and one segment per trade: green when the trade went the right way, dark red when it didn't.
  - A gold bracket marks where a coin lands for that many trades. The top slot is the coin itself over 80 flips (31–49).
  - The count reads `45/72` and turns green once it is past the bracket.
- **Switch:** one plain two-way pill, Hit rate | P&L, 176x42 per side at 390, above the scope. On P&L a smaller window pill appears (98x32).

### B · One scope, two beats: calibrate, then measure
The scope is the only object. It stays on screen (sticky) for 42vh of ordinary scroll; the scroll is never taken over.
- **Beat 1, "Where a coin lands":** the glass shows only the coin's gold zone, round by round. The four AIs wait at its mouth in their colours, with "?" for their numbers (lesson 128). The line under it: "A coin flip goes the right way half the time. Over 80 trades it lands 31 to 49: anywhere in the gold."
- **Beat 2, "Where the four landed":** halfway through the stretch, the same glass draws the four lines and the rows fill in. D's sentence replaces the line. It is a page turn with no animation.
- **Measured** on a real wheel scroll at 390: the block holds at 60px, flips at the midpoint, then releases.
- **Switch:** the scope's own two big keys, repainted (`s7-wide-keys`), with HIT RATE and P&L lit in the caps; the open one is gold.
- **No windows:** P&L shows the season only; the Leaderboard keeps the windows. This is a question for the owner.

### C · The coin, then the scope
- **Beat 1, "The bar to beat":** the sol6 coin mid-flip, with "A COIN FLIP / 50% / RIGHT WAY" struck into its face. Beside it, D's sentence is set as a tale of the tape:
  - "GROK **45** of 72"
  - "vs"
  - "A COIN FLIP **28–44** of 72"

  The whole sentence is there for screen readers.
- **Switch:** folder tabs standing on the scope's top edge.
  - HIT RATE | P&L on the left. The open tab is gold and joined to a gold rule on the frame.
  - On P&L, SEASON | 7D | 24H appear as small tabs on the right.

## My pick: C
- **Why C:** its beat 1 decodes at a glance with no legend: two big numbers in the same units, and 45 is bigger than 44. That is the one fact the section must land before the scope, and the scope then shows all four at once.
- **Why not A:** it tells the same story for all four, but on a phone one trade is 1.5px of bar. Grok's lead past the bracket can't be seen; only the green count says it.
- **Why not B:** it is the most "chip world" (one object, calibrate, then measure). But its glass is short (about 90px of chart at 390), and beat 1 shows the coin only.
- **The switch:** tabs and the pill are both obvious. Tabs read as "this changes the page under it" and take the windows without a second row. B's keys are the in-world option, if the owner wants the switch inside the world.

The parts are separable (lesson 15): beat 1 (A tally / B calibration / C coin + tape) x switch (A pill / B keys / C tabs).

## Drop-in recipe (C)
1. **Media.** Use new names: /media is cached for a year.
   - `media/s7-scope-wide.jpg`, from `master/s7-wide-clean.jpg` (3200x2400). Serve 2400 wide or more: 560 CSS px x 3 = 1,680.
   - `media/s7-coin.jpg`, from `../sol6/h25/master/s25-coin.jpg` (2880 square). The crop is about 1,500 px, against 246 CSS x 3 = 738 needed.
2. **`x2p_more.js`:**
   - Fold `_s7.js` into the P5 block: `S.range`, `S.rows`, `S.line`, `S.table`, `S.stage`, `S.scope`, `S.pill`, `S.kick`. `S.stage` is P5.stage plus the painting's aspect and an `over` layer after the glare.
   - Replace the T1 take with `c.js`'s take, with the image names swapped.
   - Drop the `P5.vis` call: the frames are still.
3. **`x2p_more.css`:** append `_s7.css` and `c.css`. The `.p5-t1` container rule no longer matches; the class becomes `p5-s7c`.
4. **One rule or two:** `P5.data().A[m].zone`, the normal approximation, still draws the funnel on the chart; the counts use the binomial. For one rule everywhere, switch the funnel to the binomial too (about a 1 point difference at 80 rounds).

## Files, resolution, cost

| file | what | resolution | size |
|---|---|---|---|
| `master/s7-wide-clean.jpg` | wide scope, no controls (A, C) | 3200x2400 (gpt-image-2 4K high, 4:3), q95 | 1.9 MB |
| `master/s7-wide-keys.jpg` | wide scope with two keys (B) | 3200x2400, q95 | 3.4 MB |
| `master/s7-tally.jpg` | bar-graph module with the coin (A) | 2560x1440 (2K high, 16:9), q95 | 1.7 MB |
| `img/*.jpg` | the same at q92, used by the mockups | same | 1.3–2.5 MB |

**Hedra: $1.30** ($0.528 + $0.528 + $0.247).
- After the two 4K scopes the API wallet held $0.38, so the tally's 4K request was refused (402) and it was made at 2K.
- A wide coin painting for B and C (`s7-coinwide`) was refused the same way; C reuses sol6's coin.
- **The Hedra API wallet needs funds before any more painting.**

**Code:**
- `_s7.js`, `_s7.css`: shared.
- `a.js/.css`, `b.js/.css`, `c.js/.css`: the takes.

**Scripts:**
- `run.js`: `node run.js <out> now,a,a:pnl,a:pnl:d1,b:cal,b,b:pnl,c,c:pnl <W>`. Serve `ez/` on 8963, one width at a time: three in parallel dropped shots.
- `board.py`: `/usr/bin/python3 board.py <dir> <W> <out> [cols]`.
- `scrolltest.js`: B's page turn on a real scroll.
- `gen.py`: Hedra v3; keeps the full-size master. Its jobs are in `jobs*.json`, its log in `log.jsonl`.

## Checks (measured; `shots/*/measure-*.json`)
- **Errors and scroll:** 0 console errors and no sideways scroll at 320, 390 and 1280, all 9 states. No live text runs outside its stage.
- **Smallest cap height** (CSS px; today: 8.9 at 390, 8.9 at 320):

  | take | 390 | 320 |
  |---|---|---|
  | A | 9.6 | 7.9 (the tally's names are small on a 320 phone) |
  | B | 9.6 (beat 1's "?" is 8.7) | 8.9 |
  | C | 9.6 | 8.7 |

  At 1280, every take is 9.6 or more.
- **Tap targets at 390** (today's T1 knobs: 47x43, unlabelled):

  | take | view switch | windows |
  |---|---|---|
  | A | pill, 176x42 per side | 98x32 per side |
  | B | keys, 95x35 | none |
  | C | tabs, 101x46 and 67x46 | 64x34, 38x34, 45x34 (7D is narrow) |
- **Data:** every figure is P5.data's own, so it matches the live scope.
  - W-L and hit rate: Grok 45-27 63%, Claude 48-32 60%, GPT 43-37 54%, Kimi 37-43 46%.
  - Season P&L: Grok +$148K, Claude +$103K, GPT −$56.9K, Kimi −$70.7K.
  - Last 7 days: 34 rounds. Last 24 hours: nothing closed.
- **Rule 0:**
  - no white or pale module grounds;
  - no dot-filled module;
  - no emoji;
  - nothing over a logo or a face;
  - the knob strip, the only decorative part that could look pressable, is gone.

## The twelve questions, briefly
1. **Hierarchy:** beat 1's two numbers (C) or four bars (A) come first; in beat 2 the chart is the biggest object.
2. **Sequence:** from Every round so far (the record) to the bet. This section says how much of the leader's record is earned.
3. **Words:** D's sentence, the trade's verbs, one unit (trades) in beat 1. "A COIN LANDS IN THE GOLD" replaces "LUCK ZONE".
4. **Motion:** none. B's page turn is a state change on scroll.
5. **Interaction:** one control, real buttons. In B the sticky stretch is plain scroll.
6. **Return:** the counts move every graded round (45 of 72 becomes 46 of 73).
7. **Trust:** the counts come from the sheet, and the binomial range is arithmetic anyone can redo.
8. **Share:** C's beat 1 screenshots on its own ("Grok 45 of 72 vs a coin flip 28–44").
9. **Edge states:**
   - An empty window shows "–" and "No close in…".
   - A new model gets a row; A would need a sixth slot painted.
   - If the leader falls inside the range, C shows it plainly.
10. **Honesty:** Grok is past the range by one trade, shown as fragile (45 vs 44), not as a verdict. Not shown (flagged 2026-10-30): by their own calls, nobody is improving yet.
11. **Reach:** see the checks above. Screen readers get the table of right, range and hit rate.
12. **Feeling:** the suspense is whether a number gets past the coin; the payoff is the one that does.

## How it could fail
- **C:**
  - One AI in beat 1 can read as "Grok is the only one" (lesson 123), until the scope under it shows all four.
  - "28–44" can read as a score; "of 72" has to carry it.
- **A:**
  - On a phone, the one trade that puts Grok past its bracket is 1.5px, so only the green count says it.
  - The tally is a second chart before the chart (lesson 25).
  - Its labels are 7.9px cap height at 320.
- **B:**
  - The glass is short (about 90px of chart at 390), because the keys take the room.
  - A sticky stretch can feel like a stall on short screens, and a fast flick skips beat 1.
  - P&L is the season only.
- **All:**
  - The early rounds' swings still dominate the left of the chart: the smoothed rate starts at 50/50, but with 1 to 5 calls it swings ±30%.
  - Safari was not checked (mix-blend glare, sticky inside the bleed).

## Questions for the owner
1. **What do the rows under the chart carry?**
   - You said the colour key is "each AI's W-L in its colour", and that people "should focus on the percentage".
   - A and C show the name and hit rate over the W-L. B shows the name and W-L on one line.
   - I read "the percentage" as the chart's own axis and kept it in the rows too. Which did you mean?
2. **Windows (Season / 7 days / 24 hours):** keep them on the Overview (A, C), or show the season only and leave the windows to the Leaderboard (B)?
3. **Beat 1:** all four against the coin (A), the leader against the coin (C), or the coin alone first and the four revealed on scroll (B)?
