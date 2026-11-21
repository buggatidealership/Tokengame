# Round H6, area `slab2`: the back of the opened round, building on slabback D

Brief: `../BRIEF-H.md` (Round H6, "The card back"), the skill, the X3+ lines in CLAUDE.md, `../slabback/REPORT.md`, `../cast2/REPORT.md`.
The owner: D "the page" is the favourite and the turn is "really nice"; the round "prediction circles" look cheap next to the art;
the background must feel part of the predictions; each founder's panel shows what happened to him that round; the finish can be
pop art, anime cel or 3D with comic ink; a comic-cover take is welcome.

Boards: `ez/x2p-x3p-h6-slab2-390.png` and `-1280.png` (row 1 today's live back, then takes A, B, C, E, D on R78 Intel, R57 GE Vernova
(tie), R51 UPS (nobody won) and R80 Exxon Mobil replayed as pending; then close-ups on R78; the 390 board ends on the turn).
The pose sets on one sheet: `ez/x2p-x3p-h6-slab2-poses.jpg`. Turn recording: `ez/x2p-x3p-h6-slab2-turn.mp4` (take A on R57: the
live slab turns to the page, then the page's own "See the film" turns it back).

## What changed from slabback D, in every take
- **The pose is the outcome.** One painted image per founder per state, chosen by the round's data, never by hand:
  `win` (the sheet's winner: crowned, fist up, confetti; both on a tie), `pass` (right way but not closest: a calm thumbs-up),
  `fail` (wrong way: the blank red stamp slams into the panel, he recoils), `predict` (pending: stating his call, hand raised).
  The set is made once per founder and finish (16 images) and reused by every round (S2.state in `_s2.js`).
- **The balloon is in the painting.** Every pose image was generated with an empty speech balloon painted into its upper left, in
  the panel's own ink, light and finish, its tail aimed at his mouth. `balloons.py` finds that white oval in each image and writes
  its box to `balloons.json`; the page letters the call into it ("DOWN / 2.2%", green up, red down, page text from ROUNDS).
  So the call is no longer a white circle stuck on top: it is the character speaking inside his own panel. D's cheap circles are gone.
- **Hand-tuned chrome.** Captions and the title are wobbly two-tone shapes (a lit top, a darker foot, a thick outer and a thin inner
  ink, each corner its own: S2.wob); the rank sits in the caption beside the name (it had covered the balloon); the panel ink is
  slabback's hand-drawn double line; the close keeps D's burst tier.
- No "% off" balloon, no grey filter: the pose says pass or fail, the caption says how far off.

## The takes
**A, the page, 3D with comic ink (my pick).** The cast's own finish (modelled, lit, ink and halftone in the shadows), on D's 1960s newsprint.
- Why: it is the finish of the founders' live portraits and of the rack and the die count (the bar, lesson 76), so the turn from the
  slab's film to this page stays in one book. Reads in comic order: who said what, who got stamped, the close, who won.
- How it could fail: the same 16 images return on every round, so after a few rounds the page repeats (a second pose per state,
  about $1 per finish, would halve that); at 390 each panel is about 140px, so the faces are small; the stamp is a blank red
  plunger-like object (the word FAIL is in the caption, never in the art) and can read as a boxing glove; on desktop the page keeps
  phone-sized panels inside the wider window, leaving newsprint margins either side (a desktop layout would put the close beside the grid).

**B, the page, pop art.** Same page; the poses as Lichtenstein-era print: sunburst grounds in each founder's colour, Ben-Day skin, heavy ink, a red title.
- The loudest and most "comic book" at arm's length; the balloon numbers get a white keyline.
- How it could fail: four sunbursts plus the burst at the foot is a lot of radiating noise on one small card (lesson 71: the loud
  treatment once); the founders' faces drift furthest here (GPT looks younger); the sunburst grounds are a stock pop effect.

**C, the page, anime cel.** Same page; cel frames (thin line, flat colour, one shadow tone, painted sky), dark subtitle captions in cream.
- The quietest and cleanest; the dark captions read like anime subtitles.
- How it could fail: the thin line looks weak next to the slab's heavy acrylic and the site's thick ink; Claude simplifies to glasses
  and curls; the cel sky grounds are generic, so the panels say less about each character than the 3D set.

**E, ink by outcome.** A's 3D colour for right calls and the pending state; a founder who went the wrong way drops into noir ink
(black brush, cross-hatching, one red), so the finish itself is the verdict (decoration encoding a fact, rule 3).
- Strongest on R51 UPS (all four in noir: the round where everyone failed looks like it).
- How it could fail: noir reads as "eliminated", harsher than a single wrong call deserves; two finishes on one page break the
  "one ink" rule unless the owner reads it as meaning (lesson 27).

**D, the round's comic cover** (the take the owner welcomed). The back as the round's own issue: a red masthead "Round 78" with
"Intel (INTC) · filed Oct 29", the close in the price-box corner (green or red, "?" while pending), the star of the issue as cover
art with his call lettered in his painted balloon, a cover line, and an "also in this issue" strip of the other three (face, call,
pass or fail). The star follows the data: the winner (R78 Claude), both winners side by side on a tie ("Claude & Grok share the
crown!"), all four in a 2x2 when nobody won ("They all went the wrong way!") or while pending ("Who calls it?"). Pop finish.
- Why: one image per round reads at a glance (who won and by what), a cover is what a comic collector turns over; it shows the
  winner big, which the 2x2 page cannot.
- How it could fail: the co-stars are small (their calls are about 9px at 390); four different layouts (1, 2, 4 stars) make the
  back look different from round to round, which is good for variety but less of a fixed form; the masthead's Bangers "7" read as
  a "1" ("Round 18"), so the number is set in Anton; on a tie the cover line sits between masthead and art and pushes the art down.

## My pick
**A**, with D as the alternative if the owner wants the back to sell the winner. A is D-the-page fixed exactly where the owner pointed
(balloons in the art, poses by outcome) in the finish he already picked. B and C are there to show the finishes; E is one idea (finish
as verdict) that can be laid over A or D.

## Two readings, both made
- "The finish can change": per take (B pop, C cel) and per outcome (E).
- "A comic cover": the back is a cover (D), not the page with a cover-like title.
- "Predicting" for pending: a neutral pose (hand raised, stating his call) with the direction in the balloon only; cast2's predict
  images all showed an up arrow, which would lie on a down call, so they were not reused.

## How it runs
Serve `ez/` (`python3 -m http.server 8951`), then `node run.js <out> now,p3d,pop,cel,mix,cov 390,1280,320 78,57,51,p80` (one at a
time; mounts the take in the live slab's back window through `../slabback/_sb.js`, as slabback did) and
`/usr/bin/python3 board.py <out> 390 <png> [turn.mp4]`. `node flip.js <take> <round> <out.webm>` records a turn.
`python3 batch.py 3d|pop|cel|noir [names]` makes a pose set (`hd.py`, the Hedra v3 client from cast2; key from `$HEDRA_API_KEY`, never
printed); `/usr/bin/python3 balloons.py` re-measures the balloons. Files: `_s2.js/.css` (state, pose key, balloon lettering, wob, panel),
`page.js/.css` (A, B, C, E), `cov.js/.css` (D), `img/`, `jobs.jsonl`, `cost.json`.

Every word and number is page text from ROUNDS through RH.data: the calls, % off, the ranking (right calls by closeness, then wrong),
the winner(s), the close, dates. The label above the window is the live page's own.

## Checks run
- 390 and 1280 on all five takes and four rounds, 320 on R78, R57 and the pending replay: no sideways scroll, no page or console errors,
  nothing clipped (the "ov" entries on D are the co-star photos, zoomed inside their own clipped frames).
- Nothing over a face: the balloons sit where the model painted them, upper left, clear of the head in all 52 images (checked on the
  sheet); captions sit on the panel foot; D's cover line sits over the star's torso, never his face.
- No text in any generated image (all 52 checked at full size: the balloons are blank, the stamps are blank).
- Zoomed at 2x (close-up row) against a printed comic page: the lettered balloons read as lettering in a painted balloon, not as a
  sticker; the weakest element is still the close tier's flat black band.
- 320px: the window is tall and thin (251x539), so the page leaves newsprint under the grid; acceptable for an overflow check, not designed.
- Not checked: Safari; a 4x slower CPU (the back is still images and static shapes, no new animation).

## Hedra jobs: $3.44 of $15 (52 jobs, all gpt-image-2, 1K medium, 1:1, one reference image, 41 to 59 s each, none failed)
| Set | Reference | n | Cost | Result |
|---|---|---|---|---|
| 3d (win, pass, fail, predict x4) | today's poster `founder-<m>-anim.jpg` | 16 | $1.06 | Likeness holds in all; balloons placed top left every time. Best set. |
| pop | cast2 `b-<m>-pop.jpg` | 16 | $1.06 | Strong pop print; GPT drifts younger; the stamp is a red plunger shape. |
| cel | cast2 `b-<m>-cel2.jpg` | 16 | $1.06 | A real cel look on gpt-image-2 when the reference is already cel (cast2 needed nano-banana for it). |
| noir (fail x4) | cast2 `b-<m>-noir.jpg` | 4 | $0.26 | Black ink, one red; reads as defeat. |
Every job (prompt, settings, cost, time, file) is in `jobs.jsonl`. I left $11.56 unspent: a second pose per state for the picked
finish (to break the repetition) is the best next use, after the owner picks.
