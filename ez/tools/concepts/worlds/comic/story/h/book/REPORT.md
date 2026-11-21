# Round H6 · book: the X3+ Overview as one comic, chapter to chapter (2026-10-31)

Mockups only, laid over the built `ez/v47-live-x3plus.html` in Playwright. No live file changed (no tools/v22, no ez/media, no v4x-*.html).

- Boards: `ez/x2p-x3p-h6-book-390.png`, `ez/x2p-x3p-h6-book-1280.png`. One row per take, today's live page first. Each row: the two fixed heads (Meet the models, Every round so far), then the four cuts (cover > models, models > rounds, rounds > lucky, lucky > Bet #1), each at three moments (the boundary at 92%, 62% and 32% of the screen height).
- Videos, the real page from the cover down to the NVIDIA bet at a reader's pace, 390 px then 1280 px, 1600x1000, H.264:
  `ez/x2p-x3p-h6-book-now.mp4`, `-base.mp4`, `-p.mp4`, `-i.mp4`, `-k.mp4`.

## The want, as I read it
"A comic... is still simply a storyboard": the Overview should read as one story told in panels, where each section is a chapter and every cut hands the reader to the next one, never as boxes stacked on a scroll. Under it, the owner's repeated "integrated / not pasted on": a title or caption should sit in the painting the way lettering sits in a printed panel.

The story the four chapters tell, and what each cut has to hand over:
1. Cover: what EZ is. Hands over to: *the fighters*. The cover already ends on "Meet the four models ↓".
2. Meet the models: four rivals in one ring. Hands over to: *the fights they have had*. There was no beat here; I added a live one, "80 rounds in. Here is every one…" (the count is read from ROUNDS).
3. Every round so far: the record. Hands over to: *the question the record raises*. The page's own beat: "Meanwhile, the big question…".
4. Smart or lucky: the question. Its last line is "The real question: do they get better as the season goes on?" Hands over to: *what happens next*. The page's own beat: "Next time…", which opens on the vault (the bar section, left as it is).

## Fixed on every take (the "base")
- **Ground3 A, the fight-night ground** (the ring behind Meet the models, the wet street under the rack, the coin behind Smart or lucky, the painted night tile), reused from `h/ground3/` unchanged.
- **"Meet the models" lettered into the painting's burst.** The title is no longer under an establishing strip; it is placed on the burst's centre, measured on the painting's yellow: phone art at 53% / 21.5%, desktop art at 50% / 23.5% (`book.js` recomputes on resize and once fonts land). Lettering changes, so it reads as part of the burst rather than laid on it:
  - "MEET THE" turns from yellow to a cream face (yellow on the yellow burst disappeared);
  - the burst's own halftone is printed over the shade side of the letters (multiply, lower half only);
  - the spotlights' sheen sits on the lit side.
  The first card now begins where the ring's ropes are, so the four lit corner posts show between the title and the Grok card: the cast steps into the ring.
