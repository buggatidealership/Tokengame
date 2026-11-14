# Round H9 · rounds4: Every round so far, drawn

Brief (BRIEF-H.md, "Round H9", rounds4):
- Keep the owner's three favourites from rounds3 (Back issues, The fight card, Late edition) and add three new places.
- Draw everything in the bet vault's look (`media/bet-vault-h2.jpg`, brush and ink), plus two other drawn styles. Never realism, never a 3D render.
- No founder (guest star) on the covers. The cover art is the round's own scene with its outcome, and the cover line still names the winner.
- Keep the tap that sends a cover flying out.

## Boards
- `ez/x2p-x3p-h9-rounds4-390.png`:
  - Today's live section first, then the six places.
  - For each place: style A as the full chapter, styles B and C as first screens, the tap state, and a 2x close-up of the pick in all three styles.
- `ez/x2p-x3p-h9-rounds4-1280.png`:
  - Today's live section and the pick tapped.
  - Each place in all three styles, at half size.
- `ez/x2p-x3p-h9-rounds4-tap.mp4` (390x844):
  - The pick (Hot off the press, style A).
  - Scroll in, the newest cover nudges, tap: it comes off its clip and flies at you. Tap to put it back, then a second cover.

All of these are roughs. Every place has a painted establishing plate (3:4 for phones, 16:9 for desktop) and a painted wall it hangs on. Every cover is the round's T3 scene redrawn in the same style. Every word and number is live page text from ROUNDS and CO_LOGOS. Nothing outside this folder and the boards changed.

## The three drawn styles (the "detachable layers")
- **A, brush-and-ink noir with gold spot.**
  - The vault's look: sable-brush ink, dry brush, scratched rain, deep blacks, and the light drawn in gold, with a touch of green and red.
  - The vault image is passed to Hedra as a style reference on every A job ("take nothing else from it").
  - The first test without that reference came out inked but grey, with no gold light. It is kept in `img/old/`.
- **B, Silver Age print.**
  - A clean brush-and-nib line, flat night colours (blue, emerald, red, gold), Ben-Day dots only in some shadows, plates a hair out of register.
- **C, hard-shadow shapes.**
  - Big flat black shadow shapes, few inner lines, flat teal, oxblood and slate, one gold light.
  - The prompt describes this look without naming an artist.

## The covers (the same object in every place)
- **Art:** each round's T3 tile (`media/tile-r<n>-t3.jpg`) redrawn by gpt-image-2 as an edit, three times (once per style).
  - The prompt keeps the composition and the gold, crowned winner's object.
  - It removes people, the blank plates and the beige.
  - It keeps the top quarter and the bottom fifth calm for lettering.
  - Files: `img/cv-r<n>-<style>.jpg`.
  - The mockup uses eight rounds: 78, 77, 76 (a tie), 75, 74, 72, 70 (Kimi) and 51 (nobody won).
- **Trade dress, all page text:**
  - the corner box "Round n" with the close date, now ink black with a gold rule (the cream box is out);
  - "EZ · Season 1";
  - the company in its own colour, with the ticker under it;
  - the move on a green or red burst;
  - the cover line ("CLAUDE WINS!", "GPT & CLAUDE TIE!", "NOBODY WINS!") in the Overview's heading yellow.
- **Chapter heading:** the Overview's one face, Bangers #ffd21f with the .075em ink stroke and the stacked red and ink shadow, tilted -2.2deg (copied from `h_bet.css` `h2.hb-h`).

## The six places
1. **Back issues (kept):**
   - A comic shop's slatwall at night.
   - Each cover sits in a drawn sleeve: a wobbly ink outline, the board's top band, a hook through the tab, and brush-stroke glints on the plastic.
   - Tap: the cover slides up out of the sleeve.
2. **The fight card (kept):**
   - The boxers' tunnel.
   - Each cover is wheat-pasted with a torn edge (a jittered clip-path, its own per round), the wall's own paint overlaid on it, and brush smears of paste.
   - Tap: the poster peels off from its top.
