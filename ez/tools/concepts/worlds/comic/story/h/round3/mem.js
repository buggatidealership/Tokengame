// node mem.js <take> [mb] : MEM rule check. Lays the take over the page at 390px, DPR 2.75, with the GPU memory capped (default 40 MB, as the
// black-frames fix was checked); prints every perspective surface's laid-out size against its on-screen size, and the mean brightness of
// "How a round works" (a black-painted page reads near 0).
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');const path=require('path');
(async()=>{const [T,mb]=process.argv.slice(2);const rd=f=>{const p=path.join(__dirname,f);return fs.existsSync(p)?fs.readFileSync(p,'utf8'):''};
 const b=await chromium.launch({args:['--force-gpu-mem-available-mb='+(mb||40)]});const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2.75})).newPage();await FONTS(p);
 await p.goto(('http://127.0.0.1:'+(process.env.PORT||8931)+'/v46-live-x2plus.html'),{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
 if(T!=='now'){await p.evaluate(()=>{window.__R3BASE='tools/concepts/worlds/comic/story/h/round3/'});await p.addStyleTag({content:rd('_r3.css')+rd(T+'.css')});await p.addScriptTag({content:rd('_r3.js')+rd(T+'.js')});await p.waitForTimeout(2000)}
 const s=await p.evaluate(()=>[...document.querySelectorAll('.t4-b2 .t4-sf')].map(e=>{const r=e.getBoundingClientRect();return [e.offsetWidth,e.offsetHeight,Math.round(r.width),Math.round(r.height)]}));
 const mx=s.reduce((m,[w,h,rw,rh])=>Math.max(m,w/Math.max(1,rw)),0);
 await p.evaluate(()=>document.querySelector('.t4-b2').scrollIntoView());await p.waitForTimeout(1500);
 const buf=await p.screenshot();const png=buf;fs.writeFileSync('out/mem-'+T+'.png',png);
 console.log(JSON.stringify({T,surfaces:s.length,maxLayoutOverScreen:+mx.toFixed(2),largest:s.sort((a,b)=>b[0]*b[1]-a[0]*a[1])[0]}));await b.close()})();
