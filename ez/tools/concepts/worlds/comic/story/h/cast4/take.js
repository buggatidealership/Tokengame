// cast4: Meet the models, today's cards redrawn as painted tickets hung in a world (gal | ex | mid), laid over the real built X3+ page.
// Every number from the page's own data (POP.data(): __x2pPnl + MODELS + ROUNDS). Serve ez/ on PORT (8941).
// node take.js <outdir> <W> <now|gal|ex|mid,...> [--video] [--hi]   (--hi: use the 2K repaints in img2k/ where they exist)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fonts=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
const fs=require('fs');const OUT=process.argv[2],W=+process.argv[3],TAKES=process.argv[4].split(','),VID=process.argv.includes('--video');
const PORT=process.env.PORT||8941,BASE='tools/concepts/worlds/comic/story/h/cast4/';
const L=JSON.parse(fs.readFileSync(__dirname+'/layout.json','utf8')),FIT=JSON.parse(fs.readFileSync(__dirname+'/fit.json','utf8')),FLD=JSON.parse(fs.readFileSync(__dirname+'/fields.json','utf8')),CSS=fs.readFileSync(__dirname+'/take.css','utf8');
const HI=process.argv.includes('--hi')?fs.readdirSync(__dirname+'/cut').filter(f=>f.includes('-2k')).map(f=>f.replace('-2k','')):[];
fs.mkdirSync(OUT,{recursive:true});const H=W>1000?900:844;
(async()=>{const b=await chromium.launch();
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:W>1000?1:2,...(VID?{recordVideo:{dir:OUT,size:{width:W,height:H}}}:{})});
 const p=await ctx.newPage();await fonts(p);const er=[];p.on('pageerror',e=>er.push(e.message));
 await p.goto(`http://localhost:${PORT}/v47-live-x3plus.html?${Date.now()}`,{waitUntil:'load'});
 await p.waitForFunction(()=>document.querySelector('.pp1-c.fb-on'),null,{timeout:90000});await p.waitForTimeout(2500);
 await p.addStyleTag({content:CSS});
 await p.addStyleTag({url:'https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap'}).catch(()=>{});
 for(const t of TAKES){
  const ok=await p.evaluate(({t,L,FIT,FLD,BASE,VID,HI})=>{
   const s=document.querySelector('#wc-book .wc-chars');s.querySelector('.c4')?.remove();document.documentElement.classList.remove('c4-on');
   if(t==='now')return 'ok';
   document.documentElement.classList.add('c4-on');
   const D=POP.data(),desk=matchMedia('(min-width:1000px)').matches,a=desk?'d':'p',S=L[a];
   const src=n=>BASE+'cut/'+(HI.includes(n)?n.replace(/(\.\w+)$/,'-2k$1'):n);
   const FL={GPT:'us',CLAUDE:'us',GROK:'us',KIMI:'cn'},FD={CLAUDE:'founder-claude-anim',GPT:'founder-gpt-anim',GROK:'founder-grok-anim',KIMI:'founder-kimi-anim'};
   const pc=v=>(v*100).toFixed(3)+'%';
   const box=(r,cls,inner,extra='')=>`<div class="c4-f ${cls}" style="left:${pc(r[0])};top:${pc(r[1])};width:${pc(r[2]-r[0])};height:${pc(r[3]-r[1])}${extra}">${/^</.test(inner)?inner:`<span>${inner}</span>`}</div>`;
   const mark=m=>{const M=MODELS[m],c=POP.mcol(m);return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${M.d}" fill="${m==='GROK'?'#7a45ff':c}" fill-rule="${M.fr||'nonzero'}" transform="translate(.7 .6)"/><path d="${M.d}" fill="#0d0b10" fill-rule="${M.fr||'nonzero'}"/></svg>`};
   const tick=x=>`<img src="${src(x==='W'?'k-w.webp':'k-l.webp')}" alt="">`;
   let h=`<div class="c4-bg" aria-hidden="true"><i></i></div><div class="c4-hd"><p class="ez-hd"><span class="ez-w">Meet the</span> <span class="ez-w">models</span></p>
     <span class="c4-sign"><img src="${src('s-'+t+'.webp')}" alt=""><p>Not the Instagram kind.<br>Ranked by P&amp;L: $100K on every call.</p></span></div><div class="c4-grid">`;
   D.models.forEach((x,i)=>{
     const tk=`t-${t}-${a}-${x.m.toLowerCase()}`,F=Object.assign({},S,FLD[tk]||{}),vw=F.ver[2]-F.ver[0],vh=F.ver[3]-F.ver[1];
     const up=x.pnl>=0,b=x.best,bu=b.v>=0,fw=desk?.15:.11,flagR=[F.ver[2]+.012,F.ver[1]-vh*.25,F.ver[2]+.012+fw,0];
     const bw=S.boxw,bh=bw*(desk?9/16:3/4),bx=k=>S.box0[0]+k*(bw+S.boxg);
     const fr=.006,w=F.win,vr=[w[0]-fr,w[1]-fr*(desk?9/16:3/4),w[2]+fr,w[3]+fr*(desk?9/16:3/4)];
     const lamps=t!=='gal';
     h+=`<article class="c4-t" data-m="${x.m}"><p class="c4-sr">#${i+1} ${x.name}, ${x.ver}. P&amp;L ${POP.pm(x.pnl)}. Right way on ${x.W} of ${x.tot} calls. Best call ${POP.pm(b.v)} on ${b.r.co}. Last five: ${x.last5.map(s=>s==='W'?'right':'wrong').join(', ')}.</p>
      <div class="c4-vid" aria-hidden="true" style="left:${pc(vr[0])};top:${pc(vr[1])};width:${pc(vr[2]-vr[0])};height:${pc(vr[3]-vr[1])}"><video muted loop playsinline autoplay preload="auto" poster="media/${FD[x.m]}.jpg"><source src="media/${FD[x.m]}.mp4" type="video/mp4"></video></div>
      <img class="c4-art" src="${src(`t-${t}-${a}-${x.m.toLowerCase()}.webp`)}" alt="" aria-hidden="true">
      ${i===0?`<img class="c4-gold" src="${src(`g-${t}-${a}.webp`)}" alt="" aria-hidden="true">`:''}
      <div aria-hidden="true">
      ${box(S.seal,'c4-rk','#'+(i+1))}${box(S.strip,'c4-sn',i===0?'Golden ticket':'Season 1')}
      ${box(FIT[`coin-t-${t}-${a}-${x.m.toLowerCase()}`]||S.coin,'c4-coin',mark(x.m))}${box(F.ribbon,'c4-nm',x.name.toUpperCase())}
      ${box(F.ver,'c4-vr',POP.esc(x.ver))}
      <img class="c4-flag" src="${src('f-'+FL[x.m]+'.webp')}" alt="" style="left:${pc(flagR[0])};top:${pc(flagR[1])};width:${pc(flagR[2]-flagR[0])}">
      ${box(F.pnl,'c4-box c4-pnl',`<span class="c4-L">P&amp;L</span><span class="c4-N ${up?'up':'dn'}" data-v="${Math.round(x.pnl)}">${POP.pm(x.pnl)}</span>`)}
      ${box(F.rw,'c4-box c4-rw',`<span class="c4-L">Right way</span><span class="c4-N">${x.W}/${x.tot}</span>`)}
      ${box(F.bc,'c4-box c4-bc',`<span class="c4-L">Best call</span><span class="c4-N ${bu?'up':'dn'}">${POP.pm(b.v)}</span><small>${POP.esc(b.r.co)} (${POP.esc(b.r.ticker)})</small>`)}
      ${x.last5.map((r,k)=>{const q=FIT[`t-${t}-${a}-${x.m.toLowerCase()}`][k],gw=q[2]-q[0],gh=q[3]-q[1];return (lamps?`<i class="c4-lamp ${r==='W'?'w':'l'}" style="--k:${k};left:${pc(q[0]-gw*.08)};top:${pc(q[1]-gh*.08)};width:${pc(gw*1.16)};height:${pc(gh*1.16)}"></i>`:'')+box(q,'c4-l5i',tick(r).replace('<img ',`<img style="--k:${k}" `))}).join('')}
      ${(()=>{const q=FIT[tk],l0=q[0][0],l1=q[4][2],top=Math.min(...q.map(r=>r[1])),bot=Math.max(...q.map(r=>r[3]));
        // phones: the label sits on the stock right of the five; desktop: in the gap above them, or under them
        if(!desk)return box([l1+.02,top,.955,bot],'c4-l5l c4-L','Last 5');
        const gap=top-F.bc[3];return box(gap>.028?[l0,F.bc[3]+.004,l1,top-.004]:[l0,bot+.004,l1,Math.min(.985,bot+.04)],'c4-l5l c4-L','Last 5')})()}
      </div></article>`});
   const d=document.createElement('div');d.className='c4 c4-'+t;d.style.setProperty('--bgp',`url(${src('b-'+t+'-p.jpg')})`);d.style.setProperty('--bgd',`url(${src('b-'+t+'-d.jpg')})`);d.innerHTML=h+'</div>';
   s.prepend(d);
   if(VID){d.querySelectorAll('.c4-t').forEach(c=>{c.classList.add('c4-wait');const io=new IntersectionObserver(es=>{if(!es.some(e=>e.isIntersecting))return;io.disconnect();c.classList.add('c4-in')},{threshold:.55});io.observe(c)})}
   // fit: a figure never leaves its painted field
   d.querySelectorAll('.c4-f').forEach(f=>{const fr=f.getBoundingClientRect(),vert=f.classList.contains('c4-sn');[...f.children].filter(n=>n.tagName!=='IMG'&&n.tagName!=='svg').forEach(n=>{let k=0;const big=()=>{const r=n.getBoundingClientRect();const lim=f.classList.contains("c4-nm")?.76:.9;return vert?(r.height>fr.height*.94||r.width>fr.width*.9):(r.width>fr.width*lim||(f.children.length===1&&r.height>fr.height*.8))};while(big()&&k<40){const fs=parseFloat(getComputedStyle(n).fontSize);n.style.fontSize=(fs*.95)+'px';k++}})});
   // the box plates: their figures and labels share the plate's height
   d.querySelectorAll('.c4-box').forEach(f=>{const fr=f.getBoundingClientRect();let k=0;while([...f.children].reduce((a,n)=>a+n.getBoundingClientRect().height,0)>fr.height*.86&&k<30){f.querySelectorAll('span,small').forEach(n=>n.style.fontSize=(parseFloat(getComputedStyle(n).fontSize)*.95)+'px');k++}});
   if(VID)d.querySelectorAll('.c4-pnl .c4-N').forEach(el=>{const fin=el.textContent,v=Math.abs(+el.dataset.v),sg=fin[0];
     const io=new IntersectionObserver(es=>{if(!es.some(e=>e.isIntersecting))return;io.disconnect();const t0=performance.now();
       const st=tt=>{const k=Math.min(1,(tt-t0)/1300),e=1-Math.pow(1-k,3);el.textContent=sg+'$'+Math.round(v*e).toLocaleString('en-US');if(k<1)requestAnimationFrame(st);else el.textContent=fin};requestAnimationFrame(st)},{threshold:.6});io.observe(el)});
   return 'ok'},{t,L,FIT,FLD,BASE,VID,HI});
  if(ok!=='ok'){console.log(t,ok);continue}
  await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1500);
  await p.evaluate(()=>document.querySelectorAll('body *').forEach(n=>{if(getComputedStyle(n).position==='fixed'&&!n.closest('#wc-book'))n.style.visibility='hidden'}));
  const top=await p.evaluate(()=>{const e=document.querySelector('#wc-book .wc-chars');return Math.round(e.getBoundingClientRect().top+scrollY)});
  if(VID){await p.evaluate(y=>scrollTo(0,y-300),top);await p.waitForTimeout(800);
    await p.evaluate(()=>new Promise(res=>{const y0=scrollY,dist=document.querySelector('#wc-book .wc-chars').offsetHeight-300,sp=120,stops=[300,800,1300,1800];let t0=performance.now(),held=0,hs=0;
      const f=tt=>{if(hs){if(tt-hs<2200){requestAnimationFrame(f);return}hs=0;held+=2200}const d=Math.min(dist,(tt-t0-held)*sp/1000);if(stops.length&&d>=stops[0]){stops.shift();hs=tt}scrollTo(0,y0+d);if(d<dist)requestAnimationFrame(f);else setTimeout(res,1500)};requestAnimationFrame(f)}));continue}
  // shots: on phones the viewport at three scroll steps (the sticky world shows behind what is on screen), on desktop the section
  const m=await p.evaluate(()=>{const s=document.querySelector('#wc-book .wc-chars'),r=s.getBoundingClientRect();
    const over=[...s.querySelectorAll('.c4-f')].filter(f=>[...f.children].concat([f]).some(n=>n.getBoundingClientRect().right>f.getBoundingClientRect().right+1.5||n.getBoundingClientRect().left<f.getBoundingClientRect().left-1.5)).map(f=>f.className+':'+f.textContent.slice(0,16));
    return {h:Math.round(r.height),sw:document.documentElement.scrollWidth,over}});
  await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden'});
  if(W<1000){const hh=m.h;for(const [k,y] of [[0,0],[1,Math.round(H*.95)],[2,Math.round(hh-H)]]){await p.evaluate(y=>scrollTo(0,y),top+y);await p.waitForTimeout(700);await p.screenshot({path:`${OUT}/${t}-${W}-s${k}.png`})}}
  else{await p.evaluate(y=>scrollTo(0,y-20),top);await p.waitForTimeout(700);await p.locator('#wc-book .wc-chars').screenshot({path:`${OUT}/${t}-${W}.png`})}
  console.log(t,W,JSON.stringify(m),er.slice(0,2).join(' | '));
 }
 await ctx.close();await b.close()})();
