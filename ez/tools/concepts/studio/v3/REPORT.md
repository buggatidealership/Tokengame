# V3 · Painted cinema: report

## Brief (one line)
A viewer scrolling X with the sound off learns that four AIs traded Reddit's earnings before the report (3 long, 1 short), that the trades were held to the next close, that Reddit fell 29.27%, and that only Grok was right and made +$5,269. Then they visit earningszn.xyz.

## Concept
Four paper lanterns keep a vigil on a rooftop over a world painted from the company. Each lantern is one AI, and its paper carries the AI's mark and side. The night passes to the next close and the bell rings. The lanterns on the wrong side go out, and the winner's turns gold.

For Reddit, the world is San Francisco under an orange alien planet (Reddit's colour and Snoo's home). Through the night the planet sinks behind the lanterns, so the painting itself carries "Reddit fell". For an up round the Kling prompt asks the planet to rise.

## The film (24.8 s, 1080x1350, 30 fps)
| Time (s) | Shot | On screen (set by code) | Painted carrier, and the fact it carries |
|---|---|---|---|
| 0.0 to 6.2 | The trades (also the thumbnail) | Reddit logo on a paper disc + "Reddit"; each pane shows mark, name, LONG/SHORT with an arrow; "4 AIs traded before earnings." | Four lit lanterns: four AIs, each by its trade. The Kling clip drifts slowly. |
| 6.2 to 9.2 | The night | A clock runs Oct 29 4:05 PM to Oct 30 3:5x PM; "Held to the next close." | The night time-lapse (Kling): time passes to the close while the planet falls. |
| 9.2 to 11.8 | The bell | "4:00 PM. The close." | Brass closing bell (Kling, slowed 2.1x): the market close. Hard cut in and out. |
| 11.8 to 15.0 | The move | "Reddit at the close" with −29.27% counting up | Late-afternoon sky with the planet gone. |
| 15.0 to 17.8 | The verdict | "Only Grok went short." Losing panes turn to their P&L and go dark one by one | The lanterns go out, with a snuff sound for each. |
| 17.8 to 20.4 | The winner | "Grok wins." with +$5,269 counting up; the pane shows +$5,269 | Camera pushes in on Grok's lantern, which turns gold. |
| 20.4 to 24.8 | End | EZ. logo, earningszn.xyz, "Next: Apple · Palantir · Mon, Nov 2" | Wide shot: one gold lantern, three dark ones (the outcome picture). |

## Data rules
- Everything comes from `ez-data.js`; nothing is typed by hand.
- **P&L uses the video rule:** $10,000 per 1% predicted × side × move. This gives Grok +$5,269, Kimi −$4,391, Claude −$20,489 and ChatGPT −$23,416.
- **Next round is computed:** the first trade day after this round's close, with its companies sorted biggest first by CAPS. For R72 that gives Apple · Palantir · Mon, Nov 2. One-scene B's "Next: Sandisk · Oct 29" breaks this rule.
- **Winner and caption logic:**
  - The winner is the sheet's `win`, and ties crown both.
  - Captions are chosen by rule:
    - "Only X went long/short."
    - "X and Y tie." (then "X & Y win", with "each" when the amounts are equal)
    - "All 4 right. X closest."
    - "Nobody called it." (then "The market wins.")
  - Checked on R92 (tie), R51 (nobody) and R64 (all four right): `?r=<n>`.

## Template: what is fixed and what is made per round
**Fixed (made once, reused every round):**
- `art/fg.png`: rooftop and four lanterns, keyed from green, with the panes measured. All four panes share one size (149x295), so the four sibling panes match exactly (0 px difference, measured).
- `art/bell.mp4`
- The score (`v3-score2`) and the sound effects
- `art/world-default.jpg`: fallback world
- Fixed cost was about $2.20, including the takes I rejected.

