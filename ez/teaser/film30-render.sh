#!/bin/bash
# EZ FILM30 "Daylight", production render: 30 s, 60 fps, 1080 x 1080, two variants (nonuk, uk) from one set of plates.
# Needs the static server on :8765 serving ez/ (cd ez && python3 -m http.server 8765).
#   teaser/film30-render.sh OUTDIR ASOF
#     ASOF  REQUIRED: the stated render date, ISO (e.g. 2026-10-14T13:00:00Z), normally the posting day. The LED dies show the
#           true time left to the bet at that moment ("AS OF" top right), and the board shows the standings of that day, so
#           re-render on every sheet sync and on the day it posts.
#   env: BET_OK=1       render although no bet date is set (SIM.betDate / CONFIG.betDate): the LEDs then count to the fallback
#                       (the NVDA row's CALL DATE plus one weekday, 16:00 New York)
#        THEME=navy     the navy cut (the site's dark mode): its own plates (OUTDIR/plates-navy), same frame table and sound;
#                       outputs ez-film30-navy-nonuk.mp4 / -uk.mp4 (default THEME=cream: ez-film30-nonuk.mp4 / -uk.mp4)
#        MARKS=1        the AI labs' marks on the leaderboard cards (only after counsel; default off, names only)
#        PAR=N          plate renderers in parallel (default 1; each is one Chromium on SwiftShader, 4 cores here)
#        RES=540        a draft: the WebGL plates at 540 (or 360, 270) instead of 1080, for a quick review of the cut and a
#                       test of this script (its own plate folder; type, sound and QA unchanged). Never deliver a draft.
#        MIN_FREE_MB    free disk needed before the plates (default 800; measured: 1080 plates about 0.33 MB each, so about
#                       0.4 GB for the 1,136 unique plates, 0.03 GB of type states, 0.06 GB of films; the navy cut as much again)
#        DELIVER=v1     also copy the films and posters to ez/media as ez-film30-v1-nonuk.mp4 / -uk.mp4 (+ -poster.jpg)
# Steps (each resumable: frames are named by a key of everything they are drawn from, and existing files are skipped):
#   0. gates: the bet date, SIM.stopLoss null, SIM.leverage / leadHours / poolShare set, AS OF before the freeze (the page
#      refuses too), the disk
#   1. plates: every UNIQUE plate once (holds share one plate: about 1,140 of 1,800 frames), WebGL on SwiftShader
#   2. sound: ez-film30-audio.js from the page's own frame table, then a two-pass loudnorm to -14 LUFS / -1.5 dBTP (linear only)
#   3. type: each unique type state once per variant (about 245), transparent PNGs
#   4. composite and encode: plate + type state + seeded temporal grain (alls=3, only against banding in the cream);
#      H.264 High, crf 18, 60 fps, BT.709, AAC 192k, faststart. nonuk has no FCA band: never where UK viewers can see it
#      (so not on X); uk carries the FCA risk warning on every frame. Posters from frame 0 (the film's poster frame).
#   5. QA: loudness, true peak, phone speakers, the three silences, hit onsets (+1 frame), L = R in the split, the loop
#      seam; picture: frame count, A against B in the split (ink 0.8..1.25), flashes (WCAG 2.3.1), the uk band on every
#      frame, nothing in y 800..1080 in nonuk, the legal line's contrast; page: the reserve zone, the loop seam, the reading
#      rule, every on-screen string with its source (strings.json).
set -e
OUT=${1:?usage: film30-render.sh OUTDIR ASOF}; ASOF=${2:?the stated render date (ISO) is required, e.g. 2026-10-14T13:00:00Z}
EZ=$(cd "$(dirname "$0")/.." && pwd)
FF=${FFMPEG:-/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2}
PAR=${PAR:-1}; THEME=${THEME:-cream}; MIN_FREE_MB=${MIN_FREE_MB:-800}; RES=${RES:-1080}
mkdir -p "$OUT"; OUT=$(cd "$OUT" && pwd); cd "$EZ"
node -e "if(!isFinite(Date.parse('$ASOF')))process.exit(1)" || { echo "ASOF is not a date: $ASOF"; exit 2; }
Q="asof=$ASOF&theme=$THEME${MARKS:+&marks=1}"
SUF=$([ "$THEME" = "navy" ] && echo "-navy" || echo "")
PL="$OUT/plates$SUF$([ "$RES" = "1080" ] || echo "-r$RES")"; QP="$Q$([ "$RES" = "1080" ] || echo "&res=$RES")"

