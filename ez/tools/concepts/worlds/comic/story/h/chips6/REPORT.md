# Round H22 · chips6: Meet the models, final asset (N2 clean, with the swap)

The owner's pick (2026-11-01, ~21:30 UTC) is **N2 clean, with the swap**. This folder holds the files the lead drops into the live page.

Mockup only:
- nothing in `ez/tools/v22/`, `ez/v4*.html` or `ez/media/` changed;
- nothing was deployed or published.

## What it is
**One new master painting**, `img/m6-master.jpg` (1228×458), is re-coloured per model in code, so every part sits in the same place on every chip. Left to right:
- **The gold logo plate,** top left, with the lab's mark struck into it.
- **The small flag** under the plate, at N2's size (33×22 at 390). It uses chips5's etched process (copper, tin, blued steel and gold in the metal layer, lit from the top left).
- **The label** beside the plate: name + version, No., Last 5, W-L, Season P&L. It is silkscreened into the epoxy, on chips5's grid.
- **The exposed silicon die** at the right end, in a gold-plated cavity:
  - The die's silicon edge runs from the plate's top to the flag's bottom.
  - The founder's loop fills the die's **core** (inside the pad ring) edge to edge: no rounded mask, no vignette, no blend, no tint.
  - Around the loop you still see the real die: the pad ring, I/O cells, seal ring and gold bond wires.

**Real-chip detail (painted, in the master):**
- a real two-part CERDIP package: a speckled sintered ceramic lid, a chamfered edge, and the dark glass-frit seal seam along the bottom edge;
- a semicircular **pin-1 notch** in the left end and a **pin-1 dimple** top left;
- gold DIP pins with shoulders;
- a die modelled on real EPROM and microcontroller die shots:
  - square aluminium bond pads round the edge, I/O cells and a seal ring;
  - memory arrays as fine grids, standard-cell rows and metal routing buses;
  - the violet, green and gold thin-film colours of real silicon;
  - gold bond wires to the cavity's bonding fingers.

  No web photos could be fetched (Wikimedia answered 429), so the die is described from known die-shot structure in the prompt, not traced from a specific chip.

**Small print, laser-marked into the ceramic** between the plate and the flag (code, not baked into the art):
- the chip's maker: XAI, ANTHROPIC, OPENAI or MOONSHOT AI;
- `2644 · LOT R80`: the date code (YYWW, ISO week) of the last graded round's close, and the lot (rounds graded).

Both lines are live. They are deliberately tiny, as on real chips: about 3 to 4px at 390 and 5px at 1280. They read as texture on a phone.

**Re-colour:**
- The model's colour (Grok #5b5e66, Claude #dd6a3a, GPT #1f9a70, Kimi #3a63d6) is multiplied into the lid, so its grain, seam and dimple run through the colour.
- The plate, label and cavity are the painting's own pixels, laid back over the tint.
- No masks are needed: every region is a rectangle (`clip-path: inset`), and the void around the body is black, so a multiply leaves it black.

**Kept from chips5:**
- the fifth chip, "In inference" (Mistral, Qwen, Gemini, Nemotron, with their flags; the scan and breath animation, still with reduced motion);
- the leader's painted rays behind its chip;
- the gold No. 1;
- the head, the sub line and the beat ink.

All numbers are live from `__x2pPnl().A`, ROUNDS and MODELS.

## Files for the lead
| File | Use | Size |
|---|---|---|
| `_c6.js` | builds the section from the page's data (self-contained; the tryout marks are embedded) | 24 KB |
| `_c6.css` | its styles (head, beats, chip) | 6.5 KB |
| `img/chip6-800.webp` / `.jpg` | the master, phone | 49 / 62 KB |
| `img/chip6-1228.webp` / `.jpg` | the master, desktop and 3x phones | 122 / 155 KB |
| `img/try6-780.webp` / `.jpg`, `img/try6-1164.webp` / `.jpg` | the fifth chip | 50 / 68, 99 / 143 KB |
| `img/rays6.webp` | the leader's rays | 175 KB |

`<img srcset>` picks the size: the webps in srcset, the jpg as `src`, with `sizes` set to 580px from 1000px and 100vw below.

