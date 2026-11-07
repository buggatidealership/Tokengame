# Round H4 · cover3: today's first screen, every element reinvented, four simpler takes

Boards: `ez/x2p-x3p-h4-cover-390.png` (today's live cover, then T1 to T4; the red line is where a 390x844 phone's first screen ends), `ez/x2p-x3p-h4-cover-1280.png`, close-ups at 3x of each element of each take: `ez/x2p-x3p-h4-cover-close.png`.

Run: serve `ez/` (`python3 -m http.server 8961`), then `node run.js <out> now,t1,t2,t3,t4 390,1280,320` (`CU=1 DPR=3` adds close-ups); boards with `/usr/bin/python3 board.py <shots> 390|1280|close <out>`. Each take is `_t.js/_t.css` (builder over the live DOM) + `_m.js/_m.css` (the shared recipe of the contents) + `tN.js/tN.css` (its object family, lettering and materials), laid over the built X3+ page. Mockups only; no live file touched.

## What the owner asked, and what I kept
- **Today's layout, unchanged:** helper h's H1 structure is reused node for node (issue strip, Starring corner box beside the headline, the 2x2 loop with its hub and arrows, the film with its live F3 frame, the button). Only what is inside each piece is replaced. Desktop keeps today's two columns.
- **Simpler than K1 to K5:** no new objects between the steps, no clock row, no hero ticket: one object family per take and one picture per step.
- **The cast are the founders:** every mark is one of the four founder characters (`media/founder-<m>-anim.jpg`, the poster frame of each animated portrait). No robots, no invented faces. In T1 and T3 Hedra re-made each founder from that portrait as a coin or a wax seal (likeness checked by eye: glasses and curls for Claude, the visor for Grok, the white armour for GPT, the flight suit for Kimi).
- **One consistent object for the four marks** (the owner's note): T1 all coins, T2 all tickets, T3 all wax seals, T4 all inked cameo rings. The same object is used everywhere a model appears on the cover (Starring, step 1, step 2's grading row, step 3, step 4).
- **The story the screen must tell in seconds, one carrier each:**
  - Season 1, so a Season 2 is coming: the strip's first cell, "Season 1 / Season 2 next".
  - Starring four AIs: the four founders in the corner box, names only, no numbers.
  - Before a company reports, each AI submits its prediction: step 1, the company's own logo and "Name (TICKER)" on a plate, each founder below it with a balloon holding its real call (green up, red down, the size). Real data: the newest round with calls in, else the newest graded round. Today (Saturday 31 Oct) no calls are in for Monday, so it is round 80, Exxon Mobil (XOM): GPT up 2.5%, Claude down 1%, Grok down 1.3%, Kimi up 1.5%.
  - The market grades them: step 2, a painted brass exchange bell that swings, its sound is the move in a hand-drawn burst (+2.17%, green), and under it each founder stamped pass or fail (GPT and Kimi pass, Claude and Grok fail). Step 2 always uses the newest graded round (it needs a move).
  - The top model gets the golden ticket: step 3, the leader's own mark set into a painted gold ticket, with its name and season P&L (Grok, +$148,480, from `__x2pPnl`).
  - We follow its call on the bet: step 4, the same golden ticket laid on the NVIDIA chip (the live bet section's own painted chip, `media/bet-chip-h2.jpg`) with "Bet #1 · NVIDIA". No pool, no 69%, no buyback on the cover.
- **Captions re-lettered:** no stock comic font. Each take sets its own type for its material, every glyph at its own angle, size and baseline (`T3.letters`): T1 engraved Cinzel on brass, T2 Bitter slab on card with an Ultra wood-type headline, T3 Caveat Brush handwriting on parchment, T4 Kalam hand lettering in yellow caption boxes. "AIs" keeps its lowercase s.
- **Hand-tuned shapes:** every plate, caption box, balloon, burst, stamp, arrow band and panel frame is drawn as its own irregular path (two-tone fill, thick outer ink, thin inner line, a light edge); no plain CSS box frames a module.
- **Painted grounds (Hedra):** the masthead is the stock exchange at night under a sunburst (`gm`), the loop sits on a sunburst over the financial district (`gl`, `gld` for desktop), and each step has its own scene: a boardroom with four spotlights in the four models' colours (step 1), the trading floor at the close (step 2), a curtain reveal (step 3), the NVIDIA chip (step 4).
- **Headline:** the loudest treatment, once: extruded lettering through the page's own `POP.ext` (gold struck metal in T1, cream wood type in T2, red wax in T3, the pop cover's gold in T4), fitted to its column.
- Step 4's caption reads "We follow its call on the bet" (the owner's words); "Every call stays on the public record" is gone from the cover. Step 1 reads "Each AI predicts the move before earnings" ("predictions" reads easier than "calls", owner 30 Oct).

## Checks run
- 320, 390 and 1280px, every take: no sideways scroll (`scrollWidth` = viewport), no page or console errors. The only element past the edge is the film frame's `hcf-p`, already on the live page.
- Rule 0 list: no white or pale module grounds (every panel is a painted scene; the company plate in step 1 is the one light card, it carries a logo made for light grounds); containers hug their content; nothing is laid on a logo or a face (the balloons sit between the logo and the founders); no emoji (the ▲/▼ in the balloons are text glyphs, the ticks are drawn stamps); no area filled edge to edge with dots; name and ticker together on the company plate.
- Data: `window.__t3` in each shot: lead GROK, example XOM #80 graded, calls GPT+2.5 CLAUDE-1 GROK-1.3 KIMI+1.5, move +2.17, pass GPT/KIMI, fail CLAUDE/GROK, lead P&L 148480, next report day 11/2/26.

