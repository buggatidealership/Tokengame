#!/usr/bin/python3
"""Boards for feed desk B: /usr/bin/python3 tools/concepts/night/feed-b/board.py <shots dir> (from ez/).
Each mockup's states side by side under a label, on the terminal's ground: ez/x2p-night-pm<n>-390.png and -1280.png.
Phone shots are 2x (780 px wide each), desktop shots 1x. A board over 3 MB is quantised to 256 colours."""
import os, sys
from PIL import Image, ImageDraw, ImageFont
D = sys.argv[1]; EZ = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))))
F = '/usr/share/fonts/opentype/inter/Inter-SemiBold.otf'
F = F if os.path.exists(F) else '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
BG = (6, 10, 8)
PM = {
 6: ('PM6 Compact · the tape: one row per trade, the side the biggest word, the key clause in one line, a row opens to the reason and our reading',
     {390: [('PM6-in', 'Calls in · Fri 1:09 PM · Grok open'), ('PM6-g', 'Graded · Fri 6:30 PM · Claude open'), ('PM6-pre', 'Report day · Thu 2:21 PM · 2 of 5 in')],
      1280: [('PM6-in', 'Calls in · one line per trade · Grok open'), ('PM6-g', 'Graded · RESULT column · Claude open')]}),
 7: ('PM7 Three columns: companies, the feed, the open post with its whole case (reason, our reading, the AI\'s notes, what would prove it wrong)',
     {390: [('PM7-in', 'Calls in · the feed, one company'), ('PM7-sheet', 'A post opened as a sheet'), ('PM7-g', 'Graded · Claude open')],
      1280: [('PM7-in', 'Calls in · Grok open'), ('PM7-g', 'Graded · Claude open, its Season 2 record')]}),
 8: ('PM8 Report day, live: the lock countdown, five slots that fill, "not in yet" for the missing, the newest reason landing (arrival order and times illustrative)',
     {390: [('PM8-pre', 'Thu 2:21 PM · 2 of 5 in · GPT just in'), ('PM8-lock', 'Thu 3:01 PM · 5 of 5 · locked'), ('PM8-wait', 'Thu 9:30 PM · reported · waiting for Friday\'s close')],
      1280: [('PM8-pre', 'Thu 2:21 PM · three reports side by side'), ('PM8-lock', 'Thu 3:01 PM · all locked')]}),
 9: ('PM9 Plain words first: our reading leads, labelled as ours, each sentence numbered to the AI\'s own clause it restates, one tap from the AI\'s words',
     {390: [('PM9-in', 'Plain words first'), ('PM9-src', 'Claude opened · its sources lit'), ('PM9-ai', 'Switched: the AI\'s words first')],
      1280: [('PM9-in', 'Parallel text: our reading | the AI\'s words'), ('PM9-src', 'Claude\'s sources lit')]}),
 10: ('PM10 Graded: the day\'s verdict on top, every post with its receipt (RIGHT or WRONG, P&L), wrong calls as visible as right ones, filters',
     {390: [('PM10-g', 'After Friday\'s close · all 15'), ('PM10-right', 'Filter: RIGHT (5)'), ('PM10-wrong', 'Filter: WRONG · Intuit')],
      1280: [('PM10-g', 'All 15 · verdict rail + two columns'), ('PM10-right', 'Filter: RIGHT (5)')]}),
}
def board(n, w):
    title, S = PM[n]; shots = S[w]
    ims = [(Image.open(os.path.join(D, '%s-%d.png' % (s, w))).convert('RGB'), lab) for s, lab in shots]
    s2 = w < 500
    pad, top, gap = (48 if s2 else 36), (170 if s2 else 116), 40
    W = pad * 2 + sum(i.width for i, _ in ims) + gap * (len(ims) - 1)
    H = top + max(i.height for i, _ in ims) + pad
    b = Image.new('RGB', (W, H), BG); d = ImageDraw.Draw(b)
    sz = 36 if s2 else 26
    while sz > 14 and d.textlength(title, font=ImageFont.truetype(F, sz)) > W - 2 * pad: sz -= 1
    ft = ImageFont.truetype(F, sz); fl = ImageFont.truetype(F, 26 if s2 else 18)
    d.text((pad, 22 if s2 else 14), title, font=ft, fill=(242, 237, 230))
    d.text((pad, (22 if s2 else 14) + sz + 12), 'MOCKUP inside the live terminal (v53-terminal.html), %dpx · the 15 real Season 2 calls, every word from calls.csv' % w, font=fl, fill=(163, 155, 148))
    x = pad
    for im, lab in ims:
        d.text((x, top - (44 if s2 else 30)), lab, font=fl, fill=(253, 188, 42))
        b.paste(im, (x, top)); x += im.width + gap
    out = os.path.join(EZ, 'x2p-night-pm%d-%d.png' % (n, w))
    b.save(out, optimize=True)
    if os.path.getsize(out) > 3e6:
        b.quantize(256, method=Image.Quantize.FASTOCTREE).save(out, optimize=True)
    print(out, b.size, '%.1f MB' % (os.path.getsize(out) / 1e6))
for n in PM:
    for w in (390, 1280):
        board(n, w)
