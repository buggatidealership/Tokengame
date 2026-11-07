# Round H4, area `thumbs2`: every film round's tile now shows its outcome (2026-10-31)

Board: `ez/x2p-x3p-h4-tiles.png` (74 rounds; per round the film's reveal frame, the live T2 tile and the new T3 tile; the sheet's winner and the frame time in gold).
Files: `ez/media/tile-r<n>-t3.jpg` (74, 450x600, JPG q80 progressive; new names, never requested on earningszn.xyz). Working copies `img/t3-r<n>.jpg`; reveal frames `ref/f<n>.png` and 1024 px renders `raw/` are not committed (.gitignore).
Code: `times.json` (the reveal second per film), `kinds.txt` (win / tie / none / glow per round), `prompt.py` (the prompts), `hd.py` (Hedra v3 client, as round H3), `board.py` (`/usr/bin/python3 board.py <out.png> [rounds]`).
Wired: `ez/tools/v22/story/h_rounds.js` THUMBS now names `tile-r<n>-t3.jpg` for the 74 film rounds and keeps `tile-r<n>-t2.jpg` for the 6 without a film (67, 71, 75, 77, 79, 80). Nothing else in the file changed. Not built or deployed (the parent session does that).
Spend: **$2.50** (83 jobs, the estimate endpoint's price; budget $5).

## Method
- **Finding the reveal.** For every film (FILMS in ez-data.js, 74 now: R76 Strategy has a film since H3) I sheeted frames at 9 to 18 s (contact sheets of all 74) and picked the second where the winner's object is gold and crowned and the market's move is on screen, before the $EZ end card and the "Nobody said it would be EZ" line. Most land at 12 to 17 s; R76 Strategy's crowns arrive at 21 s (a 24 s film), R2 Oracle's at 11 s (a 14 s film). Each pick checked against ROUNDS' `win`: the gold sits on the sheet's winner in every frame used.
- **Rendering.** The frame (768 px) plus round H3's Golden Age style reference to gpt-image-2 (1K, low, 3:4, $0.03): repaint as a 1940s cover, keep the winner's object gold and crowned in the same place and size, every board, sign, screen, card, tag and label blank, no logos, "no faces, arms or legs added to objects" (the box-hero guard from H3, now in every prompt).
- **Four kinds of round:**
  - win (61) and tie (R57 GE Vernova, R76 Strategy): the winner's object gold leaf with its crown; both turbines and both figures on the ties.
  - none (6: R6, R7, R10, R24, R36, R51): no crown, no gold; the dramatic light of the moment kept. R10's frame is taken at 17 s because at 18 s the film itself puts a crown on the empty board.
  - glow (R2, R3, R4, R5, R8): the first films announce the winner only as a "WINNER GPT" text line on a board, with no gold object. A first try on R4 invented crowns on the silos, so these keep the green victory light and get no crown. Their tiles show "the moment" but not who; the stub's page text says who. Asked as an open point: if the owner wants a crown on them, a gold crowned plate where the WINNER line is would be honest to the film.
- **A prompt fix after the first three tests:** "turn the winner's object gold" made R13's whole board gold. The prompt now says only that one row, strip or plate is gold and the rest of the board keeps its colour.

## Checked by eye, and re-rendered (5)
Every tile checked at 340 px against its frame and the sheet's winner (position in the film's order of the four calls).
- R24 Citigroup (nobody): the $EZ floor plaque came out gold, reading like a winner; re-rendered with the plaque kept dark.
- R41 Lockheed Martin: the market's sun got a crown; re-rendered, crown only on Kimi's (second) pennant.
- R45 American Express: the crown landed on the pale gold Kimi card (top right) instead of Claude's black card (bottom right), and the cards kept the AI marks. Two re-renders; now plain chip cards, Claude's turned gold and crowned.
- R61 Microsoft: kept the four AI app icons (logos). Re-rendered as four plain coloured squares, Grok's label gold and crowned (Clippy stays: he is the film's character, not a mark).
- R64 Samsung: the 3:4 cut lost the bottom row of medallions and the crown floated on the fab machine. Re-rendered with GPT's medallion at bottom left, gold and crowned.

## How they can fail, and what to know
- **Board films (R9 to R29) put the gold on the WINNER plate**, under the board, where the film has it, rather than on the winner's row (R11, R14, R25, R28 and a few others do gold the row too). True to the film; the tile cannot tell who without the stub.
- **Some scenes keep a brand shape** because it is the film's subject, as in H3: the Pepsi globe (R17), the Chase octagon (R19), the HSBC hexagon (R53), Reddit's Snoo (R72), the Carnival funnel (R8), the VW-style museum and the Shell-style octagon. R33 Netflix keeps four painted portraits on its screens (the film's own posters of the AIs); no names on them.
- **Text:** no letters or numbers found at 340 px. Small painted squiggles on a few labels may read as marks when zoomed; not seen as words.
- **R74 Amazon** is black and white in the film; the tile is in the warm Golden Age palette, as the T2 was.
- **New rounds:** pick the reveal second from a 9 to 18 s contact sheet, `ffmpeg -ss <t> -i media/<film>.mp4 -frames:v 1 -vf scale=768:-1 ref/f<n>.png`, then `python3 hd.py t3-r<n> gpt-image-2 "$(python3 prompt.py win)" ref/f<n>.png ref/style.jpg` (tie / none as fits), check the crown is on the sheet's winner, and convert `raw/t3-r<n>.png` with `convert ... -resize 450x600^ -gravity center -extent 450x600 -quality 80 -interlace JPEG`. A no-film round keeps its T2 world tile until it has a film.
