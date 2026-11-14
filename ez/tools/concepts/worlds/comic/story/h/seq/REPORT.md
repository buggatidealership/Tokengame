# Round H12 · seq: Tonight at the close, the Upcoming top and the Leaderboard top, as scrolled panel sequences

These are rough mockups, laid over the real built X3+ page (`v47-live-x3plus.html`, served locally) in Playwright. Nothing in `tools/v22/` or any live page was touched.

**Boards** (each row starts with today's live element, then the takes, each labelled with its cost):
- `ez/x2p-x3p-h12-seq-390.png`. Tonight also appears at Fri Oct 30 11:00 ET, when real calls were in. A close-up row at 2x sits at the bottom.
- `ez/x2p-x3p-h12-seq-1280.png`.

**Run:**
1. Serve `ez/` with `python3 -m http.server 8942`.
2. `node run.js <dir> tonight|upcoming|leaderboard now,<takes> 390,1280,320`. Add `SQ_NOW=2026-10-30T15:00:00Z SQ_SUF=-oct30` for the demo moment.
3. `/usr/bin/python3 board.py <dir> 390|1280 <out.png>`.

**Files:**
- `seq.js`: the data model, the panel renderer and the nine takes.
- `seq.css`: one material per surface.
- `mkjobs.py`: the prompts.
- `gen.py`: box's Hedra runner.
- `grid.py`: a 5% grid, used to measure the blank surfaces by eye.
- `img/`: 21 plates.

## What I made

Three chapters, three takes each. Every take runs scroll only: four panels carry the five S1 beats, and nothing needs a tap.
1. What it is, the title over the establishing picture.
2. The live thing in the world.
3. What happens.
4. Why it matters, as a drawn caption or balloon inside a panel.
5. What's next, handing on to the next screen.

**Tonight and Upcoming share three worlds on purpose** (lesson 63). Tonight's last panel hands over to the Upcoming tab, so if the two use the same world, the reader steps from one night into the week. Tonight covers one night; Upcoming covers the week.

| Take | 1 Title + establishing | 2 Live thing | 3 What happens + why | 4 What's next |
|---|---|---|---|---|
| tW1 / uW1 **Fight night** | arena marquee: the day and the companies slotted in as marquee letters (uW1: "34 rounds to come", the main event, the next day); box-office cards "Calls due Mon" and "Bell 2D 18H" | four envelopes pinned on the box office, each AI's mark pressed into its wax seal, its call handwritten under it ("▼ 5%", or "due mon" before the calls are in); brass rail "Round 82 · Apple (AAPL)" | the bell rings, a live New York clock beside it, plaque "The bell · Tue Nov 3 · 4 PM New York · in 2D 18H · 4 rounds"; caption "The close decides. Every prediction graded, no edits." | posters for the next three nights (day band, main event logo, name (ticker), "+n more"); the wooden arrow sign "Everything coming up" links to Upcoming (uW1: "Every round below") |
| tW2 / uW2 **The station** | departures board in split-flap: the next six rounds (uW2: one row per day, with the day's biggest company and "+n"); station clock on New York time | four ticket barriers, one per AI: the mark on the brass medallion, the call engraved on the gold front; the top sign reads "Apple (AAPL) · Round 82" | the train doors shut under the clock; the day and "in 2D 18H" painted on the train; balloon "Doors shut at the close. The market grades every ticket." | three platforms for the next days; the arrow sign links on |
| tW3 / uW3 **The floor** | exchange slate in chalk: the day, its companies' logos pinned as cards, "3 reports · predictions due" (uW3: the week, one chalk line per day); live clock | four trading desks in the AIs' colours (gold = the golden-ticket holder): the mark on each disc, the call chalked on its slate | the bell (shared plate) with "DING! The close grades every prediction." | the ticker tape runs off the machine; a notice on the wall lists the next days; the tape's end reads "Everything coming up →" |
| lA **Title fight** | the golden ticket hangs over the ring, engraved "Golden ticket · GROK · +$148,480"; the arena's two screens read "#1 Grok" and "#2 Claude" | two corner placards for the holder and the challenger (mark, name, Season P&L, W-L); ticket stubs on the ring mat for Season / 7 days / 24h, which re-letter every figure; the apron reads "Undercard GPT −$56,930 · Kimi −$70,650" | the glove smashes the deciding company's logo (Caterpillar, round 67), "KRAK!", caption "Grok took the ticket on Caterpillar (CAT), round 67." | the announcer's balloon "The ticket holder's call is the one we bet the pool on."; the apron "Next bell Tue Nov 3 · in 2D 18H"; a green caption "The tale of the tape ↓" hands on to the scoreboard |
| lB **The race** | the tote board posts the four rows (rank, mark, name, Season P&L; the leader's row in gold); window stubs under it | four cars at the line, AI marks on the roundels, the gold car = the leader; the announcer's balloon "Grok leads by $45.5K. Its call is the one we bet the pool on." | the photo-finish strip: Caterpillar (CAT), round 67, "Grok takes the lead"; caption "Next race: Tue Nov 3" | (three panels) |
| lC **The ticket hall** | the golden ticket in its case, the four names engraved on the honours board behind it | the honours board up close: brass plates with the medallion mark, name, P&L and W-L; the top plate gold, "Golden ticket"; window stubs below | the plates swapped: Claude's plate slides out, Grok's slides in; caption "Round 67, Caterpillar (CAT): Grok takes the top plate. Its call is the one we bet the pool on." | (three panels) |

**Motion, one small loop per panel at most:**
- A light sweeps across the marquee (Fight night), the golden ticket (Title fight) and the case (Ticket hall).
- The red second hand moves on every live clock.
- Nothing moves with reduced motion.

**Desktop** is a comic page of justified tiers. Each panel keeps its own aspect, there is no crop, and the rows fill the width (two tiers of two panels). Phones stack the panels full width.

## The surface under every live text

Each live word is mapped onto its painted blank surface with a matrix3d made from four measured corners, so it takes the surface's perspective. It is set in that surface's material, and every surface steps its own type down until the words fit inside the painted edge.

| Live text | Surface (painted blank) | Material |
|---|---|---|
| day, companies, counts | marquee letter tracks | slotted black (and red) marquee letters, each a hair off its neighbours |
| calls in / bell countdown | box-office window cards | printed card |
| AI name, call | envelope face | handwriting in blue ink, call in green or red ink |
| AI mark | wax seal | pressed into the wax (light lip and dark wall) |
| round · company (ticker) | brass rail, bell plaque | engraved (Cinzel) |
| clock hands | blank clock faces | inked hands, live New York time |
| next nights | poster band + poster body | stencil band; logo, name, ticker printed (multiply) |
| "Everything coming up" | wooden arrow sign | painted on wood; the sign is the link |
| departures | the split-flap board | flap cells drawn over the board (see "How it could fail") |
| barrier calls, names | gold barrier fronts, medallions | engraved |
| day / countdown on the train | the train's yellow band | sign-painted |
| desk calls, slate | chalk slates, kiosk discs | chalk (Cabin Sketch); the logos are white cards pinned on the slate |
| next days | wall notice | handwriting |
| link on the tape | the ticker tape | typed |
| holder, P&L | the golden ticket | engraved into the gold |
| #1 / #2 | arena screens | lit lettering, crisp, no glow |
| holder / challenger figures | ring placards | printed placard |
| window switch | ticket stubs on the mat | cut stubs (buttons) |
| undercard, next bell | ring apron | painted |
| deciding company | the cracked target | its logo |
| standings | tote board rows | hand-hung board figures |
| AI marks on cars | roundels | painted |
| deciding round | photo-finish strip | printed |
| plates | brass plates, medallions | engraved |
| voices / narration | balloons and captions drawn into the panel | hand-tuned outlines (seeded wobble), thick outer and thin inner ink, hard shadow, Shantell Sans capitals |

## Plain text outside the world

These are words not on a painted surface and not inside a drawn balloon or caption, counted by `run.js` at every width.
- **0 in every take.**
- The only other words are the chapter heading in the Overview's one heading face (Bangers, gold, ink stroke): 4 words for "Next on the card" or "Tonight at the close", 3 for "Who's winning?".
- Words living in the world, per take: tW1 80, tW2 59, tW3 60, uW1 87, uW2 61, uW3 49, lA 55, lB 37, lC 36.

## Checks run
- 390, 1280 and 320px for all nine takes:
  - scrollWidth equals the viewport (no sideways scroll);
  - no page or console errors;
  - no live text overflowing its surface (checked after the fit).
- Rule 0 list:
  - No box-in-box widgets: every container is a painted object.
  - No white or pale module grounds. The envelopes, posters, placards and slate cards are white because they are paper objects in the scene.
  - No emoji: ▲▼ are type.
  - No words over a logo; logos sit on posters, cards and the target as the subject.
  - No all-over dot fill.
  - Name and ticker together everywhere, except the split-flap rows (see below).
- Data is live: `__sqData` in the run output. Next day Mon Nov 2 (Apple, Berkshire, Palantir); bell Tue Nov 3, 4 rounds; rank Grok, Claude, GPT, Kimi; reign from round 67, taken from Claude.
- Demo moment: Fri Oct 30 11:00 ET. The rounds graded that day go back to "calls in" with their real calls, for example Amazon R74: GPT ▼5, Kimi ▲1.5, Claude ▼4.5, Grok ▼2.5.
- Zoomed at 2x on the close-up row: the wax marks read as pressed, the flap board and the gold engraving hold up.

## Found on the way (live site, not fixed here; the second line is about seq.js)
- **The live Tonight undercounts.** It reads "Next on the card, Nov 2 · 2 rounds", but there are 3. world-comic.js compares call dates as strings (`u.called===c0`), and the sheet writes Berkshire's date as `11/2/26` rather than `11/02/26`. The Upcoming tab groups them correctly, so the two disagree. seq.js groups by date value.
- On Fri Oct 30 the first close was AstraZeneca's (London, 4:30 pm); the bell plaque names the exchange's city when it isn't New York.

## My pick
- **Tonight: tW1 Fight night.**
  - The sealed envelopes make "locked before the report" visible without a sentence: sealed with "due Mon" before the calls are in, then the call in ink once they are.
  - The bell and the posters carry the fight-night voice the site already uses ("Fight night", "on the card").
- **Upcoming: uW1, the same world**, so Tonight's last panel (the arrow sign) walks straight into the week. Only if the owner wants the week readable at a glance would I swap in uW2's departures board, the most familiar "what's coming" object (lesson 23). Then I'd make Tonight tW2 too, to keep the handover in one world.
- **Leaderboard: lA Title fight.**
  - It answers "who's winning" as a confrontation (lesson 41): the golden ticket over the ring, then holder against challenger on their placards.
  - The window stubs sit in the same panel as the figures they change (lesson 54).
  - It ends on the announcer's line and a caption into the scoreboard, which the owner already likes as Tale of the Tape.

## How each take could fail
- **All:**
  - The plates are 1K drafts. At 1280 the marquee and arena panels are near their native pixels (lesson 60). Repaint the picked plates at 2K, using the 1K plate as the reference, then re-measure the corners: a re-render moves surfaces.
  - The corners were measured by eye on a 5% grid, so expect about 1% error. A word near a painted edge can kiss it.
  - Shared plates (the bell appears in W1 and W3) repeat the same picture twice on one page if the owner mixes takes.
  - Text fitting shrinks long names silently. "Berkshire Hathaway (BRK.B) +1" becomes small on the marquee at 320px.
- **tW1 / uW1:**
  - Before the calls are in, the four envelopes all read "due mon". It is honest, but it is four identical objects (lesson 77). The Oct 30 shots show the state with calls in.
  - The box-office cards are tiny at 390px.
  - uW1 repeats tW1's panels with week data, so Overview and Upcoming feel alike.
- **tW2 / uW2:**
  - The flap cells are drawn over the painted board, not into its own tiles. Up close they read as the board's own material, but they are code-drawn (lesson 80).
  - Rows cut names at 11 characters and tickers at 5 ("BERKSHIRE H", "BRK"). That breaks "name and ticker together".
  - The ticket on the barrier is too small to carry text, so the call sits on the barrier's front instead.
- **tW3 / uW3:**
  - Logos pinned as white cards on the slate are paper on a slate. They are honest, but they are the brightest thing in the panel.
  - The desk colours are tied to the AIs by my mapping (gold = holder, green GPT, red Claude, blue Kimi). Grok's own colour is black, so a reader may not decode it.
  - The tape's link text is small and curved by perspective.
- **lA:**
  - The arena screens are small, so "#1 Grok / #2 Claude" repeats the ticket and the placards (lesson 13). They could carry the window's figures instead.
  - "KRAK!" is a second loud lettering after the heading (lesson 71). Keep it smaller than the heading or drop it.
  - The red glove has no owner. It could be read as "Claude punched".
- **lB:**
  - The car colours don't match the AIs' (no green car for GPT; a black car is not Grok, because gold marks the leader).
  - It repeats the race metaphor of the Leaderboard's own "The race so far" section further down (lesson 25).
  - The tote board's rows are cream-ish (the "never beige" rule).
  - The magnifier covers part of the photo strip.
- **lC:**
  - The names on the hall's plates are small at 390px.
  - The swap panel shows only the moment the ticket changed hands. With no reign (a new season), it falls back to an empty caption.

## Cost
21 gpt-image-2 jobs at 1K medium, **$0.88** of the $10 budget (log in `log.jsonl`). No 2K renders: that spend waits for the owner's pick. Per take: Fight night $0.17, Station $0.17, Floor $0.13 (the bell is shared), Title fight $0.18, Race $0.12, Ticket hall $0.13. Tonight and Upcoming share each world's plates.

| Name | Model | Settings | Cost | Time | Result |
|---|---|---|---|---|---|
| f1-marquee | gpt-image-2 | 1K medium 3:4 | $0.038 | 57 s | arena at dusk, three blank marquee tracks, blank blade sign; clean |
| f2-envelopes | gpt-image-2 | 1K medium 4:3 | $0.038 | 56 s | four envelopes, blank red seals, brass rail; exactly as asked |
| f3-bell | gpt-image-2 | 1K medium 1:1 | $0.054 | 56 s | brass bell ringing, blank oval clock, plaque; shared by W1 and W3 |
| f4-posters | gpt-image-2 | 1K medium 4:3 | $0.038 | 50 s | three posters with blank bands, arrow sign; the third poster is narrow |
| s1-hall | gpt-image-2 | 1K medium 3:4 | $0.038 | 50 s | terminal hall, six-row flap board, blank clock; strong |
| s2-gates | gpt-image-2 | 1K medium 4:3 | $0.037 | 50 s | four barriers, medallions, three blank signs; the tickets are too small to letter |
| s3-doors | gpt-image-2 | 1K medium 1:1 | $0.054 | 50 s | doors shutting with motion lines, blank clock; reads at once |
| s4-platforms | gpt-image-2 | 1K medium 4:3 | $0.037 | 34 s | three platforms, signs, arrow in perspective |
| e1-floor | gpt-image-2 | 1K medium 3:4 | $0.038 | 40 s | exchange floor, big blank slate, small clock |
| e2-posts | gpt-image-2 | 1K medium 4:3 | $0.037 | 34 s | four kiosks in gold, green, red and blue; blank discs and slates |
| e3-tape | gpt-image-2 | 1K medium 4:3 | $0.037 | 33 s | ticker under a dome, tape curling off; the blank wall frame took the list |
| a1-arena | gpt-image-2 | 1K medium 3:4 | $0.038 | 40 s | golden ticket over the ring, two blank screens; the best establishing plate |
| a2-corners | gpt-image-2 | 1K medium 4:3 | $0.037 | 33 s | gold and red corners with blank placards |
| a3-punch | gpt-image-2 | 1K medium 1:1 | $0.054 | 82 s | glove cracking a blank target |
| a4-mic | gpt-image-2 | 1K medium 1:1 | $0.054 | 82 s | the announcer's mic, left half dark for the balloon |
| r1-track | gpt-image-2 | 1K medium 3:4 | $0.038 | 34 s | tote board with four rows and a trophy; the rows are cream |
| r2-finish | gpt-image-2 | 1K medium 16:9 | $0.030 | 76 s | four cars at the line, blank roundels |
| r3-photo | gpt-image-2 | 1K medium 1:1 | $0.054 | 75 s | photo-finish strip, magnifier, flag |
| h1-hall | gpt-image-2 | 1K medium 3:4 | $0.038 | 74 s | museum hall, golden ticket in a case, plates behind |
| h2-plates | gpt-image-2 | 1K medium 4:3 | $0.037 | 74 s | honours board with four brass plates; very clean |
| h3-swap | gpt-image-2 | 1K medium 1:1 | $0.054 | 69 s | plates swapping with arrows |
