# /usr/bin/python3 board.py : ez/x2p-h25-meet9-390.png, -1280.png, -closeup.png from shots/
from PIL import Image,ImageDraw,ImageFont
F='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
try:ft=ImageFont.truetype(F,22);fs=ImageFont.truetype(F,17)
except:ft=fs=ImageFont.load_default()
L={'now':('LIVE TODAY','chips8 c: balloons on black'),
 'A':('A  marquee','line runs on a 5th glass in the foot band · ground: board, black lifted · $0'),
 'B':('B  hologram','light from the founder\'s window · gaps: pins-to-pins traces · $0.41'),
 'C':('C  channel','line lit in a channel cut into the board above its chip · $0.86'),
 'D':('D  typed','die types it a sentence at a time · ground: colour spill · $0'),
 'E':('E  channel, seamless (pick)','C, chip and channel as one board · $0.86')}
def board(w,out,maxh):
  ims=[(t,Image.open(f'shots/ch-{w}-{t}.png').convert('RGB')) for t in L]
  cw=ims[0][1].width; h=min(maxh,max(i.height for _,i in ims))
  cols=6 if w<600 else 3; rows=(len(ims)+cols-1)//cols
  B=Image.new('RGB',(cols*(cw+30)+30,rows*(h+110)+20),'#14121a');d=ImageDraw.Draw(B)
  for k,(t,im) in enumerate(ims):
    x=30+(k%cols)*(cw+30);y=20+(k//cols)*(h+110)
    d.text((x,y),L[t][0],font=ft,fill='#ffd21f');d.text((x,y+30),L[t][1],font=fs,fill='#e8e0cc')
    B.paste(im.crop((0,0,cw,min(h,im.height))),(x,y+70))
  if B.width>4000:B=B.resize((B.width*4000//B.width,B.height*4000//B.width))
  B.save(out,optimize=True)
board(390,'../../../../../../../x2p-h25-meet9-390.png',2500)
board(1280,'../../../../../../../x2p-h25-meet9-1280.png',2300)
# close-up: the first gap of each take at the shot's own 2x, shown 1.5x (=3x CSS)
cs=[]
for t in L:
  im=Image.open(f'shots/ch-390-{t}.png').convert('RGB');cs.append((t,im.crop((0,330,780,1000)).resize((1170,1005))))
B=Image.new('RGB',(3*1200,2*1080),'#14121a');d=ImageDraw.Draw(B)
for k,(t,im) in enumerate(cs):
  x=(k%3)*1200+15;y=(k//3)*1080+10;d.text((x,y),L[t][0]+' (3x at 390)',font=ft,fill='#ffd21f');B.paste(im,(x,y+50))
B.save('../../../../../../../x2p-h25-meet9-closeup.png',optimize=True)
print('ok')
