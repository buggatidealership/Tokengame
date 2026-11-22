#!/usr/bin/env python3
# Builds nt-pv1c.html (Sealed v3) from nt-pv1b.html (Sealed v2). Run from ez/tools/concepts/dopa: /usr/bin/python3 w6/nt/pv1c/mk.py
import os
D = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.abspath(os.path.join(D, '..', '..', '..'))
s = open(os.path.join(ROOT, 'nt-pv1b.html')).read()

def rep(a, b, n=1):
    global s
    c = s.count(a)
    assert c == n, (c, a[:80])
    s = s.replace(a, b)

# 1. title and notes
i = s.index('<!-- Sealed v2'); j = s.index('-->', i) + 3
s = s[:i] + '''<!-- Sealed v3 (owner, 2026-11-22, on v2: dark letters "maybe in black"; standard wording "Reports today after the close" (a prediction is
  always posted the same day, before the close) and "Graded at the next market close"; one scene before the end that lists each AI LONG or
  SHORT; the wax "looks cheap... better visuals... use Hedra"; the writing on the letters "looks pasted on top"). The wax is painted (Hedra
  gpt-image-2, one blank seal per AI in its colour, w6/nt/pv1c/wax-*.webp) and the AI's mark is pressed into it here (lit by the same lamp, a
  relief through feDiffuseLighting, overlay-blended). The letter is a sheet of real card (Hedra, black by default, ?paper=cream for the cream
  one); its print takes the paper's grain (an ink mask), sits pressed into the sheet (a dark wall above, a pale lip below) and takes the lamp's
  light with the paper (one multiply pass over sheet and print); the side is a worn rubber stamp; the key clause turns gold foil (on black) or
  takes the marker (on cream). The list: on the second drop the two trays rise to the top of the frame, their filed letters square up into a pile and are dealt from the top,
  the farthest row first, into one row each, LONG on the left and SHORT on the right, the count on each tray's plate. v2 stays as nt-pv1b.html. Built by w6/nt/pv1c/mk.py. -->''' + s[j:]
rep('<title>pv1b sealed v2</title>', '<title>pv1c sealed v3</title>')

