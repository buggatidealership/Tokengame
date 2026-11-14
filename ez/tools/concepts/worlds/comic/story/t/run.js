// node run.js <out dir> <takes e.g. now,t1,t2,t3> [widths 1280,390,320]   env: RM=1 reduced motion, NOSHOT=1 checks only
// Lays _st.js (shared) and a take over the built X3+ page's Upcoming tab, shoots the whole tab (cover to the last day).
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'1280,390,320').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');const PORT=process.env.PORT||8912;
(async()=>{const b=await chromium.launch();const res=[];
 for(const W of WS)for(const t of TS){const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:+(process.env.DPR||2),reducedMotion:process.env.RM?'reduce':'no-preference'});await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('console:'+m.text().slice(0,120))});
  await p.goto(`http://localhost:${PORT}/v47-live-x3plus.html#/upcoming`,{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('sg-ready'),null,{timeout:60000}).catch(()=>{});
  if(t!=='now'){await p.addStyleTag({content:rd('_st.css')+rd(t+'.css')});
    await p.addScriptTag({content:rd('_st.js')+rd(t+'.js')});await p.waitForFunction(()=>document.documentElement.classList.contains('tt-ready'),null,{timeout:60000})}
  await p.waitForFunction(()=>document.fonts.status==='loaded');
  {const H2=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H2;y+=400){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(40)}}
  await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(+process.env.SHOT_AT||2200);
  const bb=await p.evaluate(()=>{const up=document.getElementById('wc-up'),kids=[...up.children].filter(e=>e.offsetParent&&!e.classList.contains('wc-back')&&e.getBoundingClientRect().height>0);
    const t=Math.min(...kids.map(e=>e.getBoundingClientRect().top+scrollY)),bt=Math.max(...kids.map(e=>e.getBoundingClientRect().bottom+scrollY));return {y:t,h:bt-t,docH:document.documentElement.scrollHeight,upW:up.getBoundingClientRect().width}});
  const m=await p.evaluate(()=>{const n=document.querySelector('.tt-root')||document.getElementById('wc-up'),VW=innerWidth;
    const out=[...n.querySelectorAll('*')].filter(e=>{const q=e.getBoundingClientRect();if(!q.width||!e.offsetParent)return false;return q.right>VW+1||q.left<-1}).map(e=>String(e.className).slice(0,30)).slice(0,5);
    const clip=[...n.querySelectorAll('.tt-fit,.tt-nm,.tt-cl,.tt-c')].filter(e=>e.offsetParent&&(e.scrollWidth>e.clientWidth+1)).map(e=>(e.closest('[data-t]')||{dataset:{}}).dataset.t+':'+String(e.className).slice(0,20)+':'+e.textContent.slice(0,20)).slice(0,8);
    /* every raster logo: native px against drawn css px x DPR */
    const dpr=devicePixelRatio,lg=[...n.querySelectorAll('img')].filter(i=>i.offsetParent&&i.naturalWidth).map(i=>{const r=i.getBoundingClientRect();const s=Math.min(r.width/i.naturalWidth,r.height/i.naturalHeight);
      /* object-fit contain: drawn = natural*scale */const k=Math.min(r.width/i.naturalWidth,r.height/i.naturalHeight);return {t:(i.closest('[data-t]')||{dataset:{}}).dataset.t,nat:i.naturalWidth+'x'+i.naturalHeight,css:Math.round(i.naturalWidth*k)+'x'+Math.round(i.naturalHeight*k),ratio:+(k*dpr).toFixed(2)}});
    const worst=lg.sort((a,b)=>b.ratio-a.ratio).slice(0,3);const main=[...n.querySelectorAll('[data-main] img')].map(i=>{const r=i.getBoundingClientRect();return i.naturalWidth+'px native, drawn '+Math.round(r.width)+'x'+Math.round(r.height)})[0]||null;
    return {sw:document.documentElement.scrollWidth,out,clip,worst,main,n:lg.length}});
  if(!process.env.NOSHOT){await p.addStyleTag({content:'.x2p-cw{display:none!important}'});await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden';[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<120&&x.offsetHeight>0)x.style.visibility='hidden'})});
    const h=Math.min(bb.h+28,+process.env.MAXH||16000);await p.screenshot({path:`${OUT}/up-${W}-${t}.png`,clip:{x:0,y:Math.max(0,bb.y-14),width:W,height:h},fullPage:true})}
  const line=`${W} ${t} tabH=${Math.round(bb.h)} upW=${Math.round(bb.upW)} ${JSON.stringify(m)} ${er.join('|')||'ok'}`;console.log(line);res.push(line);await p.close()}
 fs.writeFileSync(OUT+'/checks.txt',res.join('\n')+'\n',{flag:'a'});await b.close()})();
