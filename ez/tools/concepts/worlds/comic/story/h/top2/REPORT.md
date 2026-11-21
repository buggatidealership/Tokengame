# top2: the top of X2+ in the chip's art style, worlds (c) and (d) (Round H15, 2026-11-01)

Mockups only, laid over the built `ez/v46-live-x2plus.html`. The take replaces X2+'s top: the headline, the film bill and the live strip. Everything from "Current standings" down is untouched.

Every painting was made with Hedra gpt-image-2, with `media/bet-chip-h2.jpg` as the style reference: one object on a black void, ink outlines, dots only in the shadows, a gold key light with rays, and green and red rim lights.

## What I made

Both takes have the same three beats.
- **Beat 1:** a headline panel. The lettering is the bet's (Bangers, an ink stroke, a stacked drop), in cream with a gold second line, and it breaks the panel's top border.
- **Beat 2:** a gutter, then one panel "How a round works". Its caption box sits on the top-left corner. Inside are four frames, two per row on phones and four in a strip from 900px. Each frame's big lettered word (CALL / BELL / #1 / BET) breaks the frame's corner, with the brief's line under it.
- **Beat 3:** "Watch the whole thing · 1:20" over the explainer film (`media/ez-landing-v4.mp4`, poster `-poster-ez.jpg`). The play disc sits low on the poster and plays with sound.

| Take | Headline | Beat 1 picture | The four frames |
|---|---|---|---|
| **(c) Objects on the void** | "Four AIs call earnings. The market keeps score." | A brass stadium scoreboard. Its four black glass rows are the live standings: name, W-L, P&L. The lamps hold the AIs' marks, and the leader's lamp burns gold. | A letter with its card pulled out of the envelope; a brass closing bell; a golden ticket; a vault door. |
| **(d) The machine** (my own world) | The alternative, "4 AIs. Every earnings report. One scoreboard." | One contraption: a card slot, a bell with a striker, a ticket chute and a vault hatch, around a screen that keeps the season's P&L. | Close-ups of its four stations: the cards in the slot, the striker and dial, the chute, the hatch. Beat 1 and beat 2 are the same object, so the round reads as one machine turning. |

Live data comes from the page only:
- `ROUNDS`: the newest graded round. Today that is R80 Exxon Mobil (XOM), +2.17%.
- `MODELS`: the marks.
- `__x2pPnl()`: the ranking by P&L, W-L, and its own `usd()` formatter. Today Grok leads with +$148,480 at 45-27.

The NVIDIA line is the brief's copy. Nothing is typed by hand.

Files:
- `_t2.js`: the kit and both takes. The take is chosen with `window.__t2Take = 'c' | 'd'`.
- `_t2.css`
- `run.js`: shots and checks.
- `rec.js`: the micro-interaction film.
- `board.py`
- `gen.py` and `jobs*.json`: the Hedra jobs.
- `log.jsonl`
- `img/`

Boards:
- `ez/x2p-h15-top2-390.png`: today, c and d, plus a 2x close-up row of all eight frames.
- `ez/x2p-h15-top2-1280.png`
- `ez/x2p-h15-top2-micro.mp4`

## The surface under every live text

| Text | Surface (painted blank for it) |
|---|---|
| c hero: names, W-L, P&L | the scoreboard's four black glass rows; the marks sit in the round lamp sockets |
| c CALL: the four calls (mark, name, ▲/▼ size) | the four gold ruled lines on the black card |
| c CALL: company and ticker | printed like an address on the envelope's front |
| c BELL: "Exxon Mobil (XOM) · close" and "+2.17%" | engraved on the brass plate on the bell's base (dark ink, light lip, the move inlaid in green or red) |
| c #1: leader mark, name, W-L, P&L | the golden ticket's black centre panel, turned to the ticket's angle |
| c BET: "Bet #1: NVIDIA" | the blank brass plate riveted on the vault door |
| d hero: "Season 1 · P&L" and four rows | the machine's black glass screen (lit lettering, faint scanlines) |
| d CALL: each AI's mark, name and ▲/▼ size | the face of its own punched card |
| d CALL: "R80 · Exxon Mobil (XOM)" | engraved on the slot's brass bar |
| d BELL: "XOM close" and the move | the round glass dial under the bell |
| d #1: leader, P&L, W-L | the black face of the ticket curling out of the chute (sheared to its curl) |
| d BET: "Bet #1: NVIDIA" | the brass plate above the hatch |
| Captions, frame lines, the round source line | the caption box and the panel's own black, not the art |

