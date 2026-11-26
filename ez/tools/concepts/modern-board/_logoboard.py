# logo-look board: python3 modern-board/_logoboard.py (reads scratchpad/logo-board, writes ez/x2p-logo-look.png)
from PIL import Image,ImageDraw,ImageFont
S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/logo-board/';EZ='/home/user/Tokengame/ez/'
B=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',34);R=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',23);BG='#1e1c22'
T=[('now','Today','pressed paper'),('L1','L1 The disc','every AI on the logo’s black disc, pill rows'),('L2','L2 Speed','rows lean like the letters, the leader’s slab gold'),('L3','L3 Title card','the leader set as a logo lockup: CLAUDE.')]
SC=[('std','02 Current standings'),('proof','03 The proof (P&L view)'),('cert','01 The record: a card turned (certificate)')]
k=.5;cw=int(1170*k);ch=int(2532*k);pad=30;W=pad+len(T)*(cw+pad);H=150+len(SC)*(ch+130)
im=Image.new('RGB',(W,H),BG);d=ImageDraw.Draw(im)
d.text((pad,24),'The logo look: paper replaced by the EZ. logo’s own language (tickets kept only for the main event and Season 2)',font=B,fill='#f2b632')
d.text((pad,72),'Heavy italic letters (Kanit), the logo’s cut on the big lockups, green and red speed slashes, the gold square full stop, the black disc. 390 x 844 at 3x, shown at half.',font=R,fill='#b8ad94')
y=130
for sc,lab in SC:
    d.text((pad,y),lab,font=B,fill='#f4ead0');y+=50
    for i,(t,a,b) in enumerate(T):
        x=pad+i*(cw+pad);d.text((x,y),a,font=B,fill='#f4ead0');d.text((x,y+40),b,font=R,fill='#b8ad94')
        im.paste(Image.open(S+f'{t}-{sc}.png').resize((cw,ch),Image.LANCZOS),(x,y+78))
    y+=ch+130
im.save(EZ+'x2p-logo-look.png',optimize=True);print(im.size)
