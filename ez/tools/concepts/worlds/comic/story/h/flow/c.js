(function(){const F=window.__FL;const S=F.secs();const beats=[...document.querySelectorAll('#wc-book > p.wc-beat')];
const CAP={models:'Our four contestants…',rounds:'Round after round…'};
S.forEach(({el,id},i)=>{if(id==='back')return;el.classList.add('flc-p');el.style.zIndex=String(10+i*10);
 const cs=getComputedStyle(el);if(cs.backgroundImage==='none'&&/rgba\(0, 0, 0, 0\)|transparent/.test(cs.backgroundColor))el.classList.add('flc-bg');
 el.style.setProperty('--rt',(i%2?.35:-.3)+'deg');el.style.setProperty('--rt0',(i%2?1.6:-1.5)+'deg');
 if(i>0)el.style.viewTimelineName='--flc'+i;
 const nx=S[i+1];if(nx&&nx.id!=='back'){const d=document.createElement('i');d.className='flc-dim';d.setAttribute('aria-hidden','true');d.style.setProperty('--nt','--flc'+(i+1));el.appendChild(d)}
 // the narrator's caption rides on the incoming page's corner (the live beat captions, plus two for the cuts that had none)
 const prev=el.previousElementSibling;let txt=null;if(prev&&prev.classList.contains('wc-beat')){txt=prev.textContent.trim();prev.style.display='none'}else txt=CAP[id];
 if(txt){const c=document.createElement('span');c.className='flc-cap';c.textContent=txt;c.setAttribute('aria-hidden','true');el.appendChild(c)}});
const st=()=>S.forEach(({el,id})=>{if(id==='back')return;el.style.setProperty('--st',Math.min(0,innerHeight-el.offsetHeight)+'px')});st();addEventListener('resize',st);
new ResizeObserver(()=>requestAnimationFrame(st)).observe(document.getElementById('wc-book'));
if(!F.SDA&&!F.RM){S.forEach(({el},i)=>{const nx=S[i+1];if(!nx)return;const d=el.querySelector(':scope > .flc-dim');if(!d)return;new IntersectionObserver(es=>es.forEach(e=>d.classList.toggle('fl-dk',e.boundingClientRect.top<innerHeight*.5)),{threshold:[0,.25,.5,.75,1]}).observe(nx.el)})}
F.beats();F.ready()})();
