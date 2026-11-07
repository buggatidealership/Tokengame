# /usr/bin/python3 boardgap.py <shots dir> : ez/x2p-h25-theme7-gaps-390.png: the P1 page with every gap labelled, and 3x close-ups of each joint
import sys,json
from PIL import Image,ImageDraw
sys.path.insert(0,'.');from board import font,title_bar,row,F2,F3
S=sys.argv[1];EZ='/home/user/Tokengame/ez/'
m=json.load(open(f'{S}/t2/measure-390-c.json'))['p1'];im=Image.open(f'{S}/t2/full-390-p1-c.png').convert('RGB')
cu=json.load(open(f'{S}/cu/cu-p1.json'))
# page column with labels to its right
W=390+440;col=Image.new('RGB',(W,im.height),'#f4efe4');col.paste(im,(0,0));d=ImageDraw.Draw(col)
for b in m['bands']:
  d.rectangle([392,b['t']+2,400,b['b']-2],fill={'GREEN':'#2f6a3e','GROK':'#5d6165','CLAUDE':'#a4572a','GPT':'#3c7146','KIMI':'#3f5684','VAULT':'#0b0a10','BARE':'#24221e'}[b['c']])
  d.text((408,b['t']+8),f"{b['k']}: {b['c'].lower()}",font=F3,fill='#141012')
gi=0
for g in cu['G']:
  if g['beat']:continue
  info=m['gaps'][gi];gi+=1;y=int(g['t']+g['h']/2)
  d.line([(390,y),(430,y)],fill='#c0261d',width=3)
  d.text((436,y-20),f"gap {gi}: {info['a'].lower()} | {info['b'].lower()}",font=font(17),fill='#c0261d')
  d.text((436,y+2),f"dE {info['dE']}  ->  h = base + 0.45 dE = {info['h']} px",font=F3,fill='#141012')
col=col.resize((W*2//3,im.height*2//3),Image.LANCZOS)
# close-ups (3x, 390 x 180 css each), stacked
cus=[];i=0;gi=0
for k,g in enumerate(cu['G']):
  c=Image.open(f"{S}/cu/cu-p1-{k}{'b' if g['beat'] else ''}.png");c=c.resize((c.width*2//3,c.height*2//3),Image.LANCZOS)
  lab='seam inside Meet the models (10 px base)' if g['beat'] else (lambda q:f"gap {gi+1}: {q['a'].lower()} above, {q['b'].lower()} below, {q['h']} px")(m['gaps'][gi])
  if not g['beat']:gi+=1
  t=Image.new('RGB',(c.width,c.height+28),'#f4efe4');ImageDraw.Draw(t).text((4,4),lab,font=F3,fill='#141012');t.paste(c,(0,28));cus.append(t)
H=sum(c.height+10 for c in cus);cc=Image.new('RGB',(cus[0].width,H),'#f4efe4');y=0
for c in cus:cc.paste(c,(0,y));y+=c.height+10
o=row([col,cc]);o=title_bar(o,'theme7 · the gap and bleed rule, on the whole page (P1, 390px)',"A gap is the connector where one board plugs into the next: top half printed in the mask above, bottom half in the mask below; height = base + 0.45 x colour distance (dE76), so a bigger change of world gets a bigger connector. Every section bleeds edge to edge up to its half of the connector; with the page's own ground painted magenta, 0 magenta pixels show. Right: every joint at 3x.")
o.save(EZ+'x2p-h25-theme7-gaps-390.png');print(o.size)
