# Round H21 · chips5: S swapped, N2 clean, the flag built into the chip

The brief is `../BRIEF-H.md`, "Round H21", `chips5`. It builds on `../chips4/` (one master painting per take, re-coloured per model, every part on one grid). The owner's sketch is `../h21/ref-chips-swap-owner.jpg`.

Mockups only:
- nothing in `ez/tools/v22/`, `ez/v4*.html` or `ez/media/` changed;
- nothing was deployed or published.

## What I made
### SW: S, swapped (the owner's sketch)
- **One new master, `img/sw-c2.jpg`.** I repainted H20's `ms-c` with gpt-image-2, using it as the reference, with the parts rearranged: the gold plate top left, the black label panel beside it, and a big square quartz window at the right end.
  - I made three takes (`sw-a`, `sw-b`, `sw-c`) and picked `sw-c`: its glass is the squarest and its frame the thinnest.
  - In `sw-c`, the label and the window frame already shared one top and one bottom (y 188 and 491 on the 1280×720 master). The plate sat 9px lower. `shift.py` moves the plate block up those 9px; the seams fall in plain ceramic and are feathered over 10px, and they don't show at 4x. The result is `sw-c2`.
- **The window is the gold frame**, outer edge to outer edge:
  - its top is level with the plate's top;
  - its bottom is level with the flag's bottom.
  
  The flag is placed in code: the plate's width, 3:2, its bottom on the frame's bottom.
- **The founder's picture fills the frame's inner gold edge**, covering the painted dark bevel, so the face is as big as the frame allows. At 390 it is 90×89px; H20's S was 54×60.
  - **The other reading:** the brief may mean the *picture's* top (not the frame's) level with the plate's top. That doesn't work on this master: the frame's gold sits 4 to 13px outside the picture, so the frame would push into the body's top rim. The picture's edges are in the table below if the owner meant that reading.
- **The label is narrower** (175px at 390, was 189) but on the same five-field grid. "CLAUDE FABLE 5.1" is fitted at 0.94.

### N2, as it was, but clean
- No radial mask, no dark falloff, no screen blend, no sepia or contrast filter, and no painted die laid over the picture.
- The founder's loop fills the die square edge to edge (`.ch-clean`).
- The founders' own loops have no vignette baked in (checked on the four posters), so the square reads clean to its edges.
- The H20 master and layout are unchanged.

### The flag, three processes (`window.__FP`, on both SW and N2), drawn in code from the flag's real geometry
- **etch (default):** the flag etched into the chip's metal layer, flush in the lid:
  - red fields are bare red copper, white fields tinned, blue fields heat-blued steel, yellow fields gold plate;
  - every raised edge catches the gold key light from the top left (a pale lip and a dark wall);
  - there is a fine etch hatching on the blue, a warm key-light bloom, and an etched trench round the edge.
- **print:** pad-printed on the ceramic lid in flat opaque inks, through the same silkscreen filter as the label. The blue screen is a hair off register, and the lid's own grain from the painting is laid back over it (soft-light at .5).
- **enamel:** cloisonné, flush with the lid: glassy enamel fields parted by gold wire, a gold rim, a faint inner shade at the top edge and a soft diagonal gloss.

The fifth chip still reads "In inference", unchanged.

## Measurements (CSS px, relative to each chip's own painting box)
`node run.js` prints `__ch.boxes()` per chip. `python3 boxes.py <log>` writes `boxes.md`: every part at 320, 390 and 1280, in all six takes, with the largest difference across the four chips.

**Across the four chips, every part differs by 0.00px**, at every width and in every take (207 rows).

### SW alignment, checked on every chip
- **Window frame top vs plate top:** +0.00px at 320, 390 and 1280.
- **Window frame bottom vs flag bottom:** +0.00px at 320, and +0.01px at 390 and 1280 (rounding in the homography).
- **Pixel check:** I confirmed it on the rendered pixels at 2x. The plate's, the label's and the frame's top ink lines sit on one row, and the flag's bottom sits on the frame's bottom.

At 390 (SW, any flag process):

| Part | x | y | w | h |
|---|---|---|---|---|
| window (gold frame, outer) | 275.71 | 22.60 | 98.79 | 97.82 |
| founder picture (inside the frame) | 279.91 | 26.80 | 89.75 | 89.11 |
| logo plate (outer) | 16.47 | 22.60 | 65.22 | 45.20 |
| logo (in the plate) | 26.53 | 29.86 | 45.09 | 30.68 |
| flag | 16.47 | 76.94 | 65.22 | 43.47 |
| label | 89.43 | 26.15 | 174.98 | 90.72 |
| name + version / No. | 89.43 / 211.92 | 26.15 | 122.49 / 52.50 | 30.84 |
| Last 5 / W-L | 89.43 / 211.92 | 57.00 | 122.49 / 52.50 | 29.94 |
| Season P&L | 89.43 | 86.93 | 174.98 | 29.94 |
| chip | | | 390 | 140.75 |

N2 at 390:

| Part | x | y | w | h |
|---|---|---|---|---|
| die | 93.34 | 33.25 | 70.65 | 70.33 |
| logo | 21.03 | 27.23 | 39.12 | 31.53 |
| flag | 23.75 | 84.83 | 33.69 | 22.46 |
| label | 195.20 | 30.25 | 172.21 | 77.59 |

The same at 320 and 1280 is in `boxes.md`. N2 has no separate plate box, so its "plate" row repeats the logo's.

## Checks
- **Widths:** 320, 390 and 1280, for all six takes (`now`, SW×3, N2×3).
  - Sideways scroll equals the viewport every time.
  - No page or console errors.
  - No surface outside its painting.
  - No fitted line outside its field, and no letters touching.
