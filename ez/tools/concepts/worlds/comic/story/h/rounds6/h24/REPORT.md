# H24 · `rounds`: "Every round so far" on X2+ (2026-11-02)

The section after Meet the models, redrawn in the NVIDIA chip's art and continuing frame 3 of "How a round works" (the LEDGER): the ledger the round was written to grows into the whole season. Four takes, all laid over the built `v46-live-x2plus.html` (live data: R80 Exxon Mobil newest, R81 Palantir next).

Folder: `ez/tools/concepts/worlds/comic/story/h/rounds6/h24/` (rounds6/ itself holds round H13's files, left as they were).

Boards:
- `ez/x2p-h24-rounds-390.png`: today, then A, D, B, C at 390px.
- `ez/x2p-h24-rounds-1280.png`: the same at 1280px.
- `ez/x2p-h24-rounds-closeup.png`: one row of each take at 3x, and the wafer.

**Today, for reference:** X2+'s record is the PSA slab carousel, followed by an "Every round at a glance" grid of tiles (corner badge = winner, "Show all 80 rounds"). All four takes replace both; the slab view they open is unchanged.

## Story brief (written before the first mockup)
- **Story:** every trade the four AIs make is written into one ledger, and nobody can rub it out. The ledger you saw take its fourth row in frame 3 is now the whole season, and the next row is already waiting.
- **Facts → carriers:**
  - the round's picture → its own film frame (`tile-r<n>-f1.jpg`, native), lit behind the glass;
  - the company → its logo lit in the readout, and the name with the ticker;
  - the move → a green or red lit figure;
  - who was right → the AI's own mark lit green (right way) or red (wrong way), always in the same order (GPT, Kimi, Claude, Grok);
  - the winner → a gold ring on its mark, and "GPT WINS" / "GPT & CLAUDE TIE" / "NOBODY WINS" where there is room;
  - newest first → order;
  - more to come → the next round's entry, already in place, dim, with a blinking cursor (B: the season's unlit dies, with the gold NVIDIA die last).
- **Words left:** the head ("The ledger"), one caption box ("Every trade, written. Newest first."), and "Show 8 more · 8 of 80".

## The twelve design questions (lesson 122), one line each
1. **Hierarchy:** the one thing is "every round is on the record, and here is how it went". The biggest, brightest things are the lit move and the AIs' green and red marks; the frame is the colour.
2. **Sequence:** after Meet the models (the four chips) and the LEDGER frame. Each entry reuses that frame's glass, gold bezel and amber readout, and A's chips repeat the chips' pins. It hands over to "Smarter or just lucky?", which reads the same ledger as a trend.
3. **Words:** one term per thing: "round", "wins", "tie", "at the close". The head comes from frame 3's line "Every trade is written to the ledger". Every company label carries its name and ticker.
4. **Motion:**
   - The next entry's cursor blinks: it is waiting to be written.
   - The newest graded entry writes itself in once per visit, when the section first comes into view: the frame lights, the readout types on, a scan band passes.
   - B's next die pulses amber.
   - Nothing else moves; nothing moves with reduced motion.
5. **Interaction:**
   - Every graded entry, and every graded die on the wafer, is a link to `#/round/<n>` and opens today's slab view (tested: `#x2pRm` opens).
   - The next entry is not a link: there is nothing to open yet.
   - "Show 8 more" adds 8 at a time.
6. **Return:** the next row (R81 Palantir, "at the close · Nov 3") is visible before it exists, so tomorrow the visitor comes back to see it filled. On B, 34 blank dies count down to the gold NVIDIA die.
7. **Trust:** every figure comes from ROUNDS, the sheet's snapshot, and each entry opens the graded certificate. The X post's timestamp is not shown here; it is a possible later carrier.
8. **Share:** a screenshot of one A or D entry reads as a lit ticker line: company, move, the four lit marks, the winner. B's wafer is the most screenshot-worthy frame: "the whole season on one chip".
9. **Edge states:**
   - A tie shows both marks ringed, "GPT & CLAUDE TIE" (R79).
   - Nobody right: no ring, "NOBODY WINS".
   - An AI that did not call: its mark unlit (dark brown).
   - No film (R71, R79): the `t2` world tile.
   - No next round (after NVIDIA): the next entry is not drawn; B's last die is the gold one, then all lit.
   - Long names are trimmed ("ASTRA… (AZN.L)"), and the ticker always stays.
   - A new model joining needs a fifth lens and mark (not built).
