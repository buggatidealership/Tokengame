#!/usr/bin/env python3
# batch.py a|b : runs the cast2 grid through hd.py (gpt-image-2, 1K medium) with each founder's poster as the reference.
import sys,json,subprocess,os
from concurrent.futures import ThreadPoolExecutor
D=os.path.dirname(os.path.abspath(__file__))
CH={'gpt':'Sam, in white plated armour with thin green light seams','claude':'Dario, in a rust-red wool coat over a cream turtleneck, round glasses, a worn notebook','grok':'Elon, in a black leather jacket with a black visor over his eyes','kimi':'the young pilot, in a navy flight suit with harness straps'}
BG={'gpt':'mint green','claude':'warm cream','grok':'deep purple','kimi':'navy blue'}
KEEP='Keep this exact character from the reference image: the same face, hair, build and outfit ({c}), recognisable at a glance as the same person. '
NOTXT=' No text, no letters, no numbers, no logos, no signs, no writing anywhere.'
FIN3D='Finish: a 3D-rendered painted character (modelled face and materials, soft lighting) with an American comic book finish on top: bold black ink contour lines, Ben-Day halftone dots only inside the shadows.'
A={
 'predict':'New moment: before the earnings report, he studies a glowing hologram of a stock chart line with one big arrow, chin in hand, eyes narrowed, focused and confident. Cool blue screen light on his face.',
 'wait':'New moment: waiting for the closing bell. He grips the edge of a table, leaning in, tense, jaw set, a big brass bell blurred in the foreground above him. Hard red rim light, sweat on the brow.',
 'win':'New moment: he has just won the round. A small gold crown sits on his head, he grins and raises a fist, gold confetti falling, warm gold key light.',
 'lose':'New moment: he has just lost the round. A giant red rubber stamp (blank face, no letters) slams down beside him with comic impact lines, he recoils, wincing, hair blown back, red light.',
 'ticket':'New moment: he holds up a shining blank golden ticket (plain gold foil with scalloped edges, nothing printed on it) proudly toward the viewer, a smug smile, gold light on his face.',
 'behind':'New moment: he is falling behind in the race. He runs, out of breath, glancing back over his shoulder in worry, speed lines behind him, a cold dim light.',
 'setting':None,
}
SET={'gpt':'Setting: he leans on a wire comic-book spinner rack at a night newsstand, the comic covers blank, warm shop light, rainy street.',
     'claude':'Setting: he stands under a theatre marquee of light bulbs in a night city, the marquee panel blank, looking up at it with his notebook open.',
     'grok':'Setting: he stands before a huge glowing green GPU chip on a server-room floor, arms crossed, the chip lighting him from below.',
     'kimi':'Setting: he stands in a boxing ring on a rooftop at sunset between skyscrapers, helmet under arm, the city behind him.'}
B={
 '3dink':FIN3D,
 'pop':'Finish: 1960s pop art comic panel in the style of Lichtenstein-era print: flat bold primary colours, heavy black outlines, big visible Ben-Day dots on the skin, a radiating sunburst background in yellow and red.',
 'cel':'Finish: Japanese anime cel animation frame: clean thin line art, flat colours with one hard-edged shadow tone, bright anime eyes kept true to his face, a soft painted anime sky background.',
 'noir':'Finish: noir comic, black brush ink and cross-hatching on white, heavy shadows, rain, one spot colour only (his signature colour), like a hard-boiled crime graphic novel.',
 'riso':'Finish: risograph print in three spot inks (fluorescent pink, teal, yellow) slightly out of register, grainy paper texture, flat shapes.',
}
def job(name,prompt,m):
  inp={'prompt':prompt,'resolution':'1K','quality':'medium','aspect_ratio':'1:1','output_format':'png'}
  if os.path.exists(f'{D}/img/{name}.jpg'): return name+' skip'
  r=subprocess.run(['python3',f'{D}/hd.py',name,'gpt-image-2',json.dumps(inp),f'{D}/ref/founder-{m}-anim.jpg'],capture_output=True,text=True)
  return (r.stdout+r.stderr)[-300:]
jobs=[]
which=sys.argv[1]
for m,c in CH.items():
  k=KEEP.format(c=c)
  if which=='a':
    for beat,t in A.items():
      t=t or SET[m]
      bg='' if beat in('setting',) else f' Background: plain saturated {BG[m]} with soft painted depth.'
      jobs.append((f'a-{m}-{beat}',k+t+' Square portrait, waist up, centred.'+bg+' '+FIN3D+NOTXT,m))
  else:
    for f,t in B.items():
      jobs.append((f'b-{m}-{f}',k+'Same pose as the reference, waist up, square, centred. '+t+NOTXT,m))
with ThreadPoolExecutor(6) as ex:
  for r in ex.map(lambda j:job(*j),jobs): print(r,flush=True)
