# Round H6 · tiles3: the winner on every tile

Owner: "I think I should always show the winner. So they don't per se have to click into it."

Boards: `ez/x2p-x3p-h6-tiles3-390.png` and `-1280.png`. Each board shows the real Every round so far grid on the built X3+ page (Show all, then only the 8 test rounds), in this order: today's live tiles, then takes A, B, C and D. A close-up row at the end compares today, A, B and C on R72 (one winner), R57 (tie) and R51 (nobody).
Mockups only. Nothing in `tools/v22/*`, `media/*` or any page file changed.

## What today's tile already says (lesson 20)
The live tile already names the winner twice, as page text: the winner's AI coin in the yellow price circle, and "Claude won" on the foot. Neither is in the picture. The picture gilds and crowns the film's winning object (a plate, a pennant, a turbine), so it shows that someone won, not who. The takes below put *who* into the art. If the owner picks A or C, the coin in the price circle repeats the face (lesson 13). Two options: keep only "#n" in the circle, or keep the coin as the fallback for small tiles. Not changed here.

## Rounds tested (winners from ROUNDS, the sheet, never from the film)
| Round | Winner | Why |
|---|---|---|
| R17 PepsiCo | Kimi | board film (R13 to R29), one winner |
| R25 Domino's | GPT | board film, gold WINNER plate |
| R57 GE Vernova | Claude & Grok | tie |
| R51 UPS | nobody | all four wrong |
| R2 Oracle | Claude | early film that names the winner only in text (T3 "glow" tile, no crown) |
| R69 Merck, R72 Reddit, R78 Intel | GPT, Grok, Claude | recent |

Every founder appears at least once. `win.json` holds the winners as read from ROUNDS.

## The takes
- **A, Guest star** (`img/a-r<n>-s.jpg`). The winner's founder, crowned and with a fist raised, is painted into the round's own scene in the same Golden Age ink. The input is the T3 tile plus `media/founder-<m>-anim.jpg`. Ties show both founders side by side. Nobody: a dented golden crown knocked over on the ground, with no one to wear it.
- **B, The mark on the gold** (`img/b-r<n>.jpg`). The winner's AI mark (drawn from MODELS' own paths, `ref/mark-*.png`) is embossed into the film's own gold crowned object. Ties carry both marks. Nobody: the object loses its gold, cracks, and its crown lies broken beside it.
- **C, Medallion** (`img/c-r<n>-s.jpg`). A crowned gold cameo of the winner's founder is set into the scene on a stand, chain or bracket. Ties show two cameos. Nobody: four tarnished cameos, each struck through in red ink. This is the owner's "all four crossed out", using faces.
- **D, Corner box** (page code, `t3.js`). This is the comic cover's corner box (the Silver Age box with the hero's head). The winner's crowned head is cropped from cast2's "won" painting, under a "#n" strip, and replaces the yellow price circle. Ties show two heads. Nobody: the four "hit by the FAIL" heads in a 2x2, each crossed out with a red brush X. No generation: one image per founder and beat, chosen by data.

A and C were drawn twice. The first pass (`a-r<n>.jpg`, `c-r<n>.jpg`) put figures in the bottom quarter, under the move ribbon, and medallions in the top-right corner, under the price circle (R78, R72, R57). The second pass adds a "safe zone" line to the prompt: the middle band, 25 to 72% of the height, centred or left. That fixed it on all 15 tiles with a figure. `gen.py` adds the line with `SAFE=1`.

## Cost
| What | Model | Settings | Each | Jobs | Total |
|---|---|---|---|---|---|
| A, B, C first pass | gpt-image-2 | 1K medium, 3:4, 2 to 5 refs | $0.049 to $0.098 | 24 | $1.55 |
| A, C safe-zone pass | gpt-image-2 | 1K medium | $0.06 to $0.07 | 16 | $1.02 |
| A at low quality (cost test, R72) | gpt-image-2 | 1K low | $0.03 | 1 | $0.03 |
| **Spent** | | | | **41** | **$2.60 of $8** |

Each job took 25 to 60 s. Every job is in `jobs.jsonl`.

