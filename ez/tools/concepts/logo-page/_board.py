# logo-page board: python3 logo-page/_board.py -> ez/x2p-logo-page.png
from PIL import Image,ImageDraw,ImageFont
S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/logo-page/';EZ='/home/user/Tokengame/ez/'
B=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',34);R=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',23);BG='#1e1c22'
T=[('now','Today (live)','flat logo cream, golden ticket'),('light','Light','only the lettering, heads and straps in the logo’s language'),('full','Full','light + the logo-style standings, proof and certificate (L1)')]
SC=[('top','First screen'),('record','01 The record'),('cert','A card turned'),('std','02 Standings'),('proof','03 The proof'),('mvp','04 MVPs'),('bet','05 The bet (tickets kept)')]
k=.4;cw=int(1170*k);ch=int(2532*k);pad=26;W=180+len(T)*(cw+pad);H=140+len(SC)*(ch+pad)+60
im=Image.new('RGB',(W,H),BG);d=ImageDraw.Draw(im)
d.text((pad,22),'The logo across the page: light vs full (mockups; production is “Today”)',font=B,fill='#f2b632')
d.text((pad,66),'390 x 844 phone screens at 3x, shown at 40%. Type: Kanit black italic (nearest free match to the logo’s letters). Tickets for the bet stay paper.',font=R,fill='#b8ad94')
for i,(t,a,b) in enumerate(T):x=180+i*(cw+pad);d.text((x,104),a,font=B,fill='#f4ead0')
y=150
for sc,lab in SC:
    d.text((pad,y+10),lab,font=R,fill='#f4ead0')
    for i,(t,a,b) in enumerate(T):im.paste(Image.open(S+f'{t}-{sc}.png').resize((cw,ch),Image.LANCZOS),(180+i*(cw+pad),y))
    y+=ch+pad
im.save(EZ+'x2p-logo-page.png',optimize=True);print(im.size)
