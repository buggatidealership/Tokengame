# python3 mkjobs.py master > jobs-master.json : H23 chips7, the master at 4K (3840x2160, the chip ~3840x1390 after the crop)
import json,sys
H='/home/user/Tokengame/ez/'
C=H+'tools/concepts/worlds/comic/story/h/chips7/'
LAY=C+'ref/layout.jpg';HERO=H+'media/top-hero-t-h22.jpg';M6=H+'tools/concepts/worlds/comic/story/h/chips6/img/m6-master.jpg'
STY=("Painted comic book illustration in exactly the style, ink line, light and finish of the second reference image (the green circuit chip): crisp black ink outlines, "
 "hard cel shading, glossy highlights, fine detail; one warm golden key light from the top left; the chip alone on a pure black void with a thin green rim light along its left end "
 "and a thin red rim light along its right end. Seen perfectly straight on from above, horizontal, every edge straight and parallel to the frame. ")
BODY=("Paint the first reference image (a layout sketch) as a real, richly detailed vintage ceramic multi-chip module, keeping EXACTLY the same layout, sizes and positions of every part. "
 "THE PACKAGE: a pale neutral grey-white sintered ceramic substrate with fine speckled grain (not a flat colour), a chamfered edge with a dark glass-frit seal seam along its bottom edge, "
 "a small pin-1 dimple top left; the ceramic is BUSY with real chip features everywhere around the parts, as dense as on the second reference: fine silver and gold thick-film traces "
 "running in parallel groups, round vias, rows of tiny SMD decoupling capacitors (tan with silver ends) and SMD resistors (black with silver ends), small square test pads and fiducials, "
 "bond fingers along the cavity; no large empty area of plain ceramic anywhere. Real gold-plated DIP pins along the top and bottom edges, evenly spaced, identical, each with its shoulder. "
 "LEFT: a flat EMPTY square brushed gold plate with a raised bevelled rim (leave its face completely blank); under it a small EMPTY rectangular recessed metal field framed by a fine "
 "engraved line (leave it blank). "
 "MIDDLE: a black textured epoxy label panel with a thin gold border. In it: a long EMPTY black strip at the top left (leave it completely blank); "
 "recessed display windows of dark smoked glass with thin gold bezels: one small window at the top right, five small square windows in a row in the middle, one wider window right of them, "
 "and one large wide window at the bottom right. Every window is EMPTY, unlit, deep black glass with a soft diagonal glare reflection across it. "
 "Small white silkscreen capital letters printed on the black epoxy, in a clean condensed sans serif, crisp and spelled exactly: "
 "\"NO.\" just left of the small top right window; \"LAST 5\" just left of the row of five square windows; \"W-L\" just left of the wider window in the middle row; "
 "\"SEASON\" above \"P&L\" (two short lines) just left of the large bottom window. No other text anywhere. "
 "RIGHT END: a gold-plated square cavity, and in it a large square SILICON DIE filling the cavity, painted like a microscope photograph of a real EPROM die: a ring of square aluminium "
 "bond pads around its edge, a seal ring, I/O cells, and inside them dense real circuitry (memory arrays as fine grids, rows of standard cells, routing buses) in the iridescent violet, "
 "green, gold and grey thin-film colours of real silicon, with fine gold bond wires arcing from its pads to the cavity's bonding fingers. ")
NO="Apart from the four silkscreen labels named above, absolutely no text, no letters, no numbers, no logos, no symbols, no flags anywhere."
J=[]
if sys.argv[1]=='master':
  for i in 'abc':J.append({"name":f"m7-{i}","model":"gpt-image-2","refs":[LAY,HERO],"input":{"prompt":BODY+STY+NO,"aspect_ratio":"16:9","resolution":"4K","quality":"medium","output_format":"png","num_outputs":1}})
