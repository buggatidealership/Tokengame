// Round 8 mockups on the built X2+ page (owner, 2026-10-22): the section bullets' type ("the font is a bit boring";
// carte blanche, "you can only disappoint me when I can predict what you would do"), and the standings in more words for
// visitors who skip the film. Six ideas, each its own world, in the brand's colours (gold, cream, ink, green, red).
// node launch-r8-type.js <option> <outdir>   option: now A B C D E F
const { chromium } = require('playwright');const fs=require('fs');
const V=process.argv[2]||'now',OUT=process.argv[3]||'.',W=+process.argv[4]||390,H=+process.argv[5]||844;
const ST=["Four AIs call each stock before it reports.","Ranked by how often they call up or down right.","We bet our pool on #1's call. $EZ fees fill it.","Right: profits buy back $EZ. Wrong: it can be wiped out."];
const G='https://fonts.googleapis.com/css2?';
const U='html.x2p.x2d[data-theme] .x2o-ul.mk';  // outranks the skin's own bullet rules (html.x2p.x2d[data-theme="dark"] .x2o-ul ...)
const O={
 now:{fonts:[],css:''},
 // A: the arena's scoreboard, the bet ticket's LED digits grown into lines
 A:{fonts:['family=Doto:ROND,wght@0..100,100..900'],load:['800 16px Doto'],css:`
  ${U}{max-width:none;gap:8px;padding:13px 14px 14px!important;background:#0c0b10 radial-gradient(circle,rgba(242,182,50,.09) 0 .9px,transparent 1.2px) 0 0/4px 4px!important;border:3px solid #000!important;box-shadow:inset 0 0 0 1px #3a3546,5px 5px 0 #000!important;border-radius:3px}
  ${U} li{font:800 15.5px/1.32 Doto,monospace;font-variation-settings:'ROND' 100;text-transform:uppercase;letter-spacing:.01em;color:#f2b632!important;text-shadow:0 0 7px rgba(242,182,50,.55);padding-left:17px;text-wrap:pretty}
  ${U} li::before{width:7px!important;height:7px!important;border-radius:50%!important;top:.42em!important;transform:none!important;background:#4fe39a!important;box-shadow:0 0 7px #4fe39a!important}
  ${U} .r{color:#4fe39a!important;text-shadow:0 0 7px rgba(79,227,154,.6)}${U} .w{color:#ff6158!important;text-shadow:0 0 7px rgba(255,97,88,.6)}`},
 // B: anime narration boxes, the cel look's own way of talking, in a living marker hand
 B:{fonts:['family=Shantell+Sans:ital,wght,BNCE,INFM@0,300..800,-100..100,0..100'],load:['600 16px "Shantell Sans"'],css:`
  ${U}{max-width:none;gap:11px;justify-items:start}
  ${U} li{font:650 15.5px/1.28 "Shantell Sans",sans-serif;font-variation-settings:'INFM' 75,'BNCE' 30;color:#141217!important;background:#f3ead6;border:2px solid #000;box-shadow:3px 3px 0 #000;padding:6px 12px 7px;transform:rotate(-.9deg);text-wrap:pretty}
  ${U} li:nth-child(2n){transform:rotate(.7deg);margin-left:10px}
  ${U} li:first-child{background:#f2b632}
  ${U} li::before{display:none}
  ${U} .r{color:#1f7a45!important}${U} .w{color:#b3261e!important}`},
 // C: fight-night broadcast, lower thirds sliding in under the tale of the tape
 C:{fonts:['family=Archivo:ital,wdth,wght@1,62..125,100..900'],load:['italic 800 17px Archivo'],css:`
  ${U}{max-width:none;gap:7px;counter-reset:b}
  ${U} li{counter-increment:b;display:grid;grid-template-columns:34px 1fr;align-items:stretch;padding:0;background:#141217;border:2px solid #000;box-shadow:4px 4px 0 #000;transform:skewX(-9deg);margin-left:4px}
  ${U} li>span{display:block;padding:6px 10px 6px 11px;font:italic 800 16.5px/1.12 Archivo,sans-serif;font-stretch:62%;text-transform:uppercase;letter-spacing:.01em;color:#f3ead6;transform:skewX(9deg)}
  ${U} li::before{content:counter(b,decimal-leading-zero);position:static!important;width:auto!important;height:auto!important;border-radius:0!important;transform:none!important;box-shadow:none!important;display:flex;align-items:center;justify-content:center;background:#f2b632!important;color:#000;font:italic 900 15px/1 Archivo,sans-serif;font-stretch:62%;border-right:2px solid #000}
  ${U} li:nth-child(odd){border-bottom:3px solid #1f7a45}${U} li:nth-child(even){border-bottom:3px solid #c8372a}
  ${U} .r{color:#4fe39a!important}${U} .w{color:#ff6158!important}`},
 // D: the magazine's deck, a quiet serif italic against the shouting Anton heads
 D:{fonts:['family=Instrument+Serif:ital@0;1'],load:['italic 400 22px "Instrument Serif"'],css:`
  ${U}{max-width:none;gap:0;counter-reset:b}
  ${U} li{counter-increment:b;font:italic 400 21.5px/1.13 "Instrument Serif",Georgia,serif;color:#f3ead6!important;padding:9px 0 10px 30px;border-top:1px solid rgba(243,234,214,.2);text-wrap:pretty}
  ${U} li:last-child{border-bottom:1px solid rgba(243,234,214,.2)}
  ${U} li::before{content:counter(b);position:absolute;left:1px!important;top:12px!important;width:auto!important;height:auto!important;background:none!important;box-shadow:none!important;transform:none!important;font:400 15px/1 Anton,sans-serif;color:#f2b632}
  ${U} .r,${U} .w{font:400 13px/1 Anton,sans-serif;font-style:normal;letter-spacing:.06em;text-transform:uppercase;vertical-align:2px}
  ${U} .r{color:#4fe39a!important}${U} .w{color:#ff6158!important}`},
 // E: the trading desk, a terminal feed with a gold title bar and a live cursor
 E:{fonts:['family=Space+Mono:wght@400;700'],load:['400 14px "Space Mono"','700 14px "Space Mono"'],css:`
  ${U}{max-width:none;position:relative;gap:6px;padding:36px 12px 13px!important;background:#0c0b10!important;border:3px solid #000!important;box-shadow:inset 0 0 0 1px #3a3546,5px 5px 0 #000!important;border-radius:3px}
  ${U}::before{content:attr(data-h);position:absolute;left:0;right:0;top:0;height:23px;background:#f2b632;color:#000;font:700 10.5px/23px "Space Mono",monospace;letter-spacing:.06em;padding:0 10px;border-bottom:2px solid #000}
  ${U} li{font:400 13.5px/1.45 "Space Mono",monospace;color:#f3ead6!important;padding-left:18px}
  ${U} li::before{content:"›";position:absolute;left:1px!important;top:0!important;width:auto!important;height:auto!important;background:none!important;box-shadow:none!important;transform:none!important;font:700 13.5px/1.45 "Space Mono",monospace;color:#4fe39a}
  ${U} li:last-child::after{content:"";display:inline-block;width:.62em;height:1.05em;margin-left:5px;vertical-align:-3px;background:#f2b632}
  ${U} .r{color:#4fe39a!important;font-weight:700}${U} .w{color:#ff6158!important;font-weight:700}`},
 // F: the ransom note, every word cut from a different page of the site, CT-meme loud
 F:{fonts:['family=Doto:wght@800','family=Shantell+Sans:wght@650','family=Instrument+Serif:ital@1','family=Archivo:ital,wdth,wght@1,62,800','family=Space+Mono:wght@700'],
   load:['800 16px Doto','650 16px "Shantell Sans"','italic 400 20px "Instrument Serif"','italic 800 16px Archivo','700 14px "Space Mono"'],css:`
  ${U}{max-width:none;gap:9px}
  ${U} li{display:flex;flex-wrap:wrap;align-items:center;gap:4px 3px;padding-left:0;line-height:1}
  ${U} li::before{display:none}
  ${U} .cw{display:inline-block;padding:3px 5px 2px;box-shadow:1.5px 1.5px 0 #000;border:1px solid rgba(0,0,0,.6)}`},
};
(async()=>{const o=O[V];const b=await chromium.launch({args:['--ignore-certificate-errors-spki-list='+fs.readFileSync(process.env.SPKI_FILE||'spki.txt','utf8').trim()]});
const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html');await p.waitForTimeout(2800);
for(const f of o.fonts)await p.addStyleTag({url:G+f+'&display=block'});
if(o.css)await p.addStyleTag({content:o.css});
const ok=await p.evaluate(async(L)=>{const r=[];for(const l of L){try{await document.fonts.load(l);r.push(l+':'+document.fonts.check(l))}catch(e){r.push(l+':ERR')}}return r},o.load||[]);
await p.evaluate(({ST,V})=>{
  const sl=document.querySelector('#standings .x2p-stb');sl.innerHTML=ST.map(t=>'<li>'+t+'</li>').join('');
  // the highlights' two lines (owner, 2026-10-22): the first names the three kinds from the cards' own tags
  const hs=document.querySelector('#highlights .sh');if(hs&&!hs.querySelector('.x2p-hlb')){const tags=[...document.querySelectorAll('#x2pHl .x2p-htag')].map(t=>t.textContent.trim());
    const u=document.createElement('ul');u.className='x2o-ul lede x2p-hlb';u.innerHTML='<li>'+tags.map(t=>t.charAt(0).toUpperCase()+t.slice(1).toLowerCase()+'.').join(' ')+'</li><li>Swipe for more. Flip a card for the story.</li>';hs.appendChild(u)}
  document.querySelectorAll('.x2p-stb,.x2p-lrb,.x2p-hlb,.x2o-rec').forEach(ul=>{ul.classList.add('mk');
    ul.dataset.h=ul.classList.contains('x2p-stb')?'EZ:// STANDINGS · LIVE':ul.classList.contains('x2p-lrb')?'EZ:// THE PROOF':ul.classList.contains('x2p-hlb')?'EZ:// HIGHLIGHTS':'EZ:// THE RECORD';
    ul.querySelectorAll('li').forEach(li=>{if(li.querySelector('a'))return;li.innerHTML=li.textContent.replace(/^(Right:)/,'<b class="r">$1</b>').replace(/(Wrong:)/,'<b class="w">$1</b>');
      if(V==='C')li.innerHTML='<span>'+li.innerHTML+'</span>'});
    if(V==='F'){let s=7;const rnd=()=>(s=(s*16807)%2147483647)/2147483647;
      const F=[["Anton",400,"normal",17,0],["Doto",800,"normal",16,1],["Shantell Sans",650,"normal",16,0],["Instrument Serif",400,"italic",20,0],["Archivo",800,"italic",16,1],["Space Mono",700,"normal",13.5,0]];
      const C=[["#f3ead6","#141217"],["#f2b632","#141217"],["#1f7a45","#f3ead6"],["#c8372a","#f3ead6"],["#141217","#f2b632"],["#f3e6c8","#b3261e"]];
      ul.querySelectorAll('li').forEach(li=>{if(li.querySelector('a'))return;const words=li.textContent.split(/\s+/);li.innerHTML='';
        words.forEach(w=>{const f=F[Math.floor(rnd()*F.length)],c=C[Math.floor(rnd()*C.length)];const e=document.createElement('span');e.className='cw';e.textContent=f[4]?w.toUpperCase():w;
          e.style.cssText=`font-family:"${f[0]}";font-weight:${f[1]};font-style:${f[2]};font-size:${f[3]}px;${f[0]==='Archivo'?'font-stretch:62%;':''}background:${c[0]};color:${c[1]};transform:rotate(${(rnd()*7-3.5).toFixed(1)}deg)`;
          if(/^Right:/.test(w)){e.style.background='#1f7a45';e.style.color='#f3ead6'}if(/^Wrong:/.test(w)){e.style.background='#c8372a';e.style.color='#f3ead6'}li.appendChild(e)})})}
  });
},{ST,V});
// the sticky header stays out of the crops
await p.evaluate(()=>{[...document.querySelectorAll('body *')].forEach(e=>{const cs=getComputedStyle(e);if((cs.position==='sticky'||cs.position==='fixed')&&e.getBoundingClientRect().top<=2&&e.offsetHeight>40&&e.offsetHeight<200)e.style.visibility='hidden'})});
await p.waitForTimeout(500);
// crops: the standings head, its bullets and the first two rows; the proof head, its bullets and the stats switch
const clip=async(top,bot)=>p.evaluate(([a,z])=>{const A=document.querySelector(a),Z=document.querySelector(z);const t=A.getBoundingClientRect().top+scrollY,bb=Z.getBoundingClientRect().bottom+scrollY;return {x:0,y:Math.max(0,t-14),width:innerWidth,height:bb-t+28}},[top,bot]);
await p.evaluate(()=>document.getElementById('standings').scrollIntoView());await p.waitForTimeout(400);
const c1=await clip('#standings .sh','#standings li.lbr:nth-of-type(2)');await p.screenshot({path:`${OUT}/r8-${V}-st.png`,clip:c1,fullPage:true});
await p.evaluate(()=>document.getElementById('learn').scrollIntoView());await p.waitForTimeout(400);
const c2=await clip('#learn .sh','#learn .rsw2');await p.screenshot({path:`${OUT}/r8-${V}-pr.png`,clip:c2,fullPage:true});
await p.evaluate(()=>document.getElementById('highlights').scrollIntoView());await p.waitForTimeout(900);
const c3=await clip('#highlights .sh','#x2pHl .x2p-htag');c3.height+=70;await p.screenshot({path:`${OUT}/r8-${V}-hl.png`,clip:c3,fullPage:true});
console.log(V,JSON.stringify(ok),errs.length?'errors: '+errs.join(' | '):'');await b.close()})();
