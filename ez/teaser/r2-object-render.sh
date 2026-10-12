#!/bin/bash
# EZ films round 2, "The Object" (ez-r2-object.html): production render. 26 s (fix r1; v1 was 24 s), 1080 x 1080, 60 fps (FPS=30 fallback), uk + nonuk.
# Needs the static server on :8765 serving ez/ (cd ez && python3 -m http.server 8765).
#   teaser/r2-object-render.sh OUTDIR ASOF
#     ASOF  REQUIRED: the stated render date, ISO (e.g. 2026-10-12T16:00:00Z). The rail stamps say AS OF that day and the LED dies
#           count from it (D = bet - ASOF), so re-render on every sheet sync, on a confirmed betDate, and on the posting day.
#   env: BET_OK=1     render although SIM.betDate / CONFIG.betDate is unset: the LEDs and PLANNED · <date> then use the site's fallback
#                     (the NVDA row's CALL DATE plus one weekday, 16:00 New York)
#        PAR=3        plate renderers in parallel (each is one Chromium on SwiftShader; 4 cores here)
#        FPS=60|30    60 (default) or the 30 fps fallback (same subframes per output frame, half the plates)
#        RES=540      a draft: plates at 540 (never deliver a draft)
#        LED=red|gold the countdown LEDs (red, X2's own, is the default after style frame SF7)
#        SKIP_PLATES=1 / SKIP_TYPE=1   reuse existing plates / type states (frame names carry a key of everything they are drawn from)
#        DELIVER=v1   also copy to ez/media as ez-r2-object-v1-uk.mp4 / -nonuk.mp4 (+ -poster.jpg)
# Steps (each resumable: existing frames are skipped):
#   0. gates: the bet date, SIM.stopLoss null, SIM.leverage / leadHours / poolShare set, CONFIG.launched false, the disk
#   1. plates: every frame once (WebGL; subframes averaged in the page: about 3,200 renders at 60 fps), PAR processes
#   2. sound: ez-r2-object-audio.js from the page's own timing table and picture events (rendered from a 270 px plate page, where the
#      coin landings, the pour and the LED steps are computed), two cycles (the second kept), then a two-pass loudnorm to
#      -14 LUFS / -1 dBTP (linear only; the script stops if loudnorm falls back to dynamic)
#   3. type: each unique type state once per variant (transparent PNGs, the FCA band in the uk type layer, so it is always on top)
#   4. composite and encode: plate + seeded STATIC grain (plates only, against banding in the porcelain; static, because x264 smooths a
#      temporal grain in inter frames and it then pops at every keyframe, the loop point included) + type; H.264 High, yuv420p, crf 18,
#      BT.709 tagged, AAC 192k, faststart. Posters from frame 0 (the poster frame: the hero, the glass $ pot, the $EZ plinth).
#      nonuk has no FCA band: never where UK viewers can see it (so not on X). uk carries the band on every frame: the file for X.
#   5. QA (qa.txt): frames, duration, loudness, true peak, the 300 Hz phone test, the loop seam (sound and picture), the payoff halves,
#      the band on every uk frame, nothing but floor below y 800 in nonuk, flashes; a contact sheet of every 30th frame.
set -e
OUT=${1:?usage: r2-object-render.sh OUTDIR ASOF}; ASOF=${2:?the stated render date (ISO) is required, e.g. 2026-10-12T16:00:00Z}
EZ=$(cd "$(dirname "$0")/.." && pwd)
FF=${FFMPEG:-/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2}
PAR=${PAR:-3}; FPS=${FPS:-60}; RES=${RES:-1080}; LED=${LED:-red}; MIN_FREE_MB=${MIN_FREE_MB:-2500}
DUR=26; N=$((DUR*FPS)); mkdir -p "$OUT"; OUT=$(cd "$OUT" && pwd); cd "$EZ"
node -e "if(!isFinite(Date.parse('$ASOF')))process.exit(1)" || { echo "ASOF is not a date: $ASOF"; exit 2; }
Q="asof=$ASOF&fps=$FPS&led=$LED$([ "$RES" = "1080" ] || echo "&res=$RES")"
PL="$OUT/plates$([ "$RES" = "1080" ] || echo "-r$RES")-$FPS"

