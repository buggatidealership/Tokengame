# /usr/bin/python3 v2pb.py : v2p.jpg -> v2p-b.jpg, each module's lower windows re-sliced (P&L .3958-.5450, W-L .5590-.6745) from its own wide window
from PIL import Image
im=Image.open('img/v2p.jpg').convert('RGB');W,H=im.size
X=lambda f:round(f*W);Y=lambda f:round(f*H)
def nine(src,tw,th,c=16):
  sw,sh=src.size;o=Image.new('RGB',(tw,th));xs=[0,c,sw-c,sw];ys=[0,c,sh-c,sh];XD=[0,c,tw-c,tw];YD=[0,c,th-c,th]
  for i in range(3):
    for j in range(3):o.paste(src.crop((xs[i],ys[j],xs[i+1],ys[j+1])).resize((max(1,XD[i+1]-XD[i]),max(1,YD[j+1]-YD[j])),Image.LANCZOS),(XD[i],YD[j]))
  return o
for t in [.2754,.4131,.5508,.6899]:
  d=t-.2754;y0,y1=Y(.3398+d)-4,Y(.3662+d)+5
  wide=im.crop((X(.3958)-4,y0,X(.5885)+4,y1));gap=im.crop((X(.5885)+5,y0,X(.6094)-5,y1))
  a0,a1,b0,b1=X(.3958)-4,X(.5450)+4,X(.5590)-4,X(.6745)+4
  im.paste(nine(wide,a1-a0,y1-y0),(a0,y0));im.paste(gap.resize((b0-a1,y1-y0)),(a1,y0));im.paste(nine(wide,b1-b0,y1-y0),(b0,y0))
im.save('img/v2p-b.jpg',quality=90)
