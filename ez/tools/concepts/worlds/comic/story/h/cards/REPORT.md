# Round H, area `cards`: Meet the models, redesigned from scratch

Brief: `../BRIEF-H.md`. Six takes laid over the real built X3+ page (`ez/v47-live-x3plus.html`) in Playwright; every number comes from the page's own globals through `POP.data()` (pop_lib: `__x2pPnl`, ROUNDS, MODELS), nothing typed. Every take keeps the four founders' animated portraits (`media/founder-<m>-anim.mp4/.webm/.jpg`, muted loop, poster alone with reduced motion) and the nine facts: rank, name, model version, flag, role chip, Current P&L, right way, best call with its company and ticker, last five. Each opens on the backstage opener (`ez/hedra/openers/o1-models-seedream-50-pro.jpg`) with the "Meet the models" headline lifted over its foot (the one loud, extruded treatment in the section).

Boards: `ez/x2p-x3p-h-cards-390.png` (today, then T1 to T6, then a 3x close-up row of each take's #1 card) and `ez/x2p-x3p-h-cards-1280.png`.

How to run: serve `ez/` on port 8931 (`python3 -m http.server 8931`), then `node run.js <out> now,t1,t2,t3,t4,t5,t6 390,1280,320` and `/usr/bin/python3 board.py <out> 390 <png>`. Files: `_c.js/_c.css` (shared data, hand-tuned ink helpers: tapered brush strokes, drawn tick and cross, hand-drawn flags, torn-edge polygons, chalk/press/stamp filters, the opener mount), `t1..t6.js/.css`, `hedra.py` (submit, poll, save JPG q88, log to `jobs.jsonl`).

## The takes

**T1 Doors (the one asked for: each card a door from the opener, its founder in the doorway).** Four Hedra doors (seedream-50-pro, the opener's own model and light: orange Claude, mint GPT, charcoal Grok, blue Kimi), each swung open on a black doorway; I measured each doorway on the pixels and the founder's loop fills it, darkened at the jambs and top with a dot screen in the shade, a light spill on the floor. The rank is the number on the door (chalked; #1 a gold dressing-room star); the name is gaffer tape with marker; the role is a door hanger on the knob (gold "We bet on its call", red "Last place"); P&L, right way, best call and last five are chalked on the wet concrete in front of the door. Desktop: four doors in a row, the opener's own composition. No stub, so the empty stub the owner circled is gone; the dead top is the door's lintel and bulb (art, not a box).
- How it could fail: the tallest take on a phone (about 3.1k px for four cards against 2.1k today); chalk on dark concrete is the quietest stat treatment, and the P&L may read too soft for traders; Kimi's doorway is narrow (his door leaf swings across it), so he shows from the shoulders; the chalk filter costs a little paint on slow phones; door art is fixed per model, so a model change needs a new door.

**T2 Fight bill.** Each card a boxing bill on aged card stock (Hedra), torn edges, pasted on a back-alley brick wall (Hedra). The rank is the billing itself: Main event (gold band), Co-main event, Feature bout, Opening bout, plus No.n; the founder printed into the stock (multiply, a dot screen in the shade); the name in wood type with a red misregistration; the role as a rubber stamp under the portrait; the stats as the bill's fine print pressed in ink.
- How it could fail: the most compact and readable, but the closest to a "poster costume"; multiply lets the founders' flat backgrounds (mint, navy) tint the paper; the fine print is small (12.5px).

**T3 Locker.** A steel locker door (Hedra plate, vent slots cut along the top) in the locker room (Hedra). The founder is a photo taped inside the locker's mesh window; name and every stat on embossed Dymo tape (raised letters, notched ends, green tape for a gain, red for a loss, gold tape for #1's name); the rank spray-stencilled on the steel with a stencil bridge; the role a paper tag on a string.
- How it could fail: Dymo tape is a label-and-value list in disguise (rule 0's "dashboard in costume" risk); the stencil number is low contrast on steel; tall on phones (about 1.5k px).

**T4 Binder page.** Four collectible cards in a binder sleeve page, 2x2 on a phone, one row from 1000px. Only the leader's card is printed on Hedra holo foil (leader = holo, slow drift, still with reduced motion); the others on card stock in their lab colour. Rank = set number top right; the founder in the art window; role on the window's foot; stats on a black enamel plate (Hedra) in gold.
- How it could fail: the shortest take (about 0.95k px), but the type is small at 390 (labels 8.5px, best-call company 10.5px) and at 320 the company is dropped; trading-card framing invites the "collect all four" claim the owner rejected (nothing is collected; the page must not say so).

**T5 Championship belt.** Each card a title belt on Hedra red leather in the empty arena (Hedra). The founder fills the round centre plate, and the plate's metal is the rank: gold (#1, the one we bet on), silver, steel, rusted iron. Side plates: the rank engraved with the role; the P&L. A stitched leather tab under the strap: right way, best call with company, last five as enamel studs.
- How it could fail: "belt" implies a title won; only the leader holds a real belt, so silver/steel/iron for the others is my invention of a ladder (encodes rank, but it is not a boxing tradition); side plates crowd at 320 (handled by a smaller step).

**T6 Cut from the costume.** Each card is cut from its founder's own costume material (Hedra: Claude's tweed coat, GPT's white armour, Grok's leather jacket, Kimi's flight-suit canvas), so the card's material is the character. Every fact is sewn on as an embroidered patch: woven portrait patch, round rank patch (gold thread for #1), name tape with version and flag, a rocker for the role, stat patches (P&L patch green or red), five round patches for the last five.
- How it could fail: patches are still boxes holding labels, and six patches per card is busy; GPT's white armour needs dark patch rims to stay readable; the leather card is very dark.

## Checks run (rule 0 and the brief)
- 390, 1280 and 320px: no sideways scroll (scrollWidth equals the viewport) and no page errors for any take; T4 overflowed at 320 in the first pass (two min-content columns) and was fixed (minmax(0,1fr), company dropped below 360px).
- Nothing laid over a face or a number: T2's stamp first sat over the last-five marks and was moved under the portrait; T1's Grok hanger ran off the card's left edge (his knob is on the left) and now hangs to the right of the knob.
- No native emoji; ticks, crosses, flags and the #1 star are drawn SVG; no white or pale module grounds except T2's paper (the material is the card) and T6's GPT armour (the costume).
- Company always as name and ticker ("Intel (INTC)").
- Live data only: P&L, W/L, best call and last five read from `POP.data()`; roles follow the page's own order (#1 "We bet on its call", #4 "Last place").
- Two site classes leaked into mockups, as in earlier rounds: the site's `.u` drew a box behind T6's best-call figure (renamed `t6-bu`/`t6-bd`), and pop_p1's builder re-added its own title and grid after mine when it saw the section change (hidden by CSS in `_c.css`).
- Zoomed into the 3x close-ups and compared with a comic page: T1's doorway (ink lines, halftone in the shade, the founder lit from inside) holds up best; the chalk and tape in T1 are the weakest craft (a font through a filter, not hand-lettered).

## Readings that go two ways
- "One of them should make each card a door from the opener": I read it as each model's own door (the four doors of the opener, one per card). The other reading, the opener itself as the row with the founders standing in its four doorways, is what T1 becomes at 1280px (four doors side by side); on a phone it would make each founder about 60px wide, too small to show.
- "Dead space around the logo": the owner circled the empty top of Grok's card and its stub. Every take drops the side stub; in T1 the top of each card is the door's lintel and bulb.

## Hedra jobs
| Job | Model | Settings | Cost | Time | File | Result |
|---|---|---|---|---|---|---|
| door-gpt | seedream-50-pro | aspect_ratio 2:3, resolution 1080p | $0.0675 | 106 s | `img/door-gpt.jpg` (1080x1620) | Mint door, deep doorway; the strongest of the four. The leaf shows its full panel moulding. |
| door-grok | seedream-50-pro | aspect_ratio 2:3, resolution 1080p | $0.0675 | 107 s | `img/door-grok.jpg` (1080x1620) | Charcoal door; the doorway is the widest (42 to 70%); a magenta spill inside the doorway reads as light from the room. |
| door-claude | seedream-50-pro | aspect_ratio 2:3, resolution 1080p | $0.0675 | 138 s | `img/door-claude.jpg` (1080x1620) | Orange chipped panel door swung open, black doorway, bulb above, red/green light; matches the opener. Doorway measured at x 45 to 73%. |
| stock | gpt-image-2 | aspect_ratio 3:4, resolution 1K, quality medium | $0.0366 | 38 s | `img/stock.jpg` (768x1024) | Aged cream card stock with red/black ink bleed and foxing; good, a touch too pink at the edges. |
| steel | gpt-image-2 | aspect_ratio 3:4, resolution 1K, quality medium | $0.0366 | 34 s | `img/steel.jpg` (768x1024) | Brushed steel plate with rivets on the edges and dents; slightly photographic, the ink lines are faint. |
| foil | gpt-image-2 | aspect_ratio 3:4, resolution 1K, quality medium | $0.0366 | 58 s | `img/foil.jpg` (768x1024) | Rainbow holo foil; convincing at card size, reads as foil, not as a pattern. |
| leather | gpt-image-2 | aspect_ratio 3:4, resolution 1K, quality medium | $0.0366 | 31 s | `img/leather.jpg` (768x1024) | Red pebbled leather with a gold saddle stitch top and bottom; the stitching is where the strap edges sit, good. |
| door-kimi | seedream-50-pro | aspect_ratio 2:3, resolution 1080p | $0.0675 | 148 s | `img/door-kimi.jpg` (1080x1620) | Cobalt door with a moulded cornice; the leaf swings across so the doorway is narrow (55 to 74%): the founder shows only from the shoulders. |
| enamel | gpt-image-2 | aspect_ratio 3:4, resolution 1K, quality medium | $0.0365 | 59 s | `img/enamel.jpg` (768x1024) | Black enamel with a gold art-deco sunburst; used under a 72% dark wash so the rays only glint behind the stats. |
| gold | gpt-image-2 | aspect_ratio 3:4, resolution 1K, quality medium | $0.0366 | 62 s | `img/gold.jpg` (768x1024) | Engraved gold plate with scroll border; used only as the centre plate texture, the border is cropped away. |
| wall-brick | gpt-image-2 | aspect_ratio 9:16, resolution 1K, quality medium | $0.0290 | 34 s | `img/wall-brick.jpg` (720x1280) | Back-alley brick wall with paste and torn scraps, warm lamp top left; good ground for posters. |
| arena | gpt-image-2 | aspect_ratio 9:16, resolution 1K, quality medium | $0.0289 | 34 s | `img/arena.jpg` (720x1280) | Empty ring with red and green ropes, spotlight; ground for T5. |
| wall-lockers | gpt-image-2 | aspect_ratio 9:16, resolution 1K, quality medium | $0.0290 | 34 s | `img/wall-lockers.jpg` (720x1280) | Row of steel lockers with bench; ground for T3, sits under the cards mostly unseen at phone width. |
| cloth-gpt | gpt-image-2 | aspect_ratio 3:4, resolution 1K, quality medium | $0.0366 | 34 s | `img/cloth-gpt.jpg` (768x1024) | White armour panels with mint seams; the brightest, so patches on it need dark borders. |
| cloth-claude | gpt-image-2 | aspect_ratio 3:4, resolution 1K, quality medium | $0.0366 | 34 s | `img/cloth-claude.jpg` (768x1024) | Rust tweed with a vertical seam; reads as fabric. |
| cloth-grok | gpt-image-2 | aspect_ratio 3:4, resolution 1K, quality medium | $0.0366 | 35 s | `img/cloth-grok.jpg` (768x1024) | Black leather with zipper; very dark, patches carry the card. |
| cloth-kimi | gpt-image-2 | aspect_ratio 3:4, resolution 1K, quality medium | $0.0366 | 34 s | `img/cloth-kimi.jpg` (768x1024) | Navy canvas with webbing; reads as a flight suit. |
| door-claude-2k | topaz-image-upscaler | target_resolution 2K | $0.0800 | 13 s | `img/door-claude-2k.jpg` (1365x2048) | Topaz upscale of door-claude to 2K short edge (1365x2048 kept): same geometry, so the measured doorway still fits; sharper ink and cracks in the 3x close-up. |
| door-grok-2k | topaz-image-upscaler | target_resolution 2K | $0.0800 | 13 s | `img/door-grok-2k.jpg` (1365x2048) | Topaz upscale of door-grok to 2K short edge (1365x2048 kept): same geometry, so the measured doorway still fits; sharper ink and cracks in the 3x close-up. |
| door-gpt-2k | topaz-image-upscaler | target_resolution 2K | $0.0800 | 13 s | `img/door-gpt-2k.jpg` (1365x2048) | Topaz upscale of door-gpt to 2K short edge (1365x2048 kept): same geometry, so the measured doorway still fits; sharper ink and cracks in the 3x close-up. |
| door-kimi-2k | topaz-image-upscaler | target_resolution 2K | $0.0800 | 13 s | `img/door-kimi-2k.jpg` (1365x2048) | Topaz upscale of door-kimi to 2K short edge (1365x2048 kept): same geometry, so the measured doorway still fits; sharper ink and cracks in the 3x close-up. |

**Total: $1.04** of the $15 cap (21 jobs, every charge equal to its estimate).

The opener (`ez/hedra/openers/o1-models-seedream-50-pro.jpg`) and the founders' loops were reused, not regenerated. Costs per take on the board: T1 $0.59 (four doors + their upscale), T2 $0.07 (stock, brick), T3 $0.07 (steel, lockers), T4 $0.07 (foil, enamel; stock shared), T5 $0.10 (leather, gold, arena; steel shared), T6 $0.15 (four costume materials). I stayed far under the cap on purpose: the drafts at 1K were good enough, and the one 2K spend went on the take I think is best (T1, by Topaz upscale so the measured doorways stay exact).

## My pick
T1 Doors for the section's story (four rivals waiting backstage, the one we bet on behind the gold star) and because it carries the opener straight into the cards; T5's metal-as-rank and T4's leader-only holo are the cleanest carriers of rank if T1 is too tall. A combination worth trying: T1's doors at desktop, T4's binder page on phones.

## Note on the board's "Today" column
The live cards count their P&L up when they come into view; the capture caught cards 2 to 4 mid-count, so it shows "+0" and "-0" there. That is a screenshot artefact, not a page bug.