if sys.argv[1]=="master":print(json.dumps(J,indent=1))
# python3 mkjobs.py models > jobs-models.json : one image-to-image pass per model on the master's left part (plate, flag field, name strip)
if sys.argv[1]=='models':
  J=[]
  NAMES={'grok':('GROK','4.7','us'),'claude':('CLAUDE','FABLE 5.1','us'),'gpt':('GPT','6 ASTRA','us'),'kimi':('KIMI','K3','cn')}
  FL={'us':'United States flag (stars and stripes)','cn':'flag of China (red field, five yellow stars)'}
  for m,(n,v,f) in NAMES.items():
    sp=' '.join(list(n))+' then '+' '.join(list(v.replace(' ','_'))).replace('_','(space)')
    P=(f"Edit the first image. Keep EVERYTHING exactly as it is, same framing, same positions, same sizes, same style and light; change only these three things: "
     f"(1) Into the flat face of the square gold plate (upper left), engrave the logo mark shown in the second reference image, centred, about 70% of the plate's width, "
     f"as a deep stamped engraving in the same brushed gold metal: crisp bevelled walls catching the warm key light from the top left, darker recessed floor, the exact shape of the mark, no outline around it. "
     f"(2) Fill the small recessed grey metal field below the plate, edge to edge, with the {FL[f]} from the third reference image, etched and enamelled into the metal: its true colours, "
     f"the brushed metal grain and light running through the colours, slightly worn, flush with the surface. "
     f"(3) Inside the long dark glass strip at the top of the black label, laser-mark the text \"{n} {v}\" in cream-white condensed bold capitals, left aligned with a small margin, "
     f"\"{n}\" tall (about 60% of the strip's height) and \"{v}\" about half that height beside it on the same baseline, the letters frosted like laser marking with a faint glow, under the glass's glare. "
     f"Spell it exactly, letter by letter: {sp}. Do not change or add any other text; keep the labels LAST 5, W-L, SEASON P&L and NO. exactly as they are. No other logos, numbers or flags.")
    J.append({"name":f"p7-{m}-a","model":"gpt-image-2","refs":[C+'ref/left.jpg',C+f'ref/logo-{m}.png',C+f'ref/flag-{f}.png'],"input":{"prompt":P,"aspect_ratio":"16:9","resolution":"4K","quality":"medium","output_format":"png","num_outputs":1}})
  print(json.dumps(J,indent=1))
# python3 mkjobs.py plates > jobs-plates.json : Claude's and Kimi's marks redone: the plate with the true silhouette already darkened in, repainted as an engraving
if sys.argv[1]=='plates':
  J=[]
  for m in ['claude','kimi']:
    P=("Repaint the first image as a deep stamped engraving in the brushed gold plate: the dark shape in the plate becomes the engraved recess, keeping its silhouette EXACTLY "
       "(the same outline, the same number of parts, the same lengths, angles and cut ends as the dark shape and as the second reference image; do not regularise or tidy it). "
       "Crisp bevelled walls catching a warm key light from the top left, a darker recessed floor, the same gold metal and grain. Keep the plate, its rim, its size and the framing "
       "exactly as they are, in the same painted comic book style with crisp ink edges. No text, no other marks.")
    for t in 'ab':J.append({"name":f"pl7-{m}-{t}","model":"gpt-image-2","refs":[C+f'ref/plate-{m}-guide.jpg',C+f'ref/logo-{m}.png'],"input":{"prompt":P,"aspect_ratio":"1:1","resolution":"2K","quality":"medium","output_format":"png","num_outputs":1}})
  print(json.dumps(J,indent=1))
# python3 mkjobs.py plates2 > jobs-plates2.json : Claude's mark again with edit models that keep the input (nano-banana-pro, flux-kontext)
if sys.argv[1]=='plates2':
  P=("Turn the dark shape on this gold plate into a deep stamped engraving in the gold, keeping its silhouette EXACTLY as it is: the same rays, the same count, the same lengths, "
     "angles and flat cut ends, the same size and position; do not add, remove or regularise any ray. Bevelled walls catching a warm light from the top left, a darker recessed floor, "
     "the same gold metal and grain. Keep everything else in the image identical. No text.")
  J=[{"name":"pl7-claude-nb","model":"nano-banana-pro","refs":[C+'ref/plate-claude-guide.jpg'],"input":{"prompt":P,"aspect_ratio":"1:1","resolution":"2K","num_outputs":1}},
     {"name":"pl7-claude-fk","model":"flux-kontext","refs":[C+'ref/plate-claude-guide.jpg'],"input":{"prompt":P,"aspect_ratio":"1:1","resolution":"fixed","quality":"pro","output_format":"png","num_outputs":1}}]
  print(json.dumps(J,indent=1))
