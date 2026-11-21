#!/usr/bin/python3
"""Text contrast on the real pixels: /usr/bin/python3 contrast.py <shots dir> [view prefix ...]
For every visible text element run.js recorded (box and colour), the background is sampled from the same shot taken with all text made
transparent (<name>-<w>-nt.png): the median luminance of the box's pixels. Contrast is WCAG 2 (text colour composited over that median).
Reports the minimum per view and every element under 4.5:1 (3:1 counted separately for text 24px and up, WCAG's large text)."""
import json, os, sys, re
from PIL import Image
D = sys.argv[1]; only = sys.argv[2:]
rep = json.load(open(os.path.join(D, 'report.json')))['report']
def lin(v):
    v /= 255; return v / 12.92 if v <= .04045 else ((v + .055) / 1.055) ** 2.4
def L(r, g, b): return .2126 * lin(r) + .7152 * lin(g) + .0722 * lin(b)
def parse(c):
    n = [float(x) for x in re.findall(r'[\d.]+', c)]; return n[:3], (n[3] if len(n) > 3 else 1.0)
out = {}
for k, m in rep.items():
    v, w = k.split('@'); w = int(w)
    if w == 320 or (only and not any(v.startswith(o) for o in only)): continue
    f = os.path.join(D, '%s-%d-nt.png' % (v, w))
    if not os.path.exists(f): continue
    im0 = Image.open(f).convert('RGB'); s = 2 if w < 500 else 1; bad = []; mins = 99
    fv = os.path.join(D, '%s-%d-vp-nt.png' % (v, w)); imv = Image.open(fv).convert('RGB') if os.path.exists(fv) else None
    for t in m['text']:
        im = imv if t.get('nav') else im0
        if im is None: continue
        if not t['t'] or t['w'] < 2: continue
        x0, y0 = int(t['x'] * s), int(t['y'] * s); x1, y1 = int((t['x'] + t['w']) * s), int((t['y'] + t['h']) * s)
        if y1 > im.height or x1 > im.width or x0 < 0: continue
        px = list(im.crop((x0, y0, max(x1, x0 + 1), max(y1, y0 + 1))).resize((min(40, max(1, x1 - x0)), min(16, max(1, y1 - y0)))).getdata())
        ls = sorted(L(*p) for p in px); bl = ls[len(ls) // 2]; bp = px[[L(*p) for p in px].index(bl)]
        (r, g, b), a = parse(t['c'])
        if a == 0: continue
        cr_, cg, cb = [a * c + (1 - a) * q for c, q in zip((r, g, b), bp)]
        tl = L(cr_, cg, cb); hi, lo = max(tl, bl), min(tl, bl); cr = (hi + .05) / (lo + .05)
        need = 3 if t['fs'] >= 24 or (t['fs'] >= 18.66 and False) else 4.5
        mins = min(mins, cr)
        if cr < need: bad.append('%.2f %s "%s" %gpx' % (cr, t['sel'][:30], t['t'][:24], t['fs']))
    out[k] = (round(mins, 2), bad)
    print(k.ljust(12), 'min %.2f' % mins, 'fails', len(bad), '; '.join(bad[:6]))
json.dump(out, open(os.path.join(D, 'contrast.json'), 'w'), indent=1)
