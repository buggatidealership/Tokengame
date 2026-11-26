# python3 blk.py <ref dir> <run dir> [...]: per stop, share of 32x32 device-px blocks below the header that are solid black in the run but not in the reference (dropped tiles).
import sys,os,re
from PIL import Image
def blocks(f):
    im=Image.open(f).convert('L');w,h=im.size;top=int(110*2.75);px=im.load();R={}
    for by in range(top,h-32,32):
        for bx in range(0,w-32,32):
            vals=[px[bx+i,by+j] for i in range(0,32,4) for j in range(0,32,4)]
            R[(bx,by)]=max(vals)
    return R
ref=sys.argv[1]
for run in sys.argv[2:]:
    out=[]
    for fn in sorted(os.listdir(run),key=lambda s:int(re.sub(r'\D','',s) or 0)):
        if not fn.endswith('.png'):continue
        a=blocks(os.path.join(ref,fn));b=blocks(os.path.join(run,fn))
        n=sum(1 for k in b if b[k]<6 and a.get(k,0)>=6);out.append('%s:%.1f'%(fn[1:-4],100*n/len(b)))
    print(run,' '.join(out))
