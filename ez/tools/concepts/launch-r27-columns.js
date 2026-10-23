const fs=require('fs');const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/';
const W=+(process.argv[2]||390);
(async()=>{const b=await chromium.launch({args:['--proxy-server='+process.env.HTTPS_PROXY,'--ignore-certificate-errors-spki-list='+fs.readFileSync(S+'x2p/spki.txt','utf8').trim()]});
const ctx=await b.newContext(W<700?{viewport:{width:W,height:900},deviceScaleFactor:2,isMobile:true,hasTouch:true,reducedMotion:'reduce'}:{viewport:{width:W,height:900},deviceScaleFactor:1,reducedMotion:'reduce'});
const p=await ctx.newPage();await p.goto('https://preview.earningszn.pages.dev/',{waitUntil:'load'});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:30000});await p.evaluate(()=>document.fonts.ready);
const t=await p.$('#learn .x2p-pt');await t.scrollIntoViewIfNeeded();await p.waitForTimeout(800);
await p.evaluate(()=>{window.__orig=document.querySelector('#learn .x2p-pt .lp.pt-3').innerHTML});
const opts=['now','A','B','C','D'];
for(const o of opts){
 await p.evaluate(o=>{const L=document.querySelector('#learn .x2p-pt .lp.pt-3');L.innerHTML=window.__orig;if(o==='now')return;
  const hd=L.querySelector('.pt-hd'),rows=[...L.querySelectorAll('.pt-r')];
  const narrow=innerWidth<380;
  const colsA=narrow?'11px 17px minmax(0,1fr) 48px 62px 50px':'12px 20px minmax(0,1fr) 56px 74px 58px';
  rows.forEach(r=>{const v=r.querySelectorAll('.pt-v'),c=r.querySelector('.pt-c'),now=v[0],pr=v[1],up=c.classList.contains('pt-u');
    if(o==='A'){const st=now.cloneNode(true);st.className='pt-v tnum';st.textContent='$100,000';st.style.color='rgba(20,18,23,.72)';
      r.insertBefore(st,now);now.remove();c.style.justifySelf='end';r.appendChild(pr);r.style.gridTemplateColumns=colsA}
    if(o==='B'){now.remove();r.appendChild(pr);c.style.justifySelf='end';r.style.gridTemplateColumns=narrow?'11px 17px minmax(0,1fr) 64px 62px':'12px 20px minmax(0,1fr) 76px 70px'}
    if(o==='C'){now.remove();c.remove();pr.style.fontSize='17px';pr.className=pr.className.replace('pt-v','pt-c');pr.style.justifySelf='end';r.style.gridTemplateColumns=narrow?'11px 17px minmax(0,1fr) 92px':'12px 20px minmax(0,1fr) 100px'}
    if(o==='D'){now.remove();pr.remove();r.style.gridTemplateColumns=narrow?'11px 17px minmax(0,1fr) 70px':'12px 20px minmax(0,1fr) 80px'}});
  const sp=[...hd.querySelectorAll('span')];
  if(o==='A'){sp[0].textContent='Start';sp[1].textContent='ROI';sp[2].textContent='Profit';hd.style.gridTemplateColumns=colsA;sp[1].style.color='rgba(20,18,23,.78)';sp[2].style.color='rgba(20,18,23,.55)'}
  const lead=(txt)=>{const i=hd.querySelectorAll('i');const s=document.createElement('span');s.textContent=txt;s.style.textAlign='left';s.style.gridColumn='1 / 4';s.style.letterSpacing='.12em';i.forEach(x=>x.remove());hd.insertBefore(s,hd.firstChild)};
  if(o==='B'){sp[0].remove();sp[1].textContent='ROI';sp[2].textContent='Profit';sp[1].style.color='rgba(20,18,23,.78)';sp[2].style.color='rgba(20,18,23,.55)';lead('Each started with $100,000');hd.style.gridTemplateColumns=narrow?'11px 17px minmax(0,1fr) 64px 62px':'12px 20px minmax(0,1fr) 76px 70px'}
  if(o==='C'){sp[0].remove();sp[2].remove();sp[1].textContent='Profit';lead('Each started with $100,000');hd.style.gridTemplateColumns=narrow?'11px 17px minmax(0,1fr) 92px':'12px 20px minmax(0,1fr) 100px'}
  if(o==='D'){sp[0].remove();sp[1].remove();lead('Each started with $100,000');hd.style.gridTemplateColumns=narrow?'11px 17px minmax(0,1fr) 70px':'12px 20px minmax(0,1fr) 80px'}
 },o);
 await p.waitForTimeout(250);
 const box=await t.boundingBox();const L=await p.$('#learn .x2p-pt .lp.pt-3');const lb=await L.boundingBox();
 await p.screenshot({path:S+'cmp/col-'+o+'-'+W+'.png',clip:{x:box.x,y:box.y,width:box.width,height:lb.y+lb.height-box.y+14}});
 const clip=await p.evaluate(()=>[...document.querySelectorAll('#learn .x2p-pt .lp.pt-3 .pt-r > *')].some(e=>e.scrollWidth>e.clientWidth+1));console.log(W,o,'clipped text?',clip);
}
await b.close()})();
