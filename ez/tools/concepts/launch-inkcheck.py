import json,sys
from PIL import Image
out=sys.argv[1];S=2
im=Image.open(out+'-full.png').convert('RGB');B=json.load(open(out+'-boxes.json'))
def inkrows(box,dark=True,pad=4):
    x0,y0,x1,y1=[int(round(v*S)) for v in box];y0-=pad*S;y1+=pad*S
    rows=[]
    for y in range(y0,y1):
        n=0
        for x in range(x0,x1):
            r,g,b=im.getpixel((x,y));l=.299*r+.587*g+.114*b
            if l<70:n+=1
        if n>=2:rows.append(y)
    return rows
for i,b in enumerate(B):
    rt,rb=b['row'][1]*S,b['row'][3]*S;mid=(rt+rb)/2
    res=[]
    for k in ('lg','nm','fq','hit','roi'):
        bx=b[k]
        # stay inside the strip's ink outline (3px border) so the border itself is not counted
        bx=[bx[0],max(bx[1],b['row'][1]+3.5),bx[2],min(bx[3],b['row'][3]-3.5)]
        rows=inkrows(bx,pad=0)
        if not rows:res.append(k+':none');continue
        # largest run of consecutive rows = the glyphs (drops a stray line)
        runs=[];cur=[rows[0]]
        for y in rows[1:]:
            if y==cur[-1]+1:cur.append(y)
            else:runs.append(cur);cur=[y]
        runs.append(cur);run=max(runs,key=len)
        c=(run[0]+run[-1]+1)/2
        res.append('%s:%+.1f'%(k,(c-mid)/S))
    print('row',i+1,' '.join(res),' boxes x:',[round(v) for v in b['f2x']],'gap',[round(v) for v in b['gap']])
