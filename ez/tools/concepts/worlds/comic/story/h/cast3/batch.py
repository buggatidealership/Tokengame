#!/usr/bin/env python3
# cast3 batch: five worlds x three drawn styles. Panels: each founder in the world's scene (ref = today's poster); props: blank painted
# surfaces (cut out later) that carry live page text. python3 batch.py [panels|props|all] [filter]
import json,os,sys,subprocess
from concurrent.futures import ThreadPoolExecutor
D=os.path.dirname(os.path.abspath(__file__));M='/home/user/Tokengame/ez/media'
WHO={'gpt':"Sam, in white plated armour with thin green light seams",'claude':"Dario, in a rust-red wool coat over a cream turtleneck, round glasses",
 'grok':"Elon, in a black leather jacket with a black visor over his eyes",'kimi':"the young pilot, in a navy flight suit with harness straps"}
COL={'gpt':'emerald green','claude':'burnt orange','grok':'electric violet','kimi':'electric blue'}
STY={
 'noir':"Drawn noir comic book art like a hard-boiled crime graphic novel: heavy black brush ink, dry-brush texture, ink splatter, cross-hatching, deep solid blacks, grey ink washes; everything is black ink except ONE spot colour, {c}, which carries the light. Hand-drawn on paper, not a 3D render, not photographic, no smooth digital gradients.",
 'silver':"Drawn Silver Age American comic book art, a printed 1960s comic page: confident black ink line with varied weight, flat printed colours in a limited palette (black, {c}, gold yellow, deep red, deep green), Ben-Day dot shading inside the shadows only, slight print misregistration. Hand-drawn and printed, not a 3D render, not photographic, no gradients.",
 'mignola':"Drawn comic book art with huge flat shapes of solid black shadow, minimal interior lines, angular simplified forms and strong graphic silhouettes, a few flat muted colours plus {c} as the one bright accent, like a modern horror-noir graphic novel. Hand-drawn, not a 3D render, not photographic, no gradients."}
KEEP="Keep this exact character from the reference image: the same face, hair, build and outfit ({w}), recognisable at a glance as the same person, drawn in the style below. "
END=" Square panel. The character fills the upper two thirds; the lower third of the frame is dark empty foreground with nothing in it. No text, no letters, no numbers, no logos, no signs, no writing anywhere, no watermark."
WORLD={
 'weigh':"Scene: fight-night weigh-in. He stands on the platform of an old heavy balance scale on a stage, flexing in a stare-down pose toward the viewer, press camera flashes bursting in the dark crowd behind, one hanging stage lamp overhead.",
 'tape':"Scene: fight-night broadcast portrait. Waist up, fists raised in a classic boxer's guard, under one hard spotlight in a dark arena, ring ropes behind him.",
 'walk':"Scene: the walkout. He walks out of a smoky entrance tunnel toward the ring in a satin fight robe worn over his outfit, hood down, searchlights cutting through smoke, crowd silhouettes at the sides.",
 'lineup':"Scene: a police line-up. He stands against a wall painted with plain horizontal height-chart lines (lines only, no numbers), hard overhead light, looking straight at the viewer, hands at his sides.",
 'cards':"Scene: a back-room poker game. He sits at a green felt card table in a smoky room under one hanging lamp, stacks of poker chips in front of him, holding his cards close, a sly look at the viewer."}
PROPS={
 'weigh':("1:1","An old weigh-in scale's big round dial face, perfectly front-on, a completely blank smooth black enamel face with no markings and no needle, a heavy brass bezel ring with rivets."),
 'tape':("16:9","A wide arena scoreboard panel seen perfectly head-on: a completely blank black riveted steel board divided into four equal columns by thin brass strips, a brass frame."),
 'walk':("1:1","A hanging black satin fight banner seen perfectly head-on, completely blank, gold fringe along the bottom edge, gold rope trim, hung from a brass rod."),
 'lineup':("16:9","A classic black police mugshot letter board placard seen perfectly head-on, completely blank with empty horizontal grooves, a thin wooden frame."),
 'cards':("16:9","A small engraved brass table plaque seen perfectly head-on, completely blank, bevelled edges, four screw heads."),
 'chipg':("1:1","One single casino poker chip seen perfectly front-on, deep green with white edge spots, a completely blank centre."),
 'chipr':("1:1","One single casino poker chip seen perfectly front-on, deep red with white edge spots, a completely blank centre.")}
PEND=" The object alone, centred, filling most of the frame, isolated on a plain flat pure white background, no shadow on the background. No text, no letters, no numbers, no logos, no writing, no watermark."
def run(a):
  name,inp,refs=a
  if os.path.exists(f'{D}/img/{name}.jpg'):return name+' exists'
  r=subprocess.run(['python3',D+'/hd.py',name,'gpt-image-2',json.dumps(inp)]+refs,capture_output=True,text=True);return (r.stdout+r.stderr)[-300:]
def jobs(kind,flt):
  J=[]
  base={'resolution':'1K','quality':'medium','output_format':'png'}
  if kind in('panels','all'):
    for w,wp in WORLD.items():
      for s,sp in STY.items():
        for m in WHO:
          n=f'p-{w}-{s}-{m}'
          J.append((n,dict(base,aspect_ratio='1:1',prompt=KEEP.format(w=WHO[m])+wp+' '+sp.format(c=COL[m])+END),[f'{M}/founder-{m}-anim.jpg']))
  if kind in('props','all'):
    for p,(ar,pp) in PROPS.items():
      for s,sp in STY.items():
        J.append((f'x-{p}-{s}',dict(base,aspect_ratio=ar,prompt=pp+' '+sp.format(c='gold')+PEND),[]))
  return [j for j in J if not flt or flt in j[0]]
if __name__=='__main__':
  J=jobs(sys.argv[1],sys.argv[2] if len(sys.argv)>2 else '')
  print(len(J),'jobs',flush=True)
  with ThreadPoolExecutor(int(os.environ.get('PAR','6'))) as ex:
    for r in ex.map(run,J):print(r,flush=True)
