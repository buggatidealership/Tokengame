# r1028d boards: python3 r1028/_board5.py -> ez/x2p-r1028-{l2proof-3,tower-4,headlines-4}.png
src=open(__file__.replace('_board5.py','_board.py')).read().split("board('x2p-r1028-cert.png'")[0]
g={};exec(src,g);board=g['board'];S=g['S'];L5=g['L5']
board('x2p-r1028-l2proof-3.png','Getting smarter or just lucky? in L2 Speed, round 3 (mockup)','The leader’s “1” and its P&L in the same shiny gold as its name, on every tab. 390px.',
  [('P&L',''),('Accuracy',''),('Target hits',''),('Sector','')],[('',[S+f'l2p-{k}.png' for k in ['pnl','acc','tgt','sec']])],.5)
board('x2p-r1028-tower-4.png','Timing tower, round 4 (mockup)','The flag beside the model line (Grok 4.7, Fable 5.1, 6 Astra, Kimi K3); GPT-6 Astra shortened to 6 Astra. 390 x 844.',
  [('Timing tower + terminal',''),('Close-up','')],[('',[S+'std-TT.png',S+'crop-TT3.png'])],.5)
board('x2p-r1028-headlines-4.png','The headline in the logo’s lettering (mockup)','“4 AIs trade earnings for the right to run our buybacks.” in Kanit black italic, wrapping where it wraps (four lines on a phone), the logo’s gold square as the full stop. 390 x 844.',
  [('K1','gold buybacks'),('K2','green “trade earnings”'),('K3','green slash + green E'),('K4','green “the right”, red slash')],
  [('',[L5+f'c-K{i}-390.png' for i in range(1,5)])],.55)
