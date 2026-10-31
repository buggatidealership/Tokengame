# python3 gen.py jobs.json outdir log.jsonl  -- jobs: [{name, model, input}]
import urllib.error,json,sys,os,time,urllib.request,concurrent.futures as cf,io
from PIL import Image
K=os.environ['HEDRA_API_KEY'];B='https://api.hedra.com/v3'
import random
def req(m,u,body=None):
  for a in range(10):
    try:return req1(m,u,body)
    except urllib.error.HTTPError as e:
      if e.code in(429,500,502,503,504):time.sleep(4+a*4+random.random()*3);continue
      raise
  return req1(m,u,body)
def req1(m,u,body=None):
  r=urllib.request.Request(B+u,method=m,headers={'X-API-Key':K,'Content-Type':'application/json'},data=json.dumps(body).encode() if body is not None else None)
  with urllib.request.urlopen(r,timeout=120) as f:return json.load(f)
jobs=json.load(open(sys.argv[1]));OUT=sys.argv[2];LOG=sys.argv[3]
def run(j):
  t0=time.time()
  try:
    est=req('POST',f"/models/{j['model']}/estimate",{'input':j['input']})
    sub=req('POST',f"/models/{j['model']}",{'input':j['input']})
    open(LOG+'.sub','a').write(json.dumps({'name':j['name'],'sub':sub})+'\n');jid=sub.get('id') or sub.get('job_id') or sub.get('job',{}).get('id')
    while True:
      time.sleep(5);st=req('GET',f'/jobs/{jid}/status');s=(st.get('status') or '').upper()
      if s in('COMPLETED','FAILED','CANCELLED','ERROR'):break
    res=req('GET',f'/jobs/{jid}')
    if s!='COMPLETED':raise Exception(json.dumps(res)[:300])
    url=None
    def find(o):
      nonlocal url
      if url:return
      if isinstance(o,str) and o.startswith('http') and ('amazonaws' in o or 'cdn' in o or 'hedra' in o):url=o
      elif isinstance(o,dict):[find(v) for v in o.values()]
      elif isinstance(o,list):[find(v) for v in o]
    find(res.get('output',res));find(res)
    data=urllib.request.urlopen(url,timeout=120).read();im=Image.open(io.BytesIO(data)).convert('RGB');im.thumbnail((2048,2048))
    fn=f"{OUT}/{j['name']}.jpg";im.save(fn,quality=88)
    rec={'name':j['name'],'model':j['model'],'input':j['input'],'estimate':est,'job':jid,'secs':round(time.time()-t0),'file':fn,'size':im.size}
  except Exception as e:
    rec={'name':j['name'],'model':j['model'],'error':str(e)[:400],'secs':round(time.time()-t0)}
  open(LOG,'a').write(json.dumps(rec)+'\n');print(json.dumps({k:rec.get(k) for k in('name','secs','size','error','estimate')}));return rec
with cf.ThreadPoolExecutor(3) as ex:list(ex.map(run,jobs))
