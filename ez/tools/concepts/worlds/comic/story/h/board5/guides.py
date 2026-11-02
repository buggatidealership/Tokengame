from PIL import Image,ImageDraw
import json
N=2048;G={}
def base():
  im=Image.new('RGB',(N,N),(0,0,0));d=ImageDraw.Draw(im);d.rectangle([60,60,N-60,N-60],fill=(20,70,35));return im,d
def sock(d,r,gold):d.rectangle([r[0]-26,r[1]-26,r[2]+26,r[3]+26],fill=(210,160,40) if gold else (90,90,95));d.rectangle(r,fill=(8,8,8))
def win(d,r):d.rectangle([r[0]-10,r[1]-10,r[2]+10,r[3]+10],fill=(200,150,40));d.rectangle(r,fill=(15,15,20))
# A: four 2.47:1 sockets stacked, windows right
im,d=base();S=[];W=[];w,h=1000,405;x0=230;ys=[180,640,1100,1560][:]
h=380;w=int(h*2.47);ys=[170,620,1070,1520]
for i,y in enumerate(ys):r=[x0,y,x0+w,y+h];sock(d,r,i==0);S.append(r);wr=[x0+w+110,y+70,1880,y+h-70];win(d,wr);W.append(wr)
im.save('guide-a.png');G['a']={'s':S,'w':W}
# C: big socket top, three small below
im,d=base();S=[];W=[];r=[180,170,1868,170+683];sock(d,r,True);S.append(r)
h=290;w=int(h*2.47);ys=[1000,1340,1680]
for y in ys:r=[180,y,180+w,y+h];sock(d,r,False);S.append(r);wr=[180+w+100,y+50,1868,y+h-50];win(d,wr);W.append(wr)
im.save('guide-c.png');G['c']={'s':S,'w':W}
# D: ledger strip left, traces, four sockets right
im,d=base();S=[];W=[];d.rectangle([120,170,300,1880],fill=(200,150,40));d.rectangle([140,190,280,1860],fill=(15,15,20))
h=360;w=int(h*2.47);ys=[200,640,1080,1520];x0=520
for i,y in enumerate(ys):
  r=[x0,y,x0+w,y+h];sock(d,r,i==0);S.append(r);wr=[x0+w+90,y+90,1900,y+h-90];win(d,wr);W.append(wr)
  for k in range(6):yy=y+120+k*24;d.line([(300,yy),(x0-26,yy)],fill=(230,180,60) if i==0 else (150,90,40),width=8)
im.save('guide-d.png');G['d']={'s':S,'w':W,'ledger':[140,190,280,1860]}
json.dump(G,open('guides.json','w'))
print(G)
