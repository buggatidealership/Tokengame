// Round 18 mockups on the built X2+ page (owner, 2026-10-22, on round 17's ticket stubs: the "65% on direction" "feels like it's been
// stuck on top of the ticket... I'd like to see a unified element, part of the environment, part of the ticket"). Everything on the
// ticket is printed on it: each ticket carries its own field labels like a real ticket's printed boxes, the values are pressed into
// the card in ink, the logos are printed onto the paper (multiplied, no digital outline), the last five are ticks stamped into
// printed boxes, #1's stub is gold foil pressed into the card. P: all printed. S: the same, the hit rate hand-stamped.
// node launch-r18-ticket.js <option> <outdir> [width]   option: now T P S
const { chromium } = require('playwright');const fs=require('fs');
const V=process.argv[2]||'P',OUT=process.argv[3]||'.',W=+process.argv[4]||390;
const G='https://fonts.googleapis.com/css2?';
const S='html.x2p.x2d[data-theme] #standings';
const BASE=`
 ${S} .x2p-strap,${S} .x2p-flip,${S} .lbh{display:none!important}
 ${S} .q{position:relative;margin:18px 0 0;color:#f3ead6}
 ${S} .q .q-lc{text-transform:none}
 ${S} .q .tnum{font-variant-numeric:tabular-nums}`;
