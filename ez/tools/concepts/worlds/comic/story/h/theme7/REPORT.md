# H25 `theme7`: colour per section, the gap and bleed rule, and "the whole game" as its own small section

Round H25, task `theme7` (BRIEF-H.md). Mockups only, laid over the built `v46-live-x2plus.html` (production). Nothing in `tools/v22/`, `v4*.html` or `media/` was touched.

## First: a live bug found while capturing (not mine to fix, flagged)
**`ez/tools/v22/story/x2p_top.css` ends inside an unclosed `@media (prefers-reduced-motion:no-preference){`** (the block at line 240; brace balance of the file is +1). build.py appends `x2p_chips.css` and `x2p_more.css` right after it in the same `<style>`, so **every rule of Meet the models, Every round so far, Smart or lucky and the close only applies when the visitor has not asked for reduced motion**. With iOS/Android "Reduce motion" on, the chips lose their layout (the founder video shows at 640x640 under each chip, the page grows from 7,223 to 26,160 px at 390, and the wafer dies render as giant empty frames). Reproduced with Playwright `reducedMotion:'reduce'` on the built page. Fix: add one `}` at the end of `x2p_top.css` (after the `.q4-board.q4-go` rules). Every capture below uses normal motion because of this.

## Boards
- `ez/x2p-h25-theme7-palettes-390.png`: the whole Overview at 390, today, then P1, P2, P3 (film take C in each).
- `ez/x2p-h25-theme7-palettes-1280.png`: the same at 1280.
- `ez/x2p-h25-theme7-film-390.png` / `-1280.png`: today's film beat, then takes M, C, P, L, each in place (end of How a round works → the small section → the gap → the start of Meet the models).
- `ez/x2p-h25-theme7-gaps-390.png`: the rule on the whole page (P1), each gap labelled with its masks, ΔE and height, plus 3x close-ups of every joint.

## 1. Colour as a story
**The owner's want under the words:** the page should feel like it travels: green while it explains the game, then the four models arrive *as colours*, and what follows wears their colours, so a visitor feels the models own the rest of the page. The colours must keep meaning something (lesson 3), and must not tell a happier or different story than the data (lesson 8).

**The carrier I found:** solder mask. Real circuit boards come in green, blue, red, black, white; each model's chip in Meet the models already sits on a substrate of its own mask colour (sampled from `chip8c-*-1200.jpg`: Grok `#5d6165` slate, Claude `#a4572a` orange, GPT `#3c7146` green, Kimi `#3f5684` blue). So "a section takes a model's colour" is, in this world, literally *the board under that section is printed in that model's mask*. Nothing is painted on top; the board itself changes.

**Where colour can actually show (measured):** on X2+ today almost every beat is a painting with its own black void that bleeds edge to edge. The page ground shows only at section heads and gaps. So a colour per section needs four carriers, used in all takes:
1. the ground between and behind the beats (a 4K painted neutral board, `img/gnd.jpg`, tinted per mask by `tint.py`, mean luminance 4%);
2. the paintings' own black voids, which lighten over the ground (black shows the mask, light stays the painting);
3. **the section's own paintings re-masked** (`remask.py`: green-mask pixels get the target hue and matching saturation, value and luminance kept, gold, ink and light untouched): the wafer and die of Every round so far, the scope of Smart or lucky, the sockets and panel of the close;
4. the heads' extrusion: today every head's second word is extruded in green `#0a5c2e`; it takes the section's colour. Meet the models stacks all four, in rank order: the moment the colours enter.

| Section | Today | **P1 · masks, live owners** | **P2 · masks, relay** | **P3 · rim light, live owners** |
|---|---|---|---|---|
| The top (hero, How a round works) | green | green | green | green |
| The whole game (small) | green | green | green | green |
| Meet the models | green | each chip on a band of its own mask; the tryout chip on bare board (unsigned) | same | same, as light |
| Every round so far | green | **most round wins** (today Claude, 28): orange | Grok slate (the archive: cool, neutral, lets 80 film frames carry the colour) | orange light |
| Smart or lucky | green | **best hit rate** (today Grok, 63%): slate | Kimi blue (the lab: cool, clinical) | slate light |
| The bet | vault | vault black, rim = **golden ticket** (today Grok) | vault, rim Claude orange (the furnace) | vault, Grok rim |
| The close | green | green (the board goes on) | GPT green (home) | green |

