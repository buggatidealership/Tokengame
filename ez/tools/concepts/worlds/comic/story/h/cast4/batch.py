#!/usr/bin/env python3
# cast4 batch: Meet the models redrawn as painted tickets in three worlds (Silver Age line, flat print).
# python3 batch.py <kind> [filter]   kind: tickets | gold | grounds | props | all
import json,os,sys,subprocess
from concurrent.futures import ThreadPoolExecutor
D=os.path.dirname(os.path.abspath(__file__))
STY=("Drawn Silver Age American comic book art, a printed 1960s comic page: a clean confident black brush-and-nib ink line with varied weight, "
 "flat bright printed colours, Ben-Day dot shading only in a few small shadows, the colour plates a hair out of register. Bright, flashy and cheerful, "
 "daylight colours, never dark, never beige. Hand-drawn and printed, not a 3D render, not photographic, no airbrushed gradients.")
NOTXT=" No text, no letters, no numbers, no words, no logos, no symbols, no writing anywhere, no watermark."
MC={'claude':'bright burnt orange','gpt':'bright emerald green','grok':'charcoal black with electric violet trim','kimi':'bright electric blue'}
W={
 'gal':{'name':'The portrait gallery',
   'ticket':"a museum admission ticket printed on {c} card stock, with a carved and gilded picture frame printed into its upper right (a Harry Potter style portrait frame with ornate gold mouldings, curls and a little brass picture lamp on top)",
   'gold':"the left stub of a museum admission ticket, printed in shiny gold foil with ink engraving and a small gold rosette",
   'ground':"Scene: a grand bright portrait gallery in a museum, deep red walls with gold mouldings, rows of gilded empty picture frames on the walls, polished parquet floor, a crystal chandelier, sunlight from tall windows, 1960s visitors in colourful clothes strolling, pointing and whispering at the frames",
   'fields':"The round medallion is a blank gold museum medal. The arrow shape is a gold ribbon banner with folded ends. The small rectangle under it is a small blank enamel name tag in deep red. The wide field is a big blank engraved brass plaque with four screws. The two fields under it are two smaller blank brass label plates with screws. The five small circles are five tiny empty oval gilt frames, their insides deep red velvet.",
   'sign':"a small gilded museum wall placard, a wide rectangular brass plate in an ornate gold frame, its plate a bright warm yellow"},
 'ex':{'name':'The trading floor',
   'ticket':"a 1960s stock exchange floor ticket printed on {c} card stock with brass rivets in the corners and a punched hole, with a dark wooden boardroom portrait frame printed into its upper right (a polished mahogany frame with a little brass plate area and a green banker's picture lamp on top)",
   'gold':"the left stub of a stock exchange floor ticket, printed in shiny gold foil with brass rivets",
   'ground':"Scene: a bright busy 1960s stock exchange trading floor with walls painted bright teal green and red columns, traders in colourful jackets waving paper order slips and shouting, a huge blank quote board high on the wall with empty slots, paper slips and ticker tape flying like confetti, octagonal trading posts, tall windows with daylight",
   'fields':"The round medallion is a blank brass exchange badge. The arrow shape is a blank pennant flag in bright yellow. The small rectangle under it is a small punched brass tag. The wide field is a big blank black quote-board panel with a brass rim. The two fields under it are two smaller blank black quote-board panels with brass rims. The five small circles are five unlit round indicator lamps with clear glass and chrome rims.",
   'sign':"a wide blank chalkboard slate in a wooden frame hung on a trading post, the slate a deep green"},
 'mid':{'name':'The midway',
   'ticket':"a carnival ride ticket with scalloped edges, printed on {c} card stock, with a funhouse mirror frame ringed with glowing round light bulbs printed into its upper right (a red and gold carnival marquee frame)",
   'gold':"the left stub of a carnival ride ticket with a scalloped edge, printed in shiny gold foil ringed with tiny light bulbs",
   'ground':"Scene: a sunny seaside carnival midway in the 1960s, red and white striped tents, game booths with prize toys, a ferris wheel and a roller coaster behind, strings of light bulbs, blue sky with puffy clouds, a happy crowd with balloons and candy floss",
   'fields':"The round medallion is a blank gold carnival token. The arrow shape is a blank yellow carnival pennant with a scalloped end. The small rectangle under it is a small blank red game-booth tag. The wide field is a big blank red prize sign with a ring of small light bulbs around it. The two fields under it are two smaller blank bright blue booth signs with scalloped tops. The five small circles are five big unlit round light bulbs in chrome sockets.",
   'sign':"a wide blank carnival barker's sign board with a scalloped edge and a ring of light bulbs, its board a bright red"}}
