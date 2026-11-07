# /usr/bin/python3 board.py <shots dir> <W> <out.png>  : full Overviews side by side (today first), then a close-up row of the four cuts per take
import sys,json
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
L=json.load(open(__file__.replace('board.py','takes.json')))
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s)
Fr=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',s)
CW=400 if W<600 else 640;cols=[]
for t in L:
  im=Image.open(f"{D}/full-{W}-{t['id']}.png").convert('RGB');s=(CW-10)/im.width;cols.append(im.resize((CW-10,int(im.height*s)),Image.LANCZOS))
HD=150;H=max(c.height for c in cols)+HD+20
def wrap(d,txt,x,y,w,f):
  line='';
  for wd in txt.split():
    if d.textlength(line+' '+wd,font=f)>w and line:d.text((x,y),line,font=f,fill='#ddd');y+=f.size+4;line=wd
    else:line=(line+' '+wd).strip()
  d.text((x,y),line,font=f,fill='#ddd')
CUTN=['Cover to Meet the models','Meet the models to Every round so far','Every round so far to Smart or lucky?','Smart or lucky? to Bet #1']
cs=0.75 if W<600 else 0.62
cut0=Image.open(f"{D}/cut1-{W}-{L[1]['id']}.png");cw,ch=int(cut0.width*cs),int(cut0.height*cs)
rowH=ch+70;BW=max(CW*len(L),(cw+10)*4+20)
B=Image.new('RGB',(BW,H+rowH*(len(L)-1)+40),'#14121a');d=ImageDraw.Draw(B)
for i,(t,c) in enumerate(zip(L,cols)):
  x=i*CW+5;d.text((x,10),t['title'],font=F(19),fill='#ffe14d');wrap(d,t['desc'],x,40,CW-14,Fr(13));B.paste(c,(x,HD))
y=H
for t in L[1:]:
  d.text((10,y+8),t['title']+' · the four cuts, close up',font=F(20),fill='#ffe14d')
  for k in range(4):
    im=Image.open(f"{D}/cut{k+1}-{W}-{t['id']}.png").convert('RGB').resize((cw,ch),Image.LANCZOS);B.paste(im,(10+k*(cw+10),y+40));d.text((10+k*(cw+10),y+40+ch+2),CUTN[k],font=Fr(13),fill='#aaa')
  y+=rowH
B.quantize(colors=256,method=Image.Quantize.FASTOCTREE,dither=Image.Dither.FLOYDSTEINBERG).save(OUT,optimize=True);print(OUT,B.size)
