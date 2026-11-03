# /usr/bin/python3 board.py <shots dir> : ez/x2p-h40-cardback-390.png and -1280.png
import sys
from PIL import Image,ImageDraw,ImageFont
S=sys.argv[1];E='/home/user/Tokengame/ez/'
F=lambda s,b=True:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf'%('-Bold' if b else ''),s)
BG=(14,13,18);Y=(240,196,90);C=(215,208,190)
R=[(64,'R64 Samsung · all four right · GPT wins'),(80,'R80 Exxon Mobil · split · GPT wins'),(51,'R51 UPS · nobody right · no winner'),(57,'R57 GE Vernova · tie: Claude & Grok'),(81,'R81 Palantir · trades in, not graded')]
def strip(W,scale):
    ims=[Image.open('%s/card-%d-%d.png'%(S,n,W)).convert('RGB') for n,_ in R]
    ims=[i.resize((int(i.size[0]*scale),int(i.size[1]*scale)),Image.LANCZOS) for i in ims];return ims
def build(W,out,scale):
    ims=strip(W,scale);cw=max(i.size[0] for i in ims);ch=max(i.size[1] for i in ims);gap=30;pad=40
    old=Image.open(E+'x2p-h38-cardback-390.png').convert('RGB')
    cert=[old.crop((24,130,386,750)),old.crop((409,130,771,750))] if W==390 else []
    sf='' if W==390 else '-%d'%W
    cu=[Image.open('%s/cu-%s-%d%s.png'%(S,k,n,sf)).convert('RGB') for n in (80,57) for k in ('rows','mw')]
    cuw=min((5*cw+4*gap-gap)//2,cu[0].size[0]);cu=[i.resize((cuw,int(i.size[1]*cuw/i.size[0])),Image.LANCZOS) for i in cu]
    Wd=pad*2+5*cw+4*gap
    hc=(cert[0].size[1]+70) if cert else 0
    H=150+hc+ch+80+max(cu[0].size[1]+cu[1].size[1],cu[2].size[1]+cu[3].size[1])+gap+70
    B=Image.new('RGB',(Wd,H),BG);d=ImageDraw.Draw(B);y=30
    d.text((pad,y),'H40 card back · the certificate content and layout, in steel · %dpx'%W,font=F(30),fill=Y);y+=46
    d.text((pad,y),'Real v46-live-x2plus.html build. No. / rank, logo, name, flag, PASS or FAIL, Long or Short and the move / MARKET and the move / the dates and the EZ. mark. Nothing else.',font=F(19,False),fill=C);y+=28
    d.text((pad,y),'Engraved letters; moves enamel-filled in the cut (green long, red short); PASS/FAIL hand-punched and rubbed with paint; MARKET cut through the black enamel; a cast gold crown on the winning plate.',font=F(19,False),fill=C);y+=46
    if cert:
        d.text((pad,y),'The layout it replicates (the old certificate, live until H38): R64 Samsung, R81 Palantir',font=F(21),fill=C);y+=34
        x=pad
        for c in cert:B.paste(c,(x,y));x+=c.size[0]+gap
        y+=cert[0].size[1]+36
    d.text((pad,y),'H40, built',font=F(21),fill=C);y+=34;x=pad
    for (n,l),im in zip(R,ims):B.paste(im,(x,y));d.text((x,y+im.size[1]+8),l,font=F(18,False),fill=C);x+=cw+gap
    y+=ch+56
    d.text((pad,y),('3x close-ups at 390px:' if W==390 else '2x close-ups at 1280px:')+' R80 (gold plate + crown, PASS rows, FAIL rows; the market +2.17%) · R57 (the tie: two crowns; Kimi FAIL long +2%; the market −1.90%)',font=F(19),fill=C);y+=32
    x=pad
    for col in ((cu[0],cu[1]),(cu[2],cu[3])):
        yy=y
        for im in col:B.paste(im,(x,yy));yy+=im.size[1]+10
        x+=cuw+gap
    B=B.crop((0,0,Wd,yy+30));B.save(out,optimize=True);print(out,B.size)
build(390,E+'x2p-h40-cardback-390.png',0.5)
build(1280,E+'x2p-h40-cardback-1280.png',0.5)
