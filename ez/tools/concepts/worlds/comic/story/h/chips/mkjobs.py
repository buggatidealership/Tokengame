# python3 mkjobs.py > jobs1.json : the chip paintings (new school package, old school EPROM, one big chip), lit (leader) and dim
import json
REF='/home/user/Tokengame/ez/media/bet-chip-h2.jpg'
STY=("Painted comic book illustration in exactly the style of the reference image (the green NVIDIA chip): a real object drawn sharp with clean black ink outlines on every part, "
 "comic halftone dots only inside the shadows, saturated colour. The object alone on a pure black void, seen clearly. ")
LIT="Painted light: one strong warm golden key light from behind the chip casting broad golden rays upward, like a halo; a green rim light on the left edge, a red rim light on the right edge. "
DIM="Painted light: no golden rays, the chip lit softly from the front, a thin green rim light on the left edge and a thin red rim light on the right edge, the void around it dark. "
NO="Absolutely no text, no letters, no numbers, no logos, no symbols, no flags, no signs, no markings anywhere."
COL={'claude':'burnt terracotta orange','gpt':'deep teal green','grok':'graphite black with brushed silver edges','kimi':'deep cobalt blue'}
NEW=("A single square modern processor package seen from the front at a gentle high angle, almost straight on, centred and filling the frame. Its substrate is {c} printed circuit board with fine gold traces and small components. "
 "In its centre one large square die window: smooth empty glossy black glass in a thin gold bezel, completely blank, taking about half the chip's width. "
 "Along the bottom edge of the substrate, one wide flat empty matte black label panel with a thin gold border, completely blank. "
 "In the top left corner a small flat empty square gold pad, blank; in the top right corner a small flat empty rectangular matte white label, blank. Gold pins along all four edges. ")
OLD=("A single vintage 1970s ceramic EPROM chip in a long dual in-line package, seen from the front at a gentle high angle, almost straight on, horizontal, centred. The ceramic body is {c} enamel with a thin gold seal ring. "
 "In its centre one large round quartz glass window set in a gold ring, through it a dark empty black cavity, completely blank. "
 "Left of the window a flat empty rectangular matte black label area with a thin gold border, blank; right of the window a flat empty rectangular matte black label area with a thin gold border, blank. "
 "Gold legs along the top and bottom edges. ")
J=[]
def job(n,p,ar):J.append({"name":n,"model":"gpt-image-2","refs":[REF],"input":{"prompt":p+STY+NO,"aspect_ratio":ar,"resolution":"1K","quality":"medium","output_format":"png","num_outputs":1}})
for m,c in COL.items():
  for k,L in (('lit',LIT),('dim',DIM)):
    job(f'n-{m}-{k}',NEW.format(c=c)+L,'1:1')
    job(f'o-{m}-{k}',OLD.format(c=c)+L,'16:9')
BIG=("One large square processor package, seen from the front at a gentle high angle, almost straight on, centred, filling the frame, its substrate deep green printed circuit board with fine gold traces. "
 "On it four large identical square die windows {lay}: each smooth empty glossy black glass in a thin gold bezel, completely blank. "
 "Under each die window one small flat empty matte black label panel with a thin gold border, blank. Gold pins along all four edges. ")
job('b-tall',BIG.format(lay='in a two by two grid')+LIT,'3:4')
job('b-wide',BIG.format(lay='in one row')+LIT,'16:9')
print(json.dumps(J,indent=1))
