# /usr/bin/python3 board.py <S scratch cb4 dir> : ez/x2p-h43-cardback-390.png and -1280.png (H41 live beside H43, foot close-ups, the Winner take)
import sys
from PIL import Image,ImageDraw,ImageFont
D=sys.argv[1];E='/home/user/Tokengame/ez/'
F=lambda s,b=True:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf'%('-Bold' if b else ''),s)
BG=(14,13,18);Y=(240,196,90);C=(215,208,190);G=(150,145,135)
R=[(64,'R64 Samsung · GPT wins'),(80,'R80 Exxon Mobil · GPT wins'),(51,'R51 UPS · nobody right'),(57,'R57 GE Vernova · tie'),(81,'R81 Palantir · not graded')]
def cards(d,W,scale):
    ims=[Image.open('%s/card-%d-%d.png'%(d,n,W)).convert('RGB') for n,_ in R]
    return [i.resize((int(i.size[0]*scale),int(i.size[1]*scale)),Image.LANCZOS) for i in ims]
def img(p,maxw=None):
    i=Image.open(p).convert('RGB')
    if maxw and i.size[0]>maxw:i=i.resize((maxw,int(i.size[1]*maxw/i.size[0])),Image.LANCZOS)
    return i
def build(W,out,scale):
    rows=[('H41, live today',cards(D+'/base',W,scale)),('H43, built: "See the film" a riveted nickel push-plate in the foot',cards(D+'/new',W,scale)),
          ('Mockup only, window.__x2pCbWin=1: "Winner" engraved under the name on the gold plate(s)',cards(D+'/win',W,scale))]
    cw=max(i.size[0] for _,r in rows for i in r);ch=max(i.size[1] for _,r in rows for i in r);gap=26;pad=40
    cuw=(5*cw+4*gap-gap)//2 if W<600 else (5*cw+4*gap-gap)//2
    fb=img(D+'/cub/foot-80-%d.png'%W,cuw);fn=img(D+'/cu/foot-80-%d.png'%W,cuw)
    fp=img(D+'/cu/foot-pressed-80-%d.png'%W,cuw);fk=img(D+'/kb/kb-focus-390.png',cuw) if W==390 else None
    wr=img(D+'/cuw/rows-57-%d.png'%W,cuw);wr2=img(D+'/cuw/rows-80-%d.png'%W,cuw)
    Wd=pad*2+5*cw+4*gap
    B=Image.new('RGB',(Wd,8000),BG);d=ImageDraw.Draw(B);y=30
    d.text((pad,y),'H43 card back · "See the film" diegetic · %dpx (card turned, real v46-live-x2plus.html)'%W,font=F(30),fill=Y);y+=46
    for t in ['Built: the flip button is a nickel push-plate cut from the date plates\' own stock, riveted with the shell\'s own rivet, laid in the foot under',
              'the two date plates and as wide as the pair (a 320 px phone: under the mark). "See the film" and a play triangle engraved like the dates.',
              'Raised with a short cast shadow; pressed it sinks ~1 px and its bevel turns (lit edge at the bottom), the engraving\'s lip and wall swap.',
              'Still the page\'s own data-flip button: 44.5 px tap box on screen, focus ring for the keyboard only, name "See the film".']:
        d.text((pad,y),t,font=F(18,False),fill=C);y+=28
    y+=14
    for lab,ims in rows:
        d.text((pad,y),lab,font=F(21),fill=C);y+=32;x=pad
        for (n,l),im in zip(R,ims):B.paste(im,(x,y));d.text((x,y+im.size[1]+6),l,font=F(15,False),fill=G);x+=cw+gap
        y+=ch+40
    d.text((pad,y),'3x close-ups, R80 Exxon Mobil, the foot: H41 live (left) and H43 (right)',font=F(20),fill=C);y+=32
    B.paste(fb,(pad,y));B.paste(fn,(pad+cuw+gap,y));y+=max(fb.size[1],fn.size[1])+16
    d.text((pad,y),'H43 pressed (left: sunk, bevel turned, no cast shadow)'+(' and keyboard focus (right: the ring round the plate)' if fk else ''),font=F(20),fill=C);y+=32
    B.paste(fp,(pad,y))
    if fk:B.paste(fk,(pad+cuw+gap,y))
    y+=max(fp.size[1],fk.size[1] if fk else 0)+16
    d.text((pad,y),'3x close-ups of the Winner take (mockup): R57 tie, both gold plates (left); R80, one winner (right)',font=F(20),fill=C);y+=32
    B.paste(wr,(pad,y));B.paste(wr2,(pad+cuw+gap,y));y+=max(wr.size[1],wr2.size[1])+30
    B=B.crop((0,0,Wd,y));B.save(out,optimize=True);print(out,B.size)
build(390,E+'x2p-h43-cardback-390.png',0.5)
build(1280,E+'x2p-h43-cardback-1280.png',0.42)
