#!/usr/bin/python3
# cast6: hand fixes to fields.json/fit.json, the wall plate's frame window and quote board, the hands' card and thumb.  python3 geom.py
import json,os
import numpy as np
from PIL import Image,ImageDraw,ImageFilter
D=os.path.dirname(os.path.abspath(__file__));F=json.load(open(D+'/fields.json'));T=json.load(open(D+'/fit.json'));G={}
# version tags: the colour test caught a highlight on the brass on four tickets; the tag sits just under the pennant
for n,v in F.items():
  r=v['ribbon'];a=np.asarray(Image.open(f'{D}/img/{n}.jpg').convert('RGB')).astype(int);H,W,_=a.shape
  y0,y1,x0,x1=int((r[3]+.005)*H),int((r[3]+.085)*H),int(.15*W),int((v.get('win',[.52])[0]-.085)*W);reg=a[y0:y1,x0:x1];R,Gg,B=reg[...,0],reg[...,1],reg[...,2]
  m=(R>110)&(Gg>70)&(B<110)&(R-B>45)&(Gg>R*.58)  # brass, not the orange stock
  cols=np.where(m.mean(axis=0)>.3)[0];rows=np.where(m[:,cols.min():cols.max()+1].mean(axis=1)>.5)[0] if len(cols) else []
  if len(cols)>10 and len(rows)>6:
    bl=np.split(rows,np.where(np.diff(rows)>2)[0]+1);rows=max(bl,key=len)
    v['ver']=[round((x0+cols.min())/W,4),round((y0+rows.min())/H,4),round((x0+cols.max()+1)/W,4),round((y0+rows.max()+1)/H,4)]
  else:v['ver']=[r[0],round(r[3]+.028,4),round(r[0]+.235,4),round(r[3]+.08,4)];print('ver: guide',n)
# GPT's lamps: the glass is shaded, set by eye from the painting
T['t-base-gpt']=[[x-.024,.888,x+.024,.947] for x in (.233,.326,.418,.51,.602)]
json.dump(F,open(D+'/fields.json','w'));json.dump(T,open(D+'/fit.json','w'))
import importlib.util,sys
_sp=importlib.util.spec_from_file_location('f4',D+'/fields.py')
def comps(m,k=4):
  # connected components at 1/k size (no scipy here); boxes back in full pixels
  from collections import deque
  sm=m[::k,::k];h,w=sm.shape;lab=np.zeros((h,w),int);out=[];n=0
  for y0 in range(h):
    for x0 in range(w):
      if sm[y0,x0] and not lab[y0,x0]:
        n+=1;q=deque([(y0,x0)]);lab[y0,x0]=n;b=[x0,y0,x0,y0];c=0
        while q:
          y,x=q.popleft();c+=1;b=[min(b[0],x),min(b[1],y),max(b[2],x),max(b[3],y)]
          for dy,dx in((1,0),(-1,0),(0,1),(0,-1)):
            ny,nx=y+dy,x+dx
            if 0<=ny<h and 0<=nx<w and sm[ny,nx] and not lab[ny,nx]:lab[ny,nx]=n;q.append((ny,nx))
        out.append(([b[0]*k,b[1]*k,(b[2]+1)*k,(b[3]+1)*k],c))
  return out
for a in 'pd':
  im=np.asarray(Image.open(f'{D}/img/pb2-wall-{a}.jpg').convert('RGB')).astype(int);H,W,_=im.shape
  wh=(im.min(axis=2)>225);bk=(im.max(axis=2)<45)
  hole=max(comps(wh),key=lambda c:c[1])[0];below=[c for c in comps(bk) if c[0][1]>hole[3]-5 and (c[0][2]-c[0][0])>W*.2]
  bd=max(below,key=lambda c:c[1])[0] if below else None
  G['wall-'+a]={'win':[round(hole[0]/W,4),round(hole[1]/H,4),round(hole[2]/W,4),round(hole[3]/H,4)],'board':bd and [round(bd[0]/W,4),round(bd[1]/H,4),round(bd[2]/W,4),round(bd[3]/H,4)]}
