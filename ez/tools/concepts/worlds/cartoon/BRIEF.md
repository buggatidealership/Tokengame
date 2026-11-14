# Round H47: new art directions for the Overview and the Leaderboard

Owner, 2026-11-03: "create some new design art and style mockups for the overview page and leaderboard page. Think American cartoon, think comic book, think story telling, use hedra, you have carte Blanche. Mock ups only. The only rule is to use data from the sheet."

## What the owner's words mean here

- **Carte blanche.** Forget today's look (the chip world on earningszn.xyz).
  - Commit fully to ONE tradition, as an expert in it would (skill lesson 61).
  - Your take must differ from the other four helpers' in every element: art, layout, sequence, type and motion.
- **Mockups only.** Nothing ships.
  - Do not edit: `ez/v46-live-x2plus.html`, anything in `ez/tools/v22/`, `ez/ez-data.js`, `site/`, `CLAUDE.md`, the skill.
  - Do not deploy, publish artifacts, commit or push.
  - Never request any URL on earningszn.xyz.
- **Data from the sheet.** Every number, name, date, trade and result comes from `ez/ez-data.js` at render time: load it with a `<script src>`, never type it in.
  - The season P&L (flat $100,000 per trade, 80 graded rounds) must come out as:
    - Grok +$148,480 (45-27)
    - Claude +$102,950 (48-32)
    - GPT −$56,930 (43-37)
    - Kimi −$70,650 (37-43)
  - If yours differs, yours is wrong. The one exception is a sheet sync during your work: then check against the live page.

## Read first

1. `.claude/skills/ez-visual-story/SKILL.md`, the whole of it. These parts matter most:
   - rule 0 (the hard rules) and the gap list 1 to 19;
   - lessons 61, 67 to 72, 80 to 92, 99, 104, 113, 119, 121, 123 to 125, and 158 to 171.
2. The live page in a browser, to know what exists (do not copy it):
   - the Overview: http://localhost:8995/v46-live-x2plus.html
   - the Leaderboard: the same address with `#/leaderboard`
   - If the server is down, run `cd /home/user/Tokengame/ez && python3 -m http.server 8995 &`.

## The facts each take must carry (the facts, not the layout)

### Overview: the project's story, in an order you choose

- **What EZ is.** 4 AIs (GPT, Claude, Grok, Kimi) trade earnings.
  - Before a company's earnings, each AI goes long or short on its stock.
  - The market close grades every trade.
  - Each trade is a flat $100K (simulated).
- **The cast.** For each model: name, the lab's country, season P&L, W-L.
- **The record.** Every graded round so far (80). For each one:
  - company and ticker, and the move;
  - who won: the closest trade, both on a tie, "Nobody" when all four were wrong;
  - its film: `FILMS[n]` in `ez-data.js` names `media/<f>.mp4` and the poster `media/<p>.jpg`. Every round has a film; posters are the round's art.
- **Smart or lucky.**
  - the hit rate over time: (right + 1) / (trades + 2), so every line starts at 50%;
  - the P&L over time.
  - No verdict on skill: 80 rounds is too few.
- **The bet.**
  - 69% of $EZ creator fees fill the pool (`SIM.poolShare`).
  - Bet #1 is NVIDIA, at the close. NVIDIA's SHEET row is dated 11/17/26. Take the bet's date and countdown from the live page's bet card; don't work it out yourself.
  - The top model's trade decides long or short.
  - Right: profits buy back $EZ. Wrong: the pool shrinks or can be wiped out.
  - NVIDIA is the first bet, not the last (Season 2).
- **What's next.** The next companies to report, from the `SHEET` rows without a move yet.
  - Where the trades are already in (for example R85 AMD), show them.

### Leaderboard: the page people come back to

- Rank by P&L (the default) or by hit rate.
- Three windows: Season (the default), 7 days, 24 hours. Every figure names its window.
- Per model:
  - Last 5, as W and L, with the oldest and newest ends clear;
  - W-L;
  - hit rate;
  - P&L;
  - P&L at the latest close.
- A P&L-over-time chart (or the hit rate), drawn as a chart everyone reads (lesson 167).
- By sector: trades won out of trades made.
- Biggest W and biggest L per model, each with company, ticker and amount.
- Who holds the golden ticket: the top model. The board freezes 24h before NVIDIA reports, and the top model's trade is the bet.

## Data recipes

- **Graded rounds:** `ROUNDS`. Each round carries:
  - `r.n`, `r.co`, `r.ticker`, `r.called`, `r.resolves`;
  - `r.a`, the signed % move;
  - `r.win`, the winner(s), or "NO WINNER";
  - `r.calls`, as `[[MODEL,"UP 2.5%","% off"],...]`.
