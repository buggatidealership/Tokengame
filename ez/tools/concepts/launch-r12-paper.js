// Round 12 mockups on the built X2+ page (owner, 2026-10-22: "the theme is a bit paper manga; is there a way to use a font
// that looks a bit like paper?"). The picked broadcast straps stay (bugs, layout); only the lettering, and where an idea needs
// it the strap's material, changes. Seven paper ideas in the brand's colours, plus today's version for comparison.
// node launch-r12-paper.js <option> <outdir>   option: now O C M L T X F
const { chromium } = require('playwright');const fs=require('fs');
const V=process.argv[2]||'O',OUT=process.argv[3]||'.',W=+process.argv[4]||390;
const G='https://fonts.googleapis.com/css2?';
const S='html.x2p.x2d[data-theme] .x2p-strap',L=S+' .x2o-ul li',K=L+' b.x2p-kw';
const O={
 now:{fonts:[],css:''},
 // O: origami: each letter folded once, a lit face and a shaded face split on the diagonal, like the film's paper characters
 O:{fonts:[],css:`
  ${L}{font:400 17.5px/1.15 Anton,sans-serif!important;font-style:normal!important;letter-spacing:.03em;background:linear-gradient(162deg,#fbf3df 0 52%,#cdbf9c 52% 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;filter:drop-shadow(1.5px 1.5px 0 #000)}
  ${K}{background:linear-gradient(162deg,#ffd76a 0 52%,#c98a12 52% 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;font-weight:inherit}`},
 // C: cut from card: the letters are the "As it stands" ticket's lit card stock, cut out and laid on the strap with a hard shadow
 C:{fonts:[],css:`
  ${L}{font:400 18px/1.15 Anton,sans-serif!important;font-style:normal!important;letter-spacing:.035em;background:var(--paper);background-size:180px 180px;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;filter:drop-shadow(0 0 .4px #fff) drop-shadow(2px 2px 0 #000)}
  ${K}{background:linear-gradient(180deg,#ffe28c,#e9ab22);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}`},
 // M: manga print: cream letters printed with a halftone screentone, inked outline, like a page of a paperback manga
 M:{fonts:[],css:`
  ${L}{font:400 18px/1.15 Anton,sans-serif!important;font-style:normal!important;letter-spacing:.035em;background:radial-gradient(circle,rgba(20,18,23,.38) 0 .7px,transparent 1px) 0 0/3px 3px,#f6eedb;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;-webkit-text-stroke:.7px #000}
  ${K}{background:radial-gradient(circle,rgba(110,60,0,.45) 0 .7px,transparent 1px) 0 0/3px 3px,#f2b632;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}`},
 // L: letterpress: the strap is the ticket's cream card, the words pressed into it in ink, "before" and "after" in gold foil
 L:{fonts:[],css:`
  ${S}{background:var(--paper)!important;background-size:220px 220px!important;border-color:#000}
  ${S} .x2o-ul li{border-top-color:rgba(20,18,23,.25)!important}
  ${L}{font:400 17.5px/1.15 Anton,sans-serif!important;font-style:normal!important;letter-spacing:.035em;color:rgba(20,18,23,.88)!important;text-shadow:0 1px 0 rgba(255,255,255,.75),0 -1px 0 rgba(0,0,0,.22)}
  ${K}{color:#9a6404!important;-webkit-text-fill-color:#9a6404;text-shadow:0 1px 0 rgba(255,236,170,.9),0 -1px 0 rgba(60,35,0,.35)}`},
 // T: typewriter on torn strips: each line typed on its own torn strip of cream paper, pasted onto the strap
 T:{fonts:['family=Special+Elite'],css:`
  ${S}{padding:22px 10px 10px 12px!important}
  ${S} .x2o-ul{display:grid!important;gap:7px}
  ${L}{border-top:0!important;font:400 15.5px/1.25 "Special Elite",monospace!important;font-style:normal!important;letter-spacing:.01em;text-transform:none!important;color:#1d1a16!important;background:#f3e9d2;padding:6px 12px 6px!important;width:fit-content;max-width:100%;
     clip-path:polygon(0 4%,3% 0,9% 5%,16% 1%,24% 4%,33% 0,41% 3%,50% 0,58% 4%,67% 1%,75% 4%,84% 0,92% 3%,100% 1%,99% 96%,93% 100%,86% 95%,78% 100%,70% 96%,61% 100%,52% 95%,44% 100%,36% 96%,27% 100%,19% 95%,11% 100%,4% 96%,0 100%)}
  ${L}:nth-child(2){margin-left:8px}
  ${K}{color:#a86f00!important;text-decoration:underline 2px #f2b632;text-underline-offset:3px}`},
 // X: fax print: a strip of thermal fax paper, the words in a worn photocopy print, a leaked-memo feel
 X:{fonts:['family=Rubik+Broken+Fax'],css:`
  ${S}{background:#efeee9 linear-gradient(180deg,rgba(0,0,0,.04),transparent 30%,rgba(0,0,0,.05))!important}
  ${S} .x2o-ul li{border-top-color:rgba(0,0,0,.18)!important}
  ${L}{font:400 17px/1.2 "Rubik Broken Fax",sans-serif!important;font-style:normal!important;letter-spacing:.01em;color:#111!important}
  ${K}{color:#111!important;background:#f2b632;padding:0 3px}`},
 // F: Foldit: a variable colour font drawn as a folded paper ribbon (COLRv1; Safari draws it flat)
 F:{fonts:['family=Foldit:wght@600'],css:`
  ${L}{font:600 20px/1.2 Foldit,sans-serif!important;font-style:normal!important;letter-spacing:.02em}
  ${K}{font-weight:inherit}`},
};
(async()=>{const o=O[V];const b=await chromium.launch({args:['--ignore-certificate-errors-spki-list='+fs.readFileSync(process.env.SPKI_FILE||'spki.txt','utf8').trim()]});
const p=await b.newPage({viewport:{width:W,height:900},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://127.0.0.1:8897/'+(process.env.PAGE||'v46-live-x2plus.html'));await p.waitForTimeout(3000);
// the ticket's own lit card stock, reused as the paper
await p.evaluate(()=>{const t=document.querySelector('.x2p-ast .tk');if(t)document.documentElement.style.setProperty('--paper',getComputedStyle(t).backgroundImage.split(/,(?=\s*url\()/).filter(x=>/url\(/.test(x)).pop()||'#efe4c8')});
for(const f of o.fonts)await p.addStyleTag({url:G+f+'&display=block'});
if(o.css)await p.addStyleTag({content:o.css});
const ok=await p.evaluate(()=>Promise.all(['17px Anton','400 16px "Special Elite"','400 16px "Rubik Broken Fax"','600 20px Foldit'].map(l=>document.fonts.load(l).then(()=>document.fonts.check(l)?l.split(' ').pop():null).catch(()=>null))));
await p.evaluate(()=>{[...document.querySelectorAll('body *')].forEach(e=>{const cs=getComputedStyle(e);if((cs.position==='sticky'||cs.position==='fixed')&&e.getBoundingClientRect().top<=2&&e.offsetHeight>40&&e.offsetHeight<200)e.style.visibility='hidden'})});
await p.waitForTimeout(500);
const clip=async(a,z)=>p.evaluate(([a,z])=>{const A=document.querySelector(a),Z=document.querySelector(z);const t=A.getBoundingClientRect().top+scrollY,bb=Z.getBoundingClientRect().bottom+scrollY;return {x:0,y:Math.max(0,t-14),width:innerWidth,height:bb-t+30}},[a,z]);
for(const [id,a,z] of [['st','#standings .sh','#standings .x2p-strap'],['pr','#learn .sh','#learn .x2p-strap']]){
  await p.evaluate(s=>document.querySelector(s).scrollIntoView(),a);await p.waitForTimeout(500);
  await p.screenshot({path:`${OUT}/r12-${V}-${id}.png`,clip:await clip(a,z),fullPage:true})}
console.log(V,'fonts:',ok.filter(Boolean).join(','),errs.length?'ERR '+errs.join('|'):'');await b.close()})();
