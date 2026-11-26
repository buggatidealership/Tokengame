# H28 · bet5: the bet, say it first, with the owner's words

Three takes, built over the built v46 bet section (#x2pSt) from the existing painting `media/bet-chip-h2.jpg`, with bet4's helpers (now `_b5.js`). The owner's two sentences are page text, set plainly by one shared helper (`B5.say`). The share comes from SIM.poolShare: with SIM.poolShare set to .42 the line reads "42% of $EZ creator fees fill the pool.". There is no typed fallback: if SIM.poolShare is missing the take fails and does not show a number. The bet time is betAt (verbatim). "Today's #1: Grok" is gone from every take, because the owner's words say "the #1 AI on our leaderboard".

Boards: `ez/x2p-h28-bet5-{390,1280,320}.png` (today first, then A, B, D). Reshoot: `cd ez && python3 -m http.server 8975`, then `PORT=8975 node run.js <out> now,a,b,d 320,390,1280` and `/usr/bin/python3 board.py <out> <W> <board.png> now,a,b,d`.

**Pick: A, Say it first.** The words come first and carry the whole bet; the chip gives the time; the split gives the stakes. Every part does one job, so it reads in one pass. D is A without the split crops, if the owner wants fewer pictures. B buries the sentences in a caption the eye skips (lesson 135), which is the friend's problem again.

| | Order | Pictures | Height 320 / 390 / 1280 |
|---|---|---|---|
| Today | vault, date line, chip, circuit board, sockets | 3 | 997 / 1,198 / 1,671 |
| A · Say it first | heading → the two sentences → the chip (date tab, countdown) → RIGHT / WRONG as two lit crops of the chip's own pins → "NVIDIA is the first bet, not the last." | 3 crops of one painting | 542 / 635 / 813 |
| B · One chip + split | the chip carries the heading, date tab, countdown and one K2 caption box with the two sentences → A's RIGHT / WRONG crops → closing line | 3 crops | 502 / 601 / 743 |
| D · Plain (simplest) | heading → the two sentences → the chip (date tab, countdown) → "Right: profits buy back $EZ." / "Wrong: the pool can be wiped out." as two lit lines → closing line | 1 | 497 / 551 / 540 |

- **Desktop, A:** the words sit left and the chip right; the two crops and the closing line are full width.
- **Desktop, B:** the whole chip is one wide crop with the caption in the dark on its right, then the two crops side by side.
- **Desktop, D:** the words column sits left with the chip on its right, in one row of 540px.

## Checks (Chromium, the site's fonts, DPR 2)
- 320, 390 and 1280: no page errors, no sideways scroll (scrollWidth equals the viewport), no element past the viewport.
- No text runs past its picture. The earlier clips on B were fixed: the desktop caption, the WRONG line and the phone caption at a crop height of 880.
- The countdown ticks in the dies.
- With reduced motion at 390: no errors (A, B, D).
- Every visible take shows 66 words, counted as before (digits and labels included).
- Two line breaks are held together with non-breaking spaces: "creator fees" and D's "wiped out". Sentences use text-wrap:balance.

Skill rule 0:
- no pale grounds and no emoji;
- nothing sits on a logo or on the dies;
- B's caption sits on the board under the dies;
- no box inside a box.

## How each could fail
- **A:** the three crops of one chip may read as three chips. Its sentences are plain text, so the image-first reader may still skip them, but they come before the picture.
- **B:** the caption box is a caption under a busy picture, which is lesson 135's failure. At 320 it is 13px from the board's bottom crop edge, and the pin row shows in the chip and again in the crops.
- **D:** RIGHT and WRONG are words only. They are not tied to the chip's green and red light, so it is the least "world" of the three. On desktop the words column is long beside the picture.

## Questions for the owner
1. Should today's leader be named (for example "Today: Grok"), or only "the #1 AI on our leaderboard" as in your words? All takes now drop the name.
2. Leverage: 5x is still on no take. Add "at 5x" to the second sentence?
3. In D, is "Right: / Wrong:" as text enough, or should the green and red light of the painting carry it (as A does)?

## B2: the owner's notes on B (2026-11-02)

The owner picked B and asked for these changes. Files: `b2.js` and `b2.css`. Boards: `ez/x2p-h28-bet5-2-{390,1280,320}.png` (B, then B2). Reshoot: `PORT=8975 node run.js <out> b,b2 320,390,1280`.

1. **The heading moves onto the chip.** "Bet #1: NVIDIA" now sits where the date tab was, on the chip's top edge in its light. "At the close · Nov 18" is on the same row. The chip crop starts just above that row, so the gap is gone.
2. **New caption words.** The caption reads "69% of $EZ creator fees fill the pool." / "We bet the whole pool on NVIDIA, based on the #1 AI's prediction."
   - The share comes from SIM.poolShare: with .42 the caption reads 42%.
   - The word "leaderboard" is gone.
3. **The caption sits on the seam.** The K2 caption is centred on the seam between the chip and the RIGHT / WRONG crops. b2.js sets its top to the chip's bottom minus half its own height, rerun on resize and fonts.
   - It is also centred across the seam between the two crops, so both lines are hidden under it.
   - The chip crop runs down to below the dies' labels, so the caption never covers DAYS / HRS.

**Heights against B:**

| Width | B | B2 |
|---|---|---|
| 320 | 502px | 398px |
| 390 | 601px | 476px (125px, about 21%, shorter) |
| 1280 | 743px | 701px |

**Checks:**
- At 320, 390 and 1280: no errors, no sideways scroll, no text past its picture.
- The countdown ticks.
- Reduced motion at 390: no errors.

**Known issues:**
- At 320 the heading row fills the width (heading 28px, tag 10px). A longer date ("Nov 18" is the longest form, "Sep 30") still fits, with about 10px to spare.
- On desktop the heading row sits in the rays above the chip, not on its edge. The chip there starts lower in the painting.

## B2 ported into X2+ (2026-11-02, owner: "B2, the owner's note. Yeah.")
- **Where it lives:** `ez/tools/v22/story/x2p_more.js`, in the H_BET block, which now builds B2 directly (`html()`, `place5()`, `seam()`). The ticking reel digits are unchanged (`tick`, `setReel`).
- **CSS:** `x2p_more.css`, in the "B2" block. The section's ground, the heading lettering, the dies and the K2 caption box are kept.
- **What was removed from X2+:**
  - from the page: the vault opener, the parts list S4, the sockets, board D (H_BETD) and H_BET ALIVE;
  - from the CSS: their rules;
  - from the header comment: their media names, so make_site.py no longer copies those files. The files themselves stay in media/ for X3+.
- **bet2x/gen.py no longer applies to x2p_more.*.**
- **Data:**
  - the share comes from SIM.poolShare, with no typed fallback (no pool line without it);
  - the date uses the same betAt rule;
  - "Today's #1" is not shown, and there is no 5x.
- **Old runners:** html.bd-ready is no longer set on X2+, so bet4's and bet5's own run.js (which wait for it) no longer run against the live page.
