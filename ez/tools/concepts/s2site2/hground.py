# the painted ground for the Season 2 terminal (owner, 2026-11-26: "one that you do, and then one that Hedra can do"): green light from the
# top, the same red light from the bottom, black between; nano-banana-pro, 2K, 9:16 (phones) and 4:5 (desktop)
import json,os,time,urllib.request
K=os.environ['HEDRA_API_KEY'];B='https://api.hedra.com/v3/'
def rq(p,d=None):
    r=urllib.request.Request(B+p,data=json.dumps(d).encode() if d else None,headers={'x-api-key':K,'content-type':'application/json'},method='POST' if d else 'GET')
    return json.load(urllib.request.urlopen(r))
P=("Abstract dark background for a premium trading app, no objects, no text, no shapes, no logos. Deep emerald green light glows down from the top "
   "edge like an aurora seen through frosted glass, soft volumetric haze, fading smoothly into near-black in the middle. From the bottom edge an "
   "equal deep crimson red light glows upward the same way, mirroring the green. Very subtle film grain, smooth gradients, no banding, "
   "rich and quiet, cinematic, high-end product photography lighting.")
jobs={}
for ar in ('9:16','4:5'):
    j=rq('models/nano-banana-pro',{'input':{'prompt':P,'aspect_ratio':ar,'resolution':'2K'}});jobs[ar]=j.get('id') or j.get('job_id');print(ar,j)
for ar,j in jobs.items():
    while True:
        s=rq('jobs/'+j);st=s.get('status')
        if st in('COMPLETED','FAILED'):break
        time.sleep(5)
    print(ar,st);u=None
    for k in('outputs','assets','result'):
        v=s.get(k)
        if v:u=json.dumps(v);break
    print(json.dumps(s)[:600])
    json.dump(s,open('hground-'+ar.replace(':','x')+'.json','w'))
