/* owner, 2026-10-30: "Every round so far... my favorite remains M3" (it matches the dots across the page). The look picker of
   the every.earningszn.pages.dev preview (story/m/switch.js) fixed to M3: the tiles stamped (s1) and painted (SA.paintG) */
(function(){const H=document.documentElement;let chain=Promise.resolve(),stamped=false;
  const ready=()=>H.classList.contains('x2p-world')&&!H.classList.contains('x2p-cur')&&document.querySelector('.wc-season .wc-bi')&&window.SA&&SA.paintG;
  const paint=()=>chain=chain.then(()=>new Promise(r=>requestAnimationFrame(()=>r()))).then(()=>{if(!stamped){stamped=true;window.__evStamp()}H.classList.add('sa-t-s1','sa-t-s1s');return SA.paintG('m3')}).catch(e=>console.error(e));
  function go(){paint();
    document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('.wc-season .wc-more'))paint()},true);
    const s=document.querySelector('.wc-season');if(s&&window.IntersectionObserver)new IntersectionObserver(es=>{if(es.some(x=>x.isIntersecting))paint()},{rootMargin:'600px 0px'}).observe(s);
    addEventListener('hashchange',()=>setTimeout(paint,400));
    let w=innerWidth;addEventListener('resize',()=>{if(innerWidth!==w){w=innerWidth;clearTimeout(go.t);go.t=setTimeout(()=>{document.querySelectorAll('.wc-season canvas.sa-gc5').forEach(c=>c.remove());paint()},300)}})}
  (function wait(n){if(ready())go();else if(n<600)setTimeout(()=>wait(n+1),100)})(0);})();
