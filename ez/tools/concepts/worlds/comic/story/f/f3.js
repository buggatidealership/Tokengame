/* F3 "The timeline": time is the carrier. One rail from the last close (or your last visit) through now to the next bell.
   Solid where it has happened, dashed where it hasn't. The rail draws down on arrival and each moment lands as the line
   reaches it (the gold stars are C4's lead-change mark); "Now" breathes like a live signal. The per-AI amounts sit as stamps
   on the scoreboard tickets. */
(function(){const S=window.SF,{NM,face,esc,chip,usd,usdK,mv}=S;
const ny=t=>new Date(t).toLocaleTimeString('en-US',{timeZone:'America/New_York',hour:'numeric',minute:'2-digit'}).toLowerCase().replace(' ',' ');
const cap=s=>s.replace(/^./,c=>c.toUpperCase());
const ev=[];
/* the past: each graded day, then its lead changes */
/* closes with no change at the top run together into one stretch, so a long absence stays short */
const runs=[];S.days.forEach(g=>{const lc=S.hand.filter(h=>g.rs.includes(h.r)),p=runs[runs.length-1];if(p&&!p.lc.length){p.rs=p.rs.concat(g.rs);p.to=g.s;p.lc=lc}else runs.push({s:g.s,to:g.s,rs:g.rs.slice(),lc})});
runs.forEach(g=>{const lc=g.lc;
  ev.push({k:'close',when:(g.to!==g.s?cap(S.rel(g.s))+' to '+S.rel(g.to)+' · '+(g.rs.length)+' closes':cap(S.rel(g.s))+' · the close').replace(/ · \d+ closes$/,' · the closes'),body:`<p class="sf3-t"><b>${g.rs.length} report${g.rs.length===1?'':'s'} graded</b></p><div class="sf3-cos">${g.rs.slice(0,12).map(r=>chip(r.ticker,r.co,'','sf-co-s3')).join('')}${g.rs.length>12?`<small>+${g.rs.length-12}</small>`:''}</div>`});
  lc.forEach(h=>ev.push({k:'star',when:`R${h.r.n} · ${esc(S.short(h.r.co))} <span class="${h.r.a>0?'wc-tu':'wc-td'}">${mv(h.r.a)}</span>`,body:`<p class="sf3-t sf3-who">${face(h.m)}<b>${NM[h.m]} ${(()=>{const j=S.hand.indexOf(h);return j>0&&S.hand[j-1].from===h.m?'takes it back':'takes the lead'})()}</b></p>`}))});
if(!S.hand.length)ev.push({k:'star',when:'No change at the top',body:`<p class="sf3-t sf3-who">${face(S.now[0])}<b>${NM[S.now[0]]} kept the lead</b></p>`});
/* the predictions that came in */
if(S.locked.length)ev.push({k:'lock',when:`${S.locked.length} predictions in`,body:`<div class="sf3-tks">${S.locked.map((p,i)=>`<span class="sf-tk sf3-tk" style="--i:${i}" data-tk="${esc(p.ticker)}">${chip(p.ticker,p.co,'','sf-co-xs')}<b class="sf-tt">${esc(p.ticker.replace(/\..*$/,''))}</b><span class="sf-tl">${p.calls.map(c=>`<i class="${c.v>0?'sf-up':'sf-dn'}"></i>`).join('')}</span></span>`).join('')}</div>`});
/* now */
const L=S.now[0],R2=S.now[1];
ev.push({k:'now',when:'Now',body:`<div class="sf3-nowb">${face(L,'wc-f-l sf3-holo')}<p><b class="sf-pow sf3-big">${NM[L]} leads by <span data-v="${Math.round(S.gap)}">$${Math.round(S.gap).toLocaleString('en-US')}</span></b><small>over ${face(R2,'wc-f-s')} ${NM[R2]} · ${NM[L]} ${usd(S.cur[L]-1e5)} · We bet on its call</small></p></div>`});
/* what's next */
if(S.bellAt){const bd=S.rel(S.locked[0].resolves);ev.push({k:'bell',fut:1,when:`${cap(bd)} · ${ny(S.bellAt)} ET`,body:`<p class="sf3-t"><b>The close grades the ${S.locked.length}</b>${S.left(S.bellAt)?`<span class="sf3-cd">in ${S.left(S.bellAt)}</span>`:''}</p>`})}
if(S.due.length)ev.push({k:'due',fut:1,when:cap(S.rel(S.due[0].called)),body:`<p class="sf3-t"><b>Next predictions due</b></p><div class="sf3-due">${S.due.slice(0,5).map(u=>`<span class="sf3-blank">${chip(u.ticker,u.co,'','sf-co-xs')}<b>${esc(u.ticker.replace(/\..*$/,''))}</b></span>`).join('')}</div>
  <a class="sf-x" href="${esc((window.CONFIG||{}).x||'https://x.com/earningszn')}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.2 2.3h3.4l-7.4 8.4 8.7 11.5h-6.8l-5.3-7-6.1 7H1.3l7.9-9L.9 2.3h7l4.8 6.4 5.5-6.4zm-1.2 17.9h1.9L7 4.2H5z"/></svg><span>Follow on X to see them first</span></a>`});
const IC={close:'<svg viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0-6 6v4l-2 3h16l-2-3V9a6 6 0 0 0-6-6zm-2 15a2 2 0 0 0 4 0z"/></svg>',bell:'<svg viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0-6 6v4l-2 3h16l-2-3V9a6 6 0 0 0-6-6zm-2 15a2 2 0 0 0 4 0z"/></svg>',
  lock:'<svg viewBox="0 0 24 24"><path d="M7 10V8a5 5 0 0 1 10 0v2h1v10H6V10zm2 0h6V8a3 3 0 0 0-6 0z"/></svg>',due:'<svg viewBox="0 0 24 24"><path d="M5 4h14v16H5zm2 3v2h10V7zm0 4v2h10v-2zm0 4v2h6v-2z"/></svg>',star:'',now:''};
const el=document.createElement('section');el.className='sf-top sf3';el.setAttribute('aria-label',S.since);
el.innerHTML=`<h2 class="wc-h2"><span>${esc(S.since)}</span></h2><div class="sf-pn sf3-pn"><ol class="sf3-tl" style="--n:${ev.length}">${ev.map((e,i)=>`<li class="sf3-e sf3-${e.k}${e.fut?' sf3-fut':''}" style="--i:${i}"><span class="sf3-node" aria-hidden="true">${IC[e.k]||''}</span><p class="sf3-when">${e.when}</p><div class="sf3-body">${e.body}</div></li>`).join('')}</ol></div>`;
S.top(el);S.body({stamps:true});
const tl=el.querySelector('.sf3-tl');S.reveal(tl,'sf-in',.15);
if(!S.rm())new IntersectionObserver((es,ob)=>{if(es[0].isIntersecting){const k=[...tl.children].findIndex(x=>x.classList.contains('sf3-now'));setTimeout(()=>S.count(el.querySelector('.sf3-big span'),700),300+k*330);ob.disconnect()}},{threshold:.15}).observe(tl);
document.documentElement.classList.add('sf-ready-f3')})();
