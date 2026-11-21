const sr=R=>`<table class="m15-sr"><caption>Meet the models: Season 1, ranked by season P&amp;L ($100K on every trade). Season 2: ${S2.map(s=>s[0][0]+s[0].slice(1).toLowerCase()).join(', ')} in inference.</caption><tr><th>No.</th><th>Model</th><th>Lab</th><th>Season P&amp;L</th><th>W-L</th><th>Line</th></tr>${R.map((r,i)=>`<tr><td>${i+1}</td><td>${esc(r.full)}</td><td>${LAB[r.m]}, ${CNAME[r.cc]}</td><td>${$(r.pl)}</td><td>${r.W}-${r.L}</td><td>${esc(r.q)}</td></tr>`).join('')}</table>`;
W.__M15=function(take){const sec=D.querySelector('section.c8');if(!sec)return false;const de=D.documentElement;de.classList.add('m15-on','m15-'+take);
  sec.querySelectorAll('.c8-one').forEach(o=>{const b=o.querySelector('.c8-bal span');if(b)QUOTE[o.dataset.m]=b.textContent.trim()});
  const wide=matchMedia('(min-width:900px)').matches,keepH=(take==='D'||take==='B')&&!wide;[...sec.children].forEach(c=>{if(!c.classList.contains('m15')&&c.tagName!=='svg'&&!(keepH&&c.matches('h2.ch-h')))c.style.display='none'});
  let host=sec.querySelector(':scope>.m15');if(!host){host=D.createElement('div');sec.appendChild(host)}
  const R=rows();host.className='m15 m15-'+take+(wide?' m15-wide':'');
  host.innerHTML=({A:tA,B:tB,C:tC,D:tD,E:tE})[take](R,wide)+sr(R);return true};
})();