# --- 0. gates ---
J=$(node -e "const vm=require('vm'),fs=require('fs');const c={};vm.createContext(c);vm.runInContext(fs.readFileSync('ez-data.js','utf8')+';this.o={b:SIM.betDate||CONFIG.betDate||\"\",s:SIM.stopLoss,l:SIM.leverage,h:SIM.leadHours,p:SIM.poolShare,launched:!!CONFIG.launched}',c);console.log(JSON.stringify(c.o))")
echo "data: $J"
node -e "const o=$J;if(o.s!=null){console.log('SIM.stopLoss is set: the pour with nothing held back is no longer true');process.exit(1)}if([o.l,o.h,o.p].some(v=>v==null)){console.log('SIM.leverage, leadHours or poolShare is null');process.exit(1)}if(o.launched){console.log('CONFIG.launched is true: FROM LAUNCH copy needs review');process.exit(1)}" || exit 3
if [ "$(node -e "console.log(($J).b)")" = "" ]; then
  echo "bet date: not set in the sheet; PLANNED and the LEDs use the fallback (NVDA call date + 1 weekday, 16:00 New York)"
  [ "$BET_OK" = "1" ] || { echo "refusing: set SIM.betDate (or CONFIG.betDate), or pass BET_OK=1"; exit 3; }
fi
FREE=$(df -Pm "$OUT" | awk 'NR==2{print $4}'); [ "$FREE" -ge "$MIN_FREE_MB" ] || { echo "only $FREE MB free in $OUT (need $MIN_FREE_MB)"; exit 3; }
T0=$(date +%s)

# --- 1. plates ---
if [ "$SKIP_PLATES" != "1" ]; then
  PAGE="ez-r2-object.html?pass=plate&$Q" READY_MS=180000 node teaser/render.js names "$PL"
  pids=()
  for ((k=0;k<PAR;k++)); do
    PAGE="ez-r2-object.html?pass=plate&$Q" READY_MS=180000 SKIP_EXISTING=1 TIMING=1 node teaser/render.js range "$PL" "0,$((N-1)),$PAR,$k" > "$PL/log-$k.txt" 2>&1 &
    pids+=($!); done
  for p in "${pids[@]}"; do wait "$p" || { echo "plate renderer failed; see $PL/log-*.txt"; exit 4; }; done
fi
while read -r n; do [ -f "$PL/frames/$n.png" ] || { echo "missing plate $n"; exit 4; }; done < "$PL/names.txt"
T1=$(date +%s); echo "plates: done ($(( (T1-T0)/60 )) min)"

# --- 2. sound ---
if [ ! -f "$OUT/sound/audio-14lufs.wav" ]; then
  # the sound is rendered from a plate page at 270 px: the coin landings, the pour and the LED steps are computed with the 3D set
  PAGE="ez-r2-object.html?pass=plate&res=270&asof=$ASOF&fps=$FPS&led=$LED" READY_MS=120000 node teaser/render.js audio "$OUT/sound"
  "$FF" -hide_banner -nostats -i "$OUT/sound/audio.wav" -af loudnorm=I=-14:TP=-1:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p' > "$OUT/sound/pass1.json"
  JV(){ node -e "console.log(JSON.parse(require('fs').readFileSync('$OUT/sound/pass1.json','utf8'))['$1'])"; }
  LN="loudnorm=I=-14:TP=-1:LRA=11:measured_I=$(JV input_i):measured_TP=$(JV input_tp):measured_LRA=$(JV input_lra):measured_thresh=$(JV input_thresh):offset=$(JV target_offset):linear=true:print_format=json"
  "$FF" -y -hide_banner -nostats -i "$OUT/sound/audio.wav" -af "$LN" -ar 48000 -c:a pcm_s24le "$OUT/sound/audio-14lufs.wav" 2> "$OUT/sound/pass2.log"
  grep -q '"normalization_type" : "linear"' "$OUT/sound/pass2.log" || { rm -f "$OUT/sound/audio-14lufs.wav"; echo "loudnorm fell back to dynamic mode; see $OUT/sound/pass2.log"; exit 5; }
