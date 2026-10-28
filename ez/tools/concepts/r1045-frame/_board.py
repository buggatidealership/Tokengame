# r1045 boards: /usr/bin/python3 r1045-frame/_board.py [2]  (reads scratchpad/r1045, writes ez/x2p-r1045-frame.png and -desktop.png)
from PIL import Image,ImageDraw,ImageFont
S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/r1045/';EZ='/home/user/Tokengame/ez/'
B=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',30);R=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',21);BG='#1e1c22'
N=[('now','Today · the bill','green band, "$EZ presents", red foot'),('A','A · Medallion plate','the black disc as a seal on the corner'),('B','B · Leaning slabs','the logo inside out, at its lean'),
   ('C','C · Extruded','the headline\'s 3D edge on the picture'),('D','D · The cut','green and red split on the logo\'s diagonal'),('E','E · On air','channel tab, lower third, duration box')]
import sys
if len(sys.argv)>1 and sys.argv[1] in('2','3'):
    N=[N[0],N[5],('E2','E2 · Title tab','tab: logo + presents, gold title slab'),('E3','E3 · Title band','band: box, title across, slashes')]
def board(w,scale,cols,out,title,sub):
    ims=[Image.open(f'{S}{k}-{w}.png') for k,_,_ in N];ims=[i.resize((int(i.width*scale),int(i.height*scale)),Image.LANCZOS) for i in ims]
    cw,ch=ims[0].size;pad=28;rows=(len(ims)+cols-1)//cols;H=150+rows*(ch+110);W=pad+cols*(cw+pad)
    im=Image.new('RGB',(W,H),BG);d=ImageDraw.Draw(im);d.text((pad,24),title,font=B,fill='#f2b632');d.text((pad,68),sub,font=R,fill='#b8ad94')
    for j,(c,(k,a,b)) in enumerate(zip(ims,N)):
        x=pad+(j%cols)*(cw+pad);y=130+(j//cols)*(ch+110);d.text((x,y),a,font=B,fill='#f4ead0');d.text((x,y+40),b,font=R,fill='#b8ad94');im.paste(c,(x,y+80))
    im.save(out,optimize=True);print(out,im.size)
R3=len(sys.argv)>1 and sys.argv[1]=='3'
if R3:
    N=[N[0],N[3],('E4','E4 · Gold on today','today\'s boxes, E3\'s gold band, black foot'),('E5','E5 · Today restyled','today\'s green and red, E\'s box and type')]
    SUB2='Round 3: today\'s geometry to the pixel (band heights, the presents box, the title\'s place and width); EZ. logo + "presents" in the box, running time back in the foot band.'
R2=len(sys.argv)>1 and sys.argv[1] in('2','3')
X='-'+sys.argv[1] if R2 else ''
if not R3: SUB2='Round 2 (E picked): the EZ. logo, "presents" and "How it works" up top as on the live bill; the duration box hangs below the picture. Nothing over the picture.'
board(390,.5,len(N),EZ+'x2p-r1045-frame'+X+'.png','The film\'s frame in the EZ. logo\'s style · 390x844 first screen (rendered at 3x, shown at half)',
      SUB2 if R2 else 'The thumbnail is the ticket inside; the Season 1 strip under it is unchanged. Each frame: "Earnings Zeason presents", "How it works", the running time (counts down while playing). Nothing over the picture.')
board(1280,.5,2 if R2 else 3,EZ+'x2p-r1045-frame'+X+'-desktop.png','The film\'s frame in the EZ. logo\'s style · 1280x900 first screen (rendered at 2x, shown at half)',
      (('Today, E3, E4 and E5.' if R3 else 'Today, E, E2 and E3.') if R2 else 'Same five options and today\'s bill.')+' The frame stays 560px wide on desktop, left in the column as today.')
