/* I2 · The hot streak: a replay of the one moment this season that looked like skill. The AI whose record ran hottest
   (the highest share right after at least 20 calls) gets its whole season as a form guide, call by call; a playhead replays
   it and four panels light up as it passes the streak, the peak, the cool-down and today. Everyone's best and worst runs close it. */
(function(){const S=SI,D=document,sp=D.querySelector('.wc-splash');if(!sp)return;
/* who ran hottest, and when */
let hot=null;S.ORDER.forEach(m=>{let k=0;S.seq[m].forEach((x,i)=>{if(x.ok)k++;const n=i+1;if(n>=20&&(!hot||k/n>hot.k/hot.n))hot={m,k,n,i,r:x.r}})});
const m=hot.m,q=S.seq[m],NMm=S.NM[m],ru=S.runs(m),s0=ru.bwAt-ru.bw+1,s1=ru.bwAt;
const after=q.slice(hot.i+1),aW=after.filter(x=>x.ok).length,aL=after.length-aW;
const best4=S.ORDER.every(o=>{const z=S.seq[o].filter(x=>x.n<=hot.r.n);return o===m||z.filter(x=>x.ok).length/z.length<hot.k/hot.n});
const topNow=S.ORDER.every(o=>o===m||S.hr(o)<S.hr(m));
const tiles=q.map((x,i)=>`<i class="si2-t ${x.ok?'si2-w':'si2-l'}${i>=s0&&i<=s1?' si2-fire':''}${i>hot.i?' si2-cool':''}" style="--i:${i}" title="Round ${x.n} · ${S.esc(x.r.co)}">${x.ok?'✓':'✗'}</i>`).join('');
const pin=(k,i)=>`<b class="si2-pin" style="--i:${i}">${k}</b>`;
const P=[
 {k:1,i:s1,cap:`Rounds ${q[s0].n} to ${q[s1].n}`,txt:`${ru.bw} right in a row.`,sfx:'On fire!',mood:'si2-m-fire'},
 {k:2,i:hot.i,cap:`After round ${hot.r.n}`,txt:`${hot.k} right, ${hot.n-hot.k} wrong.${best4?' Best of the four.':''}`,sfx:'Genius?',mood:'si2-m-peak'},
 {k:3,i:hot.i+after.length,cap:'Since then',txt:`${aW} right, ${aL} wrong.`,sfx:'Fizzle…',mood:'si2-m-cool'},
 {k:4,i:q.length-1,cap:'Today',txt:`${S.W(m)} right of ${S.C(m)}.${topNow?' Still the best of the four.':''}`,sfx:'Skill or luck?',mood:'si2-m-now'}];
const mini=a=>`<span class="si2-mini">${a.map(x=>`<i class="${x.ok?'si2-w':'si2-l'}">${x.ok?'✓':'✗'}</i>`).join('')}</span>`;
const arts=[mini(q.slice(s0,s1+1)),`<span class="si2-news"><b>${S.esc(NMm)} can see the future?</b></span>`,mini(after),`<span class="si2-score"><em class="wc-tu">${S.W(m)}</em> ✓ <em class="wc-td">${S.C(m)-S.W(m)}</em> ✗</span>`];
const panels=P.map((p,j)=>`<article class="si2-pn ${p.mood}" data-i="${j===2?hot.i+1:p.i}"><p class="wc-cap si2-cap"><b>${p.k}</b>${p.cap}</p>
  <div class="si2-art">${S.face(m,'wc-f-xl',m===S.rank[0])}${arts[j]}<span class="si2-sfx">${p.sfx}</span>${j===0?'<i class="si2-flame" aria-hidden="true"></i>':''}${j===2?'<i class="si2-drop" aria-hidden="true"></i><i class="si2-drop si2-d2" aria-hidden="true"></i>':''}</div>
  <p class="si2-txt">${p.txt}</p></article>`).join('');
const ev=S.ORDER.map(o=>{const r=S.runs(o);return `<div class="si2-ev" style="--mc:${S.col(o)}">${S.face(o,'wc-f-s')}<b>${S.NM[o]}</b><span class="si2-hw"><i>✓</i>${r.bw} in a row</span><span class="si2-hl"><i>✗</i>${r.bl} in a row</span></div>`}).join('');
const el=D.createElement('section');el.className='si-sol si-i2';el.setAttribute('aria-label','Smart or lucky?');
el.innerHTML=`<h2 class="wc-h2"><span>Smart or lucky?</span><small>${NMm}'s season, call by call. A hot streak looks like genius. Then what?</small></h2>
<div class="si-pn si2-strip si-hal"><div class="si2-hd">${S.face(m,'',m===S.rank[0])}<b>${NMm}</b><span class="si2-ct" aria-live="polite"></span><button type="button" class="si2-rp">↻ Replay</button></div>
 <div class="si2-tiles">${tiles}${P.slice(0,3).map(p=>pin(p.k,p.i)).join('')}<i class="si2-ph" aria-hidden="true"></i></div></div>
<div class="si2-pns">${panels}</div>
<div class="si-pn si2-all si-hal" style="--h:#ff3a31"><p class="si-tag">Everyone runs hot and cold</p><div class="si2-evs">${ev}</div></div>
<p class="wc-cap si-tbc"><b>To be continued…</b>One streak proves nothing. We will know more after about ${S.FULL} calls each. ${NMm} has made ${S.C(m)}.</p>`;
sp.before(el);sp.classList.add('si-off');
/* the replay: a playhead walks the calls, the counter counts, panels light as their moment passes */
const T=[...el.querySelectorAll('.si2-t')],ct=el.querySelector('.si2-ct'),ph=el.querySelector('.si2-ph'),pns=[...el.querySelectorAll('.si2-pn')];let timer=null;
const pins=[...el.querySelectorAll('.si2-pin')],place=()=>pins.forEach(p=>{const t=T[+p.style.getPropertyValue('--i')];p.style.transform=`translate(${t.offsetLeft+t.offsetWidth-12}px,${t.offsetTop-10}px)`});
const set=i=>{place();let w=0;T.forEach((t,j)=>{t.classList.toggle('si2-on',j<=i);if(j<=i&&q[j].ok)w++});ct.innerHTML=`<em class="wc-tu">${w}</em>✓ <em class="wc-td">${i+1-w}</em>✗<span class="wc-sr"> ${w} right, ${i+1-w} wrong</span>`;
  const t=T[Math.max(0,i)];ph.style.transform=`translate(${t.offsetLeft-2}px,${t.offsetTop-2}px)`;pns.forEach(p=>p.classList.toggle('si2-lit',+p.dataset.i<=i))};
const play=()=>{clearInterval(timer);if(S.RM()){set(T.length-1);el.classList.add('si2-done');return}el.classList.remove('si2-done');let i=0;set(0);
  timer=setInterval(()=>{i++;if(i>=T.length){clearInterval(timer);el.classList.add('si2-done');return}set(i)},95)};
el.querySelector('.si2-rp').onclick=play;set(T.length-1);el.classList.add('si2-done');
S.io(el.querySelector('.si2-strip'),play,.4);addEventListener('resize',()=>{if(el.classList.contains('si2-done'))set(T.length-1)});
window.__siShot=async v=>{clearInterval(timer);set(v==='b'?hot.i:T.length-1);if(v!=='b')el.classList.add('si2-done')};window.__si2={set,play,T};
S.ready('i2')})();
