# Round H21 · top6: the top of X2+, from H20 top5

The base is top5. Every take uses sub-head **3, the caption tab** (the red number tab in a drawn caption box), as the owner picked.

## What I made (BRIEF-H Round H21)
1. **Sub-heads:** S3 only, on all four frames: 1 CALL · 2 CLOSE · 3 LEDGER · 4 BOARD.
2. **Gutters, two takes:**
   - **Take A** (the lead's reading of the owner's message):
     - Between beats: pair 1's torn cream paper (headline → "How a round works", and the four frames → "The whole game").
     - Between the four frames: pair 2's gold trace with vias.
   - **Take B:** pair 1 complete, torn paper between beats and the zigzag cut between frames.
3. **Frame lines:**
   - CALL: "4 AIs submit their predictions before the earnings report."
   - CLOSE: "The next market close after the report decides who wins."
   - LEDGER: "Every round is written to the ledger."
   - BOARD: "The ledger ranks the board."
   - I made four line variants (`window.__T6L`):
     - **a:** the owner's lines at today's size (12px on phones, 15px from 1000px).
     - **b:** the same words. All four lines shrink to the size that keeps "4 AIs submit their predictions" on line 1. One size for all four (lesson 112).
     - **c:** CALL shortened to "4 AIs submit predictions before the earnings report." at today's size.
     - **d:** c plus a shorter CLOSE, "The close after the report decides who wins." This is my suggestion, not the owner's wording.

## The owner's question: does "4 AIs submit their predictions" fit on one line at 390px?
**No, not at today's size.** The measurements, Shantell Sans 600, with the site's fonts loaded:
- Each frame's line box is 174px wide at 390px. That is two frames to a row with a 10px gap and 8px margins.
- At 12px the clause "4 AIs submit their predictions" is 184.6px wide, 10.6px too wide.
- **The size it would need is 11.3px** (measured 11.31). Variant b uses 11.2px, rounded down for safety.
- At 320px it would need 9.0px (8.9 in b), which is too small to read comfortably.
- **"4 AIs submit predictions"** is 150.6px at 12px. **It fits at today's size**, with room up to 13.9px at 390px. At 320px (139px box) it needs 11.1px, so c and d step down to 10.9px there.
- At 1280px every variant fits at today's 15px. The clause needs at most 230.8px of the 263px box.

## Line counts (measured: the distinct line tops of each line's text)
Each cell is CALL / CLOSE / LEDGER / BOARD, then the size.

| Variant | 390px | 1280px | 320px |
|---|---|---|---|
| a, the owner's lines at today's size | 3 / 3 / 2 / 1 at 12px | 2 / 2 / 2 / 1 at 15px | 3 / 3 / 2 / 2 at 12px |
| b, clause kept on line 1 | 2 / 2 / 2 / 1 at 11.2px | 2 / 2 / 2 / 1 at 15px | 2 / 2 / 2 / 1 at 8.9px |
| c, "4 AIs submit predictions" | **2 / 3 / 2 / 1 at 12px** | 2 / 2 / 2 / 1 at 15px | 3 / 3 / 2 / 2 at 10.9px |
| d, c + the short CLOSE | 2 / 2 / 2 / 1 at 12px | 2 / 2 / 2 / 1 at 15px | 3 / 3 / 2 / 2 at 10.9px |

- Line widths: 174px per frame at 390, 263px at 1280, 139px at 320. All four frames are the same width in every variant.
  - The first try of b made the CALL column 183px and the CLOSE column 165px, because the no-wrap clause pushed the grid. Fixed with `min-width:0` on the frames, then measured equal.
