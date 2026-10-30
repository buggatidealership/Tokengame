// node run.js <out dir> [widths 390,1280,320]   env RM=1 reduced motion, NOSHOT=1 checks only
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],WS=(process.argv[3]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();
 for(const W of WS){const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:+(process.env.DPR||2),reducedMotion:process.env.RM?'reduce':'no-preference'});await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('response',r=>{if(r.status()>=400)er.push(r.status()+':'+r.url().split('8917/')[1])});
  await p.goto('http://localhost:8917/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  await p.addStyleTag({content:rd('z2.css')});if(!process.env.CRAWL)await p.addStyleTag({content:'.x2p-cw{display:none!important}'});await p.addScriptTag({content:rd('z2.js')});
  await p.waitForFunction(()=>document.documentElement.classList.contains('z2-ready'),null,{timeout:20000});
  await p.waitForTimeout(500);await p.waitForFunction(()=>document.fonts.status==='loaded');
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=400){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(60)}
  await p.evaluate(()=>{window.__z2Go();scrollTo(0,0);[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<140&&x.offsetHeight>0&&!x.matches('header.top')&&!x.closest('header.top'))x.style.visibility='hidden'})});await p.waitForTimeout(3200);
  const m=await p.evaluate(()=>{const VW=innerWidth;const bk=document.getElementById('z2-book');
    const vis=e=>{const c=getComputedStyle(e);return c.visibility!=='hidden'&&c.display!=='none'&&e.getClientRects().length};
    const out=[...bk.querySelectorAll('*')].filter(e=>{if(!vis(e))return false;const q=e.getBoundingClientRect();return q.width&&(q.right>VW+.5||q.left<-.5)&&!e.closest('.z2-krk,.vt-tag,.bt-p,.bt-pp')}).map(e=>String(e.className&&e.className.baseVal!==undefined?e.className.baseVal:e.className).slice(0,30)).slice(0,8);
    const clip=[...bk.querySelectorAll('b,small,p,span,em,q,h1,h2,h3,dd,dt,li,a')].filter(e=>vis(e)&&getComputedStyle(e).overflow!=='visible'&&(e.scrollWidth>e.clientWidth+1||e.scrollHeight>e.clientHeight+1)).map(e=>String(e.className).slice(0,20)+':'+e.textContent.trim().slice(0,18)).slice(0,8);
    const big=[...bk.querySelectorAll('img.z2-lg')].filter(i=>i.naturalWidth&&i.getBoundingClientRect().width>i.naturalWidth/2+.5).map(i=>i.src.split('/').pop()).slice(0,5);
    const v=document.querySelector('#z2Film video');const vr=v&&v.getBoundingClientRect();
    return {sw:document.documentElement.scrollWidth,vw:VW,H:document.documentElement.scrollHeight,out,clip,big,film:vr?[Math.round(vr.width),Math.round(vr.height),Math.round(vr.top)]:null,
      play:!!document.querySelector('#z2Film .vt-play'),anim:document.getAnimations().filter(a=>a.playState==='running'&&a.effect&&a.effect.target&&a.effect.target.closest&&a.effect.target.closest('#z2-book')).length}});
  console.log(W,(process.env.RM?'RM ':'')+JSON.stringify(m),er.join(' | ')||'no errors');
  if(!process.env.NOSHOT)await p.screenshot({path:`${OUT}/full-${W}.png`,fullPage:true});
  await p.close()}
 await b.close()})();
