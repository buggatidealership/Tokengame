# Round H20 · chips4: Meet the models, made symmetrical (S and N2)

The brief is `../BRIEF-H.md`, "Round H20", `chips4`. It builds on `../chips3/`; the owner picked S and also likes N2.

Mockups only:
- nothing in `ez/tools/v22/`, `ez/v4*.html` or `ez/media/` changed;
- nothing was deployed or published.

## What I made
**The fix is one master painting per take.** In H19 each chip was its own painting (lit and dim for each model), so the parts landed in different places and sizes. Now each take has one master:
- **S:** `img/ms-c.jpg`, an old-school EPROM with a square quartz window.
- **N2:** `img/mn-a.jpg`, the same chip with the bare silicon die exposed.

Each master is measured once (`quads.json`), and all four chips are that same painting, recoloured in code:
- **The recolour:** a multiply layer in the model's colour, clipped to the ceramic body. Grok graphite #5b5e66, Claude terracotta #dd6a3a, GPT green #1f9a70, Kimi cobalt #3a63d6. The painted grey ceramic underneath keeps its grain and halftone.
- **What the tint doesn't touch:** the gold plate, the window frame and glass (or the die) and the label are the painting's own pixels, laid back over the tint.
- **What is placed in code:** the founder loop, the logo, the flag and every printed field. They all sit on that one master's coordinates.

So the geometry is identical by construction, and the measurements confirm it.

**The leader** is marked the same way, whichever model leads:
- painted golden rays (`img/rays.jpg`, one Hedra job) screened around the leader's chip, clipped away from the body so they never cover it;
- its No. "1" printed in gold.

Today the leader is Grok. If the leader changes, only the rays move; no geometry changes.

**The label is one fixed grid of five printed fields**, parted by thin silkscreen rules:
- row 1: name and version | No.
- row 2: Last 5 | W-L
- row 3: Season P&L, across the full width.

The fields' boxes are the same on every chip. The printed ink (H19's `#chInk` silkscreen filter, with the epoxy multiplied back over the type) is kept.

