# python3 trim.py : trims the white or cream frame the painter drew round some bridges (img/<n>.jpg -> img/<n>-c.jpg) and maps the
# blank-surface boxes (picked by eye on the raw paintings, in %) into the trimmed picture; writes slots.json for the page
import json
from PIL import Image
import numpy as np
RAW={'b1-p':[17.5,60.5,86.5,69.5],'b2-p':[62.1,34.8,87.6,44.9],'b3-p':[29.7,34.5,64.4,39.8],'b4-p':[34.5,33,57.5,46],'b5-p':[47,41,69,46.6],
     'b1-l':[36,17,58.5,39],'b2-l':[36.5,15,46,60],'b3-l':[44,8.5,62.5,22],'b4-l':[42.5,31,54.5,51],'b5-l':[33,47,50,57.5]}
S={}
for n,b in RAW.items():
  im=Image.open(f'img/{n}.jpg').convert('RGB');a=np.asarray(im).astype(int);H,W,_=a.shape
  lum=a.mean(2)
  def edge(arr):  # count leading lines that are mostly pale (frame) or the thin ink rule right after it
    k=0
    for line in arr:
      if (line>200).mean()>.6 or k<3 and (line<40).mean()>.8 and k>0: k+=1
      else: break
    return k
  t=edge(lum);bm=edge(lum[::-1]);l=edge(lum.T);r=edge(lum.T[::-1])
  t,bm,l,r=[v+4 if v else 3 for v in (t,bm,l,r)]
  c=im.crop((l,t,W-r,H-bm));c.save(f'img/{n}-c.jpg',quality=88)
  w2,h2=c.size
  S[n]={'ar':round(w2/h2,4),'box':[round((b[0]*W/100-l)/w2*100,2),round((b[1]*H/100-t)/h2*100,2),round((b[2]*W/100-l)/w2*100,2),round((b[3]*H/100-t)/h2*100,2)],'trim':[t,r,bm,l]}
  print(n,S[n])
json.dump(S,open('slots.json','w'),indent=1)
