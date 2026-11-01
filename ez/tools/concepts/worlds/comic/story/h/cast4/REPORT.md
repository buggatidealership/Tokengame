# Round H11 · cast4: Meet the models, today's cards redrawn as painted tickets, hung in a world

Brief: `../BRIEF-H.md`, "Round H11", `cast4`. Mockups only: nothing in `ez/tools/v22/` or `ez/v4*.html` changed; nothing deployed, published or opened as a PR.

## Boards and video
- `ez/x2p-x3p-h11-cast4-390.png`: today's live section first, then three worlds. Each column shows two phone screens (arriving, then one scroll down), with the world behind whatever is on screen. A close-up row at 2x shows the #1 ticket in each world.
- `ez/x2p-x3p-h11-cast4-1280.png`: the section at 1280 (shot at 1x), today first, then the three worlds.
- `ez/x2p-x3p-h11-cast4.mp4` (27 s, 390px) and `ez/x2p-x3p-h11-cast4-1280.mp4` (14 s): the pick, scrolled at reading speed with holds. The founders' loops play inside the painted frames; each P&L counts up on its quote board; the last five lamps light one by one, oldest first.

## What changed against today, and what did not (lesson 101)
**Kept** from today (`pop_p1.*`, `pop_founders.*`), in the same places and taking the same room:
- the left stub with the rank and "Season 1" ("Golden ticket" and a gold stub for #1);
- the model's mark, name, version and flag;
- the founder's living portrait (`media/founder-<m>-anim.mp4`, unchanged) in the card's top right;
- the P&L, Right way, Best call (company and ticker) and Last 5.

Also kept:
- the order (the page's own P&L rank);
- the heading in the Overview's one face (`.ez-hd`);
- the line "Not the Instagram kind. Ranked by P&L: $100K on every call.".

Cards are 3:4 on phones (362x483 at 390; today 335x463) and 9:16 on desktop (256x455; today 256x495). The section is 2160 to 2171px tall at 390 (today 2117), and 841 to 856px at 1280 (today 685: the painted sign under the heading adds a row).

**Redrawn:** every element is now painted by hand, as one ticket per model in the model's own colour (lessons 14 and 48):
- each field is a real object of that world: a gold ribbon, a brass tag, a plaque, a quote board, a prize sign, lamps or ovals;
- the frame is a drawn frame with its window cut out, so the founder's loop plays inside it like a living painting (the Harry Potter frames);
- the flags are painted (Silver Age, waving);
- the right and wrong marks are painted rubber stamps;
- the cards sit in a painted world: on phones a sticky plate you walk past as you scroll, on desktop the wide plate across the section.

The card is about the model: its name, record and colour fill the ticket. The founder is the face in the frame (lesson 102). No new characters.

## The three worlds
All in the Silver Age line with flat print colours: a clean brush-and-nib line, flat bright colours, Ben-Day dots only in a few shadows, plates a hair out of register. All are bright and in daylight. No noir (lesson 98), no beige.

| Take | World | Frame | Where the numbers live | Last 5 |
|---|---|---|---|---|
| A | **The portrait gallery**: a red-walled museum hall, chandelier, 1960s visitors pointing at the frames | carved gilt frame with a picture lamp | P&L engraved on a big brass plaque; Right way and Best call on two small brass plates | five velvet ovals in gilt frames, each takes a green tick or red cross stamp |
| B | **The trading floor**: a 1960s exchange, teal walls, red columns, traders waving slips, a blank quote board up high | mahogany boardroom portrait frame with a green banker's lamp and brass plate | P&L lit on a black quote board; the two smaller figures on two smaller boards | five floor lamps light green or red, with a small stamp in each |
| C | **The midway**: a sunny seaside carnival, striped tents, Ferris wheel, roller coaster, crowd | funhouse mirror frame ringed with bulbs | P&L on a red prize sign ringed with bulbs; the two smaller figures on two blue booth signs | five big bulbs light green or red, with a small stamp in each |

The tickets are drawn per world: a museum admission ticket, an exchange floor ticket with rivets, and a scalloped carnival ride ticket.

## The painted surface under every live text
Every word and number is page text: live, and set into a blank surface the painting leaves for it. No text is baked into the art.

| Live text | Surface |
|---|---|
| rank `#1` to `#4` | the stub's blank round seal (gold); on #1 the gold-foil golden stub, painted separately and laid exactly over the ticket's own stub, so it follows whoever leads |
| "Season 1" / "Golden ticket" | the stub's tall blank strip (gold) |
| model mark (the logo path from `MODELS`) | the blank gold medal (A), brass badge (B) or carnival token (C), printed in ink with a colour plate a hair off register |
| name | the blank gold ribbon (A) or yellow pennant (B, C) |
| version | the blank red enamel tag (A), punched brass tag (B) or red booth tag (C); the painted flag hangs beside it on the ticket stock |
| P&L | the big brass plaque (A), quote board (B) or prize sign (C) |
| Right way, Best call, company (ticker) | the two smaller plates, boards or signs |
| Last 5 | the five painted ovals, lamps or bulbs; the "Last 5" label sits on the ticket's own printed stock |
| "Not the Instagram kind…" | the world's own sign: a gilt museum placard (A), a chalk slate on a post (B, set in a chalk hand), a barker's sign ringed with bulbs (C) |

The painter does not put fields exactly where the guide asks. On desktop it drew the frame larger and pushed every field down. So the mockup measures each painting rather than trusting the guide:
- `fields.py`: finds each field by its material's colour (gold, brass, black board, red sign, blue board), shifts the guide to the best fit, and takes the matching block;
- `measure.py`: finds the five lamps or ovals, and the medal;
- the frame's window is taken from the cut-out's hole.

Two exchange desktop tickets have halftone-shaded lamps the colour test misses. Those were set by eye (`HAND` in `measure.py`).

## My pick
**B, the trading floor.** The reasons:
- It is the only world where every number already has a natural home: money on a quote board, results as lamps on the floor, the firm's founders as boardroom portraits on the exchange wall (lesson 85).
- It opens on an exchange full of traders, the same kind of room as Smart or lucky's big board (`h_sol`, a 1920s exchange). Meet the models then hands over to the next chapter in the same world (lessons 63 and 93).
- The lamps lighting one by one have a meaning: the last five results coming in, in order (lessons 5 and 43).

**Second: A, the gallery.** It is the most literal living portrait (a gilt frame on a red museum wall) and the closest to what the owner asked for with the Harry Potter frames. Its brass is glossier than flat print.

**C, the midway,** is the flashiest. Its frames read as funhouse mirrors more than paintings.

Not repainted at 2K: at 1K the painting has more pixels than the card shows on a phone (768px of paint for 724 device pixels at 390) and on desktop (576 for 256). Per lesson 83 (rough first, paint last), the picked world's 8 tickets, gold stub and plates should be repainted at 2K only after the owner picks: about $0.43 each at 2K high, about $5 in all.

## How each take could fail
- **All three:**
  - The painted fields sit where the painter put them, which differs per ticket by a few pixels, so the four cards are not pixel-identical in layout. Measured fits put every figure inside its plate: no text overflows its field at 320, 390 or 1280. A new painting needs `fields.py` and `measure.py` rerun, and an eye on the overlay.
  - The rank, the gold stub and every number follow the data. The ticket's colour and painting are per model, so they don't need to change when the order changes.
  - Two things are still code effects, which lesson 80 warns against beside painted pieces. Both are flagged for a painted version:
    - the hard ink shadow under each ticket (a CSS drop-shadow);
    - the coloured glow on a lit lamp or bulb (a CSS radial gradient over the painted bulb). The fix is to paint each bulb lit green and lit red, at about $0.05 a world.
  - On phones the world is a sticky plate behind the tickets. Between cards you see the same part of the scene (the plate does not scroll), so it reads as "standing in the room", not a scene that changes. On iOS Safari a sticky child inside an `overflow:clip` section should work but is untested here.
  - The flags are painted. The US flag's star and stripe counts are approximate, as drawn by the model (comic licence). The China flag's five stars are correct.
  - Desktop shows the painted plate above the cards. The midway's right half is open sky, which is art rather than an empty box, but it is a lot of it. The exchange's blank quote board up high is an unused surface that could carry the sign's line instead of the separate slate.
  - Today's live shot shows the P&L before its count-up (the live card counts once scrolled into view). That is not a data error.
- **A:** the brass plates have an airbrushed metal gradient, smoother than the Silver Age flat print; the most likely to read as "a different finish".
- **B:**
  - Black boards inside a bright ticket are the darkest element on the card.
  - The version tag (brass) is the lowest-contrast text, about 10px at 390.
  - The chalk face on the slate (Permanent Marker) is a second lettering face in this section (lesson 91). The other two worlds use the Overview's Bangers.
- **C:**
  - Red prize signs on Claude's orange and on the red half of the stub sit close in hue.
  - The bulb frames read as mirrors, not paintings, so the "living portrait" idea is weakest here.
  - The scalloped ticket edge competes with the bulbs.

## Checks run (rule 0 and the hard rules)
- 320, 390 and 1280px, all takes:
  - `scrollWidth` equals the viewport;
  - no console errors;
  - no text box spills out of its field (`over: []`; the fitter steps type down until it fits).
- No white or pale ground inside a module. The fields are brass, black, red, blue or gold; the only pure white was the frame windows, which are cut out and filled by the portraits.
- No box in a box drawn in code; no emoji (the ticks and crosses are painted stamps); no dot pattern as a ground.
- Nothing laid over a face or a logo. The model mark sits on its own painted medal; company names are in text with their ticker ("Reddit (RDDT)").
- Zoomed in at 2x and compared by eye with the Silver Age plates. Not compared with a printed comic page beyond the model's own output.
- Reduced motion: the loops are hidden (the poster is shown, as on today's site), and the count-up and lamp sequence do not run.

## Method
- `guide.py` writes the layout guides from `layout.json`, one per aspect and model colour: the stub, the frame's window in white, and grey field shapes. Guides in `guide/`.
  - First test: with yellow guide boxes the painter drew flat yellow boxes (`img/test/`). The fix was to describe every field as an object of its world.
  - Second test: with one orange guide for every model, the exchange tickets all came out orange (`img/rej/`). Hence one guide per model colour.
- `batch.py`: gpt-image-2, 1K, medium, png.
  - Tickets use the guide as their reference image; prompts are in `W` (per world) and `FIELDS`.
  - Every prompt ends "no text, no letters, no numbers... no logos".
- `hd.py` is the Hedra v3 client (from cast3; never prints the key).
- `cut.py` cuts each piece out of its white ground. Tickets keep their size, so the layout fractions still map; their frame window is made clear.
- `fields.py` and `measure.py` measure the real fields (`fields.json`, `fit.json`).
- `take.js <out> <W> <now|gal|ex|mid,...> [--video]` (serve `ez/` on port 8941) builds the take inside the live `.wc-chars` section. Today's cards are hidden; one screen-reader line per model is kept. It shoots three phone screens or the desktop section, and records the video.
- `board.py` makes the boards.

## Cost: $2.37 of $10 (55 jobs, 0 failed)
| What | Model | Settings | n | Total |
|---|---|---|---|---|
| tickets (3 worlds x 4 models x 2 aspects, plus 2 tests and 8 repaints) | gpt-image-2 | 1K medium, 3:4 or 9:16, 1 guide ref | 34 | $1.59 |
| golden stubs (3 worlds x 2 aspects) | gpt-image-2 | 1K medium, 1 guide ref | 6 | $0.27 |
| world plates (3 x phone 9:16 + desktop 16:9, plus the exchange repainted off its beige wall) | gpt-image-2 | 1K medium | 8 | $0.24 |
| signs (3) | gpt-image-2 | 1K medium, 16:9 | 3 | $0.09 |
| tick and cross stamps | gpt-image-2 | 1K medium, 1:1 | 2 | $0.11 |
| US and China flags | gpt-image-2 | 1K medium, 4:3 | 2 | $0.07 |

Timing: a median of 43 s per job, 8 to 10 in parallel. Every job is in `jobs.jsonl`. The raw PNGs (`raw/`) and the screenshots (`shots/`) are not committed.

Per take, the plates cost: A $0.66, B $0.88 (repaints included), C $0.71, plus the shared flags and stamps.
