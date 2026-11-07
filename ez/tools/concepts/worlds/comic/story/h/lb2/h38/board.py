# /usr/bin/python3 board.py <shots dir> <W> <out.png> [scale] [per row] [measure json]
# W=390: row 1 = every take as built (full tab), row 2 = the same take raced on hit rate, cropped to the race (top of the tab to the board's foot)
import sys,json,os
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],sys.argv[2],sys.argv[3];SC=float(sys.argv[4]) if len(sys.argv)>4 else 1;PER=int(sys.argv[5]) if len(sys.argv)>5 else 99
MJ=json.load(open(sys.argv[6])) if len(sys.argv)>6 else {}
T=[('c','C · today: the race on a circuit board (chips on traces)'),('horse','D · Night at the races: turf, tote board, form guide'),
 ('drag','E · The drag strip: Christmas tree, win lights, timing slips'),('pool','F · The swim meet: lanes, LED scoreboard, starting blocks'),
 ('vote','G · Election night: the studio wall, results bars, results cards'),('road','H · The desert road: comic road panels, roadside sign, garages'),
 ('night','I · Night race: street circuit, timing tower, pit-wall monitors')]
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',int(30*max(SC,.6)));F2=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',int(24*max(SC,.6)))
cols=[]
for k,t in T:
  p=f'{D}/{k}-{W}.png'
  if not os.path.exists(p):continue
  im=Image.open(p).convert('RGB');ims=[im]
  h=f'{D}/{k}.hit-{W}.png'
  if W=='390' and os.path.exists(h):
    m=MJ.get(f'{k}.hit@{W}',{});bb=m.get('boardBottom',780)+10;hi=Image.open(h).convert('RGB');r=hi.width/int(W);ims.append(hi.crop((0,int(300*r),hi.width,int(bb*r))))
  ims=[i.resize((int(i.width*SC),int(i.height*SC)),Image.LANCZOS) for i in ims];cols.append((t,ims))
G=36;TH=int(96*max(SC,.6));cw=max(i[0].width for _,i in cols);rows=[cols[i:i+PER] for i in range(0,len(cols),PER)]
def rh(r):return TH+max(i[0].height for _,i in r)+(max((i[1].height for _,i in r if len(i)>1),default=0)+TH//2 if any(len(i)>1 for _,i in r) else 0)
BW=G+min(PER,len(cols))*(cw+G);BH=G+sum(rh(r)+G for r in rows)
B=Image.new('RGB',(BW,BH),(14,13,16));d=ImageDraw.Draw(B);y=G
for r in rows:
  x=G;h0=max(i[0].height for _,i in r)
  for t,ims in r:
    ws=t.split(' ');ln=['']
    for w_ in ws:
      c=(ln[-1]+' '+w_).strip()
      if d.textlength(c,font=F)>cw and ln[-1]:ln.append(w_)
      else:ln[-1]=c
    d.multiline_text((x,y),'\n'.join(ln[:2]),fill=(255,210,31),font=F,spacing=4);B.paste(ims[0],(x,y+TH))
    if len(ims)>1:d.text((x,y+TH+h0+8),'Raced on hit rate (start line = coin flip):',fill=(216,207,186),font=F2);B.paste(ims[1],(x,y+TH+h0+TH//2))
    x+=cw+G
  y+=rh(r)+G
B.save(OUT,optimize=True);print(OUT,B.size)
