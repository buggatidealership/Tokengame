#!/bin/bash
# bash close.sh <YYYY-MM-DD> : the outcome video of one market close (Season 2, every round graded at that close in one video), from the
# sheet only: prep (moves from the sheet's ACTUAL MOVE, paths from the exchange's 5-minute prices scaled onto them, every P&L checked)
# -> render (wrapx.sh: 30 fps, 3-sample motion blur, m2-phonk with its drop on the bell) -> ez/post/close-<date>.mp4.
# It stops when a round graded that day has no move in the sheet yet: the sheet is always right, so fill it first.
# PREVIEW=1 bash close.sh <date> renders a mockup from the latest prices instead (PREVIEW on every frame, never posted):
# ez/x2p-close-<date>-preview.mp4.
set -e
F=$(cd "$(dirname "$0")" && pwd); D=$1
[[ "$D" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]] || { echo "usage: bash close.sh <YYYY-MM-DD>"; exit 1; }
if [ "$PREVIEW" = 1 ]; then node "$F/prep-close.js" "$D" --preview; OUT="x2p-close-$D-preview"; C=20; else node "$F/prep-close.js" "$D"; OUT="post/close-$D"; C=14; fi
mkdir -p "$F/../../../post"
cd "$F" && CRF=$C bash wrapx.sh "close.html?d=$D" 15.5 "$OUT" m2-phonk 0 .32
python3 "$F/wrapqa.py" "$F/../../../$OUT.mp4" 2>/dev/null | tail -6 || true
echo "file: ez/$OUT.mp4"
