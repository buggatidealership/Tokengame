import json,sys,os
from PIL import Image
def stitch(base,out=None,scale=1.0):
    j=json.load(open(base+'.json'));W=j['W'];y0,y1=j['y0'],j['y1']
    first=Image.open(j['parts'][0]['f']);d=first.width/W
    canvas=Image.new('RGB',(first.width,int((y1-y0)*d)),'black')
    for pt in j['parts']:
        im=Image.open(pt['f']);off=pt['want']-pt['sy']  # page y of want relative to viewport
        top=int(off*d);crop=im.crop((0,top,im.width,im.height))
        canvas.paste(crop,(0,int((pt['want']-y0)*d)))
        os.remove(pt['f'])
    if scale!=1: canvas=canvas.resize((int(canvas.width*scale),int(canvas.height*scale)),Image.LANCZOS)
    canvas.save(out or base+'.png');return canvas
if __name__=='__main__': stitch(sys.argv[1],sys.argv[2] if len(sys.argv)>2 else None)
