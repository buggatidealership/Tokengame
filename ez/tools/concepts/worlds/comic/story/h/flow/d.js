(function(){const F=window.__FL;const S=F.secs();const bk=document.getElementById('wc-book');
const CAP={models:'Our four contestants…',rounds:'Round after round…'};
F.seed(41);const ring=()=>{const P=[];const n=46;for(let k=0;k<=n;k++){const a=k/n*Math.PI*2,r=100+(F.rnd()-.5)*2.4;P.push((100+Math.cos(a)*r).toFixed(1)+','+(100+Math.sin(a)*r).toFixed(1))}return 'M'+P.join('L')};
const R=()=>Math.ceil(Math.hypot(innerWidth,innerHeight)/2)+90;const set=()=>{document.documentElement.style.setProperty('--R',R()+'px');document.documentElement.style.setProperty('--Rs',(R()/100).toFixed(3))};set();addEventListener('resize',set);
let k=0;S.forEach(({el,id})=>{if(!['models','rounds','lucky','bet'].includes(id))return;k++;
 const prev=el.previousElementSibling;let txt=CAP[id];if(prev&&prev.classList.contains('wc-beat')){txt=prev.textContent.trim();prev.style.display='none'}
 // the sentinel sits on the boundary between the two sections
 const s=document.createElement('i');s.className='fld-s';s.setAttribute('aria-hidden','true');s.style.viewTimelineName='--fld'+k;bk.insertBefore(s,el);
 const o=document.createElement('div');o.className='fld-ov';o.setAttribute('aria-hidden','true');o.style.setProperty('--tl','--fld'+k);
 o.innerHTML=`<i class="fld-bk"></i><svg class="fld-ring" viewBox="-6 -6 212 212" aria-hidden="true"><path d="${ring()}"/><path class="l" d="${ring()}" transform="translate(100 100) scale(.955) translate(-100 -100)"/></svg>${txt?`<span class="fld-cap">${txt}</span>`:''}`;
 document.body.appendChild(o);
 if(!F.SDA&&!F.RM)new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){o.classList.remove('fl-x');void o.offsetWidth;o.classList.add('fl-x')}}),{rootMargin:'-48% 0px -48% 0px'}).observe(s)});
F.beats();F.ready()})();
