# Round H12 · cover7: today's cover with the loop's four panels as painted objects

**Boards**
- `ez/x2p-x3p-h12-cover7-390.png`: today's live cover first, then four treatments with step 4 = A. Under each treatment are its three step-4 options (A, B, C). At the bottom: a 2x close-up of my pick, and the closed/opened pair (the brief's "second option only").
- `ez/x2p-x3p-h12-cover7-1280.png`: today's cover, then S, P, O and L at 1280.

**How to run it**
1. Serve with `node serve.js /home/user/Tokengame/ez 8973` (it handles Range requests).
2. Shoot with `node run.js <out> now,s-a,s-b,...,l-c 390,1280,320`. Each take is `<treatment>-<step 4 option>`.
3. Make the boards with `/usr/bin/python3 board.py <out> <board390> <board1280>`.

`c7.js` and `c7.css` are laid over the built `ez/v47-live-x3plus.html`, and `window.__c7={t,o}` picks the take. Nothing else on the cover changes: the issue strip, Starring, the headline, the hub, the arrows, the film and the button are all live and untouched.

## What I made
- **Today's layout, the same nodes.** The 2x2 loop with "Every round" in the middle keeps its place.
- **The panels.** Each panel is now a square painting under a hand-drawn caption plate: an irregular quad with a thick outer ink line and a thin inner one, seeded so it is stable between loads. Every object is shown open, so its fact can be read without a tap. There is no tap and no clip; the only motion is today's slow lit cycle around the ring.
- **Step lines**, in the owner's words from H6:
  1. "They predict the move **before** earnings"
  2. "The market close grades every prediction"
  3. "#1 on the leaderboard holds the golden ticket"
  4. "We follow its call on the bet"
- **Facts.** All are live: the newest graded round comes from `ROUNDS`, the leader from `SE.lead()`, and the P&L and W-L from `__x2pPnl().A`. Today that reads:
  1. **The letter (step 1)** is open, the card pulled out: "Exxon Mobil (XOM)", then GPT ▲2.5%, Claude ▼1%, Grok ▼1.3%, Kimi ▲1.5%.
  2. **The bell (step 2)** rings over a slate: "XOM closed ▲2.17%" / "2 of 4 right · GPT closest".
  3. **The golden ticket (step 3)**: "GROK" on its name plate, P&L +$148,480 and W-L 45-27 in its two panels, "#1" on the stub.
  4. **Step 4, three options:**
     - **A, coming attractions:** the left poster is lit, with "Bet #1" and NVIDIA's own logo; the two dark posters read "Bet #2" and "Bet #3".
     - **B, the vault cracked onto Bet #1:** gold light comes out of the gap, and the brass plate reads "Bet #1 / NVIDIA".
     - **C, the slip under the grille:** the slip reads "Bet #1 NVIDIA", and the red stamp ring reads "GROK".
- **Four treatments.** All four use the same objects as the box helper. For S, P and O, gpt-image-2 repainted each object with the box's ink painting as a reference for layout only. All are bright; none is noir.
  - **S, Silver Age flat print:** a nib line, flat green, sky-blue, red and gold grounds, and dots only in the shadows. The loop sits on a flat gold ground with a fine red dot screen. Live text is set in Bangers, the Overview's one heading face, in ink, chalk and gold on the objects.
  - **P, today's pop palette, pushed loud:** thick outlines, primaries, a cyan ground, white caption plates and Bangers capitals.
  - **O, mine: a fairground sign-painter:** gold leaf with a black outline and a red drop shade, painted panels with pinstripes, Alfa Slab One lettering and a royal-blue ground with a gold pinstripe border. It suits a box-office world, and lettering is what sign-painting is for, so the words belong to the objects.
  - **L, the logo's flat badge:** the box helper's style-2 paintings, reused as they are for the bell, vault and slip, plus three new paintings (a larger letter card, a larger ticket, and a full-width poster wall). It uses Kanit black italic on a black ground with green and red slashes, and gold caption slabs.

## The surface under every live text
Every live word sits on a blank surface the painting carries for it. Positions are % of the painting, so the text stays on its surface at any width. Each text is fitted to the largest size whose ink fits the surface. The rendered sizes per take are in `inv/*-390-inv.txt`.

| Text | Painted surface | Medium |
|---|---|---|
| Exxon Mobil (XOM) | the card's header strip | ink (S, P, O), cream (L) |
| four predictions | the card's four ruled rows, name left, call right | ink with green ▲ and red ▼ |
| XOM closed ▲2.17% / 2 of 4 right · GPT closest | the black chalk slate under the bell | chalk white, green/red move |
| GROK | the ticket's name plate | gold (S, P, L), gold leaf (O) |
| P&L +$148,480 / W-L 45-27 | the ticket's two lower panels | cream with a green P&L |
| #1 | the stub's round badge | gold |
| Bet #1 + NVIDIA logo / Bet #2 / Bet #3 (A) | the lit poster / the two dark posters | ink on the lit poster, gold on the dark ones |
| Bet #1 NVIDIA (B) | the brass plate above the wheel | engraved: dark letters with a light lip |
| Bet #1 NVIDIA / GROK (C) | the slip / the red stamp ring | ink / red |

