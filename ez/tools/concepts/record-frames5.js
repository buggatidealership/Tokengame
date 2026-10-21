// Frame-only receipt variants for the X2+ record cards: only .face (the frame around the card) changes.
const {execSync}=require('child_process');const {chromium}=require(execSync('npm root -g').toString().trim()+'/playwright');const fs=require('fs');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/';const TF='/home/user/Tokengame/ez/teaser/fonts/';
const FF=[['Anton',400,S+'trio/fonts/Anton.woff2'],['Barlow',500,TF+'barlow-500.woff2'],['Barlow',600,TF+'barlow-700.woff2'],['Barlow',700,TF+'barlow-700.woff2'],['Barlow',800,TF+'barlow-800.woff2'],['Barlow Condensed','100 900',TF+'barlow-condensed-800.woff2']];
const FCSS=FF.map((f,i)=>"@font-face{font-family:'"+f[0]+"';font-weight:"+f[1]+";src:url(https://fontfile.local/"+i+".woff2)}").join('');
const F='html.x2p #record .card .face',P='html.x2p #record .card.pend .face',I='html.x2p #record .card .face .fin';
const fin=`${I}{border-radius:3px!important;box-shadow:0 0 0 2px #000!important}html.x2p #record .car{padding-top:20px!important;padding-bottom:18px!important}`;
const V={
 // 1 Cel ticket: cream stock, one hard shadow band, ink outline, hard offset shadow, green/red rails, two side notches, a staple
 1:`${F}{border-radius:6px!important;padding:8px 15px!important;
   background:
   linear-gradient(90deg,transparent 0 5px,#1f8f55 5px 8px,transparent 8px calc(100% - 8px),#c8372d calc(100% - 8px) calc(100% - 5px),transparent calc(100% - 5px)),
   linear-gradient(162deg,#f3ead6 0 60%,#e3d2a9 60%)!important;box-shadow:0 0 0 3px #000,6px 7px 0 0 #000!important}
  ${P}{background:
   linear-gradient(90deg,transparent 0 5px,#8f8a7e 5px 8px,transparent 8px calc(100% - 8px),#8f8a7e calc(100% - 8px) calc(100% - 5px),transparent calc(100% - 5px)),
   linear-gradient(162deg,#e4e0d6 0 60%,#cfc8b8 60%)!important}
  html.x2p #record .card .cin::after{content:"";position:absolute;right:24px;top:-6px;width:5px;height:22px;border-radius:3px;background:linear-gradient(90deg,#6d6f73,#e2e4e7 45%,#7d7f83);box-shadow:0 0 0 1px #000;transform:rotate(-38deg);z-index:5}${fin}`,
 // 2 Gold slab: the site's tilted gold slab as the frame, one darker band, a serial tab
 2:`${F}{border-radius:4px!important;padding:9px!important;background:linear-gradient(166deg,#f2b632 0 66%,#d9981c 66%)!important;box-shadow:0 0 0 3px #000,6px 7px 0 0 #000!important}
  ${P}{background:linear-gradient(166deg,#d9d3c4 0 66%,#bdb5a2 66%)!important}
  ${F}::before{content:attr(data-serial);position:absolute;left:16px;top:-15px;padding:5px 9px 4px;background:#141217;color:#f2b632;font:400 12px/1 Anton,Impact,sans-serif;letter-spacing:.14em;border:2px solid #000;box-shadow:3px 3px 0 #000;transform:rotate(-4deg);z-index:3}
  ${P}::before{color:#e4e0d6}${fin}`,
 // 3 Ink frame, gold offset: dark stock, cream hairline, the hard gold offset (as on the buyback ticket), a skewed gold bar on top
 3:`${F}{border-radius:4px!important;padding:8px!important;background:#1d1a28!important;box-shadow:inset 0 0 0 2px rgba(243,234,214,.85),0 0 0 3px #000,7px 8px 0 0 #f2b632,7px 8px 0 3px #000!important}
  ${P}{box-shadow:inset 0 0 0 2px rgba(243,234,214,.55),0 0 0 3px #000,7px 8px 0 0 #8f8a7e,7px 8px 0 3px #000!important}
  ${F}::before{content:"";position:absolute;left:18px;top:-7px;width:44%;height:9px;background:#f2b632;border:2px solid #000;transform:skewX(-24deg);z-index:3}
  ${P}::before{background:#d9d3c4}
  ${F}::after{content:"";position:absolute;right:16px;bottom:-6px;width:34px;height:8px;background:linear-gradient(90deg,#4fe39a 0 50%,#ff6158 50%);border:2px solid #000;transform:skewX(-24deg);z-index:3}${fin}`,
 // 4 Receipt with a tear-off stub: cream stock, perforation with two notches, the serial printed on the stub
 4:`${F}{border-radius:5px!important;padding:8px 8px 40px!important;
   background:radial-gradient(circle at 0 calc(100% - 34px),#0d0b12 0 8px,#000 8px 11px,transparent 11.5px),radial-gradient(circle at 100% calc(100% - 34px),#0d0b12 0 8px,#000 8px 11px,transparent 11.5px),
   linear-gradient(transparent calc(100% - 35px),rgba(20,18,23,.5) calc(100% - 35px) calc(100% - 33px),transparent calc(100% - 33px)) 0 0/9px 100% repeat-x,
   linear-gradient(162deg,#f3ead6 0 62%,#e3d2a9 62%)!important;box-shadow:0 0 0 3px #000,6px 7px 0 0 #000!important}
  ${P}{background:radial-gradient(circle at 0 calc(100% - 34px),#0d0b12 0 8px,#000 8px 11px,transparent 11.5px),radial-gradient(circle at 100% calc(100% - 34px),#0d0b12 0 8px,#000 8px 11px,transparent 11.5px),
   linear-gradient(transparent calc(100% - 35px),rgba(20,18,23,.5) calc(100% - 35px) calc(100% - 33px),transparent calc(100% - 33px)) 0 0/9px 100% repeat-x,
   linear-gradient(162deg,#e4e0d6 0 62%,#cfc8b8 62%)!important}
  ${F}::after{content:attr(data-stub);position:absolute;left:0;right:0;bottom:9px;text-align:center;font:400 12px/1 Anton,Impact,sans-serif;letter-spacing:.24em;color:#141217;text-transform:uppercase}${fin}`,
 // 5 Halftone: gold stock whose shadow band is printed as halftone dots (manga screentone), cream corner brackets
 5:`${F}{border-radius:4px!important;padding:9px!important;background:linear-gradient(162deg,#f2b632 0 60%,transparent 60%),radial-gradient(circle,#b97c0c 0 1.3px,transparent 1.7px) 0 0/6px 6px,#f2b632!important;box-shadow:0 0 0 3px #000,6px 7px 0 0 #000!important}
  ${P}{background:linear-gradient(162deg,#e4e0d6 0 60%,transparent 60%),radial-gradient(circle,#c2bba9 0 1.2px,transparent 1.6px) 0 0/6px 6px,#e4e0d6!important}
  ${F}::before,${F}::after{content:"";position:absolute;width:16px;height:16px;border:3px solid #f3ead6;z-index:3}
  ${F}::before{left:-9px;top:-9px;border-right:0;border-bottom:0}${F}::after{right:-9px;bottom:-9px;border-left:0;border-top:0}${fin}`
};
(async()=>{const b=await chromium.launch();
 for(const k of Object.keys(V)){
  const p=await b.newPage({viewport:{width:390,height:900},deviceScaleFactor:2});
  await p.route(/fonts\.googleapis\.com/,x=>x.fulfill({contentType:'text/css',body:FCSS}));
  await p.route(/fontfile\.local/,x=>{const i=+x.request().url().match(/(\d+)\.woff2/)[1];x.fulfill({contentType:'font/woff2',body:fs.readFileSync(FF[i][2])})});
  await p.route(/fonts\.gstatic\.com/,x=>x.abort());
  await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html#/');await p.waitForTimeout(2000);
  await p.evaluate(css=>{const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
    document.querySelector('#record .card.f-win.cur').id='geCard';document.querySelectorAll('#record .card').forEach(c=>{const m=(c.querySelector('.rd')||{}).textContent||'';const n=(m.match(/\d+/)||[''])[0].padStart(3,'0');const pend=c.classList.contains('pend');c.querySelectorAll('.face').forEach(f=>{f.setAttribute('data-serial','No. '+n);f.setAttribute('data-stub','No. '+n+(pend?' · open':' · graded'))})});
    document.documentElement.style.scrollBehavior='auto'},V[k]);
  for(const [sel,tag] of [['#geCard','graded'],['#record .card.pend','pending'],['#geCard','back']]){
   if(tag==='back'){await p.evaluate(()=>{const c=document.querySelector('#geCard');c.classList.add('flipped')});await p.waitForTimeout(1400)}
   await p.evaluate(sel=>{const c=document.querySelector(sel);const sc=c.parentNode;sc.style.scrollBehavior='auto';sc.scrollLeft=c.offsetLeft-(sc.clientWidth-c.offsetWidth)/2;
     document.querySelectorAll('header').forEach(h=>h.style.position='static');
     const r=c.getBoundingClientRect();window.scrollTo(0,r.top+scrollY-40)},sel);
   await p.waitForTimeout(900);
   const box=await p.evaluate(()=>{const r=document.querySelector('#record .cards,#record [class*=track],#record .card').closest('div').getBoundingClientRect();return null});
   const c=await p.$(sel);const r=await c.boundingBox();
   await p.screenshot({path:S+'rcpt/f5-'+k+'-'+tag+'.png',clip:{x:0,y:Math.max(0,r.y-30),width:390,height:r.height+60}});
  }
  await p.close()}
 await b.close()})();
