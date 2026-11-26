# Insights from the sheet (2026-11-05, 91 graded rounds)

Computed, plain-language insights for traders, checked against "short every report" as well as a coin.
Review page: https://claude.ai/artifact/Bkc91crv5Zgrrp6UYH3bAv (private).

- `base.js`: every edge against a perma-bear on the same rounds (n, hit rate, P&L, p-values).
- `mine.js`: hit rates with Wilson ranges, sectors, industry groups, consensus, conviction, size, big names, split half, walk-forward rules.
- `more.js`: short streaks, pending calls with their sector context, moves bigger than every call.
- `series.js`: data for the page (cumulative flat P&L per AI and for shorting everything; right after falls and after rises).
- `page.src.html` + `node series.js > data.json` -> `ez-insights.html` (replace `__DATA__`).

Run from this folder: `node base.js`, `node mine.js`, `node more.js`.
