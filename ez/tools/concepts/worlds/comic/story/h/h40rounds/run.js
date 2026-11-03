// node run.js <out dir> <ids now,A,B,C,D,E> [widths 390,320,1280] [dpr 3]   (serves ez/ on PORT, default 8941; the page is the scratch snapshot SNAP)
// Lays _h40.css + _h40.js (window.__H40=<id>) over the built v46-live-x2plus.html, shoots the section (sec-<W>-<id>.png) and runs THE GATE:
//  (a) every visible word and number, with its surface (texts-<W>-<id>.json);
//  (b) labels centred on their painted faces (±1px), repeated items sharing edges (±0.5px), nothing overflowing its surface, nothing under 8px;
//  (c) each surface's name and print process (from SURF below);  (d) no sideways scroll.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],IDS=(process.argv[3]||'A').split(','),WS=(process.argv[4]||'390,320,1280').split(',').map(Number),DPR=+(process.argv[5]||3),PORT=process.env.PORT||8941;
const SNAP=process.env.SNAP||'/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/h40rounds/v46-snap.html';fs.mkdirSync(OUT,{recursive:true});
const css=fs.readFileSync(__dirname+'/_h40.css','utf8'),js=fs.readFileSync(__dirname+'/_h40.js','utf8');
(async()=>{const b=await chromium.launch();const res={};
 for(const W of WS)for(const id of IDS){const ph=W<600;
  const ctx=await b.newContext({viewport:{width:W,height:ph?844:900},deviceScaleFactor:ph?DPR:1,hasTouch:ph,isMobile:ph,reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
  await p.route(/v46-live-x2plus\.html/,r=>r.fulfill({contentType:'text/html',body:fs.readFileSync(SNAP)}));
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push('c:'+m.text().slice(0,140))});
  const miss=[];p.on('response',r=>{if(r.status()>=400&&/h40rounds|media\//.test(r.url()))miss.push(r.status()+' '+r.url().split('/').pop())});
  await p.goto(`http://127.0.0.1:${PORT}/v46-live-x2plus.html`,{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&window.__x2pVit,null,{timeout:120000});await p.waitForTimeout(600);
  if(id!=='now'){await p.addStyleTag({content:css});await p.evaluate(t=>{window.__H40=t},id);await p.addScriptTag({content:js});await p.waitForFunction(()=>window.__h40||window.__h40Err,null,{timeout:30000})}
  if(process.env.OPEN&&id!=='now')await p.evaluate(s=>{s.split(',').forEach(q=>{const e=document.querySelector(q);e&&e.click()})},process.env.OPEN);
  await p.waitForFunction(()=>document.fonts.status==='loaded');
  const SEL=id==='now'?'#x2pVit':'#h40';
  await p.evaluate(s=>{document.querySelector(s).scrollIntoView();document.querySelectorAll(s+' img').forEach(i=>i.loading='eager')},SEL);
  await p.waitForFunction(s=>[...document.querySelectorAll(s+' img')].every(i=>i.complete),SEL,{timeout:60000}).catch(()=>{});await p.waitForTimeout(900);
  await p.evaluate(()=>{window.__h40&&window.__h40.fit();[...document.body.querySelectorAll('*')].forEach(x=>{const s=getComputedStyle(x).position;if((s==='fixed'||s==='sticky')&&!x.closest('#h40,#x2pVit'))x.style.setProperty('display','none','important')})});
  await p.addStyleTag({content:'body>div:has(>.x2p-cw-bug),.x2p-cw{display:none!important}'});await p.waitForTimeout(400);
  const box=await p.evaluate(s=>{const e=document.querySelector(s),r=e.getBoundingClientRect();return {y:r.top+scrollY,h:r.height}},SEL);
  await p.screenshot({path:`${OUT}/sec-${W}-${id}.png`,clip:{x:0,y:Math.max(0,box.y-8),width:W,height:Math.min(box.h+16,16000)},fullPage:true,type:'png'});
  const m=await p.evaluate(s=>{const R=document.querySelector(s);R.classList.add('h4-flat');const o={sw:document.documentElement.scrollWidth,vw:innerWidth,secH:Math.round(R.getBoundingClientRect().height)};
   // surfaces: selector, name, process, centred?
   const SURF=[['.vt-lb','slab label (printed card in the painted holder)','ink multiplied into the card',0],['.pa-pl','brass grade plate (painting gplate)','Anton engraved, multiplied',1],
    ['.pb-lab','pack wrapper label (painting packopen, blank cream panel)','Anton ink multiplied into the label',1],['.pb-slab','sealed pack label (painting pack)','ink multiplied, logo printed one ink',1],
    ['.pd-ink','ticker tape (painting tape)','Anton ink printed by the ticker, multiplied','x'],['.pe-np','screen nameplate (painting screen)','Anton engraved, multiplied',1],['.pe-ml','monitor label plate (painting mon)','Anton engraved, multiplied',1],
    ['.vt-plate','brass plate (live recipe)','Anton engraved',1],['.vt-tag','lift tag (live)','Shantell Sans, the live tag',0],['.m7-hd','heading and caption box (live)','Bangers / caption box',0],['.vt-card','drawer card holder (live)','Anton',1],['.pe-mg','monitor glass (painting mon)','Anton lit on the screen',1],['.vt-when','empty slab window','Anton',0]];
   const vis=e=>{for(let x=e;x&&x!==document.body;x=x.parentElement){const cs=getComputedStyle(x);if(cs.display==='none'||cs.visibility==='hidden'||+cs.opacity===0)return false}return e.getClientRects().length>0};
   const texts=[];const tw=document.createTreeWalker(R,NodeFilter.SHOW_TEXT);let n;const bySurf=new Map();
   // the ink box of a text node: the glyphs' own extent (canvas metrics on the element's font at the node's baseline), not the line box
   const cv=document.createElement('canvas').getContext('2d');
   const inkOf=n=>{const v=n.nodeValue,i0=v.search(/\S/),i1=v.length-(v.length-v.trimEnd().length);const g=document.createRange();g.setStart(n,i0);g.setEnd(n,i1);const rs=[...g.getClientRects()].filter(r=>r.width>0);if(!rs.length)return null;
     const e=n.parentElement,cs=getComputedStyle(e);if(rs.length>1)return {l:Math.min(...rs.map(r=>r.left)),r:Math.max(...rs.map(r=>r.right)),t:Math.min(...rs.map(r=>r.top)),b:Math.max(...rs.map(r=>r.bottom)),lines:rs.length};
     const r=rs[0];let t=v.slice(i0,i1);if(cs.textTransform==='uppercase')t=t.toUpperCase();cv.font=`${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;cv.letterSpacing=cs.letterSpacing==='normal'?'0px':cs.letterSpacing;
     const m=cv.measureText(t),fa=m.fontBoundingBoxAscent,fd=m.fontBoundingBoxDescent,k=r.height/(fa+fd),base=r.top+fa*k;
     return {l:r.left-m.actualBoundingBoxLeft,r:r.left+m.actualBoundingBoxRight,t:base-m.actualBoundingBoxAscent,b:base+m.actualBoundingBoxDescent,lines:1}};
   while(n=tw.nextNode()){if(!n.nodeValue.trim())continue;const e=n.parentElement;if(!vis(e))continue;const u=inkOf(n);if(!u)continue;
    let sf=null,si=-1;for(let i=0;i<SURF.length;i++){const c=e.closest(SURF[i][0]);if(c&&R.contains(c)&&(!sf||sf.contains(c))){sf=c;si=i}}
    const fs=parseFloat(getComputedStyle(e).fontSize);texts.push({t:n.nodeValue.trim().slice(0,40),fs:+fs.toFixed(2),surf:si<0?'NONE':SURF[si][1],proc:si<0?'':SURF[si][2],x:Math.round(u.l),y:Math.round(u.t+scrollY)});
    if(sf){if(!bySurf.has(sf))bySurf.set(sf,{i:si,u:[]});bySurf.get(sf).u.push(u)}}
   o.texts=texts;o.nTexts=texts.length;o.minFs=Math.min(...texts.map(t=>t.fs));o.noSurf=texts.filter(t=>t.surf==='NONE').map(t=>t.t).slice(0,10);
   o.small=[...new Set(texts.filter(t=>t.fs<8).map(t=>t.t))].slice(0,8);
   // centring and overflow per surface (ink measured with line boxes: the glyph box, the same for every take)
   o.offC=[];o.over=[];let nc=0;
   bySurf.forEach((v,sf)=>{const rr=sf.getBoundingClientRect(),U=v.u.reduce((a,u)=>({l:Math.min(a.l,u.l),r:Math.max(a.r,u.r),t:Math.min(a.t,u.t),b:Math.max(a.b,u.b)}),{l:1e9,r:-1e9,t:1e9,b:-1e9});
    if(SURF[v.i][3]){nc++;let V=U;sf.querySelectorAll('img').forEach(im=>{if(!vis(im))return;const q=im.getBoundingClientRect();V={l:Math.min(V.l,q.left),r:Math.max(V.r,q.right),t:Math.min(V.t,q.top),b:Math.max(V.b,q.bottom)}});
const dx=(V.l+V.r)/2-(rr.left+rr.right)/2,dy=SURF[v.i][3]==='x'?0:(V.t+V.b)/2-(rr.top+rr.bottom)/2;if(Math.abs(dx)>1||Math.abs(dy)>1)o.offC.push(`${SURF[v.i][0]} "${sf.textContent.trim().slice(0,22)}" dx ${dx.toFixed(2)} dy ${dy.toFixed(2)}`)}
    const d=Math.max(U.r-rr.right,rr.left-U.l,U.b-rr.bottom,rr.top-U.t);if(d>.5&&SURF[v.i][0]!=='.m7-hd'&&SURF[v.i][0]!=='.vt-tag')o.over.push(`${SURF[v.i][0]} "${sf.textContent.trim().slice(0,22)}" ${d.toFixed(2)}`)});
   o.centredSurfaces=nc;o.offC=o.offC.slice(0,12);o.over=o.over.slice(0,12);
   // slab label parts must not collide (the live rule)
   o.coll=[];R.querySelectorAll('.vt-lb').forEach(L=>{if(!vis(L))return;const lr=L.getBoundingClientRect();const parts=[...L.querySelectorAll('.vt-nm,.vt-tk,.vt-ds,.vt-gr')].filter(vis).map(e=>{const tn=[...e.childNodes].find(c=>c.nodeType===3&&c.nodeValue.trim());const u=tn&&inkOf(tn);return u?{e,u}:null}).filter(Boolean);
    for(let i=0;i<parts.length;i++)for(let j=i+1;j<parts.length;j++){const a=parts[i].u,c=parts[j].u;if(Math.min(a.r,c.r)-Math.max(a.l,c.l)>1&&Math.min(a.b,c.b)-Math.max(a.t,c.t)>1)o.coll.push((L.textContent||'').slice(0,24))}});
   o.coll=[...new Set(o.coll)].slice(0,8);
   // repeated items share edges: siblings in the same row of a grid/strip share top and height (±0.5) and width (±0.5)
   const GR=['.pa-tin','.pb-cg','.pb-grid','.pb-tin','.pc-jr','.pe-cg','.pe-fg','.pc-trk'];o.edge=[];let ng=0;
   GR.forEach(q=>R.querySelectorAll(q).forEach(g=>{const ks=[...g.children].filter(c=>vis(c)&&!c.classList.contains('pc-day')&&!c.classList.contains('pb-tray'));const rows={};
    ks.forEach(k=>{const r=k.getBoundingClientRect();const key=Math.round(r.top/20);(rows[key]=rows[key]||[]).push({k,r})});
    Object.values(rows).forEach(row=>{if(row.length<2)return;ng++;const sameCls=c=>c.k.className.replace(/vt-lift|pe-onm|pb-on/g,'').trim();
     const byC={};row.forEach(c=>{(byC[sameCls(c)]=byC[sameCls(c)]||[]).push(c)});Object.values(byC).forEach(cs=>{if(cs.length<2)return;const r0=cs[0].r;
      cs.forEach(c=>{const bad=[];if(q!=='.pc-trk'&&Math.abs(c.r.top-r0.top)>.5)bad.push('top');if(Math.abs(c.r.bottom-r0.bottom)>.5)bad.push('bottom');if(Math.abs(c.r.width-r0.width)>.5)bad.push('width');if(bad.length)o.edge.push(q+' '+bad.join('/')+' '+(c.k.textContent||'').trim().slice(0,16))})})})}));
   o.edgeRows=ng;o.edge=[...new Set(o.edge)].slice(0,10);
   // inner scrollers (a carousel must not be a vertical scroller: the live SCROLLFIX rule)
   o.vscroll=[...R.querySelectorAll('*')].filter(e=>{const cs=getComputedStyle(e);return /auto|scroll/.test(cs.overflowY)&&e.scrollHeight>e.clientHeight+1}).map(e=>e.className).slice(0,4);
   o.links=R.querySelectorAll('a[href^="#/round/"]').length;R.classList.remove('h4-flat');return o},SEL);
  fs.writeFileSync(`${OUT}/texts-${W}-${id}.json`,JSON.stringify(m.texts,null,0));delete m.texts;
  m.errors=er;m.miss=[...new Set(miss)].slice(0,6);res[W+'-'+id]=m;console.log(W,id,JSON.stringify(m));await ctx.close()}
 fs.writeFileSync(OUT+'/measure-'+IDS.join('')+'-'+WS.join('_')+'.json',JSON.stringify(res,null,1));await b.close()})();
