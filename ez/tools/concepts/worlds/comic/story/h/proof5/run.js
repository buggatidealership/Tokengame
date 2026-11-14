// node run.js <outdir> <ids> [widths 390,1280] [dpr 2]   (serve ez/ on 8954 first: cd ez && python3 -m http.server 8954)
// ids: now | t1 | t1:pnl | t1:pnl:d7 | c1 ... Lays _p5.css/_p5.js + <take>.css/.js over the built v46-live-x2plus.html (media/p5-* routed to out/),
// shoots #learn (takes) or #get (closes) as <id>-<W>.png and prints the H23 tests (cap heights, resolution, errors, sideways scroll).
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],IDS=process.argv[3].split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number),DPR=+(process.argv[5]||2);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.existsSync(__dirname+'/'+f)?fs.readFileSync(__dirname+'/'+f,'utf8'):'';
(async()=>{const b=await chromium.launch();const res={};
 for(const W of WS)for(const id of IDS){const [tk,view,win]=id.split(':');const close=tk[0]==='c'||tk==='nowget';
  const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:DPR,reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
  await p.route('**/media/p5-*',r=>{const f=__dirname+'/out/'+r.request().url().split('/').pop();r.fulfill({path:f,contentType:'image/jpeg'})});
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push('c:'+m.text().slice(0,160))});
  await p.goto('http://localhost:8954/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(600);
  if(!tk.startsWith('now')){await p.addStyleTag({content:rd('_p5.css')+rd(tk+'.css')});await p.addScriptTag({content:rd('_p5.js')+rd(tk+'.js')});
   await p.evaluate(([c,v,w])=>{c?P5.mountClose(P5.take):P5.mountProof(P5.take);if(!c&&(v||w)){P5.cur.V.view=v||'acc';if(w)P5.cur.V.win=w;P5.cur.draw()}},[close,view,win])}
  const sel=close?'#get':'#learn';
  await p.evaluate(s=>document.querySelector(s).scrollIntoView(),sel);await p.waitForTimeout(400);
  await p.waitForFunction(()=>document.fonts.status==='loaded');
  await p.evaluate(()=>[...document.images].forEach(i=>i.loading='eager'));
  await p.waitForFunction(()=>[...document.querySelectorAll('svg image')].every(i=>{const r=i.getBBox();return true}));await p.waitForTimeout(1500);
  await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const ps=getComputedStyle(x).position;if(ps==='fixed'||ps==='sticky')x.style.visibility='hidden'})});
  const bx=await p.evaluate(s=>{const r=document.querySelector(s).getBoundingClientRect();return {y:r.top+scrollY,h:r.height}},sel);
  await p.screenshot({path:`${OUT}/${id.replace(/:/g,'-')}-${W}.png`,clip:{x:0,y:bx.y,width:W,height:Math.min(bx.h,4000)},fullPage:true});
  const m=await p.evaluate(()=>{const c=document.createElement('canvas').getContext('2d');const cap=f=>{c.font='100px '+f;return c.measureText('H').actualBoundingBoxAscent/100};
    const out={sw:document.documentElement.scrollWidth,vw:innerWidth,stages:[]};
    document.querySelectorAll('.p5-svg').forEach(svg=>{const vb=svg.viewBox.baseVal,r=svg.getBoundingClientRect(),k=Math.max(r.width/vb.width,r.height/vb.height);
      const img=svg.querySelector('image');const st={cssW:+r.width.toFixed(0),k:+k.toFixed(3),srcShown:null,minCap:99,minT:''};
      st.srcShown=Math.round(1800/1000*vb.width);st.need3x=Math.ceil(r.width*3);
      svg.querySelectorAll('text').forEach(t=>{if(!t.textContent.trim())return;const fs=+t.getAttribute('font-size'),ff=(t.getAttribute('font-family')||'Anton').split(',')[0];
        const ch=fs*cap(ff)*k;if(ch<st.minCap){st.minCap=+ch.toFixed(1);st.minT=t.textContent.slice(0,24)}});out.stages.push(st)});return out});
  m.errors=er;res[id+'@'+W]=m;console.log(id,W,JSON.stringify(m));await ctx.close()}
 fs.writeFileSync(OUT+'/measure-'+IDS.join('_').replace(/:/g,'-')+'.json',JSON.stringify(res,null,1));await b.close()})();
