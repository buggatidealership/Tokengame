#!/usr/bin/env python3
# cast6 batch: Meet the models that stands out. Trading floor, Silver Age flat print, five levers (hero light, scale, spot colour, camera angle, tickets as objects).
# python3 batch.py <filter|all>
import json,os,sys,subprocess
from concurrent.futures import ThreadPoolExecutor
D=os.path.dirname(os.path.abspath(__file__))
STY=("Drawn Silver Age American comic book art, a printed 1960s comic page: a clean confident black brush-and-nib ink line with varied weight, "
 "flat bright printed colours, Ben-Day dot shading only in a few small shadows, the colour plates a hair out of register. Bright, flashy, "
 "never dark, never beige. Hand-drawn and printed, not a 3D render, not photographic, no airbrushed gradients.")
NOTXT=" No text, no letters, no numbers, no words, no logos, no symbols, no writing anywhere, no watermark."
ISO=" The object alone, centred, isolated on a plain flat pure white background."
MC={'claude':'bright burnt orange','gpt':'bright emerald green','grok':'charcoal black with electric violet trim','kimi':'bright electric blue'}
TICKET=("Redraw the reference layout as a 1960s stock exchange floor ticket printed on {c} card stock with brass rivets in the corners, "
 "with a big polished mahogany boardroom portrait frame printed into its upper right half and a small green banker's lamp on top of the frame. "
 "Follow the reference layout exactly: keep every shape in the same position and size, but draw each shape as a real object, never as a flat box. "
 "The left stub is printed in two halves, bright green on top and bright red below, separated from the body by a perforation of punched holes; the stub's round seal and tall strip are blank and bright gold yellow. "
 "The round medallion is a blank brass exchange badge. The yellow arrow shape is a blank yellow pennant flag. The small brass rectangle is a small punched brass tag. "
 "The three black fields are blank black quote-board panels with brass rims and rivets. The five small circles are five unlit round indicator lamps with clear glass and chrome rims. "
 "The ticket body is printed with an engraved ink border and fine line ornament in its corners. Every object is blank and empty. "
 "The white window inside the frame stays flat pure white, completely empty. The area outside the ticket is plain flat pure white. The ticket fills the whole frame, seen perfectly front-on and flat.")
LIT={'grok':"Lit like a hero: one warm golden spotlight from straight above makes the whole ticket glow gold-rimmed, with a hard gold rim light along its top and right edges.",
 'claude':"Lit dramatically by one hard key light from the upper left, with a bright emerald green spot light rimming its right edge and green bounce light on the brass.",
 'gpt':"Lit dramatically by one hard key light from the upper left, with a bright red spot light rimming its right edge and red bounce light on the brass.",
 'kimi':"Lit dramatically by one hard key light from the upper left, with a bright red spot light rimming its right edge and red bounce light on the brass."}
