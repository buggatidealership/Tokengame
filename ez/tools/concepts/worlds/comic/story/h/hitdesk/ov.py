import sys,json
from PIL import Image,ImageDraw
Q=json.loads(sys.argv[2]);im=Image.open(sys.argv[1]).convert('RGB');d=ImageDraw.Draw(im)
for q in Q:d.polygon([tuple(p) for p in q],outline=(255,0,255),width=3)
im.save(sys.argv[3])
