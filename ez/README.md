# EZ — The Record (landing page)

Staged here for the `buggatidealership/EZ` site (`EZ/record.html`). Copy this folder's files into the EZ repo root to go live.

| File | What |
|---|---|
| `record.html` | **v2 "The Strip"** — speaks the round films' language: every round is its own lit world with the same board (Round X · Company → the calls → OUTCOME → WINNER), wet-ground reflections, and the page ends the way every film ends: a garage door rolls up on the $EZ sign, motto on the next shutter |
| `record-v1-paper.html` | v1 — the paper/newspaper take, kept for comparison |
| `media/round-3-autozone.{webm,mp4}` | The Round 3 film, web-weight (720×720, 30fps; 1.6 MB / 1.8 MB, from a 22 MB master). WebM first, MP4 fallback |
| `media/round-3-autozone-poster.jpg` | Poster frame (the calls on the board, before the outcome) |

## Adding a round's film

Every round without a film is drawn live in CSS in its company's world. When a round has a film:

1. Encode it web-weight (the settings used for Round 3):
   `ffmpeg -i master.mp4 -vf "scale=720:720,fps=30" -c:v libvpx-vp9 -b:v 0 -crf 36 -row-mt 1 -c:a libopus -b:a 80k media/round-N-company.webm`
   `ffmpeg -i master.mp4 -vf "scale=720:720,fps=30" -c:v libx264 -crf 25 -preset slow -c:a aac -b:a 96k -movflags +faststart media/round-N-company.mp4`
2. In `record.html`, set that round's `film:{webm:..., mp4:..., poster:..., len:"0:20"}` in `ROUNDS`.

## Launch config

Top of the script: `EZ_CONFIG` (contract address, buy URL, chain, X, Telegram). Empty means "not live" — the page says so instead of showing a button. Never fill the address until it is final.

## The next round

`NEXT` drives the hero board: add `calls` when the machines file (the prediction card), then `out` and `win` after the close (the resolution card). Then move the round into `ROUNDS`.

## Deep links

Each round has an anchor — link a round's tweet straight to it: `record.html#round-3`.
