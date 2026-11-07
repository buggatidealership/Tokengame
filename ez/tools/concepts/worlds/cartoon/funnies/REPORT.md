# H47 · funnies: the EZ paper's colour comics and its sports page

**Tradition:** the American Sunday funnies:
- four-colour process printing on newsprint, with Ben-Day tints a hair off register;
- hand lettering in balloons and caption boxes;
- strips behind a title panel, under a dated section masthead;
- the half-page feature strip.

The Leaderboard is the same paper's sports page, on green newsprint like a sports final, with agate box scores and a cartoon by the paper's sports cartoonist.

**Files:**
- `overview.html` and `leaderboard.html`;
- `data.js` (all numbers, computed from `ez-data.js` at render time);
- `charts.js` (inked line charts);
- `common.css` (paper, tints, lettering);
- `fonts/` (local copies of Ultra, Comic Neue and Source Serif 4);
- `img/` (the Hedra art);
- `shot.js` (board renderer);
- `gen.py` and `jobs-*.json` (Hedra runs).

## The story, one line each (after the addendum)

- **Overview:** "We track 4 AIs on every earnings trade, so you don't have to." The order:
  1. **The verdict, so far.** The leader's face says "Right on 49 of 76 trades so far, +$162,950 on a flat $100K a trade".
  2. **How sure is that?** A printed range bar for the leader: 30 to 90%, with the band about 53 to 74% (a 95% Wilson interval), the pin at 64.5%, and 50% marked "half right". The text says "Too few to call it skill."
  3. **The field, on the same scale.** The other three, each with its own range bar, so the overlap shows.
  4. **What Grok trades next.** One card per company:
     - the leader's mark with a LONG/SHORT balloon, the other three as the field;
     - a newspaper clip-out coupon: "Follow it on Hyperliquid · xyz:AMD · $17.9M open interest", "thin market" under $10M, or "No Hyperliquid market";
     - companies whose trades aren't in say "trades drop before the earnings";
     - the source line: "Hyperliquid, as of Nov 3", and "not available in every country".
  5. **The proof, as the comics:**
     - the cast;
     - how a round works, on R80 Exxon Mobil;
     - the last five nights;
     - every round, as film-poster tiles with "Show all";
     - smart or lucky: two inked charts.
  6. **The bet,** as the half-page night feature. It opens "Skin in the game. We put our own pool on the top model's trade."
- **Leaderboard (sports page):**
  - the headline "Who to follow right now: Grok", with its sample and range in the deck;
  - a "Who to follow · <window>" bar driven by the Season / 7 days / 24 hours and P&L / hit rate switches;
  - the agate standings, as receipts;
  - the window leader's next trades with their Hyperliquid markets;
  - "If you had followed on Hyperliquid": the what-if with its caveat;
  - the P&L (or hit rate) chart, the golden ticket cartoon, the last close's box scores, sectors, and the biggest W and L.
- **Small print,** once per page, in the brief's words.

## Research pass (sources)

- **Colour.** Sunday colour was mechanical separation: four hand-cut zinc plates, Ben-Day screens, numbered tint charts, about 85 lpi with dot gain on newsprint. Hence the coarse dot screens on toned paper, slightly off register.
  - Legion of Andy, "Ben Day Dots" parts 6 to 8: legionofandy.com/2016/03/04/the-history-of-ben-day-dots-part-6-letterpress-printing-1890s-early-sunday-comics/
  - Straight Dope thread on newspaper comics dots.
  - Jim Ivey's Sunday comics, Stripper's Guide: comicstriphistory.com/2009/01/jim-iveys-sunday-comics_25.html
  - printinghistory.org/?p=15387
- **Layout.** Sunday strips were drawn to one standard layout so papers could drop or re-tier panels, with the title (or "throwaway") panel on the top tier. Here the desktop is the half page and the phone is the tabloid reformat: the same panels re-tiered, the title panel turned into a band.
  - en.wikipedia.org/wiki/Comic_strip_formats
  - mutts.com, "How to read a comic strip"
  - comicskingdom.com, "drop panels"
  - startrekcomics.info, "the missing Sunday panels"
- **Lettering.** Ames-guide strip lettering: uniform capitals, even spacing. Hence Comic Neue Bold in capitals.
  - comicsbeat.com, "antique comics production tools 2: the Ames lettering guide"
  - mikelynchcartoons.blogspot.com, 2020/07
- **Sports cartoon.** The sports cartoonist mixed caricature, doodles and lettered commentary (Willard Mullin is the model). Hence the pen-and-wash golden-ticket cartoon with a mugshot inset and a lettered tag.
  - en.wikipedia.org/wiki/Willard_Mullin
  - bobstaake.com/willardmullin
- **Originality.** No existing strip, character, title or masthead is recreated. "Funnies" is the genre word.

## Facts → carriers

