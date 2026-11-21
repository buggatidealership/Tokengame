# Round H17 · chips: Meet the models as chips

Brief: `../BRIEF-H.md`, "Round H17", `chips`. These are mockups only:
- nothing in `ez/tools/v22/` or `ez/v4*.html` changed;
- nothing was deployed or published, and no PR was opened.

## The files
- **Boards:**
  - `ez/x2p-h17-chips-390.png`: today's live standings first, then A, B, B2 and C, with a 2x close-up row (the first beat of each take).
  - `ez/x2p-h17-chips-1280.png`: the same at 1280, one take per row.
- **Video:** `ez/x2p-h17-chips-loops.mp4`, 26 s at 390px. Takes A, B and C are each scrolled through at reading speed, with the founder loops playing inside the dies.
- **Code:** `_c.js` and `_c.css` are laid over the built `v46-live-x2plus.html`.
  - The chips section is inserted where X2+'s `#standings` was; `#standings` is hidden.
  - Everything else on the page is untouched.
  - `window.__CH` picks the take: `A`, `B`, `B2` or `C`.
- **How to run it** (serve `ez/` on port 8951 first):
  1. `python3 mkjobs.py > jobs1.json`, then `python3 gen.py jobs1.json` (Hedra).
  2. `/usr/bin/python3 measure.py`: finds the blank surfaces and writes `quads.json`. The big chip's quads and two EPROM labels are measured by hand; they are in the script.
  3. `node run.js <out> now,A,B,B2,C 320,390,1280`
  4. `/usr/bin/python3 board.py <out> <width> <file>`
  5. `node rec.js <out.mp4> 390` for the video.

## What I made
Every painting is gpt-image-2 with `media/bet-chip-h2.jpg` as the style reference. Each shows a real chip, painted comic, on a black void, with a green rim light on the left and a red one on the right. Each model's chip is painted in its own colour:
- Claude: terracotta;
- GPT: teal green;
- Grok: graphite;
- Kimi: cobalt.

Every chip exists twice:
- **lit:** the bet chip's gold rays rise from behind it;
- **dim:** no rays.

The page shows the lit painting for whichever model leads the season P&L. So the leader is marked the way the bet's chip glows, and the mark follows the data. Today that is Grok, at +$148,480.

All four takes share the same head: "Meet the models" in the bet's lettering (Bangers, ink stroke, stacked drop, tilted). Under it, one cream-on-black caption box reads "Ranked by season P&L. $100K on every call." Each beat has a caption box on its top-left corner.

- **A · one chip per model, one beat each (new school).**
  - Each beat is a square modern package. The founder's loop plays in its large die window.
  - Caption boxes read "No. 1 · top of the board" and "No. 2" to "No. 4".
  - Phones stack the four beats (about 1,590px tall at 390). Desktop sets them four across.
- **B · two chips per beat, old school.**
  - Each model is a 1970s UV EPROM, the chip that really does have a quartz window onto its die. The founder is seen through that window: a glimpse, not a portrait.
  - Beat 1, "The race for No. 1", holds No. 1 and No. 2. Beat 2, "Chasing", holds No. 3 and No. 4.
  - Phones stack the two beats (791px at 390). Desktop sets them side by side.
- **B2 · two per beat, new school side by side.**
  - Shown to make the trade-off visible: at 390 the silkscreen comes out at 6px, which cannot be read.
  - I do not recommend it.
- **C · one big chip, four dies.**
  - One green package, the dies in P&L order: 2x2 on phones, one row of four on desktop.
  - Each die has a small label under it.
  - The leader's die gets a gold light round its bezel.

**Live data, none of it typed:**
- The order, P&L and W-L come from `__x2pPnl().A`: P&L = balance − $100,000, ranked by P&L.
  - Today: Grok +$148,480 (45-27), Claude +$102,950 (48-32), GPT −$56,930 (43-37), Kimi −$70,650 (37-43). These match the live board.
- The marks and versions come from `MODELS` (`d`, `ver`).
- The flags are US for GPT, Claude and Grok, and China for Kimi, as on the live board. They are drawn as SVG, not emoji.
- Screen readers get one list: rank, version, country, W-L and P&L.

## The surface under every live text
Every surface is an SVG in its own box (or, for a die, the video), mapped onto the four painted corners with one `matrix3d`. The quads are measured on each painting (`measure.py`, `quads.json`). A run reports `outSurf: 0` (no surface outside its painting) at 320, 390 and 1280.

| Live text / layer | Painted surface | Treatment |
|---|---|---|
| A, B2: name, version, W-L, P&L | the blank black label panel along the package's foot | cream silkscreen (Anton), P&L in green or red with a faint ink bleed |
| A, B2: the model's mark | the blank gold pad, top left | dark ink multiplied into the gold, a pale lip under it and a dark wall over it (struck) |
| A, B2: the flag | the blank white label, top right | printed colour, multiplied |
| B: mark, name, version, flag | the left blank black label on the ceramic | silkscreen; the flag printed small at its foot |
| B: W-L, P&L | the right blank black label | silkscreen, the P&L the largest figure |
| C: mark, name, flag, W-L, P&L | the small blank label under each die | silkscreen, two lines |
| founder loop | the blank glass die window (A, C) or the quartz window (B) | the video sits behind a dark glass tint and an inset shadow; the painting's own reflection streak is laid back over it (a screen-blended copy of the painting, clipped to the window), so the glass stays the painting's glass |

