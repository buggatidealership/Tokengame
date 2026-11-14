/* L3 · Tale of the tape: the window is picked on the season's own calendar (one printed cell per day, an ink tick for
   every round graded that day); a gold marker sweeps over the days the window covers. The fight is a boxing broadcast's
   tale of the tape: the two fighters face each other, and each row (P&L, W-L, best call, worst call) prints a bar for
   each side growing out from the middle, so you see who leads where, and where the leader is weak. */
(function(){const S=SI,L=SL,D=document,B=L.base();if(!B)return;const {cv}=B;const A=L.all();
const ut=s=>{const [m,d,y]=s.split('/').map(Number);return Date.UTC(2000+(y%100),m-1,d)},MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const d0=ut(S.R[0].called||S.R[0].resolves),d1=ut(S.nyT),nd=Math.round((d1-d0)/864e5)+1;
const per={};S.R.forEach(r=>{const k=Math.round((ut(r.resolves)-d0)/864e5);per[k]=(per[k]||0)+1});const mx=Math.max(...Object.values(per));
const span=w=>w.k==='season'?[0,nd-1]:w.k==='week'?[nd-7,nd-1]:(k=>[k,k])(Math.round((ut(S.lastD)-d0)/864e5));
const cells=Array.from({length:nd},(_,i)=>{const t=new Date(d0+i*864e5),c=per[i]||0,first=t.getUTCDate()===1||i===0;
  return `<i class="sl3-d${i===nd-1?' sl3-today':''}${t.getUTCDay()%6===0?' sl3-we':''}"${first?` data-m="${MON[t.getUTCMonth()]}"`:''}><b style="height:${c?Math.max(14,c/mx*100):0}%"></b></i>`}).join('');
cv.classList.add('sl-cv','sl3-cv');
cv.innerHTML=`<div class="wc-cv-top"><span class="wc-cv-s">The standings<small>${S.N} earnings reports graded</small></span></div>
<h1 class="wc-tab-h">Who's winning?</h1>
<div class="sl3-cal"><div class="sl3-strip" aria-hidden="true">${cells}<span class="sl3-mk"></span></div>
 <div class="sl3-ax" aria-hidden="true"><span>${MON[new Date(d0).getUTCMonth()]} ${new Date(d0).getUTCDate()}</span><span>Rounds graded each day</span><span class="sl3-tdy">Today</span></div>
 <div class="sl3-tg" role="tablist" aria-label="Window">${A.map(x=>`<button type="button" role="tab" data-k="${x.w.k}" aria-selected="${x.w.k==='season'}"><b>${x.w.t}</b><small>${x.w.when}</small></button>`).join('')}</div></div>
<div class="sl3-tape" aria-live="polite"></div>`;
const tape=cv.querySelector('.sl3-tape'),mk=cv.querySelector('.sl3-mk'),btns=[...cv.querySelectorAll('.sl3-tg button')];
const bar=(v,M,side)=>`<span class="sl3-br sl3-${side} ${v>=0?'sl3-pos':'sl3-neg'}" style="--w:${M?Math.abs(v)/M*100:0}%"></span>`;
const call=(b,m)=>b?`${L.logo(b.r)}<b class="${b.v>=0?'wc-tu':'wc-td'}">${S.k$(b.v)}</b>`:'<b>none</b>';
const worst=(m,w)=>{let x=null;L.rs(w).forEach(r=>{const v=(S.P[m].per[r.n]||{}).v;if(v!=null&&(!x||v<x.v))x={r,v}});return x};
const draw=(x,anim)=>{const a=x.F.a,b=x.F.b,w=x.w,ba=L.best(a,w),bb=L.best(b,w),wa=worst(a,w),wb=worst(b,w);
  const hr=v=>v.W+v.L?v.W/(v.W+v.L):0,M1=Math.max(Math.abs(x.va),Math.abs(x.vb)),M3=Math.max(Math.abs(ba?ba.v:0),Math.abs(bb?bb.v:0)),M4=Math.max(Math.abs(wa?wa.v:0),Math.abs(wb?wb.v:0));
  const row=(lab,va,vb,ha,hb,M,cls)=>`<div class="sl3-r ${cls||''}"><span class="sl3-va">${va}</span><span class="sl3-lab">${lab}</span><span class="sl3-vb">${vb}</span>
    <span class="sl3-bars">${ha}${hb}</span></div>`;
  tape.style.setProperty('--ma',S.col(a));tape.style.setProperty('--mb',S.col(b));
  tape.innerHTML=`<div class="sl3-hd"><div class="sl3-f sl3-fa">${S.face(a,'wc-f-xl',a===S.rank[0])}${a===S.rank[0]?(w.k==='season'?S.gt('sl3-gt'):'<span class="sl-mini sl3-tk">Ticket</span>'):''}<span class="sl3-nm">${S.NM[a]}</span><span class="sl3-role">${w.k==='season'?'':x.F.la}</span></div>
   <div class="sl3-mid"><span class="sl3-vs">VS</span><span class="sl3-gap"><small>Gap</small>${S.$f(x.gap).replace('+','')}</span></div>
   <div class="sl3-f sl3-fb">${S.face(b,'wc-f-xl',b===S.rank[0])}${b===S.rank[0]&&w.k!=='season'?'<span class="sl-mini sl3-tk">Ticket</span>':''}<span class="sl3-nm">${S.NM[b]}</span><span class="sl3-role">${x.F.lb}</span></div></div>
   ${row('P&L',`<b class="sl3-big" data-v="0"></b>`,`<b class="sl3-big" data-v="0"></b>`,bar(x.va,M1,'l'),bar(x.vb,M1,'r'),0,'sl3-pl')}
   ${row('W-L',L.wlh(x.wa),L.wlh(x.wb),bar(hr(x.wa)-.5,.5,'l'),bar(hr(x.wb)-.5,.5,'r'),0,'sl3-wlr')}
   ${row('Best call',call(ba,a),call(bb,b),bar(ba?ba.v:0,M3,'l'),bar(bb?bb.v:0,M3,'r'))}
   ${row('Worst call',call(wa,a),call(wb,b),bar(wa?wa.v:0,M4,'l'),bar(wb?wb.v:0,M4,'r'))}
   <p class="sl3-line">${x.line}</p>`;
  const bg=tape.querySelectorAll('.sl3-big'),pv=cur!=null?A[cur].amts:null;bg[0].dataset.v=pv?pv[a]:0;bg[1].dataset.v=pv?pv[b]:0;L.count(bg[0],x.va,anim?700:0);L.count(bg[1],x.vb,anim?700:0);
  if(anim&&!S.RM()){tape.querySelectorAll('.sl3-br').forEach((e,i)=>e.animate([{transform:'scaleX(0)'},{transform:'none'}],{duration:520,delay:120+Math.floor(i/2)*70,easing:'cubic-bezier(.3,1.3,.5,1)',fill:'backwards'}));
   tape.querySelectorAll('.sl3-f').forEach((f,i)=>f.animate([{transform:`translateX(${i?36:-36}px)`,opacity:0},{transform:'none',opacity:1}],{duration:380,easing:'cubic-bezier(.3,1.4,.5,1)',fill:'backwards'}));
   tape.querySelector('.sl3-gap').animate([{transform:'scale(1.8) rotate(-8deg)',opacity:0},{transform:'rotate(2deg)',opacity:1}],{duration:300,delay:380,easing:'cubic-bezier(.3,1.6,.5,1)',fill:'backwards'})}};
let cur=null;
const show=(i,anim)=>{const x=A[i],[s,e]=span(x.w);btns.forEach(b=>b.setAttribute('aria-selected',b.dataset.k===x.w.k));
  mk.style.left=(s/nd*100)+'%';mk.style.width=((e-s+1)/nd*100)+'%';draw(x,anim);cur=i};
btns.forEach((b,i)=>b.onclick=()=>{if(cur!==i)show(i,true)});
btns.forEach((b,i)=>b.onkeydown=e=>{const k={ArrowRight:1,ArrowLeft:-1}[e.key];if(k){const j=(i+k+3)%3;btns[j].focus();show(j,true)}});
show(2,false);
window.__slShow=(k,anim)=>show(L.W.findIndex(w=>w.k===k),anim);
S.ready('l3')})();
