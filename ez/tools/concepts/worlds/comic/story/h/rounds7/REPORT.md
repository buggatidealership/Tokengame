# H25 · `rounds7`: Every round so far, more inspiration (2026-11-02)

Four new two-beat takes for the section after Meet the models on X2+, each in its own world (the brief lets this section leave the chip narrative). Every take keeps the two beats the owner liked in today's take B:
1. the whole season at a glance;
2. the newest rounds with each film's own frame, readable.

All four are laid over the built `v46-live-x2plus.html` with live data (80 graded rounds, R81 Palantir next, NVIDIA the last of 34 to come). The live take B is not touched.

**Boards** (`ez/`):
- `x2p-h25-rounds7-390.png`: today's live B, then A, B, C, D at 390px. Today's column is cut from the H24 board, because a fresh shot of the live B came out broken under the test browser's fonts.
- `x2p-h25-rounds7-1280.png`: the four takes at 1280px, shown at half size.
- `x2p-h25-rounds7-closeup.png`: at 3x, a piece of beat 1 and one item of beat 2 for each take.

**Folder:** `ez/tools/concepts/worlds/comic/story/h/rounds7/`.

## The takes

All colour coding follows lesson 129: each round wears its winner's chip colour as Meet the models introduced it (GPT green, Claude orange, Grok slate, Kimi blue; nobody: black or a cream ✗). The section's theme is earned from the characters above it.

| | World | Beat 1: the season at a glance | Beat 2: the newest rounds | 390px height |
|---|---|---|---|---|
| A | **The darkroom** | A contact sheet: every round's own film frame on a painted 35mm strip, in shooting order (R1 top left). The winner is circled in grease pencil in its colour (two loops on a tie, a cream ✗ for nobody). The next frame is unexposed and glowing. "80 exposed · 34 left on the roll · Last frame: NVIDIA". | The newest prints pegged on a drying line, two a row (four on desktop). A strip of masking tape under each is written in marker: logo and name (ticker), the move, the four AIs' marks (green right way, red wrong way, the winner circled), and "GPT wins". | 2469 |
| B | **The tile wall** | A mosaic, one glazed tile per round, in order: the glaze is the winner's colour, a tie splits the tile diagonally, nobody is black, the logo is fired on as a cream decal. The 34 rounds to come are bare clay. The next tile pulses gold-edged, and NVIDIA's is the gold tile at the end. | Picture tiles set into the wall: the film frame framed by a border of small tiles in the winner's glaze (split on a tie), and an enamel station plaque under each with name, ticker, move and marks. | 2026 |
| C | **The trophy case** | One shelf per model, ordered by rounds won. One cup per round won (the closest call), the company stamped on its plate; a tie puts a cup on both shelves. The shelf's light is tinted in the model's colour. The last shelf, "Nobody", holds knocked-over cups. Claude 28, GPT 25, Grok 16, Kimi 10, Nobody 6. | The newest rounds hung in gilt frames, each with an engraved brass plate: name (ticker), move, marks, who won. | 2066 |
| D | **The desk diary** | The season as a planner, Mon to Fri, week by week from Sep 7 to the NVIDIA bet. Each round is rubber-stamped on the day the market closed it, in the company's own brand colour, ringed in the winner's colour. Coming days carry a pencilled "7 due", today is highlighted, and NVIDIA's day is circled in red ink with "Bet #1". | The newest days as torn-off day pages ("30 Fri Oct · 10 rounds closed"), each listing its rounds: film frame, name, move, marks and the winner in ink. | 1710 |

Today's live B is 1274px at 390.

**Desktop:** both beats keep their shape at a larger size. A uses a 20-wide sheet and four prints a row; B a 19-wide wall and four tiles a row; C keeps one row of cups per shelf and four frames a row; D shows the planner at 860px and the day pages two across.

## Story brief (written before the first mockup)
- **Story:** the season is a pile of rounds that grows every weekday, each with a winner, racing to the NVIDIA bet. The newest rounds sit on top, still fresh.
- **Facts → carriers:**
  - every round → its film frame (A), a tile (B), a cup (C) or a stamp on its day (D);
  - who won → the winner's chip colour (a loop, a glaze, a shelf, a ring);
  - tie and nobody → a split or a second loop; black, knocked over or ✗;
  - time and progress → order, the roll's count, bare tiles, the diary's weeks up to Bet #1;
  - next → an unexposed frame, a pulsing tile, a pencilled "due";
  - the newest rounds → their own frames, readable, with the move in green or red and each AI's mark.
- **Words left:** the head ("Every round so far", the live H24 head), one caption box, two beat labels, the counts and the "Show 8 more" button.

## The twelve design questions (lesson 122)
1. **Hierarchy.** Beat 1's colour pattern is the first read ("who has been winning"), then the newest frames. In A and B the colour and the pictures share the stage. C makes the ranking loudest, D makes the calendar loudest.
2. **Sequence.** It comes after Meet the models, which introduced the four colours that every take reuses. It hands over to Smart or lucky ("is this skill?"). C pre-empts that a little by ranking round wins.
3. **Words.**
   - One term per thing: "round", "wins", "tie", "Nobody".
   - Company labels are name plus ticker everywhere.
   - "Won" here means the closest call, as on the cards. C says so in its caption ("The closest call wins the round"), since the board above ranks by P&L (lesson 17).
