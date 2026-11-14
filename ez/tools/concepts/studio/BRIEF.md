# EZ studio, night of 2026-11-08/09: six carte-blanche pieces

Owner's request (2026-11-09, 00:20 UTC): "You have literally full creative freedom... create three mockups and animations for the new website design, and another three animations for the resolution video template. You are unrestricted when it comes to budget... for Hedra you have more than $20." The owner is asleep and expects all six animated pieces in the morning.

Think as Apple's head of design, its animation director and its marketing lead, working in one studio. Each of you owns one direction end to end: writer, art director, animator, sound and editor. The producer (the parent session) is the creative director. A separate critic, who never saw you make it, reviews your piece afterwards, so make it hold up to fresh eyes.

## Work in stages; don't jump to the final render
1. **Brief:** one line saying what the viewer must understand and what they should do next.
2. **Concept:** the idea in one sentence, plus one style frame (a still). Check the still before animating anything.
3. **Storyboard:** 6 to 10 frames, with the words on each and the timing.
4. **Animatic:** rough motion at low fps. Watch it: does each beat read? Does each word stay on screen long enough?
5. **Final animation and sound.**
6. **Self-QA:** truth, overlaps, hold times, reading load (the checks below), at the stated sizes.
7. **Deliver:** the files listed under your section, plus `REPORT.md` in your folder.

