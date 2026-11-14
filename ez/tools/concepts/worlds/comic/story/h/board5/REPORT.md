# board5: frame 4, BOARD, as the whole board, and the gaps (round H24)

Boards:
- `ez/x2p-h24-board5-390.png`: "How a round works" at 390, today first, then takes A to E.
- `ez/x2p-h24-board5-1280.png`: the same at 1280.
- `ez/x2p-h24-board5-close.png`: frame 4 alone at 3x (390 page).
- `ez/x2p-h24-board5-gaps-390.png` and `-gaps-1280.png`: the top from "How a round works" through the film into Meet the models. Today first, then gaps 1 to 3, all with take C in frame 4.

Each take is laid over the built `v46-live-x2plus.html` (`_b5.js` + `_b5.css`, `run.js`).

**My pick: C, the trophy socket. Gap 1, the bus, is my pick for the gaps.**

## The takes (frame 4)
All five show the field: all four models in the order of season P&L, read live from `__x2pPnl`, with the leader marked gold inside the field.

Four of them (A, C, D, E) seat **Meet the models' own chip paintings** (`media/chip7-<m>-1200.jpg`) in sockets on a painted board:
- the same grey Grok, orange Claude, green GPT and blue Kimi;
- the same gold logo plate, flag, name and version;
- the same founder's die.

So frame 4 is literally the doorway: the visitor sees these four chips small, then meets them up close one beat later. The chips are placed by code in rank order, so a change at the top re-seats them with no new painting. Their mark, flag, name and version stay painted (test 4).

