# Writes h29/_gutter.css: the H29 torn-paper gutter (one look, one height) as a repeat-x SVG tile. Seeded, so it is the same on every run.
# python3 make_gutter.py   (from h29/top/)
import random,urllib.parse,os
W,H=900,56            # tile px; the gutter is 56px tall at every width
R=random.Random(29)
import math
def edge(y0,amp,deep,sign):
    pts=[];x=0.0;ph=R.uniform(0,6.3);ph2=R.uniform(0,6.3)
    while x<W:
        y=y0+2.4*math.sin(x/W*2*math.pi*3+ph)+1.2*math.sin(x/W*2*math.pi*11+ph2)+R.uniform(-amp,amp)
        if R.random()<.07: y+=sign*R.uniform(deep*.5,deep)        # a bite torn deeper into the paper
        pts.append((x,y));x+=R.uniform(2.2,6.5)
    pts.append((W,pts[0][1]));return pts                              # same height at both ends: the tile repeats without a seam
top=edge(10,1.3,6,+1); bot=edge(45,1.3,6,-1)
def rim(pts,out):  # the torn fibre: a lighter band 1.2 to 3.2px outside the paper's edge, uneven
    return [(x,y+out*R.uniform(1.2,3.2)) for x,y in pts]
def path(t,b):
    return 'M'+' L'.join(f'{x:.1f},{y:.1f}' for x,y in t)+' L'+' L'.join(f'{x:.1f},{y:.1f}' for x,y in reversed(b))+'Z'
paper=path(top,bot); rimp=path(rim(top,-1),rim(bot,+1))
def line(pts): return 'M'+' L'.join(f'{x:.1f},{y:.1f}' for x,y in pts)
fib=''
for pts,sg in ((top,-1),(bot,1)):
    for x,y in pts:
        if R.random()<.18:
            l=R.uniform(1.2,3.2);a=R.uniform(-.7,.7)
            fib+=f'M{x:.1f},{y+sg*1.2:.1f} l{a*l:.1f},{sg*l:.1f} '
svg=f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">
<defs>
<filter id="m" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".018 .07" numOctaves="3" seed="29"/><feColorMatrix values="0 0 0 0 .75  0 0 0 0 .72  0 0 0 0 .66  0 0 0 1.6 -.72"/><feComposite in2="SourceGraphic" operator="in"/></filter>
<filter id="gr" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="1" seed="5"/><feColorMatrix values="0 0 0 0 .8  0 0 0 0 .78  0 0 0 0 .72  0 0 0 2.2 -1.45"/><feComposite in2="SourceGraphic" operator="in"/></filter>
<linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#22232a"/><stop offset=".55" stop-color="#18191f"/><stop offset="1" stop-color="#101116"/></linearGradient>
<pattern id="ht" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><circle cx="2.5" cy="2.5" r="1.05" fill="#000"/></pattern>
<linearGradient id="hf" x1="0" y1="0" x2="0" y2="1"><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".9"/></linearGradient>
<mask id="hm" maskUnits="userSpaceOnUse" x="0" y="0" width="{W}" height="{H}"><rect width="{W}" height="{H}" fill="url(#hf)"/></mask>
<clipPath id="pc"><path d="{paper}"/></clipPath></defs>
<path d="{rimp}" fill="#000" opacity=".85" transform="translate(2.5,4.5)"/>
<path d="{rimp}" fill="#4d473c"/>
<path d="{fib}" stroke="#6f6757" stroke-width=".8" fill="none" stroke-linecap="round"/>
<path d="{paper}" fill="url(#g)"/>
<g clip-path="url(#pc)"><rect width="{W}" height="{H}" fill="#fff" filter="url(#m)" opacity=".22"/><rect width="{W}" height="{H}" fill="#fff" filter="url(#gr)"/>
<rect width="{W}" height="{H}" fill="url(#ht)" mask="url(#hm)" opacity=".55"/></g>
<path d="{line(top)}" fill="none" stroke="#000" stroke-width="1.1" opacity=".9"/><path d="{line(bot)}" fill="none" stroke="#000" stroke-width="1.1" opacity=".9"/>
<path d="{line([(x,y+1.4) for x,y in top])}" fill="none" stroke="#3a3730" stroke-width=".8" opacity=".6"/>
</svg>'''
uri=urllib.parse.quote(' '.join(svg.split()),safe=' =:/,.-')
css=f'''/* H29 · the gutter between sections (one device everywhere, owner's spec rule 3): a wide strip of dark comic-book paper torn along both edges,
   its torn fibre showing as a warm grey rim (never white), a hard ink shadow under it. One look and one height ({H}px) at every width and every joint.
   Use: <div class="h29-gutter" aria-hidden="true"></div> between two sections. It runs edge to edge of the window from any centred column
   (body clips sideways overflow on X2+). The gap above and below is --h29-gut-gap. Made by top/make_gutter.py (seeded). */
:root{{--h29-gut-h:{H}px;--h29-gut-gap:clamp(18px,5vw,36px)}}
.h29-gutter{{display:block;position:relative;z-index:1;box-sizing:border-box;height:var(--h29-gut-h);width:100vw;max-width:none;padding:0;border:0;
 margin:var(--h29-gut-gap) calc(50% - 50vw);pointer-events:none;
 background:url("data:image/svg+xml,{uri}") 0 0/{W}px {H}px repeat-x}}
.h29-gutter:nth-of-type(2n){{background-position:-317px 0}}
'''
open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','_gutter.css'),'w').write(css)
print('wrote',len(css),'bytes')
