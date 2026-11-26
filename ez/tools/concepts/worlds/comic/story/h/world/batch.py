#!/usr/bin/env python3
# world (Round H16): three worlds, one establishing panel per chapter (ch4 reuses the live vault and chip).
# python3 batch.py <filter|all>   (needs HEDRA_API_KEY; hd.py never prints it)
import json,os,sys,subprocess
from concurrent.futures import ThreadPoolExecutor
D=os.path.dirname(os.path.abspath(__file__));REF=os.path.abspath(D+'/../../../../../../../media/bet-chip-h2.jpg')
STY=("Art style: take ONLY the art style of the reference image, none of its content. A painted American comic illustration: clean confident black ink outlines on every part, "
 "comic Ben-Day dot shading only inside the shadows, painted light: one warm gold key light from behind the subject throwing soft gold rays, a green rim light on the left side, "
 "a red rim light on the right side, the subject sharp and clearly seen against a deep black void. Saturated black, dark green, red and gold. Not a photograph, not a 3D render.")
NOT=" No text, no letters, no numbers, no words, no logos, no symbols, no signage, no people, no faces, no watermark."
TOP=" Keep the top quarter of the picture calm dark void for a lettered headline."
W={
 # A: the exchange building at night, floor by floor, down to the vault
 'a1':"An old stone stock exchange building at night seen from the street, its columns and steps, a big brass closing bell hanging over the main door, four tall lit windows above the door glowing gold, wet street reflecting the light.",
 'a2':"Inside a grand empty trading floor at night: four brass trading posts in a row, each lit by its own lamp, behind them one huge blank black quote board on the far wall with brass rims, empty and dark, paper slips on the floor.",
 'a3':"A records room deep inside the exchange: tall steel filing cabinets and card-catalogue drawers in rows receding into darkness, one drawer pulled open glowing gold from inside, stacks of graded cards in clear slabs on a desk under a green banker's lamp.",
 'a5':"An old brass elevator cage rising up a dark shaft, its floor-indicator dial with a needle above the gate, gold light spilling down from the top of the shaft, cables and counterweights.",
 # B: one circuit board, every chapter a part, a gold trace carries you to the chip and vault
 'b1':"A close view of a green circuit board seen from above at an angle: a large quartz clock crystal component in a silver can in the centre, four empty processor sockets around it, glowing gold traces running away down the board.",
 'b2':"Four square processor chips seated in sockets in a row on a green circuit board, each lit by its own small lamp, behind them a tall row of blank LED bar-meter components like a scoreboard, gold traces between them.",
 'b3':"Long rows of memory modules (RAM sticks) standing in their slots on a green circuit board, receding into darkness in perspective, each module with blank black memory chips, one module at the front glowing gold.",
 'b5':"A single gold power connector on the edge of a green circuit board with one thick gold trace leading off the edge of the board into darkness, a small blinking indicator component beside it, sparks of light travelling along the trace.",
 # C: the ticker tape, one strip of paper running through the void past one object per chapter
 'c1':"An antique stock ticker machine under a glass bell jar on a wooden base, a long curling strip of paper tape pouring out of it and looping down out of the picture.",
 'c2':"A long strip of paper ticker tape curling through the void and feeding into a tall antique tote board on brass legs with four blank black slots in a column, each slot lit by a small bulb.",
 'c3':"A long strip of paper ticker tape being cut into slips by a brass guillotine, the slips falling into an open wooden card-file drawer full of filed slips, the drawer glowing gold from inside.",
 'a4h':"A narrow stone staircase going down into a dark basement, at the bottom a round steel vault door glows gold at its edges, a brass handrail catching the light.",
 'b4h':"One glowing gold trace running across a dark green circuit board towards the edge of a large square chip with four black dies in the distance, the trace bright with travelling light.",
 'c4h':"A long strip of paper ticker tape snaking down through the dark and feeding into a narrow slot in a huge round steel vault door, gold light leaking from the slot.",
 'c5':"The blank tail end of a paper ticker tape still coming out of an antique ticker machine, curling into darkness, a brass desk clock beside it.",
}
B={'resolution':'1K','quality':'medium','output_format':'png','aspect_ratio':'3:4'}
def J():return [(k,dict(B,prompt="Scene: "+v+(TOP if k.endswith('1') else '')+" "+STY+NOT),[REF]) for k,v in W.items()]
def run(a):
  n,inp,refs=a
  if os.path.exists(f'{D}/img/{n}.jpg'):return n+' exists'
  r=subprocess.run(['python3',D+'/hd.py',n,'gpt-image-2',json.dumps(inp)]+refs,capture_output=True,text=True);return (r.stdout+r.stderr)[-300:]
if __name__=='__main__':
  f=sys.argv[1];js=[x for x in J() if f=='all' or x[0].startswith(f)];print(len(js),'jobs',flush=True)
  with ThreadPoolExecutor(12) as ex:
    for r in ex.map(run,js):print(r,flush=True)
