// node pathcheck.js <take> <widths>: steps the take's scroll range in 60 steps and reports any moving piece (.h7-mv, opacity>0)
// that touches the headline, a countdown digit, any face/mark or a text line of Smart or lucky; and page width vs viewport.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const t=process.argv[2],WS=(process.argv[3]||'390').split(',').map(Number),rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();for(const W of WS){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900}});const p=await ctx.newPage();await FONTS(p);
 await p.goto('http://localhost:8977/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});await p.waitForFunction(()=>document.documentElement.classList.contains('hb-ready'),null,{timeout:90000});
 await p.evaluate(async()=>{const s=document.querySelector('#wc-book .wc-splash');const y1=document.querySelector('.wc-bet').getBoundingClientRect().bottom+scrollY;for(let y=s.getBoundingClientRect().top+scrollY-900;y<y1;y+=260){scrollTo({top:y,behavior:'instant'});await new Promise(r=>setTimeout(r,90))}});
 await p.addStyleTag({content:rd('_h7.css')+rd(t+'.css')});await p.addScriptTag({content:rd('_h7.js')+';'+rd(t+'.js')});await p.waitForTimeout(1500);
 const [a,z]=await p.evaluate(()=>window.__h7Range());const hits=new Set();let sw=0;
 for(let i=0;i<=60;i++){const r=await p.evaluate(y=>new Promise(res=>{scrollTo({top:y,behavior:'instant'});requestAnimationFrame(()=>requestAnimationFrame(()=>{
   const R=e=>e.getBoundingClientRect(),hit=(a,b)=>a.left<b.right-.5&&a.right>b.left+.5&&a.top<b.bottom-.5&&a.bottom>b.top+.5;
   const rng=n=>{const r=document.createRange();r.selectNodeContents(n);return [...r.getClientRects()]};
   const keep=[...rng(document.querySelector('.wc-bet h2.hb-h')).map(r=>['headline',r]),...[...document.querySelectorAll('.hbc-num')].map(e=>['digits',R(e)]),
     ...[...document.querySelectorAll('.hb-face,.wc-face,[class*=founder] video,[class*=founder] img')].filter(e=>R(e).width).map(e=>['face',R(e)]),
     ...[...document.querySelectorAll('#wc-book .wc-splash :is(p,b,small,.wc10-e,.wc10-yl,.wc10-x span)')].flatMap(e=>rng(e).map(r=>['text:'+e.className.toString().slice(0,10),r]))];
   const out=[];document.querySelectorAll('.h7-mv').forEach(m=>{if(+getComputedStyle(m).opacity<.05)return;const q=R(m);keep.forEach(([k,b])=>{if(hit(q,b))out.push(k)})});
   res({out,sw:document.documentElement.scrollWidth})}))}),Math.round(a+(z-a)*i/60));r.out.forEach(x=>hits.add(x));sw=Math.max(sw,r.sw)}
 console.log(t,W,'maxScrollWidth',sw,'hits',[...hits].join(',')||'none');await ctx.close()}await b.close()})();
