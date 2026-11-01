# Round H11, area `sol4`: "Smart or lucky?" in three beats, Silver Age flat print

Brief: `../BRIEF-H.md`, "Round H11", bullet `sol4` (with its side item on the bet chapter). Mockups only, laid over the real built
page (`ez/v47-live-x3plus.html`) in Playwright in place of today's big board. Nothing in `ez/tools/v22/` or any `ez/v4*.html` was
touched; nothing deployed or published.

- **Boards:** `ez/x2p-x3p-h11-sol4-390.png` (one column per take, today first; the pick and the desk take also shown switched to
  P&L Season), `ez/x2p-x3p-h11-sol4-1280.png` (one row per take), `ez/x2p-x3p-h11-sol4-closeup.png` (beat 2 hit rate and P&L,
  beat 3), `ez/x2p-x3p-h11-sol4-bet.png` (the bet side item: today, K1, K2 at 390 and 1280).
- **Video:** `ez/x2p-x3p-h11-sol4-switch.mp4` (the pick at 390: hit rate, then P&L Season, 7 days, 24h, back to hit rate).
- **Paintings:** 24 Hedra jobs, all gpt-image-2 (20 roughs at 1K medium, 4 of the pick at 2K high), **$1.89 of the $10**. Every
  job is in `log.jsonl`; the table is at the end. No words or numbers in any painting.

## The style
Every painting asks for the Silver Age flat print the owner picked for this round (rounds4's B, sol3's S2): a clean brush-and-nib
ink line, flat bright colours led by the logo's gold, green and red, Ben-Day dots only in a few shadows, plates a hair out of
register, "bright and flashy, not dark". The chapter's ground is the logo's green (#079a55) edge to edge, not the dark gold band;
the noir stays in the bet chapter. The heading is the Overview's one face (the bet's `h2.hb-h` recipe: Bangers, #ffd21f, ink stroke,
red and ink extrusion, -2.2deg), breaking the bottom border of the establishing panel as "Bet #1: NVIDIA" breaks the vault's.

