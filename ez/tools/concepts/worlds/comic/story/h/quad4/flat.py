# /usr/bin/python3 flat.py : H23 test 5 on the exported paintings: share of the frame in flat single-colour areas (12 px blocks with luminance
# std < 3.5 and mean within 6 of a flat neighbour, connected), largest flat region, with and without the display glass / gold lid (quads.json).
import json
from PIL import Image,ImageDraw,ImageStat
J=json.load(open('quads.json'));B=12
for k,v in J.items():
  im=Image.open('out/'+v['file']).convert('L');W=im.size[0];s=W/v['crop'][2]
  m=Image.new('L',im.size,0);d=ImageDraw.Draw(m);[d.polygon([(x*s,y*s) for x,y in q],fill=255) for q in v['q']]
  n=W//B;fl={};
  for j in range(n):
    for i in range(n):
      box=(i*B,j*B,i*B+B,j*B+B);st=ImageStat.Stat(im.crop(box))
      fl[(i,j)]=(st.stddev[0]<3.5,st.mean[0],ImageStat.Stat(m.crop(box)).mean[0]>127)
  def comps(excl):
    seen=set();best=0;tot=0
    for p,(f,mu,inq) in fl.items():
      if not f or p in seen or (excl and inq):continue
      st=[p];seen.add(p);c=0
      while st:
        a=st.pop();c+=1
        for q in((a[0]+1,a[1]),(a[0]-1,a[1]),(a[0],a[1]+1),(a[0],a[1]-1)):
          if q in fl and q not in seen and fl[q][0] and abs(fl[q][1]-fl[a][1])<6 and not(excl and fl[q][2]):seen.add(q);st.append(q)
      best=max(best,c);tot+=c
    return round(best/len(fl)*100,1),round(tot/len(fl)*100,1)
  print(k,'largest/total flat % (all):',comps(False),' (board only, displays/lid excluded):',comps(True))
