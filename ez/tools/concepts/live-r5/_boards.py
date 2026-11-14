# live-r5 boards: python3 live-r5/_boards.py  (reads scratchpad/lv5, writes ez/x2p-live-r5-*.png)
from PIL import Image,ImageDraw,ImageFont
S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/lv5/';EZ='/home/user/Tokengame/ez/'
B=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',26);R=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',20);BG='#1e1c22'
def line(im,y):
    d=ImageDraw.Draw(im)
    for xx in range(0,im.width,24):d.line((xx,y,xx+12,y),fill='#ff4d4d',width=3)
    d.text((10,y+8),'end of a 390x664 phone screen',font=R,fill='#ff4d4d')
def board(cols,title,out,pad=24,sub=None):
    hs=max(c[0].height for c in cols);W=sum(c[0].width for c in cols)+pad*(len(cols)+1);H=hs+200
    im=Image.new('RGB',(W,H),BG);d=ImageDraw.Draw(im);d.text((pad,18),title,font=B,fill='#f2b632')
    if sub:d.text((pad,52),sub,font=R,fill='#b8ad94')
    x=pad
    for c,a,b in cols:
        d.text((x,92),a,font=B,fill='#f4ead0');d.text((x,126),b,font=R,fill='#b8ad94');im.paste(c,(x,165));x+=c.width+pad
    im.save(out,optimize=True);print(out,im.size)
SN={'S1':('S1 Season pass','a punch card, one box a week'),'S2':('S2 The line to NVIDIA','a transit map, one stop a week'),'S3':('S3 The line score','a box score, one column a week'),
    'S4':('S4 The season curve','pump.fun’s progress bar, borrowed'),'S5':('S5 The fight card','week tickets: gone, now, next, finale'),'S6':('S6 The season band','slim, under the tabs, above the headline')}
cols=[]
for k,(a,b) in SN.items():
    im=Image.open(S+f's-{k}-mon-390.png').crop((0,0,780,1420));line(im,1328);cols.append((im,a,b))
board(cols,'Season 1 under the film · Mon Oct 26, 1:09 pm ET · 390px',EZ+'x2p-live-r5-season.png',sub='All from ez-data.js: week 8 of 11 (weeks run Mon to Fri from the first call, Sep 8), 45 of 116 graded, 39 calls this week, NVIDIA in week 11.')
# late season: each option now vs Mon Nov 16 (simulated: every round called before that day counted as graded; no results shown)
Y={'S1':(960,1270),'S2':(960,1270),'S3':(960,1290),'S4':(960,1300),'S5':(960,1240),'S6':(220,340)}
cw=780;W=24+2*(cw+24);H=110+len(SN)*(330+60)
im=Image.new('RGB',(W,H),BG);d=ImageDraw.Draw(im);d.text((24,18),'Today vs the last week of Season 1 (Season 2 shows up)',font=B,fill='#f2b632')
d.text((24,52),'Right column: Mon Nov 16, simulated: every round called before that day counted as graded. Counts only, no results.',font=R,fill='#b8ad94')
d.text((24,84),'Mon Oct 26 (today)',font=R,fill='#f4ead0');d.text((24+cw+24,84),'Mon Nov 16 (simulated)',font=R,fill='#f4ead0')
y=115
for k,(a,b) in SN.items():
    d.text((24,y),a,font=B,fill='#f4ead0');t,u=Y[k]
    for j,m in enumerate(['mon','late']):im.paste(Image.open(S+f's-{k}-{m}-390.png').crop((0,t,780,u)),(24+j*(cw+24),y+38))
    y+=u-t+70
im=im.crop((0,0,W,y+10));im.save(EZ+'x2p-live-r5-season-late.png',optimize=True);print('late',im.size)
# desktop
im=Image.new('RGB',(24+3*(1280+24),80+2*(560+70)),BG);d=ImageDraw.Draw(im);d.text((24,18),'Season 1 · 1280px',font=B,fill='#f2b632')
for i,(k,(a,b)) in enumerate(SN.items()):
    c=Image.open(S+f's-{k}-mon-1280.png');c=(c.crop((0,0,2560,1120)) if k=='S6' else c.crop((0,580,2560,1800))).resize((1280,560))
    x=24+(i%3)*(1280+24);y=70+(i//3)*630;d.text((x,y),a,font=B,fill='#f4ead0');im.paste(c,(x,y+40))
im.save(EZ+'x2p-live-r5-season-desktop.png',optimize=True);print('desktop',im.size)
# copy
CN={'C0':('C0 Today','We’re putting buybacks / in the hands of an AI.'),'C1':('C1 The fight','4 AIs fight over earnings. / The winner calls the buyback.'),
    'C2':('C2 The record','Buybacks, called by / the AI with the best record.'),'C3':('C3 Versus','4 AIs vs. the market. / Best record calls the buyback.'),
    'C4':('C4 The schedule','Every week, 4 AIs call earnings. / The best one bets our pool.'),'C5':('C5 The objection','Not a one-day coin. / A season of AI calls.')}
cols=[(Image.open(S+f'c-{k}-390.png').crop((0,0,780,1000)),a,b) for k,(a,b) in CN.items()]
board(cols,'Headline copy, in today’s type · 390px (fitted to two lines; longer lines set smaller)',EZ+'x2p-live-r5-copy.png')
TN={'T1':('T1 Today’s look','Anton, cream then gold'),'T2':('T2 Fight poster','wood type on poster stock'),'T3':('T3 Broadcast strap','the site’s strap, LIVE bug'),
    'T4':('T4 Meme caption','the Impact caption, outlined'),'T5':('T5 Terminal','how AI agents talk on CT'),'T6':('T6 The ticket','Admit one, Season 1 stub')}
cols=[]
for k,(a,b) in TN.items():
    im=Image.open(S+f't-{k}-390.png').crop((0,0,780,1420));line(im,1328);cols.append((im,a,b))
board(cols,'Headline looks, all on C1 · 390px',EZ+'x2p-live-r5-type.png')
