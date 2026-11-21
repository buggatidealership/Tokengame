#!/usr/bin/env python3
"""Build the night studio review page: python3 mk.py  (reads manifest.json beside it, writes dist/).

Videos are copied as they are when 14 MB or less, else re-encoded at CRF 26 (picture only changes in size);
each gets a poster from 40% of its length. Boards (PNG) become JPEGs at most 1600 px wide, quality 82.
Paths in the manifest are relative to ez/. Missing media is skipped and listed."""
import json, os, shutil, subprocess, datetime

H = os.path.dirname(os.path.abspath(__file__)); EZ = os.path.abspath(os.path.join(H, '..', '..', '..', '..'))
D = os.path.join(H, 'dist'); os.makedirs(os.path.join(D, 'v'), exist_ok=True); os.makedirs(os.path.join(D, 'i'), exist_ok=True)
M = json.load(open(os.path.join(H, 'manifest.json')))
missing = []

def dur(p):
    return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p], capture_output=True, text=True).stdout.strip() or 0)

def video(rel, key):
    src = os.path.join(EZ, rel)
    if not os.path.exists(src): missing.append(rel); return None, None
    out, post = os.path.join(D, 'v', key + '.mp4'), os.path.join(D, 'v', key + '.jpg')
    if not os.path.exists(out) or os.path.getmtime(out) < os.path.getmtime(src):
        if os.path.getsize(src) <= 14e6: shutil.copyfile(src, out)
        else: subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', src, '-c:v', 'libx264', '-crf', '26', '-preset', 'medium', '-c:a', 'copy', '-movflags', '+faststart', out], check=True)
        subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-ss', str(round(dur(src) * .4, 2)), '-i', src, '-frames:v', '1', '-vf', 'scale=720:-1', '-q:v', '4', post], check=True)
    return 'v/' + key + '.mp4', 'v/' + key + '.jpg'

def board(rel, key):
    src = os.path.join(EZ, rel)
    if not os.path.exists(src): missing.append(rel); return None
    out = os.path.join(D, 'i', key + '.jpg')
    if not os.path.exists(out) or os.path.getmtime(out) < os.path.getmtime(src):
        subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', src, '-vf', "scale='min(1600,iw)':-1", '-q:v', '5', out], check=True)
    return 'i/' + key + '.jpg'

shutil.copyfile(os.path.join(EZ, 'tools', 'v22', 'x2p-logo.svg'), os.path.join(D, 'i', 'ezlogo.svg'))
for s in M['sections']:
    for it in s.get('items', []):
        if it.get('src'):
            v, p = video(it.pop('src'), it['id'].lower().replace(' ', '-'))
            if v: it['video'], it['poster'] = v, p
        if it.get('srcb'):
            bs = [board(b, it['id'].lower().replace(' ', '-') + '-' + str(n)) for n, b in enumerate(it.pop('srcb'))]
            bs = [b for b in bs if b]
            if bs: it['boards'] = bs
M['built'] = datetime.datetime.utcnow().strftime('%a %d %b, %H:%M UTC')
html = open(os.path.join(H, 'template.html')).read().replace('__DATA__', json.dumps(M, ensure_ascii=False))
open(os.path.join(D, 'index.html'), 'w').write(html)
tot = sum(os.path.getsize(os.path.join(r, f)) for r, _, fs in os.walk(D) for f in fs)
print('built', os.path.join(D, 'index.html'), '| total', round(tot / 1e6, 1), 'MB')
if missing: print('MISSING:', *missing, sep='\n  ')
