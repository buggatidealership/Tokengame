# python3 mkjobs.py > jobs1.json : H21 chips5, S swapped. The H20 master (ms-c) repainted with its parts rearranged: gold plate top left,
# blank ceramic under it (the flag goes there in code), the black label panel in the middle, a big square quartz window at the right end
# whose glass runs from the gold plate's top edge down to near the body's bottom edge. One painting, re-coloured per model in code.
import json
H='/home/user/Tokengame/ez/'
REF=H+'tools/concepts/worlds/comic/story/h/chips4/img/ms-c.jpg'
STY=("Keep exactly the painted comic book style, light, colours, grain and ink outlines of the reference chip; the object alone on a pure black void, "
 "a thin green rim light on the left edge and a thin red rim light on the right edge. ")
NO="Absolutely no text, no letters, no numbers, no logos, no symbols, no flags, no markings anywhere."
P=("Repaint the reference image: the same vintage ceramic EPROM chip, same size, same position, same pale grey ceramic body, same gold legs along the top and bottom edges, seen perfectly straight on, horizontal and symmetric, "
 "but with its parts REARRANGED from left to right: "
 "1) LEFT END: the same flat empty square gold plate in the upper left, and directly below it a smooth bare blank stretch of the pale grey ceramic. "
 "2) MIDDLE: the flat empty black epoxy label panel with its thin gold border, now placed right next to the gold plate, about half the body's length wide, nearly the body's full height. "
 "3) RIGHT END: one big SQUARE quartz glass window in a thin gold frame, a perfect square, as tall as possible: the top edge of its glass level with the top edge of the gold plate, "
 "its glass reaching down almost to the bottom edge of the body; through the glass a dark empty black cavity, completely blank. "
 "Thin frame, big glass. ")
J=[]
for i in 'abc':J.append({"name":f"sw-{i}","model":"gpt-image-2","refs":[REF],"input":{"prompt":P+STY+NO,"aspect_ratio":"16:9","resolution":"1K","quality":"medium","output_format":"png","num_outputs":1}})
print(json.dumps(J,indent=1))
