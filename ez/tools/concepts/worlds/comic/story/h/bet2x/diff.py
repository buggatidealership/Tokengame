# python diff.py <dir> <widths>: compares sec-<W>-x3.png and sec-<W>-x2.png inside the section, best of integer y shifts -6..6
# (the two pages place the section at different sub-pixel y), and writes diff-<W>.png (differences x8).
import sys,json
from PIL import Image,ImageChops,ImageStat
d=sys.argv[1];out={}
for W in sys.argv[2].split(','):
    a=Image.open(f'{d}/sec-{W}-x3.png').convert('RGB');b=Image.open(f'{d}/sec-{W}-x2.png').convert('RGB')
    w,h=a.size;best=None
    for dy in range(-6,7):
        A=a.crop((0,max(0,dy),w,h+min(0,dy)));B=b.crop((0,max(0,-dy),w,h-max(0,dy)))
        df=ImageChops.difference(A,B).convert('L');hist=df.histogram();n=sum(hist)
        r={'dy':dy,'mean':round(ImageStat.Stat(df).mean[0],3),'px>24 %':round(100*sum(hist[25:])/n,3),'px>64 %':round(100*sum(hist[65:])/n,3),'identical %':round(100*hist[0]/n,2)}
        if best is None or r['mean']<best[0]['mean']:best=(r,df)
    r,df=best;r['size']=[w,h];r['size_x2']=list(b.size);out[W]=r
    df.point(lambda v:min(255,v*8)).save(f'{d}/diff-{W}.png')
print(json.dumps(out,indent=1))