- **"Every round so far" is the head above the rack.** Today `h_rounds` builds the rack lazily when the section comes near and lifts the head into the rack's foot (`hr-lift`). `book.js` watches for the rack, moves the head in front of it, and cancels the lift.
- **The ring's ropes stay only at the ring's entrance** (cover > models). Ground3 A put them at every cut, and five sets read as dividers (ground3's own warning).
- **Arrival:** flow's beat-by-beat arrival. A section's headline, then each card or tile, arrive one at a time as they reach reading position, 110 ms apart (lesson 62).

## The takes
- **P · The pile, every cut** (flow C, made cheap). You read a page to its end; the next page slides up over it from 36 px low and lands; the page underneath darkens. The narrator's caption is slapped on the incoming page's corner (the ring's ropes ride on the Meet the models page's top edge).
  Made cheap:
  - **One darkening layer for the whole book.** It is a viewport-sized fixed layer, moved between the two live pages by z-index. Its opacity runs on the incoming page's view timeline, so it is compositor work only.
  - **A page is taken out of rendering once it is covered.** It gets `visibility:hidden` plus `content-visibility:hidden`, with its height kept by `contain-intrinsic-block-size`. At most two pages are ever stuck. The covered page's own loops also stop; measured, they were the real cost: the cover kept animating under the models page and doubled main-thread time.
  - **No blurred shadows** (hard 7 px ink edge), **no tilt** on any page (translate only).
- **I · The painted iris, every cut** (flow D, made cheap). At each cut the picture closes to an iris painted by Hedra: a rope ring in the ring's red, cream and green with a gold turnbuckle, so the transition belongs to the fight-night world (lesson 78: no code-drawn ring beside painted art). The narrator's caption holds a beat in the dark, then the iris opens on the next chapter.
  Made cheap:
  - The plate is one transparent webp (the hole matted by flood fill, `matte.py`), scaled by `transform`.
  - Four flat bars follow its edges. All five pieces read one registered custom property (`--bki-s`) on the overlay.
  - No full-screen radial gradient is repainted every frame (flow D's cost).
- **K · The book (my pick).** Each cut chosen for what it hands over, not one device repeated:
  - **cover > Meet the models: the ring's ropes, and the title punches into the burst** (a single beat, scroll-driven, then still). You step into the arena; the first thing you see on the new page is the title exploding into the burst.
  - **Meet the models > Every round so far, and > Smart or lucky: the pile.** These are abrupt comic cuts ("80 rounds in. Here is every one…" lands with the rack page; "Meanwhile, the big question…" lands with the coin). The eye is on the last card (Kimi, last place) as the record page arrives over it.
  - **Smart or lucky > Bet #1: the iris, once.** It closes on the chapter's last line, "do they get better as the season goes on?". "Next time…" holds in the dark, and it opens on the vault. The cartoon's end-of-episode cut is used once, where the story is literally "next time"; flow said D works best used once.

## Two readings, both made
- "The title inside the big starburst":
  - (a) lettered into the painting's burst, still: the base, P and I;
  - (b) the title bursting into it as you arrive: K.
- "Make C and D cheap": both made on every cut (P, I), and both combined where each fits the story (K).

## Cost on a slow phone (4x slower CPU, 390x844)
Wheel scroll from the cover to the NVIDIA bet, three runs each, medians (`perf.js`). Measured on this machine in one session, so compare within the table. Today measured 39.2 fps here; flow's run measured today at 28 fps on its machine.

| Take | fps while scrolling | frames > 50 ms | worst frame | main-thread time |
|---|---|---|---|---|
| Today | 39.2 | 13 | 183 ms | 2.22 s |
| Base (ground3 A + fixes, plain scroll) | 39.6 | 14 | 167 ms | 2.61 s |
| P · The pile, every cut | 31.3 | 30 | 317 ms | 2.43 s |
| I · The painted iris, every cut | **36.0** | 17 | 217 ms | 2.61 s |
| K · The book | 30.7 | 29 | 167 ms | 2.60 s |

- Main-thread time stays within 0.4 s of today on every take. The cost that is left is raster and compositing.
- **The pile:** two tall pages are stuck and layered at each pile cut.
  - Dropping the landing slide gained nothing (31.6 against 31.2 fps, 3 runs each), so the slide stays.
  - The first build of P measured 27.0 fps and 4.61 s of main-thread time. The cover's own animations kept running while it sat hidden under the Meet the models page (`visibility:hidden` does not stop them). `content-visibility:hidden` on the covered page fixed that: 2.12 to 2.43 s, below today.
- **The iris** costs about 3 fps. At the cut, a fixed overlay restyles five elements per frame (`--bki-s`); nothing repaints.
- **Against flow's numbers** (H5, its machine, today 28.2 fps): C · the pile measured 13.6 fps and D · the iris 21.9. On this machine today runs at 39.2. Scaled to today, the new pile is 80% of today's frame rate (flow's C was 48%) and the new iris 92% (flow's D was 78%).

## How each take could fail
- **All:**
  - The burst title depends on the painting's burst staying where it is. A new ring painting needs the two centre numbers re-measured (they live in `book.js`).
  - On a phone the subtitle ("Not the Instagram kind. Ranked by P&L…") crosses the burst's red spikes. It stays readable with its ink edge, but it is busier than before.
  - The beat-by-beat arrival can show empty panels for a moment on a fast flick (checked: nothing stays hidden after scrolling past; with reduced motion nothing is hidden).
- **P:**
  - Tall pages stick by their foot, so the last screen of a page holds still while the next one climbs over it. Some readers may read that as the page sticking.
  - Scrolling back up re-renders a covered page in one go (`content-visibility` back on): one long frame at each cut on the way up.
  - Pile on every cut is one device four times; by the third cut it is predictable.
- **I:**
  - A dark screen four times on the way down. The first time it may read as a glitch, and it is the most cartoon-like of the three.
  - The plate is a 1024 px image scaled up to about 3x when fully open; the rope is soft at that size (it is off screen by then, but soft while it passes the screen's corners).
  - The caption sits over the small hole for a moment before the iris shuts completely.
- **K:**
  - Three different cuts in one page can read as inconsistent rather than designed, if the reader does not feel the reason for each.
  - It carries the costs of both the pile (two stuck pages at a time) and the iris (once).
  - The title punch is scroll-driven, so a reader who flicks past sees it half-way.
- **Not done:**
  - Safari is untested (view timelines arrived in Safari 26; `timeline-scope` may be missing). The IntersectionObserver fallback is tested in Chromium with scroll timelines off: no errors, nothing left hidden.
  - On reduced motion the pile still pins its pages (sticky follows the visitor's own scroll; it is not an animation).

## My pick
**K, the book.** The cut is part of the story: ropes to enter the ring, the pile while the chapters are a run of hard comic cuts, and one iris where the story actually says "next time". At 4x CPU it costs about 8.5 fps (30.7 against 39.2) against today; main-thread time stays at today's level. If the owner wants one device only, **P** (now about as cheap as I, and the most "comic book" of the two).

## Checks run
- 320, 390 and 1280 px, every take, scrolled top to bottom: the widest scrollWidth equals the viewport; no page errors or console errors; no beat left hidden above the screen.
- The same at 390 with reduced motion, and with scroll timelines switched off (the IntersectionObserver fallback).
- The heads and every cut frame zoomed at full resolution:
  - the burst title is centred on the burst at 390 and 1280;
  - the rack head sits above the rack;
  - the iris rope is whole at its centre;
  - the pile's caption was clipped on the Smart or lucky and bet pages (they clip their overflow), so it was moved inside their top edge.
- Rule 0:
  - no white or pale grounds added inside modules;
  - no emoji;
  - nothing over a face, a logo or a number (the captions sit on page corners and in the dark);
  - no module filled with a pattern;
  - no text in the generated images ("No text, no letters, no numbers" in both prompts; checked).

## Hedra jobs ($0.11 of $10)
| File (img/) | Model | Settings | Cost | Time | Note |
|---|---|---|---|---|---|
| iris-ring | gpt-image-2 | 1K medium 1:1 | $0.054 | 35 s | Twisted rope ring (red, cream, green) with a gold turnbuckle on navy-black, a clean white hole; matches the ring's ropes. Used. |
| iris-ink | gpt-image-2 | 1K medium 1:1 | $0.054 | 35 s | Golden Age iris: ink edge, gold rim, halftone fading out. Clean; kept as the alternative (`B.irisImg='iris-ink'`). |

## Files
- `book.css` / `book.js`: the base (burst title, the head above the rack, the live beat, ropes once).
- `cuts.css` / `cuts.js`: `B.pile(ids)` and `B.iris(ids)`, the cheap cuts.
- `p`, `i`, `k` `.css/.js`: the takes.
- `run.js`: injects ground3 A + flow's arrival + book + a take; `shots` for the board frames.
- `rec.js`: videos. `perf.js`: 4x CPU. `check.js`: overflow, errors, reduced motion, fallback. `shot1.js`, `probe*.js`, `dbg.js`: quick checks.
- `board.py`, `takes.json`: boards.
- `hedra_gen.py`, `jobs1.json`, `jobs.jsonl`: Hedra jobs.
- `matte.py`: the iris plates' transparent hole.
- `img/`: originals; `img/web/`: what the mockups load.
