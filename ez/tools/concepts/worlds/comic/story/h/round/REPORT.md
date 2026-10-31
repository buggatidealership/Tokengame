# Round H, area `round`: what a visitor sees when a round opens

Brief: `../BRIEF-H.md` (with its addendum: no take names the pool here, so the 69% line does not come up). Rounds: R78 Intel (graded, film), R57 GE Vernova (graded, a tie: Claude and Grok), R80 Exxon Mobil (graded, no film), R71 Starbucks (graded, no film). **No round has calls in and no result today** (R81 onwards have no calls in the sheet), so the pending face is shown on **R80 replayed as it stood before its close**: its real calls and dates, the result and grade withheld. That is a mockup device only; the build would read PENDING.

Boards: `ez/x2p-x3p-h-round-390.png` and `ez/x2p-x3p-h-round-1280.png`. Today's live pop-up first, then T1 to T5; the 390 board ends on a close-up of each take's turned back.

How it runs: serve `ez/` (`python3 -m http.server 8941`), `node run.js <out> now,t1,t2,t3,t4 390,1280 78f,78b,57b,80f,pf`, T5 with shots `80fw-xom-a2k,...` (`w-<image>` puts that Hedra world in the window), then `/usr/bin/python3 board.py <out> 390 <png>`. run.js opens the real X3+ page at `#/round/n`, waits for the live pop-up, reads its grade word and number from the live label (`.zlab .ds/.gr`, the page's own ezGrade), hides `#x2pRm`, and mounts the take over the page. Run the shots one process at a time: four in parallel timed out the local server.

Files: `_r.js` / `_r.css` (shared: `RH.data(n)` reads ROUNDS, `__x2pPnl()` (per-round P&L `A[m].per[n].v`, `usd()`), CO_LOGOS, RMETA, MODEL_KEYS; hand-tuned shapes: seeded wobbly ink frames with a thick outer and thin inner line, a tapered brushed arrow, a drawn cross, a drawn crown, a layered burst with every spike its own length), `t1..t5.js/.css`, `hedra.py`, `jobs*.json`, `jobs.jsonl`.

Every word and number is page text. Every number is read from the page: grade (live label), right count, average miss of the right calls, calls (sign, size), the close, the winner(s), the winner's P&L on the round, the dates. Nothing is typed.

## The takes

**T1 The slab, for real (3D first, comic ink).** The PSA holder becomes a painted acrylic slab (Hedra plate, nine-sliced as the frame), the label on Hedra holo stock with a cream wash, the grade an extruded number (the one loud treatment), the film in the window. Turned, the window holds a certificate on Hedra security paper (guilloche border painted, not drawn by CSS): ranked calls, Pass and Fail as rubber stamps each at its own angle, multiplied into the paper, the winner's row lit gold with a drawn crown, the close on a torn yellow strip, Calls filed and Graded on as pasted slips, a painted hologram seal with the EZ. logo in it. Pending: "Locked in!", the calls in filed order, empty dashed stamp slots, "The close ?", a red LOCKED stamp. Arrows are brushed ink arrows, the close a drawn cross.
- Closest to today, so the least learning for a returning visitor; the acrylic frame is the most "3D" element of the five.
- How it could fail: the acrylic plate is one painted image stretched by nine-slice, so its corners repeat at every size and a sharp eye sees the stretch on desktop; the slab is taller turned than front-up (the foot changes), so a turn makes the card jump; the label's holo is washed down to stay readable and may read as plain pink paper.

**T2 The issue (pop art).** The round is a comic book. Front = its cover: "$EZ Season 1" mast, "Round 78" as the extruded masthead, the grade in the corner box where a cover prints its price, the film as cover art, the company on a tilted caption, "2 of 4 right!" in a burst. Turning = "Open the issue": one page of four panels in reading order: 1 they predicted (each AI says its call in a balloon), 2 the bell (the close in a burst, green or red), 3 the market grades every call (Pass!/Fail! stamps), 4 the closest wins (crowned, with % off and its P&L on the round; "Shared crown" on a tie, "Nobody called it" when no one did). Desktop shows the open spread, cover left, page right: no turn needed.
- It teaches the round as a story every time it is opened (lesson 39: one beat per panel), which no other take does.
- How it could fail: on a phone the page is long and dense (four panels, small balloon type at 12px); the masthead and the burst both shout, which bends the one-loud-thing rule; a no-film, no-world cover falls back to the company logo on newsprint, and Exxon Mobil's mark (the double X) reads like a big red "wrong" cross there.

**T3 Case file (noir ink, one gold spot).** Front = a Hedra manila folder under blind light, the film a glossy print paper-clipped to it (clip drawn), Subject / Opened slips, the grade struck as a red double-ring stamp. Turned = "Verdict" typed on Hedra onion skin: four statements with dotted leaders, Pass/Fail stamped, the winner ringed in red pencil (drawn round the name only, never over the number), "The close" with the move, one line "Closest: Claude, 22.58% off.", a gold seal (the painted hologram toned gold). Pending: the folder sealed with yellow-and-black evidence tape, "Sealed until the close", the statements with empty stamp slots.
- The most adult take; fits "track, don't trust" (a case you can audit) and gives the pending state real drama.
- How it could fail: noir is far from the rest of X3+'s bright comic, so it may feel like another site; Special Elite typewriter type is lighter to read on a phone; the logo fallback in noir is the logo inverted grey; the tape crosses the print's lower half on purpose, which hides part of the art (never a number).

**T4 The Season 1 ticket (anime cel).** The round is the ticket you held for it: a green-over-red stub with the round number, a Hedra card-stock body with a die-cut film window and notches at the perforation, the grade in a yellow cel-shaded token, "Admit one · 2 of 4 right". Turned = the reverse: ranked calls in cel-shaded rows, Pass punched as a round hole, Fail as a diamond hole, the winner's row in two-tone gold with a crown, the market in a cel-shaded box, dates and seal. Desktop: one landscape ticket, film and result side by side through the perforation, no turn.
- Built from the object the site already owns (Season 1 tickets); the punch holes encode Pass/Fail by shape as well as word.
- How it could fail: the cel shadow band is a diagonal tint over the whole ticket, close to "one effect over an area"; at 320 the stub narrows to 44px and the round number is tight; Pass/Fail at 13px small caps is the quietest of the five.

**T5 No film? The company's world, painted (on T1's slab).** For a round without a film the window holds a Hedra painting of the company's world, never a logo on a blank: each draws on the company's history, place and era, each in its own art style, as the owner's films do. No text, no letters, no numbers in any of them (checked at full size). Exxon Mobil: a (gpt-image-2, 2K high) an 1880s Standard Oil river refinery as a hand-coloured steel engraving; b (seedream) an offshore rig in a 1930s Art Deco poster; c (seedream 1440) the 1901 Texas gusher as a comic panel. Starbucks: a (gpt-image-2, 2K high) Pike Place waterfront 1971 as a green woodcut with a crowned figurehead; b (seedream) a rainy Seattle roastery, 3D with comic ink; c (seedream 1440) the first shop as a three-ink screen print.
- My pick: Exxon a and Starbucks a at 2K: the engraving and the woodcut are crafts of the companies' own eras and read as made objects.
- How it could fail: it is a picture of the company, not of the round: unlike a film, it shows no calls and no result, so the front says less than a film front (the result is one turn away; the label carries the grade); 1:1 1080p seedream art softens at 1280 inside a 430px window less than at full size but still shows on a retina laptop; the 1080p Starbucks woodcut (b-roll `w-sbux-a.jpg`, not on the board) drew a bare-chested mermaid figurehead and the 2K prompt asking for the mermaid was refused by the provider's moderation, so the 2K version is a crowned sea spirit instead: the real Starbucks siren cannot be painted this way, so the art alludes to it; Exxon c shows cowboys watching a gusher, which some may read as celebrating a spill.
- Cost per company: about $0.07 (seedream) to $0.43 (gpt-image-2 2K high). A whole season of no-film rounds (today about 10 of 80) would be $0.70 to $4.30.

