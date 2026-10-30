# Story mockups on X3+ (2026-10-30): the brief every helper shares

The owner wants every section of EZ Live X3+ (the light American comic) to tell its story through pictures, as "Meet the models" now does. Read these first:
- `/home/user/Tokengame/.claude/skills/ez-visual-story/SKILL.md`: the method. Follow it.
- `/home/user/Tokengame/CLAUDE.md`: the project rules (copy rules, guardrails, the owner's no-go zones). Skim it; search it for "X3+" and "R9", "R10".

## The page
- Built page: `/home/user/Tokengame/ez/v47-live-x3plus.html`. Its world code is `ez/tools/v22/world-comic.js` and `.css`; the main X2+ code is `ez/tools/v22/x2plus.js`. **Read these files, but do not edit them or any built page.** Mockups are CSS and JS laid over the built page in the browser.
- Local server: `http://localhost:8897/v47-live-x3plus.html` (cwd `ez`). If curl fails, start it with `cd /home/user/Tokengame/ez && setsid nohup python3 -m http.server 8897 >/dev/null 2>&1 &`.
- Runner to copy: `ez/tools/concepts/worlds/comic/brand/run.js`. It shows how to:
  - load the page;
  - wait for `html.x2p-world` and no `x2p-cur`;
  - scroll through the page;
  - inject a take's CSS and JS;
  - shoot one section at 390 (height 844) and 1280 (height 1000) with deviceScaleFactor 2.
- Board script to copy: `brand/board.py`. Run it with `/usr/bin/python3`, which has PIL.
- Playwright: `require('/opt/node22/lib/node_modules/playwright')`. Fonts helper: `ez/tools/concepts/live-r1/_fonts.js`.

## Data (never type a number by hand)
- `ROUNDS` (graded): `{n, co, ticker, called, resolves, a (the move, %), win, calls:[[m,"UP 1.5%",off],...]}`.
- `PENDING` and `UPCOMING` hold the rounds still to come; `MODELS[m].c` is each model's colour; `CO_LOGOS[ticker]` holds company logos. All of these are globals on the page.
- `window.__x2pPnl()` returns `{A:{[m]:{pnl,W,L,seq,per:{[round n]:{v}}}}}`: the P&L accounts ($100,000 each, the whole balance on every call, no leverage).
- Models: GPT, KIMI, CLAUDE, GROK. Grok's colour #111 gets recoloured cream by an X2 dark-theme rule when it sits in an svg style attribute. Write it as #15121a.

## Gotchas
- Prefix every mockup class with your own prefix. The site already uses `.u .d .s .pc .rs .xg .mk .ft .fd .st .tick .top .cg .lg .pg .gt-b .x2p-tk` and many `wc-` classes.
- A background shorthand with one invalid layer drops every layer. Corner positions need four values (`left 16px bottom 16px`).
- h2 inside the page is forced to Anton by `html.x2p.x2d[data-theme="dark"] :is(h1,h2)` with !important, so use a longer selector.
- Nothing may move under `prefers-reduced-motion: reduce`.
- No sideways scroll at 320, 390 or 1280. Check `document.documentElement.scrollWidth`.

## Content rules
- No long dashes.
- Plain short sentences, in sentence case.
- Never promise returns. "The pool can be wiped out" stays wherever the bet is described.
- Never invent a number: no pool amount exists yet.
- The picture must not tell a happier story than the data.
- No flags on the landing cover.

## Deliverables
- Files go in `ez/tools/concepts/worlds/comic/story/<your letter>/`.
- Boards go in `ez/x2p-x3p-story-<your letter>-<section>.png` (390 wide) and `-desktop.png` (1280). Each board shows "Today" first, then each take labelled with its letter, number and one-line name.
- Give each section 3 genuinely different takes, each with a different visual carrier, not a re-skin.
- Where motion is the point, also record a short mp4. Use frames from a Playwright screenshot loop, or the browser's screencast, through ffmpeg.
- **Do not commit, deploy or publish anything.**
- Report back:
  - for each take, its story line, which fact each visual carries, and what text it removes;
  - measured checks (no overflow, no errors, widths checked);
  - what you could not do;
  - any number you computed and how you computed it.
