// Five carte-blanche frames for the X2+ record cards. The card inside (.fin) is untouched; each frame is the .face
// around it plus an overlay (.fx) that a build would add from x2plus.js. No filters or masks: the films keep playing cheaply.
const {execSync}=require('child_process');const {chromium}=require(execSync('npm root -g').toString().trim()+'/playwright');const fs=require('fs');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/';const TF='/home/user/Tokengame/ez/teaser/fonts/';
const FF=[['Anton',400,S+'trio/fonts/Anton.woff2'],['Barlow',500,TF+'barlow-500.woff2'],['Barlow',600,TF+'barlow-700.woff2'],['Barlow',700,TF+'barlow-700.woff2'],['Barlow',800,TF+'barlow-800.woff2'],['Barlow Condensed','100 900',TF+'barlow-condensed-800.woff2'],['Geist Mono','100 900',TF+'geist-mono-latin-wght-normal.woff2']];
const FCSS=FF.map((f,i)=>"@font-face{font-family:'"+f[0]+"';font-weight:"+f[1]+";src:url(https://fontfile.local/"+i+".woff2)}").join('');
const C='html.x2p #record .card',F=C+' .face',P=C+'.pend .face',X=C+' .fx';
const base=`${C} .face .fin{border-radius:4px!important;box-shadow:0 0 0 2px #000!important}
 ${X}{position:absolute;inset:0;pointer-events:none;z-index:6}html.x2p #record .car{padding-top:40px!important;padding-bottom:40px!important}`;


// The PSA-style graded slab: a clear welded holder, a white label with the brick-red border, a big grade, cert + barcode,
// a hologram; $EZ's colours live in the label (the $EZ wordmark, the hologram) and the gold weld line.
const LAB=`${F}{border-radius:12px!important;padding:108px 14px 14px!important;
   background:linear-gradient(160deg,rgba(255,255,255,.13) 0 44%,rgba(255,255,255,.05) 44%),rgba(18,16,26,.55)!important;
   box-shadow:0 0 0 2.5px #000,inset 1.5px 1.5px 0 rgba(255,255,255,.75),inset -1.5px -1.5px 0 rgba(255,255,255,.25),inset 0 0 0 6px rgba(255,255,255,.04),6px 7px 0 0 #000!important}
 ${F}::before{content:"";position:absolute;inset:5px;border-radius:8px;border:1px solid rgba(242,182,50,.55);pointer-events:none}
 ${C} .face .fin{border-radius:4px!important;box-shadow:0 0 0 2px #000,0 0 0 5px rgba(255,255,255,.10),0 0 0 6px rgba(255,255,255,.35)!important}
 ${X} .zemb{position:absolute;right:16px;bottom:5px;font:400 11px/1 Anton;letter-spacing:.08em;color:rgba(255,255,255,.16);text-shadow:0 1px 0 rgba(0,0,0,.6),0 -1px 0 rgba(255,255,255,.12)}
 ${X} .zlab{--red:#b8262a;position:absolute;left:14px;right:14px;top:14px;height:82px;border-radius:3px;background:#fbfaf6;box-shadow:0 0 0 1.5px #000,inset 0 0 0 3.5px var(--red);
   display:grid;grid-template-columns:minmax(0,1fr) auto;grid-template-rows:1fr auto;padding:7px 9px 6px 10px;color:#141217;font-family:'Barlow Condensed',Barlow,sans-serif;overflow:hidden;
   background-image:repeating-linear-gradient(-28deg,rgba(184,38,42,.035) 0 2px,transparent 2px 7px)}
 ${X} .zl{display:grid;align-content:start;gap:2px;min-width:0}
 ${X} .zl .y{font-weight:800;font-size:8.5px;letter-spacing:.08em;text-transform:uppercase;color:#141217;white-space:nowrap}
 ${X} .zl .y .s{color:#c9900e}${X} .zl .y .e{color:#1f8f55}${X} .zl .y .z{color:#c8372d}
 ${X} .zl .nm{font-weight:800;font-size:15px;line-height:1;letter-spacing:.01em;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
 ${X} .zl .v{font-weight:800;font-size:8.5px;letter-spacing:.08em;text-transform:uppercase;color:#5d564a;white-space:nowrap}
 ${X} .zr{display:grid;justify-items:end;align-content:start;gap:1px;padding-left:8px}
 ${X} .zr .no{font-weight:800;font-size:9px;letter-spacing:.06em}
 ${X} .zr .ds{font-weight:800;font-size:8.5px;letter-spacing:.1em;text-transform:uppercase;margin-top:3px;white-space:nowrap}
 ${X} .zr .gr{font-weight:800;font-size:23px;line-height:.92;letter-spacing:-.01em;font-variant-numeric:tabular-nums}
 ${X} .zr .gr small{font-size:13px;color:#5d564a}
 ${X} .zb{grid-column:1/-1;margin-top:5px;display:flex;align-items:center;gap:6px;font:600 7.5px/1 'Geist Mono',monospace;letter-spacing:.05em;color:#3b362f}
 ${X} .zb i{width:44px;height:7px;flex:none;background:repeating-linear-gradient(90deg,#141217 0 1px,transparent 1px 2px,#141217 2px 4px,transparent 4px 5px,#141217 5px 6px,transparent 6px 8px)}
 ${X} .zb .holo{margin-left:auto;width:26px;height:10px;border-radius:2px;background:linear-gradient(100deg,#9ff0c4,#f7e7a8 30%,#ffb3ae 55%,#f2b632 80%,#9ff0c4);box-shadow:0 0 0 1px rgba(0,0,0,.55);position:relative}
 ${X} .zb .holo::after{content:"$EZ";position:absolute;inset:0;display:grid;place-items:center;font:400 6.5px/1 Anton;color:rgba(20,18,23,.75);letter-spacing:.06em}
 ${P} .fx .zr .gr{font-size:17px;margin-top:2px}
 ${X} .zgl{position:absolute;inset:0;border-radius:12px;background:linear-gradient(114deg,transparent 0 14%,rgba(255,255,255,.12) 14% 18%,transparent 18% 21%,rgba(255,255,255,.07) 21% 22.2%,transparent 22.2%)}
 html.x2p #record .car{padding-top:34px!important;padding-bottom:30px!important}`;
