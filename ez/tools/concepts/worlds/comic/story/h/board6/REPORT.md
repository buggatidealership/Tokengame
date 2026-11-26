# board6: frame 4, BOARD, as E (the golden ticket), revised (round H25)

Boards:
- `ez/x2p-h25-board6-390.png`: "How a round works" at 390. Today's live frame 4 (take C) comes first, then E1, E2 and E3.
- `ez/x2p-h25-board6-1280.png`: the same four, stacked, at 1280.
- `ez/x2p-h25-board6-close.png`: frame 4 alone at 3x on a 390 page.

Each take is laid over the built `v46-live-x2plus.html` with `_b6.js` + `_b6.css` (`run.js`, `close.js`).

**My pick: E3.** It keeps E's angled hero shot, which is what the owner liked ("a bit of a distance from the first number-heavy frames"), and it puts #1 at the top.

## What changed from E (the owner's three changes)
1. **#1 at the top.** The leader's chip floats above an empty gold socket at the top of the stack, on a column of light. #2, #3 and #4 sit in steel sockets below it.
   - The light is painted: the gold socket pours light up past the board's top edge.
   - Under the chip, a CSS beam (screen-blended) carries the light up into the chip. Without it the lift did not read.
   - The chip itself throws its shadow far below it.
2. **Every chip lit, every number a placeholder.**
   - The four chips are Meet the models' own paintings (`media/chip8c-<m>-1200.jpg`), with chips8 take c's geometry. When the visitor scrolls down, the same chip simply comes closer.
   - In every number window (No., LAST 7 DAYS, LAST ROUND, SEASON) there is one lit dash. It is drawn as a short amber bar, the leader's in gold, with the window's own painted glass screened back over it.
   - Change from the first draft: a "–" typed in the font came out 1 to 3 px wide at 390, which reads as an empty window. The bar is 4 to 11 px wide at 390.
3. **The founders' faces are the only filled content.** Each chip's window plays its founder's loop (`media/founder-<m>-anim.*`, the same files as Meet the models). The loops play only near the screen. With reduced motion they show the poster.

