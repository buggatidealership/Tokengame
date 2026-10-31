/* replaces the splash's content with a take; window.__slTake(id, html) */
window.__slTake=function(id,html){const s=document.querySelector('.wc-splash');s.className='wc-splash sl sl-'+id;s.innerHTML=html;
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){s.classList.add('sl-in');io.disconnect()}}),{threshold:.15});io.observe(s);
  if(window.__slShot)s.classList.add('sl-in');return s};
