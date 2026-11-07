# Round H14, area `sol6`: a second pass on sol5's "Smart or lucky?"

Brief: `../BRIEF-H.md`, Round H14 (the owner's notes on sol4/sol5) and the owner's sketch `../h12/ref-sol-caption-owner.webp`.
Mockups only, laid over the real built page (`ez/v47-live-x3plus.html`, served from `ez/`) in Playwright, in place of today's big
board. Nothing in `ez/tools/v22/` or any `ez/v4*.html` touched; nothing deployed or published.

- **Boards:** `ez/x2p-x3p-h14-sol6-390.png` (one column per take, today first; the pick also switched to P&L Season; a close-up
  row at 2x: the three letterings, the pens, the P&L strip, the closing caption) and `ez/x2p-x3p-h14-sol6-1280.png` (the desktop
  take, one row per take).
- **Paintings:** 9 Hedra jobs, all gpt-image-2 (8 roughs at 1K medium, 1 at 2K high): **$0.58**.

## What changed from sol5, point by point
1. **The mask, a third smaller.** E3 (sol4's 2K painting, unchanged) is cropped to two thirds of its height on phones (9:8 instead
   of 3:4, mask and coin whole, the hand cut at the wrist), so the instrument takes the screen (lesson 106). On desktop it is two
   thirds of the column's width, centred. Take D reads "a third smaller" the other way: two thirds of the width on phones too, with
   the title stacked in the column beside it (no dead space).
2. **The caption.** "Four AIs, 312 graded calls. A coin flip gets 50%." is a narration caption on the plate's top-left corner,
   overlapping the plate's frame where the owner drew it (about half above the frame, half over the wall by the traders' heads).
   It is a hand-drawn box, not a CSS box: a seeded wobbly outline drawn as SVG, thick outer ink, a thin inner line, a hard offset
   shadow, tilted -1.2deg. "312" is summed from ROUNDS' calls and "Four" from the cast (PN.MS); the 50% is the only coloured word.
   Three letterings:
   - **L1 classic letterer** (pick): all capitals in Comic Neue Bold, the Silver Age letterer's convention, gold box, the 50% in red.
   - **L2 the owner's hand**: Shantell Sans mixed case (what the owner's sketch shows), on the comic's cream narration paper.
   - **L3 the shout**: red box, Bangers in cream, "312 graded calls." set big in gold, the 50% in gold.
   And three placements: `straddle` (half over the frame, the sketch), `tuck` (sits mostly inside the corner, breaking the frame by
   a few px), `hang` (mostly above the frame, out over the green ground).
   "Only the record shows which call was the guess." moved into the "Same AI. Same voice." panels as their closing caption: the same
   hand-drawn box and lettering, overlapping the strip's bottom-right corner only by its border (it would otherwise cover "Rose
   16.02%. Wrong", a number). The hook panel's caption keeps only the hand-over, "So the pool goes on the call of the AI on top."
