(function(){const G=window.__G2;const D=G.desk();
['models','rounds','bet'].forEach(id=>G.opener(id,'gC'));
const sp=document.querySelector('.wc-splash');if(sp){const f=document.createElement('figure');f.className='ho-pan gC gC-lk';f.innerHTML='<div class="ho-ink"><div class="ho-img" style="background-image:url('+G.base+'img/web/c-coin-'+(D?'desk':'phone')+'.jpg);background-position:'+(D?'70% 50%':'50% 20%')+'"></div></div>';sp.before(f);sp.classList.add('gC-after')}
// the beat captions ride on the splash they open, stacked above the opener's own caption
G.beats().forEach(b=>{let n=b.nextElementSibling;const f=n&&(n.matches('.ho-pan')?n:n.querySelector('.ho-pan.gC'));if(!f)return;const c=document.createElement('p');c.className='g2-cap';c.textContent=b.textContent.trim();c.style.textTransform='none';f.insertBefore(c,f.querySelector('.ho-cap'))});
})();
