# V1 · Keynote type (resolution video)

Files:
- `index.html`: the renderer, `window.R(t)`, 1080x1350, 25 s. `?r=<n>` renders any graded round; `?t=<s>` shows one frame.
- `audio/mix.py`: the sound mix.
- `audio/v1-bed.mp3`: the Hedra music bed.
- `audio/sfx-bell.mp3`: the shared closing bell.
- Outputs: `ez/x2p-studio-v1.mp4` (25.0 s, 2.6 MB, −16 LUFS) and `ez/x2p-studio-v1-board.jpg` (8 frames).

(Written by the maker, saved by the producer: the harness does not let helpers write report files.)

## 1. Brief
In 25 seconds, sound off, the viewer should get this:
- four AIs traded Reddit before earnings;
- the trades were held to Friday's close;
- Reddit fell 29.27%;
- only Grok was short;
- Grok made +$5,269.

Then they go to earningszn.xyz for Apple and Palantir on Monday.

## 2. Concept
Type and numbers only: one typeface (Inter Display) on black, one statement per beat. The stock's move is one giant number. It goes white while the night runs, turns red on the closing bell, then travels up to become the label of the verdict.

The first frame is a cold open, which also works as the X thumbnail: "Four AIs traded / Reddit / −29.27% / Only one was short." The film then shows how it happened.

## 3. Storyboard (final timings)
| t (s) | Beat | Words on screen |
|---|---|---|
| 0–4.2 | Hook and thumbnail, with a slow push-in | Four AIs traded · Reddit · −29.27% · Only one was short. (EZ. logo small at the foot) |
| 4.5–9.6 | The trades, one line every 0.42 s | Thursday, Oct 29 · Before earnings. · ChatGPT Long · Kimi Long · Claude Long · Grok Short |
| 9.9–14.5 | One line drawn with intent (Hyperliquid 15-min closes, smoothed). The number tracks the tip; a New York clock rides under it. | Held to Friday's close. · Earnings out · Thu 4:05 PM · Open · (clock) |
| 14.5 | The bell: the line and the number turn red | Close · Fri 4:00 PM |
| 14.75–16.2 | The number alone in near silence | −29.27% · at Friday's close |
| 16.2–21.4 | The number becomes the context line; the winner's P&L counts up, the others follow quieter | Reddit at Friday's close −29.27% · Grok won. · +$5,269 · Kimi −$4,391 · Claude −$20,489 · ChatGPT −$23,416 |
| 21.65–25 | End card | EZ. logo · earningszn.xyz · Next · Apple · Palantir · Monday, Nov 2 |

Motion:
- Arrivals ease out over 0.55 s (quint) with a 28 px rise.
- Exits ease in over 0.32 s (cubic) with an 18 px lift.
- Moves ease in and out (cubic).
- Each beat has a push-in of 1.4 to 2.2%; the chart beat has none.
- The line's timing is not uniform: the plunge takes 0.85 s, the night 0.7 s, open to close 2.25 s.

Sound:
- The Hedra bed swells under the trades and the night.
- It cuts 0.3 s before the bell.
- The bell rings alone at 14.5 s, followed by about 2.5 s of quiet.
- The bed returns under the count-up and the end card.

## 4. Animatic fixes
- Added a beat with the number alone.
- Moved "Open" onto its tick.
- Smoothed the line (Catmull-Rom).
- Moved the trades down 40 px.
- Cut the verdict sub-line and the end-card tagline.
- Added a premise line to the hook.
- Fitted the tie headline and stacked its two P&Ls.
- The AI count is now computed, so 3-AI rounds no longer say "Four".

## 5. Template
**Fixed:** the timeline, type, ground, curves and sound. The bell always lands at 14.5 s; Hedra costs $0 per round.

**Computed per round:**
- company, move, trade day and close day;
- the sides, majority first;
- the hook line ("Only one was short.", "Three were long.", "All four were short.", "Three AIs traded");
- the verdict ("Grok won.", "ChatGPT and Claude won.", "Nobody won.");
- the sized P&L;
- Next: the first trade day after the close, companies ordered by `CAPS`.

**Edge cases checked:**
- ties: R76 and R4;
- nobody right: R51 and R10;
- non-US close: R79.

A round without an intraday path gets a time-only bar, with the number counting and no invented prices.

## 6. Checks against `x2p-res-one-scene-B.mp4`
1. **Comprehension:** all six questions are answered, each in its own beat. B answers them all at once and shows the sides for only 2.2 s.
2. **Reading load:** 3 to 9 words per shot, against B's 30 to 55. Three shots are short of the hold rule:
   - the hook, by 0.6 s;
   - the verdict, by 0.6 s;
   - the end card, by about 1 s.
3. **Truth:** every figure is computed. B's "Next: Sandisk · Thu Oct 29" is wrong.
4. **Craft:** 0 overlaps and 0 edge hits across 8 rounds. The empty black under the trades list may read as dead space.
5. **Focus:** the main carrier is on screen 63% of the runtime, against B's about 65%.
6. **Velocity and cost:** no manual work per round. A render takes 29 s plus about 10 s to encode; Hedra costs $0.

## Hedra
$0.60 for one music bed (`v1-bed`).

## Open questions
- Should the thumbnail show the move, or the face-off?
- The bed has not been listened to.
- "Won" means the closest trade, not the most money.
- Is 25 s too long? It could be cut to about 22 s.
- No sizes are shown, so the P&L differences between AIs on the same side are left to the FAQ. **Producer's note:** the owner later chose to keep sized P&L in the videos, and B shows the sizes; the critic should weigh this.

---

## Revision 1, after a fresh critic (verdict: fix, then ship)

The critic scored V1 against B, out of 10:

| | V1 | B |
|---|---|---|
| Comprehension | 6 | 8 |
| Reading load | 6 | 3 |
| Truth | 10 | 7 |
| Craft | 7 | 6 |
| Focus | 7 | 6 |
| Hook | 8 | 5 |

V1's main fault was that the trade sizes were missing, so the P&L looked arbitrary. The side words were also coloured green and red before the result, which told the wrong story. All 11 items are fixed.

**Copy and colour**
- Sizes are shown ("Long 8%").
- "$10,000 per 1% traded" sits under the winner's P&L.
- The side words are cream; green and red now mark money and the move only.
- The model names use the site's line colours.

**Chart beat**
- The chart gets its own fact, "−16.7% in the first hour", computed from PATHS.
- The static 0.00% is gone.
- The bell solo is 1.1 s.

**Pacing**
- No empty frames at the cuts.
- The end card reads "Next trades / Apple · Palantir / Mon, Nov 2" and holds 5 s, ending on the address.

**Identity and layout**
- On the hook, "Four AIs traded" is 60 px cream, the logo is 96 px with a cream ring, and "Reddit" is in its brand colour.
- The Open tick moved so it no longer crosses the clock.
- Every beat sits on one left grid.

**Sound**
- The bed is audible from frame 0.
- Each trade row gets a tap.
- The bed cuts at 13.29 s and the bell plays at 13.60 s, on the frame the line reaches the close.
- A coin plays when the count-up ends.

**Motion**
- Every line enters with a masked line wipe.
- The winner's P&L grows out of its row.

**Checks after revision**
- 0 overlaps and 0 empty frames on R72, R76 and R10.
- Truth is unchanged and clean.
- The dense beats now fail the hold rule:
  - hook: 1.1 s short;
  - trades block: 2 s short;
  - verdict block: 2.1 s short.
  Meeting it everywhere would take about 29 s.
- Focus is 62%.
- Render takes about 40 s per round and costs $0.
