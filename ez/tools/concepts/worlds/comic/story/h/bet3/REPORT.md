# Round H12 · bet3: the bet chapter as the S1 circuit sequence, text in the world

Boards: `ez/x2p-x3p-h12-bet3-390.png` (today, then A to D; a close-up row of the in-world lettering under it), `ez/x2p-x3p-h12-bet3-1280.png`.
Scroll video: `ez/x2p-x3p-h12-bet3-scroll-390.mp4` (take D, 15 s, 780x1688, shot frame by frame at 2x; each frame steps the scroll and the fees' SVG clock by 1/30 s, so the drip plays at real speed; the chip's seconds follow the real clock while shooting, which is slower than real time, so they tick faster in the film).
Run: serve `ez/` on port 8943, `node run.js <out> now,A,B,C,D 320,390,1280`, then `/usr/bin/python3 board.py <out> <width> <file>`; video `node rec.js D <out.mp4>`.

## What it is
Each take is laid over the real built X3+ page (`ez/v47-live-x3plus.html`). The live chapter stays exactly as it is: the vault opener, "Bet #1: NVIDIA", the date line and the painted chip with its live countdown (`h_bet`'s own code keeps ticking). Only the live parts list (C1/U1/K1) and the sockets closer are hidden; the take's panels go straight after the chip (`_k.js`, `_k.css`).

The sequence in every take is the owner's S1 template: 1 title over the vault, 2 the chip timer, 3 the pool with fees flowing in, 4 the call, 5 the fork to RIGHT and WRONG, 6 Season 2 as empty sockets.

Every word in a painting is set in an SVG laid over the painting in the painting's own pixel space (viewBox = the crop), so it scales and moves with the picture. Every painting was asked for blank surfaces to carry those words. All paintings are new, in the vault's drawn noir ink (gpt-image-2 with `media/bet-vault-h2.jpg` as the style reference): heavy brush ink, rain, black and white, gold light, plus the lamp's green and the fuse's red. bet2's traces and fork were rendered 3D, so they failed lesson 88 and were not reused.

Live data only:
- `SIM.poolShare` gives the 69% (the gauge's needle angle too).
- The leader is chosen the way the live chapter does it: the page's own name, else the P&L leader from `__x2pPnl`. Today that is Grok.

The fees loop is SMIL. It is paused while its panel is off screen, and still with reduced motion.

## The takes
| Take | 69% in the world | Fees loop | Voice for "The pool gets bet on the top AI's call. Today that's Grok." | Fork | Season 2 |
|---|---|---|---|---|---|
| A Engraved | engraved round the front of the pool's wide brass rim (one line along an elliptical path, "69%" larger) | gold drops run down six traces and over the rim | noir narration caption (black, gold double rule) breaking into the fork panel's top edge | RIGHT / WRONG lit on the board's two blank enamel plates; "$EZ buyback" / "The pool can be wiped out" silkscreened under them | the lit chip is "BET #1" (etched on its lid); empty sockets "#2 #3 #4" receding; "SEASON 2 →"; caption "NVIDIA is the first bet, not the last." |
| B Gold plate | "69%" and "of $EZ creator fees" stamped on a brass plate riveted to the pool's steel lip | gold pours down the traces from above | the $EZ host (the site's own character, repainted in the vault's ink) pointing, with a hand-tuned speech balloon whose tail meets his mouth | as A | three empty sockets, numbers printed on their floors in perspective; "SEASON 2"; caption |
| C Gauge | the tank's blank dial printed with a 0 to 100 scale, the needle at the share, "69%" on the dial; "of $EZ creator fees fill the pool" silkscreened on the board | gold bubbles rising in the tank's window, a glint down the pipe | a caption ("The pool gets bet on the top AI's call."), then the leader itself: its mark struck on the junction (the call), its name over it, and a balloon "Today that's me." | as A | as A, but with the whole line silkscreened along the board (no caption) |
| D One board (pick) | "69%" in gold silkscreen beside the pool, with "of $EZ creator fees fill the pool" | drops run down the converging traces into the pool | narration caption on the board beside the trace | silkscreen beside the lamp and the fuse | sockets "#2 #3 #4" at the board's foot, "SEASON 2 →", closing caption |

D is one continuous painted board under the chip. On phones it is a tall board read top to bottom; on desktop it is a wide one read left to right. So the chip's board simply keeps going: the scroll is the circuit.

## The surface under every live text
- **Engraved (A's rim, B's plate, A/C's chip lid):** Anton cut into brass or glass, with a pale lip below and a dark wall above (`#b3eng`).
- **Enamel plates (fork, A to C):** blank plates painted into the fork picture, with lit letters (green or red glow from the lamp and the fuse).
- **Silkscreen (fork sublines, sockets, Season 2, D's labels, C's board line):** cream ink with a worn mask (`#b3ss`), printed on the board. The sockets' text sits in each socket's floor plane.
- **Dial (C):** the painting's blank cream dial face. Its ticks, numbers, needle and "69%" are printed on it.
- **Voices:** caption boxes are hand-cut, broken into a panel's edge and drawn over dark board, never over a lamp, a fuse or a face. Balloons (B, C) are SVG in the painting's pixels, with the tail joined to the outline and aimed at the speaker.
- **Not in the world:** the live date line under the headline (kept, because the brief keeps the opener and the chip as they are).

## Plain text outside the world (measured by `run.js`: every visible word in the chapter, classed by where it sits)
| | plain | in the world | voices | title |
|---|---|---|---|---|
| Today (live) | **59** | 0 | 0 | 3 |
| A | **9** | 25 | 21 | 3 |
| B | **9** | 32 | 8 | 3 |
| C | **9** | 40 | 9 | 3 |
| D | **9** | 23 | 21 | 3 |

The 9 words are "It goes on at the close, Wednesday, November 18." The next step would be to silkscreen that date onto the chip's board ("CLOSE · WED NOV 18") and take plain text to 0; it touches the live chip panel, so it was left for the owner.

## My pick: D, with B's host balloon as the voice if a character is wanted
- **D does what "a scroll within a storybook" asks:** the chip's circuit board continues down the page as one picture. The fees run down the traces into the pool, one trace runs to the junction, it forks to the lamp and the fuse, and it ends in the empty sockets. Scrolling is reading the circuit; nothing needs a tap.
- **D is also the cheapest and the lightest page:** one picture per breakpoint, $0.24.
- **B is the most legible single panel** (the plate's "69%" is the biggest, clearest number), and the host gives the chapter a voice with a face.
- **Separable parts:** the pool (rim, plate, gauge, board), the voice (caption, host, leader-speaks) and the Season 2 panel can be swapped between takes.

## How each could fail
- **A:** at phone size the rim engraving is about 13px of curved capitals. It reads, but "of $EZ creator fees" curves, which is slower to read than a flat line. The fork caption sits over dark board only because the panel starts left of the lamp; on a narrower crop it would touch the lamp.
- **B:**
  - The host is a fourth face in the chapter (lesson 89, ration the cast) and the only character on the Overview since he left the first screen.
  - His ticket head lost most of its green and red stripes in the noir repaint.
  - The plate says "of $EZ creator fees" but not "fill the pool". The pool under it says that, but the phrase is shorter than the brief's line.
- **C:**
  - The dial is small on a phone (about 50px radius); its 0/50/100 numbers are 7px.
  - "Today that's me" from a mark on a solder ball may read as odd. The name over the mark carries it, but a newcomer might not link the mark to the AI.
  - Its Season 2 line is the smallest lettering of all four (about 12px, slanted).
- **D:**
  - The board is a less dramatic picture than the vault or the plate. The fork and the sockets are small parts of one image, so the RIGHT/WRONG moment has less weight than A to C's own fork panel (lesson 49: the climax should land).
  - The first caption covers the short trace to the lamp (a trace, not the lamp).
  - On desktop the wide board's labels are 20 to 40 image px on a 1280 picture, readable but quiet.
- **All:**
  - The paintings are AI-drawn circuit boards, not a real NVIDIA layout.
  - The 2K files are Topaz upscales of 1K drafts (sharper edges, no new detail).
  - The leader name is read at load; if the leader changes, the balloon and caption follow, but C's name-over-mark spacing was only checked for Grok's length.
  - Safari was not checked (SMIL animateMotion, SVG filters on text).

## Checks run
- **Widths:** 320, 390 and 1280px for every take. Scroll width equals the viewport, there are no page or console errors, and nothing outside the viewport. The live chip keeps ticking under every take.
- **Rule 0:** no white or pale grounds (the balloons' cream is a comic device); no emoji (AI marks are the site's own on a cream disc; Grok is printed in ink because the page recolours `#111` to cream); no words over a logo, lamp, fuse or face; no all-over dot fill. One loop per panel at most (the fees), and nothing on tap.
- **Zoomed:** at 2x on the close-up row. Fixed on the way:
  - A's "69%" ran past the rim, so the engraving was moved to the rim's thick front.
  - D's desktop WRONG collided with the 69% line, so both were split into two lines.
  - D's closing caption was cut at the section's foot, so padding was added.
- **Gotcha:** the page's countdown script rewrites any element carrying `data-cd`, so the panels' crop attributes are `data-b3p` / `data-b3d`.

## Hedra jobs (all gpt-image-2 1K medium with the vault as style reference, then topaz-image-upscaler to 2K; each cost equals its estimate)
| Name | Model | Settings | Cost | Time | Result |
|---|---|---|---|---|---|
| pool-rim | gpt-image-2 | 1K medium 16:9, ref vault | $0.042 | 42 s | Round pool of gold coins with a wide blank brass rim, traces dripping in; the best engraving surface. A. |
| pool-plate | gpt-image-2 | 1K medium 16:9, ref vault | $0.042 | 42 s | Steel-lipped pool, a big blank riveted brass plate head-on, traces pouring from above. B. |
| pool-gauge | gpt-image-2 | 1K medium 16:9, ref vault | $0.042 | 43 s | Riveted tank, a gold window, a completely blank cream dial. C. |
| fork-ink | gpt-image-2 | 1K medium 16:9, ref vault | $0.042 | 42 s | Gold trace splits to a green lamp and a blown fuse, a blank enamel plate under each. A to C. |
| sockets-ink | gpt-image-2 | 1K medium 16:9, ref vault | $0.042 | 42 s | Three empty sockets receding in the rain. B. |
| chain-ink | gpt-image-2 | 1K medium 16:9, ref vault | $0.042 | 42 s | The lit chip in socket one, then three empty sockets; "the first of many" at a glance. A, C. |
| host-ink | gpt-image-2 | 1K medium 3:4, refs vault + `commissioner/02-presenter.png` | $0.062 | 50 s | The $EZ host in noir ink, pointing, empty dark top-left for the balloon; head stripes mostly lost. B. (First try failed on a 4:5 ratio the model refuses; not charged.) |
| board-tall | gpt-image-2 | 1K medium 9:16, ref vault | $0.042 | 49 s | One board top to bottom: traces into the pool, the junction, lamp and fuse, three sockets. D phone. |
| board-wide | gpt-image-2 | 1K medium 16:9, ref vault | $0.042 | 43 s | The same left to right. D desktop. |
| 9 × *-2k | topaz-image-upscaler | 2K | 9 × $0.08 | 17 s each | Same composition, crisper; the SVG stays in the 1K pixel space. |

Spent: **$1.11** of the $10 cap.
