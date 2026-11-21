// Round 25 mockups, the proof (owner, 2026-10-23, on the ticket now on X2+): the names already carry their line's colour and the
// money is green or red (built). Three takes on what is left: give the money row a third thing, "the amount made", and room
// (it sat hard against the percentage), and make Hit rate, Avg miss and Sector look tappable. Research (see the round's notes):
// showing an investment as money rather than as a rate raised perceived returns (Diacon & Hasseldine 2007, J. Econ. Psych.
// 28:31-52; a 2x2 replication in Brazil), dollar-formatted figures read as riskier than the same figure in % (Nelson & Rupar
// 2015), and brokerages mostly show both; weak clickability signifiers cost users time and certainty (NN/g eyetracking,
// "Flat UI elements attract less attention"). Numbers are the page's own (the ROI rows the ticket draws).
// A profit first: the gain is the big figure, value and % a small line under it; tabs are folder tabs standing off the ticket.
// B three columns: Now / Made / Return, labelled once; tabs are raised buttons in a groove with a "tap to switch" line.
// C then and now: a bar per AI from the $100,000 line (right = profit, left = loss) labelled with the amount; tabs are a
//   stepper (‹ ROI 1/4 ›) with a "Next: Hit rate →" line at the foot.
// node launch-r25-proof.js <option> <outdir> [width]   option: now A B C
const { chromium } = require('playwright');const fs=require('fs');
const V=process.argv[2]||'A',OUT=process.argv[3]||'.',W=+process.argv[4]||390;
const P='html.x2p.x2d[data-theme] #learn .x2p-pt';
const INK='rgba(20,18,23,.88)',GR='rgba(29,107,60,.95)',RD='rgba(163,34,26,.95)';
const PRESS='text-shadow:0 1px 0 rgba(255,251,238,.75),0 -.6px 0 rgba(0,0,0,.2)';
const O={now:{css:''},
 A:{css:`
  ${P} .q-r{display:grid;grid-template-columns:14px 22px minmax(0,1fr) auto;align-items:center;column-gap:8px;padding:6px 0 5px;border-bottom:1px dotted rgba(20,18,23,.45)}
  ${P} .q-r>b{font:400 18px/1 Anton,sans-serif;color:${INK};${PRESS}}${P} .q-r .lg{width:21px;height:21px;mix-blend-mode:multiply}
  ${P} .q-nm{font:400 17px/1 Anton,sans-serif;letter-spacing:.05em;text-transform:uppercase;color:color-mix(in srgb,var(--c) 85%,#141217);${PRESS}}
  ${P} .q-m{display:grid;justify-items:end;gap:3px;padding-right:2px}
  ${P} .q-g{font:400 22px/1 Anton,sans-serif;letter-spacing:.01em;${PRESS}}${P} .q-g.qu{color:${GR}}${P} .q-g.qd{color:${RD}}
  ${P} .q-s{font:600 10.5px/1 "Barlow Condensed",sans-serif;letter-spacing:.04em;color:rgba(20,18,23,.62);text-transform:uppercase}
  ${P} .q-s i{font-style:normal}${P} .q-s .qu{color:${GR}}${P} .q-s .qd{color:${RD}}
  ${P} .q-hd{display:flex;justify-content:flex-end;font:700 8.5px/1 "Barlow Condensed",sans-serif;letter-spacing:.18em;text-transform:uppercase;color:rgba(20,18,23,.55);padding:0 2px 3px}
  /* folder tabs: each view a tab of card stock standing off the ticket; the open one joins the page */
  ${P} .pt-tb{border-bottom:1.5px solid rgba(20,18,23,.75);gap:4px;margin:0 0 8px;align-items:end}
  ${P} .pt-tb button{height:30px;border:1.5px solid rgba(20,18,23,.7)!important;border-bottom:0!important;border-radius:7px 7px 0 0;background:linear-gradient(#e2d3ad,#d6c497);color:rgba(20,18,23,.82)!important;font-size:12.5px;box-shadow:inset 0 1px 0 rgba(255,255,255,.55),0 -1px 0 rgba(0,0,0,.05);position:relative}
  ${P} .pt-tb button::after{content:"";position:absolute;left:6px;right:6px;bottom:4px;height:1px;background:rgba(20,18,23,.18)}
  ${P} .pt-tb button[aria-pressed="true"]{margin:0;height:34px;font-size:13.5px;color:${INK}!important;background:transparent!important;margin-bottom:-1.5px;border-bottom:1.5px solid #efe4c8!important;${PRESS}}
  ${P} .pt-tb button[aria-pressed="true"]::after{display:none}`,
  rows:(d)=>'<div class="q-hd">Made on $100,000</div>'+d.map((r,i)=>`<div class="q-r" style="--c:${r.c}"><b>${i?i+1:r.rk}</b>${r.lg}<span class="q-nm">${r.nmh}</span><span class="q-m"><span class="q-g ${r.up?'qu':'qd'}">${r.up?'+':'−'}$${Math.abs(r.gain).toLocaleString('en-US')}</span><span class="q-s">Now <i class="${r.up?'qu':'qd'}">${r.val}</i> · <i class="${r.up?'qu':'qd'}">${r.up?'▲':'▼'} ${r.pct}</i></span></span></div>`).join('')},
 B:{css:`
  ${P} .q-hd,${P} .q-r{display:grid;grid-template-columns:14px 22px minmax(0,1fr) 74px 70px 52px;align-items:center;column-gap:6px}
  ${P} .q-hd{font:700 8.5px/1 "Barlow Condensed",sans-serif;letter-spacing:.16em;text-transform:uppercase;color:rgba(20,18,23,.55);padding:2px 0 4px}${P} .q-hd span{text-align:right}
  ${P} .q-r{height:30px;border-bottom:1px dotted rgba(20,18,23,.45)}
  ${P} .q-r>b{font:400 17px/1 Anton,sans-serif;color:${INK};${PRESS}}${P} .q-r .lg{width:20px;height:20px;mix-blend-mode:multiply}
  ${P} .q-nm{font:400 15.5px/1 Anton,sans-serif;letter-spacing:.05em;text-transform:uppercase;color:color-mix(in srgb,var(--c) 85%,#141217);${PRESS}}
  ${P} .q-r>span:not(.q-nm):not(.lg){text-align:right;font:400 15px/1 Anton,sans-serif;${PRESS}}${P} .q-r .qu{color:${GR}}${P} .q-r .qd{color:${RD}}
  ${P} .q-r .q-p{font-size:12.5px!important}
  /* raised buttons in a printed groove; the open one pressed in */
  ${P} .q-tip{display:flex;justify-content:space-between;font:700 8.5px/1 "Barlow Condensed",sans-serif;letter-spacing:.18em;text-transform:uppercase;color:rgba(20,18,23,.6);margin:1px 2px 4px}
  ${P} .pt-tb{border:1.5px solid rgba(20,18,23,.7);border-radius:7px;padding:3px;gap:4px;background:rgba(120,86,30,.12);box-shadow:inset 0 1.5px 2px rgba(0,0,0,.18);margin:0 0 9px}
  ${P} .pt-tb button{height:30px;border:1.5px solid rgba(20,18,23,.65)!important;border-radius:5px;background:linear-gradient(#f3e9cf,#e3d4ad);color:rgba(20,18,23,.85)!important;box-shadow:0 2px 0 rgba(20,18,23,.55);font-size:12px;transform:translateY(-1px)}
  ${P} .pt-tb button[aria-pressed="true"]{margin:0;height:30px;font-size:12.5px;transform:translateY(1px);box-shadow:inset 0 2px 3px rgba(0,0,0,.45);background:rgba(20,18,23,.9)!important;color:#efe4c8!important}`,
  pre:'<div class="q-tip"><span>4 views · tap to switch</span></div>',
  rows:(d)=>'<div class="q-hd"><i></i><i></i><i></i><span>Now</span><span>Made</span><span>Return</span></div>'+d.map((r,i)=>`<div class="q-r" style="--c:${r.c}"><b>${i?i+1:r.rk}</b>${r.lg}<span class="q-nm">${r.nmh}</span><span class="${r.up?'qu':'qd'}">${r.val}</span><span class="${r.up?'qu':'qd'}">${r.up?'+':'−'}$${Math.abs(r.gain).toLocaleString('en-US')}</span><span class="q-p ${r.up?'qu':'qd'}">${r.up?'▲':'▼'} ${r.pct}</span></div>`).join('')},
 C:{css:`
  ${P} .q-r{display:grid;grid-template-columns:14px 22px 64px minmax(0,1fr);align-items:center;column-gap:7px;height:31px;border-bottom:1px dotted rgba(20,18,23,.45)}
  ${P} .q-r>b{font:400 17px/1 Anton,sans-serif;color:${INK};${PRESS}}${P} .q-r .lg{width:20px;height:20px;mix-blend-mode:multiply}
  ${P} .q-nm{font:400 15.5px/1 Anton,sans-serif;letter-spacing:.05em;text-transform:uppercase;color:color-mix(in srgb,var(--c) 85%,#141217);${PRESS}}
  ${P} .q-bar{position:relative;height:100%}
  ${P} .q-bar::before{content:"";position:absolute;left:var(--z);top:2px;bottom:2px;border-left:1.2px dashed rgba(20,18,23,.55)}
  ${P} .q-bar i{position:absolute;top:9px;height:12px;border:1px solid rgba(20,18,23,.55);mix-blend-mode:multiply}
  ${P} .q-bar i.qu{left:var(--z);width:var(--w);background:rgba(31,122,69,.55)}${P} .q-bar i.qd{right:calc(100% - var(--z));width:var(--w);background:rgba(200,55,42,.55)}
  ${P} .q-bar b{position:absolute;top:50%;transform:translateY(-50%);font:400 14px/1 Anton,sans-serif;white-space:nowrap;${PRESS}}
  ${P} .q-bar b.qu{left:calc(var(--z) + var(--w) + 5px);color:${GR}}${P} .q-bar b.qd{left:calc(var(--z) + 6px);color:${RD}}
  ${P} .q-bar small{position:absolute;right:0;top:50%;transform:translateY(-50%);font:600 10px/1 "Barlow Condensed",sans-serif;color:rgba(20,18,23,.6)}
  ${P} .q-hd{position:relative;height:13px;margin-left:calc(14px + 22px + 64px + 21px);font:700 8px/1 "Barlow Condensed",sans-serif;letter-spacing:.14em;text-transform:uppercase;color:rgba(20,18,23,.55)}
  ${P} .q-hd span{position:absolute;left:var(--z);transform:translateX(-50%);white-space:nowrap}
  /* a stepper: the open view between two arrows, a count, and a "Next" line at the foot */
  ${P} .pt-tb{display:none!important}
  ${P} .q-st{display:grid;grid-template-columns:34px 1fr 34px;align-items:center;margin:0 0 8px;border-bottom:1px solid rgba(20,18,23,.5);padding-bottom:6px}
  ${P} .q-st button{all:unset;display:grid;place-items:center;width:30px;height:30px;border:1.5px solid rgba(20,18,23,.7);border-radius:50%;font:400 17px/1 Anton,sans-serif;color:${INK};box-shadow:0 2px 0 rgba(20,18,23,.55);background:linear-gradient(#f3e9cf,#e3d4ad)}
  ${P} .q-st div{display:grid;justify-items:center;gap:4px}${P} .q-st div b{font:400 17px/1 Anton,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:${INK};${PRESS}}
  ${P} .q-st div span{display:flex;gap:5px}${P} .q-st div span i{width:6px;height:6px;border-radius:50%;border:1px solid rgba(20,18,23,.7)}${P} .q-st div span i.on{background:${INK}}
  ${P} .q-nx{display:flex;justify-content:flex-end;margin-top:5px;font:400 13px/1 Anton,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:${INK}}
  ${P} .q-nx span{border-bottom:1.5px solid ${INK};padding-bottom:2px}`,
  rows:(d)=>{const mx=Math.max(...d.map(r=>Math.abs(r.gain))),Z=40,span=Math.min(100-40-26,40-2),w=g=>(Math.abs(g)/mx*span).toFixed(1)+'%';
   return `<div class="q-hd" style="--z:${Z}%"><span>$100,000 start</span></div>`+d.map((r,i)=>`<div class="q-r" style="--c:${r.c}"><b>${i?i+1:r.rk}</b>${r.lg}<span class="q-nm">${r.nmh}</span><span class="q-bar" style="--z:${Z}%;--w:${w(r.gain)}"><i class="${r.up?'qu':'qd'}"></i><b class="${r.up?'qu':'qd'}">${r.up?'+':'−'}$${Math.abs(r.gain).toLocaleString('en-US')}</b></span></div>`).join('')}},
};
(async()=>{const o=O[V];const b=await chromium.launch({args:['--ignore-certificate-errors-spki-list='+fs.readFileSync(process.env.SPKI_FILE||'spki.txt','utf8').trim()]});
const p=await b.newPage({viewport:{width:W,height:900},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://127.0.0.1:8897/'+(process.env.PAGE||'v46-live-x2plus.html'));await p.waitForTimeout(3800);
if(o.css)await p.addStyleTag({content:o.css+`${P} .pt-in{height:auto!important}${P} .pt-fl{flex:none!important}`});
if(o.rows)await p.evaluate(({rows,pre,V})=>{const t=document.querySelector('#learn .x2p-pt'),lp=t.querySelector('.pt-body>.lp')||t.querySelector('.lp');
  const d=[...lp.querySelectorAll('.pt-r')].map(r=>{const v=r.querySelector('.pt-v').textContent.trim(),num=+v.replace(/[^0-9]/g,'');const nm=r.querySelector('.pt-nm');
   return {c:r.style.getPropertyValue('--c'),rk:r.querySelector('b').innerHTML,lg:r.querySelector('.lg').outerHTML,nmh:nm.innerHTML,val:v,gain:num-100000,up:num>=100000,pct:r.querySelector('.pt-c').textContent.replace(/[▲▼]|up|down/g,'').trim()}});
  const f=new Function('return '+rows)();lp.innerHTML=f(d);
  if(pre){const tb=t.querySelector('.pt-tb');tb.insertAdjacentHTML('beforebegin',pre)}
  if(V==='C'){const tb=t.querySelector('.pt-tb');tb.insertAdjacentHTML('afterend','<div class="q-st"><button aria-hidden="true">‹</button><div><b>ROI</b><span><i class="on"></i><i></i><i></i><i></i></span></div><button aria-hidden="true">›</button></div>');
   const cp=t.querySelector('.pt-cp');cp.insertAdjacentHTML('afterend','<p class="q-nx"><span>Next: Hit rate →</span></p>')}
  window.dispatchEvent(new Event('resize'))},{rows:o.rows.toString(),pre:o.pre||'',V});
await p.waitForTimeout(700);
await p.evaluate(()=>{[...document.querySelectorAll('body *')].forEach(e=>{const cs=getComputedStyle(e);if((cs.position==='sticky'||cs.position==='fixed')&&e.getBoundingClientRect().top<=2&&e.offsetHeight>40&&e.offsetHeight<200)e.style.visibility='hidden'})});
await p.evaluate(()=>document.querySelector('#learn .x2p-pt').scrollIntoView({block:'center'}));await p.waitForTimeout(400);
const c=await p.evaluate(()=>{const a=document.querySelector('#learn .x2p-pt').getBoundingClientRect();return {x:0,y:a.top+scrollY-12,width:innerWidth,height:a.height+24}});
await p.screenshot({path:`${OUT}/r25p-${V}-${W}.png`,clip:c,fullPage:true});
console.log(V,W,Math.round(c.height),errs.length?'ERR '+errs.join('|'):'');await b.close()})();
