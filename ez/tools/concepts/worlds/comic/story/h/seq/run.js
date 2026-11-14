// node run.js <out> <chapter tonight|upcoming|leaderboard> <takes now,tW1,..> [widths] : shoot X3+ with a seq take in place of the chapter
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const [OUT,CH,TS0,WS0]=process.argv.slice(2);const TS=(TS0||'now').split(','),WS=(WS0||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');const NOWMS=process.env.SQ_NOW?Date.parse(process.env.SQ_NOW):0;
const HASH={tonight:'',upcoming:'#/upcoming',leaderboard:'#/leaderboard'}[CH];
const FONTLINK='https://fonts.googleapis.com/css2?family=Anton&family=Bangers&family=Cabin+Sketch:wght@700&family=Cinzel:wght@700;900&family=Kalam:wght@700&family=Shantell+Sans:wght@700&display=block';
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:2});const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('c:'+m.text().slice(0,120))});
  await p.goto('http://localhost:8942/v47-live-x3plus.html'+HASH,{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  await p.waitForTimeout(1500);
  const tgt={tonight:'.wc-cliff',upcoming:'#wc-up .wc-tab-cv, .wc-up .wc-tab-cv',leaderboard:'.wc-tab-cv.wc11n-cv'}[CH];
  await p.waitForFunction(s=>{const e=[...document.querySelectorAll(s)].find(x=>x.offsetParent);return !!e},tgt,{timeout:30000}).catch(()=>{});
  if(t!=='now'){await p.addStyleTag({content:rd('seq.css')});await p.evaluate(u=>{const l=document.createElement('link');l.rel='stylesheet';l.href=u;document.head.appendChild(l)},FONTLINK);
   await p.evaluate(n=>{window.__sqImg='/tools/concepts/worlds/comic/story/h/seq/img/';if(n)window.__sqNow=n},NOWMS);await p.addScriptTag({content:rd('seq.js')});
   await p.evaluate(([t,s,ch])=>{const e=[...document.querySelectorAll(s)].find(x=>x.offsetParent);const el=SQ.build(t);
     if(ch==='tonight'){const pr=e.previousElementSibling;if(pr&&pr.classList.contains('wc-beat'))pr.style.display='none'}
     e.parentNode.insertBefore(el,e);e.style.display='none';SQ.start(el)},[t,tgt,CH])}
  await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1800);
  await p.evaluate(()=>{window.SQ&&document.querySelectorAll('.sq-ch').forEach(c=>SQ.place(c))});await p.waitForTimeout(300);
  await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'||c.position==='sticky')x.style.visibility='hidden'})});
  const bb=await p.evaluate(([t,s])=>{const e=t==='now'?[...document.querySelectorAll(s)].find(x=>x.offsetParent):document.querySelector('.sq-ch');const r=e.getBoundingClientRect();return {top:r.top+scrollY,h:r.height}},[t,tgt]);
  await p.screenshot({path:`${OUT}/${CH}-${W}-${t}${process.env.SQ_SUF||""}.png`,clip:{x:0,y:Math.max(0,bb.top-18),width:W,height:Math.ceil(bb.h+36)},fullPage:true});
  const m=await p.evaluate(()=>{const ch=document.querySelector('.sq-ch');if(!ch)return {sw:document.documentElement.scrollWidth,vw:innerWidth};
    const vis=e=>e.offsetParent!==null&&getComputedStyle(e).display!=='none';
    const over=[...ch.querySelectorAll('.sq-o,.sq-tx')].filter(vis).filter(e=>e.scrollWidth>e.clientWidth+2||e.scrollHeight>e.clientHeight+2).map(e=>(e.className+':'+e.textContent.trim().slice(0,22)));
    /* words outside any painted surface or drawn balloon/caption (the heading counted apart) */
    const w=s=>(s.match(/[A-Za-z0-9$%+−.-]+/g)||[]).length;let outside=0;const walk=n=>{if(n.nodeType===3){const pe=n.parentElement;if(pe&&!pe.closest('.sq-o,.sq-tx,.sq-hd,.sq-sr,figcaption')&&vis(pe))outside+=w(n.textContent)}else n.childNodes.forEach(walk)};walk(ch);
    const inWorld=[...ch.querySelectorAll('.sq-o,.sq-tx')].filter(vis).reduce((a,e)=>a+w(e.textContent),0);
    return {sw:document.documentElement.scrollWidth,vw:innerWidth,h:Math.round(ch.getBoundingClientRect().height),over:over.slice(0,8),outside,inWorld,head:w(ch.querySelector('.sq-hd').textContent),data:window.__sqData}});
  console.log(W,CH,t,JSON.stringify(m),er.slice(0,3).join('|')||'ok');await ctx.close()}
 await b.close()})();
