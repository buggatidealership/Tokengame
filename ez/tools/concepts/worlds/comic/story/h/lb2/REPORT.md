# Round H3b, area `lb2`: the Leaderboard tab ("Who's winning?" and the scoreboard), six takes

Brief: `../BRIEF-H.md`, section "Round H3b". Mockups only: nothing live changed, nothing deployed or published.

Boards:
- `ez/x2p-x3p-h3-lb-390.png`: today's live tab first, then T1 to T6. Each column shows the Season window (the default), the same take after tapping "24 hours" (the windows working), and a 3x close-up.
- `ez/x2p-x3p-h3-lb-1280.png`: today's live tab, then each take recomposed for desktop.

## What each take replaces
Each take replaces two live modules: the fight bill ("Who's winning?" with Season / Last 24 hours / Last 7 days) and the S3 scoreboard. The new module answers "who is winning, by how much, over which window" and carries the stats people expect from a leaderboard (lesson 33): P&L in the window, W-L, hit rate, last 5, and best and worst round with the company's own logo.

The proof ("Smarter or just lucky?") is area `proof2`, so these boards leave it out. "The race so far" also stays out of the shots and is unchanged. T6 folds the race history into one line of copy, and T5 could absorb the race later (see below).

## Live data, nothing typed
- Every figure comes from `window.SS.X[k]`, the live scoreboard's own window data. That covers the window's P&L, W-L, hit rate (a dash under 5 calls), last 5, top and worst round, rank order and the window labels.
- The golden ticket is `SS.gold`, the season leader. It stays on the season leader in every window, as on the live tab.
- The line "Grok took the ticket on Caterpillar, round 67" and the next bell are read from the live bill.
- The lead history (12 changes, Grok since round 67) is recomputed from `__x2pPnl()` per round.
- The window switch calls the page's own `__wc11Show(k)`. The hidden live bill, the scoreboard and the mockup therefore always show the same window, and the windows' rules are never re-derived.
- The P&L is flat: $100,000 on every call. Ranking is by P&L.

## Shared files
- `_m.js` and `_m.css`: data, the mount over the real page, and the switch wiring (tablist, arrow keys, Home and End).
- `../proof/_p.js`: reused for the drawn tick, cross and seeded jitter.
- `t1..t6.js/.css`: the takes.
- `run.js`: shoots each take over the built page. Serve `ez/` on 8952, then run `node run.js <out> now,t1,...,t6 390,1280,320`.
- `board.py`, `takes.json`: the boards.
- `hedra.py`, `jobs*.json`, `jobs.jsonl`: the paintings.

## The takes

**T1 Going up (painted: the tower, seedream-50-pro, $0.07).** A cutaway Art Deco tower.
- Each AI rides its own elevator, a hand-drawn brass cage with its founder portrait. The car's floor is its P&L: street level is $0, profit is above it, losses are in the basement under red light.
- Floor lines are relabelled per window. The brass call panel is the window switch: pressing a button sends the cars to their new floors and swaps the shafts to the new rank.
- The stats sit on a felt letter-board directory below the tower.
- *Could fail:*
  - The cars are small on a phone (about 80px wide), and the street-level label can touch a basement car's plate.
  - Each window has its own scale, so a floor in Season does not equal a floor in 24 hours.
  - The directory is a dark table, so it is the take most likely to read as "a dashboard in costume".
  - On desktop the directory leaves empty room under it beside the tall tower.

**T2 Chip count (painted: the felt, seedream-50-pro, $0.07).** A poker tournament's chip count.
- Each AI has one chip per $10K won, in a single tower in its own colour, so tower height is proportional. A loss is a pile of red IOUs with the amount on a slip.
- The window's chip leader gets the dealer-style button. Three poker chips switch the window, and the stacks drop in on a switch.
- The rail carries the stats: "Best hand" and "Bad beat" with the company logo.
- *Could fail:*
  - Grok's chips had to be lifted to graphite, because its ink colour vanished on the felt.
  - IOUs carry about the same visual weight as chips, so losses may read as "also has stuff".
  - "Bad beat" is poker slang: in poker it means losing despite good odds, not simply the worst round, so it is not exact (lesson 17).
  - Below 380px the plates get small (10.5px).

