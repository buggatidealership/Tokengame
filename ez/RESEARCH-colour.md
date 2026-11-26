# Colour and readability: research for the Season palettes (2026-09-30)

Labels: **[sourced]** from a cited source · **[measured]** computed by `tools/palettes.py` · **[derived]** my inference.

## What the research says
1. **Dark text on a light background reads best.** People proofread better and read faster with dark-on-light ("positive polarity"),
   young and old alike, because a brighter screen shrinks the pupil and sharpens the image. [sourced: Piepenbrock et al.]
   About half of people with astigmatism find light text on dark harder to read. [sourced]
   So all three palettes stay light. A dark version would be worse for reading and against the brand brief. [derived]
2. **Pure white on pure black causes halation** (text blur) for many readers. Off-white on dark grey avoids it. [sourced]
   So the dark panels on the page use charcoal or navy with off-white text, not #000 and #fff (except Daylight, which chases maximum contrast).
3. **Contrast minimums (WCAG):** 4.5:1 for body text, 3:1 for large text; 7:1 is the stricter AAA level. [sourced]
4. **About 1 in 12 men (8%) are red-green colour blind**, and finance defaults to red/green. [sourced] Crypto Twitter skews male. [derived]
   Fixes: pair colour with a symbol (the page already shows ▲/▼), or use blue/orange, which colour-blind readers can separate (Okabe-Ito colours). [sourced]

## Findings on the current page (the mint "Pitch" palette) [measured]
- Green "up" text on white: 3.1:1 (below the 4.5:1 minimum).
- Grey small print on white: 3.6:1. Red "down" on white: 3.6:1. White text on red: 3.6:1.
All three new palettes pass every pair the page uses (see `tools/palettes.py` for the list).

## The palettes
- **Paper:** for long reading. Warm grey ground (less glare than white), charcoal ink, apricot highlight.
- **Colour-safe:** up = blue, down = vermilion (Okabe-Ito). Sky-blue highlight. Readable for red-green colour-blind visitors without the arrows.
- **Daylight:** maximum contrast for phones in sunlight. White ground, near-black ink, lime highlight.

## What would prove this wrong
- Most visitors arrive from X in dark mode; a bright page may feel like a flash. If bounce is high on first load, test a dark palette despite (1).
- Brand recognition may matter more than comfort: yellow is already the $EZ colour. If the variants test equal on reading, keep the brand colour.

## Sources
- Positive polarity: https://documentacion.fundacionmapfre.org/documentacion/publico/pt/bib/143702.do?format=xml · https://cogsci.nl/blog/is-bright-text-on-a-dark-background-a-good-idea
- Astigmatism and dark mode: https://utahvalleyeye.com/is-dark-mode-good-for-your-eyes-or-not/
- Halation and contrast: https://audioeye.com/post/color-contrast-isnt-so-black-and-white · https://testparty.ai/blog/wcag-contrast-ratio-guide-2025
- Red-green colour blindness in charts: https://visualisingdata.com/2019/08/five-ways-to-design-for-red-green-colour-blindness/
