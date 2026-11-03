# H47 · rubberhose: a night at the EZ picture palace

## Tradition
The American theatrical cartoon short of 1928 to 1935, and the art-deco picture palace that showed it. An original world: no studio, character, title or game is copied, and the well-known 1930s-style game's look (cups, casino, boss fights) is avoided.

- The cartoon: rubber-hose limbs, pie-cut eyes, white gloves, an early three-strip print palette, film grain.
- The theatre: proscenium, velvet, lobby cards, glass lantern "advance slides", the Academy leader, the marquee with changeable letters, the lobby felt letter board.

## How the addendum's story is told
- **The cover leads with the job.** The projected title card reads "Four AIs trade earnings · We track every trade so you don't have to. Each one is locked before the earnings and graded by the close. $100K a trade · simulated".
- **I · Top of the bill: "Who to follow, so far".**
  - A golden ticket reads: Grok, right on 49 of 76 trades · 64.5%, +$162,950 P&L at $100K a trade.
  - An intertitle gives the sample: "76 trades is a small sample. Grok's real hit rate could be anywhere from about 53% to 74%. We keep counting." The range is a live 95% Wilson interval.
  - The rest of the field sits on brass strips.
  - On the Leaderboard this verdict follows the window. Under 20 trades it says "N trades is far too few to judge anything yet."
- **II · Coming attractions: "Grok's next trades".**
  - Each company with trades in is a glass lantern slide: company (ticker) on the label, logo in the lit window. The headliner's trade is the big figure ("Short 2.5%"), with the other three as the field below.
  - A brass plate under each slide reads "Follow on Hyperliquid: xyz:AMD · $17.9M open interest". It says "thin market" under $10M, and "No Hyperliquid market" when none exists.
  - Companies whose trades are not in yet hang as small slides under "Then: trades drop before the earnings".
  - A source line under the slides reads "Hyperliquid markets as of Nov 3. Thin = under $10M open interest. These are the AIs' trades, not our bet."