## What I made: the bet's three beats, applied
1. **The establishing picture** (the claim: an AI sounds sure either way). Four ideas, each a 3:4 for phones (shown 1:1 from the
   top) and a 16:9 for desktop:
   - **E1 the robot whose nose grows:** a tin-toy robot at a radio microphone, finger raised, its nose telescoping across the
     panel with a leaf on it (the owner's example: the lie).
   - **E2 the sure mouth over a blank page:** a huge grinning mouth talking at full volume over a blank sheet and an uncapped pen
     (the hallucination: confident words, nothing on the page).
   - **E3 the coin behind the mask:** a gloved hand holds up a calm, all-knowing theatre mask; behind it a gold coin is spinning
     (smart face, lucky coin: the chapter's whole question in one picture).
   - **E4 the coin-op oracle:** a carnival fortune-teller machine, a tin robot in a turban over a crystal ball with a coin flipping
     in it, a coin dropping into the slot, a blank fortune card popping out (my own idea: the "insert a coin" gambling beat after
     Meet the models' fight night).
   Under it one lettered line (the bet caption's face, Shantell Sans 700), live: "Four AIs, {graded calls} graded calls. A coin flip
   gets 50%." The count is summed from ROUNDS' calls.
2. **The instrument: the lie detector, redrawn in the flat print.** Two places:
   - **I1 on the desk** (sol3's P4, the owner's pick, top-down): repainted from P4 as a reference, bright: green felt, and the
     environment the owner liked in the live big board, other people in it: the hands, striped sleeves and red sleeve-gartered arms
     of onlookers leaning in, a pencil, a coffee, a pointing finger, chalk tallies and inked arrows on the felt round the sheet.
     The four pens write the chart; the names and figures are the chart's typed key under it (the pens are in the way of line-end
     labels); in P&L the same key is the W-L / P&L table.
   - **I2 in the exchange room among people:** a 1920s trading floor, traders crowding the machine on a desk; the chart is chalked
     on the slate board on the wall behind it, head-on, in a gold frame; chalk tallies and arrows on the wall round it. Here the
     line ends have room: "Grok 63%" chalked at each end, one line, name then value.
   Both run on sol3's renderer (`../sol3/_s3.js`, `S3World`): the hit rate round by round, (right + 1) / (calls + 2) per AI after
   every graded round, the coin flip at 50%; the switch printed across the sheet's top (Hit rate, P&L, then Season, 7D, 24H; the
   one not yet tried pulses until used); in P&L the small table under the chart: per AI, W-L and P&L for the window. The leader's
   line and name in gold.
3. **Why it matters**, two panels and two lines: "Same AI. Same voice." over two square panels of the same chrome radio
   microphone (the AI's voice) under a spotlight, a green panel and a red panel. In each, the balloon carries a real call and the
   caption box drawn into the bottom of the panel carries what the close did:
   - Grok, round 57: "GE Vernova falls 4.5%." / Fell 1.9%. **Right**
   - Grok, round 10: "Accenture falls 4.5%." / Rose 16.02%. **Wrong**
   then "Only the record shows which call was the guess." The pair is chosen by code (`S4.pair`): the hit-rate leader's right call
   and wrong call of the closest stated size (same direction first, then the bigger miss), so it stays true as rounds come in.
   Today both are "falls 4.5%": the same claim, word for word, one right and one wrong.

## The painted surface under every live text
| live text | surface |
|---|---|
| "Smart or lucky?" | the heading face over the panel's bottom edge, as the bet's title (not a text-in-picture surface; the Overview's one heading) |
| "Four AIs, N graded calls..." | lettered on the chapter's ground, as the bet's caption (no box) |
| chart lines, axis, end labels, switch, W-L / P&L table (I1) | the empty navy chart sheet on the desk, painted blank for it, inside the pens' reach |
| the same (I2, the pick) | the empty slate board on the exchange wall, painted blank, head-on, gold-framed |
| "Same AI. Same voice." / "Only the record..." | lettered on the chapter's ground |
| "Grok, round 57: 'GE Vernova falls 4.5%.'" | the empty speech balloon painted rising from the microphone |
| "Fell 1.9%. Right" | the empty black caption box with a gold border painted into the panel's foot |
| bet K1: C1/U1/K1, names, lines | the empty board painted below the parts (silkscreen ink on the board's green) |
| bet K2: names, lines | the three empty caption boxes painted into the plate, each on a gold trace from its part |

## Side item: the bet chapter's callouts (mock only; the vault and the chip untouched)
The live parts list (C1 the pool, U1 the call, K1 the switch) is page text on the dark ground under the parts plate. Two takes put it
in the plate's world, the same words as live (the pool's share read from `SIM.poolShare`):
- **K1 silkscreen:** the plate extended below the parts as empty board; the lines printed on it as a manufacturer prints part
  labels: white silkscreen ink (Barlow Condensed capitals, screen-blended so the board's weave shows), the designator in a printed
  outline, the name, the line; right and wrong in pale green and red ink. Phone: a 3:4 plate with three bands of board stacked,
  each reached by a trace from its part; desktop: a 4:3 plate with the empty board under the parts, one block under each pad.
- **K2 caption boxes:** three blank comic caption boxes painted into the plate (black, gold ink border, hard shadow), the name in the
  heading face (Bangers, gold) and the line in the bet caption's lettering (Shantell Sans). Phone stacked, desktop side by side.
Both fit their surfaces at 390 and 1280 (the type steps down until each block sits inside its painted surface; measured).

## My pick: E3 + I2, painted at 2K
- **E3, the coin behind the mask,** is the only establishing picture that says both halves of the question at a glance: the calm,
  all-knowing face is "smart", the coin spinning behind it is "lucky", and the mask hiding the coin is the point of the chapter
  (an AI sounds just as sure when it is guessing). E1 and E2 say "it lies", which is half the story and harsher than the data
  (lesson 8: the leaders do beat a coin so far); E4 is the richest scene but needs a second look to find the coin in the ball.
- **I2, the exchange room,** because on a phone its chart is about twice the desk's (the board is ~300px wide at 390, the desk's
  sheet ~180px, and the pens take part of it), the line ends can carry "Grok 63%" in chalk, the board is head-on by nature, and it
  keeps what the owner likes in today's big board (people in the room, chalk marks) without the tilt the owner disliked. I1 stays
  the alternative that keeps the owner's P4 pick literally.
- Beat 3 and the chapter ground are the same for every take. For the bet, **K2** reads better at arm's length on a phone (the
  heading face and the gold borders tie to the title); **K1** is the more "printed into the world" answer and the quieter one.

## Checks run (rule 0 and the hard rules)
- Data: every mount checks sol3's hit-rate series against the live big board's own table (W-L and hit rate per AI: 4 of 4 ok) and
  the P&L windows against the Leaderboard rows (PN: 4 of 4 ok). Grok 45-27 63%, Claude 48-32 60%, GPT 43-37 54%, Kimi 37-43 46% at
  the time of the shots. The beat 3 pair and the graded-calls count come from ROUNDS.
- 390 and 1280: no sideways scroll (scrollWidth = viewport); balloon and caption box text inside its painted box (measured
  scrollWidth/Height, at most 2px of line-height overhang at 1280); 320 checked in P&L on three takes; no console errors.
- No white or pale module grounds (the balloons are balloons, the only white); no dot-filled module; no native emoji (the right /
  wrong dots in the bet takes are type, as live); nothing laid over a logo or face; no company named by ticker alone (names only).
- Known on the boards: on the desk takes (I1) the switch's last item ("24H") runs a few px past the sheet's right edge at 390, and
  "Season 7D 24H" at 320 (the sheet is narrow on a phone; the pick, I2, has none outside its board at 320, 390 or 1280); in P&L on a
  phone the chart above the table is short (about 70px); the fingers of two onlookers touch the sheet's edge outside the chart
  area (I1 16:9). The 1280 caption boxes overhang their box by 1 to 2px of line height (no visible clipping).

## How each take could fail
- **E1 nose / E2 mouth:** read as "AI lies", a sadder story than the record (two AIs beat a coin so far); E1 is a robot, a new
  character in a book whose cast is the four founders (lesson 74), though it is a symbol, not a cast member; E2's 16:9 has a flat
  green panel on its right third (a seam from the recomposition), which reads unfinished on desktop.
- **E3 mask:** the coin carries a generic laurel-wreathed profile (painted, not a real coin), and a visitor may not connect a
  theatre mask with "confident"; the 2K 3:4 painted a navy band at the foot (cropped away on phones by the 1:1 top crop).
- **E4 oracle:** busy; the coin in the crystal ball is small; another robot.
- **I1 desk:** the chart is small on a phone (about 180 x 250px), the switch's last item crowds the sheet's edge, top-down is the
  least comic-panel view, and the onlookers' fingers touching the sheet sit close to the data.
- **I2 floor:** the board is the upper third of the painting, so on a phone the crowd below is cropped hard; chalk-coloured lines
  (Kimi's blue, GPT's green) on navy are less crisp than ink; the machine in front no longer draws the chart itself (the story says
  it does: the wires run up), which a reader may not make out.
- **Beat 3:** the pair changes when the data changes (by design), and today it shows the leader's worst call (Accenture, the
  season's biggest miss), which might read as picking on Grok; two panels at 390 are 177px each, so the balloon type is about 15px
  (Bangers) and the caption 12px; the green / red panel grounds pre-announce right and wrong before the caption is read (I let the
  colour carry it on purpose; a neutral pair would make the reveal the caption's).
- **Bet K1 / K2:** the plates were repainted by the model from the live plate as a reference, so the parts are close to, not
  identical with, today's vault-world plate (sizes and light shift a little); K2's phone plate joins all three boxes by traces in a
  chain, which reads as a flow (pool, call, switch) but is not a literal wiring; K1's silkscreen at 13 to 15px on a phone is small
  print by nature.
- **All:** Safari not checked; nothing measured at 4x CPU (the renderer is sol3's: one SVG, lines draw in 1.5 s on a switch).

## Cost
$1.89 of $10 (one failed job included at its estimate: the first robot prompt was refused and re-worded). Roughs $0.86, the pick
at 2K $1.03.

## Files
`_s4.js` (the three beats, the pair, the worlds on sol3's S3World), `_s4.css`, `bet.js` / `bet.css` (the side item), `run.js`
(`node run.js <out> ehih,e1i1,.. 390,1280 hit|season|d7|d1`; take = establishing id + instrument id), `betrun.js`
(`node betrun.js <out> now,k1,k2 390,1280`), `rec.js` (`node rec.js ehih out.mp4 390`), `board.py <shots dir>`, `measure.py`
(sol3's, the dark surfaces), `gen.py` (Hedra v3; refs uploaded via /v3/files), `jobs*.json`, `log.jsonl`, `img/`, `ovl/`.
Serve `ez/` on port 8974. Loads `../pnl/_lib.js` and `../sol3/{_s3,arcade,poly}.js`.

## Jobs
| name | model | settings | cost | time | file |
|---|---|---|---|---|---|
| e1-nose-3x4 (refused) | gpt-image-2 | 1K medium 3:4 | $0.037 | 34 s | - |
| e2-mouth-3x4 | gpt-image-2 | 1K medium 3:4 | $0.037 | 35 s | img/e2-mouth-3x4.jpg |
| e3-mask-3x4 | gpt-image-2 | 1K medium 3:4 | $0.037 | 34 s | img/e3-mask-3x4.jpg |
| e4-oracle-3x4 | gpt-image-2 | 1K medium 3:4 | $0.037 | 41 s | img/e4-oracle-3x4.jpg |
| i1-desk-16x9 | gpt-image-2 | 1K medium 16:9 (ref sol3 top-s1w-16x9) | $0.042 | 42 s | img/i1-desk-16x9.jpg |
| i2-floor-3x4 | gpt-image-2 | 1K medium 3:4 | $0.038 | 41 s | img/i2-floor-3x4.jpg |
| i1-desk-3x4 | gpt-image-2 | 1K medium 3:4 (ref sol3 top-s1-3x4) | $0.050 | 48 s | img/i1-desk-3x4.jpg |
| w1-a | gpt-image-2 | 1K medium 1:1 | $0.054 | 41 s | img/w1-a.jpg |
| w1-b | gpt-image-2 | 1K medium 1:1 | $0.054 | 41 s | img/w1-b.jpg |
| i2-floor-16x9 | gpt-image-2 | 1K medium 16:9 | $0.030 | 47 s | img/i2-floor-16x9.jpg |
| b1-silk (unused: boxes in perspective, traces through them) | gpt-image-2 | 1K medium 4:3 (ref bet-parts-h2) | $0.049 | 42 s | img/b1-silk.jpg |
| b2-cap | gpt-image-2 | 1K medium 4:3 (ref bet-parts-h2) | $0.049 | 48 s | img/b2-cap.jpg |
| e1-nose-3x4 | gpt-image-2 | 1K medium 3:4 | $0.037 | 34 s | img/e1-nose-3x4.jpg |
| e2-mouth-16x9 | gpt-image-2 | 1K medium 16:9 (ref e2-mouth-3x4) | $0.042 | 36 s | img/e2-mouth-16x9.jpg |
| e3-mask-16x9 | gpt-image-2 | 1K medium 16:9 (ref e3-mask-3x4) | $0.042 | 36 s | img/e3-mask-16x9.jpg |
| e4-oracle-16x9 | gpt-image-2 | 1K medium 16:9 (ref e4-oracle-3x4) | $0.042 | 36 s | img/e4-oracle-16x9.jpg |
| e1-nose-16x9 | gpt-image-2 | 1K medium 16:9 (ref e1-nose-3x4) | $0.042 | 36 s | img/e1-nose-16x9.jpg |
| b1-silk2 | gpt-image-2 | 1K medium 4:3 (ref bet-parts-h2) | $0.049 | 42 s | img/b1-silk2.jpg |
| b1-silk-3x4 | gpt-image-2 | 1K medium 3:4 (ref bet-parts-h2) | $0.049 | 43 s | img/b1-silk-3x4.jpg |
| b2-cap-3x4 | gpt-image-2 | 1K medium 3:4 (ref b2-cap) | $0.049 | 43 s | img/b2-cap-3x4.jpg |
| e3-mask-hd-16x9 | gpt-image-2 | 2K high 16:9 (ref e3-mask-16x9) | $0.234 | 69 s | img/e3-mask-hd-16x9.jpg |
| i2-floor-hd-16x9 | gpt-image-2 | 2K high 16:9 (ref i2-floor-16x9) | $0.234 | 88 s | img/i2-floor-hd-16x9.jpg |
| e3-mask-hd-3x4 | gpt-image-2 | 2K high 3:4 (ref e3-mask-3x4) | $0.280 | 94 s | img/e3-mask-hd-3x4.jpg |
| i2-floor-hd-3x4 | gpt-image-2 | 2K high 3:4 (ref i2-floor-3x4) | $0.280 | 101 s | img/i2-floor-hd-3x4.jpg |
