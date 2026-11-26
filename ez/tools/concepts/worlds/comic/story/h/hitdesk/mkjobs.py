import json
S=("American comic book panel, painted with modelled 3D light first and then inked: bold black ink contours with thick outer and thin inner lines, "
 "Ben-Day halftone dots only inside the shadows, crisp and sharp, one warm key light, soft depth of field behind. Palette of deep black, warm gold, "
 "emerald green and signal red. ")
NO=" No text, no letters, no numbers, no writing, no symbols, no logos, no charts, no graphs, no marks of any kind on any screen, paper or surface."
T={
'a':("A 1983 financial analyst's desk at night in a dark wood-panelled research office. A beige early personal computer with a big boxy CRT monitor "
     "fills most of the picture, seen almost head-on, eye level, the screen large and centred. The CRT screen is completely blank: flat deep black glass "
     "with a very faint green glow and one soft curved reflection of the desk lamp in its top left corner. Below it a chunky beige mechanical keyboard with "
     "a top row of blank function keys, a brass desk lamp with a green glass shade throwing a warm pool of light, a coffee mug, a stack of blank fan-fold "
     "printer paper, a pencil. Blurred shelves of binders behind."),
'b':("The top floor of a tall glass tower at night, an evaluation control room high above a city of lights seen through the windows behind. "
     "On the back wall, mounted in a heavy dark steel frame, a bank of FOUR identical large blank monitors {lay}, seen almost head-on. Each monitor screen is "
     "completely blank flat black glass. Under each monitor a small sealed glass pod on a plinth with a glowing server core inside, the four cores glowing in "
     "the same warm gold. A long dark control console in the foreground with toggle switches and two big rotary knobs, all without labels. Cool blue city "
     "light from the windows, warm gold key light from the pods."),
'c':("A 1950s testing room, a lie-detector test. On a steel table, seen from above at a steep angle, a polygraph strip-chart recorder: the machine sits at the "
     "top of the picture with four thin metal pen arms resting on the paper, and a very wide band of plain blank cream paper unrolls from it straight toward "
     "the viewer, filling most of the picture, flat on the table, completely empty. Coiled wires, a rotary selector knob on the machine without labels, a single "
     "hanging lamp, venetian blind shadows across the table's edges, an ashtray at the side."),
'd':("A 1970s computer room at night. A heavy line printer seen from the front at a slight angle from above, its lid open, a long sheet of blank continuous "
     "fan-fold computer paper with pale green horizontal bars and sprocket holes along both edges feeding out of it and spilling over the front of the printer "
     "toward the viewer, the paper large, flat and taut in the middle of the picture, completely unprinted. Blinking tape drives blurred behind, a warm "
     "work lamp, cables on the floor."),
}
L={'3x4':'arranged two above two','16x9':'side by side in one row'}
J=[]
for k,p in T.items():
  for ar,a in (('3x4','3:4'),('16x9','16:9')):
    J.append({'name':f'{k}-{ar}','model':'gpt-image-2','input':{'prompt':S+p.format(lay=L[ar])+NO,'aspect_ratio':a,'resolution':'1K','quality':'medium','output_format':'png','num_outputs':1}})
json.dump(J,open('jobs1.json','w'),indent=1)