## If accuracy and P&L ever split
Today the golden ticket holder is the P&L leader (`SE.lead()`, Grok). Every take reads the leader once and uses it in Starring (gold version), step 3 and step 4, so a change in leader moves the gold everywhere. If the owner's "top in accuracy and P&L" means the ticket must go to whoever leads both, and they split, each take would show the P&L leader as today; a second, smaller "most accurate" mark would be needed, and I would not add it to the cover (it would make the loop harder to read). The caption says "Top P&L" so the picture and the words agree.
- T1 has a gold coin only for Grok (`coin-grok-gold`). If another model takes the lead, its silver coin shows in the gold ticket (a gold copy costs about $0.07 per model and should be made before the switch).
- T2 and T4 need nothing (the gold ticket and the gold ring are drawn per leader). T3 gilds the leader's seal with a glow, for any model.

## How each could fail
- **T1 Minted:** four silver coins look alike at a glance until you read the faces (the coins are the most faithful painted object, but colour no longer separates the models); brass, gold and gold-on-gold in step 3 is one hue family; Cinzel's small capitals at 9.5px are harder to read than today's captions, and Cinzel has no lowercase (the captions read in capitals).
- **T2 Season tickets:** the founders are small inside the ticket windows on phones (about 22px in step 1); a ticket shape at 40px reads as a pill. The ticket is also the golden ticket's shape, so "golden ticket" is less special when every mark is a ticket (or more: the leader's is simply the gold one; a matter of taste).
- **T3 Sealed:** the strongest at a glance (each lab's colour is the wax), but wax seals read as "approved" or "official", which can be mistaken for an endorsement; Grok's black seal on a dark ground is the weakest; brush handwriting is the least legible lettering of the four at 12px.
- **T4 Cameos:** the simplest and cheapest, and the founders' own art is untouched, but it is the closest to today's circles: the owner may read it as "today with portraits". The coloured rings are drawn, not painted.
- **All:** the step pictures are small on a phone (each panel about 165x100px), and the cover is about 30 to 70px taller than today's at 390 (the first screen still ends on the film's top). The grounds are busy behind small text in places (the strip's plates carry it). The bell swings in a loop (off with reduced motion). The founders were re-rendered by a model in T1 and T3: likeness is close but not exact (Kimi's founder reads younger as a coin). Safari not checked (background-clip, SVG `clip-path:path()` in the balloons).

## Pick
**T1 Minted**, if one: it is the owner's "all coins" note taken literally and the most finished painted object, the founders' faces read even at 40px, and the gold coin makes the leader obvious without a word. A close second is **T3 Sealed**, which separates the four models by their own colour at a glance; a hybrid worth building next is T1's coins struck in each lab's colour metal (green, copper, gunmetal, cobalt) to get both.

## Hedra jobs
All gpt-image-2, 1K medium, png, every charge equal to its estimate. Objects on chroma green, keyed with `key.py` into `img/cut/*.webp`. Founder refs uploaded through `POST /v3/files` (`gen.py` takes `"refs"`). Total about **$0.99** of the $12 (the failed first Grok seal is counted, in case it was charged). No 2K renders: the objects show at 15 to 90px, and the 1K cut-outs are 690 to 700px wide, so 2K would add nothing visible.

| Name | Settings | Cost | Time | Result |
|---|---|---|---|---|
| bell3 | 1:1 | $0.054 | 42 s | brass bell on a cast-iron bracket and mahogany plate, mid-swing; a small yellow spark at the rim |
| tk-cream | 16:9 | $0.030 | 34 s | Season ticket, green and red ends, empty round window |
| tk-gold | 16:9 | $0.030 | 26 s | gold-foil ticket, empty cream window |
| coin-gpt / -claude / -grok / -kimi | 1:1, founder ref | $0.066 each | 82 to 90 s | antique silver coins with the founders in relief; likenesses close |
| coin-grok-gold | 1:1, ref coin-grok | $0.065 | 49 s | the same coin in gold |
| seal-gpt / -claude / -kimi | 1:1, founder ref | $0.066 each | 76 to 77 s | wax seals in green, orange, blue with the founders pressed in |
| seal-grok | 1:1, founder ref | $0.066 | 74 s | FAILED (no reason given) |
| seal-grok (retry, "charcoal-black") | 1:1, founder ref | $0.066 | 43 s | black wax seal |
| pg1 | 16:9 | $0.029 | 70 s | boardroom, four spotlights in the models' colours |
| pg2 | 16:9 | $0.029 | 69 s | trading floor at the close, confetti |
| pg3 | 16:9 | $0.029 | 69 s | red curtain, gold sunburst |
| pg4 | 16:9 | $0.029 | 63 s | open vault with a green glow; not used (step 4 uses the live bet's chip) |
| gm | 16:9 | $0.029 | 28 s | stock exchange facade at night under a sunburst (blank banners) |
| gl | 3:4 | $0.037 | 34 s | sunburst over the financial district, phone |
| gld | 16:9 | $0.029 | 29 s | the same for desktop |
