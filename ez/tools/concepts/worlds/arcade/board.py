# /usr/bin/python3 board.py <shots dir>  -> ez/x2p-world-arcade-phone.png and -desktop.png
import sys,os
from PIL import Image,ImageDraw,ImageFont
D=sys.argv[1];OUT='/home/user/Tokengame/ez/'
def font(s):
    for f in ['/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf','/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf']:
        if os.path.exists(f):return ImageFont.truetype(f,s)
    return ImageFont.load_default()
BG=(16,14,24);INK=(248,240,217);GOLD=(253,188,42)
def board(files,labels,w,h,cols,title,out,pad=24,lab=56):
    rows=(len(files)+cols-1)//cols
    W=pad+cols*(w+pad);H=110+rows*(h+lab+pad)
    B=Image.new('RGB',(W,H),BG);d=ImageDraw.Draw(B)
    d.text((pad,30),title,fill=GOLD,font=font(30))
    for i,(f,l) in enumerate(zip(files,labels)):
        im=Image.open(os.path.join(D,f)).convert('RGB').resize((w,h),Image.LANCZOS)
        x=pad+(i%cols)*(w+pad);y=110+(i//cols)*(h+lab+pad)
        d.text((x,y+8),l,fill=INK,font=font(20 if w<600 else 26))
        B.paste(im,(x,y+lab))
    B.save(out);print(out,B.size)
board(['arc-arcade-390-%d.png'%i for i in range(5)],
 ['1  Attract: title, film, move list','2  Next fight: the VS screen','3  Character select','4  Match history: replays','5  Training mode: smart or lucky?'],
 390,844,5,'EZ world: the arcade fighting game  ·  phone 390x844, first 5 screens of the scroll',OUT+'x2p-world-arcade-phone.png')
board(['arc-arcade-1536-%d.png'%i for i in range(3)],
 ['1  Attract + next fight (first screen)','2  Character select','3  Training mode + boss fight'],
 1536,864,1,'EZ world: the arcade fighting game  ·  desktop 1536x864',OUT+'x2p-world-arcade-desktop.png')
