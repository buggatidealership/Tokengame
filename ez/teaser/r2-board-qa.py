#!/usr/bin/env python3
"""QA for "THE BIG BOARD" (ez-r2-board.html). Prints PASS / FAIL per check and writes a JSON report.
  python3 r2-board-qa.py frames FRAMEDIR uk|nonuk REPORT.json CONTACT.png   (before the frame dump is deleted)
  python3 r2-board-qa.py mp4 FILE.mp4 REPORT.json [FFMPEG]                   (the encoded film: tags, frames, sound)
Checks (spec-board.md section 13): the compliance strips and (uk) the FCA band are pixel-identical on every frame; nonuk has
no story pixel in the bottom 96 px; the disclaimer is on exactly f1140..f1424; the loop seam is no bigger than a normal
frame change; WCAG 2.3.1 (at most 3 general flashes and no red flash in any 1 s, 25% of the frame as the area threshold);
H.264 High yuv420p 1080x1080 60 fps BT.709 tv, 1440 frames; -14 LUFS, true peak at most -1 dBTP; a 300 Hz high-pass loses
6 LU or less; the big hits land about one frame after their picture."""
import sys, os, json, hashlib, subprocess, re
import numpy as np
from PIL import Image

def lin(a):
    a = a / 255.0
    return np.where(a <= 0.04045, a / 12.92, ((a + 0.055) / 1.055) ** 2.4)