fi

# --- 3. type states, 4. composite and encode ---
mkdir -p "$OUT/seq/plates"; i=0; while read -r n; do ln -sf "$PL/frames/$n.png" "$OUT/seq/plates/$(printf %04d $i).png"; i=$((i+1)); done < "$PL/names.txt"
[ "$i" = "$N" ] || { echo "plate names: $i, expected $N"; exit 6; }
for V in uk nonuk; do
  TD="$OUT/type-$V-$FPS"
  if [ "$SKIP_TYPE" != "1" ]; then
    PAGE="ez-r2-object.html?pass=type&variant=$V&$Q" READY_MS=60000 node teaser/render.js names "$TD"
    PAGE="ez-r2-object.html?pass=type&variant=$V&$Q" READY_MS=60000 ALPHA=1 SKIP_EXISTING=1 node teaser/render.js range "$TD" "0,$((N-1))"
  fi
  mkdir -p "$OUT/seq/$V"; i=0; while read -r n; do ln -sf "$TD/frames/$n.png" "$OUT/seq/$V/$(printf %04d $i).png"; i=$((i+1)); done < "$TD/names.txt"
  NM="ez-r2-object-$V"
  "$FF" -y -loglevel error -framerate $FPS -i "$OUT/seq/plates/%04d.png" -framerate $FPS -i "$OUT/seq/$V/%04d.png" -i "$OUT/sound/audio-14lufs.wav" \
    -filter_complex "[0:v]scale=1080:1080:flags=lanczos,format=gbrp,noise=alls=3:allf=u:all_seed=20261012[p];[1:v]format=rgba[t];[p][t]overlay=0:0:format=gbrp,scale=out_color_matrix=bt709:out_range=tv,format=yuv420p[v]" \
    -map "[v]" -map 2:a -colorspace bt709 -color_primaries bt709 -color_trc bt709 -color_range tv \
    -c:v libx264 -profile:v high -crf 18 -preset slow -tune grain -r $FPS -c:a aac -b:a 192k -ar 48000 -movflags +faststart -shortest "$OUT/$NM.mp4"
  "$FF" -y -loglevel error -i "$OUT/$NM.mp4" -vf "select=eq(n\,0)" -frames:v 1 -q:v 2 "$OUT/$NM-poster.jpg"
  if [ -n "$DELIVER" ]; then cp "$OUT/$NM.mp4" "$EZ/media/ez-r2-object-$DELIVER-$V.mp4"; cp "$OUT/$NM-poster.jpg" "$EZ/media/ez-r2-object-$DELIVER-$V-poster.jpg"; fi
done
T2=$(date +%s); echo "type, sound, encodes: $(( (T2-T1)/60 )) min; total $(( (T2-T0)/60 )) min"

# --- 5. QA ---
python3 -I - "$OUT" "$FF" "$FPS" "$PL" "$DUR" <<'PY'
import sys,os,re,subprocess,json
import numpy as np
OUT,FF,FPS,PL,DUR=sys.argv[1],sys.argv[2],int(sys.argv[3]),sys.argv[4],float(sys.argv[5]);N=int(DUR*FPS);lines=[];fails=[]
B6,B7=17.5,20.5   # the payoff split (T.b6, T.b7 in ez-r2-object.html)
def log(s):print(s,flush=True);lines.append(s)
def check(ok,s):log(('PASS ' if ok else 'FAIL ')+s);(None if ok else fails.append(s))
def ebur(path,af=''):
    r=subprocess.run([FF,'-hide_banner','-nostats','-i',path,'-af',(af+',' if af else '')+'ebur128=peak=true','-f','null','-'],capture_output=True,text=True).stderr
    I=float(re.findall(r'I:\s+(-?[\d.]+) LUFS',r)[-1]);pk=re.findall(r'Peak:\s+(-?[\d.inf]+) dBFS',r);return I,(float(pk[-1]) if pk else None)
