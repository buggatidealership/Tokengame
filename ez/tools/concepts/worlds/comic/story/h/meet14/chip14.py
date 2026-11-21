# /usr/bin/python3 chip14.py : the live chip12-<m>-1800 paintings -> img/chip14-<m>.jpg (1800 x 828)
#  1 the flag-tinted board substrate re-inked in the model's unit colour (low-frequency stripes/stars flattened, grain and grime kept;
#    gold parts, dark parts, the windows, the founder window and the logo plate untouched)
#  2 the flag panel (top left) a solid enamel inlay in the unit colour, hand-drawn: ink edge, lit top-left lip, shaded bottom-right lip, fine grain
#  3 a 100px band cut in for the LAST 5 row: a new black glass window 9-sliced from the chip's own P&L window, on the chip's own leather matte
import numpy as np,sys
from PIL import Image,ImageDraw,ImageFilter
U={'grok':(0xe4,0xe0,0xd6),'claude':(0xef,0x8a,0x55),'gpt':(0xb1,0x8c,0xff),'kimi':(0x58,0xb7,0xff)}
SRC='/home/user/Tokengame/ez/media/chip12-%s-1800.jpg';HB=100
def box(a,r):
  c=np.cumsum(np.cumsum(np.pad(a,((r+1,r),(r+1,r)),mode='edge'),0),1)
  return (c[2*r+1:,2*r+1:]-c[:-2*r-1,2*r+1:]-c[2*r+1:,:-2*r-1]+c[:-2*r-1,:-2*r-1])/((2*r+1)**2)
def blur(a,r):
  for _ in range(3):a=box(a,r)
  return a
def go(m):
  im=np.asarray(Image.open(SRC%m).convert('RGB')).astype(float);H,W,_=im.shape;u=np.array(U[m],float)
  mx=im.max(2);mn=im.min(2);V=mx/255;S=np.where(mx>0,(mx-mn)/np.maximum(mx,1),0)
  r,g,b=im[...,0],im[...,1],im[...,2]
  hue=np.degrees(np.arctan2(np.sqrt(3)*(g-b),2*r-g-b))%360
  gold=(hue>18)&(hue<62)&(S>.36)&(V>.28)
  dark=V<.2
  yy,xx=np.mgrid[0:H,0:W]
  board=(xx>18)&(xx<1782)&(yy>56)&(yy<670)
  keep=((xx>=383)&(xx<=1292)&(yy>=96)&(yy<=626))|((xx>=1296)&(xx<=1756)&(yy>=121)&(yy<=594))|((xx>=84)&(xx<=312)&(yy>=418)&(yy<=642))
  sub=board&~keep&~gold&~dark
  L=.2126*r+.7152*g+.0722*b
  m1=sub.astype(float);num=blur(L*m1,14);den=blur(m1,14);Lb=num/np.maximum(den,1e-3)
  det=np.clip(L-Lb,-90,90)
  base=u*.60
  new=np.clip(base[None,None,:]*(1+det[...,None]/150),0,255)
  a=np.clip(blur(m1,1),0,1)[...,None]
  out=im*(1-a)+new*a
  # a whisper of the old grime back in (keeps the painted wear)
  out=np.clip(out,0,255)
  img=Image.fromarray(out.astype('uint8'))
  # 3: the band. zone A x<378 and zone C x>=1292 insert at y=300 (copy rows 200..300), zone B inserts at y=411 (matte tile + window)
  new=Image.new('RGB',(W,H+HB));new.paste(img,(0,0))
  def zone(x0,x1,ycut,band):
    new.paste(img.crop((x0,ycut,x1,H)),(x0,ycut+HB));new.paste(band,(x0,ycut))
  zone(0,378,300,img.crop((0,300-HB,378,300)))
  zone(1292,W,300,img.crop((1292,300-HB,W,300)))
  t=img.crop((378,404,1292,418));tf=t.transpose(Image.FLIP_TOP_BOTTOM);bd=Image.new('RGB',(1292-378,HB));y=0;k=0
  while y<HB:bd.paste(t if k%2==0 else tf,(0,y));y+=t.size[1];k+=1
  zone(378,1292,411,bd)
  # the new window, 9-sliced from the P&L window (530..946 x 276..404)
  src=img.crop((528,274,948,406));c=26;sw,sh=src.size;X0,Y0,X1,Y1=528,411+6,1254,411+HB-4;tw,th=X1-X0,Y1-Y0
  win=Image.new('RGB',(tw,th))
  def part(sx0,sy0,sx1,sy1,dx0,dy0,dx1,dy1):win.paste(src.crop((sx0,sy0,sx1,sy1)).resize((max(1,dx1-dx0),max(1,dy1-dy0)),Image.LANCZOS),(dx0,dy0))
  xs=[0,c,sw-c,sw];ys=[0,c,sh-c,sh];XD=[0,c,tw-c,tw];YD=[0,c,th-c,th]
  for i in range(3):
    for j in range(3):part(xs[i],ys[j],xs[i+1],ys[j+1],XD[i],YD[j],XD[i+1],YD[j+1])
  new.paste(win,(X0,Y0))
  # 2: the enamel panel (in the taller zone A: y 100..364+HB)
  P=(64,100,338,364+HB);d=ImageDraw.Draw(new,'RGBA')
  pw,ph=P[2]-P[0],P[3]-P[1];gy,gx=np.mgrid[0:ph,0:pw]
  sh_=1+.07*(1-(gx/pw*.6+gy/ph*.9))-.03
  rng=np.random.default_rng(3);grain=box(rng.normal(0,1,(ph,pw)),1)*5
  pan=np.clip(u[None,None,:]*sh_[...,None]+grain[...,None],0,255).astype('uint8')
  mask=Image.new('L',(pw,ph),0);ImageDraw.Draw(mask).rounded_rectangle((0,0,pw-1,ph-1),16,fill=255)
  new.paste(Image.fromarray(pan),(P[0],P[1]),mask)
  # lips: lit top-left, shaded bottom-right, then the ink edge (two weights: thick outer, thin inner)
  d.rounded_rectangle((P[0]+5,P[1]+5,P[2]-5,P[3]-5),12,outline=(255,255,255,70),width=3)
  d.line((P[0]+16,P[3]-6,P[2]-6,P[3]-6),fill=(0,0,0,70),width=4);d.line((P[2]-6,P[1]+16,P[2]-6,P[3]-6),fill=(0,0,0,70),width=4)
  d.rounded_rectangle(P,16,outline=(12,10,14,255),width=5)
  d.rounded_rectangle((P[0]+9,P[1]+9,P[2]-9,P[3]-9),10,outline=(12,10,14,120),width=1)
  new.save('img/chip14-%s.jpg'%m,quality=90)
  Image.fromarray(np.asarray(new)).resize((W//3,(H+HB)//3)).save('/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/c14-%s.png'%m)
for m in (sys.argv[1:] or U):go(m);print(m)
