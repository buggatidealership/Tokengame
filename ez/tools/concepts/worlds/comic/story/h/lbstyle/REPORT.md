# Round H6 · lbstyle: the Leaderboard tab as a chapter in another ink

Brief: `../BRIEF-H.md`, "Round H6", area `lbstyle`. The owner: "you can change the character's style depending on what sections they're showing up in. I do like the noir ink ones... the overview page could be what we have today... and then the leaderboard tab can have a different style itself, can have like noir ink".

Mockups only. Nothing live changed, nothing deployed or published, no file in `tools/v22/`, `ez/media/` or any `v4x-*.html` touched.

## What I read the want to be
The site as a book whose tabs are chapters: the Overview stays today's pop comic, and turning to the Leaderboard should feel like turning to chapter two, drawn in a different ink, with the same four characters in that chapter's finish.

"Noir ink" reads two ways, so I made both:
- **A, noir ink proper.** The whole chapter is redrawn in black ink and rain. Colour appears only where it carries a fact.
- **C, the mix.** The scenes and the cast are noir, but the facts stay in the Overview's pop lettering. The two chapters then share one lettering and differ only in ink.

B is the second finish the brief asks for: anime cel.

## Boards and videos
- `ez/x2p-x3p-h6-lbstyle-390.png`: today's live tab first, then A, B and C. Each column shows the whole tab in the Season window (the default), the same tab after tapping "Last 24 hours" (the windows working, live 24h figures), and a 3x close-up of the fight bill.
- `ez/x2p-x3p-h6-lbstyle-1280.png`: the same at desktop width.
- `ez/x2p-x3p-h6-lbstyle-{a,b,c}.mp4` (390px, about 18 s each), `ez/x2p-x3p-h6-lbstyle-a-1280.mp4`. Each video runs the same script:
  1. On the real page, from the Overview, a tap on the Leaderboard tab shows the chapter turn.
  2. The bill's switch is tapped through Last 24 hours, Last 7 days and Season. These are the page's own animated switches.
  3. The video scrolls to the scoreboard and taps its own switch.

## How it is built (separable parts, lesson 15)
- `lbs.js` and `base.css`/`core.css` lay the chapter over the **real built page** (`v47-live-x3plus.html#/leaderboard`). Every module is the page's own DOM, restyled. So all figures are live (`SS`, `__x2pPnl`, the page's renderers), and both Season / 24h / 7 days switches (bill and scoreboard) keep working with their own rules.
  - A MutationObserver re-dresses whatever the page re-renders on a switch: faces, ink frames.
  - Nothing is typed.
- **Faces.** Each `.wc-face` gets the cast in the chapter's finish. Which model a face is comes from the page's own `data-m` and `--mc`.
  - The window leader's corner holding the golden ticket (`.wc11n-gt` present) gets the **ticket** pose.
  - The other corner gets the **challenger** pose.
  - Everything else (mugshots, undercard, proof rows, overtakes) gets the cast2 still in that finish.
  - The ticket follows the data: in 24h and 7 days, Grok leads the window but the ticket tag goes, so both corners show the challenger pose.
- **Ink frames** (`frame()` in lbs.js) are hand-wobbled SVG outlines, a thick outer line plus a thin inner one, drawn per element with a seeded jitter. They are redrawn only when the element's size changes. This replaces the site's even CSS borders.
- **Grounds** are painted (Hedra), one per module: the bill, the scoreboard and the proof each stand in a place.
- **The chapter caption** ("Chapter two · The standings") sits above the bill and replaces the bill's own "The standings" line.
- **The chapter turn** (`turn()`) is an overlay that plays on `hashchange` to the Leaderboard. It does not play with reduced motion.
- Each take is a separate CSS file (`a.css`, `b.css`, `c.css`). The parts can be swapped: grounds, cast, lettering and turn are independent rules.

## The takes

**A · Noir ink, "the case file" (my pick).**
- **Bill:** a rainy street at night with two lamps, one over each corner. Each fighter stands under his own lamp: the golden ticket holder holds the blank gold ticket, and the challenger stares the viewer down.
  - The golden ticket holder lives: a 4 s seamless loop of the rain falling and the foil glinting (lesson 32, quiet). It is a still with reduced motion.
