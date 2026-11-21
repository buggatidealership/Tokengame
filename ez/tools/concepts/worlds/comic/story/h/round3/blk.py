import sys
from PIL import Image
# share of near-black pixels below the header (device px), and of near-black 32x32 blocks (a dropped tile is a solid block)
for f in sys.argv[1:]:
    im=Image.open(f).convert('L');w,h=im.size;im=im.crop((0,int(h*.14),w,h));px=im.load();W,H=im.size
    nb=0;tot=0
    for by in range(0,H-32,32):
        for bx in range(0,W-32,32):
            tot+=1
            if all(px[bx+i,by+j]<6 for i in range(0,32,4) for j in range(0,32,4)):nb+=1
    print(f,'solid-black blocks %.1f%%'%(100*nb/tot))
