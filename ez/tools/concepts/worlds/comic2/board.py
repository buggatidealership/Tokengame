# /usr/bin/python3 board.py <shots dir> <phone|desktop|review> : boards from run.js's screens
import sys,glob,os
from PIL import Image,ImageDraw,ImageFont
S=sys.argv[1].rstrip('/')+'/';K=sys.argv[2];EZ='/home/user/Tokengame/ez/'
B=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',30);R=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',20);BG='#1e1c22'
def rows(groups,scale,out,title,sub,per=6):
    flat=[(f,l) for g in groups for f,l in g];iw,ih=Image.open(S+flat[0][0]).size;iw,ih=int(iw*scale),int(ih*scale);pad=28
    lines=[];
    for g in groups:
        for i in range(0,len(g),per):lines.append(g[i:i+per])
    W=max(pad+per*(iw+pad),1500);H=120+len(lines)*(ih+60)+20
    im=Image.new('RGB',(W,H),BG);d=ImageDraw.Draw(im);d.text((pad,22),title,font=B,fill='#f2b632');d.text((pad,64),sub,font=R,fill='#b8ad94');y=110
    for ln in lines:
        x=pad
        for f,l in ln:
            d.text((x,y),l,font=R,fill='#f4ead0');im.paste(Image.open(S+f).convert('RGB').resize((iw,ih),Image.LANCZOS),(x,y+28));x+=iw+pad
        y+=ih+60
    im.save(out,optimize=True);print(out,im.size)
w=390 if K in('phone','review') else 1536
ov=sorted(glob.glob(f'{S}c2-{w}-ov-*.png'),key=lambda f:int(f.rsplit('-',1)[1][:-4]))
lb=sorted(glob.glob(f'{S}c2-{w}-lb-[0-9]*.png'),key=lambda f:int(f.rsplit('-',1)[1][:-4]))
up=sorted(glob.glob(f'{S}c2-{w}-up-*.png'),key=lambda f:int(f.rsplit('-',1)[1][:-4]))
g1=[(os.path.basename(f),f'Overview {i+1}') for i,f in enumerate(ov)]
g2=[(os.path.basename(f),f'Leaderboard {i+1}') for i,f in enumerate(lb)]+[(f'c2-{w}-lb-acc.png','Proof: switched to Accuracy')]
g3=[(os.path.basename(f),f'Upcoming {i+1}') for i,f in enumerate(up)]+[(f'c2-{w}-pop.png','A back issue opened')]
if K=='review':rows([g1,g2+g3],.5,S+'review.png','review','',per=7)
elif K=='phone':rows([g1,g2+g3],.5,EZ+'x2p-comic-remake-phone.png','EZ comic remake of X2+  ·  phone 390x844',"Overview (the X3+ comic, no Smart or lucky; the live NVIDIA bet ticket in comic dress), then the Leaderboard tab (the live standings and proof card, dressed as comic tickets) and Upcoming. Every number from ez-data.js.",per=7)
else:rows([g1,g2+g3],.33,EZ+'x2p-comic-remake-desktop.png','EZ comic remake of X2+  ·  desktop 1536x864',"Overview, then the Leaderboard tab and Upcoming. Every number from ez-data.js.",per=5)
