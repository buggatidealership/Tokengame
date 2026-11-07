#!/usr/bin/env python3
# vid.py <name> <start.jpg> '<prompt>' : kling-25-turbo 5 s loop from a still; saves img/<name>.mp4 (640px, no sound) and logs to jobs.jsonl.
import os,sys,json,time,subprocess,urllib.request
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from hd import req,upload,D
name,start,prompt=sys.argv[1:4]
inp={'prompt':prompt,'duration_ms':5000,'aspect_ratio':'1:1','resolution':'1080p','start_image':{'source':'url','url':upload(start)},
     'negative_prompt':'text, letters, numbers, morphing face, camera cut, extra fingers'}
est=req('POST','/models/kling-25-turbo/estimate',json.dumps({'input':inp}).encode())
t0=time.time();j=req('POST','/models/kling-25-turbo',json.dumps({'input':inp}).encode());jid=j['job_id']
while True:
  time.sleep(10);st=req('GET',f'/jobs/{jid}/status').get('status')
  if st in('COMPLETED','FAILED','CANCELLED','EXPIRED'):break
res=req('GET',f'/jobs/{jid}');rec={'name':name,'model':'kling-25-turbo','input':{'prompt':prompt},'refs':[os.path.basename(start)],'cost':est.get('cost'),'time_s':round(time.time()-t0),'status':st,'job':jid}
if st=='COMPLETED':
  raw=f'{D}/raw/{name}.mp4';os.makedirs(D+'/raw',exist_ok=True);urllib.request.urlretrieve(res['outputs'][0]['url'],raw)
  subprocess.run(['ffmpeg','-y','-loglevel','error','-i',raw,'-an','-vf','scale=640:640','-c:v','libx264','-pix_fmt','yuv420p','-crf','23','-movflags','+faststart',f'{D}/img/{name}.mp4'])
  rec['file']=f'img/{name}.mp4'
else: rec['error']=res.get('error')
open(f'{D}/jobs.jsonl','a').write(json.dumps(rec)+'\n');print(json.dumps({k:rec[k] for k in rec if k!='input'}))
