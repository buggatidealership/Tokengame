#!/usr/bin/env python3
# Round H6 tiles3: three painted takes on "show who won" in the T3 tile itself. gen.py <take> <round> ; winners from ROUNDS (see win.json)
import json,sys,subprocess,os
D=os.path.dirname(os.path.abspath(__file__));M=D+'/../../../../../../../media/'
WIN=json.load(open(D+'/win.json'))
STY=("Keep the style of the first reference exactly: a 1940s Golden Age American comic book cover painting on aged yellowed newsprint, coarse Ben-Day dots, "
"slightly mis-registered four-colour print, thick confident brush ink outlines. Keep the same scene, the same objects, the same camera angle and the same colours, so it is "
"instantly the same picture; the existing gold crowned object stays where it is. ")
SAFE=(" Placement matters, because the page lays a price circle over the top-right corner and a ribbon over the bottom quarter, and crops the top and bottom eighth: put the added figure or medallion in the middle band of the picture, between 25% and 72% of the height, centred or left of centre, never in the top-right corner and never in the bottom quarter.")
END=(" No text, no letters, no numbers, no words, no logos other than the given mark, no frame, no border. Full-bleed art filling the whole canvas.")
def founders(ws): return ' and '.join(f'the man in reference {i+2}' for i in range(len(ws)))
def prompt(take,ws):
  n=len(ws)
  if take=='A':
    if not ws: return STY+("Nobody won this round: in the middle of the picture, on the ground just left of centre, lies a golden crown, knocked over on its side, dull and dented, with no one to wear it. Add no people."+END)
    who=founders(ws)
    return STY+(f"Add {who} into this scene as the winner{'s' if n>1 else ''}: standing in the lower part of the picture beside the gold crowned object, painted in exactly the same Golden Age comic style as the scene "
      f"(same ink, same dots, same light falling on {'them' if n>1 else 'him'}), each wearing a small golden crown and raising a fist in triumph, keeping each face, hair, glasses, eyewear and clothes exactly as in the reference. "
      f"{'Both stand side by side, the same size. ' if n>1 else ''}The figure{'s take' if n>1 else ' takes'} about a third of the picture's height and must not cover the gold crowned object. Only "+('these two' if n>1 else 'this one')+" person"+('s' if n>1 else '')+"; no other people."+END)
  if take=='B':
    if not ws: return STY+("Nobody won this round: the gold crowned object loses its gold: it is plain and grey with a crack across it, and its crown lies broken beside it. Add no symbols."+END.replace(' other than the given mark',''))
    if n>1: return STY+("The round was a tie between two winners. On the winners' gold plate (or on the gold crowned object), engrave the two marks given in references 2 and 3 side by side, deeply embossed into the gold leaf like a struck coin, each copied exactly in shape from its reference, gold on gold with dark ink in the recesses, large and clearly readable."+END.replace('the given mark','the two given marks'))
    return STY+("On the gold crowned object (the winner's plate, sign or panel), engrave the mark given in reference 2, deeply embossed into the gold leaf like a struck coin, copied exactly in shape from the reference, gold on gold with dark ink in the recesses, large and clearly readable, filling most of the gold surface. Change nothing else."+END)
  if take=='C':
    if not ws: return STY+(f"Nobody won this round: hang four small round tarnished tin medallions in a row across the upper part of the scene, each a cameo portrait of one of the men in references 2 to 5 (keep each face, hair and eyewear), and strike each one through with a bold red ink cross. No crown anywhere."+END)
    return STY+(f"Set into the scene a large round golden medallion{'s' if n>1 else ''} with a crown on top, mounted on or above the gold crowned object as if it belongs there (on a chain, a stand or a bracket), {'one for each winner, side by side, ' if n>1 else ''}"
      f"each holding a raised cameo portrait of {founders(ws) if n==1 else 'one of the men in references 2 and 3'}, head and shoulders, keeping the face, hair and eyewear exactly, painted as gold relief with ink lines and the same light as the scene. "
      f"The medallion{'s take' if n>1 else ' takes'} about a third of the picture's width."+END)
def refs(take,r,ws):
  L=[M+f'tile-r{r}-t3.jpg']
  if take=='B': L+= [D+f'/ref/mark-{w.lower()}.png' for w in ws]
  elif take=='C' and not ws: L+= [M+f'founder-{w}-anim.jpg' for w in ['gpt','claude','grok','kimi']]
  else: L+= [M+f'founder-{w.lower()}-anim.jpg' for w in ws]
  return L
if __name__=='__main__':
  take,r=sys.argv[1],sys.argv[2];ws=WIN[r];q=sys.argv[3] if len(sys.argv)>3 else 'medium'
  p=prompt(take,ws)
  if os.environ.get('SAFE'): p=p.replace(END,SAFE+END)
  inp={"prompt":p,"aspect_ratio":"3:4","resolution":"1K","quality":q,"output_format":"png","num_outputs":1}
  name=f'{take.lower()}-r{r}'+(sys.argv[4] if len(sys.argv)>4 else '')
  subprocess.run(['python3',D+'/hd.py',name,'gpt-image-2',json.dumps(inp)]+refs(take,r,ws))
