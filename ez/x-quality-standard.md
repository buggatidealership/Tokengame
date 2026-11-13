# The motion quality standard: the owner's adjectives as numbers (2026-11-13)

The owner, on cut 7 of the R106 CoreWeave resolution video: smooth means it "needs to look better than the average chart or video on Twitter... higher quality, high animation quality, thinking about every single detail... from a design perspective from top to bottom... a human design expert, senior, 40 years of experience... but also from an LLM native standpoint... compute a lot more data together... find patterns that you might not trust initially... try them to see if they actually work." Every adjective below has a measure, a threshold and a tool. A video ships when it passes, or when each miss is named with its reason.

## 1. Smooth

| Measure | Pass | Tool |
|---|---|---|
| Every move starts and lands at rest: ease = 1 − max(start speed, end speed) ÷ peak speed, per element, with the camera held still | ≥ 0.8 on every move except named hits (a stamp, the bell's kick). An entrance from invisible may start fast and an exit into invisible may end fast (decelerate in, accelerate out) | `tools/concepts/dopa/ease.js` |
| No teleports: the largest step of any element in one frame | ≤ 4% of the frame width | `ease.js` |
| Motion blur | ≥ 3 samples per frame (a 180-degree shutter) | `dopa/cut.sh` (`MB=3`) |
| No hard cuts: frames where over 35% of the picture changes at once | 0; a change of layout is an object travelling to its new place | `dopa/smooth.py` |
| Never dead: frames where something moves | ≥ 80% before the final hold; no still stretch over 1.2 s | `smooth.py`, `measure.py` |
| Constant frame rate, no dropped frames | 30 fps, rendered offline frame by frame (never screen-recorded) | the render itself |

Cut 7: ease ≥ 0.8 on 26 of 30 moves (the misses: the FINAL slam, a hit; the live % riding the price into the close, which stops where the price stops); 4 steps of 4.1 to 4.6%; 0 cuts; motion 91%; longest still 0.9 s.

## 2. Better than the average chart video on X

| Measure | Pass | Tool |
|---|---|---|
| Delivered file | 1080 wide, H.264 High, at least 5,000 kbps (X's minimum; we send 10 Mbps two-pass), closed GOP, AAC | `ffprobe` |
| Picture and sound land together on every hit | ≤ 67 ms (2 frames) | `measure.py` |
| Every figure is data, not hand-typed | 100% from ez-data.js or the market feed | review |
| Brand colours | ≤ 2% off-palette pixels | `tools/concepts/fresh/palcheck.py` |
| Against a reference set of what does well on X | to be measured: the same tools run on 10 chart/P&L videos the owner picks (see open question) | `smooth.py`, `ease.js` cannot run on others' videos; `smooth.py` and `measure.py` can |

What we can say today without a reference set: screen recordings (the usual X chart video) have no motion blur, linear or browser-default easing and dropped frames; those are measurable on any file with `smooth.py` (dead stretches, cuts) once the owner points at examples.

## 3. Every single detail (the senior designer's checklist, measured)

| Measure | Pass |
|---|---|
| One dominant element per beat | the largest text on screen at least 1.6x the next |
| Reading time | every line held ≥ its characters ÷ 15 s, never under 0.85 s |
| Contrast | text ≥ 4.5:1 against its ground, large figures ≥ 3:1 |
| Safe area | all text inside x 40-1040, y 55-1295 of 1080x1350 |
| Typefaces and sizes | two families (Inter, Geist Mono), tabular figures for every number |
| The winner reads first | the winner's row ≥ 1.8x as bright as the brightest loser at the reveal hold (cut 7: 2.21x); losses at the same type size |
| Honest | "Simulated $100K per trade · not advice" on screen; no staged near-miss |
| Every motion carries a fact | a list per video: each move and the fact it shows (cut 7: the path = the price; the bars = live P&L; the gold = the winner; the travel = the round's money landing in the season) |

## 4. LLM-native

| Measure | Pass |
|---|---|
| Data density: real data points driving the motion | cut 7: 290 five-minute prices, 4 live P&Ls, 8 season figures |
| Search, don't guess: variants rendered and scored before one is picked | at least 3 variants of any choice the owner has not fixed (timing, easing, a layout), each scored with the tools above, the scores shown |
| Try the untrusted pattern | every round of work includes one idea not in the usual playbook, tested and kept or dropped on the numbers (here: measuring easing from the elements' own paths instead of judging by eye, which found 11 unseen faults in a cut that looked finished) |
| The audience test, after posting | per video on X: copy-link shares, replies and follows per 1,000 impressions (the ranking weights 20, 5 and 4, against 0.5 for a like); compare formats across rounds, never on one post |

## Open

- The reference set: which 5 to 10 videos on X does the owner see as "the average" and as "the best"? With them, section 2 gets a real baseline instead of a description.
