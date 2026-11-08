# The resolution video: brief and gap list (draft, 2026-11-08)

The short film posted on X after each round is graded. One template, filled automatically for every round.


## Decisions (owner, 2026-11-08, later)
- **Goal:** a site visit. No token or buyback talk in these videos for now.
- **Sides only:** LONG or SHORT, no sizes. Under the flat $100K rule, everyone on the right side makes the same money.
- **Beats:**
  1. The face-off: "<Company> earnings, locked before the report", the four AIs on their sides, "Who called it?"
  2. The answer: the move at the close.
  3. The verdict: "Grok, alone. +$29,270 on the call."
  4. End card: "Check the standings. earningszn.xyz". There is no season line and no next round.
- **No coin flip anywhere.**
- **Models as the main characters:** big brand-mark medallions, not small rows. Four layouts are in `x2p-resolution-faceoff.jpg`. **Picked: D3 cards**, staged diegetically on the site's own ground: green light above, black, a red glow on a glossy floor, with the EZ. brand top left. The cards stand on that stage and are lit by it (`x2p-resolution-d3-stage.jpg`, `tools/concepts/resolution/cards.html`).

## 1. Goal
- **Primary:** a follow. The viewer should feel there is a scoreboard worth checking tomorrow.
- **Secondary:** a visit to earningszn.xyz/r/<n>.
- **Measured by:** follows per 1,000 views, and completion rate, in X analytics.

## 2. Who watches
Crypto and finance people on X, scrolling with the sound off. They decide in 1 to 2 seconds whether to stop.

## 3. The one thing to understand
**"<Company> moved <X%>. <AI> called it and made <$>. The others didn't."**

Everything else is secondary: who leads the season now, and what's next.

## 4. What it is not
- Not a chart lesson.
- Not a UI tour; the launch video does that.
- Not a recap of all four reasons.

## 5. The look (art)
- **Same as the launch video (v5 A):** dark, matte, calm, lots of space, crisp type, a few elements at a time.
- **Painted ground:** one Hedra-painted plate per video, behind crisp live data. Words and numbers are never painted into the art.
- **Three directions to pick from** (`x2p-resolution-styles.jpg`):
  - **A, company world:** a scene painted for each company, e.g. Reddit's orange planet over a night city, DraftKings' stadium in fog. It's different every round, so it's the most interesting to scroll past, and costs about $0.04 per round. Risk: the scene has to stay clear of the rows. The prompt asks for the subject in the middle band.
  - **B, brand silk:** an abstract painted backdrop in the company's own colour, read from its logo. The most consistent "series" look. Nearly free once there's one plate per colour.
  - **C, the studio:** the launch video's set, the same every time. The strongest brand link, but the least variety.
- **My pick: A.** Each round looks like an episode, while the layout and type stay identical, so it still reads as one series.

## 6. The motion (animation)
- One idea per beat. Slow camera drift on the plate. Numbers count, rows light up or dim.
- None of: rings, bursts, shaking, fake 3D phones.
- Sound: a short trailer sting from the launch video's score, plus a fixed set of effects (bell at the close, a hit on the verdict).

## 7. The beats (about 12 s, 4:5)

| Time | Beat | What it shows |
|---|---|---|
| 0–2.5 s | The calls | Logo and company, "4 AIs called it. 3 long · 1 short." The four calls in the sheet's order, each marked "locked". |
| 2.5–5.5 s | The answer | The move counts up big: "−29.27% at the close". Where a Hyperliquid market exists, the stock's line runs faintly behind it. |
| 5.5–8.5 s | The verdict | The rows re-sort. The winner gets a gold edge and its +$, wrong calls dim in red. "1 of 4 called it." |
| 8.5–11 s | The season | One line: "Grok leads the season: +$93,930 (lead $59,450)", with the rank change if there is one. |
| 11–12.5 s | Next | "Next: <company logo> <day>", plus @earningszn · earningszn.xyz/r/<n>. |

**Cases it must handle:**
- nobody right ("0 of 4. The market wins.");
- all four right;
- a tie for closest;
- no Hyperliquid market (no line);
- a non-US exchange (its own close).

## 8. Data per round
- From the sheet: the calls, the move, the winner.
- Computed: P&L ($100K flat), season standings.
- The next round's company and day.
- Optional: Hyperliquid candles.
- The plate: one Hedra image.

## 9. Pipeline gap list (you asked: close → result → video → sheet → Grok, within 30 minutes)

| Step | Status | What's needed |
|---|---|---|
| Read the sheet | ✅ Works today (public CSV, hourly check) | Nothing. |
| **Write the closing move into the sheet** | ❌ I can only read it | Easiest: a small Google Apps Script added to the sheet. I write it; you paste it in once and deploy it as a web app with a secret key. I then write cells through it. The key goes into this environment through a secure form; I never see it. |
| **Closing price: TradingView** | ❌ No permitted way | TradingView has no public data API. My automated attempt was refused as getting around a bot check, and I won't scrape it. Options: a licensed price API with a key (e.g. Polygon, Finnhub, Financial Modeling Prep; free or cheap tiers exist, prices to confirm) as the automatic source, with TradingView as your spot-check. |
| **Yahoo as fallback** | ⚠ Rate-limited from here (429) | The same licensed API covers this. |
| **Render the video** | ✅ Works here (about 2 minutes per video) | The template, once you've picked a look. |
| **Upload and link** | ✅ Can do | Host on earningszn.xyz/media/res/r<n>.mp4 (Cloudflare, as today), and write that link into a new `RESOLUTION VIDEO` column. |
| **Run on a schedule** | ✅ Possible | A scheduled task every weekday at 21:05 UTC for the New York close (other exchanges at their own closes). Grading at the close and the 30-minute target both fit. |
| **Grok posts it** | ❓ Unverified | You say Grok can read the sheet. Can it post a video from a link to X, on a schedule, with no one there? Please test that once by hand. If it can't, the other route is the X API from here (paid, and needs your account's keys). |
| **The sheet stays the truth** | ⚠ Rule change | Until now the sheet is yours, and the site follows it. Writing the move myself makes me a source. I'd write it into a separate `CLOSE (AUTO)` column with its source and time, and you or the sheet decide the final `RESULT`. Or you allow direct writes. Your call. |

## 10. Questions only you can answer
1. Look: A, B or C?
2. Price source: OK to use a licensed API automatically, with TradingView as your manual check?
