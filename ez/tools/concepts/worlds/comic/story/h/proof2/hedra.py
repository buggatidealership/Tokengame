#!/usr/bin/python3
# usage: hedra.py jobs.json  -> runs each {name,model,input} in parallel, saves img/<name>.jpg, appends jobs.jsonl
import json,os,sys,time,urllib.request,threading,io
from PIL import Image
K=os.environ['HEDRA_API_KEY'];B='https://api.hedra.com/v3'
import random,urllib.error
SEM=threading.Semaphore(3)
def req(p,body=None):
  for a in range(12):
    try: return req1(p,body)
    except urllib.error.HTTPError as e:
        if e.code==429: time.sleep(5+a*5+random.random()*5);continue
        raise
  raise Exception('429 forever')
def req1(p,body=None):
    r=urllib.request.Request(B+p,data=json.dumps(body).encode() if body is not None else None,headers={'X-API-Key':K,'Content-Type':'application/json'})
    return json.load(urllib.request.urlopen(r,timeout=60))
def run(j):
  with SEM:
      t0=time.time()
      try:
          est=req('/models/%s/estimate'%j['model'],{'input':j['input']})
          s=req('/models/%s'%j['model'],{'input':j['input']});jid=s['job_id']
          while True:
              time.sleep(10);st=req('/jobs/%s/status'%jid)
              if st['status'] in('COMPLETED','FAILED','CANCELLED'):break
          res=req('/jobs/'+jid);out=None
          if st['status']=='COMPLETED':
              url=res['outputs'][0]['url'];data=urllib.request.urlopen(url,timeout=120).read()
              im=Image.open(io.BytesIO(data)).convert('RGB');im.thumbnail((2048,2048))
              out='img/%s.jpg'%j['name'];im.save(out,quality=88);sz=im.size
          else: sz=None
          rec={'name':j['name'],'model':j['model'],'input':{k:v for k,v in j['input'].items() if k!='prompt'},'prompt':j['input'].get('prompt',''),'estimate':est,'status':st['status'],'secs':round(time.time()-t0),'file':out,'size':sz,'job':jid,'err':res.get('error')}
      except Exception as e:
          rec={'name':j['name'],'model':j['model'],'status':'ERR','err':str(e)[:300]}
      with open('jobs.jsonl','a') as f:f.write(json.dumps(rec)+'\n')
      print(rec['name'],rec['status'],rec.get('estimate'),rec.get('secs'),rec.get('err'))
js=json.load(open(sys.argv[1]));ts=[threading.Thread(target=run,args=(j,)) for j in js]
[t.start() for t in ts];[t.join() for t in ts]
