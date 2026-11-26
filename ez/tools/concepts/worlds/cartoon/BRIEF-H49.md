# Round H49: bring the show to life (owner, 2026-11-04)

X6+ (`ez/v50-live-x6plus.html`, the Saturday-morning show) has been the live site at earningszn.xyz since 2026-11-03 at night. The owner's brain dump on it, verbatim in the parts that matter:

> "We track four AIs on every earnings trade, so you don't have to. I feel that one needs to stand out a bit more, because that's ultimately what we do... I love the Who to Follow so far as Grok... we need to animate Elon, okay? Like, he needs to be animated. And then integrated... diegetically, right? So wherever you have logos of companies, they have to be integrated. Some logos, I think, have to be researched as well. Also, the Palantir video... needs to be a larger screen because the predictions are appearing very small... What I would like for every round so far is... the trading card when you click on it, the one you see with the video... you have the video, you have winner block, and then the PSA grading card surroundings... use the same style, art style and layer of style that was used for the entire site, but then overlay that style onto PSA graded, so the PSA graded card fall into our world... it doesn't feel like something pasted on... it's okay to do 6 [by default]. And again, also in the meet the cast, we need to animate these people... each character has to be animated as well, just like in the previous versions we had. And... you have starring and then it says GPT, Claude, Grok, and Kimi. So what if we have... small versions of the characters... So instead of having GPT, Claude, Grok, and Kimi [as a row of names], you put this starring somewhere here, written like in here somewhere [in the painting, by the road], and then you have small little... models of the characters, sort of show up here. So it's a funny way to introduce the models... you have permission to lead the design."

His annotated phone screenshot is `ez/tools/concepts/worlds/cartoon/h49/owner-starring-sketch.webp`. In it:
- the Starring row is crossed out;
- a red arrow runs from it up into the painting's road and square;
- four short red marks on the grass at the foot of the title painting show where the little characters stand.

## The want, in one line

The show already reads well. Now it has to feel alive and of one piece:
- the cast moves;
- the cast walks into the opening scene;
- the one line that says what we do is the loudest line after the title;
- every object (the graded slab, company logos, the TV) belongs to the painted world instead of sitting on top of it.

## Shared rules for every helper (read all of them)

**Scope and files**
- X6+ only. Every rule goes under `html.h48`, and the X2+ page `ez/v46-live-x2plus.html` must stay byte for byte as it is. Check its md5 before and after each `python3 tools/v22/build.py tools/v22` (run from `ez/`).
- Work only in your own pair of files, `ez/tools/v22/story/h48_x_<name>.js` and `.css`. build.py already picks up every `h48_x_*` file. Do not edit h48_ov.js, h48_ui.js, h48_data.js, h48_show.css, h48_ov.css, h48_lb.*, h48_up.*, h48_crawl.css, build.py or x2plus.js. If you need one of them changed, say so in your report. (Exception: the logos helper may edit the `CO_LOGOS` line of ez-data.js; see D.)
- **Patching the Overview.** h48_ov.js builds it into `#h48ov` and then, before the cover lifts, calls every function on `window.H48HOOK` with `(root, D)`. Register yours with `(window.H48HOOK=window.H48HOOK||[]).push(function(root,D){...})`. For the round view or other tabs, watch the DOM yourself. Never let an error escape: a hook that throws is caught and logged in `window.__h48HookErr`.
- **Media.** Keep files flat in `ez/media/`, every name new and prefixed `h49-`. Write every file name out in full in your JS or CSS: make_site.py copies only the media names it finds in the page, so a name built at runtime 404s on the live site. Keep sizes sane: a loop is about 0.5 MB at 2x its displayed size, a still at most about 250 KB.

**Data and lettering**
- Numbers and names come from ez-data.js through `H48D`/`H48UI`, never typed by hand.
- Words and numbers stay page text. Never bake them into generated art.

**Design rules**
- `.claude/skills/ez-visual-story/SKILL.md`, rule 0 and its measured checks, before any board:
  - no pale grounds inside modules, no dead space;
  - nothing laid over a logo or the art's subject;
  - no native emoji;
  - name and ticker together;
  - "trades", never "calls".
- Lessons 173 (dark ink on light painted plates) and 175 (chrome moves with the world).
- The owner's default: hand-tuned painted shapes, never a stock CSS box or one even pattern.

**Motion**
- Motion must mean something.
- Nothing moves with reduced motion.
- Loops play only while on screen and pause off screen.
- Never call `play()` while the explainer film plays: x2plus.js holds scripted play() then. Use the `autoplay muted playsinline loop` attributes, or wait for its release.

**Art: Hedra**
- The key is in env `HEDRA_API_KEY`; never print it. API notes are in `ez/hedra/REPORT.md` (v3 endpoints: models, estimate, submit, poll the job, download the asset).
- Estimate before every job and stay inside your budget.
- The house look is the H48 paintings: gouache on board, warm, lit from the top left, a slight paper grain. Keep characters on model: same faces, clothes and props as `media/h48-cast-<m>.jpg`.
- Generated art with a factual error (a wrong logo, a wrong face, stray text) is never shipped.

**Checks before your report**
- Widths 320, 390 and 1280.
- Reduced motion on, no page errors, no sideways scroll.
- The cover still lifts: `#/`, `#/leaderboard`, `#/upcoming`, `#/round/84`.
- Cover-lift time at 4x CPU, before and after (medians of 3).
- Serve `ez/` on your own port: 8997 is mine, so take 89xx anything else.

**Hand-off**
- Boards: `ez/x2p-h49-<name>-390.png` and `-1280.png`.
- Never deploy, publish, commit or push.
- Report in under 400 words: what you built, which checks ran and their numbers, what you flagged, what you spent on Hedra, and what you left out.

