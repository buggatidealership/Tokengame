// node run.js <out dir> <takes: now,y2> [widths 390,1280] : Meet the models on the built X3+, today or with y2 laid over
// env CARD=1 shoots the first card alone at 390 DPR 3; PERF=1 measures main-thread cost at 4x CPU for 6 s with the section still on screen
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now,y2').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');const PORT=8922;
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const dpr=process.env.CARD?3:2;const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:dpr});await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('console:'+m.text().slice(0,140))});
  await p.goto(`http://localhost:${PORT}/v47-live-x3plus.html`,{waitUntil:'load'});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=600){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(30)}
  if(t!=='now'){await p.addStyleTag({content:rd(t+'.css')});await p.addScriptTag({content:rd(t+'.js')});await p.waitForFunction(()=>document.documentElement.classList.contains('y2-ready'),null,{timeout:30000})}
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(600);
  const sel=process.env.CARD?'.wc-chars article:first-of-type':'.wc-chars';
  await p.evaluate(s=>{const n=document.querySelector(s);scrollTo(0,n.getBoundingClientRect().top+scrollY-30)},sel);await p.waitForTimeout(1600);
  if(process.env.PERF){const c=await p.context().newCDPSession(p);await c.send('Performance.enable');await c.send('Emulation.setCPUThrottlingRate',{rate:4});await p.waitForTimeout(1000);
   const g=async()=>Object.fromEntries((await c.send('Performance.getMetrics')).metrics.map(m=>[m.name,m.value]));const a=await g();await p.waitForTimeout(6000);const z=await g();
   const d=k=>((z[k]-a[k])).toFixed(3);console.log('PERF',W,t,'script',d('ScriptDuration'),'layout',d('LayoutDuration'),'style',d('RecalcStyleDuration'),'task',d('TaskDuration'));await c.send('Emulation.setCPUThrottlingRate',{rate:1})}
  await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden';[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<140&&x.offsetHeight>0)x.style.visibility='hidden'})});
  const bb=await p.evaluate(s=>{const r=document.querySelector(s).getBoundingClientRect();return {x:r.left+scrollX,y:r.top+scrollY,width:r.width,height:r.height}},sel);
  const pad=process.env.CARD?14:10;
  await p.screenshot({path:`${OUT}/${W}-${t}${process.env.CARD?'-card':''}.png`,clip:{x:Math.max(0,bb.x-pad),y:bb.y-pad,width:Math.min(W-Math.max(0,bb.x-pad),bb.width+2*pad),height:Math.min(bb.height+2*pad,6000)},fullPage:true});
  const chk=await p.evaluate(()=>{const o={sw:document.documentElement.scrollWidth};if(window.__y2chk)Object.assign(o,window.__y2chk());return o});
  console.log(W,t,JSON.stringify(chk),er.join('|')||'no errors');await p.close()}
 await b.close()})();
