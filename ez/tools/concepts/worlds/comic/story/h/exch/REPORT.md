# Round H17 · exch: the exchange building, old school against new school

## The files
- **Boards:**
  - `ez/x2p-h17-exch-390.png`: today's live top, then O1, O2, O3, N1, N2 and N3. A close-up row under them shows beat 1 of each school and the hand-overs at 2x.
  - `ez/x2p-h17-exch-1280.png`: the same at 1280px, old school on the first row and new school on the second.
- **How to run it:**
  1. Serve `ez/` on port 8952.
  2. `node run.js <out> now,O1,O2,O3,N1,N2,N3 320,390,1280`
  3. `/usr/bin/python3 board.py <out> <width> <file>`
- **The code:**
  - `_x.js` and `_x.css` are laid over the built `v46-live-x2plus.html`.
  - X2+'s hero and its film-bill section are hidden. The new top goes in their place, so the standings ("01 Current standings", the future Meet the models) follow straight after it.
  - `window.__X` picks the take.
  - Everything below is untouched.
- **What is left out:** beats 2 and 3 (how a round works, the film) are top1's and top2's job. A dashed note marks where they go. In the pasted takes the note is gone, because there the two panels touch.
  - On the real page, "pasted" means the hand-over butts the panel before it, which is then the film (beat 3), not beat 1. The board butts it to beat 1 only to show the seam.
- **The boards** are downscaled after rendering (390 board to 80%, 1280 board to 70%) to keep them under 9 MB each.

## What I made
Every take has two panels in the chip's art style (Round H15): a painted comic object or room, one warm gold key light from behind, a green rim on the left, a red rim on the right, a black void.
- **Beat 1** is the headline panel, "Four AIs call earnings. The market keeps score." The headline is set in the bet's lettering and breaks the panel's bottom border.
- **The hand-over** carries the motto into Meet the models: "They used to call it stock picking. We call it model picking."

**Beat 1 shows the claim acted out, not a ranking.** The exchange's own board shows the newest graded round (R80 Exxon Mobil today):
- a header slate: "Last close · XOM · Exxon Mobil", then the move;
- four rows, one per AI: its mark, its name, its call, and "✓ Right" or "✗ Wrong" as graded by the close.

So the picture says both halves of the headline: four AIs called, and the market scored them. top1's B board ranked the AIs by P&L, which duplicated the standings right below; this board leaves P&L to Meet the models.

**Two schools:**
- **Old school (O):** a 1920s marble and brass hall. A carved wooden quotation board with black slate rows, a brass closing bell above it, trading posts on a marble floor. The figures are chalked on the slate.
- **New school (N):** a glass and steel exchange with balconies. A black LED wall, curved desks with green and red edge lights. The figures are lit on the LED (DotGothic16, glowing).

**Three break treatments.** Each one also places the motto differently, as the brief asks:

| | Break | Where the motto lives | Old school | New school |
|---|---|---|---|---|
| **1** | Classic gutter: two keylined panels with an even black gap | Two narration captions in the last frame: "They used to call it stock picking." top left, "We call it model picking." bottom right in gold | O1: a dusty brass ticker under a glass dome beside one lit chip on a brass stand. The chip's lid shows the four AI marks in P&L order | N1: the same ticker beside a server blade with one chip, the four marks on its lid |
| **2** | Pasted beats: the hand-over butts beat 1's foot, with the headline bridging the seam | In the world, as a sign | O2: a marble arch at the back of the hall. The motto is gilded into the lintel (Cinzel, a cut shadow). Through the arch, four chips on velvet pedestals, one per AI in P&L order; the leader's lid is lit gold | N2: a server aisle. The motto is lit on the LED band hung across it. At the end, a glass case with the four chips; the leader is lit gold |
| **3** | Designed break: no second panel; the ticker itself is the gutter, running edge to edge | It crawls on the ticker as a reading-out | O3: blank paper ticker tape, the motto printed in ink | N3: an LED ticker band, the motto in amber dots |

The crawl runs while the strip is on screen and stops off screen. It is still with reduced motion; the boards are shot that way.

