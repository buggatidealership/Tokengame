/* q5 · Chris Ware: one round as a measured diagram.
   The four plates from the round's own film sit beside a ruler of the stock's move; leader lines put each prediction on the scale,
   the close lands as a line across it, the wrong half is hatched, and the round is filed as one cell in the record's shelf.
   Laid over the built X3+ page. Reads ROUNDS, MODELS, CO_LOGOS, __x2pPnl() only. window.__q5Go(b) sets the beat (1 to 4). */
(function(){
const D=document,H=D.documentElement,N=66;
const r=ROUNDS.find(x=>+x.n===N),A=window.__x2pPnl().A;
const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
const LAB={GPT:'OpenAI',KIMI:'Moonshot AI',CLAUDE:'Anthropic',GROK:'xAI'};
const calls=r.calls.map(c=>{const m=String(c[1]).match(/(UP|DOWN)\s*([\d.]+)/i);const up=/UP/i.test(m[1]);return {m:c[0],up,mag:+m[2],v:(up?1:-1)*+m[2],off:+c[2]}});
const pass=c=>c.up===(r.a>0);
const wins=String(r.win||'').toUpperCase().split(/[^A-Z]+/).filter(Boolean);
const per=m=>A[m]&&A[m].per&&A[m].per[N]?A[m].per[N].v:0;
const money=v=>(v<0?'−':'+')+'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
const pctS=v=>(v>0?'+':v<0?'−':'')+Math.abs(v).toFixed(2)+'%';
const md=s=>{const m=String(s||'').match(/(\d+)\/(\d+)\/(\d+)/);return m?new Date(Date.UTC(2000+(+m[3]%100),+m[1]-1,+m[2],12)):null};
const day=s=>{const d=md(s);return d?d.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric',timeZone:'UTC'}):''};
const face=m=>{const M=MODELS[m];return `<svg class="q5-fc" viewBox="0 0 24 24" aria-hidden="true"><path d="${M.d}" style="fill:${m==='GROK'?'#15121a':M.c}"/></svg>`};
const L=CO_LOGOS[r.ticker];
const film=__qfFilm(N);
/* plate crops in the film's 1080 frame (each plate with the crown slot above it) */
const CROP={GPT:[88,290,128,168],KIMI:[88,453,128,168],CLAUDE:[864,290,128,168],GROK:[864,453,128,168]};
const MKT=[372,688,336,136],T_FULL=9.5,T_CROWN=17,SCR=[12.4,12.8,13.2,13.6,17];
const LO=-3,HI=3;

D.querySelectorAll('main > *').forEach(e=>e.style.display='none');
const S=D.createElement('div');S.id='q5';S.dataset.b='1';S.setAttribute('role','region');S.setAttribute('aria-label',`Round ${N}, ${r.co}, start to finish`);
S.innerHTML=`
 <header class="q5-hd">
   <p class="q5-ttl"><b>Round ${N}</b><span>${L?`<img src="media/${L.f}" alt="">`:''}${r.co} (${r.ticker})</span></p>
   <p class="q5-fig"><i>Fig.</i> <b class="q5-fn">1</b> <i>of 4</i></p>
 </header>
 <div class="q5-stage" data-panel="stage" aria-hidden="true"><svg class="q5-svg"></svg><div class="q5-pl"></div></div>
 <ol class="q5-strip" aria-hidden="true"></ol>
 <div class="q5-shelf" data-panel="shelf" aria-hidden="true"></div>
 <p class="q5-cap" aria-live="polite"></p>
 <nav class="q5-nav"><button type="button" class="q5-pv" aria-label="Previous step">Back</button><span class="q5-dots">${[1,2,3,4].map(i=>`<i data-i="${i}"></i>`).join('')}</span><button type="button" class="q5-nx">Next</button></nav>`;
D.querySelector('main').prepend(S);
const stage=S.querySelector('.q5-stage'),svg=S.querySelector('.q5-svg'),pl=S.querySelector('.q5-pl');

/* plates: one figure per AI, its film plate (blank, then filled, then the winner's crowned), its label under it */
const plate={};
calls.forEach((c,i)=>{const f=D.createElement('figure');f.className='q5-p '+(pass(c)?'q5-ok':'q5-no')+(wins.includes(c.m)?' q5-w':'');f.dataset.m=c.m;f.style.setProperty('--i',i);
  f.innerHTML=`<div class="q5-cv"></div><figcaption><span class="q5-nm">${face(c.m)}${NM[c.m]}</span><span class="q5-call">${c.up?'Up':'Down'} ${c.mag}%</span><span class="q5-gr"><b>${pass(c)?'Pass':'Fail'}</b> ${money(per(c.m))}</span></figcaption>`;
  pl.appendChild(f);plate[c.m]=f});
const shoot=async()=>{
  for(const c of calls){const cv=plate[c.m].querySelector('.q5-cv');
    const [a,b]=await Promise.all([film.grab(T_FULL,CROP[c.m],256,336),film.grab(T_CROWN,CROP[c.m],256,336)]);
    a.className='q5-a';b.className='q5-b';cv.append(a,b)}
  const st=S.querySelector('.q5-strip');
  {const c=await film.grab(2,MKT,336,136);const li=D.createElement('li');li.className='q5-wait';li.dataset.panel='wait';li.appendChild(c);st.appendChild(li)}
  {const c=await film.grab(17,[0,0,1080,1080],600,600);const fa=D.createElement('figure');fa.className='q5-figa';fa.dataset.panel='figA';fa.innerHTML='<figcaption>Fig. A. The case, after the close</figcaption>';fa.prepend(c);stage.appendChild(fa);draw()}
  for(let i=0;i<SCR.length;i++){const c=await film.grab(SCR[i],MKT,336,136);const li=D.createElement('li');li.dataset.panel='m'+i;li.style.setProperty('--i',i);li.appendChild(c);
    if(i===SCR.length-1)li.className='q5-land';st.appendChild(li)}
};

/* the diagram: a ruler of the move, a leader line from each plate to its prediction, the close as a line across */
function draw(){
  const W=stage.clientWidth,Ht=stage.clientHeight,wide=W>700;svg.setAttribute('viewBox',`0 0 ${W} ${Ht}`);
  const ns='http://www.w3.org/2000/svg';svg.innerHTML='';
  const el=(t,a,p)=>{const e=D.createElementNS(ns,t);for(const k in a)e.setAttribute(k,a[k]);(p||svg).appendChild(e);return e};
  const P=wide?Math.min(170,W*.16):Math.min(108,W*.3),PH=P*168/128;
  calls.forEach(c=>{plate[c.m].style.width=P+'px'});const CH=Math.max(...calls.map(c=>plate[c.m].querySelector('figcaption').offsetHeight||40));
  let pos,axis;
  if(!wide){const y0=18,y1=Ht-18,k=(y1-y0)/(HI-LO),X=W/2;pos=v=>({x:X,y:y0+(HI-v)*k});axis={x1:X,y1:y0,x2:X,y2:y1,k,vert:true,X,y0,y1};}
  else{const x0=40,x1=W-40,k=(x1-x0)/(HI-LO),Y=Ht/2;pos=v=>({x:x0+(v-LO)*k,y:Y});axis={x1:x0,y1:Y,x2:x1,y2:Y,k,vert:false,Y,x0,x1};}
  /* halves: the side the market did not take gets hatched at beat 3 */
  const defs=el('defs',{});const hp=el('pattern',{id:'q5h',width:7,height:7,patternUnits:'userSpaceOnUse',patternTransform:'rotate(45)'},defs);el('line',{x1:0,y1:0,x2:0,y2:7,stroke:'#1e1a17','stroke-width':1.3,'stroke-opacity':.55},hp);
  const z=pos(0);
  const wrongHalf=r.a>0?(axis.vert?{x:0,y:z.y,width:W,height:Ht-z.y}:{x:0,y:0,width:z.x,height:Ht}):(axis.vert?{x:0,y:0,width:W,height:z.y}:{x:z.x,y:0,width:W-z.x,height:Ht});
  el('rect',Object.assign({class:'q5-hatch',fill:'url(#q5h)'},wrongHalf));
  /* zero line, dashed across the stage, with its two words */
  if(axis.vert){el('line',{class:'q5-zero',x1:0,y1:z.y,x2:W,y2:z.y});
    el('text',{class:'q5-hw',x:W/2+8,y:z.y-6}).textContent='Up';el('text',{class:'q5-hw',x:W/2+8,y:z.y+14}).textContent='Down';}
  else{el('line',{class:'q5-zero',x1:z.x,y1:0,x2:z.x,y2:Ht});
    el('text',{class:'q5-hw',x:z.x+8,y:16}).textContent='Up →';el('text',{class:'q5-hw','text-anchor':'end',x:z.x-8,y:16}).textContent='← Down';}
  /* the ruler with ticks every 0.5% and labels every 1% */
  el('line',{class:'q5-rul',x1:axis.x1,y1:axis.y1,x2:axis.x2,y2:axis.y2});
  for(let v=LO;v<=HI+1e-9;v+=.5){const p=pos(v),big=Math.abs(v%1)<1e-9,l=big?9:5;
    if(axis.vert){el('line',{class:'q5-tk',x1:p.x-l,y1:p.y,x2:p.x+l,y2:p.y});if(big&&v)el('text',{class:'q5-tl',x:p.x-12,y:p.y+4,'text-anchor':'end'}).textContent=(v>0?'+':'−')+Math.abs(v)+'%';}
    else{el('line',{class:'q5-tk',x1:p.x,y1:p.y-l,x2:p.x,y2:p.y+l});if(big&&v)el('text',{class:'q5-tl',x:p.x,y:p.y+24,'text-anchor':'middle'}).textContent=(v>0?'+':'−')+Math.abs(v)+'%';}}
  /* plates: phone = two columns like the film's octagon (GPT, Kimi left; Claude, Grok right); desktop = above and below the ruler */
  const side={GPT:0,KIMI:0,CLAUDE:1,GROK:1};
  const groups=[[],[]];calls.forEach(c=>groups[side[c.m]].push(c));
  groups.forEach((g,gi)=>{
    const want=g.map(c=>{const p=pos(c.v);return {c,p,t:axis.vert?p.y-PH/2:p.x-P/2}}).sort((a,b)=>a.t-b.t);
    const lim=axis.vert?[4,Ht-PH-CH-4]:[4,W-P-4],gap=6,len=axis.vert?PH+CH:P;
    want.forEach((w,i)=>{w.t=Math.max(lim[0],Math.min(lim[1],w.t));if(i&&w.t<want[i-1].t+len+gap)w.t=want[i-1].t+len+gap});
    for(let i=want.length-1;i>=0;i--){if(want[i].t>lim[1])want[i].t=lim[1];if(i<want.length-1&&want[i].t>want[i+1].t-len-gap)want[i].t=want[i+1].t-len-gap}
    want.forEach(w=>{const f=plate[w.c.m];f.style.width=P+'px';
      let fx,fy,ax,ay;
      if(axis.vert){fx=gi?W-P-4:4;fy=w.t;ax=gi?fx-2:fx+P+2;ay=fy+PH*.6;}
      else{fx=w.t;fy=gi?axis.Y+24:axis.Y-24-PH-CH;ax=fx+P/2;ay=gi?fy-2:fy+PH+CH+2;}
      f.style.left=fx+'px';f.style.top=fy+'px';
      /* leader: an elbow from the plate to its mark on the ruler, a dot on the plate end, a pin on the ruler */
      const p=w.p,d=axis.vert?`M${ax} ${ay} H${(ax+p.x)/2} V${p.y} H${p.x+(gi?8:-8)}`:`M${ax} ${ay} V${(ay+p.y)/2} H${p.x} V${p.y+(gi?8:-8)}`;
      const g2=el('g',{class:'q5-ld '+(pass(w.c)?'q5-ok':'q5-no')+(wins.includes(w.c.m)?' q5-w':''),style:`--i:${calls.indexOf(w.c)}`});
      el('path',{d,pathLength:1},g2);el('circle',{cx:ax,cy:ay,r:2.6},g2);
      el('path',{class:'q5-pin',d:axis.vert?`M${p.x} ${p.y} l${gi?9:-9} -5 v10z`:`M${p.x} ${p.y} l-5 ${gi?9:-9} h10z`,style:`fill:${w.c.m==='GROK'?'#15121a':MODELS[w.c.m].c}`},g2);
      if(wins.includes(w.c.m)){const o=w.c.off.toFixed(2)+'% off';
        el('text',{class:'q5-off',x:axis.vert?p.x+(gi?-12:12):p.x+8,y:axis.vert?p.y+16:p.y+(gi?26:-14),'text-anchor':axis.vert?(gi?'end':'start'):'start'},g2).textContent=o}
    });
  });
  /* the close: a line across the whole stage at the move, its label in the gutter */
  const m=pos(r.a),cl=el('g',{class:'q5-close'});
  if(axis.vert){el('line',{x1:0,y1:m.y,x2:W,y2:m.y,pathLength:1},cl);el('path',{d:`M${m.x} ${m.y} l-7 -11 h14z`},cl);
    el('text',{x:m.x,y:m.y-14,'text-anchor':'middle'},cl).textContent='Close '+pctS(r.a);}
  else{el('line',{x1:m.x,y1:0,x2:m.x,y2:Ht,pathLength:1},cl);el('path',{d:`M${m.x} ${m.y} l-11 -7 v14z`},cl);
    el('text',{x:m.x+8,y:Ht-10},cl).textContent='Close '+pctS(r.a);}
  /* the ruler's travel: from zero to the close, drawn as the move itself */
  /* desktop: the whole case from the film as Fig. A, in the corner the close leaves empty */
  const fa=S.querySelector('.q5-figa');if(fa){if(wide){const x=m.x+16,sz=Math.min(W-x-8,axis.Y-28);fa.style.cssText=`display:block;left:${x}px;top:8px;width:${sz}px`}else fa.style.display='none'}
  const tr=el('line',{class:'q5-trav',x1:z.x,y1:z.y,x2:m.x,y2:m.y,pathLength:1});
}

/* the shelf: every graded round one cell, coloured by the round's winner; round 66 drops into its slot */
function shelf(){
  const sh=S.querySelector('.q5-shelf');const G=ROUNDS.slice().sort((a,b)=>a.n-b.n);
  sh.innerHTML=`<p class="q5-sht">The record · ${G.length} rounds</p><ol class="q5-cells">${G.map(g=>{const w=String(g.win||'').toUpperCase().split(/[^A-Z]+/).filter(x=>MODELS[x]);
    const col=w.length?w.map(x=>x==='GROK'?'#15121a':MODELS[x].c):['transparent'];const lg=CO_LOGOS[g.ticker];
    return `<li class="${+g.n===N?'q5-new':''}${w.length?'':' q5-nw'}" style="--wc:${col[0]};--wc2:${col[1]||col[0]}"><b>${g.n}</b>${lg?`<img src="media/${lg.f}" alt="" loading="lazy">`:''}</li>`}).join('')}</ol>
   <p class="q5-key"><i class="q5-kc"></i> winner's colour <i class="q5-kn"></i> nobody won</p>`;
}

const CAP={
 1:`Before earnings, each AI puts its prediction on Shell on the scale. Locked ${day(r.called)}.`,
 2:`The London close. Shell moves ${pctS(r.a)}.`,
 3:`Right side: pass. Wrong side: fail. ${wins.map(m=>NM[m]).join(' and ')||'Nobody'} is closest, ${calls.filter(c=>wins.includes(c.m)).map(c=>c.off.toFixed(2)+'% off').join(', ')}.`,
 4:`Round ${N} joins the record. Every round stays here.`};
function go(b){b=Math.max(1,Math.min(4,b));S.dataset.b=b;S.querySelector('.q5-fn').textContent=b;S.querySelector('.q5-cap').textContent=CAP[b];
  S.querySelectorAll('.q5-dots i').forEach(i=>i.classList.toggle('on',+i.dataset.i<=b));
  S.querySelector('.q5-nx').textContent=b<4?'Next':'See every round';S.querySelector('.q5-pv').disabled=b<2;}
S.querySelector('.q5-nx').onclick=()=>{const b=+S.dataset.b;if(b<4)go(b+1);else{const t=D.querySelector('.wc-ev,.wc-rec,#record');t&&t.scrollIntoView({behavior:'smooth'})}};
S.querySelector('.q5-pv').onclick=()=>go(+S.dataset.b-1);
window.__q5Go=go;
shelf();go(1);
let lw=0;const ro=new ResizeObserver(()=>{if(stage.clientWidth!==lw){lw=stage.clientWidth;draw()}});ro.observe(stage);
shoot().then(()=>H.classList.add('q5-ready'));
})();
