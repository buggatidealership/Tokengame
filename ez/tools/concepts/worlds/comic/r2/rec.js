// node rec.js <out.mp4>: the proof's four views switching, phone width, recorded by the browser
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../live-r1/_fonts.js');const cp=require('child_process'),fs=require('fs'),os=require('os'),path=require('path');
(async()=>{const dir=fs.mkdtempSync(path.join(process.env.TMPD||os.tmpdir(),'rec'));const b=await chromium.launch();const c=await b.newContext({viewport:{width:390,height:760},deviceScaleFactor:2,recordVideo:{dir,size:{width:390,height:760}}});const p=await c.newPage();await FONTS(p);
 await p.goto('http://localhost:8897/v47-live-x3plus.html#/leaderboard',{waitUntil:'load'});await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world'),null,{timeout:90000});await p.waitForTimeout(1500);
 await p.evaluate(()=>{const e=document.querySelector('.wc-pfs');scrollTo(0,e.getBoundingClientRect().top+scrollY-10)});await p.waitForTimeout(2200);
 const bs=await p.$$('.wc-pf-tabs button');for(const i of [1,2,3,0]){await bs[i].click();await p.waitForTimeout(2300)}
 await c.close();await b.close();const f=fs.readdirSync(dir).find(x=>x.endsWith('.webm'));
 cp.execFileSync('ffmpeg',['-y','-loglevel','error','-ss','3','-i',path.join(dir,f),'-c:v','libx264','-pix_fmt','yuv420p','-crf','24','-movflags','+faststart',process.argv[2]]);console.log('ok')})();