| Take | Picture | What is live | Cost |
|---|---|---|---|
| **A · The rack** | Head-on board (`img/a2g.jpg`). Four sockets stacked top to bottom; #1's socket is gold-plated; a glass window beside each. | Rank numeral + name in each window (#1 in gold). | $0.47 |
| **B · Back to the chip** | Beat 1's own hero chip (`media/top-hero-t-h22.jpg`, no new art). Its four dies are numbered 1 to 4. Each die's glass is rimmed in its model's colour (the colour of its chip below); the leader's die is gold. | Rank + mark in each die. The leader's mark + P&L in the season bar, right-aligned so the "4 BOARD" tag doesn't cover it. | $0 |
| **C · The trophy socket** | A big gold socket across the top (4K master `img/c4k.jpg`) holds the leader's chip. Three small steel sockets below hold #2 to #4. | The leader's season P&L, lit in its own chip's P&L window. "2 CLAUDE", "3 GPT", "4 KIMI" in the board's glass. | $1.20 |
| **D · The bus** | The ledger as a gold-bezelled strip down the left. Trace bundles run from it into four sockets; the leader's bundle and socket are gold. | Ranks in the windows. The 14 newest graded rounds ("R80 XOM +2.17%") scroll up the ledger strip: the ledger feeding the board. | $0.47 |
| **E · The golden ticket** | A hero shot down a row of sockets (`img/e1n.jpg`, nano-banana-pro). The front chip (#1) is lifted out of its gold socket on a column of light. | Rank numerals in the windows. | $0.15 |

Drafts that were dropped:
- `a-ladder`, `c-hero` and `d-bus`: their sockets came out about 4:1, too long for the chips.
- `b-steps`: a podium of PCB towers. Its square tops don't fit a chip, so it was not built.
- `a2n` (nano-banana-pro): filled the sockets with metal.
- `e1g`: chip tops about 5:1.

The 2048 px takes were laid out from a typeset guide (`guide-*.jpg`, `guides.py`): gpt-image-2 got the guide as its first reference image, so its sockets are 2.47:1, the chips' own aspect. Places were measured by hand on gridded zooms (`grid.py`, `zoom.py`).

**Line:** keep "The ledger ranks the board." It now says exactly what the picture shows: the ledger (frame 3) puts the four in order. Every alternative I tried added a word the picture already carries.

## The twelve questions (take C)
1. **Hierarchy:** the leader's chip in the gold socket, the biggest and brightest thing, with its P&L lit green. Then the three below, smaller, in order.
2. **Sequence:** after the LEDGER close-up, the camera pulls back to the whole board (the wide shot after three close-ups). It hands over to Meet the models, which shows the same four chips big in the same order.
3. **Words:** none added. The ranks and names are labels; the line is unchanged; "BOARD" stays the sub-head.
4. **Motion:** a slow glint crosses the leader's chip, and the windows re-scan now and then, as on frames 1 to 3. Nothing else moves. Everything is still with reduced motion.
5. **Interaction:** the frame keeps the top's tap (it replays the glint). Nothing new to discover. The chips are not links: Meet the models is one scroll away.
6. **Return:** the order is live. When Claude overtakes Grok, the gold socket holds Claude the next morning, and that is the thing worth coming back to see.
7. **Trust:** the order and the P&L come from the same `__x2pPnl` as Meet the models and the proof, so the frame and the section below always agree.
8. **Share:** a screenshot shows a gold trophy socket with one chip in it and three below. It reads as a podium on X without a caption.
9. **Edge states:**
   - a tie in P&L keeps the sheet's order (the sort is stable);
   - a negative leader P&L prints red in the gold socket (honest);
   - a fifth model needs a fifth socket and a new painting (today's board has four).
10. **Data honesty:** no scale is implied. Socket size marks rank, not the size of the lead.
11. **Reach:** caps measured below. At 320 the board's names drop to a cap of 7.9 (fails test 2 there). The li's aria-label names the ranking for screen readers. Load is one 287 KB image plus the four chip7 files Meet the models already loads.
12. **Feeling:** the payoff is the gold socket. After three glowing close-ups, the wide shot shows who holds the golden ticket, with the rest of the field lined up below it.

## The H23 tests, measured (`measure.json`, frame 4, `run.js` at DPR 2)
| | Today | A | B | C | D | E |
|---|---|---|---|---|---|---|
| 1. Resolution (source px shown / needed at 3x): 390 needs 570 | 809 ✓ | 1600 ✓ | 956 ✓ | 2292 ✓ | 1780 ✓ | 2048 ✓ |
| 1. Resolution: 1280 needs 824 | 809 ✗ | 1600 ✓ | 956 ✓ | 2292 ✓ | 1780 ✓ | 2048 ✓ |
| 2. Smallest live cap at 390 (≥ 9) | 16.8 | 11.9 ✓ | 13.5 ✓ | 9.6 ✓ | 10.0 ✓ | 7.8 ✗ |
| 2. Smallest live cap at 1280 | 24.2 | 17.2 | 19.5 | 13.9 | 14.5 | 11.3 |
| 2. Smallest live cap at 320 | | 9.7 ✓ | | 7.9 ✗ | | |
| 6. Subject share (≥ 0.6) | 0.14 | 0.56 | 0.27 | 0.46 | 0.48 | 0.18 |

- **Test 3, integration:** every live figure is lit in a painted glass window with that window's own glare, cut from the painting and screen-blended back over the text (the quad4 recipe, `q4-gl`). The figures carry the scanlines and the bloom.
- **Test 4, static words painted:** the board has no words. Each chip's mark, flag, name and version are Meet the models' painted ones.
- **Test 5, chip detail:** the boards are dense PCB (traces, vias, SMD parts, pads, gold pins). C's 4K repaint has the finest detail.
- **Test 6, framing:** A, C and D are wide shots on purpose (the brief keeps "the wide shot after three close-ups"). They fail the 60% rule by design; tell me if frame 4 should be cropped in instead.
- **Page checks:** no console errors and no sideways scroll at 320, 390 and 1280. The drop-in pasted into a copy of x2p_top.js (`testdrop.js`) runs clean at 390 and 1280.

## Drop-in for frame 4 (take C)
- `dropin-frame4.js`: a block for x2p_top.js, with the four steps in its header. It uses x2p_top.js's own helpers (pic, surf, TX, em) and replaces the `board:{...}` entry.
- `dropin-frame4.css`: the chip shadow, the leader's warm rim and glint.
- The painting: `out/top-h24-board.jpg`, ready to copy into `media/` (1200 px, 287 KB). It is the crop of the 2880 px master `img/c4k.jpg`.
- The chips reuse `media/chip7-*-1200.jpg`.

## The gaps (`_gap.js`, `_gap.css`, window.__B5G)
I read "the gap" as both kinds of gutter: the beat gaps (today's torn paper) and the frame gaps (today's gold trace). I added one more gap, from the top into Meet the models (today there is none).

Each beat-gap treatment is a strip of painted board crossing the gap (gpt-image-2, 16:9, cut to a band, `out/g*-p.jpg`):
1. **The bus (my pick).** Four bundles of gold traces cross the gap vertically, with a pulse of data running down each. It is the one gap that carries the story: four bundles for the four models' trades, passed from one beat into the next.
2. **The seam.** The upper board's gold edge fingers plug into the lower board's slot. Still. It reads as "this beat plugs into the next".
3. **The breakaway rail.** A panelised board's mouse bites, with one tab snapped to show the fibreglass. It is the PCB's own perforation, so the torn paper's job is done inside the world.

**The frame gaps** keep their gold trace; a spark runs along it in the order 1 → 2 → 3 → 4 (lesson 118: lighter between frames, stronger between beats).

**On a painted ground** (the `ground` helper):
- if the ground is the motherboard itself, gaps 1 and 3 become features of the same board. The bus is its traces; the rail is where one board panel breaks from the next. Their black fades go, and the band's own green meets the ground's;
- gap 2 (the seam) suits a ground of separate boards, one per beat;
- on today's black, all three fade into black above and below.

## How it could fail
- **Pasted chips:** the chips are separate paintings laid into the sockets. I added a contact shadow and the key light's falloff, but at 3x their finer detail and slightly different light can read as stickers. This is worst in E, where the lifted chip's sprite does not tilt with the light.
- **The tag covers #4:** at 390 and 1280 the "4 BOARD" sub-head covers most of the bottom chip in A and C (its window, "4 KIMI", stays clear). The same overlap exists on frames 1 to 3 today. Moving frame 4's tag below the picture would fix it but breaks the locked rhythm, so I didn't.
- **Small identity at 390:** the chips' painted names are unreadable at 390 (about 4 px cap). Identity rests on the colour and the gold logo, plus the live names in the windows (A, C) or nothing (D, E, where the windows carry only numbers). B shows marks only.
- **Empty chip windows:** the chips' own windows (last 5, W-L, No.) are blank here. Filling them would put live figures under the 9 px cap. A visitor might read the empty glass as "off".
- **C at 320:** the names drop to a cap of 7.9.
- **E fails test 2** (rank numerals 7.8 at 390) and the framing test badly. It is the drama take, not a ship candidate as is.
- **Order flips:** the board order changes when the P&L order changes. Meet the models follows the same order, so they agree; but the CALL/CLOSE/LEDGER frames are about R40, while frame 4 is today's standings. The line doesn't say "after R40", and it shouldn't: the board is the season.
- **My reading of "the gap":** if the owner meant something else (the gap in the story between BOARD and Meet the models, which the film sits between), these strips answer only the visual part.

## Hedra log (`log.jsonl`): $5.42 of the $40
| Job | Model | Settings | Cost | Time | Result |
|---|---|---|---|---|---|
| a-ladder, b-steps, c-hero, d-bus | gpt-image-2 | 2K high 1:1, refs hero + chip | 4 × $0.454 | ~127 s | Good chip-world style. Sockets came out about 4:1 (too long for the chips). b-steps: a striking podium, square tops. |
| g1-traces, g2-seam, g3-bites | gpt-image-2 | 2K high 16:9 | 3 × $0.234 | ~75 s | All three usable as bands. |
| a2g, c2g, d2g | gpt-image-2 | 2K high, typeset guide as first ref | 3 × $0.466 | ~124 s | Followed the guide closely (sockets 2.47:1). Used for A, D, and C's draft. |
| a2n | nano-banana-pro | 2K, same guide | $0.156 | 38 s | Photographic metal in the cavities; not used. |
| e1g | gpt-image-2 | 2K high | $0.454 | 125 s | Lift at the front, chip tops 5:1; not used. |
| e1n | nano-banana-pro | 2K | $0.155 | 30 s | Dramatic diagonal with a column of light; used for E. Flatter cel finish than the rest. |
| c4k | gpt-image-2 | 4K high, c2g as ref | $0.737 | 129 s | 2880 px repaint, geometry within a few px of c2g, finer detail. C's master. |

Not committed: the reference copies `ref-hero.jpg`, `ref-chip.jpg`, `ref-bet.jpg` and `ref-c2g.jpg`. Remake them from `media/` with `convert media/top-hero-t-h22.jpg -resize 1024x ref-hero.jpg`, `convert media/chip7-grok-1800.jpg -resize 1400x ref-chip.jpg`, `convert media/bet-chip-h2.jpg -resize 1400x ref-bet.jpg`, and `convert img/c2g.jpg -quality 92 ref-c2g.jpg`.

## Files
- **Takes:** `_b5.js` / `_b5.css` (window.__B5 = a/b/c/d/e, window.__B5W = name/pnl).
- **Gaps:** `_gap.js` / `_gap.css`.
- **Scripts:**
  - `run.js` (frames + measurements);
  - `close.js` (3x close-ups);
  - `gapshot.js` (gap shots);
  - `testdrop.js` (the drop-in in a copy of x2p_top.js);
  - `board.py` (boards);
  - `gen.py` (Hedra);
  - `guides.py`, `detect.py`, `grid.py`, `zoom.py` (layout and measuring).
- **Outputs:** paintings in `img/`, shots in `out/`.
