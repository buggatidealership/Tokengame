# /usr/bin/python3 board.py <shots dir> <out dir>: round ST boards. The page of panels (C2) in each style, first phone screen (390x844 at 2x).
# x2p-x3p-styles-panels-1.png and -2.png (the twelve styles, six per board, 3 x 2) and x2p-x3p-styles-panels-mix.png (five combinations in a row).
import sys
from PIL import Image,ImageDraw,ImageFont
D,O=sys.argv[1],sys.argv[2]
F='/usr/share/fonts/truetype/dejavu/DejaVuSans'
B_=ImageFont.truetype(F+'-Bold.ttf',29);M_=ImageFont.truetype(F+'-Bold.ttf',21);R_=ImageFont.truetype(F+'.ttf',17)
SOLO=[('pop','1 · Pop art','Today\'s C2: Lichtenstein rays and dots, extruded Luckiest Guy lettering, riso grain, a holo panel.'),
 ('manga','2 · Manga ink','Black ink on newsprint, concentration lines on the company, screentone, brush sound effects; red is the one spot ink.'),
 ('neon','3 · Neon arcade','Night panels with a grid floor, lit magenta tubes for gutters, every word, coin and balloon a glowing tube.'),
 ('chrome','4 · Chrome (Y2K)','Glossy enamel plates in a polished chrome bezel, mirror lettering, steel-bearing coins, gel buttons.'),
 ('clay','5 · Clay / soft 3D','Plasticine panels pressed into a clay board, rounded bulging type, coins like pressed buttons.'),
 ('holo','6 · Holo trading card','Each panel a card: gold-foil border, rainbow holofoil with its line screen, name strips, a full-art golden ticket.'),
 ('sticker','7 · Sticker collage','Coloured vinyl sheets on a cork board, die-cut letter stickers, label-maker tape captions, masking tape.'),
 ('riso','8 · Risograph','Three drum inks off register on cream stock: ink fields, pinholed coverage, paper letters knocked out.'),
 ('deco','9 · Art deco','Lacquered green and jet, fans of gold rays, stepped gilt frames, Limelight capitals, gold medallions.'),
 ('western','10 · Western pulp','Handbills nailed to planks: foxed paper, wood type in black and red, a sheriff\'s star, a gold-rush note.'),
 ('blocks','11 · Toy blocks','Moulded plastic bricks with extruded sides on a baseplate, block type, round tiles, a gold brick.'),
 ('glass','12 · Glass','Frosted panes over glows in the models\' and the market\'s colours, clean white type, glass discs.')]
MIX=[('m1','M1 · Risograph + pop lettering','Riso leads; pop adds the extruded lettering, printed in the riso inks (yellow face, blue outline, pink extrusion).'),
 ('m2','M2 · Glass panels over pop rays','Glass leads (smoked frosted panes, clean type); pop adds the ground: its orange sunburst and halftone behind the glass.'),
 ('m3','M3 · Neon + chrome lettering','Neon leads; chrome adds the big words and numbers, the chrome mirroring the neon (cyan above, magenta below).'),
 ('m4','M4 · Art deco + stickers + holo','Deco leads; stickers add the voices (calls, pass/fail, sound effects slapped on); holo adds the prize (ticket, leader).'),
 ('m5','M5 · Manga ink + holo ticket','Manga leads in black ink and one red; holo adds one thing: the golden ticket and leader\'s coin are the only shine.')]
def wrap(d,t,f,w):
  out=[];line=''
  for word in t.split(' '):
    tt=(line+' '+word).strip()
    if d.textlength(tt,font=f)>w and line:out.append(line);line=word
    else:line=tt
  return out+[line]
def board(T,cols,scale,out,title,sub):
  ims=[Image.open(f'{D}/{t}-390.png').convert('RGB') for t,_,_ in T]
  ims=[i.resize((int(i.width*scale),int(i.height*scale)),Image.LANCZOS) for i in ims]
  P=28;cw=ims[0].width;ch=ims[0].height;rows=(len(ims)+cols-1)//cols;lab=116
  W=cols*cw+(cols+1)*P;H=112+rows*(ch+lab+P)
  B=Image.new('RGB',(W,H),'#1b1820');d=ImageDraw.Draw(B)
  d.text((P,24),title,fill='#fdbc2a',font=B_)
  for j,ln in enumerate(wrap(d,sub,R_,W-2*P)[:2]):d.text((P,68+j*21),ln,fill='#e8dcc0',font=R_)
  for k,((t,l,s),im) in enumerate(zip(T,ims)):
    x=P+(k%cols)*(cw+P);y=112+(k//cols)*(ch+lab+P)
    tl=wrap(d,l,M_,cw)[:2]
    for j,ln in enumerate(tl):d.text((x,y+j*25),ln,fill='#fdbc2a',font=M_)
    for j,ln in enumerate(wrap(d,s,R_,cw)[:4-len(tl)+1]):d.text((x,y+len(tl)*25+4+j*20),ln,fill='#e8dcc0',font=R_)
    B.paste(im,(x,y+lab))
  B.save(out);print(out,B.size)
SUB='The page of panels (C2) with only the style changed: same headline, the same four steps from round 80 (Exxon Mobil), Grok\'s golden ticket from __x2pPnl, the same film. Header and tabs are the live page.'
board(SOLO[:6],3,.44,O+'/x2p-x3p-styles-panels-1.png','Round ST · the page of panels, styles 1 to 6 · 390x844',SUB)
board(SOLO[6:],3,.44,O+'/x2p-x3p-styles-panels-2.png','Round ST · the page of panels, styles 7 to 12 · 390x844',SUB)
board(MIX,5,.44,O+'/x2p-x3p-styles-panels-mix.png','Round ST · five combinations: one style leads, one or two add one thing each · 390x844','Same content and layout as the individual takes; each combination names what the lead style keeps and what the others add.')
