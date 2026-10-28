# Round 45 MVP back boards: /usr/bin/python3 r1045-mvp/_board.py <shots dir> -> ez/x2p-r1045-mvp.png (390) and -desktop.png (1280)
import sys
from PIL import Image,ImageDraw,ImageFont
S=sys.argv[1].rstrip('/')+'/';EZ='/home/user/Tokengame/ez/'
B=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',30);M=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',22);R=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',18)
OPTS=[('now','Today','the live recap'),('a','A','Certificate of record'),('b','B','Admit one'),('c','C','Card back, two inks'),('d','D','Press release'),('e','E','Trade confirmation')]
KINDS=[('bull','Bullseye (top card)'),('tight','Tightest race'),('big','Biggest move')]
def group(id,W,sc,kinds):
    ims=[Image.open(f'{S}{id}-{k}-{W}.png') for k,_ in kinds];ims=[i.resize((int(i.width*sc),int(i.height*sc)),Image.LANCZOS) for i in ims]
    return ims
def board(W,sc,kinds,out,percol):
    gs=[(o,group(o[0],W,sc,kinds)) for o in OPTS];gw=max(sum(i.width for i in g)+16*(len(g)-1) for _,g in gs);gh=max(max(i.height for i in g) for _,g in gs)
    cols=percol;rows=(len(gs)+cols-1)//cols;pad=30;head=150;lab=70;sub=26
    im=Image.new('RGB',(pad+cols*(gw+pad),head+rows*(lab+sub+gh+pad)),'#1e1c22');d=ImageDraw.Draw(im)
    d.text((pad,24),f'MVP backs in the ticket and certificate family · {W}px',font=B,fill='#f2b632')
    d.text((pad,66),'Each option laid over the real back panel, where the record\'s certificate sits. Every word and number is read from the page\'s own recap (x2plus.js hlSlabs).',font=R,fill='#b8ad94')
    d.text((pad,92),'Cards: '+' · '.join(k[1] for k in kinds)+'. The Bullseye stack\'s top card is Kimi on Novartis (R52) in today\'s data.',font=R,fill='#b8ad94')
    for n,(o,g) in enumerate(gs):
        cx=pad+(n%cols)*(gw+pad);cy=head+(n//cols)*(lab+sub+gh+pad)
        d.text((cx,cy),o[1]+('' if o[0]=='now' else '  '),font=B,fill='#f4ead0');d.text((cx+(130 if o[0]=='now' else 46),cy+6),o[2],font=M,fill='#f2b632')
        x=cx
        for i in g:im.paste(i,(x,cy+lab));x+=i.width+16
    im.save(EZ+out,optimize=True);print(out,im.size)
board(390,.5,KINDS,'x2p-r1045-mvp.png',2)
board(1280,.5,[KINDS[0]],'x2p-r1045-mvp-desktop.png',6)
