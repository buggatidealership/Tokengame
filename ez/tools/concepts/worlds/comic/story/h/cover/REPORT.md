# Round H · cover: the first screen, five painted takes

Boards: `ez/x2p-x3p-h-cover-390.png` (today, C1, C2, C2b, C3, C4, C5, the fold marked in red, then a 3x close-up row: bell, clock, lettering, ticket) and `ez/x2p-x3p-h-cover-1280.png`. Recording: `ez/x2p-x3p-h-cover-c2.mp4` (C2 at 390, 8 s: second hand, steam loop, the turning loop arrows, the ticket's glint).

Run: serve `ez/` on port 8943, then `node run.js <out> now,c1,c2,c2b,c3,c4,c5 320,390,1280`; close-ups and the recording with `node shots2.js <out> [cu|rec]`; boards with `/usr/bin/python3 board.py <out> <width> <file> [close-up row]`. Each take is `_c.js/_c.css` (shared: the cover emptied, the lettering, the cast, the live tag, the countdown, the six painted props) + `cN.js/cN.css`, laid over the real built X3+ page (`v47-live-x3plus.html`). The h1, Starring's faces and the film are the page's own nodes. Mockups only; no live file touched.

## The want, as I read it
A stranger lands and, in five seconds, knows (1) four AIs compete at calling stock moves on earnings, (2) it is live and ongoing, (3) there is something to watch next. Today's cover says it in four flat panels and a dashboard strip; the owner wants it painted, crafted and moving, with every number true.

## Data (all live)
- Next bell: the next close that grades rounds with calls in (helper e's `SE.nextClose`); when none are locked (today, Saturday) the next report day on the card (`SE.toCome`), its 4 PM New York close computed with the same Intl rule (DST-correct: Monday 2 Nov is EST). The tag reads "3 reports Monday · calls go in before" and switches to "n rounds locked · graded today at the close" once calls are in.
- Panel 1: with calls locked, the biggest locked round's logo and the four real calls (green up, red down); with none locked, the next report's company (AAPL today, by CAPS) and four "?" chips. Never typed.
- The clock's hands are New York's time now (second hand included); the red pip is 4 PM; on a report day a red wedge fills the time left to the close.
- Golden ticket: the P&L leader (`SE.lead`, Grok today). No. 80 = `ROUNDS.length`. `window.__cvCheck` keeps what each shot used.

## The takes
| Take | Story | Carrier of "live" | Loop carrier | Step 4 | Art |
|---|---|---|---|---|---|
| C1 The closing bell | the bell rings at the close and grades them | the painted bell swings, rings every 6 s (clapper, ink lines), a brass plate counts down | four bunting pennants on a rope | (a) | balcony still + Hedra loop (light rays drift) |
| **C2 Round the clock** (recommended) | every round goes round the clock once | the clock itself: real New York time, 4 PM pip, plate "Bell in 2d 6h 45m" | the clock's four quarters, read clockwise, arrows turning on the rim | (a); C2b = (b) | dusk street still + Hedra loop (steam, windows); 2K painted clock |
| C3 The golden ticket | four AIs chase one ticket | "Next bell" countdown in the corner | four tear-off stubs | (b) | velvet stage; painted foil ticket with the leader pressed on its stub |
| C4 Fight night | a bout: four corners, the bell, a purse | an LED "Bell in" board | four round placards | (b) | ring with corner posts in each AI's colour; Hedra loop (smoke in the spotlight) |
| C5 The floor, live | a trading floor that never sleeps | a scrolling tape: next bell, the companies on the card, the ticket holder | four desk monitors (phosphor screens, scanlines) | (a) | trading floor; Hedra loop (screens flicker, haze) |

Five-second test (cover the body, read only the first screen at 390): every take shows the headline, the four faces, a live lamp with the next bell, and the loop's first two steps before the fold; C2 shows all four steps and the bell plate above the fold, which is why I recommend it. The film moves below the fold on every take (it was half above it today); "Meet the four models" handoff is not rebuilt in these takes (a gap to close in the build).

## Step 4: (a) or (b)?
I recommend **(b)**, worded "We follow its call on NVIDIA with our pool. It can be lost." Reason: without it, step 3 ("gets the golden ticket") has no payoff; a newcomer asks "a ticket to what?". (b) answers in one line and carries its own risk, so it stays honest. Against it: the owner took buybacks off the cover in October so newcomers first get what EZ does; (b) re-opens that. C2 and C2b show the same cover both ways so the owner can pick by looking.

## How each could fail
- **C1:** the bell sits on a balcony whose lower third is painted architecture with nothing on it (dead space on a tall phone). The clapper hangs behind the painted body and only shows during the ring; a viewer may read the bell as a static picture between rings. The countdown is 2d away at the weekend; a bell "ringing in 2 days" is less urgent than one ringing today.
- **C2:** the clock shows New York time, not "time left"; a visitor in Berlin may read 10:12 as wrong. The red wedge (time left) only appears on a report day, so on weekends the clock explains less. The rim arrows turn slowly (40 s); someone may read them as a loading spinner. Four captions round one clock is dense at 320 px (checked: fits, no overflow).
- **C3:** the leader's name on the hero ticket makes the cover read as "Grok is the star", which changes whenever the P&L leader changes; and step 3 has no picture of its own (the hero is its picture), which may read as a gap.
- **C4:** the corner posts are measured positions in one painted frame; a new render needs new coordinates. The bottom of the ring is crowd shadow (some dead space). Fight hype can read as gambling hype; the risk line is only on placard 4.
- **C5:** the floor video and four glowing screens are the busiest of the five; the tape scrolls (moving text is harder to read). Without the tape the take has no countdown.
- **All:** painted props are cut out on chroma green and keyed by me (edge-connected green only; the jar's green ribbon and the stack's green tab kept); a soft green fringe can show at 3x on dark grounds. The headline is page text in Luckiest Guy (each glyph its own angle, baseline and size, gradient fill, ink stroke, stacked extrusion); the font is loaded by the page without blocking, so a first paint may show Bangers. Safari not checked (background-clip:text with a filtered parent, `cqw`). The live page's film bill overflows by a few px (`.vb-k`) on phones today and in every take; not caused here. Desktop layouts are a first pass (C1 and C3 leave some empty ground).

## Checks run
- 320, 390, 1280 px: no sideways scroll (scrollWidth = viewport), no page or console errors; C5's tape is the only element past the edge, inside its own clipped strip.
- Rule 0: no white module grounds (captions are cream tags on art), no emoji, nothing over a logo or a face, no all-over Ben-Day fill (dots only in pennant shadows). The loudest treatment (extruded lettering) is spent once, on the headline.
- No text, letters, numbers or logos in any generated image (prompts end with "No text, no letters, no numbers, no logos, no signs, no people"; checked each image at full size). The only logo shown is the company's own file through `SE.coImg`.
- Zoomed at 3x (close-up row): the 2K bell and clock hold up against the films' art; the 1K ticket is fine at the size shown.

## Hedra jobs
Every charge equalled its estimate. Total **$2.42** of the $20 budget. Times are submit to COMPLETED.

| Name | Model | Settings | Cost | Time | Result |
|---|---|---|---|---|---|
| k-bell | gpt-image-2 | 1K medium 1:1 | $0.054 | 37 s | Brass bell on an iron bracket, empty mouth, green ground; keyed clean. Replaced by the 2K one. |
| k-clapper | gpt-image-2 | 1K medium 1:1 | $0.053 | 36 s | A clean brass clapper; keyed (the ring's hole too). Used in C1 to C4. |
| k-clock | gpt-image-2 | 1K medium 1:1 | $0.054 | 37 s | Station clock, blank face, riveted rim. Replaced by the 2K one. |
| k-ticket | gpt-image-2 | 1K medium 16:9 | $0.029 | 28 s | Gold foil ticket, scalloped, perforated stub, blank. Used everywhere. |
| k-stack | gpt-image-2 | 1K medium 1:1 | $0.053 | 36 s | Fanned graded slabs, blank, a green and a red tab. Step 4 (a). |
| k-pool | gpt-image-2 | 1K medium 1:1 | $0.054 | 36 s | Glass jar of blank gold coins, green and red ribbon. Step 4 (b). |
| g-bell-p / -d | gpt-image-2 | 1K medium 3:4 / 16:9 | $0.037 / $0.029 | 36 s | Exchange balcony at golden hour, bunting. C1. |
| g-clock-p / -d | seedream-50-pro | 1080p 3:4 / 16:9 | $0.068 each | 70 / 95 s | Art-deco street canyon at dusk, steam. The best ground. C2. |
| g-vault-p / -d | gpt-image-2 | 1K medium 3:4 / 16:9 | $0.037 / $0.029 | 36 / 28 s | Velvet curtains, plinth, gold spotlight. C3. |
| g-arena-p / -d | gpt-image-2 | 1K medium 3:4 / 16:9 | $0.037 / $0.029 | 36 / 27 s | Empty ring, posts green, coral, blue, grey. C4 (-d not used). |
| g-floor-p / -d | seedream-50-pro | 1080p 9:16 / 16:9 | $0.068 each | 87 s | Night trading floor, blank screens, gold wall. C5. |
| k-bell-2k | gpt-image-2 | 2K high 1:1 | $0.429 | 100 s | Engraved bands, scrolled bracket, much richer metal. Used. |
| k-clock-2k | gpt-image-2 | 2K high 1:1 | $0.429 | 109 s | Art-deco brass case, domed glass highlight. Used. |
| v-bell-p | seedance-15-pro | 720p 5 s, start = end frame, no audio | $0.133 | 129 s | Light rays drift, bunting barely moves; seamless loop. C1. |
| v-clock-p / -d | seedance-15-pro | same | $0.133 each | 76 / 114 s | Steam rises, windows flicker; seamless. C2. |
| v-arena-p | seedance-15-pro | same | $0.133 | 66 s | Smoke curls through the beam; the most visible motion. C4. |
| v-floor-p / -d | seedance-15-pro | same | $0.133 each | 246 / 76 s | Screens flicker, haze; subtle. C5. |

Videos are re-encoded for the page (`*-web.mp4`, H.264 crf 27, no audio, 0.5 to 1.1 MB); the raw downloads are not kept. Cut-outs are keyed with `key.py` (edge-connected chroma green, despill) into `img/cut/*.webp` with alpha.

## Where the rest of the budget would go
On the picked take: a 2K ground at 1440p, a painted mood loop at 1080p, and painted versions of the small step pictures (panel 1's company held up by four hands, a stamped card) so every step is a painting, not a page widget. About $2 to $4.
