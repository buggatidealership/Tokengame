# Round H18 · chips2: Meet the models as chips, A and B redone

The brief is `../BRIEF-H.md`, "Round H18", `chips2`. It builds on the H17 helper's `../chips/` (see its REPORT).

Mockups only:
- nothing in `ez/tools/v22/`, `ez/v4*.html` or `ez/media/` changed;
- nothing was deployed or published.

## The files
- **Boards:**
  - `ez/x2p-h18-chips2-390.png`: today's live standings, then A and B (each the whole section), then a row with the tryouts chip in its three wordings for both schools, then a 2x close-up row (A No. 1, A No. 2, B's beat).
  - `ez/x2p-h18-chips2-1280.png`: the same at 1280, one version per row, then the wording rows.
- **Video:** `ez/x2p-h18-chips2-loops.mp4`, 27 s at 390px. A, then B, each scrolled through at reading speed. The founder loops play in the dies, and the scan runs in the tryouts dies.
- **Code:** `_c.js` and `_c.css` are laid over the built `v46-live-x2plus.html`. The section takes the place of `#standings` (hidden); the rest of the page is untouched.
  - `window.__CH` picks the version: `A` or `B`.
  - `window.__TW` picks the tryouts wording: `tryouts`, `qual` or `inf`.

## How to run it
Serve `ez/` on port 8951 first (`python3 -m http.server 8951` from `ez/`).
1. **Paint:** `python3 mkjobs.py > jobs1.json`, then `python3 gen.py jobs1.json` (Hedra; needs `HEDRA_API_KEY`).
   - `jobs2.json` repainted the lit Claude and Kimi EPROMs with room under the gold plate.
   - `jobs3.json` repainted the tryouts chips with wider labels. `t-new2` replaced `t-new`; `t-old2` was not better and was dropped.
2. **Measure:** `python3 measure.py` (needs scipy) finds the blank surfaces and crops and writes `quads.json`.
   - Measured by hand on gridded 2x crops (in the script): the two graphite Grok EPROMs and both tryouts chips, where dark labels merge with a dark body or board, and the left end of the Grok packages' label.
3. **Marks:** `python3 mkmarks.py` writes `marks.json`.
   - Qwen, Mistral and Gemini come from x2plus.js's No. 5 ticket (`C5`).
   - Nemotron is **not** in x2plus.js, so NVIDIA's mark comes from `launch-r34-five/_data.js` (Simple Icons, as the other marks). Both files are read only.
4. **Shoot:** `node run.js <out> now,A,B,A:qual,A:inf,B:qual,B:inf 320,390,1280`
5. **Boards:** `python3 board.py <out> 390 <file>` and `python3 board.py <out> 1280 <file>`
6. **Video:** `node rec.js <out.mp4> 390`

## What I made
Every painting is gpt-image-2 (1K, medium) with `media/bet-chip-h2.jpg` as the style reference. Each shows a real chip, painted comic, on the black void, with a green rim light on the left and a red one on the right. Each model keeps H17's colour:
- Claude: terracotta;
- GPT: teal green;
- Grok: graphite;
- Kimi: cobalt.

The season P&L leader's chip is the lit painting, with the bet chip's gold rays (today Grok). The others are dim. The lead follows the data.

