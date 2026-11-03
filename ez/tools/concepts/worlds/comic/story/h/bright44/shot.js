// node shot.js <outdir> <ids now,A,B> <widths 390,1280> : full Overview page shots (page-<W>-<id>.jpg) with bright.css (window.__BR=<id>) laid over the
// snapshot of the built X2+ page, plus the gate (contrast per text on its measured ground, sizes, sideways scroll) -> gate-<W>-<id>.json
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],IDS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390').split(',').map(Number),PORT=process.env.PORT||8961,DPR=+(process.env.DPR||2);
const SNAP=process.env.SNAP||'/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/b44/v46-snap.html';fs.mkdirSync(OUT,{recursive:true});
const css=fs.readFileSync(__dirname+'/bright.css','utf8'),js=fs.readFileSync(__dirname+'/bright.js','utf8');
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
 const g=await p.evaluate(()=>{
  // section list with its ground colour (the ground the bright layer paints, or the page's own)
  const L=c=>{c=c/255;return c<=.03928?c/12.92:Math.pow((c+.055)/1.055,2.4)},lum=a=>.2126*L(a[0])+.7152*L(a[1])+.0722*L(a[2]),cr=(a,b)=>{const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
  const rgb=s=>{const m=s.match(/[\d.]+/g);return m?m.map(Number):null};
  const vis=e=>{for(let x=e;x&&x!==document.body;x=x.parentElement){const cs=getComputedStyle(x);if(cs.display==='none'||cs.visibility==='hidden'||+cs.opacity<.05)return false}return e.getClientRects().length>0};
  // the ground behind an element: nearest ancestor with an opaque background colour and no image, or a declared data-ground on a section (the bright layer's ground, sampled)
  const groundOf=e=>{for(let x=e;x;x=x.parentElement){if(x.dataset&&x.dataset.ground)return {c:rgb(x.dataset.ground),src:'section ground '+x.dataset.ground};const cs=getComputedStyle(x);const c=rgb(cs.backgroundColor);if(cs.backgroundImage!=='none'&&x!==document.documentElement&&!/gradient/.test(cs.backgroundImage))return {c:null,src:'image '+(x.className||x.tagName).toString().slice(0,30)};if(c&&(c.length<4||c[3]>.85)&&!(c[0]===0&&c[1]===0&&c[2]===0&&c.length===4&&c[3]===0))return {c,src:(x.className||x.tagName).toString().slice(0,30)}}return {c:[3,4,8],src:'page'}};
  const secs=[...document.querySelectorAll('main > section')].filter(vis);const out={secs:[],texts:[]};
  secs.forEach((s,i)=>{const nm=s.id||s.className.split(' ')[0];const T=[];const tw=document.createTreeWalker(s,NodeFilter.SHOW_TEXT);let n;
   while(n=tw.nextNode()){const t=n.nodeValue.trim();if(!t)continue;const e=n.parentElement;if(!vis(e))continue;if(e.closest('.sr,.x2p-sr,[aria-hidden="true"] .sr'))continue;const r=e.getBoundingClientRect();if(r.width<1)continue;
    const cs=getComputedStyle(e);if(/(^|\s)(sr-only|vh)(\s|$)/.test(e.className))continue;if(cs.clip==='rect(0px, 0px, 0px, 0px)'||(r.width<=1&&r.height<=1))continue;
    const fc=rgb(cs.color),gr=groundOf(e),fs=parseFloat(cs.fontSize),bold=+cs.fontWeight>=700,big=fs>=24||(fs>=18.66&&bold)||/Bangers|Anton/.test(cs.fontFamily)&&fs>=18;
    const stroke=parseFloat(cs.webkitTextStrokeWidth)||0;const ratio=gr.c&&fc?cr(fc,gr.c):null;
    T.push({t:t.slice(0,32),fs:+fs.toFixed(1),font:cs.fontFamily.split(',')[0].replace(/"/g,''),col:cs.color,ground:gr.src,ratio:ratio&&+ratio.toFixed(2),big,stroke,need:big?3:4.5})}
   const meas=T.filter(t=>t.ratio!=null&&!t.stroke);const mn=meas.reduce((a,t)=>t.ratio<a.ratio?t:a,{ratio:99});
   out.secs.push({i,nm,n:T.length,measured:meas.length,onImage:T.filter(t=>t.ratio==null).length,min:mn.ratio,minText:mn.t,minNeed:mn.need,fails:meas.filter(t=>t.ratio<t.need).map(t=>`${t.t} ${t.ratio} (${t.need})`).slice(0,8),minFs:Math.min(...T.map(t=>t.fs)),small:T.filter(t=>t.fs<8).map(t=>t.t).slice(0,6)});out.texts.push(...T.map(t=>({sec:nm,...t})))});
  out.sw=document.documentElement.scrollWidth;out.vw=innerWidth;return out});
 g.errors=er;g.H=H;fs.writeFileSync(`${OUT}/gate-${W}-${id}.json`,JSON.stringify(g,null,1));
 console.log(W,id,'H',H,'sw',g.sw,'/',g.vw,'err',er.length,JSON.stringify(g.secs.map(s=>[s.nm,s.min,s.minText,s.fails.length,s.minFs,s.onImage])));await ctx.close()}
await b.close()})();
