const {open}=require('./lib');(async()=>{const {b,p,errs}=await open(390,664);
const r=await p.evaluate(()=>({car:document.querySelectorAll('#car .card .zlab').length,mag:!!document.getElementById('x2pMag'),view:document.querySelector('#view').className,up:!!document.querySelector('.x2p-up'),
 pend:PENDING.map(u=>[u.n,u.ticker,u.called,u.resolves,(u.calls||[]).length]),up0:UPCOMING.slice(0,12).map(u=>[u.n,u.ticker,u.called,u.resolves]),nup:UPCOMING.length,
 lastR:ROUNDS.slice(-4).map(r=>[r.n,r.ticker,r.out,r.win,r.resolves||r.date]),keys:Object.keys(UPCOMING[0]),pk:PENDING[0]&&Object.keys(PENDING[0]),call0:PENDING[0]&&PENDING[0].calls[0],rk:Object.keys(ROUNDS[0]),
 sec:[...document.querySelectorAll('main.wrap > section, #view > *')].map(s=>(s.id||s.className).slice(0,40)+':'+s.offsetHeight).slice(0,30),pnl:typeof window.__x2pPnl}));
console.log(JSON.stringify(r,null,0));console.log(errs);await b.close()})();
