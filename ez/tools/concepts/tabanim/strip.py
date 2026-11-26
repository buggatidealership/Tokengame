# /usr/bin/python3 strip.py T1 [out]: frames 0,1..4,9 side by side at half size (a quick look)
import sys
from PIL import Image
t=sys.argv[1];out=sys.argv[2] if len(sys.argv)>2 else '/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/'+t+'.png'
ims=[Image.open(f'frames/{t}-{i}.png') for i in [0,1,2,3,4,9]];w,h=ims[0].size;s=.5
o=Image.new('RGB',(int(w*s)*6,int(h*s)),'black')
for i,im in enumerate(ims):o.paste(im.resize((int(w*s),int(h*s))),(i*int(w*s),0))
o.save(out)
