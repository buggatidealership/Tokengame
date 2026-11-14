"""What 'smooth, animation-focused' measures as (2026-11-12). python3 smooth.py <video.mp4> [hold_s]
motion share: frames (before the final hold) in which more than 0.5% of pixels change by more than 6/255.
cuts: frames where more than 35% of the picture changes at once (a hard cut or a flash, not motion).
flow: the share of moving frames whose change stays within 3x of the median moving frame (motion that flows at a steady rate
      rather than lurching between still and sudden)."""
import subprocess, sys, numpy as np
f = sys.argv[1]; hold = float(sys.argv[2]) if len(sys.argv) > 2 else 2.5
W, H = 270, 338
v = np.frombuffer(subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', f, '-vf', f'scale={W}:{H},format=gray', '-f', 'rawvideo', '-'], capture_output=True).stdout, np.uint8).reshape(-1, H, W).astype(float)
end = len(v) - int(hold * 30)
d = np.abs(np.diff(v[:end], axis=0)); ch = (d > 6).mean(axis=(1, 2)); mag = d.mean(axis=(1, 2))
mov = ch > .005; cuts = int((ch > .35).sum())
mm = mag[mov & (ch <= .35)]; med = np.median(mm) if len(mm) else 0
flow = float(((mm <= 3 * med) & (mm >= med / 3)).mean()) if len(mm) else 0
print(f'{f.split("/")[-1]}: motion share {mov.mean() * 100:.0f}%  cuts {cuts}  flow {flow * 100:.0f}%')
