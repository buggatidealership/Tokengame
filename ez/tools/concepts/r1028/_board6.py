# r1028e boards: python3 r1028/_board6.py -> ez/x2p-r1028-{l2proof-4,headlines-5}.png
src=open(__file__.replace('_board6.py','_board.py')).read().split("board('x2p-r1028-cert.png'")[0]
g={};exec(src,g);board=g['board'];S=g['S'];L5=g['L5']
board('x2p-r1028-l2proof-4.png','Getting smarter or just lucky? in L2 Speed, round 4 (mockup)','The leader’s line in shiny gold; Top W and Top L nearer the middle, P&L given room; the target in red and white; and a crypto take on Target hits: TP1/TP2/TP3/SL as a signal channel posts them. 390px.',
  [('P&L',''),('Accuracy',''),('Target hits','red and white target'),('Target hits','the crypto take: TP / SL')],[('',[S+f'l2p-{k}.png' for k in ['pnl','acc','tgt','tgt-tp']])],.5)
board('x2p-r1028-headlines-5.png','The headline at two lines, with the logo’s edge (mockup)','Kanit black italic fitted to two lines. The highlighted words keep green and gold and get the logo’s edge: a sliver of a second colour behind them. M1 green with a red edge, gold with a green edge; M2 green with a cream edge; M3 the shorter line. 390 x 844.',
  [('M1','full sentence: 20px on a phone'),('M2','full sentence, cream edge'),('M3','“…to run our buybacks.”: 31px')],
  [('',[L5+f'c-{k}-390.png' for k in ['M1','M2','M3']]),('Close-up (M1, M3)',[S+'m1-close.png',S+'m3-close.png'])],.75)
