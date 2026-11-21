# bet2x: X3+'s live bet, ported to X2+ (round H24 addendum 2)

## What it is
- `x2p_bet.js` / `x2p_bet.css`: an X2+ drop-in for Bet #1: NVIDIA, as it is live on X3+. That is the vault opener, the headline, the painted GPU chip with the live countdown in its four dies, board D with the flow in its traces (pool, call, RIGHT lamp / WRONG fuse, the Season 2 sockets) and the bleed on phones.
- Both files are **generated** by `gen.py` from `ez/tools/v22/story/h_bet.js/.css` and `h_betd.js/.css` (read only). Every change is a listed, asserted text patch, so when X3+'s bet changes, `python3 gen.py` ports it again. A patch that no longer matches stops the run instead of silently doing nothing.
- No new paintings and no Hedra. It uses the same media as X3+: `media/bet-vault-h2.jpg`, `bet-chip-h2.jpg`, `bet-parts-h2.jpg`, `bet-ground-h2-{phone,desk}.jpg`, `bet-board-d-{tall,wide}.jpg`, and `media/logos/{GOOGL,TSLA,MSFT}.png`. All of them are already in `media/`, with full names written in the script (make_site.py copies only media named in the page).

## How it mounts on X2+ (the patches)
- **Mount point.** It mounts in X2+'s own bet section, `#x2pSt` (built by x2plus.js BETSEC), instead of `#wc-book .wc-bet`. It waits only for `#x2pSt`, `MODELS` and `__x2pPnl`; it needs no comic DOM and no `html.p1-on`.
- **X2+'s own content.** X2+'s own head, stakes strap and tickets stay in the DOM, hidden, as X3+ does with its `.wc-bet` content. x2plus.js keeps managing the section (order, numbering, the cover's `x2pst`).
- **Accessibility.** The section's `aria-labelledby` now points to the new heading (`#x2bH`, "Bet #1: NVIDIA").
- **CSS selectors.** `html.p1-on .wc-bet.hb-on` becomes `html #x2pSt.hb-on`, and `html.p1-on:not(.cd-on)` becomes `html.x2b-on` (set once mounted).
- **Geometry.** The section is sized and centred exactly as X3+'s chapter: `min(100vw - 28px, 532px)` below 1000px, `min(100vw - 80px, 1100px)` from 1000px, and it spans the desktop grid from 1200px. The wrap inherits X3+'s text style (Shantell Sans 500 15px/20.25px).
- **Fonts, two fixes for pixel-identical text:**
  - X2+ loads Shantell Sans at 600 and 700 only, so the drop-in adds X3+'s own font link (400, 600, 800, italic 600).
  - X3+ has no 700 face, so its "700" text actually draws with the 800 face (checked in `document.fonts`). The port asks for 800 there.
- **Start order.** As on X3+, board D's first try comes on a 150 ms timer, after the chip has been placed (see "How it can fail", 1).

## Data rules (unchanged, verified)
- **Bet time:** world-comic.js's `betAt`, verbatim (inside h_bet.js).
- **Pool share:** `SIM.poolShare`, which gives 69%.
- **Leader:** X3+ reads the name from its own chapter's caption; X2+ has none, so the port takes the P&L leader of `__x2pPnl()`. Both say **Grok** today, at every width tested.
- **Sub line:** "It goes on at the close, Wednesday, November 18." is the same on both pages.

## Checks measured (scripts in this folder; serve `ez/` on port 8954)
| Check | Result |
|---|---|
| Pixels inside the section vs X3+ (`cmp.js` + `diff.py`; same fixed clock, reduced motion, same sub-pixel y) | 320px: **0.00%** of pixels differ by >24 levels (98.8% identical, the rest JPEG/AA noise of ≤24). 390px at 2x: **0.00%** >24 (99.07% identical). 1280px: 0.30% >24, 0.07% >64, all of it in the one tilted sub line (antialiasing) or the page ground beside the section (X2+'s speed lines vs X3+'s bands). Measured offsets of every child inside the wrap are equal to 0.1px at 1280. |
| Countdown equal (`check.js`, real clock, both pages open at once, read in the same second, 4 ticks) | Equal at 320, 390 and 1280 (e.g. 16:20:04:36 → :33 on both). Fixed-clock run: 16:11:18:53 on both. |
| Errors | None (page errors, console errors, failed requests) on X2+ with the drop-in or on X3+, at 320, 390 and 1280. |
| Sideways scroll | scrollWidth equals the window width at 320, 390 and 1280. |
| Reduced motion | No running animations in the section; board D's SMIL paused at 1.8 s (lamp lit); the digits set without the reel roll. |
| Motion on | The lamp/coin effects (`.hb-lv`) and the board's flow run only on screen and stop off screen; the ticker stops off screen. |
| Tab trip (`tabs.js`) | Overview → Upcoming → Overview: one wrap, one board, the section hidden on Upcoming and back on the Overview, no errors. |

The 404s seen in early runs (`/%23m` and so on) came from my own test script. It pre-loaded every background URL under the section, including fragments inside X2+'s hidden ticket textures. They are not the page's; the script now loads only real URLs.

## Boards
- `ez/x2p-h24-bet2x-390.png`: X3+ live, X2+ with the drop-in, the bleed option, and the difference ×8 (390px, 2x).
- `ez/x2p-h24-bet2x-1280.png`: X3+, X2+ and the difference (1280px, 1x).
- `ez/x2p-h24-bet2x-closeup.png`: the dies at 3x, both pages.

## Option, off by default: the ground bleeds (`html.x2b-bleed`)
Addendum 2 says every beat bleeds. On X3+ the vault, chip and board already run edge to edge on phones, but the section's dark ground stops 14px short of each edge (the page shows beside the headline, sub line and gaps). Adding the class runs the ground to the edges too. It is shown on the 390 board; the difference is small (the 14px gutters beside the head). It is not the default, because the brief asks for X3+'s pixels.

## How it can fail
1. **The chip crop is a start-up race, on X3+ too.** h_bet places the chip once, at the width before the phone bleed applies (the content width, about 327px at 390), and re-places only on a width change or `fonts.ready`. On live X3+ the chip therefore sits in a 390-wide box drawn at the 327 scale: a little more painting on the right, 151px tall instead of 180. The port keeps this order on purpose so it matches live X3+.
   - **Risk:** if X2+'s fonts finish after board D adds `.bd-on`, the chip is re-placed at the bled width and shows the intended (taller) crop instead. The dies still sit on their glass either way, since they are mapped with the same scale.
   - **Fix, if wanted (both pages at once):** re-place the chip after `.bd-on` is added (call `__hbPlace` in h_betd's `go`). That is a visible change on live X3+, so it is the lead's call.
2. **Generated, not hand-edited.** A change to h_bet/h_betd that touches a patched line makes `gen.py` stop with an assertion. That is intended; fix the patch and rerun.
3. **Hidden but alive.** X2+'s old NVIDIA ticket keeps its own countdown running, hidden (cheap; content-visibility). If x2plus.js ever removes or replaces `#x2pSt`, the MutationObserver on `main` re-mounts only if `#x2pSt` comes back.
4. **Two font links.** X2+ ends up with both Shantell sets (its 600 and 700, and X3+'s 400, 600 and 800). Any of X2+'s own text that asks for 800 now gets a real 800 face instead of a synthesised one; none was found in the section, and other sections were not audited.
5. **Not checked:**
   - Safari (SMIL, `color-dodge` blends, `matrix3d` on the digits; the same as X3+);
   - a 4x slower CPU (this is X3+'s code, unchanged);
   - 2x screenshots at desktop height, which were offset by the capture itself, so the 1280 pixel check uses 1x shots. The measured layout is identical either way.
6. **Section order is not handled here.** Addendum 2 puts the bet after Smart or lucky; X2+'s order is still routes.js / x2plus.js's.

## To build it in (not done here; no live file was touched)
In build.py's `_tp` (the X2+-only block), append `x2p_bet.css` to the `x2p-top` style and `x2p_bet.js` after `x2p_chips.js`, copied from this folder to `tools/v22/story/` (or have build.py run gen.py).
