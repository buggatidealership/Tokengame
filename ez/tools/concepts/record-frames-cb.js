// Five carte-blanche frames for the X2+ record cards. The card inside (.fin) is untouched; each frame is the .face
// around it plus an overlay (.fx) that a build would add from x2plus.js. No filters or masks: the films keep playing cheaply.
const {execSync}=require('child_process');const {chromium}=require(execSync('npm root -g').toString().trim()+'/playwright');const fs=require('fs');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/';const TF='/home/user/Tokengame/ez/teaser/fonts/';
const FF=[['Anton',400,S+'trio/fonts/Anton.woff2'],['Barlow',500,TF+'barlow-500.woff2'],['Barlow',600,TF+'barlow-700.woff2'],['Barlow',700,TF+'barlow-700.woff2'],['Barlow',800,TF+'barlow-800.woff2'],['Barlow Condensed','100 900',TF+'barlow-condensed-800.woff2'],['Geist Mono','100 900',TF+'geist-mono-latin-wght-normal.woff2']];
const FCSS=FF.map((f,i)=>"@font-face{font-family:'"+f[0]+"';font-weight:"+f[1]+";src:url(https://fontfile.local/"+i+".woff2)}").join('');
const C='html.x2p #record .card',F=C+' .face',P=C+'.pend .face',X=C+' .fx';
const base=`${C} .face .fin{border-radius:4px!important;box-shadow:0 0 0 2px #000!important}
 ${X}{position:absolute;inset:0;pointer-events:none;z-index:6}html.x2p #record .car{padding-top:40px!important;padding-bottom:40px!important}`;