const RULES=['4 AI<span class="q-lc">s</span> predict a stock\'s move <em>before</em> it reports.','Graded at the next market close <em>after</em> earnings.','In public, every earnings season.'];
const INK='rgba(20,18,23,.88)',RED='rgba(163,34,26,.92)';
// the ticket, shared by both: scalloped lit card, a perforated stub, printed field rules and labels
const TK=`
  ${S} .q-K{display:grid;gap:10px}
  ${S} .q-K .q-tw{filter:drop-shadow(3px 4px 0 #000)}
  ${S} .q-K .q-tk{position:relative;display:grid;grid-template-columns:46px minmax(0,1fr) 66px 66px 64px;height:68px;background:var(--paper) 0 0/240px 240px;color:${INK};
    -webkit-mask:radial-gradient(4.5px at 0 50%,#0000 97%,#000) 0 0/51% 11px repeat-y,radial-gradient(4.5px at 100% 50%,#0000 97%,#000) 100% 0/51% 11px repeat-y;
    mask:radial-gradient(4.5px at 0 50%,#0000 97%,#000) 0 0/51% 11px repeat-y,radial-gradient(4.5px at 100% 50%,#0000 97%,#000) 100% 0/51% 11px repeat-y}
  ${S} .q-K .q-1 .q-tk{height:76px}
  ${S} .q-K .q-tk::before{content:"";position:absolute;inset:5px 9px 5px 52px;border:1px solid rgba(20,18,23,.38);pointer-events:none}
  ${S} .q-K .q-st{position:relative;display:grid;place-content:center;justify-items:center;gap:1px;background:linear-gradient(rgba(120,86,30,.12),rgba(120,86,30,.12));border-right:2px dashed rgba(20,18,23,.5)}
  ${S} .q-K .q-st small{font:italic 900 8px/1 Archivo,sans-serif;font-stretch:62%;letter-spacing:.14em;text-transform:uppercase;color:${RED}}
  ${S} .q-K .q-st b{font:400 28px/1 Anton,sans-serif;color:${INK};text-shadow:0 1px 0 rgba(255,255,255,.6),0 -1px 0 rgba(0,0,0,.2)}
  ${S} .q-K .q-st i{position:absolute;left:3px;top:0;bottom:0;display:flex;align-items:center;justify-content:center;writing-mode:vertical-rl;transform:rotate(180deg);font:italic 900 6.5px/1 Archivo,sans-serif;font-stretch:62%;letter-spacing:.2em;text-transform:uppercase;color:rgba(163,34,26,.6);white-space:nowrap}
  /* #1: the stub is gold foil pressed into the card (the card's grain shows through the foil), its number debossed */
  ${S} .q-K .q-1 .q-st{background:var(--paper) 0 0/240px 240px,linear-gradient(115deg,#f6d77c,#d39c1c 34%,#fbe8a8 52%,#c98a12 70%,#efc24a);background-blend-mode:multiply,normal}
  ${S} .q-K .q-1 .q-st b{font-size:34px;color:rgba(110,66,0,.82);text-shadow:0 1px 0 rgba(255,244,200,.85),0 -1px 0 rgba(60,30,0,.35)}
  ${S} .q-K .q-1 .q-st small{color:rgba(110,66,0,.85)}
  ${S} .q-K .q-f{position:relative;display:grid;align-content:center;gap:4px;padding:0 6px;min-width:0}
  ${S} .q-K .q-f+.q-f{border-left:1px solid rgba(20,18,23,.3)}
  ${S} .q-K .q-f>small{font:italic 900 8px/1 Archivo,sans-serif;font-stretch:62%;letter-spacing:.14em;text-transform:uppercase;color:rgba(163,34,26,.78)}
  ${S} .q-K .q-ai{padding-left:10px}
  ${S} .q-K .q-ai>span{display:flex;align-items:center;gap:7px;min-width:0}
  /* the logo printed onto the card: multiplied, so the card's grain and colour show through; no digital outline */
  ${S} .q-K .lg{display:inline-grid!important;place-items:center;flex:none;width:26px;height:26px;border-radius:5px;box-shadow:none!important;transform:none!important;margin:0!important;mix-blend-mode:multiply;opacity:.92}
  ${S} .q-K .lg svg,${S} .q-K .lg img{width:66%;height:66%}
  ${S} .q-K .q-nm{display:grid;gap:2px;min-width:0}
  ${S} .q-K .q-nm b{font:400 17px/1 Anton,sans-serif;letter-spacing:.04em;text-transform:uppercase;text-shadow:0 1px 0 rgba(255,255,255,.6),0 -1px 0 rgba(0,0,0,.18)}
  ${S} .q-K .q-1 .q-nm b{font-size:20px}
  ${S} .q-K .q-nm span{font:600 10px/1 "Barlow Condensed",sans-serif;color:rgba(20,18,23,.62);white-space:nowrap}
  /* the last five: printed boxes, each ticked with a rubber stamp in green or red ink */
  ${S} .q-K .q-bx{display:flex;gap:2px}
  ${S} .q-K .q-bx i{position:relative;width:10px;height:11px;border:1px solid rgba(20,18,23,.62);font-style:normal}
  ${S} .q-K .q-bx i::after{position:absolute;left:50%;top:50%;transform:translate(-50%,-56%) rotate(var(--a,0deg));font:900 13.5px/1 Barlow,sans-serif;-webkit-text-stroke:.4px currentColor;filter:url(#tkWorn)}
  ${S} .q-K .q-bx i.g::after{content:"✓";color:rgba(24,122,64,.9)}${S} .q-K .q-bx i.r::after{content:"✗";color:rgba(186,38,28,.9)}
  ${S} .q-K .q-bx i:nth-child(1){--a:-8deg}${S} .q-K .q-bx i:nth-child(2){--a:5deg}${S} .q-K .q-bx i:nth-child(3){--a:-3deg}${S} .q-K .q-bx i:nth-child(4){--a:9deg}${S} .q-K .q-bx i:nth-child(5){--a:-6deg}
  ${S} .q-K .q-v{font:400 22px/1 Anton,sans-serif;text-shadow:0 1px 0 rgba(255,255,255,.6),0 -1px 0 rgba(0,0,0,.2);filter:url(#tkInk)}
  ${S} .q-K .q-1 .q-v.h{font-size:26px;color:${RED}}
  ${S} .q-K .q-v+span{white-space:nowrap;font:italic 800 8px/1 Archivo,sans-serif;font-stretch:62%;letter-spacing:.04em;text-transform:uppercase;color:rgba(20,18,23,.62)}
  ${S} .q-K .q-v.r{font-size:14px}
  ${S} .q-K .q-v.r+span{font:600 9.5px/1 "Barlow Condensed",sans-serif;letter-spacing:0;text-transform:none}
  ${S} .q-K .q-fine{margin:4px 4px 0;font:600 10.5px/1.45 "Barlow Condensed",sans-serif;letter-spacing:.07em;text-transform:uppercase;color:rgba(243,234,214,.62);text-wrap:balance}
  ${S} .q-K .q-fine b{color:#ff6158}${S} .q-K .q-fine em{font-style:normal;color:#f2b632}`;
