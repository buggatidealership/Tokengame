/* Deterministic phone walk-through of the W3 prototype.
   node walk.js <outdir> [fps] [from] [to]   (frames f0000.jpg..., 1080x1919 at deviceScaleFactor 2.7692)
   Time is virtual: the page's W3.at(t) drives every CSS transition, count-up, countdown and the film. */
const {chromium}=require('playwright');
const [out,FPS0,FROM0,TO0]=process.argv.slice(2);const FPS=+(FPS0||30),FROM=+(FROM0||0),TO=+(TO0||33);
const URL='http://localhost:8996/tools/concepts/studio/w3/index.html?virt=1&now=2026-11-09T15:00:00Z#following';
const TL=[
 {t:2.0, tap:'.strip [data-fol="KIMI"] .av', act:"W3.toggle('KIMI')"},
 {t:3.4, tap:'.strip [data-fol="KIMI"] .av', act:"W3.toggle('KIMI')"},
 {t:4.4, dur:2.8, to:'.rg[data-r="99"]', off:-118},
 {t:8.6, dur:1.3, to:'.rg[data-r="98"]', off:-118},
 {t:10.5, tap:'.rg[data-r="98"] .post[data-m="GROK"] .pl .av', act:"W3.go('ai/grok')"},
 {t:14.0, tap:'.pin[data-go] .post .pl .av', act:"W3.go('r/72')"},
 {t:16.4, dur:1.6, to:'.verdict .big', off:-120},
 {t:19.4, dur:1.3, to:'.film', off:-150},
 {t:22.6, tap:'.back', act:"W3.go('ai/grok')"},
 {t:23.3, tap:'.back', act:"W3.go('following')"},
 {t:24.0, tap:'.tabs a[href="#leaders"]', act:"W3.go('leaders')"},
 {t:26.6, tap:'#seg button[data-win="week"]', act:"W3.st.win='week';W3.render(true)"},
 {t:28.0, tap:'.tabs a[href="#upcoming"]', act:"W3.go('upcoming')"},
 {t:30.0, dur:1.8, to:'.day:nth-of-type(2)', off:-120, by:330},
];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:693},deviceScaleFactor:1080/390,timezoneId:'Europe/Berlin'});
 const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'networkidle'});await p.waitForTimeout(1500);
 await p.evaluate(()=>W3.at(0));
 const taps=[];let scroll=null;const done=new Set();
 const N=Math.round(TO*FPS);
 for(let f=0;f<=N;f++){const t=f/FPS;
  for(let i=0;i<TL.length;i++){const e=TL[i];if(done.has(i)||t<e.t)continue;done.add(i);
    if(e.tap){const r=await p.evaluate(s=>{const el=document.querySelector(s);if(!el)return null;const b=el.getBoundingClientRect();return [b.left+b.width/2,b.top+b.height/2]},e.tap);
      if(r){await p.evaluate(([x,y])=>W3.tap(x,y),r);taps.push(t)}else console.log('no tap target',e.tap)}
    if(e.act){await p.evaluate(e.act);}
    if(e.to||e.by){const y0=await p.evaluate(()=>scrollY);let y1=y0+(e.by||0);
      if(e.to&&!e.by){y1=await p.evaluate(([s,o])=>{const el=document.querySelector(s);return el?el.getBoundingClientRect().top+scrollY+o:scrollY},[e.to,e.off||0]);}
      scroll={t0:t,d:e.dur,y0,y1};}
  }
  if(scroll){const k=Math.min(1,(t-scroll.t0)/scroll.d),ez=k<.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2;await p.evaluate(y=>scrollTo(0,y),scroll.y0+(scroll.y1-scroll.y0)*ez);if(k>=1)scroll=null}
  await p.evaluate(t=>W3.at(t),t);
  if(t>=FROM){await p.screenshot({path:`${out}/f${String(f).padStart(4,'0')}.jpg`,type:'jpeg',quality:90});}
 }
 require('fs').writeFileSync(out+'/taps.json',JSON.stringify(taps));
 console.log('frames',N+1,'taps',taps,'errs',errs.slice(0,5));await b.close()})();
