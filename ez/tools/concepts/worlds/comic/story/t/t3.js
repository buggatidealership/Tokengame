/* T3 · The poster and the rack: on desktop, the night's headliner is a tall printed fight poster pinned on the left;
   the rest of the card hangs beside it as a rack of ticket stubs, night after night. As you scroll into another night,
   a new poster is pasted over the old one (the bill changes with the night you are reading). On a phone each night opens
   on its own poster, its stubs below. */
(async function(){const T=TT,S=T.S,esc=T.esc;const root=T.mount('t3');if(!root){T.ready();return}
const {L,days}=T.data();await T.prep(L);const C=T.counts(L);
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const at=(x,cls)=>`class="${cls}${x.locked?' t3-l':' t3-o'}${x.nv?' t3-nv':''}" href="#/round/${x.n}" data-t="${esc(x.ticker)}" data-n="${x.n}" data-m7="${x.m7?1:0}" data-ai="${x.ai?1:0}" style="${T.bv(x.ticker)}"`;
const side=(x,up,cls)=>{const cs=T.side(x,up);return `<span class="t3-k ${up?'t3-bu':'t3-be'} ${cls||''}"><small>${up?'Bulls':'Bears'}<i aria-hidden="true">${up?'▲':'▼'}</i></small><span>${cs.length?cs.map(c=>T.call(c)).join(''):'<em class="t3-no">Nobody</em>'}</span></span>`};
const when=(k,items)=>{const l=S.dayLab(k);return l.a==='Today'?'Tonight':l.a==='Tomorrow'?'Tomorrow':S.wd(k,1)};
function poster(k,items,box){if(k==='wait')return '';const x=items[0],b=T.bell(x),p=S.pd(k);
  return `<a ${at(x,'t3-p')} data-main="1"><span class="t3-pb"><span>★ ${esc(when(k,items))}'s main event ★</span><small>${S.wd(k)} ${MON[p.m-1]} ${p.d}</small></span>
    <span class="t3-ph">${T.lg(x.ticker,box)}<b class="t3-pn">${esc(x.co)}</b><small>R${x.n} · ${esc(S.tk(x.ticker))}${T.tag(x)?' · '+T.tag(x):''}</small></span>
    ${x.locked?`<span class="t3-pc">${side(x,true)}<b class="t3-vs" aria-hidden="true">vs</b>${side(x,false)}</span><span class="t3-pf">${b?esc(b):'Graded at the close'}</span>`
      :`<span class="t3-pq"><small>The calls, due ${T.due(x)}</small>${T.ORDER.map(m=>T.wait(m)).join('')}</span><span class="t3-pf">Graded at the next close</span>`}</a>`}
function stub(x,box){
  return `<a ${at(x,'t3-s')}><span class="t3-ss">${T.lg(x.ticker,box)}<b>R${x.n}</b></span><span class="t3-sb"><span class="t3-sh"><b class="t3-sn">${esc(x.co)}</b><small>${esc(S.tk(x.ticker))}${T.tag(x)?` · <u>${T.tag(x)}</u>`:''}</small></span>
    ${x.locked?`<span class="t3-sc">${side(x,true,'t3-mini')}${side(x,false,'t3-mini')}</span>`:''}</span></a>`}
function head(k,items){const l=S.dayLab(k),lk=items.filter(x=>x.locked).length,n=items.length;
  if(k==='wait')return `<div class="t3-dh" role="heading" aria-level="2"><b>On hold</b><span>${n} round${n>1?'s':''} · dates passed, calls not in yet</span></div>`;
  const p=S.pd(k),u=n-1;
  return `<div class="t3-dh${l.a==='Today'?' t3-now':''}" role="heading" aria-level="2"><b>${esc(l.a==='Today'||l.a==='Tomorrow'?l.a:S.wd(k,1))}</b><span class="t3-dd">${MON[p.m-1]} ${p.d}</span><span class="t3-dn">${u?'Undercard · '+u+' more':'The main event only'}</span><span class="t3-dl">${lk?(T.bell(items[0])||'Graded at the close'):'Calls due '+T.dueS(items[0])}</span></div>`}
let cur=-1;
function draw(){const desk=innerWidth>=1000;
  let rack=`<header class="t3-mast"><div class="t3-ttl" role="heading" aria-level="1">Next on the card</div><p class="t3-sub">Every AI predicts each stock <b>before</b> it reports. The next close grades it.</p>
    <div class="t3-m2"><p class="t3-cnt"><span><b>${C.lk}</b> locked</span><span><b>${C.to}</b> still to call</span></p>${T.flt()}</div></header>`;
  days.forEach(({k,items},di)=>{const rest=k==='wait'?items:items.slice(1),lk=items.some(x=>x.locked);
    rack+=`<section class="t3-day${lk?' t3-dl':' t3-do'}" data-d="${di}">${head(k,items)}<div class="t3-inl">${poster(k,items,desk?150:72)}</div>${rest.length?`<div class="t3-stubs">${rest.map(x=>stub(x,x.locked?(desk?44:38):(desk?36:32))).join('')}</div>`:''}</section>`});
  root.innerHTML=`<div class="t3-wrap"><aside class="t3-aside" aria-label="Main event of the night in view"><div class="t3-frame"></div></aside><div class="t3-rack">${rack}</div></div>`;
  T.wire(root,()=>{fix();cur=-1;onScroll()});fix();cur=-1;onScroll()}
function fix(){root.style.setProperty('--hdr',T.hdr()+'px');root.querySelectorAll('.t3-day').forEach(d=>{const any=[...d.querySelectorAll('.t3-p,.t3-s')].some(e=>getComputedStyle(e).display!=='none');d.classList.toggle('t3-empty',!any)})}
/* the poster follows the night in view: the last night whose head has passed a third of the screen */
function onScroll(){if(innerWidth<1000)return;const ds=[...root.querySelectorAll('.t3-day:not(.t3-empty)')];if(!ds.length)return;
  const line=innerHeight*.38;let k=ds[0];ds.forEach(d=>{if(d.getBoundingClientRect().top<line)k=d});const i=+k.dataset.d;if(i===cur)return;
  const dir=i>cur?1:-1,first=cur<0;cur=i;const fr=root.querySelector('.t3-frame'),src=k.querySelector('.t3-p');if(!fr)return;
  const n=document.createElement('div');n.className='t3-sheet';n.innerHTML=src?src.outerHTML:'';
  const old=fr.querySelector('.t3-sheet:not(.t3-gone)');fr.appendChild(n);
  if(first||T.rm()){if(old)old.remove();return}
  n.animate([{transform:`translateY(${dir*-26}px) rotate(${dir*-1.4}deg)`,opacity:0},{transform:'translateY(2px) rotate(.3deg)',opacity:1,offset:.7},{transform:'none',opacity:1}],{duration:340,easing:'cubic-bezier(.2,.8,.3,1)'});
  if(old){old.classList.add('t3-gone');old.animate([{opacity:1},{opacity:0,transform:`translateY(${dir*14}px)`}],{duration:220,easing:'ease-in',fill:'forwards'}).onfinish=()=>old.remove()}}
draw();addEventListener('scroll',()=>{if(onScroll.q)return;onScroll.q=requestAnimationFrame(()=>{onScroll.q=0;onScroll()})},{passive:true});
let W0=innerWidth;addEventListener('resize',()=>{if(innerWidth===W0)return;W0=innerWidth;clearTimeout(draw.t);draw.t=setTimeout(draw,200)});
T.ready()})();
