# Round H7 · book2: the whole site as one comic book (roughs)

Boards: `ez/x2p-x3p-h7-book2-390.png` and `ez/x2p-x3p-h7-book2-1280.png`. Each has one row per take with today's live page first. Every row shows five moments:
1. the cover;
2. the cover opening, part way;
3. the first page;
4. a chapter turn (Meet the models into the next chapter);
5. inside a chapter, with the header and the tabs.

Videos: `ez/x2p-x3p-h7-book2-a.mp4`, `-b.mp4`, `-c.mp4`. Each one plays at 390x844 and then at 1280x800, framed in 1600x1000. Each shows the cover held, the cover opening, then one chapter turn.

To run it, serve `ez/` (`python3 -m http.server 8961`) and use these commands:
- `node run.js <out> now,a,b,c 390,1280` for the shots;
- `/usr/bin/python3 board.py <out> <b390> <b1280>` for the boards;
- `node rec.js <take> <mp4>` for a video;
- `node perf.js now,a,b,c 3` for the cost.

Each take is `_b2.js`/`_b2.css` (the shared cover builder and lettering) plus its own `<take>.js`/`.css`, laid over the built `v47-live-x3plus.html`. These are mockups only: nothing in `ez/tools/v22/`, `ez/media/` or any `ez/v4*.html` was touched.

## What every take shares
- **The cover is a real front cover for Season 1:**
  - an extruded "Earnings Zeason" masthead, the cover's one loud treatment (lesson 71);
  - the four founders as the cast, painted in each take's world, using the owner's four characters as references;
  - "Season 1 · No. 80" (the issue number is the count of graded rounds, `ROUNDS.length`);
  - cover lines "4 AIs trade earnings!" and "Who calls it best?".
- **Live text in painted blank surfaces.** Every word and number on the cover is page text set into a surface painted blank for it: the corner box, the ribbons, the seal, the golden ticket, name plates, a billboard.
- **Real data:**
  - 80 rounds graded;
  - the golden ticket on A's cover is Grok, the P&L leader (`SE.lead()`, +$148,480);
  - the four steps, in the owner's words, are on the first page or spread.
- **The bet chapter (`section.wc-bet`) is untouched.** It is only placed in each take's order.
- **Chapters:** each Overview section is tagged as a chapter (`data-ch`, chapter title, page number). The header follows the chapter you are in.
- **Cost:** 7 Hedra roughs (gpt-image-2, medium, 1K), $0.55 of the $8 budget. Every job is in `log.jsonl`. The images are in `img/`.

## The takes
- **A · The Issue (a printed comic you hold).**
  - **Cover.** On a phone it is the full front cover: corner box (EZ, No. 80, Season 1, Free), masthead, the golden ticket held up lettered "Grok +$148,480", ribbons, and a "Graded at the close · 80 rounds" seal. On desktop the same comic lies on a walnut counter under one lamp, with a brass bell and coins beside it.
  - **Opening.** On desktop the camera leans in, then the cover swings open on its spine, scroll-driven. Behind it is the inside front cover: the film on the left page's cinema screen and "Then, on page n: Bet #1 NVIDIA" under it. On the right page each founder tells one of the four steps. On a phone the cover swings open, then the camera pans across the spread from the left page to the right.
  - **Chapter turn.** Each chapter lands like a page turned flat onto the stack: a CSS view timeline swings it on its left spine as it enters. Each chapter ends on a printed folio ("Earnings Zeason · No. 80 / Ch. 1 · Meet the models / p. 2").
  - **Header inside the book.** The header becomes the running head: logo, "No. 80", the current chapter and the page number. The tabs become three bookmark ribbons hanging off the top right: This issue (gold), Standings (green), Next bell (red).
  - **Order:** cover, inside front cover, 1 Meet the models, 2 Every round so far, 3 Smart or lucky, 4 Bet #1 NVIDIA, 5 Next issue.
- **B · Through the panel (the cover is a door).**
  - **Cover.** The four founders guard one gold-framed panel. The panel holds the issue line, "4 AIs trade earnings" and "Who calls it best?". Name plates sit at the founders' feet.
  - **Opening.** Scrolling flies the camera through the panel until it fills the screen. Its inside is the first page: the film, the four steps and "Step inside", which fade in as you arrive.
  - **Chapter turn.** Each chapter is entered through a small gold panel named "Chapter n · <title>", which the camera flies through (a view timeline scales it from 0.7 to 5.5).
  - **Header inside the book.** The masthead sits in a slim bar beside a strip of six panel thumbnails, one per chapter, with the current one lit. The tabs are three panels: This issue, Standings, Next issue.
  - **Order: stakes before evidence.** Cover, first page, 1 Meet the models, 2 Bet #1 NVIDIA, 3 Every round so far, 4 Smart or lucky, 5 Next issue. You learn what is at stake before you see the record.
