# /usr/bin/python3 board.py <shots dir> : the film3 boards (ez/x2p-h26-film3-*.png) from shot.js captures (2x)
import sys,os,json,re
from PIL import Image,ImageDraw,ImageFont
S=sys.argv[1];OUT='/home/user/Tokengame/ez/'
def F(sz,b=True):return ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf'%('-Bold' if b else ''),sz)
BG=(243,238,226);INK=(20,18,23);GOLD=(232,176,36)
def m(t,w):
  L=open(f'{S}/{t}-{w}.log').read();j=json.loads(L[L.index('{'):]);return j.get('m') or {}
NAMES={'now':'Today (live)','A':'A · bezel','B':'B · transport','C':'C · legs','D':'D · scope','E':'E · module','F':'F · bare bezel','G':'G · B on F (pick)'}
DESC={'now':'the film as a full beat with its own head; 27px to Meet the models',
 'A':'thin gold bezel, lip with pins; play disc on the desk, 1:20 lit on the glass',
 'B':'same monitor; the glass shows a paused player: play, track, 1:20',
 'C':'no board: the glass in a gold bezel on chip legs, top and bottom',
 'D':'a 2.39:1 strip, the smallest; play in the bokeh left of the ticket',
 'E':'theme7 M slimmed: 1:20 in the tall LED, the gold key is play',
 'F':'gold bezel only, no lip, no pins: the least chip',
 'G':'B\'s transport on F\'s bare bezel: a video at a glance, almost no chip'}
def wrap(d,t,f,w):
  out=[];l=''
  for x in t.split():
    if d.textlength((l+' '+x).strip(),font=f)>w:out.append(l);l=x
    else:l=(l+' '+x).strip()
  return out+[l]
def head(c,title,sub):
  d=ImageDraw.Draw(c);d.rectangle((0,0,c.size[0],110),fill=INK);d.text((36,18),title,font=F(38),fill=GOLD);d.text((36,68),sub,font=F(22,False),fill=(240,232,210))
def takes(w,cropx,scale,out,title,sub):
  T=['now','A','B','C','D','E','F','G'];ims=[]
  for t in T:
    im=Image.open(f'{S}/{t}-{w}.png')
    if cropx:im=im.crop(cropx+(0,)+(cropx[0]+0,))[0:0] if False else im.crop((cropx[0],0,cropx[1],im.size[1]))
    im=im.resize((int(im.size[0]*scale),int(im.size[1]*scale)),Image.LANCZOS);ims.append(im)
  cw=ims[0].size[0];gap=30;top=250;H=top+max(i.size[1] for i in ims)+40
  c=Image.new('RGB',(36*2+len(ims)*cw+(len(ims)-1)*gap,H),BG);head(c,title,sub);d=ImageDraw.Draw(c)
  for k,(t,im) in enumerate(zip(T,ims)):
    x=36+k*(cw+gap);d.text((x,128),NAMES[t],font=F(30),fill=INK)
    mm=m(t,w);g=f"gaps  beat {mm['beat']['got']:.0f} · film {mm['sub']['got']:.0f} · chapter {mm['chap']['got']:.0f} px"
    y=170
    for ln in wrap(d,DESC[t],F(19,False),cw)[:2]:d.text((x,y),ln,font=F(19,False),fill=(70,64,60));y+=24
    d.text((x,y+2),g,font=F(17),fill=(150,40,30) if t=='now' else (20,110,60))
    c.paste(im,(x,top))
  c.save(OUT+out,optimize=True);print(out,c.size)
takes(390,None,1.0,'x2p-h26-film3-takes-390.png','film3 · "the whole game" as a small part of How a round works, 390px',
 'In place: the end of How a round works, the film, the chapter gap, Meet the models. Gaps by the H26 rule (box to box): film joint u, chapter 5u. Tap = open big.')
takes(1280,(280,2280),.4,'x2p-h26-film3-takes-1280.png','film3 · the same takes at 1280px (centre 1000px of the page shown)',
 'The monitor is 600px wide (D 720, E 620), centred under the four frames, its head on its own corner; the gaps follow the same rule (u = 32px).')
