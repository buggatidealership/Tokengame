# Round H4 · ground3: the page's painted ground, the cuts between sections, and the loading cover (2026-10-31)

Mockups only, laid over the built `ez/v47-live-x3plus.html` by `run.js` / `loadshot.js`. No live file changed.

Boards:
- `ez/x2p-x3p-h4-ground-390.png`, `ez/x2p-x3p-h4-ground-1280.png`: the whole Overview, today's live first, then A to D; under them a close-up row of the four cuts per take (cover to Meet the models, Meet the models to Every round so far, Every round so far to Smart or lucky?, Smart or lucky? to Bet #1).
- `ez/x2p-x3p-h4-loading.png`: the loading cover, today's (L3 ring) first, then Lh, Ls, Lc; phone 390x844 and desktop 1280x800.

## The want, as I read it
The owner's bar is the painted newsstand rack (`media/rack-r6c.jpg`) and the NVIDIA die count: one painted pop-comic world, 3D first with a comic finish (modelled, lit, ink line, halftone only in shadows, yellow/red starbursts, deep navy night). The doors behind Meet the models failed because they were a different style (lesson 76). So every take here paints every section in the rack's own recipe (a subject in front of a jagged yellow and red starburst at night) and changes only how the page is cut. The parts are separable (lesson 15): the backdrops (ring, searchlights, coin, street, night tile) can go with any of the four cuts.

What every take keeps: every live section and its content (founder portraits, the rack and Golden Age tiles, the chart, the bet), the two beat captions' words, every word as page text. What every take replaces: the cream dot-grid page and today's CSS ray fills (orange, blue) with one painted night (a tiling ink-and-halftone navy, `g-night-tile`), and gives Meet the models and Smart or lucky an establishing strip (about 46vw on phones, 250 px on desktop) above the headline where the painted subject shows. Every round so far keeps the rack as its subject and gets a wet neon street under it. The bet keeps its own painted vault and board.

Two readings of "a backdrop per section, Meet the models above all": the ring (the competition as fight night, same world as the green room film) and the searchlights (four beams, one per AI, in the AIs' colours, over the rack's city). A and C use the ring, B and D the searchlights.

## The takes
- **A · Fight night (ring ropes).** Ring for Meet the models. Cut: the ring's three ropes (red, cream, green) with gold turnbuckles and a corner post cross every seam; drawn per rope (ink tube, dark side, colour, twist strokes, a broken highlight). The beat captions sit under the ropes.
- **B · Searchlights (burst edge).** Searchlights for Meet the models. Cut: each section ends on a jagged starburst edge (yellow outer spikes, red inner spikes, ink) drawn spike by spike from a seed, the rack's own burst; the beat caption rides it.
- **C · Panels on the night page (gutter captions).** Each section is one hand-inked panel (wobbling thick outer and thin inner border) with its scene inside, tight gutters on the painted night, yellow captions cut by hand riding each gutter: "Meanwhile, at the arena…", "Down at the newsstand…", then the page's own two beats. Ring for Meet the models.
- **D · Torn reveal.** The night page tears open onto each scene: a torn edge cut from seeded points with the card's cream core and fibres; the scene behind pushes in as you scroll (scroll-driven, `animation-timeline:view()`; still with reduced motion). Searchlights for Meet the models.

## Loading cover takes
All: total dark, one lamp, the page's own EZ. logo (svg, never painted) standing in the lamp's pool, lit by it (a warm rim on its top edge, a glow, a cast shadow); the logo keeps today's breathing.
- **Lh · hanging factory lamp** (painted, 720x1280 and 1280x720).
- **Ls · the street lamp**, the newsstand scene's own lamp post, ties the cover to the rack (painted).
- **Lc · drawn lamp, no image**: a hand-cut tin shade in the logo's green, a warm cone whose edge breaks into halftone dots, the pool; 0 KB. Note: in the mockup it is drawn by script (`load.js`); live it would need to be inline SVG in the cover markup, since the cover shows before any script runs.

