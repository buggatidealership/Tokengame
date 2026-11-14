/* R1 · Page and gutter: the classic printed page. Every chapter is a panel with an inked border on a black gutter (10px, a comic's
   gutter, never more); each chapter opens on a wide splash (its establishing picture); a painted narration caption straddles the
   gutter between two chapters, half on the panel that ends and half on the one that starts, so the voice hands the reader over.
   Rhythm down a phone: splash, tall, splash, tall, splash... the wide pictures are the beats, the content panels the reading. */
B3T.r1={run({chs,api}){
  const D=document,N=api.NAR();D.documentElement.classList.add('b3-own');
  const SPL={1:api.IMG+'sp-models.jpg',5:api.IMG+'sp-tonight.jpg'};
  chs.forEach(c=>{
    c.s.dataset.fo=c.i?`${c.k} · ${api.graded} rounds`:'';
    if(SPL[c.i]){const f=D.createElement('figure');f.className='b3-spl';f.setAttribute('aria-hidden','true');f.innerHTML=`<img src="${SPL[c.i]}" alt="">`;c.s.prepend(f)}
    const n=N[c.i];if(!n||!c.i)return;
    const cap=D.createElement('p');cap.className='b3-cap b3-hand'+(c.i===4?' k':'');cap.innerHTML=`<span><b>${n[0]}</b>${n[1]?`<small>${n[1]}</small>`:''}</span>`;
    c.s.before(cap)});
}};
