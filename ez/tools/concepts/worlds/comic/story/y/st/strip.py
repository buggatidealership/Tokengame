# /usr/bin/python3 strip.py <dir> <out> t1,t2,... : quick side-by-side review strip at half size
import sys
from PIL import Image
D,O,T=sys.argv[1],sys.argv[2],sys.argv[3].split(',')
ims=[Image.open(f'{D}/{t}-390.png').convert('RGB') for t in T]
W=sum(i.width for i in ims);B=Image.new('RGB',(W,ims[0].height));x=0
for i in ims:B.paste(i,(x,0));x+=i.width
B.resize((W//2,ims[0].height//2)).save(O)
