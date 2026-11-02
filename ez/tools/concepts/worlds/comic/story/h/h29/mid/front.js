/* H29 · the middle · Every round so far, take L: "the latest issue as a living front page" (the lead's direction; Harry Potter's moving newspaper photo).
   One front page on black newsprint stock: the masthead (the EZ. logo, Season 1 · No. <round>, the dateline), the photo = the latest graded round's film,
   playing muted only while it is the picture nearest the screen's centre (live.js; its poster otherwise and with reduced motion), the headline = company + move,
   "Closest: <AI>". Then the back issues: the same front page, small, racked in rows of three (desktop: beside the front page, three by three), then Show more.
   One narrator line in the yellow caption box. Nothing typed: ROUNDS (graded), FILMS, MODELS, X2P_LOGO. A tap opens the round's graded card (#/round/n).
   Mounts over the built v46: today's .r6 stays in the DOM, hidden. window.__h29L = {render}. */
(function(){const W=window,D=document,IMG=W.__H29IMG||'tools/concepts/worlds/comic/story/h/h29/mid/img/';
const sec=D.getElementById('record');if(!sec)return;sec.querySelector('.h29m-L')?.remove();sec.classList.add('h29mL');
const G=(W.ROUNDS||[]).filter(r=>r.a!=null&&r.out),NEW=G.slice().reverse(),HERO=NEW[0],REST=NEW.slice(1),MD=W.MODELS||{};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const NM=m=>m==='GPT'?'GPT':m[0]+m.slice(1).toLowerCase();
const wins=r=>String(r.win||'').toUpperCase().split(/\s*&\s*|\s*,\s*/).filter(m=>MD[m]);
const F=n=>(W.FILMS||{})[n];
const tile=n=>`media/tile-r${n}-${F(n)?'f1':'t2'}.jpg`;
const mv=r=>{const s=String(r.out).replace(/^-/,'−');return /^[+−]/.test(s)?s:'+'+s};
const DAY=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const dl=s=>{const[m,d,y]=String(s||'').split('/').map(Number);if(!m)return '';const t=new Date(2000+(y%100),m-1,d);return `${DAY[t.getDay()]} ${MON[m-1]} ${d}`};
const mark=m=>{const M=MD[m]||{};return `<i class="h29m-mk" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${M.d||''}"${M.fr?` fill-rule="${M.fr}"`:''}/>${M.dot?`<path d="${M.dot}"/>`:''}</svg></i>`};
const closest=(r,small)=>{const w=wins(r);return `<span class="h29m-cl${w.length?'':' h29m-cl0'}"><em>Closest${small?'':':'}</em>${w.length?w.map(m=>`<b>${mark(m)}<span>${NM(m)}</span></b>`).join('<i class="h29m-amp">&amp;</i>'):'<b><span>Nobody</span></b>'}</span>`};
const aria=r=>{const w=wins(r);return `Round ${r.n}, ${r.co}, moved ${mv(r)}. Closest: ${w.length?w.map(NM).join(' and '):'nobody'}. Open the graded card.`};
const ud=r=>r.a>0?"h29m-u":"h29m-d";
function front(r){const f=F(r.n);return `<a class="h29m-fp" href="#/round/${r.n}" aria-label="${esc(aria(r))}">
  <span class="h29m-mast"><span class="h29m-lg">${W.X2P_LOGO||''}</span><span class="h29m-no">Season 1 · No. ${r.n}</span><span class="h29m-dt">${esc(dl(r.resolves))}</span></span>
  <span class="h29m-ph">${f?`<video muted loop playsinline preload="metadata" poster="media/${f.p}.jpg" aria-hidden="true" tabindex="-1"><source src="media/${f.f}.mp4" type="video/mp4"><source src="media/${f.f}.webm" type="video/webm"></video>`:`<img src="${tile(r.n)}" alt="">`}</span>
  <span class="h29m-hl"><b class="h29m-co">${esc(r.co)}</b><b class="h29m-mv ${ud(r)}">${esc(mv(r))}</b></span>
  ${closest(r)}</a>`}
function back(r){return `<a class="h29m-bi" href="#/round/${r.n}" aria-label="${esc(aria(r))}"><span class="h29m-bph"><img src="${tile(r.n)}" alt="" loading="lazy" decoding="async"></span>
  <span class="h29m-bt"><b class="h29m-bco">${esc(r.co)}</b><span class="h29m-br"><b class="h29m-bmv ${ud(r)}">${esc(mv(r))}</b>${closest(r,true)}</span></span></a>`}
let shown=0;
const desk=()=>innerWidth>=1000,first=()=>desk()?9:6,step=()=>desk()?12:6;
function render(){const root=sec.querySelector('.h29m-L')||D.createElement('div');root.className='h29m-L';
 root.innerHTML=`<h2 class="h29m-h"><span>Every round</span> <span>so far</span></h2>
  <p class="h29m-cap"><span class="h29m-tab" aria-hidden="true">3</span>Every close prints a front page. The newest is on top.</p>
  <div class="h29m-top">${front(HERO)}<div class="h29m-rack h29m-rack1">${REST.slice(0,first()).map(back).join('')}</div></div>
  <div class="h29m-rack h29m-more"></div>
  <button class="h29m-sm" type="button"></button>`;
 if(!root.parentNode)sec.append(root);shown=first();more(0)}
function more(k){const root=sec.querySelector('.h29m-L'),rk=root.querySelector('.h29m-more');if(k){rk.insertAdjacentHTML('beforeend',REST.slice(shown,shown+k).map(back).join(''));shown+=k}
 const left=REST.length-shown,b=root.querySelector('.h29m-sm');b.hidden=left<=0;b.innerHTML=`Show ${Math.min(step(),left)} more<small>${left} back issues</small>`}
sec.addEventListener('click',e=>{if(e.target.closest('.h29m-sm')){more(step())}});
let lw=innerWidth;addEventListener('resize',()=>{if((innerWidth>=1000)!==(lw>=1000)){lw=innerWidth;render()}});
render();W.__h29L={render,more};D.documentElement.classList.add('h29mL-ready');})();
