# Chart card: a round's outcome as a chart video (mockup v2, 2026-11-05)

Owner, 2026-11-05: round films cost $4 to $15 each; X runs on charts, so the outcome becomes the
round's own chart: the stock into the report, the four calls as target lines, "Earnings in 3, 2, 1",
the report lands, the candles run to the close, graded (winner gold, right/wrong, % off, P&L on $100K).

    node make.js <round> <A|B> <out.mp4> [hlCoin]      # A candles, B line; 1080x1350 (4:5), 15 s, 30 fps, with sound; writes <out>.txt (the post)
    STILLS="4,9,14.8" node make.js 85 A out.png        # stills instead of a video

- Price path: Hyperliquid hourly candles of the company's HIP-3 market (`xyz:<TICKER>` by default; free, no key).
  Only companies with a Hyperliquid market (about 30 of the first 80 graded) can be drawn today.
- The close is the sheet's: the path after the report is eased onto the sheet's move; the script stops if
  Hyperliquid's own move differs from the sheet by more than 1.5 points.
- Report time: after the close on the call date when the round grades the next day, else about 7am New York.
- Renders in about 10 s per round. Boards: `ez/x2p-chartcard-*.mp4`.

v2 (from `ez/x-chart-video-research.md`): 4:5 portrait (X's push to portrait, Feb 2026), 15 s (X's ranking only counts
video views over 10 s), frame 0 is a complete still with no result (the first frame is the thumbnail), the four AIs
live on their target lines, a 1.5 s countdown, "Closest right now" moves between the AIs as the price runs (suspense
by a gradual reveal), graded at the close, then an end card with every AI's round P&L, the season standings with rank
changes, and the next round. Text 28 px or more at 1080 wide. Boards: `ez/x2p-chartcard2-*.mp4` (v1: `x2p-chartcard-*`).

## v3 cast (`C`) and v4 chalk set (`K`), 5 Nov 2026
- `C`: the live site's cast loops (`media/h49-cast-<m>-c.webm`) carry the round: each AI steps forward with its call, LOCKED, 3-2-1, the race, the winner's portrait, the end card. No new cost.
- `K`: a painted set made once with Hedra (`set/chalk.jpg`, gpt-image-2 high 2K 3:4 with `media/h48-chalk.jpg` as the style reference, $0.28; `set/screen.jpg` is a second take, $0.28). Blank board, four brass frames, four plaques; measured slots in `render-chalk.html` (BD, FR, FY, PY). The cast loops play in the frames; non-data strokes (target and reference lines, LOCKED, the countdown, EARNINGS!) are chalk; every number, name and candle is drawn crisp, because hand-drawn fonts and cartoon-style bars lower a chart's credibility (Song, Cho, Bearfield & Stasko, IEEE TVCG, Jan 2026). Research: `ez/x-template-research.md`. `set/raw/` holds the 2K PNGs (not committed).

## v5 sets (`S:<set>`), 5 Nov 2026: the round as each AI's P&L
Owner, 5 Nov: slow the first move down "so people can actually see how crazy the moves are"; logos, not faces ("people relate more to the logos"); environments "geared towards the degeneracy that markets have become"; then "PNL chart we want to see. Not the stock chart. The round should show the individual pnl of the round at the end of each model's chart."

    node make.js 78 S:casino out.mp4      # S:casino | S:slot | S:sportsbook | S:den   (set/sets.json)

- Four sets painted once with Hedra (gpt-image-2, 3:4 2K high, about $0.28 each, $1.10 in all): `set/img/set-casino.jpg` (brush-and-ink casino table, `media/bet-vault-h2.jpg` as the style reference), `set-slot.jpg` (gouache jackpot machine, `media/h48-screen.jpg`), `set-sportsbook.jpg` (1980s airbrushed Vegas sportsbook), `set-den.jpg` (anime 3 a.m. trader's battlestation). Each has a blank screen, four blank discs and four blank plates; nothing painted carries a word, number, logo or person. Geometry measured in `set/sets.json` (flood fill on the discs and plates). The prompts are in `set/jobs.jsonl`.
- `render-set.html`: the screen is one chart (owner: "all of them on one chart", after a first take with four panels): every AI's P&L through the night on $100K (the site's flat rule: $100K x direction x the move since the close before), the ground green above $0 and red below, rules at round dollar steps; AIs on the same side earn the same P&L, so a shared path is one line striped in each AI's colour; each AI's called P&L (SHORT 6% = +$6,000) is a dashed tick at the right edge with its logo; at each line's end the logos, the names and the round P&L; the y-scale pulls back as the move breaks out. Each AI's logo sits on its disc (app-icon colours on dark discs, printed in ink on light ones, lit on the neon rings), its trade on the plate.
- The first hour after the report plays in slow motion (3.4 s) from Hyperliquid's own finer candles (`make.js`: 1m while Hyperliquid still keeps them, about 3 days; 5m for about 17 days; 15m for about 52; else open, extreme, close), with the New York clock under the move; then the rest of the night runs in 3 s while the view widens. The fine path must land on the hourly close (0.4%) or it is dropped.
- Then the close, the winner (closest right call, crowned), and the result card with every AI's round P&L and the season.
