/* helper m: the look switcher for the "Every round so far" preview. Bottom-left: Today, G2, G5, M1, M3. ?look=<id> picks one on load and is
   kept in the address (query string; the page's router reads only the hash). Tiles repaint on a switch and when "Show all" opens more. */
(function(){
  const LOOKS=[['now','Today'],['g2','G2'],['g5','G5'],['m1','M1'],['m3','M3']],H=document.documentElement;
  const q=(new URLSearchParams(location.search).get('look')||'now').toLowerCase();let cur=LOOKS.some(l=>l[0]===q)?q:'now',chain=Promise.resolve(),stamped=false;
  const ready=()=>H.classList.contains('x2p-world')&&!H.classList.contains('x2p-cur')&&document.querySelector('.wc-season .wc-bi')&&window.SA&&SA.paintG;
  function clear(){document.querySelectorAll('.wc-season canvas.sa-gc5').forEach(c=>c.remove());document.querySelectorAll('.wc-season .wc-bi-art.sa-gen').forEach(a=>a.classList.remove('sa-gen'))}
  async function apply(l){clear();if(l==='now'){H.classList.remove('sa-t-s1','sa-t-s1s');return}
    if(!stamped){stamped=true;window.__evStamp()}H.classList.add('sa-t-s1','sa-t-s1s');await SA.paintG(l)}
  const run=(l)=>chain=chain.then(()=>apply(l)).catch(e=>console.error(e));
  const more=()=>chain=chain.then(()=>new Promise(r=>requestAnimationFrame(()=>r()))).then(()=>cur==='now'?0:SA.paintG(cur)).catch(e=>console.error(e));
  function ui(){const b=document.createElement('div');b.className='ev-sw';b.setAttribute('role','group');b.setAttribute('aria-label','Tile look');
    b.innerHTML='<span>Every round so far</span>'+LOOKS.map(([k,t])=>`<button type="button" data-k="${k}" aria-pressed="${k===cur}">${t}</button>`).join('');
    b.addEventListener('click',e=>{const k=e.target.closest('button')?.dataset.k;if(!k||k===cur)return;cur=k;
      b.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.k===cur));
      const u=new URL(location.href);if(cur==='now')u.searchParams.delete('look');else u.searchParams.set('look',cur);history.replaceState(history.state,'',u);run(cur)});
    document.body.appendChild(b)}
  function go(){ui();run(cur);
    document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('.wc-season .wc-more'))more()},true);
    /* tiles laid out late (off screen, a tab switch, a width change) get painted when they show */
    const s=document.querySelector('.wc-season');if(s&&window.IntersectionObserver)new IntersectionObserver(es=>{if(es.some(x=>x.isIntersecting))more()},{rootMargin:'600px 0px'}).observe(s);
    addEventListener('hashchange',()=>setTimeout(more,400));
    let w=innerWidth;addEventListener('resize',()=>{if(innerWidth!==w){w=innerWidth;clearTimeout(go.t);go.t=setTimeout(()=>{if(cur!=='now')run(cur)},300)}})}
  (function wait(n){if(ready())go();else if(n<600)setTimeout(()=>wait(n+1),100)})(0);
})();
