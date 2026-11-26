# Round H3b, area `proof2`: "Smart or lucky?" on the X3+ Overview

Brief: `../BRIEF-H.md`, section "Round H3b". Six takes, each a different idea of how to answer the section's two questions,
**do the AIs beat a coin flip?** and **are they getting better?**, laid over the real built page (`ez/v47-live-x3plus.html`) in
Playwright. Mockups only; no live file touched.

Boards: `ez/x2p-x3p-h3-proof-390.png` (today, then A to F at a 390px phone, a 3x close-up row under them) and
`ez/x2p-x3p-h3-proof-1280.png` (the same at 1280px).

## The story, before any take
- **Story:** four AIs say they can call earnings; a coin says it can too. Who has actually beaten the coin, and is anyone pulling away?
- **What the data says today (80 graded rounds):** Grok 63% (45 of 72), Claude 60% (48 of 80), GPT 55%, Kimi 46%. A coin matches
  Grok about 1 time in 45, Claude 1 in 22, GPT 1 in 5. **Nobody is clearly getting better:** first half to last half of each AI's
  own calls, Grok 67% to 58% and Claude 63% to 57% fall, GPT 53% to 57% and Kimi 45% to 48% rise, and every one of those swings fits
  inside what a coin does on 40 flips (35% to 65%). Every take shows the two leaders slipping and says the swings can be luck
  (lessons 8 and 16): none implies a hot streak, none calls a decline either.
- **Facts → carriers:** the coin's range → fog (A), a pile of coins (B), the small print (C), a gold line down the jar (D), a band on
  the screen (E), a flag (F). Getting better → the line's course (A), two marks on one axis (B), before and after panels (C), rows
  stacked by time (D), the pulse (E), a second hollow flag at the recent pace (F). The odds ("1 time in 45") appear in every take,
  the strongest fact the round-H takes lost (`../proof/REPORT.md`).
- **Words left:** labels, the odds line, one caption per take.

