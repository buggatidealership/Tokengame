# /usr/bin/python3 stitch.py <out.png> : stitch shot.js parts (each a viewport screenshot at scrollY sy) into the region y0..y1
import json,sys,os
from PIL import Image
o=sys.argv[1];J=json.load(open(o+'.json'));d=J['dpr'];y0,y1=J['y'];W=J['W']
c=Image.new('RGB',(W*d,int((y1-y0)*d)))
for pt in J['parts']:
  im=Image.open(pt['f']);off=int((pt['sy']-y0)*d)
  # use the part from its wanted y (later parts overwrite overlaps where the page could not scroll further)
  cut=int((pt['want']-pt['sy'])*d);c.paste(im.crop((0,cut,im.size[0],im.size[1])),(0,off+cut))
  os.remove(pt['f'])
c.save(o);os.remove(o+'.json');print(o,c.size)
