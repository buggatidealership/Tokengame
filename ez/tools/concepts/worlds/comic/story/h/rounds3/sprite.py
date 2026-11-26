#!/usr/bin/env python3
# rounds3 mounting sprites (gpt-image-2 1K medium 3:4). sprite.py <frame|bag|paper>
import json,sys,subprocess,os
D=os.path.dirname(os.path.abspath(__file__))
INK=" Painted 3D with an American comic book ink finish, one warm golden key light from above, crisp. No text, no letters, no numbers, no logos."
P={
'frame':"Perfectly front-on, centred, an ornate carved gilded picture frame, portrait 3:4, hanging on deep green velvet. The frame's border is about one eighth of the width on each side; the opening inside the frame is completely flat pure black with nothing in it. Below the frame, attached to the bottom rail, a small blank polished brass plaque with two screws. Green velvet visible all around the frame to the edges of the picture."+INK,
'frame2':"Perfectly front-on, centred, a slim gilded picture frame with a fine carved bead and leaf moulding, portrait 3:4, hanging on deep green velvet. The frame is narrow: its border is only one sixteenth of the width on each side. The opening inside the frame is completely flat pure black with nothing in it. On the bottom rail of the frame, centred, a small blank polished brass plaque with two screws, overlapping the rail. Green velvet visible all around."+INK,
'bag':"Perfectly front-on, centred, an empty clear glossy plastic comic book sleeve with a folded flap at the top, portrait, on a pure flat black background. Only the plastic's reflections show: soft long white specular highlights, a bright crease along the flap fold, faint scratches and a crinkle near one corner, all as light on black. Nothing inside the sleeve."+INK,
'paper':"Perfectly front-on, a sheet of thin cheap poster paper, portrait 3:4, freshly wheat-pasted to a wall: blank pale cream paper with no print, wrinkles, air bubbles, glue streaks, slightly torn and curling corners, lit by one warm light from above. The paper fills the whole frame edge to edge."+INK,
}
k=sys.argv[1]
inp={"prompt":P[k],"aspect_ratio":"3:4","resolution":"1K","quality":"medium","output_format":"png","num_outputs":1}
subprocess.run(['python3',D+'/hd.py','sp-'+k,'gpt-image-2',json.dumps(inp)],env={**os.environ,'BIG':'1'})
