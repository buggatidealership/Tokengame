# H25 · meet9: Meet the models, the lines and the ground between the chips

Brief: `../BRIEF-H.md`, task `meet9`. These are mockups laid over the built `v46-live-x2plus.html`, on top of the live chips8 take c. Nothing in `ez/tools/v22/`, `ez/v4*.html` or `ez/media/` changed. Nothing was deployed or published.

Boards:
- `ez/x2p-h25-meet9-390.png`: today first, then takes A to E.
- `ez/x2p-h25-meet9-1280.png`
- `ez/x2p-h25-meet9-closeup.png`: the first gap of each take, at 3x for 390.

Hedra spend: **$1.28** of the $40. The account balance was $37.08 at the start and is shared with the other helpers, so I spent where the chip's own paintings could not carry the take.

`meetbus` had not landed when I finished, so D's ground is my own (colour spill), not built on its bus.

## A live bug found on the way (not mine to fix: `tools/v22/`)
`tools/v22/story/x2p_top.css` ends inside an unclosed `@media (prefers-reduced-motion:no-preference){` (line 240; braces 267 open, 266 closed). build.py concatenates `x2p_chips.css` and `x2p_more.css` after it in one `<style>`, so every rule of Meet the models, the ground, the rounds, the proof and the bet sits inside that media query.

For a visitor with **reduced motion** on, those sections lose their CSS. Seen in Chromium: the founder poster blows up to full width and the chips collapse. The fix is one `}` at the end of x2p_top.css. My shots run with motion on for that reason.

## The want, in an expert's words
Make the personality line diegetic: it should be emitted by the hardware, the way the NVIDIA timer's digits are emitted by the chip. Make the inter-chip gutters part of one continuous board that carries signal, so the section bleeds edge to edge and has no black. Keep the line readable (at least 9 px cap height at 390) and still computed by x2p_chips.js `LINE`.

## What I made
Every take first lifts the section's black (`.ch-ink` and `.ch-art`), so the page's live G1 board runs under and between the chips. The line text is read from the live balloon (`LINE`), so it stays computed and nothing is typed.