- **C · The long drop (a phone-native vertical comic, a webtoon).**
  - **Cover.** The cover is the top of one tall painting: the four founders on a rooftop at night, a billboard lettered "4 AIs trade earnings / Who calls it best?", and the masthead in the sky.
  - **Opening.** There is no pin and no turn. Scrolling is the camera descending the building. The masthead holds on the sky and lets go. The four steps sit floor by floor down the facade. The ring in the street below is lettered "Ch. 1 · Meet the models ↓". The film is the first stop at the foot of the building.
  - **Chapter turn.** Each turn is a long gutter where the next chapter's ground rises into the last one. One narration is lettered on the ground, with no box: "Meanwhile, 80 rounds later…", "So… smart, or just lucky?", "Down in the vault…", "To be continued…".
  - **Header inside the book.** The header is an episode bar (Ep. 80, Ch. n/5, a reading-progress line). It hides while you read down and comes back when you scroll up. The tabs are episodes: This episode, Rankings, Next episode. At the end, a "Next episode · Ep. 81" bar slides up.
  - **Order:** the descent ends in the vault, the deepest place. Cover, 1 Meet the models, 2 Every round so far, 3 Smart or lucky, 4 Bet #1 NVIDIA, 5 Next issue.

## What I measured
- **Layout (Chromium, 390x844 and 1280x800):** no sideways scroll and no page errors in any take at either width.
- **Data check (`window.__b2`):** 80 graded, lead GROK, last round XOM#80 +2.17% won by GPT. Each take's chapter order is listed there.
- **Cost of the opening on a 4x slower CPU** (390x844). The scroll runs through the opening stage (or 1.6 screens for today and C) over 5 s, three runs, medians. Results: see the table below, filled in from `perf.js`.

PERF_TABLE

## My pick: A, The Issue
- It is the most literal answer to the owner's words ("the cover of the world itself… when you scroll down, it opens up the book"). It is the one where a newcomer sees a comic in their hands before reading a word.
- On desktop, the book on a lit counter is itself a world: the bell and coins are the market's.
- The inside front cover answers the old brief's content in one spread: the film plus the four steps told by the four founders (lesson 11, by the characters).
- The ribbons are a tab system people already know from real books.
- **B is a strong second, and could be the chapter-to-chapter device inside A.** Flying through a panel is the best transition of the three, and its "stakes before evidence" order is worth testing whatever the pick.
- **C is the most native to how people read on phones** (Webtoon has made vertical scroll the format of phone comics). It is the cheapest to run. It feels the least like holding a book.

## How each could fail
- **All takes:**
  - These are 1K roughs, soft on desktop. The pick needs a proper 2K/4K paint with the blank surfaces placed for the text.
  - The masthead is code lettering on a painting. It reads as part of the cover at phone size, but needs checking against a real paint (lesson 80).
  - The chapters inside are today's sections. The book only works once each chapter has its own scene (the other H7 areas). Until then the cover promises more than the inside delivers.
  - The desktop broadcast crawl at the foot is today's and is not yet part of the book.
- **A:**
  - A cover that must be scrolled open is a hurdle. People who don't scroll see a poster, not the product.
  - The phone cover is 9:16, so it leaves dark bands on a tall phone.
  - The page turns use `animation-timeline: view()` with a 3D swing. Safari before 26 has no view timelines (the page simply lands flat there). The swing can look like a glitch if it fires mid-read on a long chapter.
  - The ribbons cover the running head's right end on narrow phones.
- **B:**
  - Scaling the cover about 2.5x rasterises small text, so the first page is soft until the browser re-renders it.
  - The panel's small first-page text is unreadable at cover size. It must stay hidden until the zoom.
  - Five fly-throughs on one page may tire people. The doors' gold frame is a crop of the cover painting and looks pasted at desktop size.
  - On the cover the tabs are hidden until you are inside, so there is no way to the Leaderboard from the first screen.
- **C:**
  - The steps lettered on the facade are words laid over the painting, not set into painted surfaces. They are the least integrated text of the three takes.
  - Without a turn, "opening the book" is only implied.
  - A header that hides can lose a visitor looking for the tabs.
  - The gutters add about 46 vh of scroll per chapter.
