/* L2 · Pick an issue: the title fight printed as three comic book covers on a pile, one per window. Their mastheads peek
   above the front cover; a tap pulls that issue out of the pile and drops it on top (the old front slides back in).
   Each cover's art is the bout: two fighters, the money in each one's speech balloon, the gap in the cover's price box,
   and the cover line underneath. The season issue carries the golden ticket. */
(function(){const S=SI,L=SL,D=document,B=L.base();if(!B)return;const {cv}=B;const A=L.all();
cv.classList.add('sl-cv','sl2-cv');
const mast={close:'sl2-mc',week:'sl2-mw',season:'sl2-ms'};
const fighter=(x,m,v,w,lab,cl)=>`<div class="sl2-f ${cl}" style="--mc:${S.col(m)}">
  <span class="sl2-bal"><b class="${v>=0?'wc-tu':'wc-td'}">${S.$f(v)}</b>${L.wlh(w)}</span>
  ${S.face(m,'wc-f-xl sl2-fc',m===S.rank[0])}${m===S.rank[0]?(x.w.k==='season'?S.gt('sl2-gt'):'<span class="sl-mini sl2-tk" title="Holds the golden ticket">Ticket</span>'):''}
  <span class="sl2-nm">${S.NM[m]}</span><span class="sl2-role">${x.w.k==='season'&&cl==='sl2-a'?'':lab}</span></div>`;
const cover=(x,i)=>`<article class="sl2-iss" data-k="${x.w.k}" aria-label="${x.w.t}">
 <button type="button" class="sl2-mh ${mast[x.w.k]}" aria-pressed="false"><span class="sl2-no"><small>No.</small>${x.n}</span><b>${x.w.t}</b><small class="sl2-wh">${x.w.when}</small></button>
 <div class="sl2-art" style="--ma:${S.col(x.F.a)};--mb:${S.col(x.F.b)}">
  <div class="sl2-ring">${fighter(x,x.F.a,x.va,x.wa,x.F.la,'sl2-a')}<span class="sl2-mid"><span class="sl2-pr"><small>Gap</small>${S.$f(x.gap).replace('+','')}</span><span class="sl2-vs">VS</span></span>${fighter(x,x.F.b,x.vb,x.wb,x.F.lb,'sl2-b')}</div>
  <p class="sl2-line">${x.line}</p></div></article>`;
cv.innerHTML=`<div class="wc-cv-top"><span class="wc-cv-s">The standings<small>${S.N} earnings reports graded</small></span></div>
<h1 class="wc-tab-h">Who's winning?</h1><p class="sl2-hint">Three issues. Tap one off the pile.</p>
<div class="sl2-pile">${A.map(cover).join('')}</div>`;
const pile=cv.querySelector('.sl2-pile'),iss=[...pile.querySelectorAll('.sl2-iss')];
const STEP=()=>innerWidth>=1000?44:34;
let order=[0,1,2];/* back to front */
const lay=()=>{const st=STEP();let h=0;order.forEach((j,slot)=>{const e=iss[j];e.style.top=slot*st+'px';e.style.zIndex=slot+1;e.style.setProperty('--rot',([-1.4,.9,0][slot]*Math.min(1,360/(pile.offsetWidth||360)))+'deg');e.classList.toggle('sl2-front',slot===2);
   e.querySelector('.sl2-mh').setAttribute('aria-pressed',slot===2);e.querySelector('.sl2-art').inert=slot!==2;h=Math.max(h,slot*st+e.offsetHeight)});
  pile.style.height=(2*st+Math.max(...iss.map(e=>e.offsetHeight)))+'px'};
const pick=(j,anim)=>{if(order[2]===j){lay();return}const st=STEP(),t0=new Map(iss.map(e=>[e,parseFloat(e.style.top)||0]));
  order=order.filter(x=>x!==j);order.push(j);lay();
  if(anim&&!S.RM()){iss.forEach(e=>{const d=t0.get(e)-parseFloat(e.style.top);if(e===iss[j])e.animate([{transform:`translateY(${d}px)`},{transform:`translateY(${Math.min(d,0)-st*2.2}px) rotate(-3deg)`,offset:.45},{transform:'translateY(-4px) rotate(.6deg)',offset:.82},{transform:'none'}],{duration:620,easing:'cubic-bezier(.3,.7,.4,1)'});
     else if(d)e.animate([{transform:`translateY(${d}px)`},{transform:'none'}],{duration:420,delay:140,easing:'cubic-bezier(.3,1.2,.5,1)',fill:'backwards'})});
   const f=iss[j];f.querySelectorAll('.sl2-bal').forEach((b,k)=>b.animate([{transform:'scale(.2)',opacity:0},{transform:'scale(1.12)',opacity:1,offset:.7},{transform:'none'}],{duration:360,delay:470+k*110,easing:'ease-out',fill:'backwards'}));
   f.querySelector('.sl2-pr').animate([{transform:'scale(1.7) rotate(-10deg)',opacity:0},{transform:'rotate(3deg)',opacity:1}],{duration:280,delay:700,easing:'cubic-bezier(.3,1.6,.5,1)',fill:'backwards'})}};
iss.forEach((e,j)=>{e.querySelector('.sl2-mh').onclick=()=>pick(j,true)});
addEventListener('resize',()=>lay());D.fonts.ready.then(()=>lay());
order=[0,1,2];lay();
window.__slShow=(k,anim)=>pick(A.findIndex(x=>x.w.k===k),anim);
S.ready('l2')})();