- **Captions** are typed on cream slips (Special Elite). The headline is hand-lettered (Bebas Neue).
- **Window switch:** typed index tabs, the open one lifted.
- **Scoreboard:** the tale of the tape pinned on a detective's office wall, with blinds' light across it.
  - The four founders are taped-up mugshots. The P&L bars are cross-hatched in green or red ink.
- **Proof:** the P&L lines drawn like grease pencil on a rain-streaked window over the city.
- **Colour only where it means something:** gold = the golden ticket, green / red = money up / down. Each founder keeps his own spot colour on his coat (Grok violet, Claude rust, GPT green, Kimi blue), which tells them apart in black and white.
- **Turn:** black ink comes down over the page, the alley appears, "Chapter two" is typed on a slip, "The standings" lands, and the page is lifted away (2.2 s).

**B · Anime cel, "the tournament arc".**
- **Bill:** a tournament arena at golden hour. The two halves of the bill are the two fighters' own colours (lesson 48), with a hard cel shadow band at the foot.
  - The cel cast: the ticket holder grins with the ticket, the challenger points at you.
- **Lettering:** title-card lettering (Dela Gothic One with a hard offset shadow). The switches are slanted title tags.
- **Scoreboard:** in a club room at the chalkboard. **Proof:** on a rooftop at dusk.
- **Turn:** an anime eyecatch. Two colour halves wipe in, the four fighters pop up in a row with "Episode 2 · The standings", then everything wipes out.

**C · Mix, noir x pop.**
- **Scenes and cast:** A's scenes and noir cast.
- **Facts:** printed in the Overview's pop lettering (Luckiest Guy, Bangers): yellow names, outlined money, a yellow selected tab.
- **Headline:** lettered onto a lit pop-art billboard that is part of the painted rainy street. It is a crop of the painting, not a code-drawn box.
- **Turn:** the page turns (a 3D page flip from the left) to the alley, with the chapter title on the billboard.