- **P1** is computed at every sync from `ROUNDS` and `__x2pPnl()`: a section is printed in the colour of the model that owns that section's measure. A small silkscreen line top right says why ("■ best hit rate: Grok 63%"), so the colour is a fact, not decoration. It is also a reason to come back: when Kimi takes the hit-rate lead, Smart or lucky turns blue.
- **P2** never changes and never implies a leader: each model colour is used once after the introduction, chosen by the section's mood. Weaker on lesson 3 (the mapping has to be explained or it reads as random).
- **P3** keeps every painting green and the ground near black; only the light on both bleed edges takes the owner's colour, like the chip art's own rim lights. Least invasive, least colour.

## 2. The gap and bleed rule
**What a gap is, in this world:** the place where one board plugs into the next: an edge connector. The board above ends in gold fingers, the board below starts with the socket. So a gap belongs half to each section: **its top half is printed in the mask above, its bottom half in the mask below**, and every section's bleed runs right up to its half of the connector. A bigger change of world needs a bigger connector.

**The rule, as tests** (`test.js` + `test.py`, run on the built page at 390; T1 to T6 are pass/fail):
- **T1 bleed:** every section's ground spans `0 … viewport width` (left within 0.5 px of 0, width within 0.5 px of the viewport), below 1200 px.
- **T2 no orphan ground:** with the page's own ground painted magenta, a full capture of the Overview from the top to the end of the close has **0 magenta pixels**. Every pixel belongs to a section or to a gap; nothing floats on "the website behind".
- **T3 gap size follows the change of world:** `h = base + 0.45 · ΔE76(mask above, mask below)`, capped at 96 px, within 1 px. `base` = `clamp(26px, 8vw, 64px)` between sections (today's gutter), 10 px for a seam inside one section (Meet the models' chips).
- **T4 gap colours:** the top half of each connector is the mask above, the bottom half the mask below (built from one painting, `img/cx1.jpg`, tinted per half; checked by eye on the 3x close-ups).
- **T5 legibility:** every text box that sits on bare ground (not inside a painted panel) has at least 4.5:1 contrast against the 95th percentile of the ground under it.
- **T6 safe zone:** no visible text box closer than 8 px to a gap.

**Results at 390 (film take C):**

| | T1 | T2 magenta px | T3 | T5 min contrast (48 boxes) | T6 |
|---|---|---|---|---|---|
| P1 | pass | 0 | pass | 6.1:1 | __T6P1__ |
| P2 | pass | 0 | pass | 6.1:1 | __T6P2__ |
| P3 | pass | 0 | pass | 5.5:1 | __T6P3__ |

Gaps today (P1): top→film green/green ΔE 0 → 31 px; film→models green/Grok ΔE 36.5 → 48 px; models (bare board)→record Claude ΔE 56 → 56 px; record→proof Claude/Grok ΔE 51 → 54 px; proof→bet Grok/vault ΔE 38 → 48 px; bet→close vault/green ΔE 53 → 55 px.

The beat gutters *inside* the top (hero / How a round works) keep today's gold fingers: same board, same mask.

At 1280 X2+ is one 900 px column; the rule holds as on phones (the gaps and bands span the window). The desktop grid (`main` rows 3 to 6 set inline) had to be put back in DOM order for the new section and gaps (`_t7.js` draw()); a production drop-in must do the same or place itself in that grid.

## 3. "The whole game" as its own small section
**The want:** the basics are already explained by the four frames; the film is an option for those who'd rather watch. So: small, quiet, still impossible to miss, and in the chip world. I kept its place after How a round works (it follows the explanation, "as the basics are already explained") but as its own section with its own gaps, about half today's height.

