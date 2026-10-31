# Round H · Upcoming (2026-10-31)

Mockups of the X3+ Upcoming tab (`#/upcoming`) rebuilt from the top down with Hedra paintings and hand-tuned shapes. Nothing live was changed.

- Boards: `ez/x2p-x3p-h-upcoming-390.png` (with a close-up row of each main event) and `ez/x2p-x3p-h-upcoming-1280.png`. Today's live tab comes first.
- Run: serve `ez/` on :8931, then `node run.js <out> now,u1,u2,u3,u4,u5,u6 390,1280,320` and `/usr/bin/python3 board.py <out> 390 <board>`.
- Code: `_hu.js` / `_hu.css` are shared. Each take is `uN.js` + `uN.css`; U6 is `u6.*` laid on top of U1.
- The tab is swapped whole (top, filter, days). The All / Mag 7 / AI filter works, and a day with nothing left after filtering hides.
- `hedra.py` submits, polls and saves (key from `$HEDRA_API_KEY`, never printed). `jobs.log.jsonl` is the raw log, with the signed upload URLs scrubbed.

## Story

The owner's own fight-night voice for the tab: "tonight's card: who the four AIs fight next."

Facts and their carriers:
- **The day** → a ring card, a poster date, a tunnel banner or a programme page.
- **The main event** (the biggest company of the day, by `CAPS`) → a belt, a headliner, the big ticket or the big ring.
- **The rest of the day** → the undercard.
- **The calls** → the four AI faces, each with its own balloon or stamp. It reads "?" while the calls are not in (true today: 0 locked in, 34 to call); once they are in, it shows ▲/▼ and the size.
- **Company identity** → its colour (`brand()`) and its own logo file.

All counts, dates, names, tickers, sizes and colours come from the page (`SE.toCome/byDay/totals`, `TICKERS`, `CAPS`, `CO_LOGOS`). No number is typed.

## Takes

| Take | Idea | Painted layers | Cost |
|---|---|---|---|
| U1 Ringside at dusk | The opener; "Next on the card" in extruded pop letters breaking the frame. The filter is tape on painted ring ropes, the day a yellow ring card. The main event is the championship belt with the company's mark engraved in its gold plate, on the company's colour under a spotlight. The undercard is tickets in each company's colour on painted ticket stock. | belt-blank (cut out), ropes-strip, ticket-stock | $0.087 |
| U2 The fight bill | One two-ink letterpress poster per fight night, pasted on the painted wall. The opener is the bill's picture. Main event in wood type (Rye) with the mark printed in black ink and "4 AIs take on" above; the undercard is the lower billing. The filter is paste-up stubs. | poster-blank (border-image), poster-wall | $0.058 |
| U3 The box office | **Second reading** of "the tab's top": the arena's box office at night. "Next on the card" sits on its painted marquee and the count on the side board, placed on the painted boards by script at any width. The opener shows faintly in the lit window. Every round is a risograph ticket overprinted in the company's colour. | booth-night, stub-riso | $0.096 |
| U4 The ring from above | Every bout is a ring seen from the rafters. The mark is printed in the spotlight, and the four AIs stand in the four corners with their calls. The undercard is a grid of small rings. Day heads are a cloth banner in the walkout tunnel; the filter is three turnbuckle pads. | ring-top, tunnel-walkout | $0.135 (+$0.43 2K, see below) |
| U5 The fight programme | The night's souvenir programme in risograph inks (yellow, red, teal). The opener is printed on the cover. Each day is a page with the main event's tale of the tape: the company's **market cap as its weight** against the four AIs and their calls. The undercard is billing lines with weights. | program-cover, riso-page, riso-spread (desktop) | $0.087 |
| U6 Their name in lights | U1, but the main event opens on its own painting: the company's real mark built as a lit marquee sign over the rooftop ring. It would be one painting per main event, made once like the films. | me-aapl-sign2 (accepted); me-amd-sign, me-amd-sign2, me-aapl-sign, me-aapl-statue (rejected) | $0.42 |

The parts can be swapped between takes, e.g. U4's rings with U1's ropes, or U2's posters with U5's weights (lesson 15).

## How each could fail

