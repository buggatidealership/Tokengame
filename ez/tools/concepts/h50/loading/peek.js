// quick look at the live X6+ first screen and today's cover (local build), for reference
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const out=process.argv[2]||'.';
 for(const [w,h,dpr] of [[390,844,2],[1280,800,1]]){
  const c=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:dpr,isMobile:w<600,hasTouch:w<600});
  const p=await c.newPage();
  // hold the cover: re-add x2p-cur forever
  await p.addInitScript(()=>{window.__hold=1;const H=document.documentElement;new MutationObserver(()=>{if(window.__hold&&!H.classList.contains('x2p-cur')){H.classList.add('x2p-cur');H.classList.remove('x2p-rv')}}).observe(H,{attributes:true,attributeFilter:['class']})});
  await p.goto('http://127.0.0.1:8997/v50-live-x6plus.html',{waitUntil:'load'});
  await p.waitForTimeout(2500);
  await p.screenshot({path:out+'/peek-cover-'+w+'.png'});
  await p.evaluate(()=>{window.__hold=0;document.documentElement.classList.remove('x2p-cur')});
  await p.waitForTimeout(6000);
  await p.screenshot({path:out+'/peek-first-'+w+'.png'});
  const info=await p.evaluate(()=>{const s=getComputedStyle(document.body);return {bodyBg:s.backgroundColor,bodyImg:s.backgroundImage.slice(0,200),htmlBg:getComputedStyle(document.documentElement).backgroundColor,before:getComputedStyle(document.body,'::before').backgroundImage.slice(0,120),tc:(()=>{const t=document.querySelector('#h48ov .h8-tc');if(!t)return null;const r=t.getBoundingClientRect();return [r.top,r.height,getComputedStyle(t).backgroundImage.slice(0,200)]})(),hdr:(()=>{const t=document.querySelector('header.top');if(!t)return null;const r=t.getBoundingClientRect();return [r.top,r.height,getComputedStyle(t).backgroundColor,getComputedStyle(t).backgroundImage.slice(0,100)]})()}});
  console.log(w,JSON.stringify(info));
  await c.close()}
 await b.close()})();
