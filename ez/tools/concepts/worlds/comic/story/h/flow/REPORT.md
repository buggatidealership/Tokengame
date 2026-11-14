# Round H5 · flow: the Overview as one comic, and the cuts between its sections (2026-10-31)

Mockups only, laid over the built `ez/v47-live-x3plus.html` in Playwright (`run.js` injects `flow.css`+`<t>.css`, `flow.js`+`<t>.js`). No live file changed.

- Boards: `ez/x2p-x3p-h5-flow-390.png`, `ez/x2p-x3p-h5-flow-1280.png`. One row per take, today's live page first. Each row shows the four cuts (cover → Meet the models → Every round so far → Smart or lucky → Bet #1), and each cut at three moments: boundary low on screen, mid screen, passed.
- Videos, on the real page, from the cover down to the NVIDIA bet at a reader's pace: 390 px first, then 1280 px. Each is 1600x1000, H.264 yuv420p, faststart.
  - `ez/x2p-x3p-h5-flow-now.mp4`: today, 6.2 MB.
  - `-a.mp4`: 6.6 MB.
  - `-b.mp4`: 6.9 MB.
  - `-c.mp4`: 5.3 MB.
  - `-d.mp4`: 5.7 MB.

## The want, as I read it
The owner wants to read one comic book, not scroll past boxes. That needs three things:
- the page is printed paper (or a desk the pages lie on);
- each section is one panel or page, taken in one at a time;
- the move from one to the next is a cut a comic reader already knows.

Ground3 (H4) painted the grounds and drew cuts as decorations at the seams: ropes, a burst edge, gutter captions, a tear. So I left the grounds to ground3 and changed **how the page is cut and how each part arrives**.
- A and C lie on ground3's painted night tile, used as the desk.
- B lies on a printed newsprint stock (Hedra).
- D runs over today's page.

Every take shares one arrival rule (lesson 62): a section's own beats come in one at a time as they reach reading position (headline, then each card or tile, 110 ms apart within a row). The cover and anything that already animates itself (the coin rows, the cards' count-up) are left alone.

## The takes
- **A · Turn the page.** Every section is a printed page of one issue, lying on the night desk. Each page is tucked under the one before, with a stack of page edges at its foot and a hard ink shadow.
  - Gutter: the page's foot margin carries a folio (`EZ · Season 1 · No. 80 · p. 3`, the issue number counted live from ROUNDS) and the live beat captions.
  - The cut: as you read to the end of a page, its bottom-right corner curls up. The flap is the back of the paper, with the next page's ink showing through (Hedra `f-back`), outlined in thick and thin ink. Under the flap lies the next page.
  - Arrival: the new page drops flat (rotates from -0.9deg and lifts 18px into place), then its beats ink in.
  - Everything is scroll-driven (`animation-timeline: view()`), so it reverses when you scroll back up.
- **B · Guided view.** The page is one printed comic page (newsprint stock); each section is a panel with a hand-inked frame (thick outer line, thin inner line, each wobbling).
  - The reader's eye is the camera, as in digital comics' guided view. The panel in front is full size and inked. The next one waits "in pencil": washed back into the paper and set back to 86%. It grows and inks in as it arrives, while the one you leave sinks to 93% and fades.
  - Arrival: the frame draws itself in once (outer line, then inner), then the beats.
