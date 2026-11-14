# /usr/bin/python3 blank.py : finds the blank surface the painting left for the narration (the largest flat run of one colour near a guess) and prints its box in %
import sys,json
from PIL import Image
import numpy as np
G={ # image: (guess box in % x0,y0,x1,y1, target colour)
 'b1-p':((15,55,90,70),(253,200,40)),'b2-p':((55,28,95,48),(253,200,40)),'b3-p':((25,30,70,42),(220,170,40)),'b4-p':((30,30,62,48),(15,15,15)),'b5-p':((42,38,74,49),(220,40,40)),
 'b1-l':((15,10,60,45),(253,200,40)),'b2-l':((65,25,75,65),(253,200,40)),'b3-l':((40,8,62,20),(220,170,40)),'b4-l':((68,28,80,50),(15,15,15)),'b5-l':((14,48,26,57),(220,40,40))}
out={}
for n,(g,c) in G.items():
  im=np.asarray(Image.open(f'img/{n}.jpg').convert('RGB')).astype(int);H,W,_=im.shape
  x0,y0,x1,y1=[int(v/100*(W if i%2==0 else H)) for i,v in enumerate(g)]
  sub=im[y0:y1,x0:x1];d=np.abs(sub-np.array(c)).sum(2)
  m=d<110
  r=m.mean(1);cc=m.mean(0)
  ry=np.where(r>.45)[0];cx=np.where(cc>.45)[0]
  if not len(ry) or not len(cx):print(n,'none');continue
  bx=[cx[0]+x0,ry[0]+y0,cx[-1]+x0,ry[-1]+y0]
  out[n]=[round(bx[0]/W*100,1),round(bx[1]/H*100,1),round(bx[2]/W*100,1),round(bx[3]/H*100,1)]
  print(n,out[n])
json.dump(out,open('blank.json','w'))
