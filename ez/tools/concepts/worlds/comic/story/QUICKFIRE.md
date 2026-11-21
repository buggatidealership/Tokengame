# Quick-fire round (2026-10-30, late): ten fast, very different versions

Read in this order: this file, then `/home/user/Tokengame/.claude/skills/ez-visual-story/SKILL.md` (rule 0 with its HARD RULES, and lessons 58 to 66), then `BRIEF.md` in this folder (page, data, runner, gotchas). This file overrides both where they differ.

## What the owner wants
The owner will pick one of ten versions "but not entirely", and we iterate outward from it. So this round is about **breadth and speed, not polish**: ten genuinely different answers to one question, each rough but each a complete idea.

**The question:** what does *one round, start to finish* look like when it is drawn to the level of the interior art of a real comic, unfolding from inside the scene, at a pace a human can follow?

Use the same round for all ten so they compare: **R66 Shell (SHEL.L)**, graded at the London close.
- Calls: GPT DOWN 1.5%, Kimi UP 1%, Claude UP 2%, Grok DOWN 1.2%.
- The move: +2.06%. Claude wins, 0.06% off. Two AIs said up and two said down.
- Read every number from the page's globals (ROUNDS, `__x2pPnl()` for each AI's P&L on that round). Never type one.

## The four beats (the narrative the owner liked)
1. **Locked:** before earnings, the four AIs make their predictions on Shell.
2. **The close:** the market answers; the move lands.
3. **Graded:** each call passes or fails. The winner is marked, and so is each AI's money on the call.
4. **Hand-off:** "Round 66 joins the record. Every round stays here." This opens the next section, Every round so far.

- The owner wants a "next" tap or click through the beats, and **one change per beat at reading speed** (lesson 62).
- The motion must explain the fact, the way the films do.
- Things the owner liked: the grading bell, the stamps, and a crown or gold-leaf mark for the overall leader (it arrives once, then stays still), "NVIDIA energy" (Z2), and the KA-BOOM sound effects.

## Art
- The round films are the interior-level art. Pull frames from `ez/media/round-66-shell-hd.mp4` with ffmpeg: the calls are on screen by about 0:07, the market lands at about 0:09 to 0:10, and the crown by about 0:12.
- Write frames to the scratchpad, never to the repo.
- Hand-drawn SVG is welcome where you can do it well.
- The company logo is `CO_LOGOS["SHEL.L"]`. **Never lay anything over a logo or over the art's subject.**

## Your two traditions
Each helper gets two (listed in your prompt).
- Research each one briefly: 2 or 3 sources with dates, its panel grammar, lettering, colour and pacing.
- Take it all the way. Do not make a re-skin of today's page.

## Hard rules (the owner has had to repeat these; a board that breaks one is not shown)
- No white or pale grounds inside a module.
- No dead space: containers hug their content, and gutters are tight. Measure the empty area of each panel and report it.
- Nothing over a logo or over the art's subject.
- No native emoji.
- No Ben-Day or halftone wallpaper as a module background (only as shading, in places).
- Company name and ticker together ("Shell (SHEL.L)").
- No genre claim that is false for the product (no "collect all four").
- Model names spelled out. No long dashes. Plain, short sentences.
- Desktop is judged as hard as phone: the owner called the last desktop boards "brutal". Fill the width with the art and the beats, not with empty margins.

## Deliverables (quick)
- Files go in `ez/tools/concepts/worlds/comic/story/qf/<your id>/`. Ids are q1 to q10.
- One board per take: `ez/x2p-x3p-qf-<id>.png`.
  - Top row: the four beats at 390 wide (one phone frame each, 390x844 at DPR 1 is enough, or DPR 2 scaled down).
  - Below: one 1280x800 desktop frame of beat 3.
  - The label strip says the take's id, its tradition and its one-line idea.
- Lay your design over the built page `ez/v47-live-x3plus.html` (keep the site header), or make a standalone HTML file that loads the page's data. Either is fine; this is a mockup.
- Use your own server port (from your prompt).
- Do not commit, deploy or publish. Clean up temporary frames.
- **Report:**
  - per take, a pitch (two lines);
  - how each beat's motion would explain its fact (one line per beat);
  - the hard-rule checks with numbers (empty area per panel, white area, overlaps with logos);
  - what you could not do.
