// node rec.js <take> <out.mp4> : records the cover opening and one chapter turn, at 390x844 then 1280x800, joined into one 1600x1000 H.264
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const {open}=require('./run.js');const fs=require('fs'),cp=require('child_process');
const T=process.argv[2],OUT=process.argv[3];const TMP='/tmp/claude-0/-home-user-Tokengame/04fe7bb4-12b0-5153-886f-488ff482fab4/scratchpad/rec-'+T;fs.rmSync(TMP,{recursive:true,force:true});fs.mkdirSync(TMP,{recursive:true});
(async()=>{const b=await chromium.launch();const parts=[];
 for(const W of [390,1280]){const H=W<600?844:800;const {ctx,p}=await open(b,T,W,{deviceScaleFactor:1,recordVideo:{dir:TMP+'/'+W,size:{width:W,height:H}}});
  const pos=await p.evaluate(()=>{const top=e=>e.getBoundingClientRect().top+scrollY;const st=document.querySelector('.b2-stage');const c1=document.querySelector('.b2-ch[data-ch="1"]'),c2=document.querySelector('.b2-ch[data-ch="2"]');
   const d=c2.previousElementSibling;const tb=(d&&/b2b-door|b2c-gut/.test(d.className))?top(d):top(c2);
   return {o:st?top(st)+st.offsetHeight-innerHeight:(document.querySelector('.b2c-filmrow')?top(document.querySelector('.b2c-filmrow'))-innerHeight*.15:innerHeight*.9),t0:tb-innerHeight*1.05,t1:(d&&/b2b-door|b2c-gut/.test(d.className))?top(c2)+innerHeight*.2:top(c2)+innerHeight*.25}});
  const glide=(a,z,ms)=>p.evaluate(([a,z,ms])=>new Promise(r=>{const t0=performance.now();const f=t=>{const k=Math.min(1,(t-t0)/ms),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;scrollTo({top:a+(z-a)*e,behavior:'instant'});dispatchEvent(new Event('scroll'));k<1?requestAnimationFrame(f):r()};requestAnimationFrame(f)}),[a,z,ms]);
  await p.waitForTimeout(1600);await glide(0,pos.o,4200);await p.waitForTimeout(1500);
  await p.evaluate(y=>{scrollTo({top:y,behavior:'instant'});dispatchEvent(new Event('scroll'))},pos.t0);await p.waitForTimeout(1300);
  await glide(pos.t0,pos.t1,3600);await p.waitForTimeout(1400);
  const v=p.video();await ctx.close();parts.push(await v.path())}
 await b.close();
 const f=parts.map((x,i)=>`[${i}:v]scale=1600:1000:force_original_aspect_ratio=decrease,pad=1600:1000:(ow-iw)/2:(oh-ih)/2:color=0x121216,fps=30,setsar=1[v${i}]`).join(';');
 cp.execFileSync('ffmpeg',['-y','-loglevel','error',...parts.flatMap(x=>['-i',x]),'-filter_complex',f+';'+parts.map((x,i)=>`[v${i}]`).join('')+`concat=n=${parts.length}:v=1[o]`,'-map','[o]','-c:v','libx264','-pix_fmt','yuv420p','-crf','26','-movflags','+faststart',OUT]);
 console.log('ok',OUT)})();
