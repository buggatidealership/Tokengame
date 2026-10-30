// node probe.js <out dir> [widths]: shoots today's "One round, start to finish" section and prints its data
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');
const OUT=process.argv[2],WS=(process.argv[3]||'390,1280').split(',').map(Number);
(async()=>{const b=await chromium.launch();
 for(const W of WS){const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:W<600?2:1});await FONTS(p);
  await p.goto('http://localhost:8914/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  const y=await p.evaluate(()=>{const s=document.querySelector('#wc-book .wc-lr');s.scrollIntoView();return s.getBoundingClientRect().top+scrollY});
  for(let i=0;i<8;i++){await p.evaluate(d=>scrollBy(0,d),300);await p.waitForTimeout(300)}
  await p.waitForTimeout(3500);await p.addStyleTag({content:'.x2p-cw{display:none!important}'});await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden';[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<140&&x.offsetHeight>0)x.style.visibility='hidden'})});
  const bb=await p.evaluate(()=>{const s=document.querySelector('#wc-book .wc-lr');const r=s.getBoundingClientRect();return {y:r.top+scrollY,h:r.height}});
  await p.screenshot({path:`${OUT}/now-${W}.png`,clip:{x:0,y:bb.y,width:W,height:bb.h},fullPage:true});console.log(W,bb)}
 await b.close()})();
