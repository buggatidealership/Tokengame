# /usr/bin/python3 board.py <shots dir 390 (dpr2)> <bleed dir> <shots dir 1280 (dpr1)> <out prefix>
import sys,json
from PIL import Image,ImageDraw,ImageFont
A,BL,K,OUT=sys.argv[1:5]
F=ImageFont.truetype('/usr/share/fonts/opentype/inter/Inter-SemiBold.otf',26);f2=ImageFont.truetype('/usr/share/fonts/opentype/inter/Inter-Regular.otf',19)
def col(items,title,sub,scale=1.0,gap=24):
    ims=[Image.open(p).convert('RGB') for p,_ ,_ in items]
    ims=[im.resize((int(im.width*scale),int(im.height*scale))) for im in ims]
    W=sum(i.width for i in ims)+gap*(len(ims)+1);H=max(i.height for i in ims)+170
    b=Image.new('RGB',(W,H),(18,17,22));d=ImageDraw.Draw(b);d.text((gap,18),title,font=F,fill=(248,240,217));d.text((gap,54),sub,font=f2,fill=(190,182,165))
    x=gap
    for im,(p,l1,l2) in zip(ims,items):
        d.text((x,96),l1,font=F,fill=(255,210,31));d.text((x,128),l2,font=f2,fill=(200,192,175));b.paste(im,(x,160));x+=im.width+gap
    return b
dj=lambda d:json.load(open(d+'/cmp.json'))
r=dj(A)
b=col([(A+'/sec-390-x3.png','X3+ live (v47)','the section as published, 390px'),
       (A+'/sec-390-x2.png','X2+ + x2p_bet (v46)','drop-in laid over the built page'),
       (BL+'/sec-390-x2.png','Option: ground bleeds','html.x2b-bleed, off by default'),
       (A+'/diff-390.png','Difference x8','no pixel >24 levels; 99.07% identical')],
      'bet2x: X3+\'s Bet #1 NVIDIA ported to X2+, phone 390px (2x)',
      'Same fixed clock in both pages (countdown '+':'.join(r['390-x2']['dig'])+' in both), reduced motion. Leader '+r['390-x2']['lead']+', pool '+r['390-x2']['share']+' from SIM.poolShare.',scale=.5)
b.save(OUT+'-390.png')
k=dj(K)
b=col([(K+'/sec-1280-x3.png','X3+ live (v47)','1280px'),(K+'/sec-1280-x2.png','X2+ + x2p_bet (v46)','1280px'),(K+'/diff-1280.png','Difference x8','outside the section: page ground; inside: only the tilted sub line')],
      'bet2x, desktop 1280px (1x)','Countdown '+':'.join(k['1280-x2']['dig'])+' in both. 0.07% of pixels differ by more than 64 levels (all of them the sub line\'s antialiasing or the page ground beside the section).',scale=.5)
b.save(OUT+'-1280.png')
# close-up: the chip's dies, 3x of CSS (2x shot upscaled 1.5)
a=Image.open(A+'/sec-390-x3.png');c=Image.open(A+'/sec-390-x2.png')
y0=None
box=(0,610,780,940)
ca=a.crop(box).resize((1170,495));cc=c.crop(box).resize((1170,495))
b=Image.new('RGB',(1170*2+72,495+150),(18,17,22));d=ImageDraw.Draw(b)
d.text((24,18),'Close-up 3x: the countdown in the dies',font=F,fill=(248,240,217));d.text((24,100),'X3+ live',font=F,fill=(255,210,31));d.text((1170+48,100),'X2+ + x2p_bet',font=F,fill=(255,210,31))
b.paste(ca,(24,140));b.paste(cc,(1170+48,140));b.save(OUT+'-closeup.png')
print('ok')
