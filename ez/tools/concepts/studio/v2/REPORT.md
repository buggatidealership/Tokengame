# V2 · Broadcast: report

(Written by the maker, saved by the producer: the harness doesn't let helpers write report files.)

## Concept
An earnings report is covered like a match night:
- a fixture card, "REDDIT vs 4 AIs";
- the line-up, "Traded before earnings", with each AI's side and size;
- a live timing tower that ranks the four AIs by P&L as Reddit moves through the night (PATHS[72]);
- the closing bell as the final whistle;
- Grok as player of the match, +$5,269;
- the next fixture: Monday, Nov 2, Apple and Palantir, then earningszn.xyz.

Look: broadcast graphics only, no painted plates. Near-black ground (#04070e), slanted bars cut at the EZ logo's angle, Barlow Condensed in cream. Gold marks the leader. Green and red mean direction and money only. The model line colours are the team colours. The sting is the logo's own slashes landing on the EZ. mark.

## Storyboard (R72, 25.0 s, 30 fps)
| s | Shot |
|---|---|
| 0–3.74 | Fixture (the X thumbnail) |
| 3.35–3.9 | Sting |
| 3.9–8.1 | Line-up, rows sliding in one at a time |
| 7.6–8.1 | The rows become the tower; the scorebug and price chart come in |
| 8.1–11.4 | Earnings out: "Reddit drops."; Grok passes three AIs one swap at a time; overnight fast-forward |
| 11.4–15.2 | "9:30 AM · The market opens.", the clock runs to 4:00 PM |
| 15.2–18.0 | FINAL: RDDT −29.27%, MARKET CLOSE 4:00 PM. The music cuts on the bell; crown on Grok |
| 18.0–22.0 | Player of the match: GROK · SHORT 1.8% · +$5,269 · "The only short." |
| 22.0–25.0 | Next: Monday, Nov 2 · Apple · Palantir · earningszn.xyz |

## Six checks against x2p-res-one-scene-B.mp4
1. **Comprehension:** all six answered, each in its own beat. The sides stay readable for 14 s; in B they stay for 2.2 s.
2. **Reading load:** 6 to 12 words per shot (B: 25 to 40). Four shots fail the hold rule:
   - Earnings out: 2.85 s held, 3.2 s needed.
   - Final: 2.8 s held, 4.0 s needed.
   - Player of the match: 4.0 s held, 5.6 s needed.
   - Next: 3.0 s held, 4.5 s needed.
3. **Truth:** all figures are computed. The 4:05 PM report time, the 15-minute spacing and the 9:30 open are assumed (from paths.js). B's "Next: Sandisk" is wrong.
4. **Craft:** 0 overlaps in settled frames; the rows are one template; nothing sits on a logo; no glows or emoji. Weak spots:
   - the price chart is drawn at final scale, so it looks empty for the first 2 s;
   - rows slide over each other mid-swap;
   - the "Nobody" card is sparse.
5. **Focus:** 72% of the runtime is on the four AIs and their money; the tower fills about 35% of the frame while live. B spends about 85% of its runtime on its P&L chart.
6. **Velocity:** about 1 minute per round (39 s of frames, 17 s to encode). No manual work; $0 of Hedra per round; 2.9 MB.

## Template and edge cases
**Per round:** company, logo, date, sides and sizes, path, tower order, move, winner(s), sized P&L, next trade day and its companies. The package, theme music and timings are fixed.

**Edge cases:**
- **Tie:** "JOINT PLAYERS OF THE MATCH", both crowned (R79).
- **Nobody right:** "NOBODY · Every AI on the wrong side." (R51).
- **No price path:** the chart is hidden, the night is skipped and the film runs 6.6 s shorter. mix.py still hard-codes R72's cue sheet; it should read `window.__T`.
- **Non-US listing:** no clock times.

## Hedra
$0.60, for one ElevenLabs theme (`v2-theme-a`). It ignored the requested structure, so it was spliced on its 4 s phrases. Checked by level only, not by ear.

## Open questions
- Player of the match is the sheet's winner, the closest trade. Under sized P&L, another AI on the right side can make more money. Should it go to the closest trade or the biggest P&L?
- The report time is not in the sheet.

---

## Revision 1, after a fresh critic

The critic's verdict was "fix, then ship". Average scores: V2 6.0, B 5.4.

### What changed

**Truth**
- **False ranks:** the serial swaps are gone. The order now changes in one parallel 0.35 s move, rank cells show "–" until the order settles and during the $0 tie, and gold appears only on a leader that is in profit.

**Colour and tags**
- **Side chips** are neutral cream (▲ LONG / ▼ SHORT). Green and red now appear only on P&L and the stock's move.
- **Tags:** "REPLAY" (cream with a red dot) replaces LIVE. A gold FINAL tag lands as a hard cut, with a one-frame flash on the CLOSE tab.
- **Chart:** removed under FINAL, so there's no double exposure.
- **The stray "9" in the wipe:** fixed.

**Frame 0 and end card**
- **Frame 0:** "EARNINGS NIGHT · THU OCT 29" at 60px in the orange band, with the centre left clear for X's play button.
- **End card:** "NEXT TRADES / MONDAY / NOV 2", Apple and Palantir, 4.65 s; the URL holds 3.6 s. The winner card is 3.2 s.

**Chart and tower**
- **Chart:** a piecewise time axis. The first hour takes 30% of the width, overnight 15% (shaded), the session 55%. Axis marks: REPORT, 5 PM, 9:30 AM, CLOSE.
- **Gap and first hour:** a GAP column shows each AI's distance to the leader, and a lower third reads "FIRST HOUR · Reddit −16.7%", computed from PATHS.
- **Session:** compressed from 3.8 s to 2.8 s.
- **Session tabs:** AFTER HOURS / OVERNIGHT / PRE-MARKET / OPEN / CLOSE.

**Winner card and template**
- **Winner title:** "CLOSEST TRADE" when the sheet's winner isn't the P&L leader. AI counts come from the data.
- **Sound:** mix.py reads its cues from T.json (window.__T), so rounds without a path stay in sync.

### Checks after the revision
**Reading load:** at most 12 words per shot. Four holds are still short of the 25 s cap:
- fixture: 3.74 s held, 4.2 s needed;
- market opens: 2.2 s held, 2.5 s needed;
- FINAL: 3.2 s held, 3.7 s needed;
- winner card: 3.1 s held, 5.6 s needed.

**Truth:** clean.

**Craft:** settled frames are clean, and mid-motion was checked frame by frame.

**Focus:** 66% of runtime is on the AIs and the winner.

**Speed:** about 45 s per round. Not done: odometer digit rolls.