# the open state
def opens():
  a=Image.open(f'{S}/G-390.png');ca=a.crop((0,440,780,1260))
  b=Image.open(f'{S}/G-open-390.png');l=Image.open(f'{S}/G-open-land.png');t=Image.open(f'{S}/G-open-1280.png');cl=Image.open(f'{S}/G-1280.png')
  cl=cl.crop((380,0,2180,cl.size[1]));cl=cl.crop((0,int(cl.size[1]*.18),cl.size[0],int(cl.size[1]*.8)))
  sc=.5;b=b.resize((390,844));ca=ca.resize((390,410));l=l.resize((844,390));t=t.resize((1280,900));cl=cl.resize((int(cl.size[0]*.5),int(cl.size[1]*.5)))
  W=36+390+40+390+40+844+36;H=110+60+844+80+60+900+40
  c=Image.new('RGB',(max(W,36+cl.size[0]+40+1280+36),H),BG);head(c,'film3 · tap to watch big (the pick, G; the same for every take)',
   'Closed: the film is a still on the glass. Tap: phones hand the film to their own full-screen player; desktop opens a theatre. Sound on. Close puts the page back.');d=ImageDraw.Draw(c)
  y=128;x=36
  for lab,im in [('1 · closed, 390',ca),('2 · tapped, upright',b),('3 · turned sideways: the phone\'s own full-screen player',l)]:
    d.text((x,y),lab,font=F(22),fill=INK);c.paste(im,(x,y+40));x+=im.size[0]+40
  y=128+40+844+60;x=36
  for lab,im in [('4 · closed, 1280',cl),('5 · tapped, desktop theatre (the same monitor, bare bezel, 1110px)',t)]:
    d.text((x,y),lab,font=F(22),fill=INK);c.paste(im,(x,y+40));x+=im.size[0]+40
  c.save(OUT+'x2p-h26-film3-open.png',optimize=True);print('open',c.size)
opens()
# the gaps: today vs B over the whole top, each gap bracketed with its size
def gaps():
  cols=[]
  for t,w,dpr in [('now',390,2),('G',390,2),('now',1280,1),('G',1280,1)]:
    im=Image.open(f'{S}/full-{t}-{w}.png');L=open(f'{S}/full-{t}-{w}.log').read();j=json.loads(L[L.index('{'):]);mm=j['m'];y0=j['y'][0]
    s=.5 if dpr==2 else (390/1280*1.6);im=im.resize((int(im.size[0]*s),int(im.size[1]*s)),Image.LANCZOS);k=s*dpr
    cols.append((t,w,im,mm,y0,k))
  W=36+sum(c[2].size[0]+260 for c in cols);H=110+90+max(c[2].size[1] for c in cols)+40
  c=Image.new('RGB',(W,H),BG);head(c,'film3 · the gaps: D = k · u + 0.45 · ΔE   (u = clamp(26px, 8vw, 32px); k = 1 film joint, 3.5 beat, 5 chapter)',
   'Box to box. Today the gap before Meet the models is the smallest (27px at 390); by the rule it is the biggest (156px), and the film sits on How a round works (31px).');d=ImageDraw.Draw(c)
  x=36
  for t,w,im,mm,y0,k in cols:
    d.text((x,128),('Today' if t=='now' else 'G, by the rule')+f' · {w}px',font=F(24),fill=INK);top=190;c.paste(im,(x,top))
    for key,lab,col in [('beat','beat (top → How)',(40,40,40)),('sub','film joint (How → film)',(20,110,60)),('chap','chapter (film → Meet the models)',(170,40,30))]:
      a,b=mm['y'][key];ya=top+(a-y0)*k;yb=top+(b-y0)*k;xr=x+im.size[0]+10
      d.line((xr,ya,xr+16,ya),fill=col,width=3);d.line((xr,yb,xr+16,yb),fill=col,width=3);d.line((xr+8,ya,xr+8,yb),fill=col,width=3)
      d.text((xr+24,(ya+yb)/2-24),f"{b-a:.0f}px",font=F(22),fill=col);d.text((xr+24,(ya+yb)/2+2),lab,font=F(14,False),fill=col)
    x+=im.size[0]+260
  c.save(OUT+'x2p-h26-film3-gaps.png',optimize=True);print('gaps',c.size)
gaps()
