#!/usr/bin/python3
# grid.py in.jpg out.jpg [step]: a labelled grid over a painting, to measure surfaces by eye
import sys
from PIL import Image,ImageDraw
im=Image.open(sys.argv[1]).convert('RGB');st=int(sys.argv[3]) if len(sys.argv)>3 else 32;d=ImageDraw.Draw(im);W,H=im.size
for x in range(0,W,st):d.line([x,0,x,H],fill=(255,0,255) if x%(st*4)==0 else (0,200,255),width=1);(x%(st*4)==0) and [d.text((x+2,y),str(x),fill=(255,255,0)) for y in range(0,H,st*8)]
for y in range(0,H,st):d.line([0,y,W,y],fill=(255,0,255) if y%(st*4)==0 else (0,200,255),width=1);(y%(st*4)==0) and [d.text((x,y+2),str(y),fill=(255,255,0)) for x in range(0,W,st*8)]
im.save(sys.argv[2],quality=85)