# 2. styles
rep('#vig{', '''#card.blk{background:#151310 url(w6/nt/pv1c/paper-black.jpg) center/cover;color:#efe5cc}
#card.crm{background:#f1e6cc url(w6/nt/pv1c/paper-cream.jpg) center/cover}
#card :is(.lh2 b,.cf,.ow,.cl,.pmk){-webkit-mask-image:url(w6/nt/pv1c/ink.png);mask-image:url(w6/nt/pv1c/ink.png);-webkit-mask-size:320px;mask-size:320px}
#card.blk :is(.lh2 b,.cf,.cl){color:#efe5cc;text-shadow:0 -1px 0 rgba(0,0,0,.8),0 1.5px 0 rgba(255,244,220,.09)}
#card.crm :is(.lh2 b,.cf,.cl){text-shadow:0 -1px 0 rgba(60,40,20,.28),0 1.5px 0 rgba(255,253,245,.75)}
#card.blk .ow{color:rgba(239,229,204,.5)}#card.blk .rl{background:rgba(239,229,204,.16)}#card.blk .lh2{border-bottom-color:rgba(239,229,204,.2)}
#card .sd{-webkit-mask-image:url(w6/nt/pv1c/stamp.png);mask-image:url(w6/nt/pv1c/stamp.png);-webkit-mask-size:100% 100%;mask-size:100% 100%;border-radius:4px}
#card.blk .sd{color:#171410}
#card.blk .hw i{background:linear-gradient(100deg,#8a5a12,#fdbc2a 30%,#fff1b8 46%,#e9a91c 60%,#8f5d14);-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:none}
#card.blk .fold{background:linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,.55) 80%,rgba(255,240,210,.12))}
#card .tooth{position:absolute;inset:0;pointer-events:none;border-radius:8px;mix-blend-mode:multiply;background:url(w6/nt/pv1c/tooth-black.jpg) center/cover}
#card.crm .tooth{background-image:url(w6/nt/pv1c/tooth-cream.jpg)}
#card .lit{position:absolute;inset:0;pointer-events:none;border-radius:8px;mix-blend-mode:multiply;background:radial-gradient(130% 115% at 6% -4%,#fff6e6 0%,#fff3df 34%,#b4a593 100%)}
.mini.blk{background:#151310 url(w6/nt/pv1c/paper-black.jpg) center/cover}
.mini.blk .r{color:#efe5cc;text-shadow:0 -1px 0 rgba(0,0,0,.8)}
.mini .s{-webkit-mask-image:url(w6/nt/pv1c/stamp.png);mask-image:url(w6/nt/pv1c/stamp.png);-webkit-mask-size:100% 100%;mask-size:100% 100%}
.mini.blk .s{color:#171410}
#card.blk .pmk,.mini.blk .pmk{mix-blend-mode:normal;filter:drop-shadow(0 -1px 0 rgba(0,0,0,.85)) drop-shadow(0 1.5px 0 rgba(255,244,220,.08))}
#dim{position:absolute;inset:0;pointer-events:none;background:rgba(4,7,14,.62);opacity:0;z-index:47}
#vig{''')
rep('<div id="vig"></div>', '<div id="vig"></div><div id="dim"></div>')
# the press filter for the marks in the wax: a relief lit from the upper left; a flat area comes out mid grey, so overlay leaves it as it is
rep('<svg width="0" height="0" style="position:absolute"><filter id="ink"',
    '<svg width="0" height="0" style="position:absolute"><filter id="press" x="-25%" y="-25%" width="150%" height="150%" color-interpolation-filters="sRGB">'
    '<feGaussianBlur in="SourceAlpha" stdDeviation=".55" result="b"/><feDiffuseLighting in="b" surfaceScale="2.6" diffuseConstant="1" lighting-color="#fff">'
    '<feDistantLight azimuth="225" elevation="30"/></feDiffuseLighting></filter><filter id="ink"')

# 3. paper mode and the inks that read on it
rep("const INK = {", "const DARK = new URLSearchParams(location.search).get('paper') !== 'cream';\n"
    "const INKD = { GPT: '#efe5cc', GROK: '#efe5cc', CLAUDE: '#e48a62', GEMINI: '#7aa8ff', QWEN: '#a898ff' };\nconst INK = {")
rep("fill=\"${INK[k] || '#0b0d12'}\"", "fill=\"${(DARK ? INKD : INK)[k] || '#0b0d12'}\"")

# 4. the wax: the painted seal, the mark pressed into its face
a = s.index('<div class="wax"><svg class="h hl" viewBox="-52 -52 104 104">'); b = s.index('</svg>', a) + 6
s = s[:a] + '''<div class="wax"><svg class="h hl" viewBox="-52 -52 104 104" overflow="visible"><defs><clipPath id="fc${i}"><circle cx="0" cy="-1" r="29"/></clipPath></defs>
        <g class="L"><image href="w6/nt/pv1c/wax-${x.k.toLowerCase()}.webp" x="-52" y="-52" width="104" height="104"/>
        <g clip-path="url(#fc${i})" style="mix-blend-mode:multiply" opacity=".28">${mk2(W[2])}</g><g clip-path="url(#fc${i})" style="mix-blend-mode:overlay"><g filter="url(#press)">${mk2('#000')}</g></g></g></svg>''' + s[b:]
rep("const mk = (fill, dx, dy, op) =>",
    "const mk2 = fill => `<g transform=\"translate(-19.5 -20.5) scale(1.625)\"><path d=\"${m.d}\" fill=\"${fill}\"${m.fr ? ` fill-rule=\"${m.fr}\"` : ''}/></g>`;\n"
    "    const mk = (fill, dx, dy, op) =>")