- **U1:**
  - The belt is the most "3D" element, but it is the same photo on every main event. Only the plate and the ground colour change, so a week of belts may read as repetition.
  - A multicolour logo on the gold plate is multiplied into the gold and loses its colours.
  - The ropes band shows only one or two ropes on desktop (16:9 crop).
  - The undercard's tiny "?" badges sit on the faces' corners.
- **U2:**
  - Cream poster stock is a pale ground. It is the printed material of the story, but the owner has rejected pale grounds before.
  - Logos print in black ink (greyscale), so Shopify's green and Pfizer's blue are lost (lesson 14).
  - Long names drop to two lines at 320 px.
  - The rotated posters' bounding boxes pass the edge (no sideways scroll; checked).
- **U3:**
  - The lettering on the marquee depends on the crop. It is placed from image coordinates, so it holds at 320 to 1280, but a new booth painting needs new coordinates.
  - The ticket bodies are a tinted cream, close to a pale ground.
  - On desktop the main ticket keeps a large empty lower half.
  - The opener only shows faintly through the window, so it is not "the top".
- **U4:**
  - The spotlight is bright cream inside the ring (scene light, not a box).
  - The undercard grid gets long on a 9-bout Wednesday or Thursday (2 per row on phones).
  - On desktop the undercard column can end well above the main ring.
  - Brand colour is absent (identity comes only from the logo).
- **U5:**
  - Risograph is a new finish for the site. It holds the brand together only through red and gold.
  - "Weight" is a joke that needs one glance to decode (market cap). Companies outside the top 200 in `CAPS` show their ticker instead.
  - Logos print in black.
- **U6:**
  - The image model cannot reproduce marks reliably:
    - AMD's mark came out wrong twice (wrong geometry), so it is rejected and AMD falls back to the belt.
    - Apple's outline is slightly bumpy, because the site's Apple file is only 100 px.
  - Each new main event needs a painting and a letter-by-letter check before it ships; a wrong mark on a company's own card is worse than none.
  - Costs about $0.13 per company at 1K high.

## Checks run

