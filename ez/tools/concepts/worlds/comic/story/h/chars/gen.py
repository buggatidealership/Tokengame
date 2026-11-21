# python3 gen.py jobs.json [--estimate] : Hedra v3 jobs in parallel (from top2/gen.py). Keys per job: name, model, input,
#  refs:[files] -> input.images, src:file -> input.source_image, start/end:file -> input.start_image/end_image (video -> vid/<name>.mp4).
# Images are kept at native size: img/<name>.png (the model's own file) plus img/<name>.jpg (q95). Appends log.jsonl. Never prints the key.
import json,sys,os,time,urllib.request,threading,subprocess,uuid,mimetypes
K=os.environ['HEDRA_API_KEY'];B='https://api.hedra.com/v3';EST='--estimate' in sys.argv;UP={}
def req(m,p,body=None):
  for i in range(12):
    r=urllib.request.Request(B+p,method=m,data=json.dumps(body).encode() if body is not None else None,headers={'X-API-Key':K,'Content-Type':'application/json'})
    try:return json.load(urllib.request.urlopen(r,timeout=180))
    except urllib.error.HTTPError as e:
      if e.code==429 and i<11:time.sleep(4+i*4);continue
      raise Exception(e.code,e.read()[:400])
def up(path):
  if path in UP:return UP[path]
  bd='----h'+uuid.uuid4().hex;data=open(path,'rb').read();ct=mimetypes.guess_type(path)[0] or 'image/jpeg'
  body=(f'--{bd}\r\nContent-Disposition: form-data; name="file"; filename="{os.path.basename(path)}"\r\nContent-Type: {ct}\r\n\r\n').encode()+data+f'\r\n--{bd}--\r\n'.encode()
  r=urllib.request.Request(B+'/files',method='POST',data=body,headers={'X-API-Key':K,'Content-Type':'multipart/form-data; boundary='+bd})
  UP[path]=json.load(urllib.request.urlopen(r,timeout=180))['url'];return UP[path]
def run(j):
  t0=time.time();est=None
  try:
    inp=dict(j['input'])
    if j.get('refs'):inp['images']=[{'source':'url','url':up(f)} for f in j['refs']]
    if j.get('src'):inp['source_image']={'source':'url','url':up(j['src'])}
    if j.get('start'):inp['start_image']={'source':'url','url':up(j['start'])}
    if j.get('end'):inp['end_image']={'source':'url','url':up(j['end'])}
    est=req('POST',f"/models/{j['model']}/estimate",{'input':inp})
    if EST:print(j['name'],est.get('cost'),flush=True);return
    sub=req('POST',f"/models/{j['model']}",{'input':inp});jid=sub.get('id') or sub.get('job_id')
    while True:
      time.sleep(8);st=req('GET',f'/jobs/{jid}/status')
      if st.get('status') in('COMPLETED','FAILED','CANCELLED'):break
    res=req('GET',f'/jobs/{jid}');url=None
    def f(o):
      nonlocal url
      if isinstance(o,dict):
        for k,v in o.items():
          if isinstance(v,str) and v.startswith('http') and url is None and k!='url_in':url=v
          else:f(v)
      elif isinstance(o,list):
        for v in o:f(v)
    f(res.get('output') or res.get('outputs') or res)
    vid=j['model'] not in IMGM;out=f"vid/{j['name']}.mp4" if vid else f"img/{j['name']}.png"
    if url:
      data=urllib.request.urlopen(url,timeout=600).read();open(out,'wb').write(data)
      if not vid:subprocess.run(['convert',out,'-quality','95',out[:-4]+'.jpg'],check=True)
    rec={'name':j['name'],'model':j['model'],'input':{k:v for k,v in j['input'].items() if k!='prompt'},'refs':j.get('refs'),'src':j.get('src'),'start':j.get('start'),'end':j.get('end'),'prompt':j['input'].get('prompt'),'cost':est.get('cost'),'status':st.get('status'),'job':jid,'secs':round(time.time()-t0),'file':out if url else None,'err':None if url else json.dumps(res)[:400]}
  except Exception as e:
    rec={'name':j['name'],'model':j['model'],'cost':est and est.get('cost'),'err':repr(e)[:400],'secs':round(time.time()-t0)}
  with open('log.jsonl','a') as fh:fh.write(json.dumps(rec)+'\n')
  print(j['name'],rec.get('status'),rec.get('cost'),rec['secs'],rec.get('err'),flush=True)
IMGM={'nano-banana-pro','gpt-image-2','seedream-50-pro','topaz-image-upscaler','nano-banana-2','flux-kontext','reve-21-edit'}
js=json.load(open(sys.argv[1]));ts=[threading.Thread(target=run,args=(j,)) for j in js]
[(t.start(),time.sleep(2)) for t in ts];[t.join() for t in ts]
