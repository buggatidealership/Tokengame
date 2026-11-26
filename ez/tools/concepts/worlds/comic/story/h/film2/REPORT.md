# H24 `film2`: the explainer beat in the chip world

Round H24, task `film` (BRIEF-H.md). Today's beat is "THE WHOLE GAME 1:20": a flat head, then the film on a painted board screen (`media/top-t3-screen-h22.jpg`).

## What was wrong with today's beat (measured)
- **Resolution (test 1):** the screen painting is 1024 px wide. A phone shows 878 px of it across 390 CSS px, and it needs 1170. It fails.
- **Dead space:** the glass is 4:3 and the film is 16:9, so black bands cover 9% of the glass.
- **Pasted on:** "1:20" is flat cream text in the head. The play control is a CSS gold disc floating over the picture.
- **Order:** the beat sits between frame 4 (BOARD) and Meet the models. The `board5` addendum makes BOARD "the doorway to Meet the models", and a film between them breaks that doorway. That is the main argument for moving it (see the pick).

## The takes
Every take uses the same parts:
- the film plays inside a painted 16:9 glass, contained, whole;
- the glass's own painted reflection is cut from the painting and screen-blended over the picture (as quad4 does);
- the running time is lit in a painted LED window with the NVIDIA timer's recipe (Anton, gold gradient, glow, scanlines, the window's own glare over it). It counts down while the film plays and blinks while it loads;
- the play control is the painted gold dome key. Its ▶ / ❚❚ mark is etched into the metal (multiplied, with a pale lip under it). It breathes softly only while it waits to be pressed, and goes still while the film plays;
- a tap on the glass does the same as the key.

There are no native controls and nothing is baked into the art. Each painting is gpt-image-2, 4K (3840 × 2160), high quality, with the bet chip and the hero chip as style references.

| Take | Head | Surface | Place | Painting |
|---|---|---|---|---|
| **A** | Roll the tape | the die display: one big GPU package seen head-on; its main die *is* the screen; the LED window and the gold key sit on the substrate below | after "How a round works" (today) | `img/t1b.jpg` |
| **B** | Start here | the fifth die: the same package, with four small dies along its top lit with the four AIs' marks in rank order (the leader brightest), traces running from them into the film's die | right after the hero, before "How a round works" | `img/t2e.jpg` (an edit of t1b, so the screen geometry is identical) |
| **C** | Now showing | the drive-in: a screen standing upright out of a city of chips, golden god rays behind it, the LED and the key on its stand | right after the hero | `img/t3e.jpg` (an edit of t3d that made the glass taller) |
| **D** | Model picking | the old-school terminal: a 1980s trading CRT rebuilt as a circuit board ("they used to call it stock picking") | after the frames | `img/t4a.jpg` |

Boards:
- `ez/x2p-h24-film-390.png`: today, then each take's beat at 390;
- `ez/x2p-h24-film-1280.png`;
- `ez/x2p-h24-film-flow-390.png`: the whole top with the film in its place (today, B, C);
- `ez/x2p-h24-film-closeup.png`: the LED and key at 3x;
- `ez/x2p-h24-film-play.mp4`: take C, idle, then a tap on the key, the film starting and the LED counting down.

## The twelve design questions (skill lesson 122), one line each
1. **Hierarchy:** the film is the one thing here, so it takes about 87% of the frame's width at 390. The running time is the second thing, lit and big in the timer's style. The head is narration, the same size as "How a round works".
2. **Sequence:** before: "Four AIs call earnings. The market keeps score." (the claim). After: "How a round works" (one round), then the board, then Meet the models. So the film is the whole game first, then one round, then the field, then the faces. Placing it after BOARD (A, D, today) cuts the board → models doorway.
3. **Words:** each head is two words in the reader's language, front-loaded, and none says "film" or "explainer". "Now showing" (C) is cinema's own label. "Start here" (B) is an instruction. "Roll the tape" (A) is broadcast and trading slang. "Model picking" (D) echoes the motto. The running time moved out of the head onto the hardware, so "1:20" is said once.
4. **Motion:** two things move:
   - the key breathes while it waits (an invitation), then stops;
   - the LED counts down while the film plays (a state).
   The bezel glows only while the film plays. Nothing else moves.
