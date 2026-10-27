# r1028b boards: python3 r1028/_board3.py -> ez/x2p-r1028-{l2proof,tower-2,stamp}.png
from PIL import Image
src=open(__file__.replace('_board3.py','_board.py')).read().split("board('x2p-r1028-cert.png'")[0]
g={};exec(src,g);board=g['board'];S=g['S']
board('x2p-r1028-l2proof.png','Getting smarter or just lucky? in L2 Speed, every tab (mockup)','P&L centred over its figures, Top W / Top L. Every number from the page’s own accounts; all four cards share the tallest one’s height, as the live ticket does. 390px phone.',
  [('P&L',''),('Accuracy',''),('Target hits',''),('Sector','')],[('',[S+f'l2p-{k}.png' for k in ['pnl','acc','tgt','sec']])],.5)
board('x2p-r1028-tower-2.png','Timing tower, P&L centred (mockup)','The P&L label now sits over the middle of its figures. 390 x 844.',
  [('Timing tower + terminal',''),('Close-up','')],[('',[S+'std-TT.png',S+'crop-TT.png'])],.5)
board('x2p-r1028-stamp.png','Certificate: the stamp a little lower and turned further right (built)','On preview.earningszn.pages.dev and the X2+ artifact. R45 perfect (the seal), R43 split, R4 tie (the logo stamp). 390px phone.',
  [('R45',''),('R43',''),('R4','')],[('',[S+f'cert-today-{r}.png' for r in ['R45','R43','R4']])],.62)
