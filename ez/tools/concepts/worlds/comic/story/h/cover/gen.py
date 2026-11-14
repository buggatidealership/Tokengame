# python3 gen.py jobs.json : submit Hedra v3 image jobs in parallel, poll, save img/<name>.jpg (q88, <=2048px), append log.jsonl
import json,sys,os,time,urllib.request,threading,io,subprocess
K=os.environ['HEDRA_API_KEY'];B='https://api.hedra.com/v3'
def req(m,p,body=None):
  for i in range(12):
    r=urllib.request.Request(B+p,method=m,data=json.dumps(body).encode() if body is not None else None,headers={'X-API-Key':K,'Content-Type':'application/json'})
    try:return json.load(urllib.request.urlopen(r,timeout=120))
    except urllib.error.HTTPError as e:
      if e.code==429 and i<11:time.sleep(4+i*4);continue
      raise
def run(j):
  t0=time.time()
  try:
    est=req('POST',f"/models/{j['model']}/estimate",{'input':j['input']})
    sub=req('POST',f"/models/{j['model']}",{'input':j['input']});jid=sub.get('id') or sub.get('job_id')
    while True:
      time.sleep(8);st=req('GET',f'/jobs/{jid}/status')
      if st.get('status') in('COMPLETED','FAILED','CANCELLED'):break
    res=req('GET',f'/jobs/{jid}')
    url=None
    def f(o):
      nonlocal url
      if isinstance(o,dict):
        for k,v in o.items():
          if isinstance(v,str) and v.startswith('http') and url is None:url=v
          else:f(v)
      elif isinstance(o,list):
        for v in o:f(v)
    f(res.get('output') or res)
    out=f"img/{j['name']}.jpg"
    if url:
      raw=urllib.request.urlopen(url,timeout=120).read();open('/tmp/_h_'+j['name'],'wb').write(raw)
      subprocess.run(['convert','/tmp/_h_'+j['name'],'-resize','2048x2048>','-quality','88',out],check=True);os.remove('/tmp/_h_'+j['name'])
    rec={'name':j['name'],'model':j['model'],'input':{k:v for k,v in j['input'].items() if k!='prompt'},'prompt':j['input']['prompt'],'estimate':est,'status':st.get('status'),'job':jid,'secs':round(time.time()-t0),'file':out if url else None,'err':None if url else json.dumps(res)[:400]}
  except Exception as e:
    rec={'name':j['name'],'model':j['model'],'err':repr(e)[:400],'secs':round(time.time()-t0)}
  with open('log.jsonl','a') as fh:fh.write(json.dumps(rec)+'\n')
  print(j['name'],rec.get('status'),rec.get('estimate'),rec['secs'],rec.get('err'))
js=json.load(open(sys.argv[1]));ts=[threading.Thread(target=run,args=(j,)) for j in js]
[(t.start(),time.sleep(3)) for t in ts];[t.join() for t in ts]
