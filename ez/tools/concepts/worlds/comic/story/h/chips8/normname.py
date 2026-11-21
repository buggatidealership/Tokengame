# /usr/bin/python3 normname.py : the laser-marked names came out at different brightness per pass (Claude bright, the others grey);
# lift each name strip's letters so their 99.5th-percentile brightness is the same (240) on every chip; the dark glass stays as it is.
from PIL import Image;import numpy as np,json
G=json.load(open('ref/guides.json'))['GEO']
for k,suf in (('A2',''),('A2','c'),('B2','')):
  x0,y0,x1,y1=G[k]['name'];x0+=8;y0+=8;x1-=8;y1-=8
  for m in ('grok','claude','gpt','kimi'):
    f=f'img/chip8{k}{suf}-{m}-full.jpg';im=Image.open(f).convert('RGB');a=np.asarray(im).astype(float)
    r=a[y0:y1,x0:x1];L=r.mean(2);p=np.percentile(L,99.5);k2=min(2.2,240/max(p,1))
    w=np.clip((L-45)/60,0,1)[...,None]           # only the letters (bright), not the glass
    a[y0:y1,x0:x1]=np.clip(r*(1-w)+r*k2*w,0,255);Image.fromarray(a.astype(np.uint8)).save(f,quality=93);print(f,round(p),round(k2,2))
