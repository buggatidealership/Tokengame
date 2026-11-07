import sys
from PIL import Image
im=Image.open(sys.argv[1]);w,h=im.size;seg=int(sys.argv[3]) if len(sys.argv)>3 else 2300
parts=[im.crop((0,i,w,min(h,i+seg))) for i in range(0,h,seg)]
o=Image.new('RGB',(len(parts)*(w+10),seg),'#333')
for k,p in enumerate(parts):o.paste(p,(k*(w+10),0))
o.save(sys.argv[2])
