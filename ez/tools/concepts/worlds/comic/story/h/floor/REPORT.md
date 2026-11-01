# Round H10 · floor: the Upcoming tab as the floor on New York's clock, and Your call

Rough mockups laid over the real built page (`v47-live-x3plus.html`, served locally) in Playwright. Every take is shown in the two styles the brief asks for: **N** the vault's brush and ink (black, grey wash, gold, green and red spot light) and **L** the EZ. logo's flat badge (black ground, flat cream, gold, green, red, hard slanted shapes, no texture). Nothing below touches `tools/v22/` or any live page.

Boards: `ez/x2p-x3p-h10-floor-390.png`, `ez/x2p-x3p-h10-floor-1280.png` (today's live Upcoming top first). Videos: `ez/x2p-x3p-h10-floor-call-n.mp4`, `-call-l.mp4` (390px: stamp a call, then "your next visit after the close" and the result).

## What the visitor sees

**1 The floor (top of the Upcoming tab).** One painted room, an old exchange seen head-on from the gallery: a big wall clock, a blank black slate under it, a brass bell. The plate changes with New York's market state (Intl, `America/New_York`):
- *open* 9:30 to 16:00 weekdays: daylight, a few traders;
- *the bell* 16:00 to 16:30: the bell swinging, the floor packed, slips in the air;
- *after the bell* 16:30 to 20:00: red dusk, two clerks sweeping, a lamp lit over the slate;
- *overnight* 20:00 to 9:30: moonlight, one green lamp;
- *weekend*: shutters down, dust sheets, a velvet rope.

The clock's hands are live (SVG hands and ticks set on the painted blank face). The slate says, in chalk (N) or the logo's slanted lettering (L), what the room knows: whether today's predictions are in ("Due today 0 of 3 in"), what grades next ("Next bell Tue 4 pm"), the companies as their logos printed in one ink, and after the bell the day's moves (biggest first, green or red). The bell can be rung (tap): ink ring marks; until it is rung, a faint cue every 6 s (lesson 86). On a phone the stage is the plate at 125% framed on the slate, so the board reads at arm's length.

**Under it, every round to come, to swipe.** One black betting card per round (34 today, by grading date): round number, the company's logo printed in one ink, name and ticker, the four AIs' marks with "?" until their calls are in (then ▲/▼ and the size in green or red), "Calls due Mon", "Graded Tue Nov 3".

**Your call (this browser only).** A betting window: the four AIs' cards pinned behind the grille, the visitor's blank card on the counter, a green and a red rubber stamp. Before the AIs' calls are in, tap green (up) or red (down) on the next round (today R81 Palantir): the stamp lands on the card (UP/DOWN). After the close the AIs' cards are stamped Right / Wrong one by one and the card reads "You beat 2 of 4" with the running tally ("3 of 3 right so far"). Stored as `localStorage['ez-yourcall'] = {v:1, calls:[{n, co, ticker, resolves, dir, at}]}`, every read and write in try/catch; with storage blocked it keeps the call in memory for the visit. Nothing is sent anywhere.

**Your call at the end of the Overview (Tonight at the close).** The same mechanism as a counter close-up (one card, two stamps) appended under "Next on the card"; no extra heading, since the Overview keeps one heading face. The same storage, so a call made there shows on the Upcoming window and back.

## Data (all from the page)
- Rounds, dates, calls, results and winners: `ROUNDS`, `PENDING`, `UPCOMING`. Nothing typed.
- "Due today" = rounds whose `called` is today in New York; "in" = rounds with `calls`. "Next bell" = earliest `resolves` still to come. The offered round for Your call = the earliest round with no AI calls yet whose call date is today or later (it locks the moment the AIs' calls appear in the sheet).
- "You beat N of 4" = you got the direction and N AIs did not. A tie in direction is not a beat (the visitor gives no size, so closeness cannot be compared).
- Demo moments on the boards are real dates from the sheet: Mon Nov 2 11:05 (Palantir, Apple, Berkshire due), Fri Oct 30 4:00 pm and 5:45 pm (10 rounds graded that day: Reddit −29.27%, Intel −28.58%, SanDisk −13.47% lead the after-bell slate), Mon Nov 2 5:40 am, Sat Oct 31 1:00 pm. The result state uses a demo history in localStorage (R78 down, R79 up, R80 up), labelled as such: R80 Exxon +2.17%, GPT and Kimi right, Claude and Grok wrong, so "You beat 2 of 4"; tally 3 of 3, 5 of 12 AI calls beaten.

## Surfaces under every live text (the "nothing pasted on" check)
| Live text | Painted surface |
|---|---|
| clock hands, ticks, "New York" | the clock's blank face |
| state, due/in, next bell, logos, moves | the blank slate (chalk / flat lettering) |
| bell ring marks | around the painted bell |
| round cards | a painted blank black betting card (one plate, reused) |
| AI marks and calls, Right/Wrong | the four blank cards pinned behind the grille |
| your call, stamp, result, tally | the blank card on the counter, mapped onto it by a homography (`FX.H`, 4 corners to `matrix3d`) so it lies flat in the counter's perspective |

Not on a surface: the "Your call" heading and its one line on the Upcoming tab (page text above the scene), and "On the card · 34 rounds to come" above the strip.

## Checks run
- 390 and 1280px, both styles, every state: no console errors, `scrollWidth` equal to the viewport (no sideways scroll).
- Class names all prefixed (`fx*`): the site's own `.fd`, `.u`, `.d` boxed my values on the first pass.
- Rule 0 list: no white or pale grounds inside a module (the cards are black); no emoji (the ▲/▼ are type); no content over a logo (logos sit on the slate/cards beside the words); name and ticker together on every card; no box-in-box widgets: every container is a painted object.
- Not checked: 320px (the strip and slate scale with width; the slate's nowrap lines could clip under 340px), Safari (CSS mask for the logos, matrix3d), a 4x slower CPU (the scene ticks once a second and crossfades plates; five plates per scene load at once, a build should load only the current one).

## Hedra
30 jobs, gpt-image-2, 1K medium, $1.17 of the $10 budget (`jobs.jsonl`). The five states of each room were made as edits of the morning plate with it as the reference image, so the camera, clock, slate and bell stay put (measured once per style and aspect, then checked by eye on every state). The first window plate put the visitor's card too small, so it was redone closer (`win2-*`). No 2K renders yet: worth doing only for the picked style.
- `fl-{n,l}-{am,close,after,night,wkend}[-w]`: the floor, phone 9:16 and wide 16:9.
- `win2-{n,l}[-w]`: the betting window; `ctr-{n,l}`: the counter close-up; `cardc-{n,l}`: the round card (cropped from `card-*`).
- `img/lg/`: the site's own logo files turned into one-ink silhouettes (tile keyed out; white parts inside coloured logos become holes, as a one-colour print would): not redrawn.

## My pick
**N, the brush-and-ink floor, with Your call on the Upcoming floor and the counter at the end of the Overview.** N reads as the same book as the vault: the room's light *is* the state (gold daylight, the gold burst at the bell, red dusk, blue night, shutters), so a visitor can tell the market's state before reading. L is crisper and its slate reads better at arm's length, but its cream walls are the brightest thing on the page and fight the slate for attention; if L is picked, darken the walls to green or black.

## How each could fail
- **The clock and slate drift between states.** The edits held the layout this time; a re-render could move them, and the text would sit off the painted slate. A build needs a measured box per plate (done by eye here), or one clean background plate plus painted state overlays.
- **A floor that is mostly asleep.** Visitors outside US hours see night or weekend most of the time; the bell state lasts 30 minutes a weekday. The slate still carries the useful facts in every state, but the "alive" feeling is rare. Asia and Europe see the room dark.
- **Holidays and early closes are unknown** to the code (Thanksgiving week, the half day on Nov 27): the room would say "open" on a closed day. A build needs the NYSE calendar.
- **Non-US closes.** Rounds graded at Seoul's or London's close still ring New York's 4 pm bell here (the site's live Leaderboard already handles each exchange's close; reuse that).
- **The slate is small on a phone** even at 125%: three logos and two short lines is its limit. A busy day (10 rounds) shows three logos and "+7".
- **Your call can be gamed and lost.** A visitor could wait for the AIs' calls to appear elsewhere (X posts) and copy them; the lock is "the AIs' calls are in the sheet", which can lag the X post. Clearing site data loses the tally. No share image yet ("I beat Claude and Grok on Exxon" is the thing people would post).
- **"Beat" ignores size.** Two right directions tie; a visitor never beats an AI that also got it right, which may feel stingy. A size picker would fix it at the cost of a second tap.
- **It can read as betting.** Stamps, a betting window and "beat the AIs" next to a token: keep it a game with no money, and say so on the card if the owner wants.
- **Text crosses the grille.** The AIs' cards sit behind the bars, but the live text is drawn over them; a build should mask the bars over the text (a cut-out of the grille) or the cards read pasted on up close.
- **Silhouette logos lose colour.** Printing in one ink keeps the world consistent but drops brand colour (the owner liked logos in their own colours on the strip); thin wordmarks (Samsung, Sony, Arm, Berkshire) get faint at slate size.
- **Weight.** Five 1K plates per scene and style (about 150 to 300 KB each); load only the current state's plate and the rest on idle.

## Files
`floor.js` / `floor.css` (the mockup: `FX.floor`, `FX.rounds`, `FX.call`, `FX.setNow`), `run.js` (shots), `rec.js` (video), `board.py`, `measure.py` (an attempt at measuring the slate automatically: unreliable on the noir plates, kept for the record), `gen1.sh` to `gen3.sh`, `hd.py` (Hedra client, from wow), `jobs.jsonl`, `img/`.

## Seen on the close-up (`ez/x2p-x3p-h10-floor-close-up` board: `ez/x2p-x3p-h10-floor-closeup.png`)
- On the noir slate the "+7" after three logos clips at the slate's right edge (the badge slate has room). The line above already says "10 rounds", so the "+n" can go.
- After the bell, the painted lamp's cord runs through the slate's title: in the world it is the lamp in front of the board, but the title should sit below the shade.
- The stamped UP and the card text are mapped onto the counter card in its perspective; at 390 the result card holds four short lines at most.
