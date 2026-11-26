# Round H2 · bet2: the die count, live, and the stakes reinvented

Boards: `ez/x2p-x3p-h2-bet-390.png`, `ez/x2p-x3p-h2-bet-1280.png` (today, then S1 to S5; a close-up row of the dies).
Recording: `ez/x2p-x3p-h2-bet-tick.mp4` (8 s, 780x440, 30 fps, take S1 at 390px).
Run: serve `ez/` on port 8942, `node run.js <out> now,s1,s2,s3,s4,s5 390,1280,320`, then `/usr/bin/python3 board.py <out> <width> <file>`; recording `node rec.js <out.mp4>`.
Every take = `_b.css/_b.js` (round H's kit, image path moved to bet2) + `chip.css/chip.js` (shared: the chip, the live digits, the ground, the sockets closer, the gutter captions) + `sN.css/sN.js`, laid over the real built X3+ page. Mockups only; no live file touched.

## 1. Live digits (all takes)
- **Clock:** the page's own bet rule (`betAt`, copied verbatim from world-comic.js in round H's `_b.js`). Before the section is replaced the script reads the live chip's digits and compares: days and hours agreed on every shot (`window.__btCheck.okDH`), seconds 1 to 2 s apart (time between the two ticks).
- **Ticks** once a second, aligned to the wall clock's second boundary (setTimeout to the next whole second, so no drift).
- **In the dies:** each die is page text (Anton) mapped onto the die's glass with a CSS matrix3d from four measured corners, so the digits lie in the chip's perspective. Each character is its own slot: on a change the old digit rolls down and out, the new one rolls in from above (a reel counting down, 420 ms), the die flashes slightly brighter (`--fl`, a registered custom property), nothing moves with reduced motion.
- **Glow and bloom:** a white-hot core into gold and amber (gradient clipped to the glyph), three stacked drop-shadows (2, 7, 16 px) as bloom, a warm pool of light on the glass behind; over it a raking glare and faint scan lines, screen-blended, so the glass sits in front of the light.
- **Labels:** DAYS / HRS / MIN / SEC silkscreened on the board under each die, mapped into the same perspective.
- **Screen readers:** the chip is `role="timer"` with a sentence ("18 days, 6 hours, 45 minutes until the NVIDIA bet") updated every 30 s; the reels are aria-hidden.
- **Recording, faked clock (said plainly):** `rec.js` shifts `Date.now` by a whole number of seconds so the countdown sits 5 s before an hour boundary; the film shows the seconds rolling 04, 03, 02, 01, 00, then 06:00:00 turning to 05:59:59 (seconds, minutes and hours rolling at once). The rule and the code are the live ones; only the clock is moved. Frames are the browser's own screencast at their real timing (the page drawn at 2x via `zoom:2` on a 780px viewport, since the screencast returns CSS pixels).

## The chip at 2K
- `chip2k-sd.jpg`: seedream-50-pro edit of round H's chip (its asset as the reference), 1440p. Same chip, same angle, crisper ink line, deeper glass, rims sharper; the dies are a touch wider and squarer, so the digits fill them better. Its framing changed (the chip sits higher), so the dies were re-measured: dies 2 to 4 by flood fill, die 1 (its glare breaks the fill) by eye on a 3x grid. On a 390 phone a die is 76 px wide (T1 had 57).

## 2. The stakes, five takes
All words are page text; every number is live (`SIM.poolShare` for 69%, the leader by `__x2pPnl()` P&L, today Grok). No flat yellow or green boxes: the text sits on the painted board as printed lettering, on metal, or on the stub. The closing line is shared (see 3).

| Take | The story | Carriers | Art |
|---|---|---|---|
| S1 The circuit | the fees run along the board into the pool; the call is a junction; it forks to a lit LED or a blown fuse | gutter captions lettered on the board (the 69% in gold), a drawn gold trace dropping from each caption into its panel; RIGHT and WRONG in neon by the LED and the fuse | traces-sd, fork-gpt |
| S2 The scale | the pool weighed on the top AI's call | green pan = right, red pan = wrong, engraved bronze plates (hand-cut, rivets, cut-in letters) | scale-gpt |
| S3 The bet slip | the bet as a slip you hold | a stub drawn by hand (notches, corner radii, perforation, drilled vias, gold contact strip, double gold trace border) filled with the painted board texture from stub-gpt; Stake / Pick / If right / If wrong printed on it; NVIDIA · NVDA · Bet #1 up the stub | stub-gpt (texture) |
| S4 Parts list | each part of the bet is a component on the board | three painted components with silkscreen reference designators (C1 the pool, U1 the call, K1 the switch with a green and a red lamp), traces down to a parts list | parts-sd |
| S5 Wired | the chip's traces keep going down the page | hand-drawn SVG: gold traces with pulsing fee dots flowing into a capacitor filled with gold, a via (the call), a green LED glowing, a blown glass fuse with sparks and smoke; the words beside each part | none |

