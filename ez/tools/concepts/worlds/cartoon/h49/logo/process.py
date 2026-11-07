import sys,os
from PIL import Image,ImageDraw
FLOOD={'DDOG','USAR'}
def flood_white(im,tol=28):
    im=im.convert('RGBA');W,H=im.size;px=im.load()
    seen=bytearray(W*H);stack=[(x,y) for x in range(W) for y in (0,H-1)]+[(x,y) for y in range(H) for x in (0,W-1)]
    def white(p):return p[3]>0 and p[0]>255-tol and p[1]>255-tol and p[2]>255-tol
    while stack:
        x,y=stack.pop();i=y*W+x
        if seen[i]:continue
        seen[i]=1;p=px[x,y]
        if p[3]==0 or white(p):
            # soften: partial alpha for near-white edge pixels
            px[x,y]=(p[0],p[1],p[2],0)
            if x>0:stack.append((x-1,y))
            if x<W-1:stack.append((x+1,y))
            if y>0:stack.append((x,y-1))
            if y<H-1:stack.append((x,y+1))
    return im
for f in sorted(os.listdir('raw')):
    k=f[:-4];im=Image.open('raw/'+f).convert('RGBA')
    if k in FLOOD: im=flood_white(im)
    bb=im.getchannel('A').point(lambda a:255 if a>8 else 0).getbbox()
    im=im.crop(bb);w,h=im.size
    side=int(round(max(w,h)*1.04));side=max(side,1)
    sq=Image.new('RGBA',(side,side),(0,0,0,0));sq.paste(im,((side-w)//2,(side-h)//2),im)
    if side>512: sq=sq.resize((512,512),Image.LANCZOS)
    sq.save('out/%s-2.png'%k,optimize=True)
    print(k,'mark %dx%d'%(w,h),'->',sq.size,os.path.getsize('out/%s-2.png'%k))
# pass 2: square symbols to 320px, wordmarks keep 512; quantize to a palette with alpha when it saves bytes and stays faithful
import io
for f in sorted(os.listdir('out')):
    p='out/'+f;im=Image.open(p).convert('RGBA');a=im.getchannel('A').getbbox();w,h=a[2]-a[0],a[3]-a[1]
    if max(w,h)/min(w,h)<1.6 and im.size[0]>320: im=im.resize((320,320),Image.LANCZOS)
    q=im.quantize(colors=256,method=Image.Quantize.FASTOCTREE,dither=Image.Dither.NONE)
    b1=io.BytesIO();im.save(b1,'PNG',optimize=True);b2=io.BytesIO();q.save(b2,'PNG',optimize=True)
    # faithfulness: mean abs error of the quantized image
    import itertools
    e=sum(abs(x-y) for p1,p2 in zip(im.getdata(),q.convert('RGBA').getdata()) for x,y in zip(p1,p2))/(im.size[0]*im.size[1]*4)
    data=b2.getvalue() if e<1.2 and len(b2.getvalue())<len(b1.getvalue()) else b1.getvalue()
    open(p,'wb').write(data);print(f,im.size,len(b1.getvalue()),len(b2.getvalue()),'err %.2f'%e,'->',len(data))
