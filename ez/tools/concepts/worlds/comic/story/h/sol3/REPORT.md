# Round H9, area `sol3`: "Smart or lucky?" as the arcade and the lie detector, drawn (not rendered)

Brief: `../BRIEF-H.md`, "Round H9", bullet `sol3`. Mockups only, laid over the real built page (`ez/v47-live-x3plus.html`) in
Playwright in place of today's big board. Nothing in `ez/tools/v22/` or any `ez/v4*.html` touched; nothing deployed or published.

- **Boards:** `ez/x2p-x3p-h9-sol3-390.png` (one column per take: hit rate on top, P&L Season under it; today's live board first) and
  `ez/x2p-x3p-h9-sol3-1280.png` (one row per take: hit rate | P&L Season). Close-ups: `ez/x2p-x3p-h9-sol3-closeup.png`.
- **Video:** `ez/x2p-x3p-h9-sol3-switch.mp4` (the pick, A1 at 390px): hit rate, then a tap on the game's menu for P&L Season, 7D, 24H,
  then back to hit rate.
- **Paintings:** 34 Hedra jobs (32 gpt-image-2 1K medium roughs, 2 at 2K high for the pick), **$1.84 of the $8**. Every job is in
  `log.jsonl`; the table is at the end. No words or numbers in any painting.

## What changed from hitworlds (the owner's notes, each fixed)
- **Drawn, not rendered.** Every painting starts from the vault's own prompt language (heavy brush ink, cross-hatching, dry brush,
  splatter, deep blacks, gold as the only light, no smooth CGI, no cream or beige). Each world is then redrawn in other drawn styles
  **from the noir painting as a reference image** (gpt-image-2 edit: "keep the exact composition, change only the drawing style"), so
  the styles are detachable: the same cabinet or console, the same surface, in another ink. Styles: **S1** vault noir (brush ink, gold
  spot), **S2** Silver Age print (clean ink line, flat bold colour, Ben-Day dots only in a few places, slight misregistration),
  **S3** Mignola (flat hard shadow shapes, few lines, muted slate and rust, one hot gold), **S4** Spider-Verse offset print (arcade only).
- **Head-on and crisp.** Every data surface was asked for straight-on with its edges parallel to the frame, and measured as a plain
  rectangle (`measure.py` for the arcade screens, `grid.py` by eye for the consoles and desks; overlays in `ovl/`). The chart is an
  axis-aligned SVG on that rectangle: **no matrix3d, no filter, no glow, no blur** on any line or letter (hitworlds blurred the arcade's
  phosphor and tilted the screen). Fonts: VT323 on the CRT, Courier Prime on the polygraph.
- **Nothing runs off the screen or over the bezel:** the surface is inset 1.5 to 3.5% inside the measured black, and `run.js` checks
  every text and control against the surface box: 0 outside at 390 and 1280 on every take.
