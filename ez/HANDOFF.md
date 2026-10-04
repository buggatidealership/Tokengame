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

## 2026-10-03 (later still)
- Overview band (both): "How we grade" is plain text right of Standings; a breathing dot left of Up next (gone from All upcoming); "Filed the day before" removed; the yellow box shows Predictions and Resolves dates.
- "Zeason" with a Z in visible copy (brand line "Zeason one", calendar link).
- Season Live leaderboard: the race is replaced by "The stats" (same four-way flip: wins, hit rate, avg miss, ROI as ranked bars, longer is always better). Highlights are a front page, "The Zeason Times", lead story with the film still. Legend: "Simulated, before fees" (owner asked for "estimated"; see note to owner).
- Upcoming: a temporary "Look" switch for review: Brand colours (tiles in each company's colour, CO_LOGOS.c from tools/fetch_logos.py) or Compact (one line per day, rounds as chips). Remove the switch once the owner picks.
- A round opened over the page now uses full-size card text on phones.

## 2026-10-04
- Leaderboard stats: order Hit rate, Avg miss, ROI, Wins; each its own picture (bars; the bullseye with averages ranked; columns up or down from $10,000; a crown per win, half crown for shared, each opens its round). The switch spans the card. The side facing away is emptied after a flip.
- Highlights: four big tiles over the round's blurred film still, the label big, CT headlines ("goes three for three", "basically front-ran", "got rekt on", "can't miss"). The Zeason Times is parked for a later tab.

## 2026-10-04 (later)
- Both: "How we grade" sits right after the Standings title.
- Season only: the panel beside the standings is the last graded round (small looping film, the winner); a tap opens the flip card over the page. Switch: BAND_RIGHT in v15 ("last" or "next"); build.py sets "next" for Season Live, which keeps Up next.

## 2026-10-04 (experiments)
- Round cards on Upcoming: the round small, the company and ticker bigger.
- build.py now also writes two experiments from the same code (window.EZ_EXP):
  - X1 `v23-live-x1.html` (https://claude.ai/artifact/RwimZSvDF4eLmVFszmW3hq): five tabs, a Results tab (the films as a gallery, newest first, film plays on hover) and Upcoming only for rounds still to come.
  - X2 `v24-live-x2.html` (https://claude.ai/artifact/1HuRhevBKLrUfzBR5UUaZL): four tabs; Upcoming opens on what's next, the films as a gallery above it (no date headers).
  Both use the brand-colour tiles, no Look switch. Season Live itself is unchanged apart from the card label.

## 2026-10-04 (X1 round 2)
- Fixed (all three pages): the model page's "Every round" strip had lost its styles (a find-and-replace turned class="strip" into "sxrip").
- X1 only: stats are Hit rate (the "Are they learning?" direction chart), Avg miss (bullseye), ROI (bars from $10,000); no Wins tab. Highlights two to a row: the record name, the story, "Current holder" with logo and number. Results: the latest round big (film playing), a "Record rounds" shelf (closest call, tightest race, biggest move, nobody got it), then every round; tile label on one line, bigger winner bar.

## 2026-10-04 (X1 round 3) — the owner keeps EZ Season and EZ Live X1
- X1: Last round beside the standings (as Season). Model pages are plain text for now (ship after launch; #/model goes to the leaderboard).
- X1 sections look like the overview's: number, label, title with the yellow marker, one line under; more space between and inside. Leaderboard: 01 Current standings, 02 The stats, 03 Highlights. Results: 01 Latest result, 02 Record rounds (four different rounds when possible), 03 Every round. Big names switches every part, top story included. Upcoming has the same title and a counted All / Big names switch.
- X1 stats: Hit rate, Avg miss (small bullseyes in one row), ROI, Bull/bear (share of up calls vs how often stocks went up), Boldness (average call size vs the average real move). Every view the same height.
- Post-launch list: model pages.

## 2026-10-04 (X1 round 4)
- Overview with the last round (Season and X1): half and half, the last round's date next to its title, no All upcoming button (the tabs lead there). On phones How we grade is its ⓘ.
- X1 tab pages never repeat the tab's name: section headers are the number and the title ("01 Current standings"). Results opens on "01 Latest result" with the All / Big names switch beside it; Upcoming keeps the switch in its sticky bar, the title is for screen readers only.

## 2026-10-04 (round 21)
- Season and X1: only the card the record opens on (the latest result) starts on its stats ("↻ See the film" turns it); every other card shows its film; the back shows Calls filed and Graded dates big, with a GRADED stamp. Last round's winner bar in the cards' proportions; the info icon sits right after "Standings". Opening a card: no black flash (the film shows once it plays), a slower, softer unfold.
- X1: records to beat are shorter; Longest hit streak says what it means; a record opens its story (what happened, the holder, each round small, a round opens its card). Results: 01 Record rounds (the record name biggest, the company colour under the still; "Everyone was wrong"), 02 Every round. The latest result lives on the overview only.

## 2026-10-04 (round 22)
- Season and X1: less space between a section's intro line and its content. Section 02 is called "The test". The $10K panel is now "If you'd copied them": each AI's balance big, a green or red % pill, the sparkline.
- X1: the records section is "Record book", each tile names the "Record holder". Results: the All / Big names switch sits on top and filters the whole page; then 01 Highlights (dark tiles, each with a short story line: Closest call, Tightest race, Biggest move, Everyone was wrong) and 02 Every round. "Everyone was wrong" picks the no-winner round not already shown (Costco now) and lists the others.

## 2026-10-04 (round 23, X1)
- Results: the All / Big names switch moved next to "02 Every round" and filters only that list (All by default). Highlights always use every round.
- Upcoming: no switch. The page opens on "01 The calendar" with how many rounds are left and how many are big names (★).
- How they stack up: the text sits under the card, led by a question ("How often did they call the direction right?"). Avg miss: four big bullseyes, ranked, each with its number (2 by 2 on phones). ROI: a balance chart from $10,000 with each AI's balance and % on top. "Bull/bear" is now "Up or down": up and down calls in one bar per AI, with the stocks as the last row. Boldness is gone.

## 2026-10-04 (round 24)
- Season and X1: the "How we grade" icon is a small outlined i, the text beside it smaller.
- X1 Leaderboard: section 02 is "Stats". Each measure has its own colour (hit rate blue, avg miss green, ROI gold, up or down purple; a dot on each switch button), and every card is the same size (450px, 520px on phones). White stays for the standings. Avg miss: smaller, real red and white targets. The leader on Avg miss and ROI wears the standings' moving foil.
- X1 Record book: a record opens as a short news piece that grows out of the tile and rolls out line by line: masthead, kicker, headline, holder in foil, three facts, the story (what happened, how it ended or what keeps it alive, who is chasing), then the rounds.
- X1 Results lines up with the other tabs at the top. Upcoming: the count line under "The calendar" is gone.

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
