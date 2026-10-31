# Round H: redesign with painted layers (Hedra) and hand-tuned shapes

Owner, 2026-10-31, on the section openers board (`ez/x2p-x3p-openers-390.png`):

> "those changes are good. They stand... what I would also like is for this background to change... It's not just that flat background anymore, because now you can actually redesign everything. From scratch, same for the cards... What if the entire main background where everything is being overlaid on can be a comic book style as well?... This is still part of the fast and cheap approach you had... Not the 'it's going to take me more time handcrafting elements'. You can now do all of that... I put 100 euros in, it's fine, just use it all up. I want to run now through a lot of different mock-ups."

The owner's markup on that board circled these:
- the flat orange ray ground behind "Meet the models";
- the empty corner of the Grok card's top and its stub;
- the empty cream ground right of the All / Mag 7 / AI filter on Upcoming;
- the Apple main-event card;
- the dark ray ground right of "Next on the card";
- the NVIDIA chip card;
- the blank comic covers on the newsstand rack (put logos on them).

## Read first
- `CLAUDE.md`, the X3+ lines at the top and the long history. The live site is X3+, the comic: `ez/v47-live-x3plus.html`.
- `.claude/skills/ez-visual-story/SKILL.md`, all of it, above all rule 0 and lessons 62 to 72.
- `ez/hedra/REPORT.md`: the Hedra v3 API. Key in `$HEDRA_API_KEY`; never print, log or commit it.
  - Which model is good at what: seedream-50-pro gives the most modelled 3D with a light comic ink (cheap, 1080p to 1440p); gpt-image-2 gives the strongest ink line and pop art (1K medium about $0.03, 2K high about $0.43); nano-banana-pro came out as a collage; ideogram as a photograph.
  - For edits from reference images (logos onto covers, a frame around a given shape), check each model's input schema (`GET /v3/models/{model}/openapi.json`) for image inputs: gpt-image-2, flux-kontext, reve-21-edit, nano-banana and seedream may take reference images.
- `ez/tools/concepts/worlds/comic/story/openers/openmock.js`: how to lay a mockup over the real built page in Playwright and shoot it. Serve `ez/` with `python3 -m http.server <port>` (restart it in the same command; it dies between commands). The fonts helper is `ez/tools/concepts/live-r1/_fonts.js`. Make boards with `/usr/bin/python3` (it has PIL) or ImageMagick `convert`.

## Rules that do not bend
1. **Hand-tuned shapes by default; quality over speed.** Every element is drawn as its own shapes: irregular outlines, two-tone fills, shading, thick outer and thin inner ink. No stock effect, no plain CSS box, no one even pattern over a whole area.
   - Painted layers (scenes, materials, textures, characters, props) come from Hedra.
   - The finish can differ per element (3D with comic ink, pop art, anime cel colour, noir ink, risograph...). They hold together through the brand colours and one ink line.
2. **Words and numbers are page text, never baked into generated art.** Image models misspell and cannot follow the data. Prompt every image with "no text, no letters, no numbers". Real company logos come from `ez/media/logos/` (the site's own files): place them yourself, or give them to a model as a reference image and check the result letter by letter against the real logo. Reject any cover whose logo is wrong.
3. **All data is live**, from the page's own globals (ROUNDS, `__x2pPnl`, CAPS for company size in ez-data.js). Never type a number.
4. **Hierarchy.** The loudest treatment goes once per section, on its headline. Inner elements are quieter but still handmade.
5. **No dead space:** containers hug their content. No white or pale grounds inside modules, no module filled edge to edge with Ben-Day dots, no native emoji.
6. **Keep these unchanged:** the founders' animated portraits on the cards (`media/founder-<m>-anim.*`) and the section openers already shown (`ez/hedra/openers/`). They stand.
7. Check at 390 and 1280px (and 320 for overflow): no sideways scroll, no console errors, nothing over a number or a face.
8. Say how each take could fail. Do not show a board you have not zoomed into and compared with a real comic page.

## Budget and output
- Spend at most **$15** of Hedra credit in your area. Use the budget: several takes, not one.
  - Record every job in a REPORT.md in your folder: model, settings, cost, time, file, and one honest line on the result.
  - Draft at 1K, and spend on 2K only for the take you think is best.
- Your folder: `ez/tools/concepts/worlds/comic/story/h/<area>/`. Generated images as JPG, q88, at most 2048px on the long side, in `<area>/img/`.
- Boards: `ez/x2p-x3p-h-<area>-390.png` and `-1280.png`. Today's live page comes first, then each take, each labelled with a one-line description and its cost. Add a close-up row for detail.
- Commit only your folder and your boards. Run `git pull --rebase origin claude/bugatti-dealership-redesign-845i5j` first, then push to that branch (retry up to 4 times on network errors). Commit trailers:
  ```
  Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_01KWvAje4hnkBCpPe6R47PoY
  ```
- Push your boards as soon as they are done. Do not deploy, publish or change any live page file (v4x-*.html, tools/v22/*). Mockups only.
- Nobody watches your session, so do not ask questions. Where the owner's words read two ways, make a take for each reading and say so in the REPORT.
