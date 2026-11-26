#!/usr/bin/env python3
# python3 hchip.py <name> [model] : a 5 s living-light clip of the site's painted NVIDIA chip (ez/media/bet-chip-h2.jpg) from Hedra
# (image to video, camera locked so the page's own overlays keep tracking the four dies). Saves hedra/<name>.mp4 and a line in
# hedra/jobs.jsonl. EST=1 prints the cost only. Never prints the key.
import os, sys, json, time, subprocess, urllib.request
K = os.environ['HEDRA_API_KEY']; H = 'https://api.hedra.com/v3'; D = os.path.dirname(os.path.abspath(__file__)) + '/hedra'; os.makedirs(D, exist_ok=True)
SRC = os.path.abspath(os.path.dirname(os.path.abspath(__file__)) + '/../../../media/bet-chip-h2.jpg')
def req(m, p, body=None):
    r = urllib.request.Request(H + p, data=body, method=m, headers={'X-API-Key': K, 'Content-Type': 'application/json'})
    for i in range(30):
        try:
            with urllib.request.urlopen(r, timeout=120) as f: return json.load(f)
        except urllib.error.HTTPError as e:
            b = e.read()
            if e.code == 429: time.sleep(15 + i); continue
            raise SystemExit(f'{m} {p} -> {e.code} {b[:600]}')
        except Exception: time.sleep(5)
name = sys.argv[1]; model = sys.argv[2] if len(sys.argv) > 2 else 'kling-26-pro'
prompt = ('Locked-off static camera on a tripod: no camera movement, no zoom, no pan, no rotation. The green circuit board chip and its four black '
          'glass dies stay perfectly still and keep their exact shape and position. Only the light is alive: the golden light rays behind the chip '
          'slowly shimmer and breathe, fine dust drifts through the beams, the green and red rim lights along the gold pins pulse gently, and a soft '
          'highlight glides slowly across the four black glass dies. Subtle, cinematic, painted comic style kept exactly.')
if os.environ.get('EST'):
    url = 'https://example.com/x.jpg'
else:
    url = json.loads(subprocess.run(['curl', '-s', '-X', 'POST', H + '/files', '-H', 'X-API-Key: ' + K, '-F', 'file=@' + SRC], capture_output=True, text=True).stdout)['url']
inp = {'prompt': prompt, 'aspect_ratio': '16:9', 'resolution': '1080p', 'duration_ms': 5000, 'start_image': {'source': 'url', 'url': url},
       'negative_prompt': 'text, letters, numbers, logos, camera movement, camera shake, zoom, morphing, distortion, new objects'}
if model == 'kling-26-pro': inp['generate_audio'] = False
est = req('POST', f'/models/{model}/estimate', json.dumps({'input': inp}).encode())
if os.environ.get('EST'): print(est); sys.exit()
j = req('POST', f'/models/{model}', json.dumps({'input': inp}).encode()); jid = j['job_id']; t0 = time.time()
while True:
    time.sleep(10); s = req('GET', f'/jobs/{jid}/status'); st = s.get('status')
    if st in ('COMPLETED', 'FAILED', 'CANCELLED', 'EXPIRED'): break
res = req('GET', f'/jobs/{jid}'); rec = {'name': name, 'model': model, 'prompt': prompt, 'cost': est.get('cost'), 'time_s': round(time.time() - t0), 'status': st, 'job': jid}
if st == 'COMPLETED':
    urllib.request.urlretrieve(res['outputs'][0]['url'], f'{D}/{name}.mp4'); rec['file'] = f'hedra/{name}.mp4'
else: rec['error'] = res.get('error') or s
open(f'{D}/jobs.jsonl', 'a').write(json.dumps(rec) + '\n'); print(json.dumps(rec)[:500])