Placement:
- Each surface is measured in the painting's own % space and mapped through the frame's crop, so it moves with the picture at any width.
- Engraved lines step down until they fit their plate.
- Each headline line steps down until it fits on one line.

Checks at 320, 390 and 1280px (`run.js`), both takes:
- no sideways scroll;
- no console errors;
- no live text running past its surface.

## Micro-interactions

All of them are diegetic. They run on hover on desktop; on a phone, a tap or Enter plays them once. None is needed to read a fact, and nothing moves with reduced motion.

| Frame | What happens |
|---|---|
| CALL | **c:** the card lifts 3px and a glint crosses its lacquer. **d:** the cards are pushed into the slot and catch the light. |
| BELL | The frame shivers like a struck bell, ink motion lines flick out, and a lettered gold "DING!" pops and fades. |
| #1 | **Desktop:** the ticket follows the pointer in 3D (up to about 8 degrees) and the light slides with it. **Tap:** one turn with a glint. |
| BET | The vault wheel turns a quarter: a round crop of its own painting rotates over it. Gold light swells from the gap (c) or the open hatch (d). |
| Ambient (the one moving thing per picture, lesson 42) | **c:** the leader's lamp breathes gold. **d:** a slow scan line passes over the screen. |

## My pick

**(c) Objects on the void.**
- Each step is one object everybody already knows: a letter, a bell, a golden ticket, a vault. A newcomer reads the round from the objects before reading a word.
- The scoreboard hero says "the market keeps score" literally, with the real standings in it.
- It is the closest to the chip and the vault: one hero object per frame, the same look the bet uses.

(d) is the stronger single idea, because beat 1 and beat 2 are one machine. But:
- its screen holds four short rows, so the P&L has to be abbreviated (+$148K);
- its frames read as parts of a gadget rather than as steps;
- the green circuit board everywhere makes it close to top1's (a), the chip's own world.

## How each take could fail

- **c:**
  - The letter's card text is small on a phone (about 11px). It reads at 390px but is tight at 320px.
  - The ticket's text is rotated about 8 degrees, which slows reading.
  - Four gold-rayed squares in a row can look like app icons rather than comic panels.
  - The rays are the reference's own, but lesson 38 warns that radial rays read as a stock effect. If the owner sees them that way, every image needs a re-render without them.
- **d:**
  - The machine is invented. A visitor might not connect "card slot, striker, chute, hatch" to predict, grade, rank, bet without the words.
  - On the curled ticket (frame 3), the text is sheared and only about 57px wide on a phone.
  - At 320px the screen's rows are about 9px.
- **Both:**
  - The wheel turn is a rotated crop of the same painting. It is aligned by eye, and a slight perspective mismatch shows at the end of the turn.
  - The film keeps its old poster (the $EZ end card) and now sits under its own head; the page's mini player and precedence code are not wired to this simple player.
  - The headline sits partly over the hero panel's top edge. On desktop the second line can cover the bell's top in (c).
  - Safari is not checked: container units, `paint-order` and `-webkit-text-stroke` on Bangers.
  - Analytics are off, so the only test of whether a newcomer decodes the frames without the lines is a person looking at them.

## Cost

Hedra gpt-image-2, all charges equal to their estimates:
- **$2.19** in total of the $10 budget;
- **(c) $1.08:** five 1K drafts, plus the letter re-render and two 2K heroes;
- **(d) $1.11:** five 1K drafts, plus the cards re-render and two 2K heroes.

Frames are 1K medium (1024px), which is enough at their size of 170 to 300px. The heroes are 2K high (2048px). Jobs took 50 to 122 s each.

| File | Model | Settings | Cost |
|---|---|---|---|
| c0-board, d0-machine | gpt-image-2 | 1K medium 16:9 | $0.042 each |
| c1-envelope, c2-bell, c3-ticket, c4-vault, d1-slot, d2-striker, d3-chute, d4-hatch | gpt-image-2 | 1K medium 1:1 | $0.066 each |
| c1b-letter, d1b-cards (re-renders with bigger blank faces) | gpt-image-2 | 1K medium 1:1 | $0.078 each |
| c0w, d0w | gpt-image-2 | 2K high 16:9 | $0.247, $0.259 |
| c0s, d0s | gpt-image-2 | 2K high 1:1 | $0.454, $0.466 |

c1-envelope and d1-slot were not used, because their blank faces were too small for live text on a phone.

Rule-0 checks run:
- no white or pale grounds;
- no emoji;
- no content over a logo;
- company name and ticker together;
- every container hugs its art;
- every word on a surface or in a caption.
