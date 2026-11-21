# /usr/bin/python3 board.py <shots dir> <width> <out> [checks.txt] : today's live top, take A (torn paper + gold trace) and take B (pair 1 complete) in full;
# a row of the frames with the four line variants, labelled with each line's measured line count; a close-up row of the gutters and the CALL line.
import sys,json,re
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3];CK=sys.argv[4] if len(sys.argv)>4 else None
FN='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
sc=2 if W>=600 else 1
def ld(f,s=None):
  i=Image.open(f'{D}/{f}').convert('RGB');s=sc if s is None else s;return i.resize((i.width//s,i.height//s),Image.LANCZOS) if s>1 else i
F=ImageFont.truetype(FN,22);G=ImageFont.truetype(FR,19);pad=40
M={}
if CK:
  for l in open(CK):
    m=re.match(r'(\d+) (\S+) errors',l)
    if m and '{' in l:M[(int(m[1]),m[2])]=json.loads(l[l.index('{'):l.rindex('}')+1])
def lc(id):
  d=M.get((W,id));
  if not d or 'lc' not in d:return ''
  return ' · lines '+' / '.join(str(x['n']) for x in d['lc'])+f" at {d['lc'][0]['fs']:g}px"
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
L={'a':'a · Full lines at today\'s size. "4 AIs submit their predictions" does not fit line 1',
   'b':'b · Same words; all four lines shrink to the size that keeps "4 AIs submit their predictions" on line 1',
   'c':'c · "4 AIs submit predictions before the earnings report." at today\'s size (fits line 1)',
   'd':'d · c, plus a shorter CLOSE: "The close after the report decides who wins." (my suggestion)'}
rows=[row('Round H21 · top6: sub-head 3 (caption tab), torn paper between beats. Frame lines per the owner. Hedra $0.',[
 ('Today (live X2+)',ld(f'top-{W}-now.png')),
 ('Take A, my pick: torn paper between beats, gold trace between frames; lines c'+lc('A-c'),ld(f'top-{W}-A-c.png')),
 ('Take B: pair 1 complete, torn paper between beats, zigzag cut between frames; lines a'+lc('B-a'),ld(f'top-{W}-B-a.png'))],nl=4)]
rows.append(row('The frame lines, four variants (take A). Line counts measured per frame: CALL / CLOSE / LEDGER / BOARD',[(L[k]+lc('A-'+k),ld(f'fr-{W}-A-{k}.png')) for k in 'abcd'],nl=5))
cu=[]
for id,t in (('A-c','Take A gutters: torn paper, gold trace'),('B-a','Take B gutters: torn paper, zigzag cut')):
  fr=Image.open(f'{D}/fr-{W}-{id}.png').convert('RGB');fw,fh=fr.size
  cu.append((t,fr.crop((0,0,fw//2 if W<600 else fw//3,int(fh*.14)))))
  cu.append((t+', between frames',fr.crop((0,int(fh*.40),fw,int(fh*.62))) if W<600 else fr.crop((fw//4,int(fh*.45),fw*3//4,int(fh*.75)))))
if W>=600:cu=[(t,i.resize((i.width*2//3,i.height*2//3),Image.LANCZOS)) for t,i in cu]
rows.append(row('Close-ups at 2x',cu[:2],nl=1));rows.append(row('',cu[2:],nl=1))
N=Image.new('RGB',(max(r.width for r in rows),sum(r.height for r in rows)),'#1b1820');y=0
for r in rows:N.paste(r,(0,y));y+=r.height
N.save(OUT,optimize=True);print(OUT,N.size)
