# EZ experiment (v31 to v35): the fixed content

The content is the only fixed thing. Every stat, number and claim below must appear, exactly as written (copy) or exactly as
computed (numbers). How it is presented and in what order is free. Numbers are never typed by hand: load `ez-data.js` then
`ez-story.js` and read them from `EZS` (and the globals `ROUNDS`, `PENDING`, `UPCOMING`, `MODELS`, `CONFIG`, `SIM`, `FILMS`,
`CO_LOGOS`, `callOf`, `logo`, `coMark`, `fmtDate`, `MEDIA`). Check numbers in a browser console against this file.

Hard copy rules: no long dashes anywhere. Plain, direct sentences. Companies as "Nike (NKE)" (`EZS.co(r)`); only $EZ keeps a $.
"Not financial advice" appears once. Never show or invent the AIs' prompts. No promises of price, return, payout or buyback size.
Never write that a buyback has happened or name a contract address (none exists yet).

## 1. What this is (brand + thesis)
- Name: **Earnings Zeason** (with a Z), **Zeason one**, ticker **$EZ** (mark: gold $, green E, red Z on a dark tile).
- Motto: **Nobody said it would be EZ**
- Headline: **We're teaching AIs to bet. The market grades them.**
- Line: **Before a company reports earnings, four AI models call how its stock will react: up or down, and by how much.**
  (the count comes from the data: `EZS.word(EZS.models.length)`)
- Footer line: **$EZ · Earnings Zeason, with a Z** / **Calls filed before the print · Graded by the market · Never edited**

## 2. How we grade (the four rules) `EZS.rules`
1. Direction first. Did the AI call up or down correctly? Wrong way, it's out.
2. Then size. Of the AIs that got the direction right, the one closest to the real move wins the round.
3. Nobody right, nobody wins. If every AI gets the direction wrong, the round has no winner.
4. Ties. Equal wins are split by who was closer on average.

## 3. Standings `EZS.rows` (ranked by rounds won, then by the smaller average miss)
Per AI: rank, logo (`logo(m)`), name (`EZS.nm(m)`), model in play (`EZS.ver(m)`: GPT-6 Astra, Kimi K3, Fable 5.1, Grok 4.7),
**hit rate** (% right on direction, "7 of 11"), **avg miss** (points off the real move), **ROI** ($100,000 rolled through every
call: `bal` and `roi`), **wins**, last 5 (`EZS.form(m,5)`: w won, g right way, r wrong way, n no call).
- Note: Hit rate: calls right on direction. Avg miss: points off the real move. ROI: $100,000 rolled through every call. Simulated, before fees.
- Grok joined later (`EZS.first.GROK`, round 9): say "2 of 3 right" for Grok, never compare its % without the count.

## 4. The last round and the record (every graded round) `ROUNDS`, `EZS.last`
- Each round: Round N · Company (TICKER), calls filed date (`r.called`), graded date (`r.resolves`), the four calls ("DOWN 3%",
  `EZS.callTxt(c)` gives "▼ 3%"), the outcome (`r.out`, `EZS.outTxt(r)`), winner (`EZS.winners(r)`) or **No winner**,
  each call's distance in points (`c[2]`). Films: `MEDIA + r.film + ".webm/.mp4"`, poster `MEDIA + r.poster + ".jpg"` (every graded round has one).
- Record line: **Every prediction, on the record.** / **Graded at the first market close after earnings. The AIs get TradingView's closing price, so they can't make shit up.**

## 5. Live and next `EZS.live`, `EZS.next`, `EZS.upcoming(k)`, `EZS.total`
- Round 12 · Foxconn (2317.TW): **the calls are in** (GPT ▲1.5%, Kimi ▲1.75%, Claude ▲1.2%, Grok ▲2.5%), graded at the market
  close on Oct 6 (`EZS.closeAt(P.resolves,P.ticker)`, `EZS.left(t)` for a countdown; Taipei closes 05:30 UTC).
- Then the upcoming rounds (company, round number, calls date). Season: round 12 of 120 (`EZS.total`).
- Line: **Calls the day before, the grade after the market answers.**

## 6. Are they learning? (the test)
- Lede: **You don't have to trust us. See for yourself.**
- Hit rate over time: `EZS.hitPath[m]` (cumulative % after each round). Question: **How often were they right about the stock's direction?** Only up or down counts here, not the size.
- How close: `EZS.shots[m]` (each call: value, distance, right way or not, won). Copy: **How close did they get? The bullseye is what the stock did. Each dot is one call. A red dot outside missed the direction. The closer to the bullseye, the better.**
- Would copying them have paid you? **Each AI starts with $100,000 and goes all in on every call.** Values: `EZS.follow` (GPT $110,397, +10.4%, etc; `EZS.usd`, `EZS.pct`). Note: **Simulated, before fees. Buy on an up call, short on a down call. In before the report, out at the next close.**

## 7. Unusual findings `EZS.findings` (headline, explanation, numbers, sample size; each needs at least 5 cases)
Show headline first, then the explanation, then the numbers. Say small samples change with every round. Not advice.
Includes the joke card **Inverse Claude** (only ever framed as a joke).

## 8. Record holders `EZS.records`
- Longest winning streak: GPT, 3 in a row (AutoZone, General Mills, BlackBerry)
- Closest call: GPT, 0.64 points off (Nike)
- Biggest miss: Claude, 22.02 points off (Accenture)
## 8b. Highlights `EZS.highlights` (optional, from Results)
Closest call (0.64 pts, about 11x closer than the average call: round x to the nearest whole number when 10 or more), Tightest race
(General Mills, 2.65 points off on average; a usual round is 6.6), Biggest move (Accenture +16.02%, 3.1x the average move), Everyone was wrong (Costco; 3 of 11 rounds had no winner).

## 9. The buyback (where the money goes)
- Title: **An AI with one goal: buy back $EZ**
- **Every $EZ trade pays a fee**
- **69%** (`EZS.pot`) **The pot**: **The model on top of the leaderboard takes the pot and bets it on NVIDIA's earnings at 10x leverage on Hyperliquid.** (`EZS.lev`)
  - **Winning trade**: The profits buy back $EZ.
  - **Losing trade**: The pot shrinks.
  - **Next round**: The pot rides on the next call.
- **31%** (`EZS.ops`) **Operations**: Keeps the project running, then pays for what's next: `EZS.steps` (More models, now: Max plans on each AI's newest model. Gemini and Qwen are next, then Mistral and NVIDIA's Nemotron. / The pipeline runs itself: Calls, films and site updates run on their own. A human signs off. / The AI places its own bet: No human in between.)
- **How big could it get?** (Estimated). Pick a market cap (`EZS.MCAPS`: $1M, $10M, $100M, $500M, $1B via `EZS.money`) and leverage (`EZS.LEVS` 2x, 5x, 10x).
  Show the pot (`EZS.calc(mcap,lev).bet`) and **If the AI is right, it buys back ~$X of $EZ** (`.buyback`, written "~" + `EZS.money`). **If it's wrong, the pot drains.** Fine print: `EZS.calcFine`.
- **The pot can be wiped out.** (must appear)

## 10. Get $EZ
1. Check the address: **Not posted yet. It appears here, and only here, at launch.**
2. Use this page's link: **Only through the link on this page.** Button: **Opens at launch** (disabled until `CONFIG.buyUrl`).
3. Watch the next print: **Calls the day before, the grade after the market answers.**
- Follow on X: link from `CONFIG.x` (empty for now: show the button as "Follow on X (link at launch)").
- Disclaimer (once): **$EZ is a memecoin. Nothing here is financial advice or a promise of value, return or payout.**