| Fact | Carrier |
|---|---|
| What EZ does | the masthead premise caption; the bull (long) and bear (short) hold the "THE EZ. FUNNIES" banner |
| Who has earned trust | the verdict strip: the leader's face and balloon, the field on the same scale |
| Sample and honesty | a printed range bar per model; "Too few to call it skill" |
| Next trades | a card per company: brand band and logo, the leader's LONG/SHORT balloon, the field as three marks |
| Where to follow | the clip-out coupon (market name and open interest; "thin" under $10M; "No Hyperliquid market"); the source and country line |
| Cast | four portrait panels: model-colour name plate, printed lab flag, season P&L and W-L on a caption band; the title panel counts the flags (3 US, 1 China) |
| How a round works | four panels on R80 Exxon Mobil (the newest 2-2 round with a film): LONG/SHORT balloons; the closing bell with the move as a sound effect; a big W or L over each face with its P&L; the film poster and the closest trade |
| Latest rounds | the last five nights: a date panel with the count big, the three biggest companies' posters with stubs (name, ticker, move, winner or Nobody), and a gag panel where the best model cheers, the worst despairs, and the tally shows all four |
| Every round | poster tiles with a "Show all" button; no-film rounds show their logo on the brand colour, "Film coming" |
| Smart or lucky | two inked charts on printed graph paper: hit rate after every trade ((right + 1) / (trades + 2), every line starting at 50%), and P&L at a flat $100K; each line ends on its model's face; no verdict |
| The bet | <ul><li>title panel: Bet #1, the NVIDIA mark, "At the close · Wed, Nov 18";</li><li>a rooftop water tower stencilled POOL, with "69% of $EZ creator fees fill the pool";</li><li>a brass countdown machine with live digits in its four painted windows;</li><li>the golden ticket printed with the leader's name and season P&L, "The board freezes 24h before NVIDIA reports";</li><li>the leader's balloon "My trade decides it: long or short";</li><li>right: the coin fountain; wrong: the cracked tower;</li><li>"NVIDIA is the first bet, not the last", with new towers at dawn and "Continued in Season 2".</li></ul> |
| Leaderboard | <ul><li>nameplate, "Final" and the last close;</li><li>"Who to follow" bar;</li><li>agate standings: Last 5 as W/L boxes, old to new; W-L, hit rate and P&L each naming its window; last-close P&L;</li><li>the painted golden ticket on the season leader's row;</li><li>box scores, the sector table with the best ringed by hand, Biggest W and L, the HL what-if.</li></ul> |

## Checks run (Playwright, on the built pages after the sync)

- **No sideways scroll.** scrollWidth equals clientWidth at 320, 390 and 1280 on both pages.
- **Faces.** Exactly three render: Ultra (the one heading face), Comic Neue Bold and Source Serif 4.
- **Alignment.**
  - Countdown digits are within 0.00 to 0.01px of their painted windows' centres.
  - Standings W-L and hit rate labels are within 0.41px (320) and 0.01px (390, 1280) of their values; P&L and last-close right edges are within 0.00px.
- **Dead space** (largest empty vertical run per panel or box):
  - Leaderboard: none over 48px at any width.
  - Overview, what remains:
    - "How sure is that?": 54px of 227 to 300;
    - two desktop title panels: 54px and 64px of 300 to 310;
    - three logo-fallback tiles: 58px of 276.
  - The first boards had runs up to 145px; those were fixed.
- **Windows.**
  - 7 days: 31 rounds (Oct 28 to Nov 3).
  - 24 hours: rounds graded at their own exchange's close, no fallback. Before the sync it printed "No round graded in the last 24 hours · last close Fri Oct 30"; after it, the four rounds of Tue Nov 3.
  - The switches run without errors.
- **Reduced motion:** `getAnimations()` is 0 on both pages. The countdown is the one loop and updates once a minute there. Chart lines draw in once, never with reduced motion.
- **Words and guardrails:** no emoji, no "coin flip", no return promises; "The pool can be wiped out" stays.
- **Art:** no text in the art. Every word is page text on a painted surface or in a balloon or caption. Nothing is laid over a logo or a face.
- **Not checked:** iOS Safari.

## Hedra spend: $1.24 of $5.00

All gpt-image-2, medium 1K, logged in `log.jsonl`:

| What | Count | Cost |
|---|---|---|
| Roughs | 3 | $0.10 |
| Cast poses (neutral, W and L per founder, with the founder stills as refs) | 12 | $0.80 |
| Scenes and props | 8 | $0.34 |

The scenes and props: the closing bell, the tower with a blank plate, the cracked tower, the coin fountain, towers at dawn, the countdown machine with blank windows, the blank golden ticket, the pedestal sports cartoon, and the bull-and-bear masthead. One 502 was retried, not charged. The rough `r1-sheet-claude.jpg` is unused.

## Next

- 2K repaints of the cast heads.
- Painted fallback art for rounds without a film.
- More gag poses (a shrug for a flat night).
- Hand-lettered labels on the range bar.
- Test on iOS Safari.

## Data oddities

- **Mid-work sheet sync** (ez-data.js rewritten at 21:20 UTC). It graded R81 Palantir −1.65% (Grok), R82 Apple −1.9% (Grok), R83 Pfizer −2.18% (GPT) and R84 Shopify −8.74% (Claude).
  - Before the sync my figures matched the brief exactly: +$148,480 45-27, +$102,950 48-32, −$56,930 43-37, −$70,650 37-43. The HL what-if matched too: 21-5 +$162,920, 21-9 +$104,540, 14-16 −$98,780, 14-16 −$27,420.
  - The boards show 84 rounds: Grok +$162,950 49-27, Claude +$109,760 50-34, GPT −$63,240 45-39, Kimi −$85,120 37-47.
- **R81 to R84 have no film,** so "every round has a film" no longer holds; their tiles show a logo fallback.
- **Ticker lookup.** The brief's HL figures used an exact-key lookup, else the ticker without its exchange suffix (ASML.AS → ASML), with no aliases (TSMC → TSM, 005930.KS → SMSN, 000660.KS → SKHX). I kept that rule; adding the aliases would change the what-if.
- **BRK.B (row 104)** is dated 11/2/26 with no trades. It is left out of "Next to report".
- **Rows 96 (NINTENDO) and 104 to 114** have no resolution date.
- **Bet time:** `x2p_more.js` `betAt()` copied verbatim, giving Wed Nov 18 at 21:00 UTC.