**Live data** (nothing typed; all from the page's own globals):
- **The round** is the newest entry in `ROUNDS` with a result: R80 Exxon Mobil (XOM), +2.17%. The calls are GPT ▲2.5, Kimi ▲1.5, Claude ▼1, Grok ▼1.3.
- **Right or wrong** is the call's direction against the move's sign.
- **The chips' order and the gold leader** come from `__x2pPnl().A`, ranked by P&L (Grok first today).
- **The marks** come from `MODELS[m].d`.

## The surface under every live text
Each surface is an SVG mapped onto the four painted corners of a blank surface with one `matrix3d`, as top1 does.
- The dark slates, LED rows, lintel, lids and bands were found with `quads.py`, which finds dark regions.
- The tilted chip lid on the stand in O1 was measured by eye on a gridded crop.
- No surface leaves its picture (`outSurf: 0` at 320, 390 and 1280 for every take).

| Text | Surface | Material |
|---|---|---|
| O: last close, four rows | the board's blank black slate header and four slate rows | chalk-cream with a rough chalk edge (SVG filter `#xChalk`); calls in green and red |
| N: last close, four rows | the LED wall's blank header strip and four blank rows | lit dot-matrix with a soft glow; calls glowing green and red |
| O1 / N1: four marks | the one chip's blank glass lid (perspective-mapped) | lit marks |
| O2: the motto | the arch's blank marble lintel band | gold leaf in an engraved cut (a dark wall above, a pale lip under) |
| N2: the motto | the aisle's blank LED band | amber and cream LED dots |
| O2 / N2: four marks | the four chips' blank lids | lit; the leader's lid with a gold rim and glow |
| O3: the motto | the blank paper ticker tape | ink multiplied into the paper |
| N3: the motto | the blank LED band | amber dots with a glow |

**Not on a surface:**
- the headline (lettering, as in the bet);
- the motto captions in O1 and N1 (comic captions on the panel's corners, as asked);
- on desktop, the round line of beat 1 ("R80 · Exxon Mobil · closed +2.17%"), as a caption box on the panel's top-left corner. The wide paintings have only four slates, which all go to the four AIs.

## My pick: O2, old school with pasted beats
- **The motto needs an old world to push against.** In the marble hall, "They used to call it stock picking" is the room you are standing in. The four chips on velvet through the arch are "We call it model picking". One picture holds both halves of the sentence. In the glass exchange everything is already new, so the "used to" has nothing to stand on.
- **It is a door.** Lesson 96 asks for transitions that belong to the world. Walking through the arch from the hall into the room of chips is that transition, and the next chapter (the chips) is already visible in it.
- **The sign is diegetic.** A motto carved into an exchange's lintel is how real exchanges carry their words (the NYSE pediment, the Royal Exchange's inscription). It needs no caption box.
- **It hands over to the bet.** Old school's brass, iron and gold are the same family as the vault at the end. The new school's LED glass is a different material from the vault.
- **Where the new school is stronger:**
  - Its palette stays closer to the brief: black, green, red and gold, with no brown wood.
  - The LED rows are the crispest data surface of the six; the figures read best at 390.
  - A hybrid is easy, because the parts are separable: N's LED-wall beat 1 with O2's arch hand-over. But it would put two worlds on one screen (lesson 27).
- **Second choice: N3, the LED ticker band as the gutter.** It is the shortest sequence (lesson 109: no second panel), and the motto reads as a ticker reading out, the most "exchange" device of the six.

## How each take could fail
- **All takes:**
  - The paintings are model-drawn rooms (gpt-image-2 with the chip as the style reference), not real places. The heroes and the wide hand-overs are Topaz 2K upscales of 1K drafts: sharper edges, no new detail.
  - These are rooms, not one object alone on a void like the chip. They are busier than the bet's chip panel. The owner may find a hall too "3D realism" against the vault's brush and ink (lesson 88). Both schools came out as painted comic, not as dry-brush ink.
  - The slate and LED text is about 10 to 12px at 390 and about 8px at 320. It is readable but small; the rows' "✓ Right" is the smallest word.
  - The beat 1 rows repeat each AI's mark and name, which Meet the models shows again right below. They show calls and verdicts, not P&L, so they do not duplicate its numbers.
  - The example round is always the newest graded one. A round with fewer than four calls would leave one slate or LED row blank. Not laid out yet.
  - Safari was not checked (`matrix3d` on SVG text, SVG filters on text, `mix-blend-mode`).
- **Old school:**
  - The board's carved wood reads brown-red, which is outside the brief's palette (black, green, red, gold). A repaint with ebony wood would fix it.
  - The chalk filter roughens small figures at 320.
  - O2's lintel motto is set in Cinzel, a second display face on the page. Lesson 91 allows only one heading face. I treat it as an engraving that belongs to the building, but the owner may disagree.
- **New school:**
  - DotGothic16's percent sign is its own; Doto's looked like "X" and was dropped.
  - The LED wall is a big black rectangle; with no data on it, it would read as an empty screen.
  - "Glass exchange" is generic. Without the motto it could be any trading-floor stock image.
- **1 (classic gutter):** the still life is a second picture that tells the motto by juxtaposition. A newcomer may read the ticker as decoration, not as "stock picking". The captions carry it.
- **2 (pasted):** O2's leader glow on a 30px lid is subtle at 390. N2's chips are tiny at the end of the aisle (about 12px lids at 390), so their marks barely read on a phone.
- **3 (designed break):**
  - At rest (reduced motion), only the first half of the motto shows on a phone. "We call it model picking" needs the crawl.
  - The tape's scroll ends and the band's ends are cropped off-screen. On desktop the image is stretched sideways to span the width, so its glow rays are stretched a little.
  - A moving line right above the standings may pull the eye from the board.

## Checks run
- **Widths:** 320, 390 and 1280px for every take. No sideways scroll (scroll width = viewport), no page or console errors, no surface outside its picture.
- **Zoom:** checked every board and hand-over at 2x. Fixes on the way:
  - Doto drew "%" as an "X": switched to DotGothic16.
  - The LED header's company line ran into the move: it is now fitted to the space left of it.
  - The designed-break band did not span 1280px: the image is now stretched to the viewport and the strip is shorter on desktop.
  - The page's fixed bottom crawl was caught mid-shot: it is hidden for the shots.
- **Rule 0:** no white or pale module grounds (the tape is paper, a material); no native emoji; no text over a face or logo; no dot fill; one moving thing per view (the crawl, in 3 only).

## Cost (Hedra)
| Job | Model | Settings | Cost | Time | Result |
|---|---|---|---|---|---|
| o-hero-t | gpt-image-2 | 1K medium 3:4, ref chip | $0.050 | 49 s | marble hall, board with a blank header and four blank slates, bell; the best of O |
| o-hero-w | gpt-image-2 | 1K medium 16:9, ref chip | $0.042 | 43 s | the same, wide; four slates only (no header) |
| o-arch | gpt-image-2 | 1K medium 3:4, ref chip | $0.050 | 43 s | arch with a blank lintel, four chips on velvet; clean |
| o-arch-w | gpt-image-2 | 1K medium 16:9, ref chip | $0.042 | 42 s | the same, wide |
| o-still | gpt-image-2 | 1K medium 1:1, ref chip | $0.066 | 74 s | ticker under a dome, one chip on a stand |
| o-tape | gpt-image-2 | 1K medium 16:9, ref chip | $0.042 | 36 s | a blank paper tape with scroll ends |
| n-hero-t | gpt-image-2 | 1K medium 3:4, ref chip | $0.050 | 42 s | glass exchange, LED wall with a header and four rows |
| n-hero-w | gpt-image-2 | 1K medium 16:9, ref chip | $0.042 | 68 s | the same, wide; four rows only |
| n-aisle | gpt-image-2 | 1K medium 3:4, ref chip | $0.050 | 67 s | server aisle, blank LED band, glass case with four chips |
| n-aisle-w | gpt-image-2 | 1K medium 16:9, ref chip | $0.042 | 40 s | the same, wide |
| n-still | gpt-image-2 | 1K medium 1:1, ref chip | $0.066 | 67 s | ticker beside a server blade with a chip |
| n-band | gpt-image-2 | 1K medium 16:9, ref chip | $0.042 | 61 s | a blank LED band in a steel housing |
| 6 × -2k | topaz-image-upscaler | 2K | 6 × $0.08 | 17 s each | both heroes in each aspect, both wide hand-overs |

**Total: $1.06 of the $8 cap.** Each charge equalled its estimate; the log is in `log.jsonl` and the jobs in `jobs1.json` to `jobs3.json`. Every prompt asked for no text, letters, numbers, logos, signs or people; none came back with any.
