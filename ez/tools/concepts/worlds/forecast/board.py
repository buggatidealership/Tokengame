# /usr/bin/python3 board.py <shots dir> [preview]: boards of the forecast world (ez/x2p-world-forecast-phone.png, -desktop.png)
import sys
from PIL import Image,ImageDraw,ImageFont
S=sys.argv[1].rstrip('/')+'/';EZ='/home/user/Tokengame/ez/';PRE=len(sys.argv)>2
B=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',30);R=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',21);BG='#0b1026'
def board(w,labels,scale,out,title,sub):
    ims=[Image.open(f'{S}wf-{w}-{i+1}.png').convert('RGB') for i in range(len(labels))]
    iw,ih=ims[0].size;iw,ih=int(iw*scale),int(ih*scale);pad=24;cols=len(ims) if w<600 else 1
    rows=(len(ims)+cols-1)//cols;W=pad+cols*(iw+pad);H=120+rows*(ih+60)
    im=Image.new('RGB',(W,H),BG);d=ImageDraw.Draw(im);d.text((pad,22),title,font=B,fill='#fdbc2a');d.text((pad,64),sub,font=R,fill='#c3cbe0')
    for i,(s,l) in enumerate(zip(ims,labels)):
        x=pad+(i%cols)*(iw+pad);y=120+(i//cols)*(ih+60);d.text((x,y+10),l,font=R,fill='#f4f7ff');im.paste(s.resize((iw,ih),Image.LANCZOS),(x,y+44))
    im.save(out,optimize=True);print(out,im.size)
sub='Every word and number is read from ez-data.js and the page\'s P&L accounts (New York, Wed 28 Oct 2026, late evening). Screens in scroll order.'
if PRE: board(390,['1','2','3','4','5'],.5,S+'prev-phone.png','preview',sub)
else:
    board(390,['1  The desk: what it is, the film','2  Tomorrow\'s forecast','3  The forecast, every stock','4  The verdict, with the films as replays','5  The forecasters'],.5,EZ+'x2p-world-forecast-phone.png','The forecast station · phone, 390x844',sub)
    board(1536,['1  First screen: the forecast docked left, the desk and the film','2  Yesterday\'s verdict and the forecasters','3  The long-range outlook and the almanac'],.5,EZ+'x2p-world-forecast-desktop.png','The forecast station · desktop, 1536x864',sub)
