# live-r4 boards: python3 live-r4/_boards.py  (reads scratchpad/lv4, writes ez/x2p-live-r4-*.png)
from PIL import Image,ImageDraw,ImageFont
S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/lv4/';EZ='/home/user/Tokengame/ez/'
B=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',26);R=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',20)
BG='#1e1c22'
def board(cols,title,out,w0=780,pad=24):
    hs=max(c[0].height for c in cols);W=sum(c[0].width for c in cols)+pad*(len(cols)+1);H=hs+190
    im=Image.new('RGB',(W,H),BG);d=ImageDraw.Draw(im);d.text((pad,18),title,font=B,fill='#f2b632');x=pad
    for c,lab,sub in cols:
        d.text((x,70),lab,font=B,fill='#f4ead0');d.text((x,104),sub,font=R,fill='#b8ad94');im.paste(c,(x,150));x+=c.width+pad
    im.save(out,optimize=True);print(out,im.size)
U={'U1':('U1 On-air strap','the site’s own strap, bug = the dot'),'U2':('U2 Last · Today · Next','one ticket, three stubs'),
   'U3':('U3 The week on the card','P4c, slimmer, under the film'),'U4':('U4 The season tape','one mark per round, today lit'),'U5':('U5 The marquee','a letter board under the bill')}
# 1. first screen at 390, Monday 1:09 pm ET, with the line where a phone's screen ends (390x664 visible)
cols=[]
for k,(a,b) in U.items():
    im=Image.open(S+f'u-{k}-mon-390.png').crop((0,0,780,1420));d=ImageDraw.Draw(im)
    for xx in range(0,780,24):d.line((xx,1328,xx+12,1328),fill='#ff4d4d',width=3)
    d.text((10,1336),'end of a 390x664 phone screen',font=R,fill='#ff4d4d');cols.append((im,a,b))
cols.insert(0,(Image.open(S+'h-H0-U2-mon-390.png').crop((0,0,780,1420)) if False else Image.open(S+'u-U2-mon-390.png').crop((0,0,780,1420)),'',''))
cols=cols[1:]
board(cols,'Live under the film · Mon Oct 26, 1:09 pm ET (8 calls due today) · 390px',EZ+'x2p-live-r4-under.png')
# 2. states: each module at four moments, cropped to the module
Y={'U1':(960,1190),'U2':(960,1180),'U3':(955,1190),'U4':(960,1180),'U5':(930,1110)}
rows=[];mom=[('mon','Mon 1:09 pm · calls due'),('fri','Fri 1:09 pm · graded at the close'),('bell','Fri 4:20 pm · bell rung'),('sat','Sat 11 am · off air')]
cw=780;W=24+len(mom)*(cw+24);H=80+len(U)*(250+70)
im=Image.new('RGB',(W,H),BG);d=ImageDraw.Draw(im);d.text((24,18),'The same modules through the week (computed from ez-data.js and the New York clock)',font=B,fill='#f2b632')
for j,(m,lab) in enumerate(mom):d.text((24+j*(cw+24),60),lab,font=R,fill='#b8ad94')
for i,k in enumerate(U):
    y=100+i*320;d.text((24,y),U[k][0],font=B,fill='#f4ead0')
    for j,(m,lab) in enumerate(mom):
        a,b=Y[k];c=Image.open(S+f'u-{k}-{m}-390.png').crop((0,a,780,b));im.paste(c,(24+j*(cw+24),y+40))
im.save(EZ+'x2p-live-r4-states.png',optimize=True);print('states',im.size)
# 3. desktop
cols=[]
for k,(a,b) in U.items():
    c=Image.open(S+f'u-{k}-mon-1280.png');c=c.crop((0,560,2560,1760)).resize((1280,600));cols.append((c,a,b))
im=Image.new('RGB',(24+3*(1280+24),80+2*(600+90)),BG);d=ImageDraw.Draw(im);d.text((24,18),'Live under the film · 1280px',font=B,fill='#f2b632')
for i,(c,a,b) in enumerate(cols):
    x=24+(i%3)*(1280+24);y=70+(i//3)*(690);d.text((x,y),a,font=B,fill='#f4ead0');im.paste(c,(x,y+40))
im.save(EZ+'x2p-live-r4-desktop.png',optimize=True);print('desktop',im.size)
# 4. headlines, each with U2 under the film
H={'H0':('H0 Today','We’re putting buybacks in the hands of an AI.'),'H1':('H1 The league, then the money','4 AIs call earnings. / The best one runs our buybacks.'),
   'H2':('H2 The question','Can an AI call earnings? / 4 are trying. Live.'),'H3':('H3 The schedule','4 AIs. Live. Every week. / The top one bets our pool.'),
   'H4':('H4 Today + a live kicker','“● Live · Season 1 · Week 8 · 8 calls due”')}
cols=[]
for k,(a,b) in H.items():
    c=Image.open(S+f'h-{k}-U2-mon-390.png').crop((0,0,780,1420));d=ImageDraw.Draw(c)
    for xx in range(0,780,24):d.line((xx,1328,xx+12,1328),fill='#ff4d4d',width=3)
    cols.append((c,a,b))
board(cols,'Headline options (U2 under the film to show the whole first screen) · 390px',EZ+'x2p-live-r4-headlines.png')
