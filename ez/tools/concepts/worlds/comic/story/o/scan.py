# /usr/bin/python3 scan.py <out.png> <n,...>: a review sheet to hand-pick each film's "one living thing".
# Per film: its poster (what the tile shows) with what moves after the board settles (red) and its brightest lights (cyan),
# on a 10% grid, so a region can be chosen that holds no words or numbers.
import sys,json,subprocess,numpy as np
from PIL import Image,ImageDraw,ImageFont
EZ='/home/user/Tokengame/ez'
F=json.loads(subprocess.check_output(['node','-e',"global.window=global;eval(require('fs').readFileSync('%s/ez-data.js','utf8'));console.log(JSON.stringify(FILMS))"%EZ]))
OUT=sys.argv[1];ns=sys.argv[2].split(',');S=160;T=420
def fr(src,size,fps=6):
  raw=subprocess.check_output(['ffmpeg','-v','error','-i',src,'-vf',f'fps={fps},crop=in_h:in_h,scale={size}:{size}:flags=area,format=gray','-f','rawvideo','-'])
  return np.frombuffer(raw,np.uint8).reshape(-1,size,size).astype(np.float32)
tiles=[]
for n in ns:
  f=F[n];g=fr(f'{EZ}/media/{f["f"]}.mp4',S);P=np.asarray(Image.open(f'{EZ}/media/{f["p"]}.jpg').convert('L').resize((S,S)),np.float32)
  d=np.abs(g-P).mean(axis=(1,2));st=int(np.argmax(d<=d.min()+6));st=max(st,int(len(g)*.45))
  sd=g[st:].std(axis=0)
  po=Image.open(f'{EZ}/media/{f["p"]}.jpg').convert('RGB').resize((T,T))
  a=np.asarray(po,np.float32)
  mv=np.asarray(Image.fromarray(np.clip(sd*8,0,255).astype(np.uint8)).resize((T,T)),np.float32)/255
  hsv=np.asarray(po.convert('HSV'),np.float32)/255;br=(hsv[...,2]>.82)&(hsv[...,1]>.35)
  o=a*.55;o[...,0]=np.maximum(o[...,0],mv*255);o[br]=o[br]*.4+np.array([0,230,255])*.6
  im=Image.fromarray(o.clip(0,255).astype(np.uint8));dr=ImageDraw.Draw(im)
  for k in range(1,10):
    x=k*T//10;dr.line([(x,0),(x,T)],fill=(255,255,255),width=1);dr.line([(0,x),(T,x)],fill=(255,255,255),width=1);dr.text((x+2,2),str(k),fill=(255,255,0));dr.text((2,x+2),str(k),fill=(255,255,0))
  can=Image.new('RGB',(T*2+6,T+22),(20,20,24));can.paste(po,(0,22));can.paste(im,(T+6,22));ImageDraw.Draw(can).text((4,4),f'R{n} settle {st/6:.1f}s of {len(g)/6:.1f}s',fill=(255,255,255))
  tiles.append(can)
cols=2;W=tiles[0].width;H=tiles[0].height;rows=(len(tiles)+cols-1)//cols
sheet=Image.new('RGB',(cols*W+10,rows*H+10),(0,0,0))
for i,t in enumerate(tiles):sheet.paste(t,((i%cols)*W,(i//cols)*H))
sheet.save(OUT);print(OUT,sheet.size)