## Checks run
- 390, 1280 and 320px: no sideways scroll on any take (scrollWidth = viewport), no page errors or console errors; the overflow scan flagged T3's evidence tape (it runs past the folder edge on purpose and is clipped by the folder) and was tightened.
- Nothing over a number or a face: T3's red-pencil ring first ran across Claude's "6%" and was moved round the name; T1's two-winner foot (R71, R57) pushed the turn button into a column and now wraps under the names.
- Rule 0: no white or pale module grounds except the materials that are the card (paper, onion skin, ticket stock, newsprint); no native emoji; ticks, crowns, arrows, close and bursts drawn; no box filled with dots; company always name and ticker.
- Words: "Pass/Fail", "Winner", "The close", "Calls filed", "Graded on" kept from today; nobody is called a winner where the sheet has none.
- Zoomed: the 390 board's close-up row compares the turned backs at 2x. Against a real comic page, T2's balloons are the most comic and T3's stamps the most convincing as made marks; T1's Pass/Fail stamps are a CSS border with a slight radius and read as stamps only at arm's length.

## Two readings
- "Paint the materials... and draw every number and word as page text": I read the slab, label, paper and stamp as painted plates under page text; the other reading (painted objects with text-free areas the text sits in) is what T1's acrylic is (a painted holder with an empty window).
- "the arrows and the close button": redrawn in every take (brushed arrows, a drawn cross); the live page's behaviour (swipe, arrow keys, Escape) is assumed unchanged.

