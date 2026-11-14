/* F2 "The golden ticket": the one object the tab is about. Whoever tops the P&L holds it, and we bet on its call.
   On arrival the ticket changes hands the way it did since your last visit (or the last close): its face turns over to each
   holder in order while a stamp for that round thuds onto the stub. The runner-up's season ticket sticks out from behind it.
   Then the predictions in, dealt as a fan of tickets in each company's colours. The per-AI "since" amounts sit as stamps on the scoreboard. */
(function(){const S=window.SF,{NM,face,esc,chip,usd,usdK,mv}=S;
const L=S.now[0],R2=S.now[1],hs=[S.before[0]].concat(S.hand.map(h=>h.m));
/* only today's holder shows its P&L; an earlier holder shows how it got the ticket */
const holder=(m,i)=>{const lst=i===hs.length-1,h=S.hand[i-1];return `<div class="sf2-h" data-i="${i}">${face(m,'wc-f-xl'+(lst?' sf2-holo':''))}<div><b class="sf-pow sf2-nm">${NM[m]}</b>
  ${lst?`<p class="sf2-pl ${S.cur[m]>=1e5?'wc-tu':'wc-td'}">${usd(S.cur[m]-1e5)}</p>`:`<p class="sf2-was">${h?'Took it on R'+h.r.n+' '+esc(S.short(h.r.co)):'Held it before'}</p>`}</div></div>`};
const stamps=S.hand.map((h,i)=>`<span class="sf2-st" data-i="${i+1}"><b>R${h.r.n}</b><small>${esc(S.short(h.r.co))} ${mv(h.r.a)}</small><em>${NM[h.m]}</em></span>`).join('');
const day=S.mode==='visit'?S.since:S.sinceShort;
const gt=`<div class="sf2-stage"><div class="sf2-under" aria-hidden="true"><span class="sf2-u-st">#2</span>${face(R2,'wc-f-s')}<b class="sf-pow">${NM[R2]}</b><small class="${S.cur[R2]>=1e5?'wc-tu':'wc-td'}">${usdK(S.cur[R2]-1e5)}</small></div>
  <article class="sf2-gt" aria-label="${esc(NM[L]+' holds the golden ticket, '+usd(S.cur[L]-1e5)+', $'+Math.round(S.gap).toLocaleString('en-US')+' ahead of '+NM[R2])}">
    <div class="sf2-stub" aria-hidden="true"><b>No. 1</b><i>Golden ticket</i></div>
    <div class="sf2-body"><div class="sf2-faces">${hs.map(holder).join('')}</div>
      <p class="sf2-gap"><span>Ahead of ${NM[R2]} by</span><b class="sf-pow" data-v="${Math.round(S.gap)}">$${Math.round(S.gap).toLocaleString('en-US')}</b></p>
      <p class="sf2-we">We bet on its call.</p></div></article></div>
  <div class="sf2-log"><p class="sf2-lh"><b>${esc(day)}</b><span>${S.win.length} reports graded · ${esc(S.hand.length?(S.hand.length===1?'it changed hands once':S.hand.length===2?'it changed hands twice':'it changed hands '+S.hand.length+' times'):'it stayed with '+NM[L])}</span></p>${stamps?`<div class="sf2-sts">${stamps}</div>`:''}</div>`;
const n=S.locked.length,bell=S.bellAt?S.left(S.bellAt):null,bd=S.locked.length?S.rel(S.locked[0].resolves):'';
const fan=`<div class="sf2-pr"><h3 class="sf2-h3">Predictions in</h3>
  <div class="sf2-fan" style="--n:${n}">${S.locked.map((p,i)=>`<span class="sf-tk sf2-tk" style="--i:${i};--a:${n>1?(i/(n-1)*2-1).toFixed(3):0}" data-tk="${esc(p.ticker)}">${chip(p.ticker,p.co,'','sf-co-s')}<b class="sf-tt">${esc(p.ticker.replace(/\..*$/,''))}</b><span class="sf-tl">${p.calls.map(c=>`<i class="${c.v>0?'sf-up':'sf-dn'}"></i>`).join('')}</span><span class="wc-sr">${esc(p.co)}: ${p.calls.map(c=>NM[c.m]+' '+(c.v>0?'up':'down')+' '+c.mag+'%').join(', ')}</span></span>`).join('')}</div>
  <p class="sf2-bell"><b>Graded at ${esc(bd==='today'?"today's":bd==='tomorrow'?"tomorrow's":bd+"'s")} close</b>${bell?`<span>in ${bell}</span>`:''}</p>
  ${S.due.length?`<div class="sf2-next"><span>Next due ${esc(S.rel(S.due[0].called))}</span>${S.due.slice(0,4).map(u=>`<span class="sf2-blank" data-tk="${esc(u.ticker)}">${chip(u.ticker,u.co,'','sf-co-xs')}<b>${esc(u.ticker.replace(/\..*$/,''))}</b></span>`).join('')}${S.due.length>4?'<small>+'+(S.due.length-4)+'</small>':''}</div>`:''}
  <a class="sf-x" href="${esc((window.CONFIG||{}).x||'https://x.com/earningszn')}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.2 2.3h3.4l-7.4 8.4 8.7 11.5h-6.8l-5.3-7-6.1 7H1.3l7.9-9L.9 2.3h7l4.8 6.4 5.5-6.4zm-1.2 17.9h1.9L7 4.2H5z"/></svg><span>Follow on X to see them first</span></a></div>`;
const el=document.createElement('section');el.className='sf-top sf2';el.setAttribute('aria-label','The golden ticket');
el.innerHTML=`<h2 class="wc-h2"><span>The golden ticket</span><small>The top P&amp;L holds it. We bet on its call.</small></h2><div class="sf2-grid"><div>${gt}</div>${fan}</div>`;
S.top(el);S.body({stamps:true});
/* the hand-off: show each holder in turn (a quarter turn out, a quarter turn in), stamping that round onto the stub */
const fs=[...el.querySelectorAll('.sf2-h')],ss=[...el.querySelectorAll('.sf2-st')],last=fs.length-1;
const show=i=>{fs.forEach((f,k)=>f.classList.toggle('sf2-on',k===i));ss.forEach((s,k)=>s.classList.toggle('sf2-in',k<i))};
if(S.rm()){show(last);el.classList.add('sf-in','sf2-done')}
else{show(0);new IntersectionObserver((es,ob)=>{if(!es[0].isIntersecting)return;ob.disconnect();el.classList.add('sf-in');
  let i=0;const step=()=>{if(i>=last){el.classList.add('sf2-done');setTimeout(()=>S.count(el.querySelector('.sf2-gap b'),800),150);return}
    const f=fs[i];f.classList.add('sf2-out');setTimeout(()=>{f.classList.remove('sf2-out');i++;show(i);fs[i].classList.add('sf2-turn');setTimeout(()=>{fs[i].classList.remove('sf2-turn');setTimeout(step,650)},320)},260)};
  setTimeout(step,900)},{threshold:.35}).observe(el.querySelector('.sf2-gt'))}
document.documentElement.classList.add('sf-ready-f2')})();