FIELDS=("Follow the reference layout exactly: keep every shape in the same position and size, but draw each grey shape as a real object, never as a flat box. "
 "The left stub is printed in two halves, bright green on top and bright red below, separated from the body by a perforation of punched holes; the stub's round seal and tall strip are blank and bright gold yellow, never cream. "
 "{fields} The ticket body itself is printed with an engraved ink border, fine line ornament and little drawn details in its corners, flat bright colour. "
 "Every object is blank and empty. The white window inside the frame stays flat pure white, completely empty. The area outside the ticket is plain flat pure white. "
 "The ticket fills the whole frame, seen perfectly front-on and flat.")
GOLDF=("Follow the reference layout exactly: the stub fills the left part of the frame at the same position and size; its round seal and tall strip are blank gold panels; "
 "a perforation of punched holes runs down its right edge. Everything to the right of the stub, and around it, is plain flat pure white.")
def jobs(kind,flt):
  J=[];base={'resolution':'1K','quality':'medium','output_format':'png'}
  for w,S in W.items():
    if kind in('tickets','all'):
      for a,ar in (('p','3:4'),('d','9:16')):
        for m,c in MC.items():
          J.append((f't-{w}-{a}-{m}',dict(base,aspect_ratio=ar,prompt="Redraw the reference layout as "+S['ticket'].format(c=c)+". "+FIELDS.format(fields=S['fields'])+" "+STY+NOTXT),[f'{D}/guide/{a}-body-{m}.png']))
    if kind in('gold','all'):
      for a,ar in (('p','3:4'),('d','9:16')):
        J.append((f'g-{w}-{a}',dict(base,aspect_ratio=ar,prompt="Redraw the reference layout as "+S['gold']+". "+GOLDF+" "+STY+NOTXT),[f'{D}/guide/{a}-gold.png']))
    if kind in('grounds','all'):
      for a,ar in (('p','9:16'),('d','16:9')):
        J.append((f'b-{w}-{a}',dict(base,aspect_ratio=ar,prompt=S['ground']+". The middle of the picture is open space (a wall or the air) with no figures in it, the people at the sides and the bottom. "+STY+NOTXT),[]))
    if kind in('props','all'):
      J.append((f's-{w}',dict(base,aspect_ratio='16:9',prompt=S['sign']+", seen perfectly head-on, completely blank. The object alone, centred, filling most of the frame, isolated on a plain flat pure white background. "+STY+NOTXT),[]))
  if kind in('props','all'):
    J.append(('f-us',dict(base,aspect_ratio='4:3',prompt="A small United States flag waving in the wind, on no pole, the stripes and the blue canton with white stars, the cloth rippling in three folds. The object alone, centred, filling most of the frame, isolated on a plain flat pure white background. "+STY+NOTXT),[]))
    J.append(('f-cn',dict(base,aspect_ratio='4:3',prompt="A small flag of the People's Republic of China waving in the wind, on no pole: red cloth with one large yellow star and four small yellow stars in the top left corner, the cloth rippling in three folds. The object alone, centred, filling most of the frame, isolated on a plain flat pure white background. "+STY+NOTXT),[]))
    J.append(('k-w',dict(base,aspect_ratio='1:1',prompt="One rubber-stamp mark of a bold green tick, stamped in bright green ink, slightly uneven inky edges. The mark alone, centred, filling most of the frame, on a plain flat pure white background. "+STY+NOTXT),[]))
    J.append(('k-l',dict(base,aspect_ratio='1:1',prompt="One rubber-stamp mark of a bold red cross (an X), stamped in bright red ink, slightly uneven inky edges. The mark alone, centred, filling most of the frame, on a plain flat pure white background. "+STY+NOTXT),[]))
  return [j for j in J if not flt or flt in j[0]]
def run(a):
  name,inp,refs=a
  if os.path.exists(f'{D}/img/{name}.jpg'):return name+' exists'
  r=subprocess.run(['python3',D+'/hd.py',name,'gpt-image-2',json.dumps(inp)]+refs,capture_output=True,text=True);return (r.stdout+r.stderr)[-300:]
if __name__=='__main__':
  J=jobs(sys.argv[1],sys.argv[2] if len(sys.argv)>2 else '');print(len(J),'jobs',flush=True)
  if os.environ.get('DRY'):[print(j[0]) for j in J];sys.exit()
  with ThreadPoolExecutor(int(os.environ.get('PAR','8'))) as ex:
    for r in ex.map(run,J):print(r,flush=True)
