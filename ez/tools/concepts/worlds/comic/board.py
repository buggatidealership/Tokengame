# /usr/bin/python3 board.py <shots dir> : writes ez/x2p-world-comic-phone.png and -desktop.png from run.js's screens
import sys
from PIL import Image,ImageDraw,ImageFont
S=sys.argv[1].rstrip('/')+'/';EZ='/home/user/Tokengame/ez/'
B=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',30);R=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',20);BG='#1e1c22'
def board(w,labels,scale,out,title,sub):
    ims=[Image.open(f'{S}wc-{w}-{i}.png').convert('RGB') for i in range(len(labels))]
    iw,ih=ims[0].size;iw,ih=int(iw*scale),int(ih*scale);pad=28;W=max(pad+len(ims)*(iw+pad),1500);H=150+ih+30
    im=Image.new('RGB',(W,H),BG);d=ImageDraw.Draw(im);d.text((pad,22),title,font=B,fill='#f2b632');d.text((pad,64),sub,font=R,fill='#b8ad94');x=pad
    for s,l in zip(ims,labels):
        d.text((x,112),l,font=R,fill='#f4ead0');im.paste(s.resize((iw,ih),Image.LANCZOS),(x,142));x+=iw+pad
    im.save(out,optimize=True);print(out,im.size)
board(390,['1  The cover','2  Previously / Meet the cast','3  The cast, Last night','4  Last night: the main panel','5  Also last night, Back issues'],.5,EZ+'x2p-world-comic-phone.png',
 'World: the comic book  ·  phone, 390x844, the first five screens in order',
 "Issue #57 of a comic about four AIs. Words and numbers from ez-data.js and the page's P&L accounts; balloons say only each AI's call.")
board(1536,['1  Cover: the explainer film is the cover art','2  Meet the cast, Last night','3  Last night: the main panel, then the rest'],.5,EZ+'x2p-world-comic-desktop.png',
 'World: the comic book  ·  desktop, 1536x864, the first three screens',
 'A western page grid on desktop (panels side by side); a webtoon single column on phones.')
