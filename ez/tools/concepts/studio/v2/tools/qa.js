// node qa.js : overlap and off-frame check of every text run and logo at settled times
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
await p.goto('http://localhost:8996/tools/concepts/studio/v2/index.html');await p.evaluate(()=>window.READY);
for(const t of [0,3.0,6.5,10.4,11.2,13.8,15.4,17.6,21.5,24.8]){await p.evaluate(t=>window.R(t),t);
 const r=await p.evaluate(()=>{const els=[...document.querySelectorAll('#G *')].filter(e=>{if(e.closest('svg')&&e.tagName!=='svg')return false;const own=[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim());return own||e.tagName==='IMG'||e.classList.contains('med')});
  const bx=els.map(e=>{let rg;if(e.tagName==='IMG'||e.classList.contains('med'))rg=e.getBoundingClientRect();else{const R=document.createRange();R.selectNodeContents(e);rg=R.getBoundingClientRect()}let op=1,x=e;while(x&&x.id!=='G'){op*=+getComputedStyle(x).opacity;x=x.parentElement}return {t:(e.textContent||e.tagName).trim().slice(0,22),x:rg.left,y:rg.top,r:rg.right,b:rg.bottom,op,img:e.tagName==='IMG'}}).filter(q=>q.op>.5&&q.r-q.x>1);
  const out=[];for(let i=0;i<bx.length;i++){const a=bx[i];if(a.x<0||a.r>1080||a.y<0||a.b>1350)out.push('OFF '+a.t);for(let j=i+1;j<bx.length;j++){const c=bx[j];const ov=Math.min(a.r,c.r)-Math.max(a.x,c.x),oh=Math.min(a.b,c.b)-Math.max(a.y,c.y);if(ov>2&&oh>2&&!(a.img||c.img)&&!(a.t.includes(c.t)||c.t.includes(a.t)))out.push('OVL '+a.t+' | '+c.t+' '+ov.toFixed(0)+'x'+oh.toFixed(0))}}return out});
 console.log(t,r.length?r.join(' ; '):'clean')}
await b.close()})();
