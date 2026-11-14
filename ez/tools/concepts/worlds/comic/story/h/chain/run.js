// node run.js <out> <ids e.g. now,A,B,C,D,A+> [widths 390,1280,320] [dpr 2] : serve ez/ on 8961 first (python3 -m http.server 8961 --bind 127.0.0.1).
// Lays _ch.css + _ch.js over the built v46-live-x2plus.html, shoots #record (sec-<W>-<id>.png; '+' taps "Show more" first) and prints tests:
// the page's hashes against node's SHA-256, cap heights, sideways scroll, text spilling out of its block, grid coverage beside the hero, errors, a tap opens the round.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs'),crypto=require('crypto');
const OUT=process.argv[2],IDS=(process.argv[3]||'A').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number),DPR=+(process.argv[5]||2);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();const res={};
 for(const W of WS)for(const id of IDS){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:DPR,reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('c:'+m.text().slice(0,140))});
  await p.goto('http://127.0.0.1:8961/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(800);
  const t=id.replace('+','');
  if(t!=='now'){await p.addStyleTag({content:rd('_ch.css')});await p.evaluate(t=>{window.__CH=t},t);await p.addScriptTag({content:rd('_ch.js')});await p.waitForFunction(()=>document.querySelector('.cz'),null,{timeout:30000})}
  await p.waitForFunction(()=>document.fonts.status==='loaded');
  await p.evaluate(()=>{document.querySelectorAll('#record img').forEach(i=>{i.loading='eager'});document.getElementById('record').scrollIntoView()});
  await p.waitForTimeout(500);await p.evaluate(()=>window.__ch&&window.__ch.render());if(id.includes('+'))await p.evaluate(()=>document.querySelector('.cz .cz-more').click());
  await p.waitForFunction(()=>[...document.querySelectorAll('#record .cz img')].every(i=>i.complete),null,{timeout:60000}).catch(()=>{});await p.evaluate(()=>Promise.all([...document.querySelectorAll('#record .cz img')].map(i=>i.decode().catch(()=>{}))));
  await p.waitForTimeout(900);await p.evaluate(()=>window.__ch&&window.__ch.render());await p.waitForTimeout(900);
  await p.addStyleTag({content:'body>div:has(>.x2p-cw-bug){display:none!important}'});await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const s=getComputedStyle(x).position;if(s==='fixed'||s==='sticky')x.style.setProperty('display','none','important')})});
  const box=await p.evaluate(()=>{const s=document.querySelector('#record .cz')||document.querySelector('#record .r6')||document.getElementById('record'),r=s.getBoundingClientRect();return {y:r.top+scrollY,h:r.height}});
  await p.screenshot({path:`${OUT}/sec-${W}-${id}.png`,clip:{x:0,y:box.y,width:W,height:Math.min(box.h,9000)},fullPage:true});
  const m=await p.evaluate(()=>{const R=document.querySelector('.cz');const out={sw:document.documentElement.scrollWidth,vw:innerWidth,secH:R?Math.round(R.getBoundingClientRect().height):0,trim:[],over:[]};if(!R)return out;
    const cv=document.createElement('canvas').getContext('2d');const caps=[];
    R.querySelectorAll('b,i,em,span,p,h2,code').forEach(e=>{if(![...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()))return;const cs=getComputedStyle(e);if(cs.display==='none'||!e.getClientRects().length)return;
      cv.font=`${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;const cap=cv.measureText('H').actualBoundingBoxAscent;const tx=e.textContent.trim();caps.push([+cap.toFixed(2),tx.slice(0,24)]);
      if(e.scrollWidth>e.clientWidth+.25&&cs.textOverflow==='ellipsis')out.trim.push(tx)});
    caps.sort((a,b)=>a[0]-b[0]);out.minCap=caps.slice(0,3);
    R.querySelectorAll('a.cz-it,a.cz-hero,.cz-more,.czd-open').forEach(a=>{const ar=a.getBoundingClientRect();a.querySelectorAll('b,span,em,i,code').forEach(e=>{const r=e.getBoundingClientRect();if(!r.width||e.closest('.cz-pic'))return;if(/czc-blk|czd-open/.test(a.className+e.parentElement.className)&&getComputedStyle(e).position==='absolute')return;
      if(r.right>ar.right+1||r.left<ar.left-1||r.bottom>ar.bottom+1)out.over.push((e.textContent||e.className).slice(0,24)+' '+Math.round(Math.max(r.right-ar.right,ar.left-r.left,r.bottom-ar.bottom)))})});
    R.querySelectorAll('.cz-l1,.cz-w,.czd-obar,.czd-oprev,.cza-bar,.czd-edge,.czb-hd').forEach(l=>{if(l.scrollWidth>l.clientWidth+1&&!l.classList.contains('cz-wc'))out.over.push('clip '+l.className.split(' ')[0]+' '+l.textContent.trim().slice(0,24))});
    /* dead space: the empty share of the box that holds the hero and the six */
    const its=[...R.querySelectorAll('.cz-hero,.cz-it')].slice(0,7);const rs=its.map(e=>e.getBoundingClientRect());const L=Math.min(...rs.map(r=>r.left)),T=Math.min(...rs.map(r=>r.top)),Rr=Math.max(...rs.map(r=>r.right)),B=Math.max(...rs.map(r=>r.bottom));
    out.cover=+(rs.reduce((s,r)=>s+r.width*r.height,0)/((Rr-L)*(B-T))).toFixed(3);out.box=Math.round(Rr-L)+'x'+Math.round(B-T);
    out.items=R.querySelectorAll('.cz-hero,.cz-it').length;out.links=R.querySelectorAll('.cza-links use').length;out.segs=R.querySelectorAll('.czc-seg').length;
    const H=window.__chHash;out.recs=[80,1].map(n=>{const r=ROUNDS.find(x=>x.n===n);return {n,prev:H.PREV[n],rec:H.record(r),hash:H.HASH[n]}});return out});
  /* the hashes must be SHA-256 of the stated recipe, checked outside the page */
  if(m.recs){m.hashOK=m.recs.every(x=>crypto.createHash('sha256').update(x.prev+'|'+x.rec).digest('hex')===x.hash);m.rec80=m.recs[0].rec;m.h80=m.recs[0].hash.slice(0,16);delete m.recs}
  if(t!=='now'&&W===390&&!id.includes('+')){const a=await p.$('.cz a.cz-it');if(a){const href=await a.getAttribute('href');await a.click({force:true});await p.waitForTimeout(1500);m.tap={href,hash:await p.evaluate(()=>location.hash),opened:await p.evaluate(()=>{const e=[document.getElementById('x2pRm'),document.querySelector('.rmod')].find(e=>e&&getComputedStyle(e).display!=='none'&&e.getBoundingClientRect().height>50);return e?(e.textContent.match(/Round \d+/)||[e.id||e.className])[0]:false})}}}
  m.errors=er;res[W+'-'+id]=m;console.log(W,id,JSON.stringify(m));await ctx.close()}
 fs.writeFileSync(OUT+'/measure-'+IDS.join('')+'-'+WS.join('_')+'.json',JSON.stringify(res,null,1));await b.close()})();
