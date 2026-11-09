# W1 · Keynote

(Written by the maker and saved by the producer, because the harness doesn't let helpers write report files.)

**Brief.** At a glance, a visitor must understand who is winning, what the four AIs trade next, and when. Then they scroll to the table, the next close and the record, and follow @earningszn.

**Concept.** EZ as an Apple product page in light mode: warm white #f6f3ee and ink, one typeface (Geist), one accent at a time, one idea per screen, and very large type and numbers. The four AIs are introduced like products. Each mark is a lit, sculpted object made by Hedra (brushed steel, terracotta, violet glass, blue enamel). A sticky stage changes from the line-up to each AI as you scroll.

## Views
1. **Arrival.** "Season 1 · 99 rounds graded". The headline reads "Grok is winning. / Take-Two is next." The leader's object follows, with its P&L counting up: +$197,880, "$100K on every trade". The rest of the field sits on one line underneath. A dark band shows the countdown to the next close in the viewer's time zone, with tonight's reporters' logos.
2. **The four (sticky stage).**
   - A line-up sized by rank.
   - Caption: "Four AIs. Every earnings report. Each goes long or short before the earnings. The next close grades the trade."
   - Then each AI takes the stage: rank and lab, version, P&L, W-L, hit rate, best trade, and a computed character line ("Short on 82 of 91 trades. The smallest sizes in the field: 2.1% on average.").
3. **The table.** "Grok leads. By $81,570."
   - Season / 7 days / 24 hours, using R11's rule.
   - The cumulative P&L chart is grey except for the leader, so there is one accent. Tapping a row moves the accent to that AI.
   - Columns: W-L, hit rate, P&L, and the last five as dots.
4. **Next.** "The next close. Today, 4:00 PM." over a very large countdown.
   - What is graded at this close: Berkshire Hathaway, with its four sides.
   - Trades due before it: Take-Two, Hims & Hers, Rocket Lab, USA Rare Earth, with their side slots marked "Due".
   - Later this season, using each exchange's own close.
   - "Follow it on Hyperliquid" appears only where trades are in and a market exists.
5. **The record.** A calm grid, newest first: 8 on a phone, 18 on desktop. Each tile carries the brand tint, the logo, the move, and the winner's object with "won". A tie reads "Tie, both won"; a round no AI won reads "Nobody".
6. **One round (a sheet that slides up).**
   - The move as a giant number.
   - A stepped number line: each trade grows from 0, the close drops in, the sides turn green or red, and a gold ring marks the winner.
   - A trade table with how far off the close each trade was, and its P&L.
   - The film, where one exists, and arrows to step between rounds.
7. **Bet #1.** "NVIDIA. Nov 17." 69% of creator fees fill a pool. Trading freezes 24 hours before, and the pool goes on the top AI's trade. "The pool shrinks or can be wiped out."
8. **Footer.** Follow @earningszn, plus "Not advice, no promise of return."

URL options: `?now=` freezes the clock, `?static=1` shows every reveal, `?cap=1` with `window.R(t)` drives the walkthrough, `#round/<n>` opens a round.

## Walkthrough video (`ez/x2p-studio-w1.mp4`, 34.5 s, 1080x1920)
| Time | What it shows |
|---|---|
| 0–3.3 s | Arrival, with the P&L counting up |
| 3.3–5.1 s | The line-up |
| 6.0–13.1 s | The four AIs, each held 1.0 to 1.6 s |
| 14.1–16.1 s | The table; the chart at 16.8 s |
| 18.7 s | "7 days" is tapped |
| 21.5–24.1 s | Next close |
| 25.1 s | The record |
| 25.9 s | DraftKings is tapped |
| 26.5–29.1 s | The number line |
| 29.7 s | The trade table |
| 31.1 s | The sheet closes |
| 32.7–34.5 s | Bet #1 and Follow |

## Six checks (live terminal → W1, measured with Playwright)
1. **Comprehension:** the first screen fully answers 4 of 6 questions, against 2 on the live page.
2. **Reading load:**
   - First-screen words: 186 → 60 at 390px, 242 → 68 at 1280px.
   - Video: the arrival hold is 2.3 s, against the 3.7 s rule. Each AI's focus shot holds 1.0 to 1.6 s.
3. **Truth:** every figure is computed and was checked in node:
   - Season P&L: Grok +$197,880 (56-35), Claude +$116,310, GPT −$50,330, Kimi −$77,790.
   - 7 days: Grok +$49,400.
   - R99: −21.13%, GPT closest.
   - R72: Grok +$29,270 flat.
4. **Craft:**
   - 0 visible overlaps and 0px horizontal scroll.
   - Tiles are identical: 170x150 at 390px, 168x150 at 1280px.
   - Due cards are all 125px with identical slot offsets.
   - No white boxes, glows or emoji, and nothing over a logo.
5. **Focus:** the hero fills 42% of the first phone screen and 40% at 1280. About 22 of the video's 34.5 s cover the core story.
6. **Velocity:**
   - No manual work per round. The REPORT and Hyperliquid maps need the same hand upkeep as on the live page.
   - The page weighs about 620 KB, against about 250 KB for the live page, and loads in 0.2 to 0.4 s locally.
   - The video renders in about 2.5 min.

## Hedra
$1.15 of $3:
- one style test, $0.066;
- four objects at 2K medium, $0.12 each;
- music, $0.60.

## Decisions
- One set of four objects is used everywhere: hero, stage, avatars, trade slots, winner marks, number-line markers.
- Green and red mean money and direction only; gold marks only the winner's ring.
- The hero shows the leader, with the rest of the field right under it.
- Each stock is graded at its own exchange's close.

## Cut
Per-AI pages (the stage cards stand in for them), the sector table, Season 2 tryouts, analytics.

## Open questions for the owner
1. R102 Berkshire is shown as graded at Monday's close, by the rule. Should it wait for the sheet's date?
2. Should "next" be picked by round number or by company size? The three companies reporting at 4:05 pm have no CAPS entry.
3. Should Bet #1 stay on the landing page, or move to its own page?
4. For the 24-hour window, which rule: R11's or the live page's 1.5 days?

---

## Revision 1, after a fresh critic

The critic called this the most premium of the directions. Every figure checked out. Verdict: fix, then ship. All 11 fixes are in.

**What changed**
- **First screen:**
  - A definer line: "Four AIs trade every earnings report."
  - "Next: Take-Two, Hims & Hers, Rocket Lab and USA Rare Earth report after Mon 4:00 PM. The AIs trade before it."
  - The countdown has units ("2h 39m 54s"), in the hero and in the desktop nav.
  - The hero object is 42vw, so the band ends inside the 844px screen.
- **Stage:** cut from 560svh to 300svh. The line-up labels clear before the first card arrives. Each card keeps only the trait line and the best trade, with its logo.
- **Objects:** true-alpha WebP. No square edges or blotches.
- **Table:** the highlighted row is one rounded piece.
- **Round sheet:**
  - The marks sit on discs, so the bars stop at the mark.
  - Wording: "the only AI on the winning side" or "closest, on the correct side".
  - Trades are set in ink; money is green or red.
- **Record tiles:** neutral, with a green or red wash at the foot from the move. Logos are trimmed, wide wordmarks get a wider chip, and the ticker sits under the name.
- **Upcoming:** one line, "Trades due before 4:00 PM. Sides show here when they're in.", replaces 16 "Due" stubs.
- **24 hours:** one empty message, and the chart has a minimum height.
- **Tap targets:** at least 44px.
- **Other:**
  - Fonts load with swap.
  - The hero count-up starts at 90%, so it never shows a low number.
  - The chart has a "$0" label.
  - The table column is labelled "AI · last 5".
- **Film:**
  - The record is held for 2.5 s.
  - The line-up overlap is gone.
  - It ends on "Every trade, before the earnings." and Follow @earningszn on X.

**Checks after the revision**
- **Comprehension:** the first screen answers 5 of 6 questions; the live page answers 2.
- **Reading load:** 73 words on the first screen at 390px (live page: 186) and 80 at 1280px (live page: 242).
- **Truth:** clean.
- **Craft:**
  - 0 overlaps and 0px horizontal scroll.
  - All tiles are 170x163 at 390px and 168x163 at 1280px.
  - All "Due" cards are 81px.
- **Speed:** the page is about 850 KB, up from 620 KB, because of the alpha objects; they can drop to 600px on phones if needed. Hedra spend is $1.15.

**Open**
- Berkshire (R102) is graded at Monday's close by the rule, because the sheet has no grading date.
- "Next" lists companies in round-number order, because the 4:05 pm reporters have no CAPS entry.
