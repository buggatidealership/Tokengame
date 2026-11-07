import json,sys
from PIL import Image,ImageDraw,ImageFont
tag,out=sys.argv[1],sys.argv[2];d=json.load(open(f'out/{tag}/m.json'));F=json.load(open(f'out/{tag}/final.json'));N=json.load(open('notes.json'))[tag]
W=d['W'];hh=d['hdr']['h']
FB='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
sc=1.0 if W<500 else 0.55
shw=int(W*sc);shh=int(d['H']*sc);AW=380;PW=shw+AW+24;PH=max(shh,700)+70
cols=3 if W<500 else 2;rows=(len(F)+cols-1)//cols
title=f"EZ Overview flow audit (H28) · live earningszn.xyz · {W}x{d['H']} · 2 Nov 2026 · {len(F)} screens, {d['step']}px apart · pink ring = saliency peak"
B=Image.new('RGB',(cols*PW+20,rows*PH+70),(246,242,232));dr=ImageDraw.Draw(B)
f=lambda s,b=False:ImageFont.truetype(FB if b else FR,s)
dr.text((20,18),title,font=f(24,True),fill=(20,18,23))
def wrap(t,font,w):
    out=[];line=''
    for wd in t.split(' '):
        tt=(line+' '+wd).strip()
        if dr.textlength(tt,font=font)>w and line: out.append(line);line=wd
        else: line=tt
    if line: out.append(line)
    return out
sal=json.load(open(f'out/{tag}/sal.json'))
for i,o in enumerate(F):
    x0=10+(i%cols)*PW;y0=60+(i//cols)*PH
    im=Image.open(f"out/{tag}/s{o['k']:02d}.png").convert('RGB').resize((shw,shh))
    di=ImageDraw.Draw(im);s=sal[str(o['k'])];cx,cy=s['x']*sc,s['y']*sc;r=int(30*max(sc,.8))
    for rr,c in ((r+3,(0,0,0)),(r,(255,40,200)),(r-3,(0,0,0))): di.ellipse((cx-rr,cy-rr,cx+rr,cy+rr),outline=c,width=3)
    di.text((cx+r+2,cy-10),'EYE',font=f(14,True),fill=(255,40,200),stroke_width=2,stroke_fill=(0,0,0))
    B.paste(im,(x0,y0+40));dr.rectangle((x0,y0+40,x0+shw,y0+40+shh),outline=(20,18,23),width=2)
    dr.text((x0,y0+8),f"S{o['k']+1}  page y {o['y']}–{o['y']+d['H']}",font=f(22,True),fill=(20,18,23))
    ax=x0+shw+12;ay=y0+42
    def row(lbl,val,bad=False,big=False):
        global ay
        dr.text((ax,ay),lbl,font=f(14),fill=(90,84,74))
        lines=wrap(val,f(17,True),AW-130)
        for j,l in enumerate(lines): dr.text((ax+128,ay+j*20),l,font=f(17,True),fill=(196,30,30) if bad else (20,18,23))
        ay+=max(1,len(lines))*20+6
    for j,l in enumerate(wrap(' + '.join(o['secs']),f(15,True),AW)): dr.text((ax,ay+j*18),l,font=f(15,True),fill=(31,107,63))
    ay+=len(wrap(' + '.join(o['secs']),f(15,True),AW))*18+8
    row('words',f"{o['words']}  (+{o['hdrWords']} header)",o['words']>45)
    row('typefaces',f"{len(o['famsAll'])} with header; {len(o['fams'])} in content: {', '.join(o['fams'])}",len(o['famsAll'])>3)
    row('text colours',f"{o['cols']} ({o['colC']} flat in content + {len(o['gradC'])} gradient fills)",o['cols']>6)
    mv=o['moving']+len(o['vids'])+(1 if o['k'] in ([6] if W<500 else [7]) else 0)
    MP={'pulse':'header live dot','r6-pulse':'next-die pulse','p5scan':'screen scan line','p5fing':'pointing hint','x2pCwB':'crawl','x2pCwR':'crawl ON AIR','Animation':'lamp/glint','hbc-die':'die light'}
    nm=[MP.get(x.split(':')[0],x.split(':')[0]) for x in o['mvd']]
    desc=', '.join(nm)+(f", {len(o['vids'])} founder video" if o['vids'] else '')+(', countdown ticks' if o['k'] in ([6] if W<500 else [7]) else '')
    row('moving',f"{mv}: {desc}",mv>1)
    row('framed objects',f"{o['frames']} distinct rectangles",o['frames']>15)
    ay+=6;dr.text((ax,ay),'Eye lands on',font=f(14),fill=(90,84,74));ay+=18
    n=N[str(o['k'])]
    for l in wrap(n[0],f(16,True),AW): dr.text((ax,ay),l,font=f(16,True),fill=(150,20,130));ay+=19
    ay+=8
    if n[1]:
        dr.text((ax,ay),'Flow notes',font=f(14),fill=(90,84,74));ay+=18
        for l in wrap(n[1],f(15),AW): dr.text((ax,ay),l,font=f(15),fill=(20,18,23));ay+=18
B=B.quantize(colors=200,method=Image.Quantize.MEDIANCUT,dither=Image.Dither.NONE)
B.save(out,optimize=True);import os;print(out,B.size,os.path.getsize(out)//1024,'KB')
