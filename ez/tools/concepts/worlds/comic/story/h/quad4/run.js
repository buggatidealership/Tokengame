// node run.js <out> <ids now,q4> [widths 390,1280] [dpr 2]: serve ez/ on port 8954 first (cd ez && python3 -m http.server 8954).
// Lays _q4.css + _q4.js over the built v46-live-x2plus.html (media/top-h23-* routed to quad4/out/), shoots the top (fr-<W>-<id>.png = "How a round works"
// + the four frames) and prints the H23 tests 1, 2, 6 (+ page checks) as JSON.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],IDS=(process.argv[3]||'now,q4').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number),DPR=+(process.argv[5]||2);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();const res={};
 for(const W of WS)for(const id of IDS){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:DPR,reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
  await p.route('**/media/top-h23-*',r=>{const f=__dirname+'/out/'+r.request().url().split('/').pop();r.fulfill({path:f,contentType:'image/jpeg'})});
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('c:'+m.text().slice(0,120))});
  await p.goto('http://localhost:8954/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(800);
  if(id==='now')await p.evaluate(()=>window.__t5&&__t5.all('on'));
  else{await p.addStyleTag({content:rd('_q4.css')});await p.addScriptTag({content:rd('_q4.js')});await p.waitForFunction(()=>document.querySelector('.q4-fr'),null,{timeout:30000})}
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.evaluate(()=>[...document.images].forEach(i=>i.loading='eager'));
  await p.waitForFunction(()=>[...document.querySelectorAll('.t4 img')].every(i=>i.complete));await p.evaluate(()=>window.__t5&&__t5.place());await p.waitForTimeout(700);
  await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{if(getComputedStyle(x).position==='fixed')x.style.visibility='hidden'})});
  const e2=await p.evaluate(()=>{const h=document.querySelector('.t4-b2'),r=h.getBoundingClientRect();return {y:r.top+scrollY-4,h:r.height+8}});
  await p.screenshot({path:`${OUT}/fr-${W}-${id}.png`,clip:{x:0,y:e2.y,width:W,height:e2.h},fullPage:true});
  if(id!=='now'){const bx=await p.evaluate(y0=>[...document.querySelectorAll('.t4-b2 .t4-fr')].map(f=>{const r=f.querySelector('.t4-pic').getBoundingClientRect();return [f.querySelector('.t5-w').textContent,[r.left,r.top+scrollY-y0,r.right,r.bottom+scrollY-y0]]}),e2.y);fs.writeFileSync(`${OUT}/boxes.json`,JSON.stringify(bx))}
  const m=await p.evaluate(()=>{const c=document.createElement('canvas').getContext('2d');c.font='100px Anton';const capR=c.measureText('H').actualBoundingBoxAscent/100;
    const out={sw:document.documentElement.scrollWidth,vw:innerWidth,capR:+capR.toFixed(3),frames:[]};
    document.querySelectorAll('.t4-b2 .t4-fr').forEach(f=>{const pic=f.querySelector('.t4-pic'),img=pic.querySelector('img'),pr=pic.getBoundingClientRect(),cw=+pic.dataset.iw,k=pr.width/cw;
      const fr={k:f.className.match(/(q4|t4)-(call|close|ledger|board|bell|one)/)[0],cssW:+pr.width.toFixed(1),cssH:+pr.height.toFixed(1),srcW:img.naturalWidth,shownSrcW:+(img.naturalWidth*pr.width/img.getBoundingClientRect().width).toFixed(0),texts:[]};
      fr.need3x=Math.ceil(pr.width*3);fr.t1=fr.shownSrcW>=fr.need3x;
      f.querySelectorAll('.t4-sf').forEach(s=>{const q=JSON.parse(s.dataset.q),bh=+s.dataset.bh,L=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]),sv=(L(q[0],q[3])+L(q[1],q[2]))/2*k/bh;
        s.querySelectorAll('text').forEach(t=>{if(!t.textContent.trim())return;const fs=+t.getAttribute('font-size');fr.texts.push({t:t.textContent,cap:+(fs*capR*sv).toFixed(1)})})});
      fr.minCap=fr.texts.length?Math.min(...fr.texts.map(x=>x.cap)):null;
      // test 6: the subject's quads (glass / lid) as a share of the frame
      let A=0;f.querySelectorAll('.t4-sf').forEach(s=>{if(s.classList.contains('q4-lip')||s.classList.contains('q4-sheen')||s.classList.contains('t4-strip'))return;const q=JSON.parse(s.dataset.q);let a=0;for(let i=0;i<4;i++){const[x1,y1]=q[i],[x2,y2]=q[(i+1)%4];a+=x1*y2-x2*y1}A+=Math.abs(a)/2});
      const ch=pr.height/k;fr.subjectShare=+(A/(cw*ch)).toFixed(3);out.frames.push(fr)});
    return out});
  m.errors=er;res[W+'-'+id]=m;console.log(W,id,JSON.stringify(m));await ctx.close()}
 fs.writeFileSync(OUT+'/measure.json',JSON.stringify(res,null,1));await b.close()})();
