# Round H4, area `slabback`: the back of the opened round

Brief: `../BRIEF-H.md` (Round H4), CLAUDE.md (X3+, "Go-live batch H3", the certificate history), the skill. Live today: T1, the slab
for real (`tools/v22/story/h_slab.js/.css`): its front was reinvented, its back is still the comic "Graded!" certificate restyled on
painted paper. The owner: "if we redesign those, we have to also redesign the back of the cards... every element has to be thought out again."

Boards: `ez/x2p-x3p-h4-slabback-390.png` and `ez/x2p-x3p-h4-slabback-1280.png`. Row 1 is today's live pop-up (the front, then the
back on three rounds); then takes A to D, each on R78 Intel (graded, film, one winner), R57 GE Vernova (a tie: Claude and Grok),
R51 UPS (nobody won: all four went the wrong way) and R80 Exxon Mobil replayed as a pending round; then a close-up of each back on
R57. The 390 board ends on the turn: five frames of the pick turning on the live slab (front, two mid-turn, landed), taken from
the recording `ez/x2p-x3p-h4-slabback-flip.webm` (the card turns to D's back, then D's own "See the film" turns it back). The front
is the same in every take (row 1, first shot): only the window behind it changes.

**No round has calls in and no result today** (PENDING is empty), so the pending face is R80 replayed as it stood before its close:
its real calls and dates, the result, grade and right-count withheld, the label set to "Final grade ?" / "Calls are in". A mockup
device only; on the live page a pending round has one face (pendify, the front), so a build puts this pending face there.

## How it runs
Serve `ez/` (`python3 -m http.server 8951`), then `node run.js <out> now,a,b,c,d 390,1280 78,57,51,p80` (`f78` the front,
`p80` the pending replay) and `/usr/bin/python3 board.py <out> 390 <png> [flip.webm]`. Run one run.js at a time: two in parallel
plus the 1280 shots timed the local server out once.
run.js opens the real X3+ page at `#/round/n`, waits for the live slab, mounts the take inside the live back window
(`#x2pRm .face.back .wc-cert`, the live certificate kept underneath, hidden, so certWatch and the slab's own flip, arrows,
swipe, Escape and close keep working), then turns the card with the page's own button. `flip.js <take> <n> <out.webm>` records a turn.
Each take's own "See the film" button proxies the page's flip button. Files: `_sb.js/_sb.css` (shared: mount, the pending label,
a seeded worn stamp, a drawn staple, a torn edge), `a..d.js/.css`, `hedra.py`, `jobs*.json`, `jobs.jsonl`, `img/`. Reuses
`../round/_r.js` (RH.data: ROUNDS, `__x2pPnl`, logo(); the drawn crown, ink frame and burst).

