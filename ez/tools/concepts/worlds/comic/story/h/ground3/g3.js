// ground3 shared: put a painted backdrop under each section; window.__G3BG={models:'ring',rounds:'street',lucky:'coin'}
(function(){const G=window.__G2,B=G.base+'img/web/';const M=window.__G3BG||{};
G.secs().forEach(s=>{const k=M[s.id];if(!k)return;const g=document.createElement('i');g.className='g3-gr';g.setAttribute('aria-hidden','true');
 g.style.setProperty('--g3img',`url(${B}g-${k}-phone.jpg)`);if(k!=='street')g.style.setProperty('--g3desk',`url(${B}g-${k}-desk.jpg)`);s.el.prepend(g)});
G.g3gr=true})();