B={'resolution':'1K','quality':'medium','output_format':'png'}
def J():
  j=[]
  for m,c in MC.items():
    j.append((f't-base-{m}',dict(B,aspect_ratio='3:4',prompt=TICKET.format(c=c)+" "+STY+NOTXT),[f'{D}/guide/p-body-{m}.png']))
    j.append((f't-lit-{m}',dict(B,aspect_ratio='3:4',prompt=TICKET.format(c=c)+" "+LIT[m]+" Strong flat black cast shadows inside the ticket, Silver Age chiaroscuro, but the colours stay bright. "+STY+NOTXT),[f'{D}/guide/p-body-{m}.png']))
  j.append(('g-base',dict(B,aspect_ratio='3:4',prompt="Redraw the reference layout as the left stub of a stock exchange floor ticket, printed in shiny gold foil with brass rivets. Follow the reference layout exactly: the stub fills the left part of the frame at the same position and size; its round seal and tall strip are blank gold panels; a perforation of punched holes runs down its right edge. Everything to the right of the stub, and around it, is plain flat pure white. "+STY+NOTXT),[f'{D}/guide/p-gold.png']))
  floor="a bright busy 1960s stock exchange trading floor, walls painted bright teal green, red columns, octagonal trading posts, traders in colourful jackets, paper order slips and ticker tape in the air"
  for a,ar in (('p','9:16'),('d','16:9')):
    j.append((f'pa-hero-{a}',dict(B,aspect_ratio=ar,prompt=f"Scene: {floor}. One single warm golden spotlight beam falls from a high skylight straight down onto an empty round brass winner's podium in the centre foreground; the podium glows gold; the rest of the room is in cooler teal and blue shade. The crowd stands in a ring around the podium, everyone turned towards it and looking up, some pointing, some with hats in hand. The space just above the podium is open air. "+STY+NOTXT),[]))
    j.append((f'pb-wall-{a}',dict(B,aspect_ratio=ar,prompt=f"Scene: the far wall of {floor}. On the wall hangs one gigantic ornate gilded portrait frame, many times taller than the people, its canvas completely empty flat pure white. Directly under the frame runs one long wide blank black quote board with a brass rim, completely empty. Tiny traders crowd the floor below, waving slips up at the giant frame; their size shows how huge the frame is. Seen head-on. "+STY+NOTXT),[]))
    j.append((f'pc-spot-{a}',dict(B,aspect_ratio=ar,prompt=f"Scene: {floor}, seen from the balcony. Three big theatre spotlights hang from the gallery rail and throw three hard pools of coloured light across the bright floor: one gold, one emerald green, one red; the traders caught in each pool are tinted by its colour and cast long hard black shadows. Graphic, dramatic, but bright. The middle of the picture is open floor with no figures. "+STY+NOTXT),[]))
    j.append((f'pd-up-{a}',dict(B,aspect_ratio=ar,prompt=f"Scene: a dramatic worm's-eye view looking straight up at a towering stock exchange quote board that fills the sky of the picture, its rows of blank black panels with brass rims receding upwards in steep perspective, a skylight and ticker tape falling from above; at the bottom edge, traders' hands and arms in colourful sleeves reach up towards the board, waving slips. Bright teal and red architecture. "+STY+NOTXT),[]))
    j.append((f'pe-floor-{a}',dict(B,aspect_ratio=ar,prompt=f"Scene: open outcry on {floor}, seen from just behind the crowd at shoulder height: the backs of traders' heads fill the bottom third of the picture, many arms raised. The top two thirds of the picture is the bright teal wall and air full of ticker tape, with no figures in it. "+STY+NOTXT),[]))
  j.append(('cs-arms',dict(B,aspect_ratio='16:9',prompt="A flat cut-paper silhouette of a crowd's heads, hats and raised arms and hands, solid flat deep violet, seen from behind, filling the bottom of the frame, with an irregular top edge of hands and fingers."+ISO+" "+STY+NOTXT),[]))
  j.append(('k-hook',dict(B,aspect_ratio='9:16',prompt="A vertical length of heavy brass chain hanging straight down, ending in a brass S-hook, drawn as a single prop."+ISO+" "+STY+NOTXT),[]))
  for n,sl in (('h-red','bright red jacket sleeve with a white shirt cuff'),('h-teal','bright teal jacket sleeve with a white shirt cuff and a gold cufflink')):
    j.append((n,dict(B,aspect_ratio='3:4',prompt=f"A trader's arm in a {sl} rises from the bottom edge of the frame, the hand raised high gripping the lower left corner of a big upright blank card. The card is flat pure white, completely empty, and fills the upper right three quarters of the frame. The thumb is in front of the card, the fingers behind it. "+ISO+" "+STY+NOTXT),[]))
  for a,ar in (('p','9:16'),('d','16:9')):  # the pick, repainted at 2K high
    j.append((f'pb2-wall-{a}',dict(resolution='2K',quality='high',output_format='png',aspect_ratio=ar,prompt=f"Scene: the far wall of {floor}. On the wall hangs one gigantic ornate gilded portrait frame, many times taller than the people, carved with curls and leaves, its canvas completely empty flat pure white. Directly under the frame runs one long wide blank black quote board with a brass rim and rivets, completely empty. Tiny traders crowd the floor below, waving slips up at the giant frame; their size shows how huge the frame is. Seen head-on. "+STY+NOTXT),[]))
  return j
def run(a):
  name,inp,refs=a
  if os.path.exists(f'{D}/img/{name}.jpg'):return name+' exists'
  r=subprocess.run(['python3',D+'/hd.py'] if False else ['env']+(['BIG=1'] if '2' in name.split('-')[0] else [])+['python3',D+'/hd.py',name,'gpt-image-2',json.dumps(inp)]+refs,capture_output=True,text=True);return (r.stdout+r.stderr)[-300:]
if __name__=='__main__':
  f=sys.argv[1];js=[x for x in J() if f=='all' or f in x[0]];print(len(js),'jobs',flush=True)
  with ThreadPoolExecutor(10) as ex:
    for r in ex.map(run,js):print(r,flush=True)
