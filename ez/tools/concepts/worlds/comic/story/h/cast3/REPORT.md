# Round H9 · cast3: Meet the models as fight night (and two other worlds), in drawn styles

Brief: `../BRIEF-H.md`, "Round H9", `cast3`. Mockups only; nothing in `ez/tools/v22/` or `ez/v4*.html` changed, nothing deployed or published.

## Boards and video
- `ez/x2p-x3p-h9-cast3-390.png`: today's live section first, then five worlds (columns) x three drawn styles (rows), each labelled with its plate cost; a close-up row at 2x of the first fighter's surface in each world (noir).
- `ez/x2p-x3p-h9-cast3-1280.png`: the same at 1280 (shots at 1x, shown at half size).
- `ez/x2p-x3p-h9-cast3-weighin.mp4` (23 s, 390px): the pick, scrolled at reading speed with holds; each P&L counts up on its dial as the panel comes into view (money accruing), the press flashbulbs fire now and then behind each fighter.

## The story of the section
"Four fighters from two countries weigh in for the season; the scale says who carries the most money." The founders' faces appear here for the first time (the cover shows only names), and the chapter hands on to Smart or lucky's gambling: fight night, then the bet on the fight.

## The takes (all on the real built page `v47-live-x3plus.html`, laid over the live section by `take.js` + `take.css`)
Every number comes from `__x2pPnl().A` and `MODELS` at run time: rank (the page's P&L order), name and version, P&L, W-L, hit rate (W / (W+L)), last five. No number is typed. Each surface is a painted, blank object cut out of its white ground (`prep.py`) and the page writes on it (lesson 81, 85).

| # | World | Where the numbers live | Cost per style |
|---|---|---|---|
| F1 | **The weigh-in** (fight night) | each fighter flexes on an old balance scale before the press; his numbers are on the scale's big brass-rimmed dial: No., name and version, P&L ("weighs in at"), W-L and hit rate, last five | $0.32 |
| F2 | **Tale of the tape** (fight night) | four guard-up portraits in a 2x2 (four across on desktop), then one riveted arena board with a column per fighter in the same order: a shared axis, so P&L, W-L, hit rate and last five read down and across (lesson 58) | $0.29 |
| F3 | **The walkout** (fight night) | each fighter walks out of the tunnel in a satin robe; his numbers are lettered in gold on the black entrance banner hung in front of him | $0.32 |
| O1 | **The line-up** (other world: noir precinct) | each founder against the height-chart wall holds the mugshot letter board: white plastic letters, P&L in green or red letters | $0.29 |
| O2 | **The card room** (other world: the back-room game, a bridge to Smart or lucky's gambling) | name, P&L, W-L and hit rate engraved on a brass table plaque; the last five as five poker chips, green for right, red for wrong | $0.40 |

Styles (rows): **noir** brush and ink with one spot colour (the vault's look: heavy blacks, dry brush, splatter, hatching; the spot colour is the fighter's own colour), **Silver Age** line and flat printed colour with Ben-Day dots only in the shadows, **hard black shapes** (big flat shadow shapes, minimal line, one bright accent). The style is one word in the prompt (`STY` in `batch.py`), so any world can be redrawn in any style (detachable).

Kept from today's section: each AI's own colour (the spot colour in noir, a rule inside each panel's ink border), the Overview heading face ("Meet the models" in the bet chapter's Bangers recipe, `h2.hb-h`'s colours and stroke), the deck "Ranked by P&L, if you'd bet $100K on every call." Not kept in the takes: the waving flags (see "How it could fail").

## My pick
**F1 the weigh-in, noir.** It is the most comic beat (a fighter flexing for the cameras), the number has an obvious home (a scale reads a weight; here it reads the money), the dial is the most "made by the scene" surface of the five, and it sets up the next chapter's gamble. Second: **F2 tale of the tape** if the owner wants the four compared at a glance (it is the only take with a shared axis); it costs the faces size on a phone (175px panels).
Per the process (rough first, paint last), nothing was painted at 2K: the picked take's four panels and its dial should be repainted at 2K high (about $0.45 each with the poster as reference) only after the owner picks.

## Method
- `batch.py`: gpt-image-2, 1K, medium, 1:1, png; panels take today's poster `media/founder-<m>-anim.jpg` as the reference ("keep this exact character..."), the world's scene, the style, and "the lower third of the frame is dark empty foreground" so a surface can sit there without covering a face; props are the blank object alone on pure white. Every prompt ends "no text, no letters, no numbers, no logos".
- `hd.py`: the Hedra v3 client from cast2 (never prints the key). `prep.py`: flood-fills the white ground away, measures the dial's blank face; the board's columns, the banner, the letter board and the plaque were set by eye in `props.json` (the auto-measure joins ink lines; `prep.py --force` would overwrite them).
- `take.js <out> <W> <world-style,...> [--video]` (serve `ez/` on port 8931): builds the take inside `.wc-chars` (today's cards hidden, its screen-reader text kept per fighter), shoots the section; `board.py` builds the boards.

## Cost: $4.87 of $8 (82 jobs, 1 refused by moderation and re-run fine)
| What | Model | Settings | Each | n | Total |
|---|---|---|---|---|---|
| founder panels | gpt-image-2 | 1K medium, 1:1, 1 ref | $0.066 | 60 | $3.96 |
| blank props | gpt-image-2 | 1K medium, 1:1 or 16:9 | $0.054 | 21 | $1.13 (incl. 1 test) |
Times: panels median 58 s, props 33 s, 8 in parallel. All jobs in `jobs.jsonl`. Raw PNGs in `raw/` are not committed (`.gitignore`). `p-walk-mignola-claude` was refused once by moderation ("blocked by content moderation"), the same prompt passed on retry.

## What I measured
- 390, 1280 and 320px, all 15 takes: page `scrollWidth` equals the viewport (no sideways scroll); no console errors; no text element inside a surface overflows its box (`over: []` for every take).
- Section height at 390: today 2138px; F1, F3, O1, O2 1488px; F2 765px. At 1280: today 711px, takes 511px (F2 832px).
- The count-up and flashes stop with reduced motion (the flashes have a reduced-motion rule; the count-up only runs in the video mode of the mockup).
- Checked against rule 0 and the hard rules by eye at 2x: no white or pale module ground (black gutters, the paintings fill each panel edge to edge), no box in a box, no emoji, no dot pattern as a ground, no content over a face. Failures are listed below, not hidden.
- Today's live shot shows Grok at "+$0": the live card counts up when scrolled into view and the screenshot did not scroll; it is not a data error.

## How each could fail
- **All:** the founders are redrawn stills, while the brief's standing rule 6 keeps the animated loops (`founder-*-anim`) unchanged. H9 also sets the drawn style and "never 3D realism", which the loops are. Both readings are possible: (a) keep the loops and draw only the scene around them (the loops' 3D look would clash with a drawn scene), (b) redraw the founders in the chapter's style (as here) and animate the picked stills later (cast2's kling-25-turbo loops, $0.35 each, 5 s). The owner decides.
- **All:** the four ranks, P&L and W-L are live, but each painting is fixed: the dial or banner shows the right numbers, while a pose (Grok flexing as leader) does not follow the data. The poses are neutral enough (all four flex, all four walk out), so no picture tells a happier story than the data.
- **All:** the waving flags (rival labs, US against China) are gone from the takes. Kimi still wears a China patch and Grok a US patch in most plates, but that is the model's choice, not a carrier I set; a printed flag on each surface (or a flag in the arena) would put the rivalry back.
- **All:** a surface in front of the lower third is still a cut-out laid on a painting; it reads integrated only because it is the same drawing style and holds a shadow. Where the prop overlaps a painted object (the dial over the scale's column, the plaque over the hand of cards) the join can look pasted at full size. A proper paint would have Hedra draw the dial into the scene with its face blank, and the page write on it in perspective.
- **F1:** at 1280 the dial grows to 56% of a 230px panel; its smallest line (W-L and hit rate) is about 10px. If the desktop column grows, it is fine; at today's DESKA column it is small.
- **F2:** on a phone the faces are 175px squares; the board's columns line up with the panels above only roughly on desktop (the painted strips are where the model put them, at 27, 50 and 72%).
- **F3:** a black satin banner over a dark panel is the lowest contrast surface of the five; its gold fringe reads as decoration.
- **O1:** a police line-up says "suspects", a joke that could read as "these AIs are crooks"; the Silver Age line-up's wall came out pale (a beige ground, against the brief): needs a darker wall if picked.
- **O2:** the plaque covers the cards in the founder's hands (the subject of that panel); chips carry W/L in tiny letters for colour-blind readers.
- **Likeness:** held in all 60 panels at board size (the costumes do most of the work); hard-shapes style simplifies Claude and GPT most. Always generate from today's posters, never from a generated variation.
