#!/usr/bin/env python3
# batch.py <set> : lbstyle paintings through hd.py. Sets: pose-n, pose-c, ground. Never prints the key.
import sys,json,subprocess,os
from concurrent.futures import ThreadPoolExecutor
D=os.path.dirname(os.path.abspath(__file__));R=D+'/../cast2/ref';C=D+'/../cast2/img'
CH={'gpt':'Sam, in white plated armour with thin green light seams','claude':'Dario, in a rust-red wool coat over a cream turtleneck, round glasses, a worn notebook','grok':'Elon, in a black leather jacket with a black visor over his eyes','kimi':'the young pilot, in a navy flight suit with harness straps'}
SPOT={'gpt':'green','claude':'rust red','grok':'violet','kimi':'cobalt blue'}
KEEP='Keep this exact character from the first reference image: the same face, hair, build and outfit ({c}), recognisable at a glance. Match the drawing style of the second reference image. '
NOTXT=' No text, no letters, no numbers, no logos, no signs, no writing anywhere.'
NOIR='Finish: hard-boiled noir comic, black brush ink and fine cross-hatching on off-white paper, deep blacks, falling rain drawn as thin white strokes, one spot colour only ({s}) on his own outfit, everything else black and white.'
CEL='Finish: 1990s Japanese anime cel frame: clean thin line art, flat colours with one hard-edged shadow tone and a small highlight, eyes true to his face, a soft painted anime background.'
P={'ticket':'He holds up a shining blank golden ticket (plain gold foil, scalloped edges, nothing printed) toward the viewer, a calm smug half smile; the gold foil is lit and glows on his face.',
   'chase':'He leans forward, hands in pockets, staring straight at the viewer from under a streetlamp, jaw set, about to make his move; a long shadow behind him.'}
CP={'ticket':'He holds up a shining blank golden ticket (plain gold foil, scalloped edges, nothing printed) toward the viewer with a confident grin, sparkles of light round the ticket.',
    'chase':'Tournament challenger pose: he points straight at the viewer, determined, wind in his hair and clothes, intense eyes.'}
G={
 'n-street':('gpt-image-2','16:9','Empty city street at night in the rain, seen from the kerb: two pools of light from two old streetlamps, left and right, wet cobbles reflecting them, a brick wall and a fire escape, puddles. Hard-boiled noir comic panel: black brush ink and cross-hatching on off-white paper, white rain strokes, deep black shadows. No people.'),
 'n-office':('gpt-image-2','16:9','A private detective office at night, seen straight at the back wall: bands of light and shadow thrown by venetian blinds across a plaster wall, a corkboard with blank index cards pinned in a row and loose red string, an empty desk edge at the bottom, a desk lamp. Hard-boiled noir comic panel: black brush ink and cross-hatching on off-white paper. No people.'),
 'n-window':('gpt-image-2','16:9','A large dark office window at night streaked with rain, seen from inside: city lights blurred beyond it, the glass wet with drips and droplets catching the light, a dark wooden window frame. Hard-boiled noir comic panel, black brush ink and cross-hatching on off-white paper. No people.'),
 'n-chapter':('gpt-image-2','9:16','A tall narrow alley at night in heavy rain, one bare bulb over a back door at the far end, wet ground reflecting it, fire escapes above, a long empty sidewalk, plenty of empty black sky at the top. Hard-boiled noir comic splash page, black brush ink and cross-hatching on off-white paper, white rain strokes. No people.'),
 'm-sign':('gpt-image-2','16:9','A city street at night in the rain drawn in hard-boiled noir black ink and cross-hatching, the only colour is one huge blank rectangular billboard on the brick wall, printed in 1960s pop art: flat warm yellow with red Ben-Day dots fading in at its edges, lit by two lamps; wet cobbles reflect the yellow. No people.'),
 'c-arena':('nano-banana-pro','16:9','An empty anime tournament arena at golden hour: a round stone fighting stage in the middle, tiered stands with no faces, banners without writing, a big painted sky with long clouds. 1990s Japanese anime background painting, clean cel line art, flat colour with one hard shadow tone.'),
 'c-board':('nano-banana-pro','16:9','An anime school sports club room in afternoon light: a large blank green chalkboard on the back wall with chalk dust, a wooden bench, lockers at the side, sunlight through a window making a warm patch on the floor. 1990s Japanese anime background painting, clean cel line art, flat colour with one hard shadow tone. Chalkboard completely blank.'),
 'c-sky':('nano-banana-pro','16:9','A rooftop above a city at dusk in anime style: a chain-link fence, water tower, the sky a gradient from orange to violet with long clouds, the first lights of the city below. 1990s Japanese anime background painting, clean cel line art, flat colours. No people.'),
}
def run(name,model,inp,refs):
  if os.path.exists(f'{D}/img/{name}.jpg'): return name+' skip'
  r=subprocess.run(['python3',f'{D}/hd.py',name,model,json.dumps(inp)]+refs,capture_output=True,text=True)
  return (r.stdout+r.stderr)[-300:]
jobs=[];s=sys.argv[1]
if s=='pose-n':
  for m,c in CH.items():
    for p,t in P.items():
      jobs.append((f'n-{m}-{p}','gpt-image-2',{'prompt':KEEP.format(c=c)+t+' Square, waist up, centred, rainy night street behind. '+NOIR.format(s=SPOT[m])+(' The golden ticket is the only other colour: gold.' if p=='ticket' else '')+NOTXT,'resolution':'1K','quality':'medium','aspect_ratio':'1:1','output_format':'png'},[f'{R}/founder-{m}-anim.jpg',f'{C}/b-{m}-noir.jpg']))
if s=='pose-c':
  for m,c in CH.items():
    for p,t in CP.items():
      jobs.append((f'c-{m}-{p}','nano-banana-pro',{'prompt':KEEP.format(c=c)+t+' Square, waist up, centred, plain sky background. '+CEL+NOTXT,'resolution':'1K','aspect_ratio':'1:1'},[f'{R}/founder-{m}-anim.jpg',f'{C}/b-{m}-cel2.jpg']))
if s=='hd':
  for n in ['n-street','n-office']:
    mo,ar,t=G[n];jobs.append((n+'-2k',mo,{'prompt':t+NOTXT,'resolution':'2K','quality':'high','aspect_ratio':ar,'output_format':'png'},[]))
if s=='ground':
  for n,(mo,ar,t) in G.items():
    inp={'prompt':t+NOTXT,'resolution':'1K','aspect_ratio':ar}
    if mo=='gpt-image-2': inp.update(quality='medium',output_format='png')
    jobs.append((n,mo,inp,[]))
with ThreadPoolExecutor(6) as ex:
  for r in ex.map(lambda j:run(*j),jobs): print(r,flush=True)
