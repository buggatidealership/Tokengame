// node run.js <outdir> <ids> [widths 390,1280] [dpr 2]   (serve ez/ on 8961: cd ez && python3 -m http.server 8961)
// ids: now | now:pnl | <take> | <take>:pnl | <take>:pnl:d7 . Lays _s25.css/_s25.js + <take>.css/.js over the built v46-live-x2plus.html,
// mounts P5.mountProof(P5.take) (the live engine in x2p_more.js), shoots #learn as <id>-<W>.png, prints the measurements.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],IDS=process.argv[3].split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number),DPR=+(process.argv[5]||2);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.existsSync(__dirname+'/'+f)?fs.readFileSync(__dirname+'/'+f,'utf8'):'';
(async()=>{const b=await chromium.launch();const res={};
 for(const W of WS)for(const id of IDS){const [tk,view,win]=id.split(':');
  const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:DPR,reducedMotion:process.env.MOTION?'no-preference':'reduce'});const p=await ctx.newPage();await FONTS(p);
  await p.route('**/media/s25-*',r=>{const f=__dirname+'/out/'+r.request().url().split('/').pop().split('?')[0];r.fulfill({path:f,contentType:f.endsWith('.png')?'image/png':f.endsWith('.webp')?'image/webp':'image/jpeg'})});
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push('c:'+m.text().slice(0,160))});
  await p.goto('http://localhost:8961/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
  await p.waitForFunction(()=>window.P5&&P5.cur,null,{timeout:60000});await p.waitForTimeout(600);
  await p.addStyleTag({content:'.p5-sr{clip-path:inset(50%)}'});
  if(tk!=='now'){await p.addStyleTag({content:rd('_s25.css')+rd(tk+'.css')});await p.addScriptTag({content:rd('_s25.js')+rd(tk+'.js')});
   await p.evaluate(()=>S25.mount(P5.take))}
  if(view||win)await p.evaluate(([v,w])=>{P5.cur.V.view=v||'acc';if(w)P5.cur.V.win=w;P5.cur.draw()},[view,win]);
  await p.evaluate(()=>document.querySelector('#learn').scrollIntoView());await p.waitForTimeout(400);
  await p.waitForFunction(()=>document.fonts.status==='loaded');
  await p.evaluate(()=>[...document.images].forEach(i=>i.loading='eager'));await p.waitForTimeout(+(process.env.WAIT||1800));
  await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const ps=getComputedStyle(x).position;if(ps==='fixed'||ps==='sticky')x.style.visibility='hidden'})});
  const bx=await p.evaluate(()=>{const r=document.querySelector('#learn').getBoundingClientRect();return {x:r.left,y:r.top+scrollY,w:r.width,h:r.height}});
  await p.screenshot({path:`${OUT}/${id.replace(/:/g,'-')}-${W}.png`,clip:{x:W<600?0:bx.x,y:bx.y,width:W<600?W:bx.w,height:Math.min(bx.h,5000)},fullPage:true});
  const m=await p.evaluate(()=>{const c=document.createElement('canvas').getContext('2d');const cap=f=>{c.font='100px '+f;return c.measureText('H').actualBoundingBoxAscent/100};
    const out={sw:document.documentElement.scrollWidth,vw:innerWidth,secH:Math.round(document.querySelector('#learn').getBoundingClientRect().height),minCap:99,minT:'',stages:[]};
    document.querySelectorAll('#learn svg.p5-svg, #learn svg.s25-svg, #learn svg.s25-pl').forEach(svg=>{const vb=svg.viewBox.baseVal,r=svg.getBoundingClientRect(),k=Math.max(r.width/vb.width,r.height/vb.height);
      const im=svg.querySelector('image');const st={cssW:+r.width.toFixed(0),cssH:+r.height.toFixed(0)};out.stages.push(st);
      svg.querySelectorAll('text').forEach(t=>{if(!t.textContent.trim())return;const fs=+t.getAttribute('font-size'),ff=(t.getAttribute('font-family')||'Anton').split(',')[0];
        const ch=fs*cap(ff)*k;if(ch<out.minCap){out.minCap=+ch.toFixed(1);out.minT=t.textContent.slice(0,28)}})});
    document.querySelectorAll('#learn .p5 *').forEach(e=>{if(e.closest('svg')||e.closest('.p5-sr'))return;const tn=[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim());if(!tn)return;const cs=getComputedStyle(e);if(cs.display==='none'||cs.visibility==='hidden'||e.getBoundingClientRect().width<2)return;
      const ch=parseFloat(cs.fontSize)*cap(cs.fontFamily.split(',')[0].replace(/"/g,''));if(ch<out.minCap){out.minCap=+ch.toFixed(1);out.minT=e.textContent.trim().slice(0,28)}});
    return out});
  m.errors=er;res[id+'@'+W]=m;console.log(id,W,JSON.stringify(m));await ctx.close()}
 fs.writeFileSync(OUT+'/measure-'+IDS.join('_').replace(/:/g,'-')+'.json',JSON.stringify(res,null,1));await b.close()})();
