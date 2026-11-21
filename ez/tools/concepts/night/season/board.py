#!/usr/bin/python3
"""Boards for the season system: /usr/bin/python3 board.py <shots dir> <transition dir>   (from anywhere)
Writes ez/x2p-night-season-<A|B|C>-<390|1280>.png: Season 1 (the live terminal plus the switch) beside the Season 2 kit, tab by tab
(Leaderboard, Upcoming, then the new Feed tab), with the kit's faces and colour tokens (and each token's dE00 from Season 1) in the header;
the 390 board also carries the switch's transition frozen at 0, 120, 260, 420, 620 and 1000 ms."""
import os, sys, json
from PIL import Image, ImageDraw, ImageFont
D, TD = sys.argv[1], sys.argv[2]; H = os.path.dirname(os.path.abspath(__file__)); EZ = os.path.abspath(os.path.join(H, '../../../..'))
sys.path.insert(0, H); from de import de00
F = '/usr/share/fonts/opentype/inter/Inter-SemiBold.otf'
F = F if os.path.exists(F) else '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
BG = (12, 11, 10); TX = (242, 237, 230); MU = (142, 134, 128); AC = (253, 188, 42)
T = json.load(open(os.path.join(H, 'tokens.json')))
KIT = {'A': ('S2-A  Glass', 'Kanit (heads, names) + Manrope (numbers, UI)', 'frosted glass over a painted ground, floating cards, the leader as a ticket with a travelling gold rim', 'the old season frosts over, the new one resolves out of the frost'),
       'B': ('S2-B  Broadcast', 'Archivo, condensed for names, expanded for numbers', 'full-bleed bands, rank rail, team-colour bars, angled plates, a right rail on desktop', 'a slanted stinger wipe with a gold, green and red band on its edge'),
       'C': ('S2-C  The why', 'Newsreader (heads, numbers, the AIs\' words) + Bricolage Grotesque (labels)', 'no boxes: rules, a hanging margin, one reading column, each AI\'s latest reason under its row', 'the new season is set from the top, a gold rule riding the edge')}
def f(s): return ImageFont.truetype(F, s)
def board(k, w):
    s = 2 if w < 500 else 1
    cols = [('s1lb', 'Season 1 · Leaderboard (live today)'), ('lb', 'Season 2 · Leaderboard'), ('s1up', 'Season 1 · Upcoming (live today)'), ('up', 'Season 2 · Upcoming'), ('fd', 'Season 2 · Feed (new tab)')]
    ims = [(Image.open(os.path.join(D, '%s-%s-%d.png' % (k, n, w))).convert('RGB'), lab) for n, lab in cols]
    if w >= 500:   # desktop: two columns, Season 1 left and Season 2 right, a row per tab
        grid = [[ims[0], ims[1]], [ims[2], ims[3]], [(None, 'Season 1 has no Feed tab'), ims[4]]]
        cw = 1280; gap = 40; pad = 40; top = 300
        rh = [max((im.height if im else 200) for im, _ in r) for r in grid]
        W = pad * 2 + cw * 2 + gap; Hh = top + sum(rh) + 70 * len(grid) + pad
        b = Image.new('RGB', (W, Hh), BG); d = ImageDraw.Draw(b); y = top
        for r, h in zip(grid, rh):
            for i, (im, lab) in enumerate(r):
                x = pad + i * (cw + gap); d.text((x, y), lab, font=f(26), fill=AC if im else MU)
                if im: b.paste(im, (x, y + 44))
            y += h + 70
    else:
        gap = 40; pad = 50; top = 360
        tr = [Image.open(os.path.join(TD, '%s-up-%d.png' % (k, t))).convert('RGB') for t in (0, 120, 260, 420, 620, 1000)]
        tr = [im.crop((0, 0, 780, 1400)).resize((520, 933)) for im in tr]
        th = 933 + 60
        W = pad * 2 + sum(im.width for im, _ in ims) + gap * (len(ims) - 1)
        Hh = top + th + 70 + max(im.height for im, _ in ims) + 60 + pad
        b = Image.new('RGB', (W, Hh), BG); d = ImageDraw.Draw(b)
        d.text((pad, top - 10), 'The switch, tapped: Season 1 to Season 2 (the real View Transition, frozen)', font=f(34), fill=AC)
        x = pad
        for im, t in zip(tr, (0, 120, 260, 420, 620, 1000)):
            d.text((x, top + 40), '%d ms' % t, font=f(26), fill=MU); b.paste(im, (x, top + 80)); x += im.width + 24
        y = top + th + 70; x = pad
        for im, lab in ims:
            d.text((x, y), lab, font=f(30), fill=AC); b.paste(im, (x, y + 50)); x += im.width + gap
    name, faces, shape, motion = KIT[k]
    d.text((40, 30), 'Season system · %s · %dpx · MOCKUP inside the live terminal' % (name, w), font=f(44), fill=TX)
    d.text((40, 96), 'Faces: Season 1 Inter + Geist Mono  →  %s.   Fixed in both seasons: the EZ. mark and the logotype EARNINGS ZEASON (Kanit italic 800)' % faces, font=f(24), fill=MU)
    d.text((40, 132), 'Shapes and grid: %s.   Motion: %s' % (shape, motion), font=f(24), fill=MU)
    x = 40; y = 180
    for tk in ('bg', 'pn', 'ln', 'tx', 'mu', 'up', 'dn', 'ac'):
        a, c = T['S1'][tk], T[k][tk]; e = de00(a, c)
        d.rectangle((x, y, x + 36, y + 36), fill=a); d.rectangle((x + 40, y, x + 76, y + 36), fill=c, outline=(60, 60, 60))
        d.text((x + 84, y + 6), '%s %.1f' % (tk, e), font=f(22), fill=MU); x += 200
    d.text((x + 10, y + 6), 'S1 | S2 swatch, dE00 (all under 10)', font=f(22), fill=MU)
    out = os.path.join(EZ, 'x2p-night-season-%s-%d.png' % (k, w)); b.save(out, optimize=True)
    if os.path.getsize(out) > 9e6: b.quantize(256, method=Image.Quantize.FASTOCTREE).save(out, optimize=True)
    print(out, b.size, '%.1f MB' % (os.path.getsize(out) / 1e6))
for k in 'ABC':
    for w in (390, 1280): board(k, w)