**Masks:** none (see Re-colour above).

### How to mount it
**Needs** on the page: `window.__x2pPnl()`, `ROUNDS` and `MODELS` (the built X2+ page has all three). The founder loops come from `media/founder-<m>-anim.mp4` / `.webm` / `.jpg`, as on X3+.

**Optional settings:**
- `window.__C6IMG`: the image folder. The default is this folder, `tools/concepts/worlds/comic/story/h/chips6/img/`, relative to `ez/`. Set it to wherever the images are copied, e.g. `media/` with flat names, which make_site.py needs. Note that make_site.py copies only media whose names appear written out in the page: `chip6-800.webp`, `chip6-1228.webp`, `chip6-800.jpg`, `try6-*` and `rays6.webp` are built from a prefix in `img()`, so list them, or write the names out, before shipping.
- `window.__C6MEDIA`: default `media/`.
- `window.__C6FP`: `etch` (default), `print` or `enamel`.
- `window.__C6GRID`: outlines every shared box.

### DOM it expects and replaces
- It looks up **`#standings`**:
  - **found:** it inserts `<section class="ch c6 c6-fp-etch" aria-label="Meet the models">` right **before** it and sets `#standings` to `display:none` (nothing is removed, so X2's routing and the analytics' `standings` section event still find the element);
  - **missing:** it appends the section to `<main>`.
- **Inside the section:**
  - an `h2.ch-h` and a `p.ch-sub`;
  - `ol.ch-beats` (aria-hidden), holding the four `.c6-one[data-m]` chips (each a `.c6-pic`) and the fifth chip;
  - `ol.ch-sr`, a visually hidden list that carries every number for screen readers.
- **Globals and classes:**
  - `window.__c6 = {boxes(), fit(), rebuild(), data}`;
  - `html.c6-ready` once it is built.
- **Video:**
  - the loops play muted only while they are within 80px of the screen (IntersectionObserver);
  - nothing plays with reduced motion.
- **Class names:** `.ch-*` shares names with chips5's mockups (head, beats, caps). The chip's own parts are `.c6-*`. No clash with the site's classes: none of these names appear in the built X2+ page (grep).

## Measurements (CSS px, relative to each chip's painting)
Full tables are in `boxes.md` (from `run.js`).

- **Across the four chips, every part differs by 0.00px** at 320, 390 and 1280 (plate, logo, flag, label and its five fields, die, loop, small print).
- **Die top − plate top:** +0.00px at every width.
- **Die bottom − flag bottom:** +0.00px at 390 and 1280, −0.01px at 320.
- **On the painting's own pixels:** the plate's ink edge is at y 197 and the die's silicon edge at 197.5 (master px), so the two tops differ by 0.16px at 390. To land the die there, the cavity block was moved up 7px in `shift.py`. The seams fall in the gold cavity rim and the ceramic and are feathered over 6px; they don't show at 4x.

At 390 (the chip is 390×145.45):

| Part | x | y | w | h |
|---|---|---|---|---|
| logo plate (outer) | 21.59 | 25.08 | 53.34 | 47.00 |
| logo (gold face) | 23.17 | 26.67 | 50.17 | 43.81 |
| small print | 21.59 | 74.94 | 53.34 | 8.25 |
| flag | 31.59 | 84.95 | 33.34 | 22.22 |
| label (printed face) | 84.47 | 28.25 | 175.63 | 85.42 |
| die (silicon edge) | 284.88 | 25.08 | 80.34 | 82.09 |
| founder loop (die core) | 290.91 | 30.80 | 68.59 | 70.17 |

At 1280 the chip is 543×203: the loop is 96×98 and the die 112×114. At 320 the loop is 56×58.

**Compared with chips5:**
- N2's die was 70.65×70.33 at 390; the loop here is 68.6×70.2, so it is the same size.
- SW's picture was 90×89, so this is smaller: the founder stays the living layer, not the focal point.

## Checks
| Width | Sideways scroll | Errors | Surfaces outside the painting | Lines outside their field, or touching | Smallest label text |
|---|---|---|---|---|---|
| 320 | none | 0 | 0 | 0 | 8px |
| 390 | none | 0 | 0 | 0 | 11px |
| 1280 | none | 0 | 0 | 0 | 14px |