- **P&L of one trade:** dir = +1 for UP, −1 for DOWN; v = 100000 × dir × r.a / 100. A trade is a W when v > 0.
- **All rows:** `SHEET`, with its column names in `SHEET_HEADER`.
  - A row with trades but no result: trades in.
  - A row with no trades: coming up.
- **Windows:**
  - 7 days = the rounds whose `resolves` date (New York) is today or one of the six days before.
  - 24 hours = the rounds graded at their own exchange's close in the last 24 hours.
  - Today the 24-hour window is empty; the last close was Fri Oct 30. Say so plainly and never fall back to older rounds.
- **Model colours:** Grok #e4e0d6, Claude #ef8a55, GPT #b18cff, Kimi #58b7ff.
- **Model marks:** `MODELS[m].d`, an SVG path in a 24-unit box.
- **Flags:** US for GPT, Claude and Grok; China for Kimi.
- **Sectors:** the SECTOR column of `SHEET`, read through `SHEET_HEADER`. `RMETA` is built from it in `ez-data.js`; check that it is filled at runtime before relying on it. The Mag 7 flag is the MAG 7 column.
- **Companies:**
  - logos: `CO_LOGOS[ticker].f`, under `ez/media/`;
  - names: `TICKERS`;
  - size order (for "the big names"): `CAPS`.
- **The EZ. logo:** `ez/tools/v22/x2p-logo.svg`.

## Hedra

- **The key** is in the environment variable `HEDRA_API_KEY`. Never print it and never write it to a file.
- **The runner:** copy `ez/tools/concepts/worlds/comic/story/h/s2u/gen.py` into your folder.
  - Run it as `python3 gen.py jobs.json`. Each job carries `model`, `input` and, optionally, `refs` (local files that are uploaded and passed as images).
  - Example jobs: `.../s2u/jobs1.json`. Notes: `ez/hedra/REPORT.md`.
- **Budget:** $5.00 in total for your take. The balance of $32.8 is shared by five helpers.
  - Prices: gpt-image-2 is about $0.03 at medium 1K and $0.43 at high 2K; seedream-50-pro about $0.07; nano-banana-pro 2K about $0.15.
  - Rough the pieces at cheap settings, and paint finals only for the pieces you keep.
  - Log every spend in your REPORT.
- **What Hedra paints:**
  - scenes, characters, props and textures;
  - blank painted surfaces for the text to sit on: signs, plates, boards, balloons, panels.
- **Never words or numbers in the art.** They come back garbled and cannot follow the data.
  - End every prompt with "no text, no letters, no numbers, no logos, no signs with writing".
  - Set every word as live page text on a painted surface, in that scene's light and making process (gap list 18).
- **The cast:** the four founders, as established characters. The owner made them; do not replace them (lesson 74).
  - Reference stills, all in `ez/media/`: `founder-claude-anim.jpg`, `founder-gpt-anim3-b.jpg`, `founder-grok-anim3-b.jpg`, `founder-kimi-anim.jpg`.
  - Reference film: `ez/tools/concepts/worlds/comic/story/gr/green-room-src.mp4`.
  - Redraw them in your tradition, with those as refs.
  - Ration them (lessons 87, 89, 102, 110): the cast is introduced in its own chapter. On a model's card the subject is the model; the founder is its living face.
- **Companies keep their own identity:** their logos, brand colours and the round films' posters.

## Output: everything in your folder, `ez/tools/concepts/worlds/cartoon/<id>/`

1. **Two mockup pages,** `overview.html` and `leaderboard.html`.
   - Each is standalone. It loads `ez-data.js` by a relative path (`../../../../../ez-data.js`; check it) and renders everything from it.
   - Design the phone (390) and the desktop (1280) each for its own shape (lesson 19); don't stretch the phone version.
2. **Boards in `ez/`** (outside your folder):
   - `x2p-h47-<id>-ov-390.png` and `x2p-h47-<id>-lb-390.png`: full-page screenshots at 390px, DPR 2;
   - `x2p-h47-<id>-ov-1280.png` and `x2p-h47-<id>-lb-1280.png`: full-page screenshots at 1280px, DPR 1.
   - Shrink a file that goes past about 8 MB.
   - Use Playwright: `require('playwright')`, then `chromium.launch()` (no options needed).
   - Screenshot your own pages, full page. Do not scroll the live page with Playwright (it crashes).