3. **The polygraph.** A new plate (`q2b`, 2K for the pick): the machine head-on, its hero a tall blank black paper strip; traders
   in vests behind it, one pointing; the written paper spilling off the desk at the left; a brass pen rail and the chrome roll drum
   at the right. The pens are the hero: one painted pen arm (`pen2.png`: brass rod, glass ink cup, steel nib, pivot hub; cut out of
   magenta) is placed four times by code, each **nib exactly on its AI's line end** and its **pivot on the painted brass rail**,
   pushed apart so the arms never cross; they scratch (a 1 s wobble of under a degree) with a faint wet-ink glint at each nib. The
   **strip moves**: printed red timing ticks along its top and bottom edges run off to the left, the way chart paper feeds, while
   the written lines and every number stay still (one small loop; nothing moves with reduced motion). The chart takes the strip:
   the R1/R80 axis row is gone in hit rate and "COIN FLIP" is lettered on its own dashed red line (placed by code where the fewest
   line points pass, with a dark halo; today it touches Claude's early dip). In P&L the table is one row of four on the strip
   (name and W-L over the P&L), so the chart keeps its height.
4. **"Same AI. Same voice."** unchanged (sol4's two microphones, the hit-rate leader's right and wrong call of the closest size).

## The surface under every live text
| live text | surface |
|---|---|
| "Smart or lucky?" | the Overview's heading face over the mask panel's bottom edge (as "Bet #1: NVIDIA" over the vault) |
| "Four AIs, 312 graded calls. A coin flip gets 50%." | the hand-drawn narration caption box on the plate's top-left corner |
| switch (Hit rate, P&L, Season, 7D, 24H), axis, lines, key, COIN FLIP, the P&L row | the polygraph's blank black paper strip |
| line ends | the painted pen nibs, placed per AI |
| "Same AI. Same voice." | lettered on the chapter's ground (kept as asked) |
| the calls and results in beat 3 | sol4's painted balloons and caption boxes |
| "Only the record shows which call was the guess." | the hand-drawn closing caption on the voice panels' corner |
| "So the pool goes on the call of the AI on top." | the empty caption box drawn into the hook painting (sol5) |

Plain text outside the world: "Same AI. Same voice." only (the brief keeps it). sol5 also had the counter and the two engraved
plates; the caption replaces them.

## The takes
- **H (pick):** E3 cropped, L1 straddling, the 2K polygraph, the closing caption. Desktop: the same, the mask at two thirds of the
  width, the plate cropped to its strip (`q2b-16x9`, 1K).
- **A:** H on the 1K rough plate (shows what the 2K bought: cleaner ink, the strip's edges straighter).
- **B:** L2, tucked.
- **C:** L3, hanging.
- **D:** E3 at two thirds of the width with the title stacked beside it; the polygraph seen from above (`q1-top-a`), the strip on
  the desk feeding into the roll, traders' heads and hands at the bottom; L2 straddling.

## My pick: H
The pens are on the line ends and the strip is plainly moving, so the machine reads as a polygraph doing the work, head-on and
legible. L1 reads as a narration caption at a glance (capitals are what comic captions look like) and the gold box carries the
chapter's one spot colour against the yellow wall; it sits exactly where the owner drew it. L2 is the closest to the sketch's own
lettering if the owner wants that; L3 is the loudest and competes with the title (lesson 71). D is the alternative if "a third
smaller" meant narrower.

## Checks run
- Data: every mount checks the hit-rate series against the live big board's table (4 of 4 ok) and the P&L windows against the
  Leaderboard rows (4 of 4 ok). Grok 45-27 63%, Claude 48-32 60%, GPT 43-37 54%, Kimi 37-43 46%; P&L Season +$148K, +$103K,
  -$56.9K, -$70.7K. 312 summed from ROUNDS.
- 390, 320 and 1280: scrollWidth equals the viewport on every take (the caption's shadow layer reaches 1 px past the column's left
  padding on phones, inside the page); no console errors; nothing on the strip falls outside it (measured); caption text fits its
  box (type steps down until it does).
- Rule 0: no white or pale module ground (the cream of L2 is a caption's narration paper), no dot-filled module, no emoji, nothing
  over a face or a logo, no company by ticker alone.
- Known: at 1280 sol4's beat-3 result boxes overhang by 1 to 2 px of line height (as in H11 and H13).

## How each take could fail
- **All:** the four pen arms are one painting repeated at code-chosen angles and stretched 1.6x in thickness; at desktop size the
  repetition shows. The chart is still small on a phone (the strip is about 330 x 150 px, the lines span about 45 px of it) because
  the hit rates themselves sit between 46% and 63%. The ticks moving but the lines not may read as a decoration rather than paper
  feeding. "COIN FLIP" touches Claude's early dip. Safari not checked.
- **H / A:** the caption box overlaps the traders' heads in the painting by a few px at 390 (not the faces); at 1280 it wraps
  "A coin flip gets 50%." over two lines in a narrow box (it should be wider there).
- **B:** cream narration paper on a yellow wall is low contrast as a shape; the box reads weaker than L1's.
- **C:** the red box with big gold type is a second headline under the title; the closing caption in L3 reads as a shout.
- **D:** the bird's-eye plate's strip is short (580 x 344 painting px) and its traders are seen as the backs of heads, so the
  "people in the room" reaction is lost; on desktop it uses the phone plate at 760 px, much taller than the others.

## Cost
$0.58 of the budget: roughs $0.30 (8 jobs), the pick's plate at 2K $0.28.

| name | model | settings | cost | time | file | result |
|---|---|---|---|---|---|---|
| pen2 | gpt-image-2 | 1K medium 16:9 | $0.029 | 22 s | img/pen2.jpg (keyed: pen2.png) | clean brass arm on magenta, keyed well |
| p1-poly-3x4 | gpt-image-2 | 1K medium 3:4 | $0.038 | 35 s | img/p1-poly-3x4.jpg | strip too thin, brass block crosses it: dropped |
| p2-carriage-3x4 | gpt-image-2 | 1K medium 3:4 | $0.038 | 34 s | img/p2-carriage-3x4.jpg | strip too thin: dropped |
| q1-top-a-3x4 | gpt-image-2 | 1K medium 3:4 | $0.038 | 35 s | img/q1-top-a-3x4.jpg | bird's-eye desk, good strip: take D |
| q1-top-b-3x4 | gpt-image-2 | 1K medium 3:4 | $0.038 | 34 s | img/q1-top-b-3x4.jpg | same idea, weaker machine |
| q2-front-a-3x4 | gpt-image-2 | 1K medium 3:4 | $0.038 | 34 s | img/q2-front-a-3x4.jpg | strip drawn in slight perspective |
| q2-front-b-3x4 | gpt-image-2 | 1K medium 3:4 | $0.038 | 35 s | img/q2-front-b-3x4.jpg | tall, square-edged strip: takes A to C |
| q2b-16x9 | gpt-image-2 | 1K medium 16:9 (ref q2-front-b) | $0.042 | 36 s | img/q2b-16x9.jpg | wide recomposition: the desktop plate |
| q2b-hd-3x4 | gpt-image-2 | 2K high 3:4 (ref q2-front-b) | $0.280 | 95 s | img/q2b-hd-3x4.jpg | the pick's plate, faithful to the rough |

## Files
`_s6.js` (the sequence, the caption boxes, pens, ticks, the takes' geometry), `_s6.css`, `_s3c.js` (sol5's `_s3b.js` with the lean
hit-rate layout and the one-row P&L table), `takes.js` (H, A to D), `run.js` (`node run.js <out> now,h,a,b,c,d 390,1280 hit|season`;
serve `ez/` on port 8974), `board.py <shots dir>`, `measure.py` (empty dark surfaces -> `surf.json`, overlays in `ovl/`), `gen.py`
(Hedra v3), `jobs*.json`, `log.jsonl`, `img/`. Loads `../pnl/_lib.js`, `../sol3/poly.js`, `../sol4/_s4.js` and sol4/sol5 paintings.
