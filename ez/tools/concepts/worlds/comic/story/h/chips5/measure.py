# /usr/bin/python3 measure.py : measures the two master paintings once by scanning class runs (gold / pale grey ceramic / dark) along
# rows and columns through each part. Every chip is drawn from these same boxes, so the four chips' geometry is identical by construction.
import json,sys,numpy as np
from PIL import Image
def cls(p):
  r,g,b=p
  if r>140 and g>95 and b<95 and r-b>70:return 'G'
  if r>165 and g>160 and b>145 and abs(int(r)-int(b))<45:return 'c'
  if r+g+b<110:return '.'
  return '?'
def runs(line):
  s=''.join(cls(p) for p in line);out=[];i=0
  while i<len(s):
    j=i
    while j<len(s) and s[j]==s[i]:j+=1
    if j-i>=6:out.append((s[i],i,j))
    i=j
  return out
n=sys.argv[1];a=np.asarray(Image.open(f'img/{n}.jpg').convert('RGB'))
for y in map(int,sys.argv[2].split(',')):print('row',y,runs(a[y]))
for x in map(int,sys.argv[3].split(',')):print('col',x,runs(a[:,x]))
