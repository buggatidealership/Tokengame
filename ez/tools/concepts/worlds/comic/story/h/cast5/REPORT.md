# Round H13 · cast5: Meet the models, today's big living portrait on painted tickets, after a painted opening panel

Brief: `../BRIEF-H.md`, "Round H13", `cast5`. It starts from cast4's pick B (the trading floor). These are mockups only:
- nothing in `ez/tools/v22/` or `ez/v4*.html` changed;
- nothing was deployed or published, and no PR was opened.

## Boards and video
- `ez/x2p-x3p-h13-cast5-390.png`: seven columns at 390:
  - today (live);
  - B1 at 2K (the pick);
  - B1 at 1K (the draft of the same take);
  - B2;
  - B3;
  - A;
  - C.

  Each column shows three phone screens: the opening panel with ticket #1 arriving, one screen down, and two screens down. A close-up row shows ticket #1 at 2x.
- `ez/x2p-x3p-h13-cast5-1280.png`: the section at 1280 (shot at 1x), today first, then the five takes. B1 at 1280 uses the 1K paintings; only the phone tickets were repainted at 2K.
- `cast5/cast5-b1h-390.mp4` (33 s, 390px): the pick, scrolled at reading speed with holds. The brief names only the two boards for `ez/`, so the video stays in this folder.
  - The founders' loops play inside the painted frames.
  - Each P&L counts up once on its quote board.
  - The last five lamps light one by one, oldest first.
  - Nothing needs a tap.

## What the brief asked, and what changed
1. **The big portrait is back.** The frame's window takes **about 47% of the ticket's width** on phones (x 0.485 to 0.948 of the ticket, 40% of its height). That is today's share; cast4's frame was about 35%.
   - On desktop the portrait spans the ticket's full width above the fields (74% wide, 37% high). That is today's desktop arrangement too.
   - The frame is a painting's frame in each world: a mahogany boardroom frame with a banker's lamp (B1), a gilt frame with a name plate (B2), a riveted brass-and-walnut frame with a bell (B3), carved gilt with a picture lamp (A), and a marquee frame ringed with bulbs (C).
   - The founder loops (`media/founder-<m>-anim.mp4`, unchanged) play inside the window. The poster is the window's background, so it shows under reduced motion and before the video loads.
