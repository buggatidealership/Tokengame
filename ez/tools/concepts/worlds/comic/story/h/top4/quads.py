# /usr/bin/python3 quads.py img/<name>.jpg [thr] [minarea] [maxarea] : finds the blank dark glass windows / slate panels (dark connected regions)
# and prints their four corners (TL,TR,BR,BL) in image px; writes a check image with the quads drawn.
import sys,json,numpy as np
from PIL import Image,ImageDraw
f=sys.argv[1];thr=int(sys.argv[2]) if len(sys.argv)>2 else 32;amin=int(sys.argv[3]) if len(sys.argv)>3 else 1500;amax=int(sys.argv[4]) if len(sys.argv)>4 else 400000
im=Image.open(f).convert('RGB');a=np.asarray(im).astype(int);L=(a[...,0]*.3+a[...,1]*.59+a[...,2]*.11)
H,W=L.shape;m=L<thr
# exclude the void: regions touching the border
lab=np.zeros((H,W),int);n=0;out=[]
for y in range(0,H,2):
  for x in range(0,W,2):
    if m[y,x] and not lab[y,x]:
      n+=1;st=[(y,x)];lab[y,x]=n;px=[];edge=False
      while st:
        cy,cx=st.pop();px.append((cx,cy))
        if cy in(0,H-1) or cx in(0,W-1):edge=True
        for dy,dx in((1,0),(-1,0),(0,1),(0,-1)):
          ny,nx=cy+dy,cx+dx
          if 0<=ny<H and 0<=nx<W and m[ny,nx] and not lab[ny,nx]:lab[ny,nx]=n;st.append((ny,nx))
      if not edge and amin<=len(px)<=amax:
        P=np.array(px);s=P[:,0]+P[:,1];d=P[:,0]-P[:,1]
        q=[P[s.argmin()],P[d.argmax()],P[s.argmax()],P[d.argmin()]]
        out.append({'area':len(px),'q':[[int(p[0]),int(p[1])] for p in q]})
out.sort(key=lambda o:(o['q'][0][1]//40,o['q'][0][0]))
d=ImageDraw.Draw(im)
for i,o in enumerate(out):
  d.polygon([tuple(p) for p in o['q']],outline=(255,0,255),width=3);d.text(tuple(o['q'][0]),str(i),fill=(255,0,255))
im.save(sys.argv[1].replace('img/','/tmp/claude-0/-home-user-Tokengame/1df67797-ff41-5ea2-9987-a821861ee79a/scratchpad/q-').replace('.jpg','.png'))
print(json.dumps(out))
