# r1028 round 2 boards: python3 r1028/_board2.py -> ez/x2p-r1028-{tower,headlines-2,wl}.png
import importlib.util,sys
from PIL import Image
spec=importlib.util.spec_from_file_location('b1',__file__.replace('_board2.py','_board.py'))
src=open(__file__.replace('_board2.py','_board.py')).read().split('board(\'x2p-r1028-cert.png\'')[0]
g={};exec(src,g);board=g['board'];S=g['S'];L5=g['L5']
board('x2p-r1028-tower.png','Timing tower, round 2 (mockup)','Flags at the tryouts’ size, W-L and Hit rate centred over their columns, the leader’s bar gold, the tryouts as row “5?”. 390 x 844.',
  [('Timing tower + terminal','with your fixes'),('Close-up','')],[('',[S+'std-TT.png',S+'crop-TT.png'])],.5)
board('x2p-r1028-headlines-2.png','Headlines, one sentence, two lines at most (mockup)','Top: today’s type. Bottom: the logo’s lettering, fitted to two lines (it gets small: 23 to 27px at 390, 18 to 21px at 320). 390 x 844.',
  [('1',''),('2',''),('3',''),('4',''),('5','')],
  [('Today’s type',[L5+f'c-D{i}-390.png' for i in range(1,6)]),('Logo lettering',[L5+f'c-E{i}-390.png' for i in range(1,6)])],.55)
im=Image.open(S+'wl-cmp.png');from PIL import ImageDraw,ImageFont
W,H=im.size;out=Image.new('RGB',(W+260,H+120),g['BG']);d=ImageDraw.Draw(out);d.text((26,22),'One header for the two money columns (mockup)',font=g['B'],fill='#f2b632')
d.text((26,68),'The flipped proof’s P&L tab, 390px phone.',font=g['R'],fill='#b8ad94');out.paste(im,(240,110))
for k,t in enumerate(['Today','Biggest W & L','Top W & L']):d.text((26,110+k*H/3+H/6-14),t,font=g['M'],fill='#f4ead0')
out.save(g['EZ']+'x2p-r1028-wl.png',optimize=True);print('wl',out.size)
