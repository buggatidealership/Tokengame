# python3 mkjobs.py > jobs1.json : H19 chips3 paintings, old-school EPROMs only (B), lit (season P&L leader) and dim per model.
#   s-*  S: a SQUARE quartz window where H18's round porthole was (the founder's loop plays behind it)
#   c-*  N1: no window; a wide smooth stretch of bare ceramic between plate and label (the loop is printed into the ceramic itself)
#   d-*  N2: no window; the bare silicon die itself, exposed (decapped), seen in the package (the loop lives in the silicon)
# A's new-school chips and the tryouts package are reused from ../chips2/img. gpt-image-2 with the bet chip as style reference.
import json
REF='/home/user/Tokengame/ez/media/bet-chip-h2.jpg'
STY=("Painted comic book illustration in exactly the style of the reference image (the green NVIDIA chip): a real object drawn sharp with clean black ink outlines on every part, "
 "comic halftone dots only inside the shadows, saturated colour. The object alone on a pure black void, seen clearly. ")
LIT="Painted light: one strong warm golden key light from behind the chip casting broad golden rays upward, like a halo; a green rim light on the left edge, a red rim light on the right edge. "
DIM="Painted light: no golden rays, the chip lit softly from the front, a thin green rim light on the left edge and a thin red rim light on the right edge, the void around it dark. "
NO="Absolutely no text, no letters, no numbers, no logos, no symbols, no flags, no signs, no markings anywhere."
COL={'claude':'burnt terracotta orange','gpt':'deep teal green','grok':'graphite black with brushed silver edges','kimi':'deep cobalt blue'}
HEAD=("A single vintage 1970s ceramic EPROM chip in a long, deep dual in-line package, seen straight on from the front, perfectly horizontal and flat, centred, filling the width; the body's height is about a third of its length. "
 "The ceramic body is {c} enamel with a fine matte grain and a thin gold seal ring. "
 "LEFT END: one flat empty square gold plate, blank, in the upper half only; below it a smooth bare stretch of {c} ceramic, blank. ")
LAB=("RIGHT HALF: one large flat empty rectangular label panel of matte black epoxy with a very fine grain and a thin gold border, blank, taking the whole right half of the body and nearly its full height. "
 "Gold legs along the top and bottom edges. ")
MID={'s':"Between the gold plate and the label: one SQUARE quartz glass window with slightly rounded corners, set flush in a thin gold frame, as tall as the label panel, through it a dark empty black cavity, completely blank. ",
 'c':"Between the gold plate and the label: a wide calm smooth stretch of bare {c} ceramic as tall as the label, no window, no components, nothing on it, completely blank. ",
 'd':"Between the gold plate and the label: the bare silicon die of the chip, exposed, a large square of dark polished graphite silicon set flush in the ceramic, as tall as the label, its surface plain and smooth with only a faint iridescent sheen and very fine circuit lines at its outer rim, a few thin gold bond wires at its edges, no window, no glass, no frame, completely blank in the middle. "}
J=[]
def job(n,p,ar):J.append({"name":n,"model":"gpt-image-2","refs":[REF],"input":{"prompt":p+STY+NO,"aspect_ratio":ar,"resolution":"1K","quality":"medium","output_format":"png","num_outputs":1}})
for v in 'scd':
  for m,c in COL.items():
    for k,L in (('lit',LIT),('dim',DIM)):job(f'{v}-{m}-{k}',HEAD.format(c=c)+MID[v].format(c=c)+LAB+L,'16:9')
print(json.dumps(J,indent=1))
