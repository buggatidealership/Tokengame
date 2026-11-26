#!/usr/bin/env python3
# Builds nt-pv1d.html (Sealed v4) from nt-pv1c.html (Sealed v3). Run from ez/tools/concepts/dopa: /usr/bin/python3 w6/nt/pv1d/mk.py
import os
D = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.abspath(os.path.join(D, '..', '..', '..'))
s = open(os.path.join(ROOT, 'nt-pv1c.html')).read()

def rep(a, b, n=1):
    global s
    c = s.count(a)
    assert c == n, (c, a[:90])
    s = s.replace(a, b)

# 1. notes
i = s.index('<!-- Sealed v3'); j = s.index('-->', i) + 3
s = s[:i] + '''<!-- Sealed v4 (owner, 2026-11-22, on v3: "the letter paper to be dark and black, and the inside can be sort of this beige... the
  less eye strain color... people can add on their phone"; the gold clause "looks non-crisp"). The envelopes are black card (the painted black
  sheet of v3, edge-lit, a muted gold liner under the flap, the Locked stamp in red ink that sits on black); the letter that comes out is a
  reading-mode sepia (w6/nt/pv1d/paper-sepia.jpg: the painted cream sheet moved to #F5EDDA with a third of its contrast); the filed letters
  in the trays and the list are the same sepia sheets. Type on the letter is solid ink with no speckle mask (only the side stays a worn
  stamp), so every edge is clean; the key clause takes the brand marker in dark ink. ?v=b: the other reading (the letter itself black with
  a sepia panel inside). v3 stays as nt-pv1c.html. Built by w6/nt/pv1d/mk.py. -->''' + s[j:]
rep('<title>pv1c sealed v3</title>', '<title>pv1d sealed v4</title>')

# 2. the letter: sepia, crisp
rep('#card.crm{background:#f1e6cc url(w6/nt/pv1c/paper-cream.jpg) center/cover}',
    '#card.crm{background:#f5edda url(w6/nt/pv1d/paper-sepia.jpg) center/cover}')
rep('#card :is(.lh2 b,.cf,.ow,.cl,.pmk){-webkit-mask-image:url(w6/nt/pv1c/ink.png);mask-image:url(w6/nt/pv1c/ink.png);-webkit-mask-size:320px;mask-size:320px}',
    '#card.blk :is(.lh2 b,.cf,.ow,.cl,.pmk){-webkit-mask-image:url(w6/nt/pv1c/ink.png);mask-image:url(w6/nt/pv1c/ink.png);-webkit-mask-size:320px;mask-size:320px}')
rep('#card.crm :is(.lh2 b,.cf,.cl){text-shadow:0 -1px 0 rgba(60,40,20,.28),0 1.5px 0 rgba(255,253,245,.75)}',
    '#card.crm :is(.lh2 b,.cf){text-shadow:0 1px 0 rgba(255,253,245,.7)}#card.crm .cl{text-shadow:none;color:#120d08}\n'
    '#card.crm .ow{color:rgba(40,28,16,.58)}#card.crm .rl{background:rgba(40,28,16,.16)}\n'
    '#card.crm .hw i{color:#120d08;background:#fdbc2a}')
rep('#card.crm .tooth{background-image:url(w6/nt/pv1c/tooth-cream.jpg)}', '#card.crm .tooth{background-image:url(w6/nt/pv1d/tooth-sepia.jpg)}')
rep('#card .lit{position:absolute;inset:0;pointer-events:none;border-radius:8px;mix-blend-mode:multiply;background:radial-gradient(130% 115% at 6% -4%,#fff6e6 0%,#fff3df 34%,#b4a593 100%)}',
    '#card .lit{position:absolute;inset:0;pointer-events:none;border-radius:8px;mix-blend-mode:multiply;background:radial-gradient(130% 115% at 6% -4%,#fff6e6 0%,#fff3df 34%,#b4a593 100%)}\n'
    '#card.crm .lit{background:radial-gradient(140% 120% at 6% -4%,#fffaf0 0%,#fff7ea 45%,#e6dccb 100%)}\n'
    '.mini.sep{background:#f5edda url(w6/nt/pv1d/paper-sepia.jpg) center/cover}.mini.sep .r{color:#120d08}\n'
    '#card.b{background:#151310 url(w6/nt/pv1c/paper-black.jpg) center/cover}\n'
    '#card.b::before{content:"";position:absolute;inset:24px;border-radius:4px;background:#f5edda url(w6/nt/pv1d/paper-sepia.jpg) center/cover;box-shadow:0 0 0 1.5px rgba(253,188,42,.35),inset 0 2px 6px rgba(0,0,0,.25)}\n'
    '#card.b > *{position:relative}#card.b .tooth,#card.b .lit,#card.b .fold{position:absolute}\n'
    '#card.b .lit{background:radial-gradient(140% 120% at 6% -4%,#fffaf0 0%,#fff7ea 45%,#e6dccb 100%)}')

