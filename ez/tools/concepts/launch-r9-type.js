// Round 9 mockups on the built X2+ page (owner, 2026-10-22): Fight night was the favourite, but its 01-04 blocks read like the
// board's #1-#4 ranks. Three ways without numbers (C1 a one-word key, C2 a pictogram, C3 one broadcast strap with a bug), and a
// completely different idea in place of the narration boxes (N, a neon sign). Same words as the live page.
// node launch-r9-type.js <option> <outdir>   option: C1 C2 C3 N
const { chromium } = require('playwright');const fs=require('fs');
const V=process.argv[2]||'C1',OUT=process.argv[3]||'.',W=+process.argv[4]||390,H=+process.argv[5]||844;
const G='https://fonts.googleapis.com/css2?';
const U='html.x2p.x2d[data-theme] .x2o-ul.mk';  // outranks the skin's own bullet rules
// fight night's shared bar: condensed italic capitals on ink, skewed, green and red stripes in turn
const BAR=`
  ${U}{max-width:none;gap:7px}
  ${U} li{display:grid;align-items:stretch;padding:0;background:#141217;border:2px solid #000;box-shadow:4px 4px 0 #000;transform:skewX(-9deg);margin-left:4px}
  ${U} li::before{display:none!important}
  ${U} li>.t{display:block;padding:6px 10px 6px 11px;font:italic 800 16.5px/1.12 Archivo,sans-serif;font-stretch:62%;text-transform:uppercase;letter-spacing:.01em;color:#f3ead6;transform:skewX(9deg)}
  ${U} li>.k{display:flex;align-items:center;justify-content:center;background:#f2b632;color:#000;border-right:2px solid #000}
  ${U} li:nth-child(odd){border-bottom:3px solid #1f7a45}${U} li:nth-child(even){border-bottom:3px solid #c8372a}`;
const KEYS={stb:['Calls','Graded','Public'],lrb:['Luck?','Tally'],hlb:['Top 3','How']};
const ICON={ // simple pictograms, ink on gold
  stb:['<svg viewBox="0 0 16 16"><rect x="1" y="1" width="6" height="6"/><rect x="9" y="1" width="6" height="6"/><rect x="1" y="9" width="6" height="6"/><rect x="9" y="9" width="6" height="6"/></svg>',
       '<svg viewBox="0 0 16 16"><path d="M8 1.5c-2.8 0-4.5 2.1-4.5 4.8v3.4L2 12h12l-1.5-2.3V6.3C12.5 3.6 10.8 1.5 8 1.5z"/><circle cx="8" cy="13.8" r="1.7"/></svg>',
       '<svg viewBox="0 0 16 16"><path d="M8 3.5C4.3 3.5 1.6 6.4.8 8c.8 1.6 3.5 4.5 7.2 4.5s6.4-2.9 7.2-4.5C14.4 6.4 11.7 3.5 8 3.5z"/><circle cx="8" cy="8" r="2.4" fill="#f2b632"/></svg>'],
  lrb:['<svg viewBox="0 0 16 16"><rect x="1.5" y="1.5" width="13" height="13" rx="2.5"/><g fill="#f2b632"><circle cx="5" cy="5" r="1.4"/><circle cx="11" cy="11" r="1.4"/><circle cx="8" cy="8" r="1.4"/></g></svg>',
       '<svg viewBox="0 0 16 16"><path d="M1.5 13.5l4-5 3 2.5 6-7" fill="none" stroke="#000" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/></svg>'],
  hlb:['<svg viewBox="0 0 16 16"><path d="M8 .9l2.2 4.6 5 .6-3.7 3.4 1 5L8 12l-4.5 2.5 1-5L.8 6.1l5-.6z"/></svg>',
       '<svg viewBox="0 0 16 16"><path d="M13.6 6.2A6 6 0 1 0 14 9" fill="none" stroke="#000" stroke-width="2.2" stroke-linecap="round"/><path d="M15.4 2.2v5h-5z"/></svg>']};
