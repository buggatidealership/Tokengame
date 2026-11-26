# Round H · ground: the page background and the section grounds (2026-10-31)

Boards: `ez/x2p-x3p-h-ground-390.png` and `ez/x2p-x3p-h-ground-1280.png`. Each board: today's live X3+ first, then G1 to G6, each from the page top down through Meet the models and Every round so far, then the Upcoming tab's top; a close-up row at the end (the gutter above Meet the models and its headline, Every round so far's headline, the Upcoming top, at full resolution).

Mockups only: CSS laid over the built `v47-live-x3plus.html` (`run.js`); no live file changed.

## What I read the brief as
"The ground" is two things: (a) the page's main background (today flat cream with a faint dot grid) and (b) the section grounds (today the CSS conic-ray fills: orange behind Meet the models, blue behind Every round so far, dark behind "Next on the card"). The cover's own cream box, the cards, the openers and the founders' portraits are other areas and are untouched.

Two readings of "the entire main background... can be a comic book style as well", so both are here:
- one illustration behind everything (G1, a painted city);
- a material the page is made of (G2 newsprint, G4 riso paper, G5 kraft card, G6 painted canvas), with G3 in between (a material for the page, a painted scene per section).

## The takes

| Take | Page ground | Section grounds | Upcoming top | Hedra cost | Added weight, phone (worst case, both tabs) |
|---|---|---|---|---|---|
| G1 One city at night | one painted city (gpt-image-2, 2K high) on a fixed layer, drifting slower than the scroll (scroll-driven CSS, still with reduced motion); 16:9 seedream city on desktop | tinted gels (orange, blue) the city glows through; gutters widened 44 to 84 px so the city shows | dark gel; each Upcoming day and the filter sit on a newsprint panel (dark ink text would not read on the city) | $0.39 | 275 KB (desktop 258 KB) |
| G2 The comic page itself | aged newsprint tile, a hand-ruled wobbling ink page edge down both sides, a hand-drawn registration target and colour bar over each section | each section's ink printed off register: a sliver of bare newsprint inside the top-left border | black ink tile with a hand-cut, inked gold burst on the right | $0.21 | 154 KB |
| G3 A backdrop per section | painted plaster wall tile | Meet the models in a backstage corridor (red and green key light, graded orange so the section keeps its colour), Every round on a rain-wet newsstand street; 2K phone versions, 16:9 desktop versions | a painted arena under one spotlight, dark on the left for the words | $0.76 | 451 KB (desktop 466 KB) |
| G4 Risograph, two inks | cream riso paper tile | solid riso ink (fluorescent orange, medium blue) with the other ink overprinted as a hand-cut burst behind the headline | blue riso with an orange burst multiplied in | $0.21 | 147 KB |
| G5 Cut-paper diorama | kraft card tile | stacks of hand-cut card with real shadows (orange, blue; 16:9 desktop versions) | cut-paper arena, gold-foil spotlight | $0.80 | 733 KB (desktop 626 KB) |
| G6 Painted gouache (carte blanche) | painted canvas tile | brushed orange and blue gouache fields with a painted light pool behind each headline; no print devices at all | a painted night arena with a gold beam | $0.19 | 205 KB |

Weight is the JPG files each take adds (tiles 512 px at q80, scenes 900 px wide on phones and 1600 px on desktop at q70), summed from the files; today's grounds are CSS gradients, 0 KB. On a phone that is one to three times the size of one round film's poster. The scenes would shrink by about a third as WebP (not tried).

## Seams
Every tile was prompted "seamless tileable" and then checked tiled 2x2. The raw tiles mostly wrapped, but newsprint (a horizontal line at the wrap), kraft (a vertical band) and riso blue showed seams. `seam.py` fixes every tile the same way: the tile's centre is kept and its edges are taken from a half-offset copy (whose edges are the original's continuous centre), blended over the outer 40%. After it, no seam is visible tiled 3x3 at 2x zoom. `seam.py` also prints an edge-difference ratio (wrap edge against neighbouring rows); it stays near 1 before and after because grain dominates it, so the visual check is the real test.

