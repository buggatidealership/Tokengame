# /usr/bin/python3 export.py : writes img/board-r.jpg (board6 E3 made full frontal by fit.json) and img/board-f.jpg (board6 E2, painted head-on),
# and geo.json: for each, the four sockets' openings (#1 seated in its own gold socket) and the four rank windows, in % of the image.
import json,numpy as np,subprocess
from PIL import Image
J=json.load(open('fit.json'));P=J['P'];Hc=J['Hc'];wx0,wx1,wy0,wh=J['w']
G={}
# R: frontal units; crop
X0,Y0,X1,Y1=-1200,-1060,1320,2240;OW=1400
subprocess.run(['/usr/bin/python3','warp.py',str(X0),str(Y0),str(X1),str(Y1),str(OW),'img/board-r.jpg'],check=True)
pc=lambda x,y,w,h:[round((x-X0)/(X1-X0)*100,3),round((y-Y0)/(Y1-Y0)*100,3),round(w/(X1-X0)*100,3),round(h/(Y1-Y0)*100,3)]
G['r']={'ar':[X1-X0,Y1-Y0],'img':'board-r.jpg','chip':[pc(0,(i-1)*P,1000,Hc) for i in range(4)],'win':[pc(wx0,(i-1)*P+wy0,wx1-wx0,wh) for i in range(4)]}
# F: E2 master crop [200,110,2270,2270]
S=Image.open('../board6/img/e2c.jpg').convert('RGB');cx,cy,cw=200,110,2270
S.crop((cx,cy,cx+cw,cy+cw)).resize((OW,OW),Image.LANCZOS).save('img/board-f.jpg',quality=88)
cq=[[[1341,961],[2241,961],[2241,1325],[1341,1325]],[[1344,1499],[2244,1499],[2244,1863],[1344,1863]],[[1343,2043],[2243,2043],[2243,2407],[1343,2407]]]
wq=[[[368,400],[684,404],[680,724],[364,720]],[[364,972],[680,972],[676,1296],[364,1292]],[[368,1540],[684,1544],[680,1864],[364,1864]],[[368,2084],[684,2088],[676,2412],[364,2408]]]
pit=(cq[2][0][1]-cq[0][0][1])/2
c0=[[x,y-pit] for x,y in cq[0]];cq=[c0]+cq
bb=lambda q:[min(p[0] for p in q),min(p[1] for p in q),max(p[0] for p in q)-min(p[0] for p in q),max(p[1] for p in q)-min(p[1] for p in q)]
pf=lambda b:[round((b[0]-cx)/cw*100,3),round((b[1]-cy)/cw*100,3),round(b[2]/cw*100,3),round(b[3]/cw*100,3)]
G['f']={'ar':[1,1],'img':'board-f.jpg','chip':[pf(bb(q)) for q in cq],'win':[pf(bb(q)) for q in wq]}
json.dump(G,open('geo.json','w'),indent=1);print(json.dumps(G))
