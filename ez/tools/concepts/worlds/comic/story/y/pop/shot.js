const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fonts=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1300,height:640},deviceScaleFactor:2});await fonts(p);
 // data from the real page
 const q=await b.newPage();await q.goto('http://localhost:8897/v47-live-x3plus.html',{waitUntil:'load'});await q.waitForFunction(()=>window.__x2pPnl&&window.ROUNDS,null,{timeout:60000});
 const D=await q.evaluate(()=>{const A=window.__x2pPnl().A,ms=Object.keys(A).sort((a,b)=>A[b].pnl-A[a].pnl),R=ROUNDS[ROUNDS.length-1],f=v=>(v<0?'−':'+')+'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
  return {lead:ms[0],leadName:MODELS[ms[0]].ver,leadPnl:f(A[ms[0]].pnl),order:ms,last:{n:R.n,co:R.co,ticker:R.ticker},models:MODELS}});
 await p.goto('file://'+__dirname+'/pop.html');await p.evaluate(D=>{window.MODELS=D.models},D);await p.evaluate(()=>document.fonts.ready);await p.evaluate(D=>draw(D),D);await p.waitForTimeout(800);
 await p.screenshot({path:process.argv[2],clip:{x:0,y:0,width:900,height:620}});console.log(JSON.stringify({lead:D.lead,pnl:D.leadPnl,last:D.last}));await b.close()})();
