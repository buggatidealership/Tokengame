// node run.js <out> <ids e.g. A,B,C,now,A+> [widths 390,1280] [dpr 2] : serve ez/ on 8983 first (python3 -m http.server 8983 --bind 127.0.0.1).
// Lays _r9.css + _r9.js over the built v46-live-x2plus.html, shoots #record (sec-<W>-<id>.png; '+' taps "Show 8 more" first) and prints tests:
// cap heights of live words, image source px vs display, sideways scroll, text overflow out of its tile, empty area beside/under the hero, errors, a tap opens the round.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],IDS=(process.argv[3]||'A').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number),DPR=+(process.argv[5]||2);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();const res={};
 for(const W of WS)for(const id of IDS){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:DPR,reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('c:'+m.text().slice(0,140))});
  await p.goto('http://127.0.0.1:8983/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(800);
  const t=id.replace('+','');
  if(t!=='now'){await p.addStyleTag({content:rd('_r9.css')});await p.evaluate(t=>{window.__R9=t},t);await p.addScriptTag({content:rd('_r9.js')});await p.waitForFunction(()=>document.querySelector('.r9'),null,{timeout:30000})}
  await p.waitForFunction(()=>document.fonts.status==='loaded');
  await p.evaluate(()=>{document.querySelectorAll('#record img').forEach(i=>{i.loading='eager'});document.getElementById('record').scrollIntoView()});
  await p.waitForTimeout(500);await p.evaluate(()=>window.__r9&&window.__r9.render());if(id.includes('+'))await p.evaluate(()=>document.querySelector('.r9 .r9-more').click());
  await p.waitForFunction(()=>[...document.querySelectorAll('#record .r9 img')].every(i=>i.complete),null,{timeout:60000}).catch(()=>{});await p.evaluate(()=>Promise.all([...document.querySelectorAll('#record .r9 img')].map(i=>i.decode().catch(()=>{}))));await p.waitForTimeout(1200);
  await p.addStyleTag({content:'body>div:has(>.x2p-cw-bug){display:none!important}'});await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const s=getComputedStyle(x).position;if(s==='fixed'||s==='sticky')x.style.setProperty('display','none','important')})});
  const box=await p.evaluate(()=>{const s=document.querySelector('#record .r9')||document.querySelector('#record .r6'),r=s.getBoundingClientRect();return {y:r.top+scrollY,h:r.height}});
  await p.screenshot({path:`${OUT}/sec-${W}-${id}.png`,clip:{x:0,y:box.y,width:W,height:Math.min(box.h,9000)},fullPage:true});
  const m=await p.evaluate(()=>{const R=document.querySelector('.r9');const out={sw:document.documentElement.scrollWidth,vw:innerWidth,secH:R?Math.round(R.getBoundingClientRect().height):0,imgs:[],trim:[],over:[]};if(!R)return out;
    const cv=document.createElement('canvas').getContext('2d');const caps=[];
    R.querySelectorAll('b,i,em,span,p,h2').forEach(e=>{if(![...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()))return;const cs=getComputedStyle(e);if(cs.display==='none'||!e.getClientRects().length)return;
      cv.font=`${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;const cap=cv.measureText('H').actualBoundingBoxAscent;const t=e.textContent.trim();caps.push([+cap.toFixed(2),t.slice(0,24)]);
      if(e.scrollWidth>e.clientWidth+.25&&cs.textOverflow==='ellipsis')out.trim.push(t)});
    caps.sort((a,b)=>a[0]-b[0]);out.minCap=caps.slice(0,3);out.under9=caps.filter(c=>c[0]<9).length;
    R.querySelectorAll('a.r9-it,a.r9-hero,.r9-more').forEach(a=>{const ar=a.getBoundingClientRect();a.querySelectorAll('b,span,em,i').forEach(e=>{const r=e.getBoundingClientRect();if(!r.width||e.closest('.r9-pic'))return;if(r.right>ar.right+1||r.left<ar.left-1||r.bottom>ar.bottom+1)out.over.push((e.textContent||e.className).slice(0,24)+' '+Math.round(Math.max(r.right-ar.right,ar.left-r.left,r.bottom-ar.bottom)))})});
    /* hidden overflow: a line whose content is wider than its box (winner line, l1) */
    R.querySelectorAll('.r9-l1,.r9-w').forEach(l=>{if(l.scrollWidth>l.clientWidth+1&&!l.classList.contains('r9-wc'))out.over.push('clip '+l.textContent.trim().slice(0,24))});
    const seen=new Set();R.querySelectorAll('.r9-pic img').forEach(i=>{const r=i.getBoundingClientRect();const k=i.src.split('/').pop().replace(/r\d+/,'rN').replace(/round-\d+-[a-z0-9-]+/,'poster');if(!r.width||seen.has(k))return;seen.add(k);
      const s=Math.min(i.naturalWidth/r.width,i.naturalHeight/r.height);out.imgs.push({f:k,css:Math.round(r.width)+'x'+Math.round(r.height),src:i.naturalWidth+'x'+i.naturalHeight,x:+s.toFixed(2)})});
    /* dead space: the empty area of the grid's first two rows (beside and under the hero) */
    const g=R.querySelector('.r9-g'),gr=g.getBoundingClientRect(),h=R.querySelector('.r9-hero').getBoundingClientRect();let filled=0;const kids=[...g.children];const rowsBottom=Math.max(...kids.slice(0,7).map(k=>k.getBoundingClientRect().bottom));
    kids.slice(0,7).forEach(k=>{const r=k.getBoundingClientRect();filled+=r.width*r.height});out.heroH=Math.round(h.height);out.firstBlock=Math.round(rowsBottom-gr.top);
    out.cover=+(filled/(gr.width*(rowsBottom-gr.top))).toFixed(3);
    out.items=R.querySelectorAll('.r9-g>a').length;out.moreTxt=(R.querySelector('.r9-more')||{}).textContent;out.hero=window.__r9&&window.__r9.hero;return out});
  if(t!=='now'&&W===390&&!id.includes('+')){const a=await p.$('.r9 a.r9-it');if(a){const href=await a.getAttribute('href');await a.click({force:true});await p.waitForTimeout(1500);m.tap={href,hash:await p.evaluate(()=>location.hash),opened:await p.evaluate(()=>{const e=[document.getElementById('x2pRm'),document.querySelector('.rmod')].find(e=>e&&getComputedStyle(e).display!=='none'&&e.getBoundingClientRect().height>50);return e?(e.textContent.match(/Round \d+/)||[e.id||e.className])[0]:false})}}}
  m.errors=er;res[W+'-'+id]=m;console.log(W,id,JSON.stringify(m));await ctx.close()}
 fs.writeFileSync(OUT+'/measure-'+IDS.join('')+'-'+WS.join('_')+'.json',JSON.stringify(res,null,1));await b.close()})();
