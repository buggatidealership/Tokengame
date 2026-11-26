// node run.js <out> <takes a,b,..> [widths 390,1280]   (serves nothing: needs ez/ on PORT, default 8961)
// Shoots the Overview's Smart or lucky section per take and width (hd-<t>-<W>[-pnl].png); MODE=pnl WIN=d7 for another state.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'a').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');const LIB=()=>rd('../pnl/_lib.js')+rd('../pnl2/_g.js')+rd('_hd.js');const PORT=process.env.PORT||8961;
const MODE=process.env.MODE||'hit',WIN=process.env.WIN||'season';
module.exports.prep=async(p,t,still)=>{await p.waitForFunction(()=>document.querySelector('.wc-splash .wc10-ch')&&window.__x2pPnl&&document.querySelector('#wc-pfv-pnl .wc-pf-r'),null,{timeout:120000});
 await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(1200);
 await p.addStyleTag({url:'https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&family=Special+Elite&family=Share+Tech+Mono&family=Cutive+Mono&display=block'}).catch(()=>{});
 await p.evaluate(async()=>{for(const f of ['8px "Press Start 2P"','20px VT323','20px "Special Elite"','20px "Share Tech Mono"','20px "Cutive Mono"'])await document.fonts.load(f)});
 await p.evaluate(()=>{const s=document.querySelector('.wc-splash');s.classList.remove('wc-offs');s.scrollIntoView()});
 await p.evaluate(a=>{if(a.still)window.PN_STILL=true;window.HD_MODE=a.m;window.HD_WIN=a.w},{still,m:MODE,w:WIN});
 await p.addStyleTag({content:rd('_hd.css')+rd(t+'.css')});await p.addScriptTag({content:LIB()+rd(t+'.js')+';HD.mount()'});
 await p.waitForFunction(()=>[...document.images].filter(i=>i.closest('.hd')).every(i=>i.complete),null,{timeout:30000}).catch(()=>{});await p.waitForTimeout(1200)};
if(require.main===module)(async()=>{const b=await chromium.launch();
for(const W of WS)for(const t of TS){
 const ctx=await b.newContext({viewport:{width:W,height:W<600?844:800},deviceScaleFactor:W>1000?1:2});const p=await ctx.newPage();await FONTS(p);const er=[];
 p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if((m.type()==='error'||m.type()==='warning')&&!/Failed to load resource|willReadFrequently/.test(m.text()))er.push(m.text())});
 await p.goto(`http://localhost:${PORT}/v47-live-x3plus.html?${Date.now()}#/`,{waitUntil:'load',timeout:150000});
 await module.exports.prep(p,t,true);
 await p.evaluate(()=>{document.querySelectorAll('video').forEach(v=>{try{v.pause()}catch(e){}});document.querySelectorAll('body *').forEach(e=>{const c=getComputedStyle(e);if(c.position==='fixed')e.style.setProperty('visibility','hidden','important');if(c.position==='sticky')e.style.setProperty('position','static','important')})});
 const r=await p.evaluate(()=>{const e=document.querySelector('.hd');e.scrollIntoView();const k=e.getBoundingClientRect();return {y:k.top+scrollY,h:k.height,sw:document.documentElement.scrollWidth,sr:document.querySelector('div.hd-sr').textContent}});
 await p.waitForTimeout(600);
 const f=`${OUT}/hd-${t}-${W}${MODE!=='hit'?'-'+MODE+'-'+WIN:''}.png`;await p.screenshot({path:f,fullPage:true,clip:{x:0,y:r.y,width:W,height:r.h}});console.log(f,JSON.stringify({h:Math.round(r.h),sw:r.sw,sr:r.sr}),er.slice(0,3).join('|')||'ok');await ctx.close()}
await b.close()})();
