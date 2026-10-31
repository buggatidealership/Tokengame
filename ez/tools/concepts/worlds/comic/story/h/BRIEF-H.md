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

## Addendum (owner, 2026-10-31, after the cover helper started)
When the pool is named, name its share: "69% of the creator earnings" (the creator fees from $EZ trades; SIM.poolShare in ez-data.js, read it, do not type it). For example: "We follow its call on NVIDIA with 69% of the creator fees."

## Round H2: the owner's picks and notes (2026-10-31, afternoon)
- **"Reinvent" means rethink from scratch.** That covers the module itself (its shape, frame, material, layout and how it formats the information), not only the element inside it. When one piece reaches the new painted quality (the die count, the doors), every module around it has to reach the same level, or it looks cheap by contrast.
- The no-Hedra comic book (`ez/x2p-x3p-full-phone-*.png`) looks cleaner and more like a comic: its page-of-panels layout (gutters, hard cuts, caption gutters) is the formatting system to build on, now with painted layers.
- **Upcoming:** the pick is U6, the company's **name in lights** over the city, but it must be high quality: a real marquee sign with bulbs, not a black blob ringed by dots. Also reinvent the four **call bubbles** (each AI's mark with a speech bubble that holds its call, "?" until the calls are in), and fill the dead space beside the "Fight night / Monday" day head.
- **NVIDIA bet:** the pick is T1, **the die count** (a modelled GPU chip, the countdown in its four dies). The numbers must tick down live, every second, as page text set into the dies. Prove it with a short recording. Reinvent the three stake modules (the "69% of $EZ creator fees fill the pool" box, the "pool gets bet on the top AI's call, today Grok" box, the right / wrong pair) and the "NVIDIA is the first bet, not the last" line. They are still flat yellow and green boxes.
- **Meet the models cards:** Current P&L in the 3D pop lettering. Right way and Best call in **cut paper** or **ink brush line** (make both). The card's own background still lacks flair, so make it painted and rich, not a flat colour or one even dot pattern.
- **The bell** (on the cover's loop) still looks cheap. Reinvent it.

## Round H3: picks so far and what's next (owner, 2026-10-31, later)
- **Picked and going live:**
  - Every round so far: rack R2/R6 (logos painted by the model) and T2 Golden Age tiles;
  - the opened round: T1, the slab for real, films kept;
  - NVIDIA: the die count with S4, the parts list;
  - the loading cover: L3, ring at night;
  - the film frame: F3, through the page;
  - the P&L: flat, "If you'd bet $100K on every call".
- **Every element handcrafted, no exceptions.** The owner on the first screen's four steps: only the clock was redesigned; the logos in step 1 "look horrible... not handcrafted at all". Nothing flat may remain anywhere, inside any module.
- **The page's own ground.** Picture the empty website: what lies under every module? Today it is flat beige. It should be a comic book's page, and moving from one section to the next must read as a comic's segmentation (a page turn, a gutter, a splash, an abrupt cut), not one long scroll. G3 (a backdrop per section) is the favourite direction so far.
- **Tiles get comic thumbnails of their own films.** Each round's tile shows a Golden Age comic thumbnail drawn from what its film actually shows, so opening the film continues the picture instead of surprising the viewer.

## Round H3b: Smart or lucky and the Leaderboard, many takes (owner, 2026-10-31, later)
- "Redo the getting smarter or lucky... redo the leaderboard. So a lot of different mock-ups, please." Round H's proof takes (`ez/x2p-x3p-h-proof-*.png`, `h/proof/REPORT.md`) were not picked: treat them as rejected, and read their REPORT's failure notes so you don't repeat them.
- **Live since today, keep it true:** the P&L is flat, $100,000 on every call (P&L = $100,000 x direction x move; the page's `__x2pPnl`), with the line "If you'd bet $100K on every call". Ranked by P&L. Grok leads.
- **Carte blanche on format** (CLAUDE.md, "Carte blanche"): each take a genuinely different idea of how to show the data, not a re-skin. Every element hand-tuned; painted layers from Hedra; words and numbers stay page text, live from the page's data. The loudest treatment once per section, on its headline.
- **Smart or lucky** answers one question: are the AIs better than a coin flip, and are they getting better? The honest answer today is in the data (by each AI's own calls in order, none is clearly improving; see CLAUDE.md, "Flagged"). The picture must never tell a happier story than the data.
- **The Leaderboard tab** (its top "Who's winning", the scoreboard S3, the windows Season / 24h / 7 days, the proof) gets the same: many takes, each a different idea.
- Areas: `proof2` and `lb2`. Boards `ez/x2p-x3p-h3-proof-390.png` / `-1280.png` and `ez/x2p-x3p-h3-lb-390.png` / `-1280.png`, today's live page first.
