#!/usr/bin/python3
# usage: board.py <shots dir> <width 390|1280> <out.png>
import sys,os
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
F='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
def font(s):
    try:return ImageFont.truetype(F,s)
    except:return ImageFont.load_default()
ROWS=[('now','Today, live: the PSA slab, comic "Graded!" back, holo stamp (R80 has no film and opens on its stats; no round has calls in today, so no pending shot)',['78f','78b','57b','80f'],'$0'),
('t1','T1 The slab, for real: Hedra acrylic holder + holo label stock; back = certificate on Hedra security paper, hand-stamped Pass/Fail, Hedra holo seal. 3D first, comic ink',['78f','78b','57b','80f','pf'],'$0.16 (acrylic, holo, paper, seal)'),
('t2','T2 The issue: front = comic cover (film is the cover art, round = masthead, grade in the corner box); turn = open it: 4 panels predicted / bell / graded / paid. Pop art. Desktop: the open spread',['78f','78b','57b','80f','pf'],'$0.04 (newsprint)'),
('t3','T3 Case file, noir: manila folder, film as a clipped print, grade stamped; back = verdict typed on onion skin, winner ringed in red pencil, gold seal; pending = sealed with tape',['78f','78b','57b','80f','pf'],'$0.07 (manila, onion skin)'),
('t4','T4 The Season 1 ticket: green/red stub, film in a die-cut window, result on the reverse, Pass/Fail punched. Anime cel. Desktop: one landscape ticket, no turn needed',['78f','78b','57b','80f','pf'],'$0.04 (ticket stock)'),
('t5','T5 No film? Hedra paints the company\'s world in the window (T1 slab). XOM: 1880s engraving (gpt-image-2 2K), Art Deco rig, 1901 gusher comic; SBUX: woodcut (2K), rainy roastery, screen print',['80fw-xom-a2k','80fw-xom-b','80fw-xom-c','71fw-sbux-a2k','71fw-sbux-b','71fw-sbux-c'],'$1.32 (6 worlds; 2 at 2K)')]
H=900 if W==390 else 470;lab=70;pad=24
rows=[]
for t,desc,shots,cost in ROWS:
    ims=[]
    for s in shots:
        p=f'{D}/{t}-{s}-{W}.png'
        if os.path.exists(p):
            i=Image.open(p).convert('RGB');ims.append((s,i.resize((int(i.width*H/i.height),H))))
    rows.append((t,desc,cost,ims))
# close-up row: the back certificate of R78 for each take at 390 (2x shots), centre crop
cw=max(sum(i.width+pad for _,i in r[3]) for r in rows)+pad
tot=sum(H+lab+40+pad for _ in rows)+80
close=[]
if W==390:
    for t in ['now','t1','t2','t3','t4']:
        p=f'{D}/{t}-78b-390.png'
        if os.path.exists(p):
            i=Image.open(p).convert('RGB');c=i.crop((20,int(i.height*.28),i.width-20,int(i.height*.62)));close.append((t,c.resize((int(c.width*1.1),int(c.height*1.1)))))
    ch=max(c.height for _,c in close);tot+=ch+lab+pad
B=Image.new('RGB',(cw,tot),'#15131c');d=ImageDraw.Draw(B);y=pad
d.text((pad,y),f'Round H, area "round": opening a round at {W}px. R78 Intel (film), R57 GE Vernova (tie), R80 Exxon Mobil (no film), pending = R80 replayed as it stood before its close.',fill='#ffd23f',font=font(26));y+=56
for t,desc,cost,ims in rows:
    d.text((pad,y),desc,fill='#f8f0d9',font=font(22));d.text((pad,y+32),'Hedra: '+cost+'   shots: '+'  '.join(s for s,_ in ims),fill='#9fe0b8',font=font(18));y+=lab
    x=pad
    for s,i in ims:B.paste(i,(x,y));x+=i.width+pad
    y+=H+40
if close:
    d.text((pad,y),'Close-up: the turned back of R78 (today, T1, T2, T3, T4)',fill='#f8f0d9',font=font(22));y+=lab-20;x=pad
    for t,c in close:B.paste(c,(x,y));x+=c.width+pad
B.save(OUT,optimize=True);print(OUT,B.size)