3. **Late edition (kept):**
   - The Wall Street newsstand at the bell.
   - Two drawn wooden pegs per cover and one sagging ink wire per row.
   - Tap: the pegs let go, the cover drops, then it flies at you.
4. **Hot off the press (new, my pick):**
   - A print shop at night: the cylinder press, one hanging lamp, sheets drying on wires.
   - Each cover hangs from a drawn bulldog clip on the row's wire.
   - Tap: the cover is pulled down off its clip.
5. **The locker room (new):**
   - Stadium lockers after the game.
   - Each cover is taped inside an open locker door with two strips of black gaffer tape, the door's vents above it and a gold latch.
   - Tap: the door swings and the cover comes out.
6. **Now showing (new):**
   - The lobby of an old picture palace.
   - Each cover is a one-sheet in a brass poster case (a two-tone gold frame, mitred corners, thick outer and thin inner ink, a glass glint).
   - Tap: the case opens toward you.

**What all six share:**
- Only the newest cover moves before anyone taps: it lifts and settles every 3.6 s, then stops for good after the first tap (lesson 86). It does not move with reduced motion.
- The "show all" link speaks the world's language: "Every print run", "Open every locker", "Every feature so far" and so on.
- In the open state the scene blurs behind the cover, with "Tap to put it back". A tap or Escape closes it.

## What I measured
- **Cover width at 390** (two a row):
  - shop 158px
  - tunnel, kiosk and press 172 to 178px
  - locker 148px
  - cinema 143px (its frame takes about 17%)
- **Cover width at 1280** (four a row): 211 to 263px.
- **Cover width at 320:** 114 (cinema) to 142px.
- **Overflow:**
  - no sideways scroll at 320, 390 or 1280, in any place or style;
  - no company name or cover line runs past its line (checked with scrollWidth);
  - no console errors and no failed requests.
- **Fixed after the first shots:** the press clip and the kiosk pegs bit into the masthead and covered part of "Intel" and "Amazon". The cover now hangs lower, the mount is sized by width, and a clip bites only the top 1.5% of the cover. It is clear of the names at every width.
- **Cost:** 82 Hedra jobs, **$4.29 of $8** (`jobs.jsonl`).
  - Plates: 54 at about $0.037 (A: about $0.05 with the vault reference).
  - Covers: 24 at about $0.05.
  - The pick's two plates at 2K high: $0.23 and $0.28.
  - 6 test jobs.
  - Each job took 30 to 110 s.
- **Rule 0 checks run:**
  - no native emoji;
  - name and ticker together on every cover;
  - no module filled with dots;
  - no beige trade dress (the corner box is ink now);
  - nothing laid over a logo (the covers carry scenes, not logos);
  - every mount is a hand-jittered SVG with ink outlines, so no two are alike.

## My pick: 4, Hot off the press, in style A (noir)
- **It continues the book.** The site is one comic book (H7). The place where every round lives is where the book is printed, so each round becomes an issue that came off the press the night of its close. This is the only one of the six where the cover's format and the place's purpose are the same thing.
- **The covers hang in the painting already.** The 2K plate's drying lines run across the top, and the grid's clips and wire continue them below. One material carries from the establishing shot into the wall (lesson 76).
- **A is the vault's own ink.** The vault chapter and this one would read as the same book drawn by the same hand. The gold lamp is the spot colour, and the press's ink cans carry the green and the red.
- **Not comic-fan coded and not boxing.** A print shop reads as "made fresh tonight" to anyone.
- **Second choice: 6, Now showing.** Every round has a film, so a cinema is the most literal "every round is a feature", and the gold case is the loudest object of the six.
  - The risk: Upcoming already uses name-in-lights marquee language, so the two chapters could share a world.
- **Among the kept three:** Late edition (pegs on a wire) is the closest relative of the pick. If the owner wants to keep a favourite, it can take the press's clips without changing much.

