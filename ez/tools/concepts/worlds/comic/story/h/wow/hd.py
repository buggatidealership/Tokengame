#!/usr/bin/env python3
# Hedra v3 client for round H8 / wow (copied from cast2). hd.py <name> <model> '<json input>' [ref ...]
# Saves img/<name>.jpg (JPG q85, <=600px) and raw/<name>.png? no: keeps a 1024 copy in raw/ (not committed). Never prints the key.
import os,sys,json,time,subprocess,urllib.request
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
    except Exception as e: time.sleep(5)
  raise SystemExit('rate limited')
def upload(fn):
  out=subprocess.run(['curl','-s','-X','POST',H+'/files','-H','X-API-Key: '+K,'-F','file=@'+fn],capture_output=True,text=True).stdout
  return json.loads(out)['url']
if __name__=='__main__':
  _,name,model,inp,*refs=sys.argv
  inp=json.loads(inp)
  if refs: inp['images']=[{'source':'url','url':upload(f)} for f in refs]
  if os.environ.get('EST'): print(req('POST',f'/models/{model}/estimate',json.dumps({'input':inp}).encode()));sys.exit()
  est=req('POST',f'/models/{model}/estimate',json.dumps({'input':inp}).encode())
  t0=time.time();j=req('POST',f'/models/{model}',json.dumps({'input':inp}).encode());jid=j['job_id']
  while True:
    time.sleep(10);s=req('GET',f'/jobs/{jid}/status');st=s.get('status')
    if st in('COMPLETED','FAILED','CANCELLED','EXPIRED'):break
  res=req('GET',f'/jobs/{jid}');dt=round(time.time()-t0)
  rec={'name':name,'model':model,'input':{k:v for k,v in inp.items() if k!='images'},'refs':[os.path.basename(r) for r in refs],'cost':est.get('cost'),'time_s':dt,'status':st,'job':jid}
  if st=='COMPLETED':
    url=res['outputs'][0]['url'];os.makedirs(D+'/raw',exist_ok=True);raw=f'{D}/raw/{name}.png';urllib.request.urlretrieve(url,raw)
    big=os.environ.get('BIG');o=f'{D}/img/{name}.jpg'
    subprocess.run(['convert',raw,'-resize',('2048x2048>' if big else '1024x1024>'),'-quality',('88' if big else '85'),o])
    rec['file']=f'img/{name}.jpg'
  else: rec['error']=res.get('error') or s
  open(f'{D}/jobs.jsonl','a').write(json.dumps(rec)+'\n');print(json.dumps({k:rec[k] for k in rec if k!='input'})[:400])
