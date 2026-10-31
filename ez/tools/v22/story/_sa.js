/* story mockups, helper "a" (2026-10-30): shared bits for the takes. Laid over the built X3+ page; every number from the page's data. */
window.SA=window.SA||(function(){
  const D=document,H=D.documentElement,ORDER=['GPT','KIMI','CLAUDE','GROK'],NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
  const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const col=m=>m==='GROK'?'#15121a':MODELS[m].c;          /* Grok's #111 is recoloured by a dark-theme rule; write it as ink */
  const face=(m,cls)=>`<i class="wc-face ${cls||''}" style="--mc:${col(m)}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${MODELS[m].d}"/></svg></i>`;
  const logo=(m,cls)=>`<svg class="${cls||''}" viewBox="0 0 24 24" aria-hidden="true"><path d="${MODELS[m].d}"/></svg>`;
  const W=r=>r.win?r.win.split(' & '):[];
  const pct=v=>Math.abs(v).toFixed(2)+'%';
  const rm=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
  const RS=()=>ROUNDS.slice().sort((a,b)=>a.n-b.n);
  const byN=n=>ROUNDS.find(r=>r.n===+n);
  const lrN=()=>+(D.querySelector('.wc-lr-pg')||{dataset:{}}).dataset.n;
  const tk=r=>esc(String(r.ticker).replace(/\..*$/,''));
  /* the same torn stub the round tiles carry (#n, ticker, the move in green or red) */
  const stub=(r,cls)=>{const up=r.a>0;return `<span class="sa-stub ${cls||''}"><b>#${r.n}</b><small>${tk(r)}</small><em class="${up?'sa-u':'sa-d'}">${up?'+':'−'}${pct(r.a)}</em><i class="sa-nl"></i><i class="sa-nr"></i></span>`};
  /* play once when it comes into view; reduced motion: the end state at once */
  const once=(el,th)=>{if(rm()){el.classList.add('sa-go','sa-done');return}
    const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){io.disconnect();el.classList.add('sa-go')}},{threshold:th||.6});io.observe(el)};
  const replay=el=>{el.classList.remove('sa-go');void el.offsetWidth;el.classList.add('sa-go')};
  /* panel 5: keep the number and caption, swap the words for a picture; the page's own "Meet the models" button moves in */
  const p5=(html,lbl)=>{const p=D.querySelector('.wc-lr-5');if(!p||p.querySelector('.sa-p5'))return null;
    const log=p.querySelector('.wc-lr-log'),btn=p.querySelector('.wc-lr-meet');
    const w=D.createElement('div');w.className='sa-p5';w.innerHTML=html+`<p class="wc-sr">${lbl}</p>`;p.appendChild(w);
    if(log)log.classList.add('sa-off');const slot=w.querySelector('.sa-btn');if(slot&&btn)slot.appendChild(btn);p.classList.add('sa-p5on');return w};
  return {D,H,ORDER,NM,esc,col,face,logo,W,pct,rm,RS,byN,lrN,tk,stub,once,replay,p5,ready:()=>H.classList.add('sa-ready')};
})();
/* the brand colour, read from the logo file as the R10 tickets do (world-comic.js r10 pal()): the most common saturated colour
   (a second pass takes paler colours, e.g. ServiceNow's sage);
   no colour in the file (Apple, Samsung's white mark...): the sheet's CO_LOGOS colour, else ink */
SA.pal=(src,sat)=>new Promise(res=>{const im=new Image();im.onload=()=>{try{const w=64,h=Math.max(8,Math.round(64*im.height/im.width)),c=document.createElement('canvas');c.width=w;c.height=h;
  const x=c.getContext('2d');x.drawImage(im,0,0,w,h);const d=x.getImageData(0,0,w,h).data,bins={};
  for(let i=0;i<d.length;i+=4){if(d[i+3]<160)continue;const r=d[i],g=d[i+1],b=d[i+2],mx=Math.max(r,g,b),mn=Math.min(r,g,b);if(mx<60||(mx-mn)/mx<(sat||.35))continue;
    const k=(r>>5)+','+(g>>5)+','+(b>>5),o=bins[k]||(bins[k]={n:0,r:0,g:0,b:0});o.n++;o.r+=r;o.g+=g;o.b+=b}
  const t=Object.values(bins).sort((a,b)=>b.n-a.n)[0];res(t?'#'+[t.r,t.g,t.b].map(v=>Math.round(v/t.n).toString(16).padStart(2,'0')).join(''):null)}catch(e){res(null)}};im.onerror=()=>res(null);im.src=src});
/* every logo tile (films keep their film): the brand colour on the art, the logo lifted onto a disc (an ink disc for a light logo made for dark grounds) */
SA.brand=async cls=>{const RR={};ROUNDS.forEach(r=>RR[r.n]=r);const L=window.CO_LOGOS||{};
  await Promise.all([...document.querySelectorAll('.wc-season .wc-bi')].map(async a=>{const art=a.querySelector('.wc-bi-art'),img=art&&art.querySelector('img.wc-lgimg');
    const r=RR[+(a.getAttribute('href')||'').replace(/\D/g,'')];if(!r||art.classList.contains('sa-cb'))return;
    if(!img){if(!art.querySelector('img')){art.classList.add('sa-cb','sa-nolg');art.style.setProperty('--bm','#2b2733')}return}
    const lg=L[r.ticker]||{},m=(await SA.pal(img.src))||(await SA.pal(img.src,.15))||(lg.c&&lg.c!=='#12131a'?lg.c:null)||'#1c1a22';
    art.style.setProperty('--bm',m);art.classList.add('sa-cb');if(lg.dark)art.classList.add('sa-dk');
    const w=document.createElement('span');w.className='sa-lw';img.replaceWith(w);w.appendChild(img)}));
  document.documentElement.classList.add(cls)};
