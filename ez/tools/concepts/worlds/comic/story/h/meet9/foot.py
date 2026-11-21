# python3 foot.py : chip9-<m>-1800/1200.jpg/.webp in out/ = the live chip8c paintings with a fifth glass window in the empty foot band,
# 9-sliced from the chip's own painted SEASON window (bezel, glass, glare: the chip's material, identical on all four, lesson 119).
from PIL import Image
import os
MED='../../../../../../../media/'
SE=(531,418,1251,526)          # SEASON window, outer, in the 1800 painting (measured)
FT=(412,545,1250,618)          # target in the foot band, outer (gold rule at 541, label bezel at 619)
for m in ['grok','claude','gpt','kimi']:
  im=Image.open(MED+f'chip8c-{m}-1800.jpg').convert('RGB')
  src=im.crop(SE);sw,sh=src.size;tw,th=FT[2]-FT[0],FT[3]-FT[1];k=th/sh
  cap=int(sh*.55)                 # corner width in the source: keeps the bezel's round ends whole
  L=src.crop((0,0,cap,sh)).resize((round(cap*k),th),Image.LANCZOS)
  R=src.crop((sw-cap,0,sw,sh)).resize((round(cap*k),th),Image.LANCZOS)
  M=src.crop((cap,0,sw-cap,sh)).resize((tw-2*L.size[0],th),Image.LANCZOS)
  win=Image.new('RGB',(tw,th));win.paste(L,(0,0));win.paste(M,(L.size[0],0));win.paste(R,(tw-R.size[0],0))
  im.paste(win,FT[:2])
  for w in (1800,1200):
    o=im if w==1800 else im.resize((w,round(728*w/1800)),Image.LANCZOS)
    o.save(f'out/chip9-{m}-{w}.jpg',quality=90);o.save(f'out/chip9-{m}-{w}.webp',quality=90)
print('ok')
