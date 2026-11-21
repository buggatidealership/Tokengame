#!/usr/bin/python3
# key.py <raw png> <out png>: keys out the flat green screen of a sprite, trims it, keeps soft ink edges (despill), at most 900px
import sys
from PIL import Image
im=Image.open(sys.argv[1]).convert('RGBA');px=im.load();W,H=im.size
for y in range(H):
  for x in range(W):
    r,g,b,a=px[x,y];m=max(r,b);k=g-m   # greenness
    if k>60: px[x,y]=(0,0,0,0)
    elif k>18: al=int(255*(60-k)/42);px[x,y]=(r,min(g,m),b,al)   # edge: fade and despill
    elif g>m: px[x,y]=(r,m,b,a)
bb=im.getbbox();im=im.crop(bb);im.thumbnail((900,900));im.save(sys.argv[2]);print(sys.argv[2],im.size)