**Per round:**
1. One world still (`art/r<n>-world.jpg`, gpt-image-2 2K high, **$0.43**). The prompt is the house style plus one line on the company's world (HQ city and culture), with no text.
2. One Kling time-lapse from that still (`art/r<n>-night.mp4`, **$0.35**). The prompt picks "falls / plunges below the horizon" or "rises" from the sign of the move, and its speed words from the size of the move.
3. Render: about 2 min 10 s on this machine, then the mix (`mix.py`, which takes the number of lanterns that go out and the number of winners).

That is **$0.78 per round**, or **$0.56** with a 1K high world. Add about 5 minutes of Kling wait.

There is no manual layout work per round, because the panes sit on the fixed foreground.

**Missing art and data:**
- With no clip, the still is used and code warms the sky.
- With no still, the default moon-city is used.
- No intraday path is needed, so the template works for every round, including companies without a Hyperliquid market.

## Six checks against one-scene B (`x2p-res-one-scene-B.mp4`)
1. **Comprehension.** All six questions can be answered with the sound off in both films: company, before earnings, each side, next close, who won, how much. V3 says "before earnings", "held to the next close" and "4:00 PM. The close." in words, plus the bell as a picture. B uses its phase strip. The two are even, and V3's end card points to the correct next round.
2. **Reading load.**
   - B keeps about 36 words on screen through its 13 s race and about 45 on its end card.
   - V3 has at most 14 words per shot (the opening, with pane labels), and 3 to 8 everywhere else.
   - Hold times against the rule (1 s + 0.08 s per character):
     - On target: night 3.0 s (2.8 needed), the move 3.2 s (3.1), the verdict 2.8 s (2.7), the winner 2.6 s (2.4).
     - Slightly short: bell 2.6 s (2.5 needed, the caption fades in for 0.4 s), opening 6.2 s (6.8 needed if every pane label counts, 3.3 for the caption alone), end card 4.2 s readable (4.9 needed).
3. **Truth.** Every figure is from ez-data.js. In B, "Next: Sandisk" breaks the brief's next-round rule.
   - **Caveat 1:** the planet sinks at a steady pace across the night, while Reddit's real drop happened mostly right after the report (PATHS[72]). The planet is a metaphor driven by time, not by the path.
   - **Caveat 2:** the painted sky goes from night to golden late afternoon in 3 s, so the light is approximate.
4. **Craft.**
   - 0 overlaps: caption tops sit 239 px below the lowest pane.
   - The pane template is identical across all four (0 px difference).
   - Lantern gaps follow the painting: 104 to 108 px, a 3.6 px spread.
   - No emoji, no decorative glow. The gold, the snuffing and the dimming each encode the verdict.
   - The stone face under the lanterns is the caption ground, so about 150 px of plain dark stone remains under short captions.
5. **Focus.**
   - The story's carrier (the four lanterns, from sides to verdict) is on screen 89% of the runtime (all but the 2.6 s bell) and 12% of the area in wide shots, larger in the push-in.
   - B's chart takes about 60% of the area for about 65% of the runtime.
   - V3 gives up chart detail for one object per AI.
6. **Velocity and cost.**
   - B costs $0 per round, but only works where a Hyperliquid path exists.
   - V3 costs $0.78 per round and works for every round, with about 7 minutes of wall time (Kling plus render).
   - Manual work is one prompt line per company world, which can be templated from HQ and culture like the site's thumbs recipe.

## Hedra spent
**$3.43 of $6**, all jobs prefixed `v3-`:
- Test stills: $0.20
- Final stills: fg $0.27, Reddit world $0.43, bell $0.21, default world $0.05
- Kling: night $0.35, bell $0.35, a second bell take $0.35 (rejected: sparks)
- Scores: $1.20 (the first was nearly silent after 13 s and was rejected)
- Sound effects: $0.02

