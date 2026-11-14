# H47 · saturday: the season as a Saturday-morning TV show

## The tradition
The American Saturday-morning TV cartoon, 1960s to 1980s:
- gouache backgrounds painted on board: sponge texture, dry brush, lumpy clouds, fan-shaped trees;
- flat cel characters on top, each with one hard shadow tone and an ink line;
- title lettering brushed over the painting's open sky;
- one eye-catch reused at every act break: a painted ribbon in the sky (a wide repaint on desktop);
- a dawn title card bookended by a dusk end card.

No show, character or title is copied.

## How the take tells the new story

**Overview, in order:**
1. **Title card.** A town of money at sunrise, lettered "Four AIs Trade Earnings · Season 1 · Week 9".
   - The announcer's line: "We track four AIs on every earnings trade, so you don't have to."
   - "Starring GPT · Claude · Grok · Kimi", names only.
2. **The score so far.** The painted golden ticket is printed "Top model so far: Grok. Right on 49 of 76 trades · 64.5%. +$162,950 at $100K a trade."
   - Under it: "So far is the word. On 76 trades, Grok's real hit rate could be anywhere from about 53% to 74%. A lead, not a proof." (a Wilson 95% range).
   - The field as three small plates.
3. **Coming up this week: Grok's next trades.** One card per company.
   - The top model's trade is a gold strip; the other three sit under it as "the field".
   - "Follow Grok's short on Hyperliquid", with `xyz:AMD · $17.9M open interest`.
   - A market under $10M is marked "thin market"; a company without one says "No Hyperliquid market".
   - Then the next companies that do have a market, and a count of the rest of the schedule. Labelled "Hyperliquid, as of Nov 3".
4. **Eye-catch "The receipts / Previously on…".** Round 70 Eli Lilly (LLY) on a painted 1970s TV, paused where the trades are in; a tap plays it.
   - Beats: the trades, the close (+6.57%), graded at $100K a trade with W/L stamps, then "Kimi was the only one right… There have been 84. Here is the cast."
   - Rule: the newest round with a film where exactly one AI was right and the move was 10% or less.
5. **Act one: Meet the cast.** The owner's founders redrawn as cels over painted sets in the model colours.
   - Each card has the lettered name, a cel flag pennant, season P&L and W-L, and one trait from the data ("Short on 67 of 76 trades").
6. **Act two: Every round so far.** An episode guide: each poster sits on a CRT-shaped screen over a painted caption plate.
   - The plate carries the round, Company (TICKER), the move, and who won ("Nobody won" when all four were wrong); a key line explains "Won".
   - 12 rounds show on a phone, 15 on desktop, with "Show all 84 rounds"; a tap plays the film.
   - Rounds with no film yet (R81 to R84) show their logo on a card in the brand's colour, with no "film soon".
7. **Act three: Smart or lucky?** "84 rounds, 328 trades… too few to say it is skill either way."
   - The hit rate is projected on a screening-room screen, every line starting at 50%.
   - The P&L is in coloured chalk on a classroom board, from $0.
   - On desktop the two boards are the same height.
8. **Act four: The cliffhanger.**
   - The pool is a chest teetering on a canyon ledge, with "69%" on its brass plate.
   - The signpost planks read "Bet #1 / NVIDIA", "At the close / Nov 18" and a live countdown.
   - Under it: "We put our own pool on the top model's trade", the Right and Wrong plates (the wiped-out line stays), the freeze time, "To be continued…", and "NVIDIA is the first bet, not the last."
9. **End card.** The same town at dusk, "Next time on…", "The next close grades the trades on AMD (AMD)", and a button to the Leaderboard.
   - The small print sits once, in the footer. It includes "Not financial advice" and "Hyperliquid is not available in every country."

**Leaderboard:**
- **The scoreboard.** A hand-operated scoreboard at a ball field. The standings are slot-in plates on the painting's own slot rows: rank, mark, name, and P&L or hit rate. The leader's plate is gold. The plates flip when a setting changes (not with reduced motion).
- **Switches, each with a cel bulb that lights for the one in use:**
  - Rank by: P&L / Hit rate
  - Window: Season / 7 days / 24 hours
  - Companies: All / On Hyperliquid
- **The answer.** A golden ticket for the window's top model, with its sample and range.
  - The golden-ticket rule is always stated: season P&L, board frozen Tue Nov 17, 4 PM New York, 24 hours before the bet.
  - With the Hyperliquid filter on: "Most were not listed when the trade was made."
- **The receipts.** One plate per model:
  - P&L for the named window;
  - Last 5, old → new, newest ringed;
  - W-L and hit rate;
  - P&L at the last close.
- **The chart.** P&L (or hit rate) over time, sign-painted on the board, at equal height beside the receipts on desktop.
- **Next trades.** The window's top model's next trades, the same card as the Overview.
- **By sector.** Trades won of trades made, best in each row ringed.
- **Biggest W and L.** Per model: logo, Company (TICKER) and amount.
- **Empty 24-hour state.** "Nothing graded in the last 24 hours. Last close: …", with dashes in the figures.

