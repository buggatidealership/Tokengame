import json
ST=("Hand-painted American comic book illustration of a real physical object, like a premium graphic-novel panel: "
"modelled with one soft warm-white key light from the upper left and deep shadows, confident black ink contour lines, "
"fine Ben-Day halftone dots only inside the darkest shadows, set in a pure black void with nothing else in it. "
"Materials: matte black solder mask with a fine grain, dark graphite traces barely visible, brushed silver-steel metal. ")
NOCOL="Strictly no green anywhere, no red, no blue, no purple, no coloured lights, no rim lights, no glow, no lens flare. "
NOTXT="No text, no letters, no numbers, no logos, no symbols, no markings, no labels anywhere."
J=[]
def j(name,ar,prompt):
  J.append({"name":name,"model":"gpt-image-2","input":{"prompt":prompt,"aspect_ratio":ar,"resolution":"2K","quality":"high","output_format":"jpeg","num_outputs":1}})
P1=("A single large microchip package seen perfectly head-on from the front, flat, no perspective, centred and filling 92% of the frame width. "
"Rectangular body of matte black solder mask with crisp square corners. A row of short brushed silver-steel leads along all four edges. "
"Taking up the middle: one big empty rectangular window in exact 16:9 proportion, 84% of the body's width, filled with deep glossy black glass with one soft diagonal reflection, framed by a thin raised brushed-steel bezel. "
"Below the window a narrow smooth blank strip of black solder mask. Only a few tiny silver-grey surface-mount components in the four corners. ")
P2A=("A single long microchip package seen perfectly head-on from the front, flat, horizontal, no perspective, centred, filling 94% of the frame width; the body's height is half its length. "
"Matte black solder mask body with crisp corners. A row of polished gold leads along the top edge and the bottom edge only. "
"LEFT third of the body: one square empty window of deep glossy black glass with a thin raised gold bezel, as tall as 80% of the body. "
"RIGHT two thirds of the body: a smooth completely blank matte black surface, empty, nothing on it. ")
P2B=("A single very long thin microchip package seen perfectly head-on from the front, flat, horizontal, no perspective, centred, filling 96% of the frame width; the body's length is 3.4 times its height, so the black void shows above and below it. "
"Matte black solder mask body with crisp corners. A row of short brushed silver-steel leads along the top edge and the bottom edge only. "
"At the LEFT end of the body: one square empty window of deep glossy black glass with a thin raised brushed-steel bezel, as tall as 80% of the body. "
"The rest of the body to the right: a smooth completely blank matte black surface, empty, nothing on it. ")
P3=("A square matte-black circuit board seen perfectly head-on from directly above, flat, no perspective, filling the whole frame edge to edge. "
"Four identical square chip sockets in a 2 by 2 grid with equal gaps, each socket an empty window of deep glossy black glass inside a thin raised brushed-steel frame, each socket about 40% of the board's width. "
"Thin bright brushed-silver traces run between the sockets clockwise: from the top-left socket to the top-right, down to the bottom-right, across to the bottom-left and back up to the top-left, forming a loop around the centre of the board. "
"A ring of tiny silver solder pads around each socket. Four small silver mounting holes in the board's corners. ")
P4=("A polished silicon wafer seen from directly above, a perfect circle with a small flat notch at the bottom edge, centred, filling 90% of the frame, on a pure black void. "
"Its surface is smooth dark graphite-grey polished silicon, monochrome, with faint soft concentric reflections and one soft highlight from the upper left. No die grid printed on it, no rainbow, no iridescence. A thin bright bevelled silver rim. ")
P6=("A large square GPU chip package seen perfectly head-on from the front, flat, no perspective, centred, filling 92% of the frame width. "
"Matte black solder mask body with crisp corners. A dense row of polished gold leads along all four edges. "
"Across the upper middle: four identical square dies in a row with equal gaps, each an empty window of deep glossy black glass in a thin raised gold bezel. "
"Below them a long blank smooth plate of black, empty. A few tiny dark surface-mount components near the corners. The gold is the only colour in the picture. ")
NOCOLG="Strictly no green anywhere, no red, no blue, no purple, no coloured lights, no rim lights, no glow, no lens flare; the only colour allowed is the gold of the leads and bezels. "
for k in "ab":
  j("p1-hero-"+k,"4:3",P1+ST+NOCOL+NOTXT)
  j("p2a-gold-"+k,"16:9",P2A+ST+NOCOLG+NOTXT)
  j("p2b-row-"+k,"16:9",P2B+ST+NOCOL+NOTXT)
  j("p3-loop-"+k,"1:1",P3+ST+NOCOL+NOTXT)
  j("p6-bet-"+k,"4:3",P6+ST+NOCOLG+NOTXT)
j("p4-wafer-a","1:1",P4+ST+NOCOL+NOTXT)
json.dump(J,open("jobs1.json","w"),indent=1);print(len(J))
