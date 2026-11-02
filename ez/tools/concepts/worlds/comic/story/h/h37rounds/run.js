// node run.js <out dir> <ids now,A,B,C,D,E> [widths 390,320,1280] [dpr 3]   (serves ez/ on PORT, default 8937; the page is the scratch snapshot SNAP)
// Lays _h37.css + _h37.js (window.__H37=<id>) over the built v46-live-x2plus.html and shoots the section (sec-<W>-<id>.png),
// then lifts one slab of "every other round" with a touch tap (or hover on desktop) and shoots the tag (lift-<W>-<id>.png).
// Prints: section height, sideways scroll, errors, label collisions (any two label parts overlapping, or a part outside its label),
// smallest label type, slabs shown, whether a second tap opens the round.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],IDS=(process.argv[3]||'A').split(','),WS=(process.argv[4]||'390,320,1280').split(',').map(Number),DPR=+(process.argv[5]||3),PORT=process.env.PORT||8937;
const SNAP=process.env.SNAP||'/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/h37rounds/v46-snap.html';fs.mkdirSync(OUT,{recursive:true});
const css=fs.readFileSync(__dirname+'/_h37.css','utf8'),js=fs.readFileSync(__dirname+'/_h37.js','utf8');
(async()=>{const b=await chromium.launch();const res={};
 for(const W of WS)for(const id of IDS){const ph=W<600;
  const ctx=await b.newContext({viewport:{width:W,height:ph?844:900},deviceScaleFactor:ph?DPR:1,hasTouch:ph,isMobile:ph,reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
  await p.route(/v46-live-x2plus\.html/,r=>r.fulfill({contentType:'text/html',body:fs.readFileSync(SNAP)}));
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push('c:'+m.text().slice(0,140))});
  const miss=[];p.on('response',r=>{if(r.status()>=400&&/h37rounds|media\//.test(r.url()))miss.push(r.status()+' '+r.url().split('/').pop())});
  await p.goto(`http://127.0.0.1:${PORT}/v46-live-x2plus.html`,{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&window.__x2pMagApi,null,{timeout:120000});await p.waitForTimeout(600);
  if(id!=='now'){await p.addStyleTag({content:css});await p.evaluate(t=>{window.__H37=t},id);await p.addScriptTag({content:js});await p.waitForFunction(()=>window.__h37,null,{timeout:30000})}
  if(process.env.MORE&&id!=='now')await p.evaluate(()=>{const m=document.querySelector('#h37 [data-more]');m&&m.click()});
  await p.waitForFunction(()=>document.fonts.status==='loaded');
  const SEL=id==='now'?'#x2pMag':'#h37';
  await p.evaluate(s=>{document.querySelector(s).scrollIntoView();document.querySelectorAll(s+' img').forEach(i=>i.loading='eager')},SEL);
  await p.waitForFunction(s=>[...document.querySelectorAll(s+' img')].every(i=>i.complete),SEL,{timeout:60000}).catch(()=>{});await p.waitForTimeout(700);
  await p.evaluate(()=>{window.__h37&&document.fonts.ready.then(()=>{});[...document.body.querySelectorAll('*')].forEach(x=>{const s=getComputedStyle(x).position;if((s==='fixed'||s==='sticky')&&!x.closest('#h37,#x2pMag'))x.style.setProperty('display','none','important')})});
  await p.waitForTimeout(300);
  const box=await p.evaluate(s=>{const e=document.querySelector(s),r=e.getBoundingClientRect();return {y:r.top+scrollY,h:r.height}},SEL);
  await p.screenshot({path:`${OUT}/sec-${W}-${id}.png`,clip:{x:0,y:Math.max(0,box.y-8),width:W,height:Math.min(box.h+16,16000)},fullPage:true,type:'png'});
  const m=await p.evaluate(s=>{const R=document.querySelector(s),o={sw:document.documentElement.scrollWidth,vw:innerWidth,secH:Math.round(R.getBoundingClientRect().height)};
    const labs=[...R.querySelectorAll('.h7-lb,.m7-lab')].filter(l=>l.getBoundingClientRect().width>0);o.labels=labs.length;o.coll=[];o.minFs=99;
    labs.forEach(L=>{const lr=L.getBoundingClientRect();const parts=[...L.querySelectorAll('.h7-nm,.h7-tk,.h7-ds,.h7-gr,.m7-nm,.m7-ds,.m7-gr,.m7-no,.m7-y')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&getComputedStyle(e).display!=='none'});
      const rects=parts.map(e=>{const rg=document.createRange();rg.selectNodeContents(e);const rs=[...rg.getClientRects()];const u=rs.reduce((a,r)=>({l:Math.min(a.l,r.left),t:Math.min(a.t,r.top),r:Math.max(a.r,r.right),b:Math.max(a.b,r.bottom)}),{l:1e9,t:1e9,r:-1e9,b:-1e9});
        const eb=e.getBoundingClientRect();u.l=Math.max(u.l,eb.left);u.r=Math.min(u.r,eb.right);u.t=eb.top;u.b=eb.bottom;return {e,u}});
      rects.forEach(({e,u})=>{o.minFs=Math.min(o.minFs,parseFloat(getComputedStyle(e).fontSize));const d=Math.max(u.r-lr.right,lr.left-u.l,u.b-lr.bottom,lr.top-u.t);if(d>1.5)o.coll.push('out '+e.className+' '+(e.textContent||'').slice(0,14)+' '+d.toFixed(1));
        if(e.scrollWidth>e.clientWidth+1)o.coll.push('clip '+(e.textContent||'').slice(0,16))});
      for(let i=0;i<rects.length;i++)for(let j=i+1;j<rects.length;j++){const a=rects[i].u,c=rects[j].u;const ox=Math.min(a.r,c.r)-Math.max(a.l,c.l),oy=Math.min(a.b,c.b)-Math.max(a.t,c.t);
        if(ox>1&&oy>1&&!rects[i].e.contains(rects[j].e)&&!rects[j].e.contains(rects[i].e))o.coll.push('overlap '+rects[i].e.className+'/'+rects[j].e.className+' '+(L.textContent||'').slice(0,20))}});
    o.coll=[...new Set(o.coll)].slice(0,12);o.slabs=R.querySelectorAll('.h7-sl,.m7-sl').length;
    const sl=[...R.querySelectorAll('.h7-sub ~ * .h7-sl, .h7-salon .h7-sl, .h7-flat .h7-sl, .h7-pk9 .h7-sl, .h7-tin .h7-sl, .h7-rack .h7-sh:not(.h7-m7) .h7-sl, .m7-flip .m7-sl')].filter(e=>e.getBoundingClientRect().width>0);
    o.restW=sl.length?Math.round(Math.min(...sl.map(e=>e.getBoundingClientRect().width))):0;return o},SEL);
  // the lift: one slab of every other round, near the right edge (the tag must stay on screen)
  const ITSEL=id==='now'?'.m7-flip li':'#h37 .h7-it';
  const target=await p.evaluate(s=>{const R=[...document.querySelectorAll(s)].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&!e.closest('.h7-hon,.h7-bay,.h7-es,.h7-m7,.h7-set')});
    const e=R[Math.min(R.length-1,2)];if(!e)return null;e.scrollIntoView({block:'center'});const a=e.querySelector('a');if(a)a.scrollIntoView({block:'center'});e.setAttribute('data-tgt','1');return e.getAttribute('data-n')||1},ITSEL);
  await p.waitForTimeout(500);
  if(target){const t=await p.$(`[data-tgt="1"] a`);if(ph){await t.tap({force:true});}else{await t.hover({force:true})}await p.waitForTimeout(450);
   const g=await p.evaluate(()=>{const e=document.querySelector('[data-tgt="1"]'),tg=e.querySelector('.h7-tag,.m7-tag'),r=e.getBoundingClientRect(),q=tg?tg.getBoundingClientRect():r;return {x:Math.min(r.left,q.left),y:Math.min(r.top,q.top),x2:Math.max(r.right,q.right),y2:Math.max(r.bottom,q.bottom),tl:q.left,tr:q.right,vis:tg?getComputedStyle(tg).visibility:'',lifted:e.classList.contains('h7-lift')||e.classList.contains('m7-lift')}});
   m.tag={inside:g.tl>=0&&g.tr<=W,vis:g.vis,lifted:g.lifted};
   const pad=40;await p.screenshot({path:`${OUT}/lift-${W}-${id}.png`,clip:{x:Math.max(0,g.x-pad),y:Math.max(0,g.y-pad),width:Math.min(W-Math.max(0,g.x-pad),g.x2-g.x+pad*2),height:g.y2-g.y+pad*2}});
   if(ph){await t.tap({force:true});await p.waitForTimeout(1500);m.tag.second=await p.evaluate(()=>{const e=document.getElementById('x2pRm');return e&&getComputedStyle(e).display!=='none'&&e.getBoundingClientRect().height>100?(e.textContent.match(/Round \d+ · [^(]+\([^)]+\)/)||['open'])[0]:location.hash})}}
  m.errors=er;m.miss=[...new Set(miss)].slice(0,6);res[W+'-'+id]=m;console.log(W,id,JSON.stringify(m));await ctx.close()}
 fs.writeFileSync(OUT+'/measure-'+IDS.join('')+'-'+WS.join('_')+'.json',JSON.stringify(res,null,1));await b.close()})();
