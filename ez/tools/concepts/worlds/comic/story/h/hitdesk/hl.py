# /usr/bin/python3 hl.py img/x.jpg out.jpg 'quads json' [floor]: the painting's own highlights inside the given quads (black elsewhere), for a screen blend over the marks
import sys,json,numpy as np
from PIL import Image,ImageDraw,ImageFilter
im=Image.open(sys.argv[1]).convert('RGB');Q=json.loads(sys.argv[3]);fl=float(sys.argv[4]) if len(sys.argv)>4 else 30
m=Image.new('L',im.size,0);d=ImageDraw.Draw(m)
for q in Q:d.polygon([tuple(p) for p in q],fill=255)
m=m.filter(ImageFilter.GaussianBlur(2))
a=np.asarray(im).astype(float);a=np.clip((a-fl)*1.3,0,255)*(np.asarray(m)[...,None]/255.)
Image.fromarray(a.astype('uint8')).save(sys.argv[2],quality=90);print(sys.argv[2])
