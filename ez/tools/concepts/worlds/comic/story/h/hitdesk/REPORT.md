# Round H7, area `hitdesk`: Smart or lucky, "you're evaluating AIs"

These are rough mockups. They are laid over the real built page (`ez/v47-live-x3plus.html`) in Playwright, in place of today's "Smart or lucky?" section. No live file was touched, and nothing was deployed or published.

- **Boards:**
  - `ez/x2p-x3p-h7-hitdesk-390.png`: each take at a 390px phone, first on the default view (hit rate), then switched to P&L · Season.
  - `ez/x2p-x3p-h7-hitdesk-1280.png`: each take at 1280px.
- **Video:** `ez/x2p-x3p-h7-hitdesk-switch.mp4` shows the pick (A) at 390px, 18 s. The painted keys are pressed one at a time: F2 P&L, F6 7 days, F7 24h, F5 season, F1 hit rate. After each press, the CRT redraws the chart.
- **Hedra cost:** $0.27 of the $6 budget. That is eight roughs on gpt-image-2 (1K, medium, about $0.03 to $0.04 each), one 3:4 and one 16:9 per take, all usable on the first try. Prompts and costs are in `jobs1.json` and `jobs.jsonl`.

## The want, as an expert would brief it
"Stage the section as an evaluation in progress.
- The visitor stands where an analyst would and reads the AIs' record off an instrument from that era: a screen, a recorder, a printout.
- The live chart is made by the instrument itself, in its medium:
  - pixels on the CRT;
  - phosphor vectors on a monitor;
  - pen ink on chart paper;
  - type on green-bar paper.
- The chart is mapped into the painting's perspective.
- The switch is a part of the instrument you would really touch: a key, a knob, a tick box, a printed option."

## The data (shared by every take, `_hd.js`)
- **Hit rate:** each AI's hit rate after every graded round is (right + 1) / (calls + 2), from `__x2pPnl().A[m].per` (right = the call made money on direction). The default view shows this.
- **Coin flip:** 50%, drawn as the base line.
- **P&L:** `../pnl/_lib.js` windows (flat $100,000 per call; Season / 7 days / 24h, the same rules as the Leaderboard).
- **Checked on the rendered page (80 graded rounds):**
  - Hit rate: Grok 62% (45 of 72 right; (45+1)/(72+2) = 62.2%), Claude 60% (48 of 80), GPT 54% (43 of 80), Kimi 46% (37 of 80).
  - Season P&L: Grok +$148K, Claude +$103K, GPT −$56.9K, Kimi −$70.7K.
  - 7 days: Grok +$111K, Claude +$59.6K, Kimi −$37.6K, GPT −$82.7K.
- **Live text:** every figure and word is computed at run time. A screen-reader line (`aria-live`) states the open view's figures.

## How the marks are put into the scene
- **Perspective:** each display surface (the CRT glass, the four monitors, the strip of paper, the fan-fold sheet) was measured on the painting. It was found by a flood fill of the dark glass or the bright paper (`quad.py`) and checked by eye against a grid (`grid.py`, `ov.py`). The chart is then mapped onto it with one `matrix3d`, using pnl2's `PG.quad`.
- **Material:**
  - CRT: thresholded pixels with the screen's own glow and scanlines.
  - Monitors: vector strokes that flicker on.
  - Polygraph: ink multiplied into the paper, with a slight bleed (displacement filter).
  - Printout: dot-matrix type with dropouts, multiplied into the paper.
- **Light:** on A, the painting's own glare is cut from the glass (`hl.py`) and screened back over the pixels. The lamp's reflection crosses the title, as it would on real glass.

## The takes
**A · The analyst's terminal (my pick)**
- **The scene:** a 1983 analyst's desk: green banker's lamp, binders, fan-fold paper.
- **On the CRT:** the chart is real pixel art. It is drawn on a low-resolution canvas (one canvas pixel per 1.6 CSS px on a phone, 2.1 on desktop), and every glyph is thresholded to hard pixels in Press Start 2P, so it stays crisp at any zoom.
- **What the screen shows:**
  - a title bar in reverse video: "SMART OR LUCKY?" and R80;
  - a dashed gold coin-flip row;
  - each AI in its own phosphor colour, the leader drawn double;
  - on the phone, a ranked legend; on desktop, labels at the line ends;
  - a menu bar with the open function in reverse video and a blinking cursor.
