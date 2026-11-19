#!/usr/bin/env python3
"""python3 fitbed.py <bed> <take json> <out name> : fit a generated bed to a video's beat grid and its two drops.
<take json> = '{"bpm":150,"at":0.025,"d1":12.825,"d2":25.625,"dur":33.2}' (the page's window.BEAT, DROPS, DUR).
1. Time-stretch the bed to the video's tempo (rubberband, pitch kept) when its own tempo differs (bed tempo measured, half-time counts).
2. Find the bed's arrival (the biggest loudness rise between 8 and 24 s) and put it on the beat of the grid nearest to it.
3. Lay it so the arrival lands on drop 1, then jump back 8 beats before the arrival so it lands again on drop 2 (the run-in plays twice).
   Beat grids line up at every cut, 15 ms crossfades. If the bed would start before the video, its intro repeats whole beats.
4. When the arrival is a small rise (under 4 dB), each run-in is filtered: a low-passed copy opens into the full bed by the drop.
Writes launchvid/hedra/music/<out name>.mp3 and prints what it measured."""
import subprocess, sys, json, math, numpy as np
H = '/home/user/Tokengame/ez/tools/concepts/launchvid/hedra/music/'; SR = 48000
bed, T, out = sys.argv[1], json.loads(sys.argv[2]), sys.argv[3]
def dec(af=None):
    a = ['ffmpeg', '-loglevel', 'error', '-i', H + bed + '.mp3'] + (['-af', af] if af else []) + ['-ac', '2', '-ar', str(SR), '-f', 's16le', '-']
    return np.frombuffer(subprocess.run(a, capture_output=True).stdout, '<i2').reshape(-1, 2).astype(float) / 32768
def tempo(x, lo, hi):  # beat.py's onset autocorrelation, on 10 ms frames
    m = x.mean(1)[::2]; sr = SR // 2; hop = 240; n = len(m) // hop; e = np.sqrt((m[:n * hop].reshape(n, hop) ** 2).mean(1) + 1e-12)
    on = np.maximum(0, np.diff(np.log(e + 1e-4), prepend=np.log(e[0] + 1e-4))); fps = sr / hop; best = (0, 0)
    for bpm in np.arange(lo, hi + .01, .05):
        p = 60 / bpm * fps; idx = np.round(np.arange(1, 33) * p).astype(int); idx = idx[idx < len(on) - 1]
        s = sum(float((on[:-i] * on[i:]).sum()) for i in idx) / len(idx)
        if s > best[0]: best = (s, bpm)
    return best[1], on, fps
x = dec(); B = T['bpm']
b0, _, _ = tempo(x, B * .85 / 1, B * 1.15)            # the bed's tempo near the video's (a half-time bed shows its double-time hats)
r = B / b0
if abs(r - 1) > .004: x = dec(f'rubberband=tempo={r:.6f}'); lpx = dec(f'rubberband=tempo={r:.6f},lowpass=f=350,lowpass=f=350')
else: lpx = dec('lowpass=f=350,lowpass=f=350'); r = 1.0
n = min(len(x), len(lpx)); x, lpx = x[:n], lpx[:n]; dur = n / SR
p = 60 / B; _, on, fps = tempo(x, B - .5, B + .5)
ph = max(np.arange(0, p, .005), key=lambda o: on[np.clip(np.round((o + np.arange(0, dur - o, p)) * fps).astype(int), 0, len(on) - 1)].sum())
m = x.mean(1); h = SR // 2
half = np.array([20 * np.log10(np.sqrt((m[i * h:(i + 1) * h] ** 2).mean()) + 1e-6) for i in range(int(dur * 2))])
rises = [(half[i + 1:i + 5].mean() - half[max(0, i - 3):i + 1].mean(), (i + 1) / 2) for i in range(16, min(48, len(half) - 5))]
rise, coarse = max(rises)
f = SR // 20; rms = np.array([np.sqrt((m[i * f:(i + 1) * f] ** 2).mean()) + 1e-6 for i in range(n // f)])
def jump(t): i = int(t * 20); return 20 * np.log10(rms[i:i + 10].mean() / rms[max(0, i - 10):i].mean())
cands = [ph + k * p for k in range(int((coarse - 1.2 - ph) / p), int((coarse + 1.2 - ph) / p) + 2) if coarse - 1.2 <= ph + k * p <= coarse + 1.2]
drop = max(cands, key=jump)
d1, d2, D, at = T['d1'], T['d2'], T['dur'], T['at']; P = 8 * p
o1 = drop - d1; o2 = drop - d2
segs = [[0, d2 - P, o1], [d2 - P, D, o2]]              # [video from, video to, bed = video + offset]
if o1 < 0:                                            # the bed's arrival comes earlier than drop 1: repeat whole beats of its intro
    K = math.ceil(-o1 / p) * p; T0 = ph - o1
    segs = [[0, T0, o1 + K], [T0, d2 - P, o1]] + segs[1:]
N = int(D * SR); xf = int(.015 * SR); o = np.zeros((N, 2)); w = np.zeros(N)
filt = rise < 4
for v0, v1, off in segs:
    a, b = int(v0 * SR), int(v1 * SR); i0 = max(0, a - xf); i1 = min(N, b + xf)
    src = np.arange(i0, i1) + int(round(off * SR)); ok = (src >= 0) & (src < n); seg = np.zeros((i1 - i0, 2)); seg[ok] = x[src[ok]]
    if filt:                                          # a filtered run-in into each drop: the low-passed copy opens over 8 beats, 4 dB down
        for dd in (d1, d2):
            r0, r1 = int((dd - P) * SR), int(dd * SR); lo, hi = max(r0, i0), min(r1, i1)
            if lo < hi:
                k = ((np.arange(lo, hi) - r0) / (r1 - r0)) ** 2; idx = np.arange(lo, hi) - i0; s2 = src[idx]; ok2 = (s2 >= 0) & (s2 < n)
                lpseg = np.zeros((hi - lo, 2)); lpseg[ok2] = lpx[s2[ok2]]
                seg[idx] = (seg[idx] * k[:, None] + lpseg * (1 - k[:, None]) * 1.6) * 10 ** (-4 * (1 - k) / 20)[:, None]
    env = np.ones(i1 - i0); q = min(2 * xf, len(env)); ramp = np.sin(np.linspace(0, np.pi / 2, q))   # equal-power crossfades
    if a > 0: env[:q] = ramp
    if b < N: env[-q:] = ramp[::-1]
    o[i0:i1] += seg * env[:, None]
subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-f', 's16le', '-ar', str(SR), '-ac', '2', '-i', '-', '-b:a', '192k', H + out + '.mp3'],
               input=(np.clip(o, -1, 1) * 32767).astype('<i2').tobytes())
print(f'{out}: bed {b0:.2f} BPM stretched x{r:.4f}, phase {ph:.3f}, arrival {drop:.3f} s (+{rise:.1f} dB{", filtered run-ins" if filt else ""}), '
      f'segments ' + ' | '.join(f'{v0:.2f}-{v1:.2f}@{off:+.2f}' for v0, v1, off in segs))
