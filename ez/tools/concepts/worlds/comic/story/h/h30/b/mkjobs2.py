import json
exec(open('mkjobs.py').read().split('J=[]')[0])
J=[]
P2C=("A single chunky microchip package seen perfectly head-on from the front, flat, horizontal, no perspective, centred, filling 94% of the frame width; the body is a thick block whose height is 58% of its length. "
"Matte black solder mask body with crisp corners. A row of polished gold leads along the top edge and the bottom edge only. "
"LEFT half of the body: one big square empty window of deep glossy black glass with a thin raised gold bezel, as tall as 84% of the body. "
"RIGHT half of the body: a smooth completely blank matte black surface, empty, nothing on it. ")
NOCOLG="Strictly no green anywhere, no red, no blue, no purple, no coloured lights, no rim lights, no glow, no lens flare; the only colour allowed is the gold of the leads and bezel. "
for k in "ab":
  J.append({"name":"p2c-gold-"+k,"model":"gpt-image-2","input":{"prompt":P2C+ST+NOCOLG+NOTXT,"aspect_ratio":"4:3","resolution":"2K","quality":"high","output_format":"jpeg","num_outputs":1}})
json.dump(J,open("jobs2.json","w"),indent=1);print(len(J))
