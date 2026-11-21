// node run.js <out> <takes now,a,b,c> [widths 390,1280,320]   (serve ez/ on PORT, default 8961)
// Shoots the whole Leaderboard tab per take and width (lb-<t>-<W>.png); at phone width also after a switch to
// 24h (d1-<t>-390.png) and a 3x close-up of the bill (z-<t>.png). Logs scrollWidth, overflow and page errors.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number);if(OUT&&require.main===module)fs.mkdirSync(OUT,{recursive:true});
const PORT=process.env.PORT||8961,rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
const FL='https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Special+Elite&family=Bangers&family=Luckiest+Guy&family=Dela+Gothic+One&family=M+PLUS+Rounded+1c:wght@800&display=block';
async function open(b,W,t,z,hash){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:z||(W>1000?1:2)});const p=await ctx.newPage();await FONTS(p);const er=[];
 p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push(m.text())});
 p.on('response',r=>{if(r.status()>=400&&/lbstyle|cast2/.test(r.url()))er.push(r.status()+' '+r.url().replace(/.*\d\//,''))});
 await p.goto(`http://localhost:${PORT}/v47-live-x3plus.html?${Date.now()}${hash||'#/leaderboard'}`,{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>window.SS&&document.querySelector('#wc-lb .wc11n-bout .wc11c-a'),null,{timeout:120000});
 if(t!=='now')await inject(p,t);await p.waitForFunction(()=>[...document.querySelectorAll('img.lbs-pic')].every(i=>i.complete),null,{timeout:30000}).catch(()=>{});await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(1500);return {p,ctx,er}}
async function inject(p,t){await p.addStyleTag({url:FL}).catch(()=>{});await p.addStyleTag({content:rd('base.css')+rd('core.css')+rd(t+'.css')});
 await p.evaluate(t=>{window.LBS_T=t},t);await p.addScriptTag({content:rd('lbs.js')});await p.evaluate(()=>document.fonts.ready)}
const unoff=p=>p.evaluate(()=>{document.querySelectorAll('#wc-lb section').forEach(s=>{s.classList.remove('wc-offs');s.classList.add('wc-in');s.style.contentVisibility='visible'});
  document.querySelectorAll('body *').forEach(e=>{const c=getComputedStyle(e);if(c.position==='fixed'&&e.id!=='lbs-turn')e.style.setProperty('visibility','hidden','important');if(c.position==='sticky')e.style.setProperty('position','static','important')});
  document.querySelectorAll('video').forEach(v=>{try{v.pause()}catch(e){}})});
async function sweep(p){const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=500){await p.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}),y);await p.waitForTimeout(120)}await p.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await p.waitForTimeout(900)}
async function shot(p,W,name){await unoff(p);await sweep(p);
 const r=await p.evaluate(()=>{const L=document.getElementById('wc-lb');const q=L.getBoundingClientRect();
  const ov=[...L.querySelectorAll('*')].filter(e=>{const k=e.getBoundingClientRect();return k.width&&(k.right>innerWidth+.5||k.left<-.5)&&getComputedStyle(e).visibility!=='hidden'&&!e.closest('.lbs-fr,.sr,.ss-sr')}).map(e=>String(e.className&&e.className.baseVal!==undefined?e.className.baseVal:e.className).slice(0,24)).slice(0,5);
  const race=document.querySelector('#wc-lb .wc-race');return {y:q.top+scrollY,h:(race?race.getBoundingClientRect().bottom:q.bottom)-q.top,sw:document.documentElement.scrollWidth,ov}});
 await p.screenshot({path:`${OUT}/${name}.png`,fullPage:true,clip:{x:0,y:Math.max(0,r.y-60),width:W,height:r.h+70}});console.log(name,JSON.stringify({h:Math.round(r.h),sw:r.sw,ov:r.ov}))}
module.exports={open,inject,unoff,sweep};
if(require.main===module)(async()=>{const b=await chromium.launch();
for(const W of WS)for(const t of TS){const {p,ctx,er}=await open(b,W,t);await shot(p,W,`lb-${t}-${W}`);
 if(W<600){await p.evaluate(()=>__wc11Show('d1',false));await p.waitForTimeout(1200);await shot(p,W,`d1-${t}-${W}`);await p.evaluate(()=>__wc11Show('season',false));
  await ctx.close();const o=await open(b,W,t,3);await unoff(o.p);const r=await o.p.evaluate(()=>{const e=document.querySelector('#wc-lb .wc11n-bill');const q=e.getBoundingClientRect();return {x:q.left,y:q.top+scrollY,w:q.width,h:q.height}});
  await o.p.waitForTimeout(800);await o.p.screenshot({path:`${OUT}/z-${t}.png`,fullPage:true,clip:{x:Math.max(0,r.x-4),y:r.y-4,width:Math.min(W,r.w+8),height:Math.min(620,r.h+8)}});await o.ctx.close()}
 else await ctx.close();console.log(W,t,er.slice(0,4).join(' | ')||'ok')}
await b.close()})();