**Shared by both versions:**
- **The company's mark is bigger, top left.** The paintings were redone with a large blank gold plate, about a quarter of the chip's width in A (H17's pad was about 7%). The mark is struck into the gold (dark ink multiplied in, a pale lip under it, a dark wall over it).
- **The version is printed beside it, as part of the chip:** "4.7", "Fable 5.1", "6 Astra", "K3" (MODELS[].ver with "GPT-", "Grok " and "Kimi " dropped).
  - **A:** cream silkscreen on the bare board right of the plate, under a small printed "MODEL" label, on one baseline with the name ("GROK 4.7").
  - **B:** at the top of the black label, beside the name.
- **The flag is a decal printed on the chip's own surface.** It sits on the bare board in A (top right) and on the ceramic under the gold plate in B. The painting's own grain and traces are laid back over it in soft-light, so it reads as ink on the board, not a badge. US for Grok, Claude and GPT; China for Kimi; drawn as SVG, no emoji.
- **Labelled stats on the black label:** LAST 5 (printed green cells with a tick, red with a cross, grey with a dash for no call), W-L, SEASON P&L (green or red, the largest figure).
  - B also prints "NO. 1" to "NO. 4" on the label, No. 1 in gold. Since all four share one beat, the rank cannot ride on a caption box.
- **The founder loop** plays in the die (A) or behind the quartz window (B), behind tinted glass. The painting's own glass reflection is screened back over it, so it stays a glimpse.
- **Every beat bleeds** edge to edge on phones (100vw, cream gutter rules above and below each beat only). From 1000px the beats keep the hand-cut frame.

**The two versions:**
- **A · one chip per model, one beat each.** A caption box on each beat ("No. 1 · top of the board", "No. 2" ...).
  - Phones stack the beats; at 1000px and up they sit three across with the second row centred (No. 4 and the tryouts chip).
  - At 390 the section is 2,196px tall: about 2.6 screens.
- **B · the four old-school EPROMs in ONE beat.** One caption box, "Season 1 · the board, by P&L", then the four EPROMs stacked by rank.
  - Desktop sets them 2x2, aligned on their bottoms, because the lit chip's rays make it taller.
  - At 390 the beat is about 650px tall (the whole board on one phone screen), and the section 1,020px.

**The tryouts chip, a fifth beat in both versions:**
- **The chip:** an unfinished engineering sample (raw slate-green board in A, raw grey ceramic in B), with a strip of worn masking tape and four dark dies (A) or quartz windows (B).
- **In each die:** Mistral, Qwen, Gemini, Nemotron. The lab's mark is seen faintly through the smoked glass, and a slow green scan passes over it while the marks breathe ("still running inference"). Nothing moves with reduced motion.
- **Under each die:** the name and the flag (Mistral: the EU flag, the owner's earlier pick; Qwen China; Gemini and Nemotron US).
- **Caption box:** "No. 5? · not signed yet" (the old ticket's "?" and "Not signed yet").
- **Three wordings on the label strip:**
  - **"In tryouts"** (the old ticket's own word), with "One of them makes No. 5" beside it in A;
  - **"Qualifying"**, with "Four in, one gets a seat";
  - **"Running inference…"** (chip language, the owner's own phrase), with "Who qualifies?".
  - The sub-line shows on A only: B's strip is too short for it to be legible.

**Live data, none of it typed:**
- Order, P&L and W-L come from `__x2pPnl().A`; the last five from the last five graded ROUNDS (R76 to R80) through each model's per-round results.
- I checked it outside the page, against ez-data.js in node (`ROUNDS` recomputed). Every figure on the boards matches:

  | Model | P&L | W-L | Last 5 |
  |---|---|---|---|
  | Grok | +$148,480 | 45-27 | WWWLL |
  | Claude | +$102,950 | 48-32 | WWWWL |
  | GPT | −$56,930 | 43-37 | WLLWW |
  | Kimi | −$70,650 | 37-43 | LLLWW |

- Screen readers get one list: rank, version, country, the last five in words, W-L, P&L, and the tryouts.

## My pick: B, one beat
- **It does what Meet the models has to do on one phone screen:** all four rivals, their marks, flags, records and money, ranked, in about 650px. A needs 2.6 screens to show the same four facts per model.
- **The founder stays a glimpse:** a small round face behind quartz (lesson 110). In A the die is a little smaller than in H17, but the face is still the biggest picture on each beat.
- **It reads:** the labels are about 9px at 390, the values 14 to 22px, and the P&L largest.
- **Where A is stronger:** each chip is a richer object (the board, the traces, a bigger die), and it is the bet chip's own family. A is the better choice if the page wants each model to have its moment, or if the exchange goes new school.
- **The tryouts:** in B the long old-school package sits under the board like a bench, which reads right. "In tryouts" is my pick of the wordings: everyday English and the word the owner already used. "Running inference…" is the more chip-world line, but people outside AI may not know it.

## How each option could fail
- **Both versions:**
  - The flag decal still sits on a fairly calm, darker patch of board. On the graphite Grok chip, the painting's own recessed panel makes it read a little like a plate behind the flag.
  - The soft-light grain is subtle at phone size, so on a phone the flag can still read as "stuck on" rather than printed. A painted flag per chip from Hedra would be the true integration (rule 2 allows a flag as artwork, but its colours must be checked).
  - The labels are about 9px on a 390 phone and about 7px on a 320 phone (the label strip scales with the chip). They are legible at 390 and tight at 320.
  - The lit and dim paintings of one model are different images. A change of leader swaps the painting, not the same chip lighting up.
  - The lit Grok EPROM's label is slightly shorter than the others, so its name sets a touch smaller.
  - "One of them makes No. 5" and "Four in, one gets a seat" claim that exactly one tryout joins next. That follows the owner's "who qualifies" and the "No. 5" ticket, but confirm it (lesson 65).
  - Safari was not checked (`matrix3d` on SVG and video, `mix-blend-mode`, `clip-path` on images).
- **A:**
  - About 2,200px on a phone for five beats.
  - The face is still the largest picture per beat.
  - On desktop the second row is centred, so there is open page ground beside No. 4 and the tryouts chip, and the leader's ray glow makes No. 1's cell taller.
- **B:**
  - The quartz window is small on a phone (about 45px), so the founder reads as "someone in there" more than as who it is.
  - Four chips of one shape in a stack can read as rows of a table (rule 0). The colour, the leader's rays and the faces carry the difference.
  - The tryouts wording strip is long and half empty in B.

## Checks run
- **Widths:** 320, 390 and 1280 for A, B and all three wordings. Sideways scroll = viewport width every time, no page or console errors, and no surface outside its painting (`outSurf: 0`).
- **Data:** recomputed from ez-data.js outside the page; matches (table above).
- **Readability:** the run reports the smallest text boxes. At 390 the smallest label is about 9px (box 11px); one 8px sub-line was shortened. At 1280 the smallest label is about 9px in A (chips about 380px wide, three across) and 12px in B.
- **Rule 0:** no white or pale grounds, no emoji, no dot-filled modules, nothing over a face or a mark, containers hug the chips.
- **Zoom:** every chip zoomed at 2x. Fixes made on the way:
  - The decal texture and the glass reflection were offset: the clip-path percentages were measured against the crop instead of the full painting. They now refer to the whole painting.
  - The tryouts caption covered B's label strip; B's tryouts beat now has a caption strip.
  - On the lit chips, the gold rays were detected as the gold plate; plates are now picked by shape.
  - A's desktop grid left an empty sixth cell; the second row is now centred.
  - Claude's version was squeezed by the flag; name and version now scale together.

## Cost (Hedra)
| Jobs | Model | Settings | Cost each | Time | Result |
|---|---|---|---|---|---|
| 8 × new school chip (4 models × lit/dim) | gpt-image-2 | 1K medium 1:1, ref chip | $0.0665 | 47 to 90 s | consistent: big gold plate top left, bare board beside it, die centre, tall label at the foot, on all eight |
| 8 × EPROM (4 × lit/dim) | gpt-image-2 | 1K medium 16:9 | $0.042 | 34 to 42 s | plate, window, big label on all eight; on the lit Claude and Kimi the plate filled the whole height (no room for the flag) |
| 2 × EPROM repaint (lit Claude, lit Kimi) | gpt-image-2 | as above, "plate covers only the upper half" | $0.042 | 36 to 43 s | room under the plate on both |
| t-new, t-old (tryouts) | gpt-image-2 | 1K medium 1:1 / 16:9 | $0.066 / $0.042 | 77 to 78 s | right layout; t-new's labels too small for name + flag (replaced); t-old kept |
| t-new2, t-old2 | gpt-image-2 | wider labels under the dies | $0.066 / $0.042 | 43 to 49 s | t-new2 good (used as `t-new.jpg`); t-old2 no better (dropped) |

**Total: $1.17 of the $8 cap** (22 jobs; each charge equalled its estimate; the log is in `log.jsonl`). Nothing was upscaled. Painting the picked version at 2K is the next step once the owner picks.
