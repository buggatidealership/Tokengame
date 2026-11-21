# The owner's screenshot of the X3+ bet section with numbered marks and a glossary of what each part is called (2026-10-31).
from PIL import Image, ImageDraw, ImageFont
import sys, textwrap
src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGB'); k = im.width / 857
F = '/usr/share/fonts/truetype/dejavu/'
fb = lambda s: ImageFont.truetype(F + 'DejaVuSans-Bold.ttf', s); fr = lambda s: ImageFont.truetype(F + 'DejaVuSans.ttf', s)
M = [  # n, x, y (in the 857-wide view), term, what it is, say it like
 (1, 430, 470, 'Establishing shot (opening panel)', 'The first, biggest picture of the chapter: it shows where we are and what is at stake (the vault, full of gold).', '"the opening panel"'),
 (2, 735, 330, 'Atmosphere and lighting', 'Rain, night and one warm key light from inside the vault. One light source for the whole picture is a big part of why it looks expensive.', '"the lighting", "the key light", "the mood"'),
 (3, 640, 690, 'Display lettering (the title)', 'Big hand-drawn-style letters with an extruded 3D edge and a drop shadow. It sits over the panel\'s bottom edge: "breaking the border".', '"the title lettering"'),
 (4, 735, 805, 'Caption', 'Narration text, set in a hand-lettered comic font, not inside a box.', '"the caption"'),
 (5, 430, 868, 'Gutter', 'The black gap between two panels. Comics read the jump from panel to panel across it.', '"the gutter"'),
 (6, 165, 1180, 'Panel art (the painted plate)', 'A painted picture used as the panel\'s whole surface: here a circuit board.', '"the panel art", "the plate"'),
 (7, 600, 1135, 'Diegetic display (live data in the art)', 'The countdown is a real, live number, but it is shown inside the world of the picture (in the chip\'s glowing windows), not on a box laid over it. This is the key quality you like.', '"the number lives in the picture"'),
 (8, 160, 1170, 'Silkscreen labels', 'The small printed words on a circuit board (DAYS, HRS, MIN, SEC), as real boards carry them.', '"the printed labels"'),
 (9, 710, 1320, 'Hero shot with depth of field', 'A product-photo style picture: the objects sharp, the background soft and blurred (bokeh). It makes the parts feel like real, touchable things.', '"the hero shot", "the blurred background"'),
 (10, 62, 1295, 'Reference designators', 'C1, U1, K1: the real names engineers print next to parts on a board (C = capacitor, U = chip, K = relay). Borrowed as our labels.', '"the part tags"'),
 (11, 738, 1470, 'Indicator lamps (LEDs)', 'Green and red lights on the switch: right or wrong. Now they glow in turn: the outcome is still open.', '"the lamps"'),
 (12, 290, 1590, 'Traces', 'The gold lines that connect the parts on the board: the pool flows into the call, the call into the switch. The story is in the wiring.', '"the wiring", "the traces"'),
 (13, 430, 1688, 'Leader lines and a rule', 'Lines that lead from each part down to its explanation, and the dashed line (a rule) that divides picture from text.', '"the callout lines"'),
 (14, 215, 1758, 'Callouts (a legend)', 'The explanation of each part, under its tag: a subhead (THE POOL) and a short line. Like a parts list in a manual.', '"the callouts", "the legend"'),
 (15, 458, 1915, 'Inline badge', 'A small logo placed inside the sentence (Grok\'s mark).', '"the badge"'),
 (16, 780, 1720, 'Ground (background texture)', 'The dark board pattern behind the text, so even the text area belongs to the same world.', '"the ground", "the background"'),
]
LW = int(im.width * 1.05); W = im.width + LW
H = im.height
can = Image.new('RGB', (W, H * 2), (12, 11, 16)); can.paste(im, (0, 0)); d = ImageDraw.Draw(can)
R = int(22 * k)
for n, x, y, *_ in M:
    X, Y = int(x * k), int(y * k)
    d.ellipse((X - R, Y - R, X + R, Y + R), fill=(255, 225, 77), outline=(13, 11, 16), width=4)
    t = str(n); f = fb(int(24 * k)); w = d.textlength(t, font=f)
    d.text((X - w / 2, Y - int(15 * k)), t, font=f, fill=(13, 11, 16))
x0 = im.width + 50; y = 50
d.text((x0, y), 'The bet section, part by part', font=fb(48), fill=(255, 225, 77)); y += 70
d.text((x0, y), 'What each piece is called, and how to say it', font=fr(30), fill=(200, 192, 176)); y += 70
for n, x, yy, term, what, say in M:
    d.ellipse((x0, y, x0 + 46, y + 46), fill=(255, 225, 77)); t = str(n); w = d.textlength(t, font=fb(26)); d.text((x0 + 23 - w / 2, y + 8), t, font=fb(26), fill=(13, 11, 16))
    d.text((x0 + 64, y + 4), term, font=fb(31), fill=(248, 240, 217)); y += 46
    for line in textwrap.wrap(what, 66):
        d.text((x0 + 64, y), line, font=fr(25), fill=(205, 197, 182)); y += 32
    d.text((x0 + 64, y), 'Say: ' + say, font=fr(25), fill=(255, 210, 90)); y += 50
y += 10
d.text((x0, y), 'Why it reads like a film', font=fb(34), fill=(255, 225, 77)); y += 50
for line in textwrap.wrap('Three panels, one sequence: the place (the vault), the clock (the countdown), the machine (the parts). Every picture shares one finish: painted, sharp, lit by one warm light, in the same black, gold, green and red. Every number and word sits in its picture\'s world rather than on a box above it.', 72):
    d.text((x0, y), line, font=fr(26), fill=(220, 212, 196)); y += 34
can = can.crop((0, 0, W, max(H, y + 40)))
can.save(out, quality=88)
print(can.size)
