# Round H6 · cover4: the X3+ first screen, five simpler takes

Boards:
- `ez/x2p-x3p-h6-cover4-390.png`: today's live cover first, then A to E. The red line is where a 390x844 phone's first screen ends.
- `ez/x2p-x3p-h6-cover4-1280.png`: the same at desktop width.
- `ez/x2p-x3p-h6-cover4-close.png`: D's four swipe panels, then 3x close-ups of every take at 390.

Run:
- Serve `ez/` with `python3 -m http.server 8961`.
- `node run.js <out> now,a,b,c,d,e 390,1280,320` (`CU=1 DPR=3` adds close-ups; `PEND=1` swaps in a throwaway "calls locked" round to test that state; never on a board).
- `node dstrip.js <out>` shoots D's panels.
- Boards: `/usr/bin/python3 board.py <shots> 390|1280 <out>`, then `board2.py <shots> <closeups> <out>`.

Each take is `_c.js/_c.css` (the shared builder, data and hand-drawn pieces) plus `<take>.js/.css`, laid over the built `v47-live-x3plus.html`. Mockups only: no live file was touched.

## What stays in every take
- **The four steps, in the owner's words, in order:**
  1. "They predict the move before earnings" ("before" is the one keyword)
  2. "The market close grades every prediction"
  3. "#1 on the leaderboard holds the golden ticket"
  4. "We follow its call on every bet"
- **Bet #1: NVIDIA** in the live bet section's own lettering (Bangers, gold, ink stroke, red extrusion), always with a carrier that says it is the first of several: "The first bet, not the last." (the bet section's own line), "first of many", or empty slots #2 to #4.
- **Season 1 and the issue number:** a corner box "Season 1 / No. 80". No. = rounds graded, from `ROUNDS.length`.
- **The cast are the four founder characters.**
  - The cast2 moments (predict, wait, win, lose, ticket, setting).
  - Three new Hedra paintings made from the founders' posters (likeness checked by eye: visor, red coat and glasses, white armour, flight suit).
  - No invented characters.
