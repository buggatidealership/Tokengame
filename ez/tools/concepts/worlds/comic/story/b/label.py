# /usr/bin/python3 label.py <png> <text>: a dark label bar burned into the top of a frame
import sys
from PIL import Image,ImageDraw,ImageFont
f,t=sys.argv[1],sys.argv[2];im=Image.open(f).convert('RGB');d=ImageDraw.Draw(im);F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',int(im.width/22))
h=int(im.width/12);d.rectangle((0,0,im.width,h),fill='#1b1820');d.text((int(im.width/40),int(h*.2)),t,fill='#fdbc2a',font=F);im.save(f)
