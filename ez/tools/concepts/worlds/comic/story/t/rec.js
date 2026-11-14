// node rec.js <out dir>: T3 at 1280x860, scrolling through the nights; frames -> <out>/t3-scroll.mp4, plus a still scrolled to Wednesday
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');const {execSync}=require('child_process');
const OUT=process.argv[2];const F=OUT+'/fr';fs.mkdirSync(F,{recursive:true});const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:860},deviceScaleFactor:1});await FONTS(p);
 await p.goto('http://localhost:8912/v47-live-x3plus.html#/upcoming',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 await p.waitForFunction(()=>document.documentElement.classList.contains('sg-ready'),null,{timeout:60000}).catch(()=>{});
 await p.addStyleTag({content:rd('_st.css')+rd('t3.css')});await p.addScriptTag({content:rd('_st.js')+rd('t3.js')});await p.waitForFunction(()=>document.documentElement.classList.contains('tt-ready'));
 await p.waitForFunction(()=>document.fonts.status==='loaded');await p.addStyleTag({content:'.x2p-cw{display:none!important}'});
 const y0=await p.evaluate(()=>document.querySelector('.tt-root').getBoundingClientRect().top+scrollY-90);
 const y1=await p.evaluate(()=>{const d=[...document.querySelectorAll('.t3-day')][3];return d.getBoundingClientRect().top+scrollY-300});
 await p.evaluate(y=>scrollTo(0,y),y0);await p.waitForTimeout(600);let k=0;
 const shot=async()=>{await p.screenshot({path:`${F}/${String(k++).padStart(4,'0')}.png`})};
 for(let i=0;i<14;i++){await shot();await p.waitForTimeout(50)}
 const N=110;for(let i=0;i<=N;i++){const t=i/N,e=t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;await p.evaluate(y=>scrollTo(0,y),y0+(y1-y0)*e);await p.waitForTimeout(30);await shot()}
 for(let i=0;i<20;i++){await shot();await p.waitForTimeout(50)}
 await p.screenshot({path:OUT+'/t3-scrolled.png'});
 await b.close();
 execSync(`ffmpeg -y -loglevel error -framerate 24 -i ${F}/%04d.png -c:v libx264 -pix_fmt yuv420p -crf 22 ${OUT}/t3-scroll.mp4`);fs.rmSync(F,{recursive:true});console.log('ok',k)})();
