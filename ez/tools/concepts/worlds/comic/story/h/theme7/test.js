// node test.js <out> <id> <W> [film] : the gap/bleed rule as measured tests on the built page (writes <out>/test-<W>-<id>.json)
// T1 bleed: every band spans 0..vw. T2 no page ground: with html painted magenta, 0 magenta pixels in the Overview (top to the close).
// T3 gap height = base + 0.45·ΔE76 (±1px). T4 gap halves carry the masks above/below (measured hue of each half's mean colour vs the mask's).
// T5 text over bare ground: every text box that sits on the ground (not inside a panel) has ≥ 4.5:1 against the ground's p95 under it.
// T6 content safe zone: no text box within 8px of a world gap.
const L=require('./lib.js'),fs=require('fs');const {PNG}=(()=>{try{return require('/opt/node22/lib/node_modules/pngjs')}catch(e){return {}}})();
const [OUT,ID,W0,FT]=process.argv.slice(2);const W=+W0;
(async()=>{const b=await L.chromium.launch();const {ctx,p,er}=await L.open(b,W,1);
 await p.evaluate(([id,ft])=>{window.__T7=id;window.__T7F=ft||''},[ID,FT]);
 await p.addScriptTag({content:fs.readFileSync(__dirname+'/_t7film.js','utf8')});await p.addScriptTag({content:fs.readFileSync(__dirname+'/_t7.js','utf8')});
 await p.waitForTimeout(2500);await p.evaluate(()=>window.__t7.draw());await p.waitForTimeout(600);await L.hideFixed(p);
 const r=await p.evaluate(()=>{const vw=document.documentElement.clientWidth,T=window.__t7,out={vw};
  const bands=[...document.querySelectorAll('.t7-band')].map(e=>{const r=e.getBoundingClientRect();return {l:r.left,w:r.width}});
  out.T1=bands.every(b=>Math.abs(b.l)<.5&&Math.abs(b.w-vw)<.5);out.T1n=bands.length;
  const gaps=[...document.querySelectorAll('.t7-gap')].map(g=>{const h=g.getBoundingClientRect().height,a=g.dataset.a,b=g.dataset.b;return {a,b,h,want:T.gapH(a,b,'world'),dE:+T.dE(a,b).toFixed(1)}});
  out.T3=gaps.every(g=>Math.abs(g.h-g.want)<=1);out.gaps=gaps;
  // text boxes on bare ground: leaf text elements whose nearest painted ancestor is the section itself
  const secs=T.sections().map(s=>s.el),txt=[];const gr=[...document.querySelectorAll('.t7-gap')].map(g=>{const r=g.getBoundingClientRect();return [r.top+scrollY,r.bottom+scrollY]});
  let near=0;
  secs.forEach(s=>s.querySelectorAll('h1,h2,p,span,b,small,div').forEach(e=>{if(!e.childNodes.length||![...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()))return;const r=e.getBoundingClientRect();if(r.width<4||r.height<4||!e.checkVisibility({opacityProperty:true,visibilityProperty:true})||e.closest('.r6-old,.ch-sr,[aria-hidden="true"] .sr,.sr-only,.vh')||getComputedStyle(e).clipPath!=='none'||getComputedStyle(e).clip!=='auto')return;
   const y0=r.top+scrollY,y1=r.bottom+scrollY;if(gr.some(([a,b])=>y1>a-8&&y0<b+8)){near++;(window.__t7n=window.__t7n||[]).push(e.textContent.trim().slice(0,24)+'@'+Math.round(y0))}
   let x=e,onGround=true;while(x&&x!==s){const c=getComputedStyle(x);if(c.backgroundColor!=='rgba(0, 0, 0, 0)'||c.backgroundImage!=='none'){onGround=false;break}x=x.parentElement}
   if(onGround&&!e.closest('svg'))txt.push({x:Math.round(r.left),y:Math.round(y0),w:Math.round(r.width),h:Math.round(r.height),c:getComputedStyle(e).color,t:e.textContent.trim().slice(0,30)})}));
  out.T6near=near;out.T6list=window.__t7n||[];out.txt=txt;out.H=document.documentElement.scrollHeight;
  const cl=document.getElementById('get');out.endY=Math.round(cl.getBoundingClientRect().bottom+scrollY);return out});
 // T2: magenta page ground
 await p.evaluate(()=>document.documentElement.classList.add('t7-test'));await p.waitForTimeout(300);
 await L.longShot(p,`${OUT}/mag-${W}-${ID}`,0,r.endY);
 fs.writeFileSync(`${OUT}/test-${W}-${ID}.json`,JSON.stringify({...r,errors:er},null,1));
 // ground shot without text for T5 sampling: hide everything but the layer
 await p.evaluate(()=>{document.documentElement.classList.remove('t7-test');const s=document.createElement('style');s.textContent='main *,header,footer{visibility:hidden!important}';s.id='t7hide';document.head.appendChild(s)});await p.waitForTimeout(300);
 await L.longShot(p,`${OUT}/gnd-${W}-${ID}`,0,r.endY);
 console.log(JSON.stringify({T1:r.T1,T3:r.T3,T6near:r.T6near,ntxt:r.txt.length,err:er}));await ctx.close();await b.close()})();
