# /usr/bin/python3 board.py : ez/x2p-posts-board.png, every post image at half size with its idea and its post text under it.
from PIL import Image, ImageDraw, ImageFont
import os
EZ = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..'))
F = '/usr/share/fonts/opentype/inter/Inter-%s.otf'
fT, fS, fI, fP, fN = (ImageFont.truetype(F % w, s) for w, s in (('Bold', 34), ('SemiBold', 24), ('SemiBold', 17), ('Regular', 17), ('Regular', 14)))
BG, TX, MU, AC = (14, 12, 11), (242, 237, 230), (142, 134, 128), (253, 188, 42)
IDEA = {
 'a1': 'A1  The research draft. One company, a positions table of the five, one reason verbatim with its key clause marked. First line: two named models disagree. (A8 table, A14 marked message, 3c)',
 'a2': 'A2  The argument. The night\'s widest split, Gemini +11.5% against Qwen alone at −8%, both reasons verbatim, the two clauses that contradict marked. (A14 two models in conflict, A7, 3c)',
 'a3': 'A3  The whole night in one post. 15 trades on one grid, no reasons, GPT\'s all-LONG row lit. One post, so no second-post decay. (A8 to A13 had no reasoning, 3a)',
 'b1': 'B1  The research draft, graded. Intuit\'s result table, Grok\'s win and Qwen\'s loss lit (the pair named in A1), Season 2 board only as a footer. (5b, A8; standings-only F15 F16 flopped)',
 'b2': 'B2  The chart. Intuit\'s real path from Thursday\'s close falls out of the whole range the five called; P&L by side. (A9, A19, A20 plain charts)',
 'b3': 'B3  The whole close, led by one model\'s story: GPT LONG on all three, all three fell. The board is the grid\'s last column. (behaviour claim, the commonest winning hook in 1A: A19, A20)',
}
def wrap(d, text, font, w):
    out = []
    for para in text.split('\n'):
        if not para.strip(): out.append(''); continue
        line = ''
        for word in para.split(' '):
            t = (line + ' ' + word).strip()
            if d.textlength(t, font=font) <= w: line = t
            else: out.append(line); line = word
        out.append(line)
    return out
CW, CH, G, M = 540, 675, 34, 40
W = M * 2 + CW * 3 + G * 2
scratch = ImageDraw.Draw(Image.new('RGB', (10, 10)))
def cell_text(i):
    raw = open(f'{EZ}/x2p-post-{i}.txt').read().strip()
    note = ''
    if raw.startswith('['): note, raw = raw.split(']', 1); note = note[1:]; raw = raw.strip()
    return wrap(scratch, IDEA[i], fI, CW), wrap(scratch, raw, fP, CW), wrap(scratch, note, fN, CW) if note else []
rows = [('a', 'When the trades go in (posted before the report, as if last night)'), ('b', 'When they are graded at the close (PREVIEW numbers from pre-market prices)')]
layout, y = [], 112
for k, title in rows:
    ids = [k + '1', k + '2', k + '3']; T = [cell_text(i) for i in ids]
    th = max(len(a) * 23 + 14 + len(b) * 24 + (len(c) * 19 + 10 if c else 0) for a, b, c in T)
    layout.append((title, y, ids, T)); y += 46 + CH + 18 + th + 40
H = y
im = Image.new('RGB', (W, H), BG); d = ImageDraw.Draw(im)
d.text((M, 40), 'EZ on X: post samples for the first close of Season 2', font=fT, fill=TX)
for title, y0, ids, T in layout:
    d.text((M, y0), title, font=fS, fill=AC)
    for n, (i, (a, b, c)) in enumerate(zip(ids, T)):
        x = M + n * (CW + G); yy = y0 + 46
        im.paste(Image.open(f'{EZ}/x2p-post-{i}.png').convert('RGB').resize((CW, CH), Image.LANCZOS), (x, yy)); yy += CH + 18
        for l in a: d.text((x, yy), l, font=fI, fill=AC); yy += 23
        yy += 14
        for l in c: d.text((x, yy), l, font=fN, fill=MU); yy += 19
        if c: yy += 10
        for l in b: d.text((x, yy), l, font=fP, fill=TX); yy += 24
im.save(f'{EZ}/x2p-posts-board.png', optimize=True)
print(W, H, os.path.getsize(f'{EZ}/x2p-posts-board.png'))
