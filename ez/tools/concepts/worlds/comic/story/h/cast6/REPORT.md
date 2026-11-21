# Round H14 · cast6: Meet the models that stands out

Brief: `../BRIEF-H.md`, "Round H14", `cast6`. Mockups only: nothing in `ez/tools/v22/` or `ez/v4*.html` changed; nothing deployed, published or opened as a PR.

The owner on cast4: "None of them stand out. But the format is good." The trading floor is the favourite "but just directionally". cast5 fixes structure; this pass is about the one frame a visitor would screenshot (lesson 107), with five levers, one per take.

## Boards and video
- `ez/x2p-x3p-h14-cast6-390.png`: today's live section first, then the five takes, two phone screens each (arriving, then one scroll), and a 2x close-up row of each take's striking frame.
- `ez/x2p-x3p-h14-cast6-1280.png`: the section at 1280 (1x), today first, then the five takes.
- `ez/x2p-x3p-h14-cast6-B.mp4`: the pick at 390, scrolled at reading speed: the leader's loop plays in the giant frame, its P&L counts up on the board, then each ticket's last five light one by one.

## What stays from today (format kept, lesson 101)
Every take uses one ticket in today's format and proportions: the rank stub ("Golden ticket" and a gold-foil stub on #1, "Season 1" on the rest), the model's mark on a badge, name, version and flag, **the big living founder portrait** (about half the ticket's width, as on today's card, framed as a boardroom painting with a banker's lamp), Right way, Season P&L, Best call (company and ticker), Last 5. Order = the page's own P&L rank. The heading is the Overview's one face (`.ez-hd`). "Not the Instagram kind. Ranked by P&L: $100K on every call." is a narration caption box at the top-left of its panel (lesson 105). No clicking into a model.

The ticket is new: a 1960s exchange floor ticket painted per model (its colour as the stock), every field a painted blank object (lesson 85). It is shared by all five takes so the takes differ only in the lever; C uses a second set lit by a spot.

## The five takes, and the one striking idea in each
| Take | Lever | The striking idea |
|---|---|---|
| A · Hero moment | one hero moment | The exchange opens on a single skylight beam falling on an empty brass podium, the whole floor turned towards it; the golden ticket stands on that podium, lit gold. The challengers sit below the crowd's silhouette in its shade. |
| **B · The wall** (pick) | scale contrast | The leader's living portrait **is** the exchange's far wall: a giant gilded frame, many times taller than the traders waving slips at it, with its P&L on the wall's quote board ("#1 GROK +$148,480 SEASON P&L"). The four tickets follow below at today's size. |
| C · Spot colour | dramatic light | Seen from the balcony, three gallery spots throw gold, green and red pools across the floor; each ticket sits in the pool of its fact: gold for the golden ticket, green for a P&L in profit, red for a loss. |
| D · Looking up | camera angle | A worm's-eye opener up a towering quote board with traders' arms reaching into it; each ticket hangs from the board on a brass chain, swaying a little (still with reduced motion). The tickets themselves stay face-on (lesson 92). |
| E · Open outcry | tickets as objects | Every ticket is held up by a trader's painted hand, thumb over its edge, like a bid in open outcry. On desktop the hands rise to different heights: the higher the ticket, the higher the rank. |

## The surface under every live text
Every word and number is page text, live from `POP.data()` (`__x2pPnl`, MODELS, ROUNDS); nothing is baked into a painting (every prompt ends "no text, no letters, no numbers").

| Live text | Painted surface |
|---|---|
| `#1` to `#4` | the stub's blank round seal (gold); #1's gold-foil stub is painted separately and laid over the ticket's own stub, so it follows whoever leads |
| "Golden ticket" / "Season 1" | the stub's tall blank gold strip |
| model mark (MODELS path) | the blank brass exchange badge |
| name | the blank yellow pennant |
| version | the punched brass tag under it (the painted flag hangs beside it) |
| Right way `45/72` | a small black quote-board panel with brass rim and rivets, left of the portrait |
| Season P&L | the wide black quote-board panel |
| Best call, company (ticker) | the second wide black quote-board panel |
| Last 5 | five painted indicator lamps; the stamp (painted tick or cross) sits in each lamp; "Last 5" is on the ticket's own printed stock |
| B: "#1 GROK +$148,480 SEASON P&L" | the blank black quote board painted under the giant frame |
| the line under the heading | a yellow narration caption box (Bangers), the Overview's caption device |

Fields are measured on each painting, not trusted to the guide (`fields.py`, `measure.py`, from cast4). `geom.py` then measures every version tag on its brass (the colour test had caught a highlight, and the first fallback put "Grok 4.7" half off the tag, where its brown ink vanished on Grok's dark stock), sets GPT's lamps by eye, finds the wall's frame window and board, and cuts the hands (the teal hand's card box is set by eye: its thin outline leaks). Each flag is placed after its version tag, measured on the page.

## My pick: B, the wall
- It is the only take whose frame is a screenshot by itself: one face, huge, on an exchange wall over a crowd waving slips. Scale says "this one is on top" before any word (lessons 41 and 107).
- It answers the owner's "today's big founder portrait was enough" at the largest size the section can give it, and the living loop now reads as a painting on a wall (the Harry Potter frame) rather than a thumbnail.
- The fact under it is one number on the board, in the crowd's vocabulary (P&L), so the wall stays a picture, not a dashboard.
- It hands over to Smart or lucky's exchange room in the same world (lesson 93).
- Repainted at 2K high (both plates, $0.44); the rest stays 1K until the owner picks (lesson 83).

Second: **E, open outcry**: the tickets become physical, and on desktop the height of the hand encodes the rank; the most "alive" without any animation.

## How each take could fail
- **All:**
  - The four cards are not pixel-identical: each ticket's fields sit where the painter put them, within a few pixels. Measured fits keep every figure inside its field at 320, 390 and 1280 (`over: []`); a new painting needs `fields.py`, `measure.py` and `geom.py` rerun.
  - Code effects still left beside painted pieces (lesson 80): the lit lamp glow (a CSS radial gradient over the painted lamp), the tickets' hard ink shadow (CSS drop-shadow). Painted lit lamps (green and red) would cost about $0.10.
  - Grok's last five are W W W L L: it leads the season but lost its last two. A or B (the spotlight, the giant portrait) can read as a hot streak the data does not show (lesson 8). The lamps beside the hero say it; the owner should judge whether that is enough.
  - The US flag's stars and stripes are approximate (comic licence, from cast4).
- **A:** the gold glow round the hero ticket is a CSS drop-shadow, not painted light; the shade under the challengers is a flat teal panel with a multiplied silhouette, which reads as a code band at 1280. The hero stands a little low on the podium on phones (the podium is half hidden).
- **B:**
  - Grok's face appears twice (the wall and its own ticket). That is two carriers for one fact (lesson 13); the alternative is a leader ticket without its own window, which breaks the format the owner kept.
  - The wall only knows the leader: when the lead changes the loop and the board change, the painting does not (fine), but the challengers get no scale moment at all.
  - On desktop the frame's window is wide (about 16:10) while the founder loops are portrait-ish, so the loop is cropped to head and shoulders by `object-fit: cover`.
  - On phones the wall plate is 9:16, so the section is about 450px taller than today (2566 against 2117 at 390).
- **C:** the coloured pools behind the tickets are CSS radial gradients (the plate's own pools do not line up with the tickets as they scroll), so the take reads as glow effects; the lit ticket paintings came out barely different from the base ones (the rim light is faint). Weakest take.
- **D:** the opener is a striking angle but the tickets below are flat on a busy board background; on phones the plate behind them is sticky and repeats. The chain swing is the one loop per ticket.
- **E:**
  - The hands are cut from their own painted cards, so the thumb is a second cut-out laid over the ticket's stub edge (it never covers a number or the portrait, checked); at 320 the hand is small.
  - The crowd silhouette in front of the arms is multiplied, so it tints whatever ground is under it; it sits behind every ticket (moved there so it never covers a figure).
  - On phones the tickets alternate left and right at 86% width; the rank-by-height idea only exists on desktop.

## Checks run (rule 0 and the hard rules)
- 320, 390 and 1280px, all takes: `scrollWidth` equals the viewport; no console errors; no text spills out of its field (the fitter steps type down until it fits).
- No white or pale ground inside a module: fields are black boards, brass, yellow pennants and gold; the frames' white windows are cut out and filled by the loops.
- Nothing over a number or a face: E's crowd silhouette moved behind the tickets after the first desktop shot covered GPT's P&L; the thumb only overlaps the stub's lower edge.
- No emoji (stamps are painted), no Ben-Day module fill, no native sunburst (A's beam is the scene's skylight).
- Desktop shots hide the page's fixed crawl bar (`.x2p-cw`) so it does not sit over the section; the live page still has it.
- Zoomed in at 2x and compared with the Silver Age plates of cast4/sol4; not compared with a printed comic page beyond the model's output.
- Reduced motion: loops hidden (posters show), the lamps, count-up and D's sway do not run.

## Method
- `layout.json`, `guide.py`: today's format with the big window (x .50 to .955, y .045 to .515 of the ticket), one guide per model colour.
- `batch.py`: gpt-image-2 (Hedra v3), 1K medium, PNG; tickets take the guide as a reference image. `hd.py` is the client (never prints the key).
- `cut.py` (cut-outs), `fields.py`, `measure.py`, `geom.py` (measurements, wall window, hands), `take.js <out> <W> <now|A|B|C|D|E,...> [--video]` with `take.css` (serve `ez/` on PORT, 8946), `board.py` (boards).
- Raw PNGs (`raw/`) and screenshots (`shots/`) are not committed.

## Cost: $1.33 of $10 (25 jobs, 0 failed)
| What | Model | Settings | n | Total |
|---|---|---|---|---|
| tickets (4 base + 4 lit) | gpt-image-2 | 1K medium, 3:4, guide ref | 8 | $0.40 |
| gold stub | gpt-image-2 | 1K medium, 3:4, guide ref | 1 | $0.05 |
| plates (A, B, C, D, E × phone 9:16 + desktop 16:9) | gpt-image-2 | 1K medium | 10 | $0.30 |
| B's wall repainted | gpt-image-2 | 2K high | 2 | $0.44 |
| crowd silhouette, chain, two hands | gpt-image-2 | 1K medium | 4 | $0.13 |

Flags and stamps are reused from cast4 (`cut/f-*.webp`, `cut/k-*.webp`, no new cost). Median job 33 s, 10 in parallel. Every job is in `jobs.jsonl`.

Spent well under budget on purpose: the brief is about which lever stands out, and each lever is settled at 1K (lesson 83). Once the owner picks, painting the picked take's tickets at 2K is about $4 (8 × $0.43 + stub), and painted lit lamps about $0.10.
