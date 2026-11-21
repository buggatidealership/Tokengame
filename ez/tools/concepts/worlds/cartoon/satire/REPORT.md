# H47 · satire: the American humour magazine

## How the take tells the addendum's story

**Cover.** A painted gouache cover: the four founders, seen from behind, stare up at an empty diving board over a rooftop pool of gold coins. The empty board is the top spot; their faces are saved for Meet the models. The cover line sits in the painted sky. The red foot works as the contents page:
- p.2 the verdict
- p.3 its next trades and Hyperliquid
- p.5 the receipts
- p.10 skin in the game

**p.2, the verdict: "So far, it's Grok."**
- His caricature, "49 of 76 trades right so far (64.5%)", +$162,950, and the last 7 days.
- "How sure are we?": a plain range chart of each model's likely real hit rate (Wilson 95%, 50% marked). Grok is about 53% to 74%, and the others' ranges overlap his.
- A coupon at the foot: "Its next trade: AMD (AMD), Short, at the close Wed Nov 4, on Hyperliquid as xyz:AMD."

**p.3, its next trades.**
- The next close: the leader's trade as a red or green rubber stamp, the other three as the field, a "Follow on Hyperliquid xyz:AMD" pill and $17.9M open interest.
- "Trades drop before the earnings": each coming company with its market name or "no market", and under $10M open interest marked thin.
- The source line reads "Hyperliquid, as of Nov 3".

**The proof.**
- p.4: an editorial cartoon of a sweating bookkeeper ticking four ticker tapes into a ledger while "You" relax. Below it, one real round in four panels (the newest 2-long/2-short round with a winner, today R84 Shopify).
- p.5 and p.6, the record: the latest rounds as gag lines with their films' end frames, then a contact sheet of every round. The winner stamp sits on each caption, never on the art.
- p.7: the cast as a centrefold of caricatures. Each has a flag patch, season P&L, W-L, and one personality line from the trades, e.g. "Goes short on 67 of its 76 trades. Nobody shorts more."
- p.8 and p.9: Smart or lucky. A labelled scale (Skill, Luck, "84 rounds: still weighing"), the hit-rate chart from 50%, and the P&L chart with a waterline: under water means losing money. "No verdict on skill."

**p.10 and p.11, skin in the game.**
- The countdown uses the live page's `betAt` verbatim: at the close, Wed Nov 18.
- Board freeze Tue Nov 17, 4:00 PM New York. NVIDIA's market is xyz:NVDA with $75.2M open interest.
- A painted golden ticket with the holder's name printed on it, and "Not the last: Season 2".
- The pool as a labelled editorial cartoon:
  - faucet: "69% of $EZ creator fees fill the pool"
  - diving board: "Bet #1, top model's trade"
  - bucket: "Right: profits buy back $EZ"
  - drain: "Wrong: the pool shrinks or can be wiped out"

**p.12 and p.13, the back page.**
- The fold: "Three AIs went long on Reddit (RDDT). Who stood outside the crowd?" Folding the crowd away brings Grok's halves together, edge to edge (tested: 0 px gap), with "went short: +$29,270". The answer is also printed upside down.
- A mock ad: "Tired of babysitting four AIs? 328 trades graded for you… they disagreed on direction in 65 of 84 rounds. Send no money. There's nothing to buy. Follow on X."
- The small print appears once.

**Leaderboard.**
- A printed form where a red pencil circles the chosen window (Season, 7 days, 24 hours) and the ranking (P&L or hit rate). Every figure names its window, e.g. "hit rate, 24h (needs 5 trades)".
- The season's golden ticket and the freeze line.
- The window leader's next trades, each with a Hyperliquid pill or a dashed "trades drop before the earnings" stamp.
- The table: Last 5 (old to new), W-L, hit rate, P&L, and the Nov 3 close. The leader's row is on gold-washed stock.
- The waterline chart, which turns into the hit-rate chart when ranking by hit rate.
- "Only companies Hyperliquid lists today", with the caveat that most weren't listed when traded.
- By sector, with a pencil ring on the best in each row (3 trades or more).
- Biggest W and L as cards, with a computed gag: Reddit (RDDT) is the biggest L for Claude, GPT and Kimi and the biggest W for Grok.

## How each kind of word is made

- Headings: Shrikhand, inked and print-shadowed.
- Labels on the painted tags: Patrick Hand SC in ink, multiplied into the card. The tag boxes were measured on the paintings, keeping clear of the holes.
- Trades: rubber stamps.
- Body: Libre Caslon Text.
- Folios at every page foot.

