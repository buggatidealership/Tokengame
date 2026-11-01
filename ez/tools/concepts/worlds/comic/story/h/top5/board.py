# /usr/bin/python3 board.py <shots dir> <width> <out> : today's live top, then top5 (pick) in full; a row of the three sub-head options (on gutter pair 1),
# a row of the three gutter pairs (on sub-head 1), and a close-up row at 2x of the sub-heads and the gutters.
import sys
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
FN='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
sc=2 if W>=600 else 1
def ld(f,s=None):
  i=Image.open(f'{D}/{f}').convert('RGB');s=sc if s is None else s;return i.resize((i.width//s,i.height//s),Image.LANCZOS) if s>1 else i
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
S={1:'1 · Gold badge: the number on a hand-drawn gold disc, the word in cream with an ink outline and drop, tilted',2:'2 · Big numeral: the number tall in the headline\'s gold, the word in green, the frames tilt in turn',3:'3 · Caption tab: a drawn narration box, the number on a red tab, the word in cream'}
Gt={1:'Pair 1 · torn paper (beats) / zigzag cut (frames)',2:'Pair 2 · board edge with gold pins, painted (beats) / gold trace with vias (frames)',3:'Pair 3 · thick green ink band with a gold halftone fade (beats) / dotted halftone rule (frames)'}
rows=[row('Round H20 · top5: top4 option 1 with the step words as numbered comic sub-heads and drawn gutters of two strengths. Hedra $0.08.',[
 ('Today (live X2+)',ld(f'top-{W}-now.png')),
 ('top5, my pick: sub-head 3 (caption tab) + gutter pair 2 (board edge / gold trace), every frame on. CLOSE: "The close decides who wins the round."',ld(f'top-{W}-s3g2.png')),
 ('Sub-head 1 + gutter pair 1 (torn paper / zigzag) in the whole top',ld(f'top-{W}-s1g1.png'))],nl=4)]
rows.append(row('Sub-heads, three options (gutter pair 1). Size between "How a round works" and the line under each frame',[(S[k],ld(f'fr-{W}-s{k}g1.png')) for k in (1,2,3)],nl=3))
rows.append(row('Gutters, three pairs (sub-head 1). The beat gutter is the strong one; the frame gutter the light one',[(Gt[k],ld(f'fr-{W}-s1g{k}.png')) for k in (1,2,3)],nl=3))
# close-ups at 2x: crop a strip around the first row's sub-heads and the row gutter, and the beat gutter
cu=[]
for k in (1,2,3):
  fr=Image.open(f'{D}/fr-{W}-s{k}g1.png').convert('RGB');fw,fh=fr.size
  cu.append((f'Sub-head {k}',fr.crop((0,int(fh*.36),fw//2,int(fh*.56))) if W<600 else fr.crop((0,int(fh*.7),fw//2,int(fh*.93)))))
for k in (1,2,3):
  fr=Image.open(f'{D}/fr-{W}-s1g{k}.png').convert('RGB');fw,fh=fr.size
  cu.append((f'Gutters, pair {k}',fr.crop((0,0,fw//2 if W<600 else fw//3,int(fh*.14)))))
if W>=600:cu=[(t,i.resize((i.width*2//3,i.height*2//3),Image.LANCZOS)) for t,i in cu]
rows.append(row('Close-ups at 2x',cu[:3],nl=1));rows.append(row('',cu[3:],nl=1))
N=Image.new('RGB',(max(r.width for r in rows),sum(r.height for r in rows)),'#1b1820');y=0
for r in rows:N.paste(r,(0,y));y+=r.height
N.save(OUT,optimize=True);print(OUT,N.size)