# --- 0. gates ---
J=$(node -e "const vm=require('vm'),fs=require('fs');const c={};vm.createContext(c);vm.runInContext(fs.readFileSync('ez-data.js','utf8')+';this.o={b:SIM.betDate||CONFIG.betDate||\"\",s:SIM.stopLoss,l:SIM.leverage,h:SIM.leadHours,p:SIM.poolShare,n:LADDER.length}',c);console.log(JSON.stringify(c.o))")
echo "data: $J"
node -e "const o=$J;if(o.s!=null){console.log('SIM.stopLoss is set: the film says No stop loss; re-plan scenario B');process.exit(1)}if([o.l,o.h,o.p].some(v=>v==null)){console.log('SIM.leverage, leadHours or poolShare is null');process.exit(1)}if(o.n<2||o.n>6){console.log('LADDER rows: '+o.n);process.exit(1)}" || exit 3
if [ "$(node -e "console.log(($J).b)")" = "" ]; then
  echo "bet date: not set in the sheet; the LEDs would count to the fallback (NVDA call date + 1 weekday, 16:00 New York)"
  [ "$BET_OK" = "1" ] || { echo "refusing: set SIM.betDate (or CONFIG.betDate), or pass BET_OK=1"; exit 3; }
fi
FREE=$(df -Pm "$OUT" | awk 'NR==2{print $4}')
[ "$FREE" -ge "$MIN_FREE_MB" ] || { echo "only $FREE MB free in $OUT (need $MIN_FREE_MB): free space first (old prototype frames in the scratchpad, e.g. film30/dark/out/{full,lb,green,uk} and film30/proto-light/{out*,full-s1*,bench-*})"; exit 3; }

# --- 1. plates ---
PAGE="ez-film30.html?pass=plate&$QP" READY_MS=180000 node teaser/render.js names "$PL"
NU=$(sort -u "$PL/names.txt" | grep -c . || true); echo "plates: $NU unique of 1800 frames ($THEME)"
T0=$(date +%s); pids=()
for ((k=0;k<PAR;k++)); do
  PAGE="ez-film30.html?pass=plate&$QP" READY_MS=180000 SKIP_EXISTING=1 node teaser/render.js range "$PL" "0,1799,$PAR,$k" > "$PL/log-$k.txt" 2>&1 &
  pids+=($!); done
for p in "${pids[@]}"; do wait "$p" || { echo "plate renderer failed; see $PL/log-*.txt"; exit 4; }; done
while read -r n; do [ -f "$PL/frames/$n.png" ] || { echo "missing plate $n"; exit 4; }; done < <(sort -u "$PL/names.txt")
echo "plates: done in $(( ($(date +%s)-T0)/60 )) min"

# --- 2. sound (shared by both themes and both variants) ---
if [ ! -f "$OUT/sound/audio-14lufs.wav" ]; then
  PAGE="ez-film30.html?pass=type&$Q" READY_MS=60000 node teaser/render.js audio "$OUT/sound"
  "$FF" -hide_banner -nostats -i "$OUT/sound/audio.wav" -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p' > "$OUT/sound/pass1.json"
  JV(){ node -e "console.log(JSON.parse(require('fs').readFileSync('$OUT/sound/pass1.json','utf8'))['$1'])"; }
  LN="loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=$(JV input_i):measured_TP=$(JV input_tp):measured_LRA=$(JV input_lra):measured_thresh=$(JV input_thresh):offset=$(JV target_offset):linear=true:print_format=json"
  "$FF" -y -hide_banner -nostats -i "$OUT/sound/audio.wav" -af "$LN" -ar 48000 -c:a pcm_s24le "$OUT/sound/audio-14lufs.wav" 2> "$OUT/sound/pass2.log"
  grep -q '"normalization_type" : "linear"' "$OUT/sound/pass2.log" || { rm -f "$OUT/sound/audio-14lufs.wav"; echo "loudnorm fell back to dynamic mode (crest factor too high); see $OUT/sound/pass2.log"; exit 5; }
fi