# 5. the letter and the filed letters on the paper of the mode
rep("el.className = 'mini paper';", "el.className = DARK ? 'mini blk' : 'mini paper';")
rep("PV.$('#card').innerHTML = `", "PV.$('#card').className = DARK ? 'blk' : 'crm'; PV.$('#card').innerHTML = `")
rep('<div class="cl">${PV.words(x.clause)}</div><div class="fold"></div>`', '<div class="cl">${PV.words(x.clause)}</div><div class="fold"></div><div class="tooth"></div><div class="lit"></div>`')

# 6. the list scene takes the big count's place; 12 beats before the end card
rep("PV.$('#big').innerHTML = `<div class=\"ct\">", "PV.$('#big').innerHTML = ''; void `<div class=\"ct\">")
rep('T = { starts, count: b, end: b + 3, dur: b + 3 + 5 };', 'T = { starts, count: b, end: b + 12, dur: b + 12 + 5 };')
rep("CUES.push([T.count * B, 'r11-thump', .16], [T.count * B + .02, 'sfx-stamp', .14], [T.end * B, 'sfx-bell', .1]);",
    "CUES.push([T.count * B, 'r11-thump', .16], [(T.count + .2) * B, 'r11-slide', .12], [T.end * B, 'sfx-bell', .1]);\n"
    "  ord.forEach((x, i) => CUES.push([(T.count + LIST(i)) * B, 'r11-card', .07]));")
rep("let T = {}, ord,", "const LIST = i => { const x = ord[i], r = ord.slice(i + 1).filter(y => y.side === x.side).length; return 1.4 + (x.side === 'LONG' ? 0 : .35) + .8 * r };\nlet T = {}, ord,")
a = s.index("  const big = PV.$('#big'), c = PV.n(k, T.count"); b = s.index("  // the end card", a)
s = s[:a] + '''  // the list: on the second drop the trays rise to the top, their letters spread into one row each (LONG left, SHORT right)
  const rise = PV.eo5(PV.n(k, T.count, T.count + 1.6)), ce = PV.n(k, T.end, T.end + .6);
  PV.$('#dim').style.opacity = (rise * (1 - ce)).toFixed(3);
  PV.$$('.tray').forEach(e => { e.style.transform = `translateY(${(-817 * rise).toFixed(1)}px)`; e.style.zIndex = rise > 0 ? 58 : 40 });
  ord.forEach((x, i) => { const el = cardEls[x.k], j = ord.slice(0, i).filter(y => y.side === x.side).length, l0 = T.count + LIST(i);
    const q = PV.spring(Math.max(0, k - l0) * B * 1.6, 1.2, 7), qc = PV.cl(q);
    if (k < T.count) { el.style.left = (14 + j * 40) + 'px'; el.style.bottom = '64px'; el.style.transformOrigin = ''; el.style.transform = `rotate(${(j % 2 ? 3 : -3) + j}deg)`; return }
    // as the tray rises its letters square up into one neat pile; then they are dealt from the top, the farthest row first, so no letter crosses another
    const x0 = PV.lerp(14 + j * 40, 14, rise), a0 = PV.lerp((j % 2 ? 3 : -3) + j, 0, rise);
    el.style.transformOrigin = 'left bottom'; el.style.left = PV.lerp(x0, 0, qc).toFixed(1) + 'px'; el.style.bottom = PV.lerp(64, -229 - 227 * j, q).toFixed(1) + 'px';
    el.style.transform = `rotate(${PV.lerp(a0, 0, qc).toFixed(2)}deg) scale(${PV.lerp(1, 1.38, qc).toFixed(3)})` });
''' + s[b:]
open(os.path.join(ROOT, 'nt-pv1c.html'), 'w').write(s)

# 7. the standard wording, in the shared prediction engine
p = os.path.join(ROOT, 'w6', 'nt', 'pv', 'pv.js'); t = open(p).read()
old = 'PV.reports = `Reports ${PV.co.callDay} ${PV.co.when}`; PV.graded = `Graded ${PV.co.gradeDay} at the close`;'
new = 'PV.reports = `Reports today ${PV.co.when}`; PV.graded = `Graded at the next market close`;'
if old in t: open(p, 'w').write(t.replace(old, new))
assert new in open(p).read()
print('written nt-pv1c.html; pv.js wording standard')
