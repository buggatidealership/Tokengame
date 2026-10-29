// node vshot.js <WxH> <OUT dir> <query, e.g. cast=cols&tix=flat> <what: cast|tix|rules> : screens of one mockup variant + checks
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../live-r1/_fonts.js');
const [VW,VH]=process.argv[2].split('x').map(Number),OUT=process.argv[3],QS=process.argv[4]||'',WHAT=process.argv[5],TAG=(QS||'now').replace(/[=&]/g,'-');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:VW,height:VH},deviceScaleFactor:VW<600?2:1});await FONTS(p);
 const er=[];p.on('pageerror',e=>er.push('pageerror '+e.message));p.on('console',m=>{if(m.type()==='error')er.push(m.text())});
 const go=async h=>{await p.goto('http://localhost:8897/x2p-comic-remake.html'+(QS?'?'+QS:'')+h,{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(1500)};
 const warm=async()=>{const Hh=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<Hh;y+=400){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(30)}};
 const top=async sel=>{await p.evaluate(s=>{const e=document.querySelector(s);scrollTo(0,e.getBoundingClientRect().top+scrollY-(innerWidth<600?130:120))},sel);await p.waitForTimeout(900)};
 const res={};const chk=async()=>p.evaluate(()=>({sw:document.documentElement.scrollWidth,iw:innerWidth,v:JSON.stringify(window.__c2V),err:String(window.__x2pWorldErr||'')}));
 if(WHAT==='cast'){await go('');await warm();await top('#wc-book .wc-chars');await p.screenshot({path:`${OUT}/cast-${VW}-${TAG}.png`});{const e=await p.$('#wc-book .wc-chars');await e.screenshot({path:`${OUT}/castel-${VW}-${TAG}.png`})}res.ov=await chk();
   res.cast=await p.evaluate(()=>{const s=document.querySelector('#wc-book .wc-chars');const r=s.getBoundingClientRect();const over=[...s.querySelectorAll('*')].filter(e=>{const q=e.getBoundingClientRect();return q.width&&(q.right>r.right+1||q.left<r.left-1)}).length;return {h:Math.round(r.height),over,rows:[...s.querySelectorAll('.c2-ct-r,.wc-ch')].map(x=>x.innerText.replace(/\s+/g,' ').slice(0,80))}})}
 if(WHAT==='tix'){await go('#/leaderboard');await warm();
   for(const [k,s] of [['std','#standings .stx-roll'],['proof','#learn .x2p-pt']]){await top(s);const e=await p.$(s);await e.screenshot({path:`${OUT}/tix-${VW}-${TAG}-${k}.png`})}
   res.sw=await p.evaluate(async()=>{const bs=[...document.querySelectorAll('#learn .x2p-pt button')].filter(x=>x.offsetParent);bs[1].click();await new Promise(r=>setTimeout(r,120));const anims=document.getAnimations().filter(x=>x.effect&&x.effect.target&&x.effect.target.closest&&x.effect.target.closest('#learn')).length;await new Promise(r=>setTimeout(r,1100));return 'tabs '+bs.length+', animations during switch '+anims+', pressed '+bs[1].getAttribute('aria-pressed')});
   await p.waitForTimeout(400);{const e=await p.$('#learn .x2p-pt');await e.screenshot({path:`${OUT}/tix-${VW}-${TAG}-proof2.png`})}
   res.lb=await chk();
   await go('');await warm();await top('#x2pSt .bs-roll');const e=await p.$('#x2pSt .bs-roll');await e.screenshot({path:`${OUT}/tix-${VW}-${TAG}-bet.png`});res.ov=await chk()}
 if(WHAT==='rules'){await go('#/leaderboard');await warm();await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(900);
   const n=VW<600?3:2;for(let i=0;i<n;i++){await p.evaluate(y=>scrollTo(0,y),i*(VH-60));await p.waitForTimeout(800);await p.screenshot({path:`${OUT}/rules-${VW}-${TAG}-${i}.png`})}
   res.lb=await chk();res.straps=await p.evaluate(()=>[...document.querySelectorAll('#standings .x2p-strap,#learn .x2p-strap')].map(s=>{const r=s.getBoundingClientRect();return getComputedStyle(s).display+' '+Math.round(r.width)+'x'+Math.round(r.height)+' '+s.innerText.replace(/\s+/g,' ')}))}
 console.log(VW,QS||'(default)',WHAT,JSON.stringify(res),'\nerrors:',er.join('\n')||'none');await b.close()})();
