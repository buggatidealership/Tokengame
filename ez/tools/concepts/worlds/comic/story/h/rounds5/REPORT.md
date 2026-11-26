# Round H11 · rounds5: Every round so far, "Hot off the press"

Brief: BRIEF-H.md, "Round H11", `rounds5`. Rounds4's print shop, now in Silver Age flat print, bright. Only the four newest graded rounds hang on the drying wire, with blank sheets beside them. Tapping a cover opens the round. Today's painted logo rack and the grid stay underneath.

## What I made
All of it is laid over the **real built X3+ page** (`v47-live-x3plus.html`) by `shot.js`. So a tap opens the live slab, and the rack and the grid below are today's. Every word and number comes from ROUNDS, UPCOMING, MODELS and CO_LOGOS.

- **Boards:**
  - `ez/x2p-x3p-h11-rounds5-390.png`: today, A, A with pencil, B, C; the tap and the opened slab; the whole chapter down to "Show all 80 rounds"; 320px shots.
  - `ez/x2p-x3p-h11-rounds5-1280.png`: today, A, B with pencil, C; the tap and the slab.
- **Video:** `ez/x2p-x3p-h11-rounds5.mp4` (390x844, 20 s). The chapter scrolls in. Round 80 is printed onto its sheet by a roller, the wet ink glints, and drips run off the print. All the sheets sway on their clips. Tap R80: the clip lets go, the sheet tips, comes to you and opens the live slab. Close it and the sheet drops back onto the wire. Then R79 is tapped.

**The three beats (lesson 99):**
1. **Establishing picture:** the print shop in bright sun (yellow walls, a green press with red rollers, gold, green and red ink cans) and the heading "Hot off the press" in the bet's lettering.
2. **Live instrument:** the drying wire. Newest first: R80 Exxon Mobil (GPT), R79 AstraZeneca (GPT & Claude tie), R78 Intel (Claude), R77 Chevron (Claude).
3. **Why it matters:** the blank sheets. The prints are still coming, and "Printed at every close · 80 so far" is lettered on the wall.

**Layout:**
- **Phone:** two wires at two depths. The newest two hang big on the near wire. The next two and two blanks hang smaller on the far wire, so how recent a round is reads as how close it is.
- **Desktop:** one wire with four covers then two blanks, over the 16:9 plate.

**Motions (three):**
- Print rolling onto the newest sheet, once, when the chapter comes into view.
- Wet ink: a glint, then drips that grow, hold and fade on the two newest.
- A slow sway on every sheet, each with its own period.

None of them run with reduced motion.

**Blank sheets, two versions:**
- plain;
- pencilled in non-photo blue, the way comic artists lay out a page: "No. 81", "Palantir", "(PLTR) · Nov 3", a rough corner box, a burst with "?" and "??? WINS!". The names come from UPCOMING.

