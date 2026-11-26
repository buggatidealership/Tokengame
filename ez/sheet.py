from PIL import Image, ImageDraw
import os
T='RBRK NIO CRDO MDB NTAP TCOM M SIG AEO NTSK VEEV DOCU S GWRE'.split()
cw=200; out=Image.new('RGB',(cw*7,2*(160+40+40+30)),(40,40,48)); d=ImageDraw.Draw(out)
for i,t in enumerate(T):
  p='/home/user/Tokengame/ez/media/logos/S2-%s.png'%t
  x=(i%7)*cw; y=(i//7)*270
  d.text((x+10,y+5),t,fill='white')
  if not os.path.exists(p): d.text((x+10,y+40),'MISSING',fill='red'); continue
  im=Image.open(p).convert('RGB')
  out.paste(im.resize((160,160),Image.LANCZOS),(x+10,y+20))
  out.paste(im.resize((40,40),Image.LANCZOS),(x+10,y+190))
  out.paste(im.resize((14,14),Image.LANCZOS),(x+60,y+215))
out.save('logos-sheet.png')
