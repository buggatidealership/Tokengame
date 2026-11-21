// node run.js <outdir> stills|video  — the live strip, stamped (S.css) and the On air motion takes (M.css, data-m on <html>)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../live-r1/_fonts.js');const fs=require('fs'),path=require('path');
const out=process.argv[2],mode=process.argv[3]||'stills',W=+(process.env.W||390),ISO=process.env.ISO||'2026-10-28T17:09:00Z';
const S=fs.readFileSync(path.join(__dirname,'S.css'),'utf8'),M=fs.readFileSync(path.join(__dirname,'M.css'),'utf8');
(async()=>{const b=await chromium.launch();
async function open(css,m){const p=await b.newPage({viewport:{width:W,height:900},deviceScaleFactor:2});await FONTS(p);await p.clock.install({time:new Date(ISO)});
 await p.goto('http://localhost:8897/v46-live-x2plus.html',{waitUntil:'load'});await p.clock.runFor(4000);await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});await p.clock.runFor(4000);
 if(css)await p.addStyleTag({content:css});if(m)await p.evaluate(m=>document.documentElement.setAttribute('data-m',m),m);
 const e=await p.$('.x2p-ls');await e.scrollIntoViewIfNeeded();await p.waitForTimeout(300);return [p,e]}
if(mode==='stills'){for(const [n,css] of [['now',''],['S',S]]){const [p,e]=await open(css);await e.screenshot({path:`${out}/st-${n}-${W}.png`,animations:'disabled'});await p.close()}}
else{for(const m of ['now','M1','M2','M3','M4']){const [p,e]=await open(m==='now'?S:S+M,m==='now'?'':m);const dir=`${out}/fr-${m}`;fs.mkdirSync(dir,{recursive:true});
 const L=m==='M3'?6:m==='M1'?3:m==='M2'?2.4:m==='M4'?3.2:2.4,fps=20,N=Math.round(L*fps);
 for(let i=0;i<N;i++){await p.evaluate(t=>{document.querySelectorAll('.x2p-ls .x2p-ls-td *').forEach(x=>x.getAnimations().forEach(a=>{a.pause();a.currentTime=t}));
   const bu=document.querySelector('.x2p-ls-wb');if(bu){bu.getAnimations({subtree:true}).forEach(a=>{a.pause();a.currentTime=t})}},i*1000/fps);
  await e.screenshot({path:`${dir}/${String(i).padStart(4,'0')}.png`})}
 console.log(m,N);await p.close()}}
await b.close()})();
