#!/usr/bin/env python3
# up.py <name> <source jpg/png> <1080p|2K>: Topaz upscale of a picked draft (keeps the composition, so the measured wires stay put)
import sys,json,time,os,subprocess,urllib.request
import hd
_,name,src,res=sys.argv
inp={'source_image':{'source':'url','url':hd.upload(src)},'target_resolution':res}
est=hd.req('POST','/models/topaz-image-upscaler/estimate',json.dumps({'input':inp}).encode())
t0=time.time();j=hd.req('POST','/models/topaz-image-upscaler',json.dumps({'input':inp}).encode());jid=j['job_id']
while True:
  time.sleep(8);s=hd.req('GET',f'/jobs/{jid}/status');st=s.get('status')
  if st in('COMPLETED','FAILED','CANCELLED','EXPIRED'):break
res_=hd.req('GET',f'/jobs/{jid}');rec={'name':name,'model':'topaz-image-upscaler','input':{'target_resolution':res},'refs':[os.path.basename(src)],'cost':est.get('cost'),'time_s':round(time.time()-t0),'status':st,'job':jid}
if st=='COMPLETED':
  raw=f'{hd.D}/raw/{name}.png';urllib.request.urlretrieve(res_['outputs'][0]['url'],raw)
  subprocess.run(['convert',raw,'-resize','2560x2560>','-quality','88',f'{hd.D}/img/{name}.jpg']);rec['file']=f'img/{name}.jpg'
else: rec['error']=res_.get('error') or s
open(f'{hd.D}/jobs.jsonl','a').write(json.dumps(rec)+'\n');print(json.dumps(rec)[:300])
