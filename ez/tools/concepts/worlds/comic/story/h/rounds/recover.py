#!/usr/bin/env python3
# recover.py <job_id> [name]  : fetch a finished job whose poller died; name from the prompt's theme if not given
import sys,json,os,subprocess,urllib.request,time;import hd
jid=sys.argv[1];res=hd.req('GET',f'/jobs/{jid}')
while res.get('status') not in('COMPLETED','FAILED','CANCELLED','EXPIRED'):time.sleep(8);res=hd.req('GET',f'/jobs/{jid}')
name=sys.argv[2] if len(sys.argv)>2 else None
pr=json.dumps(res)
if not name:
  th=json.load(open('themes.json'))
  for n,t in th.items():
    if t[:40] in pr: name='t1-'+n
print(jid,name,res.get('status'),res.get('model'))
if res.get('status')=='COMPLETED' and name:
  url=res['outputs'][0]['url'];tmp='/tmp/claude-0/hd-'+name;urllib.request.urlretrieve(url,tmp)
  o=f'img/{name}.jpg';subprocess.run(['convert',tmp,'-resize','2048x2048>','-quality','88',o]);os.remove(tmp)
  rec={'name':name,'model':res.get('model'),'job':jid,'status':'COMPLETED','file':o,'recovered':True,'size':subprocess.run(['identify','-format','%wx%h',o],capture_output=True,text=True).stdout}
  open('jobs.jsonl','a').write(json.dumps(rec)+'\n')
