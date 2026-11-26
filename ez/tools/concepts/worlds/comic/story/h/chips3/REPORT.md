# Round H19 · chips3: Meet the models B (all four EPROMs in one beat), next pass

The brief is `../BRIEF-H.md`, "Round H19", `chips3`, with the owner's screenshot `../h19/ref-chips-b-owner.jpg`. It builds on `../chips2/`.

Mockups only:
- nothing in `ez/tools/v22/`, `ez/v4*.html` or `ez/media/` changed;
- nothing was deployed or published.

## The files
- **Boards:**
  - `ez/x2p-h19-chips3-390.png`: today's live standings, then S, N1, N2 and the revised A (each the whole section). Under them:
    - the fifth chip in its three wordings;
    - a 2x close-up of Claude's EPROM in silkscreen and in laser;
    - a 2x close-up of the founder three ways (Kimi's chip).
  - `ez/x2p-h19-chips3-1280.png`: the same at 1280 (half scale), one version per row, then the wordings.
- **Video:** `ez/x2p-h19-chips3-loops.mp4` (34 s, 390px). For each of S, N1 and N2 it holds 8 s on the one beat with the four founder loops playing, then scrolls to the fifth chip.
- **Code:** `_c.js` and `_c.css` are laid over the built `v46-live-x2plus.html`. The section takes `#standings`' place, which is hidden; the rest of the page is untouched. Three switches pick the take:
  - `window.__CH`: `S`, `N1`, `N2` or `A`;
  - `window.__PR`: `silk` or `laser`;
  - `window.__TW`: `ininf`, `run` or `pend`.

## How to run it
Serve `ez/` on port 8951 first (`python3 -m http.server 8951` from `ez/`).
1. **Paint:** `python3 mkjobs.py > jobs1.json`, then `python3 gen.py jobs1.json` (Hedra; needs `HEDRA_API_KEY`).
   - A's new-school chips and the tryouts package are H18's paintings, copied into `img/`.
2. **Measure:** `/usr/bin/python3 measure.py` (needs scipy) writes `quads.json`.
   - Six paintings were measured by hand on 50px grids (listed in the script): `c-kimi-dim`, `d-grok-lit`, `d-kimi-dim`, `d-kimi-lit`, `s-gpt-dim` and `s-gpt-lit`.
3. **Shoot:** `node run.js <out> now,S,N1,N2,A,S~laser,S~silk~run,S~silk~pend 390,1280,320`. A take is `K[~print[~wording]]`.
4. **Boards:** `/usr/bin/python3 board.py <out> 390 <file>` and `... 1280 <file>`.
5. **Video:** `node rec.js <out.mp4> 390`.

## What I made
All 24 new paintings are gpt-image-2 (1K, medium, 16:9) with `media/bet-chip-h2.jpg` as the style reference. They are old-school EPROMs, lit and dim for each model, as in H18. Each body is deeper than H18's, with a full-height black epoxy label on the right half.

### 1. The founder's loop, two versions (three takes)
- **S, the square window:** a square quartz window in a thin gold frame, as tall as the label, where the round porthole was.
  - The loop plays behind the glass, and the painting's own reflection is screened back over it.
  - Each face is about 52px on a 390 phone, against about 45px for the old porthole.
- **N1, no frame, in the ceramic:** the EPROM is painted with no window, just bare ceramic between the plate and the label.
  - The loop is blended in by luminosity: the founder takes the ceramic's own colour (terracotta Claude, teal GPT, cobalt Kimi, graphite Grok).
  - Its edges dissolve into the enamel through a radial mask, so there is no box and no glass.
- **N2, no frame, in the silicon:** the EPROM is painted with its bare silicon die exposed (a decapped look, with gold bond wires at the edges).
  - The loop is screened into the dark polish, so it glows out of the silicon.
  - The die's sheen and rim lines are laid back over it.
  - The bond wires and the die's edge are part of the chip, not a frame, but N2 still reads more "framed" than N1.

### 2. Printed into the chip, not pasted on
This applies to the name, version, No., Last 5, W-L, Season P&L, the flag and the fifth chip's labels.
- **The ink:** everything goes through one SVG ink filter (`#chInk`):
  - fine voids where the screen missed;
  - a 0.35px spread and a slight bleed;
  - a ragged edge from a small displacement.
- **The surface over it:** the painting's own label region, brightened, is multiplied back over the print, so the epoxy's grain and the painted light run through the letters. In the 2x close-ups, the darker grain and the light falloff toward the label's edges show inside the figures.
- **Silkscreen or laser:** silkscreen is the default (cream ink, spot green and red). Laser (`#chEtch`) is frosted grey type with a faint burn halo and no ink colour beyond a tint. It is shown as a close-up beside silkscreen.
- **Bigger and simpler:** the label is three lines.
  1. NAME and version, with No. n on the right.
  2. LAST 5 and its five printed cells, with W-L on the right.
  3. SEASON P&L and the figure, the largest on the chip.
  - The small labels went from about 8px to 11px at 390 (16px at 1280, 10px at 320).
- **Every line is measured, then fitted:** each line is measured in the page after the fonts load and shrunk only if it would leave its field. "Fable 5.1" is now whole on every take and width; it was cut by the portrait in H18.
- **The flag** is printed through the same ink filter onto the ceramic, with the ceramic's grain laid back over it.

### 3. The fifth chip's wording
The words are centred on the strip in the gold ink, under the caption box "No. 5? · not signed yet" (kept).
- **"In inference"** (the owner's suggestion, and the default)
- **"Running inference…"**
- **"Inference pending"**

### 4. A, revised
H18's one-chip-per-model paintings, with the same printed-in name, version, flag and label, fitted and measured the same way. Nothing was repainted.

## Live data, none of it typed
- Order, P&L and W-L come from `__x2pPnl().A`; the last five from the last five graded ROUNDS (R76 to R80).
- I checked the figures outside the page as well: node over `ez-data.js`, $100,000 × direction × move on every call. Every figure matches:

  | Model | P&L | W-L | Last 5 |
  |---|---|---|---|
  | Grok | +$148,480 | 45-27 | WWWLL |
  | Claude | +$102,950 | 48-32 | WWWWL |
  | GPT | −$56,930 | 43-37 | WLLWW |
  | Kimi | −$70,650 | 37-43 | LLLWW |

- The lit painting goes to the P&L leader (today Grok).

## My pick: S for the founder, silkscreen for the print, "In inference" for the fifth chip
- **S** does what the owner circled: the porthole becomes a square, like A's die. The face is the clearest of the three, and it stays a glimpse behind glass (lesson 110). It also survives a change of leader, because the window is the same on the lit and dim paintings.
- **N1** is the boldest "part of the chip" reading, and the most magical when it lands (Claude, GPT). But it depends on the ceramic: Kimi's founder on deep cobalt is faint even after a brightness lift, and Grok on graphite reads as a grey ghost.
- **N2** is my second choice: the "seen in the silicon" idea is literal and it reads on every colour. The die's square edge makes it half a frame, though.
- **Silkscreen**, because the cream and spot colours keep the P&L readable at a glance. Laser is more authentic for a real chip, but it is lower in contrast at 390.
- **"In inference"**, because it is the shortest and the owner's own words. "Running inference…" says more about what is happening but runs longer. "Inference pending" reads like an error state.

## How each option could fail
- **All of B:**
  - At 320 the small labels are 10px (11px at 390). Legible, but small.
  - The fit check finds right-aligned figures overhanging their anchor by up to 0.6% of the field at 320 (glyph side-bearing). Each field sits 5% inside the painted panel, so nothing reaches a panel edge. My first overlap check compared line boxes, not letters, and gave false "hits"; the final check compares the letters' cap-height boxes.
  - The ink filter and the multiplied surface are live SVG and CSS on every chip. WebKit has no GPU path for SVG filters, so Safari, which was not checked, may render the grain differently or cost more while scrolling. A build should bake the print into images or one shared texture.
  - The multiply layer brightens a crop of the painting. On A's bare board it made a visible box, so it is off there; on the black labels it is invisible. A repaint with a different label could bring the box back.
  - The lit and dim paintings are different images, so the chips' details shift when the leader changes.
- **S:**
  - The square window is about 52px on a phone. You can see someone is there; you can see who only on a closer look.
- **N1:**
  - It is faint on dark or saturated ceramic (Kimi, Grok). The loops have dark grounds, and luminosity keeps the ceramic's hue, so a dark loop on a dark body almost disappears.
  - The `brightness(1.5)` lift helps Kimi but bleaches Claude's highlights a little.
  - If the founders' loops are ever re-rendered with brighter grounds, the soft edge could show as a rectangle again. That happened in my first pass, from a grain overlay I then removed.
- **N2:**
  - The decapped die varies a lot between paintings (bond wires, rim width), so the four chips look less like one product than S does.
  - The screen blend washes out the founders' darks.
- **Wordings:** "inference" is AI jargon. Crypto traders may know it, but a newcomer may not (the same risk H18 flagged for "Running inference…").
- **Recording:** in the recorder (Playwright with video capture), the page's IntersectionObserver did not start the loops, so `rec.js` kicks `play()` itself. In a normal headless run they started on their own. Phones were not tested.

## Checks run
- **Widths:** 320, 390 and 1280 for S, N1, N2, A, S~laser and both other wordings.
  - Sideways scroll equals the viewport width every time.
  - No page or console errors.
  - No surface outside its painting (`outSurf: 0`).
  - No letters overlapping.
  - Overhangs at most 0.6% inside the 5% inset.
- **Data:** recomputed outside the page from `ez-data.js`; it matches (table above).
- **Readability:** the smallest text is 11px at 390, 16px at 1280 and 10px at 320. In A at 320 the small labels are 8px (A's label is a wide, short strip).
- **Rule 0:** no white or pale grounds, no emoji, no dot-filled modules, nothing over a face or a mark, and containers hug the chips.
- **Zoom:** every take was zoomed at 2x. Fixes made on the way:
  - The first ink was too dirty (voids threshold), and the multiply layer too dark: both turned down.
  - The flags were muddy under hard-light: now printed normally with the ceramic's grain over them.
  - N1's founders vanished on dark ceramic under hard-light: switched to luminosity, with a brightness lift.
  - N1 showed a hard rectangle from the grain overlay: overlay removed.
  - "LAST 5" touched its first cell: cells moved right.
  - On N2's Claude chip, "SEASON P&L" ran into the figure: the P&L now leaves room for its label.
  - A showed a multiplied box behind the name: that layer is off for A.

## Cost (Hedra)
| Jobs | Model | Settings | Cost each | Time | Result |
|---|---|---|---|---|---|
| 8 × S EPROM (4 models × lit/dim) | gpt-image-2 | 1K medium 16:9, ref chip | $0.0423 | 36 to 84 s | square window in a gold frame, full-height label, on all eight; `s-gpt-lit` has little ceramic under the plate (small flag) |
| 8 × N1 EPROM | gpt-image-2 | as above | $0.0422 | 36 to 78 s | bare ceramic mid area on all eight; on `c-claude-lit` the plate is tall, so the flag sits small |
| 8 × N2 EPROM | gpt-image-2 | as above | $0.0425 | 52 to 65 s | exposed die with bond wires on all eight; the die's frame and wires vary a lot |

**Total: $1.02 of the $6 cap** (24 jobs; each charge equalled its estimate; the log is in `log.jsonl`). Nothing was upscaled. Painting the picked take at 2K is the next step once the owner picks.
