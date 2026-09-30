# EZ landing page — variant index

All variants read `ez-data.js` (mirrors the ARENA sheet) and need `media/` alongside.

- **Variant 1** = `v1-binder.html` — "The Binder", frozen (~70% done). Preview: https://claude.ai/artifact/RcHFozQtJPbxzZwTn8Sfna
  (`v4-binder.html` is its working copy.)
- **Variant 2** = `v2-feed.html` — "The Feed": one round per full screen, films autoplay as you swipe; scorecard slides up.
- **Variant 3** = `v3-broadcast.html` — "The Broadcast": earnings season as a sports channel; highlights playlist, standings bug, ticker, listings, the bet as the main event.
- **Variant 4** = `v4-wall.html` — "The Wall": exhibition; framed looping films with placards, rooms for the sitters, the method, the bet.
- **Variant 5** = `v5-errorlog.html` — "The Error Log" (Claude's own take): lab notebook built on the public record of misses — the open call, "are they learning?" curve, the log, what would prove it wrong.

## Round 3 (feedback: Broadcast + "Are they learning?", Wall and Feed dropped)
Also need `ez-learn.js` (the two learning charts: direction first, then distance when the direction was right).
The prompt shown comes from `PROMPT` in `ez-data.js`; it says "shape of the prompt" until `verbatim:true`.

- **Variant 6** = `v6-primetime.html` — "Primetime": the Broadcast, second cut. Film-led; split-screen replays, analytics desk, main event, straight-talk studio desk.
- **Variant 7** = `v7-fightnight.html` — "Fight Night": money-led. Opens on the main event (the machines vs NVIDIA); the rounds are the undercard.
- **Variant 8** = `v8-thequestion.html` — "The Question": question-led. Opens on "Are they learning?" with the live answer and both charts.
- **Variant 9** = `v9-primetime-kraft.html`: Primetime's running order in Variant 1's look (kraft, ink, foil). Leaderboard table, simpler Step 2 bars, "GPT predicts ▲ up 3%" listings, visual main event. V1 and V6 untouched.

## Locked (2026-09-30)
Variant 6 (Primetime) and Variant 9 (Primetime Kraft) are locked by the owner: design, layout and copy frozen.
They keep updating from `ez-data.js`. Previews: V6 https://claude.ai/artifact/32CQftWp6gJUZiX6di64b4 · V9 https://claude.ai/artifact/MHR1WUyvjBcnYkTWwdZQFp

## Round 5 (2026-09-30): same data, three new ways to present it
Brief: simple journey (what we do, how, how it's going, what's next), "we know it's boring, consistency is everything",
sell subtly. Research: `RESEARCH-subtle.md`. All three say "Get $EZ" once, at the end.
- **Variant 10** = `v10-timetable.html` — "The Timetable": EZ as a transit timetable. The route, arrivals, punctuality, next departures, special service. https://claude.ai/artifact/56BHpBa24We9W5hRaYsZi9
- **Variant 11** = `v11-picturebook.html` — "The Picture Book": one idea per page, flat shapes; "Your turn" lets the visitor call the next print before seeing the machines. https://claude.ai/artifact/CD8myrMvob8patBpPmf9c1
- **Variant 12** = `v12-scorebook.html` — "The Scorebook": the record kept by hand; box scores, stamps, margin notes, "What would prove this wrong?". https://claude.ai/artifact/WbUS8Te1SPMw5wQrrhhzAN
