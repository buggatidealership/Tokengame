#!/usr/bin/env python3
# hv.py <name> <model> <start-image job id> '<prompt>' [aspect] : image-to-video from an earlier Hedra image job. Never prints the key.
import os,sys,json,time,urllib.request
K=os.environ['HEDRA_API_KEY'];H='https://api.hedra.com/v3';D=os.path.dirname(os.path.abspath(__file__))
def req(m,p,body=None):
  r=urllib.request.Request(H+p,data=body,method=m,headers={'X-API-Key':K,'Content-Type':'application/json'})
  for i in range(30):
    try:
      with urllib.request.urlopen(r,timeout=120) as f:return json.load(f)
    except urllib.error.HTTPError as e:
      b=e.read()
      if e.code==429: time.sleep(15+i);continue
      raise SystemExit(f'{m} {p} -> {e.code} {b[:600]}')
    except Exception: time.sleep(5)
name,model,job,prompt=sys.argv[1:5];ar=sys.argv[5] if len(sys.argv)>5 else '1:1'
inp={'prompt':prompt,'aspect_ratio':ar,'resolution':'1080p','duration_ms':5000,'start_image':{'source':'asset','asset_id':job.replace('job_','asset_')},'negative_prompt':'text, letters, numbers, logos, camera shake, morphing, distortion'}
if model=='kling-26-pro':inp['generate_audio']=False
est=req('POST',f'/models/{model}/estimate',json.dumps({'input':inp}).encode())
j=req('POST',f'/models/{model}',json.dumps({'input':inp}).encode());jid=j['job_id'];t0=time.time()
while True:
  time.sleep(10);s=req('GET',f'/jobs/{jid}/status');st=s.get('status')
  if st in('COMPLETED','FAILED','CANCELLED','EXPIRED'):break
res=req('GET',f'/jobs/{jid}');rec={'name':name,'model':model,'prompt':prompt,'from':job,'cost':est.get('cost'),'time_s':round(time.time()-t0),'status':st,'job':jid}
if st=='COMPLETED':
  os.makedirs(D+'/raw',exist_ok=True);urllib.request.urlretrieve(res['outputs'][0]['url'],f'{D}/raw/{name}.mp4');rec['file']=f'raw/{name}.mp4'
else: rec['error']=res.get('error') or s
open(f'{D}/jobs.jsonl','a').write(json.dumps(rec)+'\n');print(json.dumps(rec)[:400])