## Faces
Three: Caprasimo for every lettered title (the one heading face), Lilita One for numbers and plate labels, Fredoka for narration.

## Checks (my own pages, Playwright, 320 / 390 / 1280)
- **Sideways scroll:** none; scrollWidth equals clientWidth everywhere. A 320 overflow on cast cards and receipt rows was found and fixed.
- **Clipped text in plates:** 0.
- **Dead space:** no empty band beyond the painted border in next-trade cards, cast cards or captions; the measured list is empty at all three widths. Fixed on the way:
  - unequal cast rows;
  - a single in-card on desktop (now reads left to right);
  - a half-empty 3-column grid;
  - the verdict's column gap.
- **Alignment:**
  - Receipt cells share one grid: 0.00 px x-spread across rows (was 0.83 px).
  - P&L right edges: 0.00 px spread.
  - Scoreboard slot pitch is equal: 33.16 / 40.47 / 63.78 px; slot text is centred to 0.01 px.
  - Plank text is within 0.5 px.
  - The 69% plaque is off by 0.5 to 0.94 px (it is rotated 7°).
- **Repeated geometry:** cast pictures are identical sizes. Every plate is one painted master used as a 9-slice, with a gold variant.
- **Words:** no "call", "pot", "volume" (outside a code comment), "prediction", "coin flip", "pit wall", "proven" or "getting smarter" in copy. No emoji.
- **Generated art:** no words or numbers; every prompt ends with the no-text line and every final was checked by eye. The round posters are the owner's films.
- **Surfaces:** every ground is painted gouache board multiplied with the chapter colour and lit from the top left. The Leaderboard ground is painted green wood. Cel badges and flags are flat paint plus one shadow tone, a gloss and an ink line, as cels are.
- **Motion:**
  - The countdown's seconds: minutes only with reduced motion.
  - A one-time chart draw-in: never repeated on redraw, falls back after 5 s, none with reduced motion.
  - The plate flip only on a press; films only on tap.
- **Not run:** iOS Safari, contrast measured per element, a 5-second test with strangers.

## Data
- **Hyperliquid-listed figures:** these only match the brief (Grok 21-5 +$162,920 …) when an exchange suffix is dropped for the lookup (ASML.AS → ASML). After the sync the page shows Grok 23-5 +$166,470 on listed companies, as the other four takes do (the helper's own note said 22-5 +$165,240, read mid-sync; checked on the page).
- **Bet date:** uses the live page's own `EZ5_BET` rule, copied unchanged. It gives Wed Nov 18 at the close, matching the live card.
- **Oddities:**
  - R46 Verizon has no SECTOR.
  - R104 Berkshire Hathaway has a past call date, no trades and no resolution date.
  - R96 Nintendo has no resolution date.
  - On 7 days Claude and GPT tie at 16 of 27; Claude goes first on P&L.

## Hedra: $2.43
gpt-image-2, 38 jobs; every charge matched its estimate (`log.jsonl`).

| Batch | Settings | Cost |
|---|---|---|
| 18 roughs | low 1K | $0.17 |
| 4 cast cels | high 1K, founder still plus one style ref | $0.68 |
| Title card, 3:4 and 16:9 | high 2K | $0.50 |
| Cliff | high 2K | $0.27 |
| TV, screen, chalkboard, ticket, scoreboard 3:4 | medium 2K | $0.34 |
| Two dusk end cards | medium 2K | $0.15 |
| Scoreboard 16:9 and wide ribbon | medium 2K | $0.14 |
| Ribbon 16:9 | medium 2K | $0.06 |
| Plate, wood and paper textures | medium 1K | $0.14 |

## Research used
- Yowp, "Gentle Backgrounds": sponge-painted stone; layout and background as separate steps.
- Animation Resources, Art Lozzi biography: the shared "fast and simple" house style.
- Wikipedia, Limited animation: held cels, reused cycles, pans.
- Typographica, "The Golden Age of Cartoon Lettering": title cards in gouache, the large lettering brushed, at about 9 × 12 in.
- *Original Cartoon Title Cards* (cited in search results, not read): painted cards had nearly gone by the 1970s.

## Next
- A limited-animation loop on each cast cel (a held cel with a blink or a mouth flap, from Hedra image-to-video): the single quiet loop for Meet the cast.
- Repaint the TV with a square screen, so the round's film fills it.
- Repaint the scoreboard with four wide slot rows.
- A painted "TV listings" page for Upcoming.

## Process note
- **Scratchpad collisions:** other helpers share the session scratchpad, and my early test files there collided with theirs. I may have overwritten a `scratchpad/sat/d.js` that belonged to another helper. Later work went to `scratchpad/saturday-h47/`.
- **Disk space:** the disk filled once (ENOSPC). I freed space by deleting only my own intermediate files.
- **Scope:** nothing was deployed, published or committed. Only the four boards were written outside my folder.
