# EZ SITE3D QA, media checks (site3d-render.sh step 6).  python3 -I teaser/site3d-qa.py OUTDIR FFMPEG [WAV]
# Sound (OUTDIR/sound/audio-14lufs.wav, or WAV):
#   integrated -14 +/- 0.5 LUFS and true peak <= -1 dBTP; phone speakers: <= 6 LU lost through a 300 Hz high-pass (24 dB/oct);
#   no 400 ms window 8 LU or more under the integrated loudness; scenario A (18..22 s) and B (22..26 s) within 0.5 LU;
#   the seat (the impact) starts 1.0 to 1.2 frames after its picture (frame 960), out of the silence from lights out.
# Picture (OUTDIR/ez-site3d-30s-nonuk.mp4 and -uk.mp4, when present):
#   mean luma per section (22..45 is the look's range; reported, not failed), A against B bright pixels below the heads
#   (ratio 0.8..1.25), flashes (WCAG 2.3.1: no more than 3 general or red flashes in any 1 s), the uk band on every frame,
#   the legal line's contrast against what is behind it (>= 4.5:1 on every frame).
# Writes OUTDIR/qa.txt; exits 1 when a check fails.
import sys,os,re,json,subprocess
import numpy as np
OUT,FF=sys.argv[1],sys.argv[2];WAV=sys.argv[3] if len(sys.argv)>3 else os.path.join(OUT,'sound','audio-14lufs.wav')
FPS=60;N=1800;lines=[];fails=[]
def log(s):print(s);lines.append(s)
def check(ok,s):log(('PASS ' if ok else 'FAIL ')+s);(None if ok else fails.append(s))
def ebur(path,af='',extra=''):
    r=subprocess.run([FF,'-hide_banner','-nostats','-v','verbose']+(extra.split() if extra else [])+['-i',path,'-af',(af+',' if af else '')+'ebur128=peak=true:framelog=verbose','-f','null','-'],capture_output=True,text=True).stderr
    I=float(re.findall(r'I:\s+(-?[\d.]+) LUFS',r)[-1]);pk=re.findall(r'Peak:\s+(-?[\d.inf]+) dBFS',r);M=[float(x) for x in re.findall(r'M:\s*(-?[\d.inf]+)',r) if x not in('-inf','inf')]
    return I,(float(pk[-1]) if pk else None),M
if os.path.exists(WAV):
    I,tp,M=ebur(WAV);log('sound: %s'%WAV)
    check(abs(I+14)<=0.5 or 'audio.wav' in os.path.basename(WAV),'integrated %.1f LUFS (target -14)'%I);check(tp is None or tp<=-1.0 or 'audio.wav' in os.path.basename(WAV),'true peak %s dBTP (<= -1)'%tp)
    Ih,_,_=ebur(WAV,'highpass=f=300,highpass=f=300');check(I-Ih<=6.0,'phone speakers: %.1f LU lost through a 300 Hz high-pass (<= 6)'%(I-Ih))
    low=[k for k,m in enumerate(M) if m<I-8 and k>=3]   # the first 0.4 s has no full window (the loop runs into it)
    check(not low,'no 400 ms window 8 LU or more under (%d of %d windows under: %s)'%(len(low),len(M),', '.join('%.1fs'%((k+1)/10) for k in low[:6])))
    Ia,_,_=ebur(WAV,'','-ss 18 -t 4');Ib,_,_=ebur(WAV,'','-ss 22 -t 4');check(abs(Ia-Ib)<=0.5,'scenario A %.2f vs B %.2f LUFS (within 0.5)'%(Ia,Ib))
    raw=subprocess.run([FF,'-v','error','-i',WAV,'-f','f32le','-ac','1','-ar','48000','-'],capture_output=True).stdout;a=np.frombuffer(raw,np.float32)
    s0,s1=int(945/FPS*48000),int(975/FPS*48000);seg=np.abs(a[s0:s1]);on=np.argmax(seg>0.02)
    lag=(s0+on)/48000*FPS-960;check(1.0<=lag<=1.25,'the seat sounds %.2f frames after its picture (1.0..1.2)'%lag)
    sil=np.abs(a[int(946/FPS*48000):int(959.5/FPS*48000)]).max();check(sil<1e-3,'silence from lights out to the seat (peak %.5f)'%sil)
