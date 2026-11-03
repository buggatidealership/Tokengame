# /usr/bin/python3 key.py img/x-run.png img/x  -> img/x-<m>.png (grok,claude,gpt,kimi = TL,TR,BL,BR), magenta keyed out, cropped tight, max 520 px wide
import sys
from PIL import Image
src,pre=sys.argv[1],sys.argv[2];FLIP='flip' in sys.argv
im=Image.open(src).convert('RGBA');W,H=im.size;px=im.load()
for y in range(H):
  for x in range(W):
    r,g,b,a=px[x,y]
    m=min(r,b)-g  # magenta-ness
    if m>110 and r>150 and b>150: px[x,y]=(0,0,0,0)
    elif m>45 and r>110 and b>110:
      k=(m-45)/65.0; a=int(255*(1-k)); s=min(r,b)
      # pull the magenta out of the fringe
      r=int(max(0,r-(s-g)*k)); b=int(max(0,b-(s-g)*k)); px[x,y]=(r,g,b,max(0,a))
for i,m in enumerate(['grok','claude','gpt','kimi']):
  q=im.crop(((i%2)*W//2,(i//2)*H//2,(i%2+1)*W//2,(i//2+1)*H//2));bb=q.getchannel('A').point(lambda v:255 if v>40 else 0).getbbox()
  q=q.crop(bb)
  if q.width>520:q=q.resize((520,int(q.height*520/q.width)),Image.LANCZOS)
  if FLIP:q=q.transpose(Image.FLIP_LEFT_RIGHT)
  q.save(f'{pre}-{m}.png',optimize=True);print(m,q.size)
