# H27 · rounds9: Every round so far, simple and in its own world (mockups)

Saved by the lead from the helper's hand-back (the helper's Write was blocked). Commit 36d95371. No die, no gold chip frames, no comic book; built from pictures already in media/ (no new painting). **Pick: A, the reel.**

## Boards (in `ez/`)
`x2p-h27-rounds9-390.png` (today, A, B, C), `-390-more.png`, `-320.png`, `-1280.png`, `-1280-more.png`, `-closeup.png`.

## The tile (every take)
- Line 1: company logo on a small cream disc, the company name without ticker, the move on the same line in green or red.
- Line 2: "Winner", the winning model's mark in its colour, its name. A tie: "Winners GPT & Claude"; if too wide "Tie" with both marks and names; if still too wide only the marks (names in the screen-reader label). No winner: "Winner Nobody".
- The latest round on top: a tag ("Now showing · Latest round · Oct 30"), name and move large, one computed line from the calls ("GPT and Kimi went long.").
- Every tile opens the round's graded card (tested).
- Then six recent rounds, then "Show 8 more".

## Takes
| | World | What the drawing tells | Colours |
|---|---|---|---|
| A · the reel | A cinema; each round a piece of film cut from the season's reel; the latest "Now showing" with a gold glow | Sprocket holes = the round has a film; R79 (no film) a plain still | Oxblood velvet, black film, gold, cream |
| B · the stamp album | Each round a stamp on a black album page; the latest a souvenir sheet "Latest issue · Oct 30 · No. 80" | Stamp colour = direction (green up, red down); the move is its face value | Black page, gold edging, green and red stamps |
| C · the 45s | Each round a record sleeve on a gold wall; on the latest a hole shows the label | Label = the company logo | Gold wall, black sleeves, cream, green and red |

## Desktop
The latest takes 2 columns x 2 rows of a five-column grid, the six fill the other three columns, its picture stretches to the two rows. "Show more" spans the row and shows the next rounds' pictures dimmed behind its words. At 600 to 999px three columns. **Desktop adds 10 a tap, not 8** (five columns; 8 would leave two empty cells); phones and tablets add 8.

## Checks
320, 390, 1280, before and after "Show more": no errors, no sideways scroll, no text spilling; smallest text 9 to 10px cap; pictures at least 2.6x on phones, about 2.1x at 1280 (the 450px tiles; re-export at 768px for desktop); tiles cover 94 to 96% of the grid. At 320 the six drop the logo, and "AstraZeneca" truncates in B and C (A fits).

## How it could fail
- B says direction twice (stamp colour and sign).
- A's velvet and C's gold are large fields: the section reads as a new place; check against the chip section above and the vault below.
- Heads differ per world (Anton, Alfa Slab One, condensed Archivo); swappable if the Overview keeps one heading face.
- The latest round shows the move twice (its poster is the film's end card).

## Files
`_r9.js`, `_r9.css` (`window.__R9` = A/B/C), `run.js`, `tiles.js`, `board.py`, `probe.js`. Uses only `r9-*` classes; never `.r6` (a width rule there stopped the background bleeding edge to edge).
Go live: in `x2p_more.js` replace the rounds6 block with `window.__R9='A';` plus `_r9.js`'s body inside the existing wait (#record, ROUNDS, MODELS); append `_r9.css` to `x2p_more.css`.
Tests: serve ez/ on 8983; `node run.js <out> A,B,C,A+ 390,1280,320`; `node tiles.js <out>`; `/usr/bin/python3 board.py <out>`.
