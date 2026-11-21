// cast3: Meet the models as fight night (weigh-in, tale of the tape, walkout) and two other worlds (line-up, card room),
// each in three drawn styles (noir, silver, mignola), laid over the real built X3+ page. Every number from __x2pPnl / MODELS.
// node take.js <outdir> <W> <takes: now | world-style,...> [--video]
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fonts=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
const fs=require('fs');const OUT=process.argv[2],W=+process.argv[3],TAKES=process.argv[4].split(','),VID=process.argv.includes('--video');
const PORT=process.env.PORT||8931,BASE='tools/concepts/worlds/comic/story/h/cast3/';
const PROPS=JSON.parse(fs.readFileSync(__dirname+'/props.json','utf8'));
const CSS=fs.readFileSync(__dirname+'/take.css','utf8');
fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();
 const ctx=await b.newContext({viewport:{width:W,height:W>1000?900:844},deviceScaleFactor:W>1000?1:2,...(VID?{recordVideo:{dir:OUT,size:{width:W,height:W>1000?900:844}}}:{})});
 const T0=Date.now();const p=await ctx.newPage();await fonts(p);const er=[];p.on('pageerror',e=>er.push(e.message));
 await p.goto(`http://localhost:${PORT}/v47-live-x3plus.html?${Date.now()}`,{waitUntil:'load'});
 await p.waitForFunction(()=>document.querySelector('.pp1-c.fb-on'),null,{timeout:90000});await p.waitForTimeout(2500);
 await p.addStyleTag({content:CSS});
 for(const t of TAKES){
  const [world,style]=t.split('-');
  const ok=await p.evaluate(({world,style,PROPS,BASE,VID})=>{
   const s=document.querySelector('#wc-book .wc-chars');if(!s)return 'no section';
   s.querySelector('.c3')?.remove();s.classList.remove('c3-on');
   if(world==='now')return 'ok';
   s.classList.add('c3-on');
   const A=__x2pPnl().A,order=[...s.querySelectorAll('article.wc-ch')].map(a=>a.dataset.m);
   const COL={GPT:'#10a37f',CLAUDE:'#e8692f',GROK:'#9b5cff',KIMI:'#2f7bff'},NM={GPT:'GPT',CLAUDE:'Claude',GROK:'Grok',KIMI:'Kimi'};
   const pm=v=>(v<0?'−':'+')+'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
   const F=order.map((m,i)=>{const a=A[m];return {m,i,name:NM[m],ver:MODELS[m].ver,pnl:a.pnl,W:a.W,L:a.L,hit:Math.round(100*a.W/(a.W+a.L)),l5:a.seq.slice(-5),col:COL[m]}});
   const img=m=>`${BASE}img/p-${world}-${style}-${m.toLowerCase()}.jpg`;
   const prop=n=>{const k=n+'-'+style,r=PROPS[k];return {src:`${BASE}cut/${k}.webp`,r}};
   const l5=f=>f.l5.map(x=>`<b class="${x==='W'?'c3w':'c3l'}">${x==='W'?'✓':'✗'}</b>`).join('');
   const sr=f=>`<p class="pp-sr">#${f.i+1} ${f.name}, ${f.ver}. P&amp;L ${pm(f.pnl)}. ${f.W} right, ${f.L} wrong, ${f.hit}% right. Last five: ${f.l5.map(x=>x==='W'?'right':'wrong').join(', ')}.</p>`;
   // a hand-tuned, slightly irregular panel border: each panel gets its own polygon
   const poly=i=>{const j=k=>((Math.sin(i*7.3+k*3.1)+1)/2*1.4).toFixed(2);return `polygon(${j(1)}% ${j(2)}%,${(48+ +j(3)).toFixed(1)}% ${j(4)/2}%,${100-j(5)}% ${j(6)}%,${100-j(7)/2}% ${(52+ +j(8)).toFixed(1)}%,${100-j(9)}% ${100-j(10)}%,${(50- +j(11)).toFixed(1)}% ${100-j(12)/2}%,${j(13)}% ${100-j(14)}%,${j(15)/2}% ${(47+ +j(16)).toFixed(1)}%)`};
   const surf=(n,f,inner,extra='')=>{const P=prop(n),r=P.r,x0=r.in[0],y0=r.in[1],x1=r.in[2],y1=r.in[3];
     return `<div class="c3-prop c3-${n}" style="--ar:${r.w}/${r.h};--x0:${x0*100}%;--y0:${y0*100}%;--x1:${(1-x1)*100}%;--y1:${(1-y1)*100}%">
       <img src="${P.src}" alt="" aria-hidden="true"><div class="c3-in">${inner}</div>${extra}</div>`};
   let h='';
   const head=`<h2 class="c3-h"><span>Meet the models</span></h2><p class="c3-dk">Ranked by P&amp;L, if you'd bet $100K on every call.</p>`;
   if(world==='tape'){
     const P=prop('tape'),r=P.r,c=r.cols||[.25,.5,.75],e=[r.in[0],...c,r.in[2]];
     h=`<div class="c3-grid c3-g4">${F.map(f=>`<figure class="c3-p" style="--mc:${f.col};clip-path:${poly(f.i)}"><img class="c3-art" src="${img(f.m)}" alt="${f.name}, drawn as a fighter">${sr(f)}</figure>`).join('')}</div>
       <div class="c3-board" style="background-image:url(${P.src})" aria-hidden="true">${F.map((f,k)=>`<div class="c3-col" style="left:${(e[k]*100).toFixed(2)}%;width:${((e[k+1]-e[k])*100).toFixed(2)}%;top:${r.in[1]*100}%;bottom:${(1-r.in[3])*100}%;--mc:${f.col}">
         <span class="c3-rk">No. ${f.i+1}</span><span class="c3-nm">${f.name}</span><span class="c3-pl ${f.pnl<0?'c3-neg':''}">${pm(f.pnl)}</span><span class="c3-wl">${f.W}-${f.L}</span><span class="c3-ht">${f.hit}% right</span><span class="c3-l5">${l5(f)}</span></div>`).join('')}</div>`;
   } else {
     h=`<div class="c3-grid">${F.map(f=>{let inner='',extra='',pn=world;
       const nm=`<span class="c3-rk">No. ${f.i+1}</span><span class="c3-nm">${f.name} <i>${f.ver.replace(f.name+' ','').replace(/^GPT-/,'')}</i></span>`,
             pl=`<span class="c3-pl ${f.pnl<0?'c3-neg':''}">${pm(f.pnl)}</span>`,wl=`<span class="c3-wl">${f.W}-${f.L} · ${f.hit}% right</span>`,ls=`<span class="c3-l5">${l5(f)}</span>`;
       if(world==='weigh')inner=nm+pl+wl+ls;
       if(world==='walk')inner=nm+pl+wl+ls;
       if(world==='lineup')inner=`<span class="c3-r1">${nm}</span>${pl}<span class="c3-r3">${wl}${ls}</span>`;
       if(world==='cards'){inner=nm+pl+wl;extra=`<div class="c3-chips">${f.l5.map((x,k)=>`<img src="${BASE}cut/chip${x==='W'?'g':'r'}-${style}.webp" alt="" style="--k:${k}"><b class="${x==='W'?'c3w':'c3l'}" style="--k:${k}">${x}</b>`).join('')}</div>`}
       return `<figure class="c3-p" style="--mc:${f.col};clip-path:${poly(f.i)}"><img class="c3-art" src="${img(f.m)}" alt="${f.name}, drawn">${sr(f)}<div aria-hidden="true">${surf(pn,f,inner)}${extra}</div></figure>`}).join('')}</div>`;
   }
   const d=document.createElement('div');d.className=`c3 c3-${world} c3-s-${style}`;d.innerHTML=head+h;
   s.querySelector('.pp1-ttl').before(d);
   // type sizes follow the painted surface's own width
   if(world==='weigh')d.querySelectorAll('.c3-p').forEach((pn,i)=>{[[8,46,0],[66,40,1.7],[30,52,3.1]].forEach(([x,y,dl],k)=>pn.insertAdjacentHTML('beforeend',`<i class="c3-flash" aria-hidden="true" style="left:${x+((i*13)%9)}%;top:${y-((i*7)%8)}%;animation-delay:${dl+i*.9}s"></i>`))});
   const fit=()=>d.querySelectorAll('.c3-prop,.c3-board,.c3-p').forEach(n=>n.style.setProperty('--pw',n.getBoundingClientRect().width+'px'));fit();
   // motion: the P&L counts up once the panel is in view (money accruing), bulbs flash on the weigh-in
   if(VID){d.querySelectorAll('.c3-pl').forEach(el=>{const fin=el.textContent,neg=fin.startsWith('−'),v=+fin.replace(/[^0-9]/g,'');el.dataset.f=fin;
     const io=new IntersectionObserver(es=>{if(!es.some(e=>e.isIntersecting))return;io.disconnect();const t0=performance.now();
       const st=t=>{const k=Math.min(1,(t-t0)/1300),e=1-Math.pow(1-k,3);el.textContent=(neg?'−':'+')+'$'+Math.round(v*e).toLocaleString('en-US');if(k<1)requestAnimationFrame(st);else el.textContent=fin};requestAnimationFrame(st)},{threshold:.6});io.observe(el)})}
   return 'ok'},{world,style,PROPS,BASE,VID});
  if(ok!=='ok'){console.log(t,ok);continue}
  await p.waitForTimeout(1200);
  if(VID){const top=await p.evaluate(()=>{const e=document.querySelector('#wc-book .wc-chars');return e.getBoundingClientRect().top+scrollY});
    await p.evaluate(y=>scrollTo(0,y-500),top);await p.waitForTimeout(800);console.log('scroll-start',(Date.now()-T0)/1000);
    await p.evaluate(()=>new Promise(res=>{let y0=scrollY,t0=performance.now(),dist=1650,sp=110,stops=[420,800,1180],held=0,hs=0,cur=0;
      const f=t=>{if(hs){if(t-hs<2000){requestAnimationFrame(f);return}hs=0;held+=2000}const el=t-t0-held,d=Math.min(dist,el*sp/1000);
        if(stops.length&&d>=stops[0]){stops.shift();hs=t}scrollTo(0,y0+d);if(d<dist)requestAnimationFrame(f);else setTimeout(res,2000)};requestAnimationFrame(f)}));
    console.log('scroll-end',(Date.now()-T0)/1000);continue}
  await p.evaluate(()=>{document.documentElement.classList.add('c3-shot');document.querySelectorAll('body *').forEach(n=>{if(getComputedStyle(n).position==='fixed'&&!n.closest('#wc-book'))n.style.visibility='hidden'})});const el=p.locator('#wc-book .wc-chars');
  await el.screenshot({path:`${OUT}/${t}-${W}.png`});
  const m=await p.evaluate(()=>{const s=document.querySelector('#wc-book .wc-chars'),r=s.getBoundingClientRect();
    const over=[...s.querySelectorAll('.c3-in > *, .c3-col > *')].filter(n=>n.scrollWidth>n.clientWidth+1||n.getBoundingClientRect().right>n.parentElement.getBoundingClientRect().right+1).map(n=>n.className+':'+n.textContent.slice(0,20));
    return {h:Math.round(r.height),sw:document.documentElement.scrollWidth,over}});
  console.log(t,W,JSON.stringify(m),er.slice(0,2).join(' | '));
 }
 await ctx.close();await b.close()})();
