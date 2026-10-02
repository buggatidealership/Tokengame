# Brief: "unfolding" story pages (round 7, 2026-10-02)

Three new standalone pages that tell the EZ story step by step, so a complicated idea lands for someone
who doesn't read much. Same data and facts as the Season page (`v15-season.html`); a different way of
walking through it. Each page is its own file: `v16-keynote.html`, `v17-playground.html`, `v18-chat.html`.

## Why "unfolding" (the research we lean on)
- Working memory holds about **four chunks** at a time (Cowan 2001). So: one idea per screen, at most
  ~4 elements on screen at once, and each step builds on the last.
- People learn better from **words + pictures** than words alone, and better when **extra words are cut**
  (Mayer: multimedia + coherence principles). The visual carries the idea; text is a caption.
- **Motion grabs attention involuntarily** (peripheral vision, bottom-up). Use it to point at the one thing
  that matters on each step, never as background decoration. Anything that moves for >5s needs a pause
  (WCAG 2.2.2). Respect `prefers-reduced-motion` everywhere.
- Scrollytelling helps engagement and perceived clarity; it does not by itself create trust. **The record
  creates trust**, so real data (rounds, calls, outcomes, standings) must appear in the story, live from
  `ez-data.js`.

## The story (beats, in order; adapt wording to each page's voice)
1. **Hook.** Every coin is the same: buy, stare at the chart, hope. Nobody roots for anything.
2. **The game.** Before a company reports earnings, four AI models (GPT, Kimi, Claude, Grok) each call it:
   up or down, and by how much.
3. **The judge.** The market answers. Graded at the first market close after the report, using the closing
   price from TradingView, so no AI can make up the outcome. Nothing is ever edited.
4. **How a round is won.** Direction first (wrong way, you're out). Then size: closest to the real move wins.
   Nobody right, nobody wins.
5. **The record so far.** Live: rounds graded, standings, a real round shown in full (e.g. the latest graded
   round's calls vs the outcome). Use the round films (`ez/media/…`, via `FILMS`) where it fits.
6. **Are they learning?** Honest: share of right calls vs a coin flip, and the fact that "always up" is the
   bar to beat (compute it from the data; say it plainly if the models are behind it).
7. **The machine (the buyback).** $EZ trades pay fees. 69% go into the pot (31% runs the lab: placeholder,
   the owner still has to confirm). One AI bets the pot on earnings, on Hyperliquid, long or short, first
   target NVIDIA. A win buys back $EZ. A loss drains the pot, and trading refills it.
8. **The dream (as a question, never a promise).** What if it hits 70%? 80%? We're about to find out.
9. **The road.** Calls on the record → Launch (at ~35 rounds; show live progress `graded of CONFIG.launchAt`)
   → Cover the AI bills → More models → Runs on autopilot → The best model shows its thinking.
   Each step unlocks when trading volume pays for it.
10. **Get $EZ** — once, at the end, quietly (contract address appears only at launch; `CONFIG.ca`).

## Hard rules
- All numbers come from `ez/ez-data.js` (`ROUNDS`, `PENDING`, `UPCOMING`, `LADDER`, `FILMS`, `PREFILMS`,
  `CONFIG`, helpers like `logo()`, `fmtDate()`, `coMark()`). Never type results by hand.
  Load it with `<script src="ez-data.js"></script>` (pages live in `ez/`, media in `ez/media/`).
- Do not edit any existing file (`v1`… `v15*`, `ez-data.js`, `ez-learn.js`, tools). Create only your own page.
  You may load `ez-learn.js` read-only if a chart from it helps.
- Copy: no long dashes; plain, short sentences. Tickers as "Micron (MU)" (no $); only $EZ keeps its $.
- Legal guardrails: no promises of price, returns or buyback size. The pot can be wiped out; say so.
  "Not financial advice" once, in the footer. No "holders get paid" framing.
- Never expose the PROMPT column or prompts.
- Phone first (390px), then desktop (1280px). No horizontal scroll. WCAG AA contrast for text.
- External scripts only from cdnjs.cloudflare.com, cdn.jsdelivr.net/npm, unpkg.com; stylesheets only from
  Google Fonts. No other network calls.
- `prefers-reduced-motion`: everything readable without animation.
- No console errors.
