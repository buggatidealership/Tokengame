# H24 `ground`: the page's own background (X2+)

Boards:
- `ez/x2p-h24-ground-390.png`: the whole Overview from the top to the end of the bet, phone.
- `ez/x2p-h24-ground-1280.png`: the same on desktop.
- `ez/x2p-h24-ground-closeup.png`: 3x close-ups of two joints.

Each board shows today's page first, then G1 to G5, all laid over the built `v46-live-x2plus.html`.

## What is under the beats today (measured, not assumed)
- The ground is `html` #0b0a14 plus X2+'s fixed `body::before` layer (faint cream speed rays and a green slash).
- **The ground is 28.5% of the phone page and 36.8% of the desktop page** (top to the end of the bet; `share.js`: the ground painted magenta, then the magenta pixels counted).
  - It shows behind every section head, the strap lines, the gaps and the sides of the record and MVP carousels.
  - So it is a large share of what a visitor sees, not a thin margin.
- The torn paper between beats is `.t5-bg.t5-G1`, an SVG. It is not `.t5-G2`; pair 2's images are not used on the page.
- Meet the models (`.ch`) paints its own black bands, so the ground does not show behind the chips. I left that as it is.

## The takes
All five are one tall painting per format (gpt-image-2, 4K high, refs `bet-chip-h2.jpg` + `top-hero-t-h22.jpg`). Each painting is then:
- dimmed in the file (not by a CSS overlay);
- made seamless top to bottom (the last 22% crossfaded into the top);
- set on `html` with `repeat-y`, so it scrolls with the page and needs no fixed layer.

Phones use the 9:16 tile (1440 x 1997 px, a 541 px period at 390). From 760px the 16:9 tile takes over (2560 x 1123 px, a 562 px period at 1280).

