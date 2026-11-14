# python3 fetch.py : re-download every completed job in log.jsonl at its native size (gen.py keeps a <=2048 copy) into master/<name>.png
import json,os,urllib.request,subprocess
K=os.environ['HEDRA_API_KEY']
for l in open('log.jsonl'):
  r=json.loads(l)
  if not r.get('job') or os.path.exists('master/'+r['name']+'.png'):continue
  res=json.load(urllib.request.urlopen(urllib.request.Request('https://api.hedra.com/v3/jobs/'+r['job'],headers={'X-API-Key':K}),timeout=60));url=[None]
  def f(o):
    if isinstance(o,dict):
      for k,v in o.items():
        if isinstance(v,str) and v.startswith('http') and url[0] is None:url[0]=v
        else:f(v)
    elif isinstance(o,list):[f(v) for v in o]
  f(res.get('output') or res.get('outputs') or res)
  open('master/'+r['name']+'.png','wb').write(urllib.request.urlopen(url[0],timeout=300).read())
  print(r['name'],subprocess.run(['identify','-format','%wx%h %b','master/'+r['name']+'.png'],capture_output=True,text=True).stdout)
