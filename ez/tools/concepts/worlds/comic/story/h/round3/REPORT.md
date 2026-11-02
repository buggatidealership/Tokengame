# H28 · round3: How a round works on one example, today's order (mockups)

Saved by the lead from the helper's hand-back (Write blocked). Commits 8787a5bb, f2ce2ce4. Laid over the built `ez/v46-live-x2plus.html` (port 8931); nothing in tools/v22, media or v4*.html changed; no new painting. **Pick: B (caption on the panel), panel 2 without the winner, frame 4 from board R.** C is the short option (about 1.5 phone screens against about 4 for B).

## The four panels (`_r3.js`; every value from ROUNDS, MODELS, CO_LOGOS, `__x2pPnl`, x2p_top's own example rule: today R40 Tesla)
1. CALL: the four dies read LONG, LONG, SHORT, SHORT in green and red with each AI's mark and name (GPT long, Kimi long, Claude short, Grok short); no % sizes.
2. CLOSE: the readout reads the Tesla logo and name, −3.08%, "MARKET CLOSE"; `window.__R3W='win'` brings back "GROK WINS".
3. LEDGER: the ledger painting cropped to the one slot; "ROUND 40 · −3.08% / TESLA · WINNER (mark) GROK"; no R38, Texas Instruments or R41; a soft fade over the neighbouring slots' slivers.
4. BOARD: full frontal, all four chips in their sockets, #1 Grok seated in its gold socket (no lift), ranks 1 to 4 lit, numbers dashes as live, founders still. R (default): the live board6 E3 2880 master made frontal (`fit.py`: one least-squares homography over 28 corners, chips and rank windows as equal rectangles at one pitch; RMS error about 1% of a socket's width, worst corner 2.5%) → `img/board-r.jpg`. F: board6 E2, a head-on painting from H25, never used (`window.__R3BD='f'`). No perspective transform on the frontal board (plain % boxes).

## Takes
- B · caption on the panel: a gold caption box bites each panel's top corner; full-width panels one under the other; desktop one 560px column with captions hanging over the margin on alternating sides. A staircase (`html.r3-stair`: 47% panels alternating sides) halves the height but leaves about 520x770 empty beside the tall board, so it is only a switch.
- C · text first, small picture: a row per step, the sentence big, one example line in the sentence's words ("Tesla, round 40: GPT long, Kimi long, Claude short, Grok short." / "Tesla closed −3.08%." / "Round 40 · Tesla −3.08% · Winner Grok." / "Ranked by P&L: 1 Grok 2 Claude 3 GPT 4 Kimi"), the panel at 40% beside it; desktop the same rows at 1040px (sentence 44 to 62px left, picture 36% right).

## "Grok wins": panel 3
The CLOSE sentence is about the move; who won is what gets written down, and the ledger says "Winner Grok". In panel 2 the winner arrives a step early and is said twice (lessons 13, 139). Both on the boards.

## Boards
`ez/x2p-h28-round3-390.png` (today, B, C, the whole top), `-1280.png` (B column, C rows, B staircase), `-panels-a.png` (CALL, CLOSE without and with the winner, LEDGER, 3x), `-panels-b.png` (BOARD R, F, today, 3x), `-320.png`.

## Measured
320, 390, 1280, both takes, site fonts: no errors, no 404s, no sideways scroll, nothing past the right edge, no caption or line overflowing, lit words inside their glass, no caption over another panel.
Whole top height: 390 today 1,756 / B 2,863 / C 1,996; 1280 today 2,221 / B 4,119 / C 3,291.
MEM (`mem.js`, 390, DPR 2.75, 40 MB GPU cap): every perspective surface at most 2.69x its on-screen size; 6 surfaces against today's 18; no black paint.
Smallest type: B captions 21px at 320; C fact line 12.5px at 320.

## How it could fail
LONG/SHORT may read as an opinion, not a trade (only B has the sentence on the panel); a one-entry ledger may read as "the ledger holds one round"; the flattened board is a painting forced flat (traces near the edges lean slightly); seated, the gold light may read as "a lit socket" more than "#1"; B is about four phone screens, so visitors may stop before frame 4; Safari and real phones unchecked.

## For a build
Port `_r3.js` into `frames()` of x2p_top.js: dieQ4 → LONG/SHORT; readQ4 without the winner; ledgerQ4 → the one-slot crop; boardB6 → the frontal board (`img/board-r.jpg` to media under a new name). The mockup's MutationObserver (`R3start`) is only for the mockup.

## Questions
1. Panel 2: "MARKET CLOSE" alone or with "GROK WINS"? 2. Frame 4: R or F? 3. Desktop B: one column or the staircase? 4. C: keep the example line or drop it for a bigger picture?

## Files
`_r3.js/.css`, `B.js/.css`, `C.js/.css`, `fit.py` (+`fit.json`), `warp.py`, `export.py` (→ `img/board-r.jpg`, `img/board-f.jpg`, `geo.json`), `shot.js` (`W=`, `BD=`, `STAIR=1`, `PART=top|b2|fr:<key>`), `mem.js`, `probe.js`, `board.py`; shots in `out/` (git-ignored).

## Round 2 · C2 (owner's notes, 2026-11-02; commit 8b632d42)
C's layout with B's look: each row a gold caption box (red number tab, CALL/CLOSE/LEDGER/BOARD kicker, long/short green and red, key words underlined, hard ink shadow, tilting the other way every second row) left, the picture right; B's sentences unchanged; the example lines gone; the picture 54% of the row on phones (C 40%), 52% below 360, 50% of a 1040px row on desktop; panels as B (MARKET CLOSE, round 40 only, frontal board); desktop one row under another.
Whole top at 390: today 1,756, B 2,863, C2 2,076 (C was 1,996); 1280: C2 3,810, B 4,119. Checks at 320/390/1280: no errors, 404s, sideways scroll or overflow; smallest caption 16px at 320, 19 at 390; MEM holds. Boards `ez/x2p-h28-round3-2-{390,1280,320}.png` (B beside C2). Could fail: pictures about 175px wide at 390 (LONG/SHORT and the ledger entry small; the ledger strip 66px tall at 390, 51 at 320); empty space left of the caption boxes on desktop. Question: on phones, the ledger row's picture full width under its caption? Files `C2.js`, `C2.css`; `board.py r2`.
