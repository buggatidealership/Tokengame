(function(){const G=window.__G2;const S=G.secs();
G.opener('models');G.opener('rounds');G.opener('bet');
const nm={models:'Meet the models',rounds:'Every round so far',lucky:'Smart or lucky?',bet:'Bet #1: NVIDIA',back:'The end of the issue'};
const beats=G.beats();
S.forEach((s,i)=>{if(i===S.length-1)return;const nx=S[i+1];const t=document.createElement('div');t.className='gA-turn';t.setAttribute('aria-hidden','true');
 G.seed(31+i*7);let d='M0,7';for(let x=0;x<=400;x+=20)d+=' L'+x+','+(7+(G.rnd()-.5)*2.4).toFixed(1);
 const edge=G.svg(400,14,`<path d="${d} L400,14 L0,14Z" fill="#2a2119" opacity=".0"/><path d="${d}" fill="none" stroke="#1c140c" stroke-width="2.4" vector-effect="non-scaling-stroke"/>`,'gA-edge');
 // the curl: page i's lower-right corner lifted, the next page's paper under it
 const curl=`<svg class="gA-curl" viewBox="0 0 104 112" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="gAb${i}" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#e9dcbc"/><stop offset=".55" stop-color="#fbf3df"/><stop offset=".8" stop-color="#d9c79f"/><stop offset="1" stop-color="#b9a47a"/></linearGradient><linearGradient id="gAs${i}" x1="1" y1="1" x2=".3" y2=".3"><stop offset="0" stop-color="rgba(40,25,10,0)"/><stop offset="1" stop-color="rgba(40,25,10,.45)"/></linearGradient></defs>
 <path d="M104,30 L104,112 L22,112 Z" fill="#fbf6e8"/><path d="M104,30 L104,112 L22,112 Z" fill="url(#gAs${i})" opacity=".55"/>
 <path d="M104,30 C86,52 66,70 22,112 C40,82 46,62 50,40 C68,40 86,38 104,30 Z" fill="url(#gAb${i})" stroke="#2a2119" stroke-width="2.4" stroke-linejoin="round"/>
 <path d="M96,38 C80,56 62,74 34,102" fill="none" stroke="#2a2119" stroke-width=".8" opacity=".55"/>
 <path d="M50,40 C47,60 41,80 22,112" fill="none" stroke="#fff" stroke-width="1.2" opacity=".7"/></svg>`;
 t.innerHTML=`<div class="gA-end"><span class="gA-fol">— <b>${i+1}</b> —</span></div>${edge}${curl}<span class="gA-next">Page ${i+2} · ${nm[nx.id]||''}</span>`;
 s.el.after(t);
 const b=beats.find(x=>x.previousElementSibling===t||x.compareDocumentPosition(nx.el)&4&&s.el.compareDocumentPosition(x)&4);if(b){t.appendChild(b);t.classList.add("gA-hb")}});
})();
