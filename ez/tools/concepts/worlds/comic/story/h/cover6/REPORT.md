# Round H8 · cover6: the book's cover, with no characters (roughs)

Boards:
- `ez/x2p-x3p-h8-cover6-390.png`
- `ez/x2p-x3p-h8-cover6-1280.png`

Each board has one row per take, and each row has three frames:
1. the cover;
2. the opening, half way;
3. the book open (the first spread).

The row's caption names the take's opening and its moving object.

Video: `ez/x2p-x3p-h8-cover6-open.mp4` shows the pick (D). It plays 390x844 and then 1280x800, each with the cover held for about 3 s (the ticket nudging in its slot) followed by the opening, scrolled over 5 s.

To run it, serve `ez/` (`python3 -m http.server 8962`) and use these commands:
- `node shot.js <out> a,b,c,d,e 390,1280` for the shots and checks;
- `python3 board.py <out> <board390> <board1280>` for the boards;
- `node rec.js d <mp4>` for the video;
- `node inv.js` to list every word and number with its surface.

The pieces:
- The page is `take.html?t=<a..e>`. It is standalone and is not laid over the built X3+ page, so none of X3+'s own CSS leaks in.
- `c6.js` is the engine. Each painting is a plate. Every word sits in % of the painting, so it stays on its surface whatever the crop. Type is fitted to the surface. The opening is driven by scroll.
- `takes.js` holds every surface, word, motion and opening.
- `c6.css` letters each surface in its own medium.
- `img/` holds the 26 Hedra roughs. `gen.py` and `jobs1.json`/`jobs2.json` made them, and `log.jsonl` logs every job.

The cost was **$0.78** of the $8 budget (26 images, gpt-image-2, 1K, medium, about $0.03 each). Nothing in `ez/tools/v22/`, `ez/media/` or any `ez/v4*.html` was touched.

## What every take does

