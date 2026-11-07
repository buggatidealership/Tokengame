#!/usr/bin/env python3
"""H30 C boards. python3 board.py <shotdir> <W> <out.png>  (sections side by side, the 664 line marked)
                python3 board.py <shotdir> D<W> <out.png> (desktop full page, scaled)"""
import sys, json, os
from PIL import Image, ImageDraw, ImageFont
d, w, out = sys.argv[1], sys.argv[2], sys.argv[3]
def font(s):
    for p in ['/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf','/usr/share/fonts/dejavu/DejaVuSans-Bold.ttf']:
        if os.path.exists(p): return ImageFont.truetype(p, s)
    return ImageFont.load_default()
BG=(20,22,30); INK=(248,240,217); MAG=(255,0,200)
if w.startswith('D'):
    im = Image.open(os.path.join(d, f'd{w[1:]}.png')).convert('RGB')
    k = 1400/im.width if im.width > 1400 else 1
    im = im.resize((round(im.width*k), round(im.height*k)), Image.LANCZOS)
    c = Image.new('RGB', (im.width+60, im.height+90), BG); c.paste(im, (30, 70))
    ImageDraw.Draw(c).text((30, 22), f'H30 C · The live race · desktop {w[1:]}px, full page ({im.height/k:.0f}px tall)', fill=INK, font=font(26))
    c.save(out, optimize=True); sys.exit()
W = int(w); meta = json.load(open(os.path.join(d, f'w{W}.json')))['m']; secs = meta['secs']
names = ['First frame','How a round works',"Who's winning",'Every round so far','Smart or lucky?','Bet #1: NVIDIA','Next round']
ims = [Image.open(os.path.join(d, f'w{W}-s{i+1}.png')).convert('RGB') for i in range(len(secs))]
S = ims[0].width / W  # device scale
gap, top = int(28*S), int(92*S)
H = max(max(i.height for i in ims), int(664*S)) + top + int(30*S)
c = Image.new('RGB', (sum(i.width for i in ims) + gap*(len(ims)+1), H), BG); dr = ImageDraw.Draw(c)
x = gap
for k, (im, s) in enumerate(zip(ims, secs)):
    c.paste(im, (x, top))
    y = top + int(664*S)
    for xx in range(x - int(10*S), x + im.width + int(10*S), int(14*S)):
        dr.line([(xx, y), (xx + int(8*S), y)], fill=MAG, width=max(2, int(2*S)))
    dr.text((x, int(12*S)), f'{k+1:02d} · {names[k] if k < len(names) else s["id"]}', fill=INK, font=font(int(17*S)))
    ok = s['frame'] <= 664
    dr.text((x, int(40*S)), f'{s["frame"]:.0f}px {"<=" if ok else ">"} 664 · {s["words"]} words + {s["figs"]} figures', fill=(140,255,180) if ok else (255,120,110), font=font(int(13*S)))
    dr.text((x + im.width - int(150*S), y + int(4*S)), '664 px (phone frame)', fill=MAG, font=font(int(11*S)))
    x += im.width + gap
k = 0.75 if S >= 2 else 1
c = c.resize((round(c.width*k), round(c.height*k)), Image.LANCZOS)
c.save(out, optimize=True)
print(out, c.size)
