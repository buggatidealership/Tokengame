# /usr/bin/python3 grid.py x0 y0 x1 y1 step out.jpg [scale] : crop of the master with a labelled pixel grid, for reading coordinates
import sys;from PIL import Image,ImageDraw
x0,y0,x1,y1,st=map(int,sys.argv[1:6]);out=sys.argv[6];sc=float(sys.argv[7]) if len(sys.argv)>7 else 1
im=Image.open(sys.argv[8] if len(sys.argv)>8 else 'img/m7-master.jpg').convert('RGB').crop((x0,y0,x1,y1));im=im.resize((int(im.width*sc),int(im.height*sc)));d=ImageDraw.Draw(im)
for x in range((x0//st+1)*st,x1,st):
  X=(x-x0)*sc;d.line([X,0,X,im.height],fill=(255,0,255) if x%(st*5)==0 else (0,255,255),width=1);d.text((X+2,2),str(x),fill=(255,255,0))
for y in range((y0//st+1)*st,y1,st):
  Y=(y-y0)*sc;d.line([0,Y,im.width,Y],fill=(255,0,255) if y%(st*5)==0 else (0,255,255),width=1);d.text((2,Y+2),str(y),fill=(255,255,0))
im.save(out,quality=90)
