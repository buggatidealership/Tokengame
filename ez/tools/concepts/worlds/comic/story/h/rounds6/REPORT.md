# Round H13 · rounds6: Hot off the press, second pass

Brief: BRIEF-H.md, "Round H13", `rounds6`. It starts from rounds5's pick: cover treatment B (painted trade dress) with pencilled blanks. Round H12's rules apply in full.

## What I made
Everything is laid over the real built X3+ page (`v47-live-x3plus.html`) by `shot.js`. The logo rack and the grid below are today's.

Every word and number comes from the page's own data:
- ROUNDS gives the four newest graded rounds: R80 Exxon Mobil, R79 AstraZeneca, R78 Intel, R77 Chevron.
- UPCOMING gives the next prints: R81 Palantir, R82 Apple, R83 Pfizer.
- The tally count is the number of graded rounds (80 today).
- MODELS and CO_LOGOS supply the names.

**Boards:**
- `ez/x2p-x3p-h13-rounds6-390.png`: today, W1, W2, W3, W1 with plain blanks; a tap opening the round; the whole chapter; close-ups; 320px shots.
- `ez/x2p-x3p-h13-rounds6-1280.png`: today, D1 (slate), D2 (brass plate), and a tap.

**What changed from rounds5:**
- **New plates.** These are gpt-image-2 edits of rounds5's own print-shop plates, so the shop stays the same:
  - The painted drying wires are taken out, and the page draws its own wires. That way the composition is free.
  - Each plate gains one blank surface for the tally:
    - a black slate chalkboard on an easel in the foreground (phone and desktop);
    - a large brass maker's plate bolted to the press (desktop D2).
  - `surf.py` measures the slate's face into `surf.json`. The desktop brass face was measured by eye on a 2x crop: it faces us at about 20°, and the words are skewed to follow it.
- **Exactly four printed covers, all one size, in every take.** The newest come first. The blank sheets hang the same size beside them.
- **The tally "Printed at every close · 80 so far"** is chalked on the slate or engraved in the brass. It is never over the sheets: `shot.js` checks that the tally's text box overlaps 0 sheets in every shot. Where a sheet hangs in front of the slate's top (W2), the chalk moves into the part that still shows.
- **The only tap is navigation.** Each cover is an `<a href="#/round/n">`, and the live slab opens (checked: R80 opens its graded card). Nothing leaves its clip, and there is no fly-out or scrim.
- **One small loop per take:**
  - **sway:** every sheet rocks on its clip at its own pace;
  - **ink:** only the newest print is wet, with a glint crossing it and drops running off its foot.
  - Neither runs with reduced motion.
- **The pencilled blanks** are roughed in non-photo blue, the way a comic cover is laid out:
  - the corner box with the number;
  - the company and its ticker with the grading day;
  - a dashed empty burst and ribbon where the result will go.
  - rounds5's "??? WINS!" is gone, since it read like a bug.
- **The archive heading** "Every round so far" under the rack is a step quieter, so the chapter has one loudest line.

## The compositions
- **W1, three a wire (phone).** R80, R79 and R78 sit on the top wire. R77 and two pencilled blanks (Palantir, Apple) sit on the second. It reads left to right, top to bottom, and the line runs on into the prints to come. Covers are 107px wide at 390.
- **W2, two a wire, big (phone).** The covers are a 2x2 grid at 129px. Both wires run on past the frame's right edge with a pencilled sheet half out of the picture, so the wire goes on. The loop is the wet ink.
- **W3, printed / to come (phone).** All four printed covers sit on the top wire. The next three, pencilled, sit on a shorter wire below that ends at a hook with one empty slot. Covers are 83px. This is the clearest split between printed and coming, but the covers are the smallest.
- **D, desktop: one wire spans the width.** Four printed sheets, then three pencilled (Palantir, Apple, Pfizer), each about 135px wide at 1280.
  - D1 chalks the tally on the slate.
  - D2 engraves it in the brass plate on the press.

