# Round H24 · proof5: Smart or lucky, and the close of the page, in the chip world

Mockups only, laid over the built `v46-live-x2plus.html`. Nothing in `tools/v22/`, `v4*.html` or `media/` changed. Nothing deployed.

## The want, as I read it

- **Smart or lucky:** answer "skill or luck?" in one look, in the chip's art. The coin flip is the yardstick.
- Show how far 80 rounds can and cannot settle the question.
- Keep P&L with Season / Last 7 days / Last 24 hours.
- **Close of the page:** what's next, a door to Upcoming, Get $EZ, and a last frame that sends the visitor somewhere (X, or back for the bell).

**The carrier I found for "small samples, stated plainly"** is the coin's **luck zone**: the band where 95 in 100 fair coins land after this many calls. It narrows every round. That makes the sample size a picture rather than a sentence (lessons 16, 23 and 24).

## Boards

| Board | What it shows |
|---|---|
| `ez/x2p-h24-proof5-390.png` | Today's paper proof ticket, then T1 to T4 on the Hit rate view (390, from 2x shots) |
| `ez/x2p-h24-proof5-390-pnl.png` | T1 to T4 on the P&L view. T3 is shown on Last 7 days: only that week's dies are lit. |
| `ez/x2p-h24-proof5-close-390.png` | Today's Get $EZ, then C1 and C2 |
| `ez/x2p-h24-proof5-1280.png` | Desktop: today, T1, T2 |
| `ez/x2p-h24-proof5-1280b.png` | Desktop: T3, T4, C1, C2 |
| `ez/x2p-h24-proof5-closeup.png` | At 3x on a 390 phone: the NVIDIA chip reference beside T1 and T3 |

## The takes

All four paintings are gpt-image-2, made from `media/bet-chip-h2.jpg` as the style reference. Every word and number is live page text.

### Smart or lucky

**T1 · The scope.** A bench oscilloscope traces each AI's running hit rate round by round, (right + 1) / (calls + 2), so every line starts at 50/50. The coin's luck zone is drawn as the scope's mask: an amber funnel computed for the line as drawn.
- The traces end on their name and hit rate.
- The W-L for each AI sits on the measurement row.
- The knobs switch the view (Hit rate / P&L) and the three keys switch the window. Their labels are the scope's soft-key labels on the glass, as on a real scope.
- P&L view: the traces are the flat P&L in the chosen window, with $0 as the reference line.

**T2 · The test bench.** Each AI's chip sits in a burn-in socket. Its tall glass meter fills to its hit rate, with the luck zone printed on the meter in amber. The lamp gives the verdict in one colour:
- green: beyond the zone;
- amber: a coin could still do this;
- red: below the zone.

P&L view: the meter becomes a bar from $0 in the middle, and the lamp shows profit or loss.

**T3 · The wafer.** One wafer in four quarters, one quarter per AI.
- Every die is one call, printed outward in round order: green for the right way, red for the wrong way, dark for no call.
- Yield = hit rate.
- P&L view: each die is lit by that trade's dollars. A window lights only its own rounds and leaves the rest dim, so Last 7 days reads as "this week's dies".

**T4 · The gauges.** Four meters. The needle shows the hit rate, straight up is the coin's 50%, and the amber arc is the luck zone for that AI's number of calls. P&L view: $0 straight up, profit to the right, loss to the left.

Takes T2 to T4 share a **switch**: a lit selector on the glass of the board's own panel painting, never a plain HTML pill.

### The close of the page

**C1 · The next sockets, then the panel.**
- An empty row of sockets waits for the next six rounds' chips. Each window above a socket lights the company's mark and the weekday its calls lock.
- The board ends in a gold edge connector, a link to `#/upcoming` that glows slowly as the invitation.
- The panel's glass shows the next bell's countdown, the company, and "34 rounds left in Season 1".
- Its two buttons are **Get $EZ** ("Opens at launch" while `CONFIG.ca` is empty) and **Follow on X** ("Every call first").
- The scam warning and "Not financial advice" sit under it, once.

**C2 · One panel.** Everything on one object:
- the next day's marks and "Calls lock tomorrow";
- "Bell in 1d 20h";
- "Get $EZ: the address posts here at launch";
- two buttons: **See the card** (Upcoming) and **Follow on X**.

## My pick