- **No line crosses text:** the lines stop at the plot's right edge; the end labels sit in a gutter to its right that no line enters,
  each on one line, name then value ("Grok 63%"), pushed apart by at least 1.22 lines so they never crowd. On the polygraph the pens'
  arms occupy the paper's right side, so the lines stop short of the pen tips and the names and figures are the chart's typed key under
  it (the table), which also stops short of the pens (P3's pen tip crossed "63%" in the first run; fixed).
- **The stray mark on "1P HIT RATE"** came from hitworlds drawing the menu text twice under a rect; the menu is now one button per item,
  plain text, the selected one inverse (gold block, ink text), nothing else drawn.
- **No coin captions.** The "1 time in 45" / "worse than a coin" lines are gone; the coin flip is a row of coins at 50% (arcade) or a red
  dashed line at 50% (polygraph), with "50%" on the axis. The reader compares the lines with it.
- **The title** is the Overview's one heading face: the bet chapter's `h2.hb-h` recipe (Bangers, #ffd21f, a .075em ink stroke, the red
  and ink extrusion, -2.2deg), copied under `.s3 h2.s3-h`.
- **The P&L table under the chart:** per AI, W-L and P&L for the window shown (Season / 7 days / 24h). On the arcade it is the game's
  **high-score table** (rank, name, W-L, P&L); in P&L the end labels carry the name only (the figure is in the table: one carrier).
- **Controls that move until used (lesson 86):** arcade, a blinking "▸" cursor before the menu item not yet tried ("PRESS START"); console,
  the painted knob itself (a disc of the painting, rotated) turns between hit rate and P&L and twitches every few seconds until first
  used, the brass plates under the three toggles are Season / 7 days / 24h, the plate under the knob names what it points at; desk, the
  chart paper's own printed header, the untried item pulsing. Nothing moves with reduced motion.

## Data (nothing typed)
- Hit rate after every graded round = (right + 1) / (calls + 2) per AI, from ROUNDS through `__x2pPnl()` (every line starts at 50/50;
  an AI that skipped a round keeps its value); the printed figure is the raw W / (W + L), as the live board prints it.
- **Checked on every mount against the live big board's own table** (`h_sol.js` `.hs-sr`: W-L and hit rate per AI): 4 of 4 ok on every
  run (Grok 45-27 63%, Claude 48-32 60%, GPT 43-37 54%, Kimi 37-43 46% at the time of the shots).
- P&L: `../pnl/_lib.js` PN (flat $100,000 on every call; the windows with the live page's own rules), which checks itself against the
  Leaderboard rows: 4 of 4 ok. W-L in a P&L window = the calls in that window's rounds that got the direction right / wrong.
- The leader (gold line, gold name) is the view's own #1: hit rate on the hit view, the window's P&L on the P&L view.

## The takes
- **A1 / A2 / A3 Insert coin** (S1 noir, S2 Silver Age, S4 Spider-Verse; Mignola `arc-s3` painted, not mounted): one upright
  cabinet in a dark arcade, the chart is the game on its CRT. Narrative: Meet the models is fight night, this is the gambling next
  door (insert a coin), the bet follows.
- **P1 / P2 / P3 The lie detector, console** (S1, S2, S3): a 1950s strip-chart lie detector facing you under a hanging lamp, the chart
  on black smoked paper (pens scratch it, as on a kymograph: no cream paper), four pens at its right.
- **P4 / P5 The lie detector on the desk** (S1, S3; top-down, the only way a desk is seen head-on): the smoked sheet on the
  interrogation table, the machine's pens on it, hat, ashtray, coffee, a gloved hand and a scatter of gold coins round it.

## Measured
- 390 and 1280: no sideways scroll (`scrollWidth` = viewport) and no element outside the viewport on any take; no console errors.
  320: see below.
- Smallest text at 390: arcade axis labels 9.3px, end labels and menu about 11px; polygraph key 10.5px, plates 11 to 12px.
- Cost: no element moves except the cursor blink, the knob's twitch (both stop once used) and the line drawing on a switch (1.5 s,
  `stroke-dashoffset`, one path per AI). Not measured at 4x CPU in this round.

## My pick: A1, Insert coin in the vault's noir
The arcade is the only world where everything the owner asked for is native: the screen is a head-on surface by nature, the line ends
have room for "Grok 63%", the P&L table is the game's own high-score table, the switch is the game's menu, and "insert a coin" is the
beat between fight night and the bet. The noir style is the vault's own ink, so the chapter sits in the same book as the bet. It is the
one painted again at 2K (`arc-s1hd-*`, take `a1hd`). Second: **P1**, the console: the strongest image of "smart or lucky is a question
of truth", but its pens take a third of the paper.

## How each could fail
- **All:** the early-season spikes (an AI's first few calls swing the 50/50 start to 25 or 75%) dominate the left of every chart; the
  owner may read them as noise. The chart is small on a phone (the CRT is about 330 x 250px), so four lines that sit close (Grok and
  Claude) are hard to tell apart without the end labels. Safari not checked.
- **A (arcade):** "gambling" next to a coin may read as "crypto casino", against the guide-not-salesman tone (lesson 29); the menu is
  on-screen text, not the painted buttons (the buttons under the screen do nothing, which a visitor may try); VT323 is a pixel face,
  crisp but small.
- **P (console):** the pens' third of the paper means no end labels, so the reader has to match colours to the key; the window is
  short on desktop (the chart there is about 450 x 200px); the dimmed window plates in hit-rate view read as greyed text on brass.
- **P4/P5 (desk):** the top-down view is the least "comic panel" of the set, the lamp's pool sits on the printed header, and the sheet
  is a big dark rectangle that can read as a laptop screen at a glance.
- **Styles:** the S2/S4 restyles keep the composition only roughly (each was measured again); S4's magenta is outside the brand's
  gold, green and red. The 1K roughs go soft above 1.2x; only the pick was painted at 2K.

## Files
`_s3.js` (data, renderer, mount), `_s3.css` (heading, stage, motion), `styles.css` (controls per world), `arcade.js`, `poly.js`,
`takes.js` (measured surfaces per painting), `run.js` (`node run.js <out> a1,p1,.. 390,1280 hit|season|d7|d1`), `rec.js`
(`node rec.js a1 out.mp4 390`), `board.py`, `measure.py`, `grid.py`, `gen.py` (Hedra v3; refs uploaded via /v3/files), `jobs*.json`,
`log.jsonl`. Serve `ez/` on port 8973.

## Jobs
| name | model | settings | cost | time | file |
|---|---|---|---|---|---|
| arc-s1-16x9 | gpt-image-2 | 1K medium 16:9 | $0.030 | 28 s | img/arc-s1-16x9.jpg |
| arc-s1-3x4 | gpt-image-2 | 1K medium 3:4 | $0.037 | 34 s | img/arc-s1-3x4.jpg |
| arc-s1b-3x4 | gpt-image-2 | 1K medium 3:4 | $0.037 | 34 s | img/arc-s1b-3x4.jpg |
| top-s1-16x9 | gpt-image-2 | 1K medium 16:9 | $0.030 | 34 s | img/top-s1-16x9.jpg |
| frt-s1-3x4 | gpt-image-2 | 1K medium 3:4 | $0.037 | 34 s | img/frt-s1-3x4.jpg |
| top-s1-3x4 | gpt-image-2 | 1K medium 3:4 | $0.037 | 41 s | img/top-s1-3x4.jpg |
| frt-s1-16x9 | gpt-image-2 | 1K medium 16:9 | $0.030 | 34 s | img/frt-s1-16x9.jpg |
| top-s1b-3x4 | gpt-image-2 | 1K medium 3:4 | $0.037 | 41 s | img/top-s1b-3x4.jpg |
| frt-s2-3x4 | gpt-image-2 | 1K medium 3:4 (ref frt-s1-3x4.jpg) | $0.049 | 58 s | img/frt-s2-3x4.jpg |
| arc-s4-3x4 | gpt-image-2 | 1K medium 3:4 (ref arc-s1-3x4.jpg) | $0.049 | 71 s | img/arc-s4-3x4.jpg |
| top-s2-16x9 | gpt-image-2 | 1K medium 16:9 (ref top-s1-16x9.jpg) | $0.042 | 65 s | img/top-s2-16x9.jpg |
| arc-s2-16x9 | gpt-image-2 | 1K medium 16:9 (ref arc-s1-16x9.jpg) | $0.042 | 78 s | img/arc-s2-16x9.jpg |
| top-s3-3x4 | gpt-image-2 | 1K medium 3:4 (ref top-s1-3x4.jpg) | $0.049 | 64 s | - |
| frt-s2-16x9 | gpt-image-2 | 1K medium 16:9 (ref frt-s1-16x9.jpg) | $0.042 | 58 s | img/frt-s2-16x9.jpg |
| arc-s3-3x4 | gpt-image-2 | 1K medium 3:4 (ref arc-s1-3x4.jpg) | $0.049 | 77 s | img/arc-s3-3x4.jpg |
| arc-s4-16x9 | gpt-image-2 | 1K medium 16:9 (ref arc-s1-16x9.jpg) | $0.042 | 71 s | img/arc-s4-16x9.jpg |
| top-s3-16x9 | gpt-image-2 | 1K medium 16:9 (ref top-s1-16x9.jpg) | $0.042 | 64 s | img/top-s3-16x9.jpg |
| frt-s3-3x4 | gpt-image-2 | 1K medium 3:4 (ref frt-s1-3x4.jpg) | $0.049 | 58 s | img/frt-s3-3x4.jpg |
| top-s2-3x4 | gpt-image-2 | 1K medium 3:4 (ref top-s1-3x4.jpg) | $0.049 | 71 s | img/top-s2-3x4.jpg |
| arc-s3-16x9 | gpt-image-2 | 1K medium 16:9 (ref arc-s1-16x9.jpg) | $0.042 | 77 s | img/arc-s3-16x9.jpg |
| frt-s3-16x9 | gpt-image-2 | 1K medium 16:9 (ref frt-s1-16x9.jpg) | $0.042 | 57 s | - |
| arc-s2-3x4 | gpt-image-2 | 1K medium 3:4 (ref arc-s1-3x4.jpg) | $0.049 | 84 s | img/arc-s2-3x4.jpg |
| top-s3-3x4 | gpt-image-2 | 1K medium 3:4 (ref top-s1-3x4.jpg) | $0.049 | 52 s | img/top-s3-3x4.jpg |
| frt-s3-16x9 | gpt-image-2 | 1K medium 16:9 (ref frt-s1-16x9.jpg) | $0.042 | 52 s | img/frt-s3-16x9.jpg |
| frt-s1t-3x4 | gpt-image-2 | 1K medium 3:4 | $0.038 | 34 s | img/frt-s1t-3x4.jpg |
| frt-s2t-3x4 | gpt-image-2 | 1K medium 3:4 (ref frt-s1t-3x4.jpg) | $0.049 | 48 s | img/frt-s2t-3x4.jpg |
| frt-s3t-3x4 | gpt-image-2 | 1K medium 3:4 (ref frt-s1t-3x4.jpg) | $0.049 | 48 s | img/frt-s3t-3x4.jpg |
| frt-s1w-16x9 | gpt-image-2 | 1K medium 16:9 | $0.030 | 35 s | img/frt-s1w-16x9.jpg |
| top-s1w-16x9 | gpt-image-2 | 1K medium 16:9 | $0.030 | 34 s | img/top-s1w-16x9.jpg |
| frt-s2w-16x9 | gpt-image-2 | 1K medium 16:9 (ref frt-s1w-16x9.jpg) | $0.042 | 36 s | img/frt-s2w-16x9.jpg |
| frt-s3w-16x9 | gpt-image-2 | 1K medium 16:9 (ref frt-s1w-16x9.jpg) | $0.042 | 37 s | img/frt-s3w-16x9.jpg |
| top-s3w-16x9 | gpt-image-2 | 1K medium 16:9 (ref top-s1w-16x9.jpg) | $0.042 | 36 s | img/top-s3w-16x9.jpg |
| arc-s1hd-16x9 | gpt-image-2 | 2K high 16:9 (ref arc-s1-16x9.jpg) | $0.235 | 75 s | img/arc-s1hd-16x9.jpg |
| arc-s1hd-3x4 | gpt-image-2 | 2K high 3:4 (ref arc-s1-3x4.jpg) | $0.281 | 94 s | img/arc-s1hd-3x4.jpg |