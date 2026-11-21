# python3 vgen.py : seedance-15-pro image-to-video loops (start = end frame), 720p, no audio; saves img/<name>.mp4
import json,os,time,urllib.request,threading,subprocess
K=os.environ['HEDRA_API_KEY'];B='https://api.hedra.com/v3'
log={json.loads(l)['name']:json.loads(l) for l in open('log.jsonl')}
def req(m,p,body=None):
  for i in range(12):
    r=urllib.request.Request(B+p,method=m,data=json.dumps(body).encode() if body is not None else None,headers={'X-API-Key':K,'Content-Type':'application/json'})
    try:return json.load(urllib.request.urlopen(r,timeout=120))
    except urllib.error.HTTPError as e:
      if e.code==429 and i<11:time.sleep(5+i*4);continue
      print(e.read()[:500]);raise
STILL="The camera is locked off and does not move at all. No new objects appear. No text, no people. "
import sys
V=[('v-clock-p','g-clock-p','adaptive',STILL+"Subtle living motion only: steam rises slowly from the street vents, a few lit windows flicker, the sky colours drift very slightly."),
   ('v-clock-d','g-clock-d','16:9',STILL+"Subtle living motion only: steam rises slowly from the street vents, a few lit windows flicker, the sky colours drift very slightly.")]
def run(n,src,ar,pr):
  t0=time.time();aid='asset_'+log[src]['job'].split('_',1)[1];img={'source':'asset','asset_id':aid}
  inp={'prompt':pr,'aspect_ratio':ar,'resolution':'720p','duration_ms':5000,'generate_audio':False,'start_image':img,'end_image':img}
  try:
    est=req('POST','/models/seedance-15-pro/estimate',{'input':inp});sub=req('POST','/models/seedance-15-pro',{'input':inp});jid=sub.get('id') or sub.get('job_id')
    while True:
      time.sleep(10);st=req('GET',f'/jobs/{jid}/status')
      if st.get('status') in('COMPLETED','FAILED','CANCELLED'):break
    res=req('GET',f'/jobs/{jid}');url=None
    def f(o):
      nonlocal url
      if isinstance(o,dict):
        for v in o.values():
          if isinstance(v,str) and v.startswith('http') and '.mp4' in v.split('?')[0] and url is None:url=v
          else:f(v)
      elif isinstance(o,list):
        for v in o:f(v)
    f(res)
    if url:open(f'img/{n}.mp4','wb').write(urllib.request.urlopen(url,timeout=180).read())
    rec={'name':n,'model':'seedance-15-pro','input':{k:v for k,v in inp.items() if k!='prompt'},'prompt':pr,'estimate':est,'status':st.get('status'),'job':jid,'secs':round(time.time()-t0),'file':f'img/{n}.mp4' if url else None,'err':None if url else json.dumps(res)[:400]}
  except Exception as e:rec={'name':n,'err':repr(e)[:300],'secs':round(time.time()-t0)}
  open('log.jsonl','a').write(json.dumps(rec)+'\n');print(n,rec.get('status'),rec.get('estimate'),rec['secs'],rec.get('err'))
ts=[threading.Thread(target=run,args=v) for v in V];[(t.start(),time.sleep(3)) for t in ts];[t.join() for t in ts]
