const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();for(const W of [1280,390]){const p=await b.newPage({viewport:{width:W,height:1000},deviceScaleFactor:2});
await p.goto('http://localhost:8912/v47-live-x3plus.html#/upcoming',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>document.documentElement.classList.contains('sg-ready'),null,{timeout:90000});
const r=await p.evaluate(async()=>{const out=[];for(const t of ['AMZN','AAPL','AMD','ARM']){const M=await SG.get(t);const el=document.querySelector(`.sg-m[data-t="${t}"] .sg-art`);if(!el||!M)continue;const R=el.getBoundingClientRect();
 const d=2,Wc=R.width*1.2*d,Hc=R.height*1.2*d,wide=M.part.width/M.part.height>1.6,kw=wide?.8:1,kh=wide?.6:1.05;const k=Math.min(kw*Wc/M.part.width,kh*Hc/M.part.height);
 const im=new Image();im.src=SE.logo(t);await im.decode();out.push(`${t}: file ${im.naturalWidth}x${im.naturalHeight}, mark part ${M.part.width}x${M.part.height} px, drawn ${Math.round(M.part.width*k/d)}x${Math.round(M.part.height*k/d)} css = ${(k).toFixed(1)}x its native pixels at DPR 2`)}return out});
console.log(W,r.join(' | '));await p.close()}await b.close()})();
