import re,json,os
from PIL import Image
src=open('/home/user/Tokengame/ez/ez-data.js').read()
co=re.search(r'var CO_LOGOS=(\{.*?\});\n',src).group(1)
CO=json.loads(re.sub(r'([{,])([a-z]+):',r'\1"\2":',co))
T={}
DK={os.path.basename(v['f']):v.get('dark',0) for v in CO.values()}
for fn in sorted(os.listdir('/home/user/Tokengame/ez/media/logos')):
    if not fn.endswith('.png'):continue
    v={'f':'logos/'+fn,'dark':DK.get(fn,0)}
    im=Image.open('/home/user/Tokengame/ez/media/'+v['f']).convert('RGBA');W,H=im.size
    if v.get('dark'):m=im.getchannel('A').point(lambda a:255 if a>40 else 0)
    else:
        px=im.load();m=Image.new('L',im.size,0);mp=m.load()
        for y in range(H):
            for x in range(W):
                r,g,b,a=px[x,y]
                if a>40 and min(r,g,b)<232: mp[x,y]=255
    bb=m.getbbox() or (0,0,W,H)
    T[os.path.basename(v['f'])]=[round(bb[0]/W,3),round(bb[1]/H,3),round(bb[2]/W,3),round(bb[3]/H,3),round(H/W,3)]
json.dump(T,open('box.json','w'),separators=(',',':'))
print(len(T),len(json.dumps(T,separators=(',',':'))))
for k in ['LITE-2.png','SIE.DE-2.png','AAPL-2.png','DHL.png','KO.png','HSBA.L-2.png','BB.png','2317.TW.png']:print(k,T[k])