## How each could fail
- **All six:**
  - **Some covers misstate their outcome.** gpt-image-2 does not always keep the gold crown on the right object:
    - R76 (a GPT and Claude tie) came back with four gold shields and crowns on more than two in some styles, which reads as "everyone won";
    - R72's Reddit scene kept the Reddit mascot drawn into the art, a near-logo;
    - R51 (nobody won) has nothing gold, as it should.
    - Each cover must be checked against the sheet's winner before it ships, and the build needs a rule for redrawing failures.
  - **Small text at 390.** At 143 to 178px the kicker ("The closest call") and the ticker are about 6px. The round, the name, the move and the winner stay readable.
  - **Mounts against painted plates.** The mounts are coded SVG ink drawn to match, but at 2x they are cleaner than the brush in the plates (the clip, the pegs and the brass frame read as vector). A final pass should have Hedra paint one sprite per mount and style, as the plates are.
  - **The wall tiles repeat** (one 1:1 painting stacked down the column). The seams show on "show all".
  - **The covers overflow the T3 scenes they are redrawn from.** Some rounds' T3 tiles are busy (the circuit boards, R75's QR wall), so the redraws are busy too. At 150px the move and the winner carry the cover, not the art.
  - **Cost to ship:** 80 rounds x 1 style is about $4 at 1K medium; per extra style, the same again.
- **Style B, Silver Age:**
  - Its bright press sheets and kiosk magazines are pale, close to the "no beige" line. They are blank paper inside the scene, not module grounds, but the owner may read them as beige.
- **Style C, hard shadow:**
  - Flat and dark. On a phone the plates read a little empty, and the covers' midtones go muddy next to A.
- **1 Back issues:** still the comic-fan world. The sleeve glints are thin strokes and read as scratches at 1x.
- **2 The fight card:**
  - The overlay of the wall paint on each poster dulls the cover a little.
  - The owner is "not the biggest fan" of boxing, and Upcoming already uses fight night.
- **3 Late edition:** the covers hang a little crooked by design, which reads as messy in a grid of eight.
- **4 Hot off the press:**
  - The 2K plate's sheets are grey blanks. On the live page the newest three should hang in those painted sheets (a homography, as rounds3's hall did), otherwise they are blank paper in a printing world.
  - The bulldog clip is coded, not painted.
- **5 The locker room:** cover width 148px. The gaffer tape covers the cover's top corners slightly (the corner box at 320). A locker is private, which fights "on public record".
- **6 Now showing:**
  - The smallest covers (143px; the brass frame takes 17%).
  - The flat gold frame is the brightest thing on the page and outshouts the chapter heading.
  - It risks sharing Upcoming's marquee world.

## Not done
- **Only the pick is painted at 2K.** Its 2K plates are `img/press-noir-est-{3x4,16x9}-2k.jpg`, used by the mockup for press and noir. The other plates are 1K roughs.
- **The newest covers do not yet hang in the painting's own drying lines.** The quads would need measuring on the 2K plate.
- **The fly-out lands on the cover itself.** On the live page it should land on the round's opened card (the slab and its back).
- **Shown on a standalone page fed by the live ez-data.js, not on v47.**

## Files
- `gen.py`:
  - `python3 gen.py plates` prints the place jobs (place x style x 3:4, 16:9 and the wall).
  - `python3 gen.py covers` prints the cover redraws.
  - The prompts are there; A carries the vault reference.
- `run.sh <jobs file> [parallel]`: runs each job through `hd.py` and skips names already in `img/`.
- `hd.py`: the Hedra v3 client (from rounds3). It never prints the key.
- `mock.html`: the chapter.
  - Use `?p=shop|tunnel|kiosk|press|locker|cinema&s=noir|silver|shadow`, served from `ez/`.
  - `window.__fly(i)` and `__close()` drive the tap.
- `shot.js`: the shots.
  - `node shot.js <out> <places> <styles> 390x844,1280x800`.
  - `FLY=1` for the open state; `LIVE=1` shoots today's live section (v47) with the header hidden.
- `video.js`: the tap video.
- `board.py`: the boards (`/usr/bin/python3 board.py <shots dir>`).
- `img/`: plates, walls and covers; the `old/` folder holds the two pre-reference A tests. `raw/` is not committed.
