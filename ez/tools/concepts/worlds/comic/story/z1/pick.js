const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
 await p.goto('http://localhost:8916/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 console.log(await p.evaluate(()=>{const call=s=>{const m=/^(UP|DOWN)\s+([\d.]+)/i.exec(s||'');return m?{up:/UP/i.test(m[1]),v:+m[2]}:null};
  const c=ROUNDS.filter(r=>FILMS[r.n]&&r.win&&!/&/.test(r.win)&&r.calls.length===4).filter(r=>{const up=r.a>0,ok=r.calls.filter(x=>call(x[1]).up===up).length;return (ok===1||ok===3)&&Math.abs(r.a)>=2&&Math.abs(r.a)<=7}).map(r=>r.n+':'+r.ticker+':'+r.a+':'+r.win);
  return c.slice(-8).join(' ')+' | caps '+typeof CAPS+' '+JSON.stringify(CO_LOGOS.HOOD)+JSON.stringify(Object.values(CO_LOGOS).slice(0,4))}));await b.close()})();
