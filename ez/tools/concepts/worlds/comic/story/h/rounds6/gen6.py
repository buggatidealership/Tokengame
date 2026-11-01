#!/usr/bin/env python3
# rounds6 (round H13): Hot off the press, second pass. New plates for the print shop: the painted drying wires taken out (the page draws
# its own wires, so the composition can change), and a blank painted surface added for the tally ("Printed at every close · N so far"),
# away from the sheets: a brass maker's plate on the press, or a chalkboard on an easel. Edits of rounds5's own plates, so the shop stays.
#   python3 gen6.py plates   > jobs-plates.txt ; ./run.sh jobs-plates.txt
import json,sys,os
D=os.path.dirname(os.path.abspath(__file__));R5=D+'/../rounds5/img/'
KEEP=("Edit this comic book picture. Keep everything exactly as it is: the same print shop, the same green printing press with red rollers, "
 "the same windows and city, the same ink cans and bench, the same composition, colours, ink line and flat Silver Age print style. Make only these changes: "
 "1) remove the thin black wires strung across the yellow wall, so the yellow wall is clean and flat; ")
STYLE=(" Drawn by hand in the picture's own style: confident black brush-and-nib ink line, thick outer contours and thin inner lines, flat bold printed colours, "
 "Ben-Day dots only in a few shadows. Bright daylight, high key. No people, no text, no letters, no numbers, no words, no logos, no watermark.")
PLATE={'brass':"2) bolt a blank flat rectangular name plate of polished gold brass onto the side of the green printing press, facing the viewer squarely, "
          "about a quarter of the picture wide and a third as tall as it is wide, with a rivet at each corner, a thick black ink outline and one hard white highlight stripe; "
          "the plate is completely empty: no engraving, no letters, no marks.",
       'brass2':"2) bolt a large blank flat rectangular name plate of polished gold brass onto the front of the green printing press's lower body, facing the viewer squarely, "
          "about forty percent of the picture wide and a third as tall as it is wide, with a rivet at each corner, a raised rim, a thick black ink outline and one hard white highlight stripe; "
          "the plate is completely empty: no engraving, no letters, no marks.",
       'slate':"2) add a blank black slate chalkboard in a plain wooden frame, standing on a small wooden easel on the floor in the foreground, facing the viewer squarely, "
          "about a third of the picture wide, landscape shaped; the slate is clean flat black with a few faint grey chalk smudges and nothing written on it."}
def job(name,prompt,ar,refs,res='2K',q='medium'):
  return {'name':name,'model':'gpt-image-2','input':{'prompt':prompt,'aspect_ratio':ar,'resolution':res,'quality':q,'output_format':'png','num_outputs':1},'refs':refs}
ONLY=sys.argv[2:]
def plates():
  for k,p in PLATE.items():
    if ONLY and k not in ONLY: continue
    yield job(f'p-{k}-9x16',KEEP+p+STYLE,'9:16',[R5+'shopa2-9x16-hd.jpg'])
    yield job(f'p-{k}-16x9',KEEP+p+STYLE,'16:9',[R5+'shopa-16x9-hd.jpg'])
if __name__=='__main__':
  for j in {'plates':plates}[sys.argv[1]](): print(json.dumps(j))
