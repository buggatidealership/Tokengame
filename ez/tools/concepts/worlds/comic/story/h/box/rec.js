// node rec.js <out.mp4> [styles ink,logo] [opt a] : the whole path at 390x844: cover held (ticket nudging), scroll takes the ticket,
// each loop object tapped (its Hedra clip plays, the fact appears), scroll opens the cinema doors; styles joined one after the other
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const {open}=require('./shot.js');const fs=require('fs'),cp=require('child_process'),os=require('os');
const OUT=process.argv[2],SS=(process.argv[3]||'ink,logo').split(','),O=process.argv[4]||'a';const TMP=fs.mkdtempSync((process.env.TMPD||os.tmpdir())+'/boxrec-');
(async()=>{const b=await chromium.launch();const parts=[];
 for(const s of SS){const {ctx,p}=await open(b,s,O,390,{deviceScaleFactor:1,recordVideo:{dir:TMP+'/'+s,size:{width:390,height:844}}});
  const glide=(a,z,ms)=>p.evaluate(([a,z,ms])=>new Promise(r=>{const t0=performance.now();const f=t=>{const k=Math.min(1,(t-t0)/ms),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;scrollTo({top:a+(z-a)*e,behavior:'instant'});dispatchEvent(new Event('scroll'));k<1?requestAnimationFrame(f):r()};requestAnimationFrame(f)}),[a,z,ms]);
  const y=sel=>p.evaluate(sel=>{const e=document.querySelector(sel);return e.getBoundingClientRect().top+scrollY},sel);
  await p.waitForTimeout(3500);const c=await y('.cover');const ch=await p.evaluate(()=>document.querySelector('.cover').offsetHeight-innerHeight);
  await glide(0,c+ch,4500);await p.waitForTimeout(700);
  for(let i=0;i<4;i++){const t=await p.evaluate(i=>{const f=document.querySelectorAll('.obj')[i];return f.getBoundingClientRect().top+scrollY-60},i);const from=await p.evaluate(()=>scrollY);
   await glide(from,t,1100);await p.waitForTimeout(1300);await p.evaluate(i=>window.__boxOpen(i),i);await p.waitForTimeout(4200)}
  const ci=await y('.cinema'),cih=await p.evaluate(()=>document.querySelector('.cinema').offsetHeight-innerHeight),from=await p.evaluate(()=>scrollY);
  await glide(from,ci,1200);await p.waitForTimeout(600);await glide(ci,ci+cih,4000);await p.waitForTimeout(2500);
  const v=p.video();await ctx.close();parts.push(await v.path())}
 await b.close();
 const f=parts.map((x,i)=>`[${i}:v]trim=start=1.4,setpts=PTS-STARTPTS,fps=30,setsar=1[v${i}]`).join(';');
 cp.execFileSync('ffmpeg',['-y','-loglevel','error',...parts.flatMap(x=>['-i',x]),'-filter_complex',f+';'+parts.map((x,i)=>`[v${i}]`).join('')+`concat=n=${parts.length}:v=1[o]`,'-map','[o]','-c:v','libx264','-pix_fmt','yuv420p','-crf','27','-movflags','+faststart',OUT]);
 console.log('ok',OUT)})();