# 3. the envelopes: black card, edge-lit, a gold liner, a red stamp that reads on black
rep('.env .st{position:absolute;left:0;right:0;top:238px;text-align:center;font:italic 700 40px/1 Fraunces;letter-spacing:.04em;color:#a2241b;transform:rotate(-3deg);opacity:.85;mix-blend-mode:multiply}',
    '.env .st{position:absolute;left:0;right:0;top:238px;text-align:center;font:italic 700 40px/1 Fraunces;letter-spacing:.04em;color:#d9452f;transform:rotate(-3deg);opacity:.9}')
rep('<linearGradient id="eg${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6ecd2"/><stop offset="1" stop-color="#e7d8b6"/></linearGradient>',
    '<linearGradient id="eg${i}" x1="0" y1="0" x2=".35" y2="1"><stop offset="0" stop-color="#fff3dc" stop-opacity=".10"/><stop offset=".55" stop-color="#fff3dc" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".25"/></linearGradient>'
    '<pattern id="pp${i}" patternUnits="userSpaceOnUse" width="400" height="290"><image href="w6/nt/pv1c/paper-black.jpg" x="${-40 * i}" y="${-60 * (i % 3)}" width="520" height="693" preserveAspectRatio="xMidYMid slice"/></pattern>'
    '<linearGradient id="lg${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b08a3e"/><stop offset=".5" stop-color="#7c6128"/><stop offset="1" stop-color="#5a451c"/></linearGradient>')
rep('<path d="${FL}" fill="#d9c6a0" stroke="rgba(90,66,40,.3)" stroke-width="2"/>', '<path d="${FL}" fill="url(#lg${i})" stroke="rgba(30,22,10,.5)" stroke-width="2"/>')
rep('<rect x="34" y="16" width="332" height="262" rx="3" fill="#f8f0d9"/>', '<rect x="34" y="16" width="332" height="262" rx="3" fill="#f5edda"/>')
rep('<rect width="400" height="290" rx="6" fill="url(#eg${i})"/><rect width="400" height="290" rx="6" fill="#000" filter="url(#pn${i})"/>',
    '<rect width="400" height="290" rx="6" fill="url(#pp${i})"/><rect width="400" height="290" rx="6" fill="#000" opacity=".24"/><rect width="400" height="290" rx="6" fill="url(#eg${i})"/>'
    '<rect x="1" y="1" width="398" height="288" rx="5.5" fill="none" stroke="rgba(255,236,200,.16)" stroke-width="2"/>')
rep('<path d="M0 290 L200 130 L400 290" fill="none" stroke="rgba(90,66,40,.25)" stroke-width="2"/>',
    '<path d="M0 290 L200 130 L400 290" fill="none" stroke="rgba(255,236,200,.10)" stroke-width="2"/><path d="M2 289 L200 131.5 L398 289" fill="none" stroke="rgba(0,0,0,.45)" stroke-width="1.5" transform="translate(0 2)"/>')
rep('<g class="flap"><path d="${FL}" fill="#efe2c3" stroke="rgba(90,66,40,.3)" stroke-width="2"/>',
    '<g class="flap"><path d="${FL}" fill="url(#pp${i})"/><path d="${FL}" fill="#000" opacity=".16"/><path d="${FL}" fill="#fff3dc" opacity=".05"/><path d="${FL}" fill="none" stroke="rgba(255,236,200,.22)" stroke-width="2"/>')

# 4. paper modes: v4 = sepia letter in black envelopes; ?v=b = black letter with a sepia panel
rep("const DARK = new URLSearchParams(location.search).get('paper') !== 'cream';",
    "const VB = new URLSearchParams(location.search).get('v') === 'b', DARK = false;")
rep("el.className = DARK ? 'mini blk' : 'mini paper';", "el.className = 'mini sep';")
rep("PV.$('#card').className = DARK ? 'blk' : 'crm';", "PV.$('#card').className = VB ? 'crm b' : 'crm';")

# 5. the letter rested 20px low in its envelope, so a strip of it showed under every envelope (in v2 and v3 too): rest it 6px down, inside
rep("stub.style.transform = 'translate(0px,20px)';", "stub.style.transform = 'translate(0px,6px)';")
rep("stub.style.transform = `translate(0px,${(20 - lift * su).toFixed(1)}px)`;", "stub.style.transform = `translate(0px,${(6 - lift * su).toFixed(1)}px)`;")

open(os.path.join(ROOT, 'nt-pv1d.html'), 'w').write(s)
print('written nt-pv1d.html')
