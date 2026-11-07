# python3 seam.py video : the loop seam check. Mean absolute difference (0-255, on 256px greyscale) between consecutive frames,
# and between the last frame and the first (the seam when the clip loops with its last frame kept), and frame n-2 to frame 0 (last dropped).
import subprocess,sys,numpy as np
f=sys.argv[1];w=256
raw=subprocess.run(['ffmpeg','-v','error','-i',f,'-vf',f'scale={w}:{w},format=gray','-f','rawvideo','-'],capture_output=True).stdout
a=np.frombuffer(raw,np.uint8).reshape(-1,w,w).astype(float);n=len(a)
d=[np.abs(a[i+1]-a[i]).mean() for i in range(n-1)]
print(f"{f}: {n} frames; consecutive diff median {np.median(d):.2f}, max {max(d):.2f}; seam last->first {np.abs(a[-1]-a[0]).mean():.2f}; seam (last dropped) {np.abs(a[-2]-a[0]).mean():.2f}; first vs middle {np.abs(a[n//2]-a[0]).mean():.2f}")
