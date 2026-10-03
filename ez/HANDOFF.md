# EZ: handoff brief (2026-10-03)

Paste this into a new session, with the zip, to pick up where we left off.

## What EZ is
"Earnings Zeason" ($EZ). Four AI models (GPT, Kimi, Claude, Grok) call how a stock moves after its earnings: up or down, and by how much. The market grades them at the first close after the report. A memecoin funds a pot that one AI later bets on earnings; wins buy back $EZ. Audience: crypto Twitter.

## The two directions we're weighing
1. **EZ Season** (`ez/v15-season.html`, live: https://claude.ai/artifact/XxQqLLfSx18hzSV9qawyeN). The main page. One long scroll: headline, standings and Up next side by side, the record (a carousel of flip cards with films), "Are they learning?" charts, the buyback, the math, the road. New: a quiet share icon on each card (native share sheet on phones, a small panel on desktop, a 1080x1080 share image).
2. **EZ Season Live** (`ez/v22-season-live.html`, live: https://claude.ai/artifact/3FJq71NA8CwsLN2rZZxNa8). Season as the home page, plus a top nav (Board, Rounds, Models, Upcoming, Buyback), richer standings (right way, average miss), a page per round, model pages, a Rounds page and an Upcoming page with a calendar. Built from v15 by `ez/tools/v22/build.py`.
   Reference only: **EZ Live** (`ez/v21-live.html`), the page v22 took its navigation, standings, model pages and calendar from.

## Season Live: done on 2026-10-03
- Rounds page: one season chart (a bar per graded round, as big as the move, the winner's logo on top, then the rounds to come), a Results / Coming up switch, cards with the name and result under the film.
- Round page: the share block is gone; a small Share button uses Season's share image and panel.
- Season also has share on every card; BlackBerry zoomed in, Carnival zoomed out, Jefferies and Costco keep their $EZ ending.

- "If you'd followed each AI" panel (Season, in "Are they learning?"; Season Live inherits it): $10,000 each, all-in on every call, compounding, with "Just buy every stock" as the yardstick. Hypothetical, before fees. Assumes the sheet's move runs from the close before the report to the first close after (owner to confirm).

## Season Live, 2026-10-03 (later)
- Nav: Board · Rounds · Leaderboard · Buyback. No separate Upcoming tab and no page per round.
- Rounds: one strip of earnings days, past on the left, next on the right, opening on the next day with rounds; pick a day to see its rounds as rows. "Big names" filter (starter list in routes.js, owner can set BIG in ez-data.js). Calendar and X follow as one quiet line.
- A round opens as its flip card over the page (close with ✕, Esc or a tap outside); shared links #/round/N open it on the Rounds tab.
- Leaderboard: table (wins, right way %, avg miss, streak, $10k became); rows open model pages with a "← Leaderboard" link.
- Share only on rounds whose calls or result are public (Season too).
- Previews: only EZ Season and EZ Season Live exist now.

## 2026-10-03 (evening): Overview, standings, leaderboard, rounds
- Both pages: standings take two thirds of the band, Up next one third (phones too, side by side; Up next drops to the essentials). Each row is rank, logo, name on the logo's line, right way %, wins. Average miss moved to the leaderboard. A model with fewer calls than rounds shows "2 of 3 right" instead of "right way".
- Season Live: "Board" is now "Overview".
- Leaderboard: the standings' rows with columns Right way, Avg miss, ROI ($10k followed every call), Last 5, Wins (far right). Under it: The race (wins after each round), Head to head (who was closer, in rounds both called), Season records.
- Rounds: one timeline of days, done rounds above as small cards (film poster, move, winner), rounds to come below as compact tiles. Opens on the next day in the middle of the screen. A card jumps out into the full card. "Big names" filters the whole timeline. The big-names list (routes.js, or BIG in ez-data.js) now covers banks, pharma, AI chips and gear worldwide, the Magnificent Seven and household names.
- Research note (what competition sites bring people back for): measured data points to live, personal, in-progress results first; standings matter as the frame, but that ranking is inference, not measured.

- Standings stat (both pages): now ROI if followed (the $10k panel's number), centred between name and wins. To revert to right way, set STAND_STAT="right" in v15-season.html and rebuild v22. Under owner review, plus legal (it shows a hypothetical return on the landing).
- Season Live: flatter nav pill; leaderboard titled "Current standings", even centred columns, the leader in the foil; head to head is one line per pairing; records lead with most wins in a row.

## 2026-10-03 (night)
- Standings stat back to the direction share, now worded "hit rate" (the TradFi term). ROI stays one switch away (STAND_STAT in v15).
- Season Live nav: Overview, Leaderboard, Upcoming, Buyback (#/upcoming; #/rounds still works).
- Leaderboard: the race has four measures (wins, hit rate, avg miss, ROI) on a flip card, racers ride their lines to a finish; head to head removed; records are headlines (kicker, one-line headline, logo and number).
- Company logos: ez/media/logos/ via tools/fetch_logos.py (source financialmodelingprep image-stock; Foxconn and Toho hand-picked from Wikimedia Commons). Cards on Upcoming: one line (round, star, company and ticker), then the winner.

## 2026-10-03 (late)
- Both: section intros smaller; the record intro in plain words. Record controls: no big arrows; "Past rounds" and "Upcoming" are red pills beside the round chips (Upcoming glows). "So far" removed. "If you'd followed each AI" is now "$10K on every call": four tiles, big %, dollars, a small path. Buyback steps shorter; the pot scoreboard is off the overview. The road has no launch step (the site goes live with the coin).
- Season Live: Buyback tab is its own page (#/buyback) with the pot and $EZ bought back.

## Still open
- Navigation for Season Live is still to be decided.
- Share placement on Season: top right of the card in focus, plus on the card back. Owner to confirm.

## Rules that stand
- All numbers come from `ez/ez-data.js` (a snapshot of the owner's public sheet). Never type results by hand. When the owner says "sheet has been updated", follow `ez/SYNC.md`.
- Variant 1 (`ez/v1-binder.html`) and its media are frozen. v6 Primetime and v9 Primetime Kraft are locked in design and copy.
- Copy: no long dashes; plain sentences; tickers as "Micron (MU)" with no $ (only $EZ keeps it); no promises of price, return or buyback; "Not financial advice" once; say the pot can be wiped out. Never show the prompt column.
- Films: the site uses square crops cut from the owner's Hedra masters, scaled down only, always keeping the "$EZ / Nobody said it would be EZ" ending in frame. Nike (round 11) uses Hedra's re-cut with the corrected outcome, -3.64% (GPT wins), cropped 1800:1800:180:0.

## Status
- 11 rounds graded; standings GPT 5, Kimi 3, Claude 1, Grok 0. Rounds 12 to 36 scheduled.
- GitHub push is blocked (account suspended / app access). Work is committed locally on branch `claude/bugatti-dealership-redesign-845i5j`.
