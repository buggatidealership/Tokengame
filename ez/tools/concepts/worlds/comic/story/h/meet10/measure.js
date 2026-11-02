// node measure.js W : cap heights (measured on canvas with the page's own fonts) of the line, W-L, the W-L label and B's season line; with reduced motion on
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const W=+process.argv[2];for(const st of ['s1','s2']){const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:844},reducedMotion:'reduce'});await FONTS(p);
 const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('http://localhost:8963/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('section.c8 .c8-one'),null,{timeout:120000});
 await p.addStyleTag({content:rd('_m10.css')});await p.evaluate(s=>{window.__M10S=s;window.__M10P='b'},st);await p.addScriptTag({content:rd('_m10.js')});
 await p.waitForFunction(()=>document.documentElement.classList.contains('m10-ready'));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1200);await p.evaluate(()=>window.__m10.layout());await p.waitForTimeout(300);
 const r=await p.evaluate(()=>{const c=document.createElement('canvas').getContext('2d');const cap=(f,s)=>{c.font=`${s}px ${f}`;return c.measureText('H').actualBoundingBoxAscent};
   const o=document.querySelector('.c8-one'),wl=o.querySelector('.m10-wl text'),lab=o.querySelector('.m10-labwl'),se=o.querySelector('.m10-labse'),seb=se.querySelector('b');
   const sc=t=>t.getBoundingClientRect().height/t.ownerSVGElement.viewBox.baseVal.height;
   return {line:window.__m10.fit[o.dataset.m].cap,wl:+(cap('Anton',+wl.getAttribute('font-size'))*sc(wl)).toFixed(2),
     wlLabel:+cap("'Barlow Condensed'",parseFloat(getComputedStyle(lab).fontSize)).toFixed(2),seLabel:+cap("'Barlow Condensed'",parseFloat(getComputedStyle(se).fontSize)).toFixed(2),
     seFig:+cap('Anton',parseFloat(getComputedStyle(seb).fontSize)).toFixed(2),painted7d:'29/1800 of the chip',
     still:document.querySelectorAll('.m10-tp.m10-ok,.m10-tp.m10-no').length,sw:document.documentElement.scrollWidth}});
 console.log(W,st,JSON.stringify(r),errs);await b.close()}})();
