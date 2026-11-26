# r1029 boards: python3 r1029/_board.py -> ez/x2p-r1029-{live-attached,bright,bright-tabs}.png
src=open(__file__.replace('r1029/_board.py','r1028/_board.py')).read().split("board('x2p-r1028-cert.png'")[0]
g={};exec(src,g);board=g['board']
S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/r1029/';S8='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/r1028/'
board('x2p-r1029-live-attached.png','The live site’s tickets, attached (mockup)','The same tickets with no gap between them, joined like the bet’s Season 1 and Season 2 tickets. 390px phone, on earningszn.xyz as it is now.',
  [('Live today','a 10px gap between tickets'),('A1','joined: a perforation and a notch at each end (the bet’s join)'),('A2','joined: a perforation only')],
  [('',[S8+'live-now-standings.png',S+'A1-standings.png',S+'A2-standings.png']),('Close-up',[S8+'live-now-standings.png',S+'A1-crop.png',S+'A2-crop.png'])],.45)
board('x2p-r1029-bright.png','The X2+ leaderboard and proof on a bright ground (mockups)','B: brighter only. C: brighter with a light ticket touch. Each with a hard black shadow like the site’s other cards. 390px phone.',
  [('X2+ today','dark'),('B1','the logo’s cream'),('B2','white, green and red edges (the logo’s slashes)'),('C1','cream, scalloped sides, a stub, a foot band'),('C2','dark frame, each row a cream ticket strip')],
  [('Current standings',[S+v+'-standings.png' for v in ['now','B1','B2','C1','C2']]),('Getting smarter or just lucky?',[S+v+'-learn.png' for v in ['now','B1','B2','C1','C2']])],.4)
board('x2p-r1029-bright-tabs.png','The bright takes on the other proof tabs (mockups)','Target hits and Sector in each take. 390px phone.',
  [('B1',''),('B2',''),('C1',''),('C2','')],
  [('Target hits',[S+v+'-tgt.png' for v in ['B1','B2','C1','C2']]),('Sector',[S+v+'-sec.png' for v in ['B1','B2','C1','C2']])],.4)
board('x2p-r1029-depth-digital.png','The logo’s depth, and the digital ticket (mockups)','D: the module built like the EZ. logo, with its green edge on one side, its red on the other, its slashes and its gold square. E: a ticket an AI submits: a digital pass, a 2D code and the record’s SHA-256 hash. 390px phone.',
  [('D1','the logo’s cream, green depth'),('D2','the logo’s black, red and green depth'),('D3','each row a leaning slab, its depth green or red by P&L'),('E1','one digital pass, code and hash at the foot'),('E2','a ticket per AI, each with its own hash')],
  [('Current standings',[S+v+'-standings.png' for v in ['D1','D2','D3','E1','E2']]),('Getting smarter or just lucky?',[S+v+'-learn.png' for v in ['D1','D2','D3','E1','E2']])],.4)