def frames_mode(d, var, rep, contact):
    fs = sorted(f for f in os.listdir(d) if re.match(r'^\d{4}\.png$', f))
    R = {'variant': var, 'frames': len(fs), 'checks': {}}
    def chk(name, ok, val):
        R['checks'][name] = {'pass': bool(ok), 'value': val}
        print(('PASS ' if ok else 'FAIL ') + name + ': ' + str(val))
    chk('frame count 1440', len(fs) == 1440, len(fs))
    regions = {'rail (AD, brand)': (0, 0, 440, 78), 'legal line': (0, 80, 1080, 150)}
    regions['bottom strip (y 984..1080)'] = (0, 984, 1080, 1080)
    if var == 'uk':
        regions['FCA band'] = (24, 824, 1056, 984)
    ref = {}
    bad = {k: 0 for k in regions}
    small = []; lum = []; red = []
    card_ref = None; card_diff = {}
    prev = None; diffs = []
    first = None
    nonuk_bottom_max = 0
    for i, f in enumerate(fs):
        im = Image.open(os.path.join(d, f)).convert('RGB'); a = np.asarray(im)
        for k, (x0, y0, x1, y1) in regions.items():
            r = a[y0:y1, x0:x1].copy()
            if k == 'FCA band':   # the 4 px rounded corners show the board behind them: mask the 6 x 6 corner squares only
                r[:6, :6] = 0; r[:6, -6:] = 0; r[-6:, :6] = 0; r[-6:, -6:] = 0
            h = hashlib.md5(r.tobytes()).hexdigest()
            if i == 0: ref[k] = h
            elif h != ref[k]: bad[k] += 1
        if var == 'nonuk':
            nonuk_bottom_max = max(nonuk_bottom_max, int(a[984:, :, :].max()))
        sm = np.asarray(im.resize((108, 108), Image.BILINEAR)).astype(np.float32)
        L = lin(sm) @ np.array([0.2126, 0.7152, 0.0722])
        lum.append(L)
        s = sm.sum(2) + 1e-6
        red.append((sm[:, :, 0] / s >= 0.8) & (sm[:, :, 0] > 60))
        if prev is not None: diffs.append(float(np.abs(sm - prev).mean()))
        prev = sm
        if i == 0: first = sm
        if i in (1139, 1140, 1300, 1424, 1425):
            card_diff[i] = (a[705:800, 70:600] if var == 'uk' else a[872:955, 70:600]).astype(np.float32)
        if i % 30 == 0: small.append(im.resize((240, 240), Image.LANCZOS))
    for k in regions:
        chk('%s pixel-identical on every frame' % k, bad[k] == 0, '%d frames differ' % bad[k])
    if var == 'nonuk':
        chk('nonuk: nothing lit in the bottom 96 px', nonuk_bottom_max < 140, 'max channel %d' % nonuk_bottom_max)
    # disclaimer window
    if len(card_diff) == 5:
        c = card_diff[1300]
        dd = {k: float(np.abs(v - c).mean()) for k, v in card_diff.items()}
        ok = dd[1140] < 6 and dd[1424] < 6 and dd[1139] > 12 and dd[1425] > 12
        chk('disclaimer on f1140..f1424 only (card region vs f1300)', ok, {str(k): round(v, 1) for k, v in dd.items()})
    # loop seam
    seam = float(np.abs(prev - first).mean()); med = float(np.median(diffs))
    chk('loop seam f1439->f0 at or below the median frame change', seam <= max(med, 0.5) * 1.5, 'seam %.2f, median %.2f' % (seam, med))
    # flashes (WCAG 2.3.1, general and red)
    T = []
    for i in range(1, len(lum)):
        a0, a1 = lum[i - 1], lum[i]; dk = np.minimum(a0, a1)
        up = ((a1 - a0) >= 0.1) & (dk < 0.8); dn = ((a0 - a1) >= 0.1) & (dk < 0.8)
        fu, fd = up.mean(), dn.mean()
        T.append(1 if fu >= 0.25 else (-1 if fd >= 0.25 else 0))
    ev = [(i, t) for i, t in enumerate(T) if t]
    flashes = []
    for j in range(1, len(ev)):
        if ev[j][1] == -ev[j - 1][1]: flashes.append(ev[j][0])
    worst = max([sum(1 for x in flashes if s <= x < s + 60) for s in range(0, 1440)] + [0])
    chk('general flashes: at most 3 in any 1 s', worst <= 3, 'transitions %d, flashes %d, worst 1 s window %d' % (len(ev), len(flashes), worst))
    rT = []
    for i in range(1, len(red)):
        ch = (red[i] != red[i - 1]) & (np.abs(lum[i] - lum[i - 1]) >= 0.05)
        rT.append(ch.mean() >= 0.25)
    chk('no red flash (25% of the frame)', not any(rT), 'red area transitions %d' % sum(rT))
    R['median_frame_diff'] = med; R['seam_diff'] = seam
    # contact sheet: every 30th frame
    cols = 8; rows = (len(small) + cols - 1) // cols
    sheet = Image.new('RGB', (cols * 244, rows * 244), (255, 255, 255))
    for k, s in enumerate(small): sheet.paste(s, ((k % cols) * 244, (k // cols) * 244))
    sheet.save(contact)
    json.dump(R, open(rep, 'w'), indent=1)
    if not all(c['pass'] for c in R['checks'].values()):
        print('QA: some checks failed (see %s)' % rep)

def run(cmd):
    return subprocess.run(cmd, capture_output=True, text=True).stderr

def mp4_mode(f, rep, ff):
    R = {'file': f, 'checks': {}}
    def chk(name, ok, val):
        R['checks'][name] = {'pass': bool(ok), 'value': val}
        print(('PASS ' if ok else 'FAIL ') + name + ': ' + str(val))
    info = run([ff, '-hide_banner', '-i', f])
    v = [l for l in info.splitlines() if 'Video:' in l][0]; a = [l for l in info.splitlines() if 'Audio:' in l]
    chk('H.264 High, yuv420p tv bt709, 1080x1080, 60 fps', all(s in v for s in ['h264 (High)', 'yuv420p(tv, bt709', '1080x1080', '60 fps']), v.strip())
    chk('AAC audio', bool(a) and 'aac' in a[0], a[0].strip() if a else 'none')
    fc = subprocess.run([ff, '-hide_banner', '-loglevel', 'error', '-i', f, '-map', '0:v', '-c', 'copy', '-f', 'framecrc', '-'], capture_output=True, text=True).stdout
    n = sum(1 for l in fc.splitlines() if l and not l.startswith('#'))
    dur = re.search(r'Duration: (\d+):(\d+):([\d.]+)', info); secs = int(dur.group(2)) * 60 + float(dur.group(3))
    chk('exactly 1440 frames (24.000 s)', n == 1440, '%d frames, container %.3f s' % (n, secs))
    chk('faststart (moov before mdat)', open(f, 'rb').read(4096).find(b'moov') >= 0, 'moov in the first 4 KB')
    def loud(extra):
        o = run([ff, '-hide_banner', '-nostats', '-i', f, '-vn', '-af', extra + 'ebur128=peak=true', '-f', 'null', '-'])
        s = o[o.rfind('Summary'):]
        I = float(re.search(r'I:\s+(-?[\d.]+) LUFS', s).group(1)); P = re.search(r'Peak:\s+(-?[\d.]+) dBFS', s)
        return I, (float(P.group(1)) if P else None)
    I, P = loud('')
    chk('integrated loudness -14.0 +-0.5 LUFS', abs(I + 14) <= 0.5, '%.1f LUFS' % I)
    chk('true peak at most -1 dBTP', P is not None and P <= -0.95, '%s dBTP' % P)
    I3, _ = loud('highpass=f=300:poles=2,highpass=f=300:poles=2,')
    chk('300 Hz high-pass loses 6 LU or less (phone speakers)', I - I3 <= 6, 'loss %.1f LU (%.1f -> %.1f)' % (I - I3, I, I3))
    # onsets of the big hits: the largest rise of high-frequency energy (2 ms hops, above 1.5 kHz) within -30..+60 ms of the
    # picture event; each should land 1 frame (16.7 ms) after it, within +-1 frame
    raw = subprocess.run([ff, '-hide_banner', '-loglevel', 'error', '-i', f, '-vn', '-ac', '1', '-ar', '48000', '-af', 'highpass=f=1500:poles=2', '-f', 'f32le', '-'], capture_output=True).stdout
    x = np.frombuffer(raw, dtype='<f4'); SR = 48000; hop = 96
    out = {}
    for name, t in [('slam at frame 0 (cycle start)', 0.0), ('69% slam', 5.0), ('the freeze clack', 10.0), ('the hit', 12.0), ('the pair clack', 14.0)]:
        i0 = max(0, int((t - 0.03) * SR)); i1 = int((t + 0.06) * SR)
        e = np.array([np.sqrt((x[j:j + hop] ** 2).mean()) + 1e-7 for j in range(i0 - hop, i1, hop)])
        d = np.diff(20 * np.log10(e)); k = int(np.argmax(d))
        out[name] = round((i0 + k * hop) / SR - t, 4)
    ok = all(0 <= v <= 2 / 60 for v in out.values())
    chk('hits land 1 frame after the picture (0..2 frames)', ok, {k: '%+.1f ms' % (v * 1000) for k, v in out.items()})
    R['loudness'] = {'I': I, 'TP': P, 'I_hp300': I3}
    json.dump(R, open(rep, 'w'), indent=1)

if __name__ == '__main__':
    if sys.argv[1] == 'frames': frames_mode(*sys.argv[2:6])
    else: mp4_mode(sys.argv[2], sys.argv[3], sys.argv[4] if len(sys.argv) > 4 else '/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2')
