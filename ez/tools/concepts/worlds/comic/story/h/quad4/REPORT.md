# Round H23 · quad4: the four frames of "How a round works"

The brief, as I read it: each frame is a close-up of one part of the chip, and its live facts are lit in that part's own glass. Read them the way you read the NVIDIA timer's digits: big, at a glance, with no tap. The previous paintings showed a whole chip, about 12% of it glass, on a black void with a bare strip. Their figures were about 4 to 7 px tall.

## Deliverables
- **Drop-in code:** `_q4.js` (a full replacement for `tools/v22/story/x2p_top.js`) and `_q4.css` (append after `x2p_top.css`).
  - `_q4.js` is built by `build.py`: x2p_top.js as of f180a6e, with beat 2's pictures, surfaces and states replaced by `_frames.part.js` and `_states.part.js`.
  - The quads come from `quads.json`.
  - Everything else is x2p_top.js verbatim: headline, hero chip, sub-heads, gutters, lines, film.
  - As a mockup it removes the live `.t4` first; at the port that line is harmless.
- **Paintings for `media/`** (flat names, ready to copy), in `out/`:
  - `top-h23-call.jpg`, 1200², 297 KB
  - `top-h23-close.jpg`, 1200², 247 KB
  - `top-h23-ledger.jpg`, 1200², 248 KB
  - `top-h23-board.jpg`, 960², 264 KB; the brushed gold does not compress, so 1200 would be 389 KB
  - The 2K masters are `img/q-*.jpg`. Each export is a crop of its master (the crop is in `quads.json`).
- **Boards:**
  - `ez/x2p-h23-quad4-390.png`: today vs quad4
  - `ez/x2p-h23-quad4-1280.png`
  - `ez/x2p-h23-quad4-closeup.png`: each frame at 3x on a 390 phone, above the NVIDIA timer at the same height
- **Scripts:**
  - `run.js` lays the mockup over the built v46 page and shoots it with the measurements → `measure.json`
  - `flat.py`: test 5
  - `anim.js`: the motion check
  - `board.py`, `gen.py`, `quads.py`

## What changed
- **CALL:** four large display dies fill the frame. Each shows its AI's call ("+1%", "−4.5%") as the face of the die, with the mark and name under it, lit green or red.
  - The content sits in the lower part of each die, because "How a round works" and the caption cross the top of the first row.
- **CLOSE:** a new, nearly square readout fills the frame. It shows "TESLA (TSLA)", "−3.08%" and "[mark] GROK WINS". The buzzer runs off the top-left corner.
  - The caption moved to the top right so it doesn't cover the buzzer or the sub-head at 1280.
- **LEDGER:** zoomed into the rows.
  - R38 is cut off by the top edge, so the ledger reads as continuing.
  - R39 and R40 each take two lines: round, ticker and move on the first; the company name and the winner's mark on the second. Name and ticker are both shown, as lesson 0 asks.
  - The winner's name drops to the mark alone when the company would otherwise shrink below 82% of the row's type.
  - The last row is "R41" with a blinking cursor: the next round, not yet written.
  - Ties print both marks and "TIE"; "NOBODY" only when nobody won. The sheet joins tied winners with " & ", which the live code would have printed as NOBODY.
- **BOARD:** the gold lid fills the frame, with the leader's mark and name stamped into the metal.
- **States (per the addendum):**
  - Every fact shows from the start; the off state, the veil and the 3 s reveal are gone.
  - Life while the frames are on screen (an IntersectionObserver toggles `.q4-vis`):
    - each die re-scans in turn (a light band plus a short flicker, every 6.4 s, staggered by 1.6 s);
    - the readout re-scans every 5.2 s;
    - the ledger's cursor blinks;
    - a glint crosses the gold every 6.8 s.
  - A tap replays the frame's moment: the dies light one by one; the buzzer rings and the readout flashes; the new row types in; the gold glints.
  - With reduced motion nothing runs; checked, 0 animations. With motion allowed: CALL 8, CLOSE 2, LEDGER 2, BOARD 1, and a tap on CLOSE adds buzz, rings and a flash.

## H23 tests, measured on the built page with the code laid over it

| Test | Today 390 | quad4 390 | Today 1280 | quad4 1280 |
|---|---|---|---|---|
| 1 Resolution: source px shown / need (CSS × 3) | 765–844 / 570 | 960–1200 / 570 ✓ | 765–844 / 824: **CALL and BOARD fail** | 960–1200 / 824 ✓ |
| 2 Smallest live cap height (CSS px; Anton cap = 0.86 em) | 3.6 (ledger head) | **9.5** (KIMI); call figures 20–21, readout move 24.5, lid 39.6 ✓ | 5.3 | 13.7 ✓ |
| 6 Subject share of the frame (glass or lid only / with bezel) | 5–20% | CALL 48.5 / 63.5, CLOSE 42 / 66.5, LEDGER 76 / 76+, BOARD 55 / 65 ✓ (with bezel) | same | same |

- **Page:** no console errors and no sideways scroll at 390 and 1280.
- **Test 2, every live word at 390** (cap height, CSS px):
  - CALL: GPT 9.6, KIMI 9.5, CLAUDE 10.2, GROK 9.9; the calls 19.9–21.5
  - CLOSE: TESLA (TSLA) 16.9, −3.08% 26, GROK WINS 16.5
  - LEDGER: 10.5–13.9
  - BOARD: 39.6
  - Measured as font size × Anton's cap ratio (canvas `actualBoundingBoxAscent`) × the surface's on-screen vertical scale, taken from its quad.
