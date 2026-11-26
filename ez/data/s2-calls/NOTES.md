# Season 2 calls log: notes

`calls.csv` holds one row per AI per trade (built by `build.py`; edit that, then run it). Outcome columns (`move_pct`, `right`, `pnl_usd`) come from `MOVES` in `build.py`, which holds each graded round's close-to-close move from the sheet.

## Close of Friday 20 November 2026 (Season 2 trades 1 to 3)

All three moves come from the sheet. TradingView's 15-minute-delayed read at 21:15 UTC was within 0.2 points of each.

| Round | Company | Move | Right side | Right |
|---|---|---|---|---|
| 113 | Intuit (INTU) | −12.79% | SHORT | Claude, Grok |
| 114 | Keysight (KEYS) | −7.07% | SHORT | Grok, Gemini |
| 115 | Elastic (ESTC) | −2.20% | SHORT | Qwen |

All three closed down.

- Of the 15 calls, 10 were long and all 10 were wrong; the 5 shorts were all right.

P&L at $100K a trade: Grok +$17,660 (3 trades, 2 right), Claude +$3,520 (1 right), Gemini −$7,920 (1 right), Qwen −$17,660 (1 right), GPT −$22,060 (0 right).

**Confidence and outcome:**
- The 5 right calls carried a stated confidence of 58.8% on average; the 10 wrong calls, 57.1%.
- Fifteen calls from three companies on one down day are far too few to say anything about calibration. Most of the spread is one shared fact (all three fell), not five independent judgements.
- Revisit this after at least 50 graded calls across different days.
