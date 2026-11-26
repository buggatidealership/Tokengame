# /usr/bin/python3 guides.py : per-model guides on each master (the mark darkened into the plate, the flag, the name, the personality line), for nano-banana-pro to paint in
from PIL import Image,ImageDraw,ImageFont,ImageFilter;import numpy as np,json
C7='../chips7/ref/';FONT='../world/fonts/BarlowCondensed-600.ttf'
GEO={'A2':dict(src='img/m8A2-a.jpg',plate=(240,534,678,992),flag=(262,1148,676,1452),name=(908,524,2179,693),foot=(885,1426,2645,1550)),
     'B2':dict(src='img/m8B2-a.jpg',plate=(200,530,676,997),flag=(218,1148,662,1423),name=(893,536,2071,712),foot=(895,1360,2628,1504)),
     'A':dict(src='img/m8A-d.jpg',plate=(200,566,684,990),flag=(186,1144,699,1478),name=(941,593,2114,738),foot=(930,1318,2620,1448)),
     'B':dict(src='img/m8B-a.jpg',plate=(208,532,676,988),flag=(240,1124,664,1400),name=(887,560,2118,729),foot=(890,1334,2560,1478))}
MOD={'grok':('GROK','4.7','us',"Shorts almost everything. Somehow it's working."),
     'claude':('CLAUDE','FABLE 5.1','us',"Never met a small move it liked."),
     'gpt':('GPT','6 ASTRA','us',"Bullish on everything. Including itself."),
     'kimi':('KIMI','K3','cn',"Buys every dip. Some dips keep dipping.")}
json.dump({'GEO':GEO,'MOD':MOD},open('ref/guides.json','w'),indent=1)
for k,g in GEO.items():
  M=Image.open(g['src']).convert('RGB')
  for m,(n,v,f,s) in MOD.items():
    im=M.copy();d=ImageDraw.Draw(im)
    # mark: darkened silhouette in the plate's own gold
    x0,y0,x1,y1=g['plate'];w,h=x1-x0,y1-y0;sz=int(min(w,h)*.66);al=Image.eval(Image.open(C7+f'logo-{m}.png').convert('L'),lambda c:255-c).resize((sz,sz),Image.LANCZOS)
    reg=im.crop((x0,y0,x1,y1));dark=Image.eval(reg,lambda c:int(c*.42));msk=Image.new('L',reg.size,0);msk.paste(al,((w-sz)//2,(h-sz)//2))
    im.paste(Image.composite(dark,reg,msk),(x0,y0))
    # flag
    x0,y0,x1,y1=g['flag'];F=Image.open(C7+f'flag-{f}.png').convert('RGB').resize((x1-x0,y1-y0),Image.LANCZOS);im.paste(F,(x0,y0))
    # name + version
    x0,y0,x1,y1=g['name'];H=y1-y0;f1=ImageFont.truetype(FONT,int(H*.78));f2=ImageFont.truetype(FONT,int(H*.42))
    bx=x0+int(H*.3);by=y0+H*.5;d.text((bx,by),n,font=f1,fill=(246,238,214),anchor='lm');tw=d.textlength(n,font=f1)
    b1=d.textbbox((bx,by),n,font=f1,anchor='lm');d.text((bx+tw+H*.22,b1[3]),v,font=f2,fill=(230,222,200),anchor='ls')
    # personality line, centred in the foot band
    x0,y0,x1,y1=g['foot'];H=y1-y0;fs=int(H*.62);f3=ImageFont.truetype(FONT,fs)
    while d.textlength(s,font=f3)>(x1-x0)*.94:fs-=2;f3=ImageFont.truetype(FONT,fs)
    d.text(((x0+x1)/2,(y0+y1)/2),s,font=f3,fill=(236,228,206),anchor='mm')
    im.save(f'ref/guide-{k}-{m}.jpg',quality=93)
print('ok')
