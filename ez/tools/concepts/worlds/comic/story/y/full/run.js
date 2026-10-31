// node run.js <out dir> <modes now,full> [widths 390,1280,320] [dpr 2]: the whole X3+ Overview, today or as one comic book (round FULL). Port 8930.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],MS=(process.argv[3]||'now,full').split(','),WS=(process.argv[4]||'390').split(',').map(Number),DPR=+(process.argv[5]||2);
if(OUT)fs.mkdirSync(OUT,{recursive:true});const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
async function open(b,W,mode,o={}){const H=o.h||(W<600?844:1000);const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:o.dpr||DPR,reducedMotion:o.rm?'reduce':'no-preference'});await FONTS(p);const er=[];
  p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push(m.text())});
  await p.goto('http://localhost:8930/v47-live-x3plus.html',{waitUntil:'load'});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
  const HH=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<HH;y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(50)}
  await p.waitForFunction(()=>document.documentElement.classList.contains('p1-ready')&&document.querySelector('.pp1-c.fb-on'),null,{timeout:60000});
  if(mode!=='now'){for(const f of ['base/_cv.css','base/c2.css','book.css'])await p.addStyleTag({content:rd(f)});
    for(const f of ['base/_cv.js','base/c2.js'])await p.addScriptTag({content:rd(f)});
    await p.waitForFunction(()=>document.documentElement.classList.contains('c2-ready'),null,{timeout:30000});
    await p.addScriptTag({content:rd('dtlib.js')});await p.addScriptTag({content:rd('book.js')});
    await p.waitForFunction(()=>document.documentElement.classList.contains('cb-ready'),null,{timeout:60000})}
  await p.evaluate(()=>document.fonts.ready);
  const H2=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H2;y+=600){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(40)}
  await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(o.wait||1500);return {p,er}}
/* hard-rule checks on the built book */
async function checks(p){return p.evaluate(()=>{const R=e=>{const b=e.getBoundingClientRect();return {x:b.left+scrollX,y:b.top+scrollY,w:b.width,h:b.height}};
  const ix=(a,b)=>Math.max(0,Math.min(a.x+a.w,b.x+b.w)-Math.max(a.x,b.x))*Math.max(0,Math.min(a.y+a.h,b.y+b.h)-Math.max(a.y,b.y));
  const vis=e=>{const s=getComputedStyle(e);return s.display!=='none'&&s.visibility!=='hidden'&&e.getClientRects().length};
  const prot=[...document.querySelectorAll('#wc-book .wc-film-slot video,#wc-book .x2p-vt,#wc-book img,#wc-book .fb-port,#wc-book .pp-coin,#wc-book .wc-face')].filter(vis).map(e=>({e,r:R(e)})).filter(q=>q.r.w>4&&q.r.h>4);
  const brk=[...document.querySelectorAll('.cb-brk')].filter(vis);const hits=[];
  for(const b of brk){const rb=R(b);for(const q of prot){if(b.contains(q.e)||q.e.contains(b))continue;const a=ix(rb,q.r);if(a>Math.min(q.r.w*q.r.h,rb.w*rb.h)*.04)hits.push((b.className.baseVal??b.className).slice(0,30)+' x '+(q.e.className.baseVal??q.e.className||q.e.tagName).toString().slice(0,30)+' '+Math.round(a))}}
  let small=0;const ex=[];document.querySelectorAll('#wc-book *').forEach(e=>{if(!vis(e)||e.closest('[aria-hidden="true"]')&&!e.closest('.cb-read'))return;const t=[...e.childNodes].filter(n=>n.nodeType===3&&n.textContent.trim()).length;if(!t)return;const fs=parseFloat(getComputedStyle(e).fontSize);if(fs<10.5&&!e.closest('.pp-sr,.cb-sr,.x2p-vt')){small++;if(ex.length<6)ex.push(e.className+' '+fs)}});
  const over=[];document.querySelectorAll('#wc-book *').forEach(e=>{const b=e.getBoundingClientRect();if(b.width&&(b.right>innerWidth+.5||b.left<-.5)&&vis(e)&&!e.closest('.wc-bis[data-all="0"] .wc-bi:nth-child(n+13)'))over.push(String(e.className.baseVal??e.className).slice(0,26)+' '+Math.round(b.left)+'..'+Math.round(b.right))});
  return {sw:document.documentElement.scrollWidth,iw:innerWidth,H:document.documentElement.scrollHeight,hits:hits.slice(0,12),nhits:hits.length,small,smallEx:ex,over:over.slice(0,8),nover:over.length,
    emoji:/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(document.getElementById('wc-book').innerText)}})}
module.exports={open,checks};
if(require.main===module)(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const R=[];
 for(const W of WS)for(const m of MS){const {p,er}=await open(b,W,m);
  await p.evaluate(()=>{document.querySelectorAll('body *').forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed')x.style.visibility='hidden'})});
  await p.screenshot({path:`${OUT}/${m}-${W}.png`,fullPage:true});
  const c=await checks(p);R.push({m,W,...c,err:er.slice(0,8)});console.log(JSON.stringify(R[R.length-1]));await p.close()}
 fs.writeFileSync(OUT+'/checks.json',JSON.stringify(R,null,1));await b.close()})();