**T3 The wall (painted: the ballpark at dusk, gpt-image-2, $0.03).** The hand-hung outfield scoreboard as a line score.
- One row per AI in rank order, with every stat in its own column (lesson 58). Each number is a drawn plate with nails and its own small tilt.
- The last five show as the board's lit bulbs: green for right, red for wrong.
- The header's three hung plates are the switch, and the lit bulb shows the window. On a switch the rows re-hang (they slide to their new order) and the P&L plates flip in.
- *Could fail:*
  - It is the closest to a table, so the comic lives only in the material.
  - The painted park mostly shows round the edges on a phone.
  - At 320px the plates drop to 12.5 to 13px.
  - Green bulbs for a right call are not the real ball-strike light colours, so baseball fans may misread them.

**T4 Meanwhile... (painted: the roof, the fire escape and the rain, gpt-image-2, $0.16).** "Who's winning" told as a comic page.
- The switch is the comic's own time caption: "All season...", "In the last 24 hours...", "This past week...".
- The leader gets the splash panel on the penthouse roof. Anyone else who is up climbs the fire escape; anyone down stands in the rain. Each character says its P&L in a balloon, and #2 also gives its gap to the leader.
- Below the page, "By the numbers" puts each AI on a band of its own colour (lesson 48).
- *Could fail:*
  - Rank 2 to 4 panels are small on a phone, and the balloon can cover part of the scene.
  - Characters "speaking" numbers is a device; the words are only facts, but some may read it as a mascot gimmick.
  - The roof is only for #1 when #1 is up. In a window where everyone is down, #1 also stands in the rain, which is true but bleak.

**T5 Down the stretch, my pick (painted: the home straight at sunset, seedream-50-pro, $0.07 draft plus $0.135 at 2K, used).** A horse race seen from the rail.
- The leader's nose is on the finish post. Every other runner trails by exactly its P&L gap to the leader, written on its tag as "$45,530 back". A striped pole marks $0, so runners left of it are in the red.
- The race card is the switch: "The long race / Season", "The sprint / 24 hours", "The sprint / 7 days". A switch re-runs the race.
- Each lane carries its runner's form line (W-L, hit, form W/L, best, worst) on one shared axis.
- It answers "who's winning, by how much" before a word is read: the gap is distance (lesson 41), and the confrontation is the whole field rather than just two corners.
- *Could fail:*
  - The distances use one scale per window, from the last runner to the leader.
  - When everyone is close (a quiet 24 hours), the runners bunch at the post and the tags crowd.
  - The $0 pole needs a beat to understand.
  - On desktop the runners are small against the wide track.
  - The race re-run on a switch is about 1.3 s, so it must stay off with reduced motion (it does).

**T6 The Sporting Pink (painted: the desk, gpt-image-2, $0.03).** The back page of a pink sports paper.
- The headline is written from the numbers, for example "Grok keeps the ticket" or, on 24 hours, "Grok runs away with it". The rules are in `t6.js head()`, from the margin between #1 and #2 and from the golden ticket. The deck states the leader's P&L and W-L, #2's gap and the last-placed AI's figure.
- The lead photo is the leader's own portrait screened in halftone.
- The standings are the paper's agate table. "The race" column gives the lead changes.
- The switch is the edition: Season, Overnight, Weekly.
- *Could fail:*
  - The pink stock is a pale ground, which the owner has rejected inside modules (rule 5). I chose pink over white on purpose, but it may still read as "the white box".
  - The agate table is small print on a phone (best and worst move to a second line).
  - The paper's name is invented. It names no real paper.
  - The headline rules are mine and need the owner's eye on tone.
  - `img/t6-photo.jpg` (a trophy at a press call) is **not used**: the trophy reads as a real-world league's cup.

