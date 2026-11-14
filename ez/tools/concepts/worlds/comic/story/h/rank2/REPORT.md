# H27 · rank2: Meet the models that reads as a leaderboard (mockups)

Saved by the lead from the helper's hand-back (the helper's Write was blocked). Committed with the work in 3d5aae1d. Three takes over the built X2+ page; each keeps meet10's chip as it is (No., Season P&L, W-L, the quote, the founder loop, the ledger strip). **Pick: C, the champion.** A is the runner-up for phones.

## Boards (in `ez/`)
`x2p-h27-rank2-390.png`, `-1280.png`, `-320.png` (today, A, B, C on each).

## The want
A newcomer sees three things before reading a word: this is a ranking, Grok is first, and how far ahead it is.
- Rank is carried by position and size: #1 at the top and biggest.
- The numeral is big, sits outside the chip, in the comic's own lettering.
- The P&L gap is drawn, not only written.
- meet10's chip and the strip stay.
- Desktop must not show four equal chips side by side.

## Story, facts, carriers
- Story: four rivals, one leader, a visible distance. Two in profit, a cliff, two in the red.
- Rank: order top to bottom, chip size, a big extruded numeral; #1's gold, the others cream with their chip's colour in the extrusion (lesson 129).
- The gap: a figure in the step (A), the space between chips (B), or a bar on one scale (C).
- Profit vs loss: the $0 line (B only).
- Words added: only "$45,530 behind Grok", "Leads by $45,530" and "$0 · Break-even".

## Takes
Picked with `window.__R2T`. `r2.js` and `r2.css` lay over meet10 without editing it; the strip is re-placed down the left with a trace into every chip.
- **A, the ladder:** one column at every width; each rank a size smaller (100, 95, 91, 87%; under 360px 100, 97, 94, 91%); the numeral in the gutter between strip and chip, above the trace; a gold-rimmed tag on each step ("▼ $45,530 behind Grok"); desktop the same column (#1 820px wide) with the tags beside each step.
- **B, the cliff:** one column, #1 a size larger; the space between two chips grows with their P&L gap (10px + 0.75px per $1,000 on phones, 18px + 1.3px per $1,000 on desktop), so Grok and Claude sit close, GPT and Kimi close, and a wide break opens between the pairs; the $100K start drawn across the break as "$0 · Break-even" (faint green glow above, red below); each space carries its figure on a dimension line. Affine, not strictly proportional: the base gives small gaps room for their label.
- **C, the champion:** #1 alone and biggest, under a large gold "1" and a plate "Leads by $45,530" ("Tied for No. 1" on a tie); challengers 2 to 4 a size smaller (86%, 92% under 360px), each with a header: its numeral and a red bar for its distance to No. 1, all bars on one scale (the longest Kimi's $219,130). Desktop: the champion left at 594px, the challengers in a column right at 396px; meet10's desktop strip runs in the gap and feeds both sides; 686px tall.

Data: every number from `__x2pPnl()` (balance − $100,000); the order is meet10's chip order (season P&L); each chip's quote refitted (one letter size for all, set by the smallest chip, scaled up on the bigger chips with the same line breaks); screen readers get one added line with the gaps; nothing new moves.

## Measured (site fonts; `node shot.js <w> <take> <out|-> [dpr] [rm]`, server on port 8994)
| | 320 | 390 | 1280 |
|---|---|---|---|
| A quote cap height, #1 → #4 | 8.2 → 7.5 | 10.3 → 9.0 | 18.4 → 16 |
| B quote cap height, #1 / others | 8.2 / 7.75 | 10.3 / 9.5 | 17.4 / 16 |
| C quote cap height, #1 / others | 8.4 / 7.75 | 10.8 / 9.25 | 19.1 / 12.75 |
| Board height, A / B / C | 520 / 634 / 624 | 553 / 734 / 706 | 1398 / 1554 / 686 |

No errors and no sideways scroll at 320, 390, 1280; no numeral, tag, bar, plate or rail overlaps a chip; C at 390 with reduced motion clean. The rotated "Meet the models" head pokes 2px past the left edge at 320 and 390 (as today, untouched).

## Rule-0 checks
No white grounds, no box in a box; tags hug their text; nothing on a logo or a face; no emoji, no pattern as a ground; cover-the-text: order, size and the gold 1 still say who leads, C's bars and B's spacing say by how much.

## How it could fail
- Smaller chips mean smaller quotes: 7.5 to 8px cap at 320 (8.5 live).
- The painted "No." window in each chip now repeats the big numeral; removing it means repainting the chips.
- B's break is about 250px on a phone and may read as dead board.
- C's headers add about 115px on a phone.
- A's size steps are small on phones (16px per rank), so the numerals do most of the work there.
- Safari not checked; speed on a 4x slower CPU not measured.

## Hedra
$0, no new paintings.

## Files
`r2.js`, `r2.css`, `shot.js`, `board.py`.
