# Round H12 · book3: the whole Overview as one scrolled comic book

Boards:
- `ez/x2p-x3p-h12-book3-390.png`: one long column per take (today, R1, R2, R3). Each column is the full Overview at 390px, stacked from the page's own screen slices. Under the columns is a row per take with every hand-over: the cut between two chapters, in the middle of the screen.
- `ez/x2p-x3p-h12-book3-1280.png`: the same at 1280px, plus D2, the desktop spread.
- `ez/x2p-x3p-h12-book3-scroll.mp4`: a 390x844 scroll through R2, then R1, then R3. The thumb moves at a steady 650px a second and holds about a second at each hand-over.

To run it, serve `ez/` with `python3 -m http.server 8971`, then:
- `node run.js <out> now,r1,r2,r3,d2 390,1280` for the shots and `audit.json`;
- `/usr/bin/python3 board.py <out> <b390> <b1280>` for the boards;
- `node rec.js <mp4> r2,r1,r3` for the video.

Each take is `_b3.js`/`_b3.css` (shared) plus its own `<take>.js`/`.css`, laid over the built `v47-live-x3plus.html`. These are mockups only. Nothing in `ez/tools/v22/`, `ez/media/` or any `ez/v4*.html` was touched.

## What every take shares
- **What is fixed and what scrolls.** Only the header is fixed. On the cover it is today's full header. Once the cover has scrolled away, it becomes the book's running head, one 44px bar:
  - the EZ. logo;
  - "No. 80", the issue number, which is `ROUNDS.length`;
  - the chapter you are in ("Every round so far · Ch. 2 / 5", "The end" on the back cover);
  - two small bookmark tabs, Board and Next, for the Leaderboard and Upcoming.
  
  Everything else scrolls. Nothing pins the reader, nothing hijacks the scroll, and nothing needs a tap to be understood. The desktop's bottom broadcast crawl is today's and is left as it was.
- **Chapters.** The chapters are cover, 1 Meet the models (the cast), 2 Every round so far (the record), 3 Smart or lucky? (the test), 4 Bet #1: NVIDIA (the stakes), 5 Next on the card (to be continued), then the back cover. That is today's live order.
- **The narration that hands each chapter to the next** is a voice, so it is lettered, never body text. The two live beat captions ("Meanwhile, the big question…", "And it's not over…") are folded into it. Every value is live:
  1. "Four AIs. One golden ticket.", plus the cast's own lede read from the page;
  2. "80 rounds. Every one stays on the record." (`ROUNDS.length`);
  3. "Meanwhile, the big question…";
  4. "Down in the vault…", plus the bet's date read from the bet chapter's own line ("Wednesday, November 18");
  5. "And it's not over.", plus "Next on the card, Nov 2 · 2 rounds", read from the cliff chapter;
  6. "To be continued at the close."
- **The chapters' contents are today's.** The bet chapter, Meet the models, the rack and the board belong to the other H12 helpers. This round is about the cuts and the rhythm between them.

## The takes
### R1 · Page and gutter: the printed page
- **Panels.** Every chapter is a panel with an inked border on a black gutter, 10px wide like a printed comic's (14px on desktop).
- **Splashes.** Each chapter opens on a wide splash, its establishing picture:
  - Meet the models gets a new one: the arena with four coloured spotlights, cut from bridge b1;
  - Next on the card gets the rooftop ring, cut from b5;
  - the other chapters already open on their own picture.
- **Captions.** The narration sits in a painted yellow caption box (`img/cap-y.jpg`, 9-sliced so its inked frame keeps its weight). For the vault it is a black-and-gold one (`img/cap-k.jpg`). The box straddles the gutter, half on the panel that ends and half on the one that starts, alternating left and right.
- **Folio.** Each panel's foot carries a folio: "The record · 80 rounds".
- **Rhythm:** wide splash, tall content, wide splash, tall content. The splashes are the beats.

