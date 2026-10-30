# /usr/bin/python3 board.py <shots dir> : the boards for helper j
#   one board per idea (phone, 390): "Today" first, then the take as frames from its recording (or a still),
#   then the index board (every idea, one frame, its name and what it does for the reader) and the desktop board.
import sys,os,subprocess,json
from PIL import Image,ImageDraw,ImageFont
D=sys.argv[1];EZ='/home/user/Tokengame/ez'
BF='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';RF='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
F1=ImageFont.truetype(BF,40);F2=ImageFont.truetype(RF,26);F3=ImageFont.truetype(BF,26);F4=ImageFont.truetype(RF,22)
BG='#1b1820';GOLD='#fdbc2a';CR='#f8f0d9'
IDEAS=json.load(open(os.path.join(os.path.dirname(__file__),'ideas.json')))
def frame(mp4,n,out):
  subprocess.check_call(['ffmpeg','-v','error','-y','-i',mp4,'-vf',f"select=eq(n\\,{n})",'-frames:v','1',out]);return Image.open(out).convert('RGB')
def wrap(d,txt,font,w):
  ws=txt.split();ls=[];cur=''
  for x in ws:
    t=(cur+' '+x).strip()
    if d.textlength(t,font=font)>w and cur:ls.append(cur);cur=x
    else:cur=t
  if cur:ls.append(cur)
  return ls
def fit(im,h):return im.resize((round(im.width*h/im.height),h),Image.LANCZOS)
def board(I):
  k=I['k'];today=Image.open(f"{D}/390-now-{k}.png").convert('RGB') if os.path.exists(f"{D}/390-now-{k}.png") else None
  fr=[]
  for i,(n,lab) in enumerate(I['frames']):
    if isinstance(n,str):fr.append((lab,Image.open(f"{D}/{n}").convert('RGB')))
    else:fr.append((lab,frame(f"{D}/{I['mp4']}",n,f"{D}/_f{k}{i}.png")))
  H=I.get('h',1300)
  cols=([('Today',today)] if today else [])+fr
  cols=[(l,fit(im,H) if im.height>H*1.02 or im.height<H*.98 else im) for l,im in cols]
  W=sum(im.width for _,im in cols)+40*(len(cols)+1)
  tmp=ImageDraw.Draw(Image.new('RGB',(10,10)))
  head=wrap(tmp,I['line'],F2,W-80)
  top=40+52+len(head)*34+30
  B=Image.new('RGB',(W,top+50+H+40),BG);d=ImageDraw.Draw(B)
  d.text((40,36),f"{I['code']} · {I['name']}",fill=GOLD,font=F1)
  for j,l in enumerate(head):d.text((40,40+52+j*34),l,fill=CR,font=F2)
  x=40
  for l,im in cols:
    d.text((x,top),l,fill=GOLD if l!='Today' else CR,font=F3);B.paste(im,(x,top+44));x+=im.width+40
  out=f"{EZ}/x2p-x3p-story-j-{I['slug']}.png";B.save(out,optimize=True);print(out,B.size)
  return fr[I.get('hero',len(fr)-1)][1]
heroes=[]
for I in IDEAS:heroes.append((I,board(I)))
# index: every idea, one frame each, in rank order
heroes.sort(key=lambda x:x[0]['rank'])
cw,ch=520,700;cols=4;rows=(len(heroes)+cols-1)//cols
B=Image.new('RGB',(cols*(cw+40)+40,120+rows*(ch+250)),BG);d=ImageDraw.Draw(B)
d.text((40,36),"Helper j · \"I didn't know that existed\": eight ways to make the comic alive (ranked)",fill=GOLD,font=F1)
for i,(I,im) in enumerate(heroes):
  x=40+(i%cols)*(cw+40);y=120+(i//cols)*(ch+250)
  t=im.copy();t.thumbnail((cw,ch));B.paste(t,(x+(cw-t.width)//2,y))
  d.text((x,y+ch+12),f"#{I['rank']} {I['code']} · {I['name']}",fill=GOLD,font=F3)
  for j,l in enumerate(wrap(d,I['line'],F4,cw)[:6]):d.text((x,y+ch+50+j*28),l,fill=CR,font=F4)
out=f"{EZ}/x2p-x3p-story-j-index.png";B.save(out,optimize=True);print(out,B.size)
# desktop board: the 1280 stills
ds=[(I,f"{D}/1280-{I['k']}.png") for I in sorted(IDEAS,key=lambda x:x['rank']) if os.path.exists(f"{D}/1280-{I['k']}.png")]
if ds:
  ims=[(I,Image.open(p).convert('RGB')) for I,p in ds];ims=[(I,im if im.height<=1500 else im.crop((0,0,im.width,1500))) for I,im in ims]
  W=max(im.width for _,im in ims)+80;B=Image.new('RGB',(W,sum(im.height+100 for _,im in ims)+40),BG);d=ImageDraw.Draw(B);y=30
  for I,im in ims:d.text((40,y),f"#{I['rank']} {I['code']} · {I['name']} (1280)",fill=GOLD,font=F1);B.paste(im,(40,y+60));y+=im.height+100
  B.thumbnail((3200,30000));out=f"{EZ}/x2p-x3p-story-j-desktop.png";B.save(out,optimize=True);print(out,B.size)
