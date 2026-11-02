# /usr/bin/python3 board.py <shots dir> <W> <out.png> [scale]: today (now-<W>.png) beside H29 (h29-<W>.png), labelled, on the logo black.
import sys
from PIL import Image,ImageDraw,ImageFont
d,W,out=sys.argv[1],sys.argv[2],sys.argv[3];k=float(sys.argv[4]) if len(sys.argv)>4 else 1.0
A=[Image.open(f'{d}/now-{W}.png').convert('RGB'),Image.open(f'{d}/h29-{W}.png').convert('RGB')]
A=[a.resize((int(a.width*k),int(a.height*k)),Image.LANCZOS) for a in A]
g,top=24,46;w=sum(a.width for a in A)+g*3;h=max(a.height for a in A)+top+g
B=Image.new('RGB',(w,h),(4,7,14));dr=ImageDraw.Draw(B)
try:f=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',20)
except Exception:f=ImageFont.load_default()
x=g
for a,t in zip(A,['Today (live X2+)','H29 · the end']):
  B.paste(a,(x,top));dr.text((x,12),f'{t} · {W}px',fill=(255,210,31),font=f);x+=a.width+g
B=B.quantize(colors=256,method=Image.Quantize.FASTOCTREE,dither=Image.Dither.NONE) if out.endswith(".png") and len(sys.argv)>5 else B
B.save(out,optimize=True) if out.endswith('.png') else B.save(out,quality=85)
print(out,B.size)
