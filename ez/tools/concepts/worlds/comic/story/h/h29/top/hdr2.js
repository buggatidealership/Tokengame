const {chromium}=require('playwright');const FONTS=require('../../../../../../live-r1/_fonts.js');const fs=require('fs');const path=require('path');const rd=f=>fs.readFileSync(path.join(__dirname,f),'utf8');
(async()=>{const b=await chromium.launch();for(const ov of [0,1])for(const w of [320,360,390]){const p=await b.newPage({viewport:{width:w,height:844}});await FONTS(p);
await p.goto('http://127.0.0.1:8947/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&window.__t4,null,{timeout:120000});
if(ov){await p.addStyleTag({content:rd('../_gutter.css')+rd('top.css')});await p.addScriptTag({content:rd('top.js')});await p.waitForFunction(()=>window.__h29t,null,{timeout:20000});}
await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(800);
console.log(ov?'h29':'now',w,await p.evaluate(()=>['.brand','.brand b','#liveChip','.h29t-next','.x2p-xhd','header nav'].map(s=>{const e=document.querySelector(s);if(!e)return s+':-';const r=e.getBoundingClientRect(),c=getComputedStyle(e);return s+':'+(c.display==='none'?'none':Math.round(r.left)+'-'+Math.round(r.right)+'@'+Math.round(r.top)+(c.visibility!=='visible'?' '+c.visibility:''))}).join(' | ')+' hdrH '+Math.round(document.querySelector('header').getBoundingClientRect().height)));await p.close()}await b.close()})();
