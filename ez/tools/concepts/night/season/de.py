#!/usr/bin/python3
"""CIEDE2000 between each Season 2 direction's colour tokens and Season 1's (the terminal's :root tokens).
/usr/bin/python3 de.py  -> prints every token's dE00 per direction and fails any over 10. Tokens live in tokens.json."""
import json, math, os, sys
def rgb(h):
    h = h.lstrip('#'); return [int(h[i:i+2], 16) / 255 for i in (0, 2, 4)]
def lab(h):
    c = [((v + .055) / 1.055) ** 2.4 if v > .04045 else v / 12.92 for v in rgb(h)]
    X = (c[0]*.4124 + c[1]*.3576 + c[2]*.1805) / .95047; Y = c[0]*.2126 + c[1]*.7152 + c[2]*.0722; Z = (c[0]*.0193 + c[1]*.1192 + c[2]*.9505) / 1.08883
    f = lambda t: t ** (1/3) if t > 216/24389 else (24389/27 * t + 16) / 116
    return 116*f(Y) - 16, 500*(f(X) - f(Y)), 200*(f(Y) - f(Z))
def de00(a, b):
    L1, a1, b1 = lab(a); L2, a2, b2 = lab(b)
    C1, C2 = math.hypot(a1, b1), math.hypot(a2, b2); Cm = (C1 + C2) / 2
    G = .5 * (1 - math.sqrt(Cm**7 / (Cm**7 + 25**7)))
    a1p, a2p = (1 + G) * a1, (1 + G) * a2; C1p, C2p = math.hypot(a1p, b1), math.hypot(a2p, b2)
    h1 = math.degrees(math.atan2(b1, a1p)) % 360; h2 = math.degrees(math.atan2(b2, a2p)) % 360
    dL = L2 - L1; dC = C2p - C1p
    dh = 0 if C1p*C2p == 0 else (h2 - h1 if abs(h2 - h1) <= 180 else h2 - h1 - 360 if h2 > h1 else h2 - h1 + 360)
    dH = 2 * math.sqrt(C1p*C2p) * math.sin(math.radians(dh / 2))
    Lm = (L1 + L2) / 2; Cmp = (C1p + C2p) / 2
    hm = h1 + h2 if C1p*C2p == 0 else ((h1 + h2) / 2 if abs(h1 - h2) <= 180 else (h1 + h2 + 360) / 2 if h1 + h2 < 360 else (h1 + h2 - 360) / 2)
    T = 1 - .17*math.cos(math.radians(hm - 30)) + .24*math.cos(math.radians(2*hm)) + .32*math.cos(math.radians(3*hm + 6)) - .2*math.cos(math.radians(4*hm - 63))
    SL = 1 + .015*(Lm - 50)**2 / math.sqrt(20 + (Lm - 50)**2); SC = 1 + .045*Cmp; SH = 1 + .015*Cmp*T
    RT = -2 * math.sqrt(Cmp**7 / (Cmp**7 + 25**7)) * math.sin(math.radians(60 * math.exp(-((hm - 275) / 25)**2)))
    return math.sqrt((dL/SL)**2 + (dC/SC)**2 + (dH/SH)**2 + RT*(dC/SC)*(dH/SH))
def lum(h):
    c = [v/12.92 if v <= .03928 else ((v + .055)/1.055)**2.4 for v in rgb(h)]; return .2126*c[0] + .7152*c[1] + .0722*c[2]
def cr(a, b):
    x, y = sorted([lum(a), lum(b)]); return (y + .05) / (x + .05)
if __name__ == '__main__':
    T = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'tokens.json')))
    s1 = T['S1']; bad = 0
    for d in ('A', 'B', 'C'):
        row = []
        for k, v in s1.items():
            e = de00(v, T[d][k]); row.append((k, T[d][k], e)); bad += e > 10
        mx = max(r[2] for r in row)
        print(d, 'max dE00 %.1f' % mx, ' '.join('%s %s %.1f' % r for r in row))
        print('  text contrast on bg:', ' '.join('%s %.1f' % (k, cr(T[d][k], T[d]['bg'])) for k in ('tx', 'mu', 'up', 'dn', 'ac')), ' on pn:', ' '.join('%s %.1f' % (k, cr(T[d][k], T[d]['pn'])) for k in ('tx', 'mu', 'up', 'dn', 'ac')))
    print('S1 text contrast on bg:', ' '.join('%s %.1f' % (k, cr(s1[k], s1['bg'])) for k in ('tx', 'mu', 'mu2', 'up', 'dn', 'ac')))
    sys.exit(1 if bad else 0)