- 390, 1280 and 320 px: no sideways scroll on any take (`scrollWidth == innerWidth`) and no console errors.
- The "over" list in the log names only elements clipped on purpose inside their panel (U1's belt, the opener crop in U3) or rotated boxes (U2).
- Long names are shrunk to fit (`HU.fit`) or allowed two lines.
- Nothing sits over a number or a face.
- The close-up row on the 390 board was zoomed and compared with the hard rules:
  - no native emoji;
  - no white module grounds (except U2's poster stock and U3's ticket stock, flagged above);
  - no full-module dot fill (U1's dots only sit in the panel's shadow corners);
  - name and ticker shown together;
  - no prediction laid on a logo (U4 puts the calls in the corners, the mark in the spotlight).
- Logos:
  - A one-colour mark (Apple, AMD, Palantir) is redrawn from its file as a smooth mask: tile removed, upscaled, blurred and thresholded. It can then be engraved, inked or printed at any size.
  - A multicolour mark keeps its own file and is never drawn beyond its native pixels.

## Hedra jobs

All 1K medium unless noted. Time is submit to done, polled every 5 s. Other areas were spending from the same wallet at the same time, so costs are the estimates; each charge earlier this session equalled its estimate.

| File | Model | Settings | Cost | Time | Result |
|---|---|---|---|---|---|
| img/crowd-dusk.jpg | gpt-image-2 | 16:9 | $0.029 | 29 s | Packed arena at dusk, red and green beams, ropes in front. Strong, but has faces (the prompt said no people). Not used. |
| img/poster-blank.jpg | gpt-image-2 | 9:16 | $0.029 | 30 s | Clean blank 1950s bill, red stars border, empty field. Used in U2. |
| img/belt-blank.jpg | gpt-image-2 | 16:9 | $0.029 | 30 s | Modelled gold belt, big blank plate. Cut out to `belt-cut.png` (hand polygon plus red-fringe removal; the right end's red-lit leather is trimmed, hidden by the crop). U1. |
| img/ticket-stock.jpg | gpt-image-2 | 16:9 | $0.0289 | 31 s | Stack of blank tickets on wood. Used only as paper grain in U1. |
| img/booth-night.jpg | seedream-50-pro | 1080p 16:9 | $0.0675 | 140 s | Art-deco box office, blank marquee, red and green neon. The best 3D-with-ink of the set. U3. |
| img/poster-wall.jpg | gpt-image-2 | 16:9 | $0.0289 | 141 s | Torn blank posters on brick. Used as the wall in U2. |
| img/ring-top.jpg | seedream-50-pro | 1080p 16:9 | $0.0675 | 142 s | Ring from above, spotlight, red and blue corners. U4. |
| img/program-cover.jpg | gpt-image-2 | 9:16 | $0.0289 | 143 s | Riso gloves on a hook, empty left. U5 cover (phone). |
| img/ropes-strip.jpg | gpt-image-2 | 16:9 | $0.029 | 26 s | Three taped ropes and a turnbuckle. U1 filter. |
| img/tunnel-walkout.jpg | seedream-50-pro | 1080p 16:9 | $0.0675 | 114 s | Walkout tunnel, red and green walls, bright ring at the end. U4 day heads. |
| img/poster-wide.jpg | gpt-image-2 | 16:9 | $0.029 | 115 s | Landscape bill with engraved gloves. Not used (portrait posters read better side by side). |
| img/belt-cel.jpg | gpt-image-2 | 16:9 | $0.0289 | 115 s | Cel belt on grey, keyed to `belt-cel-cut.png`. Not used; spare part for a cel version of U1. |
| img/stub-riso.jpg | gpt-image-2 | 16:9 | $0.0289 | 116 s | Blank riso ticket. U3 tickets and filter. |
| img/riso-page.jpg | gpt-image-2 | 9:16 | $0.0289 | 23 s | Yellow riso page, red halftone foot. U5 pages. |
| img/riso-spread.jpg | gpt-image-2 | 16:9 | $0.0289 | 24 s | Riso spread. U5 desktop cover. |
| img/me-aapl-sign.jpg | gpt-image-2 + ref | 16:9 | $0.0412 | 36 s | Apple sign over the ring. **Rejected**: stair-stepped outline (my first reference was too blocky). |
| img/me-amd-sign.jpg | gpt-image-2 + ref | 16:9 | $0.0412 | 36 s | **Rejected**: AMD mark geometry wrong. |
| img/me-aapl-statue.jpg | gpt-image-2 + ref | 16:9 | $0.0412 | 36 s | Granite Apple statue in the ring. **Rejected**: stepped outline. |
| img/me-aapl-sign2.jpg | gpt-image-2 + ref | 1K high 16:9 | $0.1266 | 79 s | Apple sign with bulbs over the rooftop ring at dusk. Accepted with a caveat: the bite and leaf are right, the outline slightly bumpy. U6. |
| img/me-amd-sign2.jpg | gpt-image-2 + ref | 1K high 16:9 | $0.1267 | 79 s | **Rejected** again: the inner block merges with the frame. AMD falls back to the belt. |

References: `ref/AAPL-1024.png`, `ref/AMD-1024.png` (the site's own logo files, cleaned and upscaled), uploaded through `POST /v3/files`.

| img/ring-top-2k.jpg | gpt-image-2 | **2K high** 16:9 | $0.43 (estimate) | about 90 s | The best take's key painting, redone: a true top-down square ring, blue canvas, red/black/black/blue pads, a crowd of tiny silhouettes, strong ink. Replaces `ring-top.jpg` in U4 (crop and corner positions refitted). |

Subtotal at 1K: $0.93. With the 2K render: **$1.36** of the $15 budget.

The budget is barely used, on purpose. The takes needed few, well-aimed paintings. The one place more money would buy more is U6: a painting per main event. It was held back because the model got AMD's mark wrong twice, and paying for more company scenes before that is solved would only buy more rejects.

**Pick:** U4 (each bout a ring with the AIs in its corners: the confrontation reads before any word), then U1 (the belt for the main event).
- `img/belt-cut.png` and `img/belt-cel-cut.png` are PNG cut-outs (they need transparency), made from the JPGs above.
