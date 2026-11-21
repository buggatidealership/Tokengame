#!/usr/bin/env python3
"""python3 key.py <in.png> <out.webp> [width] : key a Hedra painting off its flat #0000FF ground into a transparent webp, trimmed to the object.
Alpha from how much blue leads the other two channels (soft between LO and HI), blue spill pulled down to the larger of red and green,
then cropped to the alpha box plus a few pixels and resized to <width> (default: as is)."""
import subprocess, sys, json, numpy as np
src, out = sys.argv[1], sys.argv[2]; W = int(sys.argv[3]) if len(sys.argv) > 3 else 0
LO, HI = 34, 110
pr = json.loads(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'stream=width,height', '-of', 'json', src], capture_output=True).stdout)['streams'][0]
w, h = pr['width'], pr['height']
a = np.frombuffer(subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', src, '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], capture_output=True).stdout, np.uint8).reshape(h, w, 3).astype(float)
r, g, b = a[..., 0], a[..., 1], a[..., 2]; mx = np.maximum(r, g); k = b - mx
al = np.clip(1 - (k - LO) / (HI - LO), 0, 1)
b2 = np.where(b > mx, mx + (b - mx) * .15, b)                       # despill
rgba = np.dstack([r, g, b2, al * 255]).clip(0, 255).astype(np.uint8)
ys, xs = np.where(al > .03); P = 6
y0, y1, x0, x1 = max(0, ys.min() - P), min(h, ys.max() + P + 1), max(0, xs.min() - P), min(w, xs.max() + P + 1)
c = np.ascontiguousarray(rgba[y0:y1, x0:x1]); ch, cw = c.shape[:2]
vf = f'scale={W}:-1:flags=lanczos' if W else 'null'
subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgba', '-s', f'{cw}x{ch}', '-i', '-', '-vf', vf, '-c:v', 'libwebp', '-lossless', '0', '-quality', '92', '-pix_fmt', 'yuva420p', out], input=c.tobytes(), check=True)
o = json.loads(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'stream=width,height', '-of', 'json', out], capture_output=True).stdout)['streams'][0]
print(f'{out}: crop {x0},{y0} {cw}x{ch} -> {o["width"]}x{o["height"]}')
