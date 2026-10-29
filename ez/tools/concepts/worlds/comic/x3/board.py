# /usr/bin/python3 board.py : the owner's boards for EZ Live X3+ (the comic), phone and desktop
from PIL import Image,ImageDraw,ImageFont
T='/tmp/claude-0/'
def font(sz,b=True):
    for f in ['/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf' if b else '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf']:
        try:return ImageFont.truetype(f,sz)
        except Exception:pass
    return ImageFont.load_default()
def board(out,title,sub,rows,sc,gap=18):
    rows=[(lab,[Image.open(T+f) for f in fs]) for lab,fs in rows]
    rows=[(lab,[i.resize((int(i.width*sc),int(i.height*sc)),Image.LANCZOS) for i in ims]) for lab,ims in rows]
    W=max(sum(i.width for i in ims)+gap*(len(ims)-1) for _,ims in rows)+80
    H=130+sum(max(i.height for i in ims)+70 for _,ims in rows)+20
    o=Image.new('RGB',(W,H),'#17141c');d=ImageDraw.Draw(o)
    d.text((40,30),title,font=font(40),fill='#fdbc2a');d.text((40,82),sub,font=font(20,False),fill='#d8d0c0')
    y=130
    for lab,ims in rows:
        d.text((40,y+8),lab,font=font(26),fill='#ffffff');y+=50;x=40
        for i in ims:o.paste(i,(x,y));x+=i.width+gap
        y+=max(i.height for i in ims)+20
    o.save(out,optimize=True);print(out,o.size)
board('/home/user/Tokengame/ez/x2p-x3p-comic-phone.png','EZ Live X3+ · the comic · phone 390x844',
  'Three tabs, each from the top of the scroll. Every number from ez-data.js and the page\'s own P&L accounts (Thu Oct 29, after the R64 sync).',
  [('Overview: cover, Previously, Meet the cast, Today, Back issues, Smart or lucky?',['bo-%d.png'%i for i in range(6)]),
   ('Leaderboard: who\'s winning, the scoreboard, the race so far, best and worst calls, target practice, by sector',['bl-%d.png'%i for i in range(5)]),
   ('Upcoming: tonight at the close (calls locked, the bell), then every round still to come',['bu-%d.png'%i for i in range(4)])],0.5)
board('/home/user/Tokengame/ez/x2p-x3p-comic-desktop.png','EZ Live X3+ · the comic · desktop 1536x864',
  'The same three tabs on a laptop screen, from the top.',
  [('Overview',['do-%d.png'%i for i in range(4)]),('Leaderboard',['dl-%d.png'%i for i in range(3)]),('Upcoming',['du-%d.png'%i for i in range(2)])],0.5)
