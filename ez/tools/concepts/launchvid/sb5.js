// Storyboard: one still per scene of vid5 (R72 Reddit)
const {chromium}=require('playwright');const O=process.argv[2];require('fs').mkdirSync(O,{recursive:true});
const T=[1.9,4.9,7.8,10.5,12.1,15.6,19.6,22.8,25.4,28.6];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('http://localhost:8996/tools/concepts/launchvid/vid5-built.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1500);
 // run forward through time so one-way scene state builds as in the video
 let k=0;for(let f=0;f<=Math.round(28.6*30);f++){const t=f/30;await p.evaluate(t=>window.R(t),t);if(T.some(x=>Math.abs(x-t)<1/60)){await p.screenshot({path:`${O}/sb${String(k++).padStart(2,'0')}.jpg`,type:'jpeg',quality:90})}}
 console.log('stills',k,'errs',errs.join('|')||'none');await b.close()})();
