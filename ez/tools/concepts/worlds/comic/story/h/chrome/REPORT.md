# Round H · chrome: header, film frame, back cover, crawl, loading cover

Boards: `ez/x2p-x3p-h-chrome-390.png` (one row per part: today, then four takes; a close-up row of the header at device pixels) and `ez/x2p-x3p-h-chrome-1280.png` (the same, with the desktop crawl and a close-up row of the crawl).
Run: serve `ez/` on port 8941, then `node run.js <out> now-h,h1,..,h4,now-f,f1..f4,now-b,b1..b4,now-c,c1..c4,now-l,l1..l4 390,1280` (the crawl is shot at 1200 px and wider only); boards with `/usr/bin/python3 board.py <out> <width> <file>`.
Each take is `_ch.css/_ch.js` (shared helpers) + `<take>.css/.js`, laid over the real built X3+ page (`v47-live-x3plus.html`). Mockups only; no live file touched.
`cut.py` cuts the flat black screen out of the four film paintings (flood fill from a seed; the 2K theatre also loses its white surround) and writes `img/*-cut.png`, which were then converted to `img/*-cut.webp` (alpha kept; 59 to 276 KB) and the PNGs deleted.

## Spend: $0.90 of the $10 allowed
21 jobs, every charge equal to its estimate. Twenty 1K drafts (gpt-image-2, medium) and one 2K high (the theatre, picked as the best take). I stopped there: the header and crawl paintings show at 40 to 90 px tall, where 2K adds nothing, and the other frames were not good enough to deserve a 2K. Every prompt ended "No people, no text, no letters, no numbers, no logos, no signs, no writing anywhere."; each image checked at full size: no lettering anywhere.

| Name | Model | Settings | Cost | Time | File | Honest read |
|---|---|---|---|---|---|---|
| hd-skyline | gpt-image-2 | 1K medium 16:9 | $0.0291 | 29 s | img/hd-skyline.jpg | Dusk skyline with an exchange-style colonnade; came letterboxed in white bands (trimmed to 1280x401). Good mood, a lot of detail that a 60 px header turns into texture. |
| hd-ropes | gpt-image-2 | 1K medium 16:9 | $0.0291 | 28 s | img/hd-ropes.jpg | Exactly the asked ropes (red, cream, green) and padded corners; the strongest header material. |
| hd-marquee | gpt-image-2 | 1K medium 16:9 | $0.0291 | 28 s | img/hd-marquee.jpg | Bulb-lit deco marquee with an empty grooved board, red and green neon under it. On brief. |
| hd-cover | gpt-image-2 | 1K medium 16:9 | $0.0290 | 28 s | img/hd-cover.jpg | Aged cover corner with an empty box; reads more like a flat printed sheet than a painting. Weakest. |
| fm-theatre | gpt-image-2 | 1K medium 16:9 | $0.0290 | 27 s | img/fm-theatre.jpg | Toy theatre, crimson left and emerald right as asked, footlights; the 1K draft. |
| fm-theatre-2k | gpt-image-2 | 2K high 16:9 | $0.2217 | 79 s | img/fm-theatre-2k.jpg | The pick: carved gilt arch, velvet with real pile, a blank cartouche; painted on white (cleared by cut.py). Used by F1. |
| fm-tv | gpt-image-2 | 1K medium 16:9 | $0.0291 | 27 s | img/fm-tv.jpg | Walnut console, rounded black screen, chrome knobs. Clean; the screen is the smallest share of the frame (45% of the width). |
| fm-drivein | gpt-image-2 | 1K medium 16:9 | $0.0291 | 28 s | img/fm-drivein.jpg | Dusk drive-in, red tail fins, big black screen. The screen's left scaffold leaked into the cut at a looser threshold; cut at <12 and masked left of 25.5%. |
| fm-torn | gpt-image-2 | 1K medium 16:9 | $0.0290 | 28 s | img/fm-torn.jpg | A comic page with a ragged torn hole on a desk; the curled fibres read well. |
| bk-ring | gpt-image-2 | 1K medium 16:9 | $0.0290 | 28 s | img/bk-ring.jpg | Empty ring under one light; asked confetti and stubs came out as faint specks. |
| bk-stand | gpt-image-2 | 1K medium 16:9 | $0.0290 | 36 s | img/bk-stand.jpg | Newsstand, shutter half down, rack of blank coloured covers. Strong. |
| bk-sunset | gpt-image-2 | 1K medium 16:9 | $0.0290 | 36 s | img/bk-sunset.jpg | Rooftop, water tower, big sunset; very "last panel". |
| bk-bell | gpt-image-2 | 1K medium 1:1 | $0.0532 | 44 s | img/bk-bell.jpg | Brass bell struck by a hammer, ringing lines, red rays. Loud and clear. |
| cw-ticker | gpt-image-2 | 1K medium 16:9 | $0.0290 | 27 s | img/cw-ticker.jpg | Brass-and-glass stock ticker with tape curling out. Good. |
| cw-tape | gpt-image-2 | 1K medium 16:9 | $0.0288 | 28 s | img/cw-tape.jpg | Blank tape strip on wood; added perforation dots I did not ask for (they help). |
| cw-lamp | gpt-image-2 | 1K medium 1:1 | $0.0532 | 36 s | img/cw-lamp.jpg | Red ON AIR box with a blank glass, as asked. |
| cw-mic | gpt-image-2 | 1K medium 1:1 | $0.0532 | 36 s | img/cw-mic.jpg | Chrome broadcast mic, red and green rims. |
| cw-clock | gpt-image-2 | 1K medium 1:1 | $0.0532 | 45 s | img/cw-clock.jpg | Station clock with no numerals and a red second hand. |
| ld-curtain | gpt-image-2 | 1K medium 9:16 | $0.0290 | 27 s | img/ld-curtain.jpg | Closed crimson curtain, one round spotlight, gold fringe. |
| ld-press | gpt-image-2 | 1K medium 9:16 | $0.0290 | 27 s | img/ld-press.jpg | Press roller, yellow and red ink trays, blank paper. |
| ld-ringnight | gpt-image-2 | 1K medium 9:16 | $0.0290 | 28 s | img/ld-ringnight.jpg | Top-down ring under one lamp; the ropes read red, cream and green. |