**In caption boxes:** the line under the head; "No. n" and "top of the board"; "The race for No. 1" and "Chasing"; "One chip, four dies".

**Outside the paintings:** only the head.

## Motion
- The loops play muted, and only while their chip is on screen (an IntersectionObserver plays and pauses them). The videos are the founders' own 5 s Hedra loops.
- With reduced motion, the poster frame is the still. The boards are shot that way.
- Nothing else moves.

## My pick: B, the EPROMs, two per beat
- **The founder stays a glimpse.** The quartz window is the "glimpse into the chip" the brief describes, and it is true to the object: a real EPROM's window shows its die. The face is small and round behind glass, never the focal point (lesson 110). In A, and most of all in C, the face fills the glass and becomes the subject.
- **It reads.** The figures are the largest of any take: on a phone the P&L is about 22px and the smallest text 14px. A's smallest text is 13px on a phone but 10px at 1280. C's is 9px at 320.
- **The pairs tell the story.** "The race for No. 1" puts Grok and Claude, $45,530 apart, in one frame. "Chasing" holds the two in the red. Each beat says one thing (lesson 99).
- **It fits the exchange's old-school take.** It is the shortest take on a phone: two beats, 791px against A's 1,590.
- **Where A is stronger:** it is the bet chip's own family (a modern package, a big die). If the exchange goes new school, A matches it, and A's portrait is bigger.
- **The parts can be swapped:** the lit/dim leader rule, the silkscreen and the window treatment work on either chip.

## How each take could fail
- **All takes:**
  - The chips sit on the chip's black void, not in a painted exchange scene. The exchange is the `exch` helper's area, and its ground would go behind these.
  - Two code layers sit on the paintings: the glass tint and the inset shadow over the videos. In C, the leader's gold bezel light is CSS (lesson 80).
  - The lit and dim paintings of one model are separate images. If the lead changes, the leader's chip swaps for a slightly different painting, not the same chip lighting up.
  - Each P&L is page text on a silkscreen surface, so the figure always follows the data. A model is chosen by rank, not by fixed position, so the order changes with the data.
  - The loops' own backgrounds (cream behind Claude, mint behind GPT, purple behind Grok, blue behind Kimi) show through the glass. On the orange and green chips this is busy.
  - Safari was not checked (`matrix3d` on SVG and video, `mix-blend-mode`, `clip-path` on images).
- **A:**
  - About 1,590px on a phone, nearly two screens, for four facts each.
  - The face is the biggest thing in each beat (lesson 110 risk).
  - The version text is 5 to 10px at 1280.
- **B:**
  - The window is small on a phone (about 60px), so the founder reads as "someone in there" rather than as who it is.
  - Two models per beat can read as head-to-head match-ups that do not exist; pairing is by rank only.
- **B2:** the silkscreen is unreadable on a phone (6px); shown only as the trade-off.
- **C:**
  - Four large faces make the founders the focal point.
  - The labels are tiny: 9 to 11px on phones.
  - The gold bezel light is code, and weak.
  - The phone crop cuts off the package's edge, so it reads as a board, not a chip.

## Checks run
- **Widths:** 320, 390 and 1280 for every take. No sideways scroll (scroll width = viewport), no page or console errors, no surface outside its painting.
- **Data:** checked against the live board's figures (the same `__x2pPnl`).
- **Rule 0:**
  - no white or pale module grounds (the white label holds the printed flag only);
  - no native emoji;
  - no text over a face or a logo: the face is inside the die, and the text is on its own labels;
  - no dot fill;
  - containers hug their content.
- **Zoom:** every take zoomed at 2x (the close-up row). Fixes made on the way:
  - The glass reflection streak broke the measured windows into triangles, so the measurer now takes each region's convex hull and bounding box.
  - The detector merged two EPROM labels with the chip body, so those were mirrored about the window.
  - The big chip is measured by hand on gridded 2x crops.
  - The desktop section was squeezed into X2+'s column, so it now spans 1180px.
  - C's caption covered a die, so the panel gets a caption strip.

## Cost (Hedra)
| Jobs | Model | Settings | Cost each | Time | Result |
|---|---|---|---|---|---|
| 8 × new school chip (4 models × lit/dim) | gpt-image-2 | 1K medium 1:1, ref chip | $0.066 | 42 to 88 s | very consistent: die, black label, gold pad and white label in the same places on all eight |
| 8 × EPROM (4 models × lit/dim) | gpt-image-2 | 1K medium 16:9, ref chip | $0.042 | 34 to 48 s | quartz window and two labels on all eight; Grok's graphite body is close to its labels in tone |
| b-tall, b-wide | gpt-image-2 | 1K medium 3:4 / 16:9, ref chip | $0.050 / $0.042 | 67 to 84 s | four dies with labels; the wide one in light perspective |

**Total: $0.96 of the $8 cap** (18 jobs; each charge equalled its estimate; the log is in `log.jsonl`). Nothing was upscaled. Painting the picked take at 2K is the next step once the owner picks (lesson 83).
