# H26 · rounds8: Every round so far as one hero round, six recent, then "Show 8 more"

Saved by the lead from the helper's hand-back (the helper's Write was blocked). Three takes, each with both heroes, at 320, 390 and 1280. Pick: **B, the filing cabinet, with the top round as the hero.**

## Boards (in `ez/`)
`x2p-h26-rounds8-390-latest.png` (today's live take beside A, B, C), `-390-top.png`, `-320.png`, `-1280-latest.png`, `-1280-top.png`, `-closeup.png`.

## Structure, every take
1. Head "Every round so far", caption "80 rounds graded · 34 to come".
2. The hero: the film's last frame (the 1080 poster), big, with a tag ("Latest round · Oct 30" or "Biggest W of the season · Grok +$29,270"), logo, name and ticker, the move in green or red, one computed line in trade words ("Only Grok went short."), the four AIs' marks (winner ringed) and the winner.
3. Six recent rounds (the newest, minus the hero): outcome tile (f1, or t2 without a film), name and ticker, move, winner. Marks from 380px up; below, the winner stamp alone.
4. "Show 8 more" adds eight at a time.
Every round links to `#/round/n` (the graded slab; tested).

## The "top one" rule
The round holding the season's biggest single W: P&L flat ($100K × the move, for every call that went the right way); ties to the round where fewer AIs got it right, then the newer. Today R72 Reddit, −29.27%: only Grok went short, +$29,270 (next R78 Intel +$28,580, R62 ServiceNow +$26,970). `topRound()` in `_r8.js`. "The bullseye" rejected: four calls tie at 0.02%.

## Takes
| | Hero | The six | "Show 8 more" | Height at 390 |
|---|---|---|---|---|
| A, the die | A big die (the H24 4K die painting, cropped), the frame in its window, a gold tag, an amber readout | Today's dies, two per row | Today's gold button | 1161px (live today 1274) |
| B, the filing cabinet | The folder pulled from the drawer: round number on its tab, the frame paper-clipped on, lines typed in ink, the winner rubber-stamped across the photo's corner in the chip's colour (two on a tie) | Folders standing in a painted drawer | The painted drawer front; its brass card reads "Show 8 more / 73 more filed" | 1426px |
| C, the binder | The headline ledger entry, frame in black photo corners | One ruled ledger row per round with a small mounted photo | A dog-ear: "73 more on earlier pages" | 1415 to 1482px |

Desktop: A and B the hero left, the six in two columns right; C a two-page spread.

## Why B
The structure is the story (each round a record filed away, the newest pulled out, "more" opens the drawer); the control is a painted object; the stamp carries the winner without a legend. The top round beats the latest as hero: the latest is already the first of the six, and a record that changes only when a bigger W lands is a reason to come back. A is the safe step in the chip world.

## Drop-in
1. Copy `img/web/rounds8-*` flat into `ez/media/`.
2. In `x2p_more.js`, replace the rounds6 block with `window.__R8='B';window.__R8H='T';window.__R8IMG='media/';` plus the body of `_r8.js`, inside the existing `go()` wait (`#record`, ROUNDS, `__x2pPnl`, MODELS).
3. Append `_r8.css` to `x2p_more.css` with `__IM__` set to the media path; drop its first rule once r6 is gone.
4. Rebuild. Test: `node run.js <out> B-T,... 320,390,1280` with `ez/` on port 8973 (`+` taps "more" first).

## Tests (18 combinations)
No sideways scroll, no errors; no live word under 9px cap (smallest 10); only C's hero stamp (6 to 7px past its column) and dog-ear (2px) overflow, on purpose; at 320 names trim before the ticker ("AstraZe… (AZN.L)"), nothing trims at 390 or 1280; "Show 8 more" goes 6 → 14; on phones every image is at least 3x its display size; at 1280 the hero poster 2.6x, the die 2.65x, the site's 450px tiles only 1.8x (re-export at 768px+).

## Hedra (gpt-image-2, 4K)
$2.28 spent, $0.38 left (three jobs failed: 402 insufficient balance). Used: folder (2400×3200), drawer front (3840×2160), drawer interior and ledger page (2160×3840 each); an open-folder spread made, unused. No words painted. Paper clip and photo corners drawn in SVG/CSS (their jobs failed for funds).

## How it could fail
- "Biggest W" may read as "best AI", though it is one call.
- On R62 the money (three AIs) and the stamp (Claude, the closest call) disagree.
- The painted drawer front may not read as tappable.
- B and C put an SVG ink filter on many labels; a build should bake the stamps (WebKit has no GPU path for SVG filters).
- The posters are end cards, so the hero shows the move twice (frame and page text).