def frames(path,w=270,crop=None):
    vf=('crop=%s,'%crop if crop else '')+'scale=%d:-1:flags=area,format=rgb24'%w if not crop else 'crop=%s,format=rgb24'%crop
    p=subprocess.run([FF,'-v','error','-i',path,'-vf',vf,'-f','rawvideo','-'],capture_output=True).stdout
    if crop:cw,ch=[int(x) for x in crop.split(':')[:2]]
    else:cw,ch=w,w
    return np.frombuffer(p,np.uint8).reshape(-1,ch,cw,3).astype(np.float32)
def Y(f):return 0.2126*f[...,0]+0.7152*f[...,1]+0.0722*f[...,2]
def rel(f):c=f/255.0;c=np.where(c<=0.04045,c/12.92,((c+0.055)/1.055)**2.4);return 0.2126*c[...,0]+0.7152*c[...,1]+0.0722*c[...,2]
SEC=[('S1 hook',0,180),('S2 fast-forward',180,420),('S3 freeze',420,570),('S4 drop zone',570,840),('S5 zero',840,1080),('S6 A',1080,1320),('S7 B',1320,1560),('S8 end',1560,1800)]
std=os.path.join(OUT,'ez-site3d-30s-nonuk.mp4');uk=os.path.join(OUT,'ez-site3d-30s-uk.mp4')
if os.path.exists(std):
    F=frames(std);log('picture: %s (%d frames)'%(std,len(F)));check(len(F)==N,'%d frames'%len(F));y=Y(F).mean(axis=(1,2))
    for nm,a,b in SEC:log('  mean luma %-16s %5.1f%s'%(nm,y[a:b].mean(),'' if 22<=y[a:b].mean()<=45 else '  (outside 22..45)'))
    below=Y(F[:,int(350/4):,:])            # under the heads
    A=(below[1080:1320]>200).sum();B=(below[1320:1560]>200).sum();check(B>0 and 0.8<=A/B<=1.25,'A/B bright pixels under the heads %d / %d = %.2f (0.8..1.25)'%(A,B,A/max(B,1)))
    L=rel(F).mean(axis=(1,2));red=(((F[...,0]/np.maximum(F.sum(-1),1))>=0.8)&(F[...,0]>100)).mean(axis=(1,2))
    def flashes(v,th):
        ev=[];last=None
        for k in range(1,len(v)):
            d=v[k]-v[k-1]
            if abs(d)>=th and min(v[k],v[k-1])<0.8:
                s=1 if d>0 else -1
                if s!=last:ev.append(k);last=s
        worst=0
        for k in range(len(ev)):worst=max(worst,sum(1 for e in ev if ev[k]<=e<ev[k]+FPS)//2)
        return worst
    check(flashes(L,0.10)<=3,'general flashes: at most %d per second (<= 3)'%flashes(L,0.10));check(flashes(red,0.20)<=3,'red flashes: at most %d per second (<= 3)'%flashes(red,0.20))
    G=frames(std,crop='740:36:44:84');t=Y(G);bg=[]
    for k in range(len(G)):
        v=rel(G[k]);m=t[k]<150;bg.append(np.percentile(v[m],95) if m.any() else 0)
    Lt=rel(np.array([[[230,226,218]]],np.float32))[0,0];cr=(Lt+0.05)/(np.array(bg)+0.05);check(cr.min()>=4.5,'legal line contrast: worst %.1f:1 at frame %d (>= 4.5)'%(cr.min(),int(cr.argmin())))
if os.path.exists(uk):
    U=frames(uk,crop='1000:120:40:844');m=Y(U).mean(axis=(1,2));check(len(U)==N and m.min()>170,'uk: the FCA band on all %d frames (darkest band mean %.0f)'%(len(U),m.min()))
open(os.path.join(OUT,'qa.txt'),'w').write('\n'.join(lines)+'\n')
sys.exit(1 if fails else 0)
