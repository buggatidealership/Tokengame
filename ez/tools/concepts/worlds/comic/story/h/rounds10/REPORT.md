# H28 · rounds10: Every round so far as the latest print / latest issue (mockups)

Saved by the lead from the helper's hand-back (Write blocked). Pushed with 40baf03c. Mockups over the built v46; nothing in tools/v22, v4*.html or media changed. **Pick: A, hot off the press;** D (the press run) runner-up, strongest single frame.

## Boards (ez/)
`x2p-h28-rounds10-390.png` (today, A, B, C, D), `-320.png`, `-1280.png`, `-390-more.png`, `-1280-more.png` (after one Show more), `-closeup.png` (3x: R78 winner, R79 tie, R51 nobody), `-art.png` (the nine paintings).

## Story
Models live in chips → what they did is printed at every close → the newest print is still wet, the next only pencilled in. "Latest" by scarcity and a gap (lesson 100).

## Takes (`window.__R10`)
- A hot off the press: a print shop's drying room at night, one lamp, green/red rim light; the latest print on the first brass wire with two gold clips, "Latest print · Oct 30"; a pencilled blank sheet beside it for the next round from UPCOMING (round, company, "Calls due Nov 2", "Printed at the close", the logo sketched; one on phones, two on desktop); recent prints two to a wire (three beside the hero on desktop); "Show 8 more / 73 in the flat file" on the flat-file cabinet.
- B the newsstand: a black-and-gold kiosk in the rain under a red awning; the latest in the big gold pocket, "Latest issue · No. 80"; issues racked with brass plates (name, move, winner); "73 in the back rack".
- C the latest issue: a collector's case; every round one painted cover design (masthead company + move, gold seal "No. 80", red ribbon winner); the latest big with three back issues fanned; "73 back issues".
- D the press run: a black-and-gold rotary press; the newest print slides off the rollers once on view (still with reduced motion) onto a cream web; recent prints further down the web with cut marks; "73 further down the run".
Shared (from rounds9): latest first, six recent, Show more (phones +8, desktop +12 so rows of six close); company without ticker, move, Winner + mark + name, ties ("Winners" → "Tie" → marks), "Nobody"; hero = the film poster, others `tile-r<n>-f1.jpg` (`-t2` without a film); tap opens `#/round/n` (R79 checked in all four); desktop hero two rows high with three beside it, no dead space.

## Paintings (Hedra gpt-image-2, 2026-11-02; no words in any)
sheet $0.7131 (clips, pockets, plates on magenta, 4K 1:1), dress $0.5032 (cover design, 4K 3:4), wireP/wireD, standP/standD, pressP/pressD ($0.40 each, 4K), velvet $0.2221 (2K 16:9). Total $3.96 of the $10 cap; balance $100.13 → $96.17. Style ref `media/bet-chip-h2.jpg`. Prompts and costs in `jobs.jsonl`, `gen1.log`; `key.py` keys the magenta; scenes drawn as 9-slices (border-image). Art in `img/`.

## Measured
390 and 320 at 2x, 1280 at 1x, site fonts, before and after Show more: no errors, no sideways scroll, no word outside its item (one trim: "AstraZeneca" on B's plate at 320). Smallest cap: A, D 8–9px; B 8; C 8 at 390, 6 at 320 (the seal's "No."). Posters 2–6x display; tiles 2.3–4.3x phones, 2.5–3.2x at 1280 (C's covers 1.55x at 1280; a build wants 768px tiles). Item coverage A .85–.88, B .94–.96, C .92–.93, D .91–.94. After one tap: 15 items on phones, 19 on desktop.

## How it could fail
A's prints and D's web are cream paper (lesson 22; the one bright field between the chips and the vault); B's rack lip crosses each cover at half height; C has 6px type at 320 and three extra images; the hero shows the move twice (poster end card); headings differ (A, D "Hot off the press"; B, C "Every round so far"); paintings are 3072px JPEGs about 1 MB each (re-export webp 1600/2400 for a port); the pencilled sheet is only as fresh as the sync; untested on a real phone.

## Questions
1. A, D, or D's press with A's wire under it? 2. Cream prints, or black stock with gold and cream ink? 3. Heading "Every round so far" or "Hot off the press"? 4. Desktop: two pencilled sheets or one?

## Files / port
`_r10.js`, `_r10.css` (`r10-*` only; `window.__R10IMG`), `run.js`, `tiles.js`, `board.py`, `dbg.js`, `look.js`, `hedra.py`, `jobs.json`, `key.py`, `img/`. Rerun: serve ez/ on 127.0.0.1:9611; `node run.js <out> A,B,C,D,A+ 390,1280,320 2`; `node tiles.js <out>`; `/usr/bin/python3 board.py <out>`. Port: append `_r10.css` to x2p_more.css; replace the rounds6 block in x2p_more.js with `_r10.js`'s body inside the existing wait; `__R10` and `__R10IMG='media/'`; copy the take's art to media under new names written out in full (A: wireP, wireD, spr-clip; B: standP, standD, spr-pocket, spr-plate; C: velvet, dress; D: pressP, pressD).