10. **Data honesty:** green and red follow the direction only (`right()`), and the winner is the sheet's own. Nothing ranks or implies a streak. B's grid is in the season's order with no fake density.
11. **Reach:**
    - Every live word has a cap height of ≥ 9.2 CSS px at 390 (measured, below).
    - Each link has a full aria-label, e.g. "Round 80, Exxon Mobil (XOM), moved +2.17%. Gpt wins. Gpt right way, Kimi right way, Claude wrong way, Grok wrong way. Open the graded card."
    - The old carousel is `inert` and hidden from readers.
    - Reduced motion is respected.
    - At 320px the narrow readouts shrink to the 9 px floor and trim names (not shot here).
12. **Feeling:**
    - Suspense: the empty next row, its cursor blinking.
    - Reveal: the newest entry writing itself in.
    - Payoff: the green and red lamps under each picture, the gold ring on the winner.

## The takes
| | Take | What it is | 390px section height | Hedra |
|---|---|---|---|---|
| A | **Ledger entries** | One painted chip per round, its pins meeting the next like Meet the models' chips. In each chip: a portrait window with the film frame, an amber readout (logo, name (ticker), move; R<n> and "GPT WINS" with the winner's mark in gold), and four round lenses, one per AI, each lit green or red. The next entry sits on top, empty, cursor blinking. Desktop: two columns. | 1254 px (next + 8) | a-row-4k, $0.43 (+ drafts) |
| D | **The ledger grows** | Frame 3's own object: one tall glass ledger in a gold frame with a piano hinge. One row per round: the frame in a small window, then a stacked readout (logo, name (ticker); R<n>, the four marks with the winner ringed, the move). Its middle row is one painted segment repeated, so every row is identical geometry (lesson 119) and the ledger can grow to 80. Desktop: an open book, two pages side by side. | 977 px (next + 8) | d-ledger-5kb, $0.43 (+ drafts) |
| B | **Season 1, die by die** | The whole season as dies on one wafer: 80 lit with their frames, R81 amber, 33 unlit, NVIDIA (R114) the gold die. Grid computed to fit the wafer's measured circle. Under it, the newest 8 dies cut out big: frame above, readout below in the same glass (name (ticker); move and the four marks). Desktop: wafer left, the 8 dies right. | 1338 px | wafer 5kb $0.74 + die $0.74 (+ drafts) |
| C | **Every round so far, socketed** | Each round's film frame **whole** (3:4, never cropped) at the top of a gold socket's glass, the readout under it in the same glass, "ROUND 80" on the socket's plate; the next socket dark with Palantir's logo. Two across on phones, four on desktop. | 1610 px | c-socket-5kb $0.53 (+ drafts) |

Hedra spend: **$5.55** of the $40 (9 drafts at 1K medium, $0.57; 9 masters at 4K high, $4.97). Every job is in `log.jsonl` and listed below. All paintings are gpt-image-2 with `bet-chip-h2.jpg` and `top-h23-ledger.jpg` as references, "no text, no letters, no numbers". The five 4K masters used are in `img/master/` (3840 or 2880 px); every job also has a 2048-px copy in `img/`; the web crops are `img/web/rounds-h24-*.jpg`.

## Tests (measured by `run.js`, at 390 unless noted; `out/measure.json`, `out3/log.txt`)
- **Test 1, resolution** (source px ≥ CSS width × 3 at 390):
  - A: row 1920 px for 358 CSS (needs 1074). Pass.
  - D: ledger 1440 for 358 (1074). Pass.
  - B: wafer 2048 for 358 (1074), die 900 for 175 (525). Pass.
  - C: socket 900 for 176 (528). Pass.
  - The film frames are the site's own 450×600 tiles, never upscaled. They pass 3x where they are shown below 150 CSS px: A 58, D 30, B 16 / 150, C 141. They do not pass 3x on desktop C (230 CSS).
  - At 1280, D's 1440 is 2.5x of its 579 CSS page (the 2160 master could serve desktop).