- **Real predictions.** The example is the newest round with calls in, else the newest graded round. Today (Sat 31 Oct, no calls in for Monday) that is round 80, Exxon Mobil (XOM), closed +2.17%:
  - GPT up 2.5% (pass, closest: the sheet's winner)
  - Kimi up 1.5% (pass)
  - Claude down 1% (fail)
  - Grok down 1.3% (fail)

  The leader is `SE.lead()`, Grok (P&L +$148,480 from `__x2pPnl`). Every number comes from the page's globals. With calls locked but not graded, every take drops the stamps and the move and shows the calls only (checked with `PEND=1`).
- **The headline** "4 AIs trade earnings / Who calls it best?" is kept, in the bet section's lettering. That makes it the loudest treatment on the screen, once.
- **The film (live F3 frame) and its button** are unchanged under each take.
- **On desktop**, each take recomposes into the cover's two columns around the film rather than stretching the phone version.

## The takes
- **A · The issue** (Z4's line): the first screen as one comic cover.
  - Masthead: corner box and title over a painted cover. The four founders stand on the exchange floor at night, the leader in front holding up the blank golden ticket, the bell above.
  - Each founder's real call sits in a balloon by his head, stamped pass or fail.
  - A starburst flash on the cover's corner reads "Bet #1: NVIDIA, first of many".
  - The four steps are the cover's "In this issue" strip under it. On desktop the strip moves under the film.
- **B · The page:** page one of the comic on the page's cream stock, one panel per step, each caption straddling its panel's top edge (never over a face).
  1. Four heads, each with its real call in a balloon.
  2. The round's winner crowned ("GPT wins") beside one who went the wrong way ("Claude fails", hit by the stamp), the move as the sound between them.
  3. The leader holding the golden ticket.
  4. The leader before the chip, lettered "Bet #1: NVIDIA".
  - All art is from cast2: $0 new.
- **C · The splash:** one picture, the leader holding up the golden ticket, read by its narration.
  - The narrator's yellow boxes run down the free purple side in reading order. Box 1 carries the four calls with pass/fail, box 2 the close.
  - **Step 3 is printed onto the golden ticket itself** ("Golden ticket / #1 / on the leaderboard", in the ticket's own ink, multiplied, turned with it).
  - Box 4 leads to "Bet #1: NVIDIA" under the picture. The simplest take.
- **D · One beat at a time:** the four steps as four big panels you swipe (scroll-snap, the next panel peeks in, numbered dots), one picture and one caption each.
  1. The four thinking, with their calls.
  2. The four under the bell: winner crowned, passes waiting, fails stamped; the move as the bell's "Dong!".
  3. The leader with "#1" printed on his ticket.
  4. The leader before the GPU chip, **the live countdown to Bet #1 set into the chip's four dies** (the bet section's device; `h_bet.js` betAt copied verbatim, ticking every second), with dashed empty slots #2 #3 #4 under "Bet #1: NVIDIA".
  - On desktop the four panels stand in one row under the title and the film.
- **E · The close, then the ticket:** two scenes, every word lettered into the place it belongs.
  - Panel one (new Hedra painting):
    - The four founders at the exchange rail hold blank cardboard signs. **Their real calls are written on the signs in marker** (Permanent Marker, multiplied into the card).
    - Each sign is stamped pass or fail; the winner's sign has a drawn crown.
    - The bell above rings the move ("Dong! +2.17%").
  - Panel two (new painting): the leader holds the golden ticket with "#1" and his name printed on it, in front of a GPU chip whose four dies carry the live countdown.
  - Captions straddle the panels' edges like narration boxes. On desktop panel one sits beside the title and panel two under the film.

## Pick
**E**, with C as the simple fallback.
- E answers this round's one note most directly: "a number sits in the scene the way a sign... sits in a real place". The calls are on the cardboard the founders hold, the grade is stamped on it, the bell makes the move, #1 is printed on the ticket and the countdown sits in the dies. Nothing but the four captions is laid on top.
- It also tells the story in two beats a newcomer reads in seconds: they called it, the close graded it; then the leader holds the ticket and we follow it to NVIDIA.
- **C** is the simplest and cheapest (one picture), but its calls are a list in a box.
- **D** is the best "one step per beat" (lesson 39), but most visitors only see panel 1 unless they swipe.

## Checks run
- 320, 390 and 1280px, every take:
  - no sideways scroll (`scrollWidth` = viewport);
  - no page or console errors;
  - only elements inside D's own scroller and the live film frame's `hcf-p` (already live) pass the edge.
- Rule 0:
  - no white or pale module ground (B's cream is the page's own stock as gutters, not a module ground);
  - no emoji (▲/▼ are text glyphs; crowns, stamps and bursts are drawn);
  - no dot-filled module;
  - name and ticker together ("Exxon Mobil (XOM)");
  - captions moved off every face (B's first draft had them over Grok's face; fixed: they straddle the panel's top edge).
- **Data honesty:** cast2's "predicting" pose always holds a rising chart. A down call gets the picture mirrored, so its chart falls (B, D). Otherwise Claude's and Grok's pictures would contradict their own down calls.

## How each could fail
- **A:**
  - The art is bound to today's leader (Grok in front with the ticket). A lead change needs a new cover per leader (about $0.09 each, plus re-measuring the face positions for the balloons).
  - The balloons are small on a phone (about 54x27px) and their stamps partly cover the arrows.
  - At 320px the cover is crowded.
  - Four steps in a strip under the cover read as a list, not a story.
- **B:**
  - The most panels, so the most to read. It is the tallest take: the first screen ends at panel 3.
  - The desktop is the weakest composition (small row panels beside panel 2).
  - The "setting before the chip" image exists only for Grok (other leaders fall back to their ticket pose until one is made, about $0.07).
- **C:**
  - Leader-bound (cast2 has a ticket pose for all four, so it switches by data, but the ticket lettering's place is measured for each picture: three more measurements).
  - The narration boxes cover the jacket and, at 320px, part of the ticket.
  - The calls are a small table inside a box, the least "comic" part of all five takes.
- **D:**
  - Only panel 1 is seen without a swipe, so steps 3 and 4 and the bet may never be read.
  - Scroll-snap carousels are often skipped on phones.
  - The die countdown is set by a perspective matrix measured on one image (a new image needs re-measuring).
  - The digits are dark ink on gold dies, readable but smaller than the bet section's.
- **E:**
  - The two paintings are leader-bound and position-bound:
    - the sign rectangles were measured on `e-close.jpg`;
    - the ticket and dies on `e-follow.jpg`;
    - the order of founders at the rail is fixed (GPT, Kimi, Claude, Grok);
    - a new leader needs a new `e-follow` (about $0.04) and a re-measure.
  - Marker on cardboard at 390 is about 17px for the call: fine. At 320 the model names on the signs drop to 8px.
  - "Dong!" for the close is a choice; the bet section uses no sound word.
  - Taller than today's cover (the film starts at 811px against 686 at 390).
- **All:**
  - The paintings are 1K (I did not spend on 2K: a 2K render is a new composition and would need every sign, ticket and die re-measured). Spend that only once one take is picked.
  - Safari not checked (mask-composite, `mix-blend-mode` on text).
  - Captions are the comic's narration device in the site's yellow; they still sit on top of the art by nature, though none covers a face.

## Hedra jobs (all gpt-image-2, 1K medium, png, the founders' posters as reference images; every charge equal to its estimate)
Total **$0.29** of $10. The rest of the art reuses cast2's moments.

| Name | Settings | Cost | Time | Result |
|---|---|---|---|---|
| a-cover | 3:4, 4 refs | $0.086 | 84 s | the four on the exchange floor, Grok in front with a blank gold ticket, the bell above; good likenesses, top sky free for the masthead |
| a-cover-w | 16:9, 4 refs | $0.079 | 52 s | the same for desktop, figures in the right two thirds |
| e-close | 4:3, 4 refs | $0.086 | 51 s | the four at a balcony rail holding four blank cardboard signs at one height, the bell ringing above: blank signs exactly as asked, ideal for page text |
| e-follow | 16:9, 1 ref | $0.042 | 43 s | Grok holding up a blank golden ticket before a modelled GPU chip with four blank gold dies, rain |
