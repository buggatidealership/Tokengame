#!/usr/bin/env python3
# cast5 batch: Meet the models, today's layout with the big living portrait, painted as tickets; five takes (b1 b2 b3 on the trading floor, gal, mid)
# python3 batch.py <kind> [filter]   kind: tickets | openers | props | all
import json,os,sys,subprocess
from concurrent.futures import ThreadPoolExecutor
D=os.path.dirname(os.path.abspath(__file__))
STY=("Drawn Silver Age American comic book art, a printed 1960s comic page: a clean confident black brush-and-nib ink line with varied weight, "
 "flat bright printed colours, Ben-Day dot shading only in a few small shadows, the colour plates a hair out of register. Bright, flashy and cheerful, "
 "daylight colours, never dark, never beige. Hand-drawn and printed, not a 3D render, not photographic, no airbrushed gradients.")
NOTXT=" No text, no letters, no numbers, no words, no logos, no symbols, no writing anywhere, no watermark."
MC={'claude':'bright burnt orange','gpt':'bright emerald green','grok':'charcoal black with electric violet trim','kimi':'bright electric blue'}
FLOOR="a bright busy 1960s stock exchange trading floor with walls painted bright teal green and red columns, traders in colourful jackets waving paper order slips, paper slips and ticker tape flying like confetti, octagonal trading posts, tall windows with daylight"
W={
 'b1':{'ticket':"a 1960s stock exchange floor ticket printed on {c} card stock with brass rivets in the corners, with a large polished mahogany boardroom portrait frame printed into its upper right (thick carved dark wood mouldings, a green banker's picture lamp on top of the frame)",
   'fields':"The round medallion is a blank brass exchange badge. The arrow shape is a blank pennant flag in bright yellow. The small rectangle under it is a small punched brass tag. The wide field is a big blank black quote-board panel with a brass rim and corner screws. The two fields under it are two smaller blank black quote-board panels with brass rims. The five small circles are five unlit round indicator lamps with clear glass and chrome rims.",
   'op':FLOOR+". High on the back wall, in the middle of the picture, hangs a huge empty black quote board with a brass rim, completely blank. The traders crowd the bottom of the picture looking up at the board"},
 'b2':{'ticket':"a 1960s stock exchange member's ticket printed on {c} card stock, punched and riveted, with a large ornate gilded portrait frame printed into its upper right (gold carved mouldings with a small blank brass name plate at the bottom of the frame)",
   'fields':"The round medallion is a blank gold exchange seal. The arrow shape is a blank gold ribbon banner. The small rectangle under it is a small blank brass tag. The wide field is a big blank dark green chalkboard slate in a light wooden frame, with faint chalk smudges. The two fields under it are two smaller blank dark green chalkboard slates in light wooden frames. The five small circles are five tiny round blank dark green chalk slates in wooden rims.",
   'op_p':FLOOR+". In the middle of the picture a huge blank dark green chalkboard on a trading post fills the width from left to right, completely empty and clean; a cheerful clerk in a striped shirt and sleeve garters stands on a step ladder at its far right edge, reaching in with a stick of chalk",
   'op':FLOOR+". In the right half of the picture a cheerful clerk in a striped shirt and sleeve garters stands on a step ladder holding a stick of chalk up to a huge blank dark green chalkboard on a trading post, the chalkboard completely empty and clean"},
 'b3':{'ticket':"a 1960s stock exchange floor ticket printed on {c} card stock with brass rivets, with a large brass-and-walnut portrait frame printed into its upper right (a riveted brass bezel like an old ticker machine, a little brass bell on top of the frame)",
   'fields':"The round medallion is a blank brass ticker-machine dial. The arrow shape is a blank bright yellow pennant flag. The small rectangle under it is a small punched brass tag. The wide field is a big blank split-flap display board: a row of empty charcoal flaps in a red-painted metal case. The two fields under it are two smaller blank engraved brass plates with screws. The five small circles are five round blank brass tokens with deep red enamel centres.",
   'op':FLOOR+". Across the upper middle of the back wall runs a huge split-flap arrivals board in a red metal case, every flap a blank charcoal tile, completely empty. A brass ticker machine spills tape in the foreground corner"},
 'gal':{'ticket':"a museum admission ticket printed on {c} card stock, with a large carved and gilded picture frame printed into its upper right (a Harry Potter style portrait frame with ornate gold mouldings, curls and a little brass picture lamp on top)",
   'fields':"The round medallion is a blank gold museum medal. The arrow shape is a gold ribbon banner with folded ends. The small rectangle under it is a small blank enamel name tag in deep red. The wide field is a big blank engraved brass plaque with four screws. The two fields under it are two smaller blank brass label plates with screws. The five small circles are five tiny empty oval gilt frames, their insides deep red velvet.",
   'op_p':"a grand bright portrait gallery in a museum, deep red walls with gold mouldings, a crystal chandelier, sunlight, polished parquet floor, 1960s visitors in colourful clothes pointing up. In the middle of the picture, close to us, hangs a big wide empty gilded museum placard filling most of the width, its plate a bright warm yellow and completely blank",
   'op':"a grand bright portrait gallery in a museum, deep red walls with gold mouldings, gilded picture frames, polished parquet floor, a crystal chandelier, sunlight from tall windows, 1960s visitors in colourful clothes pointing. On the wall in the middle of the picture hangs a wide empty gilded museum placard, its plate a bright warm yellow and completely blank"},
 'mid':{'ticket':"a carnival ride ticket with scalloped edges, printed on {c} card stock, with a large funhouse portrait frame ringed with glowing round light bulbs printed into its upper right (a red and gold carnival marquee frame)",
   'fields':"The round medallion is a blank gold carnival token. The arrow shape is a blank yellow carnival pennant with a scalloped end. The small rectangle under it is a small blank red game-booth tag. The wide field is a big blank red prize sign with a ring of small light bulbs around it. The two fields under it are two smaller blank bright blue booth signs with scalloped tops. The five small circles are five big unlit round light bulbs in chrome sockets.",
   'op':"a sunny seaside carnival midway in the 1960s, red and white striped tents, game booths, a ferris wheel and a roller coaster behind, strings of light bulbs, blue sky with puffy clouds, a happy crowd with balloons. In the middle of the picture a barker in a straw boater points his cane up at a wide empty carnival sign board with a scalloped edge and a ring of light bulbs, its board bright red and completely blank"}}
