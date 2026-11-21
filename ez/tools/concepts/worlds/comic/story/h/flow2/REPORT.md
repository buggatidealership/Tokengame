# H27 · flow2: the order, and How a round works read text first (mockups)

Saved by the lead from the helper's hand-back (the helper's Write was blocked). Commits 9537717c, cc60181f. Laid over the built `ez/v46-live-x2plus.html` (port 8995); nothing in tools/v22, media or the pages changed; no new painting. **Pick: take C in the friend's order.** Runner-up A if the paintings must stay big.

## The want
The friend never read the sentences because the paintings won the eye. Every take puts the sentence first and biggest, or makes the picture wait for it.

## Order
`window.__F2O='friend'` moves Meet the models right after the headline; How a round works and the film follow in a second `section.t4`. Desktop is a fixed-row grid, so the mockup pins the moved sections to rows 1 to 3 and pushes the rest down one row.
**Flag:** in the friend's order the hero chip (the four AIs by logo and name) sits straight above Meet the models (the same four, ranked): "four AIs" twice in a row. If it ships, the hero tiles could drop the names, or Meet the models its opening strip. The film's chip connector then leads into the record.

## Takes (sentences unchanged: CALL, CLOSE, LEDGER, BOARD; key words coloured: long green, short red, close/ledger/board gold)
- **A, one step per screen:** one numbered sentence at a time, big, its frame under it; scrolling turns the step (about 3/4 screen each, four step bars on top); nothing to tap; desktop sentence left, picture right. Cost: about three extra screens, empty space under the picture on tall phones.
- **B, caption on the panel:** each sentence on a gold caption box biting the panel's top-left corner; one panel per beat on phones, four in a row on desktop; the longest on phones (about four screens).
- **C, text first, small picture:** a row per step: the numbered sentence big, one line of this round's facts in words (computed from ROUNDS and `__x2pPnl`: "Tesla, round 40: GPT +1% Kimi +2% Claude −4.5% Grok −3.1%" / "Tesla closed −3.08%. Grok wins: the closest call." / "Right: Claude and Grok. Wrong: GPT and Kimi." / "Today: 1 Grok 2 Claude 3 GPT 4 Kimi, +$148,480 on top."), the painting at 38% width as proof; about 1.5 screens on phones; 2x2 on desktop.
- **D, Play the round:** frames dark under a gold play disc; on play each sentence letters in word by word on a caption box pointing at its frame, then the frame lights (about 12 s), then "Play again". `window.__F2D='scroll'` plays once on view; reduced motion shows the end state. Breaks lesson 103 (scroll, not tap) and hides the facts until played.

## Why C
The words are the largest thing in each row; the picture is too small to win the eye; shortest, no scroll machinery, no tap; cover the pictures and the sentences still tell the round.

## Checks
320, 390, 1280 in both orders: no errors, no sideways scroll, nothing past the right edge, no sentence or fact line overflowing; D's caption stays inside the frames. Not checked: Safari, real phones, A on short landscape screens.

## For a build
`x2p_top.js` `place(sec)` assumes the frames live inside its section; the friend's order needs that loosened (the mockup uses a hidden `.t4-ln` stub and its own copy of the surface placement, memory rule kept).

## Boards and videos
`ez/x2p-h27-flow2-order-390.png`, `-takes-390.png`, `-takes-1280-a.png`, `-takes-1280-b.png`, `-320.png`; `vid/flow2-A-scroll.mp4` (3.2x), `vid/flow2-D-play.mp4`.

## Files
`_f2.js/.css` (order switch, shared lettering), `A`..`D` (.js/.css), `shot.js` (`FROM=b2` shoots the section), `steps.js`, `seq.js`, `rec.js`, `board.py`.

## Note
An earlier work-in-progress commit put about 90 MB of scratch webm from `flow2/out/` into the branch history; the folder is no longer tracked, the files stay in history.
