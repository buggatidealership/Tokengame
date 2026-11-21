# Round H2 · Upcoming: U6 "name in lights", reinvented (2026-10-31)

These are mockups of the X3+ Upcoming tab (`#/upcoming`), built from the owner's pick U6. Nothing live was changed.

**Boards**
- `ez/x2p-x3p-h2-upcoming-390.png`: today first, then takes A to D. Under them sit two close-up rows: the main event with no calls in yet, and the same event with calls in.
- `ez/x2p-x3p-h2-upcoming-1280.png`: the four takes at desktop width, plus the sign study (method a against method b).

**How to run it**
1. Serve `ez/` on :8931.
2. `node run.js <out> now,A,B,C,D,S 390,1280,320` (add `calls` as a fourth argument for the calls-in state).
3. `/usr/bin/python3 board.py <out> 390|1280 <board>`.

**Code**
- `_h2.js`: the sign builder, the bulb tracer and the logo mask.
- `_hb.js`: the page-of-panels skeleton.
- `_h2.css`: shared styles.
- One `.js` and one `.css` per take (`a` to `d`); `s.*` is the sign study.
- It also loads `../upcoming/_hu.js` (HU helpers) from round H.
- `gen.py` sends Hedra jobs. Reference images go up through `POST /v3/files`. The key is read from `$HEDRA_API_KEY` and never printed. `jobs.log.jsonl` holds no URLs.

## The sign: method (a) is the one that works

**Method (a), page-placed logo:**
- Hedra paints only the scene and a sign box with a blank, evenly lit panel. Prompts say "no text, no letters, no logos".
- A script measures the panel's rectangle on each painting and stores it in `panels.json` and `PAN` in `_h2.js`.
- The page then does the rest, from the site's own logo file:
  - It tints the glass in the company's colour (`SE.brand`).
  - It lights the mark in warm white with a halo. The mark is a smooth mask rebuilt from `media/logos/<T>.png`. A logo drawn on a tile, like Arm's white letters on blue, loses the tile.
  - It traces a ring of bulbs around the mark's own outline. The mask is dilated, its boundary walked, and bulbs set at even spacing; each bulb is an SVG socket, glass and glow, each slightly different in brightness.
  - It sets the company's **name in lights** on the panel beside the mark. The name is page text filled with lit bulbs and fitted to the room.
  - A wordmark is detected by its count of separate shapes (three or more). Arm counts as one, so it gets no name beside it: its letters already say it, and the dilated bulb ring wraps the whole word.
- Every main event reuses one painting per scene. So it works for any company the day the round is added: AMD, Arm and Cloudflare (Thursday) all render without new art.

**Method (b), the model paints the logo from a reference.** I checked each result shape by shape against the site's file, with an outline overlay and IoU, at 4x zoom.

| File | Model | Verdict |
|---|---|---|
| b-gpt-aapl | gpt-image-2 1K high | **Rejected.** The left lobe bulges past the real outline; the overlay shows it about 10% too wide. |
| b-nb-aapl | nano-banana-pro 1K | **Rejected.** Seen at an angle and cropped, so it cannot be checked flat. |
| b2-nb-aapl | nano-banana-pro 1K, "flat front view" | **Rejected.** At an angle again; the bite and leaf read right, but it cannot be checked. |
| b-gpt-amd | gpt-image-2 1K high | **Rejected.** The empty square is lit as part of the mark, and the inner block is dark: figure and ground are swapped. |
| b-nb-amd | nano-banana-pro 1K | **Rejected.** The inner block turns into a window frame. |
| b2-gpt-amd | gpt-image-2 1K high, shape spelled out in the prompt | **Shape matches** (IoU 0.81 inside the bulb and chrome trim, the corners and the gap in place). **But it painted the sign orange**, not the site file's green. Not shippable as it is. |
| b-gpt-arm | gpt-image-2 1K high | **Letters match** a, r, m (the overlay sits on the strokes). The colour is gold bulbs, not Arm's blue. |
| b-nb-arm | nano-banana-pro 1K | **Letters match.** The panel is pale and the colour is not Arm's blue. |

**Conclusion:**
- Method (b) gets wordmarks right about half the time, but never the brand colour. It got Apple's outline and AMD's figure and ground wrong on its first tries.
- Every new main event would need a paid painting, a check, and likely retries.
- Method (a) is exact by construction: the mark *is* the file.
- Recommendation: (a) for every main event; (b) only as a one-off splash for a hero company, after the check.

