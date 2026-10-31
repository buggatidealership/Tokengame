// node rec.js <tmp dir>: records the grading beat at 390 (scroll to "One round", let the bell ring and the stamps land)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2];fs.mkdirSync(OUT,{recursive:true});const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:700},deviceScaleFactor:1,recordVideo:{dir:OUT,size:{width:390,height:700}}});
 const t00=Date.now();const p=await ctx.newPage();await FONTS(p);
 await p.goto('http://localhost:8916/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 await p.addStyleTag({content:rd('z1.css')+'.x2p-cw{display:none!important}'});await p.addScriptTag({content:rd('z1.js')});
 await p.waitForFunction(()=>document.documentElement.classList.contains('z1-ready'));await p.waitForFunction(()=>document.fonts.status==='loaded');
 await p.evaluate(()=>{const e=document.querySelector('.z1-fp0');scrollTo(0,e.getBoundingClientRect().top+scrollY-420)});await p.waitForTimeout(1500);
 const y0=await p.evaluate(()=>scrollY),y1=await p.evaluate(()=>{const e=document.querySelector('.z1-fp3');return e.getBoundingClientRect().top+scrollY-50});
 let k=0;const shot=async()=>{k++;await p.waitForTimeout(40)};
 for(let i=0;i<12;i++)await shot();
 const tS=Date.now();
 for(let i=0;i<=20;i++){await p.evaluate(y=>scrollTo(0,y),y0+(y1-y0)*(1-Math.pow(1-i/20,2)));await shot()}
 const t0=Date.now();while(Date.now()-t0<5500)await shot();
 const y2=await p.evaluate(()=>{const e=document.querySelector('.z1-fp5');return e.getBoundingClientRect().top+scrollY-300});
 for(let i=0;i<=12;i++){await p.evaluate(y=>scrollTo(0,y),y1+(y2-y1)*(i/12));await shot()}
 const t1=Date.now();while(Date.now()-t1<1800)await shot();
 const v=p.video();await ctx.close();console.log('video',await v.path(),'start offset s',(tS-t00)/1000);await b.close()})();
