# Round H23 · chips7: Meet the models, painted in

The owner circled GPT's logo, flag and label as "pasted on" (`h23/ref-chips-phone.jpg`). The brief made "integrated" computable as tests 1 to 5. This folder holds a drop-in replacement for `tools/v22/story/x2p_chips.js/.css` (chips6), and the paintings it needs.

Mockup only:
- nothing in `ez/tools/v22/`, `ez/v4*.html` or `ez/media/` changed;
- nothing was deployed or published.

## The pick, in one paragraph
**One master, then one pass per model on the same pixels.**
- The master is `img/m7-master.jpg`, 3760×1520: gpt-image-2 at 4K, take c of three. It is a ceramic multi-chip module whose substrate is dense with thick-film traces, vias and SMD parts. On it sit:
  - a gold logo plate;
  - a recessed flag field;
  - a black epoxy label with dark-glass display windows;
  - the exposed silicon die on the right.
- The static labels NO., LAST 5, W-L and SEASON P&L are painted by the model into the master, so they are the same on every chip.
- Each model then gets its own marks, painted into the same places:
  - gpt-image-2 etched and enamelled the **flag** into the field and laser-marked the **name and version** in the name window;
  - nano-banana-pro **engraved the lab's mark** into the gold plate. I gave it the plate with the mark's true silhouette darkened in, and it keeps the framing to the pixel. gpt-image-2 had drawn Claude's mark as a regular 16-ray sunburst and Kimi's as a generic K.
