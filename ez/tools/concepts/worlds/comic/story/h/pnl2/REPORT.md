# Round H6, area `pnl2`: the P&L dashboard, drawn into the scene

Brief: `../BRIEF-H.md`, "Round H6", and the round before it in `../pnl/REPORT.md`. These are mockups only. They are laid over the real
built page (`ez/v47-live-x3plus.html`) in Playwright, in place of today's "Smart or lucky?" section. No live file was touched.

- **Boards:**
  - `ez/x2p-x3p-h6-pnl2-390.png`: today's live section first, then D1, D2, E and F at a 390px phone, with a 3x close-up of each
    take's line ends underneath.
  - `ez/x2p-x3p-h6-pnl2-1280.png`: the same at 1280px.
- **Video:** `ez/x2p-x3p-h6-pnl2-d1.mp4` shows the pick (D1) at 390px, 20 s:
  - the section scrolls in and the lines draw on the glass;
  - then 7 days, 24h and back to Season, each window redrawing its lines in grease pencil;
  - then down to the rows.

## The want, as an expert would brief it
"Both favourite scenes fail for the same reason: the chart is a flat vector overlay floating above a painting. Make the marks
physically belong to the surface in the picture:
- they take its **perspective** (one homography onto the painted surface);
- they take its **material** (wax that skips on glass, chalk that skips on slate, copper raised under the board's light);
- they take its **light** (the room's reflections run across the marks);
- they are **occluded** by what stands in front (officers' heads, the clerk, the crowd).

Everything readable is written on the same surface by the same hand: the axis, names, figures, window switch, lead line and rows.
Keep the content and the live data exactly as in pnl."

## What makes a mark look drawn in, not pasted on (applied in every take, `_s.js`)
1. **Perspective.** The painting is laid at a known scale (`PG.stage`). The surface's four corners were measured on the painting by
   hand, on a grid. The whole chart, an SVG in the surface's own box, is mapped onto those corners with one CSS `matrix3d` (`PG.m3d`,
   a homography). Lines, text, rulings and the window tabs all foreshorten together, so on D1 and F the far side is smaller.
2. **Material.** One SVG filter covers every mark:
   - wax (D1, D2): small dropouts where the pencil skipped, a slight wobble, and a faint glow where edge light catches the wax;
   - chalk (F): heavy dropouts from the slate's grain, plus a little dust;
   - copper (E): the stroke's alpha read as a height map and lit by a distant light from the painting's own upper left, with a cast
     shadow down and to the right.
3. **Light.** For the glass takes, `prep.py` extracts the painting's own highlights (the window's blue shaft, the lamp glints on the
   glass) and screens them back over the marks. Where the shaft crosses Grok's line on D1, the line washes out, as wax on a lit pane
   does (see the close-up).
4. **In front.** `prep.py` cuts the foreground out of the painting and lays it over the chart:
   - the officers' heads and shoulders (D1): hand-drawn polygons from the measured grid;
   - the clerk on his ladder (F): a polygon, plus the crowd by colour (whatever is not slate below the rail).
5. **A hand was here.** Where a hand rested on the board, the early lines are half wiped and smeared sideways (a mask plus a blurred,
   offset copy). Each window tab is ringed in the same pencil when it is open, and the open column of the rows is ringed too.

## The takes
All four:
- show the same data from `../pnl/_lib.js`;
- keep the windows Season / 7 days / 24h, the lead line ("Grok leads the season by $45,530"; "...the last 24 hours by $58,540"), and
  the rows 24h / 7 days / Season;
- keep the fine print;
- keep "If you'd bet $100K on every call." as the narrator's caption box under the headline (a comic device);
- keep the extruded headline as the one loud treatment.

GPT (−$56.9K) and Kimi (−$70.7K) end below the $0 line in every take, with their figures in red.

**D1 · The plot (my pick)**, $0.07
- **The scene:** the ops room, wide: the big glass board in perspective, lamps and a window, two officers in front.
- **On the glass:** the P&L in grease pencil, the leader traced in gold, and break-even as a strip of tape. The lead line, window
  tabs, axis and names are written in the same hand.
- **The rows:**
  - desktop: written on the glass between the officers' heads, where they are looking;
  - phone: there is no room between the heads, so they sit on a strip of the same glass under the brass frame.
- **Could fail:**
  - On a phone the glass is foreshortened, so the far-right labels (the line ends) are the smallest text, about 10.5 to 11px.
  - The heads take the bottom 25% of the glass, so the chart is shorter than in D2.
  - Grease-pencil hand lettering is less legible than a typeface for figures like "$111K".
  - The phone's rows strip is a crop of the same painting, not part of the scene. It is the weakest join.
  - Desktop runs on a 1K painting (1280x720) shown up to 1100px wide: soft at full size. A 2K render means measuring its corners and
    heads again.

**D2 · Edge-lit glass**, $0.12 (painting plus the hand)
- **The idea:** 1940s plotting boards were edge-lit perspex. The light inside the sheet made every grease mark glow, and the plotters
  stood behind the glass writing backwards, so the room read it the right way round.
- **On the glass:** everything, including the rows ruled under the chart (side by side on desktop), all glowing from the edge light.
- **The plotter's hand** is behind the sheet, dimmed and softened by it. Its pencil sits on the newest point of the leader's line,
  mapped through the same homography, and on a switch it walks to the new leader's point.
- **Could fail:**
  - The most legible of the four, but the closest to a flat chart: a frontal close-up has no perspective and nothing in front of it.
  - The hand is ghostly. Dimmed enough to read as behind the glass, it can read as a smudge rather than a hand. On a phone it sits
    near the leader's label.
  - The hand is placed in front of the background picture but behind the marks; on a narrow screen it may cover the blurred room's
    lamps.

**E · In the green (etched)**, $0.07
- **The board:** the chip's board as an establishing shot, top down, with components round the edges.
- **The traces:** each P&L is routed the way a board is routed (straight runs and 45-degree bends only, `PG.octo`). The traces are
  raised under the painting's light, with a pad and via at each end. Break-even is the gold ground bus with vias. The leader's pad
  glows slowly (current flowing).
- **The words:** names, axis, window switch (silkscreen box) and rows are silkscreen.
- **The 24h and 7-day windows look best:** few rounds route into clean staircases.
- **Could fail:**
  - Coloured traces are not real (copper under a mask is one colour). At a glance the lit edges read as neon tubing more than as
    etched copper.
  - Over a full season the 45-degree routing turns 80 rounds into a dense zigzag that is harder to read than a plain line.
  - The board is seen top down, so there is no perspective, and nothing covers the marks.

**F · On the big board (my own)**, $0.07
- **The scene:** a 1920s exchange. Boards like this carried prices in chalk, so the chart and the rows belong there.
- **The chart** is chalked on the slate wall, in its perspective, with the clerk on the ladder in front and the crowd below. The rows
  are chalked on a strip of the same slate under the rail.
- **Could fail:**
  - The slate is the smallest surface in its painting. On a phone the chart labels drop to the 10.5px floor, and at 320px they are
    the smallest text of the four.
  - Chalk on slate is low contrast by nature.
  - The rows strip is a crop of the painting, and it shows a wooden divider through the "7 days" column.
  - It is a new metaphor, not D or E. The owner asked for "one of your own in the same spirit", so it is here, but it competes with
    the ops room for the same job.

## Pick: D1, with D2's rows as the fallback on phones
D1 is the only take that uses all four of the techniques above, and it keeps the owner's favourite scene. It would only be its own
chart if the officers were reading it.

If the owner finds the phone version too small, the honest fix is D2's close-up for phones (the glass fills the screen and every
mark is still on the glass), with D1's wide room for desktop. That pairing is one config away: `phone` from d2.js, `wide` from d1.js.

