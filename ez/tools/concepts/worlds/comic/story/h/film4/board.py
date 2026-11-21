# /usr/bin/python3 board.py <shots dir> : the film4 boards ez/x2p-h26-film4-*.png from shot.js captures
import sys,json,textwrap
from PIL import Image,ImageDraw,ImageFont
S=sys.argv[1];OUT='/home/user/Tokengame/ez/'
def F(sz,b=True):return ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf'%('-Bold' if b else ''),sz)
BG=(243,238,226);INK=(20,18,23);GOLD=(232,176,36)
def mm(n):L=open(f'{S}/{n}.log').read();return json.loads(L[L.index('{'):])['f4']
def head(c,t,s):d=ImageDraw.Draw(c);d.rectangle((0,0,c.size[0],110),fill=INK);d.text((36,18),t,font=F(38),fill=GOLD);d.text((36,68),s,font=F(22,False),fill=(240,232,210));return d
def gl(m):return f"glass {m['glass']:.0f}px · strip {m['strip'][1]:.0f}px · gaps: beat {m['beat']:.0f}, film {m['film']:.0f}, chapter {m['chapter']:.0f}"
NM={'title':'1 · Title card on the glass (pick)','chapter':'2 · The bet\'s lettering, a size down','marquee':'3 · A cinema letterboard on the rail'}
DS={'title':'the film\'s own title, lit on its glass beside the poster (the NVIDIA timer\'s recipe); play key + 1:20 under it',
 'chapter':'Bangers gold, ink stroke, red drop, tilted, breaking the top rail like "Bet #1: NVIDIA"; 1:20 in cream; play disc on the desk',
 'marquee':'Anton capitals on a black board with printed bulbs (still), set on the top rail; 1:20 lit gold; play disc on the desk'}
# 1 lettering at 390
ims=[Image.open(f'{S}/{L}-390.png') for L in NM];cw=780;H=270+max(i.size[1] for i in ims)+30
c=Image.new('RGB',(36*2+3*cw+2*40,H),BG);d=head(c,'film4 · D, the scope: three letterings for "The whole game", 390px',
 'In place: the end of How a round works, the strip (bleeds edge to edge), the chapter gap, Meet the models. 2x captures.')
for k,(L,im) in enumerate(zip(NM,ims)):
  x=36+k*(cw+40);d.text((x,128),NM[L],font=F(30),fill=INK);y=170
  import textwrap
  for ln in textwrap.wrap(DS[L],62)[:2]:d.text((x,y),ln,font=F(19,False),fill=(70,64,60));y+=24
  d.text((x,y+2),gl(mm(f'{L}-390')),font=F(17),fill=(20,110,60));c.paste(im,(x,270))
c.save(OUT+'x2p-h26-film4-lettering-390.png',optimize=True);print('390',c.size)
# 2 lettering at 1280 and 1920
for w,sc in [(1280,.75),(1920,.55)]:
  ims=[Image.open(f'{S}/{L}-{w}.png') for L in NM];ims=[i.resize((int(i.size[0]*sc),int(i.size[1]*sc)),Image.LANCZOS) for i in ims]
  cw=ims[0].size[0];H=110+sum(i.size[1]+90 for i in ims)+20;c=Image.new('RGB',(36*2+cw,H),BG)
  d=head(c,f'film4 · the three letterings at {w}px: the strip bleeds edge to edge of the window',
   f'Glass height min(width / 2.39, 560px): {"536px at 1280 (uncapped)" if w==1280 else "560px at 1920 (capped; 2.39:1 would be 803px)"}. No side bezels: the rails run off both edges.')
  y=128
  for L,im in zip(NM,ims):d.text((36,y),NM[L]+'   ·   '+gl(mm(f'{L}-{w}')),font=F(24),fill=INK);c.paste(im,(36,y+44));y+=im.size[1]+90
  c.save(OUT+f'x2p-h26-film4-lettering-{w}.png',optimize=True);print(w,c.size)
# 3 the pick across widths
ims=[(w,Image.open(f'{S}/title-{w}.png')) for w in [320,390,1280,1920]]
tw=[ (w,im.resize((int(im.size[0]*s),int(im.size[1]*s)),Image.LANCZOS)) for (w,im),s in zip(ims,[1,1,.62,.45])]
W=36+sum(im.size[0]+40 for _,im in tw);H=110+90+max(im.size[1] for _,im in tw)+30;c=Image.new('RGB',(W,H),BG)
d=head(c,'film4 · the pick (title card) at 320, 390, 1280 and 1920px','Checked at each width: no overflow, no sideways scroll, no errors (normal and reduced motion). Gaps by the H26 rule, measured box to box.');x=36
for w,im in tw:d.text((x,128),f'{w}px',font=F(26),fill=INK);d.text((x,162),gl(mm(f'title-{w}')),font=F(15,False),fill=(20,110,60));c.paste(im,(x,190));x+=im.size[0]+40
c.save(OUT+'x2p-h26-film4-widths.png',optimize=True);print('widths',c.size)
# 4 open
a=Image.open(f'{S}/title-390.png');ca=a.crop((0,700,780,1160)).resize((390,230))
b=Image.open(f'{S}/open-390.png').resize((390,844));t1=Image.open(f'{S}/open-1280.png');t2=Image.open(f'{S}/open-1920.png').resize((1280,667))
W=36+390+40+390+40+1280+36;H=110+60+844+60+900+40;c=Image.new('RGB',(W,max(H,110+60+900+60+667+40)),BG)
d=head(c,'film4 · tap to watch big (the pick; the same for every lettering)','Phones: the phone\'s own full-screen player takes it (turned sideways it fills the screen); this page view is what stays behind it, and the fallback. Desktop: a theatre. Sound on; close, Esc or outside.')
d.text((36,128),'1 · closed, 390',font=F(22),fill=INK);c.paste(ca,(36,168))
d.text((466,128),'2 · tapped, phone (page view)',font=F(22),fill=INK);c.paste(b,(466,168))
d.text((896,128),'3 · tapped, 1280: the theatre (1184x666, rails above and below)',font=F(22),fill=INK);c.paste(t1,(896,168))
d.text((896,168+900+30),'4 · tapped, 1920x1000 window (shown at 2/3): 1511x850',font=F(22),fill=INK);c.paste(t2,(896,168+900+70))
c=c.crop((0,0,W,168+900+70+667+30));c.save(OUT+'x2p-h26-film4-open.png',optimize=True);print('open',c.size)
