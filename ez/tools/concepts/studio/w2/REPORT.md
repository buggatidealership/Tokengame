# W2 · Matchday

**Brief.** A visitor must see on one phone screen that four AIs trade every earnings report like teams on matchday: who tops the table, what is live now and when its bell rings. Then they tap a fixture, a result or the table.

**Concept.** Every earnings report is a fixture between LONG and SHORT. The four AIs are the teams that line up on either side. The report is kickoff and the next market close is the final whistle. So the site reads like a live sports app: Today, Fixtures, Results and Table, plus a team page per AI and a match centre whose timeline is the night's P&L.

## Files
- `index.html`: the prototype.
  - Reads `../../../../ez-data.js` and `../../resolution/paths.js`.
  - Reads the `REPORT` and `HL` maps out of the live `v53-terminal.html` at load, so report times and Hyperliquid markets are never retyped.
  - Routes: `#today`, `#fixtures`, `#results`, `#table`, `#team/<MODEL>`, `#match/<n>`.
  - `?now=<ISO>` freezes the clock. `?r=1` is film mode (`window.R(t)` drives the clock and every CSS animation). `&walk=1` loads `walk.js`.
- `walk.js`: the scripted walk-through (scrolls and taps on a timeline). `render-w2.js` renders it at 390x693 CSS px, DPR 2.77, 1080x1920.
- `BRIEF-W2.md`: stage 1 and 2 notes.
- Outputs:
  - `ez/x2p-studio-w2-390.png`: Today, Fixtures, Table, the Grok team page, the R99 match, Results.
  - `ez/x2p-studio-w2-1280.png`: Today, Table, the R72 match, the Claude team page.
  - `ez/x2p-studio-w2.mp4`: 30.8 s, 1080x1920, music m4-chill plus four taps, loudnorm −16.
- All shots use a frozen moment: Mon Nov 9 2026 18:42 UTC, viewer in Berlin (GMT+1). Without `?now` the page runs on the real clock.

## Decisions
- **Today, the landing page**, top to bottom:
  - The scorebug: NEXT BELL with a countdown to the close that grades the live round, the exchange, and the close in the viewer's time.
  - A session rail from the open to the close, with a playhead at now: the match clock.
  - The table strip: four equal chips with the P&L, in team colours.
  - LIVE NOW, the match card:
    - LONG and SHORT are the two sides; each AI's mark lines up on its side with its size.
    - The "2 v 2" split is the score until full time.
  - TONIGHT: kickoff rows in the viewer's zone, with the line-up window, full time and an HL link.
  - LAST MATCHDAY: final scores.
    - The move is the score.
    - Lit marks are the AIs on the right side, dimmed marks those on the wrong side.
    - A crown marks the closest trade.
  - Desktop: the scorebug runs full width; the live card and Tonight sit on the left, the table and results on the right.
- **Live states carry the energy, never decoration:**
  - LIVE: a red pill with a blinking dot; the bottom tab shows a live count.
  - RESULT DUE after the bell, until the sheet updates.
  - FT on results.
  - KO in the viewer's zone.
  - A matchweek bar in the header: S1 · Wk 10 of 11, ending with NVIDIA.
- **The match centre:**
  - The match card at full time: the winning side's label is filled, the losing side dimmed, the closest trade crowned.
  - **Match timeline:** the P&L on $100K from the report (KO) through the market open to the close (FT). Under the flat rule all AIs on one side share one line, so a shared line is striped in its AIs' colours.
  - "Player of the match" = the closest trade, worded so because the table ranks by P&L.
  - Line-ups: side and size, right or wrong side, "off by", P&L.
  - The round film, where one exists, as Highlights.
  - Rounds without an intraday path (all but 72, 73, 75, 99) show the full-time panel without the timeline.