const BLACK=`${X}.perfect .zlab{background:#0f0e13;color:#f2b632;box-shadow:0 0 0 1.5px #000,inset 0 0 0 3.5px #f2b632;background-image:repeating-linear-gradient(-28deg,rgba(242,182,50,.05) 0 2px,transparent 2px 7px)}
 ${X}.perfect .zl .y{color:#f3ead6}${X}.perfect .zl .v,${X}.perfect .zr .gr small{color:#c9b98e}${X}.perfect .zb{color:#c9b98e}${X}.perfect .zb i{background:repeating-linear-gradient(90deg,#f2b632 0 1px,transparent 1px 2px,#f2b632 2px 4px,transparent 4px 5px,#f2b632 5px 6px,transparent 6px 8px)}`;
const DS=['Rekt','Rough','Split','Strong','Perfect'];
const fx=d=>`<div class="zlab"><div class="zl"><span class="y">2026 <span class="s">$</span><span class="e">E</span><span class="z">Z</span> Season 1</span><span class="nm">${d.co}</span><span class="v">Round ${d.n} · ${d.tk} earnings</span></div>
 <div class="zr"><span class="no">#${d.n}</span>${d.pend?'<span class="ds">At grading</span><span class="gr">'+d.res.toUpperCase()+'</span>':'<span class="ds">'+(d.hit===d.nc?'Perfect':d.hit===0?'Rekt':d.hit/d.nc>=.75?'Strong':d.hit/d.nc>=.5?'Split':'Rough')+'</span><span class="gr">'+d.hit+'<small>/'+d.nc+'</small></span>'}</div>
 <div class="zb"><i></i>${String(d.n).padStart(8,'0')}<span class="holo"></span></div></div><i class="zgl"></i>`;

const HOLO=`
 @keyframes zsheen{0%{background-position:0% 0%}100%{background-position:100% 100%}}
 @keyframes ztw{0%,100%{opacity:.25}50%{opacity:.9}}
 html.x2p #record .card .face.back .fin{position:relative}
 html.x2p #record .card .face.back .bk-r{position:relative}
 /* the foil: a soft rainbow sheen in the site's own hues, screened over the dark card, drifting slowly like a tilted holo */
 html.x2p #record .card .face.back:has(.bk-rows):not(:has(.bk-r.no)) .fin::before,
 html.x2p #record .card .face.back:has(.bk-r.no) .bk-r:is(.win,.ok)::before{content:"";position:absolute;inset:0;pointer-events:none;z-index:1;border-radius:inherit;
   background:linear-gradient(115deg,#ff6fae 0%,#f2b632 14%,#9ff0c4 28%,#6fd3ff 42%,#c49bff 56%,#ff6fae 70%,#f2b632 84%,#9ff0c4 100%);background-size:300% 300%;
   mix-blend-mode:screen;opacity:.1;animation:zsheen 7s ease-in-out infinite alternate}
 /* the glitter: two layers of tiny sparkles that twinkle out of step */
 html.x2p #record .card .face.back:has(.bk-rows):not(:has(.bk-r.no)) .fin::after,
 html.x2p #record .card .face.back:has(.bk-r.no) .bk-r:is(.win,.ok)::after{content:"";position:absolute;inset:0;pointer-events:none;z-index:1;border-radius:inherit;
   background:radial-gradient(circle,#fff 0 .6px,transparent 1.1px) 3px 5px/53px 47px,radial-gradient(circle,#fff6d8 0 .8px,transparent 1.4px) 21px 11px/71px 61px,radial-gradient(circle,#d9fff0 0 .55px,transparent 1px) 37px 29px/43px 67px,radial-gradient(circle,#ffd9ef 0 .7px,transparent 1.2px) 11px 41px/89px 37px,radial-gradient(circle,#fff 0 1px,transparent 1.8px) 61px 19px/127px 109px;
   mix-blend-mode:screen;opacity:.75;animation:ztw 2.6s ease-in-out infinite}
 html.x2p #record .card .face.back:has(.bk-r.no) .bk-r:is(.win,.ok)::before{opacity:.2}
 html.x2p #record .card .face.back:has(.bk-r.no) .bk-r:is(.win,.ok)::after{background-size:23px 19px,31px 27px,17px 29px,41px 23px,61px 47px;opacity:.6}
 html.x2p #record .card .face.back:has(.bk-r.no) .bk-r.win::before{opacity:.45;mix-blend-mode:soft-light}
 @media (prefers-reduced-motion:reduce){html.x2p #record .card .face.back .fin::before,html.x2p #record .card .face.back .fin::after,html.x2p #record .card .face.back .bk-r::before,html.x2p #record .card .face.back .bk-r::after{animation:none!important}}`;