## Cut, or unsure
- **Bell take 1:** after 1.2 s it grew magic sparkle trails, so only its first 1.15 s is used, slowed 2.1x with motion interpolation. The swing is small until the end. A cleaner bell clip would help; the bell is a fixed asset, so this is a one-time cost.
- **Price path:** not used. A version could drive the clip's playback by PATHS (the planet drops when the price drops), but the clip's sky is tied to the same timeline, so dawn would come at 5 pm.
- **Non-US exchanges:** the close is New York's 4:00 PM. The site's `xcloseAt` is not wired in yet.
- **Same-day rounds** (report before the open) run the clock over the 9:30 am to 4:00 pm session, with the caption "Held to the close."
- **Small type:** pane names are 34 px, about 12 px on a 390 px phone. LONG/SHORT is 46 px.
- **Up-move world:** the Kling prompt for an up move (the planet rises) is untested.
- **Kling first frame:** it differs slightly from the still, so the clip is used from frame 0 and the still is only the fallback.

## Files
- `index.html`: the renderer, `window.R(t)`. Use `?r=<n>` for another round and `?t=<s>` for one frame.
- `art/`: painted plates and clips.
- `mix.py`: score and sound effects (`python3 mix.py out.wav <lanterns out> <winners>`), then loudnorm I=-16, TP=-1.5.
- `shot.js`: stills at given times.
- Render with `PAGE=../studio/v3/index.html node render.js <dir> 30 0 24.8` from `tools/concepts/launchvid/`.
- Outputs: `ez/x2p-studio-v3.mp4` and `ez/x2p-studio-v3-board.jpg`.

---

## Revision 1, after a fresh critic (producer's note)

Verdict: fix, then ship. It was the better film to scroll past but the weaker record: the planet sank on the clock rather than with the price, sizes were missing, losers were unreadable, the winner was held for 1 s, the bell broke the world, and there was a black band at the top. All 12 fixes are in. This round cost $0.98; V3 has spent about $4.41 in total.

**The art is now the chart**
- The world was regenerated without the planet.
- A keyed Reddit planet (orange, Snoo's antenna) sits at the price on every frame: 7.67 px per 1%, taken from the PATHS[72] Hyperliquid 15-minute closes and scaled to the sheet.
- Each lantern burns at its AI's running P&L. The three long lanterns gutter during the report hour, when the real crash happened.
- The clock slows for the report hour.
- The sky keeps clock time: a new Kling day clip plus a night grade done in code.

**Opening:** 3.6 s, moving from frame 0, reading "Reddit earnings / 4 AIs traded before earnings. / 3 long, 1 short." The counts are computed.

**Truth and colour**
- Sizes are on the lanterns.
- Sides are in ink; green and red are used only for P&L and the move.
- Losers' paper is dimmed, with each loss in bright red and a keyline.
- One formatter serves the lantern, the caption and the end card, so the figures always match.
- The move counter runs along the real path: −16.71% first, ending at −29.27%.

**Winner and end card**
- "Grok wins. +$5,269" holds 2.7 s.
- The end card leads with "Grok +$5,269" in gold.

**Shots and art**
- **Bell:** repainted hanging from the rooftop eave. One continuous tilt up, a pendulum swing, and "Oct 30 · 4:00 PM. The close."
- **Top band, cloud streaks and lantern posts:** gone. Claude's mark sits on an ink disc.

**Sound:** cued from the data (cues.js):
- a thud on the biggest 15-minute drop;
- three snuffs, as each loser crosses 95% of its final loss;
- the bell on the swing.

**Checks**
- **Comprehension:** better than B, because the planet and the lanterns now carry the night.
- **Hold times:** two shots run short:
  - the opening, 4.0 s against 5.8 s;
  - the end card, 4.6 s against 4.9 s.
- **Truth:** clean. The sky is approximate.
- **Overlaps:** 0. Panes match to 0 px.
- **Cost:** $0.77 per round (world $0.21, emblem $0.21, Kling $0.35), about 7 minutes of wall time.

**Open**
- The gold turn on Grok's lantern is modest.
- An up-move round has not been tested.
- Non-US closes still read New York's 4:00 PM.
