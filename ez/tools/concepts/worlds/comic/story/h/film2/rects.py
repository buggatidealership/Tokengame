# finds dark glass windows (screen, LED window) and the gold button in each painting; prints bounding boxes in painting px
import sys,json
from PIL import Image
import numpy as np
from scipy import ndimage
out={}
for n in sys.argv[1:]:
  im=np.asarray(Image.open(f'img/{n}.jpg').convert('RGB')).astype(int);H,W,_=im.shape
  L=im.max(2);dark=L<38
  lab,k=ndimage.label(dark);sl=ndimage.find_objects(lab);boxes=[]
  for i,s in enumerate(sl):
    h=s[0].stop-s[0].start;w=s[1].stop-s[1].start;area=(lab[s]==i+1).sum()
    if w>120 and h>50 and area>0.75*w*h and w<W*.95 and h<H*.95: boxes.append([s[1].start,s[0].start,w,h,round(w/h,3)])
  boxes.sort(key=lambda b:-b[2]*b[3]);out[n]=boxes[:8];print(n,boxes[:8])
json.dump(out,open('rects.json','w'))
