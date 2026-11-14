# round 2 boards: /usr/bin/python3 bg/_board2.py <shots dir>  (writes ez/x2p-bg-news2-phone.png and -desktop.png)
import sys
from PIL import Image,ImageDraw,ImageFont
S=sys.argv[1].rstrip('/')+'/';EZ='/home/user/Tokengame/ez/'
B=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',30);R=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',21);BG='#1e1c22'
TK=[('now','Today','the live page, for comparison'),
    ('P1','P1  The broadsheet','aged newsprint; front page = "The last five nights", one plain dispatch per night'),
    ('P2','P2  The night final','dark newsprint under a lamp; front page = "Tonight": who says up, who says down, then last night'),
    ('P3','P3  The sports page','pink tabloid; front page = the leader\'s week, "the AI to beat"')]
def board(w,n,scale,out,title):
    ims={t:[Image.open(f'{S}np-{t}-{w}-{i}.png').convert('RGB') for i in range(n)] for t,_,_ in TK}
    iw,ih=ims['now'][0].size;iw,ih=int(iw*scale),int(ih*scale);pad=24;W=pad+n*(iw+pad);H=110+len(TK)*(ih+90)
    im=Image.new('RGB',(W,H),BG);d=ImageDraw.Draw(im);d.text((pad,22),title,font=B,fill='#f2b632')
    d.text((pad,62),'Screens run from the top of the page, in order. All words and numbers come from ez-data.js and the page\'s P&L accounts.',font=R,fill='#b8ad94');y=110
    for t,a,b in TK:
        d.text((pad,y+12),a,font=B,fill='#f4ead0');d.text((pad+18+d.textlength(a,font=B),y+20),b,font=R,fill='#b8ad94');x=pad
        for s in ims[t]:im.paste(s.resize((iw,ih),Image.LANCZOS),(x,y+62));x+=iw+pad
        y+=ih+90
    im.save(out,optimize=True);print(out,im.size)
board(390,4,.5,EZ+'x2p-bg-news2-phone.png','The paper, round 2 · phone, 390x844')
board(1536,3,.5,EZ+'x2p-bg-news2-desktop.png','The paper, round 2 · desktop, 1536x864')
