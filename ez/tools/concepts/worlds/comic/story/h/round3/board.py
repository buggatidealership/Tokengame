# /usr/bin/python3 board.py : composes the round3 boards from out/*.png into ez/x2p-h28-round3-*.png
from PIL import Image,ImageDraw,ImageFont
import os
O='out/';EZ='../../../../../../../'
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',22);S=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',15)
TT=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',28)
def W(im,w):return im.resize((w,round(im.size[1]*w/im.size[0])),Image.LANCZOS)
def col(title,sub,ims,w,gap=12):
  ims=[W(i,w) for i in ims];h=78+sum(i.size[1] for i in ims)+gap*(len(ims)-1)
  c=Image.new('RGB',(w,h),'#f4efe2');d=ImageDraw.Draw(c);d.text((4,6),title,font=F,fill='#111')
  y=38
  for line in sub.split('\n'):d.text((4,y),line,font=S,fill='#444');y+=18
  y=78
  for i in ims:c.paste(i,(0,y));y+=i.size[1]+gap
  return c
def row(cols,out,pad=24,title=None):
  th=50 if title else 0;h=max(c.size[1] for c in cols)+th;w=sum(c.size[0] for c in cols)+pad*(len(cols)+1)
  b=Image.new('RGB',(w,h+pad*2),'#f4efe2');d=ImageDraw.Draw(b)
  if title:d.text((pad,pad),title,font=TT,fill='#111')
  x=pad
  for c in cols:b.paste(c,(x,pad+th));x+=c.size[0]+pad
  b.save(EZ+out,optimize=True);print(out,b.size,round(os.path.getsize(EZ+out)/1e6,2),'MB')
o=lambda f:Image.open(O+f).convert('RGB')
row([col('Now (live)','2x2 frames, line under each;\nthe ledger shows R38 to R41',[o('now-390.png')],440),
     col('B · caption on the panel','one panel under the other; the sentence\non a gold caption box biting each panel',[o('B-390.png')],440),
     col('C · text first, small picture','the sentence big, the example in its words,\nthe panel beside it as proof',[o('C-390.png')],440)],
    'x2p-h28-round3-390.png',title='round3 · How a round works, R40 Tesla only, today\'s order · 390px, the whole top')
row([col('B · desktop: one 560px column','captions overhang the margin, alternating sides',[o('B-1280.png')],640),
     col('C · desktop: rows, text left','sentence 4.4vw, picture 36% on the right',[o('C-1280.png')],640),
     col('B · staircase (switch html.r3-stair)','tried: halves the height, but the short ledger\nleaves a hole beside the tall board',[o('Bstair-1280.png')],640)],
    'x2p-h28-round3-1280.png',title='round3 · 1280px (whole top)')
P=lambda t,s,f,w=585:col(t,s,[o(f)],w)
a=row([P('1 CALL','GPT long, Kimi long, Claude short, Grok short\n(from the round\'s calls; no % sizes)','p-call.png'),
       P('2 CLOSE · bare (my pick)','the company, the move, "MARKET CLOSE":\nthe winner waits for the ledger','p-closebare.png'),
       P('2 CLOSE · with the winner','today\'s third line, for comparison','p-closewin.png'),
       col('3 LEDGER','only Round 40 · Tesla −3.08% · Winner Grok\n(the painting cropped to the one slot)',[o('p-ledger.png')],585)],
      'x2p-h28-round3-panels-a.png',title='round3 · the panels, 3x at 390 (take B\'s caption shown)')
row([P('4 BOARD · R (my pick)','board6 E3, the live painting, made full frontal\n(fit.py); #1 seated in its gold socket','p-boardr.png'),
     P('4 BOARD · F','board6 E2, painted head-on in H25 (unused);\n#1 seated','p-boardf.png'),
     P('Today (live)','the four frames as they are','p-now.png')],
    'x2p-h28-round3-panels-b.png',title='round3 · frame 4 full frontal, 3x at 390')
row([col('B · 320','',[o('B-320.png')],400),col('C · 320','',[o('C-320.png')],400),col('C · 390, close with the winner','(W=win)',[o('Cwin-390.png')],400)],
    'x2p-h28-round3-320.png',title='round3 · 320px, and C with the winner in panel 2')
