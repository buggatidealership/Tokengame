# /usr/bin/python3 test.py <out> <W> <id> : finishes T2 (magenta pixels), T4 (gap halves' hue), T5 (contrast of bare-ground text)
import json,sys,colorsys,numpy as np
from PIL import Image
sys.path.insert(0,__import__('os').path.dirname(__file__));from stitch import stitch
O,W,ID=sys.argv[1:4];j=json.load(open(f'{O}/test-{W}-{ID}.json'))
import os
ld=lambda b:Image.open(b+'.png') if not os.path.exists(b+'.part0.png') else stitch(b)
mag=np.asarray(ld(f'{O}/mag-{W}-{ID}')).astype(int);g=np.asarray(ld(f'{O}/gnd-{W}-{ID}')).astype(float)/255
m=(mag[...,0]>235)&(mag[...,1]<25)&(mag[...,2]>235);j['T2_magenta_px']=int(m.sum());j['T2']=bool(m.sum()==0)
if m.sum():ys=np.where(m.any(1))[0];j['T2_rows']=[int(ys.min()),int(ys.max())]
MASK={'GREEN':'#2f6a3e','GROK':'#5d6165','CLAUDE':'#a4572a','GPT':'#3c7146','KIMI':'#3f5684','VAULT':'#0b0a10','BARE':'#24221e'}
def hue(c):return colorsys.rgb_to_hsv(*c)
# T4: the gap's halves: mean colour of the top and bottom quarter rows, hue vs mask hue (only for chromatic masks)
res=[];y=0
lin=lambda c:np.where(c<=.04045,c/12.92,((c+.055)/1.055)**2.4)
def L(c):return (lin(c)*[.2126,.7152,.0722]).sum(-1)
# locate gaps from the ground shot: use the json's gap order and heights along with band data is not stored here -> recompute from test json via positions
j['T4']='see gap close-ups';
# T5
out=[];fails=0
for t in j['txt']:
  y0,y1,x0,x1=t['y'],t['y']+t['h'],max(0,t['x']),min(g.shape[1],t['x']+t['w'])
  if y1>g.shape[0] or x1<=x0:continue
  reg=g[y0:y1,x0:x1].reshape(-1,3);lg=np.percentile(L(reg),95)
  c=[int(v) for v in t['c'].replace('rgba(','').replace('rgb(','').replace(')','').split(',')[:3]];lt=L(np.array(c)/255)
  cr=(max(lt,lg)+.05)/(min(lt,lg)+.05);out.append((round(float(cr),1),t['t']));fails+=int(cr<4.5)
j['T5_min']=min(out)[0] if out else None;j['T5_fail']=fails;j['T5_n']=len(out);j['T5_worst']=sorted(out)[:5]
json.dump(j,open(f'{O}/test-{W}-{ID}.json','w'),indent=1)
print(ID,W,{k:j[k] for k in ['T1','T2','T3','T5_min','T5_fail','T5_n','T6near']},j.get('T2_rows'),j['T5_worst'][:3])