- **Test 2, reading size** (cap height ≥ 9 CSS px for every live word): 0 words under 9 in all four takes. The minimum at 390:
  - A: 9.4 ("AT THE CLOSE · NOV 3")
  - D: 12.6
  - B: 11.2
  - C: 10.4

  The type is sized from the painting's on-screen scale (`setK`), with a floor at 9.2 px cap height. Names that do not fit at the floor are trimmed with "…" before the ticker. That happened in D's first build (fixed by the stacked readout) and still happens on desktop B's small dies.
- **Test 3, integration of live text:**
  - Every live word and mark sits in a glass window the painting left empty: the readout strips, the portrait and square windows, the lenses, the socket glass and plate, the die window.
  - Each is lit like the timer: an amber, green or red gradient fill with a three-step glow sized in CSS px, scanlines in the glass, and the painting's own glare cut out and screened back over it.
  - The paintings are frontal, so no perspective mapping was needed.
  - Two fixes on the way, both mine:
    - A clipped SVG group is isolated, so the glare had been laid over the frames and marks at 55% instead of screening them. That washed the frames out and dimmed the lenses. The blend now sits on the group.
    - The four marks with their gaps span 5.26 mark widths, not the 4.26 I first assumed. The marks ran into the move on D, and into "R80" on its first fix. Both readouts are now laid out from the right with the true width; checked on the 3x close-ups.
- **Test 4, static words painted:** the only static words are the head and the caption box (narration, outside the world: lesson 116) and the button. Every company logo is the site's own file, placed live, because the company changes per row. No baked words.
- **Test 5, chip detail:** flat 16-px blocks outside the content windows:
  - A row: 5.2%
  - C socket: 6.3%
  - B die: 0%
  - D ledger: 18.5% before cropping. Mostly the black void at the sides, now cropped to the panel (x 80 to 2080), so the void is only top and bottom.

  Traces, SMD parts, vias, pins and gold bezels are at the hero chip's density on A, B and C. D's board strips are thinner.
- **Test 6, framing:**
  - A's chip fills its frame edge to edge; the pins are the frame.
  - C's crop is the socket and plate, with 1.6% board margin.
  - B: the wafer disc fills 61% of its square; the crop is set to the clamp ring.
  - D: after the crop, the ledger panel fills the width.
