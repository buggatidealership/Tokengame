const fs=require('fs');const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/';
const W=+(process.argv[2]||390);
(async()=>{const b=await chromium.launch({args:['--proxy-server='+process.env.HTTPS_PROXY,'--ignore-certificate-errors-spki-list='+fs.readFileSync(S+'x2p/spki.txt','utf8').trim()]});
const ctx=await b.newContext({viewport:{width:W,height:900},deviceScaleFactor:2,isMobile:true,hasTouch:true,reducedMotion:'reduce'});
const p=await ctx.newPage();await p.goto('https://preview.earningszn.pages.dev/',{waitUntil:'load'});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:30000});await p.evaluate(()=>document.fonts.ready);
const t=await p.$('#learn .x2p-pt');await t.scrollIntoViewIfNeeded();await p.waitForTimeout(800);
await p.evaluate(()=>{window.__orig=document.querySelector('#learn .x2p-pt .lp.pt-3').innerHTML});
for(const o of ['now','P','N']){
 await p.evaluate(o=>{const L=document.querySelector('#learn .x2p-pt .lp.pt-3');L.innerHTML=window.__orig;if(o==='now')return;
  const narrow=innerWidth<380,cols=narrow?'11px 17px minmax(0,1fr) 38px 52px 74px':'12px 20px minmax(0,1fr) 44px 58px 86px';
  const hd=L.querySelector('.pt-hd');hd.style.gridTemplateColumns=cols;const sp=[...hd.querySelectorAll('span')];
  sp[0].textContent='Start';sp[1].textContent='ROI';sp[2].textContent=o==='P'?'Profit':'Now';sp[1].style.color='rgba(20,18,23,.55)';sp[2].style.color='rgba(20,18,23,.78)';
  [...L.querySelectorAll('.pt-r')].forEach(r=>{const v=r.querySelectorAll('.pt-v'),c=r.querySelector('.pt-c'),now=v[0],pr=v[1],up=c.classList.contains('pt-u');
    r.style.gridTemplateColumns=cols;
    const st=document.createElement('span');st.className='pt-v tnum';st.textContent='$100K';st.style.color='rgba(20,18,23,.7)';
    // ROI at the small size, the arrow kept
    c.style.fontSize='13px';c.style.justifySelf='end';
    const big=o==='P'?pr:now;const other=o==='P'?now:pr;other.remove();
    big.style.fontSize=narrow?'15.5px':'17px';big.style.justifySelf='end';big.style.fontWeight='';big.classList.remove('pt-v');big.classList.add('pt-c');
    r.insertBefore(st,c);r.appendChild(big)});
 },o);
 await p.waitForTimeout(250);
 const box=await t.boundingBox();const L=await p.$('#learn .x2p-pt .lp.pt-3');const lb=await L.boundingBox();
 await p.screenshot({path:S+'cmp/col2-'+o+'-'+W+'.png',clip:{x:box.x,y:box.y,width:box.width,height:lb.y+lb.height-box.y+14}});
 const clip=await p.evaluate(()=>{const out=[];document.querySelectorAll('#learn .x2p-pt .lp.pt-3 .pt-r').forEach(r=>{const kids=[...r.children];for(let i=0;i<kids.length;i++){const a=kids[i];if(a.scrollWidth>a.clientWidth+1)out.push('clip:'+a.textContent.trim());const ra=a.getBoundingClientRect();for(let j=i+1;j<kids.length;j++){const rb=kids[j].getBoundingClientRect();if(ra.width&&rb.width&&ra.right>rb.left+0.5&&ra.left<rb.right&&ra.top<rb.bottom&&rb.top<ra.bottom)out.push('overlap:'+a.textContent.trim()+'|'+kids[j].textContent.trim())}}});return out});
 console.log(W,o,clip.length?clip.slice(0,6):'ok');
}
await b.close()})();
