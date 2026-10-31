// node rec.js <out.mp4> [take ink]: a scroll through the whole book at 390x844, frames from screenshots, joined by ffmpeg at 24 fps
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const {open}=require('./run.js');const fs=require('fs'),cp=require('child_process');
(async()=>{const out=process.argv[2],T=process.argv[3]||'ink',dir=out+'.frames';fs.mkdirSync(dir,{recursive:true});const b=await chromium.launch({args:['--disable-dev-shm-usage']});
 const {p}=await open(b,390,'full',{dpr:2,take:T});await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(800);
 const H=await p.evaluate(()=>document.documentElement.scrollHeight-innerHeight);let i=0;
 const hold=async n=>{for(let k=0;k<n;k++)await p.screenshot({path:`${dir}/${String(i++).padStart(4,'0')}.jpg`,type:'jpeg',quality:82})};
 await hold(20);for(let y=0;y<=H;y+=26){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(16);await hold(1)}await hold(24);
 await b.close();cp.execFileSync('ffmpeg',['-y','-loglevel','error','-framerate','24','-i',dir+'/%04d.jpg','-vf','scale=780:-2','-c:v','libx264','-pix_fmt','yuv420p','-crf','24','-movflags','+faststart',out]);fs.rmSync(dir,{recursive:true,force:true});console.log('frames',i)})();