5. **Interaction:** the key looks pressable (a dome in a ring) and is a `<button>` that reads "Play the explainer, 1 minute 20", then "Pause the explainer". The glass also answers a tap. Both play with sound. A second tap pauses, and the LED keeps the time left.
6. **Return:** the film doesn't change, so it is not a reason to come back. The page's return is the round data above and below it. The LED never shows a fake "live" state.
7. **Trust:** the film makes claims ("69% of the fees..."). This beat doesn't verify them, and the record below does. No new claim is added here.
8. **Share:** a screenshot shows the film's poster (the $EZ ticket, "nobody said it would be easy") on a lit chip under "Now showing". The poster is whole and readable.
9. **Edge states:**
   - the file fails to load: the LED blinks, the key stays a play key, and a tap retries;
   - the film ends: it goes back to the poster and 1:20;
   - a slow network: preload is metadata only;
   - reduced motion: the key doesn't breathe and the LED doesn't blink; play still works because the visitor asks for it.
10. **Data honesty:** B lights the four AIs in rank order from `__x2pPnl`, so no rank is typed. Nothing else in the beat is data.
11. **Reach:**
    - legible from 320 (the LED cap height is measured below);
    - the key is at least 44 px on phones;
    - screen readers get the button names. The decorative paintings are `alt=""`, and the poster is the video's own;
    - one 1400 px JPEG at 207 to 260 KB on phones.
12. **Feeling:** suspense comes from the dark glass with the poster and the breathing key. The reveal is the tap: the bezel lights, the LED starts counting, and the sound comes on. The payoff is the film itself. C adds a hero moment: the screen rises over a city of chips like a premiere.

## Tests (H23 1 to 6), measured on the built X2+ page
Phone 390 at DPR 2 (run.js, `out/measure.json`), desktop 1280:

| Take | Width | Frame (CSS px) | Painting px shown / needed at 3x | Test 1 | Film (CSS px) | Film share of frame | LED cap (px) | Sideways scroll | Errors |
|---|---|---|---|---|---|---|---|---|---|
| now | 390 | 390 × 264 | 878 / 1170 | fail | 351 × 197 | 0.67 | – | none | 0 |
| A | 390 | 390 × 321 | 1920 / 1170 | pass | 340 × 191 | 0.52 | 25.9 | none | 0 |
| B | 390 | 390 × 372 | 1920 / 1170 | pass | 336 × 189 | 0.44 | 25.9 | none | 0 |
| C | 390 | 390 × 292 | 2194 / 1170 | pass | 347 × 195 | 0.59 | 12.2 | none | 0 |
| D | 390 | 390 × 310 | 1673 / 1170 | pass | 338 × 190 | 0.53 | 21.7 | none | 0 |
| A | 320 | 320 × 263 | 1920 / 960 | pass | 279 × 157 | 0.52 | 21.2 | none | 0 |
| B | 320 | 320 × 305 | 1920 / 960 | pass | 276 × 155 | 0.44 | 21.2 | none | 0 |
| C | 320 | 320 × 239 | 2194 / 960 | pass | 284 × 160 | 0.59 | 10 | none | 0 |
| D | 320 | 320 × 254 | 1673 / 960 | pass | 277 × 156 | 0.53 | 17.8 | none | 0 |
| now | 1280 | 900 × 609 | 878 / 2700 | fail | 810 × 456 | 0.67 | – | none | 0 |
| A | 1280 | 960 × 790 | 1920 / 2880 | fail | 836 × 470 | 0.52 | 63.7 | none | 0 |
| B | 1280 | 960 × 915 | 1920 / 2880 | fail | 828 × 466 | 0.44 | 63.7 | none | 0 |
| C | 1280 | 960 × 718 | 2194 / 2880 | fail | 853 × 480 | 0.59 | 29.9 | none | 0 |
| D | 1280 | 960 × 763 | 1673 / 2880 | fail | 832 × 468 | 0.53 | 53.5 | none | 0 |

At 1280, test 1 asks for 3x, a phone rule. The wide files give 2x (1920 px over 960 CSS px), which covers DPR 2 desktops. Today shows 878 px over 900, which is under 1x.

