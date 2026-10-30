// node run.js <out dir> <takes e.g. now,f1,f2,f3> [widths 390,320,1280]
// Lays helper c's C4 (the line race) and take <t>.css/<t>.js (plus the shared _sf.*) over the built X3+ Leaderboard tab
// and shoots the whole tab. SEEN='{"t":..,"ns":[..]}' fakes a stored visit; SEEN=upto:<m/d/yy> stores every round graded by that day.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390,320,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(f,'utf8'),C=__dirname+'/../c/',F=__dirname+'/',ex=f=>fs.existsSync(f);
async function lay(p,t){await p.addScriptTag({content:rd(C+'_c.js')});await p.addStyleTag({content:rd(C+'_c.css')+rd(C+'c4.css')});await p.addScriptTag({content:rd(C+'c4.js')});
  await p.addScriptTag({content:rd(F+'../../brand/_pal.js')});await p.addScriptTag({content:rd(F+'_sf.js')});await p.addStyleTag({content:rd(F+'_sf.css')+(ex(F+t+'.css')?rd(F+t+'.css'):'')});await p.addScriptTag({content:rd(F+t+'.js')})}
module.exports={lay};
if(require.main===module)(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:2,reducedMotion:process.env.RM?'reduce':'no-preference'});await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('console:'+m.text().slice(0,120))});
  await p.goto('http://localhost:8897/v47-live-x3plus.html#/leaderboard',{waitUntil:'load'});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  if(process.env.SEEN)await p.evaluate(s=>{if(s.startsWith('upto:')){const k=x=>{const [m,d,y]=x.split('/').map(Number);return (y%100)*1e4+m*100+d},K=k(s.slice(5).split('@')[0]);window.__sfSeen={t:Date.now()-(+(s.split('@')[1]||72))*36e5,ns:ROUNDS.filter(r=>k(r.resolves)<=K).map(r=>r.n)}}else window.__sfSeen=JSON.parse(s)},process.env.SEEN.split('@')[0]+(process.env.SEEN.includes('@')?'@'+process.env.SEEN.split('@')[1]:''));
  if(t!=='now'){await p.evaluate(()=>window.__kfShot=true);await lay(p,t);
    try{await p.waitForFunction(t=>document.documentElement.classList.contains('sf-ready-'+t),t,{timeout:8000})}catch(e){console.log('NOT READY',t,er.join('|'));await p.close();continue}}
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=400){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(60)}
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(1500);
  await p.evaluate(()=>{scrollTo(0,0);const h=document.querySelector('header.top');if(h)h.style.visibility='hidden';[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<120&&x.offsetHeight>0)x.style.setProperty('display','none','important')})});
  await p.waitForTimeout(300);
  const bb=await p.evaluate(()=>{const r=document.getElementById('wc-lb').getBoundingClientRect();return {y:r.top+scrollY,h:r.height}});
  await p.screenshot({path:`${OUT}/${W}-${t}${process.env.TAG||''}.png`,clip:{x:0,y:bb.y,width:W,height:Math.min(bb.h,9000)},fullPage:true});
  const chk=await p.evaluate(()=>{const iw=innerWidth;return {sw:document.documentElement.scrollWidth,iw,
    ov:[...document.querySelectorAll('#wc-lb [class*="sf"], #wc-lb [class*="sc4"]')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&(r.right>iw+.5||r.left<-.5)}).map(e=>String(e.className.baseVal||e.className).slice(0,40)).slice(0,6),
    clip:[...document.querySelectorAll('#wc-lb [class*="sf"]')].filter(e=>e.children.length===0&&e.scrollWidth>e.clientWidth+1&&getComputedStyle(e).overflow!=='visible').map(e=>e.className).slice(0,6)}});
  console.log(W,t,JSON.stringify(chk),er.join('|')||'ok');await p.close()}
 await b.close()})();