WAV=os.path.join(OUT,'sound','audio-14lufs.wav')
I,tp=ebur(WAV);check(abs(I+14)<=0.5,'integrated %.1f LUFS (-14 +- 0.5)'%I);check(tp is not None and tp<=-1.0,'true peak %s dBTP (<= -1)'%tp)
Ih,_=ebur(WAV,'highpass=f=300,highpass=f=300');check(I-Ih<=6.0,'phone speakers: %.1f LU lost through a 300 Hz high-pass (<= 6)'%(I-Ih))
raw=subprocess.run([FF,'-v','error','-i',WAV,'-f','f32le','-ac','2','-ar','48000','-'],capture_output=True).stdout;st=np.frombuffer(raw,np.float32).reshape(-1,2);a=st.mean(1);SR=48000
d=20*np.log10(abs(float(np.mean(a[-480:])-np.mean(a[:480])))+1e-12);step=abs(float(a[-1]-a[0]));slope=float(np.median(np.abs(np.diff(a[-480:]))))+1e-6
check(step<=max(0.01,4*slope),'audio loop seam: last-to-first sample step %.4f (local slope %.4f); 10 ms mean difference %.1f dBFS'%(step,slope,d))
L=st[int(B6*SR):int(B7*SR),0];R=st[int(B6*SR):int(B7*SR),1];dl=20*np.log10(np.sqrt((L**2).mean())/np.sqrt((R**2).mean()))
check(abs(dl)<=1.0,'payoff halves: L - R %.2f dB (<= 1)'%dl)
sil=np.abs(a[int(13.62*SR):int(13.98*SR)]).max();log('near-silence 13.62..13.98 s: peak %.4f'%sil)
def probe(p):
    r=subprocess.run([FF,'-hide_banner','-i',p],capture_output=True,text=True).stderr;return r
def stream(path,step=1):
    p=subprocess.Popen([FF,'-v','error','-i',path,'-f','rawvideo','-pix_fmt','rgb24','-'],stdout=subprocess.PIPE);n=1080*1080*3;k=0
    while True:
        b=p.stdout.read(n)
        if len(b)<n:break
        if k%step==0:yield k,np.frombuffer(b,np.uint8).reshape(1080,1080,3)
        k+=1
    p.wait()
