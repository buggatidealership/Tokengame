# Round H24 · chips8: Meet the models as character cards

Brief: `../BRIEF-H.md`, task `chips8`. This builds on `../chips7/` (the live section, `tools/v22/story/x2p_chips.js/.css`) and on chips5's SW geometry.

It is a mockup only:
- nothing in `ez/tools/v22/`, `ez/v4*.html` or `ez/media/` changed;
- nothing was deployed or published.

Hedra spend: **$9.19** of the $40 (34 jobs, all listed in `log.jsonl`).

## What I made
**One master per take, then one paint pass per model on the same pixels.** This is chips7's process with chips5's SW geometry.

1. **Masters** (gpt-image-2, 4K, references: a layout sketch, chips7's master for the substrate detail, and the hero chip for the style):
   - Each master is the ceramic module with:
     - the gold plate;
     - the flag field;
     - the black label;
     - the big gold-framed square window at the right end.
   - The model painted the static labels **NO.**, **LAST 7 DAYS**, **LAST ROUND** and **SEASON** into the master, so they are identical on every chip.
   - First round (`m8A-*`, `m8B-*`): LAST ROUND was a small window at 36×16 CSS px. Its logo came out 18×12 and its ✓/✗ 5.7 px. I relaid the label (`ref/layout-A2/B2.jpg`):
     - the middle row is the big 7-day window plus a squarer LAST ROUND window of the same height;
     - SEASON runs under them.
   - Picked masters: `m8A2-a` for takes a and c, `m8B2-a` for take b.
2. **Per model** (nano-banana-pro, 4K): one pass per model on a guide made from that master (`guides.py`). The guide had:
   - the lab's true mark darkened into the plate;
   - the flag laid in the field;
   - the name and version typeset in the name strip;
   - the personality line typeset on the label's foot.

   The model turned these into:
   - an engraving in the gold;
   - an etched and enamelled flag;
   - laser-marked letters under the glass;
   - a laser-etched line in the epoxy.

   Retakes:
   - B2's Claude plate came back black steel, and B2's Kimi plate came back radial-brushed with a raised K. Both were redone with the plate pinned to brushed gold (picked `-c`).
   - Everything else was first try.
3. **`compose.py`:**
   - fits each pass onto its master: an x/y scale and shift from the inner edges of the four display windows; residual ≤ 2 master px, about 0.2 CSS px at 390;
   - lays back only the plate, the flag field, the name strip and the foot band;
   - tints the ceramic in the model's colour, as chips7 does.

   **`normname.py`** then evens out the laser-marked names, which came out bright on Claude and grey on the others.
4. **Fifth chip** (`try8`): a blank master in A2's body (gpt-image-2), then a nano-banana-pro pass from a typeset guide. It carries:
   - IN INFERENCE, glowing amber in the top strip;
   - the four lab marks frosted in square windows;
   - MISTRAL, QWEN, GEMINI and NEMOTRON, each with its flag inlaid;
   - a "?" engraved in the plate and a frosted "?" in the founder window;
   - masking tape over the flag field ("not signed yet").

   Nothing on it moves.

### The live layer (`_c8.js`)
- **No. n** is lit in its window, gold for No. 1 and amber for the rest. The order is season P&L.
- **LAST 7 DAYS** is the P&L of this model's trades graded in the last 7 New York calendar days: today and the six before, by each round's close date. That is world-comic.js R11's rule, as the scoreboard counts it.
  - It is the biggest lit figure, in green or red.
  - With no trades it reads **"No trades"**, dim and unlit, never "$0". Board: `ez/x2p-h24-chips8-edge-notrades.png`, with `__C8NOW` set to 20 Nov.
- **LAST ROUND** shows the newest graded round this model traded:
  - the company's logo, lit in the display's own warm light (as the top frame's TESLA is);
  - a ✓ (green LED) or ✗ (red LED) for the direction (`per.v > 0`, so ties count by direction).
- **SEASON** is one line, for example "+$148,480 · 45-27".
- Every figure gets chips7's treatment:
  - a white-to-colour gradient;
  - a bloom;
  - a raking glare and scanlines;
  - the painting's own glass for that window, screened back on top.
- **Motion:** only the founder loops (muted, only near the screen, never with reduced motion). The re-scan and the LED glow animation are gone.

### Takes (`window.__C8T`)
- **a**: as the brief describes, with the line laser-etched on the label's foot.
- **b**: the window frame rises above the chip's rim, over the top pins (its own master). The founder grows to 97×104 CSS px at 390, against 88×91 in a.
  - Honest read: the break is mild. gpt-image-2 lifted the frame only a little past the rim in all five tries. It reads as "a big window", not yet as "the character pops out".
  - At 390 its SEASON window is the narrowest (cap 9.03).
- **c (my pick)**: take a, but the personality line is no longer etched. The founder **says** it in a speech balloon that breaks the chip's top edge, its tail into the window. It is Shantell Sans 12.5px, the comic's narration face (14px on desktop).
  - The chips are `chip8c-*`: the same paintings with the foot band left as plain epoxy.

## The twelve design questions (lesson 122), one line each
1. **Hierarchy:** the character first (the founder big, at the right end, the only motion), then LAST 7 DAYS as the biggest lit figure. The painted name sits top left; season is one small line.
2. **Sequence:** BOARD (frame 4: the field, ranked) hands over to these four chips in the same order, so the visitor meets up close the four they just saw ranked. After them comes the fifth, "not signed yet".
3. **Words:** the labels are painted nouns (NO., LAST 7 DAYS, LAST ROUND, SEASON). Each personality line is one sentence drawn from real behaviour, checked against the sheet (see Data honesty). There is no narration on the object.
4. **Motion:** only the founder loops. No re-scan, flicker or LED animation; the numbers are still. A state change shows only through data on reload.
5. **Interaction:** nothing on the card looks tappable and nothing is. The founder window is not a button. (A tap to open the model's rounds is a later Models tab, not this card.)
6. **Return:** LAST 7 DAYS and LAST ROUND change every trading day; the season line moves slowly. Someone coming back tomorrow sees new lights.
7. **Trust:** every figure is recomputed by the page from ROUNDS and `__x2pPnl` (the sheet), the same numbers as the Leaderboard's scoreboard. The calls' X posts remain the outside check.
8. **Share:** a screenshot of one chip reads on X as a trading card: face, name, flag, a big green or red number, a one-liner. A card is 2.5:1, so it crops badly to a 1:1 or 16:9 post; a share version would need its own frame.
9. **Edge states:**
   - no trades in 7 days: "No trades", dim (board);
   - no round traded yet: "—";
   - a skipped round: it shows the last round it traded;
   - a logo on its own tile: the tile is kept;
   - no logo: the ticker is lit;
   - a new model: a new chip needs a pass (its mark, flag and name painted);
   - after the NVIDIA date: nothing on the card depends on it.
10. **Data honesty:** see "Data honesty" below.
11. **Reach:**
    - live figures pass 9 px at 390 and miss at 320 (table);
    - the screen-reader list carries every fact, the line included;
    - reduced motion keeps the poster still;
    - images: 1200 px on phones, 1800 at 3x desktop, ≤ 243 KB each.
    - **The etched line fails at 390:** about 5 px cap. That is why I pick c.
12. **Feeling:** the payoff is meeting the characters: the face, plus a line that is a joke with a true number behind it. The suspense is the green or red of the last 7 days and the ✓/✗ of the last round, which changes with every close.

## H23's tests, measured (`node run.js`, the built `v46-live-x2plus.html` with chips7's section removed and chips8 laid over it)
| Width | Take | Sideways scroll | Errors | Chip CSS width | Needed ×3 | File | Smallest live cap | Smallest ✓/✗ | Logo box | Same box on all 4 |
|---|---|---|---|---|---|---|---|---|---|---|
| 320 | a / c | none | 0 | 320 | 960 | 1200 | 8.07 px (season) | 9.8 px | 16.7×17.6 | 0.00 px |
| 320 | b | none | 0 | 320 | 960 | 1200 | 7.40 px (season) | 8.8 px | 19.9×15.8 | 0.00 px |
| 390 | a / c | none | 0 | 390 | 1170 | 1200 | **9.84 px** | 12.0 px | 20.4×21.4 | 0.00 px |
| 390 | b | none | 0 | 390 | 1170 | 1200 | **9.03 px** | 10.8 px | 24.3×19.3 | 0.00 px |
| 1280 | a / c | none | 0 | 540 | 1621 | 1200 at 2x, 1800 at 3x | 13.6 px | 16.6 px | 28.2×29.7 | 0.00 px |
| 1280 | b | none | 0 | 540 | 1621 | as above | 12.5 px | 14.9 px | 33.6×26.7 | 0.00 px |

Other caps at 390 (a): No. 10.6 px, LAST 7 DAYS 16.5 px. chips7's No. was 12.6 and its P&L 27.5.

1. **Resolution: pass.**
   - The masters are 3840 px wide; the cropped chip is 3760 px.
   - Phone file 1200 for 1170 needed; desktop file 1800 for 1621. Nothing is upscaled.
   - (The nano-banana-pro passes came back at 5504 px and were downsampled into the master.)
2. **Reading size:** passes at 390 on every live figure in every take. Misses at 320: 8.1 (a/c) and 7.4 (b) on the season line.
   - The painted words for the record, at 390:
     - name about 16 px tall with its glow;
     - labels about 6 to 7 px cap;
     - **the etched personality line ≈ 7.2 px ascender to descender (≈ 5 px cap), 5.9 px at 320, 9.9 px at 1280.** Too small to read on a phone.
3. **Integration: pass by construction** (`treatOK 16/16`: every live box has both the light and the painting's glass screened over it).
   - "No trades" is deliberately unlit (dim ink, no bloom).
   - The ✓/✗ are clean strokes lit inside an LED, as chips7's were.
4. **Static words and marks painted: pass.** Every painted word was checked letter by letter on the 4K passes:
   - GROK 4.7 · CLAUDE FABLE 5.1 · GPT 6 ASTRA · KIMI K3;
   - NO. · LAST 7 DAYS · LAST ROUND · SEASON;
   - the four lines, word for word as the brief gives them, in a and b;
   - IN INFERENCE · MISTRAL · QWEN · GEMINI · NEMOTRON.

   Marks: Grok, GPT and Kimi match their silhouettes. Claude's keeps its irregular rays with cut ends (the guide was the true mark). Flags: US ×3, China for Kimi; EU, China, US and US on the fifth chip.

   The three-tries rule for the sentence was not needed: all eight sentences came out right first time.
5. **Chip detail: pass** (`../chips7/flat.py`, largest touching flat region):

   | Painting | Largest flat region |
   |---|---|
   | a | 3.7 % (the founder window's black glass, which the loop covers) |
   | b | 5.5 % |
   | fifth chip | 3.1 % |
   | chips7 | 2.2 % |

## Data honesty (checked on the sheet, 2026-11-02 00:50 UTC = 1 Nov evening in New York)
- **The lines' facts hold:**
  - Grok called down on 87.5% of its calls (63 of 72) and leads the season;
  - Claude's calls average 3.61%, the largest (GPT 3.10, Kimi 2.23, Grok 2.22);
  - GPT and Kimi each called up on 66.3%.
- **Two lines exaggerate (comic licence, flagged):**
  - "Bullish on everything" for 66% up;
  - "Buys every dip" for Kimi. The data says Kimi is bullish, not that it buys after falls: we do not record what the stock did before the call. "Some dips keep dipping" is fair: Kimi is last, at −$70,650.
- **This week is the busiest of the season:** the 7-day window holds R46 to R80, 35 of the 80 graded rounds. So LAST 7 DAYS is close to half the season today (Grok +$111,210 of +$148,480). It will shrink to a few trades next week.
- **Every card shows the same LAST ROUND today** (R80, ExxonMobil): all four traded it. Only the ✓/✗ tells them apart (Grok ✗, Claude ✗, GPT ✓, Kimi ✓). That is honest, but the repeated logo carries nothing.
- **Exxon's mark is two red X's.** In its own colours it read as a second ✗ beside the red LED. So every logo on this window is lit in one warm light, and green and red mean only the direction. That costs brand colour (lesson 14) on this one small window.

## Pick
**c**: take a's geometry and label, with the personality said by the founder in a balloon.

Why:
- the line is the card's personality, and etched it is about 5 px cap on a phone (question 11);
- a character saying its line is the comic (rule 0);
- the balloon breaking the chip's top edge gives the "pops out" that b's painted frame only half delivers.

Where c is weaker:
- the label's foot band is now plain epoxy, a 13 px strip of dead space;
- the section is about 150 px taller at 390 (1,202 against 1,056).

If the owner wants the line kept on the object (the lead's decision), take a is ready.

Next step if c is liked: repaint A2's label without the foot band, and try b's geometry under c's balloon (b's bigger founder).

## Drop-in
- `dropin/x2p_chips.js` and `dropin/x2p_chips.css` replace `tools/v22/story/x2p_chips.js/.css` one for one. They use the same wait-and-try wrapper and `__x2pChipsErr` as the live file, and `window.__C8IMG="media/"`.
  - The default take is **c**; `window.__C8T="a"` gives take a.
  - The header comment lists every file make_site.py must copy: `chip8a-*`, `chip8c-*`, `try8-*`, `rays6.webp` and the founder loops. b's `chip8b-*` are in `out/` but not listed; add them if b is picked.
- Copy into `media/` from `out/`, flat names, ≤ 243 KB each:
  - `chip8{a,c}-{grok,claude,gpt,kimi}-{1200,1800}.{jpg,webp}`;
  - `try8-{1200,1800}.{jpg,webp}`.
- Checked: the drop-in builds on the built page with no errors (images pointed at `out/`).
- Mounting is as before: it hides `#standings` and inserts `section.ch.c7.c8`. Its `.c8-*` classes do not appear in v46. It keeps chips7's `.ch-*` and `.c7-*` rules, so do not keep both files.

## Boards
- `ez/x2p-h24-chips8-390.png`: today's chips7, a, b, c, and a with the live boxes outlined; then 2x close-ups of a No. 1, a No. 4, b No. 1 and the fifth chip.
- `ez/x2p-h24-chips8-1280.png`: the same at half scale (two chips a row on desktop).
- `ez/x2p-h24-chips8-closeup.png`: one chip at 3x (1170 real px): today, a, b, and GPT's ✓ beside Exxon's mark.
- `ez/x2p-h24-chips8-edge-notrades.png`: the empty-week state.
- `ez/x2p-h24-chips8-loops.mp4`: take a at 390, only the founder loops moving, then the fifth chip.

## How it could fail
- **The etched line is unreadable on phones** (a, b), so the personality, the card's point, is lost below desktop. In c the balloon fixes this but leaves the dead foot band.
- **The break in b is weak.** The owner asked for the character to pop out; b's frame barely crosses the rim. A real panel break may need the founder loop itself to overlap the frame: a matted loop with the head over the gold, which means re-rendered founder clips with alpha.
- **A repeated LAST ROUND** (all four on Exxon today) reads as decoration, not a fact; it will vary more on quieter days.
- **Logos as one warm light** lose their brand colour, and marks made of X's or ticks (Exxon, Nike-like swooshes next to ✓) can still echo the LED.
- **The 7-day number is big this week and small next.** A visitor may read the big green number as the season.
- **The painted names** are evened in code (`normname.py`). At 4x the B2 pass's names show a slightly different glow from A2's.
- **Seams:** the plate, flag, name and foot are laid back from separate passes, feathered 3 to 6 master px; invisible at 3x. The ceramic tint keeps chips7's speckles where the grain is dark.
- **Rays:** the leader's painted rays, reused from chips7, show as gold stripes between the pins. The clip polygon was drawn for chips7's proportions.
- **Not checked:**
  - Safari (screen blends on clipped images, SVG gradient fills with drop-shadow filters, the CSS-filter lit logos);
  - real phones;
  - a 4x slower CPU. The layer count is about chips7's: 1 base image, 4 glass layers and 4 live boxes per chip, against 9 + 9.

## How to make it again
Serve `ez/` on port 8951.
1. `/usr/bin/python3 reflayout.py` (layouts A, B, A2, B2, T), then `python3 mkjobs.py master > jobs-master.json && python3 gen.py jobs-master.json`.
   - `jobs-masterA2.json` and `jobs-master2.json` hold the square-window retries and the A2/B2 relayout (the prompts are in `log.jsonl`).
2. `/usr/bin/python3 measure.py img/<master>.jpg 'name:x,y;...'` writes `<master>.geom.json`. The plate and foot band were read by hand from crops; they are in `guides.py`'s GEO.
3. Per model:
   - `/usr/bin/python3 guides.py` makes the guides;
   - `gen.py jobs-models2.json` (A2/B2) and `jobs-models3.json` (the B2 Claude and Kimi retakes) run the passes;
   - then `/usr/bin/python3 compose.py A2 B2`, `compose.py A2 nofoot` (take c) and `normname.py`.
   - Export: crop A2 at 3760×1520+40+272 and B2 at 3760×1500+40+276; 1200 px at q82 / webp q80, 1800 px at q70 / webp q72.
   - Note: the committed `img/` and `ref/` copies are downscaled to 2048 px (output rule), so the geometry in `*.geom.json` and `guides.json` refers to the 3840-px originals. Scale it, or regenerate.
4. Fifth chip: `jobs-try.json` (t8-a picked), `node tguide.js`, `jobs-tryp.json` (t8p-a picked); crop 3760×1460+40+290.
5. Boards:
   - `node run.js <dir> now,a,b,c,a~grid 320,390,1280` and `node run.js <dir> now,a,b 390 3`;
   - `/usr/bin/python3 board.py <dir> 390|1280 <out>` and `board.py close <dir3x> <out>`;
   - `node rec.js <out.mp4> 390 a`.
