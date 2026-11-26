# Round H, area `proof`: Smart or lucky, and the whole Leaderboard tab

Brief: `../BRIEF-H.md` (with the addendum). Four takes, each a different world and finish, laid over the real built X3+ page (`ez/v47-live-x3plus.html`) in Playwright. Each take redesigns both parts:
1. the Overview's "Smart or lucky?" (hit rate round by round, the coin line, each AI's row);
2. the Leaderboard tab: the "Who's winning" fight bill with its Season / Last 24 hours / Last 7 days stubs, the S3 tale of the tape, the thumb dock, and the "Smarter or just lucky?" proof (P&L / Accuracy / Target hits / Sector).

Boards: `ez/x2p-x3p-h-proof-390.png` (today, then T1 to T4; rows: Smart or lucky, the Leaderboard down to the proof on P&L, the proof on Target hits, the dock, then 3x close-ups of the corners, the tape, a target and the hit-rate chart) and `ez/x2p-x3p-h-proof-1280.png` (one block per take).

## How to run
Serve `ez/` on port 8941 (`python3 -m http.server 8941`), then from `ez/`: `node tools/concepts/worlds/comic/story/h/proof/run.js <out> now,t1,t2,t3,t4 390` (with 3x close-ups) and `ZOOM=0 node ... 1280,320`; boards with `/usr/bin/python3 board.py <out> 390|1280 <png>` (labels in `takes.json`). Files: `_p.js` (data, ink shapes, mount over the live page), `_lb.js` + `_lb.css` (the builders and their layout), `t1..t4.js/.css` (each take), `hedra.py` (submit, poll, save JPG q88, log to `jobs.jsonl`), `jobs*.json` (prompts).