## Plain text outside the world
- **The same in every take:** the four step lines (26 words) and "Every round" (2 words).
- **Where the step lines sit:** they are narration captions on hand-drawn plates in each treatment's own look (lesson 104), not on painted surfaces.
- **Inside the four panels:** no free text at all.
- **The rest of the cover:** unchanged from today (strip, Starring, headline, film), so it is not counted.

## My pick: S with step 4 = A
- **Why S:**
  - It is the Silver Age flat-print style the H11 chapters were asked for, so the cover and the chapters read as one book.
  - Its flat grounds take the cover's gold ground without a seam.
  - It is the most legible take at 390.
- **Why A:** its picture alone says the NVIDIA bet is the first of several (one lit poster, two dark ones), with no sentence.
  - B spends the bet chapter's vault on the cover (lesson 87).
  - C's slip is too small to read on a phone in two of the four treatments.
- **Runner-up: O.** It is the take whose lettering looks most made by its objects, but gold-on-gold makes the step-1 card darker and busier.

## How each take could fail
- **All takes:**
  - **The loop grows.** Square paintings make it about 110px taller at 390 (grid 333 → 442px) and about 160px taller at 1280. On desktop, that leaves a larger empty band under "Meet the four models" in the right column; the band is there today but bigger now.
  - **Small type.** The predictions sit at 9.2 to 10.1px at 390, and at 320 they are around 8px. Ten rounded rows on a 148px card is the limit of "at that size".
  - **Alignment.** The text sits on its surfaces by eye from a 5% grid. On the tilted tickets it is within about a degree of the painted rules; a 2K repaint would need measuring (pnl2's homography).
  - **Resolution.** These are 1K paintings. That is enough at ≤220 CSS px per panel, but soft if a panel ever grows.
- **S:** the lit poster is cream, a pale surface inside a module. It is lit on purpose, but by the hard rules it is close to the line.
- **P:** the cyan ground is the loudest of the four and fights the gold masthead above it. The capitalised Bangers captions run to three lines.
- **O:**
  - The gold-leaf step-1 card puts dark ink on gold-on-gold, so it reads busier.
  - The ticket's P&L falls to 8px at 390.
  - The slip (option C) is unreadable at 390 (5.8px).
  - The painted wood grain makes the panels the heaviest of the four.
- **L:**
  - Kanit black italic is wide, so the predictions sit at 9.2px.
  - The slip text in option C is unreadable at 390.
  - The cover becomes black inside a cream and gold masthead, a style break unless the rest of the cover follows.
- **Step 4 C (the slip) in every treatment:** the slip is a small object in a big scene. Even zoomed to 2x it reads at 9.7 to 10.3px in S and P, and fails in O and L.

## Checks run
- **Widths.** 320, 390 and 1280px, every take: no sideways scroll, no page or console errors, and no text over a logo or a face (there are no faces).
- **Overflow.** The "OVERFLOW" flags in `inv/` are line-box height on Anton/Kanit glyphs; the ink fits, and I checked by eye at 2x.
- **Rule 0:**
  - no white or pale module ground (except the lit poster in S, noted above);
  - containers hug their content: captions are equalised so every painting is the same square, and nothing sits empty under a painting;
  - no emoji;
  - no area filled edge to edge with dots: S's dot screen is a fine tint on the loop's ground, not the panels';
  - name and ticker together on the letter;
  - no founders anywhere on the cover.

## Cost
**$1.78** of the $10, 27 gpt-image-2 jobs, all 1K/medium at $0.054 to $0.066 each, every charge equal to its estimate. Every prompt is in `log.jsonl`.

| Jobs | Cost | Result |
|---|---|---|
| letter-s (no ref) | $0.054 | pilot; it left a cream band at the top, rejected |
| 18 × `<obj>-<s,p,o>-r` (letter, bell, ticket, vault, slip, billboard; box ink painting as ref) | $1.19 | all usable; the posters too small, so redone below |
| billboard-s/p/o/l-2 | $0.27 | full-width poster walls; the posters are about 2x larger |
| letter-l-2, ticket-l-2 | $0.13 | larger card and ticket for L (the box versions read at 7px) |
| letter-s-closed, ticket-s-closed | $0.13 | the closed/opened pair (sealed envelope, ticket face down) |

There was no 2K render: the panels show at ≤220 CSS px, and the 1K paintings hold at 2x. The pick should be repainted at 2K, with its surfaces sized for the words, before it is built.
