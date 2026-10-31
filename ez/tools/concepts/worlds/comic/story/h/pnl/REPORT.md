# Round H5, area `pnl`: "Smart or lucky?" becomes the P&L dashboard

Brief: `../BRIEF-H.md`, "Round H5". Five takes, laid over the real built page (`ez/v47-live-x3plus.html`) in Playwright, in place of
today's "Smart or lucky?" section on the Overview. Mockups only: no live file touched.

- Boards: `ez/x2p-x3p-h5-pnl-390.png` (today's live section, then A to E at a 390px phone, a 3x close-up of each chart under them)
  and `ez/x2p-x3p-h5-pnl-1280.png` (the same at 1280px).
- Video: `ez/x2p-x3p-h5-pnl-a.mp4` (take A, 390px, 23 s, 1.8 MB). The section scrolls in and the lines draw in, then 7 days, 24h and
  back to Season, each window redrawing its lines.

## The want, rewritten as an expert's brief
"Replace the hit-rate section with the one chart a crypto trader reads first: each AI's running P&L on $100K a call, with Season / 7d / 24h.
Make it a chart inside a painted comic scene, the way Out of the Fog was, so the scene itself carries the meaning (above or below
break-even). Show who leads and by how much, keep four lines readable on a phone, and keep the losers' losses in plain view."

## The story, before any take
- **Story:** four traders took the same $100K-a-call season. Two are up big; two are sinking. Who's on top, by how much, and over which window?
- **What the data says (80 graded rounds, read from the page, 31 Oct):**
  - Season: Grok +$148,480, Claude +$102,950, GPT −$56,930, Kimi −$70,650. Grok leads Claude by $45,530.
  - Last 7 days: Grok +$111.2K, Claude +$59.6K, Kimi −$37.6K, GPT −$82.7K.
  - Last 24 hours: Grok +$92.5K, Claude +$34.0K, GPT −$49.3K, Kimi −$65.6K.
  - These figures drift with the clock, because the windows are counted live.
- **Facts → carriers.** In every take, break-even is a physical level in the painting:
  - the sea's surface (A);
  - the cloud deck (B);
  - the red printed line on the paper (C);
  - a strip of tape on the glass (D);
  - the board's gold bus bar (E).

  The rest:
  - **Profit or loss:** which side of that level a line ends on.
  - **Who leads:** the leader's line is gold or gold-cased, and the lead line under the title names the leader and the margin.
  - **Each AI:** its own line colour, plus a marker at the line's end (buoy, plane, pen tag, grease-pencil name, LED).
  - **The windows:** a control from the scene's own world (lanterns, cockpit toggles, rotary knob, desk switches, DIP switch).
  - **The rows:** an object from the same world (planks, flight strips, brass odometers, tote board, chips).
- **Words left:**
  - the title;
  - "If you'd bet $100K on every call." (the live line);
  - "<leader> leads <window> by $X";
  - the column heads 24h / 7 days / Season;
  - the fine print "Each call is its own bet. Buy on up, short on down. No leverage. Before fees."
- **Honesty (lessons 8 and 16):** GPT and Kimi end under the line in every take, in red figures. In A, their planks ride low in the water.
  Nothing is softened.

## Data (all live, nothing typed)
`_lib.js`:
- Rounds come from `ROUNDS` (graded rounds in order) and each call's dollars from `__x2pPnl().A[m].per[n].v`: $100,000 × direction ×
  move, the flat P&L that is live today.
- Each line is the running sum from round 1, starting at $0.
- **Windows:** 24h and 7 days use the page's own rule. That is world-comic.js `proofBuild`'s `inWin` with each exchange's own close
  (`closeAt`), copied verbatim.
- **Check:** on every mount the 24h and 7d totals are compared with the live Leaderboard rows (`#wc-pfv-pnl`). The result is kept in
  `PN.check`, and all four rows read "ok" at every width shot.
- **What a window switch does:**
  - the chart redraws over the rounds in that window, each line restarting at $0;
  - the rows re-rank by that window, and its column is marked;
  - the lead line names the window ("Grok leads the last 24 hours by $58,540").
  - Every figure names its window (lesson 59).
- Colours and marks come from `MODELS`. Grok's brand is black, so on dark scenes its line keeps a black core inside a gold casing, and
  the gold also marks the leader.

## The takes
All five follow the same rules:
- The headline is hand-lettered (every letter its own size, angle and baseline) and extruded. That is the only loud treatment.
- The inside is quieter: drawn wood, metal, paper and tiles.
- Every painting was prompted with "no text, no letters, no numbers". All were checked at full size and none has any.
- Characters are not used: the scene is the character here (the brief made them optional).

The take names are working titles; see "Titles" below.

**A · Who's still afloat? (my pick)** ($0.25: a 1K draft, then 2K high)
- **The scene:** Out of the Fog turned into the P&L. A harbour at night in a split view above and below the water. The painted waterline
  sits on break-even at every width (`PN.bgAlign` scales and places the painting so its surface, measured at 46.8% of its height,
  lands on the chart's $0).
- **The story it tells:** Grok and Claude climb into the moonlight past the lighthouse, while GPT and Kimi sink towards the anchor.
- **Parts:**
  - the axis is a wooden tide pole;
  - each line ends at a buoy in its AI's colour;
  - the windows are three ship's lanterns, the open one lit;
  - the rows are the harbour log on planks, with the open window's figure ringed in chalk;
  - a plank in the red rides low, with water lapping over it.
- **Quiet life:** one wave line drifts along the surface (a transform, 9 s per loop). The lines draw in once on view and again on a
  switch. Nothing moves with reduced motion.
- **Why it is the pick:**
  - It is the owner's favourite format kept whole: a chart inside a painted scene.
  - Its metaphor decodes without a legend (afloat or sunk; lesson 23).
  - It survives the season growing (lesson 44): more rounds only make the lines longer.
- **Could fail:**
  - Grok's line reads gold, not black: gold means the leader, and the leader will change.
  - The lighthouse sits behind the leaders' line ends on a phone, so it is busy there.
  - "Afloat" is a joke about money, and for some it may read as solvency, not profit.

**B · Who's flying high?** ($0.03)
- **The scene:** break-even is the painted cloud deck. Profit flies in a clear sunset sky, losses go down into the clouds and the storm.
- **Parts:**
  - each line is a soft contrail with the AI's colour inside it, ending at a drawn jet whose nose follows the line's last move;
  - the windows are cockpit toggles on a screwed plate;
  - the rows are flight strips.
- **Could fail:**
  - Below the line it is the cloud tops rather than the storm (the storm is lower in the painting), so loss reads as "cloudy",
    not "crashing".
  - GPT's and Kimi's planes overlap where their lines end close together.
  - A plane can suggest speed rather than altitude.

**C · The money trail** ($0.09)
- **The scene:** a chart recorder that has run all season, its pens inking each AI's money.
  - **Desktop:** the horizontal drum, with brass tags on arms to each line's end. It is the cleanest of the five at 1280.
  - **Phone:** a tall recorder with the paper unrolling downward (round 1 at the top, the newest round at the bottom; P&L left to
    right, break-even printed in red). Tags in a row under the paper are joined by arms to each line's end.
- **Parts:**
  - the windows are a rotary selector knob whose pointer turns;
  - the rows are brass plates with odometer counters (every digit on its own wheel), the open window framed in red.
- **Could fail:**
  - On a phone, time runs downward. That is unfamiliar for a P&L, and the lines bunch in a 262px-wide strip.
  - The paper is a light ground. It is an object with a meaning (a recorder's paper), not a white module, but it sits close to rule 5.
  - The phone version is the tallest of the five.

**D · Follow the money** ($0.06)
- **The scene:** a 1940s operations room. The lines are plotted in grease pencil on the big dark glass board (a slight wax texture
  through a displacement filter), break-even is a strip of tape, and the leader is traced over in gold. The names are written at
  the line ends in marker.
- **Parts:**
  - the windows are three lit switches on the desk;
  - the rows are the tote board, with every figure set in slotted tiles.
- **Could fail:**
  - The glass is mapped to a 1.7:1 region, so the chart is short on a phone (about 190px).
  - War-room plotting reads as "the AIs are at war", which may be more than the section needs.
  - The tiles are dense at 320px.

**E · Who's in the green?** ($0.03)
- **The scene:** the NVIDIA chip's own circuit board, tying back to the die count (lesson 76). Break-even is the painted gold bus bar,
  and the board below it is tinted red (the loss zone).
- **Parts:**
  - each P&L is a copper trace with the AI's colour inlaid, from a via at $0 to its end;
  - the label at each end carries a green or red LED;
  - the windows are a red DIP switch;
  - the rows are four chips (U1 to U4) with their figures in silkscreen.
- **Quiet life:** a slow pulse of current runs along the leader's trace (6 s), meaning money flowing.
- **Could fail:**
  - The board's components below the bar make the loss zone busy, and lines cross capacitors.
  - The double casing (copper plus ink) is heavy at 320px.
  - The current is a stroke-dashoffset animation, which repaints the SVG every frame while it runs.

## Titles (open, the owner's call)
The owner called it "the P&L dashboard". That name is fine internally, but on the page it is a widget word, not a comic title.
Proposals:
1. **"Who's still afloat?"** (A) / **"Who's flying high?"** (B) / **"Who's in the green?"** (E): a question the picture answers,
   each fitted to its scene;
2. **"Follow the money"** (D): works with any scene;
3. **"If you'd followed them"**: the money framing in the visitor's own terms;
4. **"The P&L"**: plain, and the word this crowd uses (lesson 6), but dry;
5. **Keep "Smart or lucky?"**, the old question. I would not: the section no longer answers it (hit rate and luck stay on the
   Leaderboard).

The beat caption above the section ("Meanwhile, the big question…") is the flow helper's area. Each take sets a matching one
("Meanwhile, down at the harbour…"), so the old line doesn't promise a question the section no longer asks.

## Readings that go two ways
- **"Windows":**
  - my reading: the chart is re-drawn over the window's rounds from $0, and the rows re-rank;
  - the other reading: the season chart stays, and only the rows change.

  The first shows the 24h story (Grok +$92.5K in one day) as a picture.
- **"Rows of Last 24h, Last 7d and P&L":** all three columns stay visible in every window (the open one marked), so the visitor can
  compare without switching.

## Paintings (Hedra)
| Job | Model | Settings | Cost | Time | File | Result |
|---|---|---|---|---|---|---|
| a-sea | gpt-image-2 | 16:9, 1K, medium | $0.0295 | 34 s | `img/a-sea.jpg` 1280x720 | Split view above and below water, lighthouse right, waterline at 53%. Draft. |
| a-sea-2k | gpt-image-2 | 16:9, 2K, high | $0.2223 | 77 s | `img/a-sea-2k.jpg` 2048x1152 | Clearer ink, kelp and anchor underwater, waterline at 46.8%. Used. |
| b-sky | gpt-image-2 | 16:9, 1K, medium | $0.0292 | 34 s | `img/b-sky.jpg` | Sunset above a cloud deck at 53%, storm below. Used. |
| c-drum | gpt-image-2 | 16:9, 1K, medium | $0.0293 | 34 s | `img/c-drum.jpg` | Drum recorder with four painted pens at fixed heights (they would lie about the data). Not used. |
| c-drum2 | gpt-image-2 | 16:9, 1K, medium | $0.0294 | 35 s | `img/c-drum2.jpg` | The same without pens; paper region measured. Used (desktop). |
| c-tall | gpt-image-2 | 9:16, 1K, medium | $0.0294 | 34 s | `img/c-tall.jpg` 720x1280 | Tall strip recorder, four dials and a lamp, paper unrolling down. Used (phone). |
| d-ops | gpt-image-2 | 16:9, 1K, medium | $0.0292 | 33 s | `img/d-ops.jpg` | The glass came out pale teal (a pale ground). Not used. |
| d-ops2 | gpt-image-2 | 16:9, 1K, medium | $0.0293 | 34 s | `img/d-ops2.jpg` | Dark smoked glass, desk, two officers from behind. Used. |
| e-pcb | gpt-image-2 | 16:9, 1K, medium | $0.0292 | 34 s | `img/e-pcb.jpg` | Green board, a gold bus bar at 68.4%, parts round the edges. Used. |

**Total spent: $0.46** of the $12 cap (every charge equalled its estimate). Prompts are in `jobs1-4.json` and `jobs.jsonl`.

I spent so little because every one of these scenes holds at 1K behind a chart. The 2K went on the pick only, as the brief says.

## Checks run
- **Widths:** 320, 390 and 1280px, every take:
  - `scrollWidth` equals the viewport;
  - no element pokes out of the section;
  - no page errors or warnings;
  - the window check reads "ok" for all four AIs (`run.js` output).
- **Four lines at 390:** each line has an ink casing (or a glow on the dark glass, or ink on paper), and its end label is pushed
  clear of the others.
  - Closest pair: GPT and Kimi, $13.7K apart at the end.
  - Their labels never overlap. In B their planes do.
- **Rule 0 list:**
  - no white or pale module grounds (C's recorder paper is the exception, said above);
  - no native emoji (buoys, planes, lanterns, toggles, knob, switches, LEDs and chips are all drawn SVG or CSS);
  - nothing is laid over a face or a number;
  - one loud headline per take;
  - the containers hug their content (the rows are as tall as their content; each scene is cropped to its chart).
- **Zoomed at 3x** and compared with a comic page:
  - The painted grounds and the drawn objects (planks, odometers, tiles, chips) hold up.
  - The figures and labels are still a typeface (Bangers, Barlow Condensed), not hand lettering.
  - The chart lines are clean vector lines, except D's wax and C's ink bleed.

## Cost on a slow phone (4x slower CPU, 390x844, medians of 3 runs, `perf.js`)
| What | Today (live section) | A (pick) | E (with the current) |
|---|---|---|---|
| Scroll in and lines draw in, 3 s: fps / main-thread time | not measured (no draw-in) | 20.3 fps / 3.02 s | 25.3 fps / 3.01 s |
| A window switch (lines redraw), 3 s | (no windows) | 44.2 fps / 3.61 s | 43.3 fps / 3.65 s |
| Sitting on the section, 6 s | 57.2 fps / 4.98 s | 59.9 fps / 4.13 s | 59.5 fps / 4.49 s |

How to read it:
- The main-thread figures include the rest of the page's own work, which runs all the time on this page (x2plus.js loops, films),
  so compare the columns, not the absolutes.
- **Sitting still,** A costs no more than today's section. E's current costs about 0.36 s more per 6 s than A.
- **The weak moment is the draw-in, about 20 fps for its 1.6 s.** That window also holds the scroll jump and the page's own lazy work
  waking up as the section arrives, so not all of it is the lines.
- **For a live build:** reveal the lines with a clip-path wipe (one compositor-friendly animation) instead of a stroke-dashoffset on
  eight paths. Draw them in only once per visit, and with no draw-in on a window switch (a cross-fade instead).

Notes on the cost:
- A's wave is a transform on a pseudo-element, so it stays on the compositor.
- The line draw-in is a stroke-dashoffset animation on four SVG paths (repaints for 1.6 s, then stops).
- E's current repaints its trace every frame while the section is on screen. For a live build it should pause off screen, as the page's
  `holdOff` does for its other loops.

## How to run
1. Serve `ez/`: `python3 -m http.server 8961`.
2. From this folder:
   - `node now.js <out> 390,1280` shoots today's section;
   - `node run.js <out> a,b,c,d,e 390,1280,320` shoots the takes. Add `WIN=d1` or `WIN=d7` to open another window; at 390 it also
     makes 3x close-ups (set `ZOOM=0` to skip them).
3. Boards: `/usr/bin/python3 board.py <out> 390|1280 <png>` (labels in `takes.json`).
4. Video: `node rec.js a <out.mp4>`.
5. Cost: `node perf.js <take|now> 3`.
6. Paintings: `/usr/bin/python3 hedra.py jobsN.json` (the key is read from `$HEDRA_API_KEY` and never printed).
