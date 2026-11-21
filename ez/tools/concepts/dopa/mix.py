"""Sound for the R106 resolution cuts: python3 mix.py <cues.json> <dur> <bed> <bed_at> <bed_gain> <out.wav>.
cues.json is written by render.js from the page's window.CUES ([t, sound, peak]) and window.MUSIC ({f, at}: the bed and where it enters,
which overrides bed/bed_at). Each cue is placed so its loudest sample lands on its time, so a hit sits on the frame that shows it."""
import subprocess, numpy as np, wave, sys, json
SR = 48000; H = '/home/user/Tokengame/ez/tools/concepts/launchvid/hedra/music/'
cj, dur, bed, bat, bg, out = sys.argv[1], float(sys.argv[2]), sys.argv[3], float(sys.argv[4]), float(sys.argv[5]), sys.argv[6]
J = json.load(open(cj)); N = int(SR * dur)
if J.get('music'): bed, bat = J['music']['f'], J['music']['at']
def load(f):
    raw = subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', H + f + '.mp3', '-ac', '2', '-ar', str(SR), '-f', 's16le', '-'], capture_output=True).stdout
    return np.frombuffer(raw, '<i2').reshape(-1, 2).astype(float) / 32768
o = np.zeros((N, 2)); m = load(bed); s0 = int(bat * SR); seg = m[s0:s0 + N]; o[:len(seg)] += bg * seg / max(1e-6, np.abs(m).max())
for t, f, pk in J['cues']:
    s = load(f); p = np.argmax(np.abs(s).max(1)); i = int(t * SR) - p
    if i < 0: s = s[-i:]; i = 0
    k = min(N - i, len(s));
    if k > 0: o[i:i + k] += pk / np.abs(s).max() * s[:k]
fi = int(.05 * SR); o[:fi] *= np.linspace(0, 1, fi)[:, None]; fo = int(1.0 * SR); o[-fo:] *= np.linspace(1, 0, fo)[:, None]
o = np.tanh(o * 1.3) / np.tanh(1.3)
w = wave.open(out, 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(o, -1, 1) * 32767).astype('<i2').tobytes()); w.close(); print('mix ok')