3. **`REPORT.md`** in your folder:
   - the story of each page, in one line each;
   - facts → carriers;
   - which gap-list and rule-0 checks you ran, with the measured numbers (dead space; alignment at 320, 390 and 1280; no sideways scroll);
   - your Hedra spend;
   - what you would do next;
   - any oddities in the data.

Keep everything inside your folder. The only files outside it are the four boards.

## Hard rules (the owner has repeated these; breaking one sinks the board)

- **Art and surfaces:**
  - No text or numbers baked into generated art.
  - No native emoji.
  - No white or pale empty grounds.
  - No flat-colour surfaces: every surface is a material with light on it (gap list 19).
  - No dead space: every container hugs its content.
  - Never lay content over a logo or over the art's subject.
- **Labels and type:**
  - A company is always labelled with its name and ticker together.
  - One heading face per page, at most three faces in all.
- **Words:**
  - Say trade (not call or prediction), long and short, the close, graded, pool, P&L, W-L.
  - No "coin flip", no "pit wall", and no other jargon this crypto audience doesn't share.
- **Guardrails:**
  - No return promises.
  - "The pool can be wiped out" stays.
  - Be honest about sample size: no "getting smarter" claims on 80 rounds.
- **Motion:**
  - Nothing moves with reduced motion.
  - At most one quiet loop per screen, and only if it carries a fact.
- **Originality:** do not recreate a specific existing cartoon, comic, show or game (its characters, title or look). A tradition, yes; a property, no.

## Report back

A short summary:
- the paths of the four boards;
- the one-line story;
- your spend;
- any checks that failed.

Do not paste long logs.

## ADDENDUM: the story changes (owner, 2026-11-03, while you work)

Owner: "My unverified assumption is that we need to focus more on users not having to track AIs to see how good they are on trading earnings but that we track it so they don't have to. And then focusing on saying you can follow those calls for these companies on Hyperliquid... Think bigger picture."

### The new job of both pages

- The visitor should not have to work out which AI is any good. **We track every trade so they don't have to.**
- The page hands them the conclusion:
  1. who has earned trust so far, on how many trades;
  2. what that model is trading on the next earnings;
  3. where that trade can be followed: the company's market on Hyperliquid, where one exists.
- The competition between the four AIs (the cast, the rounds, the films) stays. It is the **proof and the entertainment wrapper**; it is not the job.
- The record is the receipts: every trade locked before the earnings and graded by the close, checkable.

### The facts that move to the front

- **The verdict, with its sample.** For example: Grok leads, right on 45 of 72 trades (62.5%), +$148,480 on a flat $100K a trade.
  - Say "so far" and give the count. On 72 trades the true hit rate could be anywhere from about 51% to 73%. Never write "proven", "beats the market" or "getting smarter".
- **The next trades, one card per upcoming company.**
  - The top model's trade (long or short), with the other three as the field.
  - Where trades are not in yet: "trades drop before the earnings".
  - Example from the sheet: R85 AMD is in. GPT and Kimi are long; Claude and Grok are short. The top model, Grok, is short.
- **"Follow it on Hyperliquid"**, only for a company that has a market there.
  - The snapshot is `hl-markets-2026-11-03.json` in this folder, taken from Hyperliquid's API on 2026-11-03. It maps each ticker to its markets as `[dex, open interest $M, 24h volume $M, max leverage, delisted]`.
  - Of the 34 upcoming companies, 18 have a market; only 6 have $10M or more of open interest (AAPL, AMD, LITE, CRWV, NBIS, NVDA).
  - Show the market name (for example `xyz:AMD`) and mark thin markets honestly.
  - A company with no market says so, or simply has no follow link.
  - This snapshot is the one input that is not from the sheet. Label it as "Hyperliquid, as of Nov 3".
- **Small print, once per page, plain:**
  - "Simulated record, $100K a trade, before fees. Not financial advice. Trading can lose money; the pool can be wiped out."
  - Hyperliquid is not available in every country. Do not claim it is.

### Each page's new job

- **Overview:** what EZ does for you ("we track 4 AIs on every earnings trade so you don't have to"), the verdict, the next trades to follow, then the proof underneath (cast, record, smart or lucky), then the bet (we put our own pool on the top model's trade: skin in the game).
- **Leaderboard:** "who to follow right now", answered per window, with the receipts behind it; the next trades by the top model.
  - Optional: P&L on Hyperliquid-listed companies only.
  - Today: Grok 21-5 (+$162,920), Claude 21-9 (+$104,540), GPT 14-16 (−$98,780), Kimi 14-16 (−$27,420).
  - Caveat: these are companies listed *today*; most were not listed when the trade was made.

Keep your tradition and your art. Change only the story's order and its emphasis. Update your REPORT with how your take tells this.
