/* q6 · Mike Mignola: the round in silence. Black does the work; the round's own film is cut into a few hard shapes
   (shadows crushed to black, the light kept in three steps), each beat lights one thing, and the only colours that speak
   are gold for the winner and red for the fails. Laid over the built X3+ page; reads ROUNDS, MODELS, CO_LOGOS, __x2pPnl() only.
   window.__q6Go(b) sets the beat (1 to 4). */
(function(){
const D=document,H=D.documentElement,N=66;
const r=ROUNDS.find(x=>+x.n===N),A=window.__x2pPnl().A;
const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
const calls=r.calls.map(c=>{const m=String(c[1]).match(/(UP|DOWN)\s*([\d.]+)/i);const up=/UP/i.test(m[1]);return {m:c[0],up,mag:+m[2],off:+c[2]}});
const pass=c=>c.up===(r.a>0);
const wins=String(r.win||'').toUpperCase().split(/[^A-Z]+/).filter(x=>MODELS[x]);
const per=m=>A[m]&&A[m].per&&A[m].per[N]?A[m].per[N].v:0;
const money=v=>(v<0?'−':'+')+'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
const pctS=v=>(v>0?'up ':v<0?'down ':'')+Math.abs(v).toFixed(2)+'%';
const film=__qfFilm(N);
/* in the film's 1080 frame: the four plates (square, the crown slot above for the winner), the market window, the brass plaque, the scene */
const SQ={GPT:[86,349,132,104],KIMI:[86,505,132,104],CLAUDE:[862,349,132,104],GROK:[862,505,132,104]};
const CR={GPT:[45,285,212,167],KIMI:[45,440,212,167],CLAUDE:[822,285,212,167],GROK:[822,440,212,167]};
const MKT=[372,688,336,136],PLQ=[348,996,384,58],SCN=[190,140,700,358];
/* Mignola cut: shadows to black, the light in three flat steps, colour kept but quieted */
const cut=(lo,keep)=>d=>{const p=d.data;for(let i=0;i<p.length;i+=4){const R=p[i],G=p[i+1],B=p[i+2],l=(.299*R+.587*G+.114*B)/255;
  if(l<lo){p[i]=10;p[i+1]=9;p[i+2]=11;continue}
  const t=(l-lo)/(1-lo),q=t<.34?.42:t<.7?.72:1,s=q*255/Math.max(1,l*255),g=(R+G+B)/3;
  const k=keep;p[i]=Math.min(255,(g+(R-g)*k)*s);p[i+1]=Math.min(255,(g+(G-g)*k)*s);p[i+2]=Math.min(255,(g+(B-g)*k)*s*.92)}};

D.querySelectorAll('main > *').forEach(e=>e.style.display='none');
const S=D.createElement('div');S.id='q6';S.dataset.b='1';S.setAttribute('role','region');S.setAttribute('aria-label',`Round ${N}, ${r.co} (${r.ticker}), start to finish`);
const bell=`<svg class="q6-bell" viewBox="0 0 100 100" aria-hidden="true"><path class="q6-bb" d="M50 6c4 0 6 3 6 6v4c14 4 22 16 22 32v18c0 6 4 9 10 12v6H12v-6c6-3 10-6 10-12V48c0-16 8-28 22-32v-4c0-3 2-6 6-6z"/><path class="q6-br" d="M62 22c8 5 12 14 12 26v18c0 6 3 10 8 13"/><circle class="q6-bc" cx="50" cy="90" r="7"/><path class="q6-bm" d="M4 40l-4-3M2 54H-4M96 40l4-3M98 54h6"/></svg>`;
S.innerHTML=`
 <p class="q6-cap" aria-live="polite"></p>
 <div class="q6-top" data-panel="top">
   <figure class="q6-est q6-pan" data-panel="scene"><div class="q6-art" data-k="scn"></div></figure>
   <figure class="q6-mk q6-pan" data-panel="market">${bell}<b class="q6-sfx q6-bong" aria-hidden="true">Bonng</b><div class="q6-art" data-k="mkt0"></div><div class="q6-art q6-lit" data-k="mkt1"></div></figure>
 </div>
 <ol class="q6-grid">${calls.map((c,i)=>`<li class="q6-pl q6-pan ${pass(c)?'q6-ok':'q6-no'}${wins.includes(c.m)?' q6-w':''}" data-m="${c.m}" data-panel="${c.m}" style="--i:${i}">
   <div class="q6-fr"><div class="q6-art" data-k="p${c.m}"></div>${wins.includes(c.m)?`<div class="q6-art q6-crown" data-k="c${c.m}"></div>`:''}</div>
   <b class="q6-sfx q6-fail" aria-hidden="true">${pass(c)?'':'Fail'}</b>
   <p class="q6-say"><b>${NM[c.m]}.</b> ${c.up?'Up':'Down'} ${c.mag}%.<span class="q6-pnl">${pass(c)?'Pass':'Fail'}. ${money(per(c.m))}.</span></p></li>`).join('')}</ol>
 <div class="q6-end" data-panel="record"><div class="q6-plq q6-new"><div class="q6-art" data-k="plq"></div></div>
   <ol class="q6-stack">${ROUNDS.filter(g=>+g.n<N).sort((a,b)=>b.n-a.n).slice(0,13).map((g,i)=>`<li style="--d:${i}"><span>Round ${g.n}</span><span>${g.co} (${g.ticker})</span></li>`).join('')}</ol></div>
 <nav class="q6-nav"><button type="button" class="q6-pv">Back</button><span class="q6-n"><b>1</b> / 4</span><button type="button" class="q6-nx">Next</button></nav>`;
D.querySelector('main').prepend(S);

const art=(k,cv)=>S.querySelectorAll(`[data-k="${k}"]`).forEach(e=>{e.innerHTML='';e.appendChild(cv.cloneNode?(()=>{const c=document.createElement('canvas');c.width=cv.width;c.height=cv.height;c.getContext('2d').drawImage(cv,0,0);return c})():cv)});
(async()=>{
  art('scn',await film.grab(17,SCN,700,358,cut(.3,.6)));
  art('mkt0',await film.grab(2,MKT,672,272,cut(.3,.5)));
  art('mkt1',await film.grab(17,MKT,672,272,cut(.3,.9)));
  for(const c of calls)art('p'+c.m,await film.grab(9.5,SQ[c.m],264,208,cut(.34,.5)));
  for(const m of wins)if(CR[m])art('c'+m,await film.grab(17,CR[m],424,334,cut(.3,1)));
  art('plq',await film.grab(17,PLQ,768,116,cut(.25,.9)));
  H.classList.add('q6-ready');
})();

const CAP={
 1:`Before earnings. Four predictions on ${r.co} (${r.ticker}). Locked.`,
 2:`The London close. ${r.co}, ${pctS(r.a)}.`,
 3:`${calls.filter(c=>c.up).length} said up. ${calls.filter(c=>!c.up).length} said down. ${wins.map(m=>NM[m]).join(' and ')||'Nobody'} came closest: ${calls.filter(c=>wins.includes(c.m)).map(c=>c.off.toFixed(2)+'% off').join(', ')}.`,
 4:`Round ${N} joins the record. Every round stays here.`};
function go(b){b=Math.max(1,Math.min(4,b));S.dataset.b=b;S.querySelector('.q6-cap').textContent=CAP[b];S.querySelector('.q6-n b').textContent=b;
  S.querySelector('.q6-nx').textContent=b<4?'Next':'See every round';S.querySelector('.q6-pv').disabled=b<2}
S.querySelector('.q6-nx').onclick=()=>{const b=+S.dataset.b;if(b<4)go(b+1);else{const t=D.querySelector('.wc-ev,#record');t&&t.scrollIntoView({behavior:'smooth'})}};
S.querySelector('.q6-pv').onclick=()=>go(+S.dataset.b-1);
window.__q6Go=go;go(1);
})();
