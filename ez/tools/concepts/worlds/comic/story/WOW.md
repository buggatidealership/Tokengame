# The wow round (2026-10-30, evening): go all out in one direction

Read `BRIEF.md` in this folder first (page, data, runner, gotchas, content rules), then the skill `/home/user/Tokengame/.claude/skills/ez-visual-story/SKILL.md` (rule 0, comic first, and the lessons). This file overrides BRIEF.md where they differ.

## What the owner asked for, in their words
"Spin up as many sessions as you want... to do research, to build mockups, so I can go through as many variations as possible when it comes to the design... more accurate, every detail thought out... as long as it's in the American comic book style... try very different ways, because as soon as you try to stick too much to what I'm saying, the improvements are incremental... only when you go out of what I'm saying and actually just say, okay, let me trust my gut, and you just go away and do something amazing, that's always the wow."

What they mean: the site's facts and story stay (four AIs predict a stock's move before earnings; the market close grades them; P&L on a pretend $100,000 each; the P&L leader holds the golden ticket and we bet the pool on its call; NVIDIA is bet #1; the pool can be wiped out), but the **form** is yours. Do not iterate on today's page. Take ONE American comic tradition all the way, as an expert in it would, and redesign the whole Overview in it.

## The job
- Redesign the Overview of `v47-live-x3plus.html` end to end in your assigned tradition: the first screen (headline + the explainer film, which must stay playable and prominent), how one round works, the four AIs as characters, the record of every graded round (films where they exist, a designed state where they don't), what is on tonight / next, the standings, and the bet (NVIDIA, the pool can be wiped out). You may re-order, merge or cut sections if the tradition tells the story better that way; say what you cut and why.
- Research your tradition first (web search: its page grammar, lettering, colour, panel rhythm, printing marks, famous examples; 3 to 6 sources with dates), and write down which conventions you took and why.
- Real data only, from the page's globals (ROUNDS, PENDING, UPCOMING, MODELS, CO_LOGOS, FILMS, `__x2pPnl()`). No invented numbers.
- Method: lay your design over the built page in the browser (hide `main`'s current sections or the whole `main`, inject your own DOM and CSS that reads the globals). Keep the site header and its tabs.
- Comic first (rule 0), compact (no dead space), fun to read AND easy to read. Model names spelled out. Logos never drawn larger than their native pixels at DPR 2. Direction never by colour alone.
- Motion where it means something, nothing moving under reduced motion.

## Deliverables
- Files in `ez/tools/concepts/worlds/comic/story/<your folder>/`; boards `ez/x2p-x3p-wow-<id>-phone.png` (390 wide, full Overview; split into parts named -phone-1, -phone-2... if longer than 7800 px) and `ez/x2p-x3p-wow-<id>-desktop.png` (1280 wide, same rule), plus a short mp4 if motion is part of the idea.
- A one-paragraph pitch at the top of your report: the tradition, the one idea, why it beats today's page for this audience (crypto traders on phones, from X).
- Checks: no sideways scroll at 320/390/1280, no console errors, nothing clipped.
- Do not commit, deploy or publish. Use your own server port; run shots one at a time; clean up temporary frames.
