# r1028 boards: python3 r1028/_board.py -> ez/x2p-r1028-{cert,proof,standings,headlines}.png
from PIL import Image,ImageDraw,ImageFont
S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/r1028/';L5='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/lv5/';EZ='/home/user/Tokengame/ez/'
B=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',34);M=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',26);R=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',21);BG='#1e1c22'
def board(name,title,sub,cols,rows,k,lab_w=0):
    ims=[[Image.open(f) for f in r[1]] for r in rows];cw=max(int(i.size[0]*k) for r in ims for i in r);pad=26
    hs=[max(int(i.size[1]*k) for i in r) for r in ims];W=lab_w+pad+len(cols)*(cw+pad);H=150+sum(h+pad+(34 if rows[j][0] else 0) for j,h in enumerate(hs))+20
    im=Image.new('RGB',(W,H),BG);d=ImageDraw.Draw(im);d.text((pad,22),title,font=B,fill='#f2b632');d.text((pad,68),sub,font=R,fill='#b8ad94')
    for i,(a,b) in enumerate(cols):x=lab_w+pad+i*(cw+pad);d.text((x,104),a,font=M,fill='#f4ead0');d.text((x,136),b,font=R,fill='#b8ad94')
    y=176
    for j,r in enumerate(ims):
        if rows[j][0]:d.text((pad,y),rows[j][0],font=M,fill='#f4ead0');y+=34
        for i,s in enumerate(r):im.paste(s.resize((int(s.size[0]*k),int(s.size[1]*k)),Image.LANCZOS),(lab_w+pad+i*(cw+pad),y))
        y+=hs[j]+pad
    im.save(EZ+name,optimize=True);print(name,im.size)
board('x2p-r1028-cert.png','The certificate in the logo’s look (mockup)','Today’s layout and words, the Full version’s black and cream, Kanit italic, PASS / FAIL as slabs on the right; crown, logos and holo stamp kept. 390px phone, R45 perfect, R43 split, R4 tie.',
  [('Today (live)','paper, pressed ink'),('CA','★ CERTIFICATE ★ head'),('CB','CERTIFICATE. like the logo')],
  [('',[S+f'cert-{i}-R45.png' for i in ['today','CA','CB']]),('',[S+f'cert-{i}-R43.png' for i in ['today','CA','CB']]),('',[S+f'cert-{i}-R4.png' for i in ['today','CA','CB']])],.62)
board('x2p-r1028-proof.png','The proof, flipped (mockup)','Today’s paper ticket; the question moves from the green band to above the chart, the chart goes on top, the numbers under it. All four tabs, 390px phone.',
  [('P&L',''),('Accuracy',''),('Target hits',''),('Sector','')],
  [('Today (live)',[S+f'proof-today-{k}.png' for k in ['roi','hit','miss','sector']]),('Flipped',[S+f'proof-PI-{k}.png' for k in ['roi','hit','miss','sector']])],.5)
board('x2p-r1028-standings.png','The leaderboard: L2 Speed fixed, and the timing tower with the terminal’s live parts (mockups)','No streaks, W-L, “Hit rate”, the AIs’ logos and their flags; L2’s proof with Biggest W / Biggest L / P&L labelled. 390 x 844 phone screens.',
  [('L2 Speed','standings'),('L2 Speed','its proof (P&L tab)'),('Timing tower + terminal','LIVE tag, a P&L chart per AI, no gap')],
  [('',[S+'std-L2.png',S+'proof-L2.png',S+'std-TT.png'])],.5)
board('x2p-r1028-headlines.png','Headline options (mockup)','Top: today’s type, fitted to two lines. Bottom: the logo’s lettering (the Light makeover), which wraps to four lines and pushes the film down. 390 x 844.',
  [('Today (live)','We’re putting buybacks…'),('A','4 AIs fight over earnings. The winner calls the buyback.'),('B','4 AIs call earnings. The best one bets our pool.')],
  [('Today’s type',[L5+'c-C0-390.png',L5+'c-C1-390.png',L5+'c-C6-390.png']),('Logo lettering',[L5+'c-C0-390.png',L5+'c-K1-390.png',L5+'c-K6-390.png'])],.75)
