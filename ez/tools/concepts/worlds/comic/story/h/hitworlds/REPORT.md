# Round H7, area `hitworlds`: "Smart or lucky?" as the hit rate, in five worlds (roughs)

Brief: `../BRIEF-H.md`, "Round H7", bullet "Hit rate worlds". Mockups only, laid over the real built page (`ez/v47-live-x3plus.html`)
in Playwright, in place of today's section. No live file touched, nothing deployed or published.

- **Boards:** `ez/x2p-x3p-h7-hitworlds-390.png` (today's live section, then each world: hit rate on top, P&L Season under it) and
  `ez/x2p-x3p-h7-hitworlds-1280.png` (a row per world: hit rate | P&L Season).
- **Video:** `ez/x2p-x3p-h7-hitworlds-switch.mp4` (W4 at 390px, 17 s): Hit rate, then P&L Season, 7 days, 24h and back to Hit rate;
  each switch turns the billboard's slats left to right and the lines are painted in again.
- **Paintings:** 11 Hedra roughs, gpt-image-2 medium 1K ($0.37 of the $6), in `img/`; prompts in `jobs1.json`, `jobs2.json`,
  results in `jobs.jsonl`. No words or numbers in any painting: every word, number and line is live page text and SVG.

## How it works (`_hw.js`, `_hw.css`)
- **Data, nothing typed.** Hit rate per AI after every graded round = (right + 1) / (calls + 2) from ROUNDS through `__x2pPnl()`
  (each line starts at 50/50; an AI that skipped a round keeps its value); the end label is the raw W / (W + L), as the page prints
  it; the coin's odds are the one-sided binomial (as world-comic.js's coin()). **Checked on every mount against the live section's
  own "63% / 1 time in 45" lines: 4 of 4 ok.** The P&L is pnl's `PN` (flat $100,000 per call; Season / 7 days / 24h with the page's
  own window rules), checked against the live Leaderboard rows: 4 of 4 ok.
- **Drawn into the painting:** pnl2's method. The painted surface's four corners were measured by hand on a labelled grid
  (`grid.py`); the chart is an SVG in the surface's own box mapped onto them with one `matrix3d`, through a material filter, and
  blended into the paint where the material asks for it (multiply for ink and enamel, screen for phosphor and neon).
- **Switch made of the world:** every control is a quad measured on a painted object (brass plate, arcade button plate, stencil
  beside a fuse box, catwalk kick-board, tide board) with its label written onto it through the same homography; the lit one glows
  where the world has a lamp. Default view: hit rate. Then P&L, and the P&L windows (dimmed while on hit rate).
- `run.js` shoots a take (`node run.js <out> poly,arcade,neon,bill,tide 390,1280 hit|season|d7|d1`), `rec.js` records a switch,
  `board.py` builds the boards. Serve `ez/` on port 8971.

## The worlds (one line each)
- **W1 The lie detector** (`poly`): a 1950s polygraph in an interrogation room; four pens write each AI's hit rate on the chart paper,
  the coin flip printed in red. Knob = Hit rate / P&L (pointer turns), toggles over brass plates = windows; on a switch the paper
  feeds under the pens from the right, so the lines come out of the pen tips.
- **W2 Insert coin** (`arcade`): the hit rate as a high-score race in vector phosphor on an arcade CRT, the coin flip a row of gold
  coins at 50%; the cabinet's five buttons are the switch (desktop: names on the plates under them; phone: the game's own on-screen
  menu "1P HIT RATE / 2P P&L / SZN 7D 24H", the plates being too small); the screen re-traces on a switch.
- **W3 Lucky's back wall** (`neon`): each AI a neon tube bent along a wet brick alley wall, the coin flip one tube left almost dark;
  the fuse box is the switch (two levers = modes, three glass caps = windows, the lit one glows); tubes strike one after another on
  a switch and reflect in the cobbles.
- **W4 Painted over the city** (`bill`): a tri-vision billboard at golden hour, lines lettered in the brand's enamels from the four
  cans on the catwalk; the switch words are painted on the catwalk's kick-board and the slats turn to show the other face.
- **W5 Head above water** (`tide`): a granite harbour wall where **the sea is the coin flip**: the waterline sits exactly at 50% (and at
  $0 on the P&L), so an AI above it beats a coin and one below it is seen through the water (the painting's own sea laid back over
  the marks, drifting). Tide boards SZN / 7D / 24H are the windows, Hit rate / P&L stencilled on the coping.

## Measured
- 390 and 1280 (320 not checked): no sideways scroll, no element outside the viewport on any take; data checks ok on every run.
- One console error appears at 1280 only on the arcade run (`<circle> cx NaN`, a negative `<rect>` height): a draw at a zero-width
  stage before layout; guarded (`clientWidth<60` returns) but it still shows in the arcade shots, so it may come from a draw during
  page start; harmless on screen, to be traced if W2 is picked.
- Smallest text: phone end labels and window labels about 8 to 10px (W1 plates, W3 stencils, W5 coping words); desktop W1 is the
  smallest because the paper is seen at a steep angle.

## My pick: W5 Head above water
It is the only one where the coin flip is not a line someone has to find: it is the sea, and "head above water" is how anyone already
says "doing better than breaking even". The answer to "is any AI beating a coin?" reads before any word: Grok, Claude and GPT are on
dry stone, Kimi is under water; on the P&L the same sea is $0, so GPT and Kimi sink. One rule for both views, no new metaphor to learn
(lesson 78: the chart people know, painted into the world). Second: W1 (the polygraph is the one place where "smart or lucky" is a
question of truth, and the feed-from-the-pens switch acts it out).

## How each could fail
- **W1:** the paper is oblique on desktop, so the chart reads small and foreshortened; the end labels sit under the pen arms; brass-plate
  words are small on a phone. A frontal 2K repaint would fix most of it.
- **W2:** the phosphor glow softens the small figures; the on-screen menu on phones is a second set of controls, not the buttons
  (the physical buttons only glow); arcade is a crowded genre (could read as "crypto game").
- **W3:** neon text is the least legible (glow), and the lamp's hot spot sits where text wants to go (the phone puts the lead line at
  the foot of the wall); the dark coin tube can be missed.
- **W4:** the pleated slats bend every mark, so the lines look wobbly; the strong perspective makes the far side's labels small and the
  lead line runs uphill; the slat flip costs one SVG rect animation per slat (cheap, but only on a switch).
- **W5:** the hit rate above water gets little height (the painted waterline fixes where 50% sits, and the early-season spikes are
  clipped at 72 to 74%); the lines under water are dim on purpose, which also makes Kimi's line the hardest to read; the "under water"
  reading must survive a viewer who never looks at the labels (ask a person).
- **All:** 1K roughs, soft at desktop size; the picked one needs a 2K painting and its corners measured again (or painted to a
  rectangle we give). Safari not checked (mix-blend-mode over a `matrix3d` box, SVG filters).
