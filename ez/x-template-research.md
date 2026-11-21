<!-- Research for the owner, 5 Nov 2026 (a helper's report). Builds on x-chart-video-research.md and x-marketing-research.md; does not repeat them. -->
# One video template per round: what the evidence says (5 Nov 2026)

Grades: **[Measured]** study; **[Reported]** credible article or docs; **[Opinion]**; **[API]** Hedra's live v3 API (3.21.32), free estimates only.

## 1. Hand-drawn and embellished data

- **Wood et al., IEEE TVCG, Oct 2012** [Measured]:
  - Sketchy edges hurt size judgements on circles (p < .001), much less on rectangles.
  - In the annotation study (n = 52), engagement did not differ significantly (median 7 vs 6 annotations). 29% vs 7% called it fun.
- **Bateman et al., CHI 2010** [Measured, n = 20]: embellished charts were read as accurately as plain ones and remembered better 2 to 3 weeks later. Viewers also saw more of an author's "value message" (bias) in them.
- **Haroz, Kosara & Franconeri, CHI 2015** [Measured]:
  - Pictographs that *are* the data cost nothing and helped memory.
  - A decorative image that was not data distracted.
- **Skau et al., EuroVis 2015** [Measured]: 4 of 6 bar embellishments hurt accuracy. **Borkin et al. 2013/16**: colour, recognisable objects and titles aid memory.
- **Song, Cho, Bearfield & Stasko, IEEE VIS, Nov 2025** [Measured; effect sizes not retrieved]:
  - Hand-drawn fonts and cartoon-style bars **significantly lowered credibility**.
  - Colour and image-style bars raised it.
- **Synthesis** [Opinion]: illustration *around* the data helps attention and memory. Illustration *of* the marks and type costs accuracy and trust.

## 2. Broadcast packages

- **F1 / DixonBaxi (Black Book Motorsport, 28 Feb 2014)** [Reported]:
  - A grid of modules, one data point each.
  - 300+ pre-built components; Vizrt fills them from telemetry.
  - Some are on screen 3 s, built for "the lowest common denominator" screen.
- **F1 2022 (Autosport, 18 Mar 2022)** [Reported]: rebuilt from scratch for "discipline"; "There can't be just numbers everywhere on screen."
- **NBA on NBC (SVG, 9 Apr 2026)** [Reported]:
  - One fixed frame, 120+ team versions by colour only, flat colour.
  - Motion "snaps to core information".
  - The risk named: feeling "stale two months in".
- **Common thread** [Opinion]:
  - A fixed frame and slots.
  - Only the data and one accent colour vary.
  - A few motion verbs with fixed meanings.

## 3. Painting plus code

- **VFX tutorials** [Opinion]: match the grain, light wrap, and multiply shadows that follow the plate's light. Nothing was found on painted plates.
- **Spider-Verse** [Reported]: lines drawn as part of the scene, mostly animated on twos.
- **rough.js** (the Handy lineage) [Reported, docs]: roughness and bowing settings; a fixed seed gives the same stroke every frame, and re-seeding gives line boil.
- **gpt-image-2** [Reported]: OpenAI previews `background=transparent` (The Decoder, 21 Aug 2026) and warns its raster charts are not pixel-accurate.

## 4. Hedra [API, 5 Nov 2026]

- **gpt-image-2:**
  - 1:1, 3:4, 4:3, 9:16 or 16:9; 1K, 2K or 4K.
  - Up to 16 reference images.
  - 3:4 at 2K: low $0.0075, medium $0.067, high $0.27; a reference adds about $0.012.
  - **No background or alpha field**, on this or any Hedra image model.
- **Other image models:**
  - nano-banana-2.1 offers 4:5 and 14 references at $0.12.
  - seedream-50-pro's "layer-separable" output appears in its description only.
- **Transparency** comes only from veed video background removal (WebM, 2.25¢ per 30 frames) and a Topaz upscaler that keeps an alpha the image already has.
- **kling-v3:**
  - Start and end frames, 3 to 15 s.
  - 9:16, 1:1 or 16:9 only.
  - 1080p without audio: $0.56 per 5 s.
- **seedance-15-pro:** start = end, 5 s at 1080p: $0.30.
- **Not verified:**
  - Real output pixel sizes.
  - Whether start = end moves at all: a community report says it is near-static. The site's founder loops were crossfaded instead.
- **Whole template** [Opinion]: about $3 to $5 once, against $4 to $15 per film.

## 5. A 15 to 20 s reveal

- **Amini et al., CHI 2015** [Measured, 50 professional data videos]: most run Establisher, Initial, Peak, Release.
- **Heer & Robertson, InfoVis 2007** [Measured]: staged animation beats unstaged and static. Change axes first and values after.
- **TikTok creative guide (undated)** [Reported]: 63% of its highest-CTR ads show the key message in the first 3 s.
- **Countdowns:** still none found.

## Design rules

1. **Hedra paints the world, never the data.**
   - A scene around an empty board (screen, slate or paper), painted head-on, with no text, numbers or logos.
   - 3:4 at 2K, cropped to 1080×1350.
2. **Code draws every number, ticker, logo and name in a clean tabular face.**
   - Hand-drawn treatment only on strokes that are not data: frames, arrows, the grading stamp (VIS 2025).
3. **Sketchy lines only.**
   - The price and target lines may take rough.js at roughness 1 or less, with a fixed seed.
   - No sketchy fills, circles or areas (Wood).
4. **One finish over everything.**
   - Composite, then lay one grain or paper texture and one grade over the whole frame, data included.
   - Ink multiplies into the paper; shadows and data colours follow the painting.
5. **Fixed slots.**
   - The same positions every round: ticker, chart, four calls at the line ends, the bell, P&L, end slate.
   - Only the data, the logo and one brand accent vary.
6. **Four motion verbs:**
   - draw-on = time passing;
   - snap = a fact lands;
   - stamp = graded;
   - crown = winner.
   - One change per beat; axes before candles.
7. **Establisher, Initial, Peak, Release:**
   - frame 1 is the complete still with the four calls;
   - "earnings hit";
   - the close number and the stamps;
   - P&L, standings, next.
8. **Code strokes on twos (12 fps).** Decorative strokes boil every 2 to 3 frames; digits never boil.
9. **At most one living layer:** a 5 s Kling ambient loop (light, smoke), kept off the board.
10. **Three or four background variants, made once** from the first as a reference, checked for stray letters.

## Three biggest risks

1. **Credibility.** A cartoon look can make the P&L read as a meme or as opinion (VIS 2025; Bateman's value message). Fix: clean data type and "Paper, $100K per trade. Graded at the close." on screen.
2. **Pasted on.** Unmatched light, texture or perspective makes code look stuck on (the owner's recurring complaint). Fix: rules 1, 4 and 8, judged at phone size.
3. **Staleness.** One frame every round tires followers ("stale two months in"; the owner's variety rule for films). Fix: rotate variants and let the data story change; keep the master painting and its prompt in the repo, since Hedra's model list moves.

## Sources (read 5 Nov 2026)

**Studies**
- Wood et al., TVCG 18(12), 2012: openaccess.city.ac.uk/id/eprint/1274
- Bateman et al., CHI 2010
- Haroz et al., CHI 2015: eagereyes.org
- Skau et al., EuroVis 2015: eagereyes.org
- Borkin et al.: vcg.seas.harvard.edu
- Song et al., IEEE VIS 2025: ieeevis.org
- Amini et al., CHI 2015 and AVI 2018
- Heer & Robertson, TVCG 13(6), 2007

**Broadcast**
- blackbookmotorsport.com (DixonBaxi)
- autosport.com
- sportsvideo.org
- NewscastStudio

**Production and tools**
- studiodaily.com
- slashfilm.com
- rough.js docs (jsr.io)
- the-decoder.com
- higgsfield.ai; Reddit snapshot
- TikTok creative tips (PDF)
- api.hedra.com/v3; hedra.com/pricing
