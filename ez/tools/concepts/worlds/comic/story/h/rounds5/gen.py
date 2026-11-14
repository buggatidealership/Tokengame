#!/usr/bin/env python3
# rounds5 (round H11): Every round so far, "Hot off the press", in Silver Age flat print, bright.
# Prints a job list for run.sh, one JSON per line (name, model, input, refs).
#   python3 gen.py plates    the print shop (9:16 phone, 16:9 desktop), two takes each
#   python3 gen.py sprites   the bulldog clip and the blank sheet, on a flat green screen (keyed out by key.py)
#   python3 gen.py covers    the four newest graded rounds' outcome scenes, redrawn bright (art for treatments A and C)
#   python3 gen.py dress     the same scenes with blank trade-dress surfaces painted in (treatment B: the words sit in painted shapes)
import json,sys,os
D=os.path.dirname(os.path.abspath(__file__));M=D+'/../../../../../../../media/'
STYLE=("1960s Silver Age American comic book print in bright daylight: a confident clean black ink line drawn with brush and nib, thick outer contours and thin inner lines, "
 "flat bold printed colour fills in a bright limited palette (sunny gold yellow, bright emerald green, signal red, clear sky cyan, black ink, and clean white only where something is paper), "
 "Ben-Day halftone dots only inside a few shadows, the colour plates a hair out of register, the slight grain of cheap printing. High key, bright and flashy, cheerful.")
NEG=(" Drawn by hand, not rendered: no photographic light, no 3D-render surfaces, no lens blur, no gradients, no night, no gloom, no beige, cream, tan, sepia or parchment colours anywhere."
 " No people, no figures, no faces, no text, no letters, no numbers, no words, no logos, no readable signs, no watermark.")
def job(name,prompt,ar,refs=(),q='medium',res='1K'):
  return {'name':name,'model':'gpt-image-2','input':{'prompt':prompt,'aspect_ratio':ar,'resolution':res,'quality':q,'output_format':'png','num_outputs':1},'refs':list(refs)}
SHOP={
 'a':"A busy print shop in bright morning sun. The walls are painted flat sunny gold yellow, with tall windows showing a clear cyan sky and a city skyline. "
     "In the foreground a big old cylinder printing press painted emerald green with red rollers, a freshly printed white sheet sliding out of it onto the delivery board. "
     "A bench with ink cans of gold, green and red, a brayer roller, ink splashes on the floor.",
 'b':"A comic book printing room seen from the side, bright noon light pouring through a skylight. Flat signal-red brick walls, a black-and-white checker floor, "
     "a giant emerald green rotary press with gold trim in the lower third, its rollers inked red and gold, a stack of fresh white sheets on its board, ink cans and rags beside it.",
}
WIRES={'9x16':"Across the room, high up, two thin black drying wires are strung wall to wall, taut and level, one at about a third of the picture's height and one at about the middle, with nothing at all hanging on them.",
       '16x9':"Across the room, high up, one thin black drying wire is strung wall to wall, taut and level at about a third of the picture's height, with nothing at all hanging on it."}
def plates():
  for k,s in SHOP.items():
    for ar in ('9:16','16:9'):
      a=ar.replace(':','x')
      yield job(f'shop{k}-{a}',"Establishing panel of a comic book. "+s+" "+WIRES[a]+" Keep the top sixth of the picture a calm flat wall so a title can be lettered there. "+STYLE+NEG,ar)
def sprites():
  G=" The object is alone, centred, on a perfectly flat pure green background (#00ff00), no shadow on the background, no floor, nothing else in the picture."
  yield job('spr-clip',"A single black steel bulldog clip with a silver spring lever, seen straight from the front, its jaws pointing down, as a comic book drawing: thick black ink outline, flat black with a crisp white highlight shape, one bright gold rivet. "+STYLE+G+" No text.",'1:1')
  yield job('spr-sheet',"A single blank sheet of fresh white printing paper hanging straight down, seen from the front, gently waving so its lower corners curl a little, drawn as a comic book prop: thick black ink outline, flat white with two cool cyan-grey fold shadows drawn as hard shapes and a few Ben-Day dots in the curl. "+STYLE+G+" The paper is completely blank. No text, no marks.",'3:4')
  yield job('spr-sheet2',"A single blank sheet of fresh white printing paper hanging from its top edge, seen from the front, slightly wavy, one lower corner lifting in a breeze, drawn as a comic book prop: thick black ink outline, flat white with a few hard cool cyan-grey shadow shapes. "+STYLE+G+" The paper is completely blank. No text, no marks.",'3:4')
SET=[80,79,78,77]
TILE={80:'tile-r80-t2.jpg',79:'tile-r79-t2.jpg',78:'tile-r78-t3.jpg',77:'tile-r77-t3.jpg'}
CROWN={80:"",79:"",78:"Keep the one object that is marked in gold with a crown exactly as it is: gold and crowned. Every other object stays un-gilded.",
       77:"Keep the one object that is marked in gold exactly as it is, and put a small gold crown on it. Every other object stays un-gilded."}
def covers():
  for n in SET:
    yield job(f'cv-r{n}',"Redraw this picture as a bright new comic book cover illustration, keeping its composition: the same place and the same main objects in the same positions. "
      +CROWN[n]+" Remove every person and character, and every blank sign, empty plate, label and banner. Make it bright and flashy: daylight, saturated flat colours. "
      "Keep the top fifth of the picture a simple bright sky or wall and the bottom sixth simple, so a masthead and a cover line can be lettered there. Finish: "+STYLE+NEG,'3:4',[M+TILE[n]])
def dress():
  for n in SET:
    yield job(f'dr-r{n}',"Redraw this picture as a bright 1960s comic book cover, keeping its composition: the same place and the same main objects. "+CROWN[n]+
      " Remove every person and character. Paint the cover's empty trade dress into it as drawn objects, all completely blank: "
      "across the very top a wide flat solid yellow banner with a thick black ink outline, full width, about a sixth of the cover tall; "
      "in the top left corner, overlapping the banner, a small square box filled flat solid white with a thick black outline; "
      "at the lower right a jagged starburst filled flat solid white with a thick black outline, about a third of the cover wide; "
      "across the bottom a ribbon-shaped caption box filled flat solid red with a thick black outline. All of these shapes are empty: no letters, no numbers inside them. Finish: "+STYLE+NEG.replace('no beige','no beige'),'3:4',[M+TILE[n]])
if __name__=='__main__':
  for j in {'plates':plates,'sprites':sprites,'covers':covers,'dress':dress}[sys.argv[1]](): print(json.dumps(j))
