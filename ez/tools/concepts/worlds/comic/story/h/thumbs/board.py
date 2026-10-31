#!/usr/bin/python3
# board.py: contact sheet, each T2 thumbnail beside its film's poster. /usr/bin/python3 board.py <out.png> [rounds...]
import sys,os,json,subprocess
from PIL import Image,ImageDraw,ImageFont
E='/home/user/Tokengame/ez';D=os.path.dirname(os.path.abspath(__file__))
R=json.loads(subprocess.run(['node','-e','''const vm=require("vm");const c={};c.window=c;c.document={};vm.createContext(c);
vm.runInContext(require("fs").readFileSync("%s/ez-data.js","utf8")+";this.R=ROUNDS;",c);console.log(JSON.stringify(c.R.map(r=>({n:r.n,co:r.co,p:r.poster||null,f:r.film||null}))))'''%E],capture_output=True,text=True).stdout)
only=set(int(x) for x in sys.argv[2:])
R=[r for r in R if not only or r['n'] in only]
fb=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',15);fs=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',12)
TW,TH=180,240;CW=TW*2+18;CH=TH+34;COLS=6
rows=(len(R)+COLS-1)//COLS;W=COLS*CW+20;H=rows*CH+70
B=Image.new('RGB',(W,H),'#1b181c');d=ImageDraw.Draw(B)
d.text((14,14),'Every round so far: T2 Golden Age thumbnails (right) beside each film poster (left). gpt-image-2 1K low, film frame at 1 s + style ref. No-film rounds painted from the company\'s world.',font=fs,fill='#f8f0d9')
def fit(im,w,h):
  im=im.convert('RGB');s=max(w/im.width,h/im.height);im=im.resize((int(im.width*s)+1,int(im.height*s)+1));x=(im.width-w)//2;y=(im.height-h)//2;return im.crop((x,y,x+w,y+h))
for i,r in enumerate(R):
  x=10+(i%COLS)*CW;y=44+(i//COLS)*CH
  d.text((x,y),f"R{r['n']} {r['co']}",font=fb,fill='#fdbc2a')
  pp=f"{E}/media/{r['p']}.jpg" if r['p'] else None
  if pp and os.path.exists(pp):B.paste(fit(Image.open(pp),TW,TH),(x,y+22))
  else:
    d.rectangle((x,y+22,x+TW,y+22+TH),fill='#2b2733');d.text((x+40,y+22+TH//2),'no film',font=fb,fill='#888')
  t=f"{D}/img/t2-r{r['n']}.jpg"
  if os.path.exists(t):B.paste(fit(Image.open(t),TW,TH),(x+TW+6,y+22))
B.save(sys.argv[1]);print(sys.argv[1],B.size)
