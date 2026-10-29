# python3 board.py <shots dir> : the gallery world's boards into ez/ (phone: first five screens + three rooms further in; desktop: three screens)
import sys, os
from PIL import Image, ImageDraw, ImageFont
S = sys.argv[1]
EZ = os.path.normpath(os.path.join(os.path.dirname(__file__), '../../../..'))
F = '/usr/share/fonts/truetype/dejavu/'
def font(n, s): return ImageFont.truetype(F + n, s)
BG, INK, DIM = (239, 231, 214), (21, 19, 26), (90, 84, 96)

def board(rows, scale, out, title, sub):
    pad, gap, lab = 40, 26, 54
    tiles = [[(Image.open(os.path.join(S, f)).convert('RGB'), l) for f, l in r] for r in rows]
    tiles = [[(im.resize((int(im.width * scale), int(im.height * scale)), Image.LANCZOS), l) for im, l in r] for r in tiles]
    W = pad * 2 + max(sum(im.width for im, _ in r) + gap * (len(r) - 1) for r in tiles)
    H = 150 + sum(max(im.height for im, _ in r) + lab + gap for r in tiles) + pad
    B = Image.new('RGB', (W, H), BG); d = ImageDraw.Draw(B)
    d.text((pad, 36), title, font=font('DejaVuSerif-Bold.ttf', 34), fill=INK)
    d.text((pad, 86), sub, font=font('DejaVuSans.ttf', 18), fill=DIM)
    y = 150
    for r in tiles:
        x = pad
        for im, l in r:
            d.text((x, y), l, font=font('DejaVuSansMono.ttf', 17), fill=INK)
            B.paste(im, (x, y + lab - 16)); d.rectangle([x - 1, y + lab - 17, x + im.width, y + lab - 16 + im.height], outline=(180, 172, 156))
            x += im.width + gap
        y += max(im.height for im, _ in r) + lab + gap
    B.save(out); print(out, B.size)

board([[('we-390-s0.png', '1 · Entrance wall'), ('we-390-s1.png', '2 · Orientation film, floor plan'), ('we-390-s2.png', '3 · Door to Room 1, the artists'),
        ('we-390-s3.png', '4 · Room 1 (cont.)'), ('we-390-s4.png', '5 · Room 2, the collection')],
       [('we-390-we-r3.png', 'Further in · Room 3, smart or lucky (coins tossed)'), ('we-390-we-r4.png', 'Room 4 · next exhibition'), ('we-390-we-r5.png', 'Exit · gift shop')]],
      0.5, os.path.join(EZ, 'x2p-world-gallery-phone.png'), 'World: the exhibition (phone, 390x844)',
      'Top row: the first five screens of the scroll. Bottom row: the rooms further in. Every number from ez-data.js; the films and graded cases are the page\'s own.')
board([[('we-1536-s0.png', '1 · Entrance wall: title, statement, floor plan, orientation film')],
       [('we-1536-we-r2.png', '2 · Room 2, the collection: the eight newest cases on the wall')],
       [('we-1536-we-r3.png', '3 · Room 3, smart or lucky: toss a coin for every call')]],
      0.62, os.path.join(EZ, 'x2p-world-gallery-desktop.png'), 'World: the exhibition (desktop, 1536x864)',
      'Three screens. The wayfinding bar at the foot follows you from room to room.')