# --- 3. type states, 4. composite and encode ---
mkdir -p "$OUT/seq/plates$SUF"; i=0; while read -r n; do ln -sf "$PL/frames/$n.png" "$OUT/seq/plates$SUF/$(printf %04d $i).png"; i=$((i+1)); done < "$PL/names.txt"
[ "$i" = "1800" ] || { echo "names.txt has $i frames, expected 1800"; exit 6; }
for V in nonuk uk; do
  TD="$OUT/type$SUF-$V"
  PAGE="ez-film30.html?pass=type&variant=$V&$Q" READY_MS=60000 node teaser/render.js names "$TD"
  PAGE="ez-film30.html?pass=type&variant=$V&$Q" READY_MS=60000 ALPHA=1 SKIP_EXISTING=1 node teaser/render.js range "$TD" 0,1799
  mkdir -p "$OUT/seq/$V$SUF"; i=0; while read -r n; do ln -sf "$TD/frames/$n.png" "$OUT/seq/$V$SUF/$(printf %04d $i).png"; i=$((i+1)); done < "$TD/names.txt"
  NM="ez-film30$SUF-$V"
  "$FF" -y -loglevel error -framerate 60 -i "$OUT/seq/plates$SUF/%04d.png" -framerate 60 -i "$OUT/seq/$V$SUF/%04d.png" -i "$OUT/sound/audio-14lufs.wav" \
    -filter_complex "[0:v]scale=1080:1080:flags=lanczos,format=gbrp[p];[1:v]format=rgba[t];[p][t]overlay=0:0:format=gbrp,noise=alls=3:allf=t:all_seed=20261012,scale=out_color_matrix=bt709:out_range=tv,format=yuv420p[v]" \
    -map "[v]" -map 2:a -colorspace bt709 -color_primaries bt709 -color_trc bt709 -color_range tv \
    -c:v libx264 -profile:v high -crf 18 -preset slow -r 60 -c:a aac -b:a 192k -ar 48000 -movflags +faststart -shortest "$OUT/$NM.mp4"
  "$FF" -y -loglevel error -i "$OUT/$NM.mp4" -vf "select=eq(n\,0)" -frames:v 1 -q:v 2 "$OUT/$NM-poster.jpg"
  if [ -n "$DELIVER" ]; then cp "$OUT/$NM.mp4" "$EZ/media/ez-film30$SUF-$DELIVER-$V.mp4"; cp "$OUT/$NM-poster.jpg" "$EZ/media/ez-film30$SUF-$DELIVER-$V-poster.jpg"; fi
done

# --- 5. QA ---
# page: the reserve zone (no object below y 762 outside S2's fade), the loop seam (f1799 = f0, plate and type), the reading
# rule (0.6 s + 0.33 s per word), the LED digit sizes, and strings.json (every on-screen string and its source)
node - "$OUT" "ez-film30.html?pass=both&variant=uk&$Q" <<'NODE' || QAFAIL=1
const {execSync}=require('child_process');const {chromium}=require(execSync('npm root -g').toString().trim()+'/playwright');const fs=require('fs'),path=require('path');
const [OUT,PAGE]=process.argv.slice(2);
(async()=>{const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader-webgl','--enable-unsafe-swiftshader']});const p=await b.newPage({viewport:{width:1080,height:1080}});
  await p.goto('http://localhost:8765/teaser/'+PAGE);await p.waitForFunction(()=>window.__ready||window.__err,null,{timeout:180000});
  const err=await p.evaluate(()=>window.__err||null);if(err){console.log('page error',err);process.exit(1)}
  const q=await p.evaluate(()=>window.FILM_QA());await b.close();
  fs.writeFileSync(path.join(OUT,'strings.json'),JSON.stringify(q.strings,null,1));fs.writeFileSync(path.join(OUT,'qa-page.json'),JSON.stringify(q,null,1));
  const short=q.reading.filter(r=>!r.ok);
  console.log('QA page: reserve-zone violations',q.window.length,q.window.slice(0,6).map(x=>x.join(' ')).join(' | ')||'none');
  console.log('QA page: loop seam (f1799 = f0)',q.seam.same?'same':'DIFFERENT');
  console.log('QA page: LED digit height px',JSON.stringify(q.led),'(S2 hold >= 70)');
  console.log('QA page: story words',q.words.story,'(<= 40); reading rule misses',short.length,short.map(r=>r.text+' '+r.have+'/'+r.need).join(' | '));
  process.exit(q.window.length||!q.seam.same||q.led.s2hold<70||q.words.story>40||short.length?1:0)})();
