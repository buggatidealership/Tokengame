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
- **Owner, same message:** the top ends with the film. There is no live strip under it: nothing of today's X2+ top stays, it is a complete redesign. Sequence: beat 1 explains what we do, beat 2 is the four quadrants, beat 3 is the film. The world the whole page lives in still has to be chosen (the `world` helper).

## Round H17 (owner, 2026-11-01, ~13:20 UTC): the exchange, and the models as chips
- **The world is the exchange building**, "that's ultimately what we're doing". The open question is old school or new school. Mock both.
- **The motto:** "They used to call it stock picking. We call it model picking." It must be in the world, diegetic: for example the last frame's caption of the top, or the gutter itself, leading straight into Meet the models.
- **Gutters:** a classic gutter, beats pasted together, or a break that is itself designed in the world's own material. Mock the options.
- **Meet the models: each model is a chip** ("they're not traders, they are actual AIs doing the trading"). This is either one chip per model, or one big chip with each model as a die.
  - On each chip: the model's logo, its country flag, W-L and current P&L. The last five rounds can wait.
  - In the die, a glimpse into the chip: the founder caricature's living loop, from X3+ (`media/founder-<m>-anim.mp4`, poster `.jpg`). The characters are kept, but they are "the interesting animated layer", the Harry Potter touch, never the focal point. The chip and its numbers are the subject.
  - Open: one beat per model, or two models per beat? Mock both, plus one big chip.
- **Areas**, both in the chip's art style (Round H15), with the palette and the cream lettering and caption boxes:
  - **`exch`, the exchange building.** Old school (a marble and brass hall, the bell, a ticker) against new school (a glass and LED exchange, a server floor). For each, two panels:
    - the top's beat 1 panel ("Four AIs call earnings. The market keeps score.");
    - the hand-over into Meet the models carrying the motto: as the last frame's caption, as a sign or ticker in the world, or as the gutter itself.
    - Show three break treatments: a classic gutter, pasted beats, and a designed break (a floor slab, a ticker band, a torn edge).
    - Boards: `ez/x2p-h17-exch-390.png`, `-1280.png`.
  - **`chips`, Meet the models.** Three layouts in the exchange world:
    - one chip per model, one beat each;
    - two chips per beat;
    - one big chip with four dies.
    - The founder loop plays inside each die, behind glass, like a living portrait in the silicon. Logo, flag, W-L and P&L sit on the chip's own blank surfaces (pads, labels, silkscreen), live from `__x2pPnl` and MODELS.
    - The leader is marked the way the bet's chip glows.
    - Boards: `ez/x2p-h17-chips-390.png`, `-1280.png`, and a short video of the loops playing in the dies.
- Rule 0, the hard rules and BRIEF-H's output rules hold.
  - Commit only under `ez/tools/concepts/` and the boards in `ez/`.
  - Never touch `ez/tools/v22/` or any `ez/v4*.html`; never deploy or publish.
  - Budget: up to $8 of Hedra each.

## Round H18 (owner, 2026-11-01, ~15:20 UTC, on the H15 top boards and the H17 chips; owner's screenshots `h18/ref-top-owner.png`, `h18/ref-bet-logos-owner.jpg`)
The owner likes **top1 take A** (the chip's own world) "most of what I see" and both **chips A** (one chip per model) and **chips B** (old-school EPROMs).

### `top3`, the top of X2+, take A redone (mockups on the built `v46-live-x2plus.html`, as H15)
1. **The headline goes to the top**, above the picture: "Four AIs call earnings. The market keeps score." Today it sits at the picture's foot.
2. **Every beat bleeds** edge to edge on phones (no side margins, no frame inset). From 1000px follow your judgement.
3. **Beat 1's chip shows only the four AIs' logos and names** (Grok, Claude, GPT, Kimi), no P&L. The "Season 1 · 80 rounds graded" bar may stay.
4. **"How a round works" takes the headline's lettering** (the bet's: Bangers, ink stroke, stacked drop, tilt). So the four step words need **a different lettering**: mock 4 or 5 options (e.g. silkscreen on the chip, LED segments, stamped metal, embossed, neon), each shown on all four frames.
5. **The four steps are the mechanism, first principles** (owner: "they submit their predictions, the market dictates who wins, we record it in a ledger, and then we update the leaderboard"). BET goes away.
   1. **CALL** "Each AI submits its prediction before the earnings report."
   2. **BELL** "The closing bell decides who wins the round."
   3. **LEDGER** (new): the round is written onto the ledger. Draw it in the chip world (a ledger chip or memory bank writing the round as a new row or block). Line, your proposal, e.g. "Every round is written to the ledger."
      - **Do not say blockchain or on-chain.** The record is the public sheet and site, not a chain. The lead flags this to the owner.
   4. **#1 / top of the board**: "The ledger ranks the board." Grok with its P&L and W-L, as in take A (owner: "that's fine").
6. **Interaction:** by default everything is off. The CALL dies are dark and pulse, inviting a tap; a tap lights the four predictions. The BELL's knob or buzzer moves to invite a tap; a tap shows the market's move and who won.
   - Do the same for LEDGER (a tap writes the row) and #1 if it reads well.
   - Lead's addition: if a frame has been on screen for about 3 s without a tap, it reveals itself, so a scroller still gets every fact. Show it with and without this.
   - Make the affordance obvious without a word like "tap": the pulse, a moving knob, a glint.
7. **The example round is a Mag 7 round: R40 Tesla.** Called 10/21, graded 10/22. GPT UP 1, Kimi UP 2, Claude DOWN 4.5, Grok DOWN 3.1; market −3.08%. Two right, two wrong, Grok wins (0.02% off). Read it from ROUNDS, never type it.
8. **Beat 3, the film, redone.** "How it works" appears twice (with "How a round works"), and the old green and red bill is "the old-school way".
   - Give the film a new head instead of "Watch it all" (which doesn't say what you'll watch). Mock 3 or 4 options, e.g. "The explainer · 1:20", "The 80-second version".
   - Give it a new frame in the chip world: the film on a chip's display, a monitor on the board, or your idea. No bill and no "How it works".
   - The film stays `media/ez-landing-v4.mp4`, its poster `-poster-ez.jpg`.
- Boards: `ez/x2p-h18-top3-390.png`, `-1280.png` (lettering options as a row of close-ups), `-micro.mp4` (taps and the self-reveal).
- Budget: up to $8 of Hedra.

### `chips2`, Meet the models, A and B redone
- **Two versions:**
  - **A:** one chip per model, one beat each (as H17 A).
  - **B:** the old-school EPROMs, all four in ONE beat (owner: "you could also just have one beat... it just shows all the models").
