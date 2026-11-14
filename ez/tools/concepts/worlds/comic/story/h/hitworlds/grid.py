#!/usr/bin/python3
# grid.py in.jpg out.png [step] [x0 y0 x1 y1 crop] [scale]: a labelled grid over a painting, for measuring corners by eye
import sys
from PIL import Image,ImageDraw
im=Image.open(sys.argv[1]).convert('RGB');st=int(sys.argv[3]) if len(sys.argv)>3 else 50
if len(sys.argv)>7: im=im.crop(tuple(map(int,sys.argv[4:8])));ox,oy=map(int,sys.argv[4:6])
else: ox=oy=0
sc=float(sys.argv[8]) if len(sys.argv)>8 else 1
im=im.resize((int(im.width*sc),int(im.height*sc)));d=ImageDraw.Draw(im)
for x in range((ox//st+1)*st,ox+int(im.width/sc),st):
  X=(x-ox)*sc;d.line([(X,0),(X,im.height)],fill=(255,0,255) if x%(st*2)==0 else (0,255,255),width=1);d.text((X+2,2),str(x),fill=(255,0,255))
for y in range((oy//st+1)*st,oy+int(im.height/sc),st):
  Y=(y-oy)*sc;d.line([(0,Y),(im.width,Y)],fill=(255,0,255) if y%(st*2)==0 else (0,255,255),width=1);d.text((2,Y+2),str(y),fill=(255,0,255))
im.save(sys.argv[2])
