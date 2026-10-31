const {open}=require('./run.js');const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const {p}=await open(b,390,'now',{wait:300});
console.log(await p.evaluate(()=>JSON.stringify({pop:!!window.POP,SE:!!window.SE,SH:!!window.SH,cls:document.documentElement.className,up:(window.UPCOMING||[]).slice(0,4).map(u=>[u.n,u.co,u.ticker,u.called]),pend:(window.PENDING||[]).slice(0,4).map(u=>[u.n,u.co,u.ticker,u.called,u.resolves,(u.calls||[]).length]),
fonts:[...document.fonts].filter(f=>f.status==='loaded').map(f=>f.family).filter((v,i,a)=>a.indexOf(v)===i),film:[...document.querySelectorAll('.wc-cover video source')].map(s=>s.src),poster:document.querySelector('.wc-cover video')&&document.querySelector('.wc-cover video').poster,
coxom:CO_LOGOS.XOM,co74:CO_LOGOS.AMZN,ink:getComputedStyle(document.documentElement).getPropertyValue('--wc-ink')})));await b.close()})();
