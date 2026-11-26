# Round H3 · ground2: the page as a comic book, and the cuts between sections (2026-10-31)

Boards: `ez/x2p-x3p-h3-ground-390.png` and `ez/x2p-x3p-h3-ground-1280.png`.
- Top: the whole Overview, today's live X3+ first, then takes A to E.
- Below: one row per take with close-ups of the four cuts (cover to Meet the models, Meet the models to Every round so far, Every round so far to Smart or lucky?, Smart or lucky? to Bet #1).

Scroll recording of E at 390: `ez/x2p-x3p-h3-ground-scroll.mp4` (26 s, scroll-driven motion on).

All of it is mockups only: CSS and JS laid over the built `v47-live-x3plus.html` by `run.js`. No live file was changed.

## What I read the want as

The Overview should read as a comic book: what lies under the modules, and how one section hands over to the next. G3 (a backdrop per section) stays the base idea.

**Reading of "Tonight".** The brief lists Tonight among the cuts, but today's Overview has no Tonight section. It reads: cover, Meet the models, Every round so far, the beat "Meanwhile, the big question…", Smart or lucky?, the beat "Next time…", Bet #1, the back page. Tonight lives on the Upcoming tab. So the four cuts here are the Overview's real ones. If Tonight comes back to the Overview, its opener (`o3`, the bell) slots into any take the same way as the others.

**What every take keeps:**
- The two existing beat captions keep their words. Each take restyles them as that take's own transition device.
- The three chosen openers (models, rounds, bet) are kept as images.
- Every word stays page text.
- Today's CSS ray fills behind Meet the models, Every round so far and Smart or lucky? are replaced in every take, since they are the cheap sunbursts of lesson 38.

## The takes

**A · The bound comic (page turn)**
- Ground: aged newsprint for every page. The page's stacked edges run down the right and a spine shadow down the left. On desktop the book sits on a dark ground.
- Cut: a page turn. The page ends on an inked bottom edge and a folio number ("— 2 —"). Under it is a band of stacked page edges, then the next page's top: "Page 3 · Every round so far", or the beat caption where there is one.
- The lower-right corner curls up, as a hand-drawn SVG with a thick outer and a thin inner line. It grows from 42% to full size as it scrolls into view (scroll-driven CSS; static with reduced motion).

**B · Panels and gutters (gutter caption)**
- Ground: printed paper. Each section is one hand-inked panel: a wobbling border with thick outer and thin inner ink, holding its painted backdrop.
  - Meet the models: G3's backstage.
  - Every round so far: G3's street.
  - Smart or lucky?: the card-room coin.
  - Bet #1: the bank.
- Gutters are tight (14 px).
- Cut: a gutter with a caption. A hand-cut yellow caption box rides each gutter, half on the paper and half on the next panel's border: "Meanwhile, backstage…", "Down at the newsstand…", then the page's own two beats.

**C · Splash pages (splash, abrupt cut)**
- Ground: black ink wash on watercolour paper.
- Cut: an abrupt one, with no gutter. Every section opens on its opener as a full-bleed splash that runs off both edges of the phone (3:4 on phones, 21:8 on desktop).
  - The headline is lettered onto the splash's foot.
  - A thin trim line marks the cut.
- Smart or lucky? gets a new splash: a gold coin spinning over a card table.
- The beat captions stack on the splash they open, above the opener's own caption, the way two captions stack in a comic.

**D · The slash cut (abrupt cut on the logo's slash)**
- Ground: each section is printed on its own riso stock, all full bleed:
  - cream: the cover;
  - red: Meet the models;
  - blue: Every round so far;
  - black: Smart or lucky?;
  - green: the bet.
- Cut: sections meet on a hard diagonal. The cut is marked by:
  - a sheared paper core along the edge;
  - the logo's green and red slashes crossing it;
  - tapered ink speed strokes.
- The beat captions sit on the cut.

**E · Establishing shots (establishing shot, "Meanwhile" box)**
- Ground: one night in one city. Ink wash with a dusk tint that fades to midnight down the page.
- Cut: before each section, a wide painted exterior with a location caption, then the cut inside to the section's opener. This is the classic establishing shot followed by the interior.

| Section | Exterior | Caption |
|---|---|---|
| Meet the models | the arena at dusk | "Outside the arena, before the show." |
| Every round so far | the newsstand | "Across the street, the newsstand." |
| Smart or lucky? | the card club | the page's own "Meanwhile, the big question…" |
| Bet #1 | the bank | "Next time…" |

- Each exterior pushes in slowly as you scroll (scroll-driven `background-size`; static with reduced motion).
- A small tail on each frame points down into the next panel.

## Cost: Hedra, page weight, scroll on a 4x slower CPU

- **Weight** counts only what the take adds. The openers (1.86 MB, already chosen) are excluded. Today's grounds are CSS, 0 KB.
- **Scroll** was measured at 390x844 with the CPU throttled 4x. The script wheel-scrolls the whole Overview at a steady pace and counts frames with requestAnimationFrame. Each figure is the median of 3 runs; long frames are those over 50 ms.

| Take | Hedra | Added weight, phone | Added weight, desktop | Page height at 390 (today 6,340 px) | Scroll fps | Long frames | Worst frame |
|---|---|---|---|---|---|---|---|
| Today | | 0 | 0 | 6,340 | 27.4 | 29 | 100 ms |
| A | $0.05 | 77 KB | 77 KB | 7,378 | 26.2 | 44 | 117 ms |
| B | $0.41 new (+ G3's backdrops) | 782 KB | 1.46 MB | 6,687 | 28.2 | 28 | 117 ms |
| C | $0.32 | 200 KB | 159 KB | 7,734 | 29.4 | 35 | 117 ms |
| D | $0.11 | 229 KB | 229 KB | 6,939 | 28.2 | 36 | 100 ms |
| E | $1.21 (+ $0.54 of superseded drafts) | 558 KB | 1.13 MB | 7,771 | 27.8 | 45 | 100 ms |

**Reading the scroll figures:**
- The fps spread between takes, 26 to 29, is inside the run-to-run noise (single runs ranged 25.7 to 30.9). No take is measurably smoother or rougher than today.
- A and E have more long frames (44 and 45 against 29). Both carry scroll-driven animations (the curl, the push-in) and a taller page. That is the honest cost to name.
- Most of the page-height increase comes from the openers themselves (3 x 16:10 panels), not from the grounds.

**Hedra:** $1.91 spent in all, of $15.

## How each take could fail

**A**
- The page turn needs a page to turn. Every section here is still a full-colour module on top of the paper, so between turns the page reads as "cards on paper" rather than as printed pages. A real issue would need each section's panels printed onto the page (B's border treatment), which A does not do.
- The curl is SVG on a flat page. Up close it is clean, but it is the most "drawn by code" device of the five.
- On desktop the book on a dark ground reads as a document viewer.

**B**
- It is the closest to G3, so it may read as G3 with borders rather than as a new idea.
- The painted backdrops are mostly covered by the cards on a phone. They show around the headlines and in the gutters only.
- It is the heaviest on desktop (1.46 MB), because each panel's backdrop is a full scene.
- The two captions I wrote ("Meanwhile, backstage…", "Down at the newsstand…") are story copy and need the owner's eye.

**C**
- It adds the most height. A full-bleed 3:4 splash before every section means a phone visitor scrolls through 4 near-full-screen pictures, so the page's facts sit further apart.
- Its section headlines sit at the splash's foot, over a dark fade. Bangers in yellow holds, but the subhead under Meet the models is small on the fade.

**D**
- Bold, but loud. Five saturated stocks in a row can tire the eye.
- The red stock behind Meet the models fights the red in the cards (Claude's band, the "Last place" chips).
- The slashes are the logo's, so they repeat the brand at every cut. Some will read that as identity, some as a stamp.
- The diagonal clips are `clip-path` on the sections. A future element that sits at a section's very top corner would be cut.

**E**
- It is the tallest page (+1,431 px at 390), and the exteriors are a fixed sequence of places. If a section is removed or reordered, the "one night in one city" story needs new shots.
- It is the second-heaviest.
- The exteriors and openers are painted in two finishes:
  - the gpt-image-2 exteriors have a strong ink line;
  - some seedream openers are smoother 3D.

  Side by side the change in finish shows, most of all at the bank and the vault.
- The location captions are story copy and need the owner's eye.

## My pick

**E**, for the want "reads as a comic book, not a web page". It is the one take where the cuts tell a sequence: outside, then in; one place, then the next; the night getting later. Each section is introduced the way a comic introduces a scene, not just separated from the last.

**B** is the safer, cheaper second. It is G3 with real panel borders and gutter captions.

The parts can be swapped (lesson 15). For example, E's establishing shots work on B's paper ground, or on C's splash openers.

## Checks run

- **Widths:** 390, 1280 and 320 px, every take. No sideways scroll (scrollWidth equals the viewport) and no page errors.
- **Zoom:** every cut zoomed at 2x (the close-up rows) and compared with a printed comic page.
  - Fixed after the first pass:
    - A's page turn was too faint (a hairline edge and a curl at 42% in the static shot). It now has a band of real stacked page edges, a 136 px curl, and boards shot with the scroll animations at their end state.
    - The close-ups were mis-framed when a hidden beat sat before a section; they are now shot scrolled in place.
    - C's and E's footer fine print was dark on the dark ground; it is now light.
  - Not fixed: some round tiles on the boards are black. These are the page's lazy images not loaded in the headless capture; they are black on today's page too.
- **Rule 0:**
  - No white or pale grounds were added inside modules.
  - No native emoji.
  - No ground fills a module with an even pattern: the tiles are paper, ink wash and riso grain, not Ben-Day dots.
  - Nothing is laid over a face or a number.
  - Words are page text only. Every prompt ends "No text, no letters, no numbers, no logos, no signs, no people, no watermark". The exteriors' marquee and awning came out blank, as asked.

## Hedra jobs

Full prompts and job ids are in `jobs.jsonl`. Every charge equalled its estimate.

| File (img/) | Model | Settings | Cost | Time | One honest line |
|---|---|---|---|---|---|
| c-coin-desk | seedream-50-pro | 1440p 16:9 | $0.135 | 79 s | A gold coin under a spotlight over green felt. Clean, a little plain; used on desktop in B, C and E |
| c-coin-phone | seedream-50-pro | 1440p 9:16 | $0.135 | 113 s | The same coin over a pool-style table. The best of the two; used on phones |
| e-theatre / -newsstand / -cardroom / -bank (phone and desk) | seedream-50-pro | 1080p | $0.0675 each | 73 to 115 s | Handsome painted night streets, but soft and photographic, with too little ink. Superseded by the e2 set |
| a-edges | gpt-image-2 | 1K medium 1:1 | $0.053 | 35 s | Stacked pulp page edges. Reads as wood grain at full size and convincing at 8 to 16 px, which is how A uses it |
| c-inkwash | gpt-image-2 | 1K medium 1:1 | $0.053 | 40 s | Blue-black ink wash with dry-brush streaks. Wraps after seam.py |
| d-riso-red / -green | gpt-image-2 | 1K medium 1:1 | $0.053 each | 35 to 37 s | Believable riso drum streaks and speckle |
| e2-theatre / -newsstand / -cardroom / -bank | gpt-image-2 | 2K high 16:9 | $0.222 each | 74 to 80 s | The best images of the round: modelled 3D with a real comic ink line and halftone in the shadows, owner's finish A. The marquee and awning are blank; used in E |

## Files

| File | What it does |
|---|---|
| `common.js`, `common.css` | Helpers: seeded hand-cut polygons, tapered strokes, the section list, the openers as openmock.js shows them, and clearing today's ray grounds |
| `a.css`/`a.js` to `e.css`/`e.js` | The five takes. `@B@` and `@GR@` in the CSS are replaced by run.js with this folder and round H's `ground/img/web/` |
| `run.js <out> <takes> <widths>` | Shoots the whole Overview and the four cut close-ups per take, and logs scrollWidth, the added image bytes and page errors. Serve `ez/` on :8941 first |
| `perf.js <takes> [runs]` | The 4x slower CPU scroll test |
| `rec.js <take> <out.mp4>` | The scroll recording |
| `board.py <shots> <W> <out>` | The boards. Its labels come from `takes.json` |
| `hedra_gen.py jobs.json img jobs.jsonl` | Runs the Hedra jobs (reads `HEDRA_API_KEY` from the environment) |
| `seam.py` | Tile seams, as in round H |
| `img/` | Originals (JPG q88, at most 2048 px) |
| `img/web/` | The versions the mockups load |
