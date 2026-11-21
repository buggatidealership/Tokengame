// Round 14 mockups on the built X2+ page (owner, 2026-10-22: the "As it stands" ticket's gold GROK and green and red sides "look
// cheap... like AI slop. It doesn't look artistic enough"). Same words, same place under the board; no foil bands, no mirror gold.
// Five crafted paper pieces in the language of round 12 (origami, letterpress), plus today's for comparison.
// node launch-r14-ticket.js <option> <outdir>   option: now L O S H K
const { chromium } = require('playwright');const fs=require('fs');
const V=process.argv[2]||'L',OUT=process.argv[3]||'.',W=+process.argv[4]||390;
const G='https://fonts.googleapis.com/css2?';
const A='html.x2p #standings .x2p-astf .tkx';
const O={
 now:{fonts:[],css:'',html:null},
 // L: letterpress card: the ticket's card stock, a printed double rule, the words pressed in ink, Grok in red ink and a size up
 L:{fonts:[],html:(b,n,a)=>`<div class="tkx tkx-L"><p>${b} <b>${n}</b> ${a}</p></div>`,css:`
  ${A}{position:relative;width:min(86%,430px);margin:8px auto 0;transform:rotate(-1.4deg);background:var(--paper) 0 0/240px 240px;padding:13px 18px 12px;text-align:center;box-shadow:3px 4px 0 #000}
  ${A}::before{content:"";position:absolute;inset:5px;border:1.5px solid rgba(20,18,23,.82)}
  ${A}::after{content:"";position:absolute;inset:8px;border:.7px solid rgba(20,18,23,.6)}
  ${A} p{text-wrap:balance;position:relative;margin:0;font:400 12.5px/1.2 Anton,sans-serif;letter-spacing:.07em;text-transform:uppercase;color:rgba(20,18,23,.88);text-shadow:0 1px 0 rgba(255,255,255,.7),0 -1px 0 rgba(0,0,0,.2)}
  ${A} b{font-weight:400;color:#a3221a;font-size:1.45em;letter-spacing:.05em;vertical-align:-1px}`},
 // O: origami: a paper strip folded once down the middle, a lit half and a shaded half, a dog-eared corner; Grok folded in gold
 O:{fonts:[],html:(b,n,a)=>`<div class="tkx tkx-O"><p>${b} <b>${n}</b> ${a}</p></div>`,css:`
  ${A}{position:relative;width:min(84%,420px);margin:8px auto 0;transform:rotate(-1.6deg);padding:12px 20px 11px;text-align:center;
    background:linear-gradient(100deg,#f8f0dd 0 49.4%,#a99b78 49.4% 50.2%,#ddd0ae 50.2% 100%);filter:drop-shadow(3px 4px 0 #000);
    clip-path:polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,0 100%)}
  ${A}::after{content:"";position:absolute;right:0;top:0;width:16px;height:16px;background:linear-gradient(225deg,transparent 50%,#c7b991 50%,#efe3c4)}
  ${A} p{text-wrap:balance;margin:0;font:400 13px/1.2 Anton,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#1b1820}
  ${A} b{font-weight:400;font-size:1.5em;letter-spacing:.04em;background:linear-gradient(162deg,#ffd76a 0 52%,#c98a12 52% 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;filter:drop-shadow(1px 1px 0 #000);vertical-align:-1px}`},
 // S: rubber stamp: an index card stamped in red ink, the words in the stamp's three rows, Grok big in the middle, worn ink
 S:{fonts:[],html:(b,n,a)=>`<div class="tkx tkx-S"><div class="st"><span>${b}</span><b>${n}</b><span>${a}</span></div></div>`,css:`
  ${A}{width:min(70%,340px);margin:8px auto 0;transform:rotate(1.2deg);background:var(--paper) 0 0/240px 240px;padding:12px 14px;box-shadow:3px 4px 0 #000}
  ${A} .st{display:grid;justify-items:center;gap:1px;padding:6px 10px 7px;border:2.5px solid #b3261e;outline:1px solid #b3261e;outline-offset:2px;transform:rotate(-3.5deg);color:#b3261e;filter:url(#mkWorn);opacity:.9}
  ${A} .st span{font:400 11px/1.15 Anton,sans-serif;letter-spacing:.12em;text-transform:uppercase}
  ${A} .st b{font:400 27px/1 Anton,sans-serif;letter-spacing:.12em;text-transform:uppercase;font-weight:400}`},
 // H: the host's note: a torn scrap of ruled paper taped under the board, written by hand, Grok circled in red pen
 H:{fonts:['family=Caveat:wght@600;700'],html:(b,n,a)=>`<div class="tkx tkx-H"><i class="tape"></i><p>${b} <b>${n}<svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true"><path d="M8 22 C 6 6, 70 2, 92 14 C 102 22, 84 36, 46 36 C 14 36, 2 28, 10 16 C 16 9, 40 5, 60 6"/></svg></b> ${a}</p></div>`,css:`
  ${A}{position:relative;width:min(84%,410px);margin:12px auto 0;transform:rotate(-1.2deg);padding:14px 16px 10px 30px;
    background:linear-gradient(90deg,transparent 21px,rgba(179,38,30,.55) 21px 22.5px,transparent 22.5px),repeating-linear-gradient(180deg,transparent 0 21px,rgba(60,80,120,.22) 21px 22px),#f4ecd8;
    clip-path:polygon(0 3px,6% 0,12% 4px,19% 1px,27% 4px,34% 0,42% 3px,50% 1px,57% 4px,65% 0,73% 3px,80% 1px,88% 4px,95% 0,100% 3px,100% 100%,0 100%);filter:drop-shadow(3px 4px 0 #000)}
  ${A} .tape{position:absolute;left:50%;top:-6px;width:70px;height:18px;transform:translateX(-50%) rotate(2deg);background:rgba(242,226,180,.6);box-shadow:0 0 0 1px rgba(0,0,0,.08)}
  ${A} p{margin:0;font:700 21px/22px Caveat,cursive;color:#1b1a22;text-align:left}
  ${A} b{position:relative;font-weight:700;font-size:1.15em;padding:0 3px}
  ${A} b svg{position:absolute;left:-8px;right:-8px;top:-5px;bottom:-5px;width:calc(100% + 16px);height:calc(100% + 10px);overflow:visible}
  ${A} b svg path{fill:none;stroke:#c8251c;stroke-width:2.2;stroke-linecap:round;vector-effect:non-scaling-stroke}`},
 // K: linocut: a carved-block print on the card, the letters' edges and ink broken like a real pull, Grok printed in a second red block
 K:{fonts:[],html:(b,n,a)=>`<div class="tkx tkx-K"><p><span>${b}</span> <b>${n}</b> <span>${a}</span></p></div>`,css:`
  ${A}{position:relative;width:min(86%,430px);margin:8px auto 0;transform:rotate(-1deg);background:var(--paper) 0 0/240px 240px;padding:12px 16px 11px;text-align:center;box-shadow:3px 4px 0 #000}
  ${A}::before{content:"";position:absolute;inset:5px;border:3px solid #17151b;border-radius:2px 5px 3px 6px;filter:url(#mkLino)}
  ${A} p{text-wrap:balance;position:relative;margin:0;font:400 13.5px/1.2 Anton,sans-serif;letter-spacing:.05em;text-transform:uppercase}
  ${A} span{color:#17151b;filter:url(#mkLino)}
  ${A} b{display:inline-block;font-weight:400;font-size:1.5em;color:#b3261e;filter:url(#mkLino);transform:translate(.6px,.4px);vertical-align:-2px}`},
};
(async()=>{const o=O[V];const b=await chromium.launch({args:['--ignore-certificate-errors-spki-list='+fs.readFileSync(process.env.SPKI_FILE||'spki.txt','utf8').trim()]});
const p=await b.newPage({viewport:{width:W,height:900},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://127.0.0.1:8897/'+(process.env.PAGE||'v46-live-x2plus.html'));await p.waitForTimeout(3000);
await p.evaluate(()=>{const t=document.querySelector('.x2p-ast .tk');if(t)document.documentElement.style.setProperty('--paper',getComputedStyle(t).backgroundImage.split(/,(?=\s*url\()/).filter(x=>/url\(/.test(x)).pop()||'#efe4c8')});
for(const f of o.fonts)await p.addStyleTag({url:G+f+'&display=block'});
if(o.css)await p.addStyleTag({content:o.css});
if(o.html){
  // the words exactly as the page has them, split around the leader's name
  const parts=await p.evaluate(()=>{const tk=document.querySelector('.x2p-ast .tk');const ink=[...tk.querySelectorAll('.ink')].map(e=>e.textContent.trim());return [ink[0]||'As it stands, we follow',tk.querySelector('em').textContent.trim(),ink[1]||'on our next bet.']});
  const html=o.html(...parts)+`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="mkWorn" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="2" seed="3" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.6 1.75" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in"/></filter>
   <filter id="mkLino" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="9" result="t"/><feDisplacementMap in="SourceGraphic" in2="t" scale="1.6" xChannelSelector="R" yChannelSelector="G" result="d"/><feTurbulence type="fractalNoise" baseFrequency="2.2" numOctaves="1" seed="4" result="s"/><feColorMatrix in="s" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -3 2.05" result="sm"/><feComposite in="d" in2="sm" operator="in"/></filter></svg>`;
  await p.evaluate(h=>{const f=document.querySelector('#standings .x2p-astf');f.innerHTML=h},html)}
await p.evaluate(()=>{[...document.querySelectorAll('body *')].forEach(e=>{const cs=getComputedStyle(e);if((cs.position==='sticky'||cs.position==='fixed')&&e.getBoundingClientRect().top<=2&&e.offsetHeight>40&&e.offsetHeight<200)e.style.visibility='hidden'})});
await p.evaluate(()=>document.querySelector('#standings li.lbr:nth-of-type(3)').scrollIntoView());await p.waitForTimeout(700);
const c=await p.evaluate(()=>{const a=document.querySelector('#standings li.lbr:nth-of-type(3)').getBoundingClientRect(),z=document.querySelector('#standings .x2p-astf').getBoundingClientRect();return {x:0,y:a.top+scrollY-8,width:innerWidth,height:z.bottom-a.top+34}});
await p.screenshot({path:`${OUT}/r14-${V}.png`,clip:c,fullPage:true});
console.log(V,errs.length?'ERR '+errs.join('|'):'ok');await b.close()})();
