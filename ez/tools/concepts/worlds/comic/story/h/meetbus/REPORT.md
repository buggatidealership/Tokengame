# meetbus: Meet the models fed by the ledger (round H25, mockups)

The brief (BRIEF-H.md, H25 `meetbus`): the owner liked board5's take D, the bus (`h/h25/owner-bus.jpg`), and wants it for Meet the models. A ledger strip carries the newest graded rounds in frame 3's amber. Gold traces run from it into each chip. As a round passes, a pulse runs into every chip that traded it: green if that model's trade went the right way, red if not. The chips, the founders and the balloons stay as they are.

**What the brief needed but didn't say, and what I did about it:**
- The pulse colour must mean one thing only. The painted trace bundle had a green rim light at one end, and on a short trace it read as a "right" pulse. I cropped the traces from the bundle's all-gold middle. The ledger text stays amber. Green and red are only ever the verdict.
- The pulse lands where the chip's own LAST ROUND LED already says ✓ or ✗. When the newest round (R80) passes, the pulse colour equals that LED, so the two never disagree.

## Boards
- `ez/x2p-h25-meetbus-390.png`: today, then A, B and C, each laid over the built `v46-live-x2plus.html` and frozen mid-pulse. The moment is picked automatically: the one with the most traces lit, with at least one green and one red.
- `ez/x2p-h25-meetbus-1280.png`: today, then A, B and C at desktop width.
- `ez/x2p-h25-meetbus-320.png`: overflow check.
- `ez/x2p-h25-meetbus-close.png`: a 3x close-up of A's traces and B's readout and bus.
- Motion: `out/rec-a.mp4`, `rec-b.mp4` and `rec-c.mp4`, copied to `ez/x2p-h25-meetbus-{a,b,c}.mp4`. Each is 8 s at 390, DPR 2 (780×1688), 30 fps, rendered frame by frame. The phone viewport shows the readout and the first three chips; Kimi is below the fold. The take's clock is deterministic, and the founder loops are seeked to the same time.

## The takes
| Take | What it is | Room it takes from the chips (390) |
|---|---|---|
| **A · The strip** (D, as the owner saw it) | The painted gold housing runs down the left. The 12 newest graded rounds run up its glass, turned on their side, in amber ("R71 Starbucks (SBUX) −1.76%"). Each round sends a pulse into a chip's trace as it passes that trace: Kimi first, then up the board. The pulse lands as a glow on the chip's edge. | 58 px: chips 338 wide instead of 390 (−13%), founder window included |
| **B · The bus** | A painted readout bleeds across the top under "Season 1": "LEDGER │ R69 Merck (MRK) +3.85%", one round at a time, set flat. Every 3.8 s the next round slides in. An amber packet drops down a gold bus on the left and branches into each chip in turn. Each tap turns green or red as the packet enters. | 26 px: chips 364 wide (−7%) |
| **C · The spine** (my own) | The chips stay full-bleed and untouched. The ledger is a lit glass spine behind them, seen only in the gutters. The current round sits in the "Season 1" caption tab. The packet runs down the spine, and each chip lights from behind on its left edge, green or red. | 0 px. The section is 24 px taller for the tab line |

- **Desktop:** on all three, the strip, bus or spine runs down the gap between the two columns and feeds both sides, so the traces and glows mirror.
- **Rounds shown:** all three loop through the 12 newest graded rounds, oldest first (`window.__MBN` changes the count).
- **Paintings (Hedra, gpt-image-2, quality high, 4K):**

| File | Size | Use | Cost |
|---|---|---|---|
| `img/strip.jpg` | 2160×3840 | the housing, used as a border-image so its caps and rails stretch to any height | $0.40 |
| `img/bundle.jpg` | 3840×2160 | the trace bundle, repeated along each trace; rotated for B's bus | $0.40 |
| `img/readout.jpg` | 3840×2160 | B's readout housing | $0.40 |

  - Total **$1.20**. There were no failed jobs. The log is in `log.jsonl`.
  - Served cuts are in `out/pub/` as jpg and webp:
    - `mb-strip` 640×3840 (171 KB webp);
    - `mb-bundle` 1800×900 (70 KB webp);
    - `mb-bundle-v` 900×1800;
    - `mb-readout` 3760×860 (249 KB webp).
  - Each is at least 3x the CSS size it is shown at. The strip is 32 px wide on the page against 640 px in the source, and the readout 390 px against 3760.
  - All the words and numbers are live page text. The paintings carry none.