## Cost
Hedra: **$1.73** of $12 (8 gpt-image-2 2K high scenes at $0.222, the night tile at $0.053, 4 lamp images at $0.029).

Page weight added (web JPGs q76; the openers and today's grounds not counted):
| Take | Phone | Desktop |
|---|---|---|
| A, C (ring, street, coin, tile) | 852 KB | 1.6 to 1.9 MB |
| B, D (searchlights, street, coin, tile) | 921 KB | 1.8 MB |
| Lh / Ls / Lc | 93 / 100 / 0 KB | 73 / 66 / 0 KB |

Page height at 390 (today 6,712 px): A 7,145; B 6,959; C 6,871; D 7,198. The establishing strips are most of it.

Scroll on a 4x slower CPU was not measured this round (ground2 measured similar painted backgrounds and found no change outside noise; D's push-in is a scroll-driven transform like ground2's E, which added long frames there).

## How each could fail
- **All:** the painted scenes show mostly in the establishing strips and the gutters; on a phone the cards cover the rest, so the ground reads as "dark navy" between cards. The bursts repeat the rack's burst three times down the page (ring, coin, rack); the rack loses some of its uniqueness. The painted night tile is darker than today's cream, so the cover panel (still cream) now stands as a bright block at the top.
- **A:** the ropes are a strong device; on desktop, where sections sit two to a row, they run under a whole row and read more as a divider than a ring. Five sets of ropes may tire.
- **B:** the burst edge is close to a stock zigzag at a glance (it is drawn spike by spike, but small). The searchlights carry the four AIs' colours only if the visitor makes that link; Grok's beam is gold, not its own colour.
- **C:** closest to ground2 B, the owner may read it as the same idea; the captions are my story copy and need the owner's eye.
- **D:** the torn edge is subtle on the dark night (dark on dark), the weakest cut of the four at a glance; the push-in costs scroll-time work.
- **Lh / Ls:** the logo's black disc on black needs the rim light to separate; on a dim phone screen it may sink. A painted image arrives after first paint, so for a moment the cover is plain black (fine: "total dark" is the brief).
- **Lc:** clean, but drawn by code; next to the painted pages it is the least painted.

## My pick
**A** for the ground: fight night is the story the site already tells (the green room film, the golden ticket, "Who's winning"), the ring under the burst is the rack's own finish, and the ropes are the one cut a visitor reads as "next round" without a word. B's searchlights are the better Meet the models picture if the owner wants the four AIs in the backdrop; swap them in (parts are separable).
**Ls** for the loading cover: one lamp, total dark, the logo in its light, and the lamp is the newsstand's own, so the first thing seen belongs to the page that follows. Lc if the cover must paint in the first frame with no image.

## Checks run
- 320, 390 and 1280 px, every take: scrollWidth equals the viewport, no page errors.
- Every cut zoomed at full resolution; fixed after the first pass: the painted subjects were hidden behind the headlines (added the establishing strips), B's beat captions went dark and its burst was too thin, D's tear was too faint, C and D lost the strip to their own padding rules, Lc's lamp svg was shrunk by the cover's own `#x2pLoad svg` rule and its halftone sat off the cone.
- Rule 0: no white or pale grounds inside modules; no emoji; no module filled with dots (the halftone sits in the scenes' shadows and the night tile varies in clouds); nothing over a face, a logo or a number; no text in any generated image (every prompt ends "No text, no letters, no numbers, no logos..."; the rack street's shop windows came out blank).

## Hedra jobs
Prompts and job ids in `jobs.jsonl`; jobs built by `mkjobs.py`.
| File (img/) | Model | Settings | Cost | Time | Note |
|---|---|---|---|---|---|
| g-ring-phone / -desk | gpt-image-2 | 2K high 9:16 / 16:9 | $0.222 each | 74 / 80 s | Empty ring, red and green ropes, lit posts, starburst; the rack's finish, the strongest |
| g-beams-phone / -desk | gpt-image-2 | 2K high | $0.222 each | 80 / 79 s | Four beams over water tanks and a burst; reads well, slightly busy |
| g-coin-phone / -desk | gpt-image-2 | 2K high | $0.222 each | 75 / 74 s | Gold coin edge-on over the burst and a green felt table; the lamp at top left echoes Lh |
| g-street-phone | gpt-image-2 | 2K high 9:16 | $0.222 | 81 s | Wet neon pavement, colour streaks; good under the rack |
| g-night-tile | gpt-image-2 | 1K medium 1:1 | $0.053 | 114 s | Navy ink with halftone clouds; seam fixed by seam.py |
| l-hang-phone / -desk | gpt-image-2 | 1K medium | $0.029 each | 61 / 24 s | Enamel factory lamp, clean cone and pool |
| l-street-phone / -desk | gpt-image-2 | 1K medium | $0.029 each | 46 / 42 s | Cast-iron street lamp, warm lantern |

## Files
`g3.css`/`g3.js` the shared ground (night tile, backdrop layer, establishing strip); `a`..`d` `.css/.js` the takes (`window.__G3BG` picks each section's scene); `common.*`, `run.js`, `board.py`, `hedra_gen.py`, `seam.py` from ground2; `load.css`, `load.js`, `loadshot.js`, `loadboard.py` the loading cover; `takes.json` the board labels; `img/` originals, `img/web/` what the mockups load.

## Owner's picks and the tile round (2026-10-31, evening)
- **Loading cover: Lh, the hanging factory lamp** (owner: "I will go for hanging factory lamp"). Lc, the lamp drawn in code, is out ("horrible... not even worth a try" next to the painted ones): a code-drawn object beside painted ones reads cheap, so it is not offered again. Lh is not built into the live page by this helper (mockups only); files `img/web/l-hang-phone.jpg` (93 KB) and `-desk.jpg` (73 KB), CSS in `load.css` (`.g3l-h`).
- **Page ground (A to D): no pick yet.**
- **Every round so far, no-film rounds** (owner: no placeholder picture, "just the logo, but... hand-drawn, hand-crafted"): the six rounds without a film (R67 Caterpillar, R71 Starbucks, R75 Coinbase, R77 Chevron, R79 AstraZeneca, R80 Exxon Mobil) each get their real logo painted by gpt-image-2 (the logo file as the reference) as a raised enamel sign in the comic finish on its brand colour (`tiles/img/n*.jpg`, 1K medium 3:4, $0.049 each, $0.30). Lettering checked: CAT and STARBUCKS COFFEE spelled right; Chevron's two chevrons are a little thicker than the real mark and AstraZeneca's swirl is redrawn from a 64px source, so a closer look against the real marks is due before going live. The owner: "really sharp and crisp". On those tiles the masthead goes (the logo is the cover, one carrier), the logo sits at 66% of the art's height between the winner coin and the move ribbon, the coin moves up into the masthead's place, and the ground around the image takes the image's own edge colour.
- **The masthead's logo fit** (owner: the logos do not fit the oval; smaller, or a new shape): boards `ez/x2p-x3p-h4-tiles-{390,1280,320}.png` (today, K1, K2, K3), files `tiles/tiles.css`, `tiles/tiles-run.js`. K1 the same oval, the logo inside its inner box; K2 no oval, the logo die-cut as a sticker on the red banner (biggest, but dark logos like Amazon's turn into white blobs); K3 the banner in the company's colour with a wide hand-cut plate. My pick: K3 (the brand colour is the fastest carrier for the company, lesson 14, and the wide plate fits wordmarks and round marks alike), with the painted logos on no-film tiles. Checked at 320, 390 and 1280: no sideways scroll, no errors.
- Hedra spent in all: $1.73 (ground and lamps) + $0.30 (logos) = $2.03 of $12.

## The proof ticket, painted (owner, 2026-10-31, evening; mockups, waiting for the owner)
The brief, in the owner's words: the X2+ ticket (P&L, Accuracy, Target hits, Sector, its switch and its unfolding) "completely upscaled" in the comic world with Hedra; not pasted on, "a painted ticket held in a painted scene... interactive"; the Overview gets the P&L view only, in place of "Smart or lucky?"; the Leaderboard gets all four, in place of its V1 "Smarter or just lucky?" section.
- **How it is built** (`ticket/tk.js`, `tk.css`, runner `run.js`, recorder `rec.js`, boards `board.py`): the ticket's paper is a Hedra painting (`img/tk-paper.webp`, green band, red band, teeth, double frame, keyed off magenta) laid as a CSS border-image (top and bottom stretch, the toothed sides repeat, so the teeth never stretch at any height). Everything on it is page text and SVG drawn from the page's own data at load (`__x2pPnl().A`, ROUNDS, RMETA, MODELS): the P&L lines and rows (Last 7d, P&L), Accuracy (the running hit rate from 50/50, coin flip line, calls, W, L, hit rate), Target hits (rings and one hole per right-way call at its miss; bullseyes, within 1%, off target), Sector (right of made, best in each row outlined). Ranks follow the live rules (P&L; hit rate with the half-the-rounds rule; bullseyes, then within 1%, then fewer off). Hand-drawn: the ruled grid, the target rings and the tabs are seeded wobbly paths, so the same shape every load. The four views share the tallest one's height, so the ticket never jumps.
- **Three takes** (boards `ez/x2p-x3p-h4-ticket-390.png`, `-1280.png`, switching `ez/x2p-x3p-h4-ticket-switch.mp4`, A | B | C at 390px):
  - **A Under the lamp:** the desk under the hanging factory lamp (the same lamp as the picked loading cover, Lh); the ticket lies in the lamp's pool, turned a degree; the views are card index tabs standing off its top edge, the open one green like the band; a switch punches a hole in the tab, the old view leaves left, the new one feeds in from the right like a ticket through a gate, the ticket lifts off the desk a hair and the lamp flickers once.
  - **B At the teller's window:** a brass betting window between a red and a green lamp, the ticket on the marble; the views are four rubber-stamp handles; a switch brings a stamp down on the ticket (a thud), and the new view is printed with a short ink spread.
  - **C A comic page:** the kiosk at night is the establishing panel, the ticket panel breaks out over its edge (beside it on desktop); the views are yellow caption boxes; a switch turns the view like a page with a halftone shade sweeping off it.
  - All three: on first sight the lines draw in, the end figures fade in, the rows and holes step in (once; nothing moves with reduced motion; arrow keys move between tabs).
- **My pick: A.** The lamp ties the ticket to the loading cover, the desk is the one scene where a ticket naturally lies flat and lit, and the index tab is the most readable switch (four labels in one row, the open one obvious). C second: it is the most "comic page" and the best desktop layout.
- **How each could fail:** A's desk props hide behind the ticket on a phone (only the lamp and the pool read), so the scene is mostly a light; B on desktop leaves dark room below the painting beside the long ticket, and its stamp is a code-drawn object (lesson 80 says not beside painted ones; a painted stamp would be needed before shipping); C's two panels make the section the tallest on a phone (734px at 390). The Accuracy lines jump about in the first rounds (they start at 50/50 and move a lot on few calls; true to the data).
- **Checks:** 320, 390 and 1280px, all takes and views: no sideways scroll, no page errors, nothing past the ticket's inner frame at 320 (measured), names at least 10px clear of the figures at 320.
- **Hedra:** gpt-image-2, 2K high, $0.222 each: tk-lamp phone and desk, tk-booth phone and desk, tk-stand phone (the desktop version was refused twice by the provider's moderation, so C uses the phone painting on desktop too), two blank tickets (the second keyed into the paper). Job log `ticket/jobs.jsonl` (up to $2.22, failed jobs included).
- **Not done:** the Leaderboard tab's other V1 sections (the race, Back issues) are untouched; not built into the live page.
