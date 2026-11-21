# Round H19 · top4: the top of X2+, from H18 top3's take A

## The files
- **Boards:**
  - `ez/x2p-h19-top4-390.png`: today's live top, then top4 on arrival (every frame off) and with every frame on. Under them:
    - the step-word ink (cream, green, gold);
    - the wording, (b) BOARD against (a) #1;
    - the order, ledger then board against board then ledger;
    - the film head;
    - close-ups of the four frames at 2x.
  - `ez/x2p-h19-top4-1280.png`: the same at 1280px (shown at half size).
- **Recording:** `ez/x2p-h19-top4-micro.mp4`, at 390px, in two parts:
  1. Self-reveal off: the frames sit off with their invitations running, then each frame is tapped in turn.
  2. Self-reveal on: a scroll stops on the frames, and each one lights itself after 3 s on screen.
- **How to run it:**
  1. Serve `ez/` on port 8953: `cd ez && python3 -m http.server 8953`.
  2. `node run.js <out> now,bc1off,bc1on,bg1on,bo1on,ac1on,bc2on 390,1280`. Each id is:
     - the word set: `b` CALL / CLOSE / LEDGER / BOARD, `a` CALL / CLOSE / LEDGER / #1;
     - the ink: `c` cream, `g` green, `o` gold;
     - the order: `1` ledger then board, `2` board then ledger;
     - the state: `off` or `on`.
  3. `/usr/bin/python3 board.py <out> <width> <file>`.
  4. Recording: `node rec.js <out.mp4> 390`.
- **The code:** `_t4.js` and `_t4.css` are laid over the built `v46-live-x2plus.html`, as top3's were. X2+'s hero and its film-bill and live-strip section are hidden; everything below is untouched.
  - Switches: `window.__T4W` ('a' or 'b'), `__T4C` ('cream', 'green' or 'gold'), `__T4O` (1 or 2), and `__T4auto=false` to turn off the self-reveal.
  - `__t4.all('on'|'off')` sets every frame's state, for the screenshots.
