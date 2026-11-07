// node run.js <out> <takes A,B,..|now> [widths]: shoots X3+'s bet section with a bet3 take laid over the live chapter.
// Prints per shot: sideways scroll, errors, plain-text words outside the world (and where), and anything out of the viewport.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.existsSync(__dirname+'/'+f)?fs.readFileSync(__dirname+'/'+f,'utf8'):'';
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:2});const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('c:'+m.text().slice(0,120))});
  await p.goto('http://localhost:8943/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('.wc-bet.hb-on .hbc-fr'),null,{timeout:120000});
  await p.waitForTimeout(600);
  if(t!=='now'){await p.addStyleTag({content:rd('_k.css')+rd(t+'.css')});await p.addScriptTag({content:rd('_k.js')+rd(t+'.js')});await p.waitForFunction(()=>document.documentElement.classList.contains('b3-ready'),null,{timeout:20000})}
  await p.evaluate(()=>{const s=document.querySelector('.wc-bet');scrollTo(0,s.getBoundingClientRect().top+scrollY-120)});
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(+process.env.SHOT_AT||2200);
  await p.waitForFunction(()=>{const t=Date.now()%1000;return t>550&&t<800},null,{polling:20});
  await p.evaluate(()=>{document.querySelectorAll('svg.b3s').forEach(s=>{s.pauseAnimations();s.setCurrentTime(1.1)});[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'||c.position==='sticky')x.style.visibility='hidden'});const st=document.createElement('style');st.textContent='body>[class^="x2p-cw"],body>div:has(>.x2p-cw-bug){visibility:hidden!important}';document.head.append(st)});
  await p.waitForTimeout(150);
  const bb=await p.evaluate(()=>{const s=document.querySelector('.wc-bet'),pr=s.previousElementSibling,a=(pr&&pr.classList.contains('wc-beat')?pr:s).getBoundingClientRect(),r=s.getBoundingClientRect();return {top:a.top+scrollY,bot:r.bottom+scrollY}});
  await p.screenshot({path:`${OUT}/bet-${W}-${t}.png`,clip:{x:0,y:Math.max(0,bb.top-14),width:W,height:Math.ceil(bb.bot-bb.top+28)},fullPage:true});
  if(W<600&&t!=='now'){const ps=await p.$$('.b3p');for(let i=0;i<ps.length;i++)await ps[i].screenshot({path:`${OUT}/pan-${W}-${t}-${i}.png`})}
  const m=await p.evaluate(()=>{const w=document.querySelector('.wc-bet .hb-wrap');const words=s=>(s.match(/[\w$%#&'’.-]+/g)||[]).length;
    const tw=document.createTreeWalker(w,NodeFilter.SHOW_TEXT);let n,c={world:0,voice:0,title:0,plain:0},plain=[];
    while(n=tw.nextNode()){const e=n.parentElement,s=n.textContent.trim();if(!s)continue;const cs=getComputedStyle(e);if(e.closest('[aria-hidden="true"]')&&!e.closest('svg.b3s'))continue;
      const r=e.getBoundingClientRect();if(!r.width||cs.visibility==='hidden'||e.closest('[style*="display: none"]')||!e.offsetParent&&!e.closest('svg'))continue;
      if(e.closest('.hb-sr,.c2-sr'))continue;
      const k=e.closest('svg.b3s,.hbc-fr')?'world':e.closest('[data-w]')?'voice':e.closest('h2')?'title':'plain';c[k]+=words(s);if(k==='plain')plain.push(s.slice(0,60))}
    const out=[...w.querySelectorAll('*')].filter(e=>{const q=e.getBoundingClientRect();return q.width&&(q.right>innerWidth+.5||q.left<-.5)&&getComputedStyle(e).visibility!=='hidden'&&!e.closest('.hbc-die,.hbc-lab,svg')}).map(e=>String(e.className.baseVal!==undefined?e.className.baseVal:e.className).slice(0,24)).slice(0,5);
    return {sw:document.documentElement.scrollWidth,vw:innerWidth,h:Math.round(document.querySelector('.wc-bet').getBoundingClientRect().height),words:c,plain,out,dig:[...document.querySelectorAll('.hbc-num')].map(n=>n.textContent).join(':')}});
  console.log(W,t,JSON.stringify(m),er.slice(0,3).join('|')||'ok');await ctx.close()}
 await b.close()})();
