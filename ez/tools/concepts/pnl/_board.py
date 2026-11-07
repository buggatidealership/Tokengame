# P&L round boards: python3 pnl/_board.py -> ez/x2p-pnl-{standings,proof,mvp}.png (+ -desktop)
from PIL import Image,ImageDraw,ImageFont
S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/pnl/';EZ='/home/user/Tokengame/ez/'
B=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',26);R=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',20)
def board(cols,title,sub,out,sc=1):
    cols=[(im.resize((int(im.width*sc),int(im.height*sc))),a,b) for im,a,b in cols]
    h=max(c[0].height for c in cols);W=sum(c[0].width for c in cols)+24*(len(cols)+1)
    im=Image.new('RGB',(W,h+200),'#1e1c22');d=ImageDraw.Draw(im);d.text((24,18),title,font=B,fill='#f2b632');d.text((24,52),sub,font=R,fill='#b8ad94');x=24
    for c,a,b in cols:d.text((x,96),a,font=B,fill='#f4ead0');d.text((x,130),b,font=R,fill='#b8ad94');im.paste(c,(x,175));x+=c.width+24
    im.save(EZ+out,optimize=True);print(out,im.size)
o=lambda f:Image.open(S+f)
for W,suf,sc in [(390,'',1),(1280,'-desktop',.5)]:
    board([(o(f'std-now-{W}.png'),'Today','Last 5 · ROI · Hit rate'),(o(f'std-SA-{W}.png'),'SA','Record · P&L · Accuracy'),(o(f'std-SB-{W}.png'),'SB','SA + streak, rules in the trading voice')],
      f'Current standings as a P&L board · {W}px','Same order as today (ranked by accuracy). P&L = each AI\'s account, the ROI tab\'s own numbers. W = a call that got the direction right.',f'x2p-pnl-standings{suf}.png',sc)
    board([(o(f'proof-now-roi-{W}.png'),'Today: ROI',''),(o(f'proof-PA-roi-{W}.png'),'P&L','Biggest W · Biggest L · P&L; line ends = P&L %'),(o(f'proof-PA-hit-{W}.png'),'Accuracy','renamed from Hit rate'),
           (o(f'proof-PA-sector-{W}.png'),'Sector · gold + crown','best ratio per row; ties share; none if all tie'),(o(f'proof-PC-sector-{W}.png'),'Sector · crown only','the rest dimmed')],
      f'The proof: P&L, Accuracy, Sector leaders · {W}px','All numbers from ez-data.js through the ROI tab\'s own account rules ($100K to start, the whole balance on every call, no leverage, simulated).',f'x2p-pnl-proof{suf}.png',sc)
    cols=[]
    for k,lab in [('bull','Bullseye (Tesla)'),('tight','Tightest race (TSMC)'),('big','Biggest move (Accenture)')]:
        for i,n in [('now','today'),('M1','M1 ledger'),('M2','M2 P&L card'),('M3','M3 won / lost')]:cols.append((o(f'mvp-{i}-{k}-{W}.png'),f'{lab}' if i=='now' else '',n))
    rows=[cols[j:j+4] for j in range(0,12,4)]
    ims=[board(r,'','',f'_tmp{j}.png',sc) for j,r in enumerate(rows)]
    parts=[Image.open(EZ+f'_tmp{j}.png') for j in range(3)];import os
    for j in range(3):os.remove(EZ+f'_tmp{j}.png')
    T=Image.new('RGB',(max(p.width for p in parts),sum(p.height for p in parts)-2*60+90),'#1e1c22');d=ImageDraw.Draw(T)
    d.text((24,18),f'MVP backs with P&L · {W}px',font=B,fill='#f2b632');d.text((24,52),'No "Think of it this way"; headline, the deck, one punch line, then what each AI\'s account made or lost on that call (adds up to the P&L tab).',font=R,fill='#b8ad94')
    y=90
    for p in parts:T.paste(p.crop((0,80,p.width,p.height)),(0,y));y+=p.height-80
    T.save(EZ+f'x2p-pnl-mvp{suf}.png',optimize=True);print('mvp',T.size)