- **Fitting:** every name, W-L and P&L fits at scale 1. "NEMOTRON" on the fifth chip is fitted at 0.86.
- **Data:** recomputed independently from `ez-data.js`. Flat $1,000 per % move on every call; W = a call in the move's direction; 80 graded rounds; last five R76 to R80. It matches the chips exactly:

  | Model | P&L | W-L | Last 5 |
  |---|---|---|---|
  | Grok | +$148,480 | 45-27 | WWWLL |
  | Claude | +$102,950 | 48-32 | WWWWL |
  | GPT | −$56,930 | 43-37 | WLLWW |
  | Kimi | −$70,650 | 37-43 | LLLWW |

  The date code for R80 (graded 10/30/26) is 2644.
- **Zoom:** checked one chip at 2x per width, the master's die and left end at 2x to 4x, and frames of the loops video.

## Boards
- **`ez/x2p-h22-chips6-390.png`:** today's live standings, chips6, chips6 with every shared box outlined; then close-ups: one chip at 2x, the master's die, and the master's left end (notch, dimple, seam, pins).
- **`ez/x2p-h22-chips6-1280.png`:** the same at 1280, half scale.
- **`ez/x2p-h22-chips6-loops.mp4`:** the four loops playing in the dies at 390, then the fifth chip (0.5 MB).

## How it could fail
- **The die texture shows only as a ring.** On a phone the pad ring and bond wires are about 5px wide around the loop, so "real silicon" reads mostly as a gold frame with fine teeth. The full die shot shows only on the master and on desktop. To show more silicon, the loop would have to shrink, and the owner wanted it edge to edge.
- **The cavity's gold rim can read as a picture frame**, close to SW's window. It is the real package's bonding shelf, but at arm's length the distinction is subtle.
- **The small print is texture on phones** (3 to 4px). If the owner asks what it says, it is the maker and the date and lot code. The lab names are a new fact on the page (the chip's maker); cut them if they read as clutter.
- **The leader's rays barely show:** the master is cropped tight round the pins, so only thin slivers of the margin carry them. The gold No. 1 is the leader's mark that reads.
- **Bright loops are hard squares.** Claude's cream and GPT's mint stand out against the dark silicon (as flagged in H21). The die's pad ring now frames them, which helps.
- **The etched flag at 33px** reads as a small flag, but its metals (copper red, blued steel) shift the colours a little.
- **The geometry fix is a pixel edit** of a generated painting (`shift.py`). A repaint would need it redone.
- **Not checked:** Safari (`mix-blend-mode` on the SVG surfaces, `clip-path: inset`); real phones.
- "In inference" stays as flagged in H19 to H21 (AI jargon).

## How to make it again
Serve `ez/` on port 8951 first.
1. **Layout reference:** `img/ref-layout.jpg`, made by hand in PIL from chips5's `mn-a.jpg` (the plate, label and die cavity rearranged).
2. **Paint:** `python3 mkjobs.py > jobs1.json`, then `python3 gen.py jobs1.json` (needs `HEDRA_API_KEY`). This makes `m6-a`, `m6-b` and `m6-c`; I picked `m6-c`, which has the biggest die and the clearest pin-1 notch and seam.
3. **Align and export:** `/usr/bin/python3 shift.py`, then `/usr/bin/python3 export.py`. `grid.py` crops with a labelled pixel grid, for reading the master's coordinates; they are written into `G` at the top of `_c6.js`.
4. **Shoot:** `node run.js <out> now,N6,N6~grid 320,390,1280` (this also prints the checks and boxes).
5. **Boards:** `/usr/bin/python3 board.py <out> 390 ez/x2p-h22-chips6-390.png`, and the same with `1280`.
6. **Video:** `node rec.js ez/x2p-h22-chips6-loops.mp4 390`.

## Cost (Hedra)
Three takes (`m6-a`, `m6-b`, `m6-c`) with gpt-image-2 at 1K medium 16:9, using `ref-layout.jpg` as the reference: $0.0428 each, 36 to 43 s.

**Total: $0.13 of the $5 cap.** The log is in `log.jsonl`.