| Take | What it is | Height at 390 | Painting |
|---|---|---|---|
| **M** the monitor | a display module soldered on a board strip: the film's poster on its glass, the running time lit in an LED window (the NVIDIA timer's recipe), a gold dome key | 145 px (today 264 + head) | `img/m1.jpg` |
| **C** the cartridge | "the whole game" as a game cartridge in its slot: the poster on its label, "Rather watch? / The whole game / Plug it in · 1:20" beside it | about 175 px | `img/c1.jpg` |
| **P** the plug | a cable and gold plug short of a port, the LED reading 1:20: plug in to watch | about 113 px | `img/p1.jpg` |
| **L** the silkscreen line | one etched line on the board, "The whole game · 1:20", with the painted gold key; the quietest | about 66 px | `img/k1.jpg` |

All four: the running time is read from the film's own metadata (1:20 today); a tap anywhere on the object opens the film whole (16:9, with sound, the page's own mp4/webm). No autoplay; nothing moves but the key's slow breathing on M (off with reduced motion).

## Picks
- **Palette: P1.** It is the owner's sentence made computable (the models bring their colours, the next sections use them) and every colour carries a fact the silkscreen line names. Two cautions below.
- **Film: C, the cartridge.** "The whole game" is a game cartridge: the pun does the explaining, it belongs to the chip world (a cartridge is a board with gold fingers in a shell, lesson 111), and its label shows the film's own frame. M is the safe second (it reads instantly as "a screen with a play key").
- **Gaps:** the connector rule above, with T1 to T6 run on every build.

