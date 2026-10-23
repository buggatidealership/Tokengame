// Round 24 mockups (owner, 2026-10-23: "cinematic cleanliness", with a reference film: a stylised 3D music video, "the art style is
// completely different... but the cleanliness is insane"). What the reference does, read from its frames: one subject per shot, a
// small palette per shot, light doing the work (a key light, rim light, glow, haze), big scale contrast, crisp silhouettes on simple
// grounds, nothing that isn't needed. Four takes on the proof ticket now on X2+ (ROI, the view it opens on), each one principle,
// all in the site's own paper world: K key light (the leader lit, the rest in shadow), F focus pull (shallow depth of field on the
// chart), C close-up (scale: the leader's number fills the frame), S subtraction (every mark that is not the subject goes).
// Built on the page's own ticket (x2plus.js x2pProof); only CSS and small DOM changes per take.
// node launch-r24-cine.js <option> <outdir> [width]   option: now K F C S
const { chromium } = require('playwright');const fs=require('fs');
const V=process.argv[2]||'K',OUT=process.argv[3]||'.',W=+process.argv[4]||390;
const P='html.x2p.x2d[data-theme] #learn .x2p-pt';
// the other AIs' lines and labels (everything in the ink layer that is not the leader)
const OTH=`${P} .pt-ch>svg.ink path[stroke="#d97757"],${P} .pt-ch>svg.ink path[stroke="#1e80ff"],${P} .pt-ch>svg.ink path[stroke="#141217"],${P} .pt-ch>svg.ink path[stroke="#10a37f"]`;
const O={
 now:{css:''},
 // K: one subject, lit. A warm key light falls on the leader's line and its row; the card falls off into shadow at its edges (a printed
 // card under one lamp); the other AIs step back (thinner, quieter); the gold line glows into the paper; no dotted rules, one frame
 K:{css:`
  ${P} .pt-cd::before{content:"";position:absolute;inset:0;z-index:2;pointer-events:none;mix-blend-mode:multiply;background:radial-gradient(115% 85% at 62% 52%,transparent 38%,rgba(40,24,8,.62) 100%)}
  ${P} .pt-cd::after{content:"";position:absolute;inset:0;z-index:2;pointer-events:none;mix-blend-mode:screen;background:radial-gradient(46% 32% at 70% 64%,rgba(255,222,140,.42),transparent 72%),radial-gradient(52% 10% at 40% 21%,rgba(255,222,140,.34),transparent 72%)}
  ${P} .pt-in{outline:0}${P} .pt-r{border-bottom:0}
  ${P} .lp .pt-r:not(:first-child){opacity:.5}${P} .pt-tb,${P} .pt-ax,${P} .pt-cp{opacity:.75}${P} .lp .pt-r:not(:first-child) .pt-nm,${P} .lp .pt-r:not(:first-child) .pt-v{font-size:13.5px}
  ${OTH}{opacity:.42;stroke-width:1.6px}
  ${P} .pt-ch>svg:not(.ink){filter:drop-shadow(0 0 3px rgba(240,190,70,.85)) drop-shadow(0 0 12px rgba(240,190,70,.5))}
  ${P} .pt-lb:not(:has(.pt-fo)){opacity:.6}`},
 // F: focus pull. The leader's line and label sharp; the others drop out of focus (soft, lighter), so the eye lands where the
 // story is; the rows stay sharp (they are read), the three behind the leader quieter
 F:{css:`
  ${OTH}{filter:blur(1.5px);opacity:.75;stroke-width:2.4px}
  ${P} .pt-lb:not(:has(.pt-fo)){filter:blur(.6px);opacity:.6}
  ${P} .pt-ch>svg:not(.ink){filter:drop-shadow(0 2px 2px rgba(60,40,10,.25))}
  ${P} .pt-in{outline:0}${P} .pt-r{border-bottom:0}${P} .lp .pt-r:not(:first-child){opacity:.62}
  ${P} .pt-cd::before{content:"";position:absolute;inset:0;z-index:2;pointer-events:none;mix-blend-mode:multiply;background:radial-gradient(140% 100% at 55% 45%,transparent 55%,rgba(52,32,12,.3) 100%)}`},
 // C: close-up. Scale does the work: the leader's money is the frame (foil, huge), the others one quiet line under it, the chart a
 // small strip with only the leader in colour weight
 C:{css:`
  ${P} .x2p-hero{display:grid;justify-items:start;gap:2px;margin:6px 0 8px}
  ${P} .x2p-hero small{font:700 9.5px/1 "Barlow Condensed",sans-serif;letter-spacing:.16em;text-transform:uppercase;color:rgba(20,18,23,.62)}
  ${P} .x2p-hero .hn{display:flex;align-items:center;gap:8px;font:400 22px/1 Anton,sans-serif;letter-spacing:.05em;text-transform:uppercase}
  ${P} .x2p-hero .hn .lg{width:24px;height:24px;mix-blend-mode:multiply}
  ${P} .x2p-hero .hv{font:400 64px/.92 Anton,sans-serif;letter-spacing:-.01em}
  ${P} .x2p-hero .hv .pt-fo{font-size:64px}
  ${P} .x2p-hero .hp{font:400 18px/1 Anton,sans-serif;color:rgba(29,107,60,.95)}
  ${P} .x2p-rest{display:flex;flex-wrap:wrap;gap:4px 14px;padding:7px 0 0;border-top:1px solid rgba(20,18,23,.35);font:600 12px/1.2 "Barlow Condensed",sans-serif;color:rgba(20,18,23,.75)}
  ${P} .x2p-rest b{font-weight:700;color:color-mix(in srgb,var(--c) 85%,#141217)}
  ${P} .pt-in{outline:0;height:auto!important}${P} .pt-fl{flex:none}
  ${OTH}{opacity:.6;stroke-width:1.5px}`,
  dom:()=>{const t=document.querySelector('#learn .x2p-pt'),lp=t.querySelector('.pt-body>.lp'),rs=[...lp.querySelectorAll('.pt-r')];
    const v=r=>r.querySelector('.pt-v').textContent,c=r=>r.querySelector('.pt-c').textContent.replace(/(up|down)/,'').trim(),n=r=>r.querySelector('.pt-nm').textContent;
    const h=document.createElement('div');h.className='x2p-hero';const lg=rs[0].querySelector('.lg').outerHTML;
    h.innerHTML=`<small>If you'd copied the leader</small><span class="hn">${lg}<em class="pt-fo" data-t="${n(rs[0])}">${n(rs[0])}</em></span><span class="hv tnum"><em class="pt-fo" data-t="${v(rs[0])}">${v(rs[0])}</em></span><span class="hp">${c(rs[0])}</span>`;
    const rest=document.createElement('div');rest.className='x2p-rest';rest.innerHTML=rs.slice(1).map((r,i)=>`<span style="--c:${r.style.getPropertyValue('--c')}"><b>${i+2} ${n(r)}</b> ${v(r)} ${c(r)}</span>`).join('');
    lp.replaceWith(h);h.after(rest)}},
 // S: subtraction. The same ticket with every mark that is not the subject taken away: no dotted rules, one frame, no stars, no
 // connector lines, no ticket number, the start line lighter, more air between the rows; what is left is aligned to one edge
 S:{css:`
  ${P} .pt-in{outline:0;border-color:rgba(20,18,23,.45);padding:12px 14px 10px}
  ${P} .pt-r{border-bottom:0;height:31px}
  ${P} .pt-bd i,${P} .pt-bd.r span:last-child{display:none}
  ${P} .pt-ch>svg.ink path[stroke="rgba(20,18,23,.62)"]{display:none}
  ${P} .pt-ch>svg.ink path[stroke-dasharray]{stroke:rgba(20,18,23,.28)}
  ${P} .pt-tb{border-bottom-color:rgba(20,18,23,.25)}${P} .pt-tb button+button{border-left-color:transparent}
  ${P} .pt-r>b,${P} .pt-r .pt-nm,${P} .pt-r .pt-v,${P} .pt-r .pt-c,${P} .pt-lb b{text-shadow:none}
  ${P} .pt-ch>svg.ink path{filter:none!important}
  ${P} .pt-cd::before{content:"";position:absolute;inset:0;z-index:0;pointer-events:none;background:rgba(240,231,206,.55)}${P} .pt-cd>*{position:relative;z-index:1}`},
};
(async()=>{const o=O[V];const b=await chromium.launch({args:['--ignore-certificate-errors-spki-list='+fs.readFileSync(process.env.SPKI_FILE||'spki.txt','utf8').trim()]});
const p=await b.newPage({viewport:{width:W,height:900},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://127.0.0.1:8897/'+(process.env.PAGE||'v46-live-x2plus.html'));await p.waitForTimeout(3500);
if(o.css)await p.addStyleTag({content:o.css});if(o.dom)await p.evaluate(o.dom);await p.waitForTimeout(300);
await p.evaluate(()=>{[...document.querySelectorAll('body *')].forEach(e=>{const cs=getComputedStyle(e);if((cs.position==='sticky'||cs.position==='fixed')&&e.getBoundingClientRect().top<=2&&e.offsetHeight>40&&e.offsetHeight<200)e.style.visibility='hidden'})});
await p.evaluate(()=>document.querySelector('#learn .x2p-pt').scrollIntoView({block:'center'}));await p.waitForTimeout(400);
const c=await p.evaluate(()=>{const a=document.querySelector('#learn .x2p-pt').getBoundingClientRect();return {x:0,y:a.top+scrollY-14,width:innerWidth,height:a.height+28}});
await p.screenshot({path:`${OUT}/r24-${V}-${W}.png`,clip:c,fullPage:true});
console.log(V,W,Math.round(c.height),errs.length?'ERR '+errs.join('|'):'');await b.close()})();
