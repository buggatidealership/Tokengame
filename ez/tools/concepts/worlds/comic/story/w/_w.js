/* helper "w" (2026-10-30): shared bits for the Every-round and Tonight takes. Laid over the built X3+; every number from the page's data. */
window.WW=window.WW||(function(){
  const D=document,H=D.documentElement,ORDER=['GPT','KIMI','CLAUDE','GROK'],NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
  const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const col=m=>m==='GROK'?'#15121a':MODELS[m].c;            /* Grok's #111 is recoloured by a dark-theme rule; write it as ink */
  const face=(m,cls,st)=>`<i class="ww-fc ${cls||''}" style="--mc:${col(m)};${st||''}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${MODELS[m].d}"/></svg></i>`;
  const CL=window.CO_LOGOS||{};
  const logo=t=>CL[t]?'media/'+CL[t].f:'';
  const dark=t=>!!(CL[t]||{}).dark;
  const hasFilm=n=>!!((window.FILMS||{})[n]||(window.STILLS||{})[n]);
  const W=r=>r.win?r.win.split(' & '):[];
  const tk=t=>esc(String(t).replace(/\..*$/,''));
  const pct=v=>Math.abs(v).toFixed(2)+'%';
  const rm=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sfx=a=>{const x=Math.abs(a),up=a>0;if(x<1.5)return up?'blip':'tick';if(x<4)return up?'POP!':'THUD!';if(x<8)return up?'ZOOM!':'CRASH!';return up?'KA-POW!':'KA-BOOM!'}; /* the page's own vocabulary (world-comic.js sfx) */
  const calls=r=>(r.calls||[]).filter(c=>c[1]).map(c=>({m:c[0],up:/^UP/i.test(c[1]),mag:String(c[1]).replace(/[^\d.]/g,''),off:+c[2]}));
  const RR={};ROUNDS.forEach(r=>RR[r.n]=r);
  const rOf=a=>RR[+(a.getAttribute('href')||'').replace(/\D/g,'')];
  /* the brand colour, read from the company's own logo file as the R10 tickets do; no colour in it: the sheet's colour, else ink */
  const brand=async t=>{const s=logo(t),lg=CL[t]||{};let m=null;if(s&&window.SA&&SA.pal)m=(await SA.pal(s))||(await SA.pal(s,.15));return m||(lg.c&&lg.c!=='#12131a'?lg.c:null)||'#2b2733'};
  const lumi=h=>{const n=parseInt(h.slice(1),16),L=v=>{v/=255;return v<=.03928?v/12.92:((v+.055)/1.055)**2.4};return .2126*L(n>>16)+.7152*L(n>>8&255)+.0722*L(n&255)};
  const onBrand=h=>1.05/(lumi(h)+.05)<3?'#15121a':'#fff';   /* white on the colour unless it falls under 3:1 (WCAG) */
  /* a logo never above its native pixels at DPR 2 */
  const capImg=img=>{const f=()=>{if(img.naturalWidth){img.style.maxWidth=(img.naturalWidth/2)+'px';img.style.maxHeight=(img.naturalHeight/2)+'px'}};if(img.complete)f();else img.addEventListener('load',f,{once:true})};
  const lgDisc=(t,cls)=>{const s=logo(t);return `<span class="ww-lg ${cls||''}${dark(t)?' ww-lgdk':''}">${s?`<img src="${s}" alt="">`:`<b>${tk(t)}</b>`}</span>`};
  /* tonight: the rounds the page shows under its "at the close" head, plus the rest of that day (it shows six) */
  const tonight=()=>{const sec=D.querySelector('.wc-cliff');if(!sec)return [];const tks=[...sec.querySelectorAll('.wc-tnp header small')].map(x=>x.textContent.trim());
    const P=(window.PENDING||[]).filter(p=>p.calls&&p.calls.length),first=P.find(p=>tks.includes(p.ticker));if(!first)return [];
    const C=window.CAPS||{};return P.filter(p=>p.resolves===first.resolves).sort((a,b)=>((C[b.ticker]||0)-(C[a.ticker]||0))||a.n-b.n)};
  const pcalls=p=>ORDER.map(m=>(p.calls||[]).find(c=>c.m===m)).filter(Boolean).map(c=>({m:c.m,up:c.dir==='UP',mag:String(c.mag),v:+c.v}));
  /* Every round: the board-only demo strip (rounds drawn as if their film had not arrived; Shell before and after) */
  const demo=(draw,cls)=>{const sec=D.querySelector('.wc-season');if(!sec||!new URLSearchParams(location.search).has('demo')&&!window.__wwDemo)return;
    const pick=n=>[...sec.querySelectorAll('.wc-bis .wc-bi')].find(a=>rOf(a)&&rOf(a).n===n);
    const wrap=D.createElement('div');wrap.className='ww-demo';
    wrap.innerHTML=`<p class="ww-demo-cap">Board only, to show the cases: UPS (nobody won) and ServiceNow (the season's biggest move) drawn as if their films were not in yet; Shell before and after its film arrives.</p><div class="wc-bis ww-demo-g" data-all="1"></div>`;
    const g=wrap.querySelector('.ww-demo-g');
    [[51,1,''],[62,1,''],[66,1,'Before its film'],[66,0,'Film arrives']].forEach(([n,force,lab])=>{const a=pick(n);if(!a)return;const c=a.cloneNode(true);c.removeAttribute('href');
      if(lab)c.insertAdjacentHTML('beforeend',`<span class="ww-demo-l">${lab}</span>`);g.appendChild(c);if(force)draw(c,RR[n],true);else c.classList.add('ww-after')});
    sec.querySelector('.wc-more').after(wrap)};
  /* every graded tile without a film gets the take's panel */
  const eachNoFilm=draw=>D.querySelectorAll('.wc-season .wc-bis .wc-bi').forEach(a=>{const r=rOf(a);if(r&&!hasFilm(r.n))draw(a,r,false)});
  const ready=t=>{requestAnimationFrame(()=>requestAnimationFrame(()=>H.classList.add('ww-ready-'+t,'ww-'+t[0])))};
  return {D,H,ORDER,NM,esc,col,face,logo,dark,hasFilm,W,tk,pct,rm,sfx,calls,RR,rOf,brand,onBrand,capImg,lgDisc,tonight,pcalls,demo,eachNoFilm,ready};
})();
/* Tonight: the whole day's card, rebuilt; each card in its company's colour (read from its own logo file), the take draws the body */
WW.tn=async(body,cls)=>{const X=WW,sec=X.D.querySelector('.wc-cliff');if(!sec)return;const T=X.tonight();
  const g=X.D.createElement('div');g.className='ww-tn '+cls;
  const cards=await Promise.all(T.map(async p=>{const bm=await X.brand(p.ticker),bt=X.onBrand(bm),cs=X.pcalls(p),u=cs.filter(c=>c.up).length;
    return `<article class="ww-tk${bt==='#fff'?'':' ww-tklt'}" style="--bm:${bm};--bt:${bt}" aria-label="Round ${p.n}, ${X.esc(p.co)}: ${cs.map(c=>X.NM[c.m]+' '+(c.up?'up ':'down ')+c.mag+'%').join(', ')}">
      <header class="ww-tkh">${X.lgDisc(p.ticker,'ww-tkl')}<b${p.co.length>8?' class="ww-lnm"':''}>${X.esc(p.co)}</b><small>${X.tk(p.ticker)}</small><i class="ww-rn">R${p.n}</i></header>
      <div class="ww-tkb" aria-hidden="true">${body(p,cs,u)}</div></article>`}));
  g.innerHTML=cards.join('');const old=sec.querySelector('.wc-tn');old.style.display='none';old.after(g);
  const gut=sec.querySelector('.wc-gut-s');if(gut)gut.style.display='none';
  const sm=sec.querySelector('.wc-h2 small');if(sm)sm.textContent=`${T.length} rounds. Every call locked before the report. The close decides.`;
  g.querySelectorAll('.ww-lg img').forEach(X.capImg);return g};
/* the film arrives: the take's panel is laid over the film tile and leaves in the take's own way (CSS .ww-arr). On the real page this
   would play once for a visitor whose browser saw that round without a film (localStorage: the rounds that had no film last visit). */
WW.arrive=async(draw,a,r)=>{await draw(a,r,true);const art=a.querySelector('.wc-bi-art'),p=art&&art.querySelector('.ww-p');if(!p)return;art.classList.remove('ww-d');art.style.background='';p.classList.add('ww-arr')};
