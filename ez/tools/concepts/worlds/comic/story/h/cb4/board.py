# /usr/bin/python3 board.py <new shots> <H40 shots> <cu new> <cu H40> : ez/x2p-h41-cardback-390.png and -1280.png (H40 live beside H41)
import sys
from PIL import Image,ImageDraw,ImageFont
S,S0,CU,CU0=sys.argv[1:5];E='/home/user/Tokengame/ez/'
F=lambda s,b=True:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf'%('-Bold' if b else ''),s)
BG=(14,13,18);Y=(240,196,90);C=(215,208,190);G=(150,145,135)
R=[(64,'R64 Samsung · all four right · GPT wins'),(80,'R80 Exxon Mobil · split · GPT wins'),(51,'R51 UPS · nobody right'),(57,'R57 GE Vernova · tie: Claude & Grok'),(81,'R81 Palantir · trades in, not graded')]
def cards(d,W,scale):
    ims=[Image.open('%s/card-%d-%d.png'%(d,n,W)).convert('RGB') for n,_ in R]
    return [i.resize((int(i.size[0]*scale),int(i.size[1]*scale)),Image.LANCZOS) for i in ims]
def build(W,out,scale):
    new=cards(S,W,scale);old=cards(S0,W,scale);cw=max(i.size[0] for i in new+old);ch=max(i.size[1] for i in new+old);gap=26;pad=40
    cu=[Image.open('%s/%s'%(d,f)).convert('RGB') for d,f in [(CU0,'cu-rows12-80.png'),(CU,'cu-rows12-80.png'),(CU0,'cu-rows34-80.png'),(CU,'cu-rows34-80.png')]]
    st=[Image.open('%s/cu-stamp-80.png'%d).convert('RGB') for d in (CU0,CU)]
    Wd=max(pad*2+5*cw+4*gap,pad*2+cu[0].size[0]*2+gap)
    H=40+46+30*3+40+(ch+50)*2+60+cu[0].size[1]+cu[2].size[1]+st[0].size[1]+40+60
    B=Image.new('RGB',(Wd,H),BG);d=ImageDraw.Draw(B);y=30
    d.text((pad,y),'H41 card back · the steel plate, three changes · %dpx'%W,font=F(30),fill=Y);y+=46
    for t in ['1. The logo wells and the marks in them about 22% larger (12.2 against 10 of the plate\'s width; 15.4 against 12.6 on a 320 px phone).',
              '2. No LONG / SHORT: the trade is the signed move alone, enamel-filled (green +, red -). PASS / FAIL stays exactly halfway between name + flag and the move.',
              '3. The EZ. mark struck 7 degrees crooked, a holographic foil on its letters (a third as strong on the slashes and dot), drifting only while the back faces you.']:
        d.text((pad,y),t,font=F(19,False),fill=C);y+=30
    y+=14
    for lab,ims in (('H40, live today',old),('H41, built (real v46-live-x2plus.html, card turned)',new)):
        d.text((pad,y),lab,font=F(21),fill=C);y+=32;x=pad
        for (n,l),im in zip(R,ims):B.paste(im,(x,y));d.text((x,y+im.size[1]+6),l,font=F(15,False),fill=G);x+=cw+gap
        y+=ch+40
    d.text((pad,y),'3x close-ups at 390px, R80 Exxon Mobil: H40 (left) and H41 (right). Rows 1-2 (gold winner plate + crown, PASS) and rows 3-4 (FAIL); the struck mark (foil shown at rest).',font=F(19),fill=C);y+=34
    for a,b in ((cu[0],cu[1]),(cu[2],cu[3]),(st[0],st[1])):
        B.paste(a,(pad,y));B.paste(b,(pad+cu[0].size[0]+gap,y));y+=max(a.size[1],b.size[1])+10
    B=B.crop((0,0,Wd,y+30));B.save(out,optimize=True);print(out,B.size)
build(390,E+'x2p-h41-cardback-390.png',0.5)
build(1280,E+'x2p-h41-cardback-1280.png',0.42)
