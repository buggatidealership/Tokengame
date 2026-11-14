#!/usr/bin/env python3
# Hedra v3 image-to-video: vid.py <name> <model> '<json input>' <ref.jpg>  -> img/<name>.mp4 (never prints the key)
import os,sys,json,time,urllib.request
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)));import hd
_,name,model,inp,ref=sys.argv;inp=json.loads(inp);inp['start_image']={'source':'url','url':hd.upload(ref)}
est=hd.req('POST',f'/models/{model}/estimate',json.dumps({'input':inp}).encode());print('estimate',est.get('cost'),flush=True)
j=hd.req('POST',f'/models/{model}',json.dumps({'input':inp}).encode());jid=j['job_id'];t0=time.time()
while True:
  time.sleep(8);st=hd.req('GET',f'/jobs/{jid}/status').get('status')
  if st in('COMPLETED','FAILED','CANCELLED','EXPIRED'):break
res=hd.req('GET',f'/jobs/{jid}')
if st=='COMPLETED':urllib.request.urlretrieve(res['outputs'][0]['url'],f'img/{name}.mp4');print('ok',name,round(time.time()-t0),'s')
else:print('fail',st,json.dumps(res)[:400])
