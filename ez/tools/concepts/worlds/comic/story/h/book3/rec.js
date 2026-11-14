// node rec.js <out.mp4> [takes r2,r1,r3] : scrolls the whole Overview at reading pace at 390x844, one take after another, joined into one H.264
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const {open}=require('./run.js');const fs=require('fs'),cp=require('child_process');
const OUT=process.argv[2],TS=(process.argv[3]||'r2,r1,r3').split(',');const TMP=require('os').tmpdir()+'/b3rec';fs.rmSync(TMP,{recursive:true,force:true});fs.mkdirSync(TMP,{recursive:true});
(async()=>{const b=await chromium.launch();const parts=[];
 for(const t of TS){const {ctx,p}=await open(b,t,390,{deviceScaleFactor:1,recordVideo:{dir:TMP+'/'+t,size:{width:390,height:844}}});
  const HH=await p.evaluate(()=>document.documentElement.scrollHeight-innerHeight);
  await p.waitForTimeout(800);
  // a steady thumb: about 650px a second, a short hold at every hand-over
  await p.evaluate(HH=>new Promise(r=>{const v=650;let y=0,last=performance.now(),hold=0;const stops=[...document.querySelectorAll('#wc-book .b3-ch')].slice(1).map(s=>(s.closest('.b3-sp')||s).getBoundingClientRect().top+scrollY-innerHeight*.5);
    const f=t=>{const dt=(t-last)/1000;last=t;if(hold>0){hold-=dt}else{const ny=y+v*dt;if(stops.length&&ny>=stops[0]){y=stops.shift();hold=.9}else y=ny}
     scrollTo({top:Math.min(y,HH),behavior:'instant'});dispatchEvent(new Event('scroll'));y<HH?requestAnimationFrame(f):setTimeout(r,800)};requestAnimationFrame(f)}),HH);
  const v=p.video();await ctx.close();parts.push(await v.path())}
 await b.close();
 const f=parts.map((x,i)=>`[${i}:v]fps=30,setsar=1,drawtext=text='${TS[i].toUpperCase()}':x=10:y=h-40:fontsize=22:fontcolor=0xfdbc2a:box=1:boxcolor=0x000000AA[v${i}]`).join(';');
 cp.execFileSync('ffmpeg',['-y','-loglevel','error',...parts.flatMap(x=>['-i',x]),'-filter_complex',f+';'+parts.map((x,i)=>`[v${i}]`).join('')+`concat=n=${parts.length}:v=1[o]`,'-map','[o]','-c:v','libx264','-pix_fmt','yuv420p','-crf','27','-movflags','+faststart',OUT]);
 console.log('ok',OUT)})();
