# python3 boxes.py <run.js log> : per take and width, every shared box per chip (x, y, w, h in CSS px, relative to the chip's own
# painting box) and the largest difference between the four chips. Writes boxes.md.
import json,re,sys
out=['| Width | Take | Part | x | y | w | h | Max diff across the 4 chips |','|---|---|---|---|---|---|---|---|']
for line in open(sys.argv[1]):
  m=re.match(r'(\d+) (\S+) (\{.*\}) ',line)
  if not m:continue
  W,t,d=m.group(1),m.group(2),json.loads(m.group(3));B=d['boxes']
  for k in [k for k in B[0] if k not in('m','chip')]:
    v=B[0][k];dmax=max(abs(b[k][i]-v[i]) for b in B for i in range(4))
    out.append(f'| {W} | {t} | {k} | {v[0]} | {v[1]} | {v[2]} | {v[3]} | {dmax:.2f}px |')
  sz=[b['chip'][2:] for b in B];out.append(f'| {W} | {t} | chip (w, h) | | | {sz[0][0]} | {sz[0][1]} | {max(abs(s[i]-sz[0][i]) for s in sz for i in (0,1)):.2f}px |')
open('boxes.md','w').write('\n'.join(out)+'\n');print('\n'.join(out))
