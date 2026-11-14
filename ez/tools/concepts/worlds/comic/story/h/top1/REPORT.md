# Round H15 · top1: the top of X2+ in the NVIDIA chip's art style, worlds (a) and (b)

## The files
- **Boards:**
  - `ez/x2p-h15-top1-390.png`: today's live top, then A, B and B2, with a close-up row of the eight frames at 2x.
  - `ez/x2p-h15-top1-1280.png`: the same at 1280px.
- **Recording:** `ez/x2p-h15-top1-micro.mp4`, 26 s at 390px.
  - Take A, then take B.
  - Each part scrolls to the four frames, where the bell's one-time cue plays. Then each frame is tapped in turn.
- **How to run it:**
  1. Serve `ez/` on port 8951.
  2. `node run.js <out> now,A,B,B2 320,390,1280`
  3. `/usr/bin/python3 board.py <out> <width> <file>`
  4. Recording: `node rec.js <out.mp4> 390`.
- **The code:**
  - `_t.js` and `_t.css` are laid over the built `v46-live-x2plus.html`.
  - X2+'s hero and its film-bill and live-strip section are hidden. The film element itself (`.x2p-vt`) moves into beat 3.
  - Everything below the top is untouched.
  - `window.__T1` picks the take: `A`, `B` or `B2`.

## What I made
Every take has the same three beats from the brief. Nothing outside them was added (lesson 109).

1. **Beat 1, the headline panel.** One painting in the chip's style, lettered in the bet's own lettering:
   - Bangers;
   - an ink stroke and a stacked gold, red and ink drop;
   - tilted -2.2°.

   The headline breaks the panel's bottom border, as "Bet #1: NVIDIA" breaks the vault's. Line 1 is gold; line 2 is cream with a green drop.
2. **The gutter.** Then **beat 2, "How a round works"**:
   - A comic caption box (cream lettering on black, cream keyline) sits on the top-left corner of one four-frame panel.
   - The frames are two per row on phones and four per row from 900px.
   - Each frame has a narration caption on its top-left corner, a painting, a big lettered word that breaks the frame's bottom border, and the brief's line under it.
3. **Beat 3, the film.** Lettered "Watch it all 1:20" in the same lettering, over today's film bill and the explainer (`ez-landing-v4`, the end-card poster). The bill keeps "How it works", so the lettered head avoids those words.

**Take A, the chip's own world.**
- **Beat 1:** a circuit board with four processor dies, one per AI in P&L order. Each die shows the AI's mark, name and season P&L, lit on the glass. Their traces converge into one LED score bar: "Season 1 · 80 rounds graded".
- **CALL:** a chip with four small dies, one call lit on each (▲2.5% and so on).
- **BELL:** a piezo buzzer, the chip's bell. Its readout shows "Exxon Mobil (XOM)" and "+2.17%".
- **#1:** a chip with a solid gold lid, engraved with the leader's mark, name, P&L and W-L.
- **BET:** the bet section's own NVIDIA chip (`media/bet-chip-h2.jpg`), its four dies spelling N V D A. Beat 1's dies and this frame's dies are the same object family, so the top hands over to the bet chapter.

**Take B, the trading floor at the bell, as objects.**
- **Beat 1:** the exchange's big board, wood and brass with lamps. Its four slate rows rank the AIs by P&L: rank, mark, name, W-L, P&L. On desktop the brass plaque reads "Season 1 · 80 rounds".
- **CALL:** four order slips on a brass spike. The front slip is headed "Order · XOM · before the report" and lists the four calls in pen.
- **BELL:** the brass closing bell. Its waist band is engraved with the company and the move.
- **#1:** the golden ticket. Its face is engraved with the leader.
- **BET:** a brass ticker under a glass dome, its tape printed "Bet #1 / NVDA".

**Take B2:** B with the alternative headline, "4 AIs. / Every earnings report. / One scoreboard." It reads best over B's board, because the board *is* the scoreboard.

