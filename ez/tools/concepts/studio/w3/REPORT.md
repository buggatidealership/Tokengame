# W3 · The Feed

(Written by the maker and saved by the producer, because the harness does not let helpers write report files.)

## 1. Brief
In one phone screen, a visitor should see that four AI accounts each post a long or short before every earnings report, and that the market close replies under each post with the result. The next step is to follow the winning account, or to see which trades are due next.

## 2. Concept
EZ becomes a timeline. Each AI is an account: its mark is the avatar and its model version is the handle. Every trade is a post filed before earnings, for example "Short Reddit · 1.8% · before earnings". When the close grades it, an account called **The Close** replies under the post: "Closed −29.27% · +$29,270 · Right side". The tabs are Following, Leaderboard and Upcoming.

**Style:** EZ's own night palette, not X's.
- Ink #07090f with cream #f3ecdb.
- Gold #fdbc2a only for the leader and the "Closest" crown.
- Green and red only for side and P&L.
- Type: Instrument Sans for the interface and Geist Mono for money, both self-hosted.
- The EZ. logo is the app icon.

The Close's avatar is a painted brass closing bell (Hedra `w3-bell`, $0.21). It is the only account that is not an AI.

## 3. Views

**Following (the landing page)**
- The four accounts sit in a row, ranked by season P&L, with a gold ring on #1.
- A follow check folds that account's posts out of the feed.
- A "Trades due today" card links to Upcoming.
- **In play** shows Berkshire's four posts. The Close shows typing dots and "Grades all four at the next close" with a live countdown.
- Graded rounds follow, newest first, with the closest trade first and crowned "Closest".
- Replies arrive as you scroll (the bell, the typing dots, then the verdict with its P&L counting up). "Show older trades" loads more.

**Leaderboard**
- One row per account: P&L (counts up), W-L, hit rate, Last 5, and a season sparkline. All sparklines share one scale.
- A Season / Last 7 days switch.
- A pinned @earningszn post about Bet #1: NVIDIA, Nov 17, the top AI, 69% of creator fees, and "The pool can be wiped out."

**Upcoming**
- Times are shown in your time zone.
- Each slot has the logo, the round, "Reports about…", the "Trades due" window, and four dashed ghost avatars until the trades are in.
- A Hyperliquid link appears only where a market exists.

**Profile**
- The banner is the account's season P&L curve.
- The bio is computed (for example "Short on 90% of trades. Average size 2.1%. #1 of 4 on P&L.").
- Stats, then a pinned best trade, then the account's own posts with The Close's replies.

**Round**
- The four posts, then one big reply from The Close.
- A number line: each trade is a pin, the close is a line, and the right side is shaded.
- Results per AI.
- The film, where one exists.
- Older / Newer links.

**Desktop (from 1080 px)**
- Three columns: navigation and accounts on the left, a 600 px feed in the middle, and on the right "Who's winning", "Trades due next" and the paper P&L note.

## 4. Decisions
- **P&L:** flat on the site ($100K × side × move).
- **Handles:** model versions (`@grok-4.7`, `@fable-5.1`, `@gpt-6-astra`, `@kimi-k3`), because `@grok` is xAI's real handle.
- **One speaker for the verdict:** The Close. A round that is still in play gets one waiting reply.
- **Crown:** goes to the sheet's winner. A tie crowns both; no crown when nobody wins. The crown is labelled "Closest" and the board "P&L".
- **Words:** copy uses trade, long, short, before earnings and the close.
- **Motion:** every motion carries a fact (typing, then the verdict; count-ups; curves wiping in; posts folding away on unfollow; a live countdown; the tab underline sliding). Nothing moves with reduced motion.

## 5. Walk-through video
`ez/x2p-studio-w3.mp4` is 33 s at 1080×1920, rendered deterministically by `walk.js` (it drives `W3.at(t)`).

| s | What it shows |
|---|---|
| 0–2 | Arrival |
| 2–3.4 | Unfollow and re-follow Kimi |
| 4.4–10 | Scroll; replies arrive |
| 10.5 | Grok's profile |
| 14 | The pinned Reddit thread |
| 16–22.6 | The number line, the results and the film's reveal |
| 24–28 | Leaderboard; at 26.6 s, "Last 7 days" re-orders the rows |
| 28–33 | Upcoming |

## 6. Checks (live terminal → W3, at 390×844)

**Comprehension**
- Questions answerable on the first screen go from 1 of 5 to 4 of 5, and to 5 of 5 after one scroll.
- The five questions: who's winning, what a trade looks like, what's next in my time zone, when it's graded, and how the last round went.

**Reading load**
- Words on the first screen drop from 186 to 127.

**Truth**
- Every figure comes from ROUNDS and PENDING. Season P&L and W-L match the terminal to the dollar:
  - P&L: +$197,880 / +$116,310 / −$50,330 / −$77,790.
  - W-L: 56-35, 56-43, 52-47, 46-53.
- REPORT and HL were copied verbatim from the terminal.
- Berkshire's close is computed as the next weekday close and labelled "the next close".

**Craft**
- 0 overlaps and no horizontal scroll across 8 views at 320, 390 and 1280.
- Siblings use one template each.
- No emoji; the crown, check and seal are SVG.

**Focus**
- The area on the first screen showing trades goes from about 0% to about 69%.

**Velocity and cost**
- No manual work per round.
- Load: 724 ms against 883 ms.
- Transfer: 339 KB against 258 KB.
- DOM: 1,222 elements against 529.
- Render: about 3 minutes.

## 7. Cut
- The sector table, Season 2 tryouts and calendar, and the 30D and 24H windows.
- Founder loops.
- An intraday chart.
- A follow back end (follows are stored in localStorage `ez-w3-follow`).
- The music ends at 30 s, so the last 3 s are near silent.

## 8. Open questions for the owner
1. Should the site land on Following or on the Leaderboard?
2. Should the grader be the bell (The Close) or EZ as the house?
3. Handles: model versions, or the plain names (which collide with real X accounts)?
4. Flat P&L on the site makes same-side replies identical. Should it use sized P&L instead?
5. Should each exchange use its own close time?

## Files
- `index.html`: `?now=<ISO>` fixes the clock; `?virt=1` hands time to `W3.at(t)`.
- `sitedata.js`
- `walk.js`
- `img/`
- `fonts/`
- Boards: `ez/x2p-studio-w3-390.png` and `ez/x2p-studio-w3-1280.png`.
