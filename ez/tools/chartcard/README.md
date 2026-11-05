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