**Live data** (nothing typed; checked against today's numbers):
- **The example round** is the newest graded one: R80 Exxon Mobil (XOM), +2.17%, the calls GPT ▲2.5, Kimi ▲1.5, Claude ▼1, Grok ▼1.3. It comes from `ROUNDS`, by the newest entry with a result.
- **Ranks, P&L and W-L** come from `__x2pPnl().A`: P&L = balance − $100,000, ranked by P&L. Today Grok +$148,480 (45-27), Claude +$102,950, GPT −$56,930, Kimi −$70,650.
- **The marks** come from `MODELS[m].d`.
- **The rounds-graded count** is the length of the graded `ROUNDS`.

## The surface under every live text
Each surface is an SVG in its own box. It is mapped onto the four painted corners of a blank surface with one `matrix3d`. The quads were measured on the paintings (`quads.py` finds the dark glass and slate; the gold and paper ones I measured by eye on gridded crops), so every word sits in the surface's perspective. I checked that no surface leaves its frame (`outSurf: 0` at 320, 390 and 1280).

| Text | Surface | Material treatment |
|---|---|---|
| A: the four AIs | four blank black glass die windows | lit: a faint cream and amber glow |
| A: Season 1 · n rounds graded | the blank glass bar | amber LED glow |
| A: the four calls | the four small dies | lit, ▲ green / ▼ red with its own glow |
| A: company + move | the buzzer's blank readout | lit |
| A, B: the leader | the gold lid / the golden ticket's face | dark ink multiplied into the gold, a pale lip under it and a dark wall over it (engraved) |
| A: N V D A | the NVIDIA chip's four dies | gold glow |
| B: the four rows | the four blank slate rows | chalk-cream |
| B: Season 1 plaque (desktop) | the board's blank brass plaque | engraved |
| B: the calls | the front order slip | pen ink, multiplied |
| B: company + move | the bell's blank waist band | engraved |
| B: Bet #1 / NVDA | the ticker tape | ink, multiplied |

**In caption boxes** (comic captions drawn on the panel's corner, cream on black):
- "How a round works";
- each frame's narration: "R80 · Exxon Mobil (XOM)", "At the close", "Top of the board", "Bet #1".

**Outside the paintings:**
- the headline;
- the four big words;
- the four short lines, set under the frames as the brief asks;
- the film's head.

## Micro-interactions
Each motion plays on hover, on keyboard focus or on a tap, and runs once. Nothing has to be tapped to be read (lesson 103). Each frame also lifts 2px on hover, which shows it is touchable (lesson 86). The only motion that plays by itself: the first time the four frames come on screen, the bell (or the buzzer) goes once, 0.7 s later. None of it plays with reduced motion.

| Frame | A (chip) | B (floor) |
|---|---|---|
| CALL | the four dies light up one after another (the calls going in) | the slips flutter on the spike |
| BELL | the buzzer judders, two gold sound rings run out of it, the readout flashes | the bell swings from its bracket (damped, 1.5 s) |
| #1 | the chip tilts in 3D and a sheen crosses the gold lid only | the ticket tilts and catches a sheen across its face |
| BET | the dies flare N, V, D, A in turn | the ticker clacks and "Bet #1 / NVDA" types onto the tape |

The recording shows these, with the cue as the frames scroll in.

## My pick: B, the trading floor
- **The board reads at first glance.** Four rows, four AIs, ranked, with W-L and P&L. That *is* "The market keeps score": the headline and the picture say the same thing, with no legend.
- **The frames are everyday objects.** A bell, a golden ticket and order slips are known to everyone. A piezo buzzer standing for the bell, or a gold-lidded chip standing for the ticket, have to be decoded. The bell's swing is also the most legible motion of the eight.
- **The text is bigger.** Its surfaces are larger on a phone. A's dies hold about 35px of text each at 390px, and their P&L line is about 6px.
- **Where A is stronger:** it is one world with the bet chapter (lesson 108). Its BET frame *is* the bet's chip, so the top hands over to "Bet #1: NVIDIA" more tightly than B's ticker does.
- **A mix is easy, because the parts are separable:**
  - B's board as beat 1;
  - B's call, bell and ticket frames;
  - A's NVIDIA-chip frame as BET.
- **Headline:** keep "Four AIs call earnings. The market keeps score." B2 works too, but three lines make the first screen taller (B2's film starts 30px lower at 390).

## How each take could fail
- **All takes:**
  - The paintings are model-drawn objects (gpt-image-2 with the chip as the style reference), not real hardware or a real exchange.
  - The hero paintings are Topaz 2K upscales of 1K drafts: sharper edges, no new detail.
  - The four frames are 1K at 2x on a phone (about 1.6 px of image per screen px in the zoomed crops). They are fine on a phone, slightly soft at 1280.
  - The four short lines under the frames are page text, not on a surface. The brief asks for them there, but by lesson 104 they are the most "pasted" words left.
  - The first screen at 390x844 shows beat 1 and the "How a round works" caption, but not the frames. Desktop shows beat 1 and the top of beat 2.
  - At 320px the CALL caption "R80 · Exxon Mobil (XOM)" is clipped at the frame's edge. It would need a shorter form there.
  - Safari was not checked (`matrix3d` on SVG text, `mix-blend-mode`, filters on SVG text).
  - The example round is always the newest graded one. A round where nobody was right, or with fewer than four calls, has not been laid out yet. Four dies or slips with three calls would leave one blank die.
  - "Bet #1" sits in the BET frame's caption and again in its line, so the words say it twice.
- **A:**
  - The dies' text is tiny on a phone.
  - The buzzer and the gold-lidded chip are metaphors a newcomer may not decode as "bell" and "golden ticket"; only the big words carry them.
  - The hero shows two numbers per die (name and P&L), which repeats the standings directly below.
- **B:**
  - The hero board duplicates the standings section right under the top (same four rows, same P&L). Either the top takes the job of the standings, or the board in beat 1 should show less (names only).
  - The slips' calls are about 9px on a phone.
  - The desktop plaque's engraving is low contrast.
  - The order slips are cream paper inside the frame. Paper is a material here, but it is the palest surface on the top.
- **B2:** three lines of headline. On desktop it still breaks the panel's border but runs further into the gutter.

## Checks run
- **Widths:** 320, 390 and 1280px for every take. No sideways scroll (scroll width = viewport), no page or console errors, no surface outside its frame.
- **Zoom:** every frame zoomed at 2x (the close-up row). Fixes made on the way:
  - Surfaces shifted when a crop was added: a collapsed negative margin. Paintings are now absolutely placed.
  - The LED bar's and the slate rows' text overflowed, so each surface's text is fitted to its width.
  - The gold-lid quad was re-measured.
  - The captions overlapped the first frame's die and slip, so the crops were moved down.
- **Rule 0:**
  - no white or pale module grounds;
  - no native emoji;
  - no text over a logo, a face or the subject;
  - no dot fill;
  - one cue per view.

## Cost (Hedra)
| Job | Model | Settings | Cost | Time | Result |
|---|---|---|---|---|---|
| a-hero-w | gpt-image-2 | 1K medium 16:9, ref chip | $0.042 | 62 s | board, four blank dies, one blank bar; clean |
| a-hero-t | gpt-image-2 | 1K medium 3:4, ref chip | $0.049 | 72 s | the same, dies 2x2; the best of A |
| a-call | gpt-image-2 | 1K medium 1:1, ref chip | $0.066 | 72 s | chip with four small blank dies |
| a-bell | gpt-image-2 | 1K medium 1:1, ref chip | $0.066 | 55 s | buzzer, blank readout, sound rings painted in |
| a-one | gpt-image-2 | 1K medium 1:1, ref chip | $0.066 | 64 s | gold-lidded chip, lid blank |
| b-hero-w | gpt-image-2 | 1K medium 16:9, ref chip | $0.042 | 65 s | big board, four blank slate rows, blank plaque |
| b-hero-t | gpt-image-2 | 1K medium 3:4, ref chip | $0.049 | 48 s | the same, tall; rows 1 and 2 painted as one panel with a rail (split in the quads) |
| b-call | gpt-image-2 | 1K medium 1:1, ref chip | $0.066 | 58 s | four blank slips on a spike |
| b-bell | gpt-image-2 | 1K medium 1:1, ref chip | $0.066 | 58 s | brass bell from a bracket, plain band; the best single object |
| b-one | gpt-image-2 | 1K medium 1:1, ref chip | $0.066 | 48 s | gold ticket, blank face, perforated stub |
| b-bet | gpt-image-2 | 1K medium 1:1, ref chip | $0.066 | 49 s | ticker under a dome, blank tape |
| 4 × hero-2k | topaz-image-upscaler | 2K | 4 × $0.08 | 16 to 19 s | the four heroes for desktop and 2x |

**Total: $0.96 of the $10 cap.** Each charge equalled its estimate; the log is in `log.jsonl` and the jobs in `jobs1.json` and `jobs2.json`.

Every prompt asked for: the chip reference's style, the object alone on a black void, a warm gold key light from behind, a green rim on the left and red on the right, and no text, letters, numbers, logos or symbols. None came back with text.