- **The switch:** the painted keyboard. F1 hit rate, F2 P&L, F5 to F7 the window. The legends are printed on the blank painted keycaps, a press sinks the cap, and the screen redraws top to bottom. The menu bar on the glass can be tapped too.
- **Could fail:**
  - On a phone the painted keys are small tap targets (about 33x18 px). The on-glass menu is the bigger target.
  - The pixel type is chunky, so the phone's legend runs close to the glass edge in P&L ("CLAUDE +$103K").
  - The glare washes part of "HIT RATE BY ROUND". That is deliberate, but it costs legibility.
  - The chart is a canvas: live but not selectable text. The screen-reader line carries the figures.

**B · Agent Tower**
- **The scene:** the top floor of a tower at night: four sealed glass pods with glowing cores, and one monitor per pod in the board's order.
- **On each monitor:** a vector display of "POD n · NAME", the figure big, its own line against "COIN 50%", and "45 OF 72 RIGHT". All four monitors share one scale, so they compare side by side.
- **The switch:** the console's two painted knobs (MODE, WINDOW). A painted index mark turns to the open stop, and the stops are engraved round each knob.
- **Could fail:**
  - Small multiples hide the crossing: you cannot see Claude and Grok racing each other.
  - On a phone each monitor is about 140 to 190 px wide, so the footers are 9px.
  - The monitors re-order by rank on a switch, which can read as the pods swapping.
  - On desktop the knobs sit low on the console and their engraved stops are small (13px).
  - The pods do not say which AI is in which; the monitors carry the names.

**C · The polygraph**
- **The scene:** a lie-detector test for four AIs (skill or bluff?). The four pens have written each hit rate up the strip chart: round 1 nearest you, the newest round at the pens.
- **On the paper:** printed chart stock with rules every 10% and a pale rule every 10 rounds. The coin flip is the heavy red dashed centre rule. The traces are pen ink, the leader's heavier.
- **The switch:** the examiner's typed form at the near end of the strip: "SUBJECT: 4 AIs · SMART OR LUCKY?" with tick boxes. A tap ticks a box in red pencil, and the traces race up the paper to the pens.
- **The strongest metaphor for the question:** "Smart or lucky?" becomes "is it telling the truth?".
- **Could fail:**
  - The painted pen tips sit at fixed places, but each trace ends at its own value. A real recorder's traces would end under the pens. A re-render with the pens lifted, or pens drawn into the page, would fix it.
  - Time runs bottom to top, which some readers will not expect.
  - The early rounds' wild swings (round 1 at 50/50) take the eye.

**D · The printout**
- **The scene:** a 1970s computer room. The line printer types a classic printer plot on green-bar paper: one printed line per round (sampled to fit), the letters G C P K at each hit rate, the coin flip a red ribbon column (`¦`).
- **On the paper:** the job header, the legend and the scale are printed first, so they lie nearest you; a "NOW" line sits at the printer's head.
- **The switch:** the header's bracketed options ("RUN [HIT RATE] [P&L] WINDOW [SEASON] [7 DAYS] [24H]"). A tap types the new run line by line.
- **Could fail:**
  - The weakest on a phone: in strong perspective the type is about 6 to 9px and the dot dropouts eat letters. Desktop reads fine.
  - The painted green bars do not line up with the printed lines.
  - Letters instead of colour make each AI slower to follow.

## Pick: A
- **Owner's ask:** it is what the owner asked for ("high-crisp pixel... at a desk analyzing... on a computer screen"), and it is the most legible on a phone.
- **The material carries the meaning:** the pixels make "a machine evaluating machines" without a word.
- **The switch is the most natural:** pressing a key is something everyone knows how to do.
- **Second choice:** C, for the story ("a lie detector for AIs"). Its pen mismatch must be fixed before it is painted.
- **Next step:** paint the picked desk at 2K. Repaint the keycaps blank but larger on the phone crop, and paint the screen at a slightly lower angle, so that measuring the glass stays easy.

## Files
- `_hd.js` / `_hd.css`: the hit-rate series, the mount, the state and switch handling (`data-set="mode:hit"`; `"win:*"` cycles).
- `a.js` to `d.js` (+ `.css`): one file pair per take.
- `run.js`: shots. Needs `ez/` served on port 8961. For another state: `MODE=pnl WIN=d7 node run.js <dir> a,b 390,1280`.
- `rec.js`: the video.
- `board.py`: the boards.
- `hedra.py` and `mkjobs.py`: the roughs.
- `quad.py`, `grid.py`, `ov.py`: measuring the display surfaces.
- `hl.py`: the CRT glare.
- `img/`: the paintings.
