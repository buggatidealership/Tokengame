# /usr/bin/python3 board.py <shots dir> <width> <out.png> : today plus A, B, C side by side (phones) or stacked (1280), each with its label;
# on phones a gold tick marks where a 664px phone frame ends, measured from the section's head and from the start of beat 2.
import sys,json,glob
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
M={}
for f in glob.glob(D+'/measure-*.json'):M.update(json.load(open(f)))
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s)
NAMES={'now':'Today (live)','A':'A  The stand (painted)','B':'B  Built (record slab)','C':'C  The case + slab box'}
ims=[]
for k in ['now','A','B','C']:
  im=Image.open(f'{D}/sec-{W}-{k}.png').convert('RGB');m=M.get(f'{W}-{k}',{});sc=im.width/W
  dr=ImageDraw.Draw(im)
  if W<600 and k!='now':
    for y0,lab in ((m.get('hdtop',0),'beat 1'),(m.get('b2top'),'beat 2')):
      if y0 is None:continue
      y=int((y0+6+664)*sc)
      if y<im.height:dr.rectangle([0,y-2,im.width,y+2],fill=(255,210,31));dr.text((8,y-30*sc),f'{lab}: 664px frame ends',font=F(int(11*sc)),fill=(255,210,31))
  ims.append((k,im,m))
pad=int(16*(ims[0][1].width/W));hh=int(46*(ims[0][1].width/W))
if W<600:
  H=max(i.height for _,i,_ in ims)+hh;B=Image.new('RGB',(sum(i.width for _,i,_ in ims)+pad*5,H),(24,22,28));x=pad
  for k,i,m in ims:
    d=ImageDraw.Draw(B);d.text((x,int(hh*.18)),NAMES[k],font=F(int(hh*.42)),fill=(248,240,217))
    B.paste(i,(x,hh));x+=i.width+pad
else:
  H=sum(i.height+hh for _,i,_ in ims)+pad*4;B=Image.new('RGB',(ims[0][1].width+pad*2,H),(24,22,28));y=pad
  for k,i,m in ims:
    d=ImageDraw.Draw(B);d.text((pad,y+int(hh*.15)),NAMES[k],font=F(int(hh*.5)),fill=(248,240,217));B.paste(i,(pad,y+hh));y+=i.height+hh+pad
s=float(sys.argv[4]) if len(sys.argv)>4 else 1
if s!=1:B=B.resize((int(B.width*s),int(B.height*s)),Image.LANCZOS)
B.save(OUT,optimize=True);print(OUT,B.size)