- **Page checks:** no sideways scroll at 390 or 1280 (scrollWidth equals viewport); no console errors; a tap on the first entry opens the slab view (`#x2pRm` shown, `#/round/80`; B's first die `#/round/1`).

## My pick: **D, the ledger grows**, with B's wafer kept as the later "season map"
- It is the brief's world literally: the same glass, bezel and amber readout as frame 3, one more row per round. The visitor watches frame 3's four rows become eighty.
- It is the shortest: 977 px for next + 8, against 1377 px today. It keeps every required fact on one line pair.
- Its repeated middle segment makes rows identical and lets the ledger grow without a new painting.
- On desktop the two pages read as an open ledger book, which no other take gets for free.
- **Its weakness:** the film frames are small (30 CSS px wide). The picture is a colour chip there, not a scene. If the owner wants the films' art to carry the section, C shows the frames whole and biggest. A is the most legible single entry and the most continuous with the chips, but it is the most table-like (rule 0) and doubles the AI marks into lenses.

## Drop-in
- **Files:** `_r6.js` and `_r6.css`.
  - Set `window.__R6='D'` and `window.__R6IMG='media/'`.
  - Copy `img/web/rounds-h24-ledger.jpg` (and for the other takes `rounds-h24-row.jpg`, `-wafer.jpg`, `-die.jpg`, `-socket.jpg`) into `media/`, flat-named as they are.
  - Then load the CSS and the script after x2plus.js and x2p_chips.js have built the page, and after fonts are loaded (canvas measures Anton).
- **What it does to the page:**
  - It takes over `#record`.
  - The old carousel is kept in the DOM, moved off screen, `aria-hidden` and `inert`, because the round view (`#x2pRm`) copies and measures a record card. Hiding it with `display:none` broke the slab view: tested.
- **Data:** ROUNDS, PENDING, UPCOMING, FILMS, CO_LOGOS, MODELS. The tile file name is chosen as `f1` when the round has a film, else `t2`.
- **Runner:** `run.js <out> <ids> <widths> <dpr>` reproduces every board and measurement. `board.py` builds the boards. `quads.py` measures the glass windows of a painting. `gen.py jobs*.json` runs Hedra (it keeps the 4K master in `img/master/`).

## How it could fail
- **The cost of the old carousel.** It stays laid out off screen, so its films and loops keep costing CPU unless the record's own off-screen pauses still catch it. This is not measured on a 4x slower CPU here. The real fix is to let the round view build its slab without the carousel.
- **B's wafer loads all 78 frame tiles at once:** 4.7 MB. A build needs one sprite sheet of small thumbnails, regenerated at every sync, which is one more step in SYNC.md. B's dies at 16 CSS px are colour, not pictures.
- **The colour code is unexplained.** A newcomer may not read green and red marks as "called the direction right / wrong", or the gold ring as "winner", without the key. A spells out the winner; D, B and C rely on the ring when the words do not fit. Only a person looking can tell.
- **Long company names get trimmed** at the 9 px floor ("ASTRA… (AZN.L)"). The ticker stays, the full name is in the aria-label and the slab. The owner may prefer a smaller floor or a second line.
- **Logos with a white tile** print as a white square in the dark glass (Intel's file reads dim, Starbucks is a circle). They are not keyed out here.
- **The fifth model:** a fifth model (the tryouts ticket) needs a fifth mark slot. The lenses in A are painted four, so A would need a new painting; D, B and C draw the marks and can take five.
- **Desktop D:** the pages split the list in half, so on "Show 8 more" both pages reflow (the left page's older entries move to the right page).
- **Not checked:** Safari (SVG `mix-blend-mode` on groups, `clip-path`, `inert`) and 320px shots.

## Hedra jobs (all gpt-image-2)
| name | settings | cost | time | file | result |
|---|---|---|---|---|---|
| a-row-a, a-row-b | 1K medium 16:9 | $0.054 each | 44 s | img/a-row-*.jpg | right layout (window, strip, four lenses, pins), flat clip-art light |
| d-ledger-a, -b | 1K medium 9:16 | $0.054 each | 43 s | img/d-ledger-*.jpg | eight even rows with square windows and a hinge; flat |
| b-wafer-a, -b | 1K medium 1:1 | $0.078 each | 43 to 75 s | img/b-wafer-*.jpg | rainbow blob wafer, too loud |
| b-die-a | 1K medium 1:1 | $0.078 | 68 s | img/b-die-a.jpg | one die with a big window, fine |
| c-socket-a, -b | 1K medium 3:4 | $0.062 each | 68 s | img/c-socket-*.jpg | portrait window, lever, plate; flat |
| a-row-4k, a-row-5kb | 4K high 16:9 | $0.427 each | 83 to 86 s | img/master/a-row-*.jpg (3840×2160) | rich board detail, worn gold, rim lights; **4k used** |
| d-ledger-4k, -5kb | 4K high 9:16 | $0.426 each | 92 s | img/master/d-ledger-*.jpg | **5kb used**: cleaner, taller rows; board strips thinner than the hero chip |
| b-wafer-4k, -5kb | 4K high 1:1 | $0.738 each | 135 s | img/master/b-wafer-*.jpg | dark mirror wafer in a gold clamp ring; **5kb used** (fills more) |
| b-die-4k | 4K high 1:1 | $0.737 | 133 s | img/master/b-die-4k.jpg | bond-wire die, dense; used |
| c-socket-4k, -5kb | 4K high 3:4 | $0.528 each | 128 s | img/master/c-socket-*.jpg | **5kb used** (window 0.6 wide, closest to the frames' 0.75) |
