# /usr/bin/python3 board.py <shots dir> : the phone board (takes A to C x four views at 390) and the desktop board (P&L at 1280)
import sys, os
from PIL import Image, ImageDraw, ImageFont
D = sys.argv[1]; OUT = '/home/user/Tokengame/ez'
def font(sz, bold=True):
    for f in ['/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf' if bold else '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf']:
        if os.path.exists(f): return ImageFont.truetype(f, sz)
    return ImageFont.load_default()
BG = (11, 10, 20); INK = (243, 234, 211); GOLD = (242, 182, 50); DIM = (170, 160, 140)
TAKES = {'A': 'A  Folder tabs: rounded tabs cut from the card, the closed ones a step lower and darker',
         'B': 'B  Ticket stubs: square stubs, a perforation and a notch between them, the closed ones torn along a row of holes',
         'C': 'C  Skyline: the open tab the tallest, each further tab a step lower and a shade darker'}
VIEWS = [('roi', 'P&L'), ('hit', 'Accuracy'), ('miss', 'Target hits'), ('sector', 'Sector')]
def board(name, width, views, scale, title, note):
    cells = {t: [Image.open(f'{D}/pr2-{t}-{width}-{v}-sim.png') for v, _ in views] for t in TAKES}
    cells = {t: [im.resize((int(im.width * scale), int(im.height * scale)), Image.LANCZOS) for im in ims] for t, ims in cells.items()}
    cw = max(im.width for ims in cells.values() for im in ims); ch = max(im.height for ims in cells.values() for im in ims)
    pad, head, lab = 40, 150, 96
    W = pad * 2 + len(views) * cw + (len(views) - 1) * 24; H = head + len(TAKES) * (lab + ch + 30) + pad
    o = Image.new('RGB', (W, H), BG); g = ImageDraw.Draw(o)
    g.text((pad, 34), title, font=font(40), fill=INK); g.text((pad, 92), note, font=font(22, False), fill=DIM)
    y = head
    for t, ims in cells.items():
        g.text((pad, y + 18), TAKES[t], font=font(26), fill=GOLD)
        for i, im in enumerate(ims):
            x = pad + i * (cw + 24)
            if len(views) > 1: g.text((x + 10, y + lab - 26), views[i][1], font=font(20, False), fill=DIM)
            o.paste(im, (x, y + lab))
        y += lab + ch + 30
    o.save(f'{OUT}/{name}', optimize=True); print(name, o.size)
board('x2p-proof-r2-phone.png', 390, VIEWS, 0.72, 'Proof card, round 2: the tabs are the card\'s top edge  (390px)',
      'The question under the tabs as the headline, the chart first, the rows under it. P&L rows: Last 24h, Last 7d, P&L. "Now" = Wed 28 Oct 2026, 5:00 pm New York (R54 to R57 graded at that close).')
#board('x2p-proof-r2-desktop.png', 1280, VIEWS[:1], 0.75, 'Proof card, round 2: P&L at 1280px',
#      'Same takes on desktop (the card is capped at 600px in its column). "Now" = Wed 28 Oct 2026, 5:00 pm New York.')

def desk():
    ims = [Image.open(f'{D}/pr2-{t}-1280-roi-sim.png') for t in TAKES]
    ims = [im.resize((int(im.width * .6), int(im.height * .6)), Image.LANCZOS) for im in ims]
    pad, head = 40, 170; cw = max(i.width for i in ims); ch = max(i.height for i in ims)
    W = pad * 2 + 3 * cw + 2 * 30; H = head + 60 + ch + pad
    o = Image.new('RGB', (W, H), BG); g = ImageDraw.Draw(o)
    g.text((pad, 34), 'Proof card, round 2: P&L at 1280px (the card is 560px wide in its column)', font=font(36), fill=INK)
    g.text((pad, 92), '"Now" = Wed 28 Oct 2026, 5:00 pm New York. At the real clock (28 Oct, 9:13 pm New York) the same rounds count, so the figures are identical.', font=font(20, False), fill=DIM)
    for i, (t, im) in enumerate(zip(TAKES, ims)):
        x = pad + i * (cw + 30); g.text((x, head + 10), TAKES[t].split(':')[0], font=font(26), fill=GOLD); o.paste(im, (x, head + 60))
    o.save(f'{OUT}/x2p-proof-r2-desktop.png', optimize=True); print('desktop', o.size)
desk()
