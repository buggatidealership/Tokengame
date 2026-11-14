// node alts.js <port> <outdir> [width] : the H49 "star" alternatives, laid over the built X6+ page (ez/v50-live-x6plus.html served from ez/ on <port>)
// and shot as the title card + credits. Each take changes one thing against the built pick ("main"):
//   s-road  "Starring" lettered on the road itself, in the title's red, in perspective (no banner)
//   s-sign  "Starring" on a painted arrow signpost at the roadside by the square (no banner)
//   l-let   the line as lettering straight on the green credits (no plate), the punchline in the title's red
//   l-rib   the line's punchline on a painted ribbon scroll, the substance above it on the green
//   f-real  the cast at the cast paintings' own proportions (the first Hedra take) instead of toy proportions
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');const path=require('path');
const A='tools/concepts/worlds/cartoon/h49/star/';
const TAKES={
main:{},
's-road':{css:`html.h48 #h48ov .h49-bn{display:none}
 html.h48 #h48ov .alt-road{position:absolute;left:47.6%;top:86.6%;transform:translate(-50%,-50%) perspective(16cqw) rotateX(42deg);transform-origin:50% 60%;
   font-family:"H8 Caprasimo",serif;font-size:5.6cqw;line-height:1;white-space:nowrap;color:transparent;-webkit-text-stroke:.45cqw #24140c;paint-order:stroke fill;
   background:linear-gradient(180deg,#fff1e2,#ff7b52 55%,#d8331d);-webkit-background-clip:text;background-clip:text;opacity:.95}
 @media (min-width:1000px){html.h48 #h48ov .alt-road{left:73%;top:95.5%;font-size:3.6cqw}}`,
 js:`const st=document.querySelector('#h48ov .h49-st');st.insertAdjacentHTML('beforeend','<span class="alt-road">Starring</span>')`},
's-sign':{css:`html.h48 #h48ov .h49-bn{display:none}
 html.h48 #h48ov .alt-sign{position:absolute;left:53%;top:89.5%;width:15cqw;transform:translate(-50%,-100%)}
 html.h48 #h48ov .alt-sign img{width:100%;display:block;filter:drop-shadow(1px 2px 0 rgba(40,24,8,.35))}
 html.h48 #h48ov .alt-sign b{position:absolute;left:6%;right:20%;top:6%;height:26%;display:flex;align-items:center;justify-content:center;font-family:"H8 Caprasimo",serif;font-weight:400;font-size:2.75cqw;color:#7a2112;transform:rotate(-1.5deg)}
 @media (min-width:1000px){html.h48 #h48ov .alt-sign{left:68.5%;top:85%;width:7cqw}html.h48 #h48ov .alt-sign b{font-size:1.28cqw}}`,
 js:`const st=document.querySelector('#h48ov .h49-st');st.insertAdjacentHTML('beforeend','<span class="alt-sign"><img src="${A}alt-sign.webp" alt=""><b>Starring</b></span>')`},
'l-let':{css:`html.h48 #h48ov .h49-pm{border:0;border-image:none;padding:0;transform:none;filter:none}
 html.h48 #h48ov .h49-pm .h49-s1{font-family:"H8 Caprasimo",serif;color:#fff3d6;-webkit-text-stroke:1.6px #24140c;paint-order:stroke fill;filter:drop-shadow(2px 2px 0 #24140c);text-shadow:none;font-size:clamp(21px,6vw,28px)}
 html.h48 #h48ov .h49-pm .h49-say{text-shadow:none}`},
'l-rib':{css:`html.h48 #h48ov .h49-pm{border:0;border-image:none;padding:0;transform:none;filter:none}
 html.h48 #h48ov .h49-pm .h49-say{text-shadow:none}
 html.h48 #h48ov .h49-pm .h49-s1{font-family:"H8 Fredoka",sans-serif;font-weight:700;color:#fff6c8;font-size:clamp(19px,5.2vw,24px);line-height:1.25}
 html.h48 #h48ov .h49-pm .h49-s2{position:relative;margin:10px -6px 0;padding:4.2% 14% 6.4%;background:url(${A}alt-ribbon.webp) center/100% 100% no-repeat;text-align:center;
   --l1:#5a2410;--l2:#7a2112;--l3:#4a1a0c;filter:none;--sk:0px}
 @media (min-width:1000px){html.h48 #h48ov .h49-pm .h49-s1{color:#2e190e;font-family:"H8 Caprasimo",serif;font-weight:400}}`},
'f-real':{js:`const R={gpt:.4061,claude:.3939,grok:.4091,kimi:.4727};for(const k in R){const li=document.querySelector('#h48ov .h49-'+k);li.style.setProperty('--ar',R[k]);li.querySelector('.h49-pop img').src='${A}alt-real-'+k+'.webp'}`},
};
(async()=>{
  const [port,out,w='390']=process.argv.slice(2);fs.mkdirSync(out,{recursive:true});
  const b=await chromium.launch();
  for(const [k,T] of Object.entries(TAKES)){
    const p=await b.newPage({viewport:{width:+w,height:+w<700?844:900},deviceScaleFactor:2,reducedMotion:'reduce'});
    const errs=[];p.on('pageerror',e=>errs.push(e.message));
    await p.goto(`http://127.0.0.1:${port}/v50-live-x6plus.html`,{waitUntil:'load'});
    await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:30000});
    if(T.css)await p.addStyleTag({content:T.css});
    if(T.js)await p.evaluate(T.js);
    await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1200);
    const r=await p.evaluate(()=>{const a=document.querySelector('#h48ov .h8-tcw').getBoundingClientRect();return {y:a.top+scrollY,h:a.height}});
    await p.screenshot({path:path.join(out,`${k}-${w}.png`),clip:{x:0,y:r.y,width:+w,height:Math.ceil(r.h)},fullPage:true});
    console.log(k,w,errs.length?errs.join('|'):'ok');await p.close()}
  await b.close()})();