| Take | Ground | Gutters between beats |
|---|---|---|
| G1 The board | One dark motherboard running down the page: gold trace bundles, empty sockets, SMD parts, red rim left, green rim right. | **Replaces** the torn paper: a strip of gold edge-connector fingers (a board's slot edge). |
| G2 The wafer | A dark silicon wafer: a grid of black-mirror dies, thin-film green/red sheen, gold scribe lines. | **Replaces** it: the dicing street, a glowing laser cut between two rows of dies. |
| G3 The rack | Inside a server rack: black rails with holes and green/red LEDs down both edges, cables, a black middle. | **Replaces** it: a 1U black blanking plate with vents, gold screws and two LEDs. |
| G4 The bus | A trace highway down the middle of the board. Three gold data packets run down it (CSS transform only, off with reduced motion). The tint shifts by chapter: copper behind the record, gold behind the proof and MVPs, near black (the vault) from the bet down. | **Replaces** it: a horizontal bus of worn gold traces with a travelling glint. |
| G5 The void | The chip art's own black void: thin smoke, dust, red rim haze left, green right, no circuitry. | **Keeps** the torn paper (the owner picked it in H21). The void adds nothing it could clash with. |

On phones the takes that replace the torn paper also put the same strip before 02 The record, 03 the proof, 04 MVPs, 05 the bet and 06 Get $EZ. That gives five extra joints, which today run straight on with no gutter, and it adds about 236 px to the page. From 1200px (the two-column grid) only the two in-top gutters change. As today, these sit in the left column only.

## Tests (H23's, plus this round's)
1. **Resolution.** The phone tile is 1440 px wide against the 1170 px needed at 390 x 3. The desktop tile is 2560 px against the 2560 needed at 1280 x 2. The strips are 2400 px wide. Nothing is upscaled: each comes from a 3840 or 2160 master.
2. **Reading size:** n/a. The ground carries no text.
3. **Integration:** n/a for live text. What I measured instead is legibility: the WCAG contrast of the cream text (#f8f0d9) against the ground's brightest pixels.
   - At the 99th percentile of luminance it is 8.4:1 to 14.4:1 in every tile.
   - At the 99.9th percentile it is 4.0:1 or better. The worst is G3, at its LEDs.
   - Today's flat ground gives about 17:1.
4. **Static words painted:** n/a. Every prompt said "no text"; I checked by eye at full size and saw none.
5. **Chip detail:** G1, G2 and G4 show traces, vias, pads and SMD parts at about the density of the hero chip's board. G3 and G5 are sparse on purpose.
6. **Framing:** n/a for a ground. Measured instead: none of the tiles has a focal hotspot. The mean luminance is 1.8 to 4% and the p99 is 0.12 to 0.31 (sRGB value).
7. **Page checks.**
   - At 390 and 1280: no sideways scroll on any take (scrollWidth = viewport) and no console errors (`shots.log`).
   - The first G4 build set its packet track to 8000 px and lengthened the page. It now sizes the track from `main`'s bottom, and the shots were rerun.
8. **Cost on the page** (`perf.js`, `perf.json`).
   - Set-up: 390x844 at DPR 3, a CPU 4x slower, the ground injected at DOMContentLoaded, 3 interleaved runs, medians.
   - **Cover lift:** today 16.8 s, G1 16.9, G4 15.9, G5 16.5. That is within run-to-run noise (single runs range from 14.9 to 17.5 s).
   - **Scroll:** I ran a warm pass first, then measured an 8 s scroll through the Overview.
     - Today, G1, G4 and G5 all ran at 55 to 58 fps, with a median frame of 16.7 ms, a p90 of 16.7 to 16.8 ms, and 0 to 4 frames over 50 ms.
     - So no take costs anything measurable, and G4's moving packets cost nothing either. They are transforms on their own layer.
   - A cold first scroll (lazy images and films loading) is noisy for every page, today's included: 1 to 28 fps. Don't read it as a cost of the ground.
   - **Weight:** 240 to 455 KB per tile and 127 to 254 KB per strip. A phone loads one tile plus one strip, at most about 600 KB; the films are 18 MB.
   - No script runs per frame. G4 runs a few lines once (and on a width change) to place the tint stops.

## The twelve design questions (lesson 122)
1. **Hierarchy:** the beats are the thing to take away. The ground is the dimmest layer on the page (mean luminance 2 to 4%, against the chips' lit gold). Only the gutter strips are bright, and that is because they carry the structure.
2. **Sequence:** the hero chip, the four frames and the film's frame are all painted circuit board. G1 and G4 make the space between them the same board, so the beats sit on one object running down the page into the vault (G4 darkens into it).
3. **Words:** none. The ground carries no text.
4. **Motion:** G1, G2, G3 and G5 are still. G4's packets mean "data flows down to the next beat" (lesson 115: motion only where it carries something). They stop with reduced motion.
5. **Interaction:** nothing on the ground looks touchable. The gold fingers could read as a slot, which is a small risk.
6. **Return:** the ground doesn't change between visits. G4's tint follows the chapters, not the news.
7. **Trust:** n/a.
8. **Share:** in a screenshot, G1 and G4 make each beat read as part of one machine. Today's flat ground makes them read as cards on a page.
9. **Edge states:** a longer page just repeats the tile. A section that is missing or hidden takes its gutter with it (inserted only before sections that are on the page). Sections added later get no strip, so they need adding to the list in `_g4.js`.
10. **Data honesty:** n/a. Nothing in the ground encodes data, which is why G4's packets don't claim to be live.
11. **Reach:**
    - 320: the strips scale and nothing overflows.
    - Reduced motion: G4 is still.
    - Screen readers: the strips are aria-hidden and the ground is CSS.
    - Slow phones: measured above.
    - Cream text keeps at least 4:1 everywhere, though small grey footnotes (the "Corner = the winner" line) get busier on G1 and G2.
12. **Feeling:** G4 has a payoff, the board darkening into the vault at the bet. The others hold one mood all the way down.

## Hedra spend
19 jobs, **$6.36** (log.jsonl), every charge equal to its estimate:
- 5 drafts: gpt-image-2, 2K medium, 9:16, $0.08 each. All usable; G5's had a gold hotspot at the top, which I removed from the prompt.
- 10 4K masters: high quality, 9:16 and 16:9, $0.426 each.
- 4 gutter strips: 16:9 4K, cropped to the band, $0.425 each.

Masters are in `raw/` (git-ignored), 2048 px copies in `img/`, and the page-ready tiles and strips in `out/`. They are named `gr4-*` and are ready to copy into `media/`, with a new name if they change.

## My pick: G1 The board, with the edge-finger gutters
**Why G1:** the whole top is already painted circuit board (the hero chip, the four frames' boards, the film's PCB frame), and G1 makes the page that same board.
- In the 3x close-up the film's green frame runs straight into it. The beats read as parts mounted on one motherboard, not cards on a black page. That is the "coherent unity" ask.
- The gold fingers are a gutter from the chip world itself, where the torn white paper is an object from another world (lesson 111).
- It costs nothing measurable.

**Runner-up: G4.** It is the same board plus the chapter tint into the vault. Pick it if the owner wants the page to go somewhere as you scroll. **G5 is the safe fallback:** it is the art's own void, keeps the torn paper and changes the least.

**How G1 could fail:**
- **Busy behind small text.** Fine gold traces sit behind section heads, the strap lines and the grey footnotes. Contrast stays at 7:1 or better at the 99.9th percentile, but texture behind 9 to 11 px words reads as noise even when the ratio passes. The fix, if seen: a soft dark pool behind each head block, or a dimmer tile (gain .48 to .38).
- **Repetition.** The tile repeats every 541 px on a phone, about 12 times down the Overview. A sharp eye may spot the same socket coming back. The fix: a second master stacked into a 1082 px period (+$0.43).
- **Competing with the frames.** The four frames and the hero chip are also green boards, so their edges are softer against G1 than against black. The torn paper used to mark those edges hard. The gold fingers do the same job, but they are less loud than white.
- **Desktop.** The strips stay in the left column, as the torn paper does today. On a wide screen G1's board fills big empty sides, which reads well but makes the page feel more "wallpaper".
- **Not tested:** Safari or a real phone (Chromium only). It is a plain background-image, so the risk is low.

## Files
- `_g4.js` sets the take (`window.__G4='g1'..'g5'`; `window.__G4M` is the tile path). It is a drop-in that could live beside `x2p_top.js`.
- `gen.py` runs the Hedra jobs (jobs1.json are the drafts, jobs2.json the masters and strips). `tile.py` makes the tiles and strips.
- `run.js` takes the shots, `share.js` measures the ground share and `perf.js` the speed. `board.py` makes the boards.
- `prompts.json`, `log.jsonl`, `shots.log`, `share.json`, `perf.json`.
