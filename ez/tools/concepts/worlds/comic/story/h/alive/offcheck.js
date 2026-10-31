// Direct proof that an effect costs nothing off screen: with all fourteen on, scroll each target two screens
// away and count this layer's live animations (names al-*) and playing videos; then bring it on screen and count
// again. Also counts them with reduced motion. node offcheck.js
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fonts=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
const CFG=require('./cfg.js');
(async()=>{const b=await chromium.launch();const out={};
 for(const rm of [false,true])for(const hash of ['','#/leaderboard']){
  const p=await b.newPage({viewport:{width:390,height:844},reducedMotion:rm?'reduce':'no-preference'});await fonts(p);
  await p.goto('http://localhost:8897/v47-live-x3plus.html'+hash,{waitUntil:'load'});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});await p.waitForTimeout(2000);
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=700){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(200)}
  await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(500);
  await p.addStyleTag({path:__dirname+'/alive.css'});await p.addScriptTag({path:__dirname+'/alive.js'});
  const ids=Object.keys(CFG).filter(k=>(CFG[k].hash||'')===hash);
  await p.evaluate(ids=>{window.__alForceChase=true;window.__alInit(ids)},ids);
  const count=()=>p.evaluate(()=>{const a=document.getAnimations().filter(x=>x.playState==='running'&&/^al-/.test(x.animationName||''));
   const v=[...document.querySelectorAll('video.al-cine')].filter(v=>!v.paused).length;const by={};a.forEach(x=>by[x.animationName]=(by[x.animationName]||0)+1);return {anims:a.length,videos:v,by}});
  for(const id of ids){const c=CFG[id];
   const P=await p.evaluate(s=>{const e=s[0]==='='?eval(s.slice(1)):document.querySelector(s);const r=e.getBoundingClientRect();const y=r.top+scrollY+r.height/2;const H=document.documentElement.scrollHeight;return {on:Math.max(0,Math.round(y-422)),off:y>H/2?0:H-844}},c.center);
   await p.evaluate(y=>scrollTo(0,y),P.off);await p.waitForTimeout(900);const off=await count();
   await p.evaluate(y=>scrollTo(0,y),P.on);await p.waitForTimeout(1500);const on=await count();
   (out[id]=out[id]||{})[rm?'reduced':'normal']={off,on};console.log(rm?'RM':'  ',id,'off',JSON.stringify(off),'on',JSON.stringify(on))}
  await p.close()}
 require('fs').writeFileSync(__dirname+'/offcheck.json',JSON.stringify(out,null,1));await b.close()})();