Every word and number is page text, read from ROUNDS: the calls (sign and size), the % off per call (the sheet's column), right or
wrong way against the close, the ranking (right calls by closeness, then wrong ones, as certRows), the winner(s) from the sheet, the
close, the dates. Nothing is typed. The label above the window (grade, right count) is the live page's own.

## The takes

**A, the grader's bench (3D first, comic ink, rubber stamps).** The window is the grading report itself, a painted card with an
engraved guilloche band. Each AI's call is a painted ticket slip stapled on in rank order, each at its own angle; the market's verdict
is struck across the slip's end as a worn stamp, PASS with "2.6% off" or FAIL "wrong way"; the winner's slip is gilded with a drawn
crown, wrong-way slips fade. The one loud element is the close, a strip torn from the tape (extruded red or green), with "Shared
crown" or "Nobody wins" beside it. Filed and Graded are violet date-stamp strikes; the painted holo seal stays. Pending: the slips
are stapled with an empty dashed slot "? at the close", the tape reads "The close ?" and the grading day, a red wax "Locked" seal.
- Closest to today's certificate, so returning visitors read it at once; every element is now a made object (slip, staple, stamp, tape).
- How it could fail: the slips repeat one painted plate four times (the same tear and hole on every row: a sharp eye sees the copy);
  the stamp's "2.6% off" line is about 9px on a phone and the speckle mask eats letters (on R78 Intel "22.58% off" is barely legible); at 320px the slip is tight and a long name
  plus a 6-character call crowd the stamp; it is still a list, the least "comic" of the four.

**B, the judges' scorecard (fight night).** The round is a bout; the back is the judges' card pinned under a painted ring corner
(gold turnbuckle, red, cream and green ropes). The fighters are the four founders (the cast, `media/founder-<m>-anim.jpg`), each
with Called / Off / Verdict; PASS or FAIL struck in the verdict box; the winner's row lit gold with a crown, wrong-way fighters in
grey. Then "The bell" (a drawn bell, the close) with the dates, and the decision sash, the one loud element: "Winner · Claude",
"Split decision · Claude & Grok" on a tie, "No contest · all four went the wrong way" when nobody won; pending: a red sash "Fight
night · Bell at the close · Oct 30" and "?" in every verdict box.
- Carries the fight-night voice the owner wants across the page (Upcoming, the Leaderboard's "Who's winning") into the round itself,
  and puts the founders on the back, so the cast is there when the result lands.
- How it could fail: "Split decision" and "No contest" are boxing words for the sheet's tie and no winner; a "split decision" in
  boxing means judges disagreed, not a shared win (the label underneath still says the plain fact). The scorecard is a table in a
  costume (rule 0's warning) even with the portraits; the portraits at 12cqw (about 38px) are small for faces; the painted scorecard's
  own grid lines show faintly under the rows and do not line up with them.

**C, where they landed (a measuring board).** The miss becomes a distance you see. A painted maple board stands on a green leather desk
(Hedra): each call is a push pin stuck at the move it called, tinted in the model's colour; "flat" is a dotted line; the close is the
gold bar across the board with a gold flag "The close −1.90%" (the one loud element). Each pin runs by an ink leader to its label
(face, name, call, PASS/FAIL with % off), the labels kept at their pin's height and pushed apart only where they would touch. Ties
sit side by side in the board. Pending: the pins are in, the gold bar is missing, the flag reads "The close ? Oct 30" at the flat line.
- The only take where the picture is the ranking: before reading a number, you see who was close and who was on the wrong side.
- How it could fail: one huge move squeezes every pin into a corner (R78 Intel, −28.58%: the four pins crowd the top fifth and the
  close sits far below; true, but the pins then say little); the leaders cross when a wrong-way call sits between right ones; a pin
  stays the same painted cream pin tinted by a multiply disc, so GPT's green and Kimi's blue read as dull; it is the most "chart"
  of the four and needs a second look to decode.

**D, the page (the pick).** The back of the card is one comic page on painted 1960s newsprint (2K) with green, red and gold bursts at
its corners. Four panels in rank order, one per founder, each saying its call in a balloon that breaks the panel's top border
(never over a face), the panel ink drawn by hand (thick outer, thin inner line), the verdict as a caption box with the name and the
struck PASS or FAIL ("2.6% off" / "wrong way"); the winner's panel framed in gold with a crown on its corner, wrong-way panels drained
to grey. The last tier is the close: a black panel with a burst in green or red and the move extruded, and on its right "Winner
Claude", "Shared crown Claude & Grok" or "All four went the wrong way". Pending: "Locked in", every balloon up, captions "? at the
close", a gold "?" burst and "Graded at the close Oct 30".
- Rule 0 met: the four characters say their calls, the market answers, the round is a beat on a page, and the cast the owner made
  (lesson 74) carries it. The page reads in comic order: who said what, then the bell, then who won; the turn from the film to this page
  continues the film's story.
- How it could fail: the four founder frames are the same stills on every round (only the balloons and captions change), so after
  a few rounds the page looks alike; a wrong-way founder drained to grey may read as "eliminated"; the balloons sit on the panel's
  top right corner, so a founder whose head sits right of centre comes close to his own balloon (checked: never over a face at
  320, 390 or 1280, though Kimi's balloon touches his hair on R51); the date line under the title wraps on 320px.

## My pick: D, with C as its desktop companion
D is the only back that is a comic and not a form in costume, and it uses the cast instead of inventing furniture. C is the best
carrier of the actual fact (the miss as a distance); on desktop the window is wide enough to put C's board in D's last tier instead
of the plain burst, which would join the two (not built). A and B are the safe, list-shaped options.

## Two readings
- "Every element has to be thought out again": I read it as the back's whole format (what the back is), not only its pieces, so the
  four takes are four objects (a report card, a scorecard, a measuring board, a comic page), each holding the same facts.
- "the slab's painted world": all four sit inside the live acrylic slab and keep its label, so the takes change only the window.

## Checks run
- 390 and 1280 on every shot, 320 on R78, R57 and the pending replay for every take: no sideways scroll, no page or console errors, nothing in a take outside its
  window. A stamp's line is under 11px at 390 in A, B and C (flagged above).
- Nothing over a number or a face: D's balloons were first inside the panels over GPT's head; they now sit on the top border.
- Zoomed at 2x against a real comic page (the close-up row): D's balloons, inks and captions read as a page; A's stamps read as
  stamps at arm's length, a CSS border up close; C's labels are the flattest element.

## Hedra jobs (gpt-image-2; every charge equalled its estimate). Total $0.42.
| Job | Settings | Cost | Time | File | Result |
|---|---|---|---|---|---|
| b-score | 3:4, 1K, medium | $0.0370 | 34 s | img/b-score.jpg | Scorecard with red and green corners; its own grid shows faintly under B's rows. |
| a-card | 3:4, 1K, medium | $0.0370 | 34 s | img/a-card.jpg | Report card with a guilloche band and ruled rows; used as A's window, cropped to the card. |
| a-slip | 16:9, 1K, medium | $0.0292 | 35 s | img/a-slip.jpg | A torn tag with a punched hole; cut out (alpha) as A's slip. Good, but one plate repeated four times. |
| c-board | 16:9, 1K, medium | $0.0292 | 33 s | img/c-board.jpg | Maple board with brass ends and ticks, no numerals as asked; rotated upright for C. |
| c-pin | 1:1, 1K, medium | $0.0534 | 34 s | img/c-pin.jpg | A cream push pin on green; keyed out for C's pins. A few shadow pixels stay at its foot. |
| p-env | 3:4, 1K, medium | $0.0369 | 51 s | img/p-env.jpg | Envelope sealed with red wax and green string. Not used (the wax was drawn instead). |
| b-rope | 1:1, 1K, medium | $0.0535 | 101 s | img/b-rope.jpg | Ring corner with gold turnbuckle, red/cream/green ropes; B's ground. Strong. |
| d-page | 3:4, 1K, medium | $0.0369 | 70 s | img/d-page.jpg | 1960s blank comic page at 1K; replaced by the 2K. |
| c-desk | 3:4, 1K, medium | $0.0368 | 34 s | img/c-desk.jpg | Green tooled-leather desk with brass corners; C's ground. |
| d-page-2k | 3:4, 2K, medium | $0.0675 | 35 s | img/d-page-2k.jpg | 2K medium newsprint page, with green, red and gold bursts at the corners the 1K did not have; D's page. |