const FILTERS=`<svg width="0" height="0" style="position:absolute" aria-hidden="true">
 <filter id="tkInk" x="-5%" y="-10%" width="110%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="5" result="t"/><feDisplacementMap in="SourceGraphic" in2="t" scale=".55" xChannelSelector="R" yChannelSelector="G" result="d"/>
  <feTurbulence type="fractalNoise" baseFrequency="2.4" numOctaves="1" seed="8" result="s"/><feColorMatrix in="s" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.6 1.95" result="m"/><feComposite in="d" in2="m" operator="in"/></filter>
 <filter id="tkWorn" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="1.5" numOctaves="2" seed="3" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.9 1.75" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in"/></filter></svg>`;
const ticket=(d,hit)=>`<div class="q-tw q-${d.rank}"><div class="q-tk"><span class="q-st"><i>Admit one</i><small>No.</small><b>${d.rank}</b></span>
  <span class="q-f q-ai"><small>AI</small><span>${d.lg}<span class="q-nm"><b>${d.name}</b><span>${d.model}</span></span></span></span>
  <span class="q-f"><small>Last 5</small><span class="q-bx" aria-hidden="true">${d.l5.map(c=>'<i class="'+c+'"></i>').join('')}</span></span>
  <span class="q-f"><small>Hit rate</small>${hit(d)}</span>
  <span class="q-f"><small>ROI</small><b class="q-v r tnum">${d.roi}</b><span class="tnum">${d.usd}</span></span></div></div>`;
