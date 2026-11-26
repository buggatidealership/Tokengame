"""Animate the glass pack with Kling V3: start = the sealed pack (img/q1a.png), end = the four cards standing (img/q1c.png),
both without any text (the words are composited on the held frames before and after, since a video model garbles letters).
Kling takes 9:16, so both frames are padded to 1536x2731 with the scene's near-black; the 4:5 cut is taken later from the
middle (the padding never shows). Writes img/pv-<name>.mp4. Usage: python3 packvid.py <name> [seconds]"""
import json, os, subprocess, sys, time, urllib.request, importlib.util
D = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location('hd', D + '/hd.py'); hd = importlib.util.module_from_spec(spec); spec.loader.exec_module(hd)
name = sys.argv[1]; secs = float(sys.argv[2]) if len(sys.argv) > 2 else 5
def pad(src, out):
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', src, '-vf', 'pad=1536:2731:0:341:color=0x0e0c0b', out], check=True)
    return out
s = hd.upload(pad(D + '/img/q1a.png', D + '/raw/pv-start.png')); e = hd.upload(pad(D + '/img/q1c.png', D + '/raw/pv-end.png'))
prompt = ('A photoreal luxury product film. The sealed glass trading-card pack holds still for half a second, then its front glass '
          'layers slide up and apart with weight, and four thick glass cards rise out of it and fan toward the camera, turning '
          'gently; they glide down and land standing upright in a row on the dark glossy floor: the leftmost card lifts higher '
          'and fills with warm gold light, the three cards on the right settle lower with faint red glows on their edges, while '
          'the empty glass pack drifts back out of focus. Slow steady camera push-in, light glints sweep across the bevelled '
          'glass edges, caustics shimmer on the floor. Same lighting, colours and materials as the frames: near-black, warm '
          'cream, gold, small green and red accents. Elegant, weighty, smooth motion, no cuts. The cards stay blank, no text.')
inp = {'prompt': prompt, 'negative_prompt': 'text, letters, numbers, logos, watermark, blur, morphing, warping, extra cards, people, hands',
       'aspect_ratio': '9:16', 'resolution': '1080p', 'quality': 'pro', 'duration_ms': int(secs * 1000), 'generate_audio': False,
       'start_image': {'source': 'url', 'url': s}, 'end_image': {'source': 'url', 'url': e}}
est = hd.req('POST', '/models/kling-v3/estimate', json.dumps({'input': inp}).encode()); print('estimate', est.get('cost'))
j = hd.req('POST', '/models/kling-v3', json.dumps({'input': inp}).encode()); jid = j['job_id']; t0 = time.time()
while True:
    time.sleep(15); st = hd.req('GET', f'/jobs/{jid}/status').get('status')
    if st in ('COMPLETED', 'FAILED', 'CANCELLED', 'EXPIRED'): break
res = hd.req('GET', f'/jobs/{jid}'); rec = {'name': 'pv-' + name, 'model': 'kling-v3', 'cost': est.get('cost'), 'time_s': round(time.time() - t0), 'status': st, 'job': jid}
if st == 'COMPLETED':
    urllib.request.urlretrieve(res['outputs'][0]['url'], D + f'/img/pv-{name}.mp4'); rec['file'] = f'img/pv-{name}.mp4'
else: rec['error'] = res.get('error')
open(D + '/jobs.jsonl', 'a').write(json.dumps(rec) + '\n'); print(json.dumps(rec)[:300])
