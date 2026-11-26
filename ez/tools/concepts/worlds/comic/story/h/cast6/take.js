// cast6: Meet the models that stands out. Five takes on the trading floor, laid over the real built X3+ page (serve ez/ on PORT).
// Every number from the page's own data (POP.data(): __x2pPnl + MODELS + ROUNDS). node take.js <outdir> <W> <now|A|B|C|D|E,...> [--video]
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fonts=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
const fs=require('fs');const OUT=process.argv[2],W=+process.argv[3],TAKES=process.argv[4].split(','),VID=process.argv.includes('--video');
const PORT=process.env.PORT||8946,BASE='tools/concepts/worlds/comic/story/h/cast6/';
const J=f=>JSON.parse(fs.readFileSync(__dirname+'/'+f,'utf8'));const L=J('layout.json').p,FIT=J('fit.json'),FLD=J('fields.json'),G=J('geom.json'),CSS=fs.readFileSync(__dirname+'/take.css','utf8');
fs.mkdirSync(OUT,{recursive:true});const H=W>1000?900:844;
(async()=>{const b=await chromium.launch();
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:W>1000?1:2,...(VID?{recordVideo:{dir:OUT,size:{width:W,height:H}}}:{})});
 const p=await ctx.newPage();await fonts(p);const er=[];p.on('pageerror',e=>er.push(e.message));
 await p.goto(`http://localhost:${PORT}/v47-live-x3plus.html?${Date.now()}`,{waitUntil:'load'});
 await p.waitForFunction(()=>document.querySelector('.pp1-c.fb-on'),null,{timeout:90000});await p.waitForTimeout(2500);
 await p.addStyleTag({content:CSS});
 for(const t of TAKES){
  const ok=await p.evaluate(({t,L,FIT,FLD,G,BASE,VID})=>{
   const s=document.querySelector('#wc-book .wc-chars');s.querySelector('.c6')?.remove();document.documentElement.classList.remove('c6-on');
   if(t==='now')return 'ok';
   document.documentElement.classList.add('c6-on');
   const D=POP.data(),desk=matchMedia('(min-width:1000px)').matches,a=desk?'d':'p';
   const src=n=>BASE+'cut/'+n,img=n=>BASE+'img/'+n;
   const FL={GPT:'us',CLAUDE:'us',GROK:'us',KIMI:'cn'},FD=m=>'founder-'+m.toLowerCase()+'-anim';
   const pc=v=>(v*100).toFixed(3)+'%';
   const box=(r,cls,inner)=>`<div class="c6-f ${cls}" style="left:${pc(r[0])};top:${pc(r[1])};width:${pc(r[2]-r[0])};height:${pc(r[3]-r[1])}">${/^</.test(inner)?inner:`<span>${inner}</span>`}</div>`;
   const mark=m=>{const M=MODELS[m],c=POP.mcol(m);return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${M.d}" fill="${m==='GROK'?'#7a45ff':c}" fill-rule="${M.fr||'nonzero'}" transform="translate(.7 .6)"/><path d="${M.d}" fill="#0d0b10" fill-rule="${M.fr||'nonzero'}"/></svg>`};
   const vid=(m,r)=>`<div class="c6-vid" aria-hidden="true" style="left:${pc(r[0])};top:${pc(r[1])};width:${pc(r[2]-r[0])};height:${pc(r[3]-r[1])}"><video muted loop playsinline autoplay preload="auto" poster="media/${FD(m)}.jpg"><source src="media/${FD(m)}.mp4" type="video/mp4"></video></div>`;
   const sr=(x,i)=>`<p class="c6-sr">#${i+1} ${x.name}, ${x.ver}. Season P&amp;L ${POP.pm(x.pnl)}. Right way on ${x.W} of ${x.tot} calls. Best call ${POP.pm(x.best.v)} on ${x.best.r.co}. Last five: ${x.last5.map(s=>s==='W'?'right':'wrong').join(', ')}.</p>`;
   // one ticket in today's format: stub, big founder window, name/version/flag, right way, P&L, best call, last five; every figure on a painted blank surface
   const tk=(x,i,kind)=>{const n=`t-${kind}-${x.m.toLowerCase()}`,F=Object.assign({},L,FLD[n]),up=x.pnl>=0,bb=x.best,bu=bb.v>=0,w=F.win,fr=.006;
     const vh=F.ver[3]-F.ver[1],flagR=[F.ver[2]+.022,F.ver[1]-vh*.35,F.ver[2]+.022+.09];
     return `<article class="c6-t ${i===0?'c6-lead':''}" data-m="${x.m}" style="--k:${i}">${sr(x,i)}
      ${vid(x.m,[w[0]-fr,w[1]-fr*.75,w[2]+fr,w[3]+fr*.75])}
      <img class="c6-art" src="${src(n+'.webp')}" alt="" aria-hidden="true">${i===0?`<img class="c6-gold" src="${src('g-base.webp')}" alt="" aria-hidden="true">`:''}
      <div aria-hidden="true">
      ${box(L.seal,'c6-rk','#'+(i+1))}${box(L.strip,'c6-sn',i===0?'Golden ticket':'Season 1')}
      ${box(FIT['coin-'+n]||L.coin,'c6-coin',mark(x.m))}${box(F.ribbon,'c6-nm',x.name.toUpperCase())}${box(F.ver,'c6-vr',POP.esc(x.ver))}
      <img class="c6-flag" src="${src('f-'+FL[x.m]+'.webp')}" alt="" style="left:${pc(flagR[0])};top:${pc(flagR[1])};width:${pc(flagR[2]-flagR[0])}">
      ${box(F.rw,'c6-box c6-rw',`<span class="c6-L">Right way</span><span class="c6-N">${x.W}/${x.tot}</span>`)}
      ${box(F.pnl,'c6-box c6-pnl',`<span class="c6-L">Season P&amp;L</span><span class="c6-N ${up?'up':'dn'}" data-v="${Math.round(x.pnl)}">${POP.pm(x.pnl)}</span>`)}
      ${box(F.bc,'c6-box c6-bc',`<span class="c6-L">Best call</span><span class="c6-N ${bu?'up':'dn'}">${POP.pm(bb.v)}</span><small>${POP.esc(bb.r.co)} (${POP.esc(bb.r.ticker)})</small>`)}
      ${x.last5.map((r,k)=>{const q=FIT[n][k],gw=q[2]-q[0],gh=q[3]-q[1];return `<i class="c6-lamp ${r==='W'?'w':'l'}" style="--j:${k};left:${pc(q[0]-gw*.08)};top:${pc(q[1]-gh*.08)};width:${pc(gw*1.16)};height:${pc(gh*1.16)}"></i>`+box(q,'c6-l5i',`<img style="--j:${k}" src="${src(r==='W'?'k-w.webp':'k-l.webp')}" alt="">`)}).join('')}
      ${(()=>{const q=FIT[n],top=Math.min(...q.map(r=>r[1])),bot=Math.max(...q.map(r=>r[3]));return box([q[4][2]+.025,top,.95,bot],'c6-l5l c6-L','Last 5')})()}
      </div></article>`};
   const hd=`<p class="ez-hd"><span class="ez-w">Meet the</span> <span class="ez-w">models</span></p>`;
   const cap=`<p class="c6-cap">Not the Instagram kind. Ranked by P&amp;L: $100K on every call.</p>`;
   const M=D.models;let h='';
   if(t==='A'){ // hero moment: the golden ticket under the skylight's one beam, standing on the podium; the challengers wait in the crowd's shade
     h=`<div class="c6-plate" style="--pl:url(${src('pa-hero-'+a+'.jpg')})"><div class="c6-hd">${hd}${cap}</div></div>
       <div class="c6-stage">${tk(M[0],0,'lit')}</div><div class="c6-shade"><img class="c6-crowd" src="${src('cs-arms.webp')}" alt="" aria-hidden="true"><div class="c6-grid">${M.slice(1).map((x,i)=>tk(x,i+1,'base')).join('')}</div></div>`}
   if(t==='B'){ // scale contrast: the leader's living portrait is the exchange's wall; the challengers are tickets on the floor below it
     const g=G['wall-'+a],x=M[0];
     h=`<div class="c6-hd">${hd}</div><div class="c6-wall" style="--pl:url(${src('pb2-wall-'+a+'.jpg')})">${vid(x.m,g.win)}
       <img class="c6-wallart" src="${src('pb2-wall-'+a+'.webp')}" alt="" aria-hidden="true">
       ${box(g.board,'c6-board',`<span class="c6-bd-r">#1 ${x.name.toUpperCase()}</span><span class="c6-bd-n ${x.pnl>=0?'up':'dn'}">${POP.pm(x.pnl)}</span><span class="c6-bd-l">Season P&amp;L</span>`)}
       ${cap}</div>
       <div class="c6-grid">${M.map((x,i)=>tk(x,i,'base')).join('')}</div>`}
   if(t==='C'){ // dramatic light: three spot lights from the gallery: gold on the golden ticket, green on a profit, red on a loss
     h=`<div class="c6-bg" aria-hidden="true"><i style="--pl:url(${src('pc-spot-'+a+'.jpg')})"></i></div><div class="c6-hd">${hd}${cap}</div>
       <div class="c6-grid">${M.map((x,i)=>tk(x,i,'lit').replace('class="c6-t ',`class="c6-t c6-sp-${i===0?'g':x.pnl>=0?'u':'d'} `)).join('')}</div>`}
   if(t==='D'){ // camera angle: from the floor looking up at the board; each ticket hangs from it on a chain, face-on
     h=`<div class="c6-bg" aria-hidden="true"><i style="--pl:url(${src('pd-up-'+a+'.jpg')})"></i></div><div class="c6-up"><div class="c6-hd">${hd}${cap}</div></div>
       <div class="c6-grid">${M.map((x,i)=>`<div class="c6-hang"><img class="c6-chain" src="${src('k-hook.webp')}" alt="" aria-hidden="true">${tk(x,i,'base')}</div>`).join('')}</div>`}
   if(t==='E'){ // tickets as objects: open outcry, every model's ticket held up by a trader's hand; on desktop the higher the hand, the higher the rank
     const hold=(x,i)=>{const hn=i%2?'h-teal':'h-red',c=G[hn].card,cw=c[2]-c[0];
       return `<div class="c6-hold" style="--hw:${(100/cw).toFixed(3)}%;--hx:${(-c[0]/cw*100).toFixed(3)}%;--cy:${c[3]};--cw:${cw};--k:${i}">
         <img class="c6-hand" src="${src(hn+'.webp')}" alt="" aria-hidden="true">${tk(x,i,'base')}<img class="c6-hand c6-thumb" src="${src(hn+'-thumb.webp')}" alt="" aria-hidden="true"></div>`};
     h=`<div class="c6-bg" aria-hidden="true"><i style="--pl:url(${src('pe-floor-'+a+'.jpg')})"></i></div><div class="c6-hd">${hd}${cap}</div>
       <div class="c6-grid">${M.map(hold).join('')}</div><img class="c6-crowd c6-front" src="${src('cs-arms.webp')}" alt="" aria-hidden="true">`}
   const d=document.createElement('div');d.className='c6 c6-'+t;d.innerHTML=h;s.prepend(d);
   // E: the hand is sized from its card: the ticket covers the card, aligned to its left and bottom edge
   d.querySelectorAll('.c6-hold').forEach(e=>{const tw=e.querySelector('.c6-t').getBoundingClientRect().width;const hw=tw/+e.style.getPropertyValue('--cw'),hh=hw*4/3,cy=+e.style.getPropertyValue('--cy');
     e.querySelectorAll('.c6-hand').forEach(hn=>{hn.style.width=hw+'px';hn.style.top=(tw*4/3-cy*hh)+'px'})});
   if(VID){d.querySelectorAll('.c6-t').forEach(c=>{c.classList.add('c6-wait');const io=new IntersectionObserver(es=>{if(!es.some(e=>e.isIntersecting))return;io.disconnect();c.classList.add('c6-in')},{threshold:.55});io.observe(c)})}
   d.querySelectorAll('.c6-f').forEach(f=>{const fr=f.getBoundingClientRect(),vert=f.classList.contains('c6-sn');[...f.children].filter(n=>n.tagName!=='IMG'&&n.tagName!=='svg').forEach(n=>{let k=0;const big=()=>{const r=n.getBoundingClientRect();const lim=f.classList.contains('c6-nm')?.78:f.classList.contains('c6-vr')?.8:.9;return vert?(r.height>fr.height*.94||r.width>fr.width*.9):(r.width>fr.width*lim||(f.children.length===1&&r.height>fr.height*.8))};while(big()&&k<40){n.style.fontSize=(parseFloat(getComputedStyle(n).fontSize)*.95)+'px';k++}})});
   // the flag hangs just after the version's own letters (a fixed spot covered the end of "Grok 4.7")
   d.querySelectorAll('.c6-t').forEach(c=>{const v=c.querySelector('.c6-vr span'),f=c.querySelector('.c6-flag');if(!v||!f)return;const cr=c.getBoundingClientRect(),vr=v.getBoundingClientRect();
     f.style.left=((Math.max(vr.right,c.querySelector('.c6-vr').getBoundingClientRect().right)-cr.left+3)/cr.width*100)+'%'});
   d.querySelectorAll('.c6-box,.c6-board').forEach(f=>{const fr=f.getBoundingClientRect(),row=f.classList.contains('c6-board');let k=0;
     const big=()=>row?[...f.children].reduce((a,n)=>a+n.getBoundingClientRect().width,0)>fr.width*.92||[...f.children].some(n=>n.getBoundingClientRect().height>fr.height*.86):[...f.children].reduce((a,n)=>a+n.getBoundingClientRect().height,0)>fr.height*.86||[...f.children].some(n=>n.getBoundingClientRect().width>fr.width*.92);
     while(big()&&k<40){f.querySelectorAll('span,small').forEach(n=>n.style.fontSize=(parseFloat(getComputedStyle(n).fontSize)*.95)+'px');k++}});
   if(VID)d.querySelectorAll('.c6-pnl .c6-N,.c6-bd-n').forEach(el=>{const fin=el.textContent,v=Math.abs(+(el.dataset.v||M[0].pnl)),sg=fin[0];
     const io=new IntersectionObserver(es=>{if(!es.some(e=>e.isIntersecting))return;io.disconnect();const t0=performance.now();
       const st=tt=>{const k=Math.min(1,(tt-t0)/1300),e=1-Math.pow(1-k,3);el.textContent=sg+'$'+Math.round(v*e).toLocaleString('en-US');if(k<1)requestAnimationFrame(st);else el.textContent=fin};requestAnimationFrame(st)},{threshold:.6});io.observe(el)});
   return 'ok'},{t,L,FIT,FLD,G,BASE,VID});
  if(ok!=='ok'){console.log(t,ok);continue}
  await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1500);
  await p.evaluate(()=>document.querySelectorAll('body *').forEach(n=>{if(getComputedStyle(n).position==='fixed')n.style.setProperty('display','none','important')}));
  await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden'});
  const top=await p.evaluate(()=>{const e=document.querySelector('#wc-book .wc-chars');return Math.round(e.getBoundingClientRect().top+scrollY)});
  if(VID){await p.evaluate(y=>scrollTo(0,y-200),top);await p.waitForTimeout(800);
    await p.evaluate(()=>new Promise(res=>{const y0=scrollY,dist=document.querySelector('#wc-book .wc-chars').offsetHeight-500,sp=140;let t0=performance.now();
      const stops=[200,900,1600,2300,3000];let held=0,hs=0;
      const f=tt=>{if(hs){if(tt-hs<2000){requestAnimationFrame(f);return}hs=0;held+=2000}const d=Math.min(dist,(tt-t0-held)*sp/1000);if(stops.length&&d>=stops[0]){stops.shift();hs=tt}scrollTo(0,y0+d);if(d<dist)requestAnimationFrame(f);else setTimeout(res,1500)};requestAnimationFrame(f)}));continue}
  const m=await p.evaluate(()=>{const s=document.querySelector('#wc-book .wc-chars'),r=s.getBoundingClientRect();
    const over=[...s.querySelectorAll('.c6-f')].filter(f=>[...f.children].concat([f]).some(n=>n.getBoundingClientRect().right>f.getBoundingClientRect().right+1.5||n.getBoundingClientRect().left<f.getBoundingClientRect().left-1.5)).map(f=>f.className+':'+f.textContent.slice(0,16));
    return {h:Math.round(r.height),sw:document.documentElement.scrollWidth,over}});
  if(W<1000){for(const [k,y] of [[0,0],[1,Math.round(H*.95)],[2,Math.round(H*1.9)]]){await p.evaluate(y=>scrollTo(0,y),top+y);await p.waitForTimeout(700);await p.screenshot({path:`${OUT}/${t}-${W}-s${k}.png`})}}
  else{await p.evaluate(y=>scrollTo(0,y-20),top);await p.waitForTimeout(700);await p.locator('#wc-book .wc-chars').screenshot({path:`${OUT}/${t}-${W}.png`})}
  console.log(t,W,JSON.stringify(m),er.slice(0,2).join(' | '));
 }
 await ctx.close();await b.close()})();
