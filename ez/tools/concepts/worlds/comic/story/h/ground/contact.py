import sys,glob,os
from PIL import Image,ImageDraw,ImageFont
fs=sorted(glob.glob('img/*.jpg'));F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',16)
T=260;cols=6;rows=(len(fs)+cols-1)//cols;B=Image.new('RGB',(cols*(T+10)+10,rows*(T+40)+10),'#222');d=ImageDraw.Draw(B)
for k,f in enumerate(fs):
  i=Image.open(f);i.thumbnail((T,T));x=10+(k%cols)*(T+10);y=10+(k//cols)*(T+40);B.paste(i,(x,y+24));d.text((x,y),os.path.basename(f)[:-4],fill='#fd2',font=F)
B.save(sys.argv[1])
