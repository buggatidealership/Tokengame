# python3 mkjobs.py > jobs1.json : H18 chips2 paintings. A = new school package (lit/dim per model), B = old school EPROM (lit/dim),
# T = the tryouts chip with four dies, one new school (TA) and one old school (TB). gpt-image-2 with the bet chip as style reference.
import json
REF='/home/user/Tokengame/ez/media/bet-chip-h2.jpg'
STY=("Painted comic book illustration in exactly the style of the reference image (the green NVIDIA chip): a real object drawn sharp with clean black ink outlines on every part, "
 "comic halftone dots only inside the shadows, saturated colour. The object alone on a pure black void, seen clearly. ")
LIT="Painted light: one strong warm golden key light from behind the chip casting broad golden rays upward, like a halo; a green rim light on the left edge, a red rim light on the right edge. "
DIM="Painted light: no golden rays, the chip lit softly from the front, a thin green rim light on the left edge and a thin red rim light on the right edge, the void around it dark. "
NO="Absolutely no text, no letters, no numbers, no logos, no symbols, no flags, no signs, no markings anywhere."
COL={'claude':'burnt terracotta orange','gpt':'deep teal green','grok':'graphite black with brushed silver edges','kimi':'deep cobalt blue'}
NEW=("A single square modern processor package seen straight on from the front, centred and filling the frame. Its substrate is {c} printed circuit board with fine gold traces. "
 "TOP ROW: in the top left corner one large flat empty square gold plate, completely blank, about a quarter of the chip's width. To the right of the gold plate, across the rest of the top row, a calm smooth stretch of bare {c} board with no components and only a few very faint traces. "
 "MIDDLE: one large square die window in the centre, smooth empty glossy black glass in a thin gold bezel, completely blank, about forty percent of the chip's width. The board left and right of it carries small components. "
 "BOTTOM: along the bottom edge one wide flat empty matte black label panel with a thin gold border, completely blank, tall, about one fifth of the chip's height, spanning most of the width. Gold pins along all four edges. ")
OLD=("A single vintage 1970s ceramic EPROM chip in a long dual in-line package, seen straight on from the front, horizontal, centred, filling the width. The ceramic body is {c} enamel with a thin gold seal ring. "
 "LEFT END: one large flat empty square gold plate, blank, in the upper half; below it a smooth bare stretch of {c} ceramic, blank. "
 "Then one round quartz glass window set in a gold ring, through it a dark empty black cavity, completely blank, placed left of centre. "
 "RIGHT HALF: one large flat empty rectangular matte black label panel with a thin gold border, blank, taking almost the whole right half of the body and most of its height. "
 "Gold legs along the top and bottom edges. ")
TNEW=("One large square processor package, an unfinished engineering sample, seen straight on from the front, centred, filling the frame. Its substrate is raw dark slate green printed circuit board, matte, with fine copper and gold traces, a strip of worn masking tape on one corner. "
 "Along the top edge one wide flat empty matte black label strip with a thin gold border, blank. "
 "Below it four identical square die windows in a two by two grid, each dark smoky glass in a dull gold bezel, completely blank, as if the chip is not powered yet. "
 "Under each die window one small flat empty matte black label, blank. Gold pins along all four edges. ")
TOLD=("One long vintage 1970s ceramic multi-chip package, an unfinished engineering sample, seen straight on from the front, horizontal, centred, filling the width. Raw grey ceramic with a thin gold seal ring and a strip of worn masking tape on one end. "
 "Along the top a wide flat empty matte black label strip with a thin gold border, blank. "
 "Below it four small round quartz windows in one row, each in a gold ring, dark and empty, completely blank. Under each window one small flat empty matte black label, blank. Gold legs along the top and bottom edges. ")
J=[]
def job(n,p,ar):J.append({"name":n,"model":"gpt-image-2","refs":[REF],"input":{"prompt":p+STY+NO,"aspect_ratio":ar,"resolution":"1K","quality":"medium","output_format":"png","num_outputs":1}})
for m,c in COL.items():
  for k,L in (('lit',LIT),('dim',DIM)):
    job(f'n-{m}-{k}',NEW.format(c=c)+L,'1:1')
    job(f'o-{m}-{k}',OLD.format(c=c)+L,'16:9')
job('t-new',TNEW+DIM,'1:1')
job('t-old',TOLD+DIM,'16:9')
print(json.dumps(J,indent=1))
