// rounds3: node shot.js <outdir> <place,...> <w>x<h>[,...]   full chapter shots (and ?fly=1 for the open state)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fonts=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
const [OUT,PLS,SZ]=process.argv.slice(2);const FLY=process.env.FLY;
(async()=>{const b=await chromium.launch();
 for(const sz of SZ.split(',')){const[W,H]=sz.split('x').map(Number);
  for(const pl of PLS.split(',')){const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:2});await fonts(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('requestfailed',r=>er.push('404 '+r.url()));
   await p.goto(`http://localhost:8931/tools/concepts/worlds/comic/story/h/rounds3/mock.html?p=${pl}`,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);await p.evaluate(async()=>{await Promise.all([...document.images].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r})))});await p.waitForTimeout(900);
   const m=await p.evaluate(()=>{const sw=document.documentElement.scrollWidth;const cs=[...document.querySelectorAll('.cover')].slice(0,8).map(c=>{const r=c.getBoundingClientRect();return Math.round(r.width)});
     const ov=[...document.querySelectorAll('.mt .co')].filter(e=>e.scrollWidth>e.clientWidth+1).length;return{sw,cs,ov}});
   if(FLY){await p.evaluate(()=>scrollTo(0,document.querySelector('.wall').offsetTop-40));await p.waitForTimeout(300);await p.evaluate(()=>window.__fly(1));await p.waitForTimeout(1700);await p.screenshot({path:`${OUT}/${pl}-${W}-fly.png`})}
   else await p.screenshot({path:`${OUT}/${pl}-${W}.png`,fullPage:true});
   console.log(pl,W,JSON.stringify(m),er.slice(0,3));await p.close()}}
 await b.close()})();