## What EZ is (the use case)
- Four AIs trade every company's earnings: GPT (app name ChatGPT), Claude, Grok and Kimi.
- Before the report, each AI places a trade: long or short, with the size of the move it predicts.
- The trade is graded at the next market close after the report.
- **P&L on the site** is flat: $100,000 on every trade, so P&L = $100,000 × side × the move.
- **P&L in the videos** is sized: $10,000 per 1% the AI predicted, × side × the move. This is the owner's decision for the videos; an FAQ on the site will explain it.
- The site answers three things people come for:
  - who is winning (the leaderboard: P&L, W-L, hit rate on direction);
  - what the AIs are trading next (Upcoming: the next earnings, in the visitor's time zone);
  - the record (every graded round, checkable).
- The owner has said: simplify the website; maybe land visitors on Upcoming or the Leaderboard.
- There is a token, $EZ (pump.fun, paired with USDC). 69% of creator fees fill a pool. Bet #1: the pool goes on NVIDIA's earnings (Nov 17), on the call of the AI at the top of the leaderboard.
  - Guardrails: no return promises; "the pool can be wiped out"; the word is "pool".
  - Follow trades on Hyperliquid (`https://app.hyperliquid.xyz/trade/<dex>:<COIN>`) only where a market exists. Never write "No Hyperliquid market".
- The resolution videos are posted on X after each round as a lead magnet. Their goal is a site visit; no token or buyback talk in the videos.
- Live site today: earningszn.xyz is a Hyperdash-style terminal (`ez/v53-terminal.html`). Look at it so you know what you are replacing.

## Data: never type a number by hand
- `ez/ez-data.js` provides the globals `ROUNDS`, `UPCOMING`, `PENDING`, `MODELS`, `CO_LOGOS`, `CAPS`, `SIM`, `CONFIG`, `TICKERS` and `FILMS`.
- Each round has `n`, `co`, `ticker`, `called`, `resolves`, `a` (the move in %), `win` (`"GROK"`, or `"GPT & CLAUDE"` for a tie), `tag`, `film`, and `calls` as `[[model,"UP 8"|"DOWN 1.8"],...]`.
- Each entry in `MODELS[m]` has `app`, `ver`, `bg`, `fg`, `d` (the SVG path of its mark), `dot`, `dotc` and `fr`. Model line colours used on the site: GROK `#e4e0d6`, CLAUDE `#ef8a55`, GPT `#b18cff`, KIMI `#58b7ff`.
- Company logos: `CO_LOGOS[ticker].f` lives under `ez/media/`. A `dark:true` entry is a light logo made for dark grounds.
- Intraday price path for **R72 Reddit**: `PATHS[72]` in `ez/tools/concepts/resolution/paths.js`, Hyperliquid 15-minute closes from the report (4:05 pm New York, Oct 29) to the next close (4:00 pm, Oct 30), 97 samples; the market open falls at index `round(96*17.75/24)`.
  - Scale the deviations so the last point equals the sheet's move: `kk=(RD.a/100)/((path[last]/p0)-1)`. See `ez/tools/concepts/resolution/oneB.html` for working code.
  - R72 sized P&L: Grok +$5,269 (short 1.8%), Kimi −$4,391, Claude −$20,489, GPT −$23,416. Reddit −29.27% at the close. Grok wins.
  - Another round needs Hyperliquid's public `candleSnapshot` (POST https://api.hyperliquid.xyz/info) and only works for companies with a market; R72 is the default example.
- Graded rounds: 99 of 112 so far. Compute standings yourself from ROUNDS (flat $100K for the site).

## Brand
- Logo: `ez/tools/v22/x2p-logo.svg` (EZ. on a black disc). Logo colours: black `#04070e`, cream `#f8f0d9`, green `#03c870`, red `#ff3a31`, gold `#fdbc2a`.
- Carte blanche means you may leave every other part of the current look behind: palette, type, layout, the comic and ticket worlds. The EZ. logo stays.
- Media already made that you may use: the founder loops `ez/media/founder-<m>-anim.mp4/.webm/.jpg` (m = grok, gpt, claude, kimi; also `-anim3-b` for grok and gpt), round films `ez/media/round-<n>-*-hd.mp4`, company logos.
- **Hedra** (key in the env var `HEDRA_API_KEY`; never print it):
  - Images: `python3 ez/tools/concepts/launchvid/hedra/hd.py <name> gpt-image-2 '<json>' [ref.png ...]`. The JSON is e.g. `{"prompt":"...","aspect_ratio":"3:4","resolution":"2K","quality":"high"}`; `BIG=1` keeps a 2048px copy; prefix with `EST=1` to price a job first. It saves to `img/<name>.jpg` (and `raw/<name>.png`).
  - Image-to-video (5 s): `hv.py <name> kling-26-pro <image job id> '<prompt>' [aspect]`.
  - Music and sound effects: `ha.py` (elevenlabs-music needs `duration_ms` and `force_instrumental`; it bills at least one minute, about $0.60).
  - Ready-made sounds: `ez/tools/concepts/launchvid/hedra/music/sfx-*.mp3` (bell, tick, whoosh, coin, cash, chime, lock, stamp, type, tap, beep, riser, boom, strike, flip, clock, shatter) and music `m1-trailer`, `m2-phonk`, `m3-electro`, `m4-chill`.
  - **Name every Hedra job with your id as a prefix** (e.g. `w1-hero`). Never bake words or numbers into generated art: words are set by code on surfaces the art leaves blank. Your Hedra budget is in your section; stay under it (check with `EST=1`).

## Rules that still hold under carte blanche
Read `.claude/skills/ez-visual-story/SKILL.md` (rule 0 and the lessons).
- **Craft:**
  - No dead space; containers hug their content.
  - No white or pale empty boxes unless the white means something.
  - No stock sunbursts, smoke or glows as decoration.
  - No native emoji.
  - Nothing laid over a logo.
  - Siblings are one template, measured to within 1px.
  - Decoration and motion must carry a fact.
  - The picture never tells a happier story than the data.
- **Copy:**
  - The word for what an AI does is **trade**: "long" and "short", never "call" or "prediction" in new copy.
  - Plain, short sentences; no long dashes.
  - No coin flip.
  - About 5 words per shot in videos. Hold each shot at least 1 s + 0.08 s per character.
- **Truth:** every printed figure equals ez-data.js or the paths. Ties crown both. "Nobody" when no AI wins. Never say "locked 10 minutes before earnings": the sheet has no posting time.
- **Screens:** a screen shown inside a scene is always landscape.
- **Scored checks** (report them as before/after against the live terminal, or against `ez/x2p-res-one-scene-B.mp4` for videos):
  1. comprehension (the questions the piece must answer, answerable sound off);
  2. reading load (words per shot, hold times);
  3. truth;
  4. craft (overlaps 0, dead space, siblings);
  5. focus (share of the area or runtime spent on the story's main carrier);
  6. velocity and cost (render time, manual work per round, page speed).

## Infrastructure
- Local server: `http://localhost:8996` serves `ez/`. Check it with `curl -s -o /dev/null -w "%{http_code}" http://localhost:8996/ez-data.js`. If it isn't 200: `cd /home/user/Tokengame/ez && nohup python3 -m http.server 8996 >/dev/null 2>&1 &`.
- Playwright and Chromium are installed (`require('playwright')`). Use deviceScaleFactor 1 for checks and 2 for boards.
- Frame rendering: `ez/tools/concepts/launchvid/render.js` (`PAGE=../studio/<id>/index.html node render.js <outdir> 30 <from> <to>`, run from `ez/tools/concepts/launchvid/`). It calls `window.R(t)` and screenshots each frame at 1080x1350. Copy it and change the viewport if you need another size.
- Encode: `ffmpeg -framerate 30 -i f%04d.jpg -i audio.wav -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest -movflags +faststart out.mp4`. Use loudnorm `I=-16:TP=-1.5`. Python audio mixing with numpy works: see `ez/tools/concepts/resolution/mixOneC.py`.
- Python's PIL is broken here. Build boards with ffmpeg (`hstack` / `vstack` / `tile`) or ImageMagick `convert` / `montage`.
- Scratch frames go in `/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/studio/<id>/`, not in the repo.
- **Do NOT commit, push, deploy or publish artifacts.** Touch nothing outside your folder `ez/tools/concepts/studio/<id>/` and your outputs `ez/x2p-studio-<id>*`. The producer commits.
- Keep each mp4 under 15 MB (crf 20 to 23 if needed).
- Finish within about 4 hours. If a stage is going badly, cut scope rather than quality, and say so in REPORT.md.

---

## WEBSITE directions: deliverables
Each website direction delivers:
- A working prototype in `ez/tools/concepts/studio/<id>/index.html` that reads `../../../../ez-data.js` and media at `../../../../media/`. It must work at 390px (phone) and 1280px (desktop).
- At least these views: the landing; the leaderboard (who is winning); what's next (Upcoming); one round opened.
- Boards: `ez/x2p-studio-<id>-390.png` (key screens of the phone, side by side) and `ez/x2p-studio-<id>-1280.png`.
- The animation: `ez/x2p-studio-<id>.mp4`, a 20 to 35 s, deterministic walk-through of the prototype on a phone (portrait 1080x1920, or the page at 390 wide shot at deviceScaleFactor 2.77 to fill 1080). It shows arrival, scroll, the key interactions and motion. Build it deterministically: drive time with a `window.R(t)` or a scripted scroll, then screenshot frame by frame. Soft music is optional.
- `REPORT.md`: the concept, the decisions, the six checks, what you cut, and open questions for the owner.

### W1 · "Keynote" (Hedra budget $3)
The site as an Apple product page, in light mode: warm white and ink, one accent at a time. One idea per screen. Huge type and huge numbers. Scroll-driven reveals, a sticky stage where the picture changes as you scroll.
- Arrival answers in one line who is winning and what the AIs trade next, with a countdown to the next close.
- The four AIs are presented like products: the mark as a beautifully lit object. Hedra may render each mark as a physical object (enamel, glass, metal) with no letters.
- The record is a calm, beautiful grid. The leaderboard is a clean table. Upcoming shows the next close's companies and each AI's side.

Restraint is the style; craft is the wow (typography, spacing, motion curves).

### W2 · "Matchday" (Hedra budget $2)
The site as a live sports app (think the F1 TV, NBA or Premier League apps), dark, broadcast graphics.
- Land on **Today**: what's live now, a scorebug with the next bell and its countdown, each company tonight as a fixture card with the four AIs' sides, the last results as final scores.
- Standings table, with model colours as team colours.
- Each AI has a team page; each round has a match page with the night's P&L chart as the match timeline.

Dense but crisp. The energy comes from live states (LIVE, FT, an upcoming kickoff time in the viewer's time zone), never from decoration.

### W3 · "The Feed" (Hedra budget $2)
The site as a feed native to X and crypto: each AI is an account (avatar = its mark, handle, follower-style stats: P&L, W-L, hit rate).
- Every trade is a post placed before earnings ("Short Reddit · 1.8% · before earnings"). When the close grades it, the market's reply appears under the post ("Closed −29.27% · +$5,269 · Right side").
- Mobile-first timeline; tabs Following / Leaderboard / Upcoming. Upcoming posts read "trades due" with the time in the viewer's zone.
- Profiles show each AI's stats and its pinned best trade.

It should feel like a real, polished app, not a parody of X: its own type and colours, with the EZ. logo.

## RESOLUTION VIDEO directions: deliverables
Each video direction delivers:
- A renderer `ez/tools/concepts/studio/<id>/index.html` with `window.R(t)`, 1080x1350 (4:5), 15 to 25 s. Default example R72 Reddit (sized P&L).
- It must make a viewer understand, sound off:
  - the company;
  - that four AIs traded it **before earnings**;
  - each AI's side;
  - that the trade **closed at the next market close**;
  - who won;
  - how much.
- The first frame is the X thumbnail and must hook on its own.
- The end points to earningszn.xyz, plus the next round where it adds value. "Next" must be a round called after this one closed: for R72 that is Apple / Palantir on Monday Nov 2. Compute it; don't type it.
- Outputs: `ez/x2p-studio-<id>.mp4` with sound; `ez/x2p-studio-<id>-board.jpg` (8 frames, a storyboard of the final); REPORT.md with the six checks against `ez/x2p-res-one-scene-B.mp4` (the current best, a P&L race chart in one scene).
- Template thinking: say what changes per round and what is fixed. Ties, nobody right, a round without an intraday path: say how each is handled.

### V1 · "Keynote type" (Hedra budget $2)
An Apple-keynote film made of typography and numbers only. Black, one typeface, one statement per beat, exact motion curves.
- The stock's move as one giant number. The four trades as words. The winner's P&L counted up large.
- If there is a chart, it is a single line drawn with intent.
- Silence and timing are the drama. One signature sound (the closing bell).

### V2 · "Broadcast" (Hedra budget $3)
A sports broadcast package:
- an opening sting;
- the fixture card "Reddit · Earnings night";
- the line-up (four AIs and their sides as a team sheet);
- through the night, a live timing tower (positions by P&L changing as the price moves, using PATHS[72]);
- the "final whistle" at the close;
- the winner as player of the match with the P&L;
- the next fixture.

Lower thirds, a scorebug and a clock. Broadcast-grade motion: wipes, slides, masks. No cheap glows.

### V3 · "Painted cinema" (Hedra budget $6)
A short cinematic film. Hedra paints the world and Kling animates a few shots; the data is set crisp by code over surfaces the art leaves blank.
- The idea: the four AIs as presences (their marks as objects or emblems) waiting through earnings night in a world drawn from the company (Reddit: its culture, its colours), then the bell, the verdict.
- Text never baked into the art. Each painted shot must carry a fact, not mood only.
- A template for any round: say which shots are reused per round and which are generated per round, with cost.
