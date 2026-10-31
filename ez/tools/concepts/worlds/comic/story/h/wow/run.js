// node run.js <outdir> <ideas vault,exch,window,depth,pose,sound> [widths 390,1280]   (serve ez/ on PORT, default 8971)
// Opens the real X3+ page, mounts each wow scene (wow.js) after the cover, shoots every state as <idea>-<state>-<W>.png.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');const fs=require('fs');
const PORT=process.env.PORT||8971;const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
const FL='https://fonts.googleapis.com/css2?family=Rye&family=Special+Elite&family=Archivo:wght@900&display=block';
const ny=(s)=>Date.parse(s); // ISO with offset
const open=async(b,W,H)=>{const ctx=await b.newContext({viewport:{width:W,height:H||(W<600?844:800)},deviceScaleFactor:W>1000?1:2});const p=await ctx.newPage();await FONTS(p);const er=[];
  p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push(m.text())});
  await p.goto(`http://localhost:${PORT}/v47-live-x3plus.html?${Date.now()}#/`,{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>window.__x2pPnl&&document.querySelector('.pp1-c[data-m] .fb-port')&&document.documentElement.classList.contains('p1-on'),null,{timeout:120000});
  await p.waitForTimeout(1500);await p.addStyleTag({url:FL});await p.addStyleTag({content:rd('wow.css')});await p.addScriptTag({content:rd('wow.js')});
  await p.evaluate(()=>{document.querySelectorAll('video').forEach(v=>{try{v.pause()}catch(e){}});document.querySelectorAll('body *').forEach(e=>{const c=getComputedStyle(e);if(c.position==='fixed'&&!e.closest('.ww'))e.style.setProperty('visibility','hidden','important');if(c.position==='sticky')e.style.setProperty('position','static','important')});
    const h=document.createElement('div');h.id='wwhost';const cv=document.querySelector('section.wc-cover');cv.after(h)});
  await p.evaluate(()=>document.fonts.ready);return {ctx,p,er}};
const waitImgs=p=>p.waitForFunction(()=>[...document.querySelectorAll('#wwhost img')].every(i=>i.complete),null,{timeout:30000}).catch(()=>{});
const shotEl=async(p,sel,path)=>{await waitImgs(p);await p.waitForTimeout(700);const e=await p.$(sel);await e.scrollIntoViewIfNeeded();await p.waitForTimeout(300);await e.screenshot({path})};
module.exports={open,waitImgs,shotEl,ny};
const SH={
 vault:[['now',{}],['r10',{at:9}],['r40',{at:39}]],
 exch:[['tue1012',{t:'2026-11-03T10:12:20-05:00'}],['tue1600',{t:'2026-11-03T16:00:04-05:00',ring:1}],['tue2140',{t:'2026-11-03T21:40:00-05:00'}],['now',{}]],
 window:[['open',{}],['called',{demo:'called'}],['result',{demo:'result'}]],
 depth:[['p0',{p:0}],['p5',{p:.5}],['p1',{p:1,t:.8}]],
 sound:[['off',{t:'2026-11-03T16:00:04-05:00'}],['on',{t:'2026-11-03T16:00:04-05:00',on:1}]],
};
if(require.main===module)(async()=>{const OUT=process.argv[2],IDS=process.argv[3].split(','),WS=(process.argv[4]||'390').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
 const b=await chromium.launch();
 for(const W of WS){const {ctx,p,er}=await open(b,W);
  for(const id of IDS){
   if(id==='pose'){const sec='section.wc-chars';for(const rn of [77,78,79,80]){const r=await p.evaluate(n=>WW.pose.apply(n),rn);await p.waitForTimeout(rn===77?5000:1300);await waitImgs(p);
      await p.waitForFunction(()=>[...document.querySelectorAll('.ww-pose')].every(x=>getComputedStyle(x).opacity==='1'),null,{timeout:8000}).catch(()=>{});
      for(const c of await p.$$(".pp1-c[data-m]")){await c.scrollIntoViewIfNeeded();await p.waitForTimeout(1600)}const e=await p.$(sec);await e.scrollIntoViewIfNeeded();await p.waitForTimeout(400);await e.screenshot({path:`${OUT}/pose-r${rn}-${W}.png`});console.log('pose',rn,W,JSON.stringify(r))}continue}
   for(const [st,o] of SH[id]){
    const wide=W>1000&&(id==='exch'||id==='sound');
    const res=await p.evaluate(([id,o,wide])=>{const h=document.getElementById('wwhost');h.innerHTML='';window.WW_NOW=o.t?Date.parse(o.t):null;window.WW_SPEED=1;try{localStorage.removeItem('ez-wow-call')}catch(e){}
      let demo=null;if(o.demo==='called'){const nx=(window.UPCOMING||[])[0];demo={n:nx.n,co:nx.co,ticker:nx.ticker,dir:'up'}}if(o.demo==='result'){const r=ROUNDS.slice(-1)[0];demo={n:r.n,co:r.co,ticker:r.ticker,dir:'up'}}
      const m=id==='window'?WW.window.mount(h,{demo}):id==='vault'?WW.vault.mount(h,{at:o.at,still:1}):id==='depth'?WW.depth.mount(h):id==='sound'?WW.sound.mount(h,{wide}):WW.exch.mount(h,{wide});
      if(id==='depth')WW.depth.set(o.p,o.t||0);if(o.on)WW.sound.set(true);if(o.ring)WW.exch.ring(60000);
      return JSON.stringify(WW[id]&&WW[id].check||{})},[id,o,wide]);
    await shotEl(p,'#wwhost .ww',`${OUT}/${id}-${st}-${W}.png`);
    const sw=await p.evaluate(()=>document.documentElement.scrollWidth);console.log(id,st,W,res,'sw',sw)}}
  console.log('errors',W,er.slice(0,4).join(' | ')||'none');await ctx.close()}
 await b.close()})();
