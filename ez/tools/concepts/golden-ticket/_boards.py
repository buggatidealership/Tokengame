# golden-ticket boards: python3 golden-ticket/_boards.py (reads scratchpad/golden-ticket, writes ez/x2p-logo-cream-*.png, ez/x2p-golden-ticket*.png)
from PIL import Image,ImageDraw,ImageFont
S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/golden-ticket/';EZ='/home/user/Tokengame/ez/'
B=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',34);R=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',24);BG='#1e1c22'
SC=[('top','First screen','the film keeps the old grainy paper'),('record','01 The record','card fronts'),('cert','01 The record','a card turned: the certificate'),
    ('std','02 Current standings','#1 as the golden ticket'),('proof','03 The proof','P&L view'),('mvp','04 MVPs','highlights'),('bet','05 The bet','NVIDIA + Season 2 tickets')]
def phone(take,sc,k=.5):
    im=Image.open(S+f'{take}-{sc}.png');return im.resize((int(im.width*k),int(im.height*k)),Image.LANCZOS)
def grid(rows,title,sub,out,k=.5):
    cw=int(1170*k);ch=int(2532*k);pad=30;W=pad+len(SC)*(cw+pad);H=150+len(rows)*(ch+110)
    im=Image.new('RGB',(W,H),BG);d=ImageDraw.Draw(im);d.text((pad,24),title,font=B,fill='#f2b632');d.text((pad,72),sub,font=R,fill='#b8ad94');y=130
    for take,label in rows:
        d.text((pad,y),label,font=B,fill='#f4ead0');y+=50
        for i,(sc,a,b) in enumerate(SC):
            x=pad+i*(cw+pad);d.text((x,y),a+' · '+b,font=R,fill='#b8ad94');im.paste(phone(take,sc,k),(x,y+36))
        y+=ch+60
    im.save(out,optimize=True);print(out,im.size)
grid([('now','Today (grainy tan paper, today’s gold)'),('A','Logo cream, no grain · logo gold · golden ticket A')],
     'The page on a phone: today vs logo cream','390 x 844 phone screens, rendered at 3x and shown at half. Every ticket and card on #f8f0d9 with no grain; the film’s frame keeps today’s paper.',EZ+'x2p-logo-cream-phone.png')
# golden ticket takes: the standings screen of each, full 3x crop of the board area
TK=[('cream','No golden ticket','logo cream only, #1 as today (gold stub, gold P&L)'),('A','A Foil sheet','the whole ticket gold foil, black ink, double frame (the 1971 Wonka prop)'),
    ('B','B Black stub','gold ticket, the stub in the logo black, the 1 in gold'),('C','C Gold-edged','a cream ticket with a gold foil frame and stub'),
    ('D','D Black stub + tab','B with "Golden ticket · buyback call" printed on the top edge')]
cw=1170;pad=40;ch=1582;W=pad+len(TK)*(cw+pad);H=200+ch
im=Image.new('RGB',(W,H),BG);d=ImageDraw.Draw(im);d.text((pad,24),'#1 is the golden ticket: four takes (on logo cream, no grain)',font=B,fill='#f2b632')
d.text((pad,72),'Phone width 390px at 3x (full resolution). "Golden ticket" runs up the stub where the others say "Admit one". The gold is the logo’s (#fdbc2a family).',font=R,fill='#b8ad94')
for i,(t,a,b) in enumerate(TK):
    x=pad+i*(cw+pad);d.text((x,120),a,font=B,fill='#f4ead0');d.text((x,162),b,font=R,fill='#b8ad94')
    s=Image.open(S+f'{t}-std.png');im.paste(s.crop((0,950,1170,950+ch)),(x,200))
im.save(EZ+'x2p-golden-ticket.png',optimize=True);print('gt',im.size)
