# Round H13, area `sol5`: "Smart or lucky?" as the bet's S1 sequence

Brief: `../BRIEF-H.md`, Round H13, bullet `sol5` (from sol4's pick E3 + I2, with Round H12's rules: scroll, not show; the S1
sequence; facts on the world; voices in balloons or captions; almost no plain text). Mockups only, laid over the real built page
(`ez/v47-live-x3plus.html`, served from `ez/`) in Playwright in place of today's big board. Nothing in `ez/tools/v22/` or any
`ez/v4*.html` touched; nothing deployed or published.

- **Boards:** `ez/x2p-x3p-h13-sol5-390.png` (one column per take, today first; the pick and V2 also shown switched to P&L Season),
  `ez/x2p-x3p-h13-sol5-1280.png` (one row per take; pick and V2 with P&L beside), `ez/x2p-x3p-h13-sol5-closeup.png` (beat 2 in
  hit rate and P&L, V2's balloons, beat 4).
- **Paintings:** 26 Hedra jobs, all gpt-image-2 (22 roughs at 1K medium, 4 of the pick at 2K high): **$1.95 of the $10**.

## The sequence (the bet's S1, applied)
1. **Title over the establishing picture:** sol4's E3 (the calm mask held up, the gold coin spinning behind it) at 2K, "Smart or
   lucky?" in the Overview's one heading face breaking its bottom edge, as "Bet #1: NVIDIA" breaks the vault. No caption under it any
   more: the old line "Four AIs, 312 graded calls. A coin flip gets 50%." moved onto the instrument.
2. **The instrument, visible and working.** The lie detector is in the picture and its pens are the chart's line ends: one stylus was
   painted alone (`img/pen.png`, keyed out of magenta), and code places one copy per AI with its **tip exactly on that AI's line end**
   and its pivot on the brass rail at the strip's right edge (pivots spread so arms never cross; recomputed on every switch and
   resize). The arms tremble by 1px (the one small loop: the machine is writing; still with reduced motion). The chart is sol3's
   renderer (copied to `_s3b.js` with two additions): hit rate round by round, (right + 1) / (calls + 2), all four lines from
   50/50; the switch printed across the strip's top (Hit rate, P&L, Season, 7D, 24H); in hit rate a typed key under the axis
   ("Grok 63% Claude 60% GPT 54% Kimi 46%", one line, each in its pen's ink); in P&L the W-L / P&L table on the strip, two by two
   on phones so the chart keeps its height. **The coin flip is lettered on the strip** in the axis row beside its own dashed red
   swatch ("--- COIN FLIP 50%"). **The graded-calls count** (summed from ROUNDS, 312 today) turns on the machine's counter window
   as odometer digits; the brass plates are engraved "Graded calls →" and "4 AIs on test".
3. **"Same AI. Same voice."** kept as sol4 had it (lettered, Bangers): the two microphone panels, the hit-rate leader's right call
   and wrong call of the closest size, picked by code (today Grok: "GE Vernova falls 4.5%." fell 1.9%, Right; "Accenture falls
   4.5%." rose 16.02%, Wrong).
4. **The hook to the bet:** a new panel split by light: on the bright green floor traders feed the chart strip along the floor into
   the lit gap of a noir vault door (the bet chapter's world). The caption box drawn into the top of the panel carries the old
   second plain line and the hand-over: "Only the record shows which call was the guess." / (gold) "So the pool goes on the call of
   the AI on top." (U1's own wording, shortened). The next thing on the page is "Bet #1: NVIDIA" over the vault.

## The four variations (plus the pick at 2K)
- **V1 the machine up close** (pick; `vh` is V1 at 2K): the polygraph's front fills the panel head-on, its window is the strip, the
  exchange traders peer over its top edge, one pointing at the lines. Counter + plates under the window.
- **V2 the onlookers react:** the crowd holds the printout up over their heads (the polygraph prints it in the corner), and the
  two old plain lines are now **their** balloons: the shocked trader "Four AIs! 312 graded calls!", the laughing one "And a coin
  flip gets 50%?". Here the line ends keep their chalk-style labels ("Grok 63%"), no pens (the paper has left the machine).
- **V3 the floor strip:** the strip runs out of the machine across the exchange wall, pens at the machine's end, the crowd below
  pointing up; the count on the machine's own small counter.
- **V4 the mask speaks:** E3 with a balloon painted from the mask's mouth, "Trust me. I'm sure." (the AI's voice, the chapter's
  claim said by the face), then V1.

## The surface under every live text
| live text | surface |
|---|---|
| "Smart or lucky?" | the heading face over the establishing panel's bottom edge (the Overview's one heading, as the bet's title) |
| "Trust me. I'm sure." (V4) | the empty balloon painted from the mask's mouth |
| switch, axis, lines, key, coin-flip lettering, W-L / P&L table | the empty black smoked-paper strip: the machine's window (V1, V4, pick), the held printout (V2), the strip on the wall (V3) |
| line ends (V1, V3, V4, pick) | the painted stylus tips, placed per AI |
| 312 | the machine's empty counter window (odometer digits) |
| "Graded calls →", "4 AIs on test" | the two empty brass plates on the machine (engraved: dark ink cut in, pale lip) |
| "Four AIs! 312 graded calls!" / "And a coin flip gets 50%?" (V2) | the two empty balloons painted over the crowd |
| "Same AI. Same voice." | lettered on the chapter's ground (kept from sol4) |
| the calls and results in beat 3 | sol4's painted balloons and caption boxes |
| "Only the record..." / "So the pool goes..." | the empty caption box drawn into the top of the hook panel |

## Plain text outside the world, per take
- **All takes:** one lettered line, "Same AI. Same voice." (the brief says keep it). Nothing else outside a painted surface (sol4 had
  three lines of plain text: the 312 caption, "Same AI. Same voice." and "Only the record...").
- V1, V3, V4, pick: 0 extra words. V2: 0 extra words (its lines live in balloons).

## My pick: V1, painted at 2K (`vh`)
The machine itself is the panel, so the reader sees the lie detector doing the work: the pens are on the line ends and the strip is
its window, head-on, the largest data surface of the four on a phone (about 330 x 200 px at 390). The counter and plates give the
old caption a place on the machine, and the peering traders keep the "people in the room" the owner liked in today's big board. V2
is the strongest alternative if the owner wants the lines as voices (it is the funniest), V4 if the mask should talk.

## Checks run (rule 0, the hard rules)
- Data: every mount checks the hit-rate series against the live big board's table (W-L and hit rate per AI: 4 of 4 ok) and the P&L
  windows against the Leaderboard rows (4 of 4 ok). Grok 45-27 63%, Claude 48-32 60%, GPT 43-37 54%, Kimi 37-43 46%; P&L Season
  +$148,480, +$102,950, -$56,930, -$70,650 at the time of the shots. 312 is summed from ROUNDS' calls.
- 390, 1280 and 320: no sideways scroll (scrollWidth = viewport), no console errors; balloons, plates, counter and caption text fit
  their painted blanks (type steps down until it fits, measured).
- No white or pale module grounds (the balloons are balloons), no dot-filled module, no emoji, nothing over a face or logo, no
  company named by ticker alone.
- Known on the boards: at 1280 sol4's beat-3 caption boxes overhang by 1 to 2 px of line height (as in H11); in P&L at 320 the
  bottom row's figures sit 1 to 3 px past the strip's foot on the pick; in P&L on V2 and V3 (shorter strips) the chart above the
  table is very short and its two axis labels touch.

## How each take could fail
- **All:** a reader may not know a polygraph; the pens and the jagged lines have to say "lie detector" alone. The pen sprite is one
  painted stylus repeated four times at code-chosen angles: at desktop size the repetition shows. Beat 3 still shows Grok's worst
  call (the pair is chosen by code and will change). Safari not checked.
- **V1 / pick:** on desktop the window is about 475 x 220 px inside a 1000 px panel, so the chart type is small (the 16:9 painting
  keeps the window at a third of the height); the brass plates are cut off at the 16:9 frame's foot, so desktop has the counter but
  no plates. "Graded calls →" points across a knob to the counter, which a reader may not follow.
- **V2:** the printout has left the machine, so no pen draws the lines (the "machine doing the work" is weakest here); its P&L view
  crushes the chart; the balloons are the crowd's voices, which makes the facts sound like hype.
- **V3:** the strip is short on phones (P&L barely fits); on desktop (`ia-strip-w2`) the strip hangs on the wall apart from the machine,
  so the pens float at the strip's end.
- **V4:** "Trust me. I'm sure." is a line no AI here said; it is the chapter's claim in a voice, which may read as mocking the AIs.
- **Beat 4:** the phone hook paints the strip as white graph paper, the desktop one as black: two different strips for one record.
  The vault door is drawn fresh here, not the bet's own painting, so the two vaults differ.

## Cost
$1.95 of $10: roughs $0.92 (22 jobs), the pick at 2K $1.03 (4 jobs). No failed jobs.

## Files
`_s5.js` (the sequence, pens, counter, plates, balloons, caption, the takes' geometry), `_s5.css`, `_s3b.js` (sol3's renderer with
the pen gutter, the key row, the coin-flip lettering and the two-by-two P&L table), `takes.js` (V1 to V4, `vh`), `run.js`
(`node run.js <out> now,vh,v1,v2,v3,v4 390,1280 hit|season|d7|d1`; serve `ez/` on port 8974), `board.py <shots dir>`,
`measure.py` (every empty dark and white surface of a painting -> `surf.json`, overlays in `ovl/`), `gen.py` (Hedra v3),
`jobs*.json`, `log.jsonl`, `img/`. Loads `../pnl/_lib.js`, `../sol3/poly.js` and `../sol4/_s4.js` (the beat-3 pair).

## Jobs
| name | model | settings | cost | time | file |
|---|---|---|---|---|---|
| ib-tape-3x4 | gpt-image-2 | 1K medium 3:4  | $0.038 | 63 s | img/ib-tape-3x4.jpg |
| pen | gpt-image-2 | 1K medium 1:1  | $0.054 | 56 s | img/pen.jpg |
| ic-window-3x4 | gpt-image-2 | 1K medium 3:4  | $0.038 | 63 s | img/ic-window-3x4.jpg |
| ia-strip-3x4 | gpt-image-2 | 1K medium 3:4  | $0.038 | 70 s | img/ia-strip-3x4.jpg |
| e3-bal-3x4 | gpt-image-2 | 1K medium 3:4 (ref e3-mask-hd-3x4.jpg) | $0.049 | 64 s | img/e3-bal-3x4.jpg |
| hook-3x4 | gpt-image-2 | 1K medium 3:4  | $0.037 | 63 s | img/hook-3x4.jpg |
| ia-strip-16x9 | gpt-image-2 | 1K medium 16:9 (ref ia-strip-3x4.jpg) | $0.042 | 40 s | img/ia-strip-16x9.jpg |
| hook2-3x4 | gpt-image-2 | 1K medium 3:4  | $0.038 | 76 s | img/hook2-3x4.jpg |
| e3-bal-16x9 | gpt-image-2 | 1K medium 16:9 (ref e3-mask-hd-16x9.jpg) | $0.042 | 78 s | img/e3-bal-16x9.jpg |
| hook3-3x4 | gpt-image-2 | 1K medium 3:4  | $0.038 | 50 s | img/hook3-3x4.jpg |
| ib-tape-16x9 | gpt-image-2 | 1K medium 16:9 (ref ib-tape-3x4.jpg) | $0.042 | 84 s | img/ib-tape-16x9.jpg |
| hook2-16x9 | gpt-image-2 | 1K medium 16:9  | $0.030 | 76 s | img/hook2-16x9.jpg |
| hook3-16x9 | gpt-image-2 | 1K medium 16:9  | $0.030 | 50 s | img/hook3-16x9.jpg |
| ic-window-16x9 | gpt-image-2 | 1K medium 16:9 (ref ic-window-3x4.jpg) | $0.042 | 84 s | img/ic-window-16x9.jpg |
| ib-tape-p2 | gpt-image-2 | 1K medium 3:4 (ref ib-tape-3x4.jpg) | $0.050 | 42 s | img/ib-tape-p2.jpg |
| ic-window-p2 | gpt-image-2 | 1K medium 3:4 (ref ic-window-3x4.jpg) | $0.050 | 48 s | img/ic-window-p2.jpg |
| ia-strip-p2 | gpt-image-2 | 1K medium 3:4 (ref ia-strip-3x4.jpg) | $0.050 | 53 s | img/ia-strip-p2.jpg |
| ia-strip-w2 | gpt-image-2 | 1K medium 16:9 (ref ia-strip-p2.jpg) | $0.042 | 43 s | img/ia-strip-w2.jpg |
| ib-tape-w2 | gpt-image-2 | 1K medium 16:9 (ref ib-tape-p2.jpg) | $0.042 | 42 s | img/ib-tape-w2.jpg |
| ic-window-w2 | gpt-image-2 | 1K medium 16:9 (ref ic-window-p2.jpg) | $0.042 | 42 s | img/ic-window-w2.jpg |
| ib-tape-w3 | gpt-image-2 | 1K medium 16:9 (ref ib-tape-w2.jpg) | $0.042 | 36 s | img/ib-tape-w3.jpg |
| ib-tape-p3 | gpt-image-2 | 1K medium 3:4 (ref ib-tape-p2.jpg) | $0.050 | 43 s | img/ib-tape-p3.jpg |
| ic-window-hd-w | gpt-image-2 | 2K high 16:9 (ref ic-window-w2.jpg) | $0.234 | 87 s | img/ic-window-hd-w.jpg |
| hook3-hd-w | gpt-image-2 | 2K high 16:9 (ref hook3-16x9.jpg) | $0.234 | 88 s | img/hook3-hd-w.jpg |
| ic-window-hd-p | gpt-image-2 | 2K high 3:4 (ref ic-window-p2.jpg) | $0.280 | 95 s | img/ic-window-hd-p.jpg |
| hook3-hd-p | gpt-image-2 | 2K high 3:4 (ref hook3-3x4.jpg) | $0.280 | 100 s | img/hook3-hd-p.jpg |
