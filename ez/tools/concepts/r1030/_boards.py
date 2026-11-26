# r1030 boards: standings F1-F5, proof P1-P5 x four tabs -> ez/x2p-r1030-*.png
import sys
from PIL import Image, ImageDraw, ImageFont
S = '/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/r1030/'
OUT = '/home/user/Tokengame/ez/'
F = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 40)
f = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 28)

def board(cols, out, scale=2):
    # cols: list of (title, sub, [images top to bottom])
    W = 1170; G = 60
    hs = [sum(Image.open(S + p).size[1] for p in ps) + G * (len(ps) - 1) for _, _, ps in cols]
    B = Image.new('RGB', (len(cols) * (W + G) + G, max(hs) + 200), (16, 15, 22))
    d = ImageDraw.Draw(B)
    for k, (t, sub, ps) in enumerate(cols):
        x = G + k * (W + G); y = 40
        d.text((x, y), t, fill=(253, 188, 42), font=F); d.text((x, y + 54), sub, fill=(220, 210, 190), font=f)
        y = 160
        for p in ps:
            im = Image.open(S + p).convert('RGB'); B.paste(im, (x, y)); y += im.size[1] + G
    B = B.resize((B.size[0] // scale, B.size[1] // scale), Image.LANCZOS)
    B.save(OUT + out); print(out, B.size)

board([('F1', 'Live tickets, stitched + P&L line', ['F1.png']),
       ('F2', 'Tickets spaced like E1, stitched', ['F2.png']),
       ('F3', 'E1 on the logo cream', ['F3.png']),
       ('F4', 'Cream e-ticket per AI, stitched', ['F4.png']),
       ('F5', 'Tickets with the full P&L chart', ['F5.png'])], 'x2p-r1030-standings.png')
T = ['pnl', 'acc', 'tgt', 'sec']
board([('P1', 'E1 on the logo cream', ['P1-%s.png' % t for t in T]),
       ('P2', 'The board\'s ticket stock, bands + stitch', ['P2-%s.png' % t for t in T]),
       ('P3', 'White wallet pass, black bar', ['P3-%s.png' % t for t in T]),
       ('P4', 'Boarding pass, R1 to R46', ['P4-%s.png' % t for t in T]),
       ('P5', 'Receipt, torn edges', ['P5-%s.png' % t for t in T])], 'x2p-r1030-proof-all.png', 3)
board([('P%d' % i, s, ['P%d-pnl.png' % i]) for i, s in [(1, 'E1 on the logo cream'), (2, 'Ticket stock, bands + stitch'), (3, 'White wallet pass'), (4, 'Boarding pass'), (5, 'Receipt')]], 'x2p-r1030-proof-pnl.png')
