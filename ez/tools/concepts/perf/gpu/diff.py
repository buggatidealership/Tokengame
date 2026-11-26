# python3 diff.py <dirA> <dirB>: per stop, share of pixels that differ by more than 24 (any channel) and the bounding box of the difference (device px).
import sys,os,re
from PIL import Image,ImageChops
a,b=sys.argv[1:3]
for fn in sorted([f for f in os.listdir(a) if f.endswith('.png')],key=lambda s:int(re.sub(r'\D','',s) or 0)):
    if not os.path.exists(os.path.join(b,fn)):continue
    A=Image.open(os.path.join(a,fn)).convert('RGB');B=Image.open(os.path.join(b,fn)).convert('RGB')
    if A.size!=B.size:print(fn,'size',A.size,B.size);continue
    d=ImageChops.difference(A,B).convert('L').point(lambda v:255 if v>24 else 0)
    n=sum(d.histogram()[255:]);print(fn,'%.2f%%'%(100*n/(A.size[0]*A.size[1])),d.getbbox())
