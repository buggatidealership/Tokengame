#!/usr/bin/env python3
"""QA for "THE BIG BOARD" (ez-r2-board.html). Prints PASS / FAIL per check and writes a JSON report.
  python3 r2-board-qa.py frames FRAMEDIR uk|nonuk REPORT.json CONTACT.png TIMING.json   (before the frame dump is deleted)
  python3 r2-board-qa.py mp4 FILE.mp4 REPORT.json TIMING.json [FFMPEG]                  (the encoded film: tags, frames, sound)
TIMING.json comes from r2-board-timing.js (N, FPS and the page's T table), so no frame number is hard-coded here.
Checks (spec-board.md section 13, plus verify round 1): the compliance strips and (uk) the FCA band are pixel-identical on every
frame; nonuk has no story pixel in the bottom 96 px; the disclaimer is on exactly T.card0..T.card1; the loop seam is no bigger than its
neighbours' frame changes; WCAG 2.3.1 (at most 3 general flashes and no red flash in any 1 s, 25% of the frame as the area threshold);
NO GOLD STEPS (FIX R1): outside the 69% slam, the hit, the race snaps and the paying-trade ripples (all designed, listed in TIMING.json),
no single frame adds or removes 2% or more of the frame's gold
pixels (and 0.1% of the frame) as an isolated step (2.5 times the largest change of the two frames on each side), measured on a 216 px
area-average copy; B0 MOTION (FIX R1): on a 300 px copy, at least 1% of the story pixels (y 43..228) change by more than 12 grey levels
on at least half of the frames of B0; H.264 High yuv420p 1080x1080 60 fps BT.709 tv, N frames; -14 LUFS, true peak at most -1 dBTP; a
300 Hz high-pass loses 6 LU or less; the big hits land about one frame after their picture; the decoded seam (outside the moving coin
stream) at most 2x the decoded film's median frame change."""
import sys, os, json, hashlib, subprocess, re
import numpy as np
from PIL import Image

FFD = '/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2'

def lin(a):
    a = a / 255.0
    return np.where(a <= 0.04045, a / 12.92, ((a + 0.055) / 1.055) ** 2.4)

def gold_count(a216):
    a = a216.astype(np.int16); R, G, B = a[..., 0], a[..., 1], a[..., 2]
    m = (R > 170) & (G > 110) & (G < R) & (B < 150) & (R - B > 90)
    m[:31] = False   # the top strip, the AD rail and the legal line
    return int(m.sum())

def exempt_frames(J):
    T, F = J['T'], J['FPS']; ex = set()
    for a, n in [(T['b2'], 13), (T['b5'], 7)]:
        f0 = int(round(a * F)); ex.update(range(f0, f0 + n))
    for rt in T.get('race', []):   # the race snaps: a 1600 col/s wave by design (3.6 frames across the board, then a 3-frame flip)
        f0 = int(round(rt * F)); ex.update(range(f0, f0 + 9))
    for c in J.get('cues', []):    # the paying trades: the item ripples gold for 6 frames by design (verify round 1, M2)
        f0 = int(round(c * F)); ex.update(range(f0 - 6, f0 + 5))
    return ex

def gold_steps(g, J):
    g = np.asarray(g, float); n = len(g); d = np.zeros(n); d[1:] = np.diff(g); ex = exempt_frames(J); A = 216 * 216; bad = []
    for i in range(1, n):
        if i in ex: continue
        nb = [abs(d[j]) for j in (i - 2, i - 1, i + 1, i + 2) if 1 <= j < n]
        rel = abs(d[i]) / max(g[i - 1], g[i], 1)
        if rel >= 0.02 and abs(d[i]) >= 0.001 * A and abs(d[i]) >= 2.5 * max(nb + [0]):
            bad.append((i, int(g[i - 1]), int(g[i]), int(d[i])))
    return bad

def b0_motion(grey300, J):
    """grey300: list of the B0 frames' 300 px grey arrays (story band only)."""
    v = [float((np.abs(grey300[i] - grey300[i - 1]) > 12).mean() * 100) for i in range(1, len(grey300))]
    v = np.array(v); return v, float((v >= 1).mean())

