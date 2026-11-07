"""Mockups (2026-11-07): the next-drop call to action and a Buyback tab, on a copy of the live terminal.
python3 make.py  -> ez/mock-cta.html ; variants by query: ?c=1 card at the end of each tab, ?c=2 sticky drop bar,
?b=1 Buyback as the flow, ?b=2 Buyback as the tank. Pool figures are a chain read of 2026-11-07 (a build would read them live)."""
import os
H=os.path.dirname(os.path.abspath(__file__))
src=open(os.path.join(H,'..','index.html')).read()
css=open(os.path.join(H,'mock.css')).read()
js=open(os.path.join(H,'mock.js')).read()
def rep(a,b):
    global src
    assert src.count(a)==1,a[:60]
    src=src.replace(a,b)
src=src.replace('</style>',css+'\n</style>',1)
rep('var NAV=[["leaders","LEADERBOARD",','var NAV=[["leaders","LEADERBOARD",')
rep('["next","UPCOMING",\'<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>\']];',
    '["next","UPCOMING",\'<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>\'],["bet","BUYBACK",\'<circle cx="12" cy="12" r="8.5"/><path d="M12 7v10M9.5 9.5c0-1.2 1.1-2 2.5-2s2.5.8 2.5 2-1.1 1.7-2.5 2-2.5.8-2.5 2 1.1 2 2.5 2 2.5-.8 2.5-2"/>\']];'+js)
rep('''v==="next"?upcoming():'<section class="pn"><div class="empty">Buyback: the pool, the golden ticket holder and Bet #1 NVIDIA live here.</div></section>';''',
    '''v==="next"?upcoming():buyback();if(MV.c===1)h+=dropCard(v);''')
rep('document.getElementById("main").innerHTML=h;','document.getElementById("main").innerHTML=h;dropBar();')
out=os.path.join(H,'..','..','..','..','mock-cta.html')
open(out,'w').write(src);print('wrote',os.path.normpath(out))