## A. anim: the cast comes alive (Hedra budget $8)

Animate the four cast paintings `media/h48-cast-{grok,claude,gpt,kimi}.jpg` (600x800). Each becomes a seamless 5 s loop in the same painted style:
- small life only: a glance, a blink, a smirk, breathing, the prop moving (Elon's rocket, Sam's coin, Dario's notebook, Kimi's founder's scroll or whatever is in his painting);
- no cuts, no camera move, faces on model.

**Use:**
- image-to-video from the still itself, so the first and last frames match it;
- pick the model by test (Kling has done our founder loops well);
- 24 fps;
- mp4 (h264, faststart) plus webm;
- poster = the existing still.

**Where they play:**
- Meet the cast (`.h8-castsec .h8-pic`);
- the golden ticket's window (`.h8-gtface`, the season leader's portrait, Elon today), so "So far, it's Grok." has a living Elon;
- the Leaderboard's golden ticket, if it uses the same picture.

One file serves both crops (`object-fit:cover`; the ticket shows `object-position:50% 18%`).

If a take drifts off model, re-roll once, then keep the still and say so. The old X2+ founder loops (`founder-*-anim*`) are a different style: do not reuse them.

## B. star: the opening scene and what we do (Hedra budget $4)

Own the title card (`.h8-tcw`) and its green credits strip (`.h8-cred`).

1. **"We track four AIs on every earnings trade, so you don't have to." must stand out.** It is what we do, the loudest line after the title. Today it is bold body text on the green credits.
   - Give it lettering and a carrier from the show: a painted plate, a title-card caption board or the lettering itself.
   - The second sentence ("Before a company reports...") and the small facts line stay small under it.
2. **Starring, inside the painting.**
   - Remove the Starring row (keep the names in a screen-reader list).
   - Letter "Starring" into the scene, near the road and the square the owner's arrow points at: painted on a sign, a banner or the road itself, whichever reads best and isn't laid over the exchange.
   - Put four small painted figures of the cast (the same characters as the cast paintings, full body, small, toy-like but on model) on the grass and road at the owner's four marks, each with its name readable (a tiny pennant or sign in the plates' lettering, page text).
   - They are separate layers over the painting (cut-outs with soft contact shadows), so they can appear.
   - The appearance is the joke and the introduction: they pop up or walk on once, one after another, as the card first shows. Nothing moves with reduced motion; they just stand there.
   - Place them per crop: the phone uses `h48-title-34.jpg` (800x1067), desktop `h48-title-169.jpg` (1920x1080). Keep them off the title lettering and the exchange.
3. **Hand-off.**
   - Build your best take into `h48_x_star.*`.
   - Make one board of the alternatives you considered: two other placements or letterings for Starring, and two other treatments of the line.

## C. slab: the graded card in our world (Hedra budget $4)

When a round opens (`#/round/N`; the record tiles in Every round so far open it), X2+'s slab view shows (`#x2pRm`, built in x2plus.js from the record card):
- a PSA-style acrylic slab;
- the label (company, round, grade, the hologram);
- the film or picture window;
- the winner block;
- the back: the certificate (rows, PASS/FAIL, market, dates, stamp).

On X6+ it should fall into the show:
- painted, not photographed;
- the slab's frame and acrylic in gouache with ink edges;
- the label a painted plate with the show's lettering (Caprasimo titles, Lilita labels and numbers, Fredoka words);
- the winner block in the show's gold;
- the back's certificate printed on the show's stock.

Same content, same live text, same buttons (flip, close, prev/next arrows, swipe). CSS and JS under `html.h48` only; X2+'s slab stays as it is. Painted pieces (frame 9-slice, label plate) can come from Hedra.

Check a film round (R84 or R81), a picture-only round, a tie (R57 or R4), a no-winner round (R51 UPS), and a pending round with trades in (R85 AMD).

Also check Every round so far:
- it now shows 6 tiles by default (one row of six from 1000px, three rows of two on phones);
- "Show all" still works;
- the tiles keep the show's look.

## D. logos: researched and part of the world (Hedra budget $1)

1. **Audit** every company logo X6+ shows (Overview next trades, Upcoming, Every round so far, the Leaderboard). The files are `ez/logos/*.png`, mapped by `CO_LOGOS` in ez-data.js. List the bad ones:
   - blurry;
   - a tiny mark lost in its margin (Lumentum, Siemens, SoftBank, Datadog look like this);
   - an outdated mark;
   - a wordmark where the brand's own symbol reads better;
   - white on white.

   For each, find the current official mark: the company's brand or press page, or Wikimedia Commons with its licence noted. Save it under a new name (`logos/<TICKER>-2.png`, or an svg; media are cached for a year), trimmed and square. Update its `CO_LOGOS` entry in ez-data.js:
   - one atomic edit of that line only;
   - never touch the SHEET block (an hourly sync rewrites it);
   - list every entry you changed.

   Never invent or redraw a logo.
2. **Integrate** the logos into the world. Today each sits on a small square painted card like a sticker.
   - Mock two or three takes on the next-trade card, the Upcoming rows and the Every round so far tiles. For example: printed onto the plate's stock as if inked there, held in a painted frame or sign that belongs to the plate, or the company's own colour carried by the card.
   - Build the best one in `h48_x_logo.*`.
   - A logo stays whole and readable at every size, and nothing is laid over it.

## Mine (the lead)

- The Palantir film in "One real round, start to finish": the screen gets bigger, so the trades on it read.
- Every round so far showing 6 by default (done in h48_ov.js/.css).
- The H48HOOK.
- Review, build, deploy and report.
