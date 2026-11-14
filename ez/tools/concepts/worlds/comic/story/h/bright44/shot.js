// node shot.js <outdir> <ids now,A,B> <widths 390,1280> : full Overview page shots (page-<W>-<id>.jpg) with bright.css (window.__BR=<id>) laid over the
// snapshot of the built X2+ page, plus the gate (contrast per text on its measured ground, sizes, sideways scroll) -> gate-<W>-<id>.json
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],IDS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390').split(',').map(Number),PORT=process.env.PORT||8961,DPR=+(process.env.DPR||2);
const SNAP=process.env.SNAP||'/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/b44/v46-snap.html';fs.mkdirSync(OUT,{recursive:true});
const css=fs.readFileSync(__dirname+'/bright.css','utf8')+'\n'+fs.readFileSync(__dirname+'/s2.css','utf8'),js=fs.readFileSync(__dirname+'/bright.js','utf8');
(async()=>{const b=await chromium.launch();
for(const W of WS)for(const id of IDS){const ph=W<600;const ctx=await b.newContext({viewport:{width:W,height:ph?844:900},deviceScaleFactor:ph?DPR:1,isMobile:ph,hasTouch:ph,reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
 await p.route(/v46-live-x2plus\.html/,r=>r.fulfill({contentType:'text/html',body:fs.readFileSync(SNAP)}));
 const er=[];p.on('pageerror',e=>er.push(e.message));
 await p.goto(`http://127.0.0.1:${PORT}/v46-live-x2plus.html`,{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(1200);
 if(id!=='now'){await p.evaluate(t=>{window.__BR=t},id);await p.addStyleTag({content:css});await p.addScriptTag({content:js});await p.waitForFunction(()=>window.__br||window.__brErr,null,{timeout:30000});
  const E=await p.evaluate(()=>window.__brErr&&String(window.__brErr.stack||window.__brErr));if(E)console.log('ERR',E)}
 // load everything lazily held, walk the page so on-view things build
 await p.evaluate(async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');for(let y=0;y<document.documentElement.scrollHeight;y+=500){scrollTo(0,y);await new Promise(r=>setTimeout(r,60))}scrollTo(0,0)});
 await p.waitForFunction(()=>[...document.images].every(i=>i.complete),null,{timeout:60000}).catch(()=>{});await p.waitForTimeout(1500);
 await p.evaluate(()=>{window.__br&&window.__br.fit&&window.__br.fit();[...document.body.querySelectorAll('*')].forEach(x=>{const s=getComputedStyle(x).position;if(s==='fixed'&&!x.closest('header'))x.style.setProperty('display','none','important')})});
 await p.addStyleTag({content:'.x2p-cw,.x2p-vmini{display:none!important}'});await p.waitForTimeout(500);await p.evaluate(()=>window.__br&&window.__br.fit&&window.__br.fit());await p.waitForTimeout(200);
 let H=await p.evaluate(()=>document.documentElement.scrollHeight);
 await p.setViewportSize({width:W,height:Math.min(H,16000)});await p.waitForTimeout(900);await p.evaluate(()=>window.__br&&window.__br.fit&&window.__br.fit());await p.waitForTimeout(300);H=await p.evaluate(()=>document.documentElement.scrollHeight);
 await p.screenshot({path:`${OUT}/page-${W}-${id}.png`,fullPage:true,clip:{x:0,y:0,width:W,height:H},type:'png'});
 // THE GATE (contrast measured on the pixels): every shown text's ink box, colour and section; then the same page with every glyph made
 // transparent is shot, and gate.py reads each box's ground from those pixels (paintings and grounds alike)
 const g=await p.evaluate(()=>{const st=document.createElement('style');st.textContent='*{pointer-events:auto!important}';document.head.appendChild(st);
  const vis=e=>{for(let x=e;x&&x!==document.body;x=x.parentElement){const cs=getComputedStyle(x);if(cs.display==='none'||cs.visibility==='hidden'||+cs.opacity<.05)return false}return e.getClientRects().length>0};
  const secOf=e=>{const s=e.closest('main > section');if(s)return s.id||(s.classList.contains('ch')?'ch':s.classList.contains('t4')?'top':s.className.split(' ')[0]);return e.closest('header')?'header':e.closest('footer')?'footer':'other'};
  const out=[];const tw=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
  while(n=tw.nextNode()){const t=n.nodeValue.trim();if(!t)continue;const e=n.parentElement;if(!e||e.closest('script,style,#brG'))continue;if(!vis(e))continue;
   const rg=document.createRange();rg.selectNodeContents(n);const rs=[...rg.getClientRects()].filter(r=>r.width>1&&r.height>1);if(!rs.length)continue;
   const r=rs[0];const cx=r.left+r.width/2,cy=r.top+r.height/2;if(cx<0||cx>innerWidth||cy<0)continue;const hit=document.elementsFromPoint(cx,cy);if(!hit.some(h=>h===e||e.contains(h)||h.contains(e)&&h!==document.body&&h!==document.documentElement&&hit.indexOf(h)<=hit.indexOf(e)))continue;if(!hit.includes(e)&&!hit.some(h=>e.contains(h)))continue;
   const cs=getComputedStyle(e);const fs=parseFloat(cs.fontSize);out.push({sec:secOf(e),t:t.slice(0,36),fs:+fs.toFixed(1),fw:+cs.fontWeight,font:cs.fontFamily.split(',')[0].replace(/"/g,''),col:cs.color,fill:cs.webkitTextFillColor,stroke:parseFloat(cs.webkitTextStrokeWidth)||0,strokeCol:cs.webkitTextStrokeColor,
    clip:/text/.test(cs.backgroundClip+cs.webkitBackgroundClip),onG:(()=>{const S=e.closest('main > section');if(!S)return false;for(let x=e;x&&x!==S;x=x.parentElement){const c=getComputedStyle(x);const m=c.backgroundColor.match(/[\d.]+/g);if(c.backgroundImage!=='none'||(m&&(m.length<4||+m[3]>.5)))return false}return true})(),box:rs.map(q=>[q.left,q.top+scrollY,q.width,q.height].map(v=>+v.toFixed(1)))})}
  st.remove();return {texts:out,sw:document.documentElement.scrollWidth,vw:innerWidth,secs:[...document.querySelectorAll('main > section')].filter(vis).map(s=>{const r=s.getBoundingClientRect();return [s.id||(s.classList.contains('ch')?'ch':s.classList.contains('t4')?'top':''),Math.round(r.top+scrollY),Math.round(r.height),s.dataset.ground||'']})}});
 await p.addStyleTag({content:':is(#z,*):is(#z,*):is(#z,*),:is(#z,*):is(#z,*):is(#z,*)::before,:is(#z,*):is(#z,*):is(#z,*)::after{color:transparent!important;-webkit-text-fill-color:transparent!important;text-shadow:none!important;-webkit-text-stroke:0!important}:is(#z,*):is(#z,*) :is(text,tspan){fill:transparent!important;stroke:none!important}'});await p.waitForTimeout(400);
 await p.screenshot({path:`${OUT}/bare-${W}-${id}.png`,fullPage:true,clip:{x:0,y:0,width:W,height:H},type:'png',scale:'css'});
 g.errors=er;g.H=H;fs.writeFileSync(`${OUT}/gate-${W}-${id}.json`,JSON.stringify(g,null,1));
 console.log(W,id,'H',H,'sw',g.sw,'/',g.vw,'err',er.length,'texts',g.texts.length);await ctx.close()}
await b.close()})();
