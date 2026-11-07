# python3 mkjobs.py > jobs1.json : H20 chips4 masters. ONE painting per take, re-coloured per model in code, so every chip's
# geometry is identical by construction. Neutral pale grey ceramic (tinted per model in CSS), soft front light (the leader's glow is a
# separate painted layer behind the chip, the same for whichever model leads). gpt-image-2, bet chip as style ref, H19's dim EPROM as layout ref.
import json
H='/home/user/Tokengame/ez/'
REF=H+'media/bet-chip-h2.jpg'
STY=("Painted comic book illustration in exactly the style of the first reference image (the green NVIDIA chip): a real object drawn sharp with clean black ink outlines on every part, "
 "comic halftone dots only inside the shadows. The object alone on a pure black void. ")
NO="Absolutely no text, no letters, no numbers, no logos, no symbols, no flags, no signs, no markings anywhere."
DIM="Painted light: soft even light from the front, a thin green rim light on the left edge and a thin red rim light on the right edge, the void around it dark. "
HEAD=("Follow the second reference image's layout exactly. A single vintage 1970s ceramic EPROM chip in a long, deep dual in-line package, seen perfectly straight on from the front, perfectly horizontal, flat, symmetric, centred, filling the width; the body's height is about a third of its length. "
 "The ceramic body is a LIGHT NEUTRAL PALE GREY enamel, no colour cast at all, evenly lit, with a fine matte grain and a thin gold seal ring. "
 "LEFT END: one flat empty square gold plate, blank, in the upper half only; below it a smooth bare flat stretch of the same pale grey ceramic, blank. ")
LAB=("RIGHT HALF: one large flat empty rectangular label panel of matte black epoxy with a very fine grain and a thin gold border, blank, taking the whole right half of the body and nearly its full height. "
 "Evenly spaced gold legs along the top and bottom edges. ")
MID={'s':"Between the gold plate and the label: one SQUARE quartz glass window with slightly rounded corners, set flush in a thin gold frame, as tall as the label panel, through it a dark empty black cavity, completely blank. ",
 'n':"Between the gold plate and the label: the bare silicon die of the chip, exposed, one large SQUARE of dark polished graphite silicon set flush in the ceramic, as tall as the label, its surface plain and smooth with only a faint iridescent sheen and very fine circuit lines at its outer rim, a few thin gold bond wires at its edges, no window, no glass, no frame, completely blank in the middle. "}
J=[]
def job(n,p,refs,ar='16:9'):J.append({"name":n,"model":"gpt-image-2","refs":refs,"input":{"prompt":p+NO,"aspect_ratio":ar,"resolution":"1K","quality":"medium","output_format":"png","num_outputs":1}})
for i in 'ab':
  job(f'ms-{i}',HEAD+MID['s']+LAB+DIM+STY,[REF,H+'tools/concepts/worlds/comic/story/h/chips3/img/s-grok-dim.jpg'])
  job(f'mn-{i}',HEAD+MID['n']+LAB+DIM+STY,[REF,H+'tools/concepts/worlds/comic/story/h/chips3/img/d-grok-dim.jpg'])
job('rays',"Only light, no object: a strong warm golden key light glowing from a horizontal band in the middle of the frame, casting broad golden comic-book rays upward and outward like a halo, painted with clean ink-edged ray shapes and halftone dots in the falloff, on a pure black void; the middle band itself is dark and empty. "+STY,[REF])
print(json.dumps(J,indent=1))
