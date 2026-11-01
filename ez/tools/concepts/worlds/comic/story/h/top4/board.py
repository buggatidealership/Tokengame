# /usr/bin/python3 board.py <shots dir> <width> <out> : today's live top, then top4 on arrival (every frame off) and every frame on;
# rows: the step-word ink (cream, green, gold), the wording (BOARD vs #1), the order (ledger then board vs board then ledger),
# the film head, and a close-up row (2x) of the silkscreened words, the buzzer's readout and the ledger.
import sys
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
FN='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
sc=2 if W>=600 else 1
def ld(f,s=None):
  i=Image.open(f'{D}/{f}').convert('RGB');s=sc if s is None else s;return i.resize((i.width//s,i.height//s)) if s>1 else i
F=ImageFont.truetype(FN,22);G=ImageFont.truetype(FR,19);pad=40
def wrap(d,t,Fo,mx):
  L=['']
  for w in t.split(' '):
    if d.textlength((L[-1]+' '+w).strip(),font=Fo)>mx:L.append(w)
    else:L[-1]=(L[-1]+' '+w).strip()
  return L
def row(title,items,nl=3):
  hh=max(i.height for _,i in items);ww=sum(i.width for _,i in items)+pad*(len(items)+1)
  R=Image.new('RGB',(max(ww,1200),hh+60+nl*26),'#1b1820');d=ImageDraw.Draw(R);d.text((pad,14),title,fill='#e9dfc6',font=F);x=pad
  for t,i in items:
    for n,l in enumerate(wrap(d,t,G,i.width)[:nl]):d.text((x,50+n*25),l,fill='#fdbc2a',font=G)
    R.paste(i,(x,56+nl*26));x+=i.width+pad
  return R
rows=[row('Round H19 · top4, the top of X2+ (from H18 top3 take A). Hedra $0.78 for 10 new paintings (4 used).',[
 ('Today (live X2+)',ld(f'top-{W}-now.png')),
 ('top4 on arrival: both headline lines one size; "How a round works" at that size, breaking the CALL frame; each frame off until a tap or 3 s on screen; the step words silkscreened on the board',ld(f'top-{W}-bc1off.png')),
 ('top4, every frame on: R40 Tesla\'s calls; the piezo buzzer\'s readout (TSLA −3.08%, Grok wins); the ledger: header, R38, R39, R40 written in row 4; the leader on the gold lid; film head "The whole game 1:20"',ld(f'top-{W}-bc1on.png'))],nl=6)]
rows.append(row('Step-word ink, Bangers silkscreened on the bare strip of board (set b, order 1)',[('Cream ink (pick): classic PCB silkscreen',ld(f'fr-{W}-bc1on.png')),('Green ink: bright solder-mask green, low contrast on the board',ld(f'fr-{W}-bg1on.png')),('Gold: gold-plated lettering (ENIG), like the board\'s pads',ld(f'fr-{W}-bo1on.png'))],nl=2))
rows.append(row('Wording',[('(b) CALL / CLOSE / LEDGER / BOARD (the owner\'s lean)',ld(f'fr-{W}-bc1on.png')),('(a) CALL / CLOSE / LEDGER / #1',ld(f'fr-{W}-ac1on.png'))],nl=2))
rows.append(row('Order (the owner first said swap, then "it\'s fine how it is")',[('1: CALL, CLOSE, LEDGER, BOARD. "The ledger ranks the board."',ld(f'fr-{W}-bc1on.png')),('2: CALL, CLOSE, BOARD, LEDGER. BOARD\'s line becomes "The close ranks the board." (the ledger has not appeared yet)',ld(f'fr-{W}-bc2on.png'))],nl=3))
rows.append(row('Film head',[('"The whole game 1:20" (the time read from the film)',ld(f'fh-{W}-bc1on.png'))],nl=1))
# close-ups from the 2x frame strip
fr=Image.open(f'{D}/fr-{W}-bc1on.png').convert('RGB');fw,fhh=fr.size
if W<600:
  cu=[('CALL silkscreen + dies',fr.crop((0,0,fw//2,fhh//2-40))),('The buzzer\'s readout + CLOSE',fr.crop((fw//2,0,fw,fhh//2-40))),('The ledger, header + R38-R40',fr.crop((0,fhh//2,fw//2,fhh))),('BOARD on the gold lid',fr.crop((fw//2,fhh//2,fw,fhh)))]
else:
  q=fw//4;cu=[(t,fr.crop((k*q,0,(k+1)*q,fhh)).resize(((q)*2//3,fhh*2//3))) for k,t in enumerate(['CALL','CLOSE (buzzer + readout)','LEDGER','BOARD'])]
rows.append(row('Close-ups at 2x',cu,nl=1))
N=Image.new('RGB',(max(r.width for r in rows),sum(r.height for r in rows)),'#1b1820');y=0
for r in rows:N.paste(r,(0,y));y+=r.height
N.save(OUT,optimize=True);print(OUT,N.size)
