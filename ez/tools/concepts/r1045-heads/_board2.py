# r1045 round 2 boards: /usr/bin/python3 r1045-heads/_board2.py -> ez/x2p-r1045-heads-2.png (390) and -2-desktop.png (1280)
from PIL import Image,ImageDraw,ImageFont
S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/r1045/';EZ='/home/user/Tokengame/ez/'
B=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',30);R=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',20);BG='#1e1c22'
T=[('now','Today (live)','Anton heads, origami straps'),('M1','M1  Lockup + numbers','A heads (no square), E numbers, today\'s strap'),('M2','M2  Slab + numbers','D slab in E colours, E numbers, today\'s strap')]
RW=[('rec','01 The record: head + Receipts strap'),('std','02 Current standings: head + rules strap + top of the board'),('proof','03 The proof: head + stats strap + top of the ticket')]
def board(w,k,x0,x1,out,title,sub):
    ims={(t,r):Image.open(f'{S}{t}-{w}-{r}.png') for t,_,_ in T for r,_ in RW}
    sc=ims[('now','rec')].width/w
    ims={kk:v.crop((int(x0*sc),0,int(x1*sc),v.height)) for kk,v in ims.items()}
    ims={kk:v.resize((int(v.width*k),int(v.height*k)),Image.LANCZOS) for kk,v in ims.items()}
    cw=ims[('now','rec')].width;pad=22;H=[max(ims[(t,r)].height for t,_,_ in T) for r,_ in RW]
    W=pad+len(T)*(cw+pad);Ht=150+sum(h+60 for h in H)+20
    im=Image.new('RGB',(W,Ht),BG);d=ImageDraw.Draw(im)
    d.text((pad,18),title,font=B,fill='#f2b632');d.text((pad,60),sub,font=R,fill='#b8ad94')
    for i,(t,a,b) in enumerate(T):x=pad+i*(cw+pad);d.text((x,98),a,font=B,fill='#f4ead0');d.text((x,134),b,font=R,fill='#b8ad94')
    y=170
    for j,(r,lab) in enumerate(RW):
        d.text((pad,y),lab,font=R,fill='#f4ead0');y+=32
        for i,(t,_,_) in enumerate(T):im.paste(ims[(t,r)],(pad+i*(cw+pad),y))
        y+=H[j]+28
    im=im.crop((0,0,W,y));im.save(EZ+out,optimize=True);print(out,im.size)
board(390,.5,0,390,'x2p-r1045-heads-2.png','Section heads, round 2: two morphs (mockups, 390 px; production is "Today")',
 'Shown at 50%. Straps: today\'s module and origami colours, Saira Condensed 600 capitals; rules 12 px, stats 13 px, record 14 px. No gold square after the heads.')
board(1280,.42,30,960,'x2p-r1045-heads-2-desktop.png','Section heads, round 2: two morphs (mockups, 1280 px; production is "Today")',
 'Shown at 42%, the left 930 px of the page. Straps: rules 13.5 px, stats 15 px, record 16 px.')