**Cover treatments (the art is each round's T3/T2 tile redrawn bright by gpt-image-2):**
- **A, drawn trade dress:**
  - a corner box with the number and date;
  - "EZ · Season 1" and the company in Luckiest Guy, in its brand colour (yellow when the brand colour is too dark), with the ticker;
  - the move on a green or red burst;
  - the cover line on a yellow ribbon.
  - Every shape is a hand-jittered two-tone SVG with an ink line.
- **B, painted trade dress:** the painter painted the trade dress into the cover, blank: a yellow banner, a white corner box, a white burst and a red ribbon. `detect.py` measures each shape (`dress.json`), and the words are set inside them.
- **C, go-go checks:** a Silver Age checker band. The corner box holds the winner's model mark (both marks on a tie, "?" when nobody won). The move sits in a price circle and the cover line on a diagonal sash.

**Each cover is printed on a painted sheet of paper:**
- The sheet is a sprite with its own painted gold clip, keyed from a green screen.
- The print has white margins with crop marks, a colour bar (gold, green, red, ink) and a registration target.
- The sheet's own ink and curl are multiplied back over the print.

**The painted wires** were measured on the plates (18.8%, 31.8% and 46.5% on the phone plate, 22.1% on desktop). They are re-inked along the same lines so they read at phone size.

## The painted surface under every live text
- **"Hot off the press":** the calm flat yellow wall band the plate leaves at its top, as the bet's heading sits on the vault.
- **"Printed at every close · 80 so far":** the same yellow wall, below the heading.
- **The cover words, A and C:**
  - corner box, number and date: a hand-drawn white two-tone box;
  - masthead and ticker: the calm sky band the redraw keeps at the top of every cover (asked for in the prompt);
  - the move: the burst or price circle;
  - the cover line: the ribbon or sash.
  - These are drawn surfaces, not painted ones.
- **The cover words, B:** each word sits in a shape the painting itself carries blank (banner, box, burst, ribbon), measured, not guessed. This is the only treatment that fully meets "a surface the painting leaves blank".
- **Pencil notes on blank sheets:** the painted blank paper sheet.
- **Rack numbers and grid:** unchanged, today's.

## My pick
**B (painted dress) with pencilled blanks, on the phone two-depth wire.**
- B is the only take where the words truly sit in surfaces the painter made, which is the owner's H9 complaint ("stuff slapped on it").
- The pencilled blanks say "the next print is Palantir, Nov 3" without a sentence. A comic page in blue pencil is the print shop's own language for "coming".

Second choice: A. It is the most legible at small sizes and needs no detection step per round.

## How each take could fail
**All:**
- **Far-wire covers are small on a phone.** About 64px of art, with the masthead at about 6px. The newest two are about 120px. People can tap, but the far row is decoration until it is tapped.
- **The grid below repeats R77 to R80.** The wire already shows them. The grid should start at R76 or label itself as the archive.
- **Two big headings in one section.** The archive heading "Every round so far" stays under the rack at full size. My rule to quiet it did not match the live DOM, so it needs a fix in the build.
- **The wires carry more of the painting than the sheets cover.** On the phone, the middle wire (31.8%) hangs empty between the rows.
- **Three motions at once on the newest sheet** (the roll, the drips, the sway) push against lesson 86's "one per view". The roll runs once; the drips are the one thing still asking.
- **Rounds 79 and 80 have no film,** so their art is the T2 world scene. Nothing on the art says who won; only the cover line does. On 77 and 78 the crowned gold object carries it.
- **Desktop covers are about 105px wide** and the masthead about 10px. A take with a closer camera (fewer sheets, bigger) may be needed.
- **Not checked in Safari** (CSS mask with the PNG sprite, mix-blend multiply).

**A:** the drawn boxes are cleaner than the painted line. At 2x they read as vector.

**B:**
- The painter's shapes move per round, so every new round needs `detect.py` (it failed nothing in four, but a cover with white clouds near the burst could confuse it).
- The move in green ink on a white burst is the least punchy of the three.
- The painted ribbon on R80 is thin (5% of the cover), so its line is small.

**C:**
- The checks band plus the corner box plus the sash is the busiest.
- "No. 80" in white with an ink stroke is hard to read at far-row size.
- On a tie the two marks crowd the box.

**Pencilled blanks:**
- The non-photo blue reads as faint at a glance.
- They say "??? WINS!", which a newcomer may take for a bug.

## Cost
- 19 Hedra jobs, **$0.89 of $10** (`jobs.jsonl`).
- gpt-image-2 at 1K medium:
  - 5 plates at about $0.03;
  - 3 sprites at $0.04 to $0.05;
  - 9 covers at about $0.05.
- 2 Topaz upscales of the picked plates (1080p phone, 2K desktop), $0.08 each. The plates were upscaled rather than re-rolled at 2K, so the measured wires stay where they are.
- The budget is mostly unspent. More cover rounds, or a closer desktop plate, would be the next spend.

## Files
- `gen.py`: prints the job lists (`plates`, `sprites`, `covers`, `dress`); the prompts are in it.
- `run.sh`: runs a job list.
- `hd.py`: the Hedra client (never prints the key).
- `up.py`: Topaz upscale.
- `key.py`: green-screen key for the sprites.
- `detect.py`: writes `dress.json`.
- `r5.css` and `r5.js`: the chapter, laid over the live page:
  - `window.__R5={d:'A'|'B'|'C',bl:'plain'|'pencil'}`;
  - `__R5take(i)` taps the i-th newest.
- `shot.js`: `node shot.js <out> A-plain,B-pencil,now 390x844,1280x800 [full|tap]`, served from `ez/` on port 8897.
- `video.js`: the video.
- `board.py`: the boards.
- `img/`:
  - plates `shopa*`, `shopb*` (take B, the red room, not used);
  - sprites `spr-*`;
  - covers `cv-r*` (A and C) and `dr-r*` / `dr2-r77` (B).
- `raw/` is not committed.