- **C · The pile.** Each section is a page dropped onto a pile on the night desk.
  - You read a page to its end. The next page then slides up over it and lands (starting tilted 1.5deg and 40px low, settling to a slight hand-placed tilt), while the page beneath darkens.
  - It works with `position: sticky` (each page sticks once its foot reaches the screen's foot), so scrolling stays free and nothing is locked.
  - The narrator's caption is slapped on the incoming page's corner: the two live beats, plus two of mine ("Our four contestants…", "Round after round…").
  - This is the abrupt cut.
- **D · Iris.** The cut of Saturday-morning cartoons and Golden Age iris panels.
  - At each cut the picture closes to a black iris centred on the boundary between two sections. The iris has a hand-inked edge with a thin gold inner line.
  - The narrator's caption holds in the dark for a beat (about 80 px of scroll), then the iris opens on the next section.
  - The iris is scroll-driven over about 55% of a screen height, so it reverses when you scroll back up. With reduced motion it is off.

## Cost on a slow phone (4x slower CPU, 390x844)
Method: wheel scroll from the cover to the bet, three runs each, medians (`perf.js`).

| Take | fps while scrolling | frames > 50 ms | worst frame | main-thread time |
|---|---|---|---|---|
| Today | 28.2 | 32 | 133 ms | 5.25 s |
| A · Turn the page | 24.5 | 35 | 267 ms | 5.55 s |
| B · Guided view | 19.1 | 58 | 233 ms | 6.02 s |
| C · The pile | **13.6** | 78 | 250 ms | 5.76 s |
| D · Iris | 21.9 | 41 | 200 ms | 5.50 s |

- Main-thread time hardly moves (+0.3 to +0.8 s). The cost is paint and raster:
  - B scales whole sections, the Meet the models one 2,100 px tall, so they are re-rastered;
  - C keeps up to five full-height pages stuck and layered, with dimming overlays;
  - D's iris is a radial gradient on a custom property, repainted every frame while it runs.
- The recorder saw the same thing at normal speed: C delivered about half the frames of the others.
- **As built, C is not fit for the live site.** A is the cheapest.
- A cheaper C would use one darkening layer for the whole stack instead of one per page, and no landing tilt on the tall pages. A cheaper D would draw the iris's black as four transformed bars round a fixed ring, at the cost of a less round edge.

## How each could fail
- **All:** the beat-by-beat arrival hides content until it reaches about 86% of the screen height. A fast flick shows empty panels for a moment.
  - Checked: nothing stays hidden after scrolling past, and with reduced motion nothing is hidden at all.
  - Search engines and screenshots of the full page need the beats shown (`F.showAll`).
- **A:** the curl is the only motion at the seam. A visitor who never reaches a page's last 40% before flicking on may never see it.
  - The night desk shows only 6 px at the sides on a phone, so the "pages on a desk" read is weak at 390 and strong at 1280.
  - The folio is my wording.
- **B:** at 86%, the incoming panel's pale wash can read as "disabled" or "loading" rather than "pencilled". It is also the second-slowest take.
  - On desktop, where a section fits on screen, the guided zoom is subtle.
- **C:** the slowest take.
  - Tall pages stick by their foot, so while the next page climbs over, the last screen of the old page holds still. A reader who scrolls back up has to scroll through the stuck stack.
  - The two added captions are my copy.
- **D:** a black screen in the middle of a scroll may read as a glitch the first time, and the screen is black for about 80 px of scroll per cut (four times on the way down).
  - It is a cartoon's cut more than a comic's. It is the boldest of the four and the most likely to be loved or rejected outright.
  - The two added captions are my copy (the same as C's).
- **Not done:**
  - Safari is untested: view timelines arrived in Safari 26 and are threaded in 26.4, and timeline-scope may be missing. The fallback uses IntersectionObserver and was tested in Chromium with scroll timelines forced off: no errors, nothing left hidden.
  - On reduced motion C still pins its pages: sticky follows the visitor's own scroll and is not an animation, but it could still be turned off there.

## My pick
**A for the book**, with **B's frame inking in** as its arrival. The curl is the one cut a reader decodes without a word ("turn the page"), it survives scrolling back, it costs the least, and it builds on ground3's desk. B's pencil-to-ink is the best arrival of the four and could be used inside A's pages. **D** is worth showing to the owner as the bold option, used only once (before the bet: "Next time…").

## Checks run
- 320, 390 and 1280 px, every take, scrolled top to bottom: the widest scrollWidth equals the viewport, there are no page errors, and no beat is left hidden above the screen.
- The same at 390 with reduced motion, and with scroll timelines switched off (the IntersectionObserver fallback).
- Rule 0 checks:
  - no white grounds were added inside modules (the paper sheets sit behind the modules);
  - no emoji;
  - nothing is laid over a face, logo or number, except the curl, which touches the very corner of the page margin at full size;
  - no pattern fills a module.
- The boards' frames were zoomed at full resolution.

## Hedra jobs ($0.11 of $10)
| File (img/) | Model | Settings | Cost | Time | Note |
|---|---|---|---|---|---|
| f-stock | gpt-image-2 | 1K medium 1:1 | $0.053 | 41 s | Warm cream newsprint with fibres; clean and even, tiles well |
| f-back | gpt-image-2 | 1K medium 1:1 | $0.053 | 41 s | The back of a printed page, panel borders bleeding through; just right for the curl's flap |
| f-gutter | gpt-image-2 | 1K medium 3:2 | $0 | — | Refused (HTTP 400; likely the 3:2 ratio); not needed |

## Files
- `flow.css` / `flow.js`: shared (sections, beats, the ink rectangle).
- `a`..`d` `.css/.js`: the takes.
- `run.js`: inject the takes, and the `shots` command for the board frames.
- `rec.js`: the videos.
- `perf.js`: the 4x-slower-CPU measurements.
- `check.js`: overflow, errors, reduced motion and the fallback.
- `board.py`: the boards.
- `shot1.js`: quick checks.
- `hedra_gen.py`, `jobs1.json`, `jobs.jsonl`: the Hedra jobs.
- `img/`: the originals; `img/web/`: what the mockups load.
