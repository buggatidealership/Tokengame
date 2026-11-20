#!/usr/bin/python3
"""Boards for the Season 2 terminal mockups: /usr/bin/python3 tools/concepts/s2site/board.py <shots dir> (from ez/).
Puts each take's screenshots side by side under a label, on the terminal's ground, and writes ez/x2p-s2site-<take>-<390|1280>.png.
Phone shots are 2x (780px wide each); desktop shots 1x. Boards are capped so each file stays under ~3 MB."""
import os, sys
from PIL import Image, ImageDraw, ImageFont
D = sys.argv[1]; EZ = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
F = '/usr/share/fonts/opentype/inter/Inter-SemiBold.otf'
F = F if os.path.exists(F) else '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
BG = (6, 10, 8)
TAKES = {
 'a': ('Take A · season switch', [('A-s2', 'Season 2 tab (default)'), ('A-s1', 'Season 1 tab')]),
 'b': ('Take B · Season 1 champion strip, no tabs', [('B', 'Default'), ('B-open', 'Strip opened: Season 1 final')]),
 'c': ('Take C · Upcoming in Season 2 (Fri Nov 20, 1:09 PM EST)', [('C', 'Upcoming')]),
 'd': ('Take D · after tonight\'s close · EXAMPLE move, no result yet', [('D', 'Leaderboard, 6:30 PM EST')]),
}
def board(key, w):
    title, shots = TAKES[key]
    ims = [(Image.open(os.path.join(D, '%s-%d.png' % (n, w))).convert('RGB'), lab) for n, lab in shots]
    s = 2 if w < 500 else 1
    pad, top, gap = 40 * s // 1, 150 if s == 2 else 104, 40
    W = pad * 2 + sum(i.width for i, _ in ims) + gap * (len(ims) - 1)
    H = top + max(i.height for i, _ in ims) + pad
    b = Image.new('RGB', (W, H), BG); d = ImageDraw.Draw(b)
    ft = ImageFont.truetype(F, 34 if s == 2 else 26); fl = ImageFont.truetype(F, 24 if s == 2 else 18)
    sz = 34 if s == 2 else 26   # the title fits the board: two lines, the first stepped down until it fits
    while sz > 14 and d.textlength(title, font=ImageFont.truetype(F, sz)) > W - 2 * pad: sz -= 1
    ft = ImageFont.truetype(F, sz)
    d.text((pad, 20 if s == 2 else 14), title, font=ft, fill=(242, 237, 230))
    d.text((pad, (20 if s == 2 else 14) + sz + 10), 'MOCKUP inside the live terminal, %dpx' % w, font=fl, fill=(142, 134, 128))
    x = pad
    for im, lab in ims:
        d.text((x, top - (40 if s == 2 else 30)), lab, font=fl, fill=(253, 188, 42))
        b.paste(im, (x, top)); x += im.width + gap
    out = os.path.join(EZ, 'x2p-s2site-%s-%d.png' % (key, w))
    b.save(out, optimize=True)
    if os.path.getsize(out) > 3e6:   # keep boards small: quantise to 256 colours (the terminal's palette is flat)
        b.quantize(256, method=Image.Quantize.FASTOCTREE).save(out, optimize=True)
    print(out, b.size, '%.1f MB' % (os.path.getsize(out) / 1e6))
for k in TAKES:
    for w in (390, 1280):
        board(k, w)