# python3 mkjobs.py plates3 > jobs-plates3.json : all four marks with nano-banana-pro on the same guide, so the four plates share one process and keep the framing
if sys.argv[1]=='plates3':
  P=("Turn the dark shape on this gold plate into a deep stamped engraving in the gold, keeping its silhouette EXACTLY as it is: the same parts, the same count, the same lengths, "
     "angles, curves and cut ends, the same size and position; do not add, remove, round off or regularise anything. The whole shape is one recessed floor, slightly darker gold, "
     "with crisp bevelled walls catching a warm light from the top left (bright lower-right walls, shadowed upper-left walls); the same gold metal and grain. "
     "Keep everything else in the image identical. No text.")
  J=[{"name":f"pl7-{m}-nb2","model":"nano-banana-pro","refs":[C+f'ref/plate-{m}-guide.jpg'],"input":{"prompt":P,"aspect_ratio":"1:1","resolution":"2K","num_outputs":1}} for m in ['grok','claude','gpt','kimi']]
  print(json.dumps(J,indent=1))
# python3 mkjobs.py try > jobs-try.json : the fifth chip, blank, in the master's package and finish
if sys.argv[1]=='try':
  P=("Paint the first reference image (a chip layout) again in EXACTLY the material, detail and finish of the second reference image, keeping the first image's layout, sizes and positions: "
     "the same pale neutral grey-white sintered ceramic substrate, BUSY everywhere with fine gold and silver thick-film traces, round vias, rows of tiny SMD capacitors and resistors, test pads "
     "and fiducials, no large empty area; the same gold DIP pins top and bottom; a strip of yellowed masking tape stuck over the right end, slightly lifted at a corner. "
     "On it: one long EMPTY dark smoked-glass window with a thin gold bezel along the top; four round dies, each a round gold-rimmed recess holding EMPTY deep dark smoked glass with a soft glare; "
     "under each die an EMPTY small dark rectangular glass window with a thin gold bezel. Every window and die completely empty. "
     +STY+NO.replace('Apart from the four silkscreen labels named above, a','A'))
  J=[{"name":f"t7-{t}","model":"gpt-image-2","refs":[C+'ref/try-layout.jpg',C+'img/m7-master.jpg'],"input":{"prompt":P,"aspect_ratio":"16:9","resolution":"4K","quality":"medium","output_format":"png","num_outputs":1}} for t in 'ab']
  print(json.dumps(J,indent=1))
# python3 mkjobs.py tryp > jobs-tryp.json : the fifth chip's words, marks and flags painted into it from the guide (nano-banana-pro keeps the framing)
if sys.argv[1]=='tryp':
  P=("Make the flat overlaid graphics in this image part of the chip, keeping everything else exactly identical (framing, sizes, positions, the ceramic, pins, tape and gold bezels): "
     "the gold words IN INFERENCE become laser-marked glowing amber letters inside the long dark glass window, under the glass's glare and reflections, with a faint bloom on the bezel; "
     "the four pale marks become faint frosted etchings inside the dark smoked glass of each round die, under its glare; "
     "the cream names become frosted laser-marked letters in their small dark glass windows, under the glare; the four small flags become tiny enamel inlays set flush in those windows. "
     "Keep every letter EXACTLY as it is, spelled: IN INFERENCE, MISTRAL, QWEN, GEMINI, NEMOTRON. Keep each mark's and each flag's exact shape. Same painted comic book style with crisp ink edges. No other text.")
  J=[{"name":f"t7p-{t}","model":"nano-banana-pro","refs":[C+'ref/try-guide.jpg'],"input":{"prompt":P,"aspect_ratio":"21:9","resolution":"4K","num_outputs":1}} for t in 'ab']
  print(json.dumps(J,indent=1))
