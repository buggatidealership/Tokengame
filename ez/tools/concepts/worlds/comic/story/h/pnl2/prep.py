#!/usr/bin/python3
# Cut-outs from the paintings: foreground figures (img/<name>-fg.png, alpha), the glass's own highlights (img/<name>-hl.jpg, black
# where nothing shines; screened over the marks so the room's light crosses them), and the plotter's hand keyed off green.
import numpy as np
from PIL import Image,ImageDraw,ImageFilter
def poly_mask(size,polys,feather=1.2):
  m=Image.new('L',size,0);d=ImageDraw.Draw(m)
  for p in polys:d.polygon(p,fill=255)
  return m.filter(ImageFilter.GaussianBlur(feather))
def cut(name,polys,extra=None):
  im=Image.open(f'img/{name}.jpg').convert('RGB');m=poly_mask(im.size,polys)
  if extra is not None:m=Image.fromarray(np.maximum(np.asarray(m),extra))
  o=im.copy();o.putalpha(m);o.save(f'img/{name}-fg.png',optimize=True)
def hl(name,quad,k=58,gain=2.2):
  im=np.asarray(Image.open(f'img/{name}.jpg').convert('RGB')).astype(float)
  L=im.mean(2,keepdims=True);h=np.clip((im-k)*gain*(L>k),0,255)
  q=np.asarray(poly_mask(im.shape[1::-1],[quad],2)).astype(float)[...,None]/255
  Image.fromarray((h*q).astype('uint8')).save(f'img/{name}-hl.jpg',quality=88)
D13L=[(0,1024),(0,840),(55,822),(105,812),(118,790),(108,760),(112,735),(122,712),(128,690),(150,668),(190,656),(232,664),(256,690),(262,720),(255,760),(240,790),(225,825),(262,840),(300,858),(330,900),(360,1024)]
D13R=[(430,1024),(445,900),(470,860),(530,840),(560,830),(552,800),(545,770),(548,740),(560,710),(590,693),(625,690),(655,702),(670,730),(672,770),(662,810),(680,830),(720,840),(768,850),(768,1024)]
cut('d1-3x4',[D13L,D13R])
D1L=[(0,720),(0,610),(80,590),(140,575),(150,545),(142,500),(140,455),(155,415),(190,392),(235,385),(285,395),(318,425),(325,465),(318,510),(305,545),(300,575),(360,595),(420,620),(460,670),(490,720)]
D1R=[(785,720),(800,670),(830,630),(900,595),(960,575),(950,545),(942,505),(938,455),(950,415),(985,393),(1030,388),(1075,400),(1100,430),(1105,470),(1098,510),(1090,545),(1120,565),(1190,590),(1250,600),(1280,620),(1280,720)]
cut('d1-16x9',[D1L,D1R])
hl('d1-3x4',[(125,62),(697,140),(718,850),(133,850)],k=50,gain=2.6)
hl('d1-16x9',[(255,58),(1068,100),(1128,640),(228,640)],k=50,gain=2.6)
hl('d2-3x4',[(8,95),(760,95),(760,935),(8,935)],k=70,gain=1.6)
hl('d2-16x9',[(30,62),(1248,62),(1248,665),(30,665)],k=70,gain=1.6)
# the exchange: what is not slate, below the board's rail line, is the crowd (and the clerk, by polygon)
def slatefg(name,ymin,polys):
  im=np.asarray(Image.open(f'img/{name}.jpg').convert('RGB')).astype(int);R,G,B=im[...,0],im[...,1],im[...,2]
  L=im.mean(2);yy=np.arange(im.shape[0])[:,None]
  slate=(L<92)&(G>=R-6)&(abs(R-B)<26)
  fg=(~slate)&(yy>ymin)
  m=Image.fromarray((fg*255).astype('uint8')).filter(ImageFilter.MedianFilter(5)).filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.GaussianBlur(.8))
  cut(name,polys,np.asarray(m))
cut_f3=[(540,1024),(548,380),(560,340),(575,262),(590,250),(598,215),(606,196),(625,192),(635,215),(640,248),(668,262),(700,245),(705,212),(712,205),(718,240),(706,282),(670,290),(668,340),(700,345),(715,380),(735,440),(768,700),(768,1024)]
slatefg('f-3x4',598,[cut_f3])
cut_f16=[(820,720),(872,330),(872,300),(880,235),(905,205),(940,190),(945,160),(955,140),(985,140),(990,175),(1020,195),(1060,175),(1068,155),(1085,150),(1085,180),(1078,200),(1040,240),(1018,250),(1022,300),(1030,310),(1050,300),(1060,520),(1100,720)]
slatefg('f-16x9',500,[cut_f16])
# the hand: key off the green
h=np.asarray(Image.open('img/hand-1x1.jpg').convert('RGB')).astype(int);R,G,B=h[...,0],h[...,1],h[...,2]
gs=(G-np.maximum(R,B));a=np.clip(255-(gs-40)*4,0,255).astype('uint8')
hh=h.copy();sp=gs>0;hh[...,1]=np.where(sp,np.maximum(R,B)+np.minimum(gs,10),G)  # despill
o=Image.fromarray(hh.astype('uint8'));o.putalpha(Image.fromarray(a).filter(ImageFilter.GaussianBlur(.6)))
bb=o.getbbox();o=o.crop(o.getchannel('A').point(lambda v:255 if v>20 else 0).getbbox());o.thumbnail((700,700));o.save('img/hand-cut.png',optimize=True);print('hand',o.size)
