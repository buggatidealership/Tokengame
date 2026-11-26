"""Mockup (2026-11-07): the page ground with character: a deep dark base, a green glow coming in at the top, a faint dark red at the
bottom, fixed to the screen. python3 make.py -> ez/mock-bg-A.html (subtle), ez/mock-bg-B.html (stronger)."""
import os
H=os.path.dirname(os.path.abspath(__file__));src=open(os.path.join(H,'..','index.html')).read()
def css(g,r):
    return '''
/* ground (mockup) */
html{background:#0b0a09}body{background:transparent!important}
body::before{content:"";position:fixed;inset:0;z-index:-1;pointer-events:none;
 background:
  radial-gradient(130%% 34%% at 50%% -6%%,rgba(3,200,112,%(g)s),rgba(3,200,112,%(g2)s) 38%%,transparent 72%%),
  radial-gradient(140%% 30%% at 50%% 108%%,rgba(176,30,36,%(r)s),rgba(176,30,36,%(r2)s) 40%%,transparent 74%%),
  linear-gradient(180deg,#0d1210 0%%,#0b0a09 30%%,#0b0a09 72%%,#120a0a 100%%)}
body::after{content:"";position:fixed;inset:0;z-index:-1;pointer-events:none;opacity:.05;
 background-image:url("data:image/svg+xml,%%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%%3E%%3Cfilter id='n'%%3E%%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%%3E%%3C/filter%%3E%%3Crect width='100%%25' height='100%%25' filter='url(%%23n)'/%%3E%%3C/svg%%3E")}
.top{background:linear-gradient(180deg,rgba(6,40,24,.55),rgba(11,14,12,.55));backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
.nav{background:linear-gradient(180deg,rgba(20,12,12,.7),rgba(58,14,16,.78));backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
.pn{background:rgba(22,19,18,.78)}
'''%{'g':g,'g2':round(g/3,3),'r':r,'r2':round(r/3,3)}
for name,g,r in [('A',.32,.22),('B',.55,.38)]:
    s=src.replace('</style>',css(g,r)+'</style>',1)
    open(os.path.join(H,'..','..','..','..','mock-bg-%s.html'%name),'w').write(s)
print('ok')