## 3. Closing line and ground
- **Closer (all takes):** "NVIDIA is the first bet, not the last. Season 2 brings more." beside three empty chip sockets drawn by hand (dashed silkscreen outline, pads, pin-1 mark, "#2 #3 #4"), each fainter than the last: the bets still to come are empty sockets on the same board.
- The sub line under the headline is now only "It goes on at the close, Wednesday, November 18." (round H's "The first of many" said the closer twice).
- **Ground:** the section is a hand-cut board (an irregular ink-edged panel with a hard shadow) painted with a dark circuit-board substrate (ground-gpt, 9:16, on phones; ground-sd, 2K, on desktop), lit warm from the top where the bet is, darkened for reading. The opener and the headline stand on it unchanged.

## How each could fail
- **Digits:** the bloom is three filters on a 3D-transformed element; fine in Chromium, not checked in Safari (matrix3d on text with filters, `@property`). Before the bet: days show two digits ("18"); at 100+ days a third slot appears (the reel handles it, but the die is sized for two). After the bet time the dies sit at 00 (as the live chip does): needs a state for after the bet.
- **Chip:** a memory-style package (four dies in a row), not a real NVIDIA layout. Die 1's corners were set by eye (within about 3 px at 2048 wide).
- **S1:** tallest (about 1,150 px at 390). The traces panel's well is the hero of that panel and has no words on it (by rule); a newcomer may read it as decoration until the caption above says "pool".
- **S2:** the scale's beam is level while the left pan holds coins: a physicist would object. The coins in the green pan could read as "the pool is safe if right" rather than "buyback". Plates are bronze, not flat, but still rectangles.
- **S3:** a label/value list (Stake, Pick, If right, If wrong) is close to the dashboard pattern rule 0 warns about; it is defensible only because a bet slip is literally that object. Text is small on a phone (12.5px).
- **S4:** the three-column parts list is narrow at 390 (lines wrap to 4 to 5); at 320 it is tight. The relay is a painted toggle with lamps, not an obvious "switch" to a non-engineer.
- **S5:** drawn in code, so it is flatter than the painted chip right above it: it fails lesson 66 by contrast (the owner may call it cheap next to the painting). Kept as the cheapest, most data-flexible take and the one whose motion means something (fees flowing in).
- **All:** the leader can change; every take names whoever leads on P&L at load. The 69% is `SIM.poolShare`.

## Checks run
- 390, 1280 and 320 px: scrollWidth equals the viewport (no sideways scroll), no page or console errors, days and hours equal to the live chip (log in the run output).
- Rule 0 list: no white or pale module grounds (the ground is the painted board), no emoji (AI marks are the site's own, on a cream disc with a gold rim), no words over a logo or the art's subject (labels sit beside the LED, fuse, pans, components), no all-over dot fill, name and ticker together on the stub ("NVIDIA · NVDA").
- Zoomed at 2x on the close-up row: the digits read as lit glass in the dies; S2's plates and S3's stub hold up; S5 is the flattest.

## Hedra jobs
| Name | Model | Settings | Cost | Time | Result |
|---|---|---|---|---|---|
| chip2k-sd | seedream-50-pro | edit of round H's chip asset, 1440p 16:9 | $0.135 | 113 s | Same chip, crisper ink, deeper glass, dies a bit squarer; the chip moved up in frame. Used in every take. |
| traces-sd | seedream-50-pro | 1080p 16:9 | $0.0675 | 78 s | Gold traces converging into a gold-rimmed well of molten gold; best "pool" picture. S1. |
| fork-gpt | gpt-image-2 | 1K medium 16:9 | $0.029 | 27 s | A gold trace forking to a lit green LED and a blown, smoking fuse; reads at once. S1. |
| scale-gpt | gpt-image-2 | 1K medium 4:3 | $0.037 | 36 s | Brass scale, chip at the pivot, green pan with coins, red empty pan; strong ink. S2. |
| parts-sd | seedream-50-pro | 1080p 16:9 | $0.0675 | 87 s | Gold capacitor (glowing liquid), a chip with a star, a relay with green and red lamps. S4. |
| stub-gpt | gpt-image-2 | 1K medium 16:9 | $0.029 | 27 s | A ticket stub cut from circuit board; too small to print on at phone size, so used as S3's texture. |
| ground-gpt | gpt-image-2 | 1K medium 9:16 | $0.029 | 28 s | Dark board substrate, faint traces, warm glow at the top. Phone ground. |
| ground-sd | seedream-50-pro | 1440p 16:9 | $0.135 | 87 s | Same idea at 2K, a little more contrast. Desktop ground. |

Spent: **$0.53** (every job's estimate; all completed, no 429s this round). Well under the $12 cap: the takes did not need more paintings; 2K was spent only on the chip and the desktop ground.