## Readings that go two ways
- **"Grease pencil... smudged where a hand rubbed it":**
  - one patch, early in the season (built);
  - or wear everywhere. I kept one, so it reads as a hand rather than as dirt.
- **"The window switch... built in the scene's material":**
  - tabs written on the glass and ringed when open (built; you tap the writing);
  - or a physical object in the room (desk switches, as in pnl's D). Writing keeps the control next to what it changes (lesson 54).
- **"The rows":**
  - on the same surface (D1 desktop, D2, E desktop);
  - or on a strip of the same material under the picture (D1, E and F on phones). Both are built.

## Data and checks
- **Live data.** Everything is read from the page through `../pnl/_lib.js`: ROUNDS, `__x2pPnl` (the flat P&L, $100,000 × direction
  × move), and the 24h and 7-day windows by each exchange's own close.
  - On every mount the 24h and 7d totals are checked against the live Leaderboard rows. The check read "ok" for all four AIs in every
    shot.
  - Nothing is typed.
- **Widths:** 320, 390 and 1280px:
  - `scrollWidth` equals the viewport at every width;
  - there are no console errors;
  - the painting overflows its stage on purpose, clipped by the stage.
- **Faces and numbers:**
  - Nothing is drawn over a face.
  - On D1 desktop the right officer's head first covered Kimi's season figure. The rows were moved in to fix it, and no figure is
    covered now.
  - The heads, the clerk and the crowd only cover line ends near $0, rulings, and the margins of the glass.
- **Zoom:** checked at 3x against a comic page. The wax and chalk read as hand marks, and the light crosses them.
  - The weakest parts are the hand-lettered figures, set in a font (Permanent Marker / Cabin Sketch). They are not truly
    hand-lettered.
  - E's copper reads as tubing.
- **Reduced motion:** with reduced motion, no lines draw in and the LED holds still. The lines draw once on view and again on each
  switch.
- **The window switch:** the tabs are SVG groups with `role=button`, `aria-pressed`, `tabindex` and Enter/Space. A hidden HTML table
  carries the rows for screen readers.

## Cost on a slow phone
4x slower CPU, 390x844, medians of 3 runs, `perf.js`; the table is under "Perf" at the end.

For a live build:
- Draw each window's marks once to a canvas or bitmap, and lay that image on the quad. A filtered SVG under a `matrix3d` re-rasterises
  the filter on every frame of the draw-in.
- Or reveal the lines with a single clip-path wipe instead of animating `stroke-dashoffset` under the filter.

## Paintings (Hedra)
All jobs ran on gpt-image-2 at 1K, medium quality, with "no text, no letters, no numbers, no writing, no symbols, no logos" in every
prompt. None has any text (checked at full size).

| Job | Model | Settings | Cost | Time | File | Result |
|---|---|---|---|---|---|---|
| d1-3x4 | gpt-image-2 | 3:4 1K medium | $0.0373 | 34 s | img/d1-3x4.jpg 768x1024 | Glass in strong perspective, blue window shaft, two officers' heads. Used (D1 phone). |
| d1-16x9 | gpt-image-2 | 16:9 1K medium | $0.0296 | 31 s | img/d1-16x9.jpg 1280x720 | Wide room, map, lamps, two officers. Used (D1 desktop). |
| d2-3x4 | gpt-image-2 | 3:4 1K medium | $0.0371 | 40 s | img/d2-3x4.jpg | Frontal edge-lit glass, room blurred behind. Used. |
| d2-16x9 | gpt-image-2 | 16:9 1K medium | $0.0294 | 34 s | img/d2-16x9.jpg | Same, wide. Used. |
| hand-1x1 | gpt-image-2 | 1:1 1K medium | $0.0535 | 70 s | img/hand-1x1.jpg | Hand with a yellow wax pencil on green, keyed cleanly (img/hand-cut.png). Used (D2). |
| e-3x4 | gpt-image-2 | 3:4 1K medium | $0.0370 | 54 s | img/e-3x4.jpg | Board, empty centre, gold edge fingers. Used. |
| e-16x9 | gpt-image-2 | 16:9 1K medium | $0.0293 | 35 s | img/e-16x9.jpg | Same, wide. Used. |
| f-3x4 | gpt-image-2 | 3:4 1K medium | $0.0372 | 58 s | img/f-3x4.jpg | Exchange, slate wall in perspective, clerk on a ladder, crowd. Used. |
| f-16x9 | gpt-image-2 | 16:9 1K medium | $0.0295 | 54 s | img/f-16x9.jpg | Same, wide. Used. |

**Total: $0.32** of the $12 cap. Prompts are in `jobs1.json` and the log in `jobs.jsonl`.

I did not spend on 2K. Every surface's corners and every cut-out polygon is measured on these exact files, so a 2K re-render is a new
picture to measure again. That is worth doing once the owner picks a take: about $0.25 to $0.45 per painting, plus re-measuring.

Derived files, from `prep.py`:
- `*-hl.jpg`: the painting's own highlights, masked to the surface;
- `*-fg.png`: the foreground cut-outs;
- `hand-cut.png`.

## How to run
1. Serve `ez/`: `python3 -m http.server 8961`.
2. From this folder:
   - `node now.js <out> 390,1280` shoots today's section;
   - `node run.js <out> d1,d2,e,f 390,1280,320` shoots the takes. `WIN=d1` or `WIN=d7` opens another window, and `ZOOM=0` skips the
     3x close-ups.
3. Boards: `/usr/bin/python3 board.py <out> 390|1280 <png>` (labels in `takes.json`).
4. Video: `node rec.js d1 <out.mp4>`.
5. Cost: `node perf.js <take|now> 3`.
6. Paintings: `/usr/bin/python3 hedra.py jobs1.json` (the key comes from `$HEDRA_API_KEY` and is never printed).
7. Cut-outs and highlights: `/usr/bin/python3 prep.py`.

Code:
- `_g.js`: the homography, stage and overlays;
- `_s.js` and `_s.css`: the shared surface renderer and the wax and chalk materials;
- `d1.js`, `d2.js`, `e.js` (with the copper material), `f.js`: the takes, each mostly measured corners and layout fractions.

## Perf
| What (4x slower CPU, 390x844, medians of 3) | Today (live section) | D1 (pick) |
|---|---|---|
| Scroll in and lines draw in, 3 s: fps / main-thread time | (no draw-in) | 48.3 fps / 2.24 s |
| A window switch (lines redraw), 3 s | (no windows) | 54.8 fps / 1.21 s |
| Sitting on the section, 6 s | 60.1 fps / 1.76 s | 60.1 fps / 0.64 s |

How to read it:
- The main-thread figures include the rest of the page's own work, so compare the columns, not the absolute values.
- Sitting still, D1 costs less than today's section, which keeps drawing its own chart and coin.
- The draw-in holds 48 fps, better than pnl's take A (20 fps): the scene is two images and one transformed SVG.
- The filtered draw-in is still the heaviest moment. The bitmap or clip-path approach above would remove most of it.