## The twelve questions (take B, my pick)
1. **Hierarchy:** the chips stay the biggest thing. The readout is the one new focal point: the round, flat and readable. Then the verdict colour lands on each chip.
2. **Sequence:** frame 3 (LEDGER) and frame 4 (BOARD) end the top on the ledger. This section opens with that same ledger, live, feeding the chips, so the top's concept becomes the cast's power supply. The section then hands over to Every round so far, which shows the whole ledger.
3. **Words:** one label, "Ledger", in the readout's frame (frame 3's word). Then "R69 Merck (MRK) +3.85%": round, name with ticker, and the move. No new copy.
4. **Motion:** only the packet and the verdict light move. They act out cause and effect (the round is written to the ledger, then each model is paid or not; lesson 43). The founders loop as before. Nothing else moves, and everything is still with reduced motion.
5. **Interaction:** none added. Scroll is the interaction (lesson 103). The readout is not a button.
6. **Return:** each sync adds the new round to the loop's end. A visitor tomorrow sees the newest round go through.
7. **Trust:** the colours are computed from the same `__x2pPnl` per-round results as the proof and the chips' LAST ROUND LED. Every round shown is in Every round so far, one scroll down.
8. **Share:** a still shows the ledger readout with one round and four chips, some edges green and some red. It reads as "the result is wired into the models".
9. **Edge states:**
   - a model that didn't trade a round gets no pulse (Grok skipped 8 rounds);
   - a tie in direction makes no difference, since the colour is per model;
   - with no graded rounds the section would show an empty readout (not handled; Season 1 has 80);
   - a fifth model needs a fifth tap, which the code makes for every `.c8-one`.
10. **Data honesty:** the loop replays the last 12 rounds, so a red pulse can be an older round. The readout always names the round, and the newest round's pulses match the chips' LEDs.
11. **Reach:** checked at 320, 390 and 1280. The readout is 19 px Anton (cap height about 13.9 px, above the 9 px floor). A screen-reader line lists the newest four rounds with who was right. Visuals are `aria-hidden`. The loop runs only near the screen (IntersectionObserver) and moves only transforms and opacity.
12. **Feeling:** a small suspense beat each round. The packet falls, and each model is lit green or red one after another, as if the rounds were being paid out in front of you.

## Tests (H23 tests, measured)
- **Resolution:** the served source is at least 3x CSS at 390 and 1280. The strip is 640 px for 32 px (20x). The bundle traces are 900 px tall for 9 to 33 px. The readout is 3760 px for 390 px (9.6x).
- **Smallest live cap height (Anton cap is about 0.73 em):**

| Text | 390 | 1280 |
|---|---|---|
| A, the strip text | 13 px, cap 9.5 ✓ | 17 px |
| B, the readout | 19 px, cap 13.9 ✓ | 24 px |
| C, the tab line | 14 px, cap 10.2 ✓ | 16 px |

- **Integration:** the ledger text sits in a dark amber glass with the timer's glare and scanlines screened over it, inside a painted gold housing. The traces are painted. The verdict light is screened onto the trace and the chip's edge, never over a number or a face. The landing glow covers the left 13% of a chip: the pins and the mark plate's rim, not the plate's mark.
- **Static words painted:** the paintings carry none. "Ledger" is a lit label in the display.
- **Page checks:** no console errors and no sideways scroll at 320, 390 and 1280 for all three takes (`run.js` prints scrollWidth and errors).
- **Cost on the page:**
  - four images (about 0.56 MB webp in all) and one rAF loop that runs only while the section is near the screen;
  - each frame sets transforms and opacities on fewer than 15 elements.
  - Not measured on a 4x slower CPU; do this before it ships.

## My pick: B, the bus
- It keeps the owner's idea (the ledger feeds the chips through gold traces, and the pulse carries the verdict).
- It fixes D's one weakness on a phone: text turned on its side. Lesson 92 says data faces the reader, on one line. B's readout reads flat, one round at a time.
- It takes 7% of the chip width, against A's 13% and smaller founder windows.
- A is the faithful D, if the owner wants the strip exactly as seen.
- C costs nothing in layout, but its feed is the least visible (a thin spine in the gutters). I would keep it for desktop only.

## Drop-in
- `dropin/x2p_bus.js` and `dropin/x2p_bus.css`: load them after `x2p_chips.js`/`.css`. The default take is b (`window.__MB` = a, b or c). Images default to `media/`.
- To install: copy `out/pub/mb-*.jpg` and `.webp` to `ez/media/`. The flat names are listed in the drop-in's first comment, so make_site.py copies them. Then add the two files to build.py's X2+ story list after x2p_chips.
- `_mb.js` and `_mb.css` are the same code with the mockup image path. `run.js` shoots a take: `node run.js 390 b out.png [t]`, and `SEEK=1` picks the busiest moment. `rec.js` makes the frame-by-frame video. `board.py` builds the boards.

## How it could fail
- **The colour isn't decoded.** A newcomer may not connect "green edge" with "this model was right on this round". The readout names the round, but not the verdict. Mitigation: hold the newest round longer, or flash the chip's own LAST ROUND LED in time with the pulse. Only a person looking at it can tell; analytics are off.
- **Replays read as live.** The loop shows 12 old rounds, so a viewer may think each pulse is happening now.
- **Busy beside the founders.** The founder loops already move. A packet plus four edge glows every 3.8 s may compete with them (lessons 42 and 115). If so, slow it to one round every 6 to 8 s, or run the loop once on arrival and then rest on the newest round.
- **A's sideways text** is hard to read at 13 px, and A's chips are 13% smaller.
- **Safari is not checked:** border-image with `image-set()`, and the screen blend on the hit glow.