## How each take could fail
- **All:** at 390 px the cards cover most of each section, so a ground shows only in the gutters, around the headline and between tiles. The change reads strongly around the headlines and on Upcoming; across a scrolled page it is quieter than the boards' thumbnails suggest. This is the biggest risk: the owner may expect the ground to carry more of the page than the layout lets it.
- **G1:** the city behind 6,000 px of page is the same picture on every screen (it is fixed, as a visitor would see it), so it can read as wallpaper. Dark ground means anything printed in dark ink on the page itself must sit on a panel (done for Upcoming; the Overview's later sections, the bet and Get $EZ, were not checked). Widening the gutters is a layout change, not only a ground. iOS ignores `background-attachment:fixed`, so it is a `position:fixed` element, which costs a composited layer while scrolling (not measured).
- **G2:** the registration marks and page rule are small; at arm's length they may read as noise or a rendering glitch rather than "printed page". The misregistration sliver is 7 to 10 px and only top-left.
- **G3:** the painted scenes are soft and dark behind bright cards; the street backdrop is mostly hidden by the round tiles. The backstage corridor repeats the idea of the Meet the models opener already shown (backstage), which is a strength or a duplicate depending on the openers' final place. Upcoming's ropes sat behind the paragraph in my first pass; now darkened on the left, but on very narrow screens the rope lines can still touch "before it".
- **G4:** the overprinted burst is close in value to the ink under it, so on Meet the models it is barely visible at phone size (stronger on blue). A riso look also needs the type to follow (misregistered headline plates) to convince; only the grounds changed.
- **G5:** cut paper is the most "rendered" and the heaviest (733 KB). The cut-paper rays radiate from the top; with the headline on them it is busy, and it brings back a sunburst, which the owner called cheap in its CSS form (lesson 38). The first desktop orange came out as an object on a cream wall and was replaced.
- **G6:** brushwork at tile scale can look like a blurry photo of paint rather than painting; it has no ink line, so it holds to the rest of the comic only by colour.

## Checks run
- 390, 1280 and 320 px, both tabs, every take: no sideways scroll (scrollWidth equals the viewport), no console errors.
- Nothing laid over a face or a number by the grounds: the Upcoming art was moved right and darkened left after the first pass, where G3's ropes, G5's cone and G6's beam touched the paragraph and "34 still to call".
- Zoomed every headline area at 2x and compared with a printed comic page: the grain, the misregistration and the riso speckle hold at that zoom; the painted scenes (G1, G3) are soft at 2x (900 px wide images stretched over sections up to 2,123 px tall on a phone, through `cover`).
- Rule-0 list: no white or pale grounds inside modules (G1's newsprint panels are pale; they hold the Upcoming day lists, which are already cream today), no native emoji, no Ben-Day dots across a whole module (today's halftone overlay is removed or replaced in every take).
- Capture note: on the 1280 boards some Every round thumbnails are black. They are the page's lazy images not loaded in the headless capture (they are black on today's page too), not the take.

## Hedra jobs
All drafts at the cheapest settings, 2K only where it mattered (the G1 city, G3's phone backdrops and the desktop 16:9 versions). Prompts end "No text, no letters, no numbers, no logos, no signs, no people, no watermark"; tiles add a seamless, even-lighting clause. Full prompts and job ids in `jobs.jsonl`. Every charge equalled its estimate. **Total spent: $2.42 of $15** (the brief's $15 is a ceiling; six takes did not need more, and more variants of the same idea would not have added a seventh idea). The first batch of 19 submissions all hit 429 rate limits at the estimate step (nothing charged); `hedra_gen.py` now retries with backoff and runs three at a time.

