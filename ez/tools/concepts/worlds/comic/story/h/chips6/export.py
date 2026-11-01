# /usr/bin/python3 export.py : after shift.py (img/m6-c2.png), crops the master (24,118,1252,576 -> 1228x458) and writes
# img/m6-master.jpg and the delivery files img/chip6-{1228,800}.{webp,jpg}. The fifth chip (try6-*) and rays6.webp were exported
# once from chips5's t-old.jpg (crop 62,102,1226,585) and rays.jpg.
from PIL import Image
c=Image.open('img/m6-c2.png').convert('RGB').crop((24,118,1252,576));c.save('img/m6-master.jpg',quality=94)
for w,q in((1228,80),(800,82)):
  r=c.resize((w,round(c.height*w/c.width)),Image.LANCZOS);r.save(f'img/chip6-{w}.webp',quality=q,method=6);r.save(f'img/chip6-{w}.jpg',quality=84,optimize=True,progressive=True)
