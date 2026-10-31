// node rec.js <take> <out.mp4> : a phone-size recording (390x844) of the whole Overview scrolled at reading pace, scroll-driven motion on
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const R=require('./run.js');const fs=require('fs'),cp=require('child_process'),os=require('os'),path=require('path');
const T=process.argv[2],OUT=process.argv[3];
(async()=>{const b=await chromium.launch();const dir=fs.mkdtempSync(path.join(os.tmpdir(),'g2rec'));
 const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,recordVideo:{dir,size:{width:390,height:844}}});const p=await ctx.newPage();
 await require('../../../../../live-r1/_fonts.js')(p);
 await p.goto('http://localhost:8941/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 await p.waitForTimeout(3000);await R.inject(p,T);await p.waitForTimeout(1500);
 // warm the images, then start at the top
 const H=await p.evaluate(()=>document.querySelector('.wc-back').getBoundingClientRect().bottom+scrollY);
 for(let y=0;y<H;y+=600){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(150)}
 await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(1500);const t0=Date.now();
 await p.mouse.move(195,500);for(let y=0;y<H-700;y+=24){await p.mouse.wheel(0,24);await p.waitForTimeout(70)}
 await p.waitForTimeout(1200);const v=p.video();await ctx.close();const src=await v.path();
 const skip=((Date.now()-t0)/1000);
 cp.execFileSync('ffmpeg',['-y','-loglevel','error','-sseof','-'+(skip+0.5).toFixed(1),'-i',src,'-vf','scale=390:-2,fps=30','-c:v','libx264','-crf','26','-pix_fmt','yuv420p','-movflags','+faststart',OUT]);
 console.log(OUT,fs.statSync(OUT).size);await b.close()})();
