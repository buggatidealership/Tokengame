/* F1 "Previously…": the comic's own recap, four panels in reading order: the close, who got paid, the lead, what's next.
   The panels arrive one after another (time passing), the money bars grow from zero, the stars pop where the lead changed,
   and the predictions drop in as tickets. Then the shared body (C4, the scoreboard, the proof). */
(function(){const S=window.SF,{NM,face,esc,chip,usd,usdK,mv}=S;
const day=S.mode==='visit'?S.since:(S.rel(S.lastS)==='today'?"Today's close":S.sinceShort);
/* A: the close. Every graded company with its move (a long list keeps the biggest moves and counts the rest) */
const MAXA=14,ws=S.win.slice().sort((a,b)=>Math.abs(b.a)-Math.abs(a.a)),shown=ws.slice(0,MAXA).sort((a,b)=>a.n-b.n);
const A=`<li class="sf-pn sf1-p sf1-a"><p class="sf-cb">${esc(day)}</p>
  <p class="sf1-big"><b class="sf-pow">${S.win.length}</b> reports graded</p>
  <div class="sf1-cos">${shown.map((r,i)=>chip(r.ticker,r.co,`<small class="${r.a>0?'wc-tu':'wc-td'}">${mv(r.a)}</small>`,'sf1-co" style="--i:'+i)).join('')}${ws.length>MAXA?`<span class="sf1-more">+${ws.length-MAXA}</span>`:''}</div></li>`;
/* B: who got paid. One bar per AI from zero, as long as its P&L over the window (all four on one scale) */
const mx=Math.max(...S.ORDER.map(m=>Math.abs(S.delta[m]))),byD=S.ORDER.slice().sort((a,b)=>S.delta[b]-S.delta[a]);
const B=`<li class="sf-pn sf1-p sf1-b"><p class="sf-cb">Who got paid</p>
  <div class="sf1-bars">${byD.map((m,i)=>{const v=S.delta[m],w=Math.abs(v)/mx*50;return `<div class="sf1-bar ${v>=0?'sf1-u':'sf1-d'}" style="--w:${w.toFixed(2)}%;--i:${i}">${face(m,'sf1-f')}<span class="sf1-tr"><i></i></span><b class="sf-pow ${v>=0?'wc-tu':'wc-td'}">${usdK(v)}</b><span class="wc-sr">${NM[m]} ${usd(v)}, ${S.wl[m].w} right and ${S.wl[m].l} wrong</span></div>`}).join('')}</div>
  <p class="sf1-ax" aria-hidden="true"><span>Lost</span><span>Made</span></p></li>`;
/* C: the lead. The holders in order, a gold star (C4's mark) at each change, then who holds it and by how much */
const hs=[S.before[0]].concat(S.hand.map(h=>h.m)),L=S.now[0],R2=S.now[1];
const C=`<li class="sf-pn sf1-p sf1-c"><p class="sf-cb">${esc(S.handLine)}</p>
  <div class="sf1-relay">${hs.map((m,i)=>(i?`<span class="sf1-hop" style="--i:${i}"><i class="sf1-star"></i><small>R${S.hand[i-1].r.n} ${esc(S.short(S.hand[i-1].r.co))}</small></span>`:'')+`<span class="sf1-hold${i===hs.length-1?' sf1-now':''}" style="--i:${i}">${face(m,i===hs.length-1?'wc-f-l':'')}<small>${NM[m]}</small></span>`).join('')}</div>
  <div class="sf1-lead"><p><b class="sf-pow sf1-gap" data-v="${Math.round(S.gap)}" data-s="">$${Math.round(S.gap).toLocaleString('en-US')}</b><span>${NM[L]}'s lead over ${face(R2,'wc-f-s')} ${NM[R2]}</span></p>
  <p class="sf1-pl">${NM[L]} ${usd(S.cur[L]-1e5)} · We bet on its call</p></div></li>`;
/* D: what's next. The predictions in, as tickets in each company's colours with their four calls; then the bell and who's next */
const bell=S.bellAt?S.left(S.bellAt):null,bd=S.locked.length?S.rel(S.locked[0].resolves):'';
const Dp=`<li class="sf-pn sf1-p sf1-d"><p class="sf-cb">Predictions in</p>
  <div class="sf1-tks">${S.locked.map((p,i)=>{const t=S.tally(p);return `<span class="sf-tk" style="--i:${i}" data-tk="${esc(p.ticker)}">${chip(p.ticker,p.co,'','sf-co-s')}<b class="sf-tt">${esc(p.ticker.replace(/\..*$/,''))}</b><span class="sf-tl" title="${t.u} up, ${t.dn} down">${p.calls.map(c=>`<i class="${c.v>0?'sf-up':'sf-dn'}"></i>`).join('')}</span></span>`}).join('')}</div>
  <p class="sf1-bell"><b>Graded at ${esc(bd==='today'?"today's":bd==='tomorrow'?"tomorrow's":bd+"'s")} close</b>${bell?`<span class="sf1-cd">in ${bell}</span>`:''}</p>
  ${S.due.length?`<p class="sf1-due"><span>Next predictions due ${esc(S.rel(S.due[0].called))}</span>${S.due.slice(0,4).map(u=>chip(u.ticker,u.co,'','sf-co-xs')).join('')}${S.due.length>4?'<small>+'+(S.due.length-4)+'</small>':''}</p>`:''}
  <a class="sf-x" href="${esc((window.CONFIG||{}).x||'https://x.com/earningszn')}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.2 2.3h3.4l-7.4 8.4 8.7 11.5h-6.8l-5.3-7-6.1 7H1.3l7.9-9L.9 2.3h7l4.8 6.4 5.5-6.4zm-1.2 17.9h1.9L7 4.2H5z"/></svg><span>Follow on X to see them first</span></a></li>`;
const el=document.createElement('section');el.className='sf-top sf1';el.setAttribute('aria-label','Previously');
el.innerHTML=`<h2 class="wc-h2"><span>Previously…</span><small>${esc(S.since)}.</small></h2><ol class="sf1-strip">${A+B+C+Dp}</ol>`;
S.top(el);S.body({stamps:false});
const g=el.querySelector('.sf1-gap');S.reveal(el.querySelector('.sf1-strip'),'sf-in',.12);
if(!S.rm())new IntersectionObserver((es,ob)=>{if(es[0].isIntersecting){setTimeout(()=>S.count(g,900),2100);ob.disconnect()}},{threshold:.3}).observe(el.querySelector('.sf1-c'));
document.documentElement.classList.add('sf-ready-f1')})();