**All 80 rounds** (74 film tiles plus 6 no-film tiles):
- **A or C at 1K low, my pick's setting: about $0.03 a tile, so $2.40.** Add about 15% for re-renders: **about $2.80**. The low test on R72 kept Grok's face as well as medium did.
- A or C at 1K medium: about $0.065 a tile, so $5.20, or **about $6** with re-renders.
- B at 1K medium: about $5 to $6. The marks are faithful but too small at tile size, so a re-run with bigger marks would be needed (see below).
- D: **$0**. It uses the 8 cast2 images that already exist (4 founders × won/lose). A new round needs nothing.
- Time: about 15 minutes for 80 tiles in parallel batches, plus a check by eye (the crown on the sheet's winner, the face true to the founder).

## How each could fail
**A, Guest star**
- **Likeness drift.** Faces held in all 15 tiles with a figure (glasses and curls for Claude, visor for Grok, armour for GPT, flight suit and flag patch for Kimi). Over 80 tiles one will drift. Always generate from today's poster, never from a generated tile.
- **The founder can hide the scene's subject.** On R25 GPT stands over the board's rows. On R72 Grok covers the lower half of the board.
- **Nobody is weak.** The knocked-over crown on R51 is small and reads as a prop, not "nobody won" (zoom the close-up). A plainer nobody sign, such as C's four crossed cameos or D's crossed heads, would be needed with A.
- **The film says something else.** The film's own gold crowned object is still there, now beside a founder, so the tile has two gold things. R2's "glow" film has no crowned object at all; there the founder alone carries the win, which is better.
- **Safe zone differs by width.** The tile art is cropped differently at 390 (about square) and 1280 (wider). A founder at 60 to 70% of the height sits at the ribbon's edge on desktop. In the mockup the art's position is nudged to `center 38%`. A rule per tile size would be needed live.

**B, The mark on the gold**
- **Unreadable at tile size.** The marks were copied correctly (the GPT knot, the Kimi K, the Claude burst and the Grok slash all checked at full size). At 130px on a phone, though, they are specks. R57's two marks on a turbine nacelle can only be seen in the close-up.
- **Wrong marks.** A model can redraw a mark slightly wrong. Every tile would need checking against the mark file.
- **Nobody did not read.** R51's gold barely changed.
- B is the most faithful to the film and the least legible. I would drop it.

**C, Medallion**
- **Reads well.** Even at 130px, a gold coin with a face and a crown reads as "this one won". The tie's two cameos and nobody's four crossed cameos read too.
- **Monotony.** Repeated across 80 tiles, the gold cameo becomes a template stamped onto every scene: the grid turns into a wall of coins. On R69 and R25 the cameo takes the scene's centre.
- **Hidden subject.** The cameo can still land over the film's subject (R17's medallion sits on the Pepsi globe's band).

**D, Corner box**
- **Quick to read and always correct.** It comes straight from ROUNDS, so it can never crown the wrong founder. It costs nothing, and a new round needs nothing.
- **Pasted on.** The box sits on top of the painting, not in its world: the owner's "pasted on top" complaint (H6), though comic covers do put corner boxes on top.
- **Faces small.** On a 320px phone the faces are tiny, and the four crossed heads become four red Xs.
- **Same face every time.** Each founder's face is the same on every tile.

**All takes:** words and numbers stay page text. No letters were found in any generated tile at full size. Ties and nobody follow ROUNDS: R57 shows Claude and Grok, R51 shows nobody.

## Checks run
- 390, 1280 and 320px on the real grid: no sideways scroll (scrollWidth = width in every shot), no console errors.
- Nothing covers a number: the move ribbon and the price circle stay clear of A and C's safe-zone figures.
- At 320px the foot line clips its second line ("Claude won") on all tiles, today's included. That is the live behaviour, not caused by these takes.
- Compared at 4x in the close-up row against today's tile.

## My pick
**A, Guest star**, with C's crossed cameos for the nobody rounds and D as the fallback where a picture is missing.
- **Why A.** It is the only take where the tile becomes a comic panel with a character in it: the founder stands in the round's world, lit by it (rule 0: "start from the characters acting"; lesson 31: the cast is the carrier). It also matches the owner's own first example. It shows *who* in the picture, so the coin in the price circle can go back to just "#n" (lesson 13).
- **Cost:** about $2.80 for all 80 at 1K low.
- **The second-best, C,** reads faster at small sizes but turns into a template across 80 tiles.
- **D** is the honest cheap option. It is right by construction, but it is laid on top, not in the scene.

## Open questions for the owner
1. With A or C, should the winner coin leave the price circle (it repeats the face), or stay as the small-screen fallback?
2. Nobody rounds: four crossed-out cameos (C), four crossed-out FAIL heads (D), or the abandoned crown (A, weak)?
3. Should a tie always show both founders the same size, or the closer call bigger?

## Files
- `gen.py`: prompts per take (`python3 gen.py <A|B|C> <round> [quality] [suffix]`, `SAFE=1` for the safe zone).
- `hd.py`: the Hedra v3 client (from thumbs2).
- `win.json`: the winners, from ROUNDS.
- `t3.js`: the mockup overlay and take D's corner box.
- `shot.js`: the real grid at any width (`node shot.js <outdir> <now|A2|B|C2|D> <width> t3.js`).
- `board.py`: builds the boards.
- `img/`: the tiles.
- `ref/` and `raw/` are not committed.
