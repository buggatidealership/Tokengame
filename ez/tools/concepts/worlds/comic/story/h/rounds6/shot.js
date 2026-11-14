// rounds6 shots: the live X3+ page with Hot off the press laid over "Every round so far".
// node shot.js <outdir> <variants> <390x844,1280x800> [top|full|tap]
//   variant = <composition>-<loop>[-<plate>][-plain]: W1-sway, W2-ink, W3-sway, D-sway-slate, D-sway-brass, now (today's live page)
// Serve ez/ on port 8897 first (python3 -m http.server 8897 from ez/).
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fonts=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
const [OUT,VAR,SIZES,MODE='top']=process.argv.slice(2);const BASE='tools/concepts/worlds/comic/story/h/rounds6/';
const DEFS=`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<filter id="r6pencil" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.2" result="d"/><feComposite in="d" in2="n" operator="arithmetic" k1="0" k2="1" k3="-.25" k4="0"/></filter>
<filter id="r6chalk" x="-5%" y="-10%" width="110%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="9" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" result="d"/><feTurbulence type="fractalNoise" baseFrequency="2.4" numOctaves="1" seed="2" result="g"/><feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.4 1.75" result="m"/><feComposite in="d" in2="m" operator="in"/></filter>
</defs></svg>`;
function parse(v){const[w,loop,c,d]=v.split('-');const o={w:w==='D'?'W1':w,loop:loop||'sway',plate:'slate',bl:'pencil'};[c,d].forEach(x=>{if(x==='slate'||x==='brass')o.plate=x;if(x==='plain')o.bl='plain'});return o}
async function inject(p,v){if(v==='now')return;const o=parse(v);
 await p.evaluate(({o,BASE,DEFS})=>{window.__R6=o;window.__R6BASE=BASE;document.body.insertAdjacentHTML('beforeend',DEFS);
  const l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=block';document.head.append(l);
  const c=document.createElement('link');c.rel='stylesheet';c.href=BASE+'r6.css?'+Date.now();document.head.append(c);
  return new Promise(res=>{c.onload=()=>{const s=document.createElement('script');s.src=BASE+'r6.js?'+Date.now();s.onload=res;document.body.append(s)}})},{o,BASE,DEFS});
 await p.waitForSelector('.r6 .r6-sh',{timeout:15000});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(600);await p.evaluate(()=>window.__R6fit&&window.__R6fit())}
async function open(b,W,H){const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:W>1000?1:2});await fonts(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push(m.text())});
 await p.goto('http://localhost:8897/v47-live-x3plus.html?'+Date.now(),{waitUntil:'load'});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world'),null,{timeout:60000}).catch(()=>{});await p.waitForTimeout(4500);return{p,er}}
const toSec=async p=>p.evaluate(()=>{const s=document.querySelector('#wc-book .wc-season');scrollTo(0,s.getBoundingClientRect().top+scrollY-(innerWidth>=1000?70:56))});
module.exports={inject,open,toSec};
if(require.main===module)(async()=>{const b=await chromium.launch();
 for(const sz of SIZES.split(',')){const[W,H]=sz.split('x').map(Number);
  for(const v of VAR.split(',')){if(W>=1000&&!/^D|now/.test(v))continue;if(W<1000&&/^D/.test(v))continue;
   const{p,er}=await open(b,W,H);await toSec(p);await p.waitForTimeout(1500);await inject(p,v);await toSec(p);await p.waitForTimeout(2500);
   const info=await p.evaluate(()=>{const r6=document.querySelector('.r6');const sh=[...document.querySelectorAll('.r6-sh')].map(e=>Math.round(e.getBoundingClientRect().width));
    /* overlap check: the tally's text box against every sheet */
    const t=document.querySelector('.r6-tl .in');let hit=0;if(t){const a=t.getBoundingClientRect();document.querySelectorAll('.r6-sh').forEach(s=>{const q=s.getBoundingClientRect();if(q.left<a.right&&q.right>a.left&&q.top<a.bottom&&q.bottom>a.top)hit++})}
    return{sw:document.documentElement.scrollWidth,iw:innerWidth,h:r6&&r6.offsetHeight,sheetW:sh.join('/'),tallyOverSheets:hit}});
   if(MODE==='full'){const s=await p.evaluate(()=>{const e=document.querySelector('#wc-book .wc-season'),r=e.getBoundingClientRect();return{y:r.top+scrollY,h:r.height}});
    await p.setViewportSize({width:W,height:Math.min(Math.ceil(s.h)+80,6000)});await p.evaluate(y=>scrollTo(0,y-40),s.y);await p.waitForTimeout(1800);await p.screenshot({path:`${OUT}/${v}-${W}-full.png`})}
   else await p.screenshot({path:`${OUT}/${v}-${W}.png`});
   if(MODE==='tap'&&v!=='now'){await p.evaluate(()=>document.querySelector('.r6 .r6-sh[data-n]').click());await p.waitForTimeout(3500);await p.screenshot({path:`${OUT}/${v}-${W}-tap.png`});
    info.hash=await p.evaluate(()=>location.hash)}
   console.log(v,W,JSON.stringify(info),er.slice(0,3).join(' | '));await p.close()}}
 await b.close()})();
