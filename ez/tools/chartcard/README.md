# Chart card: a round's outcome as a chart video (mockup, 2026-11-05)

Owner, 2026-11-05: round films cost $4 to $15 each; X runs on charts, so the outcome becomes the
round's own chart: the stock into the report, the four calls as target lines, "Earnings in 3, 2, 1",
the report lands, the candles run to the close, graded (winner gold, right/wrong, % off, P&L on $100K).

    node make.js <round> <A|B> <out.mp4> [hlCoin]      # A candles, B line; 1080x1080, 15 s, 30 fps, with sound
    STILLS="4,9,14.8" node make.js 85 A out.png        # stills instead of a video

- Price path: Hyperliquid hourly candles of the company's HIP-3 market (`xyz:<TICKER>` by default; free, no key).
  Only companies with a Hyperliquid market (about 30 of the first 80 graded) can be drawn today.
- The close is the sheet's: the path after the report is eased onto the sheet's move; the script stops if
  Hyperliquid's own move differs from the sheet by more than 1.5 points.
- Report time: after the close on the call date when the round grades the next day, else about 7am New York.
- Renders in about 10 s per round. Boards: `ez/x2p-chartcard-*.mp4`.
