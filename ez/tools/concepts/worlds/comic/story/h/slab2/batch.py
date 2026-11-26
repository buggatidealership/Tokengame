#!/usr/bin/env python3
# batch.py <set> [only-names...]: the slab2 pose sets through hd.py (gpt-image-2 1K medium, 1:1, one reference image).
# A pose set = one image per founder per state (win, fail, pass, predict) per finish; reused by every round.
# Every image carries a BLANK speech balloon painted into the art (upper left), so the page letters the call into it.
import sys,json,subprocess,os
from concurrent.futures import ThreadPoolExecutor
D=os.path.dirname(os.path.abspath(__file__));C=os.path.join(D,'..','cast2')
CH={'gpt':'Sam, in white plated armour with thin green light seams','claude':'Dario, in a rust-red wool coat over a cream turtleneck, round glasses, a worn notebook','grok':'Elon, in a black leather jacket with a black visor over his eyes','kimi':'the young pilot, in a navy flight suit with harness straps'}
BG={'gpt':'mint green','claude':'warm cream and amber','grok':'deep purple','kimi':'navy blue'}
KEEP='Keep this exact character from the reference image: the same face, hair, build and outfit ({c}), recognisable at a glance as the same person. '
NOTXT=' The speech balloon is completely empty and white inside. No text, no letters, no numbers, no logos, no signs, no writing anywhere, nothing inside the balloon.'
COMP=(' Composition: square comic panel. The character fills the right two thirds, waist up, his head in the upper right, turned slightly left. '
      'In the upper LEFT corner, clear of his face, one empty white comic speech balloon (an oval about a third of the panel wide, bold black ink outline, '
      'a short pointed tail aimed at his mouth), drawn in the same ink and light as the rest of the picture, as in a printed comic.')
ST={
 'predict':'Moment: before the earnings report he is stating his prediction out loud, one hand raised as if making a point, confident, mouth slightly open mid-sentence. No charts, no arrows, no screens.',
 'pass':'Moment: the market proved him right, but someone else was closer. A small satisfied nod and a half smile, thumbs up at chest height, calm. No crown, no confetti.',
 'win':'Moment: he has just won the round. A small gold crown sits on his head, he grins and raises a fist, gold confetti falling, warm gold key light.',
 'fail':'Moment: he went the wrong way. A giant red rubber stamp (its face blank, no letters) slams into the panel from the lower left with comic impact lines, he recoils, wincing, hair blown back, red light on him.',
}
FIN={
 '3d':'Finish: a 3D-rendered painted character (modelled face and materials, soft lighting) with an American comic book finish on top: bold black ink contour lines, Ben-Day halftone dots only inside the shadows. Background: saturated {bg} with soft painted depth.',
 'pop':'Finish: 1960s pop art comic panel, Lichtenstein-era print: flat bold primary colours, heavy black outlines, big visible Ben-Day dots on the skin, a radiating sunburst background in his {bg} with yellow.',
 'cel':'Finish: Japanese anime cel animation frame: clean thin line art, flat colours with one hard-edged shadow tone, bright anime eyes kept true to his face, a soft painted anime sky background tinted {bg}.',
 'noir':'Finish: noir comic, black brush ink and cross-hatching, heavy shadows, rain, one spot colour only (red), like a hard-boiled crime graphic novel. The balloon stays white.',
}
REF={'3d':lambda m:f'{C}/ref/founder-{m}-anim.jpg','pop':lambda m:f'{C}/img/b-{m}-pop.jpg','cel':lambda m:f'{C}/img/b-{m}-cel2.jpg','noir':lambda m:f'{C}/img/b-{m}-noir.jpg'}
def job(name,prompt,ref,model='gpt-image-2'):
  inp={'prompt':prompt,'resolution':'1K','quality':'medium','aspect_ratio':'1:1','output_format':'png'}
  if model!='gpt-image-2': inp={'prompt':prompt,'resolution':'1K','aspect_ratio':'1:1'}
  if os.path.exists(f'{D}/img/{name}.jpg'): return name+' skip'
  r=subprocess.run(['python3',f'{D}/hd.py',name,model,json.dumps(inp),ref],capture_output=True,text=True)
  return (r.stdout+r.stderr)[-300:]
fin=sys.argv[1];only=sys.argv[2:]
jobs=[]
for m,c in CH.items():
  for s,t in ST.items():
    n=f'{fin}-{m}-{s}'
    if only and n not in only: continue
    jobs.append((n,KEEP.format(c=c)+t+COMP+' '+FIN[fin].format(bg=BG[m])+NOTXT,REF[fin](m)))
with ThreadPoolExecutor(6) as ex:
  for r in ex.map(lambda j:job(*j),jobs): print(r,flush=True)
