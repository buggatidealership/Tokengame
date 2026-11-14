#!/usr/bin/python3
# board.py: each round's reveal frame, the live T2 tile (setup, 1 s) and the new T3 tile (outcome). /usr/bin/python3 board.py <out.png> [rounds...]
import sys,os,json,subprocess
from PIL import Image,ImageDraw,ImageFont
E='/home/user/Tokengame/ez';D=os.path.dirname(os.path.abspath(__file__))
R=json.loads(subprocess.run(['node','-e','''const vm=require("vm");const c={};c.window=c;c.document={};vm.createContext(c);
vm.runInContext(require("fs").readFileSync("%s/ez-data.js","utf8")+";this.R=ROUNDS;this.F=FILMS;",c);console.log(JSON.stringify(c.R.filter(r=>c.F[r.n]).map(r=>({n:r.n,co:r.co,w:r.win||"NOBODY"}))))'''%E],capture_output=True,text=True).stdout)
T=json.load(open(D+'/times.json'));only=set(int(x) for x in sys.argv[2:])
R=[r for r in R if not only or r['n'] in only]
fb=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',14);fs=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',12)
TW,TH=150,200;CW=TW*3+24;CH=TH+36;COLS=4
rows=(len(R)+COLS-1)//COLS;W=COLS*CW+20;H=rows*CH+64
B=Image.new('RGB',(W,H),'#1b181c');d=ImageDraw.Draw(B)
d.text((14,12),'Round H4 thumbs2. Per round: the film\'s reveal frame | live T2 tile (setup, 1 s) | new T3 tile (outcome: winner gold and crowned, all writing blank). Sheet winner in gold.',font=fs,fill='#f8f0d9')
d.text((14,30),'gpt-image-2 1K low 3:4, reveal frame + Golden Age style ref. Rounds without a film keep their T2 tile.',font=fs,fill='#b5ad9c')
def fit(im,w,h):
  im=im.convert('RGB');s=max(w/im.width,h/im.height);im=im.resize((int(im.width*s)+1,int(im.height*s)+1));x=(im.width-w)//2;y=(im.height-h)//2;return im.crop((x,y,x+w,y+h))
for i,r in enumerate(R):
  x=10+(i%COLS)*CW;y=54+(i//COLS)*CH
  d.text((x,y),f"R{r['n']} {r['co'][:16]}",font=fb,fill='#f8f0d9');d.text((x+TW*2,y),f"{r['w']} @{T[str(r['n'])]}s",font=fb,fill='#fdbc2a')
  for j,p in enumerate([f"{D}/ref/f{r['n']}.png",f"{E}/media/tile-r{r['n']}-t2.jpg",f"{E}/media/tile-r{r['n']}-t3.jpg"]):
    if os.path.exists(p):B.paste(fit(Image.open(p),TW,TH),(x+j*(TW+6),y+20))
B.save(sys.argv[1]);print(sys.argv[1],B.size)