**T1 (the scope) with C1.**
- **Why T1:** it is the only take that shows *round by round*, which is the brief's first ask. It also shows the strongest true fact on the page: the luck zone closing in on the traces, with Grok's trace edging out. The scope's own soft-key and measurement conventions carry the switch and the W-L with no added widget.
- **Borrow T2's lamp:** one green or amber lamp per trace on the scope's measurement row. It is the clearest at-a-glance verdict.
- **Why C1:** it keeps the order the brief asks for (what's next → door → Get $EZ → X). The empty sockets say "this is ongoing" without words, and the connector reads as "plug in for more".
- **When C2 is better:** if the page must get shorter.

## Drop-in

- **Files:** `_p5.css` + `_p5.js` (engine, data, switch, stage), then `t1.js` (or `t2.js`, `t3.js`, `t4.js`); `c1.js` + `c1.css` for the close (or `c2.js`).
- **Mount:** `P5.mountProof(P5.take)` dresses `#learn`, and `P5.mountClose(P5.take)` dresses `#get`. The page's own content stays in the DOM, hidden, and each view has a screen-reader table.
- **Port:** split into `x2p_proof.js/.css` and `x2p_close.js/.css`, since each take file sets `P5.take`.
- **Media:** flat names are in `out/`: `p5-scope.jpg`, `p5-bench.jpg`, `p5-wafer.jpg`, `p5-gauge.jpg`, `p5-sockets.jpg`, `p5-panel.jpg` (1600 px). The page names them written out in full, as make_site.py needs.
- **File sizes:** 360 to 580 KB each, over the 300 KB that quad4 kept to. Cropped to the area each take actually uses (crops in each take file), they measure:

  | File | Cropped size |
  |---|---|
  | scope | 163 KB |
  | panel | 195 KB |
  | wafer | 251 KB |
  | sockets | 294 KB |
  | gauge | 404 KB |
  | bench | 496 KB |

  Do the crop at the port.
- **2K masters:** `img/q-*.jpg`.
- **Tools:** `run.js` shoots and measures, `board.py` makes the boards, `gen.py` runs the Hedra jobs (log in `log.jsonl`).

## Data: matches checked

**Shared rules.** `P5.data()` is h_sol.js's `data()` verbatim:
- the same running hit rate and ranking;
- the flat $100K P&L from `__x2pPnl`;
- R11's windows: 24 hours at each exchange's own close, 7 days as the calendar days, New York time.

**Season, checked against X2+'s live proof.**

| AI | W-L | Hit rate | P&L |
|---|---|---|---|
| Grok | 45-27 | 62.5% | +$148,480 |
| Claude | 48-32 | 60% | +$102,950 |
| GPT | 43-37 | 53.8% | −$56,930 |
| Kimi | 37-43 | 46.3% | −$70,650 |

**Last 7 days today** match X2+'s proof row for row: +$111,210, +$59,630, −$82,710, −$37,570. **Last 24 hours:** $0 for every AI on both.

**Flag: the two pages count Last 7 days differently.** X2+'s G1 proof uses a rolling 7×24 h from a 4 pm New York close; h_sol uses calendar days. They agree today but can differ near a week's edge. I followed h_sol ("one rule on the whole tab").

**The card:** PENDING + UPCOMING from today on, ordered by call date, then by size within a day (CAPS). Today that is Palantir and Apple Monday, then Pfizer, Shopify and AMD Tuesday.

## Tests, measured on the built page

All shots were taken with reduced motion on.

| Test | 390 | 1280 | 320 |
|---|---|---|---|
| Console errors | 0 | 0 | 0 |
| Sideways scroll (scrollWidth = viewport) | none | none | none |
| **2** Smallest live cap height (CSS px) | 9.7 (C2's Get $EZ line); T1 12.4, T2 9.8, T3 9.8, T4 11.3, C1 11.2 ✓ | 14.1 or more ✓ | 9.2 or more ✓ |
| **1** Source px shown / needed at 3x | 1368 to 1670 / 1170 ✓ | 1368 to 1670 / 1680 at 3x ✗, 1120 at 2x ✓ | ✓ |

**Test 3, integration.** Live text sits on glass and is lit:
- a two-radius bloom;
- the painting's own glare screen-blended back over the text;
- for the board's print (names, connector label), a silkscreen look: a grain mask, with the board multiplied through the letters.

The selector chips are lit tabs on the panel's glass.

**Test 4, static words painted: ✗.**
- Model names, "Everything coming up", "Opens at launch" and the soft-key labels are lettered in code (lit glass or silkscreen), not painted.
- One painting per AI per take was out of scope for four exploratory takes. Do it at the port for the picked take: one image-to-image pass that paints the names.

**Test 5, chip detail.**
- The paintings carry SMD parts, traces, vias, gold pins and bezels.
- The large dark areas are the displays themselves, by design.
- Not measured numerically.

**Test 6, framing (the subject's share of the frame).**

| Take | Share | Result |
|---|---|---|
| T1 | 64% (glass) | ✓ |
| T3 | 65% (wafer) | ✓ |
| T2 | the board fills 100% | ✓ |
| T4 | dials alone about 25%; with their gold bezels about 40% | ✗ |

**Motion:**
- the glass re-scans with a short flicker every 6.8 s while it is on screen;
- the C1 connector glows slowly;
- nothing moves with reduced motion (CSS);
- not counted with motion on, and not profiled on a 4x slower CPU.

## The twelve questions (T1 + C1)

1. **Hierarchy:** one look must say "only Grok is edging past what a coin could do; the rest are still inside luck". The gold trace leaving the amber funnel is the brightest thing on the screen.
2. **Sequence:**
   - In: the record (Every round so far) hands over "here is every round", and this beat asks what it adds up to.
   - Out: to the bet ("we follow #1"), then the close: what's next, Upcoming, Get $EZ, X.
3. **Words:**
   - One noun per thing: hit rate, P&L, round, call.
   - "Luck zone" is the only new term, labelled where it is drawn.
   - No p-values, no "95% confidence".
4. **Motion:**
   - The glass re-scans: it is alive and changes nothing.
   - At the port, the traces should draw in when the view switches (state change shown); this is not built in the mockup.
5. **Interaction:**
   - The knobs, the keys and the lit tabs look touchable and are real buttons (aria-pressed, focus ring).
   - The connector and the X and $EZ buttons are links.
   - Nothing else is tappable.
6. **Return:**
   - The funnel narrows and the traces move every round.
   - The windows show this week.
   - C1 counts down to the next bell and lights the next chips.
7. **Trust:**
   - Every figure is computed from the sheet.
   - The table under each view is the sceptic's copy.
   - The independent proof is still the calls' X posts timestamped before each report (Follow on X points there).
8. **Share:** a screenshot of T1 is a lit scope with four traces, one gold, leaving a gold funnel: readable without the page. No link card exists for it yet.
9. **Edge states:**
   - An empty window: "No close in Last 24 hours" on the glass, and empty bars or dies.
   - A tie in rank keeps the order of `__x2pPnl`.
   - No calls on the card: an empty socket window.
   - After the NVIDIA date the card still reads from ROUNDS.
   - A new model needs a fifth trace, bar, quarter or dial. T3 and T4 cannot take five without a redraw; T1 can.
10. **Data honesty:**
    - Grok is past the two-sided 95% zone by a hair. On its own, a coin does as well or better about 2 times in 100 (exact binomial, 45 of 72).
    - With four AIs on the board, the chance that at least one fair coin gets this far is about 17%.
    - Claude sits just inside the zone (a coin does as well about 5 times in 100).
    - So T2's "green lamp: beyond a coin's reach" and T3's "Beyond a coin" **overclaim**. Use "edging past luck" or "too early to call" until the zone is cleared by a clear margin.
    - The scales are fixed: 30 to 80% and 25 to 75%.
11. **Reach:**
    - Legible at 320 (cap 9.2 px or more).
    - Screen-reader tables on every view.
    - Static with reduced motion.
    - The SVG bloom filters are not profiled on a slow phone.
12. **Feeling:** the suspense is the funnel closing in. The reveal is the gold trace leaving it. The payoff is C1's empty sockets: "the next chips go in Monday".

## How it could fail

- **The luck zone may not decode without its line under the picture.** That is the usual case of lesson 23. On T4 the amber arc reads more easily, as "the gauge's caution band".
- **The amber zone and the leader's gold** are close in hue on the scope. Under a quick glance the gold trace can read as part of the zone.
- **The paintings are flatter than the hero chip.** They are head-on product shots with even light, with no light rays and no dramatic perspective. I chose that so the glass is a clean rectangle for the live text, but the pictures are less cinematic than the NVIDIA chip. A 4K pass with a three-quarter view and a homography (as h_sol does) would close the gap.
- **Logos on a display are one-colour silhouettes,** so brand colour is lost (lesson 14). Tile-backed logos are keyed by a canvas pass; Apple's grey tile still shows on C2's glass.
- **T3's wafer:** the dies flow around each quarter's label window, so "printed from the centre out" is only roughly true. The unprinted rounds still to come are almost invisible.
- **Desktop:** the proof still sits in X2+'s 560 px DESKA column (my `grid-column:1/-1` did not take on that layout). Once the MVPs leave the Overview, it should span the row, with the switch beside the instrument as the container query lays it out.
- **Not checked:** Safari (mix-blend-mode on SVG `<image>`, SVG filters).

## Cost

**Hedra total: $3.51** of the $40 budget.
- Drafts: 12 × gpt-image-2 1K medium, $0.066 each.
- 2K: 6 × gpt-image-2 high repaints, $0.4535 each.

Every job is in `log.jsonl`.
