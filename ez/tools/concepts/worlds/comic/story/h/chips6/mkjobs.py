# python3 mkjobs.py > jobs1.json : H22 chips6. One master: N2 clean with the swap (plate top left, small blank ceramic for the flag under it,
# the label panel beside the plate, the exposed silicon die at the right end), painted as a REAL ceramic EPROM with a real die shot.
import json
H='/home/user/Tokengame/ez/tools/concepts/worlds/comic/story/h/'
REF=H+'chips6/img/ref-layout.jpg'
STY=("Painted comic book illustration with crisp ink outlines and fine grain, the same style, light and colours as the reference; one warm golden key light from the top left; "
 "the chip alone on a pure black void, a thin green rim light on the left edge and a thin red rim light on the right edge. Seen perfectly straight on from above, horizontal, symmetric, every edge straight. ")
NO="Absolutely no text, no letters, no numbers, no logos, no symbols, no flags, no printed markings anywhere."
BODY=("Repaint the reference as a REAL vintage ceramic DIP EPROM, keeping exactly the same layout, sizes and positions: "
 "the body is a real two-part ceramic CERDIP package: a pale grey-white matte ceramic lid with fine speckled sintered texture, a slightly chamfered edge, "
 "a thin dark glass-frit seal seam visible all along the bottom and side edges between the lid and the base ceramic, "
 "a small semicircular pin-1 notch cut into the middle of the LEFT end of the body, and a tiny round pin-1 dimple near the top left corner; "
 "real gold-plated DIP pins along the top and bottom edges, each pin with its narrow shoulder where it leaves the seal, evenly spaced, identical. "
 "LEFT: the same flat empty square gold plate in the upper left; below it a bare blank stretch of ceramic. "
 "MIDDLE: the same flat empty black epoxy label panel with its thin gold border. "
 "RIGHT END: a shallow gold-plated square cavity, and in it a large square SILICON DIE that fills the cavity almost completely: "
 "the die is a real chip die shot like a microscope photograph of a real EPROM or microcontroller die: a ring of square aluminium bond pads all around its edge, "
 "a thin seal ring at its border, input/output cells behind the pads, and inside them dense real circuitry: rectangular SRAM and EPROM memory arrays as fine regular grids, "
 "rows of standard cells, metal routing buses running between the blocks, in the iridescent violet, green, gold and grey thin-film colours of real silicon. "
 "Short fine gold bond wires arc from the die's pads to the bonding fingers of the cavity. ")
J=[]
for i in 'abc':J.append({"name":f"m6-{i}","model":"gpt-image-2","refs":[REF],"input":{"prompt":BODY+STY+NO,"aspect_ratio":"16:9","resolution":"1K","quality":"medium","output_format":"png","num_outputs":1}})
print(json.dumps(J,indent=1))