- **The table:**
  - Columns W-L, Hit and P&L, with form chips (W/L) under each name.
  - League zones: a gold stripe for top of the table (it picks the side of Bet #1, with "The pool can be wiped out."); a red stripe for relegation under a 50% hit rate (DeepSeek and Qwen in tryouts).
  - A Season 1 / Last 7 days switch. Desktop adds the 7-day P&L and the best trade.
  - "The race": every AI's season P&L after every round.
- **The team page:**
  - The founder loop is the team photo behind the mark.
  - Position and the gap to #1.
  - The P&L counts up.
  - A season chart with the other teams faint.
  - Form over the last 10, the best and worst trade, recent matches.
- **One face, Archivo, at variable widths:**
  - Condensed widths for the broadcast type, normal widths for the body.
  - Team colours = the site's line colours.
  - Green and red only for up/down and long/short, always with a word beside them.
- **Copy:**
  - "trade", "long", "short", "line-ups", "kickoff", "full time".
  - No "call" or "prediction" in new copy.
  - No coin flip.

## Storyboard of the walk-through (s)
| t | Shot | Key words |
|---|---|---|
| 0–2.4 | Today arrives: scorebug ticking, table strip, live card | NEXT BELL 02:17:59 · Grok +$198K · LIVE |
| 2.4–4 | Scroll to Live now | LONG 2 v 2 SHORT · Final whistle 10:00 PM |
| 4.6–6.2 | Scroll to Tonight | 10:05 PM GMT+1 · Take-Two |
| 7–8.6 | Scroll to Last matchday | DraftKings FT −21.13% |
| 9.1–9.6 | Tap DraftKings | touch ring |
| 9.6–11.8 | Match header; timeline wipes in | FT −21.13% · SHORT ×3 +$21.1K |
| 11.8–15.6 | Timeline, then Player of the match and Line-ups | Closest trade ChatGPT |
| 16.8 | Tap Table | gold and red zones |
| 18.6 | Tap Grok | GROK 1st · count-up +$197,880 |
| 20.6–22 | Season chart | +$198K |
| 23.8 | Tap Fixtures | Kickoff is the earnings report, in your time |
| 25.6–30.8 | Scroll the days to NVIDIA | Tuesday Nov 17 · NVIDIA 10:20 PM |

- The animatic was checked at 2 fps before the final render at 30 fps.
- Each tap's ring shows 0.5 s before the screen changes.

## The six checks (against the live terminal `v53-terminal.html`, 390 x 844)
1. **Comprehension.** Six questions:
   - who is winning;
   - what is live;
   - when the bell rings;
   - each AI's side on the live round;
   - what kicks off tonight in my time;
   - how last night finished.

   Answered:
   - On the first screen: W2 4 of 6; live site 1 of 6 (its leaderboard only; the In Play pill shows just a logo).
   - Within two scrolls: W2 6 of 6; live site 2 of 6 (the rest needs the Upcoming tab).
2. **Reading load.**
   - Words on the landing page: 172 against 360.
   - One name, one status line and one number per row.
   - In the film, every shot holds 1.6 s or more, with 2 to 5 key words.
3. **Truth.**
   - Every figure is computed from `ROUNDS` and `PENDING` with the flat $100K rule.
   - It matches the live terminal: Grok +$197,880, 56-35, 62%; Claude +$116,310.
   - R99 and R72 come from the sheet: numbers, sides, sizes, "off by" figures and winners. Ties crown both.
   - Each timeline ends exactly on the sheet's move (the path is scaled with `kk`, as in `oneB.html`).
   - Report times and HL markets are read from the terminal, not typed.
   - Berkshire's bell is estimated: the sheet has no resolve date, so it is the next weekday close after the call, as the terminal does.
4. **Craft.**
   - A QA script at 320, 390 and 1280 on 10 views: horizontal scroll 0 and text overlaps 0 at all three widths.
   - Siblings are equal heights within 1px (the 1px is the first row's missing top border): `.fr`, `.rr`, `.tc`, `.lt-r`, `.lr`.
   - Ellipsis only on two long names at 320 (Novo Nordisk, McDonald's).
   - No emoji (the crown is drawn SVG); nothing on a logo; no sunbursts or glows.
5. **Focus.**
   - The phone's first screen is the scorebug, the table strip and the live card: about 55% of the area under the header is the story's carrier ("what's on now, who leads").
   - The live site's first screen is one leaderboard table.
6. **Velocity and cost.**
   - Zero manual work per round: everything derives from `ez-data.js` plus the terminal's existing hand-kept `REPORT`/`HL` maps.
   - A per-round match timeline needs one Hyperliquid candle fetch (only 4 rounds have paths today); this is scriptable at no cost.
   - Weight and speed: landing weight 423 KB against 264 KB (logos, Archivo, paths); DOM 403 nodes against 529; local load about 0.5 s for both.
   - The film renders in about 2 min. Hedra spend: **$0**.

## Cut, and why
- **Hedra: $0 of $2 spent.** The direction says the energy comes from live states, never from decoration. A painted stadium or texture would be exactly that decoration, and the founder loops already give each team page its picture.
- **A live intraday score.** No live price feed is wired, so the live card shows the line-up split ("2 v 2") and the scorebug carries the clock. A live Hyperliquid mid per HL ticker could make the card's centre a real running P&L.
- **The desktop scorebug** has an empty middle at 1280. It could hold tonight's kickoffs as a ticker.
- **Season 2 fixtures and the buyback page.** Bet #1 appears only once, as the table's gold zone, with its guardrail.
- **Upcoming fixture rows don't open a page:** there is nothing to show until the line-ups land. Live and graded rounds open their match centre.

## Open questions for the owner
1. Does "Player of the match" read right for the closest trade, next to a P&L table where the same side always makes the same money?
2. In the live card, should the score be the line-up split or a running P&L from a live price? The running P&L works only where a Hyperliquid market exists.
3. Zones: is relegation under 50% hit rate still the rule? Should the gold zone say "Golden ticket"?
4. Kickoff times are the terminal's estimates (`est:1`). Should estimated times carry a "~"?
5. Should the site land on Today every day, or on the Table on days with nothing live (weekends)?
