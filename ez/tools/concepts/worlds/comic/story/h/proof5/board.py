# /usr/bin/python3 board.py out.png W "file|label" ...  one row of shots, each scaled to W wide, a label strip above
import sys
from PIL import Image,ImageDraw,ImageFont
out=sys.argv[1];W=int(sys.argv[2]);items=[a.split('|',1) for a in sys.argv[3:]]
try:F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',max(13,W//28))
except Exception:F=ImageFont.load_default()
ims=[]
for f,l in items:
  im=Image.open(f).convert('RGB');im=im.resize((W,int(im.height*W/im.width)),Image.LANCZOS);ims.append((im,l))
LH=max(40,W//9);H=max(i.height for i,_ in ims)+LH;G=12
B=Image.new('RGB',(len(ims)*(W+G)+G,H+G*2),(30,30,34));d=ImageDraw.Draw(B)
for k,(im,l) in enumerate(ims):
  x=G+k*(W+G);B.paste(im,(x,G+LH))
  # wrap label
  words=l.split();line='';y=G+4
  for w in words:
    t=(line+' '+w).strip()
    if d.textlength(t,font=F)>W-8:d.text((x+4,y),line,fill=(255,214,80),font=F);y+=F.size+3;line=w
    else:line=t
  d.text((x+4,y),line,fill=(255,214,80),font=F)
B.save(out,optimize=True);print(out,B.size)