## The four takes

Each take is a complete reinvention of all four asks, so the parts can be mixed. The page-of-panels system comes from the no-Hedra book:
- every fight night is one comic page with its own painted ground;
- panels have a thick ink frame with a thin cream keyline inside;
- gutters are 8 px and show the painting;
- labels are yellow caption boxes in the panel corners;
- on desktop the main event is the splash panel on the left, with the day head and the undercard stacked on the right to the same height.

| | Sign scene | Call bubbles | Day head (and its old dead space) | Undercard | Ground |
|---|---|---|---|---|---|
| **A** Rooftop marquee | a-roof-2k (the one 2K render) | The four AIs stand **in the ring under the sign**. Each thinks (a hand-drawn cloud, "?") until its call is in, then **says** it (a speech balloon, green ▲ or red ▼). The state is told by the balloon type, not a label. | The theatre's **changeable-letter board** (painted). Every letter is its own lit tile with its own tilt, on the painted tracks: FIGHT NIGHT / MONDAY NOV 2 / 3 BOUTS · CALLS DUE MON. It fills the width. | Small sign boxes with bulbs on their rims, the logo lit on brand-colour glass | Dusk sky with searchlights |
| **B** Arena front | a-arena (the arena's own canopy) | **Scorecards held up**: the back (crosshatched, "?" in the AI's colour) until the call is in, then the printed front | A two-ink fight bill (day, date). Beside it, filling the gap: the count and due day, and the night's line-up as printed seals, the main event's ringed in gold | Posters pasted on the brick, torn edges, brand colour | Brick wall under a lamp |
| **C** Billboard over the city | a-tower | A **little bulb board** under each AI: "?" in unlit bulbs, then the call in green or red bulbs | The **ring card** held up (day, date). Beside it: one drawn bell per bout, and the due day | Lit **shop windows** across the street, awnings in each company's colour | Night skyline |
| **D** The programme | a-roof-seed (seedream 3D) | A **four-panel strip**, one close-up per AI in its colour with speed strokes. It thinks, then shouts. | The programme page: the day set big, and beside it the numbered **running order**, each with its mark, name and ticker | Admit One tickets from the roll, in brand colour on painted ticket stock | Velvet curtain |

**Data:**
- Days, rounds, names, tickers, brand colours, logos and calls all come from the page (`SE.toCome/byDay`, `TICKERS`, `CO_LOGOS`, `ROUNDS`).
- The calls-in state uses the newest graded round's own calls, read from `ROUNDS` at run time. Today that is R80 Exxon: GPT ▲2.5, Kimi ▲1.5, Claude ▼1, Grok ▼1.3.
- In that state the due line reads "Calls in · graded at the close".

## Checks run

- At 390, 1280 and 320: `scrollWidth == innerWidth` on every take, and no console errors.
- The fitted lines never clip (`clip: []`).
- Bulbs per mark: Apple about 54, AMD about 73, Arm about 86 (whole word), Cloudflare about 54.
- At 320, B's line-up, C's bells and D's logos ran wider than the column. I fixed it by stacking the day head below 370 px; the fix is re-shot on the boards.
- Nothing sits on a logo or a face. The calls stand on the ring canvas, under the sign, never on the panel.
- Hard rules:
  - No native emoji.
  - No white module grounds.
  - No dot pattern over a whole module: dots only make the bulbs.
  - Name and ticker together on every label.
- Close-ups were zoomed and compared against a comic page.

## How each take could fail

- **All of them (method a):**
  - The panel's position is measured per painting, so a new scene needs one measuring run (automatic, `panels.json`).
  - A multicolour logo (not mono, no tile) is shown in its own colours on the glass with no traced ring; no current main event has one.
  - The bulb-filled name gets small for long names (≥12 letters) on the 320 px panel; the fit floor is 9 px.
- **A:**
  - The letter-board tiles are about 13 px tall on a phone. They read, but they are the smallest type on the page.
  - The thought clouds are lavender, which is not a brand colour.
- **B:**
  - The arena's panel is very wide and short, so the mark and name sit small.
  - The seals are cream discs, a small pale element.
