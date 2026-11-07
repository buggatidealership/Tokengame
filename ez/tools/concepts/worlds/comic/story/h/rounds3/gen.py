#!/usr/bin/env python3
# rounds3: the places where the round covers live. gen.py <place> <est|wall> <aspect>   (1K low, gpt-image-2, ~$0.03)
import json,sys,subprocess,os
D=os.path.dirname(os.path.abspath(__file__))
FIN=(" Painted 3D-rendered scene with an American comic book ink finish: physically modelled materials, one warm golden key light, "
 "shallow depth of field with soft bokeh far behind, bold black ink contour lines and halftone dots only inside the shadows. "
 "Palette: deep black, warm gold, with small accents of emerald green and signal red. Crisp and sharp, like a frame from a high-end animated film. "
 "No people, no text, no letters, no numbers, no words, no logos, no readable signs.")
P={
'shop':("Establishing shot inside a small comic book shop at night, seen from the counter: a tall back wall of wooden slatwall with rows of empty clear plastic comic sleeves on metal hooks, waiting for covers, warm picture lights above, a glass counter with a bell in the foreground out of focus, a dark street window to the side.",
        "Front-on flat view of a comic shop's back wall: dark stained wooden slatwall with evenly spaced horizontal grooves and small chrome hooks, warm light grazing it from above, nothing hung on it, the surface fills the whole frame evenly, seamless repeating texture."),
'tunnel':("Establishing shot of the concrete tunnel that leads boxers from the dressing rooms to the ring, at night before a big fight: rough painted concrete walls covered in layers of torn, pasted, blank paper fight posters, red and green ring lights glowing at the far end through haze, cables on the floor.",
        "Front-on flat view of a rough concrete tunnel wall with old wheat-paste residue, torn scraps of blank paper and drips of glue, warm light grazing it from above, nothing new on it, the surface fills the whole frame evenly, seamless repeating texture."),
'hall':("Establishing shot of a sports Hall of Fame gallery at night: a long dark green velvet wall with empty gilded picture frames, each under its own small brass picture light, a polished black marble floor reflecting the gold, a velvet rope on brass posts in the foreground out of focus, a trophy cabinet glowing at the far end.",
        "Front-on flat view of a museum wall covered in deep green velvet with a fine pile, a gold dado rail running across near the bottom, warm pools of light from above, nothing hung on it, the surface fills the whole frame evenly, seamless repeating texture."),
'kiosk':("Establishing shot of an old newsstand kiosk on Wall Street at the closing bell, dusk: a green painted wooden kiosk whose racks and wires hold blank magazines with nothing printed on them, wooden clothes pegs on taut wires, the columns of the stock exchange glowing gold behind it out of focus, steam from a grate, wet cobbles.",
        "Front-on flat view of the inside back panel of a newsstand kiosk: dark green painted tongue-and-groove wooden boards, plain boards with nothing on them, no wires, no pegs, no hooks, warm light from above, the surface fills the whole frame evenly, seamless repeating texture."),
'vault':("Establishing shot of a collector's vault room at a grading house: a long glass display case lit from inside, rows of empty clear acrylic graded slabs standing on black velvet risers, a heavy round vault door open in the background glowing gold, a loupe and white cotton gloves on the glass in the foreground out of focus.",
        "Front-on flat view looking straight down onto plain black velvet lining of a display case, an even fine pile with no objects, no shapes and no indentations at all, a faint diagonal reflection of glass across it, warm light from above, the surface fills the whole frame evenly, seamless repeating texture."),
}
if __name__=='__main__':
  pl,kind,ar=sys.argv[1],sys.argv[2],sys.argv[3]
  p=P[pl][0 if kind=='est' else 1]+FIN
  if kind=='est': p+=" Leave the upper fifth of the picture calm and dark so a title can sit there."
  inp={"prompt":p,"aspect_ratio":ar,"resolution":"1K","quality":os.environ.get("Q","medium"),"output_format":"png","num_outputs":1}
  name=f'{pl}-{kind}-{ar.replace(":","x")}'
  subprocess.run(['python3',D+'/hd.py',name,'gpt-image-2',json.dumps(inp)],env={**os.environ,'BIG':'1'})
