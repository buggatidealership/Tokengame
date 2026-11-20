#!/usr/bin/python3
"""Boards for feed product desk A: /usr/bin/python3 tools/concepts/night/feed-a/board.py <shots dir> (from ez/).
Each mockup's three states side by side under its name and single-minded line, on the terminal's ground:
ez/x2p-night-pm<n>-390.png (phone shots at 2x) and ez/x2p-night-pm<n>-1280.png (desktop at 1x). A shot cut at the board's height
(the page runs on) gets a fade and the page's full height under it."""
import os, sys
from PIL import Image, ImageDraw, ImageFont
D = sys.argv[1]; EZ = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))))
F = '/usr/share/fonts/opentype/inter/Inter-SemiBold.otf'
F = F if os.path.exists(F) else '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
BG = (9, 8, 8)
PM = {
 1: ('PM1 Timeline', 'Every AI\'s reason in its own words, newest first, each one showing where it sits against the other four'),
 2: ('PM2 By company', 'One card a company: the LONG v SHORT split first, then each AI\'s key line, one tap to the whole reason'),
 3: ('PM3 LONG v SHORT', 'One company, the LONG reasons facing the SHORT reasons, most confident first, and after the close which side was right'),
 4: ('PM4 The post page', 'One trade in full: every field the AI wrote under its own label, our plain reading, and the receipt once graded'),
 5: ('PM5 The AI\'s own feed', 'One AI\'s record, its trades and its own test of being wrong, written before the report, then the result'),
}
ST = [('pre', 'Trades coming in|Thu Nov 19 1:30 PM ET · EXAMPLE arrival order'), ('in', 'All 15 trades in|Thu Nov 19 3:45 PM ET'), ('g', 'Graded at the close|Fri Nov 20 6:30 PM ET')]
def board(n, w):
    title, line = PM[n]; s = 2 if w < 500 else 1
    ims = []
    for k, lab in ST:
        f = os.path.join(D, 'PM%d-%s-%d.png' % (n, k, w)); im = Image.open(f).convert('RGB')
        cut = os.path.join(D, 'PM%d-%s-%d.cut' % (n, k, w)); full = int(open(cut).read()) if os.path.exists(cut) else 0
        if full:   # fade the cut edge so it reads as "the page continues"
            fd = Image.new('RGB', im.size, BG); m = Image.new('L', im.size, 0); dm = ImageDraw.Draw(m); hh = 90 * s
            for y in range(hh): dm.line([(0, im.height - hh + y), (im.width, im.height - hh + y)], fill=int(255 * (y / hh) ** 1.4))
            im = Image.composite(fd, im, m)
        ims.append((im, lab, full))
    pad, gap = 44 * s // (2 if s == 2 else 1) + (20 if s == 2 else 0), 44 if s == 2 else 36
    top = 250 if s == 2 else 176
    W = pad * 2 + sum(i.width for i, _, _ in ims) + gap * (len(ims) - 1); H = top + max(i.height for i, _, _ in ims) + (90 if s == 2 else 60)
    b = Image.new('RGB', (W, H), BG); d = ImageDraw.Draw(b)
    sz = 40 if s == 2 else 30; ft = ImageFont.truetype(F, sz); fl = ImageFont.truetype(F, 26 if s == 2 else 19); fs = ImageFont.truetype(F, 22 if s == 2 else 16)
    d.text((pad, 24 if s == 2 else 16), title, font=ft, fill=(242, 237, 230))
    ls = 28 if s == 2 else 20
    while ls > 12 and d.textlength(line, font=ImageFont.truetype(F, ls)) > W - 2 * pad: ls -= 1
    d.text((pad, (24 if s == 2 else 16) + sz + 14), line, font=ImageFont.truetype(F, ls), fill=(253, 188, 42))
    d.text((pad, (24 if s == 2 else 16) + sz + 14 + ls + 12), 'MOCKUP inside the live EZ Terminal (v53), %dpx · the 15 real Season 2 trades from calls.csv' % w, font=fs, fill=(163, 155, 148))
    x = pad
    for im, lab, full in ims:
        a, bb = lab.split('|'); d.text((x, top - (76 if s == 2 else 54)), a, font=fl, fill=(253, 188, 42)); d.text((x, top - (40 if s == 2 else 28)), bb, font=fs, fill=(163, 155, 148))
        b.paste(im, (x, top))
        if full: d.text((x, top + im.height + 14), 'page continues, %d px in all' % full, font=fs, fill=(163, 155, 148))
        x += im.width + gap
    out = os.path.join(EZ, 'x2p-night-pm%d-%d.png' % (n, w))
    b.save(out, optimize=True)
    if os.path.getsize(out) > 3.2e6: b.quantize(256, method=Image.Quantize.FASTOCTREE).save(out, optimize=True)
    print(out, b.size, '%.1f MB' % (os.path.getsize(out) / 1e6))
for n in (sys.argv[2].split(',') if len(sys.argv) > 2 else PM):
    for w in (390, 1280): board(int(n), w)
