#!/usr/bin/python3
# where each painting actually put its five last-5 objects: python3 measure.py -> fit.json {ticket: [[x0,y0,x1,y1] x5] as fractions}
# the objects have a colour of their own: silver bulbs (exchange lamps, midway bulbs) or the gallery's red velvet ovals. In the ticket's
# lower part, columns holding that colour form runs; the five widest are the objects; their rows give the height.
import os,json,glob
from PIL import Image
import numpy as np
# set by eye where the colour test finds nothing (halftone-shaded lamps): centres x in px, centre y and diameter as fractions
HAND={'t-ex-d-grok':([175,257,340,421,503],.895,.125),'t-ex-d-kimi':([183,260,337,413,490],.915,.115)}
D=os.path.dirname(os.path.abspath(__file__));L=json.load(open(D+'/layout.json'));out={}
for fn in sorted(glob.glob(D+'/img/t-*.jpg')):
  n=os.path.basename(fn)[:-4];w,a=n.split('-')[1:3];S=L[a];im=np.asarray(Image.open(fn).convert('RGB')).astype(int);H,W,_=im.shape
  y0=int(H*(S['box0'][1]-.06));x0=int(S['stub'][2]*W+30);reg=im[y0:H-8,x0:W-10];r,g,b=reg[...,0],reg[...,1],reg[...,2]
  if w=='gal':m=(r>90)&(g<70)&(b<70)&(r>2*g)
  elif w=='ex':m=(reg.min(axis=2)>100)&((reg.max(axis=2)-reg.min(axis=2))<55)
  else:m=(reg.min(axis=2)>120)&((reg.max(axis=2)-reg.min(axis=2))<45)
  col=m.mean(axis=0);on=col>col.max()*.25
  runs=[];s=None;bw=S['boxw']*W
  for i,v in enumerate(list(on)+[False]):
    if v and s is None:s=i
    if not v and s is not None:
      if i-s>bw*.3:runs.append((s,i))
      s=None
  runs=sorted(sorted(runs,key=lambda q:-(q[1]-q[0]))[:5]);bx=[]
  for s,e in runs:
    rows=np.where(m[:,s:e].mean(axis=1)>.15)[0]
    # the longest block of rows (a bulb, not a stray highlight elsewhere)
    blocks=np.split(rows,np.where(np.diff(rows)>3)[0]+1);bl=max(blocks,key=len)
    bx.append([round((x0+s)/W,4),round((y0+bl.min())/H,4),round((x0+e)/W,4),round((y0+bl.max())/H,4)])
  if n in HAND:bx=[[round((cx-HAND[n][2]/2*W)/W,4),round(HAND[n][1]-HAND[n][2]/2*W/H,4),round((cx+HAND[n][2]/2*W)/W,4),round(HAND[n][1]+HAND[n][2]/2*W/H,4)] for cx in HAND[n][0]]
  out[n]=bx;print(n,len(bx))
# the gold medallion: gold pixels near the guide's coin, the largest block of rows and columns
for fn in sorted(glob.glob(D+'/img/t-*.jpg')):
  n=os.path.basename(fn)[:-4];a=n.split('-')[2];S=L[a];im=np.asarray(Image.open(fn).convert('RGB')).astype(int);H,W,_=im.shape
  c=S['coin'];x0,x1=int((S['stub'][2]+.02)*W),int((min(c[2]+.06,S['win'][0]-.01) if a=='p' else c[2]+.03)*W);y0,y1=int(max(c[1]-.04,0)*H),int((c[3]+.03)*H)
  reg=im[y0:y1,x0:x1];r,g,b=reg[...,0],reg[...,1],reg[...,2];m=(r>150)&(g>110)&(b<120)&(r-b>70)
  def span(v):
    idx=np.where(v>v.max()*.3)[0];bl=np.split(idx,np.where(np.diff(idx)>2)[0]+1);bl=max(bl,key=len);return bl.min(),bl.max()
  try:cx0,cx1=span(m.mean(axis=0));cy0,cy1=span(m[:,cx0:cx1+1].mean(axis=1))
  except ValueError:print('coin: guide',n);continue
  out['coin-'+n]=[round((x0+cx0)/W,4),round((y0+cy0)/H,4),round((x0+cx1)/W,4),round((y0+cy1)/H,4)]
json.dump(out,open(D+'/fit.json','w'))
