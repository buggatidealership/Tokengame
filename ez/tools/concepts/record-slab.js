// Five carte-blanche frames for the X2+ record cards. The card inside (.fin) is untouched; each frame is the .face
// around it plus an overlay (.fx) that a build would add from x2plus.js. No filters or masks: the films keep playing cheaply.
const {execSync}=require('child_process');const {chromium}=require(execSync('npm root -g').toString().trim()+'/playwright');const fs=require('fs');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/';const TF='/home/user/Tokengame/ez/teaser/fonts/';
const FF=[['Anton',400,S+'trio/fonts/Anton.woff2'],['Barlow',500,TF+'barlow-500.woff2'],['Barlow',600,TF+'barlow-700.woff2'],['Barlow',700,TF+'barlow-700.woff2'],['Barlow',800,TF+'barlow-800.woff2'],['Barlow Condensed','100 900',TF+'barlow-condensed-800.woff2'],['Geist Mono','100 900',TF+'geist-mono-latin-wght-normal.woff2']];
const FCSS=FF.map((f,i)=>"@font-face{font-family:'"+f[0]+"';font-weight:"+f[1]+";src:url(https://fontfile.local/"+i+".woff2)}").join('');
const C='html.x2p #record .card',F=C+' .face',P=C+'.pend .face',X=C+' .fx';
const base=`${C} .face .fin{border-radius:4px!important;box-shadow:0 0 0 2px #000!important}
 ${X}{position:absolute;inset:0;pointer-events:none;z-index:6}html.x2p #record .car{padding-top:40px!important;padding-bottom:40px!important}`;

const LAB=`${F}{border-radius:16px!important;padding:96px 12px 14px!important}
 ${C} .face .fin{border-radius:5px!important;box-shadow:0 0 0 2px #000,0 0 0 5px rgba(0,0,0,.22)!important}
 ${X} .zlab{--lab:#c8372d;--on:#fff;position:absolute;left:12px;right:12px;top:12px;height:72px;background:#f8f4ea;border-radius:6px;box-shadow:0 0 0 2px #000,inset 0 0 0 3px var(--lab);display:grid;grid-template-columns:minmax(0,1fr) 64px;overflow:hidden;color:#141217}
 ${P} .fx .zlab{--lab:#f2b632;--on:#141217}
 ${X} .zl{display:grid;align-content:center;gap:3px;padding:6px 8px 6px 11px;min-width:0;position:relative}
 ${X} .zk{font:800 7.5px/1 Barlow;letter-spacing:.2em;text-transform:uppercase;color:var(--lab);white-space:nowrap}${P} .fx .zk{color:#a87410}
 ${X} .zco{font:400 16px/1 Anton;letter-spacing:.01em;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
 ${X} .zsub{font:700 8.5px/1 Barlow;letter-spacing:.1em;text-transform:uppercase;color:#5d564a;white-space:nowrap}
 ${X} .zcert{display:flex;align-items:center;gap:5px;font:600 7px/1 'Geist Mono',monospace;letter-spacing:.06em;color:#5d564a;margin-top:1px}
 ${X} .zcert i{width:42px;height:7px;background:repeating-linear-gradient(90deg,#141217 0 1px,transparent 1px 2px,#141217 2px 4px,transparent 4px 5px,#141217 5px 6px,transparent 6px 8px)}
 ${X} .zholo{margin-left:auto;flex:none;width:14px;height:14px;border-radius:4px;background:conic-gradient(from 20deg,#f2b632,#4fe39a,#f7e7a8,#ff6158,#f2b632);box-shadow:0 0 0 1.5px #141217;display:grid;place-items:center;font:400 8px/1 Anton;color:#141217}
 ${X} .zg{background:var(--lab);color:var(--on);display:grid;place-content:center;justify-items:center;gap:3px;border-left:2px solid #000}
 ${X} .zg small{font:800 7px/1 Barlow;letter-spacing:.16em;text-transform:uppercase;white-space:nowrap}
 ${X} .zg b{font:400 27px/.9 Anton;letter-spacing:.01em;font-variant-numeric:tabular-nums}${P} .fx .zg b{font-size:19px}
 ${X} .zgl{position:absolute;inset:0;border-radius:16px;background:linear-gradient(112deg,transparent 0 16%,rgba(255,255,255,.11) 16% 21%,transparent 21% 24%,rgba(255,255,255,.07) 24% 25.5%,transparent 25.5%)}
 html.x2p #record .car{padding-top:34px!important;padding-bottom:30px!important}`;
