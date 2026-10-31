# Round H5 · cast2: variations of the four founder characters

Owner: "it'd be interesting to generate different variations of the character." Read two ways, both made:
- **(a) the same characters in new moments** (the story's beats and a section's own setting): board `ez/x2p-x3p-h5-cast2-a.png`
- **(b) the same characters in other finishes**: board `ez/x2p-x3p-h5-cast2-b.png`

Each row starts with today's poster (`ez/media/founder-<m>-anim.jpg`), which was also the reference image for every image in that row. Every image is labelled on the board with model, cost and one line on how well the likeness held (the lines are in `notes.json`).

## Method
- Model test on one beat (Grok, won the round) with the poster as reference: gpt-image-2 1K medium, nano-banana-pro 1K, seedream-50-pro 1080p (`img/t-grok-win-*.jpg`). All three kept him; gpt-image-2 kept the face closest and gave the picked finish (3D first, comic ink); seedream made him younger, nano-banana flatter. So gpt-image-2 1K medium ($0.066 with a reference) for the grid.
- (a) seven beats x four characters: predicting, waiting for the bell, won (crowned), hit by the FAIL (a blank red stamp: the word itself stays page text), golden ticket (blank gold foil), falling behind, and one section setting each (GPT at the newsstand rack = Every round so far, Claude under the marquee = Upcoming, Grok before the GPU chip = the NVIDIA bet, Kimi in the rooftop ring = Tomorrow at the close). Backgrounds in each character's own poster colour.
- (b) five finishes x four, same pose as today: 3D + comic ink (control), pop art, anime cel, noir ink with one spot colour, risograph. Anime cel on gpt-image-2 barely moved off today's look, so it was re-run on nano-banana-pro (try 2), which gives a real cel.
- 2K high for the best of each reading (Grok holding the golden ticket, the story's actual state today; Claude in pop art), then a 5 s loop from each on kling-25-turbo (1080p, start image = the 2K still; saved at 640px, no sound, like the founder loops).
- Scripts: `hd.py` (Hedra v3 client, from thumbs2), `batch.py a|b`, `vid.py`, `board.py`. Every job is in `jobs.jsonl`. Raw downloads in `raw/` are not committed.

## Cost: $5.63 of $12 (59 jobs, none failed)
| What | Model | Settings | Each | n | Total |
|---|---|---|---|---|---|
| model test | gpt-image-2 / nano-banana-pro / seedream-50-pro | 1K medium / 1K / 1080p | .066 / .152 / .068 | 3 | 0.29 |
| (a) moments | gpt-image-2 | 1K medium, 1:1, 1 ref | 0.066 | 28 | 1.84 |
| (b) finishes | gpt-image-2 | 1K medium, 1:1, 1 ref | 0.066 | 20 | 1.31 |
| (b) anime cel try 2 | nano-banana-pro | 1K, 1:1, 1 ref | 0.152 | 4 | 0.61 |
| best stills | gpt-image-2 | 2K high | 0.44 | 2 | 0.88 |
| loops | kling-25-turbo | 5 s, 1:1, 1080p, start image | 0.35 | 2 | 0.70 |
Times: 1K stills 25 to 60 s, 2K high about 3 min, loops about 2 min.

## Files
- `img/a-<model>-<beat>.jpg`, `img/b-<model>-<finish>.jpg` (1024px, q85), `img/*-2k.jpg` (2048px, q88)
- Loops: `img/a-grok-ticket-loop.mp4` (0.5 MB), `img/b-claude-pop-loop.mp4` (1.4 MB), H.264, faststart

## Honest read
- **Likeness holds in 51 of 52 grid images.** The costumes do much of the work (armour, red coat and glasses, visor, flight suit). Weakest: Claude in the marquee setting (face rounder and fuller than today's). Anime cel try 2 is the furthest a finish can travel: Grok and Kimi stay themselves, GPT turns younger and lighter-haired, Claude simplifies to glasses and curls.
- **Finishes:** pop art and noir hold best and look most "comic"; risograph holds but reads as a poster print, a different object; anime cel try 1 failed to be cel.
- **Loops:** Grok's ticket glint and widening smile work, but the last frame does not match the first (a ping-pong or a crossfade would be needed to loop seamlessly). Claude's pop loop blinks and turns to camera; the sunburst barely rotates.
- **No text** anywhere (checked at full size): holograms carry a line and an arrow only, stamps are blank, tickets blank gold, the marquee panel and newsstand covers blank. The models dropped GPT's chest knot mark (asked for no logos); the flag patches stay on Grok and Kimi (most images).

## How it could fail
- **The predicting beat always shows an up arrow** (all four). A down call needs its own image, or the arrow must be page-drawn over a plain screen; otherwise the picture tells a happier, wrong story (lesson: the picture never tells a happier story than the data).
- The beats are generic poses: on the page they only work if each image is bound to a real state (Grok holds the golden ticket only while Grok leads; the crown only on the round's real winner). That needs a set per character per state, re-picked by data, not a hand-placed picture.
- Cast drift: many generations of one face slowly change it (Claude's setting shows the first sign). Always generate from today's poster, never from a generated variation.
- Mixing finishes on one page breaks the book (lesson 79): (b) is a range test, not a menu for one page.
- Founders' faces: the owner's call (CLAUDE.md, "Green room fighter intros"); Hedra's likeness rule was flagged once before and is not repeated here.

## Open questions for the owner
1. Which beats should exist on the page, and where (e.g. the crown on the round winner in Every round so far, the golden ticket holder on Who's winning, the FAIL beat in the opened round)?
2. One finish for all characters everywhere, or a finish per section (lesson 72)?
3. Should Predicting show the real direction (up or down), drawn per call?
