# Round H7 · rounds3: where the round covers live

Brief (BRIEF-H.md, "Round H7", rounds3): each round is a comic book front cover with the winning founder painted in as the guest star (tiles3's take A). A tap sends the cover flying out at you. The blue ground becomes a place where the covers live. It doesn't have to be a comic shop, because "not everybody is fans of comics".

Boards: `ez/x2p-x3p-h7-rounds3-390.png` (all five places at 390x844: the full chapter, then the open state after a tap) and `ez/x2p-x3p-h7-rounds3-1280.png` (all five at 1280, plus the pick opened). Video of the pick's tap: `ez/x2p-x3p-h7-rounds3-tap.mp4` (14 s, 390x844). It taps the newest cover inside the painting, then two covers on the wall.
These are roughs. Each place has a painted establishing shot and a painted wall surface (Hedra gpt-image-2, 1K medium). The covers are coded lettering over tiles3's guest-star art. Nothing in `tools/v22/`, `media/` or any page file changed.

## The cover (the same in every place)
- **Art:** tiles3 take A (`../tiles3/img/a-r<n>-s.jpg`), the winner's founder crowned in the round's own scene. Two rounds were painted here: R79 (a GPT and Claude tie) and R80 (GPT), `img/a-r79-s.jpg` and `img/a-r80-s.jpg`, made with `star.py` (tiles3's prompt with the safe zone on).
- **Trade dress:** all live page text from ROUNDS and CO_LOGOS in ez-data.js.
  - Corner box: "Round", the round number, and the close date.
  - Masthead: the company name in Luckiest Guy, in the company's own colour from CO_LOGOS (gold where that colour is too dark to read). The ticker sits under it, so name and ticker always appear together. The name is fitted to one line.
  - Publisher line: "EZ · Season 1".
  - The move: a starburst, green when up and red when down.
  - Cover line: "GROK WINS!", "GPT & CLAUDE TIE!" or "NOBODY WINS!", with a small kicker ("The closest call", "A dead heat", "Nobody called it").
- **Hand-tuned shapes:** the burst and the corner box are jittered per round from a seeded random generator, so no two are the same.

## The five places (one line each)
1. **Back issues:** a comic shop's back wall at night. Each cover is bagged and boarded on a hook: a painted sleeve, screen-blended so only its light shows. Tap: the cover slides up out of its sleeve and flies at you, leaving the empty sleeve on the hook.
2. **The fight card:** the concrete tunnel from the dressing rooms to the ring. Each cover is a wheat-pasted poster (painted paper multiplied over it, each at its own slight tilt). Tap: the poster peels off the wall from its top and flies at you.
3. **Hall of Fame (pick):** a sports hall of fame. A green velvet wall carries gilt frames, each with a brass plaque engraved "No. n". The **newest three rounds hang inside the painting's own frames** (a homography onto each painted opening, as on the live rack) and can be tapped there. Tap: the cover swings out of its frame like a door and flies at you, and the hall blurs behind it.
4. **Late edition:** a Wall Street newsstand at the closing bell. Each cover hangs on a wire by two painted pegs (the wire and the pegs are cut from the painting). Tap: the pegs let go, the cover drops, then it flies at you.
5. **The vault:** a grading house's vault. Each cover sits in the live site's acrylic slab (`media/slab-acrylic-t1b.jpg`) with a slab label ("EZ Graded" and the date). Tap: the slab lifts out of the case and comes to you whole.

In every place the open cover sits over a blurred, darkened scene with "Tap to put it back". A tap or Escape flies it back to its spot. With reduced motion it fades instead of flying. The "show all" link is worded in each world's own language: "Dig through the long box", "See the whole card", "Walk the whole hall", "Every back edition", "Open every drawer".

## What I measured
- **Cover width at 390** (two a row in every place):
  - shop 158px
  - tunnel and kiosk 174 to 178px
  - hall 151px (the frame takes about 12%)
  - vault 136px (the slab border and label take about 22%)
- **Cover width at 1280** (four a row):
  - shop 234px
  - tunnel and kiosk about 257px
  - hall 223px
  - vault 213px
  - The hall's painted frames hold 152, 90 and 56px covers in perspective.
- **Overflow:** no sideways scroll at 390 or 1280 (scrollWidth equals the viewport). After fonts load, no masthead runs past its line (the longest is "Exxon Mobil" and "AstraZeneca").
- **Errors:** no console errors and no failed requests in any shot.
- **Cost:** 23 Hedra jobs, **$0.99 of $8** (`jobs.jsonl`). This covers 15 place images, 2 regenerated walls, 4 sprites and 2 guest-star covers. Each took 30 to 65 s.
- **Rule 0 checks run:**
  - No native emoji.
  - Name and ticker together everywhere a company is named.
  - No module filled with dots.
  - No content laid over a logo. The art's subject (the founder) sits in tiles3's safe band, 25 to 72% of the height, and the masthead and cover line sit in the top and bottom bands, as on a real cover.
  - **Exceptions:** two pale patches are trade dress, not modules: the cream corner box and the vault's slab label. Both are things a real cover or slab carries.

## My pick: 3, Hall of Fame
- **It is a sports world without being boxing.** Every sport has a hall of fame, so it reads as "competition" to people who aren't comic fans or fight fans. The covers are still real comic covers, hung like trophies.
- **It tells the season's story.** Every round gets inducted, the newest hang first, and "Walk the whole hall" opens the rest. "Every round so far" becomes a record you walk past.
- **The scene is interactive.** The newest three covers hang inside the painting's own lit frames and open from there, so the painting itself is what you tap (lesson 80).
- **It continues the bet chapter.** The gold, the warm picture lights and the dark green velvet follow the vault's palette (lesson 76). The plaque is a painted surface made empty for live text ("No. 80"), as the brief asks (lesson 81).
- **Second choice: 1, Back issues.** It is the most direct take, and the sleeve's sheen makes each cover feel like a collectible. But it is the comic-fan world the owner asked to look beyond.

## How each could fail
- **All five:**
  - The covers are coded lettering on painted art. At 150 to 175px on a phone, the kicker ("The closest call") and the ticker are 6 to 7px. The round number, the name, the move and the winner stay readable.
  - The finish of the backdrops leans photoreal, with little comic ink. The final paint should push the ink, as the bet vault does.
  - The tiled wall surfaces are each one painting mirrored. On a long "show all" the repeat shows, so a final pass needs a taller painted wall or several plates.
  - Only 8 rounds have guest-star art. All 80 would cost about $2.80 at 1K low (tiles3's estimate).
  - Nobody rounds (R51) still have the weak "knocked-over crown" picture. Tiles3's open question stands.
- **1 Back issues:**
  - Comic-fan coded, the world the owner wants to look past.
  - The sleeve's sheen dims the art a little.
  - The red and green spill at the wall's edges comes from the painting's lights.
- **2 The fight card:**
  - The paper multiply flattens the cover's colours.
  - The owner is "not the biggest fan" of boxing.
  - A wall of fight posters is the Upcoming tab's fight-night language, so two chapters would share a world.
- **3 Hall of Fame:**
  - The frames make the covers about 5% smaller than the shop's on a phone.
  - At 390 the plaque's "No. 80" is about 6px, so it is decorative there; the corner box carries the number.
  - The newest three appear twice: in the painting and first on the wall (two carriers). The live build should start the wall at the fourth round, or label the painted ones "Newest inductees".
  - The perspective quads are measured by hand on this painting, so a repaint needs them measured again.
  - A museum can feel still. It needs the small life lesson 32 asks for: a picture light flickering on as a round is inducted.
- **4 Late edition:**
  - The covers hang a little crooked by design, which reads as messy in a grid of eight.
  - A newsstand sells newspapers more than comics, so the cover format fights the place a little.
- **5 The vault:**
  - The smallest covers (136px).
  - The slab repeats the opened-round slab (T1), so the fly-out shows the same object twice.
  - "The vault" is already the bet chapter's world, so two chapters would share one place (lesson 27).

## Not done
- Nothing is painted at full quality. The pick would be repainted at 2K from this rough: the establishing shot with more frames, the comic ink pushed, and an empty plate for the title.
- The fly-out lands on the cover itself. On the live page it should land on the round's own opened card (the slab and its back).
- Shown on a standalone page fed by the live ez-data.js, not on v47. The X3+ header and the neighbouring chapters are not in the shots.

## Files
- `gen.py`: place prompts. `python3 gen.py <shop|tunnel|hall|kiosk|vault> <est|wall> <16:9|3:4|1:1>`; `Q=low` for low quality.
- `sprite.py`: the mounting sprites (frame, frame2, bag, paper).
- `star.py`: guest-star art for rounds tiles3 did not paint.
- `hd.py`: the Hedra v3 client, from tiles3.
- `mock.html`: the chapter. `?p=<place>`, served from `ez/` (`python3 -m http.server`); `window.__fly(i)` and `__close()` drive the tap.
- `shot.js`: shots. `node shot.js <out> <places> 390x844,1280x800`; `FLY=1` for the open state.
- `video.js`: the tap video.
- `board.py`: the boards.
- `img/`: paintings, crops and tiles. `raw/` is not committed.
