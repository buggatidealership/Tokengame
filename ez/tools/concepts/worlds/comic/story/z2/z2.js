/* z2: the Overview as one Silver/Bronze Age superhero comic issue.
   Laid over the built X3+ page: hides main's sections, moves the real explainer film into the cover, reads only the page's globals. */
(function(){
const D=document,H=D.documentElement;
const KEYS=['GPT','CLAUDE','GROK','KIMI'];
const NM={GPT:'GPT',CLAUDE:'Claude',GROK:'Grok',KIMI:'Kimi'};
const LAB={GPT:['OpenAI','us'],CLAUDE:['Anthropic','us'],GROK:['xAI','us'],KIMI:['Moonshot AI','cn']};
const ESC=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const A=window.__x2pPnl().A;
const money=v=>(v<0?'−':'+')+'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
const kmoney=v=>{const a=Math.abs(v);return (v<0?'−':'+')+'$'+(a>=1e4?(a/1e3).toFixed(1)+'K':Math.round(a).toLocaleString('en-US'))};
const pct=v=>(v>0?'▲ ':v<0?'▼ ':'')+Math.abs(v).toFixed(2)+'%';
const md=s=>{const m=String(s||'').match(/(\d+)\/(\d+)\/(\d+)/);return m?new Date(Date.UTC(2000+(+m[3]%100),+m[1]-1,+m[2],12)):null};
const dayS=(s,o)=>{const d=md(s);return d?d.toLocaleDateString('en-US',Object.assign({month:'short',day:'numeric',timeZone:'UTC'},o||{})):''};
const face=(m,cls)=>{const M=MODELS[m];return `<i class="z2-em ${cls||''}" data-m="${m}" style="--mc:${m==='GROK'?'#15121a':M.c}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${M.d}" ${M.fr?'fill-rule="evenodd"':''}/>${M.dot?`<path d="${M.dot}" style="fill:${M.dotc}"/>`:''}</svg></i>`};
const logo=(t,cls)=>{const L=CO_LOGOS[t];return L?`<img class="z2-lg ${cls||''}" src="media/${L.f}" alt="" loading="lazy" data-native>`:''};
const film=n=>window.FILMS&&FILMS[n];
const up=s=>/UP/i.test(s);
const parseCall=s=>{const m=String(s).match(/(UP|DOWN)\s*([\d.]+)/i);return m?{dir:m[1].toUpperCase(),mag:+m[2]}:null};
const winners=r=>KEYS.filter(m=>new RegExp('\\b'+m+'\\b','i').test(r.win||''));
const flag=c=>c==='cn'
 ?`<svg class="z2-flag" viewBox="0 0 30 20" aria-label="China"><rect width="30" height="20" fill="#de2910"/><path fill="#ffde00" d="M5 3l.9 2.7h2.8L6.4 7.4l.9 2.7L5 8.4 2.7 10.1l.9-2.7L1.3 5.7h2.8z"/><circle cx="10" cy="2.5" r=".8" fill="#ffde00"/><circle cx="12" cy="4.5" r=".8" fill="#ffde00"/><circle cx="12" cy="7.5" r=".8" fill="#ffde00"/><circle cx="10" cy="9.5" r=".8" fill="#ffde00"/></svg>`
 :`<svg class="z2-flag" viewBox="0 0 30 20" aria-label="United States"><rect width="30" height="20" fill="#b22234"/><path stroke="#fff" stroke-width="1.54" d="M0 2.3h30M0 5.4h30M0 8.5h30M0 11.5h30M0 14.6h30M0 17.7h30"/><rect width="13" height="10.8" fill="#3c3b6e"/></svg>`;

/* ---------- the numbers ---------- */
const G=ROUNDS.slice();const last=G[G.length-1];
const board=KEYS.map(m=>{const a=A[m];const n=a.W+a.L;return {m,pnl:a.pnl,W:a.W,L:a.L,hr:n?a.W/n:0,seq:(a.seq||[]).slice(-5)}}).sort((x,y)=>y.pnl-x.pnl);
const lead=board[0].m;
const maxAbs=Math.max(...board.map(b=>Math.abs(b.pnl)));
/* the walkthrough: newest graded round with a film where exactly one AI got the direction (lesson 11) */
const right=r=>r.calls.filter(c=>up(c[1])===(r.a>0));
const lr=[...G].reverse().find(r=>film(r.n)&&r.calls.length===4&&right(r).length===1)||[...G].reverse().find(r=>film(r.n));

/* ---------- 1. the cover ---------- */
function cover(){
  const lw=winners(last),lr_=right(last);
  const inside=lw.length>1?`${lw.map(m=>NM[m]).join(' and ')} tie on ${ESC(last.co)}!`:lw.length?`${NM[lw[0]]} takes ${ESC(last.co)}!`:`${ESC(last.co)} fools all four!`;
  const issueDate=dayS(last.resolves,{month:'short'}).toUpperCase();
  return `<section class="z2-cv" aria-label="Earnings Zeason, issue ${G.length}">
   <div class="z2-cv-top">
     <div class="z2-cb" aria-label="Season 1, issue ${G.length}. Golden ticket holder: ${NM[lead]}">
       <span class="z2-cb-s">Season<br>1</span>
       <span class="z2-cb-f">${face(lead,'z2-gold')}<small>${NM[lead]}</small></span>
       <span class="z2-cb-n"><small>No.</small><b>${G.length}</b><small>${issueDate}</small></span>
     </div>
     <p class="z2-cv-kick">Four AIs. One golden ticket!</p>
   </div>
   <h1 class="z2-mast" aria-label="Earnings Zeason"><span class="z2-mast-a">Earnings</span><span class="z2-mast-b"><b class="z2-e">Z</b>eason</span></h1>
   <p class="z2-cv-line"><span>4 AIs trade earnings</span> <span>to run our buybacks.</span></p>
   <div class="z2-cv-art">
     <div class="z2-cv-film" id="z2Film"></div>
     <div class="z2-cv-side">
       <p class="z2-cv-st">Starring</p>
       <ul class="z2-cv-cast">${KEYS.map(m=>`<li>${face(m)}<b>${NM[m]}</b></li>`).join('')}</ul>
     </div>
   </div>
   <div class="z2-cv-foot">
     <p class="z2-burst"><small>Inside:</small> ${inside}</p>
     <p class="z2-seal" aria-label="Graded by the market close"><span>Graded<br>by the<br><b>market</b><br>close</span></p>
   </div>
  </section>`;
}

/* ---------- 2. the origin page: one real round in six panels ---------- */
function origin(){
  const r=lr;if(!r)return '';
  const ok=right(r).map(c=>c[0]),W=winners(r),F=film(r.n);
  const calls=r.calls.map(c=>Object.assign({m:c[0],off:+c[2]},parseCall(c[1])));
  const bal=c=>`<li class="z2-ba ${c.dir==='UP'?'z2-bu':'z2-bd'}">${face(c.m)}<q><b>${NM[c.m]}:</b> “${c.dir==='UP'?'Up':'Down'} ${c.mag}%!” <i aria-hidden="true">${c.dir==='UP'?'🐂':'🐻'}</i></q></li>`;
  const per=m=>A[m].per&&A[m].per[r.n]?A[m].per[r.n].v:null;
  const stamps=calls.map((c,i)=>{const p=ok.includes(c.m);return `<li class="${p?'z2-ps':'z2-fl'}${W.includes(c.m)?' z2-wn':''}" style="--i:${i}">${face(c.m)}<b>${NM[c.m]}</b><span class="z2-stp">${p?'Pass!':'Fail!'}</span>${W.includes(c.m)?'<i class="z2-crown" aria-label="closest call">👑</i>':''}</li>`}).join('');
  const sfx=r.a>0?'Ka-boom!':'Kra-koom!';
  const wN=W.length?W.map(m=>NM[m]).join(' and '):'Nobody';
  const pays=KEYS.filter(m=>per(m)!=null).sort((x,y)=>per(y)-per(x));
  return `<section class="z2-or" aria-label="How one round goes: round ${r.n}, ${ESC(r.co)}">
   <header class="z2-or-h"><p class="z2-or-k">Origin of a round</p><h2 class="z2-h">Round ${r.n}: the ${ESC(r.co)} job!</h2></header>
   <ol class="z2-pg">
    <li class="z2-p z2-p1"><p class="z2-cap"><b class="z2-n">1</b> Before earnings, each AI makes its prediction.</p>
      <div class="z2-p1-co">${logo(r.ticker)}<b>${ESC(r.co)}</b><span class="z2-lock">Locked ${dayS(r.called)}</span></div>
      <ul class="z2-bal">${calls.map(bal).join('')}</ul></li>
    <li class="z2-p z2-p2"><p class="z2-cap"><b class="z2-n">2</b> ${ESC(r.co)} reports. The market answers at the close.</p>
      <a class="z2-p2-f" href="#/round/${r.n}" aria-label="Open round ${r.n}">${F?`<img src="media/${F.p}.jpg" alt="" loading="lazy">`:''}<span class="z2-krk" aria-hidden="true"></span>
      <span class="z2-sfx ${r.a>0?'z2-up':'z2-dn'}"><em>${sfx}</em><b>${pct(r.a)}</b></span><span class="z2-play" aria-hidden="true"></span></a></li>
    <li class="z2-p z2-p3"><p class="z2-cap"><b class="z2-n">3</b> The close grades every prediction.</p>
      <ul class="z2-stamps">${stamps}</ul>
      <p class="z2-p3-w">${ok.length===1?`Only ${NM[ok[0]]} called it ${r.a>0?'up':'down'}.`:`${ok.length} of 4 got the direction.`} Closest call: <b>${wN}</b>.</p></li>
    <li class="z2-p z2-p4"><p class="z2-cap"><b class="z2-n">4</b> P&amp;L on the call. Pretend $100,000 each.</p>
      <div class="z2-bill"><span class="z2-bill-k">${face(pays[0])}<small>${NM[pays[0]]}</small></span><b class="${per(pays[0])<0?'z2-neg':''}">${money(per(pays[0]))}</b>
       <ul>${pays.slice(1).map(m=>`<li><span>${NM[m]}</span> <b class="${per(m)<0?'z2-neg':'z2-pos'}">${kmoney(per(m))}</b></li>`).join('')}</ul></div></li>
   </ol>
   <p class="z2-cont">Round ${r.n} goes on the record. ${G.length} rounds so far, and counting.</p>
  </section>`;
}

/* ---------- 3. the handbook: the four AIs as a team, ranked by P&L ---------- */
function handbook(){
  const P0=(window.PENDING||[]).filter(p=>p.calls&&p.calls.length);const nx=P0[0];
  const say=m=>{const c=nx&&nx.calls.find(c=>c.m===m);return c?`<q class="z2-hb-say ${c.dir==='UP'?'z2-bu':'z2-bd'}"><small>On ${ESC(nx.co)}:</small> “${c.dir==='UP'?'Up':'Down'} ${c.mag}%!” <i aria-hidden="true">${c.dir==='UP'?'🐂':'🐻'}</i></q>`:''};
  const bar=b=>{const w=Math.abs(b.pnl)/maxAbs*50;return `<span class="z2-pg-b z2-pg-pl"><i style="${b.pnl<0?`right:50%;width:${w}%`:`left:50%;width:${w}%`}" class="${b.pnl<0?'z2-nb':'z2-pb'}"></i></span>`};
  const ent=(b,i)=>{const[lab,cc]=LAB[b.m];const g=i===0;
    return `<li class="z2-hb${g?' z2-hb-g':''}">
     <div class="z2-hb-p" style="--pc:${b.m==='GROK'?'#15121a':MODELS[b.m].c}"><span class="z2-hb-r">#${i+1}</span>${face(b.m,g?'z2-gold':'')}${g?'<span class="z2-tix">Golden ticket</span>':''}</div>
     <div class="z2-hb-t"><h3 class="z2-hb-n">${NM[b.m]}</h3>
      <p class="z2-hb-v">${ESC(MODELS[b.m].ver)} · ${lab} ${flag(cc)}</p>
      <p class="z2-hb-pl ${b.pnl<0?'z2-neg':'z2-pos'}"><small>Season P&amp;L</small> ${money(b.pnl)}</p></div>
     <dl class="z2-grid"><div><dt>P&amp;L</dt><dd>${bar(b)}</dd></div>
      <div><dt>Hit rate</dt><dd><span class="z2-pg-b z2-pg-hr"><i style="width:${(b.hr*100).toFixed(1)}%"></i><u aria-hidden="true"></u></span><b>${Math.round(b.hr*100)}%</b></dd></div>
      <div><dt>W-L</dt><dd><b>${b.W}-${b.L}</b><small class="z2-l5k">Last 5</small><span class="z2-l5">${b.seq.map(s=>`<i class="${s==='W'?'z2-w':'z2-l'}" aria-label="${s==='W'?'right':'wrong'}">${s==='W'?'✓':'✗'}</i>`).join('')}</span></dd></div></dl>${say(b.m)}
    </li>`};
  return `<section class="z2-hbk" aria-label="The team, ranked by P&L">
   <header class="z2-or-h"><p class="z2-or-k">Official handbook of the EZ universe</p><h2 class="z2-h">The team, ranked by P&amp;L</h2></header>
   <ol class="z2-hbl">${board.map(ent).join('')}</ol>
   <p class="z2-hb-note">Power grid: P&amp;L on a pretend $100,000 each. Hit rate = predictions that got the direction right; the tick is a coin flip.</p>
  </section>`;
}

/* ---------- 4. back issues: every graded round is an issue ---------- */
function backIssues(){
  const cov=r=>{const W=winners(r),F=film(r.n),L=CO_LOGOS[r.ticker];const all=r.calls.length&&right(r).length===r.calls.length;
    return `<li><a class="z2-bi${F?' z2-bi-f':''}${all?' z2-bi-all':''}" href="#/round/${r.n}" style="--cc:${L&&L.c||'#2b2733'}" aria-label="Round ${r.n}, ${ESC(r.co)}, ${pct(r.a)}, ${W.length?W.map(m=>NM[m]).join(' and ')+' closest':'no winner'}">
      <span class="z2-bi-m">EZ <b>#${r.n}</b></span>
      <span class="z2-bi-art">${F?`<img src="media/${F.p}.jpg" alt="" loading="lazy">`:`<span class="z2-bi-lg">${logo(r.ticker)}</span>`}</span>
      <span class="z2-bi-cb">${W.length?W.slice(0,2).map(m=>face(m)).join(''):'<i class="z2-em z2-nob">✗</i>'}<small>${W.length?'Won':'Nobody'}</small></span>
      <span class="z2-bi-t"><b>${ESC(r.co)}</b><em class="${r.a>0?'z2-up':'z2-dn'}">${pct(r.a)}</em></span></a></li>`};
  const all=[...G].reverse();
  return `<section class="z2-bk" aria-label="Every round so far">
   <header class="z2-or-h"><p class="z2-or-k">Back issues</p><h2 class="z2-h">Every round so far</h2></header>
   <p class="z2-bk-k">Newest first. The face in the corner box made the closest call. Tap an issue to open its graded card.</p>
   <ol class="z2-bkl">${all.map(cov).join('')}</ol>
   <button class="z2-more" type="button">Show all ${all.length} issues</button>
  </section>`;
}

/* ---------- 5. next issue ---------- */
function nyClose(d){const y=d.getUTCFullYear(),m=d.getUTCMonth(),dd=d.getUTCDate();const f=new Date(Date.UTC(y,2,1)).getUTCDay(),a=Date.UTC(y,2,8+(7-f)%7),g=new Date(Date.UTC(y,10,1)).getUTCDay(),b=Date.UTC(y,10,1+(7-g)%7),t=Date.UTC(y,m,dd);return Date.UTC(y,m,dd,t>=a&&t<b?20:21)}
function nextIssue(){
  const P=(window.PENDING||[]).filter(p=>p.calls&&p.calls.length);
  const by={};P.forEach(p=>{(by[p.resolves||'zz']=by[p.resolves||'zz']||[]).push(p)});
  const k=Object.keys(by).sort((x,y)=>(md(x)||Infinity)-(md(y)||Infinity))[0];
  const set=k?by[k]:[];const d=md(k);
  let when='Date to come';
  if(d){const c=nyClose(d);when=Date.now()>c?'The bell has rung. Results soon.':`At the close, ${dayS(k,{weekday:'long'})}.`}
  const show=set.slice(0,6);
  const mt=p=>{const bu=p.calls.filter(c=>c.dir==='UP'),be=p.calls.filter(c=>c.dir!=='UP');
    const side=(a,e,cl)=>`<span class="z2-sd ${cl}"><i aria-hidden="true">${e}</i>${a.map(c=>`<span class="z2-ct">${face(c.m)}<b>${c.dir==='UP'?'▲':'▼'}${c.mag}%</b></span>`).join('')||'<em>None</em>'}</span>`;
    return `<li class="z2-mt" style="--cc:${(CO_LOGOS[p.ticker]||{}).c||'#2b2733'}"><span class="z2-mt-c">${logo(p.ticker)}<b>${ESC(p.co)}</b></span>${side(bu,'🐂','z2-bulls')}${side(be,'🐻','z2-bears')}</li>`};
  const U=(window.UPCOMING||[]);const u0=U.length?U[0].called:null;const ud=U.filter(u=>u.called===u0);
  return `<section class="z2-nx" aria-label="Next issue">
   <p class="z2-nx-b">Next issue!</p>
   <h2 class="z2-h">${set.length} showdowns!</h2><p class="z2-nx-w">${when}</p>
   <p class="z2-nx-s"><span>🐂 Bulls say up</span> <span>🐻 Bears say down</span></p>
   <ol class="z2-mts">${show.map(mt).join('')}</ol>
   ${set.length>show.length?`<p class="z2-nx-m">+ ${set.length-show.length} more showdowns on the Upcoming tab.</p>`:''}
   ${ud.length?`<div class="z2-nx-u"><p>Then predictions due ${dayS(u0,{weekday:'short'})}:</p><span>${ud.slice(0,6).map(u=>CO_LOGOS[u.ticker]?`<span class="z2-nx-lg" title="${ESC(u.co)}">${logo(u.ticker)}</span>`:`<b>${ESC(u.co)}</b>`).join('')}${ud.length>6?`<em>+${ud.length-6}</em>`:''}</span></div>`:''}
  </section>`;
}

/* ---------- 6. the giant-size special: bet #1 ---------- */
function betAt(){const nv=[].concat(window.UPCOMING||[],window.PENDING||[]).find(u=>u.ticker==='NVDA');const S=window.SIM||{},C=window.CONFIG||{};
  let d=md(S.betDate||C.betDate);if(d)return nyClose(d);if(!nv)return null;d=md(nv.called);if(!d)return null;
  do{d=new Date(d.getTime()+864e5)}while(d.getUTCDay()===0||d.getUTCDay()===6);return nyClose(d)}
function left(){const at=betAt();if(!at)return null;const s=Math.max(0,Math.floor((at-Date.now())/1e3));return {d:Math.floor(s/86400),h:Math.floor(s%86400/3600),m:Math.floor(s%3600/60)}}
function bet(){
  const S=window.SIM||{},share=S.poolShare!=null?Math.round(S.poolShare*100):69,at=betAt(),L=left();
  const day=at?new Date(at).toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric',timeZone:'America/New_York'}):'';
  return `<section class="z2-gs" aria-label="Bet number 1, NVIDIA">
   <div class="z2-gs-top"><span class="z2-gs-k">Giant-size special</span><span class="z2-gs-cd" role="timer" aria-label="Time until the NVIDIA bet">${L?`<b>${L.d}</b><small>days</small><b>${L.h}</b><small>hrs</small><b>${L.m}</b><small>min</small>`:'<b>Soon</b>'}</span></div>
   <h2 class="z2-h z2-gs-h">Bet #1: NVIDIA</h2>
   <p class="z2-gs-d">The first of many.${day?' At the close, '+ESC(day)+'.':''}</p>
   <div class="z2-gs-art" aria-hidden="true">
     <span class="z2-gs-hero">${face(lead,'z2-gold')}<span class="z2-tix">Golden ticket</span><b>${NM[lead]}</b></span>
     <span class="z2-gs-vs">makes the call on</span>
     <span class="z2-gs-nv"><span class="z2-krk"></span><svg viewBox="0 0 24 24"><path d="${NVIDIA_D}"/></svg><b>NVIDIA</b></span>
   </div>
   <ol class="z2-gs-l">
     <li><p class="z2-cap">${share}% of $EZ creator fees fill the pool.</p></li>
     <li><p class="z2-cap">We bet the pool on the golden ticket holder's call. Today that's <b>${NM[lead]}</b>.</p></li>
     <li class="z2-gs-rw"><p class="z2-sfx2 z2-up"><b>Right:</b> $EZ buyback.</p><p class="z2-sfx2 z2-dn"><b>Wrong:</b> the pool can be wiped out.</p></li>
   </ol>
   <p class="z2-gs-n">NVIDIA is the first bet, not the last. Season 2 brings more.</p>
  </section>`;
}

/* ---------- 7. the indicia ---------- */
function indicia(){
  return `<div class="z2-ind" role="contentinfo"><p><b>Earnings Zeason</b>, Vol. 1, No. ${G.length}, ${dayS(last.resolves,{month:'long',year:'numeric'})}. P&amp;L is simulated: $100,000 each, the whole balance on every call, no leverage, before fees. $EZ is a memecoin. Nothing here is financial advice or a promise of value, return or payout.</p>
   <a class="z2-x" href="${ESC((window.CONFIG||{}).x||'https://x.com/earningszn')}" target="_blank" rel="noopener">Follow the story on X</a></div>`;
}

/* ---------- build ---------- */
const main=D.querySelector('main');
const root=D.createElement('div');root.id='z2-book';root.className='z2';
root.innerHTML=cover()+origin()+handbook()+backIssues()+'<div class="z2-duo">'+nextIssue()+bet()+'</div>'+indicia();
main.prepend(root);H.classList.add('z2-on');
const vt=D.querySelector('.x2p-vt');if(vt)root.querySelector('#z2Film').append(vt);
/* logos never drawn larger than their native pixels at DPR 2 */
root.querySelectorAll('img[data-native]').forEach(im=>{const f=()=>{if(im.naturalWidth){im.style.setProperty('--nw',im.naturalWidth/2+'px');im.style.setProperty('--nh',im.naturalHeight/2+'px')}};im.complete?f():im.addEventListener('load',f)});
const bkl=root.querySelector('.z2-bkl'),more=root.querySelector('.z2-more');
more.addEventListener('click',()=>{const o=bkl.classList.toggle('z2-open');more.textContent=o?'Show fewer':`Show all ${G.length} issues`});
/* the grading page stamps on comprehension: once panel 3 is fully in view, after a beat */
const p3=root.querySelector('.z2-p3');
if(p3&&'IntersectionObserver' in window){const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.intersectionRatio>.85){setTimeout(()=>p3.classList.add('z2-go'),700);io.disconnect()}})},{threshold:[.85]});io.observe(p3)}else if(p3)p3.classList.add('z2-go');
/* the countdown: minutes only, so the words never jitter */
setInterval(()=>{const L=left(),c=root.querySelector('.z2-gs-cd');if(L&&c)c.innerHTML=`<b>${L.d}</b><small>days</small><b>${L.h}</b><small>hrs</small><b>${L.m}</b><small>min</small>`},60000);
window.__z2Go=()=>{if(p3)p3.classList.add('z2-go')};
H.classList.add('z2-ready');
})();