NODE
python3 -I - "$OUT" "$FF" "$SUF" "$THEME" <<'PY' || QAFAIL=1
import sys,os,re,json,subprocess
import numpy as np
OUT,FF,SUF,THEME=sys.argv[1:5];FPS=60;N=1800;lines=[];fails=[]
WAV=os.path.join(OUT,'sound','audio-14lufs.wav')
QP=json.load(open(os.path.join(OUT,'qa-page.json'))) if os.path.exists(os.path.join(OUT,'qa-page.json')) else {}
def log(s):print(s,flush=True);lines.append(s)
def check(ok,s):log(('PASS ' if ok else 'FAIL ')+s);(None if ok else fails.append(s))
def ebur(path,af='',extra=''):
    r=subprocess.run([FF,'-hide_banner','-nostats','-v','verbose']+(extra.split() if extra else [])+['-i',path,'-af',(af+',' if af else '')+'ebur128=peak=true:framelog=verbose','-f','null','-'],capture_output=True,text=True).stderr
    I=float(re.findall(r'I:\s+(-?[\d.]+) LUFS',r)[-1]);pk=re.findall(r'Peak:\s+(-?[\d.inf]+) dBFS',r)
    return I,(float(pk[-1]) if pk else None)
# the frame table (the same one the page and the sound use)
FT=QP.get('T') or {'lockSil':978,'lock':996,'sil6':1572,'s7':1590,'s6':1300}
if os.path.exists(WAV):
    I,tp=ebur(WAV);log('sound: %s'%WAV)
    check(abs(I+14)<=0.5,'integrated %.1f LUFS (target -14)'%I);check(tp is None or tp<=-1.5,'true peak %s dBTP (<= -1.5)'%tp)
    Ih,_=ebur(WAV,'highpass=f=300,highpass=f=300');check(I-Ih<=6.0,'phone speakers: %.1f LU lost through a 300 Hz high-pass (<= 6)'%(I-Ih))
    raw=subprocess.run([FF,'-v','error','-i',WAV,'-f','f32le','-ac','2','-ar','48000','-'],capture_output=True).stdout;st=np.frombuffer(raw,np.float32).reshape(-1,2);a=st.mean(1)
    S=lambda fr:int(fr/FPS*48000)
    for nm,x0,x1 in [('before the lock',FT['lockSil']+3,FT['lock']+0.9),('before the disclaimer',FT['sil6']+3,FT['s7']+0.9)]:
        pk=np.abs(a[S(x0):S(x1)]).max();check(pk<2e-3,'silence %s (f%d..f%d): peak %.5f'%(nm,x0,int(x1),pk))
    for nm,fr in [('lock chord',FT['lock']),('end tone',FT['s7'])]:
        seg=np.abs(a[S(fr-2):S(fr+6)]);on=np.argmax(seg>0.01);lag=(S(fr-2)+on)/48000*FPS-fr;check(1.0<=lag<=1.3,'%s sounds %.2f frames after its picture (1.0..1.3)'%(nm,lag))
    L=st[S(FT['s6']):S(FT['s7']),0];R=st[S(FT['s6']):S(FT['s7']),1];dl=20*np.log10((np.sqrt((L**2).mean())+1e-9)/(np.sqrt((R**2).mean())+1e-9))
    check(abs(dl)<=0.5,'the split is centred: L - R %.2f dB (<= 0.5)'%dl)
    step=abs(float(a[-1]-a[0]));slope=float(np.median(np.abs(np.diff(a[-480:]))))+1e-6     # two cycles rendered, the second kept
    check(step<=max(0.01,4*slope),'loop seam: the step from the last sample to the first is %.4f (local slope %.4f)'%(step,slope))
# picture checks stream the decoded film frame by frame (decoding it whole into memory got the QA killed)
def stream(path):
    p=subprocess.Popen([FF,'-v','error','-i',path,'-f','rawvideo','-pix_fmt','rgb24','-'],stdout=subprocess.PIPE);n=1080*1080*3
    while True:
        b=p.stdout.read(n)
        if len(b)<n:break
        yield np.frombuffer(b,np.uint8).reshape(1080,1080,3)
    p.wait()
