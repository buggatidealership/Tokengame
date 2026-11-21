# Round H25 · chars: the new Grok and GPT characters

Brief: `../BRIEF-H.md`, Round H25, task `chars`.

This is a mockup only:
- nothing in `ez/tools/v22/`, `ez/v4*.html` or `ez/media/` changed;
- nothing was deployed or published.

Hedra spend: **$11.65** of the $40 (11 jobs, all in `log.jsonl`).

**Flag:** the shared Hedra balance is down to **$6.25**. It was $42.43 when I started; the other H25 helpers are drawing on the same key.

## What's here (all flat in this folder)

| File | Resolution | fps | Frames | Size |
|---|---|---|---|---|
| `founder-grok-anim2.mp4` (rocket, left panel) | 640×640 | 24 | 120 (5.0 s) | 876 KB |
| `founder-grok-anim2.webm` | 640×640 | 24 | 120 | 408 KB |
| `founder-grok-anim2.jpg` (poster = frame 0) | 640×640 | | | 168 KB |
| `founder-gpt-anim2.mp4` (Sam) | 640×640 | 24 | 120 | 292 KB |
| `founder-gpt-anim2.webm` | 640×640 | 24 | 120 | 108 KB |
| `founder-gpt-anim2.jpg` | 640×640 | | | 60 KB |
| `founder-grok-couch-anim2.{mp4,webm,jpg}` (the alternative, right panel) | 640×640 | 24 | 120 | 664 / 324 / 140 KB |
| `founder-*-anim2-1080.{mp4,webm}` (the same loops at 1080) | 1080×1080 | 24 | 120 | grok 2.0 MB / 828 KB, couch 1.3 MB / 548 KB, gpt 572 / 180 KB |
| `master-grok.jpg` (still, 4K re-render) | 3392×5056 | | | 5.9 MB |
| `master-grok-couch.jpg` | 2624×6528 | | | 4.6 MB |
| `master-gpt.jpg` | 3843×2160 | | | 2.7 MB |
| `master-grok-loop.mp4` (Kling's own output, untouched) | 2880×2880 | 24 | 121 | 12 MB |
| `master-grok-couch-loop.mp4` | 2880×2880 | 24 | 121 | 5.4 MB |
| `master-gpt-loop.mp4` | 3840×2160 | 24 | 121 | 3.7 MB |

- The loops are muted, `+faststart`, H.264 at CRF 17 and VP9 at CRF 28.
- The last frame is dropped. Kling's frame 121 is the start image again, so keeping it would hold one frame at the seam.
- **24 fps is Kling's native rate.** Nothing was resampled.
- **Grok's mp4 is 876 KB**, above the 0.4 to 0.6 MB of today's loops. The red backlight's grain and halftone cost bits, and I kept "no visible compression" over size. Its webm is 408 KB, and most browsers take the webm second (mp4 first).

**Window and resolution:**
- The founder window is 88×91 CSS px at 390 and 122×126 at 1280 (measured on the built page, `object-position: 50% 30%`).
- So the 640 files are 7× the phone's size and 5× the desktop's. That clears H25's "at least 3x" on both.
- The 1080 versions are there if the owner wants more headroom.

**Not committed (`.gitignore`):**
- the PNGs and the rejected takes (`img/`, `vid/`);
- the original Kling files of v1 Grok.

## How it was made

### 1. Stills: two re-renders of each source, both at 4K (`jobs-stills.json`)
- **Topaz image upscaler** at 4K, face recovery off. It is the exact one: it keeps every line.
- **nano-banana-pro** at 4K, with the source as reference and a prompt to keep everything and only make it crisp.

Results (board `ez/x2p-h25-chars-stills.png`):
- **Grok, both panels:**
  - nano-banana-pro kept the face and pose and made the ink crisp.
  - It also widened both narrow panels on its own: the left to 2:3, the right to 2:5. It continued the red wall and the jacket, and the couch and green room.
  - The face drift is small: the same smirk and eyes, a touch more defined.
  - I used these, because the square loop needs that width.
- **Sam:**
  - nano-banana-pro inked the face harder and added stubble and wrinkles, so the likeness drifted.
  - Topaz kept him exactly, so Topaz is the master.

### 2. Square framing for the window
- **Grok rocket:** the top 3392 px of the re-render, from y = 100.
  - It is head to chest, with the rocket's nose at the bottom left.
  - The rocket in hand does not fit a square that keeps the face big: the hand is too far down.
- **Grok couch:** a square from the face down to the crossed arms, with the planet screen top left.
- **Sam:** kept 16:9 for the video, so Kling sees the whole room. The square is cut from the 4K video afterwards: 1300 px at x 1400, y 380.
  - It holds the head, the coin and the jacket, and it sits under the "SAM" sign.
  - The sign's lettering stays out of frame; only a thin strip of its board shows at the top edge.

### 3. Loops: Kling v3, pro, 4K, 5 s
- Kling v3 at its highest settings: pro quality, 4K, 5 s.
- The **start image and end image are the same frame**, so the clip comes back to where it began. Audio off.
- **Prompts:** the camera locked; breathing, one blink, small gestures; then the subject:
  - **Grok:** the eyes drift and come back, the rocket turns a few degrees, the red backlight pulses.
  - **Sam:** the coin spins once on his thumb, the mirror bulbs flicker, the TV static shimmers.
  - **Couch:** the chin lifts, the green glow breathes, the planet turns.
- **Retakes:** v1 of both Grok panels had him talking: the mouth opened mid-loop, there was a wink, and on the couch the eyes closed with the mouth open.
  - v2 pinned the mouth closed and added "talking, open mouth, wink, closed eyes" to the negative prompt.
  - The rocket v2 is clean.
  - The couch v2 still parts the lips slightly around 2 s. Kling did not obey there, and I stopped spending on the alternative.
  - Sam's v1 was clean first time.

## Loop seam check (`seam.py`)
Measured on 256 px greyscale frames, as the mean absolute difference (0 to 255).

| Loop | Typical frame-to-frame (median) | Largest step (motion) | Seam: last frame → first |
|---|---|---|---|
| Grok rocket | 0.24 | 3.48 (a quick eye and head move, frames 59 to 67, continuous) | **0.59** |
| Grok couch | 0.27 | 3.73 | **0.85** |
| GPT (Sam) | 0.17 | 0.96 | **0.82** |

- Each seam is about 2 to 4 times a still frame's step and far below a motion step: no pop.
- The frames on both sides of the seam are the start image Kling was pinned to.
- I checked by eye, two times round, in `ez/x2p-h25-chars-loops.mp4`.
- No crossfade was needed.

## Which Elon panel fits the window: **the left, the rocket**
- **Face size:** the face fills about 40% of the window, against about 25% on the couch. At 88 px the couch Elon is a small head over a big couch.
- **Colour:** red on the slate chip reads as the "#1, hot" character. The couch's green fights the GPT chip below, which is green.
- **Style:** it is closer to the other three loops, which are head and shoulders.

**What the rocket loses:** the rocket itself. Only its nose shows in the window's bottom left; the hand holding it is out of frame. A wider square would bring the hand in, but at the cost of a face half this size.

## Boards
- `ez/x2p-h25-chars-390.png`: the whole Meet the models at 390 (3×). Today, then the rocket + Sam, then the couch + Sam. All videos are paused at 1.6 s.
- `ez/x2p-h25-chars-close.png`: the Grok and GPT chips at 390, the same three.
- `ez/x2p-h25-chars-1280.png`: the same at 1280.
- `ez/x2p-h25-chars-stills.png`: the owner's stills beside their 4K masters.
- `ez/x2p-h25-chars-loops.mp4`: the loops twice round, today's beside the new. Top row: Grok today, rocket, couch. Bottom row: GPT today, Sam.
- `ez/x2p-h25-chars-390.mp4`: the section at 390, recorded live with the new loops.

`shoot.js` shoots them. It serves `ez/` on port 8961 and routes `founder-grok/gpt-anim.*` to the anim2 files over the built `v46-live-x2plus.html`. At 390 and 1280 there is no sideways scroll and there are no page errors.

## To ship it
- Copy `founder-grok-anim2.*` and `founder-gpt-anim2.*` into `ez/media/`, and point `vid()` in `x2p_chips.js` at `-anim2` for Grok and GPT.
- Add the six names written out in full to its media comment, so `make_site.py` copies them.
- Use new names only (media is cached for a year).
- The couch take would be `founder-grok-couch-anim2.*`, renamed to `founder-grok-anim2.*` if picked.

## How it could fail
- **Likeness and real people:** these are caricatures of Elon Musk and Sam Altman from the owner's own stills, as the live loops are (the owner's call, CLAUDE.md 2026-10-31).
  - Kling keeps the face close but not identical frame to frame. Around the quick eye move (rocket, about 2.5 s) the face shifts slightly.
  - At 88 px that does not read as a different person; at 1080, frame by frame, it does a little.
- **The coin:** Sam's coin flips edge-on and back. For about three frames its "$" is a smear rather than a symbol. It is too small to see in the chip.
- **The rocket mostly cropped:** the owner may want the rocket in hand, which this window cannot show at this face size. Then the window's geometry needs to change, not the loop.
- **The couch lips:** the couch take's lips part slightly mid-loop. If it is picked, a retake (about $2.10) with the mouth pinned harder may be needed.
- **Weight:** Grok's 876 KB mp4 is the heaviest of the founder loops. With four loops on screen near the top of Meet the models, a slow phone downloads about 0.3 MB more than today. If that matters, CRF 20 brings it to about 0.6 MB with faint softening in the hair.
- **Seam on Safari:** the seam was checked by numbers and by eye in Chromium. Safari's loop restart (a short hitch on some versions) was not tested; today's loops share that risk.
- **The poster vs frame 0:** the poster is frame 0 of each loop, so play starts on the same picture. With reduced motion only the poster shows. For Sam that is the coin up and eyes closed, which reads as intended.
