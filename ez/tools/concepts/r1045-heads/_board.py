# r1045 boards: /usr/bin/python3 r1045-heads/_board.py -> ez/x2p-r1045-heads.png (390) and ez/x2p-r1045-heads-desktop.png (1280)
from PIL import Image,ImageDraw,ImageFont
S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/r1045/';EZ='/home/user/Tokengame/ez/'
B=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',30);R=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',20);BG='#1e1c22'
T=[('now','Today (live)','Anton heads, origami straps'),('A','A  Logo lockup','green edge left, red edge right'),('B','B  Cream tape','the logo inside out'),('C','C  Speed lines','slashes carry it, no strap box'),('D','D  Two-tier slab','lower third; standings the main event'),('E','E  The emblem','the number as a tiny EZ. logo')]
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
board(390,.45,0,390,'x2p-r1045-heads.png','Section heads in the EZ. logo\'s language, straps to match (mockups, 390 px; production is "Today")',
 'Rendered at 3x, shown at 45%. Standings strap reads "All tracked, public, graded at the close." in A to E and drops from 16.5 to 12 px; the proof strap from 16 to 13 px. Kanit black italic heads, upright Saira Condensed straps.')
board(1280,.42,30,960,'x2p-r1045-heads-desktop.png','Section heads in the EZ. logo\'s language, straps to match (mockups, 1280 px; production is "Today")',
 'Rendered at 1.5x, shown at 42%, cropped to the left 930 px of the page. Standings strap 13.5 px (was 16.5), the proof strap 15 px.')