const V={
// 1 THE GRADED SLAB: the card sealed in an acrylic collector's case with a printed grading label, like a graded trading card
1:{css:`${F}{border-radius:16px!important;padding:92px 13px 15px!important;background:linear-gradient(125deg,rgba(255,255,255,.26) 0 8%,rgba(255,255,255,.07) 22% 58%,rgba(255,255,255,.2) 66%,rgba(255,255,255,.05) 80%),#262b38!important;
   box-shadow:0 0 0 2.5px #000,inset 0 0 0 2px rgba(255,255,255,.45),inset 0 0 0 7px rgba(0,0,0,.28),inset 0 0 0 8px rgba(255,255,255,.12),6px 7px 0 0 #000!important}
  ${X} .zlab{position:absolute;left:13px;right:13px;top:13px;height:68px;background:#f7f5ef;border:2.5px solid #c8372d;border-radius:4px;box-shadow:0 0 0 2px #000;display:grid;grid-template-columns:1fr auto;gap:2px 8px;padding:6px 8px;color:#141217}
  ${P} .fx .zlab{border-color:#d9981c}
  ${X} .zlab .zk{font:800 8px/1 'Barlow';letter-spacing:.14em;color:#c8372d;white-space:nowrap;text-transform:uppercase}${P} .fx .zlab .zk{color:#a87410}
  ${X} .zlab .zco{grid-column:1;font:400 15px/1 Anton;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  ${X} .zlab .zsub{grid-column:1;font:700 9px/1 'Barlow';letter-spacing:.06em;color:#5d564a;text-transform:uppercase}
  ${X} .zlab .zg{grid-column:2;grid-row:1/4;align-self:center;text-align:right;border-left:2px solid #141217;padding-left:8px}
  ${X} .zlab .zg small{display:block;font:800 7.5px/1 'Barlow';letter-spacing:.16em;text-transform:uppercase;color:#5d564a}
  ${X} .zlab .zg b{display:block;font:400 18px/1 Anton;white-space:nowrap;margin-top:2px}${X} .zlab .zg b.zdd{color:#c8372d}${X} .zlab .zg b.zuu{color:#11714a}
  ${X} .zlab .zbc{position:absolute;left:8px;bottom:-1px;width:64px;height:7px;background:repeating-linear-gradient(90deg,#141217 0 1.5px,transparent 1.5px 3px,#141217 3px 5px,transparent 5px 6px)}
  ${X} .zglint{position:absolute;inset:0;border-radius:16px;background:linear-gradient(118deg,transparent 0 30%,rgba(255,255,255,.10) 31% 36%,transparent 37% 40%,rgba(255,255,255,.06) 41% 43%,transparent 44%)}`,
 fx:d=>`<div class="zlab"><span class="zk">$EZ graded · #${String(d.n).padStart(5,'0')}</span><span class="zco">${d.co}</span><span class="zsub">R${d.n} · ${d.tk} · ${d.filed}</span>
   <span class="zg">${d.pend?'<small>Ungraded</small><b>'+d.res+'</b>':'<small>Moved</small><b class="'+(d.a<0?'zdd':'zuu')+'">'+(d.a<0?'▼':'▲')+Math.abs(d.a)+'%</b>'}</span><i class="zbc"></i></div><i class="zglint"></i>`},
// 2 THE HOLO TRADING CARD: foil frame, a name bar with the move as the card's "power", a set number and rarity at the bottom
2:{css:`${F}{border-radius:14px!important;padding:44px 12px 40px!important;
   background:repeating-linear-gradient(118deg,rgba(255,255,255,0) 0 16px,rgba(255,255,255,.42) 20px,rgba(255,255,255,0) 25px 44px),
   conic-gradient(from 200deg at 30% 40%,#ffe08a,#f2b632,#ff9d6b,#f2b632,#9ff0c4,#f2b632,#ffe08a)!important;box-shadow:0 0 0 3px #000,inset 0 0 0 3px rgba(255,255,255,.55),6px 7px 0 0 #000!important}
  ${P}{background:repeating-linear-gradient(118deg,rgba(255,255,255,0) 0 16px,rgba(255,255,255,.55) 20px,rgba(255,255,255,0) 25px 44px),conic-gradient(from 200deg at 30% 40%,#eef1f5,#c9ced6,#e8dff5,#c9ced6,#dff3ea,#c9ced6,#eef1f5)!important}
  ${X} .znm{position:absolute;left:12px;right:12px;top:9px;height:28px;display:flex;align-items:center;justify-content:space-between;padding:0 10px;background:#141217;border-radius:14px 14px 4px 4px;box-shadow:0 0 0 2px #000}
  ${X} .znm b{font:400 15px/1 Anton;letter-spacing:.03em;text-transform:uppercase;color:#f3ead6;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  ${X} .znm span{display:flex;align-items:center;gap:5px;font:400 15px/1 Anton;color:#f3ead6;flex:none}${X} .znm small{font:800 8px/1 Barlow;letter-spacing:.14em;color:#a49fb4}
  ${X} .znm i{display:grid;place-items:center;width:18px;height:18px;border-radius:50%;font:900 10px/1 Barlow;font-style:normal;border:2px solid #000}${X} .znm i.zdd{background:#ff6158}${X} .znm i.zuu{background:#4fe39a}${X} .znm i.zqq{background:#f2b632}
  ${X} .zft{position:absolute;left:14px;right:14px;bottom:10px;display:flex;justify-content:space-between;align-items:center;font:800 9px/1 Barlow;letter-spacing:.14em;text-transform:uppercase;color:#141217}
  ${X} .zft .zr{display:flex;gap:2px;font-size:11px;letter-spacing:0}`,
 fx:d=>`<div class="znm"><b>${d.co}</b><span>${d.pend?'<small>REVEAL</small>'+d.res+'<i class="zqq">?</i>':'<small>MOVE</small>'+Math.abs(d.a)+'%<i class="'+(d.a<0?'zdd':'zuu')+'">'+(d.a<0?'▼':'▲')+'</i>'}</span></div>
   <div class="zft"><span>$EZ · S1 · No. ${String(d.n).padStart(3,'0')}/${d.total}</span><span class="zr">${d.pend?'◇ Sealed':'★ '+d.win}</span></div>`},
// 3 THE MANGA PANEL: a heavy-ink panel bursting with speed lines, a narration box and a sound-effect stamp
3:{css:`${F}{border-radius:0!important;padding:16px!important;background:radial-gradient(closest-side,#fffaf0 55%,transparent 56%),repeating-conic-gradient(from 3deg at 50% 50%,#141217 0 1.2deg,#fffaf0 1.2deg 5.5deg)!important;box-shadow:0 0 0 4px #000,7px 8px 0 0 #b3261e,7px 8px 0 4px #000!important}
  ${P}{background:radial-gradient(closest-side,#fffaf0 55%,transparent 56%),repeating-conic-gradient(from 3deg at 50% 50%,#8f8a7e 0 1deg,#fffaf0 1deg 6deg)!important;box-shadow:0 0 0 4px #000,7px 8px 0 0 #8f8a7e,7px 8px 0 4px #000!important}
  ${X} .zcap{position:absolute;left:-8px;top:-26px;background:#fffaf0;border:3px solid #000;padding:5px 9px 4px;font:400 12px/1 Anton;letter-spacing:.12em;text-transform:uppercase;color:#141217;box-shadow:3px 3px 0 #000}
  ${X} .zsfx{position:absolute;right:-10px;bottom:-16px;transform:rotate(-9deg);font:400 26px/1 Anton;letter-spacing:.02em;color:#f2b632;-webkit-text-stroke:2px #000;text-shadow:3px 3px 0 #000,5px 5px 0 #b3261e}
  ${P} .fx .zsfx{color:#fffaf0;font-size:22px}`,
 fx:d=>`<span class="zcap">Round ${d.n} · ${d.tk}</span><span class="zsfx">${d.pend?'TICK… TOCK…':'GRADED!'}</span>`},
// 4 THE TILL: the card printing out of a $EZ receipt printer, thermal paper with a torn edge
4:{css:`${F}{border-radius:0 0 2px 2px!important;padding:30px 12px 26px!important;background:repeating-linear-gradient(0deg,rgba(20,18,23,.05) 0 1px,transparent 1px 4px),#f7f5ef!important;box-shadow:0 0 0 2px #000!important}
  ${X} .zprn{position:absolute;left:-6px;right:-6px;top:-34px;height:44px;border-radius:12px 12px 6px 6px;background:linear-gradient(#3a3f4b 0 45%,#23262e 45%);box-shadow:0 0 0 2.5px #000,inset 0 2px 0 rgba(255,255,255,.18),5px 5px 0 #000;display:flex;align-items:center;gap:7px;padding:0 12px}
  ${X} .zprn::after{content:"";position:absolute;left:16px;right:16px;bottom:5px;height:5px;border-radius:3px;background:#07070a;box-shadow:inset 0 1px 2px rgba(0,0,0,.9)}
  ${X} .zprn .zled{width:8px;height:8px;border-radius:50%;background:#4fe39a;box-shadow:0 0 0 1.5px #000,0 0 8px #4fe39a}${P} .fx .zprn .zled{background:#f2b632;box-shadow:0 0 0 1.5px #000,0 0 8px #f2b632}
  ${X} .zprn b{font:400 15px/1 Anton;letter-spacing:.02em}${X} .zprn b .zee{color:#4fe39a}${X} .zprn b .zzz{color:#ff6158}${X} .zprn b{color:#f2b632;margin-top:-10px}
  ${X} .zprn small{margin-left:auto;margin-top:-10px;font:600 9px/1 'Geist Mono',monospace;letter-spacing:.08em;color:#a49fb4}
  ${X} .ztear{position:absolute;left:0;right:0;bottom:-7px;height:12px;background:linear-gradient(135deg,#f7f5ef 6px,transparent 0) 0 0/12px 12px repeat-x,linear-gradient(-135deg,#f7f5ef 6px,transparent 0) 0 0/12px 12px repeat-x}
  ${X} .zink{position:absolute;left:14px;right:14px;bottom:7px;display:flex;justify-content:space-between;font:600 9px/1 'Geist Mono',monospace;letter-spacing:.06em;color:#141217;text-transform:uppercase}
  ${X} .zink2{position:absolute;left:14px;right:14px;top:14px;display:flex;justify-content:space-between;font:600 9px/1 'Geist Mono',monospace;letter-spacing:.06em;color:#141217;text-transform:uppercase}`,
 fx:d=>`<div class="zprn"><span class="zled"></span><b>$<span class="zee">E</span><span class="zzz">Z</span></b><small>${d.pend?'printing…':'printed'}</small></div>
   <div class="zink2"><span>#${String(d.n).padStart(4,'0')}</span><span>${d.tk} · ${d.filed}</span></div><div class="zink"><span>${d.pend?'awaiting close '+d.res:'moved '+(d.a<0?'-':'+')+Math.abs(d.a)+'%'}</span><span>${d.pend?'----':'win '+d.win}</span></div><i class="ztear"></i>`},
// 5 THE TERMINAL: a trading-desk monitor bezel with screws and a live LED ticker strip
5:{css:`${F}{border-radius:14px!important;padding:40px 13px 34px!important;background:radial-gradient(circle at 12px 12px,#8b909b 0 3px,#000 3px 4px,transparent 4.5px),radial-gradient(circle at calc(100% - 12px) 12px,#8b909b 0 3px,#000 3px 4px,transparent 4.5px),radial-gradient(circle at 12px calc(100% - 12px),#8b909b 0 3px,#000 3px 4px,transparent 4.5px),radial-gradient(circle at calc(100% - 12px) calc(100% - 12px),#8b909b 0 3px,#000 3px 4px,transparent 4.5px),linear-gradient(170deg,#3b4150 0 50%,#252a35 50%)!important;box-shadow:0 0 0 3px #000,inset 0 2px 0 rgba(255,255,255,.16),6px 7px 0 0 #f2b632,6px 7px 0 3px #000!important}
  ${P}{box-shadow:0 0 0 3px #000,inset 0 2px 0 rgba(255,255,255,.16),6px 7px 0 0 #8f8a7e,6px 7px 0 3px #000!important}
  ${X} .zled{position:absolute;left:24px;right:24px;top:10px;height:22px;border-radius:3px;background:#07080b;box-shadow:0 0 0 2px #000,inset 0 0 0 1px #1d212b;overflow:hidden;display:flex;align-items:center;gap:14px;padding:0 8px;white-space:nowrap;
    font:700 11px/1 'Geist Mono',monospace;letter-spacing:.06em;color:#ffb836;text-shadow:0 0 6px rgba(255,184,54,.7)}
  ${X} .zled::after{content:"";position:absolute;inset:0;background:radial-gradient(circle,transparent 0 .7px,rgba(0,0,0,.55) 1px) 0 0/3px 3px}
  ${X} .zled .zdd{color:#ff6158;text-shadow:0 0 6px rgba(255,97,88,.7)}${X} .zled .zuu{color:#4fe39a;text-shadow:0 0 6px rgba(79,227,154,.7)}
  ${X} .zvent{position:absolute;left:50%;bottom:9px;width:64px;margin-left:-32px;height:9px;background:repeating-linear-gradient(90deg,#11141a 0 3px,transparent 3px 6px);border-radius:2px}
  ${X} .zbrand{position:absolute;left:24px;bottom:10px;font:400 10px/1 Anton;letter-spacing:.16em;color:#a49fb4}`,
 fx:d=>`<div class="zled">${d.pend?`<span>${d.tk}</span><span>CALLS LOCKED</span><span>RESULT ${d.res.toUpperCase()}</span>`:`<span>${d.tk}</span><span class="${d.a<0?'zdd':'zuu'}">${d.a<0?'▼':'▲'} ${Math.abs(d.a)}%</span><span>${d.win.toUpperCase()} WINS</span>`}</div><i class="zvent"></i><span class="zbrand">$EZ</span>`}
};
(async()=>{const b=await chromium.launch();
 for(const k of Object.keys(V)){
  const p=await b.newPage({viewport:{width:390,height:900},deviceScaleFactor:2});
  await p.route(/fonts\.googleapis\.com/,x=>x.fulfill({contentType:'text/css',body:FCSS}));
  await p.route(/fontfile\.local/,x=>{const i=+x.request().url().match(/(\d+)\.woff2/)[1];x.fulfill({contentType:'font/woff2',body:fs.readFileSync(FF[i][2])})});
  await p.route(/fonts\.gstatic\.com/,x=>x.abort());
  await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html#/');await p.waitForTimeout(2000);
  await p.evaluate(([css,fxs])=>{const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
    const fx=new Function('d','return `'+fxs+'`');
    const mo=s=>{const m=String(s).match(/(\d+)\/(\d+)/);return m?['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][+m[1]]+' '+(+m[2]):''};
    const nm=m=>{const n=(MODELS[m]&&MODELS[m].name)||m;return n.length<=3?n:n[0]+n.slice(1).toLowerCase()};
    const total=SHEET.length;
    document.querySelector('#record .card.f-win.cur').id='geCard';
    document.querySelectorAll('#record .card').forEach(c=>{const n=+((c.querySelector('.rd')||{}).textContent||'').replace(/\D/g,'');
      const g=ROUNDS.find(r=>r.n===n),q=PENDING.find(r=>r.n===n);const r=g||q;if(!r)return;
      const d={n,co:r.co,tk:r.ticker,filed:mo(r.called),res:mo(r.resolves),pend:!g,a:g?g.a:0,win:g&&g.win?g.win.split(' & ').map(nm).join(' & '):'',total};
      c.querySelectorAll('.face').forEach(f=>{const o=document.createElement('div');o.className='fx';o.setAttribute('aria-hidden','true');o.innerHTML=fx(d);f.appendChild(o)})});
    document.documentElement.style.scrollBehavior='auto'},[V[k].css+base,V[k].fx.toString().replace(/^d=>`|`$/g,'')]);
  for(const [sel,tag] of [['#geCard','graded'],['#record .card.pend','pending'],['#geCard','back']]){
   if(tag==='back'){await p.evaluate(()=>document.querySelector('#geCard').classList.add('flipped'));await p.waitForTimeout(1400)}
   await p.evaluate(sel=>{const c=document.querySelector(sel);const sc=c.parentNode;sc.style.scrollBehavior='auto';sc.scrollLeft=c.offsetLeft-(sc.clientWidth-c.offsetWidth)/2;
     document.querySelectorAll('header').forEach(h=>h.style.position='static');const r=c.getBoundingClientRect();window.scrollTo(0,r.top+scrollY-60)},sel);
   await p.waitForTimeout(900);const c=await p.$(sel);const r=await c.boundingBox();
   await p.screenshot({path:S+'rcpt/f6-'+k+'-'+tag+'.png',clip:{x:0,y:Math.max(0,r.y-50),width:390,height:r.height+90}});
  }
  await p.close()}
 await b.close()})();
