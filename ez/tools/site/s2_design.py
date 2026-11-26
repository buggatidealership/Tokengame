"""Season 2 design (owner, 2026-11-26: take D, "Frosted logo lettering", and the Feed; "push it to production straight away").
Writes tools/site/s2_design.css (every rule prefixed with html.s2d, so Season 1, ?s=1, keeps its look) and s2_design.js into the terminal
(ez/v53-terminal.html and tools/concepts/hyperdash/index.html) between S2DESIGN markers; rerun after editing either file."""
import os, re
H = os.path.dirname(os.path.abspath(__file__)); EZ = os.path.dirname(os.path.dirname(H))
def pre(sel):
    out = []
    for s in sel.split(','):
        s = s.strip()
        if not s: continue
        if s.startswith(':root'): s = 'html.s2d' + s[5:]
        elif s == 'html' or s.startswith('html{'): s = 'html.s2d'
        elif s.startswith('html'): s = 'html.s2d' + s[4:]
        else: s = 'html.s2d ' + s
        out.append(s)
    return ','.join(out)
def prefix(css):
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.S); o = []; i = 0
    while i < len(css):
        j = css.find('{', i)
        if j < 0: break
        head = css[i:j].strip()
        if head.startswith('@media'):
            d, k = 1, j + 1
            while d:
                d += {'{': 1, '}': -1}.get(css[k], 0); k += 1
            o.append(head + '{' + prefix(css[j + 1:k - 1]) + '}'); i = k
        else:
            k = css.find('}', j); o.append(pre(head) + css[j:k + 1]); i = k + 1
    return ''.join(o)
css = prefix(open(os.path.join(H, 's2_design.css')).read()); js = open(os.path.join(H, 's2_design.js')).read()
FONT = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@1,800&display=swap">'
for f in (os.path.join(EZ, 'v53-terminal.html'), os.path.join(EZ, 'tools', 'concepts', 'hyperdash', 'index.html')):
    s = open(f).read()
    s = re.sub(r'<!--S2DESIGN\{-->.*?<!--\}S2DESIGN-->', '', s, flags=re.S); s = re.sub(r'/\*S2DESIGN\{\*/.*?/\*\}S2DESIGN\*/\n?', '', s, flags=re.S)
    k = s.index('<script src="ez-data.js'); s = s[:k] + '<!--S2DESIGN{-->' + FONT + '<style id="s2d">' + css + '</style><!--}S2DESIGN-->' + s[k:]
    a = 'var h0=(location.hash||"").slice(1);'; assert s.count(a) == 1, f
    s = s.replace(a, '/*S2DESIGN{*/' + js + '/*}S2DESIGN*/\n' + a)
    s = s.replace('if(/^(profile|leaders|next|bet)$/.test(h0))', 'if(/^(profile|leaders|next|bet|feed)$/.test(h0))')
    open(f, 'w').write(s); print('patched', f)
