// node rec.js <take> <out.mp4> : the cover held (its object moving), then the opening by scroll, at 390x844 then 1280x800, joined in 1600x1000
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const {open}=require('./shot.js');const fs=require('fs'),cp=require('child_process');
const T=process.argv[2],OUT=process.argv[3];const TMP='/tmp/claude-0/-home-user-Tokengame/1258d8d1-7d8f-5866-81fa-2a46e967d8cb/scratchpad/rec-'+T;fs.rmSync(TMP,{recursive:true,force:true});fs.mkdirSync(TMP,{recursive:true});
(async()=>{const b=await chromium.launch();const parts=[];
 for(const W of [390,1280]){const H=W<600?844:800;const {ctx,p}=await open(b,T,W,{deviceScaleFactor:1,recordVideo:{dir:TMP+'/'+W,size:{width:W,height:H}}});
  const end=await p.evaluate(()=>{const st=document.getElementById('stage');return st.offsetTop+st.offsetHeight-innerHeight});
  const glide=(a,z,ms)=>p.evaluate(([a,z,ms])=>new Promise(r=>{const t0=performance.now();const f=t=>{const k=Math.min(1,(t-t0)/ms),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;scrollTo({top:a+(z-a)*e,behavior:'instant'});dispatchEvent(new Event('scroll'));k<1?requestAnimationFrame(f):r()};requestAnimationFrame(f)}),[a,z,ms]);
  await p.waitForTimeout(4200);await glide(0,end,5200);await p.waitForTimeout(2200);
  const v=p.video();await ctx.close();parts.push(await v.path())}
 await b.close();
 const f=parts.map((x,i)=>`[${i}:v]trim=start=1.2,setpts=PTS-STARTPTS,scale=1600:1000:force_original_aspect_ratio=decrease,pad=1600:1000:(ow-iw)/2:(oh-ih)/2:color=0x121216,fps=30,setsar=1[v${i}]`).join(';');
 cp.execFileSync('ffmpeg',['-y','-loglevel','error',...parts.flatMap(x=>['-i',x]),'-filter_complex',f+';'+parts.map((x,i)=>`[v${i}]`).join('')+`concat=n=${parts.length}:v=1[o]`,'-map','[o]','-c:v','libx264','-pix_fmt','yuv420p','-crf','26','-movflags','+faststart',OUT]);
 console.log('ok',OUT)})();