4. **Motion.**
   - Only the "next" marker breathes: A's unexposed frame, B's next tile.
   - D's NVIDIA ring and A's pegs are still.
   - Nothing moves with reduced motion (`.r7 *{animation:none}`).
5. **Interaction.** Every graded frame, tile, cup, stamp, print and page row is a link to `#/round/<n>`, which opens today's slab view (tested). Future items are not links. "Show 8 more" adds eight.
6. **Return.** What changes tomorrow is visible: the next frame or tile is waiting, D's pencilled "due" counts, the bare tiles and the "left on the roll" count shrinking toward NVIDIA.
7. **Trust.** Every figure comes from ROUNDS, and each item opens its graded certificate. Nothing is typed.
8. **Share.** A screenshot of beat 1 is a one-picture summary of the season. B's mosaic and C's trophy case read without words; A's sheet is the most "film-like".
9. **Edge states.**
   - Tie: a split tile, two loops, cups on both shelves, a two-colour ring.
   - Nobody: black tile, ✗, the knocked-over shelf, grey ring.
   - No film (R71, R79): the `t2` world tile, as today.
   - No next round: nothing pulses.
   - A round with no grading date: D puts it on its call date.
   - A fifth model would need a fifth colour and, in C, a fifth shelf (all takes draw it; nothing painted is per model).
10. **Data honesty.**
    - Colour follows the sheet's winner only.
    - C's shelves rank by rounds won, which is not the board's P&L order (Claude has the most cups while Grok leads P&L). C's caption names the rule, but a newcomer may read the case as "the leaderboard". Flagged.
    - D's "due" counts are rounds still to come in the sheet, not calls in.
11. **Reach.**
    - Every live word has a cap height of 9 CSS px or more at 320, 390 and 1280 (measured; see Tests).
    - No sideways scroll.
    - Every link has a full aria-label ("Round 80, Exxon Mobil (XOM), closed Oct 30, moved +2.17%. Gpt wins. Gpt right way, Kimi right way, Claude wrong way, Grok wrong way. Open the graded card.").
    - Tap targets in beat 1 are small: A 35px, B 34px, C 21px, D 19px. Beat 2's items are large. See "How it could fail".
12. **Feeling.**
    - Suspense: the next frame or tile, NVIDIA's gold tile, D's circled Bet #1.
    - Reveal: the colours of who won.
    - Payoff: the big frames of the newest rounds.

## Tests (measured by `run.js`, `out/m390.txt`, `out/m1280.txt`, `out/m320.txt`)
- **No sideways scroll:** scrollWidth equals the viewport at 320, 390 and 1280 for all four takes.
- **No console errors:** none, all takes, all widths.
- **A tap opens the round:** `#x2pRm` is shown for all four takes.
- **Reading size (H23 test 2):** 0 live words under a 9 CSS px cap height, at 320, 390 and 1280. The minimum is 9 (A "80 exposed", B "XOM", D "W1"); C's is 10.
  - A's frame numbers (7px edge print) were taken out because they failed this test.
  - D's "Bet #1" and "due" were raised to 12px and 12.5px.
- **Resolution (H23 test 1, 3x at 390):** every painting passes: peg 120px for 26 CSS, print 600 for 181, tape 640 for 187, tile 240 for 34, cup 200 for 21, gilt 600 for about 170, page 1200 for 370, plaque 700 for about 175.
  - The site's own film tiles are 450x600. They fail 3x only where B shows them at 155 CSS (needs 465), as in H24.
  - At 1280 (DPR 1 to 2) the print, tape, plaque, gilt and shelf are under 3x of their larger desktop size. Masters exist at 2400 to 3840px if desktop needs them.
- **Integration (H23 test 3):**
  - A: the marker writing is multiplied into the tape.
  - B: logos fired on as decals; enamel text sits in the plaque's field.
  - C: engraved plates with a pressed light lip and dark wall.
  - D: brand-colour stamps multiplied into the paper, and a hand-drawn red ring.
  - Every logo is turned into one ink on a canvas from the site's own file: a white tile is keyed out, white holes are kept as holes. This is the process each world would use (stamp, decal, engraving, marker).
- **Static words painted (H23 test 4):** the paintings carry no words. Every word here changes with the data or is the narrator's (head, caption, beat labels), so nothing static was left to paint.
- **Framing (H23 test 6):** the sheet, wall, case and planner fill the column edge to edge on phones (8 to 10px in, no floating card).

## Hedra (gpt-image-2, 4K high, refs `bet-chip-h2.jpg` + `bet-vault-h2.jpg`; `log.jsonl`)
Total **$8.31** of $40.
- 15 images done.
- One upload failed (d-desk, connection reset) and was rerun.
- a-room and b-wall came back with the reference chip painted into the scene. They were redone without image references (a-room2, b-wall2, $0.40 each).

