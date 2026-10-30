/* L1 · The fight bill: I4's title fight kept as it is, printed as a fight bill on the comic's cream card. Each fighter's
   corner is screened in its own colour (Ben-Day dots). The window is picked from three Season 1 ticket stubs pinned to
   the bill; picking one posts a new bill for that window's bout (the old one is torn off, the new one slapped on), the
   money counts to the new figure, and the scoreboard below re-orders to the window. */
(function(){const S=SI,L=SL,D=document,B=L.base();if(!B)return;const {lb,cv}=B;const A=L.all();
cv.classList.add('sl-cv','sl1-cv');
cv.innerHTML=`<div class="sl1-bill">
 <div class="sl1-hd"><div class="wc-cv-top"><span class="wc-cv-s">The standings<small>${S.N} earnings reports graded</small></span></div>
 <h1 class="wc-tab-h">Who's winning?</h1>
 <div class="sl1-stubs" role="tablist" aria-label="Window">${A.map((x,i)=>`<button type="button" role="tab" class="sl1-stub" data-k="${x.w.k}" aria-selected="${x.w.k==='season'}"><b>${x.w.t}</b><small>${x.w.when}</small></button>`).join('')}</div></div>
 <div class="sl1-bout" aria-live="polite"></div></div>`;
const bout=cv.querySelector('.sl1-bout'),btns=[...cv.querySelectorAll('.sl1-stub')];
const side=(m,lab,v,w,cl,x)=>`<div class="sl1-c ${cl}" style="--mc:${S.col(m)}"><span class="sl1-role">${x.w.k==='season'&&cl==='sl1-a'?S.gt('sl1-gt'):lab}</span>
  ${S.face(m,'wc-f-xl sl1-f',m===S.rank[0])}${m===S.rank[0]&&x.w.k!=='season'?'<span class="sl-mini sl1-tk" title="Holds the golden ticket">Ticket</span>':''}
  <span class="sl1-nm">${S.NM[m]}</span><em class="sl1-v" data-v="0"></em>${L.wlh(w)}</div>`;
let cur=null;
const show=(i,anim)=>{const x=A[i];btns.forEach(b=>b.setAttribute('aria-selected',b.dataset.k===x.w.k));
  const prev=cur&&A[cur.i];const go=()=>{bout.style.setProperty('--ma',S.col(x.F.a));bout.style.setProperty('--mb',S.col(x.F.b));
   bout.innerHTML=`<div class="sl1-ring">${side(x.F.a,x.F.la,x.va,x.wa,'sl1-a',x)}<div class="sl1-mid"><span class="sl1-vs">VS</span><span class="sl1-gap"><small>Gap</small>${S.$f(x.gap).replace('+','')}</span></div>${side(x.F.b,x.F.lb,x.vb,x.wb,'sl1-b',x)}</div>
   <p class="sl1-line">${x.line}</p>`;
   const ev=bout.querySelectorAll('.sl1-v');
   /* the money counts from where that fighter stood in the last window (from $0 the first time) */
   const pv=m=>prev?prev.amts[m]:0;ev[0].dataset.v=pv(x.F.a);ev[1].dataset.v=pv(x.F.b);
   L.count(ev[0],x.va,anim?700:0);L.count(ev[1],x.vb,anim?700:0);
   if(anim&&!S.RM()){bout.animate([{opacity:0,transform:'scale(1.1) rotate(2.5deg)'},{opacity:1,transform:'scale(.98) rotate(-.4deg)',offset:.7},{opacity:1,transform:'none'}],{duration:380,easing:'cubic-bezier(.2,.9,.3,1)'});
    bout.querySelectorAll('.sl1-f').forEach((f,j)=>f.animate([{transform:`translateX(${j?40:-40}px) scale(.7)`,opacity:0},{transform:'none',opacity:1}],{duration:420,delay:120,easing:'cubic-bezier(.3,1.5,.5,1)',fill:'backwards'}));
    bout.querySelector('.sl1-gap').animate([{transform:'scale(1.8) rotate(-8deg)',opacity:0},{transform:'rotate(2deg)',opacity:1}],{duration:300,delay:420,easing:'cubic-bezier(.3,1.6,.5,1)',fill:'backwards'})}};
  if(anim&&!S.RM()&&cur){const a=bout.animate([{transform:'none',opacity:1},{transform:'translate(-26px,30px) rotate(-7deg)',opacity:0}],{duration:200,easing:'cubic-bezier(.5,0,.8,.4)'});a.onfinish=go}else go();
  cur={i};L.board(x.w,anim)};
btns.forEach((b,i)=>b.onclick=()=>{if(!cur||cur.i!==i)show(i,true)});
btns.forEach((b,i)=>b.onkeydown=e=>{const k={ArrowRight:1,ArrowLeft:-1}[e.key];if(k){const j=(i+k+3)%3;btns[j].focus();show(j,true)}});
show(2,false);
window.__slShow=(k,anim)=>show(L.W.findIndex(w=>w.k===k),anim);
S.ready('l1')})();
