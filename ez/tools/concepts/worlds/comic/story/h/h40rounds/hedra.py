#!/usr/bin/python3
# usage: hedra.py jobs.json [--estimate] -> runs each {name,model,input,refs?} in parallel, saves img/<name>.jpg (max 3072), appends jobs.jsonl
# The key comes from HEDRA_API_KEY (never printed). Refs are uploaded via POST /v3/files.
import json,os,sys,time,urllib.request,urllib.error,threading,io,uuid,random
from PIL import Image
K=os.environ['HEDRA_API_KEY'];B='https://api.hedra.com/v3';EST='--estimate' in sys.argv
SEM=threading.Semaphore(4)
def req1(p,body=None):
  r=urllib.request.Request(B+p,data=json.dumps(body).encode() if body is not None else None,headers={'X-API-Key':K,'Content-Type':'application/json'})
  return json.load(urllib.request.urlopen(r,timeout=60))
def req(p,body=None):
  for a in range(12):
    try:return req1(p,body)
    except urllib.error.HTTPError as e:
      if e.code==429:time.sleep(5+a*5+random.random()*5);continue
      raise Exception(f'{e.code} {e.read()[:300]}')
  raise Exception('429 forever')
def up(path):
  bd='----h'+uuid.uuid4().hex;data=open(path,'rb').read()
  body=(f'--{bd}\r\nContent-Disposition: form-data; name="file"; filename="{os.path.basename(path)}"\r\nContent-Type: image/jpeg\r\n\r\n').encode()+data+f'\r\n--{bd}--\r\n'.encode()
  r=urllib.request.Request(B+'/files',method='POST',data=body,headers={'X-API-Key':K,'Content-Type':'multipart/form-data; boundary='+bd})
  return json.load(urllib.request.urlopen(r,timeout=120))['url']
def run(j):
  with SEM:
    t0=time.time()
    try:
      inp=dict(j['input'])
      est=req('/models/%s/estimate'%j['model'],{'input':inp})
      if EST:print(j['name'],est);return
      if j.get('refs'):inp['images']=[{'source':'url','url':up(f)} for f in j['refs']]
      s=req('/models/%s'%j['model'],{'input':inp});jid=s['job_id']
      while True:
        time.sleep(8);st=req('/jobs/%s/status'%jid)
        if st['status'] in('COMPLETED','FAILED','CANCELLED'):break
      res=req('/jobs/'+jid);out=None;sz=None
      if st['status']=='COMPLETED':
        url=res['outputs'][0]['url'];data=urllib.request.urlopen(url,timeout=180).read()
        im=Image.open(io.BytesIO(data)).convert('RGB');sz0=im.size;im.thumbnail((3072,3072))
        out='img/%s.jpg'%j['name'];im.save(out,quality=90);sz=[sz0,im.size]
      rec={'name':j['name'],'model':j['model'],'input':{k:v for k,v in j['input'].items() if k!='prompt'},'refs':j.get('refs'),'prompt':j['input'].get('prompt',''),'estimate':est,'status':st['status'],'secs':round(time.time()-t0),'file':out,'size':sz,'job':jid,'err':res.get('error')}
    except Exception as e:
      rec={'name':j['name'],'model':j['model'],'status':'ERR','err':str(e)[:300]}
    with open('jobs.jsonl','a') as f:f.write(json.dumps(rec)+'\n')
    print(rec['name'],rec['status'],rec.get('estimate'),rec.get('secs'),rec.get('err'))
js=json.load(open(sys.argv[1]));print('balance',req('/balance'))
ts=[threading.Thread(target=run,args=(j,)) for j in js];[t.start() for t in ts];[t.join() for t in ts]
print('balance',req('/balance'))