| File (img/) | Model | Settings | Cost | Time | One honest line |
|---|---|---|---|---|---|
| g1-city-phone | seedream-50-pro | 1080p 9:16 | $0.0675 | 133 s | Strong deco canyon with moon and lit street; superseded by the 2K one |
| g1-city-desk | seedream-50-pro | 1080p 16:9 | $0.0675 | 122 s | Good: towers frame a calm sky, green and red neon, used on desktop |
| g1-city-phone-g | gpt-image-2 | medium 1K 9:16 | $0.029 | 29 s | Looking straight up; dramatic but too dark behind content; not used |
| g1-city-phone-2k | gpt-image-2 | high 2K 9:16 | $0.2218 | 84 s | The best city: rain, wet glowing street, ink line; used on phones |
| g2-newsprint | gpt-image-2 | medium 1K 1:1 | $0.0533 | 39 s | Convincing yellowed pulp; seam at the wrap, fixed |
| g2-ink-orange / -blue / -black | gpt-image-2 | medium 1K 1:1 | $0.0533 each | 35 to 51 s | Flat letterpress ink with paper specks; the blue came out cyan, shifted in CSS |
| g3-backstage (+ -2k, -desk) | seedream-50-pro | 1080p / 1440p 9:16 / 1440p 16:9 | $0.0675 / $0.135 / $0.135 | 90 to 91 s | Good painted concrete with red and green light; desk version has pipes along the top |
| g3-street (+ -2k, -desk) | seedream-50-pro | same | same | 90 to 96 s | Nice wet cobbles and lamp; the empty poster frames are the only risk (they stayed empty) |
| g3-arena | gpt-image-2 | medium 1K 16:9 | $0.0289 | 29 s | Clean anime-cel ring under one spotlight; used for Upcoming |
| g3-plaster | gpt-image-2 | medium 1K 1:1 | $0.0532 | 46 s | Warm painted plaster, wraps well |
| g4-riso-paper / -orange / -blue | gpt-image-2 | medium 1K 1:1 | $0.0532 to $0.0533 | 35 to 36 s | Believable riso grain and drum streaks |
| g4-riso-over | gpt-image-2 | medium 1K 1:1 | $0.0534 | 41 s | Came out as camouflage blotches; not used |
| g5-kraft | gpt-image-2 | medium 1K 1:1 | $0.0532 | 35 s | Good kraft with flecks; vertical band at the wrap, fixed |
| g5-cut-orange / -blue / -dark | seedream-50-pro | 1080p | $0.0675 each | 82 to 99 s | Real layered-card depth; the blue has a white border (cropped) |
| g5-cut-orange-desk | seedream-50-pro | 1440p 16:9 | $0.135 | 107 s | An object on a cream wall, not a full-bleed ground; rejected |
| g5-cut-orange-desk2 / g5-cut-blue-desk | seedream-50-pro | 1440p 16:9 | $0.135 each | 84 to 85 s | Full-bleed cut card, used on desktop |
| g6-canvas / -orange / -blue | gpt-image-2 | medium 1K 1:1 | $0.0533 each | 41 s | Gouache brushwork; reads painted at 1x, a little muddy at 2x |
| g6-night | gpt-image-2 | medium 1K 16:9 | $0.0289 | 30 s | Loose painted arena with a gold beam |

## Files
- `gen.js` writes `g1.css` to `g6.css` (hand-tuned shapes are drawn in it from a seed: the uneven two-layer bursts, the registration targets and colour bars, the wobbling page rule); `g1.js` adds the city layer.
- `run.js <out> <takes> <widths>` shoots the built page with a take laid over it (G1 is shot screen by screen while scrolling and stitched, because its layer is fixed); `pos.js`, `board.py`, `close.py` make the boards; `seam.py` fixes tile seams and writes `img/web/`; `weight.py` sums each take's files; `hedra_gen.py jobs.json img jobs.jsonl` runs Hedra jobs (reads `HEDRA_API_KEY` from the environment).
- `img/` the generated originals (JPG q88, at most 2048 px), `img/web/` the web versions the mockups load.