2. **A new opening picture.** Each take opens on an establishing panel of its own world, painted for this round (3:4 on phones, 16:9 on desktop):
   - The heading "Meet the models" (the Overview's one face, `.ez-hd`) is lettered on the panel's calm top band of wall or sky.
   - The subtitle ("Not the Instagram kind. / Ranked by P&L: / $100K on every call.") is set on a blank board **in the scene**, in that board's own material (see the table below). It is no longer plain text under the heading.
   - The tickets follow on the same world (cast4's world plates, re-used).
3. **Every element of the ticket is hand-drawn.** The ribbon or pennant, the brass tags, the boards, plaques and signs, the badge, the frame, the stub and the lamps are all painted (gpt-image-2, one painting per model per take, laid on a per-model guide).
   - The P&L, the record and the best call are page text, set on the painted blank surfaces.
   - New this round: the lit lamps are paintings too (`lw-*`/`ll-*`: a lamp lit green and one lit red, laid exactly over the painted unlit lamp). cast4 drew the glow as a CSS radial gradient, which lesson 80 forbids beside painted pieces.
   - B2's ticks and crosses are painted chalk marks (`cw`/`cl`).
4. **No clicking into a model.** Nothing on the card is a link or a button. The motion is the scroll, plus three small loops per card: the founder's loop, the P&L count, and the lamps lighting.
5. **The count of takes:** three takes on B (B1, B2, B3), plus A and C carried forward with the big portrait.

Kept from today, in the same places: the stub with the rank and "Season 1" ("Golden ticket" and the gold stub for #1); the mark, name, version and flag; the P&L; Right way; Best call (company and ticker); Last 5; and the page's own P&L order.

## The five takes
All five are in the Silver Age line with flat print colours, bright and in daylight. None is noir, none is beige.

| Take | Opening panel | Frame | P&L | Right way / Best call | Last 5 |
|---|---|---|---|---|---|
| **B1 Boardroom** | the floor, traders looking up at a huge blank quote board | mahogany, green banker's lamp | lit on a black quote board with a brass rim | two smaller quote boards | glass lamps that light green or red (painted) |
| **B2 Chalk post** | a clerk on a ladder chalking a big slate on a trading post | gilt with a name plate | chalked on a green slate | two slates | five small slates, each with a painted chalk tick or cross |
| **B3 Split-flap** | a split-flap arrivals board over the floor | riveted brass and walnut with a bell | printed on the blank split-flap board | engraved on two brass plates | brass tokens with red enamel, each with a stamp |
| **A Gallery** (carried) | a red museum hall, a big blank gilded placard | carved gilt | engraved on a brass plaque | two brass plates | velvet ovals, each with a stamp |
| **C Midway** (carried) | a barker pointing his cane at a blank bulb-ringed sign | marquee bulbs | lettered on a red prize sign | two blue booth signs | bulbs that light green or red (painted) |

## The surface under every live text
Every word and number is page text: live, and on a surface the painting leaves blank for it. No text is baked into the art. Every prompt ends "no text, no letters, no numbers, no logos".

| Live text | Surface |
|---|---|
| "Meet the models" | the opening panel's calm top band of wall or sky (the painting was asked to leave it empty) |
| the subtitle | B1: the blank quote board, lit gold. B2: the slate, in chalk white. B3: the blank flaps, in cream. A: the gilded placard, engraved ink. C: the bulb-ringed sign, lettered in cream with an ink outline. Found by colour in each painting (`opfind.py`); B2's slate is partly behind the clerk, so its clear part is set by hand. |
| rank `#1`-`#4` | the stub's round gold seal; on #1, cast4's gold-foil stub laid over the ticket's own stub, so it follows whoever leads |
| "Season 1" / "Golden ticket" | the stub's tall gold strip |
| model mark (the logo path from `MODELS`) | the brass badge (B1, B3), gold seal (B2), gold medal (A) or carnival token (C) |
| name | the yellow pennant (B1, B3, C) or gold ribbon (B2, A) |
| version | a punched brass tag (B1 to B3), a red enamel tag (A) or a red booth tag (C); the painted flag (cast4's) hangs beside it |
| P&L | the quote board / slate / flaps / plaque / prize sign |
| Right way, Best call, company (ticker) | the two smaller boards, slates, plates or signs |
| Last 5 | the five painted lamps, slates, tokens, ovals or bulbs; the label "Last 5" is on the ticket's printed stock |

## Plain text outside the world, per take
Counted at 390: every visible word that does not sit on a painted object.
- **Today (live):** the subtitle (11 words) on the orange ray ground, plus the card labels on code-drawn boxes.
- **B1, B2, B3, A and C: 0 words.**
  - The heading is lettered on the panel's own wall or sky (the template's "title over the establishing picture").
  - The subtitle is on the board.
  - Every ticket word is on a painted field or on the ticket's printed stock.
  - The one line per model for screen readers is invisible.

## My pick: B1, the boardroom
Reasons:
- **The opening panel makes the chapter's claim with no words:** a floor full of traders looking up at the board where the line is lit. The same board idea carries the P&L on every ticket below, so the opener and the cards read as one place (lessons 76, 93).
- **It is the clearest at phone size.** The black boards give the figures the most contrast of the five (green and red P&L, gold record), and the lit lamps read as results at a glance (lesson 85: money on a quote board, results as lamps).
- **The hand-off works:** it opens on an exchange, the same kind of room as Smart or lucky's big board (`h_sol`).

I repainted B1's four phone tickets and its phone opener at **2K high** ($1.39). Against the 1K draft (third column of the board), the ink line and the brass are crisper at 2x.

**Second: B3.** The split-flap board is the most "live" object: a board that changes at every close is exactly what a P&L is. Its brass plates are lower-contrast for the record figures, though.

**B2** is the warmest (chalk), but the slates soften the figures. **A and C** still read as a museum and a funfair rather than the floor.

## How each take could fail
- **All:**
  - The painter does not place fields exactly where the guide asks. Each painting is measured (`fields.py` by material colour, `measure.py` for the lamps), with hand fixes where the colour test fails:
    - `FIX` in fields.py: B3 GPT's brass plates;
    - `HAND` in measure.py: B1 2K Claude's lamps, C Kimi's bulbs, B1 desktop Grok's lamps;
    - desktop badges are the guide moved by the painting's own shift.

    So the four cards are not pixel-identical, and a new painting needs those scripts rerun plus an eye on the overlay.
  - Measured at 320, 390 and 1280:
    - no text leaves its field (`over: []`; the fitter steps type down until it fits);
    - `scrollWidth` equals the viewport;
    - no console errors.
  - The subtitle is 13 to 15px on a phone, because the boards are that size in the picture. It reads on a phone. If the owner wants it larger, the board must be painted bigger.
  - The hard ink shadow under each ticket is still a CSS drop-shadow (a code effect next to paintings).
  - "Last 5" sits close to the lamps on some desktop tickets.
  - On desktop the opening panel is 614px tall at 1280, so the section is 1124px tall (today 685). The owner may find it long on a laptop's first screen.
  - The tickets' world behind them is cast4's plate, so B1 to B3 share one floor painting behind the cards. The openers differ; the floor behind the cards does not.
  - On phones the world is a sticky plate (as cast4); this is untested on iOS Safari.
  - The founders' loops: four videos play at once when two cards are on screen, as today.
  - For these shots the desktop crawl bar (`.x2p-cw`) is hidden so it does not cover the section; the live page keeps it.
- **B1:** the version tag (brass, about 10px) is the lowest-contrast text, as in cast4. The black boards are the darkest element on a bright card.
- **B2:** the chalk figures are softer and less crisp than lit ones (lesson 92: data surfaces stay sharp). The clerk covers part of the phone slate, so the line uses only its clear left part.
- **B3:**
  - The split-flap P&L carries a drawn seam across its middle (a background-clip on the text). It reads as flaps at 2x and as a thin line at 1x.
  - The record figures (green or red on brass) have the lowest contrast of the five.
  - The flaps panel on the phone opener is thin (about 50px), so the line is three small rows.
- **A:** the brass is airbrushed, glossier than flat print. The gallery opener is about portraits, not trading.
- **C:** red prize signs sit close in hue to Claude's orange and to the stub's red half, and the bulb frames read as mirrors more than paintings.

## Checks run
- At 320, 390 and 1280px, all takes:
  - no sideways scroll;
  - no console errors;
  - no text overflowing its field;
  - nothing over a face or a number. The flag sits beside the version tag; on desktop it was shrunk so it no longer touches the P&L board.
- There are no white or pale grounds inside a ticket: the frame windows are cut out and filled by the portraits.
- There are no code-drawn boxes, no native emoji (ticks and crosses are painted stamps or chalk) and no dot pattern as a ground.
- Every number comes from `POP.data()` (`__x2pPnl`, `MODELS`, `ROUNDS`) on the built page. None is typed.
- Zoomed in at 2x on #1 in every take, and on the lower tickets at 390, before building the board.

## Method (files)
- `layout.json` holds the new layout: the frame window at about half the ticket's width.
- `guide.py` writes one guide per aspect and model colour.
- `batch.py` runs gpt-image-2:
  - takes `b1 b2 b3 gal mid`, plus `b1h` = B1 at 2K high (phone only);
  - kinds `tickets`, `openers`, `props`.
- `hd.py` is the Hedra v3 client (from cast4; never prints the key).
- `cut.py` cuts the tickets and props out of their white ground; the openers are copied.
- `fields.py`, `measure.py` and `opfind.py` measure where each painting actually put its fields, lamps, badge and opener board. They write `fields.json`, `fit.json` and `op.json`.
- `take.js <out> <W> <now|b1|b1h|b2|b3|gal|mid,...> [--video]` (serve `ez/` on port 8941) builds the take inside the live `.wc-chars` section of `v47-live-x3plus.html`. It re-uses cast4's grounds, gold stubs, flags and stamps (`../cast4/cut/`).
- `take.css` styles the take; `board.py` makes the boards.
- Rejected first openers are in `img/rej/`:
  - the desktop openers left a flat empty third of the picture (the midway's was pale);
  - the phone gallery placard was too small to carry the line;
  - the chalk clerk covered his board.
- Raw PNGs (`raw/`) and screenshots are not committed.

## Cost: $4.14 of $10 (68 jobs, 0 failed)
| What | Model | Settings | n | Total |
|---|---|---|---|---|
| tickets (5 takes x 4 models x phone + desktop) | gpt-image-2 | 1K medium, 3:4 or 9:16, 1 guide ref | 40 | $1.87 |
| opening panels (5 x phone 3:4 + desktop 16:9, plus 7 repaints) | gpt-image-2 | 1K medium | 17 | $0.56 |
| lit lamps and bulbs (green and red), chalk tick and cross | gpt-image-2 | 1K medium, 1:1 | 6 | $0.32 |
| B1 at 2K: 4 phone tickets + phone opener | gpt-image-2 | 2K high, 3:4 | 5 | $1.39 |

Timing: a median of 44 s per job, 5 to 10 in parallel. Every job is in `jobs.jsonl`.

Per take (1K paintings, including repaints): B1 $0.58, B2 $0.62, B3 $0.47, A $0.51, C $0.58. B1 at 2K adds $1.39. B1's lamps and C's bulbs are about $0.11 each, and B2's chalk marks $0.11. The flags, stamps, gold stubs and grounds come from cast4 at no extra cost.

Repainting the pick's desktop tickets at 2K would cost about 4 x $0.27.