const BUG={stb:'Live',lrb:'The tape',hlb:'Replays'};
const O={
 // C1: the tale of the tape: a one-word key where the number was, all keys one width so the lines start together
 C1:{fonts:['family=Archivo:ital,wdth,wght@1,62..125,100..900'],css:BAR+`
  ${U} li{grid-template-columns:60px 1fr}
  ${U} li>.k{font:italic 900 12.5px/1 Archivo,sans-serif;font-stretch:62%;letter-spacing:.05em;text-transform:uppercase;transform:skewX(0)}`},
 // C2: a pictogram where the number was: four AIs, the closing bell, the public eye; a die and a trend line; a star and a flip
 C2:{fonts:['family=Archivo:ital,wdth,wght@1,62..125,100..900'],css:BAR+`
  ${U} li{grid-template-columns:34px 1fr}
  ${U} li>.k svg{width:15px;height:15px;fill:#000;transform:skewX(9deg)}`},
 // C3: one broadcast strap per section, a red bug on its corner (LIVE, THE TAPE, REPLAYS), the lines split by gold rules, no markers
 C3:{fonts:['family=Archivo:ital,wdth,wght@1,62..125,100..900'],css:`
  ${U}{max-width:none;display:block;position:relative;gap:0;background:#141217!important;border:2px solid #000!important;border-left:9px solid #f2b632!important;box-shadow:5px 5px 0 #000!important;padding:20px 12px 6px 13px!important;transform:skewX(-6deg);margin:10px 0 0 6px}
  ${U}::before{content:attr(data-bug);position:absolute;top:-11px;left:-9px;background:#c8372a;color:#f3ead6;border:2px solid #000;padding:3px 9px 2px;font:italic 900 11.5px/1 Archivo,sans-serif;font-stretch:62%;letter-spacing:.08em;text-transform:uppercase}
  ${U}::after{content:"";position:absolute;left:0;right:0;bottom:-2px;height:4px;background:linear-gradient(90deg,#1f7a45 50%,#c8372a 50%)}
  ${U} li{padding:6px 0 7px!important;border-top:1px solid rgba(242,182,50,.32);font:italic 800 16.5px/1.12 Archivo,sans-serif;font-stretch:62%;text-transform:uppercase;letter-spacing:.01em;color:#f3ead6!important;transform:skewX(6deg)}
  ${U} li:first-child{border-top:0}
  ${U} li::before{display:none!important}`},
 // N: a neon sign: one tube per line in the brand's three colours, centred, on a dark mounted panel
 N:{fonts:['family=Tilt+Neon'],css:`
  ${U}{max-width:none;gap:6px;padding:16px 14px 15px!important;background:#0b0a0f radial-gradient(120% 90% at 50% 0,#1d1a24,#0b0a0f 70%)!important;border:2px solid #000!important;box-shadow:inset 0 0 0 1px #2a2633,5px 5px 0 #000!important;border-radius:8px;justify-items:center;text-align:center}
  ${U} li{padding:0!important;font:400 19px/1.3 "Tilt Neon",sans-serif;color:#fff6dc!important;text-shadow:0 0 1px #fff,0 0 5px #f2b632,0 0 12px rgba(242,182,50,.85),0 0 26px rgba(242,182,50,.45)}
  ${U} li:nth-child(3n+2){color:#effff5!important;text-shadow:0 0 1px #fff,0 0 5px #4fe39a,0 0 12px rgba(79,227,154,.85),0 0 26px rgba(79,227,154,.45)}
  ${U} li:nth-child(3n){color:#fff0ee!important;text-shadow:0 0 1px #fff,0 0 5px #ff6158,0 0 12px rgba(255,97,88,.85),0 0 26px rgba(255,97,88,.45)}
  ${U} li::before{display:none!important}`},
};
(async()=>{const o=O[V];const b=await chromium.launch({args:['--ignore-certificate-errors-spki-list='+fs.readFileSync(process.env.SPKI_FILE||'spki.txt','utf8').trim()]});
const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html');await p.waitForTimeout(2800);
for(const f of o.fonts)await p.addStyleTag({url:G+f+'&display=block'});
await p.addStyleTag({content:o.css});
await p.evaluate(()=>Promise.all(['italic 800 16px Archivo','400 19px "Tilt Neon"'].map(l=>document.fonts.load(l))));
await p.evaluate(({V,KEYS,ICON,BUG})=>{
  document.querySelectorAll('.x2p-stb,.x2p-lrb,.x2p-hlb').forEach(ul=>{ul.classList.add('mk');const id=ul.className.match(/x2p-(stb|lrb|hlb)/)[1];ul.dataset.bug=BUG[id];
    if(V==='C1'||V==='C2')ul.querySelectorAll('li').forEach((li,i)=>{const t=li.innerHTML;li.innerHTML='<span class="k" aria-hidden="true">'+(V==='C1'?KEYS[id][i]:ICON[id][i])+'</span><span class="t">'+t+'</span>'})})},{V,KEYS,ICON,BUG});
await p.evaluate(()=>{[...document.querySelectorAll('body *')].forEach(e=>{const cs=getComputedStyle(e);if((cs.position==='sticky'||cs.position==='fixed')&&e.getBoundingClientRect().top<=2&&e.offsetHeight>40&&e.offsetHeight<200)e.style.visibility='hidden'})});
await p.waitForTimeout(500);
const clip=async(top,bot,extra)=>p.evaluate(([a,z,x])=>{const A=document.querySelector(a),Z=document.querySelector(z);const t=A.getBoundingClientRect().top+scrollY,bb=Z.getBoundingClientRect().bottom+scrollY;return {x:0,y:Math.max(0,t-14),width:innerWidth,height:bb-t+28+(x||0)}},[top,bot,extra]);
for(const [id,a,z,x] of [['st','#standings .sh','#standings li.lbr:nth-of-type(2)',0],['pr','#learn .sh','#learn .rsw2',0],['hl','#highlights .sh','#x2pHl .x2p-htag',70]]){
  await p.evaluate(s=>document.querySelector(s).scrollIntoView(),a);await p.waitForTimeout(700);
  await p.screenshot({path:`${OUT}/r9-${V}-${id}.png`,clip:await clip(a,z,x),fullPage:true})}
console.log(V,errs.length?'errors: '+errs.join(' | '):'ok');await b.close()})();
