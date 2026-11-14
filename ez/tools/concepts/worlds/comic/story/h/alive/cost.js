// Cost of each alive effect on a 4x slower CPU (CDP Emulation.setCPUThrottlingRate), 390x844, DPR 2.
// For every effect: the page without it ("base") and with it ("fx"), each measured with the target on screen
// and with it two screens away, 3 s windows: frames per second (rAF count) and main-thread time
// (Performance.getMetrics TaskDuration). One-shots are fired at the start of the "on" window.
// node cost.js <runs> <out.json> [ids]
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fonts=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
const fs=require('fs');const CFG=require('./cfg.js');
const RUNS=+(process.argv[2]||3),OUT=process.argv[3]||'cost.json';const IDS=(process.argv[4]||Object.keys(CFG).join(',')).split(',');
const WIN=3000;
async function open(b,hash){const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});await fonts(p);
 await p.goto('http://localhost:8897/v47-live-x3plus.html'+(hash||''),{waitUntil:'load'});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});await p.waitForTimeout(2500);
 const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=700){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(200)}
 const cdp=await p.context().newCDPSession(p);await cdp.send('Performance.enable');return {p,cdp}}
const td=m=>m.metrics.find(x=>x.name==='TaskDuration').value;
async function measure({p,cdp},during){const a=await cdp.send('Performance.getMetrics');
 const fpsP=p.evaluate(W=>new Promise(r=>{let n=0,long=0,last=performance.now();const t0=last;function f(t){n++;if(t-last>50)long++;last=t;if(t-t0<W)requestAnimationFrame(f);else r({fps:n/((t-t0)/1000),long})}requestAnimationFrame(f)}),WIN);
 if(during)await during();const r=await fpsP;const b=await cdp.send('Performance.getMetrics');return {fps:+r.fps.toFixed(1),long:r.long,main:+(td(b)-td(a)).toFixed(3)}}
async function pos(p,c){return p.evaluate(s=>{const e=s[0]==='='?eval(s.slice(1)):document.querySelector(s);const r=e.getBoundingClientRect();const y=r.top+scrollY+r.height/2;
 const on=Math.max(0,Math.round(y-422));const H=document.documentElement.scrollHeight;const off=y>H/2?0:H-844;return {on,off}},c.center)}
async function go(p,y){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(700)}
(async()=>{const b=await chromium.launch();const res={};
 for(let run=0;run<RUNS;run++){
  for(const hash of ['','#/leaderboard']){const ids=IDS.filter(k=>(CFG[k].hash||'')===hash);if(!ids.length)continue;
   // base: the page as it is, same positions, same clicks
   const B=await open(b,hash);await B.cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
   for(const id of ids){const c=CFG[id],P=await pos(B.p,c);res[id]=res[id]||{base:{on:[],off:[]},fx:{on:[],off:[]}};
    await go(B.p,P.off);res[id].base.off.push(await measure(B));
    await go(B.p,P.on);res[id].base.on.push(await measure(B,c.act?async()=>{for(const a of c.act){await B.p.evaluate(a.js);await B.p.waitForTimeout(1200)}}:null))}
   await B.p.close();
   for(const id of ids){const c=CFG[id];const F=await open(b,hash);const P=await pos(F.p,c);
    await go(F.p,P.off);await F.p.addStyleTag({path:__dirname+'/alive.css'});await F.p.addScriptTag({path:__dirname+'/alive.js'});
    if(c.pre)await F.p.evaluate(c.pre);await F.p.evaluate(id=>{window.__alManual=true;window.__alInit([id])},id);
    await F.cdp.send('Emulation.setCPUThrottlingRate',{rate:4});await F.p.waitForTimeout(500);
    res[id].fx.off.push(await measure(F));
    await go(F.p,P.on);
    res[id].fx.on.push(await measure(F,async()=>{await F.p.evaluate(()=>window.__alGo());if(c.act)for(const a of c.act){await F.p.evaluate(a.js);await F.p.waitForTimeout(1200)}}));
    console.log(run,id,JSON.stringify(res[id].fx.on.at(-1)),JSON.stringify(res[id].base.on.at(-1)),'off',JSON.stringify(res[id].fx.off.at(-1)),JSON.stringify(res[id].base.off.at(-1)));
    await F.p.close()}}
  fs.writeFileSync(OUT,JSON.stringify(res,null,1))}
 await b.close()})();
