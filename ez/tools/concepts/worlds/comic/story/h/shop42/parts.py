# /usr/bin/python3 parts.py [names] : cuts the painted parts out of img/<src>.jpg by parts.json into img/p-<name>-<part>.webp
# case/cnt: the crop (the 9-slice source). In the fill, "erase" bands (painted shelves, full interior width) and "eraseR" rects (a painted sign,
#   a step) are covered with the felt just below/above them, mirrored, so the stretched fill is plain felt; "key" (a keyhole on a stile that
#   would stretch) is cut to its own sprite and its place patched; "hang" (a sign or plaque) is cut to its own sprite (p-<name>-hang.webp) with
#   its painted face, placed by the page. shelf / skirt / bg: plain crops. Writes img/parts.out.json (sizes and boxes relative to each crop).
import json,sys
from PIL import Image,ImageOps,ImageFilter
def fpaste(c,src,xy,fe=24):
  m=Image.new('L',src.size,0);m.paste(255,(fe,fe,max(fe+1,src.width-fe),max(fe+1,src.height-fe)));m=m.filter(ImageFilter.GaussianBlur(fe/2.5));c.paste(src,xy,m)
S=json.load(open('parts.json'));O={}
try:O=json.load(open('img/parts.out.json'))
except Exception:pass
for nm,sp in S.items():
  if len(sys.argv)>1 and nm not in sys.argv[1:]:continue
  im0=Image.open('img/%s.jpg'%sp['src']).convert('RGB');o={}
  for part,p in sp.items():
    if part=='src':continue
    im=Image.open('img/%s.jpg'%p['src']).convert('RGB') if 'src' in p else im0
    x0,y0,x1,y1=p['crop'];c=im.crop((x0,y0,x1,y1)).copy();q={'w':c.width,'h':c.height,'s':p.get('s')}
    if 'hang' in p:
      h=p['hang'];hx0,hy0,hx1,hy1=h['crop'];im.crop((hx0,hy0,hx1,hy1)).save('img/p-%s-hang.webp'%nm,quality=90)
      f=h['face'];q['hang']={'w':hx1-hx0,'h':hy1-hy0,'x':hx0-x0,'y':hy0-y0,'at':h['at'],'face':[(f[0]-hx0)/(hx1-hx0),(f[1]-hy0)/(hy1-hy0),(f[2]-hx0)/(hx1-hx0),(f[3]-hy0)/(hy1-hy0)]}
    for a,b in p.get('erase',[]):
      hh=b-a;l=p['s'][3];r=c.width-p['s'][1]
      src=c.crop((l,a-y0-hh,r,a-y0));c.paste(ImageOps.flip(src),(l,a-y0))
    for rx0,ry0,rx1,ry1 in p.get('eraseR',[]):
      fe=24;hh=ry1-ry0;src=c.crop((rx0-x0-fe,ry1-y0-fe,rx1-x0+fe,ry1-y0+hh+fe));fpaste(c,ImageOps.flip(src),(rx0-x0-fe,ry0-y0-fe),fe)
    if 'key' in p:
      kx0,ky0,kx1,ky1=p['key'];im.crop((kx0,ky0,kx1,ky1)).save('img/p-%s-key.webp'%nm,quality=90)
      hh=ky1-ky0;c.paste(im.crop((kx0,ky0-hh-10,kx1,ky0-10)),(kx0-x0,ky0-y0));q['key']=[kx0-x0,ky0-y0,kx1-x0,ky1-y0]
    if 'plate' in p:px0,py0,px1,py1=p['plate'];q['plate']=[px0-x0,py0-y0,px1-x0,py1-y0]
    if c.width>2000 and part in('bg','skirt'):c=c.resize((2000,round(2000*c.height/c.width)),Image.LANCZOS)
    c.save('img/p-%s-%s.webp'%(nm,part),quality=88);o[part]=q
  O[nm]=o;print(nm,json.dumps(o))
json.dump(O,open('img/parts.out.json','w'),indent=0)
