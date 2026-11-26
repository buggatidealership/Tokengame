#!/usr/bin/env python3
# ha.py <name> <model> '<json input>' : Hedra audio job (ElevenLabs music / sound effects). Saves music/<name>.<ext>. Never prints the key.
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
name,model,inp=sys.argv[1],sys.argv[2],json.loads(sys.argv[3])
est=req('POST',f'/models/{model}/estimate',json.dumps({'input':inp}).encode())
j=req('POST',f'/models/{model}',json.dumps({'input':inp}).encode());jid=j['job_id'];t0=time.time()
while True:
  time.sleep(6);s=req('GET',f'/jobs/{jid}/status');st=s.get('status')
  if st in('COMPLETED','FAILED','CANCELLED','EXPIRED'):break
res=req('GET',f'/jobs/{jid}');rec={'name':name,'model':model,'input':inp,'cost':est.get('cost'),'time_s':round(time.time()-t0),'status':st,'job':jid}
if st=='COMPLETED':
  o=res['outputs'][0];url=o['url'];ext=(o.get('mime_type') or 'audio/mpeg').split('/')[-1].replace('mpeg','mp3')
  f=f'{D}/music/{name}.{ext}';urllib.request.urlretrieve(url,f);rec['file']=f'music/{name}.{ext}'
else: rec['error']=res.get('error') or s
open(f'{D}/jobs.jsonl','a').write(json.dumps(rec)+'\n');print(json.dumps({k:rec[k] for k in rec if k!='input'})[:300])
