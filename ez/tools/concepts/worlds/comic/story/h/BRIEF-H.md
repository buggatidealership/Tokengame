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

## Round H4 (owner, 2026-10-31, evening): what the owner wants next
The owner's own words matter less than the want under them ("Don't listen to what I'm saying. Understand what I want."). The bar is what already works: **Every round so far** (the painted newsstand rack, `ez/media/rack-r6c.jpg`, with the Golden Age tiles) and **the NVIDIA bet** (the die count and the parts list, `ez/x2p-x3p-live-bet.png`). Match their level and their painted pop-comic look (3D first with a comic finish: modelled, lit, ink lines and halftone in the shadows, saturated brand colours).
- **Rejected, do not repeat:** the dressing-room doors behind Meet the models ("lackluster... doesn't look like a comic"); the fresh-eyes prototype's invented robot oracles ("why invent these different robots? We already have the characters": the four founder characters in `ez/media/founder-<m>-anim.*` and the green room film are the cast, always); anything that reads as "a traditional website cheaply made using AI".
- **Kept:** today's layouts where the owner said so; every element inside them is reinvented (its shape, material and lettering), not re-skinned.
- Areas: `thumbs2` (tiles from each film's end), `cover3` (the first screen), `slabback` (the opened round's back), `ground3` (the page's ground and the loading cover).

## Round H5 (owner, 2026-10-31, evening): one comic book, alive
Owner, on the H3b boards: "none of them speak to me for the smart or lucky... why not just have the P&L dashboard... re-rendered... every element has to be re-rendered to feel in line with the design... My favorite one is Out of the Fog, because it has charts... The pulse check is an interesting one as well, but the TV screen just doesn't really fit... you don't have to use our characters everywhere... it'd be interesting to generate different variations of the character... there needs to be this unfolding on the overview page... every time you go from one section to the next... transitions... the background of the website itself is essentially supposed to be the comic... each section... is part of the comic. Just like in a comic book, you have one element at a time or one box at a time... it should be a unified storybook... The backgrounds are 100% getting better." Then: "small animations, small visual effects, that's what brings the comic alive... and that's also what's still missing." The fresh eyes prototype ("Midnight Fairground") is rejected: "no comic book feel whatsoever". Do not draw on it.

What he wants, in an expert's words: the Overview reads as one comic book. The page itself is the printed comic page; each section is a panel or a page of it, read one at a time; moving between sections is a comic's own cut (gutter, page turn, splash, "meanwhile..." caption), not a scroll past boxes. Inside each panel, small quiet motion makes the picture live (lessons 32, 42, 62): ink settling, a balloon popping in, motion lines on a change, a lettered sound effect on a reveal, never a show.

- **Smart or lucky becomes the P&L dashboard** (his name for it; the section's title is open, see the questions in REPORT). Content: the P&L view of the Leaderboard tab's proof (`tools/v22/world-comic.js`, `vPnl`: every AI's cumulative P&L line from round 1 to now, break-even line, each line's end label; rows with Last 24h, Last 7d and P&L; "If you'd bet $100K on every call"). **No Accuracy, Target hits or Sector** on the Overview: they stay on the Leaderboard. The flat P&L is live: $100,000 on every call, P&L = $100,000 x direction x move (`__x2pPnl`). Every element re-rendered in the painted comic look of the bar (the rack, the die count): the chart, its lines, the axis, the end labels, the rows, the windows. Out of the Fog (`h/proof2/`, take A) is his favourite because it is a chart in a painted scene; Pulse check's trace was interesting, its TV frame was not. Characters are optional here.
- **Areas:** `pnl` (the P&L dashboard, at least five takes), `flow` (the page as one comic and the cuts between sections, recorded as videos on the real page), `alive` (small animations and effects inside the existing modules, as short clips, each one carrying a fact), `cast2` (variations of the four founder characters). Boards `ez/x2p-x3p-h5-<area>-390.png` / `-1280.png`, videos `ez/x2p-x3p-h5-<area>-*.mp4`.
- **Videos:** record from Playwright on the built page (`recordVideo`, or screenshots per frame at a fixed step), convert to mp4 (H.264, yuv420p, faststart), under 20 MB each, phone width 390 first. Every animation still with `prefers-reduced-motion`. Measure the cost of each effect on a 4x slower CPU (CDP `Emulation.setCPUThrottlingRate`), frames per second while it runs and main-thread time, and say it in REPORT: the live site must stay smooth on a slow phone.

## Round H6 (owner, 2026-10-31, evening, on the H4 and H5 boards)
Picked and live: the loading cover Lh (the hanging factory lamp). The bar on the page: **the NVIDIA bet section** ("the best section right now") and Every round so far's rack. What the owner keeps saying, read as one want: the Overview must read as **one unified comic, chapter to chapter, one story** ("a comic... is still simply a storyboard"), never "one section at a time"; and every element must be **part of the environment**, never pasted on top of a painting ("the charts look like they've been just pasted on top of the background"; "it doesn't feel integrated"; "it looks cheap"). A chart, a balloon or a number sits in the scene the way a sign, a chalk mark or a grease-pencil line sits in a real place: in its light, its perspective, its material, partly covered by what is in front of it.
- **Cover (`cover4`).** None of cover3's T1 to T4 speak to him thematically. Words he dictated for the four steps: 1 they predict the move before earnings, 2 the market close grades every prediction, 3 "#1 on the leaderboard holds the golden ticket", 4 "we follow its call on every bet", then "Bet #1: NVIDIA" so a visitor understands there is more than one bet. Keep the cast (founders), Season 1 and real predictions. Earlier he liked Z4 "The issue" (the first screen as a comic cover). Five or more genuinely different takes; simpler than cover3.
- **The book (`book`).** Ground3's A (Fight night, ring ropes) is his favourite ground, but: the "Meet the models" title must sit **inside** the big starburst, lettered into the comic burst of the painting, not floating under it; "Every round so far" must be the section's head **above** the rack, not under it. The page must flow like one comic: flow's C (the pile: the next page slides up over the one you read) is "the most interesting" and D (iris) "not too bad, but I would have to see it in production": build them on the real page, cheap enough for a slow phone (flow's REPORT says how: one darkening layer, no landing tilt on tall pages; an iris from transformed bars), and think how a reader experiences the cut (where the eye is, what it sees first on the new page, how the last frame of a chapter hands over to the next). Videos at 390 and 1280, measured at 4x CPU against today's 28 fps.
- **The card back (`slab2`).** Of slabback's takes, D "the page" is the favourite, and the turn of the card is "really nice". Fix: the round "prediction circles" look cheap next to the art; the background must feel part of the predictions. Use the cast2 moments (`h/cast2/`): each founder's panel shows the pose of what happened to him that round (crowned when he won, hit by the FAIL when he went the wrong way, a plain pass when right but not closest, "predicting" while pending), and the panel's finish can change (pop art, anime cel, 3D with comic ink: the owner liked all of cast2's finishes). Make the pose set once per founder and style (not per round), with the calls lettered as true balloons in the panel's own art. A take that makes the back read as a comic cover is welcome.
- **The P&L dashboard (`pnl2`).** Favourite direction: D "Follow the money" (the ops room), then E "In the green" (the circuit board). Their problem: the chart looks pasted on the painting. Make the lines part of the scene: grease pencil on the glass that catches the room's light and reflections and smudges where a hand rubbed it; traces etched into the board with solder, vias and the leader's trace lit; the axis and labels lettered on the material. Same live data as `h/pnl/_lib.js`.
- **The winner on every tile (`tiles3`).** "Always show the winner, so they don't have to click into it." Today the T3 tiles gild and crown the winner's object, which names nobody, and the stub carries a stamp. Show who won in the picture itself, several ways (for example the winner's crowned founder from cast2 standing in the scene, the winner's mark on the gold plate, the founder's face on a crowned medallion), each still the round's own scene, ties showing both and no-winner rounds showing that. Mockups first; a few rounds are enough to judge.
- **A style per tab (`lbstyle`).** The cast can change finish by section: "the overview page could be what we have today... the leaderboard tab can have a different style itself, can have like noir ink". Mock the Leaderboard tab (Who's winning, the scoreboard, the proof) in a noir ink world with the noir cast (cast2 (b)), as one complete tab, and one more finish of your choice (pop art or anime cel), so he can see a site whose tabs are chapters in different inks.
- Areas: `cover4`, `book`, `slab2`, `pnl2`, `tiles3`, `lbstyle`. Boards `ez/x2p-x3p-h6-<area>-390.png` / `-1280.png`, videos `ez/x2p-x3p-h6-<area>-*.mp4`. Rule 0 and the hard rules hold; the owner's checks this round were "integrated", "fluid", "not cheap".

## Round H7 (owner, 2026-10-31, night): every section rebuilt from the bottom up, the bet section is the floor
Read first: `.claude/skills/ez-visual-story/SKILL.md` (lessons 82 to 84 are this round's), and the recipe the owner and I agreed on, https://claude.ai/artifact/1jmCX6UNmUb6hzPphRZbTW (its source: `ez/review/bet-recipe.html`): one world per section; three beats in order, one question each (establishing shot, the live figure, the mechanism); the live number lives inside an object of that world (diegetic); later beats call back to earlier ones (one material); labels in that world's own language; one finish (painted 3D with comic ink, sharp, one warm key light, depth of field, the logo's black, gold, green and red); **no containers**: no code-drawn boxes, cards, tickets, rounded rects, sunbursts, ray grounds, dot screens or flat colour fills, the painting is the panel and live page text is set into a painted surface made empty for it; words only label; motion that acts out a fact.
The owner, in his words: "whenever you do a redesign, you only change the color, but you do not change the layout, the distribution of data... With the bet section... you change it fully... into a comic book. The freedom here is to redesign every element." "There needs to be an original background absolutely everywhere." No beige anywhere (neither the top's cream panel nor the cream paper of the Leaderboard and Upcoming tabs).
Process (owner, same night): rough first. Coded or primitive mockups (quick low-res Hedra roughs at about $0.03 are fine) shown to the owner; only the picked one gets painted properly in Hedra, with the rough as its reference. Every number and word stays live page text.
- **The top (`cover5`), first.** The first screen ("4 AIs trade earnings / Who calls it best?", Season 1, the four founders starring, the four steps, the film) rebuilt as one painted world with its own colour range, the way the bet section is built. Today's cream panel, the Season 1 strip, the four step boxes and the round chips are all code boxes and must go. Keep the content: Season 1 and the number of rounds graded, the four founders, the four steps in the owner's words (1 they predict the move before earnings, 2 the market close grades every prediction, 3 #1 on the leaderboard holds the golden ticket, 4 we follow its call on every bet, then "Bet #1: NVIDIA" as the payoff), the explainer film (1:20) and the way into Meet the models. Real data where a step shows data (the newest graded round's real calls, the close, the winner). At least six genuinely different worlds, rough, at 390 and 1280. Boards `ez/x2p-x3p-h7-cover5-390.png`, `-1280.png`.
- **Hit rate worlds (`hitworlds`).** Smart or lucky becomes the hit rate round by round by default ((right + 1) / (calls + 2) per AI after each graded round, the coin flip at 50% as a line), with an option to switch to the P&L (flat $100,000 per call, Season / 7 days / 24 hours as on the Leaderboard). The exchange's big board (pnl2's F) is being built live separately; you make new worlds: at least five, each answering "is any AI beating a coin flip?" in its own world, the chart drawn live into the painting's perspective (pnl2's `_s.js` homography method), the switch made of the world's own material. Rough first. Boards `ez/x2p-x3p-h7-hitworlds-390.png`, `-1280.png`, one video of a switch.
- Rule 0 and the hard rules hold. Commit only under `ez/tools/concepts/` and the boards in `ez/`; never touch `ez/tools/v22/` or any `ez/v4*.html`, never deploy or publish.

### Round H7, the owner's answer on worlds (2026-10-31, night): the whole site is one world, a book
"The whole site, one world, exactly." "The first section can be the cover of the world itself, right? And then when you scroll down, it opens up the book, the comic book, essentially, and then you scroll through different sections of a comic." So: the site is one comic book. The first screen is its **cover**; scrolling **opens the book**; each section after it is a **chapter**, and each chapter has its own scene inside the book (the bet chapter's vault stays exactly as it is). Everything in a chapter lives in that chapter's scene (diegetic): numbers, words, switches, the ground, the move to the next chapter. "The world is the most important thing... then everything else derives from that." He deliberately gives no list of elements: "if I give you a list, then you're only going to focus on that list." Take your time; ideas first, rough.
- **The top (`cover5`)** is now the book's cover: a real comic book front cover for the whole season (masthead, issue, the four founders as the cast, the cover lines), and the first scroll opens it. The content of the old brief still has to be found somewhere on the cover or the first spread (Season 1, rounds graded, the four steps, the film, the way into Meet the models).
- **Smart or lucky (`hitworlds`)**: the narrative is "you're evaluating AIs". Besides the exchange's big board (being built live), the owner suggests "a super high quality hand-drawn old school computer... pixel, like early stage computers... but high crisp... like you're at a desk analyzing, like analysts back in the days", or an "Agent Tower", or another place where AIs get evaluated. Make the early computer at the analyst's desk one of the takes.
- **Every round so far (`rounds3`)**: each round as a comic book front cover with the winning founder painted in as the guest star (tiles3's A), a tap and the card flies out at you; the place the covers live replaces the blue: a comic shop, but "not everybody is fans of comics, so what could be another thing": competitive sport, boxing (he is "not the biggest fan" but it can fit), others. At least five places, rough.
- **The book (`book2`)**: how the whole site works as one book: the cover, how it opens, how a chapter hands over to the next (page turn, a panel that zooms into the next scene, a gutter), what the header and tabs become inside the book, the order of chapters. Rough, with a video of the cover opening and one chapter turn.

### Round H8 (owner, 2026-10-31, late night, on the H7 boards and the live big board)
- The big board on the live site impressed him ("an interactive comic... I wasn't aware of that"), with two notes: the slate leans toward you at an angle, which makes the analytics harder to read (a world can show its board head-on), and **every interactive element must move a little so the eye finds it** (skill lesson 86), in every world.
- The cover5 fight night: the calls and the close float in the air over the ring, on no surface, so they read pasted on (lesson 85). Every number needs an object in the scene to live on.
- **No characters at the top.** The four founders first appear in Meet the models (lesson 87). The book's cover sells the world and the question, not the cast.
- Areas: `cover6` (the book's cover, no characters, every number on a surface, the opening as book2's A mechanics or better, interactive objects that move), `wow` (rough mockups of capabilities the owner has not asked for: a scene that changes with the data, a scene that changes with the time of day and the market's clock, the visitor making their own call before the bell, depth from painted layers, characters whose pose follows their latest result, and anything else that would make a first visitor stop).

## Round H9 (owner, 2026-10-31, late night, on the H7 boards)
**The art style, settled:** the reference is the bet chapter's vault (`ez/media/bet-vault-h2.jpg`): a **drawn** comic, brush and ink, heavy blacks, dry-brush texture, ink splatter, hatching, one or two spot colours from the logo (gold, green, red) carrying the light. The H7 roughs (polygraph, arcade cabinet, comic shop, tunnel, newsstand, hall) read as **3D realism**: smooth rendered surfaces, photographic light, no line. That is the wrong layer. Prompts must ask for the drawn look first (the vault's own prompt is the starting point; read `../bet2/` and `../bet/` for it), and every take is shown in **more than one art style** ("detachable art styles", "different layers"): at least (1) the vault's brush-and-ink noir with spot colour, plus two other drawn styles of your choice (for example a Silver Age line-and-flat-colour print, Mignola-style hard shadow shapes with flat colour, a Spider-Verse offset print). Never realism, never a 3D render look. No beige surfaces anywhere (the polygraph's cream chart paper and the cream corner boxes are out).
**Type on the Overview:** one heading face for every chapter, the bet chapter's "Bet #1: NVIDIA" (Bangers, #ffd21f, a .075em ink stroke, tilted about -2deg; `ez/tools/v22/story/h_bet.css`, `h2.hb-h`). Other worlds and fonts only on other tabs.
**Crisp:** every live number and line as crisp as the NVIDIA chip's countdown digits: no glow or blur on text or chart lines (a glow may sit behind, never soften the mark), the data surface seen **head-on**, never at an angle.
**The order (owner):** the cover shows only the model names (no faces); the founders' faces first appear in Meet the models; then the rest. Every chapter hands the story to the next (narrative logic from chapter one).

- **`rounds4`, Every round so far.** Kept from rounds3: Back issues, The fight card and Late edition (the owner's favourites). Redo those three in the drawn styles above. **No founder (guest star) on the covers** ("too much of the character across the site"): the cover art is the round's own scene with its outcome (the T3 tile art, `ez/media/tile-r<n>-t3.jpg`, or the film's frame repainted in the style), and the cover line still says who won ("GROK WINS!", "NOBODY WINS!"). Plus **three new worlds** where the covers could live, in the same drawn styles. Keep the tap that sends the cover flying out. Hall of Fame is parked for a later Hall of Fame tab or the Leaderboard (do not mock it now). Boards `ez/x2p-x3p-h9-rounds4-390.png`, `-1280.png`, one tap video.
- **`sol3`, Smart or lucky.** The two favourites: **W2 Insert coin** (arcade) and **W1 the lie detector**. Narrative: if Meet the models is fight night, the next beat is gambling: insert a coin, then the bet. Remove the coin captions ("Grok 63%: a coin does that 1 time in 45", "Kimi 46% worse than a coin"): people read the chart themselves. Fix the arcade's defects from the owner's screenshot: the screen head-on, not tilted; the chart and every label crisp; the "1P HIT RATE" tab's stray mark at its left edge; nothing runs off the screen or over its bezel; no line crosses text; each end label on one line, name then value ("GPT 54%"), placed so they do not crowd; the title "Smart or lucky?" in the Overview heading face above. The P&L view shows **a small table under the chart** (per AI: W-L, P&L; Season / 7 days / 24h as today). Several iterations of the lie detector in the drawn styles (not a rendered machine; no cream paper: a dark or inked chart strip), and the arcade in at least two drawn styles. Interactive parts move a little so the eye finds them. Boards `ez/x2p-x3p-h9-sol3-390.png`, `-1280.png`, one switch video.
- **`cast3`, Meet the models.** The chapter where the four founders' faces first appear (the green room caricatures: `ez/media/founder-*-a.jpg`, `founder-*-anim.*`; `gr/green-room-src.mp4`). The owner leans to **fight night** (the weigh-in, the fighters introduced, the tale of the tape), which leads into Smart or lucky's gambling. At least three fight-night takes plus two other worlds, each in the drawn styles, each fighter's live numbers (P&L, W-L, hit rate, last five) on a surface in the scene (name plates, the scale, banners), never floating. Today's Meet the models is the one section the owner likes; keep what works (each AI's own colour, the waving flag) and rebuild the world. Boards `ez/x2p-x3p-h9-cast3-390.png`, `-1280.png`, one video.
- Rule 0 and the hard rules hold. Commit only under `ez/tools/concepts/` and the boards in `ez/`; never touch `ez/tools/v22/` or any `ez/v4*.html`, never deploy or publish. Budget: up to $8 of Hedra each, rough first (1K, medium).

## Round H10 (owner, 2026-10-31, late night, on the H8 boards cover6 and wow)
**Two styles, every take shown in both (owner: "show me both"):** (1) the vault's brush and ink (`ez/media/bet-vault-h2.jpg`) with its light and spot colours only the logo's gold #fdbc2a, green #03c870 and red #ff3a31; (2) the logo's own style (`ez/tools/concepts/ez-logo-traced.svg`, the EZ. avatar): a flat graphic badge, flat colours, hard ruled edges, speed slashes, a heavy slanted wordmark, black ground, no brush texture, no shading gradients. Never realism: cover6 and wow were painted as 3D realism and read as "AI slop".
**Nothing pasted on:** every live word and number sits on a surface the painting carries *blank for it* (an empty envelope face, a blank sign, a dark screen, an engraved plate), set in that object's own material (ink on paper, light on a screen, engraving on brass), its light and perspective matching. Measure it: name the painted surface under every live text; if there is none, paint one.
**No founders anywhere before Meet the models.** Model names as words are fine (on the letter, the ticket); faces are not.

- **`box`, the first screen as one continuous scene (owner's pick: "Box office, loop, cinema"):**
  1. *The box office* (cover6's D as the direction): the Season 1 marquee carries the cover lines ("4 AIs trade earnings / Who calls it best?", Season 1, rounds graded, next bell), a golden ticket pokes out of the slot and nudges (lesson 86). Tap or scroll: you take the ticket.
  2. *The loop, learned by doing:* four objects, each asking to be touched, each opening onto one fact with real data (the newest graded round): (a) a sealed letter: tap and it opens to the four predictions ("They predict the move before earnings"), (b) the closing bell: tap and it rings, the market's answer arrives ("The market close grades every prediction"), (c) the golden ticket: tap and it turns over to the leader with its P&L and W-L ("#1 on the leaderboard holds the golden ticket"), (d) step 4 "We follow its call on every bet" with Bet #1: NVIDIA: show **several options** for its object (the owner asked): at least the vault door opening a crack onto Bet #1, a betting slip stamped and slid under a window's grille, and one of your own. No four squares: the four steps are four objects in one world.
  3. *The cinema:* doors open on a screen in the world playing the explainer film (`media/ez-landing-v4.mp4`, poster `-poster-ez.jpg`), "How it works · 1:20"; then the way into Meet the models.
  The transitions between beats (taking the ticket, the doors opening) must come from the world, not a code animation between two paintings. **Test Hedra video:** can an image-to-video clip start on our painted frame and end on the next (first and last frame given), short (2 to 4 s), and play as the transition (muted, scrubbed by scroll or played on tap)? Report what works, cost and file size; fall back to painted in-between frames.
  Boards `ez/x2p-x3p-h10-box-390.png`, `-1280.png` (both styles), a video of the whole path at 390.
- **`floor`, the Upcoming tab and Your call:**
  1. The top of the Upcoming tab as the floor on New York's clock (wow 2's idea, in the two styles): the room changes with the market's state (open, the bell at 4 pm, after the bell, overnight, weekend), and the room's own boards say whether today's predictions are in and what grades next; under it every upcoming round to swipe.
  2. *Your call* (owner: "this browser only", no login): before the AIs' calls are in, the visitor stamps up or down on the next round; after the close the page shows "You beat 2 of 4" and a running tally, kept in the visitor's browser (localStorage, try/catch, works without it). Mock where it lives (on the Upcoming floor, and a version in Tonight at the close at the end of the Overview).
  Boards `ez/x2p-x3p-h10-floor-390.png`, `-1280.png` (both styles, each market state), a video of a stamp and the result.
- Rule 0, the hard rules and BRIEF-H's budget and output rules hold. Commit only under `ez/tools/concepts/` and the boards in `ez/`; never touch `ez/tools/v22/` or any `ez/v4*.html`, never deploy or publish. Budget up to $10 of Hedra each.

## Round H11 (owner, 2026-11-01, on the H9 boards)
**Style for these three areas: Silver Age line with flat print colours** (rounds4's style B, sol3's S2): a clean brush-and-nib line, flat bold colours, Ben-Day dots only in a few shadows, the plates a hair out of register. **Bright and flashy, not dark.** The owner: today's site is "a little bit more of that flashy"; the H9 covers are "a bit too dark"; "we can get dark when it speaks about the bet". The noir look stays in the bet chapter only. The logo's colours lead (gold #fdbc2a, green #03c870, red #ff3a31) on bright flat grounds, plus each company's own brand colour where a company appears. Never realism. Never beige.
**Drawn, not slapped on:** every element is painted into its object. The owner on the H9 editions: "there's still stuff that has been slapped on it, that hasn't been drawn on it". A live word or number sits on a surface the painting leaves blank for it (lessons 85, 92). Name the surface under every live text in the REPORT.
**The bet's three beats are the template for every chapter.** The owner's reading of the bet chapter:
1. The top says what the section is about ("Bet #1: NVIDIA") over the establishing picture (the vault = the pool).
2. The live instrument (the timer in the chip).
3. The explanation (the three painted parts and their lines).
Every chapter gets the same three beats: (1) an establishing picture that makes the section's claim, (2) the live data in the world, (3) a short visual comic beat that says why it matters, with one or two lines at most. Those lines live in the world (a printed plate, a caption box drawn in), or at least use a lettering face, not body text.
**Live:** every interactive object moves a little so the eye finds it (lesson 86). Every take at 390 and 1280.

- **`rounds5`, Every round so far: Hot off the press.**
  - The print shop (rounds4's place 4), now in the Silver Age flat-print style.
  - Only the **four newest graded rounds** hang on the drying wire, newest first, read from ROUNDS. Each is alive so people know they can tap it: wet ink still running down, the sheet swaying on its clip, or print rolling onto the sheet. Show at least two of these motions.
  - Beside them, **a few blank white sheets** hang on the same wire: the next prints are coming. Show two versions:
    - plain blank sheets;
    - blank sheets with the next round's company faintly pencilled in (from PENDING/UPCOMING).
  - Tap a cover: it comes off its clip and opens the round (the slab), as now.
  - Under the press, **keep today's painted logo rack** (`media/rack-r6c.jpg`, h_rounds' quads: the Google, Amazon, Meta and Samsung logos). The owner likes it: "all the biggest names are showing up there, so people can click in to see every single big name". Under that, the grid of every round so far, as today.
  - **The editions themselves get redrawn.** The owner on the H9 covers: they "don't look too good... too dark". Make them bright and flashy, every word painted into the cover (masthead, issue number, cover line "GROK WINS!"), the outcome scene from the T3 tile art. Show 2 or 3 cover treatments.
  - Boards: `ez/x2p-x3p-h11-rounds5-390.png`, `-1280.png`, and a video of the wire coming alive plus a tap.
- **`sol4`, Smart or lucky in three beats.**
  1. **The establishing picture**, the equivalent of the vault: an image of AI lying, hallucinating, "smart or lucky". At least three ideas, for example:
     - a robot with its nose growing;
     - a confident mouth speaking over a blank page;
     - a coin spinning behind a mask.
  2. **The tracking: the lie detector on the desk (sol3's P4, the owner's pick), redrawn** in the flat-print style. It carries the hit rate round by round, with the switch to P&L (Season / 7 days / 24h) and a small table under the P&L chart (W-L, P&L per AI).
     - Keep what the owner likes in today's big board (`h_sol`): an environment with other people in it, and real chalk or ink marks.
     - Also show one version with the lie detector inside the exchange room among people.
  3. **Why it matters**, as one or two comic panels plus one or two lines: an AI sounds just as sure when it is guessing; only the record shows which one is which.
  - **Side item (the bet chapter, mock only):** the owner said the bet's three callouts (C1 the pool, U1 the call, K1 the switch) should live in the world, or at least change font. Make two takes:
    - the lines printed as silkscreen or a parts-manual page on the board itself;
    - the lines in a lettering face on caption boxes drawn into the plate.
    The vault and the chip stay as they are.
  - Boards: `ez/x2p-x3p-h11-sol4-390.png`, `-1280.png`, `-bet.png`, and a video of the switch.
- **`cast4`, Meet the models: today's cards, redrawn in a world.**
  - The owner: "Meet the models is horrible. There's no environment", and "we are definitely not on the same page". He still prefers today's version (`tools/v22/story/pop_p1.*`, `pop_founders.*`): keep its layout and the room each element takes:
    - rank, name, model version, flag, P&L, right way, best call, last five;
    - the founder's living portrait (`media/founder-<m>-anim.mp4`).
  - Then **redraw every element by hand** in the flat-print style (today's are all code), and put the cards in **a new environment**. At least three worlds, your choice.
  - The card is **about the model**; the founder is the face behind it, not the subject.
  - The cards are drawn tickets.
  - Use the **Harry Potter living frames**: the founder loops play inside drawn frames hanging in the world, so the portrait feels like a living painting.
  - Do not invent new characters; the green room founders are the cast.
  - Boards: `ez/x2p-x3p-h11-cast4-390.png`, `-1280.png`, and a video.
- Rule 0, the hard rules and BRIEF-H's output rules hold.
  - Commit only under `ez/tools/concepts/` and the boards in `ez/`.
  - Never touch `ez/tools/v22/` or any `ez/v4*.html`; never deploy or publish.
  - Budget: up to $10 of Hedra each, rough first.

## Round H12 (owner, 2026-11-01, ~02:00 UTC, before bed: "just do a ton of other iterations")
The owner's three reference screenshots are in `h12/`:
- `ref-bet-s1-circuit-owner.webp`: bet2's S1 "The circuit", with the owner's green marks.
- `ref-meet-models-owner.webp`: today's live Meet the models card, circled, beside cast2's doors take.
- `ref-cover-loop-owner.webp`: today's live cover, with the four loop panels circled.

**1. Scroll, not show.** "It's maybe not the best to have all these animations. I think you just want to have a scroll... a scroll within a storybook, within the comic book itself."
- The reader scrolls through panels.
- No tap-to-unfold objects, no clips playing on tap, no scroll-hijacking.
- Motion is small and shows a fact flowing. Example: the fees running down the traces into the pool, so the reader feels it filling. Hold to one small loop per panel at most.
- Nothing needs a click to be understood.

**2. Every chapter follows the bet's S1 sequence (the template):**
1. The title over the establishing picture (the vault).
2. The live instrument (the timer in the chip).
3. A panel where the fact happens in the world (the fees flowing into the pool).
4. The call.
5. The two outcomes.
6. The hook to what comes next (Season 2).
- "It doesn't mean exactly the same numbers... as many sections as needed but not too many."
- Each chapter finds its own sequence of panels in that spirit: what it is, the live thing, what happens, why it matters, what's next.

**3. Text lives in the world.**
- A fact about the world is painted or lettered *on* the world. The owner circled "69% of $EZ creator fees fill the pool" as written text: it should be part of the picture, for example engraved on the pool's rim, stamped on the vessel, or a gold plate on the board.
- A line that is a voice goes in a comic speech balloon or a narration caption drawn into the panel, not a plain paragraph. Example: "The pool gets bet on the top AI's call. Today that's Grok."
- Plain text outside the world is kept to a minimum.
- Live numbers are still page text, set on a surface the painting leaves blank for them (lesson 85), in that object's own material.

**4. Meet the models (the `cast4` helper already has this).**
- Keep today's format and layout (the circled card). The founder's living portrait is "enough".
- No clicking into a model.
- Paint the card as a hand-drawn ticket.
- Make the background an environment.
- Change the chapter's opening picture.

**5. The cover's four loop panels.**
- Today's cover keeps its layout. Its four circled panels carry the box helper's painted objects, at that size, seen at first glance:
  - panel 1, the letter with the four predictions;
  - panel 2, the bell with the market's answer;
  - panel 3, the golden ticket with the leader's P&L and W-L;
  - panel 4, "we follow its call on the bet".
- Show them in their open state (the fact visible), since nothing needs a click. Show a closed/opened pair as a second option only.

**Areas:**
- **`bet3`, the bet chapter in the S1 circuit sequence, many iterations.**
  - Start from `bet2/s1.js` and its paintings (traces-sd, fork-gpt) and the live chapter (`ez/tools/v22/story/h_bet.*`).
  - Keep the vault opener and the live countdown in the chip as they are.
  - The 69% (from SIM.poolShare) is lettered into the pool's picture. At least three ways: engraved on the rim, on a gold plate, on a meter or gauge.
  - Fees visibly flow into it in one small loop (CSS or a short painted loop; nothing on tap).
  - "The pool gets bet on the top AI's call. Today that's <leader>" as a speech balloon or narration caption drawn in. At least two voices, for example the host's balloon or a caption box.
  - The fork to RIGHT (lit LED, "$EZ buyback") and WRONG (blown fuse, "the pool can be wiped out"), with the outcome words lettered in the world.
  - Then Season 2 ("NVIDIA is the first bet, not the last") in the world, as the empty sockets of bets to come.
  - The bet stays the one dark chapter (vault noir with gold, green and red light).
  - At least four variations of the whole sequence, each tested against "how much plain text is left".
  - Boards: `ez/x2p-x3p-h12-bet3-390.png`, `-1280.png`, and a scroll video at 390.
- **`cover7`, the cover with the loop objects, many iterations.**
  - Today's live cover layout: the Season 1 strip, Starring, the title, the 2x2 loop with "Every round" in the middle, the film.
  - The four panels repainted as the box helper's objects (`box/img/`; box/REPORT.md).
  - The objects show their facts at first glance, from the newest graded round (ROUNDS, CO_LOGOS, `__x2pPnl`):
    - the letter open with GPT/Kimi/Claude/Grok's predictions;
    - the bell with the close ("XOM closed ▲2.17%");
    - the golden ticket with "GROK", P&L and W-L;
    - panel 4 at least three options: the coming-attractions wall with Bet #1 lit, the vault cracked onto Bet #1, the slip under the grille.
  - Bright and flashy like today's cover (not noir).
  - At least four treatments: Silver Age flat print, the logo's flat badge, today's pop palette, and one of your own.
  - The model names may appear as words (the predictions, the ticket); no founders' faces on the cover.
  - Boards: `ez/x2p-x3p-h12-cover7-390.png`, `-1280.png`.
- **`seq`, the same sequencing on the chapters nobody else has tonight.**
  - **Tonight at the close** (the end of the Overview, linking to Upcoming).
  - **The Upcoming tab's top.**
  - **The Leaderboard tab's top** (the fight bill and the scoreboard).
  - For each, design a panel sequence in the S1 spirit:
    1. what it is, over an establishing picture;
    2. the live thing in the world;
    3. what happens;
    4. why it matters;
    5. what's next.
  - Text in the world; speech balloons for voices.
  - Bright, except where the chapter is about risk.
  - At least three takes per chapter.
  - Boards: `ez/x2p-x3p-h12-seq-390.png`, `-1280.png`.
- **`book3`, the whole Overview as one scrolled comic book.**
  - How the chapters hand over to each other on scroll alone: gutters, a panel whose picture continues into the next chapter's opening, a page edge, a narration caption bridging two chapters.
  - What is fixed (the header) and what scrolls.
  - The rhythm of big and small panels down a phone.
  - Use today's live chapters and the bet as content. Show the full Overview as one long board at 390, in at least three rhythms.
  - Also a desktop take: is it one column of panels, or a two-page spread?
  - Boards: `ez/x2p-x3p-h12-book3-390.png`, `-1280.png`, and a scroll video.
- **Rules:** rule 0, the hard rules and BRIEF-H's output rules hold.
  - Commit only under `ez/tools/concepts/` and the boards in `ez/`.
  - Never touch `ez/tools/v22/` or any `ez/v4*.html`; never deploy or publish.
  - Budget: up to $10 of Hedra each.

## Round H13 (overnight second passes on H11, applying H12's rules; lead's notes, 2026-11-01 02:15 UTC)
The H11 boards landed before the owner's H12 notes. Each second pass starts from its H11 helper's folder and pick, applies Round H12 in full, and makes more iterations. H12's rules:
- scroll, not show;
- the S1 sequence;
- facts painted on the world;
- voices in speech balloons or narration captions;
- plain text outside the world kept to almost nothing.

- **`rounds6`** (from `rounds5`, pick B with pencilled blanks):
  - Exactly **four covers of one size** on the wire, the four newest, plus two or three blank or pencilled sheets. Today the wire mixes two small and two big covers, which reads as a hierarchy that isn't there.
  - At 320 "Printed at every close · 80 so far" runs over the top wire's sheets. Paint it on a surface, for example a sign on the press or a chalk tally on the wall, never over the sheets.
  - The only tap is a cover opening its round (that is navigation); drop the sheet letting go of its clip.
  - Small loop only: the wet ink, or the sheet swaying.
  - Then the logo rack and the grid as today.
  - At least three variations of the wire's composition, plus one desktop where the wire spans the width.
  - Boards: `ez/x2p-x3p-h13-rounds6-390.png`, `-1280.png`.
- **`sol5`** (from `sol4`, pick E3 + I2):
  - The S1 sequence, in this order:
    1. E3's mask and coin under the title;
    2. the instrument: make the lie detector itself visible and doing the work, its pens drawing each AI's hit-rate line on the paper strip, the live chart set on the strip or screen it writes, in the exchange room with people;
    3. "Same AI. Same voice." (keep it, it works);
    4. the hook to the bet.
  - The two plain lines ("Four AIs, 312 graded calls. A coin flip gets 50%." and "Only the record shows which call was the guess.") become a narration caption or a balloon drawn in, or are painted on the world (the 50% coin-flip line lettered on the strip).
  - The P&L view keeps its table, set on the instrument.
  - At least four variations, including one where the onlookers react to the lines.
  - Boards: `ez/x2p-x3p-h13-sol5-390.png`, `-1280.png`.
- **`cast5`** (from `cast4`, pick B, the trading floor):
  - The owner liked today's **big** founder portrait ("you just have the characters animated, that's enough"); cast4 shrank it into a small frame. Give the living portrait today's share of the ticket (about half its width), framed as a painting.
  - A new opening picture for the chapter (the owner: "the initial picture has to change"): the trading floor as an establishing panel with the title, before the first ticket. The subtitle goes in a caption or on a board, not as plain text.
  - Every element of the ticket is hand-drawn: the ribbon, the plaques, the last-five lamps. The P&L, the record and the best call are lettered on painted blank surfaces.
  - No clicking into a model.
  - At least three variations of B, plus A and C carried forward with the big portrait.
  - Boards: `ez/x2p-x3p-h13-cast5-390.png`, `-1280.png`.
- Rule 0, the hard rules and BRIEF-H's output rules hold.
  - Commit only under `ez/tools/concepts/` and the boards in `ez/`.
  - Never touch `ez/tools/v22/` or any `ez/v4*.html`; never deploy or publish.
  - Budget: up to $10 of Hedra each.

## Round H14 (owner, 2026-11-01, ~02:20 UTC, on the H11 boards)
- **Smart or lucky:** E3 (the coin behind the mask) is liked, but the picture should be **about a third smaller** than in sol4.
  - The line "Four AIs, 312 graded calls. A coin flip gets 50%." moves into the scene as a **comic narration caption** at the panel's top-left corner. It overlaps the plate's frame, lettered in comic characters.
  - The owner's sketch is `h12/ref-sol-caption-owner.webp`: the box drawn over the top-left of the exchange-room plate, by the lamp.
- **The bet's explanations:** **K2** (caption boxes drawn into the plate, each on a gold trace from its part) is the pick: "a beautiful morphing of the wiring with the environment while keeping the comic book style alive". The owner prefers K2's colours, and "the pool, the call, the switch" read more obviously. K1 (silkscreen) is liked too; grey engraving would not be.
- **Meet the models:** "None of them stand out. But the format is good." The trading floor is the favourite, "but just directionally". The next pass has to make it striking, not only correct: `cast6`.
- **`cast6`, Meet the models that stands out** (in parallel with `cast5`, which fixes structure):
  - Keep today's format: the ticket layout and the big living founder portrait.
  - Work in the trading-floor direction. Aim for the one picture a visitor would screenshot. Levers to try, each as its own take:
    - one hero moment (the #1 ticket lit like the vault, the others in the crowd's shadow);
    - scale contrast (the leader's portrait huge on the exchange wall, the challengers smaller);
    - dramatic light (one key light, the logo's colours as spot light);
    - a camera angle (looking up at the board);
    - the tickets as physical objects, pinned, held, or slid across the floor by a trader.
  - Silver Age flat print, bright (not the bet's noir).
  - Every number on a painted blank surface.
  - At least five takes, very different from each other.
  - Boards: `ez/x2p-x3p-h14-cast6-390.png`, `-1280.png`.
  - Rule 0, the hard rules and BRIEF-H's output rules hold. Commit only under `ez/tools/concepts/` and the boards in `ez/`. Budget up to $10 of Hedra.

## Round H15 (owner, 2026-11-01, ~12:30 UTC: "I over-engineered everything once again. Though with good lessons.")
**The base is EZ Live X2+** (`ez/v46-live-x2plus.html`; its artifact 9dPsU3tcgmC9RAzQZy9Mg5), not X3+'s comic.
- The owner will fix X2+ one section at a time: first the top, then Meet the models mixed with the current standings, then the record ("Every call, receipts included").
- The bet section is the only section the owner likes. It comes over from X3+, with **K2** (caption boxes drawn into the plate; `h15/ref-k2-owner.jpg`).

**One art style for every section:** the NVIDIA chip (`h15/ref-art-style-chip.jpg` = `ez/media/bet-chip-h2.jpg`), a painted comic illustration of a real object:
- clean ink outlines on every part, comic dot shading only in the shadows;
- painted light, one warm gold key light from behind (rays), green rim light on one side, red on the other;
- the object alone on a black void, sharp, seen clearly.

**Palette:** black, the bet's dark green, red and gold. Every caption box and every lettering is in the logo's cream (#f8f0d9, the colour of "EZ" in the logo) on black. Saturated.

**Lettering:** the bet's own, "Bet #1: NVIDIA" (`ez/tools/v22/story/h_bet.css`, `h2.hb-h`: Bangers, an ink stroke, a stacked drop, tilted). The captions are comic caption boxes, drawn in.

- **`top1` and `top2`, the top of X2+, redesigned.** Mockups only, on the built `v46-live-x2plus.html`. Replace its top (headline, film bill, live strip); leave everything below untouched. Three beats:
  1. **Beat 1, the headline panel:** one frame, one picture in the chip's style that says what EZ does, with the headline lettered on or over it (breaking its border like "Bet #1: NVIDIA" breaks the vault's).
     - Model names and logos only; no characters or founders on the landing.
     - Headline (my choice; the owner asked me to pick the words): **"Four AIs call earnings. The market keeps score."** Show one take with "4 AIs. Every earnings report. One scoreboard." as the alternative.
  2. **A gutter**, then **Beat 2, how a round works:** ONE panel (not four beats) with a comic caption box on it, "How a round works" (or "Every round:").
     - Under it, four frames, two per row.
     - Each frame: a picture in the chip's style plus a big lettered word that **breaks its frame's border** and bleeds over the section, with one short line under it:
       1. **CALL** "Each AI calls the move before the report."
       2. **BELL** "The closing bell says who was right."
       3. **#1** "The top of the board holds the golden ticket."
       4. **BET** "We follow its call. Bet #1: NVIDIA."
     - The facts show at once, live from the newest graded round (ROUNDS, CO_LOGOS, `__x2pPnl`): the four calls; the close; the leader, P&L and W-L; Bet #1 NVIDIA.
     - Each frame has **affordance and a small micro-interaction**, diegetic: on hover or tap the bell swings, the ticket tilts and catches the light, and so on. Nothing needs a tap to be understood (lesson 103).
  3. **Beat 3, the explainer film** (`media/ez-landing-v4.mp4`, poster `-poster-ez.jpg`), with its own lettered head.
  - Every live word or number sits on a surface the painting leaves blank for it (lessons 85, 92), or in a caption box.
  - Every take at 390 and 1280, plus a short recording of the micro-interactions.
  - Different worlds per helper:
    - `top1`: (a) the chip's own world (the board, traces and dies carry the story, as the bet's circuit does); (b) the trading floor at the bell, drawn as objects (bell, ticker, board).
    - `top2`: (c) objects on the black void, each step one hero object like the chip (an envelope with the calls, the bell, the golden ticket, the vault); (d) one world of your own.
  - Boards: `ez/x2p-h15-<area>-390.png`, `-1280.png`, `-micro.mp4`.
- Rule 0, the hard rules and BRIEF-H's output rules hold.
  - Commit only under `ez/tools/concepts/` and the boards in `ez/`.
  - Never touch `ez/tools/v22/` or any `ez/v4*.html`; never deploy or publish.
  - Budget: up to $10 of Hedra each.

## Round H16 (owner, 2026-11-01, ~13:10 UTC): set the world stage first
The owner: "we were trying to redesign every section independently without setting the entire world stage... every section did not have a coherent next follow-up." X2+ becomes the main site again once its sections are done. The order is top down: section 1 (the top), then Meet the models, then the current scoreboard, then every round. The bet section is done: the vault, the chip, and the parts plate with **K2** caption boxes (`h15/ref-k2-owner-2.jpg`). The vault already holds the bet, so the record does not go in the vault. Back issues was "decent", and so was the vault, but the record is open: "let's just start from scratch... continue exploring."

- **`world`, the stage for the whole site, before any more section mockups.** Make three coherent worlds, each in the chip's art style (Round H15). Each one is one place you move through from top to bottom, and it ends in the bet's vault and chip, which stay as they are. For each world:
  - **The world bible.** One paragraph: the place, the light, the objects, why the vault is at the end of it.
  - **The storyboard.** One rough painted establishing panel per chapter, in order:
    1. the top (what we do + how a round works);
    2. Meet the models with the current scoreboard;
    3. every round (the record);
    4. the bet (vault, chip, K2 parts; reuse the live paintings);
    5. tonight at the close / what's next.
  - **The hand-over line between each chapter.** How one leads into the next (a door, a stair, a wire, a camera move), so every chapter has a coherent next.
  - **The words.** Each chapter's lettered head and one caption, in the style of "Bet #1: NVIDIA".
  - Candidate worlds, your call:
    - the exchange building at night, floor by floor: the lobby, the trading floor, the records room, the vault in the basement;
    - the chip / circuit board itself, every chapter a part on one board, ending at the vault;
    - one of your own.
  - Rough on purpose: 1K, medium, about 5 paintings per world.
  - Boards: `ez/x2p-h16-world-390.png` (three columns, one per world, top to bottom) and a one-page `ez/x2p-h16-world-bible.md`.
- Rule 0, the hard rules and BRIEF-H's output rules hold.
  - Commit only under `ez/tools/concepts/` and the boards in `ez/`.
  - Never touch `ez/tools/v22/` or any `ez/v4*.html`; never deploy or publish.
  - Budget: up to $6 of Hedra.