const board=(D,hit)=>`<div class="q q-K">${FILTERS}${D.map(d=>ticket(d,hit)).join('')}<div class="q-fine"><b>Terms.</b> ${RULES.join(' ')}</div></div>`;
const O={
 now:{fonts:[],css:'',build:null},
 // P: all printed: the hit rate pressed into the card in ink like every other field (#1's in red ink)
 P:{fonts:[],css:TK,build:D=>board(D,d=>`<b class="q-v h tnum">${d.hit}</b><span>on direction</span>`)},
 // S: the hit rate hand-stamped onto the ticket: a worn rubber stamp, each one at its own small angle, #1's in red ink
 S:{fonts:[],css:TK+`
  ${S} .q-K .q-sp{justify-self:start;display:grid;justify-items:center;gap:1px;padding:3px 5px 2px;border:2px solid currentColor;border-radius:3px;outline:1px solid currentColor;outline-offset:1.5px;color:rgba(28,26,40,.82);transform:rotate(var(--a));filter:url(#tkWorn)}
  ${S} .q-K .q-sp b{font:400 19px/1 Anton,sans-serif}
  ${S} .q-K .q-sp span{white-space:nowrap;font:italic 900 6.5px/1 Archivo,sans-serif;font-stretch:62%;letter-spacing:.04em;text-transform:uppercase}
  ${S} .q-K .q-1 .q-sp{color:rgba(186,38,28,.9)}${S} .q-K .q-1 .q-sp b{font-size:22px}`,
  build:D=>board(D,d=>`<span class="q-sp tnum" style="--a:${[-5,3,-2,4][d.rank-1]||0}deg"><b>${d.hit}</b><span>on direction</span></span>`)},
};
(async()=>{const o=O[V];const b=await chromium.launch({args:['--ignore-certificate-errors-spki-list='+fs.readFileSync(process.env.SPKI_FILE||'spki.txt','utf8').trim()]});
const p=await b.newPage({viewport:{width:W,height:900},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://127.0.0.1:8897/'+(process.env.PAGE||'v46-live-x2plus.html'));await p.waitForTimeout(3000);
await p.evaluate(()=>{const t=document.querySelector('.x2p-ast .tk');if(t)document.documentElement.style.setProperty('--paper',getComputedStyle(t).backgroundImage.split(/,(?=\s*url\()/).filter(x=>/url\(/.test(x)).pop()||'#efe4c8')});
for(const f of o.fonts)await p.addStyleTag({url:G+f+'&display=block'});
if(o.build)await p.addStyleTag({content:BASE+o.css});
if(o.build){
  // the page's own rows, plus from the sheet: each model's exact hit rate, rounds graded, and since when #1 has led (X2's rule)
  const data=await p.evaluate(()=>{const col={GPT:3,KIMI:5,CLAUDE:7,GROK:9};const g=SHEET.filter(r=>r[12]!==''&&r[12]!=null);
   const st=n=>{const rs=g.slice(0,n);return Object.keys(col).map(k=>{const c=col[k];let made=0,right=0,miss=0;rs.forEach(r=>{if(!r[c])return;made++;const a=+r[12],d=r[c]==='UP'?1:-1;if(Math.sign(a)===d)right++;miss+=Math.abs(+r[c+1]*d-a)});return {k,made,right,hr:made?right/made:0,am:made?miss/made:0,el:made>=rs.length/2}}).sort((a,b)=>(b.el-a.el)||(b.hr-a.hr)||(a.am-b.am))};
   const now=st(g.length);let since=g.length;while(since>1&&st(since-1)[0].k===now[0].k)since--;
   const D=[...document.querySelectorAll('#standings li.lbr')].map(li=>{const name=li.querySelector('.pc-t h3').textContent.trim(),m=now.find(x=>x.k===name.toUpperCase());const bs=li.querySelectorAll('.lb-c b');
    return {rank:+li.querySelector('.rk').textContent.replace(/\D/g,''),name,model:li.querySelector('.pc-t small').textContent.trim(),lg:li.querySelector('.lg').outerHTML.replace(/ style="[^"]*transform[^"]*"/,m=>m.replace(/transform:[^;"]*;?/,'')),
     l5:[...li.querySelectorAll('.x2p-l5 .fq i')].map(i=>i.className),hit:bs[0].textContent.trim(),hitN:m?m.hr*100:parseFloat(bs[0].textContent),roi:bs[1].textContent.trim(),usd:(li.querySelector('.lb-c.roi small')||{}).textContent||'',right:m&&m.right,made:m&&m.made}});
   return {D,X:{n:g.length,since}}});
  await p.evaluate(h=>{const fl=document.querySelector('#standings .x2p-flip');const w=document.createElement('div');w.innerHTML=h;fl.before(w.firstElementChild)},o.build(data.D,data.X));
  console.log(V,'since R'+data.X.since,data.D.map(d=>d.name+' '+d.hitN.toFixed(1)).join(', '))}
await p.evaluate(()=>document.fonts.ready);
await p.evaluate(()=>{[...document.querySelectorAll('body *')].forEach(e=>{const cs=getComputedStyle(e);if((cs.position==='sticky'||cs.position==='fixed')&&e.getBoundingClientRect().top<=2&&e.offsetHeight>40&&e.offsetHeight<200)e.style.visibility='hidden'})});
await p.evaluate(()=>document.getElementById('standings').scrollIntoView());await p.waitForTimeout(700);
const c=await p.evaluate(()=>{const a=document.querySelector('#standings .sh').getBoundingClientRect(),z=document.querySelector('#standings .x2p-astf').getBoundingClientRect();return {x:0,y:a.top+scrollY-12,width:innerWidth,height:z.bottom-a.top+26}});
await p.screenshot({path:`${OUT}/r18-${V}-${W}.png`,clip:c,fullPage:true});
const m=await p.evaluate(()=>{const a=document.querySelector('#standings .sh').getBoundingClientRect(),q=document.querySelector('#standings .q')||document.querySelector('#standings .x2p-flip'),z=document.querySelector('#standings .x2p-astf').getBoundingClientRect();
 return 'board top '+Math.round(q.getBoundingClientRect().top-a.top)+'px under the head, section '+Math.round(z.bottom-a.top)+'px, page width '+document.documentElement.scrollWidth});
console.log(V,W,m,errs.length?'ERR '+errs.join('|'):'');await b.close()})();
