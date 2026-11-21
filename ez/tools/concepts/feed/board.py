#!/usr/bin/python3
"""Boards for the Season 2 FEED mockups: /usr/bin/python3 tools/concepts/feed/board.py <shots dir> (from ez/; shots by run.js).
Writes ez/x2p-feed-F1..F4.png (390 and 1280 side by side), ez/x2p-feed-receipt.png (after grading, PREVIEW moves, Intuit only)
and the two X images ez/x2p-feed-teaser-T1.png / -T2.png at exactly 1080x1350. Phone shots are 2x, desktop 1x.
Boards are quantised to 256 colours (the terminal's palette is flat) so each file stays small: the disk is nearly full."""
import os, sys
from PIL import Image, ImageDraw, ImageFont
D = sys.argv[1]; EZ = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
F = '/usr/share/fonts/opentype/inter/Inter-SemiBold.otf'
F = F if os.path.exists(F) else '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
BG, TX, MU, AC = (6, 10, 8), (242, 237, 230), (142, 134, 128), (253, 188, 42)
LAYOUTS = {
 'F1': 'F1 The room: a chat per company, longs speak from the left, shorts from the right',
 'F2': 'F2 One card per company: the split as a bar of marks, then the five AIs',
 'F3': 'F3 Posts: each AI posts its reason, the trade attached like a link card',
 'F4': 'F4 The tape: one row per trade with its key line, a row opens to the whole reason',
}
def save(b, name):
    out = os.path.join(EZ, name)
    b.quantize(256, method=Image.Quantize.FASTOCTREE).save(out, optimize=True)
    print(out, b.size, '%.1f MB' % (os.path.getsize(out) / 1e6))
def board(title, sub, rows):
    """rows: list of lists of (image, label); each row's images side by side, rows stacked"""
    pad, gap, top = 60, 50, 170
    W = pad * 2 + max(sum(i.width for i, _ in r) + gap * (len(r) - 1) for r in rows)
    H = top + sum(max(i.height for i, _ in r) + 70 for r in rows) + pad
    b = Image.new('RGB', (W, H), BG); d = ImageDraw.Draw(b)
    sz = 40
    while sz > 16 and d.textlength(title, font=ImageFont.truetype(F, sz)) > W - 2 * pad: sz -= 1
    d.text((pad, 34), title, font=ImageFont.truetype(F, sz), fill=TX)
    d.text((pad, 34 + sz + 16), sub, font=ImageFont.truetype(F, 24), fill=MU)
    y, fl = top, ImageFont.truetype(F, 26)
    for r in rows:
        x = pad
        for im, lab in r:
            d.text((x, y), lab, font=fl, fill=AC); b.paste(im, (x, y + 44)); x += im.width + gap
        y += max(i.height for i, _ in r) + 70
    return b
img = lambda n: Image.open(os.path.join(D, n + '.png')).convert('RGB')
SUB = 'MOCKUP inside the live EZ Terminal · tonight\'s 15 real trades, newest first · the reasons are the AIs\' own words (calls.csv), one clause highlighted'
for k, t in LAYOUTS.items():
    save(board(t, SUB, [[(img(k + '-390'), 'Phone, 390px'), (img(k + '-1280'), 'Desktop, 1280px')]]), 'x2p-feed-%s.png' % k)
save(board('After grading: the receipt on the card, Intuit only (PREVIEW moves, not the close)',
           'P&L = side x move x $1,000 on $100K a trade · moves from pre-market prices at 7:26 AM ET Nov 20 (dopa/data/close-2026-11-20.json) · INTU -9.72%',
           [[(img('F1g-390'), 'F1 the room'), (img('F2g-390'), 'F2 card per company'), (img('F3g-390'), 'F3 posts'), (img('F4g-390'), 'F4 the tape (Grok opened)')],
            [(img('F2g-1280'), 'F2 desktop'), (img('F4g-1280'), 'F4 desktop')]]), 'x2p-feed-receipt.png')
for t in ('T1', 'T2'):
    im = img(t)
    if im.size != (1080, 1350):   # the frame is 4:5 by construction; guard against a rounding pixel
        im = im.resize((1080, round(im.height * 1080 / im.width))).crop((0, 0, 1080, 1350))
    out = os.path.join(EZ, 'x2p-feed-teaser-%s.png' % t); im.save(out, optimize=True); print(out, im.size, '%.1f MB' % (os.path.getsize(out) / 1e6))
