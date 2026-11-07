# Round H16 · world: three stages for the whole Overview

- **Board:** `ez/x2p-h16-world-390.png`. It has three columns at 390px, one per world, with each world's chapters top to bottom. Each chapter shows its painting, its lettered head breaking the panel's edge, its cream caption, and the hand-over line to the next chapter.
- **Bible:** `ez/x2p-h16-world-bible.md`. It gives each world's paragraph and its table of chapters, heads, captions and hand-overs.

These are roughs only. Nothing in `ez/tools/v22/`, `ez/media/` or any `ez/v4*.html` changed. Nothing was deployed or published.

## How they were made
- Every painting is gpt-image-2, quality medium, 1K, 3:4. The chip painting (`ez/media/bet-chip-h2.jpg`) is the style reference on every job, with the instruction "take only the art style, none of its content".
- Every prompt ends with "no text, no letters, no numbers, no people". The style line is in `batch.py`.
- Chapter 4 reuses the live `bet-vault-h2.jpg` and `bet-chip-h2.jpg`, unchanged.
- Each world also has one painted hand-over into the vault (`a4h`, `b4h`, `c4h`). The brief asked for about 5 paintings per world; this is 4 new plus 1 hand-over each.
- Run it with `python3 batch.py all`, which skips existing images, then `/usr/bin/python3 board.py <out.png>`. The fonts are in `fonts/` (Bangers, Barlow Condensed 600; OFL).

## The three worlds
- **A · The exchange at night.**
  - One building, walked from the steps down to the basement: the steps with the bell, the trading floor (four posts, a blank board), the records room, the stairs down to the vault, then the lift back up for tonight.
  - It reads as a real place at once, and "the money is in the basement" is a natural reason for the vault to be last.
- **B · The board.**
  - One circuit board, with a gold pulse running from part to part: a clock crystal (the bell), four sockets with meters (the models and their P&L), rows of memory (the record), then the NVIDIA chip.
  - It is the closest match to the chip's own style: every frame looks like the chip's world.
- **C · The tape (my pick).**
  - One strip of ticker tape runs down the page through the void, past one hero object per chapter:
    1. the ticker under a glass jar prints the calls;
    2. a tote board with four slots ranks the models;
    3. a brass cutter grades the tape at the close and drops the slips into a glowing card-file drawer;
    4. the uncut tape feeds into the vault's slot;
    5. the tape is still coming out of the ticker for tonight.

## Why C
1. **The hand-over is the world itself.** In A and B every cut needs a camera move (a door, a lift, a pulse) that someone still has to paint or animate (lesson 96). In C the same strip of paper simply continues from one panel into the next, so scrolling is following the tape (lesson 103). It is also the lightest to build: the page can draw the tape between panels.
2. **It is exactly the chip's style.** It is one object per frame on the black void, lit gold from behind, with green and red rims (lesson 108). A's interiors are rooms, so they drift towards scenery and away from "one object, seen clearly".
3. **Its story is the product's story.** The tape is the record: calls are printed before the report, cut and graded at the close, filed for good. And it ends where the pool is. The vault being last is the plot, not an architectural accident.
4. **It survives the data growing (lesson 44).** Tape is endless, and a card file only gets fuller.
5. **Every live number gets a surface (lesson 85):**
   - the calls are printed on the tape;
   - each name and P&L goes in a tote-board slot;
   - the round's company, move and winner go on the cut slip.

Second choice: A, if the owner wants a place you are in rather than a line you follow.

## How each could fail
- **A:**
  - It is the most scenery-heavy, and rooms invite clutter: the records room already has lamps, desks and slabs, against lesson 109's "fewer beats".
  - Five different interiors need five matched paintings for the hand-overs, and every hand-over (door, tube, stairs, lift) is an animation to make or fake.
  - The quote board in chapter 2 is a big blank black rectangle. If the live board doesn't fill it edge to edge, it becomes dead space.
  - The "lift back up" in chapter 5 asks the reader to move upward after scrolling down.
