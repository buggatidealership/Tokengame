# Round H7 · cover5: the X3+ first screen as one painted world (roughs)

Boards:
- `ez/x2p-x3p-h7-cover5-390.png`: today's live top first, then takes 1 to 6. The red line is the fold of a 390x844 phone.
- `ez/x2p-x3p-h7-cover5-1280.png`: the same at 1280x800, cropped to the first screen.

Run: serve `ez/` (`python3 -m http.server 8961`), then `node run.js <out> now,marquee,arena,floor,show,track,studio 390,1280` and `/usr/bin/python3 board.py <out> <board390> <board1280>`. Each take is `_c5.js`/`_c5.css` (the shared builder) + its entry in `takes.js`/`takes.css`, laid over the built `v47-live-x3plus.html`. These are mockups only. No live file was touched.

## What every take does
- **No code boxes.** The cream panel, the Season 1 strip, the step boxes and the round chips are gone. The plate is the cover, edge to edge, on the logo black. Each world's ground and palette is near-black, gold, green and red, matching the bet section.
- **One painted plate per width:**
  - 9:16 for phones and 16:9 for desktop;
  - gpt-image-2, medium, 1K;
  - the four founder posters are passed as references, so the cast is the owner's four characters, not new ones.
- **Live text in blank painted surfaces.** Every word and number is page text set into a surface that was painted blank for it: the marquee board, a jumbotron, LED boards, podium screens, the tote board, gold plates and a lower third. Each is lettered in that surface's own medium:
  - black marquee letters;
  - gold leaf on glass;
  - LED glow;
  - paint on canvas;
  - engraving in marble;
  - pressed ink on brass.
- **Real data, all from the page's globals:**
  - the newest graded round, R80 Exxon Mobil (XOM), close +2.17%;
  - GPT ▲2.5% (wins, closest call), Kimi ▲1.5% (pass), Claude ▼1% (fail), Grok ▼1.3% (fail);
  - "Season 1 · No. 80" = `ROUNDS.length`;
  - the golden ticket = `SE.lead()` (Grok, the P&L leader).
- **The four steps in the owner's words, in order,** then "Bet #1: NVIDIA" as the payoff. Each step sits by the object that carries it (calls, close, ticket, next bet).
- **The film:**
  - In take 6 the live film's own frame (the video, play and sound buttons) moves into the world's big screen.
  - In the other takes the film follows the plate unchanged, with "Meet the four models" under it.

## The takes
1. **The Palace** (a 1930s movie palace in the rain). The site is a show, so its front is a cinema.
   - The title and "Season 1 · No. 80 graded" are in black changeable letters on the lit marquee.
   - The four founders are the "Starring" poster cases, each poster card printed with its call. GPT's card carries a crown.
   - The box-office glass carries the close in gold leaf, and the brass ticket tray holds "Grok".
   - The pavement reads "Next feature: Bet #1 NVIDIA".
   - This is the strongest "one place" reading: every fact sits on an object a cinema really has.
2. **Fight night** (a ring under one light, a founder in each corner). Four corners for four rivals is the competition, literally.
   - The jumbotron's three faces carry "4 AIs trade earnings", "Who calls it best?" and "Season 1 · No. 80".
   - Each call is printed on the canvas by its fighter's corner, and the close sits in the middle of the ring.
   - The gold ring card reads "Golden ticket · Grok · Next bout: Bet #1 NVIDIA".
3. **The floor at the bell** (an exchange hall). This is the product's own world: the close is a real bell on a real floor.
   - The wall board carries the title in gold and green LED.
   - Each trading post's display shows a model's call.
   - The close runs along the balcony by the bell.
   - The golden ticket sits under a glass dome, with the vault door behind it ("Behind the vault door: Bet #1 NVIDIA").
   - The four steps are carved into the marble plinth as the house rules.
4. **The game show** (reveal board, four podiums, a prize before the curtain). Predicting is "locking in an answer", and the close is the reveal.
   - Each podium shows the name on its top screen and the locked call on its front.
   - The golden ticket is the prize on the plinth.
   - The curtain hides "Bet #1: NVIDIA".
5. **Race night** (tote board, photo finish, winner's circle).
   - The tote board lists the four entries and their calls.
   - The close is the photo finish.
   - The winner's-circle plaque in the horseshoe wreath is the golden ticket.
   - The betting-window plate reads "Bet #1: NVIDIA".
6. **The studio** (a live sports show). The only take with the explainer film on the first screen: it plays on the studio's big screen.
   - The four monitors over the pundits show their calls.
   - The desk's lit lower third carries the title.
   - The on-air box reads "On air · Season 1 · No. 80", and a gold card on the desk is the golden ticket.

## What I measured (Chromium, 390x844 and 1280x800, DPR 2)
- **Sideways scroll and errors:** none at either width for any take.
- **Fold position at 390px:**
  - The plate ends at about 800px, so the whole world fills the first screen and the film's frame starts at the fold.
  - In take 6 the film sits at 153 to 291px, inside the first screen.
  - Today's film starts at 714px.
- **Overflow:**
  - Arena call rows at 390 overflow their slots sideways by 12 to 18px. They are centred on the canvas, so nothing is cut, but the slots should be widened.
  - Floor calls overflow by 3px vertically.
  - Marquee at 1280: the steps and the bet overflow by 3 to 6px vertically.
- **Data check** (`window.__c5`): XOM#80 +2.17, win GPT; GPT+2.5:P KIMI+1.5:P CLAUDE-1:F GROK-1.3:F; lead GROK; graded 80.
- **Checks run against rule 0:**
  - no white or pale module grounds;
  - no emoji;
  - no dot-screen fills;
  - no text over a logo or a face;
  - company named with its ticker.
- **Cost:** 12 images, $0.943 of the $6 budget. `log.jsonl` has every job.

## My pick: 1, The Palace (6, The studio, close behind)
- It is the closest to the bet section's recipe: one world, and every fact on an object the world really has.
  - The marquee is the masthead, so the title is lettered by the world itself.
  - The poster cases are "Starring".
  - The box office is where the ticket lives.
  - "Next feature" is the payoff.
- It reads top to bottom as the four steps without labels doing the work.
- Its palette (red facade, gold bulbs, wet black pavement) is the logo's.
- The studio wins if the owner wants the film on the first screen. A combination is possible: the Palace with the film on a screen behind the open doors, as the desktop plate already shows.

## How each could fail
- **All takes:**
  - The film's own F3 frame (orange torn paper) below the plate is now the one thing out of palette. It needs its own pass in the picked world.
  - These are 1K roughs: faces and gold are soft at desktop size. The pick needs a proper 2K/4K paint with the surfaces placed for the text.
  - The step captions on dark ground (arena, studio, track) are words laid on the scene, not set into a surface. The final paint needs a surface for each, such as a sign or plate.
- **Palace:** the step labels on the facade and pavement are small (about 11px). The posters crop the founders tight.
- **Fight night:**
  - The calls painted on the canvas are hard to read at an angle.
  - The desktop plate has no jumbotron, so the title floats on the dark.
- **Floor:** the most "finance" world, so a newcomer may read it as a real exchange product rather than a show. The engraved rules are the least legible text.
- **Game show:** the most familiar world, but "game show" can read as luck, which works against "Who calls it best?".
- **Race night:**
  - The phone plate painted the cast twice (as jockeys and again in the winner's circle).
  - Horse racing says "betting", which is risky for a token's site.
- **Studio:**
  - The steps sit over out-of-focus cameras.
  - The title in the lower third is small (17px).
  - With the film at the top, the title is not the first thing read.
