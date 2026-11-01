# /usr/bin/python3 shift.py : img/m6-c.jpg -> img/m6-c2.png (lossless working master). The die's cavity block (x 878..1220, y 170..500)
# moves 7px up so the silicon die's top (204) lands on the gold plate's top (197). The 7px left under the cavity are filled with the
# ceramic just below it; the seams are feathered over 6px.
from PIL import Image
import numpy as np
im=np.asarray(Image.open('img/m6-c.jpg').convert('RGB')).astype(float);o=im.copy()
X0,X1,Y0,Y1,D=878,1220,170,500,7
blk=im[Y0:Y1,X0:X1].copy()
o[Y0-D:Y1-D,X0:X1]=blk
o[Y1-D:Y1,X0:X1]=im[Y1:Y1+D,X0:X1]           # ceramic from just below
# feather the top seam (old pixels at Y0-D.. blend into the moved block) and the side seams
F=6
for i in range(F):
  t=(i+1)/(F+1)
  o[Y0-D+i,X0:X1]=im[Y0-D+i,X0:X1]*(1-t)+blk[i]*t
  o[Y0-D:Y1,X0+i]=im[Y0-D:Y1,X0+i]*(1-t)+o[Y0-D:Y1,X0+i]*t
  o[Y0-D:Y1,X1-1-i]=im[Y0-D:Y1,X1-1-i]*(1-t)+o[Y0-D:Y1,X1-1-i]*t
Image.fromarray(o.clip(0,255).astype('uint8')).save('img/m6-c2.png')
