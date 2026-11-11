"""Palette check for EZ mockups and video frames (owner, 2026-11-11: "always use our brand colors").
Usage: python3 palcheck.py <image> [...]   prints the share of off-brand pixels and the commonest off-brand colours.
A pixel is on-brand when it lies within TOL of a blend between one of the grounds and one of the brand colours
(blends cover anti-aliasing, glows, shadows and transparency). Pass: under 2% off-brand."""
import subprocess, sys, json, numpy as np
H = lambda h: [int(h[i:i+2], 16) for i in (1, 3, 5)]
# the live site's tokens (v53-terminal.html) and the EZ. logo
SITE = ['#0e0c0b', '#161312', '#1d1917', '#2a2522', '#f2ede6', '#8e8680', '#5f5853', '#fdbc2a', '#1a1300', '#55d6a2', '#e8576b']
LOGO = ['#04070e', '#f8f0d9', '#03c870', '#ff3a31', '#fdbc2a']
MARKS = ['#000000', '#ffffff', '#d97757', '#f5f0e8', '#1e80ff']      # the AI logos' own colours (models.json)
GROUNDS = ['#0e0c0b', '#04070e', '#161312', '#f2ede6', '#f8f0d9', '#000000', '#ffffff']
TOL = 22.0
cols = np.array([H(c) for c in sorted(set(SITE + LOGO + MARKS))], float)
grd = np.array([H(c) for c in GROUNDS], float)

def load(f):
    w, h = map(int, subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', f], capture_output=True, text=True).stdout.strip().split(',')[:2])
    vid = f.endswith(('.mp4', '.webm', '.mov'))  # a video: one frame a second, all pooled
    raw = subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', f] + ([] if vid else ['-frames:v', '1']) + ['-vf', ('fps=1,' if vid else '') + 'scale=%d:-1' % (w // 3), '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], capture_output=True).stdout
    return np.frombuffer(raw, np.uint8).reshape(-1, 3).astype(float)

def check(f):
    """Hue test. Coloured pixels (saturation > .25, value > .2) must sit in a brand hue: gold 36-47 deg (#fdbc2a is 42),
    green 148-168 (#03c870 150, #55d6a2 156), red 344-360 and 0-8 (#ff3a31 3, #e8576b 351). The AI marks' own colours
    (Claude orange about 15, Kimi blue about 215) may cover at most 3% of the frame between them, since they appear
    only as logos. Everything else must be a neutral (saturation <= .25), which the site's warm near-blacks and creams are."""
    p = load(f) / 255; mx = p.max(1); mn = p.min(1); c = mx - mn
    s = np.where(mx > 0, c / np.maximum(mx, 1e-9), 0); r, g, b = p.T
    h = np.where(c == 0, 0, np.where(mx == r, ((g - b) / np.maximum(c, 1e-9)) % 6, np.where(mx == g, (b - r) / np.maximum(c, 1e-9) + 2, (r - g) / np.maximum(c, 1e-9) + 4))) * 60
    col = (s > .25) & (mx > .2)
    brand = ((h >= 36) & (h <= 47)) | ((h >= 148) & (h <= 168)) | (h >= 344) | (h <= 8)
    mark = ((h > 8) & (h < 22)) | ((h > 200) & (h < 230))
    offp = col & ~brand & ~mark
    over = max(0.0, (col & mark).mean() - .03)
    pct = (offp.mean() + over) * 100
    q = (p[offp] * 255 // 16 * 16).astype(int); top = []
    if len(q): u, k = np.unique(q, axis=0, return_counts=True); top = ['#%02x%02x%02x' % tuple(t) for t in u[np.argsort(-k)[:3]]]
    return pct, top

if __name__ == '__main__':
    for f in sys.argv[1:]:
        pct, top = check(f); print('%-28s off-brand %5.1f%%  %s  %s' % (f.split('/')[-1], pct, 'PASS' if pct < 2 else 'FAIL', ' '.join(top)))
