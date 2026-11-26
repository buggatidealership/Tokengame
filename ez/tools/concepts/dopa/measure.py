"""Measured checks for the R106 resolution cuts (see ez/x-dopamine-spec.md). python3 measure.py <video.mp4> [reveal_s]
C3 sync: the largest frame-to-frame change near the reveal against the loudest sound onset near it (ms apart).
C11 dead stretches: the longest run (before the final hold) where under 1.5% of pixels change by more than 6/255 between frames.
C8 length. Prints one line per check."""
import subprocess, sys, numpy as np
f = sys.argv[1]; tr = float(sys.argv[2]) if len(sys.argv) > 2 else None
W, Hh = 270, 338
raw = subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', f, '-vf', f'scale={W}:{Hh},format=gray', '-f', 'rawvideo', '-'], capture_output=True).stdout
v = np.frombuffer(raw, np.uint8).reshape(-1, Hh, W).astype(float); n = len(v); fps = 30
d = np.abs(np.diff(v, axis=0)); ch = (d > 6).mean(axis=(1, 2)); mag = d.mean(axis=(1, 2))
dur = n / fps
SR = 8000
a = np.frombuffer(subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', f, '-ac', '1', '-ar', str(SR), '-f', 's16le', '-'], capture_output=True).stdout, '<i2').astype(float)
hop = SR // 200; env = np.array([np.sqrt(np.mean(a[i * hop:(i + 1) * hop] ** 2)) for i in range(len(a) // hop)]); on = np.maximum(0, np.diff(env))
print(f'C8 length {dur:.2f} s')
if tr is not None:
    lo, hi = int((tr - .5) * fps), int((tr + .5) * fps); vi = lo + int(np.argmax(mag[lo:hi])) + 1
    alo, ahi = int((tr - .5) * 200), int((tr + .5) * 200); ai = alo + int(np.argmax(on[alo:ahi])) + 1
    print(f'C3 reveal sync: picture peak {vi / fps:.3f} s, sound onset {ai / 200:.3f} s, apart {abs(vi / fps - ai / 200) * 1000:.0f} ms (pass <= 67)')
# dead stretches until the last 2.5 s (the final hold)
end = int((dur - 2.5) * fps); run = best = 0; at = 0
for i in range(end):
    if ch[i] < .015: run += 1
    else: run = 0
    if run > best: best, at = run, i
print(f'C11 longest still stretch before the hold: {best / fps:.2f} s ending {at / fps:.2f} s (pass <= 1.2)')
