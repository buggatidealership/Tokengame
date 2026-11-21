// node close.js : 3x close-ups at 390 for the boards (out/close/a.png b.png: GPT and Kimi chips, A vs B; s1.png s2.png: the strip beside two chips, mid-landing)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
fs.mkdirSync(__dirname+'/out/close',{recursive:true});
async function shot(st,pn,fn,t){const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:3});await FONTS(p);
 await p.goto('http://localhost:8963/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('section.c8 .c8-one'),null,{timeout:120000});
 await p.addStyleTag({content:'header.top,body>[class^="x2p-cw"],body>div:has(>.x2p-cw-bug){visibility:hidden!important}'+rd('_m10.css')});
 await p.evaluate(([s,pn,t])=>{window.__M10S=s;window.__M10P=pn;window.__M10T=t},[st,pn,t]);await p.addScriptTag({content:rd('_m10.js')});
 await p.waitForFunction(()=>document.documentElement.classList.contains('m10-ready'));await p.evaluate(()=>document.fonts.ready);
 await p.evaluate(()=>{const s=document.querySelector('.c8-four');scrollTo(0,s.getBoundingClientRect().top+scrollY-40)});await p.waitForTimeout(1500);
 await p.evaluate(t=>{window.__m10.layout();if(t<0){let b=-1,bt=0;for(let u=0;u<60000;u+=100){const s=window.__m10.state(u),sc=(s[0].land>.6?2:0)+(s[1].land>.6?2:0)+(s[0].v!==s[1].v?1:0);if(sc>b){b=sc;bt=u}}t=bt;window.__M10T=t}window.__m10.render(t)},t);await p.waitForTimeout(300);
 const box=await p.evaluate(fn);await p.screenshot({path:__dirname+'/out/close/'+(pn==='x'?st:pn)+'.png',clip:box,fullPage:true});await b.close()}
(async()=>{
 const chips=()=>{const o=[...document.querySelectorAll('.c8-one .c7-pic')],a=o[2].getBoundingClientRect(),z=o[3].getBoundingClientRect();return {x:a.left-4,y:a.top+scrollY-14,width:a.width+8,height:z.bottom-a.top+28}};
 const strip=()=>{const sp=document.querySelector('.m10-sp').getBoundingClientRect(),o=[...document.querySelectorAll('.c8-one .c7-pic')],a=o[0].getBoundingClientRect(),z=o[1].getBoundingClientRect();return {x:0,y:a.top+scrollY-10,width:a.left+a.width+4,height:z.bottom-a.top+20}};
 if(!process.env.STRIPS){await shot('s2','a',chips,4000);await shot('s2','b',chips,4000)}
 const T=+(process.env.T||-1);await shot('s1','x',strip,T);await shot('s2','x',strip,T);console.log('ok')})();
