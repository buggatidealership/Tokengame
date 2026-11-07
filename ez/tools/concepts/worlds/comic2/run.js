// node run.js [390x844] [OUT] [tabs: ov,lb,up] : screens of the comic remake (ez/x2p-comic-remake.html), plus checks
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../live-r1/_fonts.js');
const [VW,VH]=(process.argv[2]||'390x844').split('x').map(Number),OUT=process.argv[3]||'.',TABS=(process.argv[4]||'ov,lb,up').split(','),N=+(process.env.N||(VW<600?9:5));
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:VW,height:VH},deviceScaleFactor:VW<600?2:1});await FONTS(p);
 const er=[];p.on('pageerror',e=>er.push('pageerror '+e.message));p.on('console',m=>{if(m.type()==='error')er.push(m.text())});
 const go=async h=>{await p.goto('http://localhost:8897/x2p-comic-remake.html'+h,{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(1200)};
 const shots=async(tag,n)=>{const Hh=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<Hh;y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(40)}
  await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(900);
  const vh=await p.evaluate(()=>innerHeight),hh=await p.evaluate(()=>document.documentElement.scrollHeight);n=Math.min(n,Math.ceil(hh/vh));for(let i=0;i<n;i++){await p.evaluate(y=>scrollTo(0,y),i*VH);await p.waitForTimeout(900);await p.screenshot({path:`${OUT}/c2-${VW}-${tag}-${i}.png`})}
  return p.evaluate(()=>({sw:document.documentElement.scrollWidth,iw:innerWidth,h:document.documentElement.scrollHeight,err:String(window.__x2pWorldErr||'')}))};
 const res={};
 if(TABS.includes('ov')){await go('');res.ov=await shots('ov',N);
  await p.evaluate(()=>document.querySelector('#x2pSt .x2p-bt').scrollIntoView({block:'center'}));await p.waitForTimeout(500);const c1=await (await p.$('#x2pSt .x2p-bt')).screenshot();await p.waitForTimeout(2100);const c2=await (await p.$('#x2pSt .x2p-bt')).screenshot();res.bet={vis:await p.evaluate(()=>document.getElementById('x2pSt').getBoundingClientRect().height),countdownMoved:!c1.equals(c2)};
  res.pop=await p.evaluate(async()=>{const a=document.querySelector('#wc-book .wc-bis a,#wc-book .wc-bi');if(!a)return 'no back issue';a.scrollIntoView({block:'center'});a.click();await new Promise(r=>setTimeout(r,2500));const r=document.getElementById('x2pRm');return r?'open '+Math.round(r.getBoundingClientRect().width)+' '+location.hash:'none'});
  await p.screenshot({path:`${OUT}/c2-${VW}-pop.png`})}
 if(TABS.includes('lb')){await go('#/leaderboard');res.lb=await shots('lb',VW<600?4:3);
  res.sw=await p.evaluate(async()=>{const bs=[...document.querySelectorAll('#learn .x2p-pt button,#learn [data-pt]')].filter(x=>x.offsetParent);if(bs.length<2)return 'no tabs '+bs.length;const cd=document.querySelector('#learn .pt-cd');const a=[];const ob=new MutationObserver(()=>{});
   bs[1].scrollIntoView({block:'center'});bs[1].click();await new Promise(r=>setTimeout(r,120));const anims=document.getAnimations().filter(x=>x.effect&&x.effect.target&&x.effect.target.closest&&x.effect.target.closest('#learn')).length;await new Promise(r=>setTimeout(r,900));return 'tabs '+bs.length+', animations during switch '+anims+', pressed '+bs[1].getAttribute('aria-pressed')});
  await p.evaluate(()=>document.querySelector('#learn').scrollIntoView());await p.waitForTimeout(800);await p.screenshot({path:`${OUT}/c2-${VW}-lb-acc.png`})}
 if(TABS.includes('up')){await go('#/upcoming');res.up=await shots('up',2)}
 console.log(VW,JSON.stringify(res),'\nerrors:',er.join('\n')||'none');await b.close()})();