- **A hand-off intertitle:** "Why Grok? Here are the receipts: the cast, every round, and the record over time."
- **III · The acts, "Meet the models".** The four founders are redrawn rubber-hose (Hedra, with the owner's founder stills as refs), each in a spotlight of its model colour. Each sits on a brass nameplate with model name, version, flag pin, Season P&L and W-L, billed Act I to IV by season P&L.
- **IV · The shorts, "Every round so far".**
  - A lobby set on the walnut wall: the newest round as the title card, then 6 scene cards on phone and 8 on desktop.
  - Each card has the film poster, company (ticker), the move in green or red, and "Won by" with the model marks (a tie shows both, otherwise "Nobody").
  - Then "The whole reel": a film strip of every round, edge-printed with round, company (ticker), move and winner.
- **V · The newsreel, "Smart or lucky?".**
  - Intertitle: "We tracked every trade so you don't have to… 84 rounds is too few to tell skill from luck."
  - Two charts projected on the painted screen: the hit rate as (right + 1) / (trades + 2) from 50%, and the P&L from $0.
- **VI · Feature presentation, the bet.**
  - A deco title card: "Bet #1: NVIDIA · At the close · Nov 18".
  - The countdown sits in an Academy-leader circle. Its sweep turns once a minute: the page's one quiet loop, and it carries the seconds.
  - "Our own skin in the game. The top model's trade decides long or short: today that is Grok. The board freezes 24 hours before NVIDIA reports."
  - A painted strongbox with "69%" engraved on its plate, beside "of $EZ creator fees fill the pool".
  - Right and Wrong sit on green-tinted and red-tinted intertitles; "Wrong: The pool shrinks or can be wiped out" is kept.
  - Season 2: "NVIDIA is the first bet, not the last. Season 2 ups the stakes."
- **Small print, once per page:** "Simulated record, $100K a trade, before fees. Not financial advice. Trading can lose money; the pool can be wiped out. Hyperliquid is not available in every country."
- **The Leaderboard.**
  - **First screen:** "Who to follow right now" heads it.
    - Marquee rows in black changeable letters on the lit reader board (desktop pairs it with the painted theatre front).
    - A brass plate names the window, e.g. "Season · ranked by P&L".
    - Box-office push buttons: P&L or Hit rate, and Season, 7 days or 24 hours.
    - The window's verdict sentence and the golden ticket ("Top model by season P&L. The board freezes 24 hours before NVIDIA reports, and the holder's trade is the bet.").
    - "Grok's next trades" and "Only Hyperliquid-listed companies" (Grok 23-5 +$166,470 on 84 rounds, with the caveat that most were not listed when traded).
  - **Then the receipts:**
    - The tally on the felt board: Last 5 marked old to new, W-L, hit rate, P&L for the window, and P&L at the last close.
    - The P&L or hit-rate chart on the screen, following the window.
    - By sector, with a gold ring on the best in each row.
    - Biggest W and L, each with logo, company (ticker), round and amount.

## Measured checks (Playwright, at 320 / 390 / 1280)
- **Sideways scroll:** 0 on both pages at every width. The 320px Leaderboard first scrolled 13px; fixed.
- **Faces rendered:** exactly three, Limelight (every heading), Oswald (numbers and labels) and Old Standard TT (narration).
- **Emoji:** none. The ★ glyph was replaced with a drawn SVG star.
- **Words:** grepped the rendered text for call, pot, coin flip, pit wall, prediction, proven, beats the market and getting smarter. None found.
- **Overflow:** no text clips and nothing escapes its card at any of the three widths. The reel's "(IBK…" truncation was fixed, so name and ticker stay together.
- **Dead space:** no caption card, letter board, lobby band, plate, strip or follow plate has more than 24px empty under its content. Fixed on the way: desktop lobby bands that stretched 42px and then 252px, and a 39px gap in the "Right" ending at 320.
- **Alignment (max deviation in px):**

| Check | 320 | 390 | 1280 |
|---|---|---|---|
| Marquee letters centred on their painted rows | 0.01 | 0.01 | 0.01 |
| Golden ticket text in its painted panel | 0.00 | 0.02 | 0.02 |
| Slide label text on the painted label | 0.01 | 0.01 | 0.00 |
| Projected title on the screen (H / V) | 0.00 / 0.02 | 0.00 / 0.02 | 0.00 / 0.00 |
| Sector cells under their headers | 0.01 | 0.01 | 0.01 |
| Sector cells, equal width | 0.00 | 0.00 | 0.00 |
| Tally header labels on their values (desktop only) | n/a | n/a | 0.00 |
| Four act cards, same width and height | 0.00 | 0.00 | 0.00 |
| Lobby cards, same size | 0.00 | 0.00 | 0.00 |

  - At 320 the act cards were first 19.8px apart in width, then 17px in height; both fixed.
- **Surfaces:** every surface is painted or a textured material with light.
  - Painted: house, curtain, walnut lobby, marquee front and face, felt board, ticket, strongbox, screens, title cards, intertitles, slides.
  - Brass is the painted gold leaf with light and bevel; bands and the film strip are grain-textured printed stock.
  - No white grounds. The only cream areas are the lantern windows and labels, and they hold a logo or lettering.
  - Nothing is laid over a logo or over a painting's subject.
- **Motion:** one loop (the leader sweep), and the chart lines draw in once. Nothing moves with reduced motion; the boards were shot that way.
- **Bet date:** ported verbatim from the live page's `EZ5_BET` (routes.js). The live card read "15 days, 0 hours, 12 minutes · At the close · Nov 18" at 20:47 UTC; mine targets the same 21:00 UTC on Nov 18.

## Hedra spend: $1.196 of $5.00
All jobs ran on gpt-image-2, and every charge equalled its estimate.

| Batch | What | Cost |
|---|---|---|
| r1 | 8 roughs at medium 1K: house, marquee, ticket, felt board, lobby, lantern slide, Grok and Claude acts with founder refs | $0.317 |
| r2 | GPT and Kimi acts, square screen, title card, strongbox, intertitle, programme (unused) | $0.337 |
| finals | House 16:9 and 3:4, marquee 16:9 and 3:4 at medium 2K from their roughs, closed curtain | $0.328 |
| extras | Square screen, portrait title card, marquee face, landscape slide | $0.215 |

The acts at medium 1K were kept as finals, and no words or numbers are baked into any painting.

## Research used
- **Rubber hose:** traits and dates from [Wikipedia](https://www.wikiwand.com/en/articles/Rubberhose_animation), [Adobe](https://www.adobe.com/uk/creativecloud/animation/discover/rubber-hose-animation.html) and [Cartoon Brew](https://www.cartoonbrew.com/cartoon-study/the-rubber-hose-classics-that-inspired-the-cuphead-show-213700.html).
- **Colour:** two-strip and three-strip Technicolor limits from [Wikipedia, Technicolor](https://en.wikipedia.org/wiki/Technicolor) and [Gurney Journey](https://gurneyjourney.blogspot.com/2018/03/two-color-cartoons.html). I chose an early three-strip palette so GPT's violet and Kimi's blue stay true.
- **Programme order:** a 1938 theatre-manager text gives short, newsreel, coming attractions, feature ([Fedora Lounge transcription](https://www.thefedoralounge.com/threads/1938-advice-to-theatre-managers.68789/post-1565793)).
- **Academy leader:** introduced in 1930 ([Wikipedia, Film leader](https://en.wikipedia.org/wiki/Film_leader)).
- **Lantern slides:** "advance slides" for coming attractions ([LA Daily Mirror](https://ladailymirror.com/2013/07/15/mary-mallory-hollywood-heights-glass-slides-motion-pictures-first-coming-attractions), [Museum of the Moving Image](https://movingimage.org/collection/collection-spotlight_glass-slides/)).
- **Lobby sets:** one title card plus seven scene cards ([Library of Congress](https://id.loc.gov/authorities/subjects/sh2006008476.html)).
- **Marquee letters:** 1930s black enamelled changeable letters ([Urban Remains](https://urbanremainschicago.com/products/intact-american-depression-era-c-1930-s-single-sided-black-enameled-cast-aluminum-exterior-chicago-theater-marquee-with-word-sign)).

## Next
1. Get the owner's read on the rubber-hose founders. If they land, give each act a 2 to 3 s bounce loop in Hedra video.
2. Paint the lobby-card frame and the brass plates as 9-slice paintings instead of gold texture plus CSS light.
3. Paint a five-row marquee face, so the window label can sit on the reader board itself.
4. Try a slide-into-the-lantern transition for a new trade arriving.
5. Use the slide rack as an Upcoming tab.

## Data oddities
- The sync during the work (84 rounds now, 80 in the brief); R81 to R84 have no films yet.
- R46 Verizon has no SECTOR, so the sector boards count 83 of 84 rounds (the live board does the same).
- R104 BRK.B has a call date of 11/2/26 (already past), no trades and no resolution date.
- R96 and R104 to R114 have no resolution date.
- **Hyperliquid lookups.** I look a sheet ticker up as it is, then without its exchange suffix (ASML.AS as ASML). This reproduces the brief's listed-only figures exactly at 80 rounds: Grok 21-5 +$162,920, Claude 21-9 +$104,540, GPT 14-16 −$98,780, Kimi 14-16 −$27,420.
  - TSMC (TSM), SK Hynix (SKHX or SKHY) and Samsung (SMSN) probably have markets under other names. I did not guess these; mapping them would make Grok 24-6 at 80 rounds.
- Grok traded 76 of the 84 rounds, so its hit rate is out of 76.
