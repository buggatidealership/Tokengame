#!/usr/bin/env python3
"""python3 bedx.py <out name> '<json segments>' : cut a bed for a video from pieces of a generated track, joined on its beat grid with a
15 ms crossfade, so the drops land where the cut needs them. Each segment is [bed, start s, end s] or [bed, start s, end s, "lp"]
("lp": a low-pass that opens over the piece's last 3 s and sits 5 dB down before that: the DJ's filter build, for a track with no quiet
intro of its own). Writes launchvid/hedra/music/<out name>.mp3 and prints the loudness in 0.25 s steps."""
import subprocess, sys, json, numpy as np
H = '/home/user/Tokengame/ez/tools/concepts/launchvid/hedra/music/'; SR = 48000
def load(f):
    raw = subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', H + f + '.mp3', '-ac', '2', '-ar', str(SR), '-f', 's16le', '-'], capture_output=True).stdout
    return np.frombuffer(raw, '<i2').reshape(-1, 2).astype(float) / 32768
def lp_sweep(x):
    n = len(x); t = np.arange(n) / SR; T = n / SR; k = np.clip((t - (T - 3)) / 3, 0, 1) ** 2
    fc = 350 * (18000 / 350) ** k; a = 1 - np.exp(-2 * np.pi * fc / SR); y = np.zeros_like(x); s1 = np.zeros(2); s2 = np.zeros(2)
    for i in range(n):  # two one-pole stages, cutoff moving
        s1 += a[i] * (x[i] - s1); s2 += a[i] * (s1 - s2); y[i] = s2
    g = 10 ** ((-5 * (1 - k)) / 20); return y * g[:, None]
out, segs = sys.argv[1], json.loads(sys.argv[2]); cache = {}; xf = int(.015 * SR); res = None
for s in segs:
    b = cache.setdefault(s[0], load(s[0])); p = b[int(s[1] * SR):int(s[2] * SR) + xf].copy()
    if len(s) > 3 and s[3] == 'lp': p = lp_sweep(p)
    if res is None: res = p[:len(p) - xf] if len(segs) > 1 else p; tail = p[len(p) - xf:]; continue
    r = np.linspace(0, 1, xf)[:, None]; p[:xf] = p[:xf] * r + tail * (1 - r); tail = p[len(p) - xf:]; res = np.concatenate([res, p[:len(p) - xf]])
fo = int(.6 * SR); res[-fo:] *= np.linspace(1, 0, fo)[:, None]
subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-f', 's16le', '-ar', str(SR), '-ac', '2', '-i', '-', '-b:a', '192k', H + out + '.mp3'], input=(np.clip(res, -1, 1) * 32767).astype('<i2').tobytes())
m = res.mean(1); q = SR // 4
print(out, f'{len(res) / SR:.2f} s'); print(' '.join(f'{20 * np.log10(np.sqrt((m[i:i + q] ** 2).mean()) + 1e-6):.0f}' for i in range(0, len(m) - q, q)))
