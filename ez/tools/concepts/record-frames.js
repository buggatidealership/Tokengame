// Frame-only receipt variants for the X2+ record cards: only .face (the frame around the card) changes.
const {execSync}=require('child_process');const {chromium}=require(execSync('npm root -g').toString().trim()+'/playwright');const fs=require('fs');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/';const TF='/home/user/Tokengame/ez/teaser/fonts/';
const FF=[['Anton',400,S+'trio/fonts/Anton.woff2'],['Barlow',500,TF+'barlow-500.woff2'],['Barlow',600,TF+'barlow-700.woff2'],['Barlow',700,TF+'barlow-700.woff2'],['Barlow',800,TF+'barlow-800.woff2'],['Barlow Condensed','100 900',TF+'barlow-condensed-800.woff2']];
const FCSS=FF.map((f,i)=>"@font-face{font-family:'"+f[0]+"';font-weight:"+f[1]+";src:url(https://fontfile.local/"+i+".woff2)}").join('');
const F='html.x2p #record .card .face';
const V={
 // A: the $EZ ticket, the Results tab's paper: cream with grain, green band left, red band right, scalloped sides, a staple
 a:`${F}{border-radius:0!important;padding:9px 16px!important;background-color:#f1e6cc!important;
   background-image:linear-gradient(90deg,transparent 0 4px,#1f8f55 4px 8px,transparent 8px 10px,#1f8f55 10px 12px,transparent 12px calc(100% - 12px),#c8372d calc(100% - 12px) calc(100% - 10px),transparent calc(100% - 10px) calc(100% - 8px),#c8372d calc(100% - 8px) calc(100% - 4px),transparent calc(100% - 4px)),radial-gradient(rgba(80,60,20,.09) 1px,transparent 1.2px)!important;
   background-size:100% 100%,5px 5px!important;
   -webkit-mask:radial-gradient(circle at 0 7px,transparent 3.5px,#000 4px) left/51% 14px repeat-y,radial-gradient(circle at 100% 7px,transparent 3.5px,#000 4px) right/51% 14px repeat-y;mask:radial-gradient(circle at 0 7px,transparent 3.5px,#000 4px) left/51% 14px repeat-y,radial-gradient(circle at 100% 7px,transparent 3.5px,#000 4px) right/51% 14px repeat-y}
  ${F} .fin{border-radius:3px!important;box-shadow:0 0 0 2px #141217!important}
  html.x2p #record .card{filter:drop-shadow(4px 5px 0 #000)}
  html.x2p #record .card .cin::after{content:"";position:absolute;right:22px;top:-4px;width:5px;height:22px;border-radius:3px;background:linear-gradient(90deg,#6d6f73,#d5d7da 45%,#7d7f83);transform:rotate(-38deg);z-index:5}`,
 // B: the till receipt: thermal white, torn top and bottom, a printed barcode in the bottom margin
 b:`${F}{border-radius:0!important;padding:14px 8px 34px!important;background:#f7f5ef!important;
   -webkit-mask:linear-gradient(#000,#000) center/100% calc(100% - 14px) no-repeat,conic-gradient(from -45deg at 50% 100%,#000 90deg,transparent 0) top/10px 7px repeat-x,conic-gradient(from 135deg at 50% 0,#000 90deg,transparent 0) bottom/10px 7px repeat-x;
   mask:linear-gradient(#000,#000) center/100% calc(100% - 14px) no-repeat,conic-gradient(from -45deg at 50% 100%,#000 90deg,transparent 0) top/10px 7px repeat-x,conic-gradient(from 135deg at 50% 0,#000 90deg,transparent 0) bottom/10px 7px repeat-x}
  ${F}::after{content:"";position:absolute;left:18%;right:18%;bottom:12px;height:16px;background:repeating-linear-gradient(90deg,#1b1a1d 0 2px,transparent 2px 3px,#1b1a1d 3px 4px,transparent 4px 7px,#1b1a1d 7px 9px,transparent 9px 10px,#1b1a1d 10px 11px,transparent 11px 14px)}
  ${F} .fin{border-radius:0!important;box-shadow:none!important}
  html.x2p #record .card{filter:drop-shadow(0 6px 0 rgba(0,0,0,.55))}`,
 // C: the admission stub: gold card stock, scooped corners, a punched hole at the top, the round number printed down the side
 c:`${F}{border-radius:0!important;padding:16px 8px 8px 24px!important;border-radius:6px!important;background-color:#f2b632!important;
   background-image:radial-gradient(rgba(120,80,0,.12) 1px,transparent 1.2px),repeating-linear-gradient(0deg,transparent 0 3px,rgba(255,255,255,.08) 3px 4px)!important;background-size:5px 5px,100% 100%!important;
   -webkit-mask:radial-gradient(circle at 0 74%,transparent 9px,#000 9.5px) left/51% 100% no-repeat,radial-gradient(circle at 100% 74%,transparent 9px,#000 9.5px) right/51% 100% no-repeat;
   mask:radial-gradient(circle at 0 74%,transparent 9px,#000 9.5px) left/51% 100% no-repeat,radial-gradient(circle at 100% 74%,transparent 9px,#000 9.5px) right/51% 100% no-repeat}
  html.x2p #record .card.pend .face{background-color:#d9d3c4!important}
  ${F}::before{content:attr(data-no);position:absolute;left:3px;top:50%;transform:translate(0,-50%) rotate(180deg);writing-mode:vertical-rl;font:400 11px/1 Anton,Impact,sans-serif;letter-spacing:.32em;color:#141217;opacity:.8}
  ${F}::after{content:"";position:absolute;left:50%;top:5px;width:9px;height:9px;margin-left:-4.5px;border-radius:50%;background:#0d0b12;box-shadow:inset 0 1px 1px rgba(0,0,0,.6)}
  ${F} .fin{border-radius:4px!important;box-shadow:0 0 0 2px #141217!important}`
};
(async()=>{const b=await chromium.launch();
 for(const k of Object.keys(V)){
  const p=await b.newPage({viewport:{width:390,height:900},deviceScaleFactor:2});
  await p.route(/fonts\.googleapis\.com/,x=>x.fulfill({contentType:'text/css',body:FCSS}));
  await p.route(/fontfile\.local/,x=>{const i=+x.request().url().match(/(\d+)\.woff2/)[1];x.fulfill({contentType:'font/woff2',body:fs.readFileSync(FF[i][2])})});
  await p.route(/fonts\.gstatic\.com/,x=>x.abort());
  await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html#/');await p.waitForTimeout(2000);
  await p.evaluate(css=>{const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
    document.querySelectorAll('#record .card').forEach(c=>{const m=(c.querySelector('.rd')||{}).textContent||'';const n=(m.match(/\d+/)||[''])[0];c.querySelectorAll('.face').forEach(f=>f.setAttribute('data-no','ROUND '+n))});
    document.documentElement.style.scrollBehavior='auto'},V[k]);
  for(const [sel,tag] of [['#record .card.f-win.cur','graded'],['#record .card.pend','pending']]){
   await p.evaluate(sel=>{const c=document.querySelector(sel);const sc=c.parentNode;sc.style.scrollBehavior='auto';sc.scrollLeft=c.offsetLeft-(sc.clientWidth-c.offsetWidth)/2;
     document.querySelectorAll('header').forEach(h=>h.style.position='static');
     const r=c.getBoundingClientRect();window.scrollTo(0,r.top+scrollY-40)},sel);
   await p.waitForTimeout(900);
   const box=await p.evaluate(()=>{const r=document.querySelector('#record .cards,#record [class*=track],#record .card').closest('div').getBoundingClientRect();return null});
   const c=await p.$(sel);const r=await c.boundingBox();
   await p.screenshot({path:S+'rcpt/fr-'+k+'-'+tag+'.png',clip:{x:0,y:Math.max(0,r.y-30),width:390,height:r.height+60}});
  }
  await p.close()}
 await b.close()})();
