/* R3 · Turn the page: every chapter is a printed page. Read a page to its foot and it stays put while the next page slides up over
   it (position:sticky, scroll only, nothing hijacked), its top edge casting a shadow on the page below and carrying the
   chapter's tab; the narration caption is printed at the head of each new page. Rhythm: one page per chapter, each page ends
   flush with the screen before the next covers it. */
B3T.r3={run({chs,api}){
  const D=document,N=api.NAR();D.documentElement.classList.add('b3-own');
  chs.forEach(c=>{c.s.style.zIndex=10+c.i;
    if(c.i){const tab=D.createElement('span');tab.className='b3-tab';tab.setAttribute('aria-hidden','true');tab.innerHTML=`<b>Ch. ${c.i<=5?c.i:'·'}</b> ${c.k||'The end'}`;c.s.prepend(tab)}
    const n=N[c.i];if(n&&c.i){const cap=D.createElement('p');cap.className='b3-cap b3-hd3'+(c.i===4?' k':'');cap.innerHTML=`<span><b>${n[0]}</b>${n[1]?`<small>${n[1]}</small>`:''}</span>`;c.s.querySelector('.b3-tab').after(cap)}});
  const hh=()=>{const h=D.querySelector('header.top');return D.documentElement.classList.contains('b3-run')&&h?h.offsetHeight:0};
  const fit=()=>{const vh=innerHeight;chs.forEach(c=>{c.s.style.top=Math.min(44,vh-c.s.offsetHeight)+'px'})};
  fit();addEventListener('resize',fit);new ResizeObserver(fit).observe(api.book());
}};