## Data (live; nothing typed)
- Issue number (H2, L2, L4) = `ROUNDS.length`, the cover's own rule ("No. 80 reports graded").
- The pill's words are the page's own `#liveTxt` ("Next: PLTR"), restyled only.
- Running time in every film frame = the page's `.vt-s` ("1:20").
- The crawl keeps the page's own rows (season P&L, graded day, calls due, next bell); takes only re-dress them.
- Every word on every take is page text; the logo is the page's own traced svg, cloned. No logo, word or number in any painting.

## The takes
Header (sticky; height at 390 / 1280, today 107 / 58 px):
- **H1 Masthead** (86 / 62): a painted dusk skyline of exchange towers behind an extruded, hand-lettered "Earnings Zeason" (every letter its own angle and baseline, E green, Z red); the three tabs are paper tags cut along a newsprint foot strip; the pill an ink box.
- **H2 Cover corner box** (75 / 86): the header is the cover's top band on newsprint; the logo sits in the classic corner box with "No. 80" (live) and "Free"; the tabs are the cover's contents line divided by red stars, the open one an ink slab; the pill a red price burst. The cover strip's own "No. 80" is hidden in this take so the issue is said once (if picked, the cover strip loses that cell).
- **H3 Ringside** (93 / 64): three painted ring ropes; the tabs are fight tags clipped to the bottom rope with little steel clips; the name extruded in red.
- **H4 Marquee** (96 / 88): a painted bulb-lit marquee; the name set letter by letter in slab tiles on its board; the open tab lit like a bulb; the pill a red neon sign.

Film frame (the film plays through the painting's cut-out screen; film at 390 is 309 x 174 in every take, 1280 is 439 to 450 wide; today 316 and 504):
- **F1 Toy theatre (2K)**: crimson and emerald curtains, gilt arch, footlights; a gilt plaque "[logo] presents" on the arch, a velvet banner "How it works · 1:20" on the apron.
- **F2 Console TV**: walnut 1960s set; "How it works" on a strip of masking tape across the top; the running time on a black knob tag with a red on-air dot.
- **F3 Through the page**: the film seen through a hole torn in a comic page; a yellow caption box presents it; the running time in a red-and-gold burst at the corner.
- **F4 Drive-in**: the film on the big screen at dusk, tail fins below; a bulb-lit letter board at the foot carries "[logo] presents / How it works / 1:20".

Back cover (motto, Follow the story on X and the fine print stay page text):
- **B1 Closing bell**: the round ends on a struck brass bell; the motto rings out of it as a hand-lettered sound effect; Follow is a ticket.
- **B2 After the fight**: the empty ring; the motto in a yellow caption over the dark stands; Follow hangs as a tag clipped on.
- **B3 Closing time**: the newsstand's shutter half down, the motto lettered on the slats; Follow is a gold sticker.
- **B4 The last panel**: a rooftop sunset; the motto lettered big into the sky; Follow is the closing caption.

Crawl (desktop only):
- **C1 Ticker**: the crawl is paper tape (painted tape texture) spooling out of a painted brass ticker at the left; the next bell beside a painted station clock.
- **C2 Studio**: a painted ON AIR lamp at the left glows slowly ("On air" is page text on its glass); the items in Bangers; a studio clock for the bell.
- **C3 Caption chain**: every crawl item rides on its own hand-cut caption box (yellow, cream every third); a painted mic at the left.
- **C4 Marquee**: the crawl runs along H4's painted bulb board (one family with H4); On air in red neon; the bell on a lit plate. No new painting.

Loading cover:
- **L1 Curtain call**: the logo stands in the spotlight on the closed curtain (on lift the curtain would rise; not animated in the mockup).
- **L2 Off the press**: the logo and "No. 80" come off an inked roller onto the page.
- **L3 Ring at night**: the logo printed on the canvas in perspective under one lamp.
- **L4 Cover corner**: the logo in the cover's corner box with "No. 80" and "Free" (H2's family). Reuses hd-cover.

