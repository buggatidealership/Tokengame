// node run.js <out dir> <takes e.g. now,u1,u2,u3> [widths 1280,390,320]   env: RM=1 reduced motion, NOSHOT=1 checks only, PORT (8913)
// Lays helper t's shared data code, helper m's M3 painter (exported) and a take over the built X3+ page's Upcoming tab; shoots the whole tab.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'1280,390,320').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');const PORT=process.env.PORT||8913;const V22=__dirname+'/../../../../../v22/story/';
/* helper m's painter, reopened so a take can place the mark and split its dot screen; the page's own copy is untouched */
let MG=fs.readFileSync(V22+'_mg.js','utf8');
const rep=(a,b)=>{if(!MG.includes(a))throw new Error('patch miss: '+a.slice(0,40));MG=MG.replace(a,b)};
rep('function prep(m,W,H,k){const L=placed(m,W,H,k,.45,.43)','function prep(m,W,H,k){const L=placed(m,W,H,window.__uuK||k,window.__uuCx||.45,window.__uuCy||.43)');
rep('if(d>r0-.5){bl(o,B,','if(d>r0-.5){bl(o,window.__uuB?window.__uuB(X/W,Y/H):B,');
rep('S.paintG=paint;','S.paintG=paint;S.uuG={G,mark,load,rnd,hash,hex,cv};');
(async()=>{const b=await chromium.launch();const res=[];
 for(const W of WS)for(const t of TS){const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:+(process.env.DPR||2),reducedMotion:process.env.RM?'reduce':'no-preference'});await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('console:'+m.text().slice(0,120))});
  await p.goto(`http://localhost:${PORT}/v47-live-x3plus.html#/upcoming`,{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('sg-ready'),null,{timeout:60000}).catch(()=>{});
  if(t!=='now'){if(!await p.evaluate(()=>!!window.SA))await p.addScriptTag({content:fs.readFileSync(V22+'_sa.js','utf8')});
    await p.addScriptTag({content:MG});
    await p.addStyleTag({content:rd('../t/_st.css')+rd('_u.css')+rd(t+'.css')});
    await p.addScriptTag({content:rd('../t/_st.js')+rd(t+'.js')+rd('_wait.js')+rd('_u.js')});
    await p.waitForFunction(()=>document.documentElement.classList.contains('tt-ready'),null,{timeout:60000})}
  await p.waitForFunction(()=>document.fonts.status==='loaded');
  {const H2=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H2;y+=400){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(40)}}
  if(t!=='now')await p.waitForFunction(()=>document.documentElement.classList.contains('uu-painted'),null,{timeout:120000});
  await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(+process.env.SHOT_AT||1800);
  const bb=await p.evaluate(()=>{const up=document.getElementById('wc-up'),kids=[...up.children].filter(e=>e.offsetParent&&!e.classList.contains('wc-back')&&e.getBoundingClientRect().height>0);
    const t=Math.min(...kids.map(e=>e.getBoundingClientRect().top+scrollY)),bt=Math.max(...kids.map(e=>e.getBoundingClientRect().bottom+scrollY));return {y:t,h:bt-t}});
  const m=await p.evaluate(()=>{const n=document.querySelector('.tt-root')||document.getElementById('wc-up'),VW=innerWidth;
    const out=[...n.querySelectorAll('*')].filter(e=>{const q=e.getBoundingClientRect();if(!q.width||!e.offsetParent)return false;return q.right>VW+1||q.left<-1}).map(e=>String(e.className).slice(0,30)).slice(0,5);
    /* anything inside a tile that spills past the tile (the notches and the main event's caption hang over its edge on purpose) */
    const spill=[];n.querySelectorAll('.uu-p').forEach(a=>{const A=a.getBoundingClientRect();a.querySelectorAll('*').forEach(e=>{if(!e.offsetParent||e.matches('.uu-nl,.uu-nr,.uu-cap,.uu-cap *,.uu-cv'))return;const q=e.getBoundingClientRect();if(!q.width)return;
      if(q.left<A.left-1||q.right>A.right+1||q.bottom>A.bottom+1||q.top<A.top-1)spill.push(a.dataset.t+':'+String(e.className.baseVal!=null?e.className.baseVal:e.className).slice(0,16)+':'+Math.round(Math.max(A.left-q.left,q.right-A.right,q.bottom-A.bottom,A.top-q.top)))})});
    const clip=[...n.querySelectorAll('.uu-co,.u2-g,.u3-row,.u3-g,.u1-col')].filter(e=>e.offsetParent&&(e.scrollWidth>e.clientWidth+1)).map(e=>(e.closest('[data-t]')||{dataset:{}}).dataset.t+':'+String(e.className).slice(0,12)).slice(0,8);
    const arts=[...n.querySelectorAll('.uu-art[data-ratio]')].map(e=>+e.dataset.ratio);const mx=arts.length?Math.max(...arts):null;
    const imgs=[...n.querySelectorAll('img:not(.uu-cv)')].filter(i=>i.offsetParent&&i.naturalWidth).map(i=>{const r=i.getBoundingClientRect();return +(r.width*devicePixelRatio/i.naturalWidth).toFixed(2)});
    return {sw:document.documentElement.scrollWidth,out,spill:spill.slice(0,8),nspill:spill.length,clip,marks:arts.length,maxMarkScale:mx,maxImgScale:imgs.length?Math.max(...imgs):null}});
  if(!process.env.NOSHOT){/* a full-page shot resizes the window; keep the take from redrawing under the camera */await p.evaluate(()=>window.__uuFreeze=1);await p.addStyleTag({content:'.x2p-cw{display:none!important}'});await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden';[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<120&&x.offsetHeight>0)x.style.visibility='hidden'})});
    const h=Math.min(bb.h+28,+process.env.MAXH||16000);await p.screenshot({path:`${OUT}/up-${W}-${t}.png`,clip:{x:0,y:Math.max(0,bb.y-14),width:W,height:h},fullPage:true})}
  const line=`${W} ${t} tabH=${Math.round(bb.h)} ${JSON.stringify(m)} ${er.join('|')||'ok'}`;console.log(line);res.push(line);await p.close()}
 fs.writeFileSync(OUT+'/checks.txt',res.join('\n')+'\n',{flag:'a'});await b.close()})();
