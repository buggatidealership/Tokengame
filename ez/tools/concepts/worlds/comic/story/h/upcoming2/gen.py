# /usr/bin/python3 gen.py jobs.json : submit each {name,model,input,ref?}, poll, save img/<name>.jpg (q88, <=2048px), log to jobs.log.jsonl
# ref: a path under ref/ uploaded via POST /v3/files and passed as input.images. Key from $HEDRA_API_KEY, never printed.
import json,os,sys,time,subprocess,io
from PIL import Image
K=os.environ['HEDRA_API_KEY'];B='https://api.hedra.com/v3';D=os.path.dirname(os.path.abspath(__file__))
def api(method,path,body=None):
  cmd=['curl','-sS','-X',method,'-H','X-API-Key: '+K,'-H','Content-Type: application/json',B+path]
  if body is not None:cmd+=['-d',json.dumps(body)]
  out=subprocess.run(cmd,capture_output=True,text=True).stdout
  try:return json.loads(out)
  except Exception:return {'raw':out[:300]}
def up(f):
  out=subprocess.run(['curl','-sS','-X','POST','-H','X-API-Key: '+K,'-F','file=@'+os.path.join(D,f),B+'/files'],capture_output=True,text=True).stdout
  return json.loads(out)['url']
NO=' No people, no text, no letters, no numbers, no logos, no signs with writing, no words anywhere.'
jobs=json.load(open(sys.argv[1]));act=[];bal0=api('GET','/balance').get('balance')
for j in jobs:
  inp=dict(j['input']);inp['prompt']=inp['prompt']+j.get('suffix',NO)
  if j.get('ref'):inp['images']=[{'source':'url','url':up(r)} for r in (j['ref'] if isinstance(j['ref'],list) else [j['ref']])]
  est=api('POST','/models/%s/estimate'%j['model'],{'input':inp})
  r=api('POST','/models/'+j['model'],{'input':inp})
  jid=r.get('id') or r.get('job_id');print(j['name'],'est',est.get('cost',est),'job',jid or r,flush=True);act.append((j,jid,time.time(),est))
for j,jid,t0,est in act:
  if not jid:continue
  while True:
    s=api('GET','/jobs/%s/status'%jid);st=s.get('status')
    if st in('COMPLETED','FAILED','CANCELLED'):break
    time.sleep(5)
  dt=round(time.time()-t0);res=api('GET','/jobs/'+jid);url=None
  for k in ('outputs','output','assets'):
    v=res.get(k)
    if isinstance(v,list) and v:v=v[0]
    if isinstance(v,dict):url=v.get('url') or v.get('uri')
    if url:break
  rec={'name':j['name'],'model':j['model'],'input':{k:v for k,v in j['input'].items() if k!='prompt'},'ref':j.get('ref'),'prompt':j['input']['prompt'],'status':st,'secs':dt,'est':est.get('cost',est),'job':jid}
  if url:
    raw=subprocess.run(['curl','-sS',url],capture_output=True).stdout;im=Image.open(io.BytesIO(raw)).convert('RGB');im.thumbnail((2048,2048))
    f='img/%s.jpg'%j['name'];im.save(os.path.join(D,f),quality=88);rec['file']=f;rec['size']=im.size
  else:rec['raw']=str(res)[:400]
  print(json.dumps(rec)[:240],flush=True);open(os.path.join(D,'jobs.log.jsonl'),'a').write(json.dumps(rec)+'\n')
b1=api('GET','/balance').get('balance');print('balance',bal0,'->',b1)