**The fifth chip reads "In inference"** (H19's tryouts EPROM, unchanged otherwise, with the caption "No. 5? · not signed yet").

**Notes on the two takes:**
- **S window:** the painted glass opening is 166 × 186 px on the master, an aspect of 0.89. The gold frame around it is 218 × 235, so it reads as square, but it is not exactly square. A repaint can fix that if the owner wants a true 1:1.
- **N2 die:** the die is square (221 × 220 on the master; 70.65 × 70.33 px at 390).

## Measurements (per chip, CSS px, relative to the chip's own painting box)
`node run.js` prints `__ch.boxes()` for every chip, and `python3 boxes.py <log>` turns that into the table in `boxes.md`:
- every width: 320, 390 and 1280;
- every part: window/die, logo, flag, label, and the five label fields.

**The largest difference between the four chips is 0.00px for every part, at every width, in both takes** (the brief allows 1px). The chips themselves are the same size too.

At 390:

| Take | Part | x | y | w | h |
|---|---|---|---|---|---|
| S | founder window | 96.85 | 34.54 | 53.59 | 60.05 |
| S | logo (in the gold plate) | 26.81 | 33.14 | 43.23 | 29.29 |
| S | flag | 29.81 | 82.67 | 37.23 | 24.82 |
| S | label | 176.56 | 32.32 | 188.61 | 70.95 |
| S | name + version field | 176.59 | 32.32 | 132 | 24.12 |
| S | No. field | 308.59 | 32.32 | 56.57 | 24.12 |
| S | Last 5 field | 176.59 | 56.44 | 132 | 23.41 |
| S | W-L field | 308.59 | 56.44 | 56.57 | 23.41 |
| S | Season P&L field | 176.59 | 79.85 | 188.57 | 23.41 |
| S | chip | | | 390 | 140.75 |
| N2 | die | 93.34 | 33.25 | 70.65 | 70.33 |
| N2 | logo | 21.03 | 27.23 | 39.12 | 31.53 |
| N2 | flag | 23.75 | 84.83 | 33.69 | 22.46 |
| N2 | label | 195.2 | 30.25 | 172.21 | 77.59 |
| N2 | name + version / No. | 195.2 / 315.76 | 30.26 | 120.55 / 51.67 | 26.38 |
| N2 | Last 5 / W-L | 195.2 / 315.76 | 56.64 | 120.55 / 51.67 | 25.61 |
| N2 | Season P&L | 195.2 | 82.24 | 172.22 | 25.61 |
| N2 | chip | | | 390 | 141.92 |

The same at 320 and 1280 is in `boxes.md`.

**What the boxes do not cover:** the logo box is the same on every chip, but each mark's own ink fills it differently (Claude's starburst is wider than Kimi's K). The figures differ in width with their content (−$70,650 against +$148,480); each is right-aligned on its field's same edge.

## Files and how to run them
Serve `ez/` on port 8951 first (`python3 -m http.server 8951` from `ez/`).
- **Paint:**
  - `python3 mkjobs.py > jobs1.json`, then `python3 gen.py jobs1.json`. This needs `HEDRA_API_KEY`.
  - `jobs2.json` holds the two square-window retries (ms-c, ms-d).
  - `img/t-old.jpg` is copied from chips3.
- **Measure the masters:** `/usr/bin/python3 measure.py <name> <rows> <cols>` scans colour runs along rows and columns. The final boxes were read from those scans and a 20px grid overlay, then written into `quads.json` by hand.
- **Shoot:** `node run.js <out> now,S,N2 320,390,1280`.
  - It prints the sideways scroll, errors, fitted lines, the data and the boxes.
  - `S~grid` outlines the boxes. The outlines barely show through the ink layers, so they are not on the board; the numbers are the evidence.
- **Boxes table:** `python3 boxes.py <run.js log>` writes `boxes.md`.
- **Boards:** `/usr/bin/python3 board.py <out> 390 ez/x2p-h20-chips4-390.png` and the same with `1280`.
  - The "before" column needs chips3's S shots copied in as `ch-<w>-h19S.png` and `bt-<w>-h19S-0.png`.
- **Video:** `node rec.js ez/x2p-h20-chips4-loops.mp4 390` (23 s: S, then N2, with the four loops playing and then the fifth chip).
- **Switch:** `window.__CH` = `S` (default) or `N2`.

## Boards
- **`ez/x2p-h20-chips4-390.png`:**
  - top row: today's live standings, H19 S (before), S, N2;
  - under it, the four chips side by side at 2x for H19 S, S and N2, so you can see the parts line up across the chips (and not line up before).
- **`ez/x2p-h20-chips4-1280.png`:** the same sections at 1280, half scale.
- **`ez/x2p-h20-chips4-loops.mp4`:** the loops playing in S and N2.

## My pick: S
- It is the owner's pick, and it is now exactly regular. The face reads clearest behind the glass, and it stays a glimpse, not the subject.
- **N2** reads well on all four colours now: the die is the same dark silicon on every chip, so no colour drowns the founder, as in H19 N1. It is a strong second.

## Live data (none typed)
- Order, P&L and W-L come from `__x2pPnl().A`, and the last five from the last five graded ROUNDS (R76 to R80).
- Versions come from MODELS. The flags are US for Grok, Claude and GPT, and China for Kimi.
- The figures match H19's independent check:

| Model | P&L | W-L | Last 5 |
|---|---|---|---|
| Grok | +$148,480 | 45-27 | WWWLL |
| Claude | +$102,950 | 48-32 | WWWWL |
| GPT | −$56,930 | 43-37 | WLLWW |
| Kimi | −$70,650 | 37-43 | LLLWW |

## Checks
- **Widths:** 320, 390 and 1280, for S and N2.
  - Sideways scroll equals the viewport every time.
  - No page or console errors.
  - No surface outside its painting.
  - No fitted line outside its field, and no letters overlapping.
- **W-L fix:** in N2's narrower label, the "W-L" label first touched its figure ("W-L45-27"). The label moved up, the figure down, and the figure is fitted to its field.
- **Smallest text** (the "NO." and "W-L" labels): 10px at 390, 12 to 13px at 1280, and **7px at 320**.
- **Zoom:** checked at 2x, both takes.

## How each option could fail
- **Both:**
  - **The recolour is a flat multiply over grey ceramic.** It keeps the painted grain and shading, but the four chips now look like one product in four colours, not four different paintings. That is the point of symmetry, but some of H19's per-chip character (Claude's warmer enamel, Kimi's deeper cobalt) is gone.
  - Grok's graphite reads as a mid grey, lighter than H19's near-black.
  - **The labels at 320 are 7px.** The field grid costs some width; at 320 the small labels would need a bigger font or a shorter label row.
  - **The leader's rays** sit in the gaps between the legs and around the body. On the phone they read as a glow strip rather than a fan, because the chip's crop is tight.
  - **The live filters** (the ink filter and blend modes on every chip) were not checked in Safari. A build should bake them.
- **S:**
  - The window is 0.89 wide for its height, not a true square.
  - The face is about 54 × 60px on a 390 phone: you can see who it is only on a closer look.
- **N2:**
  - The screen blend washes out the founders' darks, and the die's iridescent sheen tints them slightly purple. GPT's founder looks greener because the loop itself is.
  - The bond wires and the substrate ring read as half a frame.
- **"In inference"** is AI jargon (as flagged in H19).
- **Recording:** `rec.js` starts the loops itself (the recorder's IntersectionObserver didn't). Phones were not tested.

## Cost (Hedra)
| Job | Model | Settings | Cost | Time | Result |
|---|---|---|---|---|---|
| ms-a, ms-b | gpt-image-2 | 1K medium 16:9; bet chip and H19 s-grok-dim as refs | $0.109 | 37 to 43 s | clean grey masters, but the window is a tall rectangle |
| ms-c, ms-d | gpt-image-2 | as above, "perfectly square" window | $0.109 | 37 s | **ms-c used**: near-square window; ms-d still tall |
| mn-a, mn-b | gpt-image-2 | 1K medium 16:9; bet chip and H19 d-grok-dim as refs | $0.110 | 37 to 43 s | **mn-a used**: square die with bond wires |
| rays | gpt-image-2 | 1K medium 16:9; bet chip as ref | $0.041 | 36 s | golden rays on black for the leader |

**Total: $0.37 of the $5 cap** (7 jobs; the log is in `log.jsonl`). Nothing was upscaled. Painting the picked master at 2K (about $0.43 for gpt-image-2 high) is the next step once the owner picks.
