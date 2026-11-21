# Round Y (2026-10-31): Meet the models, designed from scratch in the green room's language

Read first: `/home/user/Tokengame/.claude/skills/ez-visual-story/SKILL.md` (rule 0, its hard rules, lessons 58 to 67), then `../BRIEF.md` (page, data, runner, gotchas). This file overrides both.

## What went wrong last round (do not repeat)
The owner sent a video (`../gr/green-room-src.mp4`; stills `../gr/ref-dario-A-3dfirst.png`, which the owner picked) as a style reference. The last mockups pasted frames and loops of that video into the cards. The owner: "you essentially just took it and just put it on there... you didn't design anything from scratch. I want these type of elements to be present on, for example, the meet the models. The elements of the picture."
So: **no video frames, no generated images, no photos.** Every pixel is designed and rendered in code (CSS gradients, SVG drawn shapes, SVG lighting filters feDiffuseLighting / feSpecularLighting / feTurbulence, masks, blend modes, canvas if needed). The site's own assets (MODELS marks via the page's face(), CO_LOGOS, flags) are fine.

## The picture's elements (what to carry over, as design, not as image)
- Depth: a set with a foreground object, a mid layer and a dark background; things cast shadows on other things.
- Light: one hard key light from a side, a coloured rim light (the model's colour), a warm practical light (vanity bulbs, a lamp). Light falls off; surfaces facing it are bright, the rest dark.
- Materials you can name: weathered painted metal sign plate with stars, brushed aluminium with rivets, worn leather, brass, card stock, tape.
- The comic layer on top (picked by the owner: 3D first, comic finish): ink contour on the silhouettes and main edges, halftone dots ONLY inside the shadow areas, a touch of misregistration. Never a black and white comic; colour stays rich.
- The site's colours: logo black #04070e, cream #f8f0d9, green #03c870, red #ff3a31, gold #fdbc2a; each model's own colour (MODELS[m].c; Grok as #15121a).

## The module
Meet the models on `v47-live-x3plus.html` (`section.wc-chars`, cards `article.wc-ch`, built in `ez/tools/v22/world-comic.js` around line 154). Keep every fact on today's card: rank, name and model version, flag of its lab's country, role line, Current P&L (counts up), right way on n of m calls, highest P&L on <company>, last five. #1 is the golden ticket holder (gold leaf, arrives once then still). Numbers only from the page's globals.
Replace the card's look entirely (you may rebuild the card's DOM in your take's JS from the same data). Today's look: a Season 1 ticket with a waving flag behind it and a yellow caption box.

## Your take (one per helper; make it the best it can be)
- **y1 The mirror:** each card is a dressing-room mirror station: a frame of vanity bulbs that really glow (warm, one flickers once), the model's mark lit in the glass, its name on a weathered painted sign plate with two stars above it, a green or red key light raking across from the side, the stats written on things that belong to the set.
- **y2 The road case:** each card is the lid of a flight case: brushed aluminium edges, riveted corners, scuffs, the name stencilled on, the model's flag as a worn sticker, the highest-P&L round's company logo on a polaroid taped to the lid (the polaroid frame tinted with that company's brand colour), a coloured key light from above.
- **y3 The door:** each card is a dressing-room door seen in a dark corridor: lit panel bevels, a brass star plate with the name, light spilling from under the door in the model's colour, a small window or the door ajar showing the mark lit inside, the stats on a clipboard or call sheet pinned to the door.

## Deliverables
- Files in `ez/tools/concepts/worlds/comic/story/y/<your id>/` (CSS and JS laid over the built page, plus your runner).
- Your own server port (in your prompt). Shots one at a time.
- Board `ez/x2p-x3p-y-<id>.png`: top a single card large (390 wide at DPR 3, so the materials can be judged up close), then the whole section at 390x844, then the section at 1280 wide. Label strip with the id and one-line idea.
- Hard-rule checks with numbers (no white or pale grounds, no dead space inside a card: measure it, nothing over a logo, no native emoji, no halftone wallpaper, no sideways scroll at 320, 390 and 1280, no console errors), and the main-thread cost on a 4x slower CPU while the section sits still on screen (CDP Emulation.setCPUThrottlingRate 4, Performance metrics over 6 s, compared with today's section). Big SVG lighting filters can be expensive: if so, render the lit material once to a canvas or data URI and reuse it.
- Do not commit, deploy or publish. Clean up temporary frames. Report: what each element is made of, the checks, the cost, and what you could not do.
