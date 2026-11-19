#!/bin/bash
# The two Season 2 announcement paintings (take D, S2D-BRIEF.md): take E's recipe (w6e-podium), isolated on flat blue, keyed by key.py.
# Run from anywhere: bash w6/s2/gen.sh   (needs HEDRA_API_KEY; about $0.05 each)
cd /home/user/Tokengame/ez/tools/concepts/launchvid/hedra || exit 1
REF=../../../../media/bet-chip-h2.jpg; POD=raw/w6e-podium.png
BASE="Painted comic-book illustration in the exact style of the first reference picture: bold black ink outlines, cel shading with rich painted highlights, fine halftone dots in the shadows, one warm golden key light from above, a vivid green rim light along the left edges and a vivid red rim light along the right edges."
TAIL="The object is isolated on a perfectly flat solid pure blue (#0000FF) background that fills the whole frame edge to edge: no glow, no light rays, no haze, no floor, no cast shadow, crisp clean edges. No people. No text, no letters, no numbers, no words, no logos, no engravings, no symbols."
P5="$BASE Five identical short square pedestals of dark stone with gold trim, exactly like the pedestals in the second reference picture, standing side by side in one straight row with small even gaps, seen perfectly straight on at eye level. Each pedestal has a flat empty top and one blank smooth gold plate on its front face, completely empty. The row is centred and spans about 94 percent of the frame width; the pedestals stand in the lower half of the frame and the upper half is empty background. $TAIL"
PB="$BASE One short square pedestal of dark stone with gold trim, exactly like one of the pedestals in the second reference picture, but broken and collapsing: its top is split by deep jagged cracks, a corner has sheared off, chunks and shards of stone are breaking away and falling beside it, the gold trim is bent and torn, and the blank gold plate on its front is cracked across and tarnished dark. Seen perfectly straight on at eye level, centred, filling about 70 percent of the frame width and the lower 75 percent of its height. $TAIL"
J() { python3 -c "import json,sys;print(json.dumps({'prompt':sys.argv[1],'aspect_ratio':sys.argv[2],'resolution':'1K','quality':'medium'}))" "$1" "$2"; }
python3 hd.py s2d-podium5 gpt-image-2 "$(J "$P5" 4:3)" "$REF" "$POD" &
python3 hd.py s2d-broken gpt-image-2 "$(J "$PB" 1:1)" "$REF" "$POD" &
wait