- In b, c and d the clause starts on line 1 in every case (checked: its top is the line's first top).
- CLOSE in the owner's wording takes 3 lines at 390px at 12px, with "wins." alone on the third. Only a smaller size (b) or shorter words (d) bring it to 2.

## How to run
1. Serve `ez/` on port 8954: `cd ez && python3 -m http.server 8954`.
2. `node run.js <out> now,A-a,A-b,A-c,A-d,B-a 390,1280`. Each id is `<take>-<lines>`: take A or B, lines a to d. Add `off` for the frames' off state.
   - It lays `../top4/_t4.css`, `../top5/_t5.css`, `_t6.css` and `_t6.js` over the built `v46-live-x2plus.html`.
   - It prints sizes, line counts (`lc`) and the clause fit (`fit`: available width, clause width, size needed).
3. `/usr/bin/python3 board.py <out> 390 ez/x2p-h21-top6-390.png checks.txt`, and the same with 1280.

Files:
- `_t6.js`: top5's `_t5.js` with three changes.
  - Separate switches for the beat gutter (`__T6B`, default 1, torn paper) and the frame gutter (`__T6F`, default 2, gold trace). Sub-head default is 3.
  - The new lines, with variants switched by `__T6L`.
  - `fitLines()`, which sizes all four lines together. The sub-head size still comes from the base line size, so b does not shrink the sub-heads.
- `_t6.css`: the no-wrap clause and `min-width:0` on the frames.
- `checks.txt`: the raw measurements.
- No new paintings. The gutter pins and the frame art are top4's and top5's.

Boards: `ez/x2p-h21-top6-390.png` and `-1280.png`.
- Row 1: today's live top, take A with lines c (my pick) and take B with lines a, each the whole top.
- Row 2: the four line variants on take A, each labelled with its measured line counts.
- Row 3: close-ups of both takes' gutters, between beats and between frames.

## My pick: take A with lines c
- **Take A:**
  - The torn paper gives the strong break between beats.
  - The gold trace is a clearly lighter break between frames, in the chip's own material (lessons 111, 118).
  - In take B the zigzag is the same cream as the torn paper and the frame border. It reads busier and closer in weight to the beat gutter.
- **Lines c:**
  - It answers the owner's question without shrinking the type: "4 AIs submit predictions" holds line 1 at today's 12px, and CALL drops from 3 lines to 2.
  - "their" adds nothing a reader misses.
  - b keeps the exact words but takes every line down to 11.2px (8.9px at 320). That is a readability cost for one word.
- **CLOSE:** I kept the owner's wording ("The next market close after the report decides who wins.", 3 lines at 390), because the owner asked for that meaning.
  - If the third line with "wins." alone bothers him, d's "The close after the report decides who wins." keeps the meaning in 2 lines.
  - d drops "next" and "market"; the owner decides.

## How each option could fail
- **Take A:**
  - The gold trace is the subtlest frame mark and looks like the traces inside the paintings, so some readers may not see it as a gutter at all.
  - The torn cream paper is a pale full-width band, close to the "pale ground" no-go, and torn paper is comic-page material, not chip material.
- **Take B:** two cream marks of similar shape (torn edge and zigzag) blur the two gutter strengths. The zigzag also echoes the frames' cream borders.
- **Lines a:** CALL and CLOSE run to 3 lines on a phone, so the two frames in a row end at different heights of text. At 320px BOARD wraps too.
- **Lines b:**
  - 11.2px on a phone and 8.9px at 320px. Small, and below the rest of the page's body text.
  - The size depends on the font's metrics. If Shantell Sans fails to load, the fallback face gives another size.
- **Lines c:**
  - "submit predictions" without "their" is a touch more clipped.
  - At 320px the clause needs 10.9px, so the lines step down there.
- **Lines d:** "the close after the report" could be read as any close after the report, not the first one. That is weaker on exactly the point the owner wanted understood.
- **All:**
  - Safari not checked (`-webkit-text-stroke` with `paint-order`, SVG in the caption box).
  - The fit runs after layout and on font load and resize. A late layout change without either could leave the size stale until the next resize.

## Checks
- At 320, 390 and 1280px, for every take and variant:
  - no sideways scroll (scroll width = viewport);
  - 0 page or console errors;
  - no heading, sub-head, line or caption past the screen or its frame.
- **Sizes:** headline = "How a round works" (31.8px at 390, 69.1 at 1280) > sub-head (21.5, 35) > line.
- **Gutters:**
  - beats 70px tall at 390, full-bleed torn paper;
  - frames 20 / 10px gaps at 390;
  - at 1280, 104px against 22px.
- **Data:** as top5, all from ROUNDS and `__x2pPnl`. R40 Tesla, −3.08%, Grok wins; the leader Grok +$148,480, 45-27; 80 graded.

## Cost
Hedra: **$0** of the $2 cap. This round is lettering, CSS and measurement only.
