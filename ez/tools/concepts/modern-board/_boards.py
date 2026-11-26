# modern-board board: python3 modern-board/_boards.py (reads scratchpad/modern-board, writes ez/x2p-modern-board.png)
from PIL import Image,ImageDraw,ImageFont
S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/modern-board/';EZ='/home/user/Tokengame/ez/'
B=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',34);R=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',23);BG='#1e1c22'
T=[('now','Today','pressed paper tickets'),('A','A Modern pass','flat cream, flat ink, no pressing (a wallet pass)'),('B','B Timing tower','a race broadcast: colour bars, gap to the leader'),
   ('C','C Terminal','an exchange leaderboard: mono, sparklines'),('D','D Type only','a sports poster: no boxes, the leader in giant type'),('E','E The app','a fantasy/sportsbook leaderboard: cards, form dots')]
k=.5;cw=int(1170*k);ch=int(2532*k);pad=30;W=pad+len(T)*(cw+pad);H=150+2*(ch+130)
im=Image.new('RGB',(W,H),BG);d=ImageDraw.Draw(im)
d.text((pad,24),'Beyond pressed paper: five directions for the standings and the proof (the film and the bet stay paper)',font=B,fill='#f2b632')
d.text((pad,72),'390 x 844 phone screens rendered at 3x, shown at half. Every number from the live accounts (__x2pPnl). Only the P&L view of the proof is drawn; the other tabs would follow.',font=R,fill='#b8ad94')
y=130
for row in ['std','proof']:
    d.text((pad,y),'02 Current standings' if row=='std' else '03 The proof (P&L view)',font=B,fill='#f4ead0');y+=50
    for i,(t,a,b) in enumerate(T):
        x=pad+i*(cw+pad);d.text((x,y),a,font=B,fill='#f4ead0');d.text((x,y+40),b,font=R,fill='#b8ad94')
        s=Image.open(S+f'{t}-{row}.png');im.paste(s.resize((cw,ch),Image.LANCZOS),(x,y+78))
    y+=ch+80+50
im.save(EZ+'x2p-modern-board.png',optimize=True);print(im.size)