def frames_mode(d, var, rep, contact, tj):
    J = json.load(open(tj)); N = J['N']; T = J['T']; FPS = J['FPS']
    fs = sorted(f for f in os.listdir(d) if re.match(r'^\d{4}\.png$', f))
    R = {'variant': var, 'frames': len(fs), 'checks': {}}
    def chk(name, ok, val):
        R['checks'][name] = {'pass': bool(ok), 'value': val}
        print(('PASS ' if ok else 'FAIL ') + name + ': ' + str(val))
    chk('frame count %d' % N, len(fs) == N, len(fs))
    regions = {'rail (AD, brand)': (0, 0, 440, 78), 'legal line': (0, 80, 1080, 150)}
    regions['bottom strip (y 984..1080)'] = (0, 984, 1080, 1080)
    if var == 'uk':
        regions['FCA band'] = (24, 824, 1056, 984)
    ref = {}
    bad = {k: 0 for k in regions}
    small = []; lum = []; red = []
    c0, c1 = T['card0'], T['card1']; cmid = (c0 + c1) // 2
    card_diff = {}
    prev = None; diffs = []; first = None; gold = []; b0 = []; nb1 = int(round(T['b1'] * FPS))
    static_d = []; prev_full = None; first_full = None
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
        gold.append(gold_count(np.asarray(im.resize((216, 216), Image.BOX))))
        if i < nb1: b0.append(np.asarray(im.convert('L').resize((300, 300), Image.LANCZOS)).astype(np.int16)[43:229])
        if i in (c0 - 1, c0, cmid, c1, c1 + 1):
            card_diff[i] = (a[705:800, 70:600] if var == 'uk' else a[872:955, 70:600]).astype(np.float32)
        if i % 30 == 0: small.append(im.resize((240, 240), Image.LANCZOS))
    for k in regions:
        chk('%s pixel-identical on every frame' % k, bad[k] == 0, '%d frames differ' % bad[k])
    if var == 'nonuk':
        chk('nonuk: nothing lit in the bottom 96 px', nonuk_bottom_max < 140, 'max channel %d' % nonuk_bottom_max)
    if len(card_diff) == 5:
        c = card_diff[cmid]
        dd = {k: float(np.abs(v - c).mean()) for k, v in card_diff.items()}
        ok = dd[c0] < 6 and dd[c1] < 6 and dd[c0 - 1] > 12 and dd[c1 + 1] > 12
        chk('disclaimer on f%d..f%d only (%d frames; card region vs f%d)' % (c0, c1, c1 - c0 + 1, cmid), ok, {str(k): round(v, 1) for k, v in dd.items()})
    # loop seam: no bigger than the frame changes around it (the B0 coin stream moves on every frame, including across the seam)
    seam = float(np.abs(prev - first).mean()); med = float(np.median(diffs))
    around = max(diffs[-2:] + diffs[:2])
    chk('loop seam f%d->f0 no bigger than its neighbours (1.5x)' % (N - 1), seam <= 1.5 * around, 'seam %.3f, neighbours max %.3f, film median %.3f' % (seam, around, med))
    # flashes (WCAG 2.3.1, general and red)
    TT = []
    for i in range(1, len(lum)):
        a0, a1 = lum[i - 1], lum[i]; dk = np.minimum(a0, a1)
        up = ((a1 - a0) >= 0.1) & (dk < 0.8); dn = ((a0 - a1) >= 0.1) & (dk < 0.8)
        fu, fd = up.mean(), dn.mean()
        TT.append(1 if fu >= 0.25 else (-1 if fd >= 0.25 else 0))
    ev = [(i, t) for i, t in enumerate(TT) if t]
    flashes = []
    for j in range(1, len(ev)):
        if ev[j][1] == -ev[j - 1][1]: flashes.append(ev[j][0])
    worst = max([sum(1 for x in flashes if s <= x < s + 60) for s in range(0, len(fs))] + [0])
    chk('general flashes: at most 3 in any 1 s', worst <= 3, 'transitions %d, flashes %d, worst 1 s window %d' % (len(ev), len(flashes), worst))
    rT = []
    for i in range(1, len(red)):
        ch = (red[i] != red[i - 1]) & (np.abs(lum[i] - lum[i - 1]) >= 0.05)
        rT.append(ch.mean() >= 0.25)
    chk('no red flash (25% of the frame)', not any(rT), 'red area transitions %d' % sum(rT))
    st = gold_steps(gold, J)
    chk('no gold steps outside the designed events (69% slam, hit, race snaps, paying ripples)', not st, st[:12] if st else 'none (max |step| outside the exempt frames: %d px of %d)' % (max(abs(gold[i] - gold[i - 1]) for i in range(1, len(gold)) if i not in exempt_frames(J)), 216 * 216))
    v, share = b0_motion(b0, J)
    chk('B0 motion at 300 px: >= 1%% of story pixels change on >= half the frames f0..f%d' % (nb1 - 1), share >= 0.5, '%.0f%% of frames (median %.2f%%, min %.2f%%)' % (share * 100, np.median(v), v.min()))
    R['median_frame_diff'] = med; R['seam_diff'] = seam; R['gold'] = gold; R['b0_motion'] = [round(x, 3) for x in v.tolist()]
    cols = 8; rows = (len(small) + cols - 1) // cols
    sheet = Image.new('RGB', (cols * 244, rows * 244), (255, 255, 255))
    for k, s in enumerate(small): sheet.paste(s, ((k % cols) * 244, (k // cols) * 244))
    sheet.save(contact)
    json.dump(R, open(rep, 'w'), indent=1)
    if not all(c['pass'] for c in R['checks'].values()):
        print('QA: some checks failed (see %s)' % rep)

def run(cmd):
    return subprocess.run(cmd, capture_output=True, text=True).stderr

def mp4_mode(f, rep, tj, ff):
    J = json.load(open(tj)); N = J['N']; T = J['T']; FPS = J['FPS']
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
    chk('exactly %d frames (%.3f s)' % (N, N / FPS), n == N, '%d frames, container %.3f s' % (n, secs))
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
    raw = subprocess.run([ff, '-hide_banner', '-loglevel', 'error', '-i', f, '-vn', '-ac', '1', '-ar', '48000', '-af', 'highpass=f=1500:poles=2', '-f', 'f32le', '-'], capture_output=True).stdout
    x = np.frombuffer(raw, dtype='<f4'); SR = 48000; hop = 96
    out = {}
    for name, t in [('69% slam', T['b2']), ('the freeze clack', T['freeze']), ('the hit', T['b5']), ('the B8 rewrite', T['b8']), ('LED second tick', T['b8'] + 2)]:
        i0 = int((t - 0.008) * SR); i1 = int((t + 0.06) * SR)
        e = np.array([np.sqrt((x[j:j + hop] ** 2).mean()) + 1e-7 for j in range(i0 - hop, i1, hop)])
        dd = np.diff(20 * np.log10(e)); k = int(np.argmax(dd))
        out[name] = round((i0 + k * hop) / SR - t, 4)
    ok = all(0 <= v <= 2 / 60 for v in out.values())
    chk('hits land 1 frame after the picture (0..2 frames)', ok, {k: '%+.1f ms' % (v * 1000) for k, v in out.items()})
    R['loudness'] = {'I': I, 'TP': P, 'I_hp300': I3}
    # the decoded picture: frame changes (full res), the seam outside the coin stream, gold steps (216 px), B0 motion (300 px)
    p = subprocess.Popen([ff, '-v', 'error', '-i', f, '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], stdout=subprocess.PIPE)
    W = 1080; prev = None; first = None; dfull = []; dstat = []; gold = []; b0 = []; nb1 = int(round(T['b1'] * FPS)); k = 0
    stat = np.ones((W, W), bool); stat[150:480, 700:990] = False   # the B0 coin stream and its spray (columns 63..87, rows 13..42)
    stat[:150] = False; stat[824:] = False                          # the fixed strips do not count
    while True:
        b = p.stdout.read(W * W * 3)
        if len(b) < W * W * 3: break
        fr = np.frombuffer(b, np.uint8).reshape(W, W, 3)
        g = fr.astype(np.int16)
        if prev is not None:
            dd = np.abs(g - prev).mean(2); dfull.append(float(dd[150:824].mean())); dstat.append(float(dd[stat].mean()))
        else: first = g
        prev = g
        im = Image.fromarray(fr)
        gold.append(gold_count(np.asarray(im.resize((216, 216), Image.BOX))))
        if k < nb1: b0.append(np.asarray(im.convert('L').resize((300, 300), Image.LANCZOS)).astype(np.int16)[43:229])
        k += 1
    dd = np.abs(first - prev).mean(2); seam_full = float(dd[150:824].mean()); seam_stat = float(dd[stat].mean())
    med_full = float(np.median(dfull)); med_stat = float(np.median(dstat))
    around = max(dfull[-2:] + dfull[:2])
    chk('decoded seam (outside the coin stream) at most 2x the film median', seam_stat <= 2 * max(med_stat, 1e-3),
        'seam %.3f vs median %.3f (%.1fx)' % (seam_stat, med_stat, seam_stat / max(med_stat, 1e-6)))
    chk('decoded seam (whole story band) no bigger than its neighbours (1.5x)', seam_full <= 1.5 * around,
        'seam %.3f, neighbours max %.3f, film median %.3f' % (seam_full, around, med_full))
    srt = sorted(range(len(dstat)), key=lambda i: -dstat[i])[:6]
    R['largest_static_changes'] = [(i + 1, round(dstat[i], 3)) for i in srt]
    st = gold_steps(gold, J)
    chk('decoded: no gold steps outside the designed events', not st, st[:12] if st else 'none')
    v, share = b0_motion(b0, J)
    chk('decoded B0 motion at 300 px: >= 1%% of story pixels change on >= half the frames f0..f%d' % (nb1 - 1), share >= 0.5, '%.0f%% of frames (median %.2f%%)' % (share * 100, np.median(v)))
    R['gold'] = gold; R['median_frame_diff'] = med_full; R['seam'] = {'full': seam_full, 'static': seam_stat, 'median_static': med_stat}
    json.dump(R, open(rep, 'w'), indent=1)

if __name__ == '__main__':
    if sys.argv[1] == 'frames': frames_mode(*sys.argv[2:7])
    else: mp4_mode(sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5] if len(sys.argv) > 5 else FFD)
