#!/bin/bash
# Night studio, feed films desk A (fv1 to fv5): the five painted grounds. gpt-image-2 medium 2K (about $0.11 each).
# Run: bash w6/nt/fva/gen.sh   (needs HEDRA_API_KEY). Outputs launchvid/hedra/img/nt-fv<n>-*.jpg, copied into w6/nt/fv<n>/ground.jpg.
cd /home/user/Tokengame/ez/tools/concepts/launchvid/hedra || exit 1
REF=../../../../media/bet-chip-h2.jpg
BASE="Painted comic-book illustration in the exact style of the reference picture: bold black ink outlines, cel shading with rich painted highlights, fine halftone dots in the shadows, a palette of near-black, deep bottle green, crimson red and warm gold only."
NOTXT="No people. No text, no letters, no numbers, no words, no logos, no signs, no screens, no boards, no tickers, no flags, no phones."
S1="$BASE Vertical frame. A dark empty theatre stage seen straight on, divided exactly down the vertical middle into two halves. The whole left half is bathed in vivid green light from a spotlight high above it; the whole right half is bathed in vivid crimson red light from a spotlight high above it; each beam fans down through thin haze onto a dark polished wooden floor at the bottom with matching green and red reflections. Down the exact centre of the frame, from the very top to the very bottom, runs one thin bright vertical line of warm golden light, like light through the gap between two heavy dark velvet curtains parted by a finger's width. Between 12 and 85 percent down, each half is calm open dark space with haze and soft light only, no objects. $NOTXT"
S2="Macro photograph of a large sheet of thick handmade cotton paper in a warm cream colour (#f8f0d9), filling the whole frame edge to edge, seen straight on. Visible soft paper fibres and a gentle uneven texture, very subtle darker flecks, lit softly from the top left so the surface shows its tooth; a faint warm vignette at the corners. Calm, even and bright, no folds, no stains, no shadows of objects. $NOTXT"
S3="$BASE Vertical frame. The Lower Manhattan skyline across the East River at night, seen from the water's edge in Brooklyn. The towers rise in the lower 45 percent of the frame as near-black silhouettes with many small warm golden windows; their golden reflections ripple in the dark river at the very bottom. The upper 55 percent is open night sky: deep green-black at the top fading to a dark bottle-green haze above the towers, with a few faint stars and soft drifting clouds, a thin warm golden glow on the horizon behind the towers. Calm, empty, no boats, no bridge in the foreground. $NOTXT"
S4="Abstract painted wallpaper for a phone lock screen, vertical. Soft flowing ribbons of light over a deep near-black background: one broad ribbon of deep emerald green light sweeps from the top left, one broad ribbon of crimson red light sweeps from the bottom right, they cross softly near the middle where a few small warm golden sparks glow. Painterly, smooth gradients with fine visible brush texture and a subtle film grain, calm and dark overall so white type would read on top. $NOTXT"
S5="$BASE Vertical frame. The inside of a grand round debating chamber at night, empty, seen from the centre of the floor looking straight ahead and slightly up. Curved tiers of dark wooden benches rise on the left and on the right and fade into darkness; high above, a dark dome with faint gold ribs and a warm golden glow at its top centre. Green light washes the left tiers and crimson red light washes the right tiers, the two lights meeting softly in the middle. The middle of the frame, from 18 to 88 percent down, is calm open dark space with soft golden haze only, no objects, no lecterns, no microphones. $NOTXT"
J() { python3 -c "import json,sys;print(json.dumps({'prompt':sys.argv[1],'aspect_ratio':sys.argv[2],'resolution':'2K','quality':'medium'}))" "$1" "$2"; }
BIG=1 python3 hd.py nt-fv1-split gpt-image-2 "$(J "$S1" 3:4)" "$REF" &
BIG=1 python3 hd.py nt-fv2-paper gpt-image-2 "$(J "$S2" 3:4)" &
BIG=1 python3 hd.py nt-fv3-city gpt-image-2 "$(J "$S3" 3:4)" "$REF" &
BIG=1 python3 hd.py nt-fv4-wall gpt-image-2 "$(J "$S4" 9:16)" &
BIG=1 python3 hd.py nt-fv5-hall gpt-image-2 "$(J "$S5" 3:4)" "$REF" &
wait
D=/home/user/Tokengame/ez/tools/concepts/dopa/w6/nt
cp img/nt-fv1-split.jpg $D/fv1/ground.jpg; cp img/nt-fv2-paper.jpg $D/fv2/ground.jpg; cp img/nt-fv3-city.jpg $D/fv3/ground.jpg
cp img/nt-fv4-wall.jpg $D/fv4/ground.jpg; cp img/nt-fv5-hall.jpg $D/fv5/ground.jpg
echo GEN DONE
