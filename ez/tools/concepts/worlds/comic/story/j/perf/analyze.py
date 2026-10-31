# /usr/bin/python3 perf/analyze.py : the A/B windows per take (window 0 is a warm-up and is dropped), medians off vs on
import json,glob,statistics as st,os
D=os.path.dirname(os.path.abspath(__file__))
rows=[]
for f in sorted(glob.glob(D+'/ab-*.json')):
  k=os.path.basename(f)[3:-5];R=[x for x in json.load(open(f)) if x['i']>0]
  if not R:continue
  def med(on,key):
    v=[x[key] for x in R if x['on']==on and key in x];return st.median(v) if v else None
  keys=['task','long','maxFrame'] if 'task' in R[0] else ['idleTask','idleFps','scrollFps','long']
  o={'take':k,'setup':st.median([x['setup'] for x in R]),'n':len(R)}
  for kk in keys:o[kk+'_off']=med(False,kk);o[kk+'_on']=med(True,kk)
  rows.append(o)
for o in rows:print(json.dumps(o))
json.dump(rows,open(D+'/summary.json','w'),indent=1)
