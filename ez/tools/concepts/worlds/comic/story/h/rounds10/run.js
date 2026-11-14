// node run.js <out> <ids e.g. A,B,C,D,now,A+> [widths 390,1280,320] [dpr 2] : serve ez/ on PORT (default 9611) first.
// Lays _r10.css + _r10.js over the built v46-live-x2plus.html, shoots #record (sec-<W>-<id>.png; '+' taps "Show more" first) and prints tests:
// sideways scroll, words spilling out of their item, smallest cap height, image source px vs display, errors, a tap opens the round, empty area of the first block.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],IDS=(process.argv[3]||'A').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number),DPR=+(process.argv[5]||2),PORT=process.env.PORT||9611;fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();const res={};
 for(const W of WS)for(const id of IDS){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:DPR,reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('c:'+m.text().slice(0,140))});
  await p.goto(`http://127.0.0.1:${PORT}/v46-live-x2plus.html`,{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(800);
  const t=id.replace('+','');
  if(t!=='now'){await p.addStyleTag({content:rd('_r10.css')});await p.evaluate(t=>{window.__R10=t},t);await p.addScriptTag({content:rd('_r10.js')});await p.waitForFunction(()=>document.querySelector('.r10'),null,{timeout:30000})}
  await p.waitForFunction(()=>document.fonts.status==='loaded');
  await p.evaluate(()=>{document.getElementById('record').scrollIntoView()});
  await p.waitForTimeout(500);await p.evaluate(()=>window.__r10&&window.__r10.render());if(id.includes('+'))await p.evaluate(()=>document.querySelector('.r10 .r10-more').click());
  await p.evaluate(()=>{document.querySelectorAll('#record img').forEach(i=>{i.loading='eager'})});
  await p.waitForFunction(()=>[...document.querySelectorAll('#record .r10 img')].every(i=>i.complete),null,{timeout:60000}).catch(()=>{});await p.evaluate(()=>Promise.all([...document.querySelectorAll('#record .r10 img')].map(i=>i.decode().catch(()=>{}))));await p.waitForTimeout(1500);
  await p.addStyleTag({content:'body>div:has(>.x2p-cw-bug){display:none!important}'});await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const s=getComputedStyle(x).position;if(s==='fixed'||s==='sticky')x.style.setProperty('display','none','important')})});
  const box=await p.evaluate(()=>{const s=document.querySelector('#record .r10')||document.querySelector('#record .r6')||document.getElementById('record'),r=s.getBoundingClientRect();return {y:r.top+scrollY,h:r.height}});
  await p.screenshot({path:`${OUT}/sec-${W}-${id}.png`,clip:{x:0,y:box.y,width:W,height:Math.min(box.h,12000)},fullPage:true,type:'png'});
  const m=await p.evaluate(()=>{const R=document.querySelector('.r10');const out={sw:document.documentElement.scrollWidth,vw:innerWidth,secH:R?Math.round(R.getBoundingClientRect().height):0,imgs:[],trim:[],over:[]};if(!R)return out;
    const cv=document.createElement('canvas').getContext('2d');const caps=[];
    R.querySelectorAll('b,i,em,span,p,h2').forEach(e=>{if(![...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()))return;const cs=getComputedStyle(e);if(cs.display==='none'||!e.getClientRects().length)return;if(e.closest('.r10c-fan'))return;
      cv.font=`${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;const cap=cv.measureText('H').actualBoundingBoxAscent;const t=e.textContent.trim();caps.push([+cap.toFixed(2),t.slice(0,24)]);
      if(e.scrollWidth>e.clientWidth+.25&&cs.textOverflow==='ellipsis')out.trim.push(t)});
    caps.sort((a,b)=>a[0]-b[0]);out.minCap=caps.slice(0,3);out.under7=caps.filter(c=>c[0]<7).length;
    /* every word inside its own item (the print, the pocket+plate, the cover) */
    R.querySelectorAll('.r10-g>a,.r10-g>.r10-nx').forEach(a=>{const ob=a.querySelector('.r10-ob')||a;const ar=ob.getBoundingClientRect();
      a.querySelectorAll('b,span,em,i').forEach(e=>{if(e.closest('.r10c-fan')||e.closest('.r10-pic')||e.classList.contains('r10a-clip')||e.classList.contains('r10b-rim')||e.classList.contains('r10c-dress')||e.classList.contains('r10d-crop')||e.classList.contains('r10b-flag'))return;const r=e.getBoundingClientRect();if(!r.width)return;
        const d=Math.max(r.right-ar.right,ar.left-r.left,r.bottom-ar.bottom,ar.top-r.top);if(d>1.5)out.over.push((e.textContent||e.className).trim().slice(0,22)+' '+Math.round(d))})});
    R.querySelectorAll('.r10-l1,.r10-w,.r10c-ban,.r10c-mast').forEach(l=>{if(l.scrollWidth>l.clientWidth+1&&!l.classList.contains('r10-wc'))out.over.push('clip '+l.textContent.trim().slice(0,24))});
    const seen=new Set();R.querySelectorAll('.r10-pic img').forEach(i=>{const r=i.getBoundingClientRect();const k=i.src.split('/').pop().replace(/r\d+/,'rN').replace(/round-\d+-[a-z0-9-]+/,'poster');if(!r.width||seen.has(k))return;seen.add(k);
      const s=Math.min(i.naturalWidth/r.width,i.naturalHeight/r.height);out.imgs.push({f:k,css:Math.round(r.width)+'x'+Math.round(r.height),x:+s.toFixed(2)})});
    const g=R.querySelector('.r10-g'),gr=g.getBoundingClientRect();const kids=[...g.querySelectorAll(':scope>a,:scope>.r10-nx')].slice(0,9);const bot=Math.max(...kids.map(k=>k.getBoundingClientRect().bottom));let filled=0;kids.forEach(k=>{const r=k.getBoundingClientRect();filled+=r.width*r.height});
    out.cover=+(filled/(gr.width*(bot-gr.top))).toFixed(3);out.items=g.querySelectorAll(':scope>a').length;out.moreTxt=(R.querySelector('.r10-more')||{}).textContent;return out});
  if(t!=='now'&&W===390&&!id.includes('+')){const a=await p.$('.r10 a.r10-it');if(a){const href=await a.getAttribute('href');await a.click({force:true});await p.waitForTimeout(1500);m.tap={href,hash:await p.evaluate(()=>location.hash),opened:await p.evaluate(()=>{const e=[document.getElementById('x2pRm'),document.querySelector('.rmod')].find(e=>e&&getComputedStyle(e).display!=='none'&&e.getBoundingClientRect().height>50);return e?(e.textContent.match(/Round \d+/)||[e.id||e.className])[0]:false})}}}
  m.errors=er;res[W+'-'+id]=m;console.log(W,id,JSON.stringify(m));await ctx.close()}
 fs.writeFileSync(OUT+'/measure-'+IDS.join('')+'-'+WS.join('_')+'.json',JSON.stringify(res,null,1));await b.close()})();