- **B:**
  - Every chapter looks alike (green board, gold traces), so the chapters don't tell themselves apart. "Memory sticks = the record" and "a crystal = the bell" need a caption to decode (lesson 23).
  - The NVIDIA chip appearing as "one more part" weakens the bet's climax.
  - The vault does not belong on a circuit board, so chapter 4's change to the rainy noir vault is the biggest seam of the three.
- **C:**
  - The ticker machine and tote board are 1900s objects. A visitor may read "old stock market", not "AIs", since no object says AI. The four slots carry the model logos only as page text.
  - Gpt-image-2 drew the tape with sprocket holes, like film. A cinema reading may compete with the film beat. The paint pass must ask for plain paper tape.
  - The tape's path must line up across panels at every width, or the continuous strip breaks into pieces.
  - The guillotine reads as violent or "cut", not "graded". A stamp or punch as the grading object may decode faster.
- **All three, shared assumptions:**
  - All three put the whole Overview on a black void. Lesson 98 says the show should be bright and only the bet dark. H15's one-style rule (lesson 108) overrides it here, but the owner should confirm that the record and the cast may be dark too.
  - The live vault is grey noir with rain. The new roughs are saturated gold, green and red. So chapter 4 is a seam in every world, smallest in C, where the vault painting's gold spot matches. A repaint of the vault in the chip's colour light would close it, but the brief says it stays.
  - Bangers has no lowercase, so "AIs" prints as "AIS" in the heads. The site's rule keeps the s lowercase, so the build needs the existing `.x2p-lc` treatment.
  - The heads were picked by me. Chapter 1 uses H15's headline start ("Four AIs call earnings."); the owner hasn't seen the others.

## Rule checks run on the board
- No text was baked into the paintings: checked at full size on all 15, and only blank plates and slots were found.
- No people and no founders appear on the landing (rule from H15).
- Every heading uses the bet's lettering, and the captions are cream on black.
- There are no white grounds and no emoji. The board is a storyboard, not a page, so the dead-space and overflow checks at 320/1280 don't apply yet.
- Not done: no 1280 versions (all paintings are 3:4) and no 2K paint pass. Both wait for the owner's pick.

## Cost
- 15 jobs × about $0.049 = **$0.74** of the $6 budget. Every job is in `jobs.jsonl` (model, settings, cost, time; each about 45 s).
- The balance was $91.28 before the run.

| file | world · chapter | honest read |
|---|---|---|
| a1 | A · 1 exchange façade | Strong: a bell over the door, gold windows, wet street. The top quarter has room for the headline. |
| a2 | A · 2 trading floor | Four posts and a big blank board read at once. The board is a large empty rectangle. |
| a3 | A · 3 records room | Good mood, but busy (lamp, desk, slabs, cabinets). |
| a4h | A · hand-over stairs | The clearest hand-over of all three worlds: the vault glows at the bottom of the stairs. |
| a5 | A · 5 lift | Dramatic, but it reads as "elevator", not "tonight". |
| b1 | B · 1 clock crystal | Crisp, but generic "circuit board". The top is not calm. |
| b2 | B · 2 sockets + meters | Four chips read as four. The meters are blank bars. |
| b3 | B · 3 memory | Nice depth, but it needs a caption to mean "the record". |
| b4h | B · hand-over trace | A good camera move along the trace to the chip. |
| b5 | B · 5 power connector | Weak. It means nothing without words. |
| c1 | C · 1 ticker in a jar | A strong single hero object, but the tape has sprocket holes. |
| c2 | C · 2 tote board | Four lit slots, tape looping in: the clearest "scoreboard". |
| c3 | C · 3 cutter + card file | The story reads ("cut, filed"), but the guillotine is a risk. |
| c4h | C · hand-over into the vault | It makes the plot visible: the tape feeds the vault. |
| c5 | C · 5 ticker still running | Calm and clear. The clock beside it hints at "tonight". |