The rank windows on the board (1 to 4, #1 in gold) are the only live numbers. The order is read live: season P&L from `__x2pPnl`, the same sort Meet the models uses. Today that is Grok, Claude, GPT, Kimi.

## The takes
| Take | Painting (gpt-image-2, 4K, 2880 px) | Reads as | Cost |
|---|---|---|---|
| **E1 · the rack** | `img/e1c.jpg`. A board standing up seen from above: a trapezoid, its top nearest. Rank windows on the left. | Clean and tidy, but nearly head-on. The "looking down the rack" perspective came out weak (only the board's outline narrows). | $1.50 |
| **E2 · head-on** | `img/e2c.jpg`. A square board, straight on. | The clearest: biggest rank numerals (cap 18.4 at 390). But it is a plain list, which is what the owner moved away from. | $1.50 |
| **E3 · E's angle** | `img/e3a.jpg`. The board turned in a three-quarter view, rows tilted, #1 lifted at the top. | Keeps E's drama and the distance from frames 1 to 3. Faces readable at 3x. | $1.50 |

Dropped drafts:
- `e1a`, `e1b`, `e2a`, `e2b`: blank chip packages were painted in. The model drew them as long DIPs (about 5.6:1), so Meet the models' 2.47:1 chips could not cover them. I switched to board5's recipe: empty sockets at the chips' aspect, chips laid by code. Previews kept at 1024 px.
- `e1d`, `e2d`: near-duplicates of the picks.
- `e3b`: its light column was weaker.

Layouts were typeset first (`guides.py`, `guide-e*.png`, each given as the first reference image). The places were measured on gridded zooms (`grid.py`, `detect.py`).

## The twelve questions (E3)
1. **Hierarchy:** the gold socket and the lifted chip above it, in the light, at the top. It is the brightest thing in the frame and the first in reading order.
2. **Sequence:** after three number-heavy close-ups (CALL, CLOSE, LEDGER), the camera pulls back to an angled shot of the field. It hands over to Meet the models: the same four chips, the same order, now close enough to read.
3. **Words:** none added. The ranks are numerals, and the line stays "The ledger ranks the board." It says what the picture shows.
4. **Motion:**
   - the founder loops (the only "filled" thing);
   - a slow glint across the leader's chip;
   - the beam breathing slowly.

   Nothing else moves. All of it is still with reduced motion.
5. **Interaction:** the frame keeps the top's tap (it replays the glint). The chips are not links. Meet the models is one scroll away, and that is the "click".
6. **Return:** the order is live. When another model passes Grok, it is lifted into the light the next day.
7. **Trust:** the order comes from the same `__x2pPnl` as Meet the models and the proof, so the frame and the section below can never disagree. No numbers are shown here, so nothing here can be wrong.
8. **Share:** a screenshot shows a gold chip rising out of its socket above three others: a podium with no caption needed. The dashes may read as "data hidden", which is the tease.
9. **Edge states:**
   - a tie in P&L keeps the sheet's order (a stable sort);
   - a leader with a negative season still gets the gold socket (rank, not profit);
   - a fifth model needs a fifth socket and a new painting;
   - a missing founder loop shows its poster.
10. **Data honesty:** no figure is shown, so no scale is implied. Socket and light mark rank only, not the size of the lead.
11. **Reach:**
    - the rank numerals' cap height at 390 is 10.5 (E3), 14.0 (E1) and 18.4 (E2), so all pass;
    - no sideways scroll at 320, 390 and 1280;
    - in `_b6.js` the li's aria-label names the order and says the numbers are in Meet the models (the drop-in keeps frames()' own label; add the order there if wanted);
    - load is one 576 KB image (304 KB as webp) plus the chip and loop files Meet the models already loads.
12. **Feeling:** the suspense is the dashes: the board is set, and the numbers are held back one scroll. The reveal is Meet the models. The payoff is the gold chip in the light.

## The H23 tests, measured (`out/measure.json`, frame 4, DPR 2)
| | Today (C) | E1 | E2 | E3 |
|---|---|---|---|---|
| 1. Resolution: master px shown / 3x need at 390 (570) | 1200 ✓ | 2300 ✓ | 2270 ✓ | 2350 ✓ |
| 1. Resolution at 1280 (needs 824) | 1200 ✓ | 2300 ✓ | 2270 ✓ | 2350 ✓ |
| 2. Smallest live cap at 390 (≥ 9) | 9.6 | 14.0 ✓ | 18.4 ✓ | 10.5 ✓ |
| 2. Smallest live cap at 1280 | 13.9 | 20.3 | 26.6 | 15.1 |
| Placeholder bar widths at 390 (No. / 7D / LR / SEASON), px | – | 1.5 / 6.3 / 3.6 / 10.3 | 1.5 / 6.1 / 3.5 / 10.0 | 1.7 / 6.6 / 3.9 / 11.1 |
| 6. Subject share (≥ 0.6) | 0.46 | 0.43 | 0.42 | 0.34 |

- **Test 3, integration:** the rank numerals are lit in the painted glass, with that glass's glare screened back over them (the quad4 recipe). The dashes are lit in the chips' own windows, with each chip's glass screened back over them.
- **Test 4, static words painted:** the board has no words. Each chip's mark, flag, name, version and labels are the chips8 paintings.
- **Test 5, chip detail:** dense PCB in all three, with fine traces, SMD parts, pads and gold contacts in the sockets.
- **Test 6, framing:** fails by design in every take, as it does today. The brief keeps "the wide shot after three close-ups".
- **H25 resolution:**
  - masters are 2880 px (gpt-image-2 "4K", its largest square);
  - the served frame is `out/top-h25-board6.jpg`, 1500 px (576 KB) plus webp (304 KB). That is 5.5× the 274 px desktop frame and 7.9× the 190 px phone frame;
  - the chips are the 1200 px chip8c files; a chip shows at about 100 css px, so they serve 12×;
  - the loops are the live founder files (640 px).
- **Page checks:** no console errors at 320, 390 and 1280 (takes and drop-in). Four founder videos are mounted in frame 4.

## Drop-in (E3)
- **`dropin-frame4.js`:** a block for `ez/tools/v22/story/x2p_top.js`, with the four steps in its header.
  - It uses that file's own `pic`, `surf`, `em`, `rank` and `IMQ`.
  - It adds `boardB6()` and `b6Wire()`.
  - The `board:{...}` entry in frames() calls `boardB6()`.
  - Call `b6Wire(sec)` at the end of build().
- **`dropin-frame4.css`:** append it to x2p_top.css.
- **The painting:** `out/top-h25-board6.jpg` / `.webp`, ready for `media/` (a new name, since media is cached for a year).
- **Tested:** `testdrop.js` pastes the block into a copy of the live x2p_top.js, runs it on the built page, and shoots `out/drop-{320,390,1280}.png`. No errors, no sideways scroll, four videos.
- **Other takes:** `python3 mkdrop.py e1` or `mkdrop.py e2` writes the drop-in for those instead.

## How it could fail
- **The dashes at phone size.** At 390 the bars are 2 to 11 px wide, so a visitor may see "lit, empty" windows rather than "numbers coming". The No. window's bar is 1.7 px, which is next to nothing. If that reads as broken, drop the dashes in No. and LAST ROUND and keep them in the two big windows.
- **The tag covers rank window 4.** "4 BOARD" covers most of rank window 4 in E1 and E2 and the bottom of chip 4's socket; in E3 the "4" stays readable. Today's frames 1 to 3 share the overlap.
- **Faces are small.** The founder window is about 18 to 22 css px at 390 (the frame is 190 px). At arm's length the faces read as faces, not as individuals. The colour of each chip carries identity until Meet the models.
- **Pasted chips.** The chips are separate paintings laid in by code, with a contact shadow and a soft-light falloff. In E3 the chips follow the sockets' perspective, but their own light is head-on. At 3x the leader's chip edge looks sharper than the board around it.
- **The beam is CSS.** It is a gradient with streaks, screened over the painted socket, which is the one generic effect here. Its reason: without it the lift did not read. A painted beam needs the chip's position fixed in the painting, and the chip moves with the ranking.
- **Lifted vs seated:** the owner may read the floating chip as "not plugged in". The painted socket under it is empty and glowing on purpose: the golden ticket is the one pulled out.
- **E1 is not the perspective I asked for.** The model drew it nearly head-on, so E1 and E2 are close cousins.
- **Order flips:** frames 1 to 3 are about R40, while frame 4 is today's standings. That is unchanged from today.

## Hedra log (`log.jsonl`): $7.50 of the $40
| Job | Model | Settings | Cost | Time | Result |
|---|---|---|---|---|---|
| e1a, e1b, e2a, e2b | gpt-image-2 | 4K high 1:1; refs guide + board5's E + bet chip | 4 × $0.75 | ~140 s | Blank chips painted 5.6:1, too long for the chips. Not used. |
| e1c, e1d | gpt-image-2 | 4K high, empty-socket guide | 2 × $0.75 | 141 s | Clean sockets near 2.6:1. The perspective came out weak. e1c is E1. |
| e2c, e2d | gpt-image-2 | 4K high, empty-socket guide | 2 × $0.75 | ~146 s | Head-on, exact layout. e2c is E2. |
| e3a, e3b | gpt-image-2 | 4K high, three-quarter guide | 2 × $0.75 | 142 s | A real angled shot with the rows tilted. e3a is E3. |

Not committed: the reference copies `ref-e1n.jpg` (= `../board5/img/e1n.jpg`) and `ref-bet.jpg` (`convert media/bet-chip-h2.jpg -resize 1400x ref-bet.jpg`).

## Files
- **Takes:** `_b6.js` / `_b6.css` (`window.__B6` = e1, e2 or e3; `window.__B6IMG`, `window.__B6TK`).
- **Drop-in:** `dropin-frame4.js` / `.css`, built by `mkdrop.py`; tested with `testdrop.js`.
- **Scripts:**
  - `run.js` (frames and measurements);
  - `close.js` (3x close-ups);
  - `board.py` (boards);
  - `gen.py` (Hedra);
  - `guides.py`, `detect.py`, `grid.py` (layout and measuring).
- **Outputs:** masters in `img/` (the three picks at 2880 px; drafts at 1024 px), shots and the served crop in `out/`.
