// node run.js <out dir> <ids e.g. now,A,B,C,A+> [widths 390,320,1280] [dpr 2]   (serve ez/ on PORT, default 8985)
// Lays _st.css + _st.js (window.__ST=<id>) over the built v46-live-x2plus.html, shoots the section (sec-<W>-<id>.png; '+' taps "Show all" first)
// and prints: beat heights (head+stand, the rest), sideways scroll, errors, label words spilling out of their label, images and bytes
// loaded by the section, video elements started, and whether a tap on a stand slab opens the round.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],IDS=(process.argv[3]||'A').split(','),WS=(process.argv[4]||'390,320,1280').split(',').map(Number),DPR=+(process.argv[5]||2),PORT=process.env.PORT||8985;fs.mkdirSync(OUT,{recursive:true});
const P='tools/concepts/worlds/comic/story/h/stand/';
const css=fs.readFileSync(__dirname+'/_st.css','utf8').replace(/url\(img\//g,'url('+P+'img/'),js=fs.readFileSync(__dirname+'/_st.js','utf8');
(async()=>{const b=await chromium.launch();const res={};
 for(const W of WS)for(const id of IDS){const t=id.replace('+','');
  const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:W<600?DPR:1,reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('c:'+m.text().slice(0,140))});
  const reqs=[];p.on('requestfinished',async r=>{const u=r.url();if(/\/media\/|stand\/img/.test(u)){let s=0;try{s=(await r.sizes()).responseBodySize}catch(e){}reqs.push([u.split('/').pop(),s,Date.now()])}});
  await p.goto(`http://127.0.0.1:${PORT}/v46-live-x2plus.html`,{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(800);
  if(t!=='now'){await p.addStyleTag({content:css});await p.evaluate(t=>{window.__ST=t},t);await p.addScriptTag({content:js});await p.waitForFunction(()=>document.getElementById('stRoot'),null,{timeout:30000})}
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(300);
  const t0=Date.now();
  await p.evaluate(t=>{(t==='now'?document.getElementById('record'):document.getElementById('stRoot')).scrollIntoView()},t);await p.waitForTimeout(1600);
  const loadedAtView=reqs.filter(r=>r[2]>=t0).length;
  if(id.includes('+'))await p.evaluate(()=>document.querySelector('#stRoot .st-more').click());
  await p.evaluate(()=>window.__st&&window.__st.render&&0);
  // for the picture only: load every image in the section now
  await p.evaluate(()=>{document.querySelectorAll('#stRoot img,#record img').forEach(i=>{i.loading='eager'})});
  await p.waitForFunction(()=>[...document.querySelectorAll('#stRoot img')].every(i=>i.complete),null,{timeout:60000}).catch(()=>{});await p.waitForTimeout(900);
  await p.addStyleTag({content:'body>div:has(>.x2p-cw-bug){display:none!important}'});await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const s=getComputedStyle(x).position;if((s==='fixed'||s==='sticky')&&!x.closest('#stRoot'))x.style.setProperty('display','none','important')})});
  const box=await p.evaluate(t=>{const s=t==='now'?document.getElementById('record'):document.getElementById('stRoot'),r=s.getBoundingClientRect();return {y:r.top+scrollY,h:r.height}},t);
  await p.screenshot({path:`${OUT}/sec-${W}-${id}.png`,clip:{x:0,y:Math.max(0,box.y-6),width:W,height:Math.min(box.h+12,14000)},fullPage:true,type:'png'});
  const m=await p.evaluate(()=>{const R=document.getElementById('stRoot'),out={sw:document.documentElement.scrollWidth,vw:innerWidth};if(!R){out.secH=Math.round(document.getElementById('record').getBoundingClientRect().height);return out}
    const h=e=>e?Math.round(e.getBoundingClientRect().height):0,hd=R.querySelector('.st-hd'),b1=R.querySelector('.st-b1'),b2=R.querySelector('.st-b2');
    out.beat1=Math.round(b1.getBoundingClientRect().bottom-hd.getBoundingClientRect().top);out.beat2=h(b2);out.secH=h(R);
    const sl=R.querySelector('.st-b1 .st-sl');out.standSlab=sl?Math.round(sl.getBoundingClientRect().width)+'x'+Math.round(sl.getBoundingClientRect().height):'';
    const rs=R.querySelector('.st-b2 .st-sl');out.restSlab=rs?Math.round(rs.getBoundingClientRect().width)+'x'+Math.round(rs.getBoundingClientRect().height):'';
    out.restShown=R.querySelectorAll('.st-b2 .st-sl').length;out.standSlots=R.querySelectorAll('.st-b1 .st-sl').length;
    out.over=[];R.querySelectorAll('.st-lab').forEach(L=>{const lr=L.getBoundingClientRect();L.querySelectorAll('.st-nm,.st-y,.st-ds,.st-gr,.st-no,.st-zb').forEach(e=>{const r=e.getBoundingClientRect();if(!r.width)return;const d=Math.max(r.right-lr.right,lr.left-r.left,r.bottom-lr.bottom,lr.top-r.top);if(d>1)out.over.push(e.className+' '+Math.round(d))});
      const nm=L.querySelector('.st-nm');if(nm&&nm.scrollWidth>nm.clientWidth+1)out.over.push('clip '+nm.textContent.slice(0,20))});
    out.minNm=Math.min(...[...R.querySelectorAll('.st-nm')].map(e=>parseFloat(getComputedStyle(e).fontSize)));out.minDs=Math.min(...[...R.querySelectorAll('.st-ds')].map(e=>parseFloat(getComputedStyle(e).fontSize)));
    out.videos=[...document.querySelectorAll('video')].filter(v=>!v.paused).length;return out});
  m.reqAtView=loadedAtView;m.imgsSection=await p.evaluate(()=>{const R=document.getElementById('stRoot');return R?R.querySelectorAll('img').length:0});
  m.mediaReqs=reqs.length;m.mediaKB=Math.round(reqs.reduce((a,r)=>a+r[1],0)/1024);m.standKB=Math.round(reqs.filter(r=>/tile-r|stand|caseP|caseD|slab|ledge|velvet|box\.webp/.test(r[0])).reduce((a,r)=>a+r[1],0)/1024);
  if(t!=='now'&&W===390&&!id.includes('+')){const a=await p.$('#stRoot .st-b1 a.st-sl');if(a){const href=await a.getAttribute('href');await a.click({force:true});await p.waitForTimeout(1800);
    m.tap={href,hash:await p.evaluate(()=>location.hash),opened:await p.evaluate(()=>{const e=document.getElementById('x2pRm');return !!(e&&getComputedStyle(e).display!=='none'&&e.getBoundingClientRect().height>50&&(e.textContent.match(/Round \d+|#\d+/)||[1])[0])}),video:await p.evaluate(()=>[...document.querySelectorAll('#x2pRm video')].map(v=>v.currentSrc.split('/').pop()+(v.paused?' paused':' playing')).join(','))}}}
  m.errors=er;res[W+'-'+id]=m;console.log(W,id,JSON.stringify(m));await ctx.close()}
 fs.writeFileSync(OUT+'/measure-'+IDS.join('')+'-'+WS.join('_')+'.json',JSON.stringify(res,null,1));await b.close()})();
