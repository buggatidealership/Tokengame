# /usr/bin/python3 gate.py <shots dir> <W> <id> : WCAG contrast of every shown text against its ground read from the bare shot's pixels
# (body 4.5:1, big 3:1: 24px+, or 18.66px+ bold, or the Bangers/Anton display faces at 18px+); a stroked heading is read by its ink edge.
import json,sys,re
from PIL import Image
D,W,ID=sys.argv[1],int(sys.argv[2]),sys.argv[3]
g=json.load(open(f'{D}/gate-{W}-{ID}.json'));im=Image.open(f'{D}/bare-{W}-{ID}.png').convert('RGB');px=im.load();sc=im.width/W
def lin(c):c/=255;return c/12.92 if c<=.03928 else ((c+.055)/1.055)**2.4
def lum(c):return .2126*lin(c[0])+.7152*lin(c[1])+.0722*lin(c[2])
def cr(a,b):x,y=lum(a),lum(b);return (max(x,y)+.05)/(min(x,y)+.05)
def rgba(s):
  m=re.findall(r'[\d.]+',s or '')
  if not m:return None
  v=[float(x) for x in m]
  if s.startswith('color(srgb'):v=[v[0]*255,v[1]*255,v[2]*255]+v[3:]
  return v+[1] if len(v)==3 else v
res={};rows=[]
for t in g['texts']:
  bx=t['box'][0];x0,y0,w,h=bx;samp=[]
  if t['fs']>=30:
    # a display heading paints its own extrusion and shadow: read its ground on a ring just outside its box
    m=10
    for xx in range(int((x0-m)*sc),int((x0+w+m)*sc),max(1,int(w*sc/16))):
      for yy in (int((y0-m)*sc),int((y0+h+m)*sc)):
        if 0<=xx<im.width and 0<=yy<im.height:samp.append(px[xx,yy])
    for yy in range(int(y0*sc),int((y0+h)*sc),max(1,int(h*sc/6))):
      for xx in (int((x0-m)*sc),int((x0+w+m)*sc)):
        if 0<=xx<im.width and 0<=yy<im.height:samp.append(px[xx,yy])
  else:
    for yy in range(int(y0*sc),int((y0+h)*sc),max(1,int(h*sc/6))):
      for xx in range(int(x0*sc),int((x0+w)*sc),max(1,int(w*sc/12))):
        if 0<=xx<im.width and 0<=yy<im.height:samp.append(px[xx,yy])
  if not samp:continue
  samp.sort(key=lum);gr=samp[len(samp)//2]
  c=rgba(t['fill']) if t['fill'] and not t['fill'].startswith('rgba(0, 0, 0, 0)') else rgba(t['col'])
  if t['clip'] or not c or c[3]<.05:
    if t['stroke']>=1:c=rgba(t['strokeCol'])
    else:continue
  if t['stroke']>=1.2 and rgba(t['strokeCol']):
    sc2=rgba(t['strokeCol']);c2=[sc2[i]*sc2[3]+gr[i]*(1-sc2[3]) for i in range(3)]
    c1=[c[i]*c[3]+gr[i]*(1-c[3]) for i in range(3)];r=max(cr(c1,gr),cr(c2,gr));how='edge'
  else:
    c1=[c[i]*c[3]+gr[i]*(1-c[3]) for i in range(3)];r=cr(c1,gr);how='fill'
  big=t['fs']>=24 or (t['fs']>=18.66 and t['fw']>=700) or (t['font'] in('Bangers','Anton') and t['fs']>=18)
  need=3 if big else 4.5;sec=t['sec']
  rows.append(dict(onG=t.get('onG'),sec=sec,t=t['t'],fs=t['fs'],r=round(r,2),need=need,how=how,ground='#%02x%02x%02x'%gr[:3]))
for row in rows:
  s=res.setdefault(row['sec'],{'n':0,'min':99,'minT':'','fails':[],'minFs':99,'small':[],'nG':0,'minG':99,'minGT':''});s['n']+=1;s['minFs']=min(s['minFs'],row['fs'])
  if row['onG']:
    s['nG']+=1
    if row['r']<s['minG']:s['minG']=row['r'];s['minGT']=f"{row['t']} ({row['fs']}px, needs {row['need']}, on {row['ground']})"
  if row['fs']<8:s['small'].append(row['t'])
  if row['r']<s['min']:s['min']=row['r'];s['minT']=f"{row['t']} ({row['fs']}px, needs {row['need']}, on {row['ground']})"
  if row['r']<row['need']:s['fails'].append(f"{row['t']} {row['r']}<{row['need']} on {row['ground']}")
order=[x[0] for x in g['secs']]
out={'W':W,'id':ID,'sideways':g['sw']>g['vw'],'sections':{k:{**res[k],'fails':res[k]['fails'][:12],'nfail':len(res[k]['fails']),'small':res[k]['small'][:6]} for k in order if k in res},'grounds':g['secs']}
json.dump(out,open(f'{D}/contrast-{W}-{ID}.json','w'),indent=1)
print(W,ID,'sideways' if out['sideways'] else 'no sideways scroll')
for k,v in out['sections'].items():print(f"  {k:8s} n={v['n']:3d} min={v['min']:5.2f} fails={v['nfail']:2d} minFs={v['minFs']}  {v['minT']}\n           on the ground: n={v['nG']} min={v['minG']:5.2f}  {v['minGT']}")
