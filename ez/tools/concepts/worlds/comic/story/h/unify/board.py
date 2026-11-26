# /usr/bin/python3 board.py W out.png scale : Today | A | B, section by section, from out/<tag>-<W>.png/json
import json,sys
from PIL import Image,ImageDraw,ImageFont
W=int(sys.argv[1]);OUT=sys.argv[2];SC=float(sys.argv[3]) if len(sys.argv)>3 else 1.0
FB='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
f=lambda s,b=True:ImageFont.truetype(FB if b else FR,s)
tags=[('now','Today (live)'),('a','A: gold = titles'),('b','B: gold = #1 only')]
J={t:json.load(open(f'out/{t}-{W}.json')) for t,_ in tags};I={t:Image.open(f'out/{t}-{W}.png').convert('RGB') for t,_ in tags}
cw=int(W*SC);gap=24;secs=list(J['now']['sec'].keys())
rows=[];H=160
for s in secs:
    hh=max(J[t]['sec'][s][1]-J[t]['sec'][s][0] for t,_ in tags);rows.append((s,hh));H+=int(hh*SC)+70
Bd=Image.new('RGB',(len(tags)*(cw+gap)+gap,H),(246,242,232));d=ImageDraw.Draw(Bd)
d.text((gap,18),f'H31 unify pass on the live X2+ Overview · {W}px · 2 Nov 2026 · three faces (Bangers titles / Anton figures, fixed digits / Shantell text) · gold one meaning · green/red only with a sign',font=f(15 if W<500 else 24),fill=(20,18,23))
hs=lambda t:'  '.join(f'{k}:{v}' for k,v in J[t]['hs'])
for i,(t,lab) in enumerate(tags):
    x=gap+i*(cw+gap);d.text((x,62),lab,font=f(18 if W<500 else 22),fill=(20,18,23))
    d.text((x,90),f"page {J[t]['sh']}px · sideways scroll: {'none' if J[t]['sw']<=W else 'YES '+str(J[t]['sw'])} · errors: {len(J[t]['errs'])}",font=f(13 if W<500 else 16,False),fill=(70,64,56))
    hl=J[t]['hs'];d.text((x,110),'  '.join(f'{k} {v:g}' for k,v in hl[:3]),font=f(12 if W<500 else 15,False),fill=(70,64,56));d.text((x,128),'  '.join(f'{k} {v:g}' for k,v in hl[3:]),font=f(12 if W<500 else 15,False),fill=(70,64,56))
y=160
for s,hh in rows:
    d.rectangle((0,y,Bd.size[0],y+36),fill=(20,18,23));d.text((gap,y+6),s,font=f(20 if W<500 else 24),fill=(248,240,217));y+=44
    for i,(t,_) in enumerate(tags):
        a,b=J[t]['sec'][s];im=I[t].crop((0,a,W,min(b,I[t].size[1])))
        if SC!=1: im=im.resize((cw,int(im.size[1]*SC)),Image.LANCZOS)
        Bd.paste(im,(gap+i*(cw+gap),y))
    y+=int(hh*SC)+26
Bd=Bd.crop((0,0,Bd.size[0],y));Bd.save(OUT,optimize=True);print(OUT,Bd.size)
