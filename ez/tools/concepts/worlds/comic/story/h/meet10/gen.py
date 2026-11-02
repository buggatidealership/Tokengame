# /usr/bin/python3 gen.py : out/chip10-<m>-1800/1200.jpg/.webp = the live chip8c paintings with
#  1. the painted "LAST ROUND" label taken off (patched with the same panel's clean matte from the left, feathered);
#  2. one tall glass window for the line, 9-sliced from the chip's own painted SEASON window (bezel corners at native size, edges and glass stretched),
#     over the SEASON label, the SEASON window, the gold rule and the foot band: (408,418)-(1251,603) in the 1800 painting, aligned with the
#     name bar's left edge and the No. box's right edge, 16 units off the panel bezel (as the name bar is off its top).
# No words are painted: every label and number on the chip stays page text (H26).
from PIL import Image, ImageFilter, ImageDraw
import os
MED='../../../../../../../media/'
SE=(531,418,1251,526)                 # the SEASON window, outer, 1800 units (measured, meet9)
LW=(408,418,1251,603)                 # the new line window, outer
LR=(1018,367,1218,417); SRC=(772,367,972,417)   # the LAST ROUND label and a clean patch of the same panel row
C=34                                  # corner kept at native size
def nine(src,tw,th):
  sw,sh=src.size;o=Image.new('RGB',(tw,th))
  pieces=[((0,0,C,C),(0,0,C,C)),((sw-C,0,sw,C),(tw-C,0,tw,C)),((0,sh-C,C,sh),(0,th-C,C,th)),((sw-C,sh-C,sw,sh),(tw-C,th-C,tw,th)),
          ((C,0,sw-C,C),(C,0,tw-C,C)),((C,sh-C,sw-C,sh),(C,th-C,tw-C,th)),((0,C,C,sh-C),(0,C,C,th-C)),((sw-C,C,sw,sh-C),(tw-C,C,tw,th-C)),
          ((C,C,sw-C,sh-C),(C,C,tw-C,th-C))]
  for s,d in pieces:o.paste(src.crop(s).resize((d[2]-d[0],d[3]-d[1]),Image.LANCZOS),d[:2])
  return o
for m in ['grok','claude','gpt','kimi']:
  im=Image.open(MED+f'chip8c-{m}-1800.jpg').convert('RGB')
  # 1. the LAST ROUND label off
  patch=im.crop(SRC);mask=Image.new('L',patch.size,0);ImageDraw.Draw(mask).rectangle((3,2,patch.size[0]-4,patch.size[1]-3),255);mask=mask.filter(ImageFilter.GaussianBlur(1.5))
  im.paste(patch,LR[:2],mask)
  # 2. the tall line window
  win=nine(im.crop(SE),LW[2]-LW[0],LW[3]-LW[1]);im.paste(win,LW[:2])
  for w in (1800,1200):
    o=im if w==1800 else im.resize((w,round(im.size[1]*w/1800)),Image.LANCZOS)
    o.save(f'out/chip10-{m}-{w}.jpg',quality=92);o.save(f'out/chip10-{m}-{w}.webp',quality=90)
print('ok',im.size)
