# H28 · chain: Every round so far as a blockchain (mockups)

Saved by the lead from the helper's hand-back (Write blocked). Commit 28fca15f. Laid over the built `ez/v46-live-x2plus.html` (port 8961); nothing in tools/v22, v4*.html or media changed; no new painting (round tiles `tile-r<n>-f1/t2.jpg` and film posters). **Pick: E** (A's hash chain with D's open block on top); B (the explorer) if the most familiar crypto look is wanted.

## Story
Models live in chips → what they did is a ledger (How a round works, frame 3) → a ledger written a round at a time is a chain of blocks: height = round number, contents = trades and the close, plus the previous block's hash. Chip material: black glass in gold bezels, amber hashes, green and red only for up and down.

## The hashes
block n = SHA-256(prev + "|" + `R<n>|<ticker>|<called>|<resolves>|<GPT:UP 2.5%,KIMI:...>|<close %>`), block 1's prev 64 zeros, all from ROUNDS. Block 80 (`R80|XOM|10/30/26|10/30/26|GPT:UP 2.5%,KIMI:UP 1.5%,CLAUDE:DOWN 1%,GROK:DOWN 1.3%|2.17`) = `0xed98…2204`. `run.js` recomputes blocks 1 and 80 with Node's crypto on every shot: always matched. Change any round and every later hash changes.

## Tile content (from rounds9)
Company without ticker, move beside it; Winner + mark + name (tie "Winners GPT & Claude" → "Tie" → marks only; "Nobody"); latest first, six recent, "Show 8 more" (desktop adds 10 for A, D, E so rows close; 8 for B, C); a tap opens the round's graded card.

## Takes (`window.__CH`)
- A the hash chain: gold headers ("BLOCK 79" + short hash), a gold link in each gap; phones rows of two alternating direction; desktop hero 2x2 left, the six snaking through three columns, then rows of five.
- B the block explorer: "Latest blocks" in chip material; latest with its full hash on two lines, Prev → block 79, "Graded at the close · Oct 30"; rows: height in a gold socket, thumbnail, company, move, winner, short hash (hidden below 390); desktop latest left, rows right.
- C the bus: one gold line, each block hung by a solder pad; the line printed with the 4-character hash the older block hands up; desktop staggered above and below.
- D the open block: block 81 open and dashed on top; graded blocks as slabs with height and hash engraved on a gold edge.
- E (pick): A with D's open block (Palantir, R81, "?" per model until the calls are in, then Long/Short; "Prev 0xed98…2204, already points at block 80"); on desktop a slim bar across the top.

## Boards
`ez/x2p-h28-chain-390.png` (E, A, B, C, D), `-320.png`, `-1280.png`, `-390-more.png`, `-1280-more.png`, `-closeup.png` (3x: R78 single winner, R79 tie, R51 nobody, D's open block).

## Measured (30 shots: 5 takes, with and without "Show more", 390/1280/320, site fonts, reduced motion)
No errors, no sideways scroll, no text spilling (C after "Show more" at 1280 fixed); ties never clipped, moves never trimmed; hashes matched Node every time. Links: A and E 6 (14 after more on phones, 16 desktop); C 6 hashes (14). Coverage: A/E 0.91–0.92, B 0.96, C 0.93 phones / 0.83 desktop, D 0.97–0.98 / 0.83. Smallest text 8–9px cap ("BLOCK", hashes), 7px D's engraved hash at 320. At 320 small blocks drop the logo; ties keep marks only.

## How it could fail
- "Blockchain" overclaims unless the hash is anchored: the page computes it from the sheet, nothing is on a chain; it becomes proof only when the newest hash is published somewhere we can't edit with a time on it (each round's X post, "Block 80 · 0xed98…2204"). Words avoid "sealed", "mined", "on-chain".
- The sheet does get edited (R67 twice on 31 Oct): a published chain re-hashes from that block on; needs a correction policy.
- Hashes mean nothing outside crypto; the picture must still read as rounds joined in order.
- The hero shows the move twice (poster).
- The open block shows "?" until the sync brings the calls.
- C's desktop line gets long after several "Show more".

## Questions
1. Post the newest block's hash in each round's X post? (Without it, the hashes are decoration; then tone the hash language down.) 2. Open block in this section (overlaps How a round works and Upcoming)? 3. "Block 80" or "Round 80"? 4. A correction: silent re-hash or a "corrected" mark?

## Files
`_ch.js`/`_ch.css` (takes, `cz-` classes: `.ch`, `.ch-cap`, `.ch-w`, `.bk-*` are live page classes), `run.js`, `tiles.js`, `board.py`, `probe.js`, `.gitignore`.
