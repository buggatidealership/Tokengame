# H26 `film3`: the gaps, and "the whole game" as its own small section

Mockups only, laid over the built `ez/v46-live-x2plus.html`. Nothing in `tools/v22/`, `v4*.html` or `media/` touched. Saved by the lead from the helper's hand-back (the helper's Write was blocked).

## Boards
- `ez/x2p-h26-film3-takes-390.png`: today, then takes A to G in place, measured gaps on each.
- `ez/x2p-h26-film3-takes-1280.png`: the same at 1280.
- `ez/x2p-h26-film3-open.png`: G closed and open: phone upright, phone sideways in its own full-screen player, desktop theatre view.
- `ez/x2p-h26-film3-gaps.png`: the whole top, today against G, at 390 and 1280, every gap bracketed and measured.

## The want
The four frames already teach the round; the film is the optional "watch it whole". It belongs to How a round works (close under it, same material), reads as a video at first sight (play mark, running time, picture), carries almost no chip and no dead space, opens big on a tap with sound; then the page's first real pause before the characters.

## Takes
Shared: each painting cut as a 9-slice (`border-image`) at one scale k = width / painting width, so the glass is exactly 16:9 at any width; the head is frame 1's sub-head cloned with a play mark ("▶ The whole game") on the monitor's top-left corner; the running time is page text from the film's metadata, lit on the glass (cap about 11px at 390); the poster is an `<img>` under a `<video preload="none">`, transparent until it plays.

| Take | What it is | Monitor at 390 (glass) | Section height at 390 |
|---|---|---|---|
| A, bezel | Lip with pins, lit ▶ in its window; gold disc; 1:20 on the glass | 374x246 (360x203) | 266 |
| B, transport | Same monitor; play key, track and 1:20 lit on the glass | 374x246 | 266 |
| C, legs | Glass in a gold bezel on chip legs | 374x232 (363x205) | 252 |
| D, scope | A 2.39:1 strip | 374x175 (362x152) | 195 |
| E, module | theme7's M slimmed: 1:20 in the LED, the gold key is play | 374x163 (269x122) | 183 |
| F, bare bezel | The gold bezel only | 374x216 (360x204) | 236 |
| **G (pick)** | B's transport on F's bezel | 374x216 (360x204) | 236 |

Today's film beat is 310px tall at 390. Runner-up E (most compact, but the film is only 269px wide).

## The gap rule
D = k·u + 0.45·ΔE76(ground above, ground below), u = clamp(26px, 8vw, 32px), measured box to box. Film joint k=1 (a gold trace from the frames' gutter into the bezel); beat (top → How a round works) k=3.5 (today's gold fingers); chapter (film → Meet the models) k=5 (theme7's edge connector, at least max(14px, .6u) clear on each side). ΔE is 0 on today's all-green page; theme7 P1 adds 16px.

| Page | Beat | Film joint | Chapter |
|---|---|---|---|
| Today, 390 | 104 | 104 | 27 |
| Today, 1280 | 92 | 92 | 21 |
| G, 390 | 109.2 | 31.2 | 156 |
| G, 1280 | 112 | 32 | 160 |
| G, 320 | 91 | 26 | 130 |

## Tap to watch big
Phones: the tap plays with sound and hands the film to the phone's own full-screen player (iOS `webkitEnterFullscreen()`; elsewhere `requestFullscreen()` plus a landscape lock); sideways the film is 693x390, about 3.5x the inline glass. Upright or refused: edge to edge on a scrim with transport, a 44px close and "Turn your phone for full screen". Desktop: a theatre dialog with the same monitor, 1110px wide at 1280x900; Esc or a click outside closes. One `<video>` moves between small and big, so the film never restarts.

## Drop-in
1. `x2p_top.js` `build()`: drop the `beatGut()` before `.t4-b3` and the `.t4-b3` block; insert `.f3-j`, the `.f3` block (cloned sub-head + `mon('G', width)`) and `.f3-cx` as the last child of `section.t4` (in `main` it would take a grid cell from 1200px).
2. Media, flat, new names: `out/f3-fbt.jpg` → `media/film3-bezel.jpg` (3053x1439); `out/f3-cx.jpg` → `media/film3-connector.jpg` (2400x607).
3. Port `gaps()` (two passes, to the pixel); rerun on fonts ready, width changes and `place()`.
4. Phones: `.f3` takes the 16px bleed, monitor inset 8px; desktop: hug the monitor, centred, 600px; the connector reaches the window's edges by negative margins.
5. Port `openLB()`: move the `<video>` in, trap focus, `aria-modal`; phones try native full screen first.
6. Optional: a 300ms FLIP grow on open, transform only, none with reduced motion.
7. No perspective layers (border-image lays out at screen size).

## How it could fail
- The transport may read "plays here, small" (option: first tap inline, full screen in a corner).
- The bare bezel may read as a TV, not the board (A and B keep the lip).
- Scanlines (`.f3-sc`) may read as low quality small.
- Phones may refuse full screen; the upright fallback is barely bigger (390 against 360px).
- The 160px chapter gap at 1280 may feel heavy (k tunable).
- The connector is bright green; tint per ground on theme7's palettes.
- Untested: Safari (border-image seams at fractional widths), real phones.

## Checks
No pale grounds, no dead space, glass exactly 16:9, nothing over the poster's ticket, no emoji, no new typefaces; at 320 the monitor is 304 (glass 294x165), nothing overflows; running time computed from the film.

## Hedra
gpt-image-2, 4K 3840x2160, high; refs `top-t3-screen-h22.jpg`, `bet-chip-h2.jpg`; $0.43 a job, $1.70 total: `fb` (A, B; cut for F, G and the theatre), `fp` (C), `fs` (D), `fr` (E). Crops in `out/` (JPEG q90): f3-fb 3053x1685, f3-fbt 3053x1439, f3-fp 3200x1763, f3-fs 3650x923, f3-fr 3311x1444, f3-cx 2400x607, f3-play-0249 1920x1080.

## Files
`_f3.js` (`window.__f3(take,{open:'phone'|'land'|'theatre'})`, measurements in `window.__f3m`), `shot.js`, `stitch.py`, `board.py`, `gen.py`, `glass.py`, `img/` (4K masters), `out/`.
