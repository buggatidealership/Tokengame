# /usr/bin/python3 facechk.py : checks every hand-measured painted face (plates, signs, plaques, tag faces) against the painting's own pixels.
# From the rect's centre it walks out along the middle row and column (median over a band) until the luminance falls below 62% of the face's
# median: that is the painted edge (the bevel or border line). Prints both rects and the centre offset in original px.
import json
from PIL import Image
import numpy as np
S=json.load(open('parts.json'))
def edges(a,x0,y0,x1,y1):
  cx,cy=(x0+x1)//2,(y0+y1)//2;L=a.mean(-1)
  med=np.median(L[y0+3:y1-3,x0+3:x1-3]);th=med*.62
  bh=max(2,(y1-y0)//5);bw=max(2,(x1-x0)//8)
  row=np.median(L[cy-bh:cy+bh,:],0);col=np.median(L[:,cx-bw:cx+bw],1)
  def walk(p,c,d,lim):
    i=c
    while 0<i<len(p)-1 and abs(i-c)<lim and p[i]>th:i+=d
    return i
  W=(x1-x0);H=(y1-y0)
  return [walk(row,cx,-1,W),walk(col,cy,-1,H),walk(row,cx,1,W),walk(col,cy,1,H)],med
out={}
for nm,sp in S.items():
  for part,p in sp.items():
    if part=='src':continue
    src=p.get('src',sp['src']);a=np.asarray(Image.open('img/%s.jpg'%src).convert('RGB')).astype(float)
    for kind,r in (('plate',p.get('plate')),('hang',(p.get('hang') or {}).get('face'))):
      if not r:continue
      e,med=edges(a,*r);dx=((e[0]+e[2])-(r[0]+r[2]))/2;dy=((e[1]+e[3])-(r[1]+r[3]))/2
      print(f'{nm:8} {part:5} {kind:5} mine {r} painted {e} centre off dx {dx:+.1f} dy {dy:+.1f} (orig px)')
      out[f'{nm}/{part}/{kind}']={'mine':r,'painted':e,'dx':dx,'dy':dy}
for t in ('a-tag','b-tag','c-tag'):
  im=Image.open('img/%s.webp'%t).convert('RGBA');a=np.asarray(im)[...,:3].astype(float);W,H=im.size
  f={'a-tag':[.09,.258,.912,.84],'b-tag':[.13,.12,.925,.88],'c-tag':[.075,.1,.925,.9]}[t];r=[int(f[0]*W),int(f[1]*H),int(f[2]*W),int(f[3]*H)]
  e,med=edges(a,*r);print(f'{t:8} face mine {r} painted {e} dx {((e[0]+e[2])-(r[0]+r[2]))/2:+.1f} dy {((e[1]+e[3])-(r[1]+r[3]))/2:+.1f} of {W}x{H}')
  out[t]={'mine':r,'painted':e,'size':[W,H]}
json.dump(out,open('img/facechk.json','w'),indent=0)
