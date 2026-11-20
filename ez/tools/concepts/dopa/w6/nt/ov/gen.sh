#!/bin/bash
# The outcome-film desk's paintings (night studio, 2026-11-20): one ground per take, gpt-image-2 medium 2K (about $0.067 each).
# Run: bash w6/nt/ov/gen.sh   (needs HEDRA_API_KEY). Files land in launchvid/hedra/img/ (BIG=1, 2048 px) and raw/.
cd /home/user/Tokengame/ez/tools/concepts/launchvid/hedra || exit 1
REF=../../../../media/bet-chip-h2.jpg
BASE="Painted comic-book illustration in the style of the reference picture: bold black ink outlines, cel shading with rich painted highlights, fine halftone dots in the shadows, one warm golden key light, a vivid green rim light on the left edges and a vivid red rim light on the right edges, deep near-black shadows."
TAIL="No people. No text, no letters, no numbers, no words, no logos, no signs, no symbols, no screens with content."
P1="Atmospheric oil painting, soft and moody: a rain-streaked window at dusk seen from inside, the city behind it completely out of focus as large soft bokeh circles of gold, green and red light, water droplets on the glass catching the light, very dark overall, the centre of the frame darker and calm. $TAIL"
P2="$BASE A floodlit football stadium at night seen from high in the upper stand behind one goal: the pitch glowing deep green with mowing stripes under four tall floodlight towers, haze in the floodlight beams, the stands dark and empty, the sky black. $TAIL"
P3="$BASE Seen from directly above, top-down: a dark walnut wood desk at night with a warm brass desk-lamp pool of golden light in the middle, a matte black thermal receipt printer lying at the top centre of the frame with its paper slot facing down toward the bottom of the frame, a coffee cup ring stain near the left edge, a fountain pen near the right edge, the middle and lower part of the desk empty and clear. $TAIL"
P4="Noir ink-wash and brush illustration: a night newspaper printing hall, giant rotary press rollers and a river of blank white paper racing between them with motion blur, ink-black machinery, warm gold work lights, small sparks of green and red light, deep shadows. $TAIL"
P5="$BASE One huge polished bronze bell hanging from a heavy black iron yoke, seen straight on at eye level, its clapper visible under the rim, the rim glowing gold under the key light. The object is isolated on a perfectly flat solid pure blue (#0000FF) background that fills the whole frame edge to edge: no glow, no light rays, no haze, no floor, no cast shadow, crisp clean edges. $TAIL"
P6="$BASE A vast dark empty hall seen from slightly above: a circular floor of black marble inlaid with thin concentric gold rings, haze, a single cone of warm golden light falling from above onto the centre, green light glancing from the left and red light from the right, the edges of the frame falling into black. $TAIL"
J() { python3 -c "import json,sys;print(json.dumps({'prompt':sys.argv[1],'aspect_ratio':sys.argv[2],'resolution':'2K','quality':'medium'}))" "$1" "$2"; }
export BIG=1
python3 hd.py nt-ov1-rain gpt-image-2 "$(J "$P1" 3:4)" &
python3 hd.py nt-ov2-stadium gpt-image-2 "$(J "$P2" 3:4)" "$REF" &
python3 hd.py nt-ov3-desk gpt-image-2 "$(J "$P3" 3:4)" "$REF" &
python3 hd.py nt-ov4-press gpt-image-2 "$(J "$P4" 3:4)" &
python3 hd.py nt-ov5-bell gpt-image-2 "$(J "$P5" 1:1)" "$REF" &
python3 hd.py nt-ov5-hall gpt-image-2 "$(J "$P6" 3:4)" "$REF" &
wait