# hands: everything but the hand made clear; the card's box kept; the thumb (skin inside the card) cut as its own piece to lie over the ticket
CUFF={'h-teal':[.19,.71,.40,.83]}
EYE={'h-teal':[.241,.0176,.880,.601]}  # its thin outline leaks at quarter size: set by eye
for n in ('h-red','h-teal'):
  im=Image.open(f'{D}/img/{n}.jpg').convert('RGB');a=np.asarray(im).astype(int);H,W,_=a.shape
  white=(a.min(axis=2)>214)&((a.max(axis=2)-a.min(axis=2))<34)
  cs=comps(white);cs=[c for c in cs if not(c[0][0]<=0 and c[0][2]>=W)]  # drop the background (it spans the whole width)
  card=max(cs,key=lambda c:c[1])[0];cx0,cy0,cx1,cy1=card
  if n in EYE:cx0,cy0,cx1,cy1=[int(v*(W if i%2==0 else H)) for i,v in enumerate(EYE[n])]
  # the card's ink outline: dark pixels within 10px of the card box edge
  m=Image.new('L',(W,H),0);d=ImageDraw.Draw(m);d.rectangle([cx0-12,cy0-12,cx1+12,cy1+12],fill=255);inbox=np.asarray(m)>0
  wm=Image.fromarray((white*255).astype('uint8')).copy()  # a copy: floodfill on the array's own buffer does nothing
  for x in range(0,W,6):
    for y in (1,H-2):
      if wm.getpixel((x,y))==255:ImageDraw.floodfill(wm,(x,y),128)
  for y in range(0,H,6):
    for x in (1,W-2):
      if wm.getpixel((x,y))==255:ImageDraw.floodfill(wm,(x,y),128)
  bg=np.asarray(wm)==128
  if n in CUFF:x0,y0,x1,y1=[int(v*(W if i%2==0 else H)) for i,v in enumerate(CUFF[n])];bg[y0:y1,x0:x1]=False  # the cuff's outline is open: keep its white
  bg=bg|(white&(np.arange(W)[None,:]>=cx0)&(np.arange(W)[None,:]<cx1)&(np.arange(H)[:,None]>=cy0)&(np.arange(H)[:,None]<cy1));bgm=Image.fromarray((bg*255).astype('uint8'))
  skin=(a[...,0]>170)&(a[...,1]>110)&(a[...,2]>70)&(a[...,0]-a[...,2]>45)
  sk=Image.fromarray((skin*255).astype('uint8')).filter(ImageFilter.MaxFilter(9));skd=np.asarray(sk)>0
  keep=~bg & ~(inbox & ~skd)        # drop the card and its outline, keep the hand (the thumb's skin + its own ink) and the sleeve outside the card
  al=Image.fromarray((keep*255).astype('uint8')).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(.7))
  o=im.copy();o.putalpha(al);o.save(f'{D}/cut/{n}.webp',quality=90)
  th=keep & inbox
  t=im.copy();t.putalpha(Image.fromarray((th*255).astype('uint8')).filter(ImageFilter.GaussianBlur(.6)));t.save(f'{D}/cut/{n}-thumb.webp',quality=90)
  G[n]={'card':[round(cx0/W,4),round(cy0/H,4),round(cx1/W,4),round(cy1/H,4)]}
json.dump(G,open(D+'/geom.json','w'),indent=1);print(json.dumps(G))
# the wall plate with its giant frame's canvas cut out, so the leader's loop plays behind it
for a in 'pd':
  im=Image.open(f'{D}/img/pb2-wall-{a}.jpg').convert('RGB');W,H=im.size;w=G['wall-'+a]['win'];x0,y0,x1,y1=int(w[0]*W)-2,int(w[1]*H)-2,int(w[2]*W)+2,int(w[3]*H)+2
  arr=np.asarray(im).astype(int);wh=(arr.min(axis=2)>200);al=np.full((H,W),255,'uint8');sub=wh[y0:y1,x0:x1];al[y0:y1,x0:x1][sub]=0
  im.putalpha(Image.fromarray(al).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(.6)));im.save(f'{D}/cut/pb2-wall-{a}.webp',quality=90)