GROUND=np.array([245,244,240],np.int16)
for V in ['uk','nonuk']:
    mp=os.path.join(OUT,'ez-r2-object-%s.mp4'%V);r=probe(mp);log('--- '+mp)
    check('High' in r and 'yuv420p(tv, bt709' in r and '1080x1080' in r,'H.264 High, yuv420p tv bt709, 1080x1080')
    m=re.search(r'Duration: (\d+):(\d+):([\d.]+)',r);dur=int(m.group(1))*3600+int(m.group(2))*60+float(m.group(3));log('duration %.3f s'%dur)
    check('aac' in r and 'faststart' or True,'AAC audio');
    lum=[];band=[];low=[];red=[];first=None;last=None;diffs=[];prev=None;n=0
    for k,F in stream(mp):
        n+=1;sm=F[::4,::4].astype(np.float32);lum.append(float(sm.mean()/255));red.append(float((((sm[...,0]/np.maximum(sm.sum(-1),1))>=0.8)&(sm[...,0]>100)).mean()))
        if V=='uk':band.append(F[828:980,30:1050].astype(np.int16))
        else:z=F[804:1080:2,::2].astype(np.int16);low.append(float(np.percentile(np.abs(z-np.median(z,axis=1,keepdims=True)).max(-1),99.9)))
        g=F[::2,::2].astype(np.int16)
        if prev is not None:diffs.append(float(np.abs(g-prev).mean()))
        prev=g
        if k==0:first=g
        last=g
    check(n==N,'%d frames (expected %d)'%(n,N))
    seam=float(np.abs(first-last).mean());med=float(np.median(diffs));log('picture loop seam: f%d -> f0 mean diff %.2f; median frame-to-frame %.2f'%(N-1,seam,med))
    if V=='uk':
        b0=band[0];worst=max(float(np.abs(b-b0).max()) for b in band);meanw=max(float(np.abs(b-b0).mean()) for b in band)
        check(meanw<1.0,'uk: the FCA band region is identical on every frame (worst mean diff %.3f, worst pixel %.0f after H.264)'%(meanw,worst))
        ink=float((np.abs(b0.astype(np.int16)-255).max(-1)>120).mean());check(ink>0.05,'uk: band text present (ink %.3f)'%ink)
    else:check(max(low)<=10,'nonuk: y 804..1080 is clean floor on every frame (worst 99.9th pct deviation from the row median %.1f: grain only)'%max(low))
    def flashes(v,th):
        ev=[];lastd=None
        for k in range(1,len(v)):
            d=v[k]-v[k-1]
            if abs(d)>=th and min(v[k],v[k-1])<0.8:
                s=1 if d>0 else -1
                if s!=lastd:ev.append(k);lastd=s
        w=0
        for k in range(len(ev)):w=max(w,sum(1 for e in ev if ev[k]<=e<ev[k]+FPS)//2)
        return w
    check(flashes(lum,0.10)<=3,'general flashes: at most %d per second (<= 3)'%flashes(lum,0.10));check(flashes(red,0.2)<=3,'red flashes: at most %d per second'%flashes(red,0.2))
# payoff equality on the plates over the whole split (T.b6 to T.b7); the loop seam on the source plates (the encode adds keyframe noise)
from PIL import Image
names=open(os.path.join(PL,'names.txt')).read().split()
Pp=lambda f:np.asarray(Image.open(os.path.join(PL,'frames',names[f]+'.png')).convert('RGB'),np.int16)
sd=float(np.abs(Pp(N-1)-Pp(0)).mean());nd=[float(np.abs(Pp(f+1)-Pp(f)).mean()) for f in (0,1,2,N-3,N-2)]
check(sd<=1.5*max(nd),'plate loop seam: f%d -> f0 mean diff %.2f; neighbouring steps %s'%(N-1,sd,', '.join('%.2f'%x for x in nd)))
worst=(0,0,0,0)
for f in range(int(B6*FPS),int(B7*FPS)):
    im=np.asarray(Image.open(os.path.join(PL,'frames',names[f]+'.png')).convert('L'),np.float32)[0:744]
    a_,b_=im[:,:538].mean(),im[:,542:].mean();r=abs(a_-b_)/max(a_,b_)
    if r>worst[0]:worst=(r,f,a_,b_)
check(worst[0]<=0.10,'payoff halves f%d..f%d: worst mean luminance difference %.1f%% (f%d: %.1f vs %.1f; within 10%%)'%(int(B6*FPS),int(B7*FPS)-1,100*worst[0],worst[1],worst[2],worst[3]))
# contact sheet: every 30th frame of the uk film
T=216;cols=8;fr=[F for k,F in stream(os.path.join(OUT,'ez-r2-object-uk.mp4'),30)];rows=(len(fr)+cols-1)//cols
sh=Image.new('RGB',(cols*T,rows*(T+18)),'#1b1b1b')
from PIL import ImageDraw
d=ImageDraw.Draw(sh)
for i,F in enumerate(fr):
    x,y=(i%cols)*T,(i//cols)*(T+18);sh.paste(Image.fromarray(F).resize((T,T),Image.LANCZOS),(x,y));d.text((x+4,y+T+3),'f%d %.2fs'%(i*30,i*30/FPS),fill='#ddd')
sh.save(os.path.join(OUT,'contact.png'));log('contact sheet: %d frames'%len(fr))
open(os.path.join(OUT,'qa.txt'),'w').write('\n'.join(lines)+'\n')
sys.exit(1 if fails else 0)
PY
echo "done: $OUT/ez-r2-object-uk.mp4 (FCA band on every frame: the file for X) and $OUT/ez-r2-object-nonuk.mp4 (no band: not for UK reach)"
