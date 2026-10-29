# /usr/bin/python3 vboard.py <shots dir> : the three decision boards (cast, tickets, rules), phone and desktop, from vshot.js's screens
import sys
from PIL import Image,ImageDraw,ImageFont
S=sys.argv[1].rstrip('/')+'/';EZ='/home/user/Tokengame/ez/'
B=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',30);M=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',22);R=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',19);BG='#1e1c22'
def board(cols,out,title,sub,scale=1,gap=36,maxw=None):
    # cols: list of (label, note, [image files stacked])
    ims=[[Image.open(S+f).convert('RGB') for f in fs] for _,_,fs in cols]
    ims=[[i.resize((int(i.width*scale),int(i.height*scale)),Image.LANCZOS) for i in c] for c in ims]
    cw=[max(i.width for i in c) for c in ims];ch=[sum(i.height for i in c)+18*(len(c)-1) for c in ims]
    W=max(sum(cw)+gap*(len(cols)+1),1200);H=150+max(ch)+90
    im=Image.new('RGB',(W,H),BG);d=ImageDraw.Draw(im);d.text((gap,22),title,font=B,fill='#f2b632');y0=64
    for ln in sub:d.text((gap,y0),ln,font=R,fill='#b8ad94');y0+=26
    x=gap;top=y0+16
    for (lab,note,_),c,w in zip(cols,ims,cw):
        d.text((x,top),lab,font=M,fill='#f4ead0');d.text((x,top+30),note,font=R,fill='#b8ad94');y=top+64
        for i in c:im.paste(i,(x,y));y+=i.height+18
        x+=w+gap
    im=im.crop((0,0,W,top+64+max(ch)+30));im.save(out,optimize=True);print(out,im.size)
board([('A · Cards (today, as built)','one card per AI: P&L, record, best call, last 5',['castel-390-now.png']),
       ('B · Columns','one row per AI: rank, model + flag, W-L, hit rate, P&L',['castel-390-cast-cols.png'])],
      EZ+'x2p-comic-cast.png','Q1 · Meet the cast on the Overview  ·  phone 390',['?cast=cards (A) or ?cast=cols (B) on ez/x2p-comic-remake.html. Ranked by P&L; an AI under half the graded rounds goes last. Numbers from ez-data.js.'],scale=.5)
board([('A · Cards (today)','four across',['castel-1536-now.png']),('B · Columns','one panel, the rows full width',['castel-1536-cast-cols.png'])],
      EZ+'x2p-comic-cast-desktop.png','Q1 · Meet the cast  ·  desktop 1536',['?cast=cards (A) or ?cast=cols (B).'],scale=.6)
board([('A · Inked (today, as built)','the live tickets, an ink outline, halftone, saturated',['tix-390-now-std.png','tix-390-now-proof.png','tix-390-now-proof2.png','tix-390-now-bet.png']),
       ('B · Flat comic panels','flat bands, Ben-Day dots, thick ink, no paper or grain',['tix-390-tix-flat-std.png','tix-390-tix-flat-proof.png','tix-390-tix-flat-proof2.png','tix-390-tix-flat-bet.png'])],
      EZ+'x2p-comic-tickets.png','Q2 · The tickets  ·  phone 390',['Top to bottom: season ticket + tryouts (Leaderboard), the proof on P&L, the proof after a tap on Accuracy (the switch animates in both), the NVIDIA bet + Season 2 (Overview).','?tix=inked (A) or ?tix=flat (B).'],scale=.5)
board([('A · Inked (today)','',['tix-1536-now-std.png','tix-1536-now-proof.png','tix-1536-now-bet.png']),('B · Flat comic panels','',['tix-1536-tix-flat-std.png','tix-1536-tix-flat-proof.png','tix-1536-tix-flat-bet.png'])],
      EZ+'x2p-comic-tickets-desktop.png','Q2 · The tickets  ·  desktop 1536',['Season ticket, the proof, the bet. ?tix=inked (A) or ?tix=flat (B).'],scale=1)
ph=lambda t:[f'rules-390-{t}-{i}.png' for i in range(3)]
board([('A · Caption boxes (today)','"The rules" and "The stats", 3 + 2 lines',ph('now')),('B · None','gone; the cover says the rules',ph('rules-none')),('C · One line each','a small caption pinned over each ticket',ph('rules-line'))],
      EZ+'x2p-comic-rules.png','Q3 · The Leaderboard tab\'s rules and stats lines  ·  phone 390x844',['Three screens of the tab, top to bottom. ?rules=box (A), ?rules=none (B), ?rules=line (C).'],scale=.5,gap=30)
board([('A · Caption boxes (today)','',['rules-1536-now-0.png']),('B · None','',['rules-1536-rules-none-0.png']),('C · One line each','',['rules-1536-rules-line-0.png'])],
      EZ+'x2p-comic-rules-desktop.png','Q3 · The rules and stats lines  ·  desktop 1536x864, first screen',['?rules=box (A), ?rules=none (B), ?rules=line (C).'],scale=.42,gap=24)