- `compose.py` fits each pass onto the master (scale and shift from the gold bezels' edges; residual at most 3 master px, under 0.3 CSS px at 390). It lays back only the plate, the flag field and the name window's glass, then tints the ceramic with the model's colour, so it reads as coloured solder mask and the gold traces stay gold.
- **The live figures** (No., W-L, Season P&L and the five Last 5 cells) are lit inside their painted windows with the NVIDIA timer's recipe:
  - a white-to-colour gradient in the digits;
  - a bloom;
  - a raking glare and scanlines screened over them;
  - the painting's own glass for that window, screened back on top.
- The founder's loop plays in the die's core, on the right.
- The fifth chip is a blank master in the same finish. nano-banana-pro painted IN INFERENCE, the four lab marks, their names and their flags into it from a typeset guide.

## Files for the lead
| File | Use | Size |
|---|---|---|
| `_c7.js` | builds the section from the page's data (self-contained) | 13 KB |
| `_c7.css` | its styles (chips6's head, sub line, beat ink and caption tabs, plus `.c7-*`) | 8 KB |
| `out/chip7-<m>-1200.jpg` / `.webp` (m = grok, claude, gpt, kimi) | a chip on phones (1170 real px needed at 390, 3x) | 179–187 / 114–120 KB |
| `out/chip7-<m>-1800.jpg` / `.webp` | desktop and 3x desktop (1630 needed at 1280, 3x) | 279–292 / 228–242 KB |
| `out/try7-1200.*`, `out/try7-1800.*` | the fifth chip | 171 / 102, 281 / 180 KB |
| `media/rays6.webp` (already live) | the leader's rays, reused | |

Every file is at most 300 KB. The names are flat and written out in full in `_c7.js`'s header comment, so make_site.py copies them once they sit in `media/` with `window.__C7IMG='media/'`.

**Mounting:** as chips6. It needs `__x2pPnl`, `ROUNDS` and `MODELS`.
- It inserts `<section class="ch c7">` before `#standings` and hides `#standings`.
- Take chips6's script out, or remove `section.c6` first (run.js does that), or both sections show.
- `window.__c7 = {boxes, fit, rebuild, G, data}`; `html.c7-ready` once built.
- Options:
  - `__C7IMG`: the image folder (default `out/` here);
  - `__C7MEDIA`: default `media/`;
  - `__C7GRID`: outlines the live boxes.
- No class name clashes with the built page: `.c7-*` appears nowhere in v46. `.ch-*` is chips6's own.

**Motion:**
- The loops play only near the screen, as in chips6.
- New, and alive in the timer's way (lesson 120):
  - every display re-scans now and then: a dim band runs down it and its figures dip for a beat, every 7 s, staggered, only while the chip is on screen;
  - the lit Last 5 cells glow onto their bezels;
  - the fifth chip's dies keep chips6's slow scan.
- Nothing moves with reduced motion.

## H23's tests, measured on the built page (`v46-live-x2plus.html` with chips6 removed and chips7 laid over it; run.js)

| Width | Sideways scroll | Errors | Chip CSS width | Needed (×3) | File the browser picks | Smallest live cap height | Smallest ✓/✗ mark | Same box on all 4 chips |
|---|---|---|---|---|---|---|---|---|
| 320 | none | 0 | 320 | 960 | 1200 | 10.3 px | 8.2 px | 0.00 px |
| 390 | none | 0 | 390 | 1170 | 1200 | 12.6 px | 9.9 px | 0.00 px |
| 1280 | none | 0 | 543 | 1630 | 1200 at 2x, 1800 at 3x | 17.6 px | 13.8 px | 0.00 px |

1. **Resolution: pass.**
   - The master is 3760 px wide (≥ 2400). The phone file is 1200 px for 1170 needed. The desktop file is 1800 for 1630 needed at 3x.
   - The fifth chip's source is 6336 px, kept at 3760.
   - Nothing is upscaled. The model passes were downscaled into the master: 3840 → 2100-px crop.
2. **Reading size: pass at 390** (and at 1280).
   - Cap heights are measured from Anton's own cap height (0.86 em, on a canvas) times the rendered size: No. 12.6, W-L 13.0, P&L 27.5 CSS px at 390. They were about 5 for the CALL figures that prompted the test, and 9 to 11 on chips6.
   - **One failure at 320:** the Last 5 marks are 8.2 px tall (9.9 at 390). They fill the cell to its gold bezel already. Making them pass at 320 would mean bigger cells, which means a repaint.
   - Painted words are not live, but for the record: the name is about 9.7 px cap at 390 (6.5 at 320). The labels LAST 5, W-L and NO. are about 6 to 7 px at 390.
3. **Integration of live text: pass by construction; judge on the close-up board.**
   - Every live figure sits on a surface the painting made for it: a dark-glass window with a gold bezel.
   - It is emissive, with the timer's gradient, bloom, glare and scanlines. The painting's own glass for that window (its glare and reflections) is screened back over it. run.js checks that all 32 live boxes per width carry both layers (`treat 32/32`).
   - The close-up board puts the NVIDIA timer beside chips7's W-L and P&L at the same height.
   - No flat vector text lies on the painting. Exception: the ✓/✗ marks are clean strokes, lit, inside the LED glow.
4. **Static words and marks are painted: pass.** All are painted by the image models into the object, and every word was checked letter by letter at 4x (`img/chip7-*-full.jpg`, the close-up):

   | Chip | Painted words |
   |---|---|
   | Grok | GROK 4.7 |
   | Claude | CLAUDE FABLE 5.1 |
   | GPT | GPT 6 ASTRA |
   | Kimi | KIMI K3 |
   | all four (master) | NO., LAST 5, W-L, SEASON / P&L |
   | fifth chip | IN INFERENCE, MISTRAL, QWEN, GEMINI, NEMOTRON |

   - Logos: Grok, GPT and Kimi match their silhouettes. Claude's comes close but not exact: nano-banana-pro gave about 12 rays with rounded ends, where the mark has irregular rays with cut ends. The first gpt-image-2 try was worse and was rejected; so were the gpt-image-2 plate redos `pl7-*-a/b`.
   - Flags: US for Grok, Claude and GPT; China for Kimi. On the fifth chip: EU for Mistral, China for Qwen, US for Gemini and Nemotron.
   - The US flags' star fields are painted loosely, not 50 stars in rows. At 30 to 45 CSS px they read as the US flag.
5. **Chip detail: pass.**
   - `flat.py` blurs out grain (3 px at 1200 wide), then counts 12-px cells whose spread is under 4 as flat, and finds the largest touching flat region:

     | Painting | Largest flat region |
     |---|---|
     | chips7 chips | 2.2 to 2.8 % of the object |
     | fifth chip | 2.3 % |
     | today's chips6 master | 26.9 % (its ceramic lid) |
     | today's chips6 tryout chip | 12.6 % |
     | the hero chip (the bar) | 5.8 % |

   - The substrate carries traces in parallel groups, vias, SMD capacitors and resistors, test pads, fiducials, a seal seam, gold pins, and a die with pad ring, I/O cells, memory arrays and bond wires (close-up board).
   - No web photos of chips were fetched: the die and the substrate are described from real package structure in the prompt.

Tests 6 and 7 are quad4's, but for the record: the chip fills its frame edge to edge (pins included), and the motion is described above.

Live data: P&L, W-L and last five are recomputed by the page's own `__x2pPnl` and ROUNDS. Today (80 graded, last five R76 to R80):

| Model | P&L | W-L | Last 5 |
|---|---|---|---|
| Grok | +$148,480 | 45-27 | WWWLL |
| Claude | +$102,950 | 48-32 | WWWWL |
| GPT | −$56,930 | 43-37 | WLLWW |
| Kimi | −$70,650 | 37-43 | LLLWW |

These are the same as chips6's report.

## Boards
- **`ez/x2p-h23-chips7-390.png`:** today's live section (chips6), chips7, then chips7 with every live box outlined; then close-ups at 2x of No. 1, No. 4 and the fifth chip.
- **`ez/x2p-h23-chips7-1280.png`:** the same at 1280, half scale.
- **`ez/x2p-h23-chips7-closeup.png`:** one chip at 3x (1170 real px). Today's GPT chip against chips7's GPT chip, then the NVIDIA timer beside chips7's W-L and P&L windows at the same height.
- **`ez/x2p-h23-chips7-loops.mp4`:** the four loops in the dies and the displays re-scanning at 390, then the fifth chip.

## How it could fail
- **"Painted" still shows a seam to a trained eye.**
  - The plate, flag and name come from separate passes laid on the master.
  - The ceramic is tinted in code, so the coloured solder mask is the master's grain multiplied by one colour, not a repaint. Its tint has small speckles where the grain was dark.
  - At 4x the edges of the three laid-back parts are feathered over 4 to 7 master px. They don't show at 3x.
- **The name window is half empty.** The painted name fills about 45% of its strip, so the right half is dark glass: dead space by rule 5. A repaint could set the name larger, or the strip could be shortened.
- **Claude's engraved mark is close, not exact** (rays more regular than the real mark). If the owner reads it as "not Claude's logo", the next try is a hand-cut engraving: the true silhouette lit in code with the plate's grain, which is exact but less painted.
- **Last 5 at 320px:** the marks are 8.2 px. They pass at 390.
- **LEDs can read as app buttons** at arm's length, though less so after the darker edges. They are the one live element that is a coloured fill, not light on dark glass.
- **The re-scan is a new motion.** It carries "these figures are live", but the owner may find a flicker on four chips busy. It is 7 s apart and staggered, and `.c7-scan` can be switched off.
- **The fifth chip's lab marks are faint** (frosted under smoked glass, as chips6 had them). The names say who they are.
- **Not checked:**
  - Safari: `mix-blend-mode: screen` on clipped images, SVG gradient fills with CSS `filter` drop-shadows;
  - real phones;
  - a 4x slower CPU. The chip now stacks 1 base image, 9 glass layers and 9 live boxes per chip against chips6's 4 images and SVG surfaces. The glass layers are the same file, clipped.
- **The 2048-px copies of the model passes** in `img/` are kept for the record. `compose.py` was run on the 3840-px originals, so a re-run from the committed copies gives slightly softer parts. The committed `chip7-*-full.jpg` files are the real ones.

## How to make it again
Serve `ez/` on port 8951 first.
1. `python3 mkjobs.py master > jobs-master.json && python3 gen.py jobs-master.json` (the reference is `ref/layout.jpg` from `reflayout.py`, plus the hero chip). Picked `m7-c`, cropped to `img/m7-master.jpg` (3760×1520 at +40+280).
2. `/usr/bin/python3 boxes.py` measures the windows into `geom.json`; `grid.py` reads other coordinates; they are written into `G` in `_c7.js`.
3. Per-model passes: `python3 mkjobs.py models` (gpt-image-2, flag + name). For the plates: `node logos.js`, then the guides (in compose's history: the mark darkened into the master's own plate crop), then `python3 mkjobs.py plates3` (nano-banana-pro; Grok redone as `nb3` because its rim moved).
4. `/usr/bin/python3 compose.py` (fit, lay back, tint) writes `img/chip7-<m>-full.jpg` and `compose.json` (the fit and its residuals). Then export with ImageMagick: 1200 at q82 / webp q80, and 1800 at q68 / webp q72.
5. Fifth chip:
   - `python3 mkjobs.py try` (blank, take a);
   - crop to `t7-master.jpg`;
   - `node tguide.js` (typeset guide);
   - `python3 mkjobs.py tryp` (nano-banana-pro; take a);
   - `tgeom7.json` holds its dies.
6. `node run.js <out> now,C7,C7~grid 320,390,1280 [dpr]` prints the tests. `/usr/bin/python3 board.py <out> 390|1280 <png>` and `board.py close <3x out> <png>` make the boards. `node rec.js <mp4> 390` records the video. `/usr/bin/python3 flat.py <images>` measures test 5.

## Cost (Hedra)
22 jobs, **$3.24 of the $8 cap**:

| What | Jobs | Cost |
|---|---|---|
| master, gpt-image-2 4K medium | 3 | $0.38 |
| per-model passes, gpt-image-2 4K | 4 | $0.55 |
| plate redos, gpt-image-2 2K, rejected | 4 | $0.53 |
| plates, nano-banana-pro 2K | 6 | $0.91 |
| fifth chip blank, gpt-image-2 4K | 2 | $0.25 |
| fifth chip painted, nano-banana-pro 4K | 2 | $0.61 |
| flux-kontext (bad input, not billed) | 1 | $0 |

Every job is in `log.jsonl`: model, settings, cost, time and file.
