// node run.js <out> <ids now,A,B,C,D> [widths 390,1280] [dpr 2] : serve ez/ on 8961 first. Lays _r7.css + _r7.js over the built v46-live-x2plus.html,
// shoots #record (sec-<W>-<id>.png), prints tests (live-text cap heights, image source px vs 3x, sideways scroll, errors, a tap opens the round) as JSON.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],IDS=(process.argv[3]||'A').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number),DPR=+(process.argv[5]||2);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();const res={};
 for(const W of WS)for(const id of IDS){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:DPR,reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('c:'+m.text().slice(0,140))});
  await p.goto('http://localhost:8961/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(800);
  if(id!=='now'){await p.addStyleTag({content:rd('_r7.css')});await p.evaluate(()=>document.fonts.load("20px 'Permanent Marker'"));await p.evaluate(t=>{window.__R7=t},id);await p.addScriptTag({content:rd('_r7.js')});await p.waitForFunction(()=>document.querySelector('.r7'),null,{timeout:30000})}
  await p.waitForFunction(()=>document.fonts.status==='loaded');
  await p.evaluate(()=>{document.querySelectorAll('#record img').forEach(i=>{i.loading='eager'});document.getElementById('record').scrollIntoView()});
  await p.waitForTimeout(500);
  await p.waitForFunction(()=>[...document.querySelectorAll('#record .r7 img')].every(i=>i.complete),null,{timeout:60000}).catch(()=>{});await p.waitForTimeout(2500);
  await p.addStyleTag({content:'body>div:has(>.x2p-cw-bug){display:none!important}'});await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const s=getComputedStyle(x).position;if(s==='fixed'||s==='sticky')x.style.setProperty('display','none','important')})});
  const box=await p.evaluate(()=>{const s=document.querySelector('#record .r7')||document.querySelector('#record .r6')||document.getElementById('record'),r=s.getBoundingClientRect();return {y:r.top+scrollY,h:r.height}});
  await p.screenshot({path:`${OUT}/sec-${W}-${id}.png`,clip:{x:0,y:box.y,width:W,height:Math.min(box.h,9000)},fullPage:true});
  const m=await p.evaluate(()=>{const R=document.querySelector('.r7');const out={sw:document.documentElement.scrollWidth,vw:innerWidth,secH:R?Math.round(R.getBoundingClientRect().height):0,small:[],imgs:[]};if(!R)return out;
    /* every live word: cap height ~ .7 x font size for Anton/Marker; flag under 9 css px */
    const cv=document.createElement('canvas').getContext('2d');
    R.querySelectorAll('b,i,em,span,p,small').forEach(e=>{if(!e.childNodes.length||![...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()))return;const cs=getComputedStyle(e);if(cs.display==='none'||!e.offsetParent)return;
      cv.font=`${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;const mm=cv.measureText('H');const cap=mm.actualBoundingBoxAscent;const t=[...e.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent).join('').trim();out.small.push([+cap.toFixed(2),t.slice(0,30)])});
    out.small.sort((a,b)=>a[0]-b[0]);out.minCap=out.small.slice(0,5);out.under9=out.small.filter(c=>c[0]<9).length;out.nText=out.small.length;delete out.small;
    const seen=new Set();R.querySelectorAll('img').forEach(i=>{const r=i.getBoundingClientRect(),k=i.src.split('/').pop();if(!r.width||seen.has(k)&&!/rounds7/.test(k))return;if(/tile-r/.test(k)){if(seen.has('tile'))return;seen.add('tile')}seen.add(k);out.imgs.push({f:k,cssW:+r.width.toFixed(1),srcW:i.naturalWidth,t1:i.naturalWidth>=r.width*3})});
    const ub=[...R.querySelectorAll('a,button')].filter(a=>a.offsetParent).map(a=>{const r=a.getBoundingClientRect();return Math.min(r.width,r.height)});out.minTap=Math.round(Math.min(...ub));out.links=ub.length;
    return out});
  if(id!=='now'&&W===390){const a=await p.$('.r7 a[href^="#/round/"]');if(a){const href=await a.getAttribute('href');await a.click({force:true});await p.waitForTimeout(1500);m.tap={href,hash:await p.evaluate(()=>location.hash),slab:await p.evaluate(()=>{const e=document.getElementById('x2pRm');return !!e&&getComputedStyle(e).display!=='none'&&e.getBoundingClientRect().height>50})}}}
  m.errors=er;res[W+'-'+id]=m;console.log(W,id,JSON.stringify(m));await ctx.close()}
 fs.writeFileSync(OUT+'/measure-'+IDS.join('')+'-'+WS.join('_')+'.json',JSON.stringify(res,null,1));await b.close()})();