const fx=d=>`<div class="zlab"><div class="zl"><span class="zk">$EZ · Season 1</span><span class="zco">${d.co}</span><span class="zsub">Round ${d.n} · ${d.filed}</span><span class="zcert"><i></i>CERT ${String(d.n).padStart(6,'0')}<span class="zholo">$</span></span></div>
 <div class="zg">${d.pend?'<small>Result</small><b>'+d.res.toUpperCase()+'</b>':'<small>Called it</small><b>'+d.hit+'/'+d.nc+'</b>'}</div></div><i class="zgl"></i>`;
const V={
 // A gold resin: the slab cast in the site's gold, one hard shadow band, a bright inner rim
 a:{css:`${F}{background:linear-gradient(166deg,#f7cd57 0 46%,#e2a32a 46%)!important;box-shadow:0 0 0 3px #000,inset 0 0 0 2px #fff3c8,inset 0 0 0 4px rgba(0,0,0,.12),6px 7px 0 0 #000!important}`+LAB,fx},
 // B smoked acrylic: the night palette with the logo's green and red rails and the gold hard shadow
 b:{css:`${F}{background:linear-gradient(90deg,transparent 0 6px,#2fae6a 6px 9px,transparent 9px calc(100% - 9px),#e0463b calc(100% - 9px) calc(100% - 6px),transparent calc(100% - 6px)),linear-gradient(166deg,#2e2a3c 0 46%,#1c1926 46%)!important;box-shadow:0 0 0 3px #000,inset 0 0 0 2px rgba(243,234,214,.92),6px 7px 0 0 #f2b632,6px 7px 0 3px #000!important}`+LAB,fx},
 // C logo slab: the $EZ logo split, green left and red right, under one shadow band
 c:{css:`${F}{background:linear-gradient(166deg,transparent 0 46%,rgba(0,0,0,.2) 46%),linear-gradient(90deg,#24a061 0 50%,#d8402f 50%)!important;box-shadow:0 0 0 3px #000,inset 0 0 0 2px rgba(255,255,255,.75),6px 7px 0 0 #000!important}`+LAB,fx}
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
      const d={n,co:r.co,tk:r.ticker,filed:mo(r.called),res:mo(r.resolves),pend:!g,a:g?g.a:0,hit:g?g.calls.filter(x=>(x[1].indexOf('DOWN')<0)===(g.a>0)).length:0,nc:g?g.calls.length:4,win:g&&g.win?g.win.split(' & ').map(nm).join(' & '):'',total};
      c.querySelectorAll('.face').forEach(f=>{const o=document.createElement('div');o.className='fx';o.setAttribute('aria-hidden','true');o.innerHTML=fx(d);f.appendChild(o)})});
    document.documentElement.style.scrollBehavior='auto'},[V[k].css+base,V[k].fx.toString().replace(/^d=>`|`;?$/g,'')]);
  for(const [sel,tag] of [['#geCard','graded'],['#record .card.pend','pending'],['#geCard','back']]){
   if(tag==='back'){await p.evaluate(()=>document.querySelector('#geCard').classList.add('flipped'));await p.waitForTimeout(1400)}
   await p.evaluate(sel=>{const c=document.querySelector(sel);const sc=c.parentNode;sc.style.scrollBehavior='auto';sc.scrollLeft=c.offsetLeft-(sc.clientWidth-c.offsetWidth)/2;
     document.querySelectorAll('header').forEach(h=>h.style.position='static');const r=c.getBoundingClientRect();window.scrollTo(0,r.top+scrollY-60)},sel);
   await p.waitForTimeout(900);const c=await p.$(sel);const r=await c.boundingBox();
   await p.screenshot({path:S+'rcpt/f7-'+k+'-'+tag+'.png',clip:{x:0,y:Math.max(0,r.y-50),width:390,height:r.height+90}});
  }
  await p.close()}
 await b.close()})();
