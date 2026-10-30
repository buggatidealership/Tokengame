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
