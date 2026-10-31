# Round H2, area `cards2`: Meet the models cards, painted grounds x cut paper or ink brush

Brief: `../BRIEF-H.md` (Round H2: "Current P&L in the 3D pop lettering. Right way and Best call in cut paper or ink brush line (make both). The card's own background... painted and rich"). Six takes laid over the real built X3+ page (`ez/v47-live-x3plus.html`) in Playwright, every number from the page's own globals through `POP.data()` (`__x2pPnl`, ROUNDS, MODELS); nothing typed.

Boards: `ez/x2p-x3p-h2-cards-390.png` (today, then A1 to C2, then a 3x close-up row of each take's #1 card) and `ez/x2p-x3p-h2-cards-1280.png` (stacked).

How to run: serve `ez/` on port 8931 (`python3 -m http.server 8931`), then `node run.js <out> now,a1,a2,b1,b2,c1,c2 390,1280,320` and `/usr/bin/python3 board.py <out> 390 <png>`. Files: `_k.js` (one builder; `window.KCFG={bg,inner}` picks the take), `_k.css`, `run.js` (loads `../cards/_c.js`/`_c.css` for the shared helpers: portraits, brush strokes, tick and cross, the opener mount), `hedra.py`, `jobs*.json`, `jobs.jsonl`.

## What every take shares
- **One card layout** (the information as today, nothing dropped): rank top left, the model's mark and name, version and flag, role chip; the founder's animated portrait (`media/founder-<m>-anim.*`, muted loop, the poster alone with reduced motion) in its own frame top right (on desktop on top, full width); then **Current P&L**, then Right way and Best call side by side, then Last 5.
- **Current P&L is the one loud thing on the card:** `POP.ext`, the site's extruded, lit pop lettering (gradient fill, ink outline, stacked extrusion, white highlight), green for a gain and red for a loss, as wide as the card allows (54px on a phone, 44 on desktop), with its small label above it. The count-up of today's page is not wired in the mockup.
- **The card's own ground is a Hedra painting per model** (three ideas, below), darkened only toward the stats so the lettering reads (a painted floor, not a box).
- The stub is gone (the owner circled the empty stub and top corner in round H); the rank sits on the card's corner.

## The six takes
Grounds: **A painted world** (each model's own place: Grok's neon back street, Claude's lamp-lit study, GPT's white lab, Kimi's hangar at dawn; seedream-50-pro, the opener's own model, upscaled to 2K), **B satin fight robe** (each model's colour in satin with gold braid and piping; gpt-image-2), **C fight-poster stock** (screen-printed sunburst posters with torn layers, drips and spatter in each model's colours; gpt-image-2).

Inner styles:
- **Cut paper (A1, B1, C1):** Right way and Best call are pieces cut from Hedra construction paper (blue and cream), each laid on a cream backing sheet that shows a white cut edge, scissor-cut outlines (straight cuts at small angles, every piece its own shape), lifted off the card by a soft shadow, each at its own slight tilt. The figures are letters cut from paper (gold paper on blue, green or red paper on cream) with a white cut edge. A small shape cut from green paper carries each stat's meaning: a tick on Right way, an up arrow on Best call (a down arrow in red if a best call were ever a loss). The company and ticker are on their own cream strip pasted over the foot. Redrawn to match: the rank (#1 cut from red paper on a gold piece, others black on cream), the name (cut from cream paper), the mark (cut from the model's paper), the flag (stripes, canton, stars cut from red, cream, blue and gold paper), the role (a paper strip, gold for "We bet on its call", red for "Last place"), Last 5 (green and red paper tiles with a white cut tick or cross), the portrait in a deckle-cut cream mount, tilted.
- **Ink brush (A2, B2, C2):** Right way and Best call are painted swipes: a Hedra dry-brush stroke turned into an alpha mask, filled with blue or green, the figure brush-lettered on it (Knewave), the label and the company in a brush hand (Caveat Brush). Redrawn to match: the rank inside a one-stroke enso (gold for #1), the name brush-lettered with an ink drop, the flag in tapered brush strokes, the role on a short swipe, Last 5 as brushed ticks and crosses, the portrait and the card framed by tapered ink strokes with spatter.

| Take | Ground | Inner | Hedra cost |
|---|---|---|---|
| A1 | Painted world | Cut paper | scenes $0.27 + 2K $0.32, paper $0.22 |
| A2 | Painted world | Ink brush | scenes (shared), brush masks $0.11 |
| B1 | Satin robe | Cut paper | robes $0.15 (+ paper shared) |
| B2 | Satin robe | Ink brush | robes (shared) |
| C1 | Poster stock | Cut paper | posters $0.15 (+ paper shared) |
| C2 | Poster stock | Ink brush | posters (shared) |

## How each could fail
- **A (painted world):** the most story (each model has a home), but the scenes are busy: under the stats they have to be darkened, so the bottom third of every card is a murky gradient; GPT's white lab is the hardest to read on. Four scenes means four more files per card change.
- **B (robe):** the richest material and the fight-night story (a fighter's robe), but four satin cards in a row look alike apart from colour, and the gold braid down the left fights the gold enso rank in B2.
- **C (poster):** the loudest and most "pop"; the sunburst rays are close to today's ray ground the owner called flat (here they are printed, torn and dripped, but the shape is the same), and the poster's own halftone sits behind the paper pieces.
- **Cut paper:** the pieces are still rectangles at heart (scissor cuts, not freeform shapes); the paper is flat construction paper, so at arm's length it reads as "coloured box with a white rim". The cut letters lose contrast if the paper colours are close (I moved names to cream for that reason).
- **Ink brush:** the most handmade at 3x, but the swipes are a stretched bitmap (one stroke per stat, the same stroke on every card), and Last 5's brushed marks are thin (30px with a 3px stroke) and quieter than today's tiles. Knewave figures on a green swipe are dark ink on green (fine), on blue they are cream with an ink drop.
- **All:** the card outline effect (cut edge, ink frame) is drawn per card on load and on font load only; a width change would need a redraw in a build. The P&L does not count up in the mockup.

## Checks run
- 390, 1280 and 320px for all six: no sideways scroll (scrollWidth equals the viewport), no page or console errors; two empty SVGs in the cut takes had reported as overflow and were hidden.
- Long names (CLAUDE) overran the name column in the first pass; the cut name now shrinks to its column, the brush name steps down by script; the brush Best call figure steps down at 320 (it ran off the swipe).
- Nothing over a face or a number: the founder sits in his own frame; the P&L has its own row.
- No native emoji; ticks, crosses, arrows, flags and stars are drawn; no white or pale module grounds (paper pieces are the material); no Ben-Day fill over a module.
- Zoomed into the 3x close-ups: the cut-paper fills show the paper's fibre, the white cut edge and the lift; the brush swipes show bristle streaks. Compared with the no-Hedra book's cut-paper and inked close-ups, these go further (real paper and real brush strokes), but the layout is still today's grid.

## Readings that go two ways
- "Right way and Best call in cut paper or ink brush line": I read it as the two stat modules themselves made in that medium, with the rest of the card (rank, name, role, flag, last five) redrawn in the same medium so it holds together. The narrower reading, only those two modules changed and the rest as today, is a subset of these takes (switch the rest back).
- "Painted backdrop... or a painted fabric, foil or poster stock": made three of them (scene, fabric, poster); foil was not made (the leader's holo already uses foil elsewhere on the page).

## Hedra jobs
| Job | Model | Settings | Cost | Time | File | Result |
|---|---|---|---|---|---|---|
| scene-gpt | seedream-50-pro | aspect_ratio 2:3, resolution 1080p | $0.0675 | 76 s | `img/scene-gpt.jpg` (1080x1620) | White and mint lab with a robot arm; the brightest ground, needs the most darkening under the stats. |
| scene-grok | seedream-50-pro | aspect_ratio 2:3, resolution 1080p | $0.0675 | 96 s | `img/scene-grok.jpg` (1080x1620) | Wet neon back street with steam; the best of the four, magenta and cyan match his portrait. |
| scene-claude | seedream-50-pro | aspect_ratio 2:3, resolution 1080p | $0.0675 | 98 s | `img/scene-claude.jpg` (1080x1620) | Lamp-lit study with blank book spines and a globe; warm, reads at once as "the scholar". |
| robe-grok | gpt-image-2 | aspect_ratio 3:4, resolution 1K, quality medium | $0.0367 | 34 s | `img/robe-grok.jpg` (768x1024) | Black satin, magenta and cyan piping, gold braid; reads as fabric, the braid sits under the rank. |
| robe-claude | gpt-image-2 | aspect_ratio 3:4, resolution 1K, quality medium | $0.0367 | 34 s | `img/robe-claude.jpg` (768x1024) | Burnt-orange satin; rich, close to the orange of the stats so the cut paper needs its white edge. |
| scene-kimi | seedream-50-pro | aspect_ratio 2:3, resolution 1080p | $0.0675 | 86 s | `img/scene-kimi.jpg` (1080x1620) | Hangar at dawn with a jet nose in the doorway; strong, but the lower half is plain concrete. |
| robe-gpt | gpt-image-2 | aspect_ratio 3:4, resolution 1K, quality medium | $0.0367 | 34 s | `img/robe-gpt.jpg` (768x1024) | Mint satin with a lapel and pocket; the lapel line reads as a robe, good. |
| robe-kimi | gpt-image-2 | aspect_ratio 3:4, resolution 1K, quality medium | $0.0367 | 33 s | `img/robe-kimi.jpg` (768x1024) | Cobalt satin with orange piping; strong sheen. |
| poster-claude | gpt-image-2 | aspect_ratio 3:4, resolution 1K, quality medium | $0.0367 | 40 s | `img/poster-claude.jpg` (768x1024) | Orange rising sun with drips; good, but the rays look like the old ray ground. |
| poster-gpt | gpt-image-2 | aspect_ratio 3:4, resolution 1K, quality medium | $0.0367 | 40 s | `img/poster-gpt.jpg` (768x1024) | Mint rays with paint runs; fine. |
| poster-grok | gpt-image-2 | aspect_ratio 3:4, resolution 1K, quality medium | $0.0367 | 44 s | `img/poster-grok.jpg` (768x1024) | Magenta and grey sunburst poster, torn layers at the edge; loud, the most "pop". |
| paper-gold | gpt-image-2 | aspect_ratio 3:4, resolution 1K, quality medium | $0.0365 | 24 s | `img/paper-gold.jpg` (768x1024) | Flat construction paper with fibres; used as the fill of every cut-paper piece and letter. Even and clean, as wanted. |
| paper-cream | gpt-image-2 | aspect_ratio 3:4, resolution 1K, quality medium | $0.0365 | 34 s | `img/paper-cream.jpg` (768x1024) | Flat construction paper with fibres; used as the fill of every cut-paper piece and letter. Even and clean, as wanted. |
| poster-kimi | gpt-image-2 | aspect_ratio 3:4, resolution 1K, quality medium | $0.0367 | 44 s | `img/poster-kimi.jpg` (768x1024) | Blue halftone burst, torn edges; good. |
| paper-green | gpt-image-2 | aspect_ratio 3:4, resolution 1K, quality medium | $0.0365 | 33 s | `img/paper-green.jpg` (768x1024) | Flat construction paper with fibres; used as the fill of every cut-paper piece and letter. Even and clean, as wanted. |
| paper-red | gpt-image-2 | aspect_ratio 3:4, resolution 1K, quality medium | $0.0365 | 33 s | `img/paper-red.jpg` (768x1024) | Flat construction paper with fibres; used as the fill of every cut-paper piece and letter. Even and clean, as wanted. |
| paper-blue | gpt-image-2 | aspect_ratio 3:4, resolution 1K, quality medium | $0.0365 | 34 s | `img/paper-blue.jpg` (768x1024) | Flat construction paper with fibres; used as the fill of every cut-paper piece and letter. Even and clean, as wanted. |
| brush-swipe | gpt-image-2 | aspect_ratio 16:9, resolution 1K, quality medium | $0.0289 | 23 s | `img/brush-swipe.jpg` (1280x720) | Dry-brush stroke, white on black; turned into an alpha mask (PNG) for the ink swipes. |
| paper-black | gpt-image-2 | aspect_ratio 3:4, resolution 1K, quality medium | $0.0365 | 34 s | `img/paper-black.jpg` (768x1024) | Flat construction paper with fibres; used as the fill of every cut-paper piece and letter. Even and clean, as wanted. |
| brush-swipe2 | gpt-image-2 | aspect_ratio 16:9, resolution 1K, quality medium | $0.0289 | 23 s | `img/brush-swipe2.jpg` (1280x720) | Shorter, fatter stroke with spatter; alpha mask for role chips and best-call swipes. |
| brush-enso | gpt-image-2 | aspect_ratio 1:1, resolution 1K, quality medium | $0.0531 | 34 s | `img/brush-enso.jpg` (1024x1024) | One-stroke circle; alpha mask round the rank number. |
| scene-gpt-2k | topaz-image-upscaler | target_resolution 2K | $0.0800 | 13 s | `img/scene-gpt-2k.jpg` (1365x2048) | Topaz upscale of scene-gpt for the A takes; sharper brick, books and steel in the 3x close-up, same composition. |
| scene-claude-2k | topaz-image-upscaler | target_resolution 2K | $0.0800 | 13 s | `img/scene-claude-2k.jpg` (1365x2048) | Topaz upscale of scene-claude for the A takes; sharper brick, books and steel in the 3x close-up, same composition. |
| scene-grok-2k | topaz-image-upscaler | target_resolution 2K | $0.0800 | 14 s | `img/scene-grok-2k.jpg` (1365x2048) | Topaz upscale of scene-grok for the A takes; sharper brick, books and steel in the 3x close-up, same composition. |
| scene-kimi-2k | topaz-image-upscaler | target_resolution 2K | $0.0800 | 13 s | `img/scene-kimi-2k.jpg` (1365x2048) | Topaz upscale of scene-kimi for the A takes; sharper brick, books and steel in the 3x close-up, same composition. |

**Total: $1.21** of the $12 cap (25 jobs, every charge equal to its estimate). I stayed low: the 1K drafts were good enough for card-size grounds, and the one 2K spend went on the scenes (A1/A2), by Topaz upscale so the composition stays.

## My pick
**A2 (painted world + ink brush)**: each model in his own place, the P&L popping on the dark floor, the brush swipes the most handmade thing on the card. A1 if the owner wants the stats to sit on something solid (the paper pieces read more firmly than the swipes).
