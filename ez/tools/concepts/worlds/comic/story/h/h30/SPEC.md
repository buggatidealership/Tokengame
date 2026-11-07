# H30 · The page from first principles (spec v3, 2026-11-02)

The owner's critique of H29 (the director's cut): it re-assembled the picked parts and never asked
whether the chip world and the palette are right; How a round works still spans two phone screens;
Every round so far looks the same; the film should sit at the top or be an obvious option.
Research behind this spec (read both before building):
- `ez/research-h30-products.md` (comparable products, the trenches audience, receipts, CA)
- `ez/research-h30-perception.md` (eye on a phone, frame budget, colour meanings, type, worlds)
And the skill `.claude/skills/ez-visual-story/SKILL.md` (rule 0's hard checks apply to every board).

## The job of the page (derived)
A trench trader lands from X assuming the coin is dead and the site is a scam. In about 3 seconds the
first frame must say: **four AIs compete on real earnings, live, in public, and the record is checkable.**
Then, one frame each: how a round works, who is winning, every round so far (the receipts), are they
any good, what is at stake (Bet #1: NVIDIA with the pool), follow for the next round.
Goal: X follows now, coin buys after launch. Polish proves nothing in this category; a dated,
checkable record does.

## Hard constraints (all three concepts)
1. **One phone frame per section** (390 x 664 visible, 358 px column). Measure it. Total page about
   8 frames (today ~6,100 px). How a round works: all four steps inside ONE frame.
2. **The film (1:20, `media/ez-landing-v4.mp4`, poster `ez-landing-v4-poster-ez.jpg`) is at the top**:
   on the first frame, either playing area or a big obvious play target, not a small button.
3. **Per frame:** one focal thing, at most four chunks, about 40 words, at most one mover and only if
   it carries a fact. No fact only on a scroll-triggered reveal.
4. **Colour has one meaning each** (logo proportions): black ground; cream every word; green = right /
   profit / up only; red = wrong / loss / down only; gold = #1 and what #1 decides, once per screen.
   Every coloured figure also carries a sign, W/L, arrow or rank. No white or pale grounds.
5. **Three typefaces** (one heading face, one display-number face with fixed-width digits, one text
   face with tabular figures). Sentences never in capitals.
6. **Words:** "trade" for what an AI does each round; the market close grades; "pool"; the bet copy
   "69% of $EZ creator fees fill the pool. We bet the whole pool on NVIDIA, based on the #1 AI's
   prediction." (SIM.poolShare); "NVIDIA is the first bet, not the last." Guardrails: no return
   promises, "the pool can be wiped out" said once. No "presale", no airdrop.
7. **Data** only from `ez/ez-data.js` and `window.__x2pPnl()`-equivalent maths (flat P&L: $100,000 x
   direction x move per call; P&L = sum). Never type a number by hand. Today: 80 graded rounds or
   whatever the file says; compute it.
8. **Receipts:** a place for "posted on X before the report" (link to the account until per-round post
   links exist; do not claim a per-round link we do not have). After launch: the full contract address
   with copy, "any other address is fake". Before launch: "Not live yet" plainly.
9. **End on Follow on X** with a dated reason (the next close's day and companies from the data).
10. Phone 390 and 320, desktop 1280 and 1536. Desktop is its own composition, not a stretched phone.
11. Hand-tuned shapes, painted layers from Hedra where a picture is needed (key in `HEDRA_API_KEY`,
    see `ez/hedra/REPORT.md`; budget up to $20 per concept). Words and numbers are always page text,
    never baked into a painting; a painting that must carry a word is painted with a blank surface for it.

## Three concepts (each genuinely different; none is a re-skin of today)
- **A · Fight night broadcast.** The season is the fight card, each round a bout, long and short are
  the corners, the closing bell grades, "Closest" is the decision, #1 holds the golden ticket and
  calls the main event (Bet #1: NVIDIA). System: sports broadcast graphics on a black stage
  (scorebug, tale of the tape, the card). Chips stay only as the cast and the prize (black solder
  mask, silver leads, gold for #1 only).
- **B · The chip world, corrected.** Keep the world the owner built (chips, the NVIDIA chip, founder
  loops in the dies) but apply the research: black boards, no green surface, gold only on #1, no rim
  lights without a fact, one mover per screen. This is the control: what "keep it" looks like done right.
- **C · The live race (record first).** No themed world: the product is the record. First frame =
  what it is + the four-model P&L race as one live chart (Alpha Arena's lesson) + the film as the big
  play target; every section a broadcast-plain data card in the logo's colours and the EZ. mark's
  slashes; receipts and freshness ("graded 2h ago") everywhere. Tests whether the comic world is
  needed at all.

## Deliverables per concept (folder `h/h30/<a|b|c>/`)
- A standalone mockup page `index.html` (served from `ez/` so it can load `ez-data.js` and media),
  real data, working film play.
- Boards: `ez/x2p-h30-<x>-390.png` (each section's frame side by side, the 664 line marked),
  `-320.png`, `-1280.png` (full page), and one `-first.png` (the first frame at 390, 3x).
- `REPORT.md`: the story per frame, measured heights per section at 390 (each <= 664), word counts
  per frame, movers, colour audit (every gold/green/red use and its meaning), what could make it fail.