| job | size | cost | result |
|---|---|---|---|
| a-room2 | 2160x3840 | $0.40 | dark wood darkroom wall, red safelight; used |
| a-strip | 3840x2160 | $0.43 | 6-frame 35mm strip, amber windows; one frame cut out as the cell |
| a-peg | 2880 sq | $0.74 | clothes peg; used at 120px |
| a-print | 2400x3200 | $0.53 | curled print paper; used |
| a-tape | 3840x2160 | $0.43 | torn masking tape; used |
| b-tile | 2880 sq | $0.74 | grey glazed tile with crackle; tinted per winner with hard-light |
| b-wall2 | 2160x3840 | $0.40 | dark station tiles, lamp; used |
| b-plaque | 3840x2160 | $0.43 | blank enamel sign; used |
| c-shelf | 3840x2160 | $0.43 | cabinet shelf; used with luminosity over the model colour |
| c-cup / c-broken | 2880 sq | $0.74 each | gold cup / knocked-over cup; used |
| c-frame | 2400x3200 | $0.53 | carved gilt frame (hole keyed out); used (webp, 130 KB) |
| d-desk | 2160x3840 | $0.43 | open planner on a walnut desk; used as the ground and the paper crop |
| d-page | 2400x3200 | $0.53 | tear-off day page; top used whole, a middle band repeated below |

Cut-outs were keyed off flat magenta by `cut.sh`. Web files are in `img/web/rounds7-*`; masters are in `img/master/` (not committed, too large; every job can be rerun from `jobs*.json` with `gen.py`).

## My pick: **B, the tile wall**, with A as the runner-up
- **Why B:**
  - Beat 1 answers "who's been winning, and when" at a glance with no reading. The colour is the characters' own (lesson 129), carried forward from Meet the models.
  - The bare tiles and the gold NVIDIA tile show how much season is left, which no other take does as plainly.
  - Its beat 2 shows each frame biggest (155 CSS px) after today's B.
  - It is the lightest: beat 1 loads logos only (about 80 small files), not 80 film tiles.
- **A** is the most beautiful and the most on-brand for a project whose product is its films, but its beat 1 loads every round's frame (78 tiles, about 4.7 MB, as today's wafer does) and it is the tallest.
- **C** has the strongest "competition" read, but it ranks by round wins next to a board that ranks by P&L.
- **D** has the best sense of time, but its beat 2 frames are small (72 CSS px).
- **Combinations are easy:** the takes share one file and one data layer. For example, B's mosaic with A's prints, or D's diary with B's picture tiles.

## Drop-in
- **Files:** `_r7.js` + `_r7.css`.
  - Set `window.__R7='A'|'B'|'C'|'D'` and `window.__R7IMG='media/'`.
  - Copy `img/web/rounds7-*` flat into `media/`.
  - Load both after `x2p_more.js` has built the section and the fonts are in.
  - Add Permanent Marker to build.py's font link (A's tape, D's pencil); `_r7.css` imports it for the mockup.
- **What it does:** it takes over `#record`.
  - It hides the live `.r6`.
  - Anything else in the section is moved off screen and made inert, as rounds6 did, because the slab view copies a record card.
  - It re-renders on width changes and on "Show 8 more".
- **Data:** ROUNDS, PENDING, UPCOMING, FILMS, CO_LOGOS (brand colour `c` for D's stamps), MODELS.
- **Runners:**
  - `run.js <out> <ids> <widths> <dpr>` reproduces every shot and measurement (serve `ez/` on 8961).
  - `board.py` builds the boards.
  - `cut.sh` keys a painting.
  - `gen.py jobs*.json` runs Hedra.

## How it could fail
- **The colour code needs the four colours learned first.** A visitor who skipped Meet the models sees a mosaic of colours.
  - B and D print a key.
  - A's key is drawn loops.
  - Only a person looking can tell if it reads. The chip colours are muted on the chips themselves; here they are brighter so they separate at 34px.
- **Small tap targets in beat 1** (19 to 35px against the 44px guideline). Beat 1 is for looking; beat 2 is for tapping. A miss-tap opens the wrong round's card, which is harmless but irritating.
- **C reads as a leaderboard** that disagrees with the real one (round wins vs P&L).
- **A's sheet loads every film tile.** It would need one small sprite sheet, regenerated at each sync.
- **Logo inking is a heuristic** (white tile keyed out, white holes kept if the logo is mostly not white). A logo like Microsoft's four squares or a white wordmark on a coloured tile could come out as a solid block. Spot-checked at 390, not on all 80.
- **D's planner rows grow with busy days:** 13 rounds on Oct 29 makes one tall week. The diary also starts on Sep 7 because the first close is Sep 9.
- **Not checked:** Safari (`mix-blend-mode` on images, `container-type` on D's pages, `color-mix` in C), a 4x slower CPU.
