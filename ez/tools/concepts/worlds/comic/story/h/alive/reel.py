# Joins the fourteen clips into one reel: each clip centred on a 780x1000 cream page with its number,
# name and fact lettered above it. /usr/bin/python3 reel.py <clips dir> <out.mp4>
import sys,re,os,subprocess
D,OUT=sys.argv[1:3];here=os.path.dirname(os.path.abspath(__file__))
cfg=open(os.path.join(here,'cfg.js')).read()
ids=re.findall(r"^ (e\d+):\{name:'([^']*)',fact:'([^']*)'",cfg,re.M)
FONT='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FONT2='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
parts=[]
import textwrap
wrap=lambda t:textwrap.wrap(t,64)[:2]
def esc(t):return t.replace('\\','\\\\').replace(':','\\:').replace("'","\u2019").replace('%','\\%').replace(',','\\,')
for k,(i,name,fact) in enumerate(ids):
    src=f'{D}/x2p-x3p-h5-alive-{i[1:]}.mp4';dst=f'{D}/reel-{k:02d}.mp4'
    vf=(f"scale=740:-2:flags=lanczos,scale='min(740,iw)':'min(840,ih)':force_original_aspect_ratio=decrease,"
        f"pad=780:1000:(ow-iw)/2:140+(860-ih)/2:color=0xf6efe0,"
        f"drawtext=fontfile={FONT}:text='{k+1}. {esc(name)}':x=20:y=26:fontsize=30:fontcolor=0x15121a,"
        +''.join(f"drawtext=fontfile={FONT2}:text='{esc(l)}':x=20:y={72+j*26}:fontsize=19:fontcolor=0x5a4f45," for j,l in enumerate(wrap(fact)))+"format=yuv420p")
    subprocess.run(['ffmpeg','-y','-v','error','-i',src,'-vf',vf,'-r','25','-c:v','libx264','-crf','23','-preset','medium','-an',dst],check=True)
    parts.append(dst)
lst=f'{D}/reel.txt';open(lst,'w').write(''.join(f"file '{p}'\n" for p in parts))
subprocess.run(['ffmpeg','-y','-v','error','-f','concat','-safe','0','-i',lst,'-c','copy','-movflags','+faststart',OUT],check=True)
print(OUT,os.path.getsize(OUT)/1e6,'MB')