## Drop-ins (mockup quality; for the lead to port)
- `_t7.js` (palette + gaps + tests hooks) and `_t7film.js` (the small section). Set `window.__T7='p1'`, `window.__T7F='c'`, `window.__T7M='media/'` before them, X2+ only.
- Assets to copy flat into `media/` (all generated here, in `out/`): `t7-gnd-{GREEN,GROK,CLAUDE,GPT,KIMI,VAULT,BARE}.jpg` (1440 px wide tiles, 300 to 700 KB), `t7-cxT-*.jpg` / `t7-cxB-*.jpg` (2400 px connector halves), `rm-{GROK,CLAUDE,KIMI}-{rounds-h24-wafer,rounds-h24-die,p5-scope,p5-sockets,p5-panel}.jpg` (re-masked copies of today's paintings: rerun `remask.py` if those paintings change), `t7f-c.jpg` (cartridge, 1100 px for about 175 CSS px).
- In production the re-masked files should be picked by the build (P1 changes owners at a sync), not swapped by script after load.

## The twelve questions (lesson 122), one line each
1. **Hierarchy:** colour never competes with the beats: grounds at 4% mean luminance, the loud colour only in the connectors and the re-masked paintings; the film section is the smallest beat on the page.
2. **Sequence:** green explains (top), the colours arrive with their chips (Meet the models' four-colour extrusion is the hand-over), the record and proof wear their owners' colours, the vault stays dark, the close returns to green: the game goes on.
3. **Words:** only "■ most round wins: Claude 28", "■ best hit rate: Grok 63%", "■ golden ticket: Grok", and the film's "The whole game · 1:20"; nothing else added.
4. **Motion:** none in the palette; only M's key breathes while it waits (an invitation); the film plays only on a tap.
5. **Interaction:** the film objects are the only new touch targets (the whole object, at least 44 px); colour is never interactive.
6. **Return:** P1's colours move when an owner changes, a visible "something happened since you were here".
7. **Trust:** every P1 colour names its rule and its number on the board; both come from the sheet.
8. **Share:** a screenshot of Smart or lucky now shows whose section it is (slate scope = Grok's); the cartridge is a recognisable little object.
9. **Edge states:** a tie for an owner falls to the model listed first in `__x2pPnl` (state it, or use the season P&L to break it); GPT's mask is almost the board's green (ΔE about 5), so a GPT-owned section reads as "back to the board"; a new model needs a mask colour of its own (the tryout sits on bare board until signed); no film metadata → the LED keeps 1:20.
10. **Data honesty:** P1 colours a section by one measure; the silkscreen says which, so "slate scope" is not read as "Grok is best at everything". The bet's rim follows the golden ticket only.
11. **Reach:** text over ground passes 4.5:1 everywhere (worst 6.1:1, P3 5.5:1); colour never carries a fact alone (the silkscreen and the data say it in words too); reduced motion stills the key.
12. **Feeling:** the four-colour extrusion on "Meet the models" and the first coloured connector after it are the reveal; the section turning a model's colour is the payoff of the board.

## How it could fail
- **Too subtle at a glance.** With grounds dark enough for text, the colour lives mostly in connectors and re-masked paintings; on a dim phone the record's orange may read as "bronze", not "Claude". The test is a person; analytics are off.
- **P1 can read as a ranking of the whole page by one model** (Grok owns proof and the bet today); the silkscreen line must stay.
- **Repeated colour, no contrast (lesson 9):** when one model owns every measure, P1 turns three sections the same colour and the story collapses to "Grok's page". P2 doesn't have this failure.
- **Re-masking is a filter on someone else's painting.** It held on these five (gold untouched, checked at full size), but a future painting with green elements that are not board (a green LED, the "right" lamp) would turn orange too. Paint new section art in a neutral mask, or keep a per-file mask.
- **The cartridge pun can be missed** by someone who never had a console; the words beside it carry it.
- **Static words are lettered in code, not painted** ("The whole game", the captions). Two Hedra edits tried to emboss "THE WHOLE GAME" on the cartridge (`c1t1`, `c1t2`): see the job log for the result.
- **Desktop:** only the 900 px single column was checked (1280); the DESKB two-column grid from 1200 px was overridden into DOM order for the mockup.

## Hedra jobs
All gpt-image-2, 4K (3840x2160 or 2160x3840), high quality, refs `media/bet-chip-h2.jpg` + `media/top-hero-t-h22.jpg`, "no text" in every prompt (`jobs1.json`, `jobs2.json`, `log.jsonl`).

| Job | Size | Cost | Time | Result |
|---|---|---|---|---|
| `m1` | 3840x2160 | $0.43 | 82 s | the monitor module: crisp, screen glass 1020x620 (1.65:1), LED and key where asked. Used (take M). |
| `m2` | 3840x2160 | $0.43 | 88 s | a chip-shaped monitor at 3/4 view: good, but its perspective breaks the flat page; not used. |
| `p1` | 3840x2160 | $0.43 | 88 s | cable and gold plug short of a port with an LED window: clear. Used (take P). |
| `c1` | 3840x2160 | $0.43 | 95 s | the cartridge in its slot, head-on: the best object of the round. Used (take C). |
| `k1` | 3840x2160 | $0.43 | 88 s | the gold key alone on a board square. Used (take L). |
| `c2` | 3840x2160 | $0.43 | 101 s | cartridge beside an empty slot at 3/4 view: nice, but too big a scene for a small section; not used. |
| `p2` | 3840x2160 | $0.43 | 101 s | top-down jack and socket: reads as audio, not video; not used. |
| `gnd` | 2160x3840 | $0.43 | 107 s | neutral grey mask board, 2160x3840: the source of every ground tile (sides cropped, made seamless, tinted per mask). |
| `cx1` | 3840x2160 | $0.43 | 107 s | two grey boards joined by an edge connector: the source of every gap (each half tinted per mask). |
| `c1t2` | 3840x2160 | $0.41 | 95 s | same edit without a badge, spelled right; same size problem; not used. |
| `c1t1` | 3840x2160 | $0.41 | 102 s | edit of c1: "THE WHOLE GAME" embossed in a badge above the label, spelled right; at the cartridge's phone size its cap height is about 3.5 px, so it fails the 9 px test and is not used. |
| **total** | | **$4.66** of $40 | | |

## Files
- `_t7.js`, `_t7film.js`: the overlays. `lib.js`, `run.js`, `runall.sh`, `stitch.py`: stitched captures (scrolling the real viewport: a full-page screenshot resizes the viewport and breaks the page's vh sizes). `test.js`, `test.py`: the rule's tests. `closeup.js`: 3x joints. `tint.py`, `remask.py`, `glass.py`: assets. `board.py`, `boardgap.py`: boards.
- `img/`: the 4K masters. `out/`: served crops and tiles (resolution in the tables above; ground tiles 1440 px for 390 CSS px = 3.7x).
