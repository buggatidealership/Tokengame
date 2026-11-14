# MVP money board: python3 mvp-money/_board.py -> ez/x2p-mvp-money.png, ez/x2p-mvp-money-desktop.png
from PIL import Image,ImageDraw,ImageFont
S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/mm/';EZ='/home/user/Tokengame/ez/'
B=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',26);R=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',20)
C=[('now','Today','the four call chips'),('A','A · $1,000 at 5x','2x2, the bet\'s leverage'),('B','B · $1,000 at 5x','four rows'),('C','C · $1,000, no leverage','2x2, the ROI tab\'s rules'),('D','D · each AI\'s $100K pot','the ROI tab\'s running balance')]
for W,out,sc in [(390,'x2p-mvp-money.png',1),(1280,'x2p-mvp-money-desktop.png',.5)]:
    ims=[[Image.open(S+f'{i}-{k}-{W}.png') for i,_,_ in C] for k in ['bull','tight','big']]
    ims=[[im.resize((int(im.width*sc),int(im.height*sc))) for im in r] for r in ims]
    w=max(im.width for r in ims for im in r);h=max(im.height for r in ims for im in r)
    im=Image.new('RGB',(24+len(C)*(w+24),170+3*(h+20)),'#1e1c22');d=ImageDraw.Draw(im)
    d.text((24,18),f'MVP backs: money in place of the four call chips · {W}px',font=B,fill='#f2b632')
    d.text((24,52),'Money follows direction only (as on the ROI tab): every AI that got the direction right makes the same %. All from ez-data.js; simulated, before fees.',font=R,fill='#b8ad94')
    for x,(i,a,b) in enumerate(C):
        X=24+x*(w+24);d.text((X,90),a,font=B,fill='#f4ead0');d.text((X,124),b,font=R,fill='#b8ad94')
        for y in range(3):im.paste(ims[y][x],(X,165+y*(h+20)))
    im.save(EZ+out,optimize=True);print(out,im.size)
