#!/usr/bin/env python3
# Hedra v3 audio client for the chart-video sound kit (ElevenLabs music and sound effects through Hedra).
# hd_audio.py <name> <model> '<json input>'  -> kit/<name>.<ext>, a line in jobs.jsonl. Never prints the key.
import os,sys,json,time,urllib.request
K=os.environ['HEDRA_API_KEY'];H='https://api.hedra.com/v3';D=os.path.dirname(os.path.abspath(__file__))
def req(m,p,body=None):
  r=urllib.request.Request(H+p,data=body,method=m,headers={'X-API-Key':K,'Content-Type':'application/json'})
  for i in range(20):
    try:
      with urllib.request.urlopen(r,timeout=120) as f:return json.load(f)
    except urllib.error.HTTPError as e:
      b=e.read()
      if e.code==429: time.sleep(json.loads(b)['error'].get('retry_after',10)+1+i);continue
      raise SystemExit(f'{m} {p} -> {e.code} {b[:600]}')
    except Exception: time.sleep(5)
  raise SystemExit('rate limited')
_,name,model,inp=sys.argv;inp=json.loads(inp);body=json.dumps({'input':inp}).encode()
est=req('POST',f'/models/{model}/estimate',body)
if os.environ.get('EST'):print(est);sys.exit()
t0=time.time();jid=req('POST',f'/models/{model}',body)['job_id']
while True:
  time.sleep(4);s=req('GET',f'/jobs/{jid}/status');st=s.get('status')
  if st in('COMPLETED','FAILED','CANCELLED','EXPIRED'):break
res=req('GET',f'/jobs/{jid}');rec={'name':name,'model':model,'input':inp,'cost':est.get('cost'),'time_s':round(time.time()-t0),'status':st,'job':jid}
if st=='COMPLETED':
  o=res['outputs'][0];ext={'audio/mpeg':'mp3','audio/wav':'wav','audio/x-wav':'wav','audio/ogg':'ogg'}.get(o.get('content_type'),'mp3')
  fn=f'{D}/kit/{name}.{ext}';urllib.request.urlretrieve(o['url'],fn);rec['file']=f'kit/{name}.{ext}';rec['ms']=o.get('duration_ms')
else: rec['error']=res.get('error') or s
open(f'{D}/jobs.jsonl','a').write(json.dumps(rec)+'\n');print(json.dumps({k:rec[k] for k in rec if k!='input'}))