## Hedra jobs
Balance is shared with the other area helpers, so per-job estimates are the record (every charge equalled its estimate in earlier rounds). Total for this area: **$2.04 at most** ($1.61 if the moderation refusal was not billed).

| Job | Model | Settings | Cost | Time | File | Result |
|---|---|---|---|---|---|---|
| m-acrylic | gpt-image-2 | 3:4, 1K, medium | $0.0366 | 34 s | img/m-acrylic.jpg | Came back as a whole slab holder (bevelled acrylic frame, empty window), not a flat plate: used as T1's nine-slice frame. The best surprise. |
| m-holo | gpt-image-2 | 3:4, 1K, medium | $0.0365 | 36 s | img/m-holo.jpg | Rainbow foil with ink sparkles; too loud under text, used under a cream wash. |
| m-certpaper | gpt-image-2 | 3:4, 1K, medium | $0.0365 | 34 s | img/m-certpaper.jpg | Cream bond paper with a red/green guilloche border, as asked. |
| m-seal | gpt-image-2 | 1:1, 1K, medium | $0.0531 | 44 s | img/m-seal.jpg | Milled hologram seal with a star; cropped round, the EZ. logo set in its centre. |
| m-newsprint | gpt-image-2 | 3:4, 1K, medium | $0.0365 | 33 s | img/m-newsprint.jpg | 1960s cover stock with a fold; good. |
| m-manila | gpt-image-2 | 3:4, 1K, medium | $0.0365 | 33 s | img/m-manila.jpg | Manila folder with tab, coffee ring and blind shadows; strong noir. |
| m-onion | gpt-image-2 | 3:4, 1K, medium | $0.0365 | 44 s | img/m-onion.jpg | Crumpled onion skin with a blue margin; good. |
| m-riso | gpt-image-2 | 3:4, 1K, medium | $0.0365 | 34 s | img/m-riso.jpg | Rejected: a green/red leaf pattern, not plain riso stock. |
| m-ticket | gpt-image-2 | 3:4, 1K, medium | $0.0365 | 34 s | img/m-ticket.jpg | Cream cotton card stock; fine, quiet. |
| w-xom-a | seedream-50-pro | 1:1, 1080p | $0.0675 | 97 s | img/w-xom-a.jpg | Refinery engraving; good, softer than the 2K. |
| w-xom-b | seedream-50-pro | 1:1, 1080p | $0.0675 | 96 s | img/w-xom-b.jpg | Art Deco rig, flare and tanker; bold, the most "poster". |
| w-sbux-a | seedream-50-pro | 1:1, 1080p | $0.0675 | 86 s | img/w-sbux-a.jpg | Green woodcut harbour; the mermaid figurehead is bare-chested: not used on the board. |
| w-sbux-b | seedream-50-pro | 1:1, 1080p | $0.0675 | 108 s | img/w-sbux-b.jpg | Rainy roastery, 3D with ink; warm, the least "historic". |
| w-xom-a2k | gpt-image-2 | 1:1, 2K, high | $0.4287 | 139 s | img/w-xom-a2k.jpg | The best: crisp engraving, sepia and oxblood, a paddle steamer; no text. |
| w-sbux-a2k (1st) | gpt-image-2 | 1:1, 2K, high | $0.4287 (if billed) | 128 s | none | FAILED, MODERATION_FAILED (the mermaid). |
| w-sbux-a2k | gpt-image-2 | 1:1, 2K, high | $0.4287 | 157 s | img/w-sbux-a2k.jpg | Woodcut with a crowned sea-spirit figurehead, gouge marks, fishmongers; strong. |
| w-xom-c | seedream-50-pro | 1:1, 1440p | $0.0675 | 101 s | img/w-xom-c.jpg | 1901 gusher comic panel with riders; dramatic (see the risk above). |
| w-sbux-c | seedream-50-pro | 1:1, 1440p | $0.0675 | 101 s | img/w-sbux-c.jpg | Three-ink screen print of the first shop; clean. |

Two first submissions of w-xom-c and w-sbux-c were refused at submit (400: seedream's 1440 option is named "1440p (2K QHD)"); nothing was charged.