## Measured checks (`check.js`)

- **No sideways scroll** at 320, 390 or 1280 on either page.
- **Faces:** exactly 3 rendered.
- **Words:** none of call, prediction, coin flip, pot, volume, pit wall, proven, beats the market, getting smarter. No emoji. No page errors.
- **Alignment:**
  - Leaderboard columns (P&L right edges; Last 5, W-L, hit rate, close; name left edges) and the sector columns are 0.00 px apart at 320, 390 and 1280.
  - The biggest W and L cards are 0.00 px apart.
  - Cast portraits match to 0.00 px; nameplates to within 0.46 px; contact-sheet tiles to within 0.02 px.
  - Tag lettering is centred on the painted tag to within 0.35 px (320), 0.20 px (390) and 0.93 px (1280).
- **Dead space:**
  - Phones: 0 px under the last content on every page.
  - Desktop Overview spreads (blank stock under the shorter page): verdict 53 px, how we keep score 60, smart or lucky 66, bet 65, back page 13.
  - Desktop Leaderboard: 0 and 16 px; its chart takes the height the facing page leaves.
- **Surfaces:**
  - All grounds are Hedra watercolour washes, mirrored into seamless tiles.
  - The card stock is cut from a painted tag; the chart's water and the golden ticket are painted.
  - Grok's portrait sits on a charcoal wash so his cream colour doesn't make a pale ground.
- **Motion:** the countdown seconds are the only loop. Chart lines draw in once. The fold moves only on a press. Nothing moves with reduced motion.

## Research cited

- Fold-ins: [Wikipedia, "Mad Fold-in"](https://en.wikipedia.org/wiki/Mad_Fold-in) and [Flashbak](https://flashbak.com/al-jaffee-demonstrates-how-he-invented-those-brilliant-mad-magazine-folds-ins-459904/). I took the device only; the sheet, guides, wording and digital fold are my own.
- Labels and symbols in editorial cartoons: [Ohio State's Thomas Nast collection](https://library.osu.edu/site/thomasnast/why-do-cartoonists-use-symbols) and the [Herblock exhibit review](https://www.washingtonexaminer.com/?p=1297569). This is why the cartoons carry few labels, each on an object.
- Marginals: [Sergio Aragonés](https://en.wikipedia.org/wiki/Sergio_Arag%C3%B3n%C3%A9s). Mine are tiny reversed-ink drawings, each carrying a fact.
- Line and wash: [Wachsteter caricature listings](https://www.1stdibs.com/art/drawings-watercolor-paintings/figurative-drawings-watercolors/george-wachsteter-caricature-dick-powell-show/id-a_6808422).
- Mail-order ads: [Collectors Weekly](https://www.collectorsweekly.com/articles/sea-monkeys-and-x-ray-spex/).
- No existing magazine's title, mascot or look is copied.

## What I'd do next

1. Paint the fold as a matched pair of folded and unfolded pictures. Today the unfolded sheet is two halves of a portrait framing the crowd.
2. Paint the "how it works" panels.
3. Let the scale and keeper cartoons take up the leftover desktop spread height, as the Leaderboard chart does.
4. Check the follow link format: `app.hyperliquid.xyz/trade/xyz:AMD` is assumed, not verified.

## Oddities in the data

- R81 to R84 are graded but have no films. The pages show the company's mark on painted card with "film in the works", and pick rounds with films for the featured gags.
- R104 Berkshire Hathaway (BRK.B): its trade date (11/2) has passed with no trades and no grading date.
- No grading date yet for R96 Nintendo or R105 to R114, NVIDIA included.
- SK Hynix, Samsung and TSMC have Hyperliquid markets under other names (SKHX/SKHY, SMSN, TSM). The brief's rule (ticker without its exchange suffix, which takes ASML.AS to ASML) doesn't count them.
- I strip only real exchange suffixes, so BRK.B stays BRK.B.
- TICKERS lists both TSMC and 2330.TW as "TSMC".

## Files in the folder

- `overview.html`, `leaderboard.html`
- `sat-data.js` (all numbers), `sat-ui.js` (marks, flags, pencil ring, face crops, the one chart), `sat.css`
- `art/` (prepared paintings and tiles), `thumbs/` (films' end frames at 360 px), `img/` (raw Hedra outputs)
- `gen.py`, `jobs1-3.json`, `log.jsonl` (the Hedra runs)
- `shot.js` (banded full-page capture), `check.js` (the gate)

Nothing was deployed, published or committed.