- **The paintings:** four new ones in `img/` (the chip's style, each with a bare strip of board left blank for the step word):
  - `t4-call.jpg`, the four-die chip;
  - `t4-buzz-b.jpg`, the piezo buzzer and its readout;
  - `t4-ledger-d.jpg`, the ledger chip with five ruled rows;
  - `t4-one-b.jpg`, the gold-lidded chip.
  - The hero chip is top1's; the film's display is top3's.

## What changed from top3, point by point (BRIEF-H Round H19)
1. **Both headline lines are one size.** "The market keeps score." is no longer set smaller.
   - Both lines must stay on one line each, so a small fitter sets the size: the largest at which the longer line fits the column.
   - Measured: 31.8px at 390 (top3's first line was 33.5px), 25.1px at 320, 69.1px at 1280.
2. **"How a round works" is at the headline's size** (the same measured size at every width), with the same lettering.
   - It **breaks the CALL frame's top edge.** Its foot hangs about half its height into the first row of frames (22px at 390, 17px at 320; less on desktop, about a third, so it doesn't cover the frames' art).
   - The caption of each frame it crosses moves down under it. The fitter measures which frames that is: CALL and CLOSE on a phone, CALL and part of CLOSE on desktop.
3. **No bell. The close is a piezo buzzer on the board**, wired to a landscape readout.
   - The readout types "TESLA (TSLA)", −3.08% and "GROK WINS" with Grok's mark.
   - Off, the buzzer trembles every 2.6 s and a cursor blinks in the readout. On a tap it buzzes (a fast shake), two sound rings run out of it, and the painted rings fade in. A black veil holds them back while the frame is off.
   - The line under it stays as the brief has it: "The closing bell decides who wins the round." That is the market's bell, not an object on the board.
4. **The step words are in the headline's Bangers, silkscreened onto the board itself.**
   - Each painting was made with a bare strip of solder mask along its front edge. The word is SVG text mapped onto that strip with one `matrix3d`, so it lies in the board's perspective.
   - The ink has a slight spread (a displacement) and grain where the screen missed (a noise mask), with a hairline shadow for the raised ink. There is no stroke, drop or tilt, so it doesn't read as a sticker.
   - **Size:** the geometric mean of the headline's and the line's sizes. That gives 19.5px at 390 (headline 31.8, line 12), 17.5px at 320, and 32px at 1280 (headline 69.1, line 15).
   - **Ink:**
     - cream (#efe6cc, classic PCB silkscreen), my pick;
     - green (#5ef08f): weak on a green board, legible only because it's lighter;
     - gold: plated lettering like the board's pads (ENIG), a vertical gold gradient.
   - **Wording:** both sets are built. (b) CALL / CLOSE / LEDGER / BOARD is the default; (a) uses #1.
5. **Order:** both are built.
   - Order 1 is CALL, CLOSE, LEDGER, BOARD, with "The ledger ranks the board."
   - In order 2 (CALL, CLOSE, BOARD, LEDGER), BOARD's line would mention a ledger the reader hasn't met yet. So I changed it to **"The close ranks the board."**: my wording, flagged.
6. **The ledger:** a new painting, the glass ruled into five rows.
   - Row 1 is the header: Round · Company · Move · Winner, in small gold capitals.
   - Rows 2 and 3 are R38 Meta and R39 Texas Instruments, dimmed. They are the two graded rounds before the example, read from ROUNDS.
   - Row 4 is R40 Tesla, written by the head on a tap. Row 5 stays blank for the next round.
   - The Company column shows the name, not the ticker (the header says Company). Long names step down: TEXAS INSTRUMENTS is smaller than META.
7. **The film head:** "The whole game 1:20". The time is read from the film's own duration once it loads.
- **Everything else is top3's take A:** the hero chip with the four AIs (logo and name only) and the season bar, the tap-to-reveal, the 3 s self-reveal, the example rule (today R40 Tesla), and the leader engraved on the gold lid.

## My pick
**b, cream, order 1.**
- **Cream:** it is what a real board's silkscreen looks like, so it reads as part of the board. It also differs from the headline's gold and cream-on-green drop.
- **Gold:** it is close to the headline's gold, which the brief asked to avoid.
- **Green:** it is the weakest.
- **Order 1:** it keeps the owner's line "The ledger ranks the board" in the right order.

## How each option could fail
- **The silkscreen words are smaller than top3's step words** (19.5px against 40px at 390), on purpose, since the brief set them between the headline and the line.
  - On a phone they are now quieter than the frame's subject. A reader skimming may take the captions (R40 · Tesla...) as the frame's title.
  - If the owner wants the words to lead, the size rule can lean towards the headline. The upper end is about 26px at 390 before the words crowd the strip.
- **Green ink** is green on green: about 2:1 against the board's mid-green. It is legible only because it's bright, and it may wash out on a dim phone.
- **Gold ink** echoes the headline's gold, which the brief asked to avoid.
- **The piezo buzzer still needs decoding:** a black cylinder on a board is not a bell to most people. "CLOSE" and the readout carry the meaning. The painted sound rings help only once it's on.
- **The ledger's write head is painted between rows 4 and 5,** not squarely on row 4: four tries put it on a ruled line every time.
  - When R40 is written, the head's glow sits half on the blank row 5.
  - A future painting could fix it, or the head could be cut out and moved.
- **The ledger's text is small:** about 9.5px for the rows and 7px for the header at 390. It reads held close; the header is the weakest. TEXAS INSTRUMENTS steps down to fit its column.
- **Order 2's line** ("The close ranks the board.") is my wording, not the owner's. Strictly, the ledger ranks the board (P&L comes from every graded round), so order 2 tells it less exactly.
- **The heading over the frames:**
  - At 1280 it covers the top of CALL and part of CLOSE. Their captions move down, but they still sit over the top of the art (empty void and rays only, checked).
  - At 320 the CALL caption ends just above the dies.
- **The fitter makes the headline a touch smaller** than top3's first line at 390 (31.8px against 33.5px), because "The market keeps score." is the longer line.
- **Which leader:** as in top3, the gold lid shows today's leader (Grok), not the board after R40.
- **Not checked:** Safari (`matrix3d` on SVG text, SVG filters inside a 3D-transformed element, `clip-path` animations).

## Checks run
- **Widths:** 320, 390 and 1280px, all seven variants (the `run.js` output is in `checks.txt`):
  - no sideways scroll (scroll width equals the viewport);
  - no page or console errors;
  - no headline, line or caption past the screen's edge or overflowing its box;
  - no live surface outside its painting.
- **Sizes (measured, computed font sizes):**

  | Width | Headline line 1 | Headline line 2 | "How a round works" | Step words | Lines |
  |---|---|---|---|---|---|
  | 390 | 31.8 | 31.8 | 31.8 | 19.5 | 12 |
  | 320 | 25.1 | 25.1 | 25.1 | 17.5 | 12 |
  | 1280 | 69.1 | 69.1 | 69.1 | 32 | 15 |

- **Data:** every number comes from ROUNDS, RMETA and `__x2pPnl`, read by the script (`__t4.data`), and matches the sheet:
  - R40 Tesla, called 10/21 and graded 10/22: GPT +1, Kimi +2, Claude −4.5, Grok −3.1; market −3.08%; Grok wins.
  - R38 Meta −6.98% (Claude) and R39 Texas Instruments −1.81% (Grok).
  - The leader Grok, +$148,480, 45-27; 80 rounds graded.
- **Rule 0:**
  - no white or pale grounds;
  - no emoji;
  - no text over a logo or the subject (the words sit on the bare strip; the numbers on the dies, the readout, the ledger glass and the lid);
  - one loud lettering per beat;
  - no dot-filled module.

## Cost (Hedra)
| Job | Model | Settings | Cost | Time | Result |
|---|---|---|---|---|---|
| t4-call | gpt-image-2 | 1K medium 1:1, refs chip + top1 a-call | $0.078 | 80 s | four dies, a clean bare strip at the front; **used** |
| t4-call-b | gpt-image-2 | same | $0.078 | 79 s | the same with smaller dies; not used |
| t4-buzz | gpt-image-2 | refs chip + top1 a-bell | $0.079 | 74 s | buzzer and a wide readout; the strip is less distinct; not used |
| t4-buzz-b | gpt-image-2 | same | $0.079 | 75 s | buzzer, a wide gold-bezelled readout, a clear strip; **used** |
| t4-ledger | gpt-image-2 | refs chip + top3 t3-ledger | $0.078 | 68 s | five rows, the head on the line between rows 3 and 4; not used |
| t4-ledger-b | gpt-image-2 | same | $0.078 | 68 s | the head on row 3; not used |
| t4-ledger-c | gpt-image-2 | refs chip + t4-ledger, "head beside the fourth row" | $0.079 | 50 s | the head on the line between rows 4 and 5; not used |
| t4-ledger-d | gpt-image-2 | same | $0.079 | 50 s | the same, straighter rows; **used** |
| t4-one | gpt-image-2 | refs chip + top1 a-one | $0.078 | 68 s | gold lid and a strip; not used |
| t4-one-b | gpt-image-2 | same | $0.078 | 62 s | gold lid and a cleaner strip; **used** |

**Total: $0.78 of the $6 cap.** The log is in `log.jsonl` and the jobs in `jobs1.json` and `jobs2.json`. Every prompt asked for no text, letters, numbers, logos, symbols or silkscreen markings, and none came back with any.
