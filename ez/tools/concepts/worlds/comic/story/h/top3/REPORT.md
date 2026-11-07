# Round H18 · top3: the top of X2+, take A redone

## The files
- **Boards:**
  - `ez/x2p-h18-top3-390.png`: today's live top, then take A redone on arrival (every frame off), then every frame on. Under them, a row with the five step-word letterings (the four frames each) and a row with the four film heads.
  - `ez/x2p-h18-top3-1280.png`: the same at 1280px (shown at half size).
- **Recording:** `ez/x2p-h18-top3-micro.mp4`, at 390px, in two parts:
  1. Self-reveal off: the frames sit off with their invitations running (the dies breathe, the plunger bobs, the cursor blinks, a glint crosses the gold). Then each frame is tapped in turn.
  2. Self-reveal on: a scroll stops on the frames, and each one lights itself after 3 s on screen.
- **How to run it:**
  1. Serve `ez/` on port 8953.
  2. `node run.js <out> now,LAoff,LAon,SAon,MAon,TAon,NAon,LBon,LCon,LDon 390,1280`. Each id is the lettering (L S M T N), then the film head (A B C D), then the state (off or on).
  3. `/usr/bin/python3 board.py <out> <width> <file>`
  4. Recording: `node rec.js <out.mp4> 390`.
- **The code:**
  - `_t3.js` and `_t3.css` are laid over the built `v46-live-x2plus.html`. X2+'s hero and its film-bill and live-strip section are hidden; everything below them is untouched.
  - Switches: `window.__T3L` picks the lettering, `__T3F` the film head, and `__T3auto=false` turns off the self-reveal.
  - `__t3.all('on'|'off')` sets every frame's state, for the screenshots.
- **The paintings:**
  - Reused from top1: the hero dies, the four-die CALL chip and the gold lid.
  - New, in `img/`: the bell, the ledger, a second ledger (not used) and the film's display.