## Checks run
- Rule 0 hard rules: there are no white module grounds; T6's pink is flagged above.
- No native emoji: ticks, crosses, chips, IOUs, bulbs, cages and tickets are drawn SVG or CSS.
- Nothing sits over a logo or a face.
- Company logos are the site's own files, placed beside the figures.
- Company names are not lettered next to the logos. They are only in alt and title text, so the name-plus-ticker rule is not met; it is noted here.
- Every painting was checked at full size: no lettering in any of them.
- 320, 390 and 1280px: scrollWidth equals the viewport for every take, and nothing lands past the viewport after the 320px fixes (the T2 plates, the T4 bands and the section's grid sizing).
- No page errors or console errors, and no 4xx on mockup or media files (run logs).
- The windows switch, re-rank and redraw in every take; the 24-hours shot on the 390 board shows it.
- Not checked: Safari, a slow phone's cost of the six videos (the takes use poster stills), and screen readers beyond roles and labels.

## Paintings (Hedra)

| Job | Model | Settings | Cost | Time | File | Result |
|---|---|---|---|---|---|---|
| t3-park | gpt-image-2 | 16:9, 1K, medium | $0.0290 | 35 s | `img/t3-park.jpg` 1280x720 | Ivy wall and light towers at dusk, strong Golden Age ink; used in T3. |
| t2-felt | seedream-50-pro | 1:1, 1080p | $0.0675 | 76 s | `img/t2-felt.jpg` 1080x1080 | Oval table on a white ground (cropped by scale); lamp pool on green baize; used in T2. |
| t1-tower | seedream-50-pro | 9:16, 1080p | $0.0675 | 78 s | `img/t1-tower.jpg` 1080x1920 | Art Deco cutaway with a street line and brick basement; the best painting of the set; used in T1. |
| t4-up | gpt-image-2 | 1:1, 1K, medium | $0.0532 | 44 s | `img/t4-up.jpg` | Penthouse terrace at golden hour; used in T4. |
| t4-down | gpt-image-2 | 1:1, 1K, medium | $0.0532 | 44 s | `img/t4-down.jpg` | Rainy street with red neon in puddles; used in T4. |
| t4-stairs | gpt-image-2 | 1:1, 1K, medium | $0.0532 | 44 s | `img/t4-stairs.jpg` | Fire escape climbing into an orange sky; used in T4. |
| t6-desk | gpt-image-2 | 16:9, 1K, medium | $0.0290 | 34 s | `img/t6-desk.jpg` | Newsroom desk with a lamp and a mug ring; used in T6. |
| t5-track | seedream-50-pro | 16:9, 1080p | $0.0675 | 76 s | `img/t5-track.jpg` | Side view; the dirt only filled the bottom third, so the lanes sat on the grandstand. Replaced. |
| t6-photo | gpt-image-2 | 4:3, 1K, medium | $0.0366 | 34 s | `img/t6-photo.jpg` | Halftone trophy at a press call; not used (it reads as a real league's cup). |
| t5-track-2k | seedream-50-pro | 16:9, 1440p | $0.1350 | 120 s | `img/t5-track-2k.jpg` 2048x1152 | From above the rail, the dirt fills the lower two thirds; used in T5 (the pick). |

Total spent: **$0.59** of the $12 cap (every charge equalled its estimate). Prompts are in `jobs1.json` and `jobs2.json`; each ends "No people, no text, no letters, no numbers, no logos...".

## My pick: T5, Down the stretch
- It is the only take where the picture itself is the comparison. Distance behind the leader is the dollar gap; the $0 pole splits winners from losers; and the switch turns the season into a long race and the windows into sprints, which is how crypto people already think about time frames.
- The form line under each lane keeps every stat on one axis, so nothing from the S3 scoreboard is lost.
- **Next:** draw the runners as horses with jockeys in each AI's silks, from Hedra character sheets, with the founder's face kept small. Add one quiet living detail (dust drifting). Let the track's own history replay "the race so far" round by round, which would retire that section.
- **Second choice:** T3, The wall, if the owner wants the safest read of a table.

## What would prove the pick wrong
- If a newcomer reads the track as time (rounds) instead of money, T5 fails at its first job. Only a person looking at it can tell, since analytics are off.
- If the owner reads "who's winning" as the title fight (two corners), T5 loses that tension. T4 keeps the confrontation better.
