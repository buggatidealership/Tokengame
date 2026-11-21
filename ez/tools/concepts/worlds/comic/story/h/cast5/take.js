// cast5: Meet the models, today's layout with the big living portrait (about half the ticket), painted as tickets, after a painted opening panel.
// Takes: now | b1 | b2 | b3 (the trading floor, three ways) | gal | mid. Laid over the real built X3+ page; every number from POP.data() (__x2pPnl + MODELS + ROUNDS).
// node take.js <outdir> <W> <takes,...> [--video] [--hi]   (serve ez/ on PORT, default 8941)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fonts=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
const fs=require('fs');const OUT=process.argv[2],W=+process.argv[3],TAKES=process.argv[4].split(','),VID=process.argv.includes('--video');
const PORT=process.env.PORT||8941,BASE='tools/concepts/worlds/comic/story/h/cast5/',B4='tools/concepts/worlds/comic/story/h/cast4/cut/';
const rd=f=>JSON.parse(fs.readFileSync(__dirname+'/'+f,'utf8'));
const L=rd('layout.json'),FIT=rd('fit.json'),FLD=rd('fields.json'),OP=rd('op.json'),CSS=fs.readFileSync(__dirname+'/take.css','utf8');
const HI=process.argv.includes('--hi')?fs.readdirSync(__dirname+'/cut').filter(f=>f.includes('-2k')).map(f=>f.replace('-2k','')):[];
fs.mkdirSync(OUT,{recursive:true});const H=W>1000?900:844;
(async()=>{const b=await chromium.launch();
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:W>1000?1:2,...(VID?{recordVideo:{dir:OUT,size:{width:W,height:H}}}:{})});
 const p=await ctx.newPage();await fonts(p);const er=[];p.on('pageerror',e=>er.push(e.message));
 await p.goto(`http://localhost:${PORT}/v47-live-x3plus.html?${Date.now()}`,{waitUntil:'load'});
 await p.waitForFunction(()=>document.querySelector('.pp1-c.fb-on'),null,{timeout:90000});await p.waitForTimeout(2500);
 await p.addStyleTag({content:CSS+'\n.x2p-cw{display:none!important}'});
 for(const t of TAKES){
  const ok=await p.evaluate(({t,L,FIT,FLD,OP,BASE,B4,VID,HI})=>{
   const s=document.querySelector('#wc-book .wc-chars');s.querySelector('.c5')?.remove();document.documentElement.classList.remove('c5-on');
   if(t==='now')return 'ok';
   document.documentElement.classList.add('c5-on');
   const D=POP.data(),desk=matchMedia('(min-width:1000px)').matches,a=desk?'d':'p',S=L[a];
   const src=n=>BASE+'cut/'+(HI.includes(n)?n.replace(/(\.\w+)$/,'-2k$1'):n);
   const w4={b1:'ex',b1h:'ex',b2:'ex',b3:'ex',gal:'gal',mid:'mid'}[t];
   // b1h: the 2K repaints of B1 (phones only; desktop keeps B1's 1K paintings)
   const tt=t==='b1h'&&desk?'b1':t,ts=t==='b1h'?'b1':t;
   const FL={GPT:'us',CLAUDE:'us',GROK:'us',KIMI:'cn'},FD={CLAUDE:'founder-claude-anim',GPT:'founder-gpt-anim',GROK:'founder-grok-anim',KIMI:'founder-kimi-anim'};
   const pc=v=>(v*100).toFixed(3)+'%';
   const box=(r,cls,inner,extra='')=>`<div class="c5-f ${cls}" style="left:${pc(r[0])};top:${pc(r[1])};width:${pc(r[2]-r[0])};height:${pc(r[3]-r[1])}${extra}">${/^</.test(inner)?inner:`<span>${inner}</span>`}</div>`;
   const mark=m=>{const M=MODELS[m],c=POP.mcol(m);return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${M.d}" fill="${m==='GROK'?'#7a45ff':c}" fill-rule="${M.fr||'nonzero'}" transform="translate(.7 .6)"/><path d="${M.d}" fill="#0d0b10" fill-rule="${M.fr||'nonzero'}"/></svg>`};
   // the last five: b1 and mid paint a lit lamp or bulb (green or red) over the unlit one; b2 chalks a tick or cross on its small slate; b3 and gal take a rubber stamp
   const L5k={b1:r=>`<img class="c5-lit" src="${src((r==='W'?'lw':'ll')+'-b1.webp')}" alt="">`,mid:r=>`<img class="c5-lit" src="${src((r==='W'?'lw':'ll')+'-mid.webp')}" alt="">`,
     b2:r=>`<img class="c5-chalk" src="${src(r==='W'?'cw.webp':'cl.webp')}" alt="">`,b3:r=>`<img class="c5-stamp" src="${B4+(r==='W'?'k-w.webp':'k-l.webp')}" alt="">`,gal:r=>`<img class="c5-stamp" src="${B4+(r==='W'?'k-w.webp':'k-l.webp')}" alt="">`},L5=L5k[ts];
   // the opening panel: the world itself, the heading lettered into its calm wall, the line on the world's own board
   const O=OP[`o-${tt}-${a}`];
   let h=`<figure class="c5-op" style="--ar:${O.ar}"><img src="${src(`o-${tt}-${a}.jpg`)}" alt="">
     <p class="ez-hd" style="left:${pc(O.hd[0])};top:${pc(O.hd[1])};width:${pc(O.hd[2]-O.hd[0])}"><span class="ez-w">Meet the</span> <span class="ez-w">models</span></p>
     <div class="c5-bd c5-bd-${ts}" style="left:${pc(O.bd[0])};top:${pc(O.bd[1])};width:${pc(O.bd[2]-O.bd[0])};height:${pc(O.bd[3]-O.bd[1])}${O.sk?`;transform:${O.sk}`:''}"><span>Not the Instagram kind.<br>Ranked by P&amp;L:<br>$100K on every call.</span></div></figure>
     <div class="c5-floor"><div class="c5-bg" aria-hidden="true"><i></i></div><div class="c5-grid">`;
   D.models.forEach((x,i)=>{
     const tk=`t-${tt}-${a}-${x.m.toLowerCase()}`,F=Object.assign({},S,FLD[tk]||{}),vh=F.ver[3]-F.ver[1];
     const up=x.pnl>=0,bb=x.best,bu=bb.v>=0,fw=desk?.095:.1,flagR=[F.ver[2]+.012,F.ver[1]-vh*(desk?.05:.2),F.ver[2]+.012+fw];
     const fr=.004,w=F.win||S.win,ar=desk?9/16:3/4,vr=[w[0]-fr,w[1]-fr*ar,w[2]+fr,w[3]+fr*ar];
     h+=`<article class="c5-t" data-m="${x.m}"><p class="c5-sr">#${i+1} ${x.name}, ${x.ver}. P&amp;L ${POP.pm(x.pnl)}. Right way on ${x.W} of ${x.tot} calls. Best call ${POP.pm(bb.v)} on ${bb.r.co}. Last five: ${x.last5.map(s=>s==='W'?'right':'wrong').join(', ')}.</p>
      <div class="c5-vid" aria-hidden="true" style="background:#222 url(media/${FD[x.m]}.jpg) 50% 20%/cover;left:${pc(vr[0])};top:${pc(vr[1])};width:${pc(vr[2]-vr[0])};height:${pc(vr[3]-vr[1])}"><video muted loop playsinline autoplay preload="auto" poster="media/${FD[x.m]}.jpg"><source src="media/${FD[x.m]}.mp4" type="video/mp4"></video></div>
      <img class="c5-art" src="${src(tk+'.webp')}" alt="" aria-hidden="true">
      ${i===0?`<img class="c5-gold" src="${B4}g-${w4}-${a}.webp" alt="" aria-hidden="true">`:''}
      <div aria-hidden="true">
      ${box(S.seal,'c5-rk','#'+(i+1))}${box(S.strip,'c5-sn',i===0?'Golden ticket':'Season 1')}
      ${box(FIT['coin-'+tk]||S.coin,'c5-coin',mark(x.m))}${box(F.ribbon,'c5-nm',x.name.toUpperCase())}
      ${box(F.ver,'c5-vr',POP.esc(x.ver))}
      <img class="c5-flag" src="${B4}f-${FL[x.m]}.webp" alt="" style="left:${pc(flagR[0])};top:${pc(flagR[1])};width:${pc(flagR[2]-flagR[0])}">
      ${box(F.pnl,'c5-box c5-pnl',`<span class="c5-L">P&amp;L</span><span class="c5-N ${up?'up':'dn'}" data-v="${Math.round(x.pnl)}">${POP.pm(x.pnl)}</span>`)}
      ${box(F.rw,'c5-box c5-rw',`<span class="c5-L">Right way</span><span class="c5-N">${x.W}/${x.tot}</span>`)}
      ${box(F.bc,'c5-box c5-bc',`<span class="c5-L">Best call</span><span class="c5-N ${bu?'up':'dn'}">${POP.pm(bb.v)}</span><small>${POP.esc(bb.r.co)} (${POP.esc(bb.r.ticker)})</small>`)}
      ${x.last5.map((r,k)=>{const q=(FIT[tk]||[])[k];if(!q)return '';return box(q,'c5-l5i',L5(r).replace('<img ',`<img style="--k:${k}" `))}).join('')}
      ${(()=>{const q=FIT[tk]||[];if(q.length<5)return '';const l0=q[0][0],l1=q[4][2],top=Math.min(...q.map(r=>r[1])),bot=Math.max(...q.map(r=>r[3]));
        if(!desk)return box([l1+.02,top,.955,bot],'c5-l5l c5-L','Last 5');
        const gap=top-F.bc[3];return box(gap>.028?[l0,F.bc[3]+.004,l1,top-.004]:[l0,bot+.004,l1,Math.min(.985,bot+.04)],'c5-l5l c5-L','Last 5')})()}
      </div></article>`});
   const d=document.createElement('div');d.className='c5 c5-'+ts+' c5w-'+w4+(t==='b1h'?' c5-b1h':'');d.style.setProperty('--bgp',`url(${B4}b-${w4}-p.jpg)`);d.style.setProperty('--bgd',`url(${B4}b-${w4}-d.jpg)`);d.innerHTML=h+'</div></div>';
   s.prepend(d);
   if(VID){d.querySelectorAll('.c5-t').forEach(c=>{c.classList.add('c5-wait');const io=new IntersectionObserver(es=>{if(!es.some(e=>e.isIntersecting))return;io.disconnect();c.classList.add('c5-in')},{threshold:.55});io.observe(c)})}
   const fitAll=()=>{d.querySelectorAll('.c5-f span,.c5-f small,.c5-bd span').forEach(n=>n.style.fontSize='');d.querySelectorAll('.c5-f,.c5-bd').forEach(f=>{const fr=f.getBoundingClientRect(),vert=f.classList.contains('c5-sn');[...f.children].filter(n=>n.tagName!=='IMG'&&n.tagName!=='svg').forEach(n=>{let k=0;const big=()=>{const r=n.getBoundingClientRect();const lim=f.classList.contains('c5-nm')?.76:f.classList.contains('c5-bd')?.86:.9;return vert?(r.height>fr.height*.94||r.width>fr.width*.9):(r.width>fr.width*lim||((f.children.length===1)&&r.height>fr.height*(f.classList.contains('c5-bd')?.92:.8)))};while(big()&&k<50){const fs=parseFloat(getComputedStyle(n).fontSize);n.style.fontSize=(fs*.95)+'px';k++}})});
    d.querySelectorAll('.c5-box').forEach(f=>{const fr=f.getBoundingClientRect();let k=0;while([...f.children].reduce((a,n)=>a+n.getBoundingClientRect().height,0)>fr.height*.86&&k<30){f.querySelectorAll('span,small').forEach(n=>n.style.fontSize=(parseFloat(getComputedStyle(n).fontSize)*.95)+'px');k++}})};
   window.__c5fit=fitAll;
   if(VID)d.querySelectorAll('.c5-pnl .c5-N').forEach(el=>{const fin=el.textContent,v=Math.abs(+el.dataset.v),sg=fin[0];
     const io=new IntersectionObserver(es=>{if(!es.some(e=>e.isIntersecting))return;io.disconnect();const t0=performance.now();
       const st=tt=>{const k=Math.min(1,(tt-t0)/1300),e=1-Math.pow(1-k,3);el.textContent=sg+'$'+Math.round(v*e).toLocaleString('en-US');if(k<1)requestAnimationFrame(st);else el.textContent=fin};requestAnimationFrame(st)},{threshold:.6});io.observe(el)});
   return 'ok'},{t,L,FIT,FLD,OP,BASE,B4,VID,HI});
  if(ok!=='ok'){console.log(t,ok);continue}
  await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1200);await p.evaluate(()=>window.__c5fit&&window.__c5fit());await p.waitForTimeout(300);
  await p.evaluate(()=>document.querySelectorAll('body *').forEach(n=>{if(getComputedStyle(n).position==='fixed'&&!n.closest('.c5'))n.style.visibility='hidden'}));
  const top=await p.evaluate(()=>{const e=document.querySelector('#wc-book .wc-chars');return Math.round(e.getBoundingClientRect().top+scrollY)});
  if(VID){await p.evaluate(y=>scrollTo(0,y-200),top);await p.waitForTimeout(1500);
    await p.evaluate(()=>new Promise(res=>{const y0=scrollY,dist=document.querySelector('#wc-book .wc-chars').offsetHeight-500,sp=110,stops=[200,700,1250,1800,2350];let t0=performance.now(),held=0,hs=0;
      const f=tt=>{if(hs){if(tt-hs<2400){requestAnimationFrame(f);return}hs=0;held+=2400}const d=Math.min(dist,(tt-t0-held)*sp/1000);if(stops.length&&d>=stops[0]){stops.shift();hs=tt}scrollTo(0,y0+d);if(d<dist)requestAnimationFrame(f);else setTimeout(res,1500)};requestAnimationFrame(f)}));continue}
  const m=await p.evaluate(()=>{const s=document.querySelector('#wc-book .wc-chars'),r=s.getBoundingClientRect();
    const over=[...s.querySelectorAll('.c5-f,.c5-bd')].filter(f=>[...f.children].filter(n=>n.tagName!=='IMG').concat([f]).some(n=>n.getBoundingClientRect().right>f.getBoundingClientRect().right+1.5||n.getBoundingClientRect().left<f.getBoundingClientRect().left-1.5)).map(f=>f.className+':'+f.textContent.slice(0,16));
    const op=s.querySelector('.c5-op');return {h:Math.round(r.height),op:op?Math.round(op.getBoundingClientRect().height):0,sw:document.documentElement.scrollWidth,over}});
  await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden'});
  if(W<1000){const hh=m.h;for(const [k,y] of [[0,0],[1,Math.round(H*.92)],[2,Math.round(H*1.84)],[3,Math.round(hh-H)]]){await p.evaluate(y=>scrollTo(0,y),top+y);await p.waitForTimeout(700);await p.screenshot({path:`${OUT}/${t}-${W}-s${k}.png`})}}
  else{await p.evaluate(y=>scrollTo(0,y-20),top);await p.waitForTimeout(700);await p.locator('#wc-book .wc-chars').screenshot({path:`${OUT}/${t}-${W}.png`})}
  console.log(t,W,JSON.stringify(m),er.slice(0,2).join(' | '));
 }
 await ctx.close();await b.close()})();