- **Smallest text** (the "NO." and "W-L" labels):

  | Width | SW | N2 |
  |---|---|---|
  | 390 | 11px | 10px |
  | 1280 | 16px | 13px |
  | 320 | 8px | 7px |

- **Zoom:** checked at 2x on the chips, and at 3x on the flags (US and China, all three processes).
- **Data:** live from `__x2pPnl().A`, ROUNDS (the last five, R76 to R80) and MODELS:

  | Model | P&L | W-L | Last 5 |
  |---|---|---|---|
  | Grok | +$148,480 | 45-27 | WWWLL |
  | Claude | +$102,950 | 48-32 | WWWWL |
  | GPT | −$56,930 | 43-37 | WLLWW |
  | Kimi | −$70,650 | 37-43 | LLLWW |

## Files and how to run them
Serve `ez/` on port 8951 first.
- **Paint:**
  - `python3 mkjobs.py > jobs1.json`, then `python3 gen.py jobs1.json` (needs `HEDRA_API_KEY`).
  - `/usr/bin/python3 shift.py` makes `sw-c2` from `sw-c`.
  - `auto.py` was a rough first measure. The final boxes were read from pixel scans and written into `quads.json` (`sw-c2`).
- **Shoot:** `node run.js <out> now,SW~etch,SW~print,SW~enamel,N2~etch,N2~print,N2~enamel 320,390,1280`.
- **Boxes:** `python3 boxes.py <log>` writes `boxes.md`.
- **Boards:** `/usr/bin/python3 board.py <out> 390 ez/x2p-h21-chips5-390.png`, and the same with `1280`.
  - The "before" columns need chips4's S and N2 shots, copied in as `ch-<w>-h20-S.png`, `bt-<w>-h20-S-0.png` and the same for N2. Make them with `node ../chips4/run.js <dir> S,N2 390,1280`.
- **Video:** `node rec.js ez/x2p-h21-chips5-loops.mp4 390` (SW, then N2, with the etched flag).
- **Switches:** `window.__CH` = `SW` | `N2` (`S` still gives H20's S), and `window.__FP` = `etch` | `print` | `enamel`.

## Boards
- **`ez/x2p-h21-chips5-390.png`:**
  - top: today's live standings, H20 S (before), SW with each flag process, H20 N2 (before), and N2 clean with each flag process;
  - close-ups:
    - the four SW chips side by side at 2x;
    - N2's die before and after;
    - the three flag processes at 3x, US and China.
- **`ez/x2p-h21-chips5-1280.png`:** the same sections at 1280, half scale.
- **`ez/x2p-h21-chips5-loops.mp4`:** the four loops playing in SW and in N2.

## My pick: SW with the etched flag
- The swap gives the founder about 2.5 times the area, and the plate, label and window now share one top line, so the chip reads as one designed object.
- The etched flag is the one that reads "made by the chip": copper, tin and blued steel are the materials of a chip's metal layers, and the lit edges sit in the same gold key light as the plate.
- **Enamel is the close second:** the richest colour, and the most legible on the coloured lids. Its gloss band makes it read a touch like a pin badge.
- **N2 clean** now does what the owner asked; its flag is still small (34×22 at 390).

## How each option could fail
- **SW:**
  - **The face is bigger, so it competes with the numbers.** The brief says the founders are the living layer, never the focal point. At 90px square on a phone, a bright portrait (Claude's cream ground, GPT's mint) pulls the eye before the P&L does.
  - **The label lost 14px of width.** "CLAUDE FABLE 5.1" is already squeezed to 0.94; a longer version name would squeeze further.
  - The 320 labels are 8px.
  - The founder's picture covers the painted glass bevel. The painting's bevel highlight is screened back over it, but the glass reads less deep than in H20's S.
  - **The plate shift is a pixel edit of a generated painting.** It is invisible at 4x, but a 2K repaint would need the same shift redone, or a prompt that lands it.
- **N2:**
  - **With no frame and no mask, a bright loop is a hard square in the die.** Claude's cream ground and GPT's mint stand out against the dark silicon and read more "photo on a chip" than "seen in the silicon"; N2's whole idea was the latter.
  - The bond wires around the die are the only border.
- **etch:**
  - **Metal colours are not flag colours.** Red copper reads as red on Kimi's China flag and on the US stripes only at zoom; at 34px (N2) the stripes read as orange and cream.
  - Heat-blued steel for the canton is a stretch of the metaphor.
- **print:**
  - **The most flush, and the least special.** It can look like a sticker after all. The soft-light grain makes the reds slightly pink.
- **enamel:**
  - The diagonal gloss and gold rim read as jewellery or a pin badge rather than part of the chip.
  - The gold wire between the US stripes thickens the pattern at small sizes.
- **All:**
  - **The flags are SVG drawn per chip** (gradients, the ink filter on print), and Safari was not checked.
  - The founder loops play from `media/`; phones were not tested.
  - "In inference" stays as flagged in H19 and H20 (AI jargon).

## Cost (Hedra)
| Job | Model | Settings | Cost | Time | Result |
|---|---|---|---|---|---|
| sw-a | gpt-image-2 | 1K medium 16:9, ref ms-c | $0.042 | 36 s | good swap; glass top 14px below the plate's |
| sw-b | gpt-image-2 | same | $0.042 | 30 s | thicker frame, glass not square |
| sw-c | gpt-image-2 | same | $0.042 | 36 s | **used**: label and frame share top and bottom; plate shifted 9px in `shift.py` |

**Total: $0.13 of the $4 cap.** The log is in `log.jsonl`. Nothing was painted at 2K. `ms-c`, `mn-a`, `rays` and `t-old` are copied from chips4.