### R2 · One long picture: the webtoon bleed
- **Bridges.** There are no borders between chapters. Between two chapters sits a painted bridge: one picture whose top continues the world that ends and whose foot opens the next. Scrolling is the camera moving down.
  - b1: the exchange (the cover), then the queue at the fight-night marquee, then the arena with four spotlights (Meet the models).
  - b2: the arena, then out of its back door onto the rainy street, then the newsstand rack (Every round so far).
  - b3: the newsstand, then the open bronze doors of the 1920s exchange, then the chalkboard floor (Smart or lucky).
  - b4: the exchange floor, then a spiral staircase down, turning to noir as it goes, then the vault (the bet).
  - b5: the vault, then a manhole up onto the roof at sunset, then the rooftop ring and the bell (Next on the card).
  
  The painter drew b1, b2, b3 and b5 as three-panel comic pages with their own gutters, so each bridge is literally a page of the book.
- **Signs.** The narration is lettered on the blank surface each painting left for it:
  - b1: the hanging yellow banner;
  - b2: the yellow enamel sign by the back door;
  - b3: the brass plate over the exchange doors;
  - b4: the gold-rimmed black plate on the stair wall, in gold ink;
  - b5: the red enamel sign on the roof railing, in cream.
  
  The signs breathe a little light (one slow loop per picture, still with reduced motion). The pictures fade into the chapters' grounds at their top and bottom edge.
- **Rhythm:** a long, slow picture, then the dense chapter.

### R3 · Turn the page: stacked pages
- **Pages.** Every chapter is a page at least one screen tall. Read a page to its foot and it stays where it is (`position: sticky`) while the next page slides up over it. The new page's top edge casts a shadow on the page below. This is scroll only.
- **Tabs and captions.** Each page carries a printed tab on its top edge ("Ch. 2 · The record"). The narration caption, in the same painted boxes as R1, is printed at the head of each new page.
- **Rhythm:** one page per chapter, every page ending flush with the screen.

### Desktop
- **R1, R2 and R3 at 1280: one column of panels.**
  - R1's splashes are cut to 21:9.
  - R2 uses the wide versions of the five bridges (`b<n>-l`), each a 16:9 strip as wide as the page. This is the strongest desktop take: the wide bridges read like the films.
- **D2 · The spread (from 1100px).** The book opens flat:
  - the left page is the painted hand-over page (the tall R2 bridge, lettered on its sign) and stays pinned while you read;
  - the right page is the chapter;
  - a spine shadow runs between them;
  - when a chapter ends, its spread slides away and the next arrives with its own left page.

