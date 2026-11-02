# H28 · meet11: equal chips, big names, the flag as the chip (mockups)

Saved by the lead from the helper's hand-back (Write blocked). Top commit 1cfcf883. Laid over the built X2+ page; nothing in tools/v22, v4*.html or media touched; Hedra $0. **Pick: B (Mask), one column at every width;** A (Copper) the fallback if each model's chip colour must stay.

## Boards (in ez/)
`x2p-h28-meet11-390.png`, `-320.png` (Today, A, B, C, D, one column); `-1280.png` (Today, B one column, B ranked 2x2, C one column, A ranked 2x2); `-flags.png` (the chip paintings bare, one row per take, plus the re-laid chip without a flag).

## Shared
- Equal chips: 318x128.5 at 390, 256x103.5 at 320, 760x307 at 1280 one column, 401x162 in the 2x2.
- Rank: rank2's extruded Bangers numeral outside each chip on the left, all the same size, #1 gold.
- The painted "No." label and box and the painted name bar are gone; a tall NAME window across the panel's top row (9-sliced from the chip's own P&L window); the name live Anton, lit cream, cap height 62% of the window: 16.3px at 390, 13.1 at 320, 39 at 1280 one column, 20.6 in the 2x2 (today's painted name about 8px at 390); the version small beside it, from MODELS.ver with the name cut off.
- Other windows shorter so the name leads (text boxes at 390: name 28, P&L 19, W-L 17, quote 18px); "Season / P&L" on the matte to its left; W-L narrower with its label left; quote, founder loop and strip S1 unchanged.
- The small flag patch is gone; the gold logo plate moves down into its spot at 0.86 size, freeing the top-left for the canton (US) or the stars (China), hoist on the left; the plate's old spot refilled with plain board in the model's colour.
- Desktop: one column (chips 760px, centred; section 1379px tall) or a ranked 2x2 ("1 2 / 3 4", meet10's strip in the column gap; 418px).

## Flag takes (`window.__M11T`)
- A Copper: the canton a copper pour with stars etched out, red stripes as buses of three copper traces; Kimi five copper star pours. Keeps the model colour; stripes faint at phone size; gold on Claude's orange low contrast.
- B Mask: the solder mask itself printed in the flag (deep PCB red, cream and navy with cream stars; China red with gold stars), parts, traces and pads on top. Strongest read at 320, most meme-ish; the model colour leaves the board, so the three US chips differ only by logo, name, founder and rim (against lesson 129).
- C Silhouette: the flag in the board's own ink, a shade darker; keeps the colour, quietest; stripes barely show on phones.
- D Waving: B rippled with shaded folds, still; the wave only shows at desktop size.

## Measured
Site fonts at 320 and 390 for every take, 1280 for B col, B 2x2, A 2x2, C col: no page errors, no failed requests, no sideways scroll; nothing past the edge but the rotated head (2 to 3px, as today); no numeral overlaps a chip or the strip; equal chip sizes at every width; numbers from `__x2pPnl()`, meet10's line, MODELS. Rule 0: no white grounds, nested boxes or emoji; nothing over a logo or face; the flag is the board itself; text covered, position and the gold 1 say rank and the flag says the country.

## How it could fail
B and D: the three US chips look alike ("three of the same") and the model colour carried into later sections is lost; GPT's white stripes keep a slight green cast. Moving the plate changes the chip's familiar look; the flag corner beside the name becomes the loudest part. The plate's old spot is code-made board, a bit flatter at 1280 (a Hedra repaint would do it properly: four chip masters with the tall name window, no No. box, plate low, flag in the mask). At 320 the version is about 4.5px and the quote about 7.5 to 8px. One column at desktop is 1379px against 418 for the 2x2. Not checked: Safari, slow CPU.

## Questions
1. B (flag colours, loses chip colour) or A (copper, keeps colours)? 2. OK to move the logo plate lower left? 3. Desktop: one column or ranked 2x2? 4. Show the version on phones at that size?

## Files
`gen.py` (chip paintings; run first with /usr/bin/python3), `m11.js`/`m11.css` (`__M11T` a/b/c/d, `__M11L` col/grid), `shot.js`, `run.sh` (PORT, default 8961), `board.py`, `flags.py`. `out/` (15 MB generated chips) is git-ignored now but still in history; gen.py rebuilds it.

## Round 2 · D2 (owner picked D with four notes, 2026-11-02; commit a0926b0f)
Boards `ez/x2p-h28-meet11-2-{390,320,1280}.png` (D beside D2, one column).
1. No glare: the painting's glass layers (`img.c7-glass`) and the drawn glare (`.c7-gl`) off, glass plain black; the glow behind P&L, W-L and quote off; the founder window untouched.
2. Plain lettering but the name: Season P&L flat green #3fd07a / red #ff5a4c, W-L (W green, L red, dash cream), quote flat cream #efe3c4, labels and version plain; the name keeps its lit cream and stays biggest (16.3 / 13.1 / 39px cap at 390 / 320 / 1280); meet10's strip pulse lands on W or L by turning the figure paler, no flash.
3. One board of four: `m11.js` clips each chip's pins and rim at the joins (painting rows 63 and 661 of 728) and pulls the next chip up, bodies edge to edge; `gen.py` take `e` paints gold bus traces with vias at the same x on every chip so the lines run across the joins; only #1 keeps its top pins and #4 its bottom pins; No. 5 stays separate; numerals level with their chip's body.
4. Desktop one column only.
Kept: equal chips (318x128.5 / 256x103.5 / 760x307), numerals left, #1 gold, no No. box, strip S1, founder loops, D's waving flag, live numbers.
Measured at 320/390/1280: no errors, no failed requests, no sideways scroll, only the rotated head 2–3px past the edge (as today), no numeral overlap. Body tops at 390: 44, 149.6, 255.2, 360.8 (step 105.6), section 489px (was 624); 320: step 85, 403 (524); 1280: step 282.3, 1214 (1379).
Could fail: at 4x a faint seam where two rims were cut, and the bus broken by parts in the margins (a Hedra repaint of one long board would hide the joins); the bus lines up only because all chips share x positions; joined, a newcomer may read one object, not four rivals (numerals and founder windows carry the split); the W/L pulse is a quiet colour change; Safari unchecked.
Questions: the bus enough of a link, or something louder (copper bar, solder bridge)? Should the pulse keep any light?
Files: `gen.py e` (run first), `m11.js` (`__M11T='e'`, class `m11-d2`), `m11.css` (D2 block), `shot.js`, `run.sh`.