| Take | The line | The gap | New art |
|---|---|---|---|
| A marquee | A fifth glass window in the chip's empty foot band, 9-sliced from the chip's own painted SEASON window (`foot.py`, so the geometry is identical on all four, lesson 119). The line runs in amber, with a hold, a run and a hold, only when it is longer than the glass. | The board, black lifted, 10 px gaps. | $0 |
| B hologram | Projected as light up from the top edge of the founder's window. It is a painted beam (`img/j1-holo.jpg`, gpt-image-2 4K), tinted to the model's colour (Grok slate, Claude orange, GPT green, Kimi blue). The line hovers in the beam with scanlines, sentences stacked. | **Pins to pins:** a gold trace runs from each bottom pin of the chip above to the same pin of the chip below. The pin x positions were measured on the painting (20 pins). | $0.41 |
| C channel | Lit in a light-guide channel cut into the board, in a painted strip (`img/j3-thin.jpg`, gpt-image-2 4K). The strip sits tight above its chip (proximity says whose line it is). The channel glows in the model's colour, and a lit lead runs down into the founder's window. | The painted channel strip. | $0.86 (j2 was a first, too-thick channel) |
| D typed | The founder's die types the line on A's foot window, a sentence at a time, down a lit data link from the window. The cursor is a block of the display's light; each sentence holds 2.6 s and it runs only on screen. With reduced motion the first sentence is shown still. | **Colour spill:** each chip lights the board around it in its own colour (lesson 129). | $0 |
| E channel, seamless | C, with chip, channel, chip, channel as one continuous board and no page ground between. | The strip is the gap. | (C's) |

## Tests (measured, `run.js`)
- **Cap height of the line at 390:**
  - A: 10.8 px
  - B: 11.2 px
  - C: 10.8 px
  - D: 10.8 px; Claude's line is fitted at 0.917 → 9.9 px
  - E: 10.8 px

  All are at or above 9.
- **Cap height at 320:**
  - B: 11.2 px
  - A, C and E: 8.86 px, **under 9**
  - D (Claude): 8.1 px

  The cqw-sized takes need a floor of 13 px font below 360 px.
- **At 1280:** 13.8 px (B) to 15 px.
- **Sideways scroll:** none at 320, 390 or 1280 (scrollWidth = viewport) in every take.
- **Console errors:** none in any take.
- **Overflow:** every line ends inside its box, except A's marquee, which overflows by design and scrolls.
- **Resolution:**
  - The chip9 paintings are 1800 px. That is above 3x the chip at 390 (1170 px) and 3x the desktop chip at about 570 px (1710 px).
  - The channel strip is 3840 px (served at 1920).
  - The hologram is 3840 x 1680.

## The twelve questions (my pick, B, unless said)
1. **Hierarchy:** the founder still leads. The line is his light, smaller than the 7-day figure.
2. **Sequence:** the BOARD frame hands over four chips, and this keeps them on the same board. The traces chain them in rank order down into the No. 5 chip.
3. **Words:** the line is unchanged and computed, with no label around it.
4. **Motion:** only the founder loops. The beam and the traces are still. (A and D move text; that is their cost.)
5. **Interaction:** nothing looks tappable, and nothing is.
6. **Return:** the line changes when a sync changes the stats behind it (LINE's rules). The 7-day figure does the rest.
7. **Trust:** the line is a computed pattern from the sheet. The numbers sit beside it on the same chip.
8. **Share:** a crop of one chip with its beam reads as a character speaking, and holds alone.
9. **Edge states:** a one-sentence line stays on one line. The generic fallback "Right on X of Y trades. Ask again tomorrow." splits into two sentences like the rest. A fifth model would get a sixth chip with the same beam.
10. **Data honesty:** no new numbers. Colour is the model's identity, not good or bad.
11. **Reach:**
    - B is 11.2 px cap at 320.
    - Screen readers still get the line from chips8's sr list.
    - With reduced motion B is fully still.
    - The beam is one image per chip.
12. **Feeling:** the payoff is that the character's voice comes out of the machine as light, the "magical" the owner asked for.

## Pick
**B, hologram plus pins to pins.**
- It is the one where the line is the founder speaking through the hardware (lesson 104: voices go in a balloon, and here the balloon is made of the chip's own light).
- Its gap carries the board's traces, so the black is gone and the chips read as one circuit.
- It is the only take that keeps a cap of 9 px or more at 320 without a fix.

**E** is the safer, more legible alternative (static, one line, centred). It also turns the gap and the line into one object, but it reads more like a lit bar than a voice.

## Drop-in
Load `_m9.css`, with `IMG/` replaced by the image folder, then set `window.__M9T='B'`, `window.__M9IMG='media/'` and load `_m9.js` after `x2p_chips.js`.

Files to copy flat into media:
- `out/m9-holo.jpg` (B)
- `out/m9-gap-1920.jpg` (C, E)
- `out/chip9-<m>-1200/1800.jpg/.webp` (A, D)

Built properly, `_m9.js` would fold into x2p_chips.js: render the hologram instead of `.c8-bal`, and drop the DOM read of the balloon.

## How it could fail
- **B:**
  - Holographic text over a busy board is harder to read than the cream balloon was.
  - The beam's scanline mask softens the letter edges.
  - On a low-DPR desktop the 13 px glow text may look blurry.
  - The beam crosses the chip's top substrate, which some will read as glare.
  - Grok's slate is the weakest colour, so its line is the least vivid.
- **A:** marquee text is the hardest to read and violates "only the founder moves".
- **C and E:**
  - The painted strip repeats identically under every chip.
  - Its red and green rim lights read as a pasted band at the edges.
  - At 320 the cap is 8.9 px.
- **D:** typing is motion with meaning (the founder speaks) but competes with the loop. And the reader may land mid-sentence.
- **All:**
  - Lifting the black shows the page's G1 tile behind the chips. It repeats every 541 px on phones.
  - On desktop the fixed bottom crawl showed in my shots (it hid on phones).
  - "No. 5?", the not-signed-yet chip's tag, sits close to the gap above it in A and D on desktop: it needs the take's row gap.

## Jobs (log.jsonl)

| Job | Model | Settings | Cost | Time | Output | Result |
|---|---|---|---|---|---|---|
| j1-holo | gpt-image-2 | 4K high 16:9, ref bet-chip-h2 | $0.413 | 100 s | 3840x2160 | A clean fan of light on black; used. |
| j2-channel | gpt-image-2 | 4K high 16:9, refs bet-chip-h2 and chip8c-grok | $0.426 | 94 s | 3840x2160 | Lovely, but the channel was 46 px tall at 390; kept as a ref. |
| j3-thin | gpt-image-2 | 4K high 16:9, + j2 as ref | $0.438 | 103 s | 3840x2160 | Channel at 1/14 of the height; used (cropped to 3840x435). |
