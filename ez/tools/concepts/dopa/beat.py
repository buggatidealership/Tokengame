#!/usr/bin/env python3
"""python3 beat.py <bed name> [lo bpm] [hi bpm] : duration, tempo, the time of the first beat (phase) and the loudness second by second
of a bed in launchvid/hedra/music, so a page can put its cuts on the beat grid (t = phase + n * 60 / bpm) and its reveals on the drops.
Tempo: autocorrelation of the onset envelope (energy rise in 10 ms frames); phase: the grid offset that collects the most onset energy."""
import subprocess, sys, numpy as np
H = '/home/user/Tokengame/ez/tools/concepts/launchvid/hedra/music/'
name = sys.argv[1]; lo = float(sys.argv[2]) if len(sys.argv) > 2 else 120; hi = float(sys.argv[3]) if len(sys.argv) > 3 else 180
SR = 22050
raw = subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', H + name + '.mp3', '-ac', '1', '-ar', str(SR), '-f', 's16le', '-'], capture_output=True).stdout
x = np.frombuffer(raw, '<i2').astype(float) / 32768; dur = len(x) / SR
hop = 220; n = len(x) // hop; e = np.sqrt((x[:n * hop].reshape(n, hop) ** 2).mean(1) + 1e-12)
on = np.maximum(0, np.diff(np.log(e + 1e-4), prepend=np.log(e[0] + 1e-4))); fps = SR / hop
best = (0, 0)
for bpm in np.arange(lo, hi + .01, .05):
    p = 60 / bpm * fps; k = np.arange(1, 33); idx = np.round(k * p).astype(int); idx = idx[idx < len(on) - 1]
    s = sum(float((on[:-i] * on[i:]).sum()) for i in idx) / len(idx)
    if s > best[0]: best = (s, bpm)
bpm = best[1]; p = 60 / bpm
ph = max(np.arange(0, p, .005), key=lambda o: on[np.clip(np.round((o + np.arange(0, dur - o, p)) * fps).astype(int), 0, len(on) - 1)].sum())
print(f'{name}: {dur:.2f} s, {bpm:.2f} BPM, beat {p:.4f} s, first beat at {ph:.3f} s')
sec = [20 * np.log10(np.sqrt((x[int(i * SR):int((i + 1) * SR)] ** 2).mean()) + 1e-6) for i in range(int(dur))]
print('dB per second:', ' '.join(f'{v:.0f}' for v in sec))
half = np.array([20 * np.log10(np.sqrt((x[int(i * SR / 2):int((i + 1) * SR / 2)] ** 2).mean()) + 1e-6) for i in range(int(dur * 2))])
jumps = sorted([(half[i + 1:i + 5].mean() - half[max(0, i - 3):i + 1].mean(), (i + 1) / 2) for i in range(2, len(half) - 5)], reverse=True)[:6]
print('biggest rises (dB, at s):', ', '.join(f'+{a:.1f} at {t:.1f}' for a, t in sorted(jumps, key=lambda q: q[1])))