- **Test 2 (reading size):** the only live text is the running time.
  - LED cap height at 390: A 25.9, B 25.9, C 12.2, D 21.7 CSS px.
  - At 320: A 21.2, B 21.2, C 10.0, D 17.8.
  - All are at least 9. The first pass set the digits at 60% of the window and gave C 9.4 at 390 and 7.7 at 320, so they now take 78% of it.
- **Test 3 (integration):** the running time is lit in painted glass:
  - the timer's gradient and glow;
  - scanlines;
  - the LED window's own painted glare cut from the painting and screen-blended over the digits;
  - the film's glass the same way.

  The play mark is etched (multiplied) into the dome, not laid over it.
- **Test 4 (static words painted):** no static words in the beat. The head is narration (lesson 116), and every painting is free of text (checked at full size).
- **Test 5 (chip detail):** A, B and D are full packages with SMD parts, traces, vias and pins at the hero chip's density. C's board city is denser still. No flat area is larger than about 15%, apart from the glass itself, which is the subject.
- **Test 6 (framing):** the film alone is 44 to 60% of the frame's area at 390. With its gold bezel, the subject is more than 60% in every take. The chip runs off the frame's edges on all four, with no blank board around it.
- **Film shown whole:** the film box sits inside the frame, and the film's picture fills the glass box 100% in every take (today: 91%, with letterbox bands). D's CRT glass has rounded corners, so the film's four corners sit under the bezel's curve (about 1% of the picture, the poster's blurred background).
- **Page:** no sideways scroll at 390 or 1280 (scrollWidth = viewport), no console errors.

## Hedra jobs
13 jobs (`jobs1.json` to `jobs3.json`, `log.jsonl`), all gpt-image-2, 4K, high, 16:9, PNG, kept at 3840 × 2160 as JPG q90. Only the four used masters are committed (`img/t1b`, `t2e`, `t3e`, `t4a`); the rejected drafts are listed below but not kept. The first seven were refetched at full size after the generator downscaled them. **Total $5.52** of the $40 budget.

| Job | Cost | Time | Use | Honest read |
|---|---|---|---|---|
| t1a | $0.426 | 104 s | – | die display; the glass is 1.64:1, too square for 16:9 |
| t1b | $0.426 | 104 s | **A** | die display; the glass is 1.79:1, almost exactly 16:9; clean, dense detail |
| t2a, t2b | $0.426 each | ~100 s | – | four small dies + big display; the glass came out 2.2 and 2.6:1, too wide |
| t2c, t2d | $0.427 each | ~85 s | – | the same with "56 percent" in the prompt; still 2.5 and 2.3:1 |
| t2e | $0.413 | 89 s | **B** | an edit of t1b: the four dies added, the screen kept at 1.81:1 |
| t3a | $0.426 | 97 s | – | drive-in; the screen drawn in perspective (trapezoid), unusable for a film |
| t3b, t3c, t3d | $0.427 each | ~95 s | – | drive-in head-on; 2.0 to 2.2:1, too wide |
| t3e | $0.413 | 102 s | **C** | an edit of t3d: the screen made taller, 1.68:1 (bands of 2.8% top and bottom, inside the glass's own bevel) |
| t4a | $0.426 | 92 s | **D** | CRT terminal; the glass is 1.77:1 |

Lesson for the next painter: gpt-image-2 doesn't hold a stated aspect ratio for a screen inside a picture. It draws screens wide. An image edit of a picture that already has the right screen ("keep its exact size and position") works on the first try.

## My pick: C, "Now showing", right after the hero
**Why C:**
- It is the one frame someone would screenshot (lesson 107): a premiere over a city of chips, the key light and the god rays the bet chip already owns.
- The film is the largest share of its frame (60% at 390).
- It reads at once as "a screen showing something" without a word.

**Why move it to after the hero:**
- With BOARD as the doorway to Meet the models (board5), nothing can sit between them.
- Whole before part is how people learn a mechanism: the 80-second whole game first, then "How a round works" on one real round.
- The hero promises "Four AIs call earnings. The market keeps score." The film shows it at once, and the frames then prove it on R40.

**Second choice: A** if the owner keeps today's order (it is the quietest and closest to the chips above and below), or B if the owner wants the strongest continuity with the hero chip. B's four lit marks repeat the hero's four dies right above it, which is two carriers for one fact (lesson 13), so I would light B's dies dim or blank if picked.

**Open question for the owner:** "before or after" changes the story. C and B are drawn for "before"; A and D for "after". Any surface works in either place: `window.__F2place='before'|'after'`.

## Drop-in
Three parts:
- `_f2.js`: a module that runs after `x2p_top.js` has built `.t4`. It replaces the film beat and, for C and B, moves it after the hero.
- `_f2.css`: appended after `x2p_top.css`.
- `flat/top-h24-film-<a|b|c|d>.jpg` (phones, 1400 px, 207 to 260 KB) and `-w.jpg` (from 1000 px, 1920 px, 308 to 367 KB). The wide files are over the old 300 KB line. They are kept at 1920 px so a desktop at DPR 2 gets two real pixels per CSS pixel; 1400 px is the fallback if 300 KB is a hard line.

To port C:
1. Copy `flat/top-h24-film-c.jpg` and `-c-w.jpg` into `media/`.
2. Set `window.__F2='C';window.__F2flat=1` before the module, and append `_f2.js` to `x2p_top.js` and `_f2.css` to `x2p_top.css`. Or fold `frame()` and `wire()` into x2p_top's `film()` and `build()`; they share no names (classes are `f2-`).
3. The video sources are mp4 first, then webm (iPhones play the mp4).
4. Delete `FILM` and the head's `1:20` replacement in x2p_top's `wire()`, which the module makes redundant.

The module re-mounts itself whenever x2p_top rebuilds its section (a MutationObserver: x2p_top rewrites `sec.innerHTML` when the width crosses 1000 px). Without it, the first desktop shots came back with today's beat, or the film beat twice.

## How it could fail
- **The LED is small on C** (12.2 px cap at 390, 10.0 at 320: it passes, but only just). The stand's glass glare also washes the digits (close-up board). Fix: a C repaint with a taller LED window, or less of the painted glare over the digits.
- **Two-word heads may not say enough:** "Now showing" says "a show is on", not "this is how EZ works". The poster ("$EZ, nobody said it would be easy") doesn't say it either. If the owner finds that too vague, the fallback head is "The whole game", which today's visitors have seen.
- **The edited paintings** (B, C) carry small edit artefacts. On C's stand there is a faint red smear on the board on the right. Check at 3x before shipping.
- **Moving the film before the frames** pushes "How a round works" one screen lower on phones (the film beat is about 320 to 370 CSS px tall). If the frames are the clearer teacher, that costs more than it gains. Only a test on real traffic can settle it, and analytics are still off.
- **The breathing key** may read as noise next to quad4's re-scanning displays. It is the only idle motion in the beat; switch it off if the owner says so.
- **Sound on the first tap.** The film starts with sound when tapped, as today. In-app browsers may refuse; then it plays muted, the LED counts, and a second tap on the glass unmutes (not built: add it if the owner sees it on a phone).
- **Safari is not checked:** container units (cqw/cqh), background-clip:text inside a filter, and mix-blend-mode over video.
- **D steps outside the world a little** (lesson 111): a CRT is old hardware rather than a chip. It is kept as the wildcard for the "old school exchange" question.

## Files
- `gen.py`: the Hedra jobs (from quad4's, keeps up to 4096 px).
- `rects.py`: finds the glass and LED windows in a painting. Its output is `geo.json`: the glass, LED and key per painting, plus the crops. The key and B's four dies were checked by eye and set by hand.
- `_f2.js` / `_f2.css`: the takes and the drop-in.
- `run.js`: shots and measurements over the built page (serve `ez/` on port 8961).
- `close.js`: the 3x close-ups.
- `rec.js`: the play recording.
- `board.py`: the boards.
- `now.js`: today's beat.
- `img/`: the 4K masters.
- `flat/`: the production crops.
- `out/`: the shots and `measure.json`.
- Note: `run.js` waits about 50 s per shot, because the page is busy after the cover lifts.