- **The company's logo bigger, top left of each chip** ("people relate more to logos than anything"). The model's version is printed beside it, as part of the chip: Grok "4.7", Claude "Fable 5.1", GPT "6 Astra", Kimi "K3" (MODELS[].ver).
- **The flag is a layer on top of the chip itself** (a decal, an enamel inlay, a printed field on the lid). It reads "chip" first and "flag" second, not a separate badge in the corner. US for Grok, Claude and GPT; China for Kimi.
- **Labelled stats on the chip's own surfaces:** the name, **Last 5** (✓/✗ or green and red cells), **W-L**, **Season P&L**. Each has a small printed label, live from `__x2pPnl` and ROUNDS.
- GPT stays green. The founder loop stays in the die (`media/founder-<m>-anim.mp4`).
- **A fifth chip: the tryouts.** One chip with four dies: Mistral, Qwen, Gemini, Nemotron (their marks are in x2plus.js's No. 5 ticket code).
  - The tryouts feel of the old ticket ("Models in tryouts"), in chip language. Owner: "we're still running that inference to see who qualifies".
  - Mock 2 or 3 wordings, e.g. "In tryouts", "Qualifying", "Running inference…".
- Every beat bleeds.
- Boards: `ez/x2p-h18-chips2-390.png`, `-1280.png`, a short video of A and B.
- Budget: up to $8 of Hedra.

Rule 0, the hard rules and BRIEF-H's output rules hold. Commit only under `ez/tools/concepts/` and the boards in `ez/`. Never touch `ez/tools/v22/` or any `ez/v4*.html`. Never deploy or publish.

## Round H19 (owner, 2026-11-01, ~17:30 UTC, on the H18 boards; owner's screenshot `h19/ref-chips-b-owner.jpg`)
### `top4`, from H18 top3 (`h/top3/`, board `ez/x2p-h18-top3-390.png`)
1. **"The market keeps score" at the same size** as "Four AIs call earnings" (both lines one size).
2. **"How a round works" at the headline's size too**, and it **touches the first frame**: it breaks the CALL frame's top edge, as "Bet #1: NVIDIA" breaks the vault's.
3. **No bell: "there's no bell on a chip."** Use something chip-native for the close. top1's take A had a piezo buzzer with a readout; the owner remembers it as the right kind of thing.
4. **The step words.** Use the same font as the headline (the bet's Bangers lettering), not LED, neon or stamped faces.
   - **Size:** between the headline and the line under each frame.
   - **Colour:** different from the headline's, so it doesn't repeat. Try cream, green and gold.
   - **Printed into the board, diegetic**, like silkscreen on the PCB (the owner liked S's green silkscreen feel), not laid on top.
   - **Wording, two sets:**
     - (a) CALL / CLOSE / LEDGER / #1
     - (b) CALL / CLOSE / LEDGER / BOARD (the owner's lean)
5. **Order:** the owner said the ledger and #1 frames "have to swap", then "actually it's fine how it is". Show both orders; the lead asks the owner.
6. **The ledger frame:**
   - The first row is a header: Round · Company · Move · Winner.
   - Then R38 Meta, R39 Texas Instruments and R40 Tesla, so Tesla sits in row 4, at the bottom (the rows sit lower).
   - All from ROUNDS.
7. **The film head:** "The whole game 1:20".
- The rest stays as top3's A, with the tap-to-reveal and the 3 s self-reveal.
- Boards: `ez/x2p-h19-top4-390.png`, `-1280.png`, `-micro.mp4`.
- Budget: up to $6 of Hedra.

### `chips3`, Meet the models B (all four EPROMs in one beat; the owner's pick), from H18 chips2 (`h/chips2/`)
1. **The founder's living loop, two versions:**
   - (S) in a **square** window where the round porthole is now, like A's square die;
   - (N) **no frame at all**: the animation is part of the chip in that area, as if seen in the silicon (masked into the die area, with the chip's own texture, grain and light over it).
2. **Everything on the label must be printed into the chip, not pasted on:** name, version, No., Last 5, W-L, Season P&L.
   - Laser-etched or silkscreened onto the ceramic, with the surface's grain, light and slight ink spread.
   - Bigger and simpler where it helps.
   - The owner: "it still feels like a layer that has been pasted on top of it".
   - Check that every label fits: Claude's "Fable 5.1" was cut by the portrait.
3. **The fifth chip's wording.** "In tryouts" is not right; the owner suggested "in inference". Mock 3 options, e.g.:
   - "In inference"
   - "Running inference…"
   - "Inference pending"
   
   Keep "No. 5?" if it reads.
4. **One revised take of A** (one chip per model) with the same printed-in label, since the owner still finds A "interesting".
- Boards: `ez/x2p-h19-chips3-390.png`, `-1280.png`, a short video of the loops in S and N.
- Budget: up to $6 of Hedra.

Rule 0, the hard rules and BRIEF-H's output rules hold. Commit only under `ez/tools/concepts/` and the boards in `ez/`. Never touch `ez/tools/v22/`, any `ez/v4*.html` or `ez/media/`. Never deploy or publish.

## Round H20 (owner, 2026-11-01, ~18:40 UTC, on the H19 boards)
### `top5`, from H19 top4 (`h/top4/`; the owner's base: cream, CALL / CLOSE / LEDGER / BOARD, order 1)
1. **The step words are a comic sub-headline, not printed on the chip.**
   - The owner: printed on the board, they read as "it's on the chip, what does that mean?". These words explain each step.
   - Letter them as comic headlines in the headline's family, numbered **1 CALL · 2 CLOSE · 3 LEDGER · 4 BOARD** so the sequence can't be read wrongly.
   - **Size:** smaller than "How a round works", which stays the main thing, and larger than the line under each frame.
   - Give each a distinct treatment: a colour, a number badge, a tilt. Mock 3 options.
2. **Gutters, two strengths, drawn not flat.** "A flat white line is a bit boring."
   - **Between beats:** a strong, cartoonish gutter, so it's clear you move on. Beats are: the headline beat → "How a round works", and the four-frame panel → "The whole game".
   - **Between the four frames:** a lighter gutter, clearly weaker than the beat gutters.
   - Draw both in the comic and chip world, e.g.:
     - a torn or jagged paper edge;
     - a thick ink band with a halftone fade;
     - a board edge with pins;
     - a zigzag cut.
   - Mock 3 pairs (beat gutter + frame gutter).
3. Everything else as top4 option 1.
   - Change CLOSE's line to "The close decides who wins the round." (there is no bell any more).
- Boards: `ez/x2p-h20-top5-390.png`, `-1280.png`.
- Budget: up to $4 of Hedra (most of this is lettering and CSS).

### `chips4`, from H19 chips3 (`h/chips3/`; the owner's pick: **S**, the founder in a square window; N2 also liked)
**Everything symmetrical**, on every chip:
- the founder windows the same size and aligned (today Claude's and Kimi's are bigger than Grok's and GPT's);
- the logo plates the same size and aligned (Claude's is bigger);
- the label modules (name, version, Last 5, W-L, No., Season P&L) the same width and height, on the same grid;
- the flags the same size and aligned.

Today each EPROM is its own painting, so their parts land in different places. Fix it with one master EPROM painting re-coloured per model, or place every part in code on a fixed grid over the paintings, so the geometry is identical. Measure it: report every box's x, y, w and h per chip, equal within 1px.

- Deliver S, and N2 with the same symmetry.
- The fifth chip: "In inference".
- Boards: `ez/x2p-h20-chips4-390.png`, `-1280.png`, and a short loops video.
- Budget: up to $5 of Hedra.

Rule 0, the hard rules and BRIEF-H's output rules hold. Commit only under `ez/tools/concepts/` and the boards in `ez/`. Never touch `ez/tools/v22/`, any `ez/v4*.html` or `ez/media/`. Never deploy or publish.

## Round H21 (owner, 2026-11-01, ~19:45 UTC, on the H20 boards; owner's screenshot `h21/ref-chips-swap-owner.jpg`)
### `top6`, from H20 top5 (`h/top5/`)
1. **Sub-heads: 3**, the caption tab (the red number tab in a drawn caption box).
2. **Gutters, as the lead reads the owner's message:**
   - **Between beats:** pair 1's white torn paper. That covers the headline → "How a round works", and the four frames → "The whole game".
   - **Between the four frames:** pair 2's gold trace.
   - The lead is confirming this reading with the owner, so also show pair 1 complete (torn paper and zigzag) as a second take.
3. **Frame lines.** Each fits as few lines as it can at 390px; report the line count of each.
   1. "4 AIs submit their predictions before the earnings report." The owner asked whether "4 AIs submit their predictions" fits on one line in a frame at 390px. Measure it at today's size. If it doesn't fit, show:
      - the size it would need;
      - "4 AIs submit predictions" as a shorter variant;
      - the size that line needs.
   2. CLOSE: "The next market close after the report decides who wins." The owner wants visitors to understand that the market close after the earnings report decides the round.
   3. LEDGER: "Every round is written to the ledger."
   4. BOARD: "The ledger ranks the board."
- Boards: `ez/x2p-h21-top6-390.png`, `-1280.png`.
- Budget: $2 at most (this round is lettering and CSS).

### `chips5`, from H20 chips4 (`h/chips4/`, the one master painting; geometry identical on every chip, measured)
1. **S, swapped** (the owner's sketch):
   - The label module (name + version, No., Last 5, W-L, Season P&L) moves left, next to the logo plate.
   - The founder's square window moves to the right.
   - The window grows so that its top lines up with the top of the logo plate and its bottom with the bottom of the flag.
   - Still identical on every chip, and measured.
2. **N2, layout as it is:**
   - Remove the rounded vignette and dark corners around the founder in the die. In the screenshot it is the black edge outside the circle the owner drew. The die square must read clean edge to edge, with no rounded mask or dark falloff on the character.
3. **The flag, on both S and N2: built into the chip, not a sticker.** Mock 2 or 3 processes, e.g.:
   - lithographed or etched into the die metal (the flag as a pattern in the copper layer, lit by the gold key light);
   - a printed field on the ceramic lid with the lid's grain over it;
   - an enamel inlay flush with the surface.
- The fifth chip stays "In inference".
- Boards: `ez/x2p-h21-chips5-390.png`, `-1280.png`, short loops video.
- Budget: up to $4 of Hedra.

Rule 0, the hard rules and BRIEF-H's output rules hold. Commit only under `ez/tools/concepts/` and the boards in `ez/`. Never touch `ez/tools/v22/`, any `ez/v4*.html` or `ez/media/`. Never deploy or publish.

## Round H23 (owner, 2026-11-01, ~23:00 UTC, on the live X2+ preview; screenshots in `h23/`)
The owner's word is "integrated" ("diegetic"): every word and number is part of the world, as the NVIDIA timer's digits are. The owner asked to make "crisp" and "integrated" computable. These are the acceptance tests for this round. **Measure them and report them; a board that fails one is not done.**

1. **Resolution.** Each painting is at least as many real pixels wide as it is shown on a 3x phone (CSS width × 3). A frame 195 CSS px wide needs ≥ 600 px of source; a full-width chip 390 CSS px wide needs ≥ 1170 px, and 2400 px+ for the master. Never upscale.
2. **Reading size.** Every live number or word on a phone at 390px has a cap height of at least 9 CSS px. Today the CALL figures are about 5.
3. **Integration of live text.** Live text sits on a surface the painting provides for it (a display, a lit glass window, a silkscreen field, an etched plate). It shares that surface's perspective. It is lit as that surface would light it:
   - on a display: emissive, with bloom spilling onto the bezel, and the glass glare and reflections painted over the text (a screen-blended glare layer from the painting on top);
   - on ceramic or metal: the surface's grain and light multiplied through the letters, a slight ink spread, no clean vector edge.

   No flat-colour vector text with crisp edges on top of a painting. Compare against the NVIDIA timer (`media/bet-chip-h2.jpg` and h_bet.js's dies) side by side.
4. **Static words and marks are painted, not overlaid.** Anything that never changes is painted by the image model into the object: the model names, the versions, the labels "LAST 5", "W-L", "SEASON P&L" and "NO.", each company's logo, each flag. One master for geometry, then one image-to-image pass per model that paints its own logo, flag, name and version into the same places.
   - Check every painted word letter by letter. Image models misspell; reject and redo any that are wrong.
   - Only the numbers that change stay live: rank, W-L, Last 5, P&L, calls, market move, winner.
5. **Chip detail.** Packages and boards show real chip features at the density of the top's hero chip (`media/top-hero-t-h22.jpg`): traces, SMD capacitors and resistors, vias, pads, gold pins, package seams, markings. Compare against photos of real chips. No flat single-colour areas larger than about 15% of the chip.
6. **Framing.** Crop in until the subject (the dies, the readout, the ledger rows, the gold lid) fills at least 60% of the frame. The chip may run off the frame's edges, with no empty black or blank board around it.
7. **Animation.** The four frames now light one by one; keep that. Tap-to-reveal stays.

### `quad4`: the four frames of "How a round works" (X2+, built from `tools/v22/story/x2p_top.js/.css`)
Repaint all four as zoom-ins at 1200 px+ square (or 4:5), with the readouts big:
- **CALL:** the four dies large, each a lit display showing the AI's mark and call ("+1%", "−4.5%") at the NVIDIA timer's scale.
- **CLOSE:** the readout display fills the frame, "TESLA (TSLA)", "−3.08%", "Grok wins", lit like the timer. The owner circled it as "not integrated" (`h23/ref-close-zoom.jpg`). The buzzer may run off the edge.
- **LEDGER:** zoom into the rows.
- **BOARD:** the gold lid with the leader's mark and name only (no P&L; the live build already does this), close.

Data stays live from ROUNDS and `__x2pPnl`.

Deliver:
- a drop-in replacement for x2p_top.js's four pictures and surfaces;
- the paintings under your folder, as flat names ready to copy into `media/` (`top-h23-*.jpg`, ≤ 300 KB each);
- a REPORT with the measurements for tests 1 to 6.

Boards: `ez/x2p-h23-quad4-390.png`, `-1280.png`, and a close-up row at 3x.

Budget: up to $6.

### `chips7`: Meet the models (X2+, built from `tools/v22/story/x2p_chips.js/.css` = chips6)
- A new master at 2400 px+ wide, with the chip detail of test 5 on the ceramic package (not a flat colour body).
- Per model, one image-to-image pass that paints, into the same places:
  - the logo on the gold plate, as an engraved or embossed mark;
  - the flag, as an etched or printed field;
  - the model name and version, and the static labels "NO.", "LAST 5", "W-L" and "SEASON P&L", laser-etched on the label.

  The owner circled the GPT logo, flag and label as "pasted on" (`h23/ref-chips-phone.jpg`).
- The live numbers (No., W-L, the five ✓/✗ cells, P&L) go on the painted fields with test 3's treatment.
- Keep the founder's die on the right, as the owner likes it ("the only one that sort of does is the character framings"). Keep identical geometry and "In inference".

Deliver:
- the drop-in `_c7.js`/`_c7.css`;
- flat-named images `chip7-*` and `try7-*` (≤ 300 KB each), plus webp;
- the measurements for tests 1 to 5.

Boards: `ez/x2p-h23-chips7-390.png`, `-1280.png`, a 3x close-up of one chip, and a loops video.

Budget: up to $8.

Rule 0, the hard rules and BRIEF-H's output rules hold. Commit only under `ez/tools/concepts/` and the boards in `ez/`. Never touch `ez/tools/v22/`, any `ez/v4*.html` or `ez/media/`. Never deploy or publish.

### H23 addendum (owner, 2026-11-01, ~23:05 UTC, with the NVIDIA timer as the reference, `h23/ref-nvidia-timer.jpg`)
"That one feels like an animated comic." The lead applies this at the port, in code, on whatever quad4 delivers:
- **The numbers show from the start.** No tap is needed to see the facts. The off state and the 3 s and one-by-one reveals go.
- **They feel alive through small effects that belong to the world,** the way the timer's seconds tick:
  - a display's digits glitch or re-scan briefly every few seconds, a short flicker or a segment refresh, never a jump of layout;
  - the leader's gold glints;
  - the ledger's cursor blinks.
- **The face is the number:** big, lit, glowing, as the timer's digits are. The right word plus the right visual makes the point at a glance; there are no micro-interactions to discover.
- A tap may still replay the frame's moment (the buzzer sounding, then the readout flashing), but nothing depends on it.
- With reduced motion, everything stays still and visible.

### H23 addendum 2 (owner, 2026-11-01, ~23:15 UTC; the lead leads the design and applies this at the port)
- **The numbers are the most beautiful thing in each frame.** CALL shows the four predictions; CLOSE shows the market's move and the winner; LEDGER shows the rows (Tesla, move, winner).
- **The company is a picture, not a word.** Tesla's logo sits in the frame as part of the chip, for example marked on the CALL chip's package. The word "Tesla" stays only where it reads as a print on the chip.
- **The lines get simpler:**
  - CALL: "AIs submit predictions before the report." (no "4")
  - CLOSE: "The market close grades them."
  - LEDGER: "Every round is written to the ledger."
  - BOARD: "The ledger ranks the board."
- **The cut-off:** once quad4 and chips7 are built in, the top and Meet the models are good enough for now, and the next section is the record.

## Round H24 (owner, 2026-11-02, ~00:30 UTC, on the H23 port; screenshots in `h24/`)
**Where X2+ stands** (preview.earningszn.pages.dev, artifact 9dPsU3tcgmC9RAzQZy9Mg5). The owner calls the top and Meet the models nearly locked: "a lot more beautiful".
- **Built, after the owner's notes:**
  - the four frames with the numbers centred in their glass;
  - Tesla's logo lit beside "TESLA" (no ticker);
  - no caption tabs ("too much information");
  - BOARD zoomed out again: three close-ups, then the wide shot;
  - the lines in the trade's own words: "Each AI goes long or short before the report." / "The next market close ends every trade." / "Every trade is written to the ledger." / "The ledger ranks the board."
- **The look of all three tasks below:** the NVIDIA chip's art (`media/bet-chip-h2.jpg`, `media/top-hero-t-h22.jpg`, and `h24/now-*.png`). That means painted comic hardware, one warm key light, green and red rim lights, black void, and the palette black, dark green, red, gold. Lettering is in the logo's cream with the bet's font. Live numbers are lit in painted glass, as the NVIDIA timer's.
- **Unity is the brief** ("coherent unity", owner): one world on the page. Every element continues the beat before it (the ledger, the chips), so nothing is a separate module laid on a page.
- **Process:**
  - Before showing anything, run the twelve design questions of skill lesson 122 on your section (`.claude/skills/ez-visual-story/SKILL.md`). Write the answers in your REPORT in a line each.
  - H23's tests 1 to 6 still hold (resolution, 9 px cap height, integration, static words painted, chip detail, framing), measured and reported.
  - 4K masters. The owner: "there is no limit to the spending for now"; take up to **$40** each. Spend on quality and more takes, not on padding.
- **Deliverables:** boards at 390 (phone, the default) and 1280, each take shown inside the real X2+ page (laid over the built `v46-live-x2plus.html`, like quad4's run.js), plus a REPORT.
- **Rules:** rule 0, the hard rules and BRIEF-H's output rules hold. Commit only under `ez/tools/concepts/` and boards in `ez/`. Never touch `ez/tools/v22/`, any `ez/v4*.html` or `ez/media/`. Never deploy or publish.

### `ground`: the page's own background
Today the page between and behind the beats is flat black. The owner: "visualize a website that has nothing on it, just a background... that should also be part of the unity."
- **Takes:** at least four very different grounds from the chip's world. For example:
  - the motherboard the chips sit on, as one continuous board running down the page;
  - a dark wafer;
  - the inside of a server rack;
  - a substrate that changes as you scroll (traces leading from beat to beat, carrying data downward);
  - your own.
- **Constraints:**
  - It must never compete with the beats: dim, low contrast, and the key light stays on the content.
  - It must work behind the torn-paper gutters, or replace them if your ground makes them redundant (say which).
  - Show how it behaves at 390 and 1280 and over a long page.
- **Cost on the page:** keep it cheap. One tiled or very long image, or a few layers; no per-frame script. Measure the cover lift and scroll on a 4x slower CPU against today.
- **Boards:** `ez/x2p-h24-ground-*.png`: the whole X2+ Overview from top to bet, phone and desktop, each take.

### `film`: the explainer beat ("The whole game 1:20")
The owner: with the new rule, "that wording and that beat has to be probably... redesigned".
- Today: the head "THE WHOLE GAME 1:20", then the film on a painted board screen (`media/top-t3-screen-h22.jpg`).
- **Takes:** at least three. Each is:
  - a new head in the beat's own words;
  - the film playing on a surface that belongs to the chip world;
  - the play control and the running time integrated like the timer's digits;
  - the beat's place after "How a round works" (or before it, if your take argues for that; say why).
- The film's frame (`media/ez-landing-v4-poster-ez.jpg`, 16:9) must show whole. Never baked words over the picture.
- **Boards:** `ez/x2p-h24-film-*.png`, phone and desktop, plus a short video of play starting in one take.

### `rounds`: Every round so far (X2+, the section after Meet the models)
- **The record today:** X2+'s record is a carousel of PSA slabs ("Every call, receipts included"); X3+ has the rack and tiles.
- **Content:**
  - Every graded round, newest first.
  - Each round shows its film's own frame (`media/tile-r<n>-f1.jpg`, native, never repainted; no-film rounds: `tile-r71-t2.jpg`, `tile-r79-t2.jpg`), the company's logo, the move, the winner, and whether each AI was right.
  - A tap opens the round as today (`#/round/<n>`, the slab view).
  - Pending rounds (calls in) and what is coming next are optional, if they fit the story.
  - The name "Every round so far" is not locked; propose the section's head in the beat's own words.
- **The world:** it continues frame 3, the LEDGER: the ledger the round was written to, so the visitor sees the same object grow from four rows into the whole season. Glass, rows and a gold bezel, the round's picture lit on its row, or your own way.
- **Takes:** at least four, very different, all in the chip art. Each answers how 80 rounds fit a phone without a wall of scrolling (show 8, then more), and how a new round arrives.
- **Boards:** `ez/x2p-h24-rounds-*.png`, phone and desktop, plus a 3x close-up of one row.

### H24 addendum (owner, 2026-11-02, ~00:25 UTC, on the built top: "they're all exactly right. Even the wording, I agree with... beautiful")
The top is locked: the first three frames, the four lines, the zoom rhythm and the centred numbers (`h24/now-top-390.png`). Two things remain, both for the new helper `board5`.

### `board5`: frame 4, BOARD, as the whole board, and the gaps
**1. BOARD shows the field, not one model.**
- Today the gold lid shows only Grok, so "people could misunderstand it as, ooh, grok is the only model" (owner).
- Frame 4 becomes the board: all four models ranked by season P&L, the leader marked inside it. The leader is gold: the golden ticket.
- Keep the wide shot after three close-ups.
- It should be the payoff of the sequence ("oh shit... this looks sick", owner).
- It is also the doorway to Meet the models, the section right below it: the four chips of frame 4 should read as the same four the visitor then meets up close.
- Data: ranks, marks and names live from `__x2pPnl`; static words painted. H23's tests hold.
- Takes: at least four.
- Line: keep "The ledger ranks the board." unless a take argues for better; say why.

**2. The gaps.** The owner: "think about the gap with this new found design thinking."
- I read this as the gutters: the torn paper between beats and the gold trace between the four frames. Show at least three ways the gaps themselves become part of the chip world and carry the story from one beat to the next. For example: a trace that carries data down from one beat into the next, a seam between two boards, or the gap from BOARD into Meet the models as a cut you scroll through.
- The `ground` helper is redoing the page's background at the same time (`h/ground4/`, boards `ez/x2p-h24-ground-*`). Make the gaps work over today's black, and say how they would sit on a painted ground.

**Deliverables:**
- boards `ez/x2p-h24-board5-*.png` at 390 and 1280, plus a 3x close-up;
- a drop-in for x2p_top.js's frame 4;
- REPORT.md with the twelve questions.

Budget up to $40. Work in `h/board5/`.

### `chips8`: Meet the models as character cards (owner, 2026-11-02, ~00:30 UTC; the lead's design, the owner is the taste layer)
The owner: the characters are not popping out; there is too much info and too much moving; "Last 5" belongs on the leaderboard; show time ("there's time in this": the season is live); one sentence of personality per model. Skill lessons 123 to 125.

**The card, decided:**
- **Founder:** big. Bring back chips5's **SW** geometry (`h/chips5/`, the `sw-c2` master; `ez/x2p-h21-chips5-390.png`): a big square window at the chip's right end, its frame top level with the plate's top and its bottom level with the flag's bottom. The founder's loop fills the window's inner edge (about 90×89 at 390; chips7's die is far smaller). No vignette, no pad ring over the face.
- **Kept from chips7:**
  - the painted craft: the engraved mark on the gold plate, the laser-marked name and version, the substrate detail of test 5;
  - the **small etched flag** under the plate.
- **The label, top to bottom:**
  1. `No. n` small beside the name (the chips are in season-P&L order).
  2. **LAST 7 DAYS**: the P&L of this model's trades graded in the last 7 days, the biggest lit figure, green or red. The rule is the comic's: the calendar days the window names, New York date of each round's close (see world-comic.js, R11 block). No trades in the window: "No trades" (dim), never "$0".
  3. **LAST ROUND**: that round's company logo, lit, and a ✓ or ✗ for whether the direction was right. Ties count by direction too; a skipped round shows the last round it traded.
  4. **SEASON**: one small line, P&L and W-L ("+$148,480 · 45-27").
  5. **One line of personality**, laser-etched along the foot of the label:
     - Grok: "Shorts almost everything. Somehow it's working."
     - Claude: "Never met a small move it liked."
     - GPT: "Bullish on everything. Including itself."
     - Kimi: "Buys every dip. Some dips keep dipping."
- **Where the lines come from:** the data on 2026-11-02:
  - Grok shorts 87% of its calls and leads the season;
  - Claude's calls average 3.61%, the largest;
  - GPT calls up 66% of the time, at −$56,930;
  - Kimi calls up 66% of the time and is last.

  These are static words: paint them in, checked letter by letter. If a painted sentence won't come out right in three tries, letter it in code as an etched line with test 3's metal treatment, and say so.
- **Painted labels:** LAST 7 DAYS, LAST ROUND, SEASON, NO. Gone: LAST 5, the standalone W-L and SEASON P&L fields.
- **Motion:** only the founder loops. No re-scans, no flicker, no LED glow animation.
- **Fifth chip:** "In inference" as chips7, in the same new geometry.

**Takes:**
- (a) as above;
- (b) as above, but the founder window also breaks the chip's top edge (the character "pops out" of the card, comic panel-break style, the window frame drawn over the rim);
- (c) your own variant of the label order, if the twelve questions argue for one.

**Deliver:**
- a drop-in for `x2p_chips.js/.css`;
- flat-named images `chip8-*`, ≤ 300 KB each, plus webp;
- boards `ez/x2p-h24-chips8-*.png` at 390 and 1280, a 3x close-up, and a short loops video;
- REPORT with the twelve questions and H23's tests.

Budget up to $40. Work in `h/chips8/`. The live chips7 is `ez/tools/v22/story/x2p_chips.js/.css` and `h/chips7/` (read only).

### H24 addendum 2 (owner, 2026-11-02, ~00:40 UTC: "lead the design and I'm your taste layer... the goal now is just to get to the end of the overview page... I want everything to bleed out... the background is the first layer of the website")
**The X2+ Overview, end to end (the lead's plan):**
1. **The top** (locked): the headline and the chip, then How a round works, then the film.
2. **Meet the models** (`chips8`).
3. **Every round so far, on the ledger** (`rounds`).
4. **Smart or lucky**, the proof (`proof5`).
5. **The bet**: X3+'s Bet #1 NVIDIA as it is live today (the vault, the chip timer, board D), ported to X2+ (`bet2x`).
6. **The close of the page:** what's next on the card, a door to Upcoming, and "Get $EZ" (`proof5` closes the page too; see below).

Out of the X2+ Overview: the MVPs (the record's highlights) and the old standings (Meet the models replaces them).

**Rules for every helper from now on:**
- **Everything bleeds.** On phones every beat runs edge to edge: no side margins, no rounded box, no card floating on black.
- **The ground is the first layer.** It is what stays if you remove everything else, so every beat sits in it, not on it. The `ground` helper is painting it now.
- **Generated lines.** Lines that describe a model (personality, form) are computed from the sheet's data with stated rules and refreshed at every sync, never typed once and left to go stale.

### `bet2x`: port the bet to X2+ (engineering, no new paintings)
- **What to port:** X3+'s bet section, exactly as it is live: `ez/tools/v22/story/h_bet.js/.css` and `h_betd.js/.css` (the vault opener, the headline, the painted GPU chip with the live countdown in its dies, the parts list, the pool line, board D with the flow in its traces, the bleed on phones).
- **How:** as an X2+ drop-in `x2p_bet.js/.css` that mounts on X2+'s own page without the comic's DOM (`#wc-book .wc-bet`, `html.p1-on`). It replaces X2+'s current bet section (`section.x2o-bet`... find X2+'s bet and NVIDIA ticket in the built `v46-live-x2plus.html`) and keeps its data rules: the bet time as world-comic.js's betAt, the 69% pool share from SIM.poolShare, the leader from `__x2pPnl`.
- **Checks:** identical pixels to X3+'s bet at 390 and 1280 (inside the section), the countdown equal to X3+'s, no errors, no sideways scroll at 320, 390 and 1280, nothing moving with reduced motion.
- **Boards:** `ez/x2p-h24-bet2x-*.png`. Work in `h/bet2x/`. No Hedra needed.

### `proof5`: Smart or lucky, and the close of the page, in the chip world
- **The question:** are the AIs skilled or lucky? Answer it with the page's own numbers in the chip art:
  - each model's hit rate round by round against the coin flip, with the 50/50 start;
  - the P&L over the season, with Season / Last 7 days / Last 24 hours;
  - small samples stated plainly.

  X3+ answers it on a chalk board in an exchange (`h_sol.js`); X2+'s paper ticket is `x2plus.js` `x2pProof`. Read both for the numbers' rules; the numbers must match them.
- **Takes:** at least four, very different, all in the chip world. For example: a scope or oscilloscope tracing the hit rates with the coin flip as the reference line; a test bench where each model's chip is "under test"; a wafer map; your own.
- **The close of the page, two or three takes:** what's next on the card (the next rounds' logos and when the calls are due, live from ROUNDS), a door to the Upcoming tab, then Get $EZ, with the last frame handing the visitor somewhere (follow on X, come back for the bell).
- **Deliverables:** boards `ez/x2p-h24-proof5-*.png` at 390 and 1280, the twelve questions, and H23's tests. Up to $40. Work in `h/proof5/`.

## Round H25 (owner, 2026-11-02, ~01:30 UTC, before bed: "feel free to ship to production. So at least the overview page v1 is done")
**Production is X2+ again.** earningszn.xyz is built from `v46-live-x2plus.html` with the H24 picks:
- the board ground with gold-finger gaps;
- frame 4 take C;
- Meet the models chips8 take c, with personality balloons computed from the data;
- Every round so far as B, Season 1 die by die;
- Smart or lucky T1, the scope, with "Hit rate: how often a trade went the right way.";
- the bet, from X3+;
- the close.

Each task below is a **mockup** unless it says otherwise. Rules: rule 0, the hard rules and BRIEF-H's output rules hold, plus lessons 123 to 127 and the twelve questions. Use 4K masters, up to $40 each.

### `board6`: frame 4 as E, the golden ticket, revised (owner's pick; this one ships once it passes)
- The owner picked **E** (`ez/x2p-h24-board5-close.png`, `h/board5/`): "it gives a bit of a distance from the first number-heavy frames."
- **Changes:**
  - **#1 at the top**, not the front-bottom. The leader's chip is lifted on its column of light at the top of the row, with 2, 3 and 4 below it.
  - **Every chip lit, every number a placeholder "–".** The chips are lit as on Meet the models, but where a number will appear (7 days, season, last round) show only a dash. The numbers are revealed in Meet the models, the next section. The point is to set up the next section and show it is a *leaderboard*.
  - **The characters:** the founders' faces stay exactly as they are in E, the only filled content.
- **Chips:** use the new Meet the models chips (`media/chip8c-*-1200.jpg`, live in `ez/tools/v22/story/x2p_chips.js`). The geometry should match, so the "reveal" reads as the same chip coming closer.
- **Deliver:**
  - a drop-in for x2p_top.js's frame 4 (as board5's `dropin-frame4.js`);
  - flat-named images;
  - boards `ez/x2p-h25-board6-*.png`.

  Work in `h/board6/`.

### `rounds7`: Every round so far, more inspiration (mockups)
- **Today's pick:** B, Season 1 die by die, is live. The owner likes it ("but would want more inspiration") and wants **two beats**, as B has (the season wafer, then the newest rounds), which A, C and D don't.
- **This section gets its own theme** (see `theme7`). It doesn't have to stay in the chip narrative: the owner likes that the scope "changes away from the chip narrative everywhere".
- **Takes:** at least four new, very different two-beat takes:
  - beat 1, the whole season at a glance;
  - beat 2, the newest rounds with each film's own frame, readable.
- **Boards:** `ez/x2p-h25-rounds7-*.png`. Work in `h/rounds7/`.

### `sol6`: Smart or lucky, more takes (mockups)
- **Today's pick:** T1, the scope, is live and fine for now. The owner: it "can be different", and it should take the section's own theme.
- **Takes:** at least four. Each must make a newcomer understand what a hit rate is and what "a coin could do it" means, by word design first (lessons 124 and 126): one front-loaded clause, the domain's verbs, a sample shown.
- **Data:** the same numbers as X2+'s proof and h_sol.js.
- **Boards:** `ez/x2p-h25-sol6-*.png`. Work in `h/sol6/`.

### `theme7`: colour per section, the gaps and bleed, and "the whole game" as its own small section (mockups)
- **Colour as a story (owner):** "green at the beginning dominates, when you get to the model sections you introduce other colors through each model's chip background color that can then be used for the next sections."
  - The models' chip colours: Grok slate, Claude orange, GPT green, Kimi blue.
  - Propose how each later section takes its theme from them (Every round so far, Smart or lucky, the bet stays dark, the close).
  - Show at least three palettes across the whole Overview at 390, top to bottom.
- **Gaps and bleed, first principle (owner):** "they all need to bleed individually but the bleed must make sense with the gap between sections."
  - Work out the rule: what a gap *is* between two worlds, and how each section's bleed meets it. Make it computable, as H23's tests are.
  - Show it on the whole page.
- **"The whole game"** becomes its own section: "way smaller and an option of information a user decides to want to watch or not. As the basics are already explained. More subtle but unmissable."
  - At least three takes, e.g. a small lit monitor with a play key, a cassette, a "watch the 1:20 film" plug.
  - The `film` helper's H24 boards (`ez/x2p-h24-film-*`, when in) are earlier thinking.
- **Boards:** `ez/x2p-h25-theme7-*.png`. Work in `h/theme7/`.

### `chars`: the new Grok and GPT characters (owner, 2026-11-02)
- **The owner's new stills:**
  - `h/h25/owner-grok-elon.png`, two panels. Read the left as the portrait for Grok's die (red, a rocket in hand, the face filling the frame) and the right as an alternative (green, on the couch). Make both and say which fits the window.
  - `h/h25/owner-gpt-sam.jpg`: Sam in the green room, coin up, feet on the road case.
- **The work:**
  - Re-render each at 2K+ with Hedra image-to-image, keeping the face, pose and art exactly, crisp.
  - Then make a 5 s seamless loop for each in the style of the live founder loops (`media/founder-*-anim.mp4/.webm/.jpg`: 640 px, no sound, about 0.4 to 0.6 MB).
  - Crop it for chips8's founder window (`ez/tools/v22/story/x2p_chips.js`, the window's geometry is in `h/chips8/`).
- **Names:** new files named `founder-grok-anim2.*` and `founder-gpt-anim2.*` (media is cached for a year).
- **Boards:** `ez/x2p-h25-chars-*.png` (the chips at 390 with the new loops, beside today's), plus a short video. Work in `h/chars/`.

### `meetbus`: Meet the models fed by the ledger (owner, 2026-11-02, ~01:40 UTC; mockups)
- The owner likes board5's take **D, the bus** (`h/h25/owner-bus.jpg`, `ez/x2p-h24-board5-close.png`): the ledger strip on the left, its rounds scrolling ("R80 XOM +2.17%, R79 AZN.L +6.96%..."), feeding four sockets through gold traces. The owner wants it **for Meet the models, not frame 4**: "it takes the concept of predictions, outcomes, logs and ledger and distils it into a visual."
- Today's Meet the models is chips8 take c, live: four character chips with a balloon each (`ez/tools/v22/story/x2p_chips.js/.css`, `h/chips8/`). Mock up how the ledger bus feeds them:
  - a vertical ledger strip down the section's left, the newest graded rounds running up it in the lit amber of frame 3 (live from ROUNDS);
  - gold traces from the strip into each chip;
  - when a round passes, a pulse runs into each chip that traded it, green if it was right and red if wrong (lesson 115: the motion carries the fact).
- Keep the chips, the founders and the balloons as they are.
- **Takes:** at least three:
  - the strip on the left, as D;
  - the strip as a bus across the top feeding down;
  - your own.
- Phone first at 390; desktop 1280.
- **Boards:** `ez/x2p-h25-meetbus-*.png`. Work in `h/meetbus/`. Up to $40.

### H25, for every task (owner, 2026-11-02, ~01:45 UTC: "Everything has to be highest res and fps pls. Quality has no price.")
- Every painting and every loop is made at the highest resolution and frame rate the model offers: 4K masters, and video at the model's highest resolution and native fps, never downscaled before the master is kept.
- What the page serves is at least 3x the CSS size it shows at, at the native fps, with no visible compression.
- Say each file's resolution, fps and size in the REPORT.
- The `chars` loops especially: the highest resolution and fps Hedra gives, then cut for the window.

### `meet9`: Meet the models, the lines and the ground between the chips (owner, 2026-11-02, ~01:50 UTC, from the live site on a phone, `h/h25/owner-meet-phone.jpg`; mockups)
1. **The balloons don't fit.** "They don't feel part of the world. There should be a more magical way they are integrated." The balloons are pasted-on comic paper over painted hardware (lesson 111: every object obeys its world). Make the line part of the chip world, the way the NVIDIA timer's digits are part of the chip. Takes, at least four:
   - the line scrolls on a display strip of its own chip;
   - it is projected as light from the founder's die, a hologram in the chip's own colour;
   - it is etched in light on the board's traces between two chips;
   - it is typed out on a ticker the founder's die drives;
   - your own.

   It must stay readable: 9 CSS px cap height at 390. The line stays computed from the sheet (x2p_chips.js `LINE`).
2. **The black between the chips is boring.** The owner circled the gaps between the chips: "the bleeding needs to happen here". The chips should sit in a world that runs edge to edge under and between them, not on black: the board ground (`ground4` G1, live) with traces, light and the ledger bus (`meetbus`, running at the same time: build on its boards if they are in, `ez/x2p-h25-meetbus-*`).
   - Apply the gap rule: what sits between two chips is part of the same board, so it carries something (traces, data, light).
   - Show at least three treatments.
- Live code: `ez/tools/v22/story/x2p_chips.js/.css` (chips8 take c) and `x2p_more.js` (the ground), both read only.
- **Boards:** `ez/x2p-h25-meet9-*.png` at 390 and 1280. Work in `h/meet9/`. Up to $40, highest resolution and fps.

## Round H26 (owner, 2026-11-02, ~10:30 UTC; on the live X2+ Overview; mockups)
Live state to build on: earningszn.xyz = `ez/v46-live-x2plus.html` (X2+). The four frames of How a round works are now **still** (owner: "no animation or pulsing or anything... just the numbers are always displayed"; no flicker, no scan, no tap replay; frame 4's founders as still pictures). Keep every new take still unless a motion carries a fact, and cheap: no layer with a perspective transform laid out at painting size (a phone rasters it at that size and runs out of GPU memory: the black frames of 2026-11-02; lay surfaces out at screen size x pixel ratio, see `x2p_top.js` "MEM"). Highest resolution and fps for any painting or loop (H25). Words and numbers stay page text, computed from ROUNDS / `__x2pPnl`, never typed, never baked into paintings. Skill: `.claude/skills/ez-visual-story/SKILL.md`, read first.

### `meet10`: Meet the models, the line in the chip, fed by the ledger strip
- **The chip's windows (owner):** "the sentence should essentially replace the season section": the computed line (x2p_chips.js `LINE`, e.g. "Shorts almost everything. Somehow it's working.") goes in the SEASON window (where "+$148,480 · 45-27" is today). The LAST ROUND window becomes the **W-L record**, W in green, L in red ("we remove the last round section altogether... they'll be able to see that data in the leaderboard section"). LAST 7 DAYS and No. stay.
  - Open question for the owner (show both): A the season P&L leaves the chip (as said); B the season P&L moves into LAST 7 DAYS' place or a small line, so the "Ranked by season P&L" head still has its number on the chip.
  - The line must be readable in the window: 9 CSS px cap height at 390, one or two lines, fitted; say how the longest line fits.
- **The bus as a strip (owner: "I would love for it to be in the strip format. Because then it sort of represents the market feeding every chip"):** meetbus take A (`ez/x2p-h25-meetbus-*`, `h/meetbus/`): the ledger strip of the newest graded rounds feeding each chip through gold traces, a pulse green or red per trade. Build on it with the new windows. The ground between the chips is the board (meet9's gap rule; meet9 E's channels are no longer needed for the line, so the gap carries traces only).
- At least two takes of the strip (left edge, as A; and your own) x the two P&L answers. 390 first, 1280 too.
- **Boards:** `ez/x2p-h26-meet10-*.png`. Work in `h/meet10/`.

### `rounds8`: Every round so far, a hero, six, then more
- Today (rounds6 take B, live): the whole season die by die at the top, then the newest dies. The owner: "I wouldn't want every round to show up at the top... it should only show either the top one or the latest one. And then underneath... six of the last rounds. And then you can click on show 8 more."
- Structure, every take: one hero round (make both: **the latest** graded round, and **the top one**: propose the rule, e.g. the season's bullseye or biggest W, and say it), then six recent rounds, then a "Show 8 more" that adds eight at a time.
- Worlds (owner): the die "is sort of the most in line with our narrative", but also "a filing cabinet... or some type of folders where it's a ledger, where every record gets added to". Takes, at least three: the die (wafer world, today's look), the filing cabinet (each round a filed record, the hero the folder pulled out), folders on a ledger (each round a folder added to a stack or a binder). Each round shows its film's outcome tile (`media/tile-r<n>-t3.jpg` or the F1 frames used today), company, move, winner.
- 390 first, 1280 too. **Boards:** `ez/x2p-h26-rounds8-*.png`. Work in `h/rounds8/`.

### `sol7`: Smart or lucky in two beats, T1 refined
- Today (live): T1, the scope (`_p5.js` / `t1.js` in `x2p_more.js`). The owner: keep T1 ("actually not bad"), but:
  1. **Two beats:** "Smart or lucky, and then it instantly puts you into what it's looking at... too little information to understand what someone is looking at." Beat 1 sets up the question visually (what a coin flip does vs what the AIs did); beat 2 is the scope.
  2. **The chart bigger:** no "Grok 63%, Claude 60, GPT 54, Kimi 46" label column beside the chart ("taking too much space. People just should focus on the percentage"); the chart wider, extended to the right; the colour coding carried by the rows underneath (each AI's W-L in its colour).
  3. **The switch obvious:** "not obvious that hit rate and P&L are clickable... so many little knobs at the bottom and 3 black buttons, but you don't really know which one to click... It needs to be obvious yet simple." One clear control (Hit rate / P&L, and the windows if kept), nothing decorative that looks pressable.
  4. **Wording:** sol6's D (the control) "is correct and is good": "Hit rate: how often a trade went the right way. Grok: 45 of 72. A coin flip lands 28 to 44 of 72." (computed).
- At least three takes. 390 first, 1280 too. **Boards:** `ez/x2p-h26-sol7-*.png`. Work in `h/sol7/`.

### `film3`: the gaps, and "the whole game" as its own small section
- **Order and gaps (owner):** the top (headline and chip), a gap, How a round works, then "the whole game" in "its own little section underneath" (part of how a round works, but how the whole game works), then a **bigger** gap before Meet the models. Make the gaps follow theme7's rule (`ez/x2p-h25-theme7-gaps-390.png`).
- **The section:** theme7's **M, the monitor**, is the favourite, but: "the chip is taking too much space. Ideally just have the video... the video frame on the chip itself... There shouldn't be too much chip visible because you already had a full dose of chips." The viewer must see at a glance it is a video and it is 1:20. Minimal chip, no dead space.
- **Tap to watch big:** "if you click on the video, you should make it bigger... right now it would be way too small for a screen." A tap opens the film large (a phone's own full-screen player or a lightbox at the screen's width; desktop a theatre view), sound on, close back to the page. Mock the closed and the open state.
- At least three takes of the small section. 390 first, 1280 too. **Boards:** `ez/x2p-h26-film3-*.png`. Work in `h/film3/`.

## Round H27 (owner, 2026-11-02, ~11:30 UTC, with a friend's read of the live X2+ Overview; mockups)
**The first principle under all of it:** a picture the eye lands on first must carry its own sentence. The friend "was so focused on the images... he didn't even read the text. But without reading the text, it's difficult to understand." So: one focal thing per beat; the words are part of the picture or come before it, never a caption under a busy painting that the eye skips. Ranking is shown by position and size, never only by a small numeral. Choices (selectors, windows, filters) belong on the Leaderboard tab; the Overview shows only what a visitor must see. The friend liked the headline ("4 AIs trade earnings. The market keeps score."), the charts, and the animated characters; he found the rest "too much".
Live state: earningszn.xyz = X2+ with H26 (still frames, meet10 Meet the models, film4 The whole game). **Hedra is out of credit:** build from existing paintings and code; if a take truly needs a new painting, say so in the REPORT and stop there (the owner will top up). Same rules as H26 (still unless motion carries a fact; no perspective surface laid out at painting size; numbers computed; words page text). Skill first.

### `rounds9`: Every round so far, simple and in its own style
- Hero: **the latest round** (owner: "great from a sequence perspective"), then six recent, then "Show 8 more" (rounds8's structure).
- Each tile, simplified (owner's sketch, `h/h27/owner-rounds-tile.webp` if saved, else as written): the company name **without the ticker**, the move **beside the name** on the same line; under it **"Winner"** and the winning model's logo + name (both on a tie, "Nobody" when none). No row of four marks with a ring.
- **No die, no gold chip frames** ("I don't like the world of the die... maybe a change from a die perspective to something else"). Its own colour scheme, different from the top's (still within red, green and the yellowish gold). At least three styles that are not the comic book and not the chip; say what world each is.
- **Desktop:** no dead space: the area under the hero must be filled (owner circled it on rounds8 A and B at 1280).
- Boards `ez/x2p-h27-rounds9-*.png` (390, 1280). Work in `h/rounds9/`.

### `flow2`: the Overview's order and How a round works, read not just seen
- The friend: the four frames are "too many images and too many things to focus on"; he didn't read the text. Options the owner named: (a) "you click a play button and then the text appears like in a comic book and then the animation shows up"; (b) change it altogether.
- The friend's order: the headline beat, then **Meet the models**, then what a round is. Mock both orders: today's (headline → How a round works → the whole game → Meet the models) and the friend's (headline → Meet the models → How a round works → the whole game).
- At least three takes of How a round works where the words cannot be skipped: e.g. one step on screen at a time with its sentence big (scroll, not tap: H11's "scroll, not show"), the sentence lettered into the picture, one picture for all four steps with the steps as captions on it, a text-first strip with a small picture. Keep the trade verbs (CALL "Each AI goes long or short before the report.", CLOSE "The next market close ends every trade.", LEDGER "Every trade is written to the ledger.", BOARD "The ledger ranks the board.") unless a take shows a better line.
- Boards `ez/x2p-h27-flow2-*.png` (390 first, 1280). Work in `h/flow2/`.

### `rank2`: Meet the models that reads as a leaderboard
- The friend: "difficult for him to visualize that it is a leaderboard... hard to see who's number one... on desktop they're all side by side, but side by side is hard to visualize who's first."
- Keep meet10's chip content (Season P&L, W-L, the line, the founders animated: "what he loved is the characters animated") and the strip. Make rank unmistakable: one column top to bottom on every width (or a podium), #1 largest, the rank numeral big and outside the chip, the gap in P&L visible. At least three takes. Desktop must not put the four side by side unless the order still reads at a glance.
- Boards `ez/x2p-h27-rank2-*.png`. Work in `h/rank2/`.

### `sol8`: Smart or lucky in three beats, no selector
- Owner: "maybe we just have two different charts, one on top of the other without a selector... the selection... should probably happen on the leaderboard... a third beat at the top... an image that explains what a user is about to look at."
- Beat 1: a picture that says what you are about to see (a coin flip against the AIs' record; the question "smart or lucky?" answered visually). Beat 2: the hit rate chart, full width (the coin's exact binomial range, no label column; colours named in the rows). Beat 3: the P&L chart, full width, season only. No tabs, no windows, no knobs. Build on sol7 (`h/sol7/`).
- At least three takes of beat 1. Boards `ez/x2p-h27-sol8-*.png`. Work in `h/sol8/`.

### `bet4`: the bet, simpler
- The friend understands the NVIDIA bet section but "prefers simplicity". Today: the vault chip and the parts list (S4) with the countdown. Make it read in one glance: what is bet, on whose call, when, what happens right or wrong, the countdown. At least three takes, from the existing paintings (`media/bet-*`), fewer parts.
- Boards `ez/x2p-h27-bet4-*.png`. Work in `h/bet4/`.

## Round H28 (owner, 2026-11-02, ~13:00 UTC, on the H27 boards; mockups)
**What the owner's notes come down to (first principles, read the skill's lessons 138 to 142):** a walkthrough shows one example and nothing else (the ledger's other rows distract); each step's picture shows exactly what its sentence says, in the sentence's own words ("goes long or short" shows "long" and "short", not +1%); a presentation shows equals at equal size (rank by size belongs to the Leaderboard tab); the thing people came for (the model's name: "most people will want to know Grok") is the biggest word on its card; every section's world must follow from the story chain (models live in chips → the record is a chain of blocks).
Live state unchanged (earningszn.xyz = X2+ with H26). **Hedra is still out of credit** ($0.38): build from existing paintings and code; if a take truly needs a painting, say so in the REPORT and stop there. Same rules as H26/H27. Skill first. Helpers commit only under `ez/tools/concepts/` and `ez/x2p-h28-*` boards; never tools/v22, v4*.html or media; never deploy or publish. Do not commit scratch videos or shots over 2 MB (keep them out of git: .gitignore inside your folder).

### `meet11`: Meet the models, equal chips, big names, the flag as the chip
- Start from rank2 (`h/rank2/`, `window.__R2T`) and meet10 (`tools/v22/story/x2p_meet10.*`, live). The owner's order: **every chip the same size** ("instead of a presentation of the models... [shrinking] might be a design decision when we do the leaderboard"); ranked top to bottom with the big numeral outside the chip on the left (rank2's numerals); **remove the painted "No." box** from the chip (the numeral says it; meet10's gen.py shows how the chip paintings were patched with clean matte); **the model names much bigger** (today "Grok is literally one of the tiniest thing written there"): the name is the biggest word on the chip, the version small beside it; **the flag becomes the chip**: the chip's own substrate carries the silhouette of its lab's flag (US for GPT, Claude, Grok; China for Kimi), secondary to everything else, a little meme-ish (the owner recalls X3+'s waving flag behind each card, R8/F1); drop the small flag patch. Keep Season P&L, W-L, the quote window, the founder loop and the strip S1.
- At least three takes of the flag-as-chip (e.g. the stripes and canton etched into the silicon as traces; the flag's colours as the board's solder mask; a die-shot where the flag is the die layout), and two desktop layouts (one column; a ranked 2x2 that still reads #1 first). Make the meme side land without hurting the read.
- Boards `ez/x2p-h28-meet11-*.png` (390, 1280, 320). Work in `h/meet11/`.

### `round3`: How a round works, captions on the panels, one example, today's order
- Today's order stays (headline → How a round works → The whole game → Meet the models); the friend's order is not taken. Two takes, both in today's order: **B** (flow2's caption on the panel) and **C** (flow2's text first, small picture), **each panel one under the other** (no 2x2 quadrants; on desktop say what you did and why). Start from `h/flow2/` (B, C) and the live `tools/v22/story/x2p_top.*` (the four frames' surfaces carry HTML text, so the words in them can change; keep the MEM rule: never lay out a perspective surface at painting size).
- One example only, round 40 Tesla, and each panel shows exactly what its sentence says:
  1 CALL "Each AI goes long or short before the report.": the four chips read **GPT long, Kimi long, Claude short, Grok short** (computed from the round's calls; not the % sizes).
  2 CLOSE "The next market close ends every trade.": **Tesla −3.08%** (the number stays); say in the REPORT whether "Grok wins" belongs here or only in panel 3, and show both if unsure.
  3 LEDGER "Every trade is written to the ledger.": **only round 40's entry**: Round 40 · Tesla −3.08% · Winner Grok. No Texas Instruments, no R41 row.
  4 BOARD "The ledger ranks the board.": the #1 ticket (Grok, the founder loop) **sits in its own slot**, not lifted above it, and the board is seen **full frontal**, not at an angle (rectify the painting with the surface's known corners, or say a frontal painting is needed).
- Boards `ez/x2p-h28-round3-*.png` (390 whole top first, 1280). Work in `h/round3/`.

### `chain`: Every round so far as a blockchain
- The owner: none of rounds9's worlds (reel "lackluster", stamp album doesn't fit the story). The chain of the page: the models live in chips (Meet the models) → **the record is a ledger → a blockchain, each round a block** ("people in crypto can relate to"). Keep rounds9's tile content (company without ticker, move beside it, Winner + logo + name, ties, Nobody) and structure (the latest block first, six recent, "Show 8 more"; desktop with no dead space).
- At least four genuinely different ways to draw a chain of blocks in the site's world (red, green, gold on black; the chip's material): e.g. blocks linked by their hashes (each block carries the previous block's short hash, computed from the round's data), a block explorer's newest-first list, blocks as dies cut from one wafer and chained, a chain with the newest block being mined/sealed (still unless motion carries a fact). Use the round pictures from media/ (`tile-r<n>-t3.jpg`, film posters) only if they help the read.
- Boards `ez/x2p-h28-chain-*.png` (390, 1280, 320). Work in `h/chain/`.

### `sol9`: Smart or lucky in two beats, a new world
- Two beats only: **direction (hit rate)** and **P&L**, one under the other, no explainer beat, no coins counted, no selector. The owner likes the separation; the friend did not like the scope/screen look. Keep sol8's data and rules (exact binomial gold range, ranked key under each chart, gold for the golden ticket holder, words before the picture).
- At least four worlds that are not a screen, each following from the story (chips, exchange, ledger/blockchain): e.g. the trace etched on a circuit board between the chips, a strip-chart recorder's paper, a price board, a ledger page. Say what makes each read as "smart or lucky".
- Boards `ez/x2p-h28-sol9-*.png` (390, 1280). Work in `h/sol9/`.

### `bet5`: the bet, say it first, with the owner's words
- The owner likes A "Say it first" (the RIGHT / WRONG split in two lit crops "really hones in on that"), also B "One chip", and wonders if C "Today, trimmed" is right ("maybe just trying to be too fancy"). New words (the owner's gist, set them plainly): **"69% of $EZ creator fees fill the pool. We bet the whole pool on NVIDIA, on the call of the #1 AI on our leaderboard."** (no "The whole pool rides on #1's call"). Takes: A with the new words; B with the new words and A's RIGHT/WRONG split; one simplest take (fewest parts) of your own.
- Boards `ez/x2p-h28-bet5-*.png` (390, 1280). Work in `h/bet5/` (start from `h/bet4/`).

### `rounds10` (H28 round 2): Every round so far, the latest issue / latest print, rich not basic
- The owner rejected the chain takes ("really basic... not that nice") and rounds9's reel and stamp album; what he prefers is "the mockup that we have with like the latest print or the latest issue". The two candidates he has seen: X3+'s **Hot off the press** (H11 rounds5 / H13 rounds6: the four newest prints on the drying wire, blank or pencilled sheets for the next, the painted logo rack `media/rack-r6c.jpg`, then the grid; boards `ez/x2p-x3p-h11-rounds5-*.png`, `ez/x2p-x3p-h13-rounds6-*.png`) and the **issue covers** (each round an issue of the comic, the outcome scene from `media/tile-r<n>-t3.jpg`, the newest the "latest issue"; X3+'s live Every round so far, `tools/v22/story/h_rounds.*`; rounds9 B's "Latest issue · No. 80" souvenir sheet).
- Bring that into X2+ (the chip page: black, gold, green and red; the section sits between Meet the models and the bet). At least four takes, genuinely different, each with the richness of the paintings already in media (no plain boxes, no flat tile grid with a gold label): e.g. the drying wire with the newest prints and the next pencilled; the newsstand with the latest issue on top and back issues racked; the latest issue as a big cover hero with its back issues fanned; a press run where the newest print comes off the roller (still unless motion carries a fact).
- Keep: the latest round first; then the recent ones; "Show more"; each round's company (no ticker), its move, and its winner (logo + name; ties; Nobody); a tap opens the round's graded card; desktop with no dead space; every word page text or on a blank surface the painting carries (no words baked into new art). The outcome tiles `tile-r<n>-t3.jpg` exist for film rounds (T2 for the six without a film).
- Hedra is at $0.38: build from existing paintings; if a take truly needs a new painting, say so and show the closest you can.
- Boards `ez/x2p-h28-rounds10-{390,1280,320}.png`. Work in `h/rounds10/`.

## Round H31 (owner, 2026-11-02, evening; on the live X2+ page, not a redesign)
The H30 ground-up concepts read as "the most boring site I've ever seen... clear for sure... lame";
continue from the live page (earningszn.xyz = X2+ = preview, byte for byte). Mockups over the built
X2+ page (`ez/v46-live-x2plus.html`), overlay CSS/JS in the helper's folder, never editing tools/v22.
- **top7**: the film at the top (above or right under the headline, a big obvious play target, the
  film4 scope look kept or bettered) and How a round works in ONE phone frame (390x664 visible: the
  section head plus all four C3 steps; today the four rows run over two screens). Takes: e.g. C3 rows
  side by side (square picture left, the caption box right, same height), a 2x2 with captions, and one
  more. Keep C3's content (CALL LONG/SHORT dies, MARKET CLOSE, one ledger entry, the board with #1).
- **stand**: Every round so far as PSA graded cards (the record's own slab, `__x2pSlab`/record card
  look, or a cleaner slab in the same family): one beat is a display stand holding three slabs
  (owner named Google, Microsoft, Tesla), and under it the other rounds as slabs. Move the section up
  to right after How a round works (the track record earlier). Takes for the stand (painted in Hedra
  with blank surfaces, or built) and for how the rest sit under it (grid, rows, shelves).
