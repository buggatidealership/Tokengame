# /usr/bin/python3 sheet.py <out.jpg> [files...] : contact sheet of the paintings (magenta shown as is)
import sys,glob
from PIL import Image
out=sys.argv[1];fs=sys.argv[2:] or [f for f in sorted(glob.glob('img/*.jpg')) if 'ref-' not in f]
W=1800;c=Image.new('RGB',(W,2400),(255,255,255));x=y=0;rh=0
for f in fs:
  i=Image.open(f).convert('RGB');print(f,i.size);i.thumbnail((440,440))
  if x+i.width>W:x=0;y+=rh+8;rh=0
  c.paste(i,(x,y));x+=i.width+8;rh=max(rh,i.height)
c.crop((0,0,W,y+rh)).save(out,quality=85)