## How each could fail
- **H1:** the skyline's detail turns to mush at 60 to 86 px; the name needs the dark wash on the left to read, which flattens the painting there. The extruded name is the header's loudest thing, so the cover's own "Trade earnings" headline right under it now competes (lesson 71).
- **H2:** the contents-line tabs are small (10.5 px at 390) and below the 44 px tap target unless padded; "Free" is a claim about price: true of the site, but it could be read as the coin being free. Repeats the cover's issue strip (hidden here; picking it means changing the cover).
- **H3:** the steel clips and tags are hand-drawn but small; the ropes painting is dark, so the sticky header becomes a dark band over a light page, a big change in tone at the top.
- **H4:** the tallest on a phone after today (96 px); the letter tiles at 12.5 px are close to the limit of legibility; bulbs are part of the painting, so at other widths the board crops differently (checked 320, 390, 1280 only).
- **All headers:** the painting adds a 70 to 180 KB image to the first screen; on a slow phone it arrives after the header draws (flat colour first). Not checked in Safari (`-webkit-text-stroke` on per-letter spans).
- **Film frames, all:** the frame costs film size: 309 px wide on a phone against today's 316 (2% less), 439 to 450 on desktop against 504 (11 to 13% less). The holes are not 16:9, so a thin black band shows above and below the film in F1 to F3 (it reads as stage darkness or a TV's letterbox); in F4 the screen is wider than 16:9, so the frame covers about 3% of the film's height. Painted holes have irregular edges: at the corners the painting overlaps the picture by a few pixels; the sound button stays clear in all four at 390 and 1280.
- **F1:** the gilt plaque sits on the arch over the film's top edge; a film whose title card sits high could be touched. The 2K WebP is 276 KB.
- **F2:** the TV's knobs fall outside the ring on a phone, so it reads as "a rounded bezel" more than "a TV" there.
- **F3:** the torn hole is the loudest frame; with the cover's loop panels above it, the first screen may get busy.
- **F4:** the tallest: the cars need about 100 px under the film on a phone; the letter board's bulbs are a dotted CSS outline, the one effect in the round that is not hand-drawn.
- **Back covers:** each panel adds 120 to 250 px to the page's end; B1 on a phone is a square (462 px). The motto lettered in the art (B1, B3, B4) is decorative type: B3's slab letters on the shutter are the least legible. The fine print stays plain text under the panel (on the page's cream, outside the panel).
- **Crawl:** C1 and C2's paintings stick up above the 50 px bar (to 92 px) at the left end, over whatever card is under them; C2's lamp glow is an animation (still with reduced motion). C3 draws an svg per item, about 30 svgs in the crawl (the row is duplicated for the loop).
- **Loading covers:** a painting on the loading screen has to load before it shows, which is exactly when the page is slowest; in a build it must be inlined small (under 30 KB) or the logo shows on flat colour first. L2 and L4 show "No. 80" only once ez-data.js has run (in the real cover the number would be filled by a tiny inline script).

## Checks run
- 320 (headers and back covers), 390, 1280 px: no sideways scroll, no page errors, no console errors (failed-resource lines filtered: none came from the takes). Film size, header heights from the page itself (`run.js` prints them).
- Zoomed every take at device pixels: letters of the jigged names each turn on their own baseline; the takes' outlines are drawn per element (seeded wobbly paths with a thick outer and a thin inner ink); no lettering inside any painting.
- Skill rule 0 list: no white grounds inside a module (the fine print sits outside the panels), no native emoji, no dots over a whole module, nothing laid on a logo or a face. Not done: compare against a printed comic page beside the screen (no page at hand); the boards were compared with the cover's own pop panels instead.
