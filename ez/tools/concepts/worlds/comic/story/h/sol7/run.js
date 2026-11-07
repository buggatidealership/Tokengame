// node run.js <outdir> <ids> [widths 390,1280] [dpr 2]   (serve ez/: cd ez && python3 -m http.server 8963)
// ids: now | <take> | <take>:pnl | <take>:pnl:d7 | b:cal (B's first beat). Lays _s7.css/_s7.js + <take>.css/.js over the built
// v46-live-x2plus.html, mounts it through the live P5 engine, shoots #learn as <id>-<W>.png, prints the measurements.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],IDS=process.argv[3].split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number),DPR=+(process.argv[5]||2),PORT=process.env.PORT||8963;fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.existsSync(__dirname+'/'+f)?fs.readFileSync(__dirname+'/'+f,'utf8'):'';
(async()=>{const b=await chromium.launch();const res={};
 for(const W of WS)for(const id of IDS){const [tk,view,win]=id.split(':');
  const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:DPR,reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
  await p.route('**/media/s7-*',r=>{const f=__dirname+'/img/'+r.request().url().split('/').pop().split('?')[0];r.fulfill({path:f,contentType:'image/jpeg'})});
  await p.route('**/media/s25-coin.jpg',r=>r.fulfill({path:__dirname+'/../sol6/h25/out/s25-coin.jpg',contentType:'image/jpeg'}));
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push('c:'+m.text().slice(0,160))});
  await p.goto(`http://localhost:${PORT}/v46-live-x2plus.html`,{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
  await p.waitForFunction(()=>window.P5&&P5.cur,null,{timeout:60000});await p.waitForTimeout(600);
  if(tk!=='now'){await p.addStyleTag({content:rd('_s7.css')+rd(tk+'.css')});await p.addScriptTag({content:rd('_s7.js')+rd(tk+'.js')});
   await p.evaluate(()=>S7.mount(P5.take))}
  if(view==='cal')await p.evaluate(()=>window.S7&&S7.setCal&&S7.setCal(true));
  else if(view||win)await p.evaluate(([v,w])=>{P5.cur.V.view=v||'acc';if(w)P5.cur.V.win=w;P5.cur.draw()},[view,win]);
  if(view!=='cal')await p.evaluate(()=>window.S7&&S7.setCal&&S7.setCal(false));
  await p.evaluate(()=>document.querySelector('#learn').scrollIntoView());await p.waitForTimeout(400);
  await p.waitForFunction(()=>document.fonts.status==='loaded');
  await p.evaluate(()=>[...document.images].forEach(i=>i.loading='eager'));await p.waitForTimeout(+(process.env.WAIT||1500));
  if(view==='cal')await p.evaluate(()=>window.S7&&S7.setCal&&S7.setCal(true));
  await p.addStyleTag({content:'.x2p-cw{display:none!important}'});await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{if(x.closest('#learn'))return;const ps=getComputedStyle(x).position;if(ps==='fixed'||ps==='sticky')x.style.setProperty('visibility','hidden','important')})});
  const bx=await p.evaluate(()=>{const r=document.querySelector('#learn').getBoundingClientRect();return {x:r.left,y:r.top+scrollY,w:r.width,h:r.height}});
  const m=await p.evaluate(()=>{const c=document.createElement('canvas').getContext('2d');const cap=f=>{c.font='100px '+f;return c.measureText('H').actualBoundingBoxAscent/100};
    const L=document.querySelector('#learn'),lr=L.getBoundingClientRect();
    const out={sw:document.documentElement.scrollWidth,vw:innerWidth,secH:Math.round(lr.height),minCap:99,minT:'',stages:[],over:[]};
    L.querySelectorAll('svg.s7-svg').forEach(svg=>{const vb=svg.viewBox.baseVal,r=svg.getBoundingClientRect(),k=Math.min(r.width/vb.width,r.height/vb.height);
      out.stages.push({cssW:+r.width.toFixed(0),cssH:+r.height.toFixed(0)});
      svg.querySelectorAll('text').forEach(t=>{if(!t.textContent.trim())return;const fs=+t.getAttribute('font-size'),ff=(t.getAttribute('font-family')||'Anton').split(',')[0];
        [t,...t.querySelectorAll('tspan[font-size]')].forEach(e=>{const s=+(e.getAttribute('font-size')||fs);const ch=s*cap(ff)*k;if(ch<out.minCap){out.minCap=+ch.toFixed(1);out.minT=e.textContent.slice(0,28)}});
        /* nothing on the glass runs past the stage */
        const b=t.getBoundingClientRect();if(b.left<r.left-0.5||b.right>r.right+0.5)out.over.push(t.textContent.slice(0,20))})});
    L.querySelectorAll('.p5 *').forEach(e=>{if(e.closest('svg')||e.closest('.p5-sr'))return;const tn=[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim());if(!tn)return;const cs=getComputedStyle(e);if(cs.display==='none'||cs.visibility==='hidden'||e.getBoundingClientRect().width<2)return;
      const ch=parseFloat(cs.fontSize)*cap(cs.fontFamily.split(',')[0].replace(/"/g,''));if(ch<out.minCap){out.minCap=+ch.toFixed(1);out.minT=e.textContent.trim().slice(0,28)}
      if(e.scrollWidth>e.clientWidth+1&&cs.overflow!=='visible')out.over.push(e.textContent.trim().slice(0,20))});
    out.buttons=[...L.querySelectorAll('.p5 button')].filter(b=>b.getBoundingClientRect().width>0).map(b=>{const r=b.getBoundingClientRect();return (b.textContent.trim()||b.getAttribute('aria-label'))+' '+Math.round(r.width)+'x'+Math.round(r.height)});
    return out});
  await p.screenshot({path:`${OUT}/${id.replace(/:/g,'-')}-${W}.png`,clip:{x:W<600?0:bx.x,y:bx.y,width:W<600?W:bx.w,height:Math.min(bx.h,5000)},fullPage:true});
  m.errors=er;res[id+'@'+W]=m;console.log(id,W,JSON.stringify(m));await ctx.close()}
 fs.writeFileSync(OUT+'/measure-'+IDS.join('_').replace(/:/g,'-')+'.json',JSON.stringify(res,null,1));await b.close()})();