- **No characters.** The Hedra prompts forbid people, figures, hands and silhouettes; no take has any. The founders first appear in Meet the models. Model names show only as data (each AI's prediction on the newest round), never as faces.
- **The cover is a comic cover painted with its own trade dress.** It has a blank masthead plate and a blank corner box. "Earnings Zeason" is gold leaf on the plate, with E green and Z red. The corner box reads "Season 1 / No. 80", where the issue number is `ROUNDS.length`.
- **Every word is live page text on a surface painted blank for it, lettered in that surface's medium:**
  - gold leaf on black lacquer;
  - engraving on brass;
  - amber LED;
  - typewriter ink on ticker tape;
  - white paint on scoreboard slots;
  - lit bulb letters on a marquee;
  - ink pressed on gold.
- **Real data,** all computed in the page from `ez-data.js`:
  - 80 rounds graded;
  - the newest round is XOM, locked Oct 30, closed +2.17%, with GPT closest;
  - the predictions are GPT ▲2.5%, Kimi ▲1.5%, Claude ▼1%, Grok ▼1.3%;
  - the golden ticket is Grok at +$148,480 (flat $100K per call, the P&L leader);
  - the next bell is Nov 3.
- **The four steps are in the owner's words, then "Bet #1: NVIDIA".** On every take they sit on the first spread (inside the cover), each on its own object, with the matching real datum beside it.
- **The film (1:20)** plays inside a painted screen in the first spread: a cinema screen, a TV, or the theatre seen through doors. The way in, "Meet the four models ▾", is on a surface at the foot of the spread.
- **One interactive object per cover, marked by its own small motion (lesson 86).** The motion is a piece cut from the painting itself and moved. It stops once the book starts opening, and is still under reduced motion. A tap on it opens the book, the same as scrolling.
- **Portrait framing.** On phones the painting is fitted to the width so the masthead and corner box are never cropped. Below it, a blurred, flipped copy of the painting's foot continues the scene, so there is no flat fill.

## The takes

| Take | Cover (world) | Moving object | Opening | First spread |
|---|---|---|---|---|
| **A · The closing bell** | An empty exchange hall at night, the brass closing bell over a marble rostrum | The bell sways; on scroll it rings | The bell's ring splits the cover down its middle and the hall's doors swing apart (a gatefold) | The trading floor: the film on the cinema screen on the back wall; four trading posts, each display lit with one step in amber LED and its datum engraved on the post's front; the golden ticket under a dome on post 3; post 4 before the vault: "Bet #1 NVIDIA" |
| **B · The tape** | A brass stock ticker under a glass dome on a night desk; its gold tape spills toward you | A glint crosses the dome | The dome lifts and the camera follows the tape down the page into the spread | The same tape hanging straight, the four steps and their data typed down it one after another; the film on a walnut TV beside it |
| **C · The scoreboard** | A hand-operated ballpark scoreboard at night, showing the last game | The lit operator hatch flickers | Fly through the hatch | The operator's room behind the board: the four steps painted on four number plates on the workbench, "Bet #1 NVIDIA" on the gold plate on the hook, the film on the little TV |
| **D · The box office** (pick) | A theatre box office in the rain: the marquee carries the cover lines, a golden ticket pokes out of the slot | The ticket nudges out of the slot | The ticket comes out to you and turns over to fill the screen | The golden ticket's back: four printed rows (one step plus its datum each), the stub "Bet #1 NVIDIA No. 080"; below, doors open on the cinema where the film plays |
| **E · The issue** | The comic itself: a still life (the golden ticket pinned to the season's chart, a bell, coins) with ribbons and a seal; on desktop it lies on a desk under a lamp | The cover's corner lifts; the bell sways | The cover swings open on its spine; on phones the camera then pans to the right page | The inside spread: left page the theatre with the film, right page four panels (a sealed envelope with the predictions, the bell with the close, the golden ticket on a cushion, the vault with Bet #1) |

## Every word and number, and its surface (phone layout; desktop is the same set)

**A**
- Cover:
  - "Earnings Zeason": masthead plate.
  - "Season 1 / No. 80": corner box.
  - "The closing bell": brass plaque on the bell's bracket.
  - "4 AIs trade earnings", "Who calls it best?" and "Ring the bell to open ▾": the black lacquer board on the rostrum.
- Spread:
  - "How it works · 1:20": the screen's gold frame.
  - Steps 1 to 4: the four trading posts' displays.
  - "XOM locked Oct 30" with the four predictions: post 1's front panel.
  - "XOM closed +2.17% / GPT closest": post 2's front panel.
  - "Golden ticket Grok +$148,480": post 3's front panel, under the dome.
  - "Bet #1 NVIDIA": post 4's front panel, before the vault.
  - "Meet the four models ▾": the brass inlay in the floor.

**B**
- Cover:
  - Masthead plate and corner box as in A.
  - "Season 1 / Tape No. 80": the brass plate on the ticker's base.
  - "4 AIs trade earnings · Who calls it best? · XOM +2.17% · next bell Nov 3 · pull the tape ▾": typed along the tape.
- Spread:
  - The four steps, each followed by its datum (the predictions; XOM +2.17%, GPT closest; Grok +$148,480; Bet #1: NVIDIA): typed down the hanging tape.
  - "How it works · 1:20": the TV's dial panel.
  - "Meet the four models ▾": the tape's torn end.

**C**
- Cover:
  - Masthead plate and corner box as in A.
  - "4 AIs trade earnings": the scoreboard's header panel.
  - Row 1: "Exxon Mobil (XOM)", "R", "80", and "+2.17%" in the final slot.
  - Row 2: "Closest call", "▲2.5%", "GPT".
  - Row 3: "Golden ticket", "+$148K", "Grok".
  - "Who calls it best?": the tall panel under the rows.
  - "Step inside ▸": the hatch sill.
- Spread:
  - Steps 1 to 4 with their data: the four number plates on the workbench.
  - "Bet #1 NVIDIA": the gold plate on the hook.
  - "How it works · 1:20": the shelf's edge.
  - "Meet the four models ▾": the workbench's front edge.

**D**
- Cover:
  - Masthead plate and corner box as in A.
  - Marquee track 1: "Earnings Zeason presents".
  - Marquee track 2: "4 AIs trade earnings".
  - Marquee track 3: "Who calls it best?".
  - Marquee track 4: "Season 1 · 80 rounds graded · next bell Nov 3".
  - "Box office / One golden ticket. Four AIs want it.": the gold-leaf window panel.
  - "080": the numbering machine's wheels.
  - "Take a ticket ▾": the ticket in the slot.
- Spread:
  - The four printed rows, each a step plus its datum (row 3 "Now: Grok +$148,480", row 4 "Admit one: the call of #1"): the ticket's back.
  - "Bet #1 NVIDIA No. 080": the stub.
  - "How it works · 1:20": the auditorium's stage lip.
  - "Meet the four models ▾": the marble under the ticket.

**E**
- Cover:
  - Masthead plate and corner box as in A.
  - "Golden ticket / Grok / holds it at +$148,480": the pinned ticket.
  - "4 AIs trade earnings!" and "Who calls it best?": the two ribbons.
  - "80 rounds graded at the close": the seal.
- Spread:
  - Steps 1 to 4: the four caption plates.
  - "XOM, locked Oct 30" with the four predictions: the sealed envelope.
  - "XOM closed +2.17% · GPT closest": the marble under the bell.
  - "Grok +$148,480": the golden ticket on the cushion.
  - "Bet #1 NVIDIA": the vault panel's floor.
  - "How it works · 1:20 / Meet the four models ▾": the caption plate under the theatre.

## Measured (Chromium, 390x844 and 1280x800, DPR 2; `shot.js`)

- **Sideways scroll and page errors:** none in any take at either width.
- **Overflow:** no word overflows its surface. The fitter shrinks type until it fits, and none needed to clip.
- **Text under 9px:**

  | Take, width | Element | Size |
  |---|---|---|
  | A, 390 | "The closing bell" | 7.2px |
  | A, 1280 | "The closing bell" | 8.3px |
  | A, 390 | "How it works" | 8.6px |
  | B, 390 | "How it works" | 7.8px |
  | B, 1280 | "How it works" | 8.8px |
  | C, 390 | "How it works" | 8.6px |
  | E, 390 | step 3's caption | 8.6px |
  | E, 390 | the corner box's "Season 1" | 7.8px |

  A's LED steps measure about 9 to 10px at 390. D's printed rows have their data line at about 7px at 390, which is not flagged because the check reads the row's own size, not its small line.
- **Rule 0 checks run:**
  - no white or pale module ground (the marquee was repainted black, and the ticker tape gold, after the first roughs came back beige);
  - no emoji;
  - no dot-screen fill;
  - no text over a logo;
  - company named with its ticker on C's scoreboard;
  - no code-drawn box or container (the only code-drawn shapes are the film's play disc and the paper-corner triangle in E).
- **Not measured:** the cost of each opening on a slow CPU. Every opening is a transform on one or two layers, like book2's A and B, which measured cheaper than today's scroll; D's flip also blurs the cover, which is the costliest effect here.

## My pick: D, the box office

- **The cover sells the world and the question without a face.** The marquee is a masthead the world makes itself, so the cover lines are lit bulb letters in a real marquee's tracks. "Season 1 · 80 rounds graded · next bell Nov 3" is exactly what a marquee says: what's on, and when.
- **The interactive object is the site's central object.** The golden ticket pokes out of the slot and nudges, so the one thing that moves is the thing the whole game is about.
- **The opening acts out the fact (lesson 26).** You take the ticket and turn it over, and its back is the rules: the four steps printed in rows with this round's real data, "Admit one: the call of #1", and the stub "Bet #1 NVIDIA". The motion says "this is the ticket the AIs compete for".
- **It calls back to objects the site already owns** (the bet's tickets and the stubs), and the doors open onto the cinema where the film plays.
- **A is a close second.** The bell is the most literal "graded at the close", and its four lit posts read best as one step per object. Its gatefold, though, is a book device grafted onto a hall.
- **E is the most literally "a comic book".** Its printed cover reads as a cover at once, but its spread is too small to read on a phone without the pan.

## How each could fail

- **All takes:**
  - These are 1K roughs, soft at desktop size. The pick needs a 2K/4K paint with each surface placed and sized for its words. Several surfaces are small (plaques, dials, LEDs), so the paint should make them larger.
  - The masthead plate and corner box are a painted comic trade dress, so on a phone the cover reads as a printed cover laid in a world rather than one seamless scene.
  - The blurred continuation under the painting on phones (about 100px at 390x844) is a stopgap: a 9:19.5 paint would remove it.
- **A:**
  - "The closing bell" (7.2px) is a label, not data; the plaque is too small for more.
  - The gatefold cuts the bell in half as it opens.
  - "Meet the four models" sits on the floor's brass inlay, which the painting only half provides.
- **B:**
  - Text along a curving tape is hard to read at the turns, and at 1280 the steps along the inside tape are small and run at an angle. B is the most "read the label" of the five.
  - The tape's gold is close to beige in the inside plate.
- **C:**
  - The painted board has three rows, not four, so the four AIs' predictions are not on the cover, only the last result.
  - At 1280 it reads as a sports scoreboard more than as a market.
  - The hatch zoom passes through a stretch of plain green steel.
- **D:**
  - "Earnings Zeason presents" on the marquee repeats the masthead (lesson 13). In the paint, drop one of them (the masthead plate could go, leaving the marquee as the masthead).
  - "Meet the four models ▾" sits on veined marble, which is not an object made for it (lesson 85). It needs a brass sign or a rope post.
  - The ticket's small lines (the predictions) are about 7px at 390.
  - The flip is quick at normal scroll speed (lesson 55); the paint round should hold the ticket face-down for a beat.
  - "One golden ticket. Four AIs want it." is my line, not the owner's.
- **E:**
  - On phones the spread's text is 6 to 9px before the pan. A spread is a desktop device; phones need one page per paint.
  - The ticket on the cover shows the golden-ticket holder before the reader knows what the ticket is (a small spoiler, against lesson 87's spirit).
  - "XOM closed" sits on the marble under the bell, not on an object of its own.
