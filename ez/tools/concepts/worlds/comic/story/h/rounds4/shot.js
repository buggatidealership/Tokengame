// rounds4: node shot.js <outdir> <place,...> <style,...> <w>x<h>[,...]   full chapter shots; FLY=1 the open state; LIVE=1 shoots today's live section instead
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fonts=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
const [OUT,PLS,STS,SZ]=process.argv.slice(2);const FLY=process.env.FLY,PORT=process.env.PORT||8931;
(async()=>{const b=await chromium.launch();
 for(const sz of SZ.split(',')){const[W,H]=sz.split('x').map(Number);
  if(process.env.LIVE){const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:2});await fonts(p);
   await p.goto(`http://localhost:${PORT}/v47-live-x3plus.html`,{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});await p.waitForTimeout(3000);
   const Hh=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<Hh;y+=700){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(200)}
   await p.addStyleTag({content:'header.top,.x2p-crawl,#x2pCrawl{display:none!important}'});const e=await p.$('section.wc-season');await e.scrollIntoViewIfNeeded();await p.waitForTimeout(1500);await e.screenshot({path:`${OUT}/live-${W}.png`});console.log('live',W);await p.close();continue}
  for(const pl of PLS.split(','))for(const st of STS.split(',')){const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:2});await fonts(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('requestfailed',r=>er.push('fail '+r.url()));p.on('console',m=>{if(m.type()==='error')er.push(m.text())});
   await p.goto(`http://localhost:${PORT}/tools/concepts/worlds/comic/story/h/rounds4/mock.html?p=${pl}&s=${st}`,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);await p.evaluate(async()=>{await Promise.all([...document.images].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r})))});await p.waitForTimeout(900);
   const m=await p.evaluate(()=>{const sw=document.documentElement.scrollWidth;const cs=[...document.querySelectorAll('.wall .cover')].map(c=>Math.round(c.getBoundingClientRect().width));
     const ov=[...document.querySelectorAll('.mt .co')].filter(e=>e.scrollWidth>e.clientWidth+1).length;const cl=[...document.querySelectorAll('.cl')].filter(e=>e.scrollWidth>e.clientWidth+1).length;return{sw,cs:[Math.min(...cs),Math.max(...cs)],ov,cl}});
   if(FLY){await p.evaluate(()=>scrollTo(0,document.querySelector('.wall').offsetTop-40));await p.waitForTimeout(300);await p.evaluate(()=>window.__fly(1));await p.waitForTimeout(1700);await p.screenshot({path:`${OUT}/${pl}-${st}-${W}-fly.png`})}
   else await p.screenshot({path:`${OUT}/${pl}-${st}-${W}.png`,fullPage:true});
   console.log(pl,st,W,JSON.stringify(m),er.slice(0,3).join(' | '));await p.close()}}
 await b.close()})();
