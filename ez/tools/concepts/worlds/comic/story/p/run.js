// node run.js <out dir> <takes now,p1,...> [widths 390,320,1280] [windows season,d1,d7]
// Lays a take over the built X3+ (port 8931) on #/leaderboard; shoots the scoreboard section in each window
// (switched through the live Who's winning stubs, window.__wc11Show). RM=1 reduced motion. Prints checks.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390,320,1280').split(',').map(Number),WINS=(process.argv[5]||'season,d1,d7').split(',');
const D=__dirname+'/',rd=f=>fs.readFileSync(f,'utf8'),ex=fs.existsSync;
async function open(b,W,t,opt={}){const p=await b.newPage({viewport:{width:W,height:opt.h||(W<600?844:1000)},deviceScaleFactor:opt.dpr||2,reducedMotion:process.env.RM?'reduce':'no-preference'});await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push('console:'+m.text().slice(0,140))});
  await p.goto('http://localhost:8931/v47-live-x3plus.html#/leaderboard',{waitUntil:'load',timeout:120000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur')&&window.__wc11Show,null,{timeout:90000});
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=450){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(40)}
  await p.evaluate(()=>scrollTo(0,0));
  if(t!=='now'){await p.addStyleTag({content:rd(D+'_sp.css')});if(ex(D+t+'.css'))await p.addStyleTag({content:rd(D+t+'.css')});
    await p.addScriptTag({content:rd(D+'_sp.js')});if(ex(D+t+'.js'))await p.addScriptTag({content:rd(D+t+'.js')});
    try{await p.waitForFunction(t=>document.documentElement.classList.contains('sp-ready-'+t),t,{timeout:10000})}catch(e){console.log('NOT READY',t,er.join('|'))}}
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(600);
  return {p,er}}
const chk=p=>p.evaluate(()=>{const iw=innerWidth,q=[...document.querySelectorAll('#wc-lb .wc-sbd *, .sp-dock *')];return {sw:document.documentElement.scrollWidth,iw,
    ov:q.filter(e=>{const r=e.getBoundingClientRect();return r.width&&getComputedStyle(e).visibility!=='hidden'&&!e.closest('.wc9-flg,svg')&&(r.right>iw+.5||r.left<-.5)}).map(e=>String(e.className.baseVal||e.className).slice(0,40)).slice(0,6),
    clip:q.filter(e=>!e.closest('svg')&&e.children.length===0&&!e.closest('.sp-sr,.wc-sr')&&e.textContent.trim()&&getComputedStyle(e).display!=='none'&&(e.scrollWidth>e.clientWidth+1||(()=>{const r=e.getBoundingClientRect(),c=e.closest('.wc-sb-r,.sp-dock');if(!c)return false;const cr=c.getBoundingClientRect();return r.width&&(r.right>cr.right+.5||r.left<cr.left-.5)})())&&!/IMG|^I$/i.test(e.tagName)).map(e=>String(e.className.baseVal||e.className||e.tagName).slice(0,40)+':'+e.textContent.trim().slice(0,12)).slice(0,6)}});
module.exports={open,chk};
if(require.main===module)(async()=>{fs.mkdirSync(OUT,{recursive:true});const b=await chromium.launch({args:['--disable-dev-shm-usage']});
 for(const W of WS)for(const t of TS){const {p,er}=await open(b,W,t);
  for(const v of WINS){await p.evaluate(v=>window.__wc11Show(v,false),v);await p.waitForTimeout(400);
   // as a reader sees it: the scoreboard's head just under the sticky header (the docks show here if the take has one)
   await p.evaluate(()=>{const h=document.querySelector('header.top').getBoundingClientRect().height,s=document.querySelector('#wc-lb .wc-sbd .wc-h2');scrollTo(0,s.getBoundingClientRect().top+scrollY-h-(innerWidth<600?4:10))});
   await p.waitForTimeout(+(process.env.WAIT||900));
   await p.screenshot({path:`${OUT}/v-${W}-${t}-${v}.png`});
   const c=await chk(p);
   if(v==='season'||process.env.FULL){await p.addStyleTag({content:'.sp-dock{display:none!important}'});
    const bb=await p.evaluate(()=>{const s=document.querySelector('#wc-lb .wc-sb'),r=s.getBoundingClientRect();return {y:r.top+scrollY,h:r.height}});
    await p.screenshot({path:`${OUT}/sb-${W}-${t}-${v}.png`,clip:{x:0,y:Math.max(0,bb.y-14),width:W,height:Math.min(bb.h+30,9000)},fullPage:true});
    await p.addStyleTag({content:'.sp-dock{display:flex!important}'});await p.evaluate(()=>document.querySelectorAll('.sp-dock').forEach(d=>d.style.display=''))}
   // card heights (the first ticket) for the "shorter" check
   const ch=await p.evaluate(()=>[...document.querySelectorAll('#wc-lb .wc-sb-r')].map(t=>Math.round(t.getBoundingClientRect().height)).join('/'));
   console.log(W,t,v,'cards',ch,JSON.stringify(c),er.join('|')||'ok')}
  await p.close()}
 await b.close()})();
