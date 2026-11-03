// node gate.js <outdir> [widths] [rounds]: the H40 gate on the real build, card turned to its back. Writes gate.json + gate.txt
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],WS=(process.argv[3]||'320,390,1280').split(',').map(Number),RS=(process.argv[4]||'64,80,51,57,81').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const PORT=process.env.PORT||8997;
function audit(){
  const cb=document.querySelector('#x2pRm .cb');if(!cb)return {err:'no .cb'};
  const card=document.querySelector('#x2pRm .card');const n=+card.getAttribute('data-n'),k=card.getAttribute('data-k');
  // screen scale: a 100px probe inside the plate
  const pr=document.createElement('div');pr.style.cssText='position:absolute;width:100px;height:1px;left:0;top:0';cb.appendChild(pr);const S=pr.getBoundingClientRect().width/100;pr.remove();
  const CB=cb.getBoundingClientRect(),cq=CB.width/100;
  const cv=document.createElement('canvas').getContext('2d');
  const vt=e=>{if(!e)return '';const c=e.cloneNode(true);c.querySelectorAll('.sr').forEach(z=>z.remove());return c.textContent.replace(/\s+/g,' ').trim()};
  const vis=e=>!e.closest('.sr')&&getComputedStyle(e).visibility!=='hidden';
  function ink(e){ // the text's ink box on screen (baseline from a probe, ascent/descent from the font)
    const cs=getComputedStyle(e);let t=vt(e);if(cs.textTransform==='uppercase')t=t.toUpperCase();
    const q=document.createElement('span');q.style.cssText='display:inline-block;width:0;height:0;vertical-align:baseline';e.appendChild(q);const base=q.getBoundingClientRect().bottom;q.remove();
    cv.font=cs.fontStyle+' '+cs.fontWeight+' '+cs.fontSize+' '+cs.fontFamily;const m=cv.measureText(t.replace(/\s+/g,' ').trim());
    const r=e.getBoundingClientRect();return {top:base-m.actualBoundingBoxAscent*S,bot:base+m.actualBoundingBoxDescent*S,left:r.left,right:r.right,fs:parseFloat(cs.fontSize)*S,t:t.trim()}}
  // painted faces: np/title/date plates (bevel B=2.9cqw, slice 43.94 of 260: face 42..235), the enamel window (B=3.1cqw, slice 48 of 300: 39..277)
  function face(el,kind){const r=el.getBoundingClientRect();if(kind==='mk'){const B=3.1*cq;return {top:r.top+B*39/48,bot:r.bottom-B*(1-(277-252)/48),vtop:r.top+B*7/48,r}}
    const B=2.9*cq;return {top:r.top+B*42/43.94,bot:r.bottom-B*(1-(235-216.06)/43.94),vtop:r.top+B*12/43.94,r,B}}
  const res={n,k,S:+S.toFixed(3),words:[],fails:[],rows:[],v:[]};
  // a. visible words
  const tw=document.createTreeWalker(cb,NodeFilter.SHOW_TEXT);let x;const words=[];
  while(x=tw.nextNode()){const e=x.parentElement;if(!x.textContent.trim()||!vis(e))continue;words.push(x.textContent.trim())}
  // join a row's letters/sign into tokens
  res.visible=[...cb.querySelectorAll('.cb-no,.cb-r,.cb-ml,.cb-mv,.cb-dt small,.cb-dt b,.cb-flip')].map(e=>{
    if(e.classList.contains('cb-r')){const g=s=>vt(e.querySelector(s));
      return [g('.cb-rk'),g('.cb-nm'),'[flag '+(e.querySelector('.cb-fl rect[fill="#de2910"]')?'CN':'US')+']',[...e.querySelectorAll('.cb-pf i')].map(i=>i.textContent).join(''),g('.cb-tw'),g('.cb-tv'),e.classList.contains('win')?'[gold, crown]':''].filter(Boolean).join(' ')}
    return vt(e)});
  const all=res.visible.join(' | ');
  ['OFF','WRONG WAY','AT THE CLOSE','WINNER','CERTIFICATE','Off','Wrong way','At the close','Winner','Certificate'].forEach(w=>{if(new RegExp('\\b'+w+'\\b').test(all))res.fails.push('extra word: '+w)});
  // expected
  let exp;if(k==='g'){const g=ROUNDS.find(r=>r.n===n),W=g.win?g.win.split(' & '):[],up=g.a>0;
    let rows=g.calls.map(c=>{const u=!/DOWN/.test(c[1]),v=parseFloat(c[1].replace(/^(UP|DOWN)\s*/,''));return {m:c[0],u,v,off:+c[2],ok:u===up}});
    rows=rows.filter(r=>r.ok).sort((a,b)=>a.off-b.off).concat(rows.filter(r=>!r.ok).sort((a,b)=>a.off-b.off));
    exp=rows.map((r,i)=>[i+1,r.m,r.ok?'PASS':'FAIL',r.u?'LONG':'SHORT',(r.u?'+':'−')+(Math.round(r.v*100)/100)+'%',W.includes(r.m)]);
    res.expMove=(g.a<0?'−':'+')+Math.abs(g.a).toFixed(2)+'%'}
  else{const u=PENDING.find(q=>q.n===n);exp=u.calls.map(c=>['',c.m,'',c.dir==='UP'?'LONG':'SHORT',(c.dir==='UP'?'+':'−')+Math.abs(parseFloat(c.mag))+'%',false])}
  const NM={GPT:'GPT',KIMI:'KIMI',CLAUDE:'CLAUDE',GROK:'GROK'};
  const lis=[...cb.querySelectorAll('.cb-r')];
  lis.forEach((li,i)=>{const e=exp[i]||[];const got=[vt(li.querySelector('.cb-rk')),vt(li.querySelector('.cb-nm')).toUpperCase(),[...li.querySelectorAll('.cb-pf i')].map(z=>z.textContent).join(''),vt(li.querySelector('.cb-tw')).toUpperCase(),vt(li.querySelector('.cb-tv')).replace(/\s+/g,''),li.classList.contains('win'),!!li.querySelector('.cb-cr')];
    const want=[String(e[0]),NM[e[1]],e[2],e[3],e[4],e[5],e[5]];
    if(JSON.stringify(got)!==JSON.stringify(want))res.fails.push('row '+(i+1)+' got '+JSON.stringify(got)+' want '+JSON.stringify(want))});
  if(lis.length!==exp.length)res.fails.push('rows '+lis.length+' vs '+exp.length);
  const mv=cb.querySelector('.cb-mv');const mvt=vt(mv);
  if(k==='g'&&mvt.replace(/\s/g,'')!==res.expMove)res.fails.push('move '+mvt+' vs '+res.expMove);
  if(k==='p'&&!/^(CLOSES IN|RESULTS SOON|DATE TO COME)/i.test(mvt))res.fails.push('countdown "'+mvt+'"');
  if(vt(cb.querySelector('.cb-ml')).toUpperCase()!=='MARKET')res.fails.push('no MARKET');
  if(!/^NO\. 00\d\d$/i.test(vt(cb.querySelector('.cb-no'))))res.fails.push('No. line');
  // b. geometry
  const pfs=lis.map(li=>li.querySelector('.cb-pf')).filter(Boolean).map(e=>{const r=e.getBoundingClientRect();return (r.left+r.right)/2});
  const idEnd=Math.max(...lis.map(li=>Math.max(li.querySelector('.cb-nm').getBoundingClientRect().right,li.querySelector('.cb-fl').getBoundingClientRect().right)));
  const trStart=Math.min(...lis.map(li=>li.querySelector('.cb-tw').getBoundingClientRect().left));
  const trR=lis.map(li=>li.querySelector('.cb-tv').getBoundingClientRect().right);
  res.geo={pfX:pfs.map(v=>+v.toFixed(2)),pfSpread:pfs.length?+(Math.max(...pfs)-Math.min(...pfs)).toFixed(2):null,
    pfVsHalf:pfs.length?+(pfs[0]-(idEnd+trStart)/2).toFixed(2):null,gapL:pfs.length?+(pfs[0]-idEnd).toFixed(1):null,gapR:pfs.length?+(trStart-pfs[0]).toFixed(1):null,
    trRightSpread:+(Math.max(...trR)-Math.min(...trR)).toFixed(2)};
  if(res.geo.pfSpread>0.5)res.fails.push('PASS x spread '+res.geo.pfSpread);if(pfs.length&&Math.abs(res.geo.pfVsHalf)>1)res.fails.push('PASS off half '+res.geo.pfVsHalf);
  if(res.geo.trRightSpread>0.5)res.fails.push('trade right spread '+res.geo.trRightSpread);
  // vertical centring on each painted face
  const chk=(lab,el,f,i0)=>{const c=(f.top+f.bot)/2,ic=(i0.top+i0.bot)/2,d=ic-c;res.v.push([lab,+d.toFixed(2)]);if(Math.abs(d)>1)res.fails.push('vcentre '+lab+' '+d.toFixed(2))};
  const minF=[];
  lis.forEach((li,i)=>{const f=face(li,'np');
    li.querySelectorAll('.cb-rk,.cb-nm,.cb-tw,.cb-tv').forEach(e=>{const q=ink(e);minF.push([q.t,q.fs]);chk('r'+(i+1)+' '+e.className.split(' ')[0]+' '+q.t,e,f,q)});
    const P=[...li.querySelectorAll('.cb-pf i')];if(P.length){const q=P.map(ink);P.forEach((p,j)=>minF.push([q[j].t,q[j].fs]));const tops=q.map(z=>z.top),bots=q.map(z=>z.bot);
      chk('r'+(i+1)+' PASS/FAIL (mean of 4 punches)',null,f,{top:tops.reduce((a,b)=>a+b)/4,bot:bots.reduce((a,b)=>a+b)/4});}
    const W=li.querySelector('.cb-wc').getBoundingClientRect();chk('r'+(i+1)+' well',null,f,{top:W.top,bot:W.bottom});
    // overflow: every piece inside the plate (text clear of the side bevels)
    const R=li.getBoundingClientRect();li.querySelectorAll('.cb-rk,.cb-nm,.cb-fl,.cb-pf,.cb-tw,.cb-tv').forEach(e=>{const r=e.getBoundingClientRect();if(r.left<R.left+f.B*.6||r.right>R.right-f.B*.6)res.fails.push('overflow r'+(i+1)+' '+e.className.baseVal||e.className)});
    const cr=li.querySelector('.cb-cr');if(cr){const c=cr.getBoundingClientRect(),CR=card.getBoundingClientRect(),nm=li.querySelector('.cb-nm').getBoundingClientRect();
      res.crown=(res.crown||[]).concat([{row:i+1,top:+c.top.toFixed(1),bot:+c.bottom.toFixed(1),plateEdge:+f.vtop.toFixed(1),h:+c.height.toFixed(1),capH:+(ink(li.querySelector('.cb-nm')).bot-ink(li.querySelector('.cb-nm')).top).toFixed(1),overName:c.right>nm.left&&c.left<nm.right}]);
      if(!(c.bottom>f.vtop&&c.top<f.vtop))res.fails.push('crown not on edge');if(c.top<CR.top||c.left<CR.left||c.right>CR.right)res.fails.push('crown outside card');
      const prev=lis[i-1]||cb.querySelector('.cb-ti');if(prev){const pf=face(prev,'np');if(c.top<pf.r.bottom-f.B*14/43.94)res.fails.push('crown touches plate above')}}});
  const ti=cb.querySelector('.cb-ti');{const q=ink(cb.querySelector('.cb-no'));minF.push([q.t,q.fs]);chk('No.',null,face(ti,'np'),q)}
  const mw=cb.querySelector('.cb-mw'),fm=face(mw,'mk'),qm=ink(cb.querySelector('.cb-ml')),qv=ink(mv);minF.push([qm.t,qm.fs],[qv.t,qv.fs]);
  chk('MARKET',null,fm,qm);chk('move',null,fm,qv);res.geo.moveVsMarket=+(((qv.top+qv.bot)-(qm.top+qm.bot))/2).toFixed(2);if(Math.abs(res.geo.moveVsMarket)>1)res.fails.push('move vs MARKET '+res.geo.moveVsMarket);
  {const M=mw.getBoundingClientRect();[qm,qv].forEach(q=>{if(q.left<M.left+3.1*cq*.8||q.right>M.right-3.1*cq*.8)res.fails.push('overflow market '+q.t)})}
  cb.querySelectorAll('.cb-dt').forEach((d,i)=>{const a=ink(d.querySelector('small')),b=ink(d.querySelector('b'));minF.push([a.t,a.fs],[b.t,b.fs]);chk('date plate '+(i+1)+' (label+date)',null,face(d,'np'),{top:a.top,bot:b.bot});
    const R=d.getBoundingClientRect();[a,b].forEach(q=>{if(q.left<R.left+2||q.right>R.right-2)res.fails.push('overflow date '+q.t)})});
  const fb=cb.querySelector('.cb-flip:not(.cb-nob)');if(fb)minF.push([vt(fb),parseFloat(getComputedStyle(fb).fontSize)*S]);
  res.minFont=minF.reduce((a,b)=>b[1]<a[1]?b:a,['',99]).map(v=>typeof v==='number'?+v.toFixed(2):v);if(res.minFont[1]<8)res.fails.push('text under 8px: '+res.minFont[0]);
  // c. surfaces: every visible text either engraved (dark ink + lip/wall shadows) or clipped paint/metal with drop-shadow walls
  res.surf={};const KIND=e=>{const cs=getComputedStyle(e);const clip=cs.webkitBackgroundClip==='text'||cs.backgroundClip==='text';
    if(e.closest('.cb-pf'))return 'punched: per-letter tilt/drop, paint+wear clipped into the letters, wall+lip drop-shadows, burr glow ('+(getComputedStyle(e).filter.split(') ').length)+' shadows)';
    if(e.closest('.cb-en'))return 'enamel-filled engraving: paint clipped into the cut ('+cs.backgroundImage.slice(0,30)+'...), wall+lip drop-shadows';
    if(clip)return 'engraved through enamel: bright metal clipped into the letters, wall+lip drop-shadows';
    if(cs.textShadow&&cs.textShadow!=='none')return 'engraved: ink in the cut + text-shadow lip/wall ('+cs.textShadow.slice(0,60)+')';return 'FLAT (no process)'};
  [['rank','.cb-rk'],['name','.cb-nm'],['Long/Short','.cb-tw'],['trade move','.cb-tv'],['PASS/FAIL','.cb-pf i'],['No.','.cb-no'],['MARKET','.cb-ml'],['market move / countdown','.cb-mv'],['date label','.cb-dt small'],['date','.cb-dt b'],['See the film','.cb-flip']].forEach(([l,s])=>{const e=cb.querySelector(s);if(!e)return;const kd=KIND(e);res.surf[l]=kd;if(/FLAT/.test(kd))res.fails.push('flat text: '+l)});
  res.fonts=[...new Set([...cb.querySelectorAll('*')].filter(e=>vis(e)&&[...e.childNodes].some(z=>z.nodeType===3&&z.textContent.trim())).map(e=>getComputedStyle(e).fontFamily.split(',')[0].replace(/"/g,'')))];
  [...cb.querySelectorAll('.cb-p>:not(.cb-sh):not(.cb-g)')].forEach(e=>{const r=e.getBoundingClientRect();if(r.bottom>CB.bottom+.5||r.top<CB.top-.5)res.fails.push('outside the plate: '+e.className)});
  res.sw=document.documentElement.scrollWidth-innerWidth;if(res.sw>0)res.fails.push('sideways scroll '+res.sw);
  return res}
(async()=>{const b=await chromium.launch();const all=[];
 for(const W of WS){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:2});const p=await ctx.newPage();await FONTS(p);const er=[];
  p.on('pageerror',e=>er.push('pageerror '+e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push(m.text())});
  for(const n of RS){
   await p.goto(`http://127.0.0.1:${PORT}/v46-live-x2plus.html?${Date.now()}#/round/${n}`,{waitUntil:'load',timeout:150000});
   await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('#x2pRm .card'),null,{timeout:200000});await p.waitForTimeout(1500);
   const k=await p.evaluate(()=>document.querySelector('#x2pRm .card').getAttribute('data-k'));
   if(k==='g'){await p.evaluate(()=>{const c=document.querySelector('#x2pRm .card');const f=c.querySelector('.face.front [data-flip]')||c.querySelector('[data-flip]');(f||c).click()});await p.waitForTimeout(1800)}
   await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(500);
   const r=await p.evaluate(audit);r.W=W;r.errors=er.slice();r.cbErr=await p.evaluate(()=>window.__x2pCbErr?String(window.__x2pCbErr):'');if(r.cbErr)r.fails.push('cbErr');if(er.length)r.fails.push('console errors');er.length=0;
   all.push(r);console.log(W,n,r.fails&&r.fails.length?'FAIL '+r.fails.join('; '):'pass','min',JSON.stringify(r.minFont))}
  await ctx.close()}
 fs.writeFileSync(OUT+'/gate.json',JSON.stringify(all,null,1));await b.close()})();
