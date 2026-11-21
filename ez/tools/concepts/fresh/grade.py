"""Grade a painting into the EZ palette (2026-11-11). Hedra paints near our colours, not in them (grass green, tan clay,
brown haze); this moves every hue onto a brand hue so palcheck.py passes, keeping each pixel's lightness and texture.
Usage: python3 grade.py in.jpg out.png
  greens (hue 60-147)        -> 156 (#55d6a2's hue), saturation kept
  yellows (47-60)            -> 42  (#fdbc2a's hue)
  oranges/tans (8-36)        -> desaturated toward the warm neutral of the site's cream and near-blacks
                                 (kept as gold only when strongly saturated and bright, i.e. lit gold)
  reds (344-8)               -> kept; blues/purples (170-344) -> desaturated
  darks (value < .3)         -> saturation x .3, so shadows read as the site's near-black, not brown"""
import subprocess, sys, numpy as np
src, out = sys.argv[1], sys.argv[2]
w, h = map(int, subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', src], capture_output=True, text=True).stdout.split(','))
p = np.frombuffer(subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', src, '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], capture_output=True).stdout, np.uint8).reshape(h, w, 3).astype(float) / 255
r, g, b = p[..., 0], p[..., 1], p[..., 2]; mx = p.max(-1); mn = p.min(-1); c = mx - mn
v = mx; s = np.where(mx > 0, c / np.maximum(mx, 1e-9), 0)
hh = np.where(c == 0, 0, np.where(mx == r, ((g - b) / np.maximum(c, 1e-9)) % 6, np.where(mx == g, (b - r) / np.maximum(c, 1e-9) + 2, (r - g) / np.maximum(c, 1e-9) + 4))) * 60
# Continuous, so neighbouring pixels never jump between two targets (hard cutoffs left speckle and flecks).
# The hue boundaries sit where the paintings have almost no pixels (measured: few hues at 20-30 and 170-330).
cream = float(sys.argv[3]) if len(sys.argv) > 3 else 1.0   # saturation kept in the gold zone below the gold threshold
sm = lambda e0, e1, x: np.clip((x - e0) / (e1 - e0), 0, 1) ** 2 * (3 - 2 * np.clip((x - e0) / (e1 - e0), 0, 1))
H = hh.copy(); S = s.copy()
red = (hh >= 330) | (hh < 22); H[red] = 3
S[red] = s[red] * (.12 + .88 * sm(.45, .7, s[red]))                 # dim warm browns are not red: only saturated red stays red
gz = (hh >= 22) & (hh < 70); H[gz] = 42
S[gz] = s[gz] * (cream + (1 - cream) * sm(.55, .72, s[gz]))      # tan and clay -> cream; lit gold stays gold
grn = (hh >= 70) & (hh < 170); H[grn] = 156
oth = (hh >= 170) & (hh < 330); S[oth] = s[oth] * .12
S = S * (.15 + .85 * sm(.12, .45, v))                                # shadows toward the site's near-black
# HSV -> RGB
i = np.floor(H / 60) % 6; f = H / 60 - np.floor(H / 60); P = v * (1 - S); Q = v * (1 - f * S); T = v * (1 - (1 - f) * S)
o = np.zeros_like(p)
for k, (a, bb, cc) in enumerate([(v, T, P), (Q, v, P), (P, v, T), (P, Q, v), (T, P, v), (v, P, Q)]):
    m = i == k; o[m, 0] = a[m]; o[m, 1] = bb[m]; o[m, 2] = cc[m]
raw = (np.clip(o, 0, 1) * 255).astype(np.uint8).tobytes()
subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{w}x{h}', '-i', '-', out], input=raw)
print('graded', out)
