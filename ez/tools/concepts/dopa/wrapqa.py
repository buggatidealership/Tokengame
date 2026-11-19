#!/usr/bin/env python3
"""python3 wrapqa.py <video.mp4> : the picture-side checks of WRAP-BRIEF.md round 6 on a rendered video.
"Not a PDF slideshow" = something moves in every half second: frames at 10 a second, shrunk to 108x135 grey (so film grain averages out),
and the mean change between neighbours; a half-second window whose every step changes less than 0.8 grey levels counts as frozen, and the median window must reach 3.5
(measured 2026-11-19: the glass wrap-up he called a slideshow scores 0.41 and 1.69, the NVIDIA resolution video 0.47 and 3.78).
Also prints the size, length, bitrate and the loudness second by second."""
import subprocess, sys, json, numpy as np
f = sys.argv[1]; W, H = 108, 135; PREV = '--prev' in sys.argv  # --prev: a prev.js preview (10 fps, no sound): motion only
pr = json.loads(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration,bit_rate:stream=codec_name,width,height,r_frame_rate', '-of', 'json', f], capture_output=True).stdout)
v = [s for s in pr['streams'] if s.get('width')][0]; dur = float(pr['format']['duration'])
raw = subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', f, '-vf', f'fps=10,scale={W}:{H},format=gray', '-f', 'rawvideo', '-'], capture_output=True).stdout
fr = np.frombuffer(raw, np.uint8).reshape(-1, H, W).astype(float); d = np.abs(np.diff(fr, axis=0)).mean((1, 2))
win = [d[i:i + 5].max() for i in range(0, len(d) - 4, 5)]; frozen = [i * .5 for i, m in enumerate(win) if m < .8]
a = np.zeros(1) if PREV else np.frombuffer(subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', f, '-ac', '1', '-ar', '8000', '-f', 's16le', '-'], capture_output=True).stdout, '<i2').astype(float) / 32768
db = [20 * np.log10(np.sqrt((a[i:i + 8000] ** 2).mean()) + 1e-6) for i in range(0, len(a) - 7999, 8000)]
bad = 0
def ok(c, m):
    global bad; print(('PASS ' if c else 'FAIL ') + m); bad += 0 if c else 1
if not PREV: ok(v['width'] == 1080 and v['height'] == 1350 and v['r_frame_rate'] == '30/1', f"{v['width']}x{v['height']} {v['r_frame_rate']} {v['codec_name']}")
ok(28 <= dur <= 36.1, f'length {dur:.2f} s (28 to 36)')
ok(not frozen, f'something moves in every half second ({len(frozen)} frozen windows' + (': at ' + ', '.join(f'{t:.1f}' for t in frozen[:12]) if frozen else '') + f'; quietest window {min(win):.2f}, median {np.median(win):.2f} grey levels)')
ok(np.median(win) >= 3.5, f'median motion {np.median(win):.2f} grey levels (at least 3.5; the old wrap-up 1.69)')
if not PREV: ok(len(db) > 5 and max(db) > -20, 'sound present, loudest second %.0f dB' % max(db))
if not PREV: print('dB per second:', ' '.join('%.0f' % x for x in db))
print(f"size {int(pr['format'].get('bit_rate', 0)) / 1e6:.1f} Mb/s"); print('ALL PICTURE CHECKS PASS' if not bad else f'{bad} CHECKS FAIL'); sys.exit(1 if bad else 0)
