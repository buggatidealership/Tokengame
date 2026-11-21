// rounds5 shots: the live X3+ page with the Hot off the press chapter laid over "Every round so far".
// node shot.js <outdir> <variants e.g. A-plain,B-pencil,C-plain,now> <390x844,1280x800> [mode: top|full|tap]
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fonts=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
const [OUT,VAR,SIZES,MODE='top']=process.argv.slice(2);const BASE='tools/concepts/worlds/comic/story/h/rounds5/';
const DEFS=`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><filter id="r5pencil" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.2" result="d"/><feComposite in="d" in2="n" operator="arithmetic" k1="0" k2="1" k3="-.25" k4="0"/></filter></defs></svg>`;
async function inject(p,v){if(v==='now')return;const[d,bl]=v.split('-');
 await p.evaluate(({d,bl,BASE,DEFS})=>{window.__R5={d,bl};window.__R5BASE=BASE;document.body.insertAdjacentHTML('beforeend',DEFS);
  const l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=block';document.head.append(l);
  const c=document.createElement('link');c.rel='stylesheet';c.href=BASE+'r5.css?'+Date.now();document.head.append(c);
  return new Promise(res=>{c.onload=()=>{const s=document.createElement('script');s.src=BASE+'r5.js?'+Date.now();s.onload=res;document.body.append(s)}})},{d,bl,BASE,DEFS});
 await p.waitForSelector('.r5 .r5-sh',{timeout:15000});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(600)}
async function open(b,W,H){const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:W>1000?1:2});await fonts(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push(m.text())});
 await p.goto('http://localhost:8897/v47-live-x3plus.html?'+Date.now(),{waitUntil:'load'});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world'),null,{timeout:60000}).catch(()=>{});await p.waitForTimeout(4500);return{p,er}}
module.exports={inject,open};
if(require.main===module)(async()=>{const b=await chromium.launch();
 for(const sz of SIZES.split(',')){const[W,H]=sz.split('x').map(Number);
  for(const v of VAR.split(',')){const{p,er}=await open(b,W,H);
   await p.evaluate(()=>{const s=document.querySelector('#wc-book .wc-season');scrollTo(0,s.getBoundingClientRect().top+scrollY-(innerWidth>=1000?70:56))});await p.waitForTimeout(1500);
   await inject(p,v);await p.evaluate(()=>{const s=document.querySelector('#wc-book .wc-season');scrollTo(0,s.getBoundingClientRect().top+scrollY-(innerWidth>=1000?70:56))});
   await p.waitForTimeout(MODE==='still'?600:4200);
   const info=await p.evaluate(()=>({sw:document.documentElement.scrollWidth,iw:innerWidth,h:(document.querySelector('.r5')||{}).offsetHeight}));
   if(MODE==='full'){const s=await p.evaluate(()=>{const e=document.querySelector('#wc-book .wc-season'),r=e.getBoundingClientRect();return{y:r.top+scrollY,h:r.height}});
    await p.setViewportSize({width:W,height:Math.min(Math.ceil(s.h)+80,6000)});await p.evaluate(y=>scrollTo(0,y-40),s.y);await p.waitForTimeout(1500);await p.screenshot({path:`${OUT}/${v}-${W}-full.png`})}
   else await p.screenshot({path:`${OUT}/${v}-${W}.png`});
   if(MODE==='tap'&&v!=='now'){await p.evaluate(()=>window.__R5take(0));await p.waitForTimeout(500);await p.screenshot({path:`${OUT}/${v}-${W}-tap1.png`});await p.waitForTimeout(3200);await p.screenshot({path:`${OUT}/${v}-${W}-tap2.png`})}
   console.log(v,W,JSON.stringify(info),er.slice(0,3).join(' | '));await p.close()}}
 await b.close()})();