## Data (all live, nothing typed)
`_d.js` builds on `../proof/_p.js` (PQ.data: each AI's calls in order from ROUNDS) and `__x2pPnl()` (W, L):
- hit rate = W / calls; the running line uses the page's own (W+1)/(n+2);
- odds = the page's own binomial tail (world-comic.js `coin()`), so "1 time in 45" matches today's section exactly;
- first half / last half = each AI's own calls split in two (Grok 36 + 36, the others 40 + 40);
- B's pile = the exact binomial for the same number of calls, ×1,000; "beats N of 1,000" = P(coin < AI) + half of the ties;
- E's pulse = right calls in each AI's last 20 calls, after every call from the 20th;
- F's flag = calls after which a coin matches the hit rate only 1 time in 20, if the rate holds: (1.645 × 0.5 / (rate − 0.5))²
  (one-sided normal approximation; Grok 44, Claude 68, GPT 271; Kimi none). The hollow flag uses the last-half rate (Grok 98,
  Claude 121, GPT 121).
- The coin's range: 50% ± 1.96 × 0.5 / √n.

## The takes
Every take: the headline hand-lettered (each letter its own size, angle and baseline, `P2.letter`) and extruded, the one loud
treatment; the inside quieter (caption boxes, drawn ink frames, drawn coins, drawn flags and cars). Founders' portraits are the
characters (posters, files unchanged). Every painting prompted "no text, no letters, no numbers"; checked at full size, none has any.

**A · Out of the fog** (gpt-image-2 1K, $0.03). A lighthouse at night; each AI's hit rate sails through the fog of luck, three
scalloped ink-edged layers drawn from the coin's range, thinning with every call. Grok's figure turns gold: out of the fog, barely.
Under it, four tilted caption tickets: "out of the fog / in the fog / under the fog line", the odds, first half → last half.
- *Could fail:* a newcomer has to learn that the fog means luck (the caption says it, lesson 23 risk); the early calls swing wildly
  at the left edge; Grok's line is drawn cream (its black would vanish at night), which breaks its brand colour.

**B · 1,000 coins (my pick)** (gpt-image-2 2K high, $0.22, after a $0.07 seedream draft). A giant coin under a spotlight opens the
section: "Give 1,000 coins the same test." Then the pile itself: every column a stack of hand-drawn coins (each with rim, inner ring,
highlight, a seeded tilt), the exact count of 1,000 coins that land on each score. Each AI is pinned where it lands, its face and
"beats 983 of 1,000 coins" ("747 of 1,000 coins beat it" for Kimi). Under it, "Getting better?" on the same axis: a hollow coin for
the first half, a full one for the last half, an arrow green or red, and the hatched band where a coin lands on 40 flips.
- Why it is the pick: it needs no legend (a pile of coins is luck; standing at its edge is rare), the number is everyday ("beats
  983 of 1,000 coins", lesson 24), it survives a longer season (lesson 44: the pile just narrows), and the second question sits on
  the same axis so the eye compares without reading.
- *Could fail:* four pins crowd when two AIs sit close (Grok 63% and Claude 60% are stacked in rows; at 320px a tag edge clips by a
  few pixels); the pile is for 80 calls while Grok made 72 (said in the caption, scored on its own count); a drawn coin is two coins.

**C · Before / after** ($0.04, newsprint). The back-page comic ad, told straight: "Getting smarter?" Before (first half of calls)
and After (last half) panels, the same blue in both (an ad would light "after" brighter, which would claim progress the data does
not show), bars with drawn ink frames, a dashed coin line, ▲▼ per AI. The small print (a coupon with drawn scissors) says a swing
this size can still be luck, and the season odds.
- *Could fail:* the ad genre promises transformation; the joke only lands if the reader sees that "after" is not better, and some
  may read the genre's promise instead (lesson 65 risk). The paper is a pale ground, multiplied to ochre to keep it off white.
  Answers "getting better" first and the coin second.

**D · The coin jars** ($0.03). Every call is a coin dropped in its AI's jar, green right and red wrong, in rows of ten from the
first calls at the bottom to the latest on top, greens sorted left so each row is a little bar against the gold line (a coin's
half). Greener rows higher up would be getting better; today they are not. Tags on top: right of calls, the odds.
- *Could fail:* sorting each row breaks the literal "dropped in order" picture; at 300 calls a jar is 30 rows tall (rows of 20 then);
  the coin's line does not show the spread a coin would have row by row (a ten-call row swings a lot).

**E · Pulse check** ($0.03). A 1970s patient monitor (the painting used as a border image around a live screen): each AI a
phosphor channel, the trace = right calls in its last 20, the yellow dashed coin line and a faint band where a coin's own pulse
swings on 20 flips. The reading: "13/20". Under it, first 20 → last 20 and the season odds.
- *Could fail:* a rolling window is the noisiest view (every trace lives inside the coin's band, which is the honest point but
  can read as "nothing to see"); the hospital metaphor (a patient) is a mood more than a meaning; the border image stretches the
  knob row a little at phone width.

**F · How far to the flag?** ($0.03). A desert highway opens; then a drag strip, one lane per AI: the car is where it is now (calls
made), the flag is where luck stops being a good excuse, a hollow flag where it would be at its recent pace. Grok and Claude are
past their flags but their recent pace pushes the flag further away; GPT has 191 calls to go and its recent pace brings the flag
closer; Kimi under 50% has no flag and drives the wrong way.
- *Could fail:* "a coin matches it 1 time in 20" is a convention I chose, and a flag looks like a finish line people may read as
  "proven"; the needed-calls formula is an approximation; a lot of text per lane on phones.

## Not used
`img/d-peaks.jpg` ($0.07, a mountain sea of clouds for a "climb" take: the net right-minus-wrong walk over the coin's range). Dropped
because it told the same thing as A with a second band chart (lesson 25).

## Paintings (Hedra)
| Job | Model | Settings | Cost | Time | File | Result |
|---|---|---|---|---|---|---|
| a-light | gpt-image-2 | 16:9, 1K, medium | $0.0291 | 34 s | `img/a-light.jpg` 1280x720 | Lighthouse, beam and sea fog in ink and halftone; the fog area open as asked. |
| b-coin | seedream-50-pro | 16:9, 1080p | $0.0675 | 87 s | `img/b-coin.jpg` 1920x1080 | Coin on a red stage; more render than comic; replaced. |
| c-paper | gpt-image-2 | 3:4, 1K, medium | $0.0366 | 34 s | `img/c-paper.jpg` 768x1024 | Yellowed newsprint with a fold; plain as asked (multiplied to ochre). |
| d-peaks | seedream-50-pro | 16:9, 1080p | $0.0675 | 76 s | `img/d-peaks.jpg` 1920x1080 | Peaks over a cloud sea, black frame on the left; not used. |
| e-monitor | gpt-image-2 | 16:9, 1K, medium | $0.0291 | 33 s | `img/e-monitor.jpg` 1280x720 | Cream monitor, blank green CRT, knobs, red lamp; screen measured at x 213-1102, y 75-538. |
| f-road | gpt-image-2 | 16:9, 1K, medium | $0.0290 | 33 s | `img/f-road.jpg` 1280x720 | Anime desert highway, mile posts, a blank arch; on brief. |
| d-shelf | gpt-image-2 | 16:9, 1K, medium | $0.0292 | 35 s | `img/d-shelf.jpg` 1280x720 | General store wall and counter in lamplight; the shelf for the jars. |
| b-coin-2k | gpt-image-2 | 16:9, 2K, high | $0.2219 | 78 s | `img/b-coin-2k.jpg` 2048x1152 | Milled coin, inked curtains with halftone, red/green rims; clearly better; used. |

Total spent: **$0.51** of the $12 cap (every charge equalled its estimate). Prompts in `jobs*.json` and `jobs.jsonl`.

## Checks run
- 320, 390 and 1280px, every take: scrollWidth equals the viewport, no page errors (`run.js` output). Overflow at 320: B's leftmost
  tag runs a few pixels past the edge (clipped by the module, no page scroll).
- Rule 0 list: no white or pale module grounds (C's newsprint is multiplied to ochre, the rest are painted night, velvet, wood,
  CRT, asphalt); no native emoji (coins, flags, cars, scissors, ticks are drawn SVG; ▲▼ are text glyphs); nothing laid over a face or
  a number; one loud headline per take.
- The page's h2 rule (Anton !important) would override the lettering, so headings are `role="heading"` divs.
- Zoomed at 3x and compared with a real comic page: the painted grounds and the drawn coins (B, D) hold up; the inner text is still
  a font in caption boxes, not hand lettering, and the charts in A and E are clean vector lines on painted grounds (A's lines go
  through a slight displacement filter). B's coins and D's jars are the most hand-made pieces.

## Readings that go two ways
- "Getting better": per call in order (all takes) vs per round of the season; I used each AI's own calls, since Grok skipped early rounds.
- "Beat a coin flip": as odds (today's line, kept in every take) or as a share of coins beaten (B). B shows both.

## How to run
Serve `ez/` (`python3 -m http.server 8952`), then from this folder: `node run.js <out> now,a,b,c,d,e,f 390,1280,320`
(3x close-ups at 390 unless `ZOOM=0`), boards with `/usr/bin/python3 board.py <out> 390|1280 <png>` (labels in `takes.json`),
paintings with `/usr/bin/python3 hedra.py jobs<N>.json` (key from `$HEDRA_API_KEY`, never printed).