def rel(f):c=f/255.0;c=np.where(c<=0.04045,c/12.92,((c+0.055)/1.055)**2.4);return 0.2126*c[...,0]+0.7152*c[...,1]+0.0722*c[...,2]
GROUND=np.array([244,239,230] if THEME!='navy' else [11,19,48],np.int16)
SEC=[('S1 card',0,240),('S2 fast-forward',240,450),('S3 board',450,780),('S4 bet',780,1130),('S5 pot',1130,1300),('S6 split',1300,1590),('S7 close',1590,1800)]
std=os.path.join(OUT,'ez-film30%s-nonuk.mp4'%SUF);uk=os.path.join(OUT,'ez-film30%s-uk.mp4'%SUF)
s6a,s6b=FT.get('s6',1300),FT.get('s7',1590)
LEG=np.array([98,104,122] if THEME!='navy' else [185,192,214],np.float32);Lt=float(rel(LEG.reshape(1,1,3))[0,0]);GF=GROUND.astype(np.float32);Lg=float(rel(GF.reshape(1,1,3))[0,0])
if os.path.exists(std):
    y=[];L=[];red=[];A=B=0;worst=[];cr=[]
    for k,F in enumerate(stream(std)):
        sm=F[::4,::4].astype(np.float32);y.append(float((0.2126*sm[...,0]+0.7152*sm[...,1]+0.0722*sm[...,2]).mean()));L.append(float(rel(sm).mean()))
        red.append(float((((sm[...,0]/np.maximum(sm.sum(-1),1))>=0.8)&(sm[...,0]>100)).mean()))
        if s6a<=k<s6b:
            ink=(np.abs(F[90:760].astype(np.int16)-GROUND).max(-1)>40);A+=int(ink[:,:540].sum());B+=int(ink[:,540:].sum())
        Z=np.abs(F[810:1080:2,::2].astype(np.int16)-GROUND).max(-1);worst.append(float(np.percentile(Z,99.9)))   # under the legal line's descenders
        # the legal line: every pixel of its strip must lie between the ground and the line's ink (anti-aliasing); anything else is
        # an object behind it. Its contrast is then the ink's against the ground.
        G=F[772:808,60:1020].astype(np.float32).reshape(-1,3);u=np.clip(((G-GF)@(LEG-GF))/float((LEG-GF)@(LEG-GF)),0,1);dd=np.linalg.norm(G-(GF+u[:,None]*(LEG-GF)),axis=1)
        cr.append(float((dd>30).mean()))
    y=np.array(y);log('picture: %s (%d frames)'%(std,len(y)));check(len(y)==N,'%d frames'%len(y))
    for nm,a0,b0 in SEC:log('  mean luma %-16s %5.1f'%(nm,y[a0:b0].mean()))
    check(B>0 and 0.8<=A/B<=1.25,'split A/B ink %d / %d = %.2f (0.8..1.25)'%(A,B,A/max(B,1)))
    def flashes(v,th):
        ev=[];last=None
        for k in range(1,len(v)):
            d=v[k]-v[k-1]
            if abs(d)>=th and min(v[k],v[k-1])<0.8:
                s=1 if d>0 else -1
                if s!=last:ev.append(k);last=s
        w=0
        for k in range(len(ev)):w=max(w,sum(1 for e in ev if ev[k]<=e<ev[k]+FPS)//2)
        return w
    check(flashes(L,0.10)<=3,'general flashes: at most %d per second (<= 3)'%flashes(L,0.10));check(flashes(red,0.20)<=3,'red flashes: at most %d per second (<= 3)'%flashes(red,0.20))
    check(max(worst)<=14,'nonuk: y 810..1080 is clean ground on every frame (worst 99.9th pct diff %.1f at frame %d, <= 14)'%(max(worst),int(np.argmax(worst))))
    c0=(max(Lt,Lg)+0.05)/(min(Lt,Lg)+0.05);check(c0>=4.5 and max(cr)<=0.003,'legal line: ink on ground %.1f:1 (>= 4.5); nothing behind it (worst %.2f%% foreign pixels at frame %d, <= 0.3%%)'%(c0,100*max(cr),int(np.argmax(cr))))
if os.path.exists(uk):
    band=[float((np.abs(F[829:979,40:1040].astype(np.int16)-GROUND).max(-1)>60).mean()) for F in stream(uk)]
    check(len(band)==N and min(band)>0.04,'uk: the FCA band on all %d frames (least band ink %.3f)'%(len(band),min(band)))
open(os.path.join(OUT,'qa%s.txt'%SUF),'w').write('\n'.join(lines)+'\n')
sys.exit(1 if fails else 0)
PY
"$FF" -hide_banner -nostats -i "$OUT/ez-film30$SUF-uk.mp4" -af ebur128=peak=true -f null - 2>&1 | grep -A20 "Summary" | grep -E "I:|Peak:"
[ -z "$QAFAIL" ] || { echo "QA failed: see $OUT/qa$SUF.txt and $OUT/qa-page.json"; exit 7; }
echo "done: $OUT/ez-film30$SUF-nonuk.mp4 (no FCA band: not for UK reach, so not for X) and $OUT/ez-film30$SUF-uk.mp4"