- **C:**
  - The bulb-board type is the hardest to read of the four call designs. I made it larger and gave it a lit core after the first draft was illegible.
  - The skyline ground is dark.
- **D:**
  - The four-panel strip repeats the panel device inside a panel.
  - The ticket stock is reused from round H (`../upcoming/img/ticket-stock.jpg`).
  - The seedream sign carries a faint reflection band.

## Hedra jobs

Costs are the API's estimates. Earlier rounds found each charge equal to its estimate; the wallet was shared with other areas, so the balance deltas include them. Times run from submit to done.

| File | Model | Settings | Cost | Time | Result |
|---|---|---|---|---|---|
| img/a-roof.jpg | gpt-image-2 | 1K medium 4:3 | $0.037 | 34 s | Rooftop sign, blank panel, ring below. Draft of A. |
| img/a-arena.jpg | gpt-image-2 | 1K medium 4:3 | $0.037 | 35 s | Arena canopy at night, wet street, blank panel. B. |
| img/a-tower.jpg | gpt-image-2 | 1K medium 4:3 | $0.037 | 36 s | Floodlit billboard, water tower, searchlights. C. |
| img/a-roof-seed.jpg | seedream-50-pro | 1080p 4:3 | $0.068 | 69 s | The most modelled; slight reflection band. D. |
| img/b-gpt-aapl.jpg | gpt-image-2 + ref | 1K high 4:3 | $0.157 | 90 s | Rejected (outline too full). |
| img/b-nb-aapl.jpg | nano-banana-pro + ref | 1K 4:3 | $0.153 | 90 s | Rejected (angled). |
| img/b-gpt-amd.jpg | gpt-image-2 + ref | 1K high 4:3 | $0.158 | 89 s | Rejected (figure and ground). |
| img/b-nb-amd.jpg | nano-banana-pro + ref | 1K 4:3 | $0.153 | 89 s | Rejected (window frame). |
| img/b-gpt-arm.jpg | gpt-image-2 + ref | 1K high 4:3 | $0.158 | 99 s | Letters right, colour wrong. |
| img/b-nb-arm.jpg | nano-banana-pro + ref | 1K 4:3 | $0.153 | 99 s | Letters right, pale, colour wrong. |
| img/g-city.jpg | gpt-image-2 | 1K medium 9:16 | $0.029 | 99 s | Night sky over the skyline. C ground. |
| img/g-brick.jpg | gpt-image-2 | 1K medium 9:16 | $0.029 | 100 s | Brick wall under a lamp. B ground, C's street. |
| img/g-curtain.jpg | gpt-image-2 | 1K medium 9:16 | $0.029 | 100 s | Velvet curtain. D ground. |
| img/g-dusk.jpg | gpt-image-2 | 1K medium 9:16 | $0.029 | 101 s | Dusk clouds, crossed searchlights. A ground. |
| img/d-board.jpg | gpt-image-2 | 1K medium 16:9 | $0.029 | 102 s | Empty theatre letter board with tracks. A day head. |
| img/t-boxes.jpg | gpt-image-2 | 1K medium 16:9 | $0.029 | 102 s | Three small sign boxes on a ledge. Not used (CSS cabinets read cleaner at card size). |
| img/a-roof-2k.jpg | gpt-image-2 | **2K high** 4:3 | $0.268 | 87 s | The best take's sign, redone: deeper cabinet, clear ring, ink-hatched sky. A. |
| img/b2-gpt-amd.jpg | gpt-image-2 + ref | 1K high 4:3 | $0.158 | 90 s | Shape matches, colour orange. |
| img/b2-nb-aapl.jpg | nano-banana-pro + ref | 1K 4:3 | $0.152 | 89 s | Rejected (angled again). |

**Total: $1.86 of the $15.**
- Two thirds of it went on method (b), to answer the owner's question properly.
- Method (a) needs no money per company, so there was nothing more worth buying. The next sensible spend is a 2K render of the take the owner picks.

**References:** `ref/<T>-ref.png` and `ref/<T>-mask.png`, the site's own files cleaned and upscaled (blur and threshold, so the reference has no stair steps).

**Pick:**
- **A**, for its sign and its calls standing in the ring under the company's name in lights.
- Then **C's** windows or **D's** tickets for the undercard.
- **B's** line-up seals or **D's** running order as the day head on desktop, where A's letter board is a touch thin.
