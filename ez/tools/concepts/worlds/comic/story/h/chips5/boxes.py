# python3 boxes.py <run.js log> : per take and width, every shared box per chip (x, y, w, h in CSS px, relative to the chip's own
# painting box) and the largest difference between the four chips; for SW also the alignment rule (window top = plate top,
# window bottom = flag bottom), checked on every chip. Writes boxes.md.
import json,re,sys
out=['| Width | Take | Part | x | y | w | h | Max diff across the 4 chips |','|---|---|---|---|---|---|---|---|'];al=[]
for line in open(sys.argv[1]):
  m=re.match(r'(\d+) (\S+) (\{.*\}) ',line)
  if not m or 'boxes' not in m.group(3):continue
  W,t,d=m.group(1),m.group(2),json.loads(m.group(3));B=d['boxes']
  for k in [k for k in B[0] if k not in('m','chip') and B[0][k]]:
    v=B[0][k];dmax=max(abs(b[k][i]-v[i]) for b in B for i in range(4))
    out.append(f'| {W} | {t} | {k} | {v[0]} | {v[1]} | {v[2]} | {v[3]} | {dmax:.2f}px |')
  sz=[b['chip'][2:] for b in B];out.append(f'| {W} | {t} | chip (w, h) | | | {sz[0][0]} | {sz[0][1]} | {max(abs(s[i]-sz[0][i]) for s in sz for i in (0,1)):.2f}px |')
  if B[0].get('winf'):
    for b in B:
      f,p,g,v=b['winf'],b['plate'],b['flag'],b['win']
      al.append(f"| {W} | {t} | {b['m']} | {f[1]:.2f} / {p[1]:.2f} ({f[1]-p[1]:+.2f}) | {f[1]+f[3]:.2f} / {g[1]+g[3]:.2f} ({f[1]+f[3]-g[1]-g[3]:+.2f}) | {v[1]:.2f} to {v[1]+v[3]:.2f} |")
o='\n'.join(out)+'\n'
if al:o+='\n## SW alignment, per chip\n\n| Width | Take | Chip | Window frame top / plate top (diff) | Window frame bottom / flag bottom (diff) | Picture (inside the frame), top to bottom |\n|---|---|---|---|---|---|\n'+'\n'.join(al)+'\n'
open('boxes.md','w').write(o);print(o)
