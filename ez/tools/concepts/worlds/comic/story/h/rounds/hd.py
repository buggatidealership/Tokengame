#!/usr/bin/env python3
# Hedra v3 client for round H / rounds. Usage:
#   hd.py gen <name> <model> '<json input>' [ref1.png ref2.png ...]   (refs uploaded, put in input.images)
# Saves img/<name>.jpg (q88, <=2048px) and appends a line to jobs.jsonl. Never prints the key.
import os,sys,json,time,subprocess,urllib.request
K=os.environ['HEDRA_API_KEY'];H='https://api.hedra.com/v3';D=os.path.dirname(os.path.abspath(__file__))
def req(m,p,body=None,ct='application/json'):
  r=urllib.request.Request(H+p,data=body,method=m,headers={'X-API-Key':K,'Content-Type':ct})
  for i in range(12):
    try:
      with urllib.request.urlopen(r,timeout=120) as f:return json.load(f)
    except urllib.error.HTTPError as e:
      b=e.read()
      if e.code==429: time.sleep(json.loads(b)['error'].get('retry_after',10)+1);continue
      raise SystemExit(f'{m} {p} -> {e.code} {b[:600]}')
  raise SystemExit('rate limited')
def upload(fn):
  out=subprocess.run(['curl','-s','-X','POST',H+'/files','-H','X-API-Key: '+K,'-F','file=@'+fn],capture_output=True,text=True).stdout
  return json.loads(out)['url']
def bal(): return req('GET','/balance')['balance']
if __name__=='__main__':
  _,cmd,name,model,inp,*refs=sys.argv
  inp=json.loads(inp)
  if refs: inp['images']=[{'source':'url','url':upload(f)} for f in refs]
  est=req('POST',f'/models/{model}/estimate',json.dumps({'input':inp}).encode())
  b0=bal();t0=time.time()
  j=req('POST',f'/models/{model}',json.dumps({'input':inp}).encode());jid=j['job_id']
  while True:
    time.sleep(8);s=req('GET',f'/jobs/{jid}/status')
    st=s.get('status');
    if st in('COMPLETED','FAILED','CANCELLED','EXPIRED'):break
  res=req('GET',f'/jobs/{jid}');dt=round(time.time()-t0);b1=bal()
  rec={'name':name,'model':model,'input':{k:v for k,v in inp.items() if k!='images'},'refs':[os.path.basename(r) for r in refs],'estimate':est,'cost':round(b0-b1,4),'time_s':dt,'status':st,'job':jid}
  if st=='COMPLETED':
    url=res['outputs'][0]['url'];tmp=f'/tmp/claude-0/hd-{name}';urllib.request.urlretrieve(url,tmp)
    o=f'{D}/img/{name}.jpg';subprocess.run(['convert',tmp,'-resize','2048x2048>','-quality','88',o]);os.remove(tmp)
    rec['file']=f'img/{name}.jpg';rec['size']=subprocess.run(['identify','-format','%wx%h',o],capture_output=True,text=True).stdout
  else: rec['error']=res.get('error') or s
  open(f'{D}/jobs.jsonl','a').write(json.dumps(rec)+'\n');print(json.dumps({k:rec[k] for k in rec if k not in('input',)})[:500])