## The surface under every live text
| Text | R1 | R2 / D2 | R3 |
|---|---|---|---|
| Narration 1 to 6 | painted caption box (yellow; black and gold for the vault) on the gutter | b1 banner, b2 enamel sign, b3 brass plate, b4 gold-rimmed plate, b5 red sign (no 6th: the back cover's motto closes it) | painted caption box at the head of the page |
| The cast's and the record's ledes | moved into captions 1 and 2 | moved onto the b1 banner and the b2 sign (the record's "tap one" hint is dropped there) | moved into captions 1 and 2 |
| The bet's date line | caption 4 | b4 plate | caption 4 |
| "Next on the card · 2 rounds" | caption 5 | stays as today's line (the b5 sign is too small) | caption 5 |
| Issue No., chapter | running head (header bar) | same | same, plus the page tab |
| Folio | printed at the panel's foot | the spread's left page (D2) | the page tab |

## Plain text outside the world
These counts were measured on the built page with `B3.audit()`. A word counts as plain when it is body text with no drawn surface under it. The disclaimer is always 43 words and must stay, so it is counted apart below.

| Take | Plain words, without the disclaimer | Lettered in captions | Lettered on painted signs |
|---|---|---|---|
| Today | 87 | 12 (the two beat boxes) | 0 |
| R1 | 48 | 66 | 0 |
| R2 / D2 | 59 | 0 | 44 |
| R3 | 48 | 49 | 0 |

- What is left plain in every take is the bet chapter's parts list and "NVIDIA is the first bet, not the last." (48 words). That chapter belongs to bet3, which is moving those lines into the circuit.
- R2 also keeps the cliff's "2 rounds. The calls drop before each report." (11 words).
- No take has sideways scroll, and no take raised a console error, at 390 or 1280.

## My pick: R2 on phones, R2's wide strips on desktop, and R1's caption as the fallback
- R2 is the only take where the hand-over is a picture rather than a box. The owner's own words describe it: "a panel whose picture continues into the next chapter's opening".
- It puts the most narration into the world (44 words on painted signs, none in boxes).
- It makes the bet's turn to noir happen on the staircase, so the change of ink is itself the story (lesson 81).
- On desktop the same bridges, as wide strips, are the best-looking frames of the whole round.
- R1 is the cheapest and the most "printed comic". Its straddling caption is the device to keep wherever a bridge would be too long.
- R3's sticky pages feel like turning pages on a phone, but they cost the most in reading (see below).
- I would not ship D2 at 1280 (see below).

## How each could fail
- **All takes:**
  - The bridges are 1K roughs ($0.04 to $0.05 each), so they are soft on desktop. The pick needs a 2K paint, and the signs should be painted with more room. The b5 red sign is about 86x39px on a phone, too small for more than three words.
  - Two paintings repeat an object at a seam: b1 paints the exchange twice, and b2's foot and b3's top both paint the newsstand. That is intended as continuity, but it can read as a repeat.
  - The running head's two tabs, "Board" and "Next", are new words for the Leaderboard and Upcoming tabs. Hiding the full nav once you are inside the book may lose someone looking for the Leaderboard.
- **R1:**
  - The last caption ("To be continued at the close.") still covers about half of the cliff's "See everything coming up" link at 390px. It needs a gutter of its own before the back cover.
  - A caption that straddles the gutter covers about 30px of the top of the panel below it. On Meet the models it sits over the splash, which is fine. On a chapter whose first line is content, it would cover that content.
  - Inked borders round every chapter make the page read as boxes again (lessons 79 and 82).
- **R2:**
  - It adds about 2,800px of scroll at 390 (10,207 against 7,399 today), about three and a half screens of pictures. Someone hunting for the bet scrolls longer.
  - A reader can mistake a bridge for the chapter itself and wait for something to happen in it.
  - The soft fade at each picture's edge is a code wipe between two paintings (lesson 96). It is small, but it is a seam.
- **R3:**
  - A sticky page that is shorter than the screen still pins, and a long chapter's middle scrolls normally. So "turning" happens only at the foot of each page, and on long chapters it is barely felt.
  - The page tab sits on the top right edge and the caption on the left. Their first versions overlapped; the boards show the fix, but the R3 part of the scroll video was recorded before it.
  - Safari's sticky stacking with shadows has not been checked.
- **D2:**
  - At 1280 the right page is about 870px wide. Today's chapters are laid out for the full width, so Meet the models clips its names ("GROI", "CLAU").
  - The spread only works if each chapter is recomposed for a 60% column, or from about 1600px.
  - The left page is taller than short chapters, so the spread grows to the painting's height.

## Cost
- 12 Hedra jobs, all gpt-image-2 at 1K medium: $0.55 of the $10 budget. Every job is in `log.jsonl`.
  - Five bridges, each painted tall (9:16) and wide (16:9), with the neighbouring chapters' own pictures as references: $0.04 to $0.05 each.
  - Two blank caption boxes: $0.03 each.
- Paintings are in `img/`:
  - `b<n>-p|l.jpg` are the raw paintings;
  - `-c.jpg` are trimmed of the painter's frame;
  - `sp-*.jpg` are the splash crops;
  - `cap-*-c.png` are the 9-slice caption boxes.
- The blank surfaces were found with `blank.py`, checked by eye, and mapped through the trim by `trim.py` into `slots.json`.
