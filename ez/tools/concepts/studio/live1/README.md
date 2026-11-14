# live1: W2's Live now and Last matchday, inside the live terminal

Owner, 2026-11-09, on the six overnight takes: none fit, and none showed the actual interface. What he liked was W2's "Live now" section, for rounds that are live; "the last match day thing is not too bad".

This folder is the live terminal (`ez/tools/concepts/hyperdash/index.html`, which is earningszn.xyz's `v53-terminal.html`) with two changes, in the terminal's own tokens and fonts:
- **The In play block.** It becomes W2's match card: LONG against SHORT, the four AIs by name with their sizes, the company in the middle, "2 v 2", and a pill.
  - The pill reads LIVE (pulsing) only while a US listing's grading close is today and the market is open; otherwise it reads IN PLAY with "the market is shut".
  - The card header and footer read "Grades Mon ~4:00 PM", with the time to the close.
- **Last matchday** (new). It lists every round graded on the latest grading day: logo, name, ticker, "<AI> won", the four AIs (the winner ringed in gold, wrong sides dimmed) and the move.

Placement: on the Upcoming tab by default; `?at=lb` puts both modules on top of the Leaderboard (the landing).

Build: `live.js` and `live.css` are injected into a copy of the terminal by the python snippet in this session's log. Re-run it after any change: it rewrites `index.html` from `hyperdash/index.html`. Boards: `node shot.js <outdir>` (fixed clocks, America/New_York).

Preview: https://live1.earningszn.pages.dev (`#next` for Upcoming, `?at=lb` for the Leaderboard).
