# r1028c boards: python3 r1028/_board4.py -> ez/x2p-r1028-{l2proof-2,tower-3,headlines-3}.png
src=open(__file__.replace('_board4.py','_board.py')).read().split("board('x2p-r1028-cert.png'")[0]
g={};exec(src,g);board=g['board'];S=g['S'];L5=g['L5']
board('x2p-r1028-l2proof-2.png','Getting smarter or just lucky? in L2 Speed, round 2 (mockup)','P&L % at the end of each line; the leader in shiny gold (the bullseye counts stay flat gold); names centred over the targets; Sector without crowns, the others in each row dimmed. 390px.',
  [('P&L',''),('Accuracy',''),('Target hits',''),('Sector','')],[('',[S+f'l2p-{k}.png' for k in ['pnl','acc','tgt','sec']])],.5)
board('x2p-r1028-tower-3.png','Timing tower, round 3 (mockup)','Flags smaller (12px on the board, as in the tryouts row). W-L kept with a hyphen: the common record notation. 390 x 844.',
  [('Timing tower + terminal',''),('Close-up','')],[('',[S+'std-TT.png',S+'crop-TT2.png'])],.5)
board('x2p-r1028-headlines-3.png','Headlines with the buyback, no pool (mockup)','One sentence, two lines at most, today’s type. 390 x 844.',
  [('A','…for the right to run our buybacks.'),('B','…the top one calls our buyback bet.'),('C','…the winner calls our buybacks.'),('D','…to win control of our buybacks.'),('E','…and the best one runs our buybacks.')],
  [('',[L5+f'c-G{i}-390.png' for i in range(1,6)])],.55)