FIELDS=("Follow the reference layout exactly: keep every shape in the same position and size, but draw each grey shape as a real object, never as a flat box. "
 "The left stub is printed in two halves, bright green on top and bright red below, separated from the body by a perforation of punched holes; the stub's round seal and tall strip are blank and bright gold yellow, never cream. "
 "{fields} The ticket body itself is printed with an engraved ink border, fine line ornament and little drawn details in its corners, flat bright colour. "
 "Every object is blank and empty. The white window inside the frame is large and stays flat pure white, completely empty. The area outside the ticket is plain flat pure white. "
 "The ticket fills the whole frame, seen perfectly front-on and flat.")
OPP={'p':"Composition for a tall phone panel: the top quarter of the picture is calm plain wall or sky with nothing in it (a headline will be lettered there). ",
     'd':"Composition for a wide establishing panel: the scene fills the whole width with people and detail on both sides; only a band along the top fifth of the picture, on the left half, is calm plain wall or sky (a headline will be lettered there). "}
PROPS={'lw-b1':"One round glass indicator lamp with a chrome rim, lit bright green and glowing, seen head-on",
 'll-b1':"One round glass indicator lamp with a chrome rim, lit bright red and glowing, seen head-on",
 'lw-mid':"One big round carnival light bulb in a chrome socket, lit bright green and glowing, seen head-on",
 'll-mid':"One big round carnival light bulb in a chrome socket, lit bright red and glowing, seen head-on",
 'cw':"One bold tick mark drawn in thick white chalk, hand drawn, dusty chalk texture, on a plain flat pure white background, the chalk mark drawn in pale green chalk",
 'cl':"One bold cross (an X) drawn in thick chalk, hand drawn, dusty chalk texture, the chalk mark drawn in pale red chalk"}
W['b1h']=dict(W['b1'])
def jobs(kind,flt):
  J=[]
  for w,S in W.items():
    base={'resolution':'2K','quality':'high','output_format':'png'} if w=='b1h' else {'resolution':'1K','quality':'medium','output_format':'png'}
    if kind in('tickets','all'):
      for a,ar in ((('p','3:4'),) if w=='b1h' else (('p','3:4'),('d','9:16'))):
        for m,c in MC.items():
          J.append((f't-{w}-{a}-{m}',dict(base,aspect_ratio=ar,prompt="Redraw the reference layout as "+S['ticket'].format(c=c)+". "+FIELDS.format(fields=S['fields'])+" "+STY+NOTXT),[f'{D}/guide/{a}-body-{m}.png']))
    if kind in('openers','all'):
      for a,ar in ((('p','3:4'),) if w=='b1h' else (('p','3:4'),('d','16:9'))):
        op=S.get('op_'+a,S['op'])
        J.append((f'o-{w}-{a}',dict(base,aspect_ratio=ar,prompt="An establishing comic panel: "+op+". "+OPP[a]+STY+NOTXT),[]))
  if kind in('props','all'):
    for k,v in PROPS.items():
      J.append((k,dict(base,aspect_ratio='1:1',prompt=v+". The object alone, centred, filling most of the frame, isolated on a plain flat pure white background. "+STY+NOTXT),[]))
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
