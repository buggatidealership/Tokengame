# state edits of the floor, each from its own style's morning plate as the reference (same room, same camera)
K="Keep exactly the same camera, composition, architecture and art style as the reference picture; the huge clock stays where it is with a completely blank face (no numerals, no hands), the wide black slate under it stays completely blank and clean, facing the viewer. No text, no letters, no numbers, no logos, no signs."
KN="$K Drawn with heavy brush and ink, dry brush, cross-hatching, ink splatter, black ink and grey wash, light in spot colour only (gold, emerald green, signal red). Not rendered, not photographic."
KL="$K Flat graphic badge style: pure black ground, flat solid cream, gold, green and red shapes only, hard straight edges, no texture, no gradients."
CL="Now it is 4 pm, the closing bell: the brass bell swings and rings with bold drawn motion lines and ring marks around it, the floor is packed with traders shouting with raised arms, paper slips flung into the air and falling everywhere, a hard burst of gold light through the windows."
AF="Now it is just after the closing bell, dusk: low red evening light through the windows, the crowd gone but for two clerks sweeping drifts of paper slips, the bell still, a single gold lamp hanging above the black slate lighting it."
NI="Now it is night, the exchange closed and empty: cold blue-grey moonlight through the windows, one green banker's lamp still lit on a trading post, paper slips scattered on the floor, the clock face dim, the bell still, deep black shadows."
WE="Now it is the weekend, the floor shut: tall iron shutters pulled down over the windows with thin bars of grey light through them, dust sheets thrown over the trading posts, a velvet rope on brass posts across the floor, one small red lamp glowing, the bell still, everything dark and quiet."
j(){ python3 -c 'import json,sys;print(json.dumps({"prompt":sys.argv[1],"aspect_ratio":sys.argv[2],"resolution":"1K","quality":"medium","output_format":"png","num_outputs":1}))' "$1" "$2"; }
for k in n l; do [ $k = n ] && KK=$KN || KK=$KL
 for w in "" "-w"; do A=9:16; [ "$w" = "-w" ] && A=16:9
  for st in close after night wkend; do case $st in close)P=$CL;; after)P=$AF;; night)P=$NI;; wkend)P=$WE;; esac
   python3 hd.py fl-$k-$st$w gpt-image-2 "$(j "$P $KK" $A)" img/fl-$k-am$w.jpg > log-fl-$k-$st$w.txt 2>&1 &
  done; done; done; wait