## Live data, nothing typed
- Smart or lucky: hit rate after every graded round with the page's own formula, (right + 1) / (calls + 2), from ROUNDS; final hit rate, W of calls and the first-half / second-half split from each AI's own calls in order.
- The bill is read from the live bill after every switch (`.wc11n-bout`): which two are in the corners, their window P&L and W-L, the role, the undercard, the line under it ("Grok took the ticket on Caterpillar, round 67"), the next bell. My stubs call the page's own `__wc11Show`, so the page's logic (windows, exchange closes, ranking) is never re-derived.
- The tape is drawn from `window.SS.X[window]` (the live S3's own data): order, P&L skyline from the start line, W-L, hit rate (a dash under 5 calls), last 5, top and worst round with the company logo; the best figure per row gets a hand-drawn gold ring.
- The proof is computed from `__x2pPnl()` and ROUNDS: balance after every round, Top W / Top L, trades, W, L, hit rate, a hole per right-way call at its miss (golden-angle spiral, rings every 3%), bullseyes (within 0.1%), within 1%, off target, sector right/made from RMETA (best per row ringed when made at least twice).

## Shared hand-tuned pieces (`_p.js`, `_lb.js`)
Torn ink panels (seeded irregular polygons, an ink ground cut inside another), wobbly double ink frames, tapered brush strokes, jagged two-layer bursts, a drawn coin, drawn ticks and crosses, drawn US and China flags, the gold ring (two loose loops, ink under gold). The founders' animated portraits are used as the characters (posters in stills; the files are untouched). Charts and figures are SVG and HTML from the data; the paintings only surround them.

## The takes

**T1 Ringside (3D first, comic ink; seedream-50-pro).**
- Smart or lucky: the painted coin spins over the ropes; "Smart or lucky?" extruded in gold over its foot (the one loud treatment). The chart is drawn on the painted ring canvas: grid lines are twisted ring ropes, the coin line is a gold rope with a drawn coin. Under it, four corner cards: founder photo, flag, name, hit rate in gold ("above the coin") or red ("under the coin"), and the drift from first to second half.
- Leaderboard: the bill in the painted empty arena, the two corners as torn fight photos of the founders with their marks, a VS burst, hand-cut ticket stubs; the tape on the painted weigh-in curtain, the founders in spotlight rings; the proof on the canvas, Target hits at the painted range (four lanes).
- Could fail: the darkest take, so the page goes from cream to near black for long stretches; the canvas boot prints sit behind the lines and add noise at small sizes; the ropes read as decoration to someone who has never seen a boxing ring.

**T2 Test your skill (pop art; gpt-image-2).**
- Smart or lucky: the painted fairground booth opens the section; the chart hangs on the painted velvet backboard (bulbs top and bottom); each AI swings a drawn high striker, the puck stopped at its hit rate, a gold line on every post at 50% (the coin), the bell out of reach for everyone. The strikers make "who beats the coin" readable without the chart.
- Leaderboard: the painted gloves collide over the bill; the corners as cut pop panels with round portraits; the tape on the painted night sky with tilted yellow row tags; the proof under searchlights, Target hits in front of the painted shooting gallery.
- Could fail: the red velvet makes Claude's orange line weaker (lifted to a lighter orange with a thick ink edge); the gloves are red and blue whatever the fighters' colours; pop at full strength everywhere fights lesson 71 (the loudest treatment once per section), so it needs the most restraint.

**T3 The house (noir ink, one gold; seedream-50-pro).**
- Smart or lucky: "Trading desk, or a dice table?" over the painted casino table; the chart inked on the painted felt, every line cream with its own dash (GPT solid, Claude dashes, Kimi dots, Grok dash-dot), only the leader in gold, the coin a dotted cream rule; then each AI's record as a stack of its own chips drawn chip by chip, one chip per 5% right, the house (a coin) at 10 chips, marked on every stack.
- Leaderboard: the bill on the painted scorekeeper's table (bell, scorecards, lamp), founders in noir greys; the tape as the judges' scorecard on the painted clipboard, P&L as hatched pencil bars; the proof on the felt, Target hits at the painted night range.
- Could fail: lines told apart by dash only (the noir rule) are harder to follow than colour; the chip stacks look like money, which may read as winnings rather than accuracy (the label says "one chip per 5% right"); the felt's lamp glow lowers contrast in the middle of the chart.

**T4 Chalk and print (anime cel for Smart or lucky, two-colour risograph for the Leaderboard; gpt-image-2).** Two readings of "a different finish per element" in one take: the Overview section in one finish, the Leaderboard in another.
- Smart or lucky: after class in the painted classroom; the chart chalked on the painted board (coloured chalk with a dust edge from an SVG displacement filter), the coin line dashed; the founders taped to the board as photos, the leader's hit rate circled in chalk.
- Leaderboard: the bill printed on the painted poster stock with the painted red and green gloves faded into it; the tape printed on the painted fight poster pasted to a brick wall (used as a border image, so its own red head band holds the title and its green foot band the footer, at any height); the proof printed on the same stock, the targets in red ink a hair off register.
- Could fail: chalk text through a displacement filter is softer than the rest of the site and costs paint on slow phones; the poster's border image stretches its middle at 1280; riso has no gold ink, so the best-in-row ring stays the site's gold and breaks the two-ink rule.

## Paintings (Hedra)

| Job | Model | Settings | Cost | Time | File | Result |
|---|---|---|---|---|---|---|
| s2-booth | gpt-image-2 | aspect_ratio 16:9, resolution 1K, quality medium | $0.0291 | 34 s | `img/s2-booth.jpg` 1280x720 | T2 draft booth: strong Lichtenstein ink, empty dark window; replaced by the 2K version. |
| s2-velvet | gpt-image-2 | aspect_ratio 16:9, resolution 1K, quality medium | $0.0290 | 34 s | `img/s2-velvet.jpg` 1280x720 | T2 chart ground: red velvet with bulb rows top and bottom, exactly the backboard asked for. |
| s1-canvas | seedream-50-pro | aspect_ratio 16:9, resolution 1080p | $0.0675 | 76 s | `img/s1-canvas.jpg` 1920x1080 | T1 chart ground: worn canvas with boot prints; prints add noise behind lines (darkened to 62%). |
| s1-ring | seedream-50-pro | aspect_ratio 16:9, resolution 1080p | $0.0675 | 96 s | `img/s1-ring.jpg` 1920x1080 | T1 opener: gold coin spinning over red/green-lit ropes, real ink edges and dots in the dark; the best painting of the set. |
| s4-class | gpt-image-2 | aspect_ratio 16:9, resolution 1K, quality medium | $0.0290 | 34 s | `img/s4-class.jpg` 1280x720 | T4 opener: anime classroom at dusk, wiped board, coin on the tray as asked; reads as anime background art. |
| s3-felt | seedream-50-pro | aspect_ratio 16:9, resolution 1080p | $0.0675 | 76 s | `img/s3-felt.jpg` 1920x1080 | T3 chart ground: dark felt with a lamp pool; the glow lowers contrast mid-chart (darkened in the proof). |
| s3-table | seedream-50-pro | aspect_ratio 16:9, resolution 1080p | $0.0675 | 87 s | `img/s3-table.jpg` 1920x1080 | T3 opener: noir dice table under a lamp, gold chips and coin the only colour; on brief. |
| s4-board | gpt-image-2 | aspect_ratio 16:9, resolution 1K, quality medium | $0.0290 | 34 s | `img/s4-board.jpg` 1280x720 | T4 chart ground: wiped green chalkboard edge to edge; good texture for chalk. |
| l1-curtain | seedream-50-pro | aspect_ratio 16:9, resolution 1080p | $0.0675 | 76 s | `img/l1-curtain.jpg` 1920x1080 | T1 tape: red velvet weigh-in curtain with two spotlight pools; more render than comic. |
| l2-poster | gpt-image-2 | {} | $0 | - | - | failed: HTTP Error 400: Bad Request (re-run) |
| l1-range | seedream-50-pro | aspect_ratio 16:9, resolution 1080p | $0.0675 | 76 s | `img/l1-range.jpg` 1920x1080 | T1 Target hits: indoor range, four lanes of blank papers; render, almost no ink. |
| l1-arena | seedream-50-pro | aspect_ratio 16:9, resolution 1080p | $0.0675 | 88 s | `img/l1-arena.jpg` 1920x1080 | T1 bill: empty ring, gold and steel-blue corner pads and stools, red/green spill; a little photographic. |
| l2-gloves | gpt-image-2 | aspect_ratio 16:9, resolution 1K, quality medium | $0.0290 | 33 s | `img/l2-gloves.jpg` 1280x720 | T4 bill: red and green riso gloves facing each other; clean two-ink print. |
| l2-target | gpt-image-2 | aspect_ratio 1:1, resolution 1K, quality medium | $0.0532 | 44 s | `img/l2-target.jpg` 1024x1024 | Not used: the model painted its own bullet holes, which would be fake data. |
| l3-card | seedream-50-pro | aspect_ratio 2:3, resolution 1080p | $0.0675 | 76 s | `img/l3-card.jpg` 1080x1620 | T3 tape: clipboard with a blank scorecard under a lamp (scaled up as the sheet ground). |
| l3-table | seedream-50-pro | aspect_ratio 16:9, resolution 1080p | $0.0675 | 107 s | `img/l3-table.jpg` 1920x1080 | T3 bill: scorekeeper's table with bell, cards, stopwatch, coffee under a gold lamp; on brief. |
| l3-range | seedream-50-pro | aspect_ratio 16:9, resolution 1080p | $0.0675 | 86 s | `img/l3-range.jpg` 1920x1080 | T3 Target hits: night range with four empty wooden target frames and a gold floodlight. |
| l4-pow | gpt-image-2 | aspect_ratio 16:9, resolution 1K, quality medium | $0.0290 | 33 s | `img/l4-pow.jpg` 1280x720 | T2 bill: red and blue gloves colliding in a yellow burst over a crowd; loud, gloves colours fixed. |
| l4-gallery | gpt-image-2 | aspect_ratio 16:9, resolution 1K, quality medium | $0.0290 | 34 s | `img/l4-gallery.jpg` 1280x720 | T2 Target hits: shooting gallery with ducks and four bullseye boards (painted rings carry no data; behind the drawn targets). |
| l4-sky | gpt-image-2 | aspect_ratio 16:9, resolution 1K, quality medium | $0.0290 | 34 s | `img/l4-sky.jpg` 1280x720 | T2 tape and proof ground: night sky, crossing searchlights, crowd strip at the foot; beams busy behind the chart (darkened). |
| l2-stock | gpt-image-2 | aspect_ratio 16:9, resolution 1K, quality medium | $0.0290 | 34 s | `img/l2-stock.jpg` 1280x720 | T4 bill and proof ground: blank cream stock with speckle and a torn foot. |
| l2-poster | gpt-image-2 | aspect_ratio 9:16, resolution 1K, quality medium | $0.0290 | 34 s | `img/l2-poster.jpg` 720x1280 | T4 tape: blank fight poster on bricks with an empty red head band and green foot band; used as a border image. |
| l1-arena-2k | seedream-50-pro | {} | $0 | - | - | failed: HTTP Error 400: Bad Request (re-run) |
| s1-ring-2k | seedream-50-pro | {} | $0 | - | - | failed: HTTP Error 400: Bad Request (re-run) |
| s2-booth-2k | gpt-image-2 | aspect_ratio 16:9, resolution 2K, quality high | $0.2218 | 77 s | `img/s2-booth-2k.jpg` 2048x1152 | T2 opener at 2K high: richer (ferris wheel, tents), centred; used. |
| l1-arena-2k | seedream-50-pro | aspect_ratio 16:9, resolution 1440p (2K QHD) | $0.1350 | 118 s | `img/l1-arena-2k.jpg` 2048x1152 | 2K repaint of the T1 arena: plainer render, no ink; not used. |
| s1-ring-2k | seedream-50-pro | aspect_ratio 16:9, resolution 1440p (2K QHD) | $0.1350 | 119 s | `img/s1-ring-2k.jpg` 2048x1152 | 2K repaint of the T1 opener: lost the ink line and the coin got small; not used. |

Total spent: **$1.51** of the $10 cap for this area (every charge equalled its estimate; the 400 errors were not charged). Prompts are in `jobs*.json` and in `jobs.jsonl`; each ends "No people, no text, no letters, no numbers, no logos, no signs, no writing anywhere." Checked every image at full size: no lettering in any of them.


## Checks run (rule 0 and the brief)
- 320, 390 and 1280px: scrollWidth equals the viewport for every take and no page errors (see the run logs in the table of checks at the end).
- No native emoji: ticks, crosses, flags, coin, rings are drawn SVG.
- Nothing laid over a face or a number; the founders keep their portraits whole; logos sit beside figures.
- Company logos come from the page's own CO_LOGOS (media/logos), never painted; every painting was prompted with "no text, no letters, no numbers"; checked at full size: no lettering in any of them.
- Site class collisions found and fixed on the way: the site redefines `--ink` (cream) on inner elements, so every take's tokens sit on its own containers; the page's tab panels are absolutely positioned by a site rule (forced back); the page's lazy rendering (content-visibility) hid the proof until scrolled; a class of mine (`pqx-cn`) was used twice (the coin and a corner) and collapsed the corners.
- The story against the data (lesson 8): every take shows each AI's first half against its second half. Today the two leaders by hit rate are falling (Grok 67% to 58%, Claude 63% to 57%) while GPT and Kimi rise a little; no take implies a hot streak or rising skill.

## Compared with a real comic page (zoomed at 3x)
- Holds up: the paintings themselves (T1's coin over the ropes, T3's dice table, T4's classroom and poster), T3's chip stacks (each chip drawn with its rim and edge stripes), T4's targets printed in red ink a hair off register, the torn panel edges.
- Does not yet: the lettering inside the modules is a font with a shadow, not hand lettering (lesson 70); the charts are clean vector lines on painted grounds, so they read as overlays more than as drawn into the scene (only T4's chalk filter gets close); every corner card shares one structure across the four takes, so the takes differ more in material than in layout. A next round should letter the headlines by hand (per-letter size, angle and baseline) and draw the chart lines with the take's own tool (rope, chalk, ink brush, riso grain).
- Today's live Smart or lucky renders a tall empty stretch under its chart in a still shot until its rows animate in; the board shows it after scrolling through the section.

## A fact the takes lost
Today's live rows carry the odds for each AI: "A coin does this well about 1 time in 45" (Grok), 22 (Claude), 3 (GPT), "doing worse than a coin" (Kimi). None of my four takes carries that line; it is the strongest answer to "smart or lucky?" and belongs on each take's row (on T1's corner cards, under T2's strikers, beside T3's stacks, chalked under T4's photos) before any of them ships.

## Readings that go two ways
- "Four takes for each part": I read the Leaderboard's four modules as one part (one world per take for the bill, the tape, the dock and the proof together), and Smart or lucky as the other. A take that mixes one world's bill with another's tape is possible; the files are split per module (`bill`, `tape`, `proof`, `dock` in each take) so they can be recombined.
- "Paint what surrounds them": I used paintings as grounds and establishing shots (the arena, the curtain, the felt, the poster) and drew every figure, chart and frame in code. The other reading, a painted frame cut to the chart's exact shape (e.g. the booth's own window), would need a fixed aspect per breakpoint; T2's booth is used as an establishing shot for that reason.