const V={holo:{css:LAB+BLACK+HOLO,fx}};
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
    document.querySelector('#record .card.f-win.cur').id='geCard';[...document.querySelectorAll('#record .card')].forEach(c=>{const t=(c.querySelector('.rd')||{}).textContent||'';if(/Round 28\b/.test(t))c.id='r28Card';if(/Round 26\b/.test(t))c.id='r26Card'});
    document.querySelectorAll('#record .card').forEach(c=>{const n=+((c.querySelector('.rd')||{}).textContent||'').replace(/\D/g,'');
      const g=ROUNDS.find(r=>r.n===n),q=PENDING.find(r=>r.n===n);const r=g||q;if(!r)return;
      const d={n,co:r.co,tk:r.ticker,filed:mo(r.called),res:mo(r.resolves),pend:!g,a:g?g.a:0,hit:g?g.calls.filter(x=>(x[1].indexOf('DOWN')<0)===(g.a>0)).length:0,nc:g?g.calls.length:4,win:g&&g.win?g.win.split(' & ').map(nm).join(' & '):'',total};
      c.querySelectorAll('.face').forEach(f=>{const o=document.createElement('div');o.className='fx'+(d.hit===d.nc&&!d.pend?' perfect':'');o.setAttribute('aria-hidden','true');o.innerHTML=fx(d);f.appendChild(o)})});
    document.documentElement.style.scrollBehavior='auto'},[V[k].css+base,V[k].fx.toString().replace(/^d=>`|`;?$/g,'')]);
  for(const [sel,tag] of [['#geCard','graded'],['#geCard','back'],['#r28Card','r28back'],['#r26Card','r26back']]){
   if(/back/.test(tag)){await p.evaluate(s=>document.querySelector(s).classList.add('flipped'),sel);await p.waitForTimeout(1400)}
   await p.evaluate(sel=>{const c=document.querySelector(sel);const sc=c.parentNode;sc.style.scrollBehavior='auto';sc.scrollLeft=c.offsetLeft-(sc.clientWidth-c.offsetWidth)/2;
     document.querySelectorAll('header').forEach(h=>h.style.position='static');const r=c.getBoundingClientRect();window.scrollTo(0,r.top+scrollY-60)},sel);
   await p.waitForTimeout(900);const c=await p.$(sel);const r=await c.boundingBox();
   await p.screenshot({path:S+'rcpt/f9-'+k+'-'+tag+'.png',clip:{x:0,y:Math.max(0,r.y-50),width:390,height:r.height+90}});
  }
  for(const sel of ['#geCard','#r26Card']){
   await p.evaluate(sel=>{const c=document.querySelector(sel);c.classList.add('flipped');const sc=c.parentNode;sc.scrollLeft=c.offsetLeft-(sc.clientWidth-c.offsetWidth)/2;window.scrollTo(0,c.getBoundingClientRect().top+scrollY-60)},sel);
   await p.waitForTimeout(1500);const c=await p.$(sel);const r=await c.boundingBox();
   for(let i=0;i<48;i++){await p.screenshot({path:S+'rcpt/clip/'+sel.slice(1)+'-'+String(i).padStart(3,'0')+'.png',clip:{x:Math.max(0,r.x-20),y:Math.max(0,r.y-20),width:Math.min(390,r.width+40),height:r.height+40}});await p.waitForTimeout(70)}}
  await p.close()}
 await b.close()})();
