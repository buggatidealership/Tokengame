# /usr/bin/python3 board.py : boards for meetbus (390, 1280, close-up)
from PIL import Image,ImageDraw,ImageFont
F='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
def font(s):
  try:return ImageFont.truetype(F,s)
  except:return ImageFont.load_default()
def board(cols,out,w,title):
  ims=[Image.open(f).convert('RGB') for f,_ in cols];ims=[i.resize((w,int(i.height*w/i.width)),Image.LANCZOS) for i in ims]
  H=max(i.height for i in ims);pad=24;top=150
  B=Image.new('RGB',(pad+len(ims)*(w+pad),top+H+pad),(14,12,16));d=ImageDraw.Draw(B)
  d.text((pad,18),title,fill=(255,210,31),font=font(34))
  for k,((f,lab),im) in enumerate(zip(cols,ims)):
    x=pad+k*(w+pad);B.paste(im,(x,top))
    y=70
    for line in lab.split('\n'):d.text((x,y),line,fill=(248,240,217),font=font(20 if y==70 else 17));y+=26
  B.save(out,optimize=True);print(out,B.size)
L={'now':'Today (chips8 c, live)\nno ledger','a':'A · The strip  ($1.20 shared)\nledger up the left, pulse at each trace','b':'B · The bus\nreadout on top, packet drops, branches in','c':'C · The spine (my own)\nfull-bleed chips, lit spine behind, round in tab'}
board([(f'out/{k}-390.png' if k=='now' else f'out/t-{k}-390.png',L[k]) for k in ['now','a','b','c']],'../../../../../../../x2p-h25-meetbus-390.png',780,'meetbus · Meet the models fed by the ledger · 390 px (frozen mid-pulse)')
board([('out/now-1280.png',L['now'])]+[(f'out/t-{k}-1280.png',L[k]) for k in 'abc'],'../../../../../../../x2p-h25-meetbus-1280.png',1280,'meetbus · 1280 px: the strip / bus / spine runs down the column gap and feeds both columns')
board([(f'out/t-{k}-320.png',L[k]) for k in 'abc'],'../../../../../../../x2p-h25-meetbus-320.png',640,'meetbus · 320 px (overflow check: none)')
# close-up: 3x crops around the landing
a=Image.open('out/x3-a.png');b=Image.open('out/x3-b.png')
ca=a.crop((0,int(a.height*.30),int(a.width*.55),int(a.height*.62)));cb=b.crop((0,int(b.height*.12),int(b.width*.55),int(b.height*.46)))
board([(None,'')] and [],'/dev/null',10,'') if False else None
ims=[ca,cb];w=max(i.width for i in ims);H=sum(i.height for i in ims)+3*24+110
B=Image.new('RGB',(w+48,H),(14,12,16));d=ImageDraw.Draw(B);d.text((24,18),'meetbus · 3x close-up: A the strip feeding a trace; B the readout and bus',fill=(255,210,31),font=font(30));y=80
for im,lab in zip(ims,['A','B']):B.paste(im,(24,y));d.text((34,y+10),lab,fill=(255,210,31),font=font(40));y+=im.height+24
B.save('../../../../../../../x2p-h25-meetbus-close.png',optimize=True);print(B.size)
