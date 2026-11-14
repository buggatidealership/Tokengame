# python3 mkjobs.py master > jobs-master.json : chips8 masters A and B at 4K (gpt-image-2), from ref/layout-{A,B}.jpg + chips7's master (detail) + the hero chip (style)
import json,sys
H='/home/user/Tokengame/ez/';C=H+'tools/concepts/worlds/comic/story/h/chips8/'
M7=H+'tools/concepts/worlds/comic/story/h/chips7/img/m7-master.jpg';HERO=H+'media/top-hero-t-h22.jpg'
STY=("Painted comic book illustration in exactly the style, ink line, light and finish of the second and third reference images: crisp black ink outlines, hard cel shading, glossy highlights, "
 "fine detail; one warm golden key light from the top left; the chip alone on a pure black void with a thin green rim light along its left end and a thin red rim light along its right end. "
 "Seen perfectly straight on from above, horizontal, every edge straight and parallel to the frame. ")
def body(win):
  return ("Paint the first reference image (a layout sketch) as a real, richly detailed vintage ceramic multi-chip module, keeping EXACTLY the same layout, sizes and positions of every part. "
 "THE PACKAGE: the same pale grey-white sintered ceramic substrate as the second reference, with fine speckled grain, a chamfered edge, a dark glass-frit seal seam along its bottom edge; "
 "the ceramic is BUSY with real chip features everywhere around the parts, as dense as the second reference: fine gold thick-film traces in parallel groups, round vias, rows of tiny SMD "
 "capacitors and resistors, test pads and fiducials; no large empty area of plain ceramic. Real gold-plated DIP pins along the top and bottom edges, evenly spaced, identical. "
 "LEFT: a flat EMPTY square brushed gold plate with a raised bevelled rim (leave its face completely blank); under it an EMPTY rectangular recessed metal field framed by a fine engraved line (blank). "
 "MIDDLE: a black textured epoxy label panel with a thin gold border. In it: a long EMPTY dark glass strip at the top left (completely blank); recessed display windows of dark smoked glass "
 "with thin gold bezels: one small window at the top right, one LARGE wide window across the middle, one small window at the lower left and one wide window at the lower right. Every window EMPTY, "
 "unlit, deep black glass with a soft diagonal glare. Under them a fine gold hairline, and below it a smooth EMPTY band of black epoxy along the foot of the panel (blank). "
 "Small white silkscreen capital letters printed on the black epoxy, in a clean condensed sans serif, crisp and spelled exactly: \"NO.\" just left of the small top right window; "
 "\"LAST\" above \"7 DAYS\" (two short lines) just left of the large middle window; \"LAST\" above \"ROUND\" (two short lines) just left of the small lower left window; "
 "\"SEASON\" just left of the wide lower right window. No other text anywhere. "+win)
WA=("RIGHT END: a big square window with a thick polished gold frame, its top level with the gold plate's top and its bottom level with the metal field's bottom, holding EMPTY deep dark smoked "
 "quartz glass with a soft glare (nothing visible inside it). ")
WB=("RIGHT END: a big square window with a thick polished gold frame that BREAKS OUT of the chip: it rises above the ceramic's top edge, over the top row of pins (the frame sits on top of them, "
 "casting a hard shadow on the pins and the ceramic), like a comic panel breaking its border; its bottom is level with the metal field's bottom. It holds EMPTY deep dark smoked quartz glass with "
 "a soft glare (nothing visible inside it). ")
NO="Apart from the silkscreen labels named above, absolutely no text, no letters, no numbers, no logos, no symbols, no flags anywhere."
J=[]
if sys.argv[1]=='master':
  for k,w in (('A',WA),('B',WB)):
    for i in 'abc':J.append({"name":f"m8{k}-{i}","model":"gpt-image-2","refs":[C+f'ref/layout-{k}.jpg',M7,HERO],"input":{"prompt":body(w)+STY+NO,"aspect_ratio":"16:9","resolution":"4K","quality":"medium","output_format":"png","num_outputs":1}})
print(json.dumps(J,indent=1))
