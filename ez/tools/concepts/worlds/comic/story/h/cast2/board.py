#!/usr/bin/python3
# board.py: builds ez/x2p-x3p-h5-cast2-a.png and -b.png from img/ and jobs.jsonl.
import json,os
from PIL import Image,ImageDraw,ImageFont
D=os.path.dirname(os.path.abspath(__file__));R=os.path.abspath(D+'/../../../../../../../../')
J={};[J.__setitem__(j['name'],j) for j in map(json.loads,open(D+'/jobs.jsonl')) if j.get('status')=='COMPLETED']
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',s)
FB=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s)
T=300;LH=78
def cell(path,lab,note,cost=None,model=None):
  im=Image.new('RGB',(T,T+LH),'#16131c');d=ImageDraw.Draw(im)
  im.paste(Image.open(path).convert('RGB').resize((T,T)),(0,0))
  d.text((6,T+4),lab,font=FB(14),fill='#f8f0d9')
  if model: d.text((6,T+22),f'{model} · ${cost:.3f}',font=F(11),fill='#fdbc2a')
  y=T+38
  for ln in wrap(note,44): d.text((6,y),ln,font=F(11),fill='#cfc6b2');y+=13
  return im
def wrap(s,n):
  out,cur=[],''
  for w in s.split():
    if len(cur)+len(w)+1>n: out.append(cur);cur=w
    else: cur=(cur+' '+w).strip()
  return out+[cur]
def img(name,lab,note):
  j=J[name];return cell(f'{D}/img/{name}.jpg',lab,note,j['cost'],j['model'])
def today(m): return cell(f'{D}/ref/founder-{m}-anim.jpg','TODAY · '+m.upper(),'the live poster (founder-%s-anim.jpg), the reference for every image in this row'%m)
def board(title,sub,rows,out):
  W=max(len(r) for r in rows)*T+20;H=90+sum(T+LH+10 for r in rows)
  b=Image.new('RGB',(W,H),'#0b0a14');d=ImageDraw.Draw(b)
  d.text((10,12),title,font=FB(26),fill='#fdbc2a');d.text((10,50),sub,font=F(14),fill='#cfc6b2')
  y=90
  for r in rows:
    x=10
    for c in r: b.paste(c,(x,y));x+=T
    y+=T+LH+10
  b.save(out);print(out,b.size)
NA=json.load(open(D+'/notes.json'))
beats=['predict','wait','win','lose','ticket','behind','setting']
lab={'predict':'Predicting','wait':'Waiting for the bell','win':'Won the round','lose':'Hit by the FAIL','ticket':'Golden ticket','behind':'Falling behind','setting':'In a section setting'}
rows=[[today(m)]+[img(f'a-{m}-{b}',lab[b],NA[f'a-{m}-{b}']) for b in beats] for m in ['gpt','claude','grok','kimi']]
rows.append([img('a-grok-ticket-2k','Best of (a), 2K high',NA['a-grok-ticket-2k']),cell(D+'/img/a-grok-ticket-loop.jpg','5 s loop (kling-25-turbo)',NA['a-grok-ticket-loop'],0.35,'kling-25-turbo')])
board('H5 cast2 · reading (a): the same characters in new moments','gpt-image-2, 1K medium, founder poster as reference; 3D first with comic ink (today\'s finish). No text in any image. Loop: img/a-grok-ticket-loop.mp4',rows,R+'/ez/x2p-x3p-h5-cast2-a.png')
fins=['3dink','pop','cel','cel2','noir','riso'];fl={'3dink':'3D + comic ink (control)','pop':'Pop art','cel':'Anime cel (try 1)','cel2':'Anime cel (try 2)','noir':'Noir ink','riso':'Risograph'}
rows=[[today(m)]+[img(f'b-{m}-{f}',fl[f],NA[f'b-{m}-{f}']) for f in fins] for m in ['gpt','claude','grok','kimi']]
rows.append([img('b-claude-pop-2k','Best of (b), 2K high',NA['b-claude-pop-2k']),cell(D+'/img/b-claude-pop-loop.jpg','5 s loop (kling-25-turbo)',NA['b-claude-pop-loop'],0.35,'kling-25-turbo')])
board('H5 cast2 · reading (b): the same characters in other finishes','Same pose as today, finish changed. gpt-image-2 1K medium, except anime cel try 2 (nano-banana-pro 1K). Loop: img/b-claude-pop-loop.mp4',rows,R+'/ez/x2p-x3p-h5-cast2-b.png')
