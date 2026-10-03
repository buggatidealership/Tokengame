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

## Still open
- Navigation for Season Live is still to be decided.
- Share placement on Season: top right of the card in focus, plus on the card back. Owner to confirm.
- Nike (round 11) film: waiting on Hedra's re-cut.

## Rules that stand
- All numbers come from `ez/ez-data.js` (a snapshot of the owner's public sheet). Never type results by hand. When the owner says "sheet has been updated", follow `ez/SYNC.md`.
- Variant 1 (`ez/v1-binder.html`) and its media are frozen. v6 Primetime and v9 Primetime Kraft are locked in design and copy.
- Copy: no long dashes; plain sentences; tickers as "Micron (MU)" with no $ (only $EZ keeps it); no promises of price, return or buyback; "Not financial advice" once; say the pot can be wiped out. Never show the prompt column.
- Films: the site uses square crops cut from the owner's Hedra masters, scaled down only, always keeping the "$EZ / Nobody said it would be EZ" ending in frame. Nike (round 11) is being re-cut by Hedra after its outcome was corrected to -3.64% (GPT wins).

## Status
- 11 rounds graded; standings GPT 5, Kimi 3, Claude 1, Grok 0. Rounds 12 to 36 scheduled.
- GitHub push is blocked (account suspended / app access). Work is committed locally on branch `claude/bugatti-dealership-redesign-845i5j`.
