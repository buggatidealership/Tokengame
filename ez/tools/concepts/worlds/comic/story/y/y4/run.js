// node run.js shots <out dir> [takes t0,..,t5]      the #1 card at 390 wide, DPR 3, one take after another on one page
// node run.js check [widths 320,390,1280]            sideways scroll and console errors per take
// node run.js perf <take>                            main-thread cost while the section sits still, 4x slower CPU, 6 s
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');const URL='http://localhost:8924/'+(process.env.PAGE||'v47-live-x3plus.html');
const MODE=process.argv[2];
async function open(b,W,dpr){const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:dpr});await FONTS(p);const er=[];
  p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('console: '+m.text())});
  await p.goto(URL,{waitUntil:'load'});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  await p.evaluate(()=>document.querySelector('.wc-chars').scrollIntoView());await p.waitForFunction(()=>document.fonts.status==='loaded');
  await p.waitForFunction(()=>[...document.querySelectorAll('.wc-ch')].every(c=>c.classList.contains('wc-in')),null,{timeout:20000}).catch(()=>{});
  await p.waitForTimeout(2500);/* the P&L count-up settles */
  await p.addStyleTag({content:rd('y4.css')});await p.addScriptTag({content:rd('y4.js')});return {p,er}}
async function take(p,t){await p.evaluate(t=>{document.documentElement.classList.remove('y4-ready');window.__y4(t)},t);await p.waitForFunction(()=>document.documentElement.classList.contains('y4-ready'));await p.waitForTimeout(300)}
(async()=>{const b=await chromium.launch();
 if(MODE==='shots'){const OUT=process.argv[3],TS=(process.argv[4]||'t0,t1,t2,t3,t4,t5').split(',');fs.mkdirSync(OUT,{recursive:true});
  const {p,er}=await open(b,390,3);
  await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden';[...document.body.querySelectorAll('*')].forEach(x=>{if(getComputedStyle(x).position==='fixed'&&x.offsetHeight<140)x.style.visibility='hidden'})});
  for(const t of TS){await take(p,t);
    await p.evaluate(()=>{const c=document.querySelector('.wc-ch-1');scrollTo(0,c.getBoundingClientRect().top+scrollY-120)});await p.waitForTimeout(250);
    const bb=await p.evaluate(()=>{const r=document.querySelector('.wc-ch-1').getBoundingClientRect();return {x:r.left,y:r.top,w:r.width,h:r.height}});
    await p.screenshot({path:`${OUT}/${t}.png`,clip:{x:0,y:bb.y-9,width:390,height:bb.h+19}});
    console.log(t,'sw',await p.evaluate(()=>document.documentElement.scrollWidth),er.join('|')||'ok')}
  await p.close()}
 if(MODE==='check'){const WS=(process.argv[3]||'320,390,1280').split(',').map(Number);
  for(const W of WS){const {p,er}=await open(b,W,1);const out=[];
    for(const t of ['t0','t1','t2','t3','t4','t5']){await take(p,t);out.push(t+':'+await p.evaluate(()=>document.documentElement.scrollWidth))}
    console.log(W,out.join(' '),er.join('|')||'no errors');await p.close()}}
 if(MODE==='perf'){const t=process.argv[3]||'t0';const {p,er}=await open(b,390,3);await take(p,t);
  await p.evaluate(()=>{const c=document.querySelector('.wc-chars');scrollTo(0,c.getBoundingClientRect().top+scrollY-10)});await p.waitForTimeout(1500);
  const cdp=await p.context().newCDPSession(p);await cdp.send('Performance.enable');await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});await new Promise(r=>setTimeout(r,1500));
  const g=async()=>Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(m=>[m.name,m.value]));const a=await g();await new Promise(r=>setTimeout(r,6000));const z=await g();
  const k=['TaskDuration','ScriptDuration','LayoutDuration','RecalcStyleDuration'];console.log(t,k.map(n=>n.replace('Duration','')+' '+(z[n]-a[n]).toFixed(3)).join('  '),er.join('|')||'ok');await p.close()}
 await b.close()})();