## Paintings (Hedra): $4.29 of $15
| Job | Model | Settings | Each | n | Total |
|---|---|---|---|---|---|
| noir grounds: street, office, window, alley, pop billboard street | gpt-image-2 | 1K medium, 16:9 / 9:16 | 0.029 | 5 | 0.14 |
| cel grounds: arena, club room board, rooftop sky | nano-banana-pro | 1K, 16:9 | 0.151 | 3 | 0.45 |
| noir poses: ticket + challenger x4 (refs: today's poster + cast2 noir still) | gpt-image-2 | 1K medium, 1:1, 2 refs | 0.078 | 8 | 0.62 |
| cel poses: ticket + challenger x4 (refs: poster + cast2 cel2) | nano-banana-pro | 1K, 1:1, 2 refs | 0.154 | 8 | 1.23 |
| street and office at 2K, for the pick | gpt-image-2 | 2K high | 0.222 | 2 | 0.44 |
| noir ticket-holder loops x4 (rain, glint), crossfaded to a seamless 4 s | kling-25-turbo | 5 s, 1:1, 1080p, start image | 0.35 | 4 | 1.40 |

Times: 1K stills 22 to 65 s, 2K about 80 s, loops 97 to 129 s. Every job is in `jobs.jsonl`. Files: `img/` (JPG q85 to q88, 1024px or 2048px; loops 640px, about 0.9 MB, no sound). Scripts: `hd.py`, `batch.py pose-n|pose-c|ground|hd`, `vid.py`. Raw downloads in `raw/` are not committed.

Honest notes on the paintings:
- **Likeness held in all 16 poses.** The noir GPT in the challenger pose is the weakest: his face is small in the frame. The cel GPT keeps a knot mark on his chest from the cel2 reference.
- **No text anywhere**, checked at full size. The tickets are blank gold, and the billboard and chalkboard are blank.
- The street and office paintings carry a thin off-white printed border. The CSS crops past it.

## Checks run (rule 0 and the hard rules)
- **Overflow:** 320, 390 and 1280px, every take, both windows. No sideways scroll (scrollWidth equals the width), no console errors.
  - The 404s in the logs come only from the runs made before the loops existed.
  - At 320px, B's longest tab ("Last 24 hours") wraps to two lines, as intended.
- **Live data:** the 24h shots show the 24h P&L, W-L and "Biggest swing on Reddit" line from the page itself. The scoreboard follows its own switch.
- **Nothing over a number or a face:** the ink frames sit on the panel edges, and the tags sit above the portraits, not on them.
- **No native emoji. No white grounds inside modules:** caption slips are cream paper on ink, like a comic's narration boxes.
- **Hierarchy:** the loudest lettering is spent once per module, on its head. Inner figures are quieter.
- **Speed**, measured on a 4x slower CPU at 390x844, median of 3 runs. The turn figure is frames per second during the 2.4 s after tapping Leaderboard; idle is main-thread time per 6 s at the top of the tab.

| | During the turn | Idle at the top of the tab |
|---|---|---|
| Today | 42.6 fps | 1.14 s per 6 s |
| A | 40.7 fps | 0.94 s per 6 s |
| B | 40.3 fps | 0.98 s per 6 s |
| C | 39.8 fps | 0.95 s per 6 s |

  - A first draft cost 5.97 s of every 6 s: my MutationObserver re-triggered itself on its own frame redraws. It now ignores its own nodes and redraws a frame only when the size changes.
  - Idle is lower than today partly because the holo face animations are off inside the chapter.
  - The turn costs about 2 to 3 fps against today's instant switch. The ticket holder's loop is a 0.9 MB, 640px video decoded on the compositor.
- **The page's own switch animation:** the bill's corner grounds (`.wc11c-g`) slide in during a window switch, and they leaked the old orange dots into B and C mid-switch. They are hidden in every take; the videos are recorded after that fix.
- **Compared with a real comic page at 3x (the close-ups):** A and C read as printed noir panels (ink frames, lamplight, cast in the same hand). B reads as an anime frame more than a comic page, which is what cel is.

## How each could fail
- **A**
  - Black and white makes the four founders harder to tell apart at mugshot size. Their spot colours carry it, but Grok's violet is thin.
  - Typewriter captions are slower to read than the Overview's comic hand.
  - A whole chapter in black may read as "a different site" (lesson 27) unless the turn sells it as chapter two. Without the turn (reduced motion, a shared link that lands straight on #/leaderboard) the switch of ink is abrupt.
  - The best-in-row rings stay gold, while gold is otherwise only the ticket. A red grease-pencil ring would be stricter.
- **B**
  - Cel is the furthest from today's look and from the films. It is the take most likely to read as another product.
  - The cel cast drifts younger and softer (cast2 already saw this).
  - The tournament grounds are generic anime places, not EZ's world.
  - Dela Gothic One is wide: every figure had to come down in size on phones, and the scoreboard names are the tightest on the page.
- **C**
  - Two languages at once can read as busy. Yellow names, outlined money and a billboard all ask for attention, which breaks "the loudest once per section" (lesson 71).
  - The billboard headline is a crop of one painting. At some widths the crop shows the billboard's frame unevenly.
  - The page-flip turn is the slowest to read on a slow phone.
- **All three**
  - The cast's faces are big here. The owner has accepted the founders' likeness (CLAUDE.md), and I am not raising it again.
  - The chapter caption and the turn assume the visitor comes from the Overview. A direct visitor sees "Chapter two" without having seen chapter one.

## My pick
**A, noir ink, with C's billboard headline as an optional swap-in** (one rule, `h1.wc-tab-h`).
- A is the owner's ask taken all the way (lesson 61). It is the calmest of the three, so the numbers read first.
- Its one colour rule (gold = ticket, green / red = money) makes the facts pop out of the black more than they do on today's busy page.
- The living ticket holder is the one quiet motion that says who we follow.
- If the owner wants the two tabs to feel like one book more than two chapters, C's billboard keeps a single piece of the Overview's pop in the noir street, and only on the headline.

## Questions for the owner
1. Should the chapter turn play every time the Leaderboard opens, or only the first time per visit? Every time costs 2.2 s on each return visit (lesson 28: the return visit matters).
2. Should Upcoming be chapter three in its own ink, or should the book have two inks only?
3. In noir, should the best-in-row ring stay gold, or become red grease pencil, so that gold means only the ticket?
