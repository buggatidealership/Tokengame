# Round H20 · top5: the top of X2+, from H19 top4 option 1

The base is the owner's pick from top4: cream, CALL / CLOSE / LEDGER / BOARD, order 1.

## What changed (BRIEF-H Round H20)
1. **The step words left the chip.** They are no longer silkscreened on each painting's bare strip of board.
   - Each frame now has a numbered comic sub-head, **1 CALL · 2 CLOSE · 3 LEDGER · 4 BOARD**, in the headline's Bangers. It sits on the frame's bottom edge, breaking it, right above the line it introduces.
   - **Size:** the geometric mean of the headline and the line, times 1.1. Measured: 21.5px at 390, 19.5px at 320 and 35px at 1280. That sits between "How a round works" (31.8 / 25.1 / 69.1) and the line (12 / 12 / 15).
   - **Three options:**
     - **S1 gold badge.** The number is on a hand-drawn gold disc with a wobbly outline, an ink edge, an ink drop and a highlight. The word is cream with an ink outline and an ink drop (no colour drop, so it doesn't repeat the headline). Tilted −2.6°.
     - **S2 big numeral.** The number is tall, in the headline's gold with its red drop. The word is green with an ink outline. The frames tilt in turn (−3°, +2.2°).
     - **S3 caption tab.** A drawn narration box: black, a cream ink border on an irregular four-point outline, and an ink drop. The number sits on a red tab, the word is in cream, tilted −1.6°. The box straddles the frame's bottom edge.
2. **Gutters in two strengths, all drawn.** Measured at 390, each beat gutter takes 70 to 76px and is a full-bleed drawn object. The frame gaps are 20px vertical and 10px horizontal with a thin mark. At 1280, the beat gutters are 104 to 108px against 22px frame gaps.
   - **Pair 1, torn paper / zigzag cut.**
     - Beats: a cream strip ripped along both edges, with an ink outline, a red sliver under it (the headline's drop) and a faint cream halftone shadow below.
     - Frames: a thin cream zigzag cut.
   - **Pair 2, board edge with pins / gold trace.**
     - Beats: a painted PCB strip with gold edge-connector fingers on both sides and green and red rim lights at its ends. It is one Hedra painting, cut into a left cap, a seamless 10-pin tile (the pitch measured by autocorrelation: 43px) and a right cap, so it spans any width without stretching the pins.
     - Frames: a gold trace with a via at each end and one jog.
   - **Pair 3, ink band with a halftone fade / dotted rule.**
     - Beats: a thick brushed band in the bet's green, with a cream top edge and a gold halftone fading out below it.
     - Frames: a rule of cream dots that swell toward the middle.
3. **CLOSE's line** now reads "The close decides who wins the round."
- **Everything else is top4 option 1:** the hero chip, "How a round works" breaking the CALL frame, R40 Tesla from ROUNDS, the buzzer's readout, the ledger rows, the gold lid, "The whole game 1:20", and the tap and 3 s self-reveal.

## Files and how to run
- `_t5.js` is a copy of top4's `_t4.js` with the changes above. Switches:
  - `window.__T5S` = 1, 2 or 3 (the sub-head option);
  - `window.__T5G` = 1, 2 or 3 (the gutter pair);
  - `__T4auto=false` as before.
- `_t5.css` is laid over top4's `_t4.css`.
- Paintings: `img/t5-edge-l.jpg`, `t5-edge-m.jpg` and `t5-edge-r.jpg`, cut from `t5-edge-b.jpg`. The other paintings are top4's and top1's, referenced by path.
- To run:
  1. Serve `ez/` on port 8954: `cd ez && python3 -m http.server 8954`.
  2. `node run.js <out> now,s1g1,s2g1,s3g1,s1g2,s1g3,s3g2 390,1280`. Each id is `s<sub-head>g<gutter pair>`; add `off` for the frames' off state.
  3. `/usr/bin/python3 board.py <out> 390 ez/x2p-h20-top5-390.png`, and the same with 1280.
- Boards:
  - `ez/x2p-h20-top5-390.png` and `-1280.png`.
  - Row 1: today's live top, my pick (S3 + pair 2) and S1 + pair 1, each the whole top.
  - Then the three sub-head options, the three gutter pairs and close-ups.

## My pick: S3 caption tab + gutter pair 2 (board edge / gold trace)
- **S3** uses the comic's own device for the narrator: a narration box (lessons 105 and 116). It is the most legible of the three over a busy frame edge, because its black box hides the frame's cream border where it crosses.
  - It keeps gold for the headline, and the red tab makes the number impossible to skip.
  - S1 is the runner-up: the softest and most "badge"-like.
- **Pair 2** is the only pair whose beat gutter is a chip-world object (lesson 111): a board's edge connector reads as "end of this module, plug into the next".
  - Its frame gutter is a trace, so the two strengths come from one material: painted metal and board for a beat, a hairline of gold for a frame.

## How each option could fail
- **S1:**
  - The gold disc echoes the headline's gold. Next to "How a round works" the page has a lot of gold.
  - The cream word sits below the frame's cream bottom border, so the badge is the only part that breaks the edge. Some may read the word as a caption under the frame, not a heading.
- **S2:**
  - The giant numeral is the loudest of the three and competes with "How a round works" on a phone.
  - The alternating tilts can read as messy rather than lively.
  - The green word on the board's green, where it overlaps the art, is low contrast. Only the ink outline separates it.
- **S3:**
  - A box per frame adds four more boxes to a page the owner wants less boxy (rule 0, "box in a box").
  - The black box covers the frame's bottom-left corner, about 8 to 10px of art. That area is bare board or void in all four paintings (checked), but a future painting could put something there.
- **Pair 1:**
  - The torn cream strip is the loudest gutter by far, a pale band across a dark page. It can read as a "cream ground" (rule 5) even though it's a gutter.
  - Torn paper belongs to the comic page, not the chip world.
- **Pair 2:**
  - The pins repeat at 43px, so on wide screens it is a long, regular row. Up close it can read as a ruler.
  - On a phone the strip is only 30px tall, so the pins are small.
  - The frame trace looks like the circuit traces inside the paintings, so a reader may not see it as a gutter at all. It is the subtlest frame mark of the three.
- **Pair 3:**
  - The gold halftone fade under the band is a dot pattern across the full width. It sits close to the "pyjamas" no-go, even though it fades out and only shades the band.
  - The dotted frame rule is faint on dim screens.
- **All:**
  - Safari is not checked: SVG `vector-effect` in the caption box, `-webkit-text-stroke` with `paint-order`.
  - Frame gutters are drawn after layout by script (`gutters()`). They redraw on resize and on font load, but a layout change without either (an image loading late) could leave a gutter a few pixels off until the next resize.

## Checks run (see `checks.txt`)
- **Widths:** 320, 390 and 1280px for every option and pair. No sideways scroll (scroll width = viewport), 0 page or console errors, no heading, sub-head, line or caption past the screen's edge or its frame.
  - Found and fixed on the way:
    - at 1280 the frame-gutter finder drew gutters between frames that were not neighbours, through the middle of frames 2 and 3;
    - S3's box padding was cancelled by an `!important`.
- **Sizes** (computed): headline = "How a round works" > sub-head > line at every width; see the table under "What changed".
- **Gutter strength** (measured, beat vs frame):

  | Width | Beat gutters | Frame gaps |
  |---|---|---|
  | 390 | 70 to 76px, full-bleed objects | 20 / 10px, thin marks |
  | 1280 | 104 to 108px | 22px |

- **Data:** every number on the frames is from ROUNDS and `__x2pPnl` (as top4): R40 Tesla, −3.08%, Grok wins; the leader Grok +$148,480, 45-27; 80 graded.
- **Rule 0:**
  - no emoji;
  - no pale ground inside a module;
  - no text over a logo or a die;
  - the step words are narration outside the object (lesson 116), numbered (lesson 117);
  - two gutter weights (lesson 118).

## Cost (Hedra)
| Job | Model | Settings | Cost | Time | Result |
|---|---|---|---|---|---|
| t5-edge | gpt-image-2 | 1K medium 16:9, ref the NVIDIA chip | $0.042 | 36 s | one edge with a row of gold fingers; good, not used |
| t5-edge-b | gpt-image-2 | same | $0.042 | 36 s | a strip with fingers on both edges, rim lights at the ends; **used** (cut into caps and a seamless tile) |

**Total: $0.08 of the $4 cap.** Every prompt asked for no text, letters, numbers, logos or symbols, and none came back with any.
