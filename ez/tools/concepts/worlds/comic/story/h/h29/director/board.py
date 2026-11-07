# /usr/bin/python3 -I board.py <screens dir> <out.png> [scale] [from] [to] [title] [cols]
# The director's cut screen by screen: each screen as the visitor sees it (screens.js), numbered, its focal point boxed (cyan, a board mark,
# not the site's gold), and under it the measured words, typefaces and movers, plus the beat. scale = displayed width / screen width.
import sys,json,os
from PIL import Image,ImageDraw,ImageFont
d,out=sys.argv[1],sys.argv[2];k=float(sys.argv[3]) if len(sys.argv)>3 else 1.0
J=json.load(open(os.path.join(d,'screens.json')));S=J['shots'];W=J['W'];VH=J['VH']
a=int(sys.argv[4]) if len(sys.argv)>4 else 1;b=int(sys.argv[5]) if len(sys.argv)>5 else len(S)
title=sys.argv[6] if len(sys.argv)>6 else f'H29 · Director\'s cut · {W}px'
cols=int(sys.argv[7]) if len(sys.argv)>7 else 6
NT=json.load(open(os.environ['NOTES'])) if os.environ.get('NOTES') else {}
for j,m in enumerate(S,1):
  if str(j) in NT:m['note']=NT[str(j)]
S=S[a-1:b]
F='/usr/share/fonts/truetype/dejavu/'
fT=ImageFont.truetype(F+'DejaVuSans-Bold.ttf',int(26)) ;fN=ImageFont.truetype(F+'DejaVuSans-Bold.ttf',22);fS=ImageFont.truetype(F+'DejaVuSans.ttf',14);fB=ImageFont.truetype(F+'DejaVuSans-Bold.ttf',14)
sw,sh=int(W*k),int(VH*k);g=26;cap=150;rows=(len(S)+cols-1)//cols;top=70
B=Image.new('RGB',(g+cols*(sw+g),top+rows*(sh+cap+g)),(4,7,14));dr=ImageDraw.Draw(B)
dr.text((g,20),title,fill=(255,210,31),font=fT)
dr.text((g+len(title)*16,28),f'words = visible words below the sticky header (header: 9 words, the same on every screen) · faces = typefaces in that text · movers = what moves · cyan box = the one focal point',fill=(200,195,180),font=fS)
CY=(0,229,255)
for i,m in enumerate(S):
  n=a+i;c,r=i%cols,i//cols;x=g+c*(sw+g);y=top+r*(sh+cap+g)
  im=Image.open(m['png']).convert('RGB').resize((sw,sh),Image.LANCZOS);B.paste(im,(x,y))
  dr.rectangle((x-1,y-1,x+sw,y+sh),outline=(60,60,70))
  f=m.get('focal')
  if f:
    fx0=max(0,f['x']);fy0=max(0,f['y']);fx1=min(W,f['x']+f['w']);fy1=min(VH,f['y']+f['h'])
    X0,Y0,X1,Y1=x+fx0*k,y+fy0*k,x+fx1*k,y+fy1*k
    for t in range(3):dr.rectangle((X0+t,Y0+t,X1-t,Y1-t),outline=CY)
    lab=' focus: '+f['l']+' ';tw=dr.textlength(lab,font=fB);ly=max(y+2,Y0-20)
    dr.rectangle((X0,ly,X0+tw,ly+19),fill=CY);dr.text((X0,ly+1),lab,fill=(0,0,0),font=fB)
  # the number tab
  dr.rectangle((x-8,y-8,x+30,y+24),fill=(196,42,32),outline=(13,11,16),width=2);dr.text((x+(2 if n>9 else 6),y-6),str(n),fill=(248,240,217),font=fN)
  ty=y+sh+8;sec=' / '.join(dict.fromkeys(x.replace('.T','. T') for x in (m.get('secs') or []))) or '(continues)'
  while dr.textlength(sec,font=fB)>sw-4:sec=sec[:-2].rstrip()+'…' if not sec.endswith('…') else sec[:-3].rstrip()+'…'
  dr.text((x,ty),sec,fill=(255,210,31),font=fB)
  wc=m['words'];col=(3,200,112) if wc<=40 else ((255,210,31) if wc<=50 else (255,90,80))
  dr.text((x,ty+22),f'{wc} words',fill=col,font=fB)
  fc=', '.join(k2 for k2 in m['faces'].keys());dr.text((x,ty+42),('faces: '+fc)[:60],fill=(220,214,198),font=fS)
  mv=m['movers'] or ['none']
  dr.text((x,ty+62),('movers: '+', '.join(mv))[:62],fill=(220,214,198) if len(m['movers'])<=1 else (255,90,80),font=fS)
  note=m.get('note','')
  if note:dr.multiline_text((x,ty+84),note,fill=(200,195,180),font=fS,spacing=3)
B.save(out,optimize=True);print(out,B.size,os.path.getsize(out))