- **Test 6:** glass-only areas come from the mapped quads. Bezel areas come from outer quads I read off the paintings by eye, so they are approximate (±3 points). Glass alone is under 60% for CALL, CLOSE and BOARD; with the gold bezel or bevel all four are above it.
- **Test 5, chip detail** (`flat.py`: 12 px blocks with luminance std < 3.5, connected, similar mean):
  - Outside the displays and the lid, the flat share is ≤ 0.9% of the frame in all four, with the largest flat patch ≤ 0.2%. They show traces, vias, SMD parts with end caps, pads, seams and pins.
  - Counting the displays, the flat areas are the dark glass itself: CALL 38.6%, CLOSE 44.9%, LEDGER 41.3%, BOARD 0.8% (the lid has brushed grain). That glass is where the live text goes, as the timer's dies are flat glass too.
  - Today's paintings: 44–60% flat, mostly the black void and the bare strip.
- **Test 3, integration:**
  - Every figure is on a glass the painting provides, mapped in its perspective (matrix3d per quad).
  - It is emissive: a white-to-amber, green or red gradient fill and a three-step glow that blooms past the glass onto the bezel. The glow is sized in screen px through `--k` (CSS px per painting px), so it doesn't shrink with the surface's scale.
  - Scanlines run in the glass's perspective.
  - Over the text sits the painting's own glare and reflections: the same image, clipped to each glass and screen-blended at high contrast.
  - On the gold lid the name is multiplied into the metal, so the brushed grain runs through the letters. It has a pale lip under each stroke (separate surfaces, since a transformed surface isolates blending) and a displacement filter for a slight press spread.
  - The ruled rows and bezels are painted.
  - **Compared with the timer** in the close-up board, the timer is still ahead: its digits are bigger in their dies and have a hotter white core. Ours are about two-thirds of its digit size, and the red figures read slightly pinker and softer. The scanlines and glare cost some contrast at 3x.
- **Test 4, static words painted:** nothing static is laid over a painting.
  - Every word in these four frames is on a display (live or display content) or stamped into the lid (the leader, which changes).
  - The AI marks and names on the CALL dies are display content, as the timer's DAYS/HRS labels are. The order of the four comes from the round's calls.
  - I painted no words, so no model misspellings.
- **Test 7:** the one-by-one lighting is replaced by the addendum's always-on plus life. A tap still replays.

## Budget
$3.05 of $6, all on gpt-image-2, with the bet chip and the hero chip as style references:
- 8 drafts at 1K medium, $0.079 each
- 4 repaints of the picks at 2K high, from the draft as reference, $0.4535 each
- 2 drafts plus 1 repaint for a taller CLOSE readout: the first readout was 2.3:1, so it filled only 33% of a square frame

Full log in `log.jsonl`.

| Name | Model | Settings | Cost | Time | File | Honest line |
|---|---|---|---|---|---|---|
| d-call-a/b | gpt-image-2 | 1K medium, 1:1 | 0.079 each | 50 s | img/d-call-* | a: four big dies, slight perspective. Picked. |
| d-close-a/b | gpt-image-2 | 1K medium | 0.079 each | 50 s | img/d-close-* | Good buzzer, but the display was too wide for a square frame. |
| d-ledger-a/b | gpt-image-2 | 1K medium | 0.079 each | 50 s | img/d-ledger-* | b: head-on, four ruled rows. Picked. |
| d-board-a/b | gpt-image-2 | 1K medium | 0.079 each | 49 s | img/d-board-* | a: lid with room on both sides. Picked. |
| q-call-a, q-ledger-b, q-board-a | gpt-image-2 | 2K high, draft as ref | 0.4535 each | 121–134 s | img/q-* | Kept the composition; sharper parts, finer traces. |
| q-close-a | gpt-image-2 | 2K high | 0.4535 | 121 s | img/q-close-a.jpg | Not used: replaced by close2. |
| d-close2-a/b, q-close2-a | gpt-image-2 | 1K medium ×2, 2K high | 0.078 ×2 + 0.4535 | 52 / 115 s | img/*close2* | A nearly square readout filling about 80% of the frame. Used. |

## My pick and how it could fail
**Pick:** all four as built; on the 390 board, compare the two columns.

How it could fail:
1. **Less crafted than the timer** at 3x: the figures are smaller and softer, and the reds look pink. A stronger white core on the red and green gradients, or a thinner scanline, would close some of that; I kept the glare on purpose, since test 3 asks for it.
2. **CALL's names sit at about 9.5 px cap** at 390, just above the floor. On a 360 phone they fall to about 8.8, under it.
3. **The top dies' upper halves are empty glass,** because the heading and caption cross the first row. That reads as layout, not design. A cleaner fix is to stop the heading overlapping the first row, but that is outside quad4.
4. **The paintings read more as rendered than inked** (lesson 88 prefers drawn): the ink line is fine and halftone barely shows. The hero chip they sit beside has the same finish, so the beat stays consistent.
5. **The ledger's winner on R39 is a mark only** (no name). A visitor has to read the mark as "the winner", learning it from the R40 row and from CLOSE's "GROK WINS".
6. **The BOARD frame shows only one name.** If the leader changes to a long name, it fits by shrinking (`fit` to 62% of the lid width); GPT and Kimi are short, so this is checked by arithmetic, not on screen.
7. **Not checked:** Safari (clip-path on images, mix-blend screen, CSS `calc()` with a unitless var in drop-shadow).