## The surface under every live text
- **"Hot off the press":** the calm flat yellow wall that the plate leaves at its top, in the bet's lettering.
- **The tally:** the black slate (chalk: Bangers through an SVG chalk filter, with the count in yellow chalk), or the brass plate (ink-brown engraving with a light lip under and a dark wall above).
- **Cover words** (company and ticker, No., the move, "GPT WINS!"): the blank banner, corner box, burst and ribbon that the painter drew into each cover. These were measured by rounds5's `detect.py`.
- **Pencil notes:** the painted blank paper sheet.
- **Rack and grid:** unchanged from today.

## Plain text outside the world
- **Inside the panel: none, in every take.** Every word is on the wall, the slate or brass, a cover's painted dress, or a sheet.
- **Below the panel, as today:** the archive's "Every round so far", "Newest first. Tap one to open its graded card." and "Show all 80 rounds".

## My pick
**W1 on phones, with the slate and the sway; D1 on desktop.**
- W1 keeps all four covers whole at a readable size.
- Its pencilled names are fully legible, and the reading line runs straight from printed into "coming".
- The slate stays fully in view.

W2 is the runner-up: the biggest covers and the strongest "it goes on". Its trade-off is that the half-sheets can't show their pencilled names.

## How each take could fail
**All takes:**
- **The covers are small.**
  - In W1, the masthead is about 8px at 390. People will tap the art, not read the dress.
  - W3, at 83px, is the worst: at 320 its covers are 67px.
- **The grid below still starts with R80 to R77,** the same four as the wire. It should start at R76, or say it is the archive.
- **The slate is a second black object** in a bright chapter. It reads well, but it is the heaviest thing in the panel.
- **The wires are drawn in code** on a painted plate. They are thin hand-jittered ink lines with gold hooks, but they are not painted.
- **The blank sheets are paper white.** This is in-world paper, as the brief asks, but it is the palest area of the panel.
- **The chalk filter** may render differently in Safari. Not checked in Safari.

**W1:** the second row hides the top of the press, so the press itself reads only as rollers and the delivery board.

**W2:**
- A half-sheet cut by the frame may look like a cropping error at first glance.
- Its slate sits partly behind the sheets.
- The ink loop is subtle at this size.

**W3:** the lower wire's empty slot can look unfinished. The covers are too small to read on a phone.

**D2:** the brass plate is at an angle, and the skewed engraving is a hand fit. If the plate moves in a re-render, it must be re-measured.

## Checks run
- Done at 320, 390 and 1280:
  - no sideways scroll (scrollWidth equals the viewport);
  - no console errors;
  - the tally overlaps 0 sheets;
  - every printed sheet in a take is the same width (within 3px, from the sway's rotation).
- Rule 0's list:
  - no box nested in a box inside the panel;
  - no native emoji;
  - nothing laid over a logo;
  - name and ticker together on every cover and blank;
  - no module filled with dots.
- I zoomed into the covers at 2x (the close-up row). The "No." box was crowded and was fixed. The title clipped at 320 and was fixed.

## Cost
- 6 Hedra jobs, gpt-image-2 2K medium edits at $0.069 each: **$0.41 of $10** (`jobs.jsonl`).
- Used: `p-slate-*` and `p-brass2-16x9`.
- `p-brass-*` (plate too small) and `p-brass2-9x16` (plate at a steep angle, half hidden by the delivery sheet) are kept but not used.
- Covers and sheet sprites are reused from `../rounds5/img/`; nothing new.

## Files
- `gen6.py`: the plate-edit prompts (`python3 gen6.py plates [brass|brass2|slate]`).
- `run.sh`, `hd.py`: the Hedra runner (from rounds5; it never prints the key).
- `surf.py` → `surf.json`: the tally surfaces.
- `r6.js`, `r6.css`: the chapter. Options are set with `window.__R6={w:'W1'|'W2'|'W3', plate:'slate'|'brass', loop:'sway'|'ink', bl:'pencil'|'plain'}`.
- `shot.js`: `node shot.js <out> W1-sway,W2-ink,W3-sway,D-sway-slate,D-sway-brass,now 390x844,1280x800 [top|full|tap]`. Serve `ez/` on port 8897 first.
- `board.py`: builds the boards.
- `img/`: the edited plates.
