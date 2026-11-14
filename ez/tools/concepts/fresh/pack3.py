"""Low-res animations of the three card packs (2026-11-11, owner: "give me an animation for all three... not 4K, just low
resolution"). Step 1 'seal': paint each pack sealed (ref: its opened painting), so the shot can start closed. Step 2 'vid':
Kling V3 standard (720p, 9:16, no audio) from the sealed frame to the graded opened frame, both padded to 9:16 with the
scene's near-black; the motion in each prompt is the material's own way of opening. Usage: python3 pack3.py seal f t p |
python3 pack3.py vid f t p"""
import json, os, subprocess, sys, time, urllib.request, importlib.util
D = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location('hd', D + '/hd.py'); hd = importlib.util.module_from_spec(spec); spec.loader.exec_module(hd)
MAT = {'f': 'crinkled black-and-gold foil booster pack', 't': 'black felt pouch with gold blanket stitching', 'p': 'black paper pop-up pack with a gold foil border'}
OPEN = {
 'f': 'the foil wrapper tears open along its top with a crinkling rip, the four cream cards slide up out of it and drop into a row in front of the pack',
 't': 'the gold stitches along the top of the felt pouch unravel and the felt top frays open, the four felt cards are pulled up out of it and set down in a row in front of the pouch',
 'p': 'the black paper pack unfolds like a pop-up book, its panels hinge open and the four paper cards spring up on their folded tabs into a row',
}
mode, keys = sys.argv[1], sys.argv[2:]
def run(job):
    est = hd.req('POST', f"/models/{job['model']}/estimate", json.dumps({'input': job['input']}).encode())
    j = hd.req('POST', f"/models/{job['model']}", json.dumps({'input': job['input']}).encode())
    return job | {'id': j['job_id'], 'cost': est.get('cost'), 't0': time.time()}
jobs = []
for k in keys:
    if mode == 'seal':
        url = hd.upload(D + f'/raw/p2{k}.png')
        prompt = (f'The same {MAT[k]} as the reference image, same material, lighting, near-black background and floor, but now sealed '
                  'and closed, with all four cards still inside it and none outside. The pack stands upright, centred, a little larger '
                  'in the frame, its front a large plain blank label area in its middle. No text, no letters, no numbers, no logos.')
        jobs.append(run({'name': f's3{k}', 'model': 'gpt-image-2', 'out': f'raw/s3{k}.png', 'input': {'prompt': prompt, 'aspect_ratio': '3:4',
                    'resolution': '2K', 'quality': 'high', 'output_format': 'png', 'images': [{'source': 'url', 'url': url}]}}))
    else:
        pads = []
        for src, nm in ((f'img/s3{k}g.png', 'start'), (f'img/q2{k}.png', 'end')):
            out = D + f'/raw/pv3{k}-{nm}.png'
            subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', D + '/' + src, '-vf', 'pad=1536:2731:0:341:color=0x0e0c0b', out], check=True)
            pads.append(hd.upload(out))
        prompt = (f'A photoreal handmade product film. The sealed {MAT[k]} holds still for half a second, then {OPEN[k]}. The leftmost '
                  'card stands a little higher than the other three. Slow steady camera push-in, soft warm key light, the material behaves '
                  'physically with weight and texture. Same lighting, colours and materials as the frames: near-black, warm cream, gold, '
                  'small green and red accents. Smooth motion, no cuts. The cards stay blank, no text.')
        jobs.append(run({'name': f'pv3{k}', 'model': 'kling-v3', 'out': f'img/pv3{k}.mp4', 'input': {'prompt': prompt,
                    'negative_prompt': 'text, letters, numbers, logos, watermark, morphing, warping, extra cards, people, hands',
                    'aspect_ratio': '9:16', 'resolution': '720p', 'quality': 'standard', 'duration_ms': 5000, 'generate_audio': False,
                    'start_image': {'source': 'url', 'url': pads[0]}, 'end_image': {'source': 'url', 'url': pads[1]}}}))
left = list(jobs)
while left:
    time.sleep(15)
    for j in list(left):
        st = hd.req('GET', f"/jobs/{j['id']}/status").get('status')
        if st in ('COMPLETED', 'FAILED', 'CANCELLED', 'EXPIRED'):
            left.remove(j); res = hd.req('GET', f"/jobs/{j['id']}")
            rec = {'name': j['name'], 'model': j['model'], 'cost': j['cost'], 'time_s': round(time.time() - j['t0']), 'status': st, 'job': j['id']}
            if st == 'COMPLETED': urllib.request.urlretrieve(res['outputs'][0]['url'], D + '/' + j['out']); rec['file'] = j['out']
            else: rec['error'] = res.get('error')
            open(D + '/jobs.jsonl', 'a').write(json.dumps(rec) + '\n'); print(json.dumps(rec)[:220])
