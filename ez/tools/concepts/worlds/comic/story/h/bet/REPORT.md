# Round H · bet: "Bet #1: NVIDIA", five painted takes

Boards: `ez/x2p-x3p-h-bet-390.png` (today, T1 to T5, close-ups of each countdown) and `ez/x2p-x3p-h-bet-1280.png`.
Run: serve `ez/` on port 8941, then `node run.js <out> now,t1,t2,t3,t4,t5 320,390,1280`; boards with `/usr/bin/python3 board.py <out> <width> <file>`.
Each take is `_b.css/_b.js` (shared: the vault opener as it stands, the loud headline, captions, the homography) + `tN.css/tN.js`, laid over the real built X3+ page (`v47-live-x3plus.html`). Mockups only; no live file touched.

## Data (all live)
- Countdown: the page's own rule (world-comic.js `betAt`, copied verbatim into `_b.js`). Before a take replaces the section, the script reads the live chip's digits and compares: days and hours agreed on every shot (seconds differ by the 1 to 2 s between ticks); kept in `window.__btCheck`.
- Pool share: `SIM.poolShare` (69%). Top AI: highest P&L in `__x2pPnl()` (today Grok). The bet day: from the same rule (Wed, Nov 18).
- Digits are page text (Anton) in every take, ticking once a second. No number, letter or logo is in any generated image (all prompts end "No people, no text, no letters, no numbers, no logos, no signs"; checked each image at full size). The NVIDIA logo in T3 is the site's own `media/logos/NVDA.png`.

## The takes
| Take | Story | Countdown carrier | Stakes carrier | Art |
|---|---|---|---|---|
| T1 The die count | the bet is a chip counting down | digits set *into* the four dies of a modelled GPU (CSS matrix3d from the dies' measured corners, glow and glass glare), labels silkscreened under each die | two captions + two hand-cut stamped panels, green Right / red Wrong with drawn arrows | `chip-a-sd.jpg` |
| T2 The dial | the opener's vault, in close-up | days on the dial's face, a red needle that sweeps the seconds (6° a tick), hours/min/sec on brass tumblers | engraved brass plates with rivets ("Inside: the pool", "It opens on the top AI's call") | `vault-b-gpt.jpg` |
| T3 Main event | the season's fight | "Bell in" fight ticket (notched stub) | billing "Grok's call vs NVIDIA", purse = the pool, red corner = wrong, green corner = right, on the ring's own red and green ropes | `arena-a-sd.jpg` |
| T4 The hourglass | fees pour into the pool until the bell | engraved brass plate on the base | ink callouts with leader lines to the bulb (fees), the neck (the call), the pile (right / wrong) | `hourglass-b-gpt.jpg` |
| T5 Next issue | the bet is the next comic, "to be continued" | the cover's "On sale in" corner box | cover blurbs in bursts, a red/green banner at the cover's foot | `cover-c-gpt2k.jpg` (2K) |

## How each could fail
- **T1:** the dies are small on a phone (about 57 px; digits 28 px). The dies were measured by flood fill; a new render of the chip needs new corners. It is a memory-style package (four dies in a row), not an NVIDIA GPU die layout; a chip expert might notice. Arrow panels are hand-cut CSS polygons, still a little "box".
- **T2:** the dial face is drawn over the painted blank face, so at full size the painted and the drawn metal differ slightly in style. The opener above is the same vault open; the dial shows it shut (continuity could read either way: "before it opens"). Gold plates with green/red words have weaker contrast than T1's panels.
- **T3:** tallest on a phone (1,023 px). "Grok's call" names the leader today; the line under the clock says the board freezes 24 h before the bell (SIM.leadHours), so it reads honestly if the leader changes. A fight poster may read as hype rather than risk; the red corner keeps the wipe-out line visible.
- **T4:** the pile of coins implies a pool size the site does not know yet; a small label says "The pile is a picture. The pool's size goes live with $EZ." (keep or drop the hourglass). Leader lines are measured on resize, but with the callouts absolutely placed, a much longer wording would collide.
- **T5:** the cover adds a masthead "Earnings Zeason" (page text) on top of the site's header; may repeat. The bursts sit on the sky; in a different render they could cover the chip. "Inside!" on a cover is genre copy: true here (the pool is what the bet is about), but watch lesson 65.
- **All:** desktop leaves cream to the right of the narrower takes (the X3+ column is 1100 px; the opener is held at 900). Not checked in Safari (matrix3d on text, container units, clip-path).

## Checks run
- 320, 390, 1280 px: no sideways scroll, nothing outside the viewport, no page errors or console errors.
- Rule 0 list: no white module grounds (captions are yellow, plates gold, panels green/red), no emoji (faces are the site's own model marks), nothing over a logo or a face, no all-over Ben-Day fill. Zoomed at 2x (close-up row) against the films' art: T1 and T5 hold up; T2's drawn dial is flatter than the painted door.
- The headline is the one loud element per take (extruded gold, ink, red shade); inner pieces are quieter.

## Hedra jobs (all 1K drafts except the 2K cover)
| Name | Model | Settings | Cost | Time | Result |
|---|---|---|---|---|---|
| chip-b-gpt | gpt-image-2 | 1K medium 16:9 | $0.029 | 31 s | RAM-stick-like board, four flat dies front-on; clean ink. Not used. |
| chip-a-sd | seedream-50-pro | 1080p 16:9 | $0.0675 | 146 s | Modelled square GPU package, four glossy dies in perspective, gold light; best 3D. T1. |
| vault-b-gpt | gpt-image-2 | 1K medium 1:1 | $0.053 | 45 s | Noir vault door, blank dial face dead centre, gold rim light, coins on wet floor. T2. |
| vault-a-sd | seedream-50-pro | 1080p 1:1 | $0.0675 | 104 s | Ink sketch on cream, too pale against the noir opener. Not used. |
| arena-a-sd | seedream-50-pro | 1080p 3:4 | $0.0675 | 133 s | Poster with cream border, ring, chip as a belt, crowd; dark sky for billing. T3. |
| arena-b-gpt | gpt-image-2 | 1K medium 3:4 | $0.037 | 35 s | Darker, belt small; weaker. Not used. |
| hourglass-b-gpt | gpt-image-2 | 1K medium 3:4 | $0.037 | 31 s | Brass hourglass, gold coins, red/green rims; strong ink. T4. |
| hourglass-a-sd | seedream-50-pro | 1080p 3:4 | $0.0675 | 133 s | Glossier, red/green glass; less ink. Not used. |
| cover-b-gpt | gpt-image-2 | 1K medium 3:4 | $0.037 | 36 s | Golden chip over the skyline, crowd, searchlights. The draft for T5. |
| cover-a-sd | seedream-50-pro | 1080p 3:4 | $0.0675 | 99 s | Same idea, brighter, smaller chip. Not used. |
| cover-c-gpt2k | gpt-image-2 | 2K high 3:4 | $0.267 | 96 s | More rendered chip and city, a bigger empty sky for the blurbs. T5. |

Spent: **$0.80** by the estimates of completed jobs. A first parallel batch hit HTTP 429 (rate limit, the key is shared with other helpers) on six jobs; if any of those were submitted before the error they may have been charged too (at most +$0.39, so at most $1.19). gen.py now retries 429s and staggers submits. The account balance moves with every helper, so it cannot be used to check one helper's spend.
