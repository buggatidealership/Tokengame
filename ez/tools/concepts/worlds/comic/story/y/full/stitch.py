# stitch viewport captures (list.json: [[file, scrollY], ...], total height, dpr) into one page image
import json,sys
from PIL import Image
d=json.load(open(sys.argv[1]));k=d['dpr'];ims=[(Image.open(f),y) for f,y in d['L']];W=ims[0][0].size[0]
out=Image.new('RGB',(W,int(d['TH']*k)),'white')
for im,y in ims: out.paste(im,(0,int(y*k)))
out.save(sys.argv[2])
