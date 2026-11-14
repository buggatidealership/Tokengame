# /usr/bin/python3 board.py <shots dir> : composes ez/x2p-h25-theme7-*.png from the stitched captures (run.js, closeup.js)
import sys,json,os
from PIL import Image,ImageDraw,ImageFont
S=sys.argv[1];EZ='/home/user/Tokengame/ez/'
def font(sz,b=True):
  for f in ['/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf' if b else '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf']:
    if os.path.exists(f):return ImageFont.truetype(f,sz)
  return ImageFont.load_default()
F1,F2,F3=font(24),font(19,False),font(16,False)
def wrap(d,txt,f,w):
  out=[]
  for para in txt.split('\n'):
    cur=''
    for wd in para.split(' '):
      t=(cur+' '+wd).strip()
      if d.textlength(t,font=f)>w-20 and cur:out.append(cur);cur=wd
      else:cur=t
    out.append(cur)
  return out
def head(img,title,sub,w):
  d0=ImageDraw.Draw(Image.new('RGB',(10,10)));L=wrap(d0,sub,F3,w);hh=52+20*len(L)
  o=Image.new('RGB',(w,img.height+hh),'#f4efe4');d=ImageDraw.Draw(o);d.text((10,8),title,font=F1,fill='#141012')
  y=46
  for line in L:d.text((10,y),line,font=F3,fill='#3a352c');y+=20
  o.paste(img,(0,hh));return o
def row(cols,gap=24,bg='#f4efe4'):
  H=max(c.height for c in cols);W=sum(c.width for c in cols)+gap*(len(cols)+1);o=Image.new('RGB',(W,H+gap*2),bg);x=gap
  for c in cols:o.paste(c,(x,gap));x+=c.width+gap
  return o
def title_bar(o,t,s):
  d0=ImageDraw.Draw(Image.new('RGB',(10,10)));L=wrap(d0,s,F2,o.width-30);bh=64+24*len(L)
  b=Image.new('RGB',(o.width,bh),'#141012');d=ImageDraw.Draw(b);d.text((24,14),t,font=font(30),fill='#f2c531')
  for i,l in enumerate(L):d.text((24,56+24*i),l,font=F2,fill='#f8f0d9')
  r=Image.new('RGB',(o.width,o.height+bh));r.paste(b,(0,0));r.paste(o,(0,bh));return r
M390=json.load(open(f'{S}/t2/measure-390-c.json'))
M1280=json.load(open(f'{S}/d/measure-1280-c.json'))
def own(m):
  b={x['k']:x['c'] for x in m['bands']};return b
DESC={'now':('Today (live)','board green everywhere; gold fingers between beats;\nthe heads\' second word extruded in green'),
 'p1':('P1 · Live owners','the board re-masked per section in the colour of\nthe model that owns its measure, from the data'),
 'p2':('P2 · Relay','each model colour handed on once, by meaning:\nrecord slate, proof blue, vault rim orange, close green'),
 'p3':('P3 · Rim light','the board stays dark; the owner\'s colour is the\nlight on both bleed edges (material vs light)')}
def palettes(W,M,dirn,scale,name):
  cols=[]
  for k,f in [('now',f'{dirn}/full-{W}-now.png'),('p1',f'{dirn}/full-{W}-p1-c.png'),('p2',f'{dirn}/full-{W}-p2-c.png'),('p3',f'{dirn}/full-{W}-p3-c.png')]:
    im=Image.open(f);im=im.resize((int(im.width*scale),int(im.height*scale)),Image.LANCZOS)
    t,s=DESC[k]
    if k!='now':
      o=own(M[k]);s+=f"\nrecord {o.get('rounds')} · proof {o.get('proof')} · close {o.get('close')}"
    cols.append(head(im,t,s,im.width))
  o=row(cols);o=title_bar(o,f'theme7 · colour per section, Overview at {W}px','The top stays board green; Meet the models brings in the four chip colours (Grok slate, Claude orange, GPT green, Kimi blue); later sections take one of them. Film: take C (cartridge) in all three.')
  o.save(EZ+name);print(name,o.size)
palettes(390,M390,f'{S}/t2',.8,'x2p-h25-theme7-palettes-390.png')
palettes(1280,M1280,f'{S}/d',.3,'x2p-h25-theme7-palettes-1280.png')
# film takes: from the end of frame 4 to the first Meet the models chip
def film(W,scale,name):
  cols=[];fd=f'{S}/F'
  now=Image.open(f'{S}/t2/full-{W}-now.png' if W==390 else f'{S}/d/full-{W}-now.png')
  # today's beat: find from measure? use the 'now' layout: crop around the film beat by the p1 measure offsets of the top band end
  tk=[('now',None,'Today: THE WHOLE GAME 1:20, a full board beat (264px at 390)'),('m','m','M · the monitor: a display module on the board, LED 1:20, gold key'),('c','c','C · the cartridge: "the whole game" as a game cartridge, plug it in'),('p','p','P · the plug: a cable and port, LED 1:20, plug in to watch'),('l','l','L · the silkscreen line: one etched line and the key, the quietest')]
  for k,ft,desc in tk:
    if k=='now':
      m=M390['p1'] if W==390 else M1280['p1'];top=[b for b in m['bands'] if b['k']=='top'][0]['b'];im=now;y0=top-380;y1=top+(560 if W==390 else 700)
    else:
      f=f'{S}/t2/full-{W}-p1-c.png' if (ft=='c' and W==390) else (f'{S}/d/full-{W}-p1-c.png' if ft=='c' else f'{fd}/full-{W}-p1-{ft}.png')
      mj=(M390 if W==390 else M1280)['p1'] if ft=='c' else json.load(open(f'{fd}/measure-{W}-{ft}.json'))['p1']
      im=Image.open(f);b=[x for x in mj['bands'] if x['k']=='top'][0]['b'];mm=[x for x in mj['bands'] if x['k']=='models'][0]['t'];y0=b-380;y1=mm+(220 if W==390 else 260)
    c=im.crop((0,max(0,y0),im.width,min(im.height,y1)));c=c.resize((int(c.width*scale),int(c.height*scale)),Image.LANCZOS)
    cols.append(head(c,k.upper() if k!='now' else 'Today',desc,c.width))
  o=row(cols);o=title_bar(o,f'theme7 · "the whole game" as its own small section, at {W}px','Each shown in place: the end of How a round works, the small film section, the gap, the start of Meet the models (palette P1). A tap opens the film whole, 16:9, with sound.')
  o.save(EZ+name);print(name,o.size)
film(390,1.0,'x2p-h25-theme7-film-390.png')
film(1280,.42,'x2p-h25-theme7-film-1280.png')