## What changed from top1 take A, point by point (BRIEF-H Round H18)
1. **The headline is on top.** "Four AIs call earnings. / The market keeps score." sits above the picture, in the bet's lettering. Its foot bites into the painting's black void, so it still breaks the picture's edge.
2. **Every beat bleeds on phones.**
   - The hero, the frame grid and the film run edge to edge (they cancel the page's 16px sides), with no keyline inset.
   - The frames are parted only by a 4px gutter and a cream rule at their top and bottom.
   - From 1000px the top is centred at 1180px max, the four frames sit in one row, and the film display is 900px wide.
3. **The beat 1 chip shows the logos and names only.** Grok, Claude, GPT and Kimi, in P&L order but with no figures. The "Season 1 · 80 rounds graded" bar stays.
4. **"How a round works" takes the headline's lettering** (Bangers, ink stroke, stacked drop, tilt). The step words get one of five other letterings; see below.
5. **The steps are the mechanism.** BET is gone:
   - **CALL**: "Each AI submits its prediction before the earnings report."
   - **BELL**: "The closing bell decides who wins the round." The bell is a new painting: a brass bell on the board, wired to a readout. It replaces top1's piezo buzzer, which a newcomer would not read as a bell.
   - **LEDGER**: "Every round is written to the ledger." This is a new painting: a memory chip whose glass is ruled into rows like a ledger page, with a gold write head at the left.
     - The two rounds before the example (R38 Meta, R39 Texas Instruments) are already written in, dimmed.
     - The head writes the example's row: R40, TSLA, −3.08%, Grok.
     - The rows below stay blank, for the rounds to come.
     - The words never say blockchain or on-chain.
   - **#1**: "The ledger ranks the board." The gold lid is engraved with the leader, its season P&L and its W-L.
6. **Interaction: every frame starts off.**
   - **CALL:** the dies are dark and breathe one after another. A tap lights the four predictions die by die.
   - **BELL:** the bell's plunger bobs and the readout shows a blinking cursor. A tap presses the plunger, rings two rings out of the dome, shakes the board, and types the readout: "TESLA (TSLA)", −3.08%, then Grok's mark and "GROK WINS".
   - **LEDGER:** the write head pulses. A tap writes R40's row from left to right.
   - **#1:** a glint crosses the blank gold lid. A tap engraves the leader, and the chip tilts and catches the light.
   - **Self-reveal (default on):** a frame that stays at least 60% on screen for 3 s turns itself on. The recording shows both modes.
   - No word says "tap"; each frame carries `role=button` and `aria-pressed`, and Enter or Space work too. With reduced motion every frame is on from the start.
   - A tap on a frame that is already on replays its motion.
7. **The example round is chosen by a rule, not typed.** It is the newest graded Mag 7 round (RMETA `mag7`) where exactly two of four AIs got the direction and one AI won: today that is R40 Tesla.
   - Everything shown comes from ROUNDS: called 10/21, graded 10/22, GPT +1%, Kimi +2%, Claude −4.5%, Grok −3.1%, the market −3.08%, Grok the winner.
   - The leader, its P&L (+$148,480) and its W-L (45-27) come from `__x2pPnl().A`.
   - Each date in the captions comes from that round's `called` and `resolves` fields.
8. **Beat 3, the film.**
   - The film plays on the board's own display: a new painting of a screen set into a circuit board, the beat 1 chip's family. The video sits in the black glass with the painted glare over it, and the same play disc stays at 89%.
   - There is no bill, no "How it works" and no green and red bands.
   - Four heads, in the bet's lettering:
     - A "The explainer 1:20";
     - B "The 80-second version";
     - C "The whole game in 80 seconds";
     - D "Press play · EZ in 1:20".
   - The time is read from the video's own duration once it loads (1:20 as a fallback).
   - This is a mockup `<video>` with the same file and poster (`ez-landing-v4.mp4`, `-poster-ez.jpg`). It is not X2+'s own player, so the corner player and the sound button are not wired here.

## The five letterings for the step words
| | Lettering | Reads on a phone? |
|---|---|---|
| **L (my pick)** | LED dot matrix (Doto 900), amber, on a black glass strip in a gold bezel | Yes, clearly, at 40px |
| S | Silkscreen (Share Tech Mono), cream, on a scrap of green board with a gold pad | Yes |
| M | Stamped gold (Black Ops One), struck into a gold plate | Yes |
| T | Gold traces (Monoton) | **Weak.** "#1" and "LEDGER" break up into lines at phone size. This one fails. |
| N | Neon (Tilt Neon), green tubes, red on BELL and #1 | Yes, though the glow is soft on the dark page |

## My picks
- **The lettering: L, the LED dot matrix.** It is the season bar's own material (amber light behind black glass), so the four words and beat 1 read as one board. It is also the furthest from Bangers, so "How a round works" stays the only loud lettering in the beat (lesson 71).
  - M is the runner-up; its gold plates repeat the gold of the #1 lid.
- **The film head: A, "The explainer 1:20".** It says what you will watch and how long it takes, in the fewest words.
  - B is a good second.
  - D, "Press play", is an instruction, not a name.
- **Self-reveal on.** Someone who only scrolls still gets every fact, and the off state still gives a reason to tap first.

## How each part could fail
- **The interaction in general:**
  - The off state hides the facts. With the self-reveal off, a visitor who scrolls past without tapping sees four empty objects. So keep the self-reveal on.
  - With the self-reveal on, a fast scroller who never stops for 3 s on a frame still sees nothing there.
- **The text is still small:**
  - The bell's readout text is about 7 to 8px at 390. Its glass is a slanted portrait window, so the text runs across its short side.
  - The ledger's row text is about 10px.
  - The CALL dies' figures are about 9px.
  - All three read on a real phone held close, but they are the weakest part of the beat.
- **The ledger:**
  - The ledger chip is cropped on its right in its frame on purpose (the rows run on off the frame, like a page that keeps going), so the frame shows only part of the chip.
  - The painted write head sits on the third row, so the example is always written on row 3, with the two previous rounds above it. If a future example has no two graded rounds before it, those rows stay blank.
  - "Ledger" may still suggest a blockchain to a crypto audience, even though the copy never says it. The lead is flagging this to the owner.
- **Which leader:** the #1 frame shows today's leader (Grok), not the leader after R40. It follows the line "The ledger ranks the board". If a reader expects the board as it stood after R40, it reads as a jump.
- **The rule for the example:** if a newer Mag 7 round splits two and two with one winner, it replaces R40 automatically.
- **At 320px:** the headline takes three lines and the LED word "LEDGER" fills its column. Nothing clips (checked), but it is tight.
- **Desktop:** the hero painting is a black rectangle on the page's navy, so its edge shows as a box at 1280. Softening that edge is still to do.
- **The film display:** its glass is 1.62:1 and the film is 16:9, so the film shows with thin black bands in the black glass. They are invisible on the glass, but the picture is a little smaller than today's film on a phone (about 351px wide, against 358px).
- **Not checked:** Safari (`matrix3d` on SVG text, `mix-blend-mode`, `clip-path` animations).

## Checks run
- **Widths:** 320, 390 and 1280px.
  - No sideways scroll: scroll width equals the viewport every time.
  - No page or console errors.
  - No headline, step word, line or caption past the screen's edge, and none overflowing its box.
  - The script reports the three ledger rows as running past their frame. That is the intended crop, and their visible text is inside the frame (checked by eye).
- **Data:** every number on the boards matches the sheet: R40 Tesla, its calls and its move, Grok as the winner, R38 Meta −6.98% (Claude) and R39 TXN −1.81% (Grok), the leader Grok at +$148,480 and 45-27, and 80 rounds graded.
- **Zoom:** every frame zoomed at 2x.
  - Fixed on the way: an argument slip that left the ledger frame blank; the bell crop, tightened so its readout text grew about 18%; the ledger's text, moved off the write head; and the close-ups, which had lost their left 16px to the bleed.
- **Rule 0:**
  - no white or pale grounds;
  - no native emoji;
  - no text over a logo or the subject (the readout, the dies, the ledger glass and the lid are the painting's own blank surfaces);
  - no dot-filled module;
  - one loud lettering per beat.

## Cost (Hedra)
| Job | Model | Settings | Cost | Time | Result |
|---|---|---|---|---|---|
| t3-bell | gpt-image-2 | 1K medium 1:1, ref chip | $0.066 | 49 s | brass bell on a board, a blank slanted readout; reads as a bell at once |
| t3-ledger | gpt-image-2 | 1K medium 1:1, ref chip | $0.066 | 49 s | memory chip, the glass ruled into five rows, a gold write head; used |
| t3-ledger-b | gpt-image-2 | 1K medium 1:1, ref chip | $0.066 | 49 s | a stack of memory modules like drawers; not used (the rows are too slanted for text) |
| t3-screen-t | gpt-image-2 | 1K medium 4:3, ref chip | $0.049 | 42 s | a display set into the board, straight on; used for the film at both widths |
| t3-screen-w | gpt-image-2 | 1K medium 16:9, ref chip | $0.042 | 42 s | a wide display, its glass 2.4:1, too wide for the film; not used |

**Total: $0.29 of the $8 cap.** The log is in `log.jsonl` and the jobs in `jobs1.json`. Every prompt asked for no text, letters, numbers, logos or symbols, and none came back with any.
