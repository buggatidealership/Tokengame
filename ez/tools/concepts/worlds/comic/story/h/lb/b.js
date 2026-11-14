/* Take B · Tale of the tape: the four models as fighters in their corners, left to right in the board's order, one row per stat,
   the best figure in each row ringed by hand. Each corner is the model's chip (chip15's frame) holding its founder's still.
   The fight bill's windows (Season / 24h / 7 days) and the owner's sort (P&L / Hit rate) re-order the corners. */
(function(){window.LBT=window.LBT||{};
const {esc,$f,$k,pc,patch,mark,plate,lamps,sw,wireSw,flip}=LBD;
const FND=m=>'media/founder-'+m.toLowerCase()+(m==='GROK'||m==='GPT'?'-anim2':'-anim')+'.jpg';
/* a hand-drawn loop: an ellipse that overshoots its start, as a marker would */
const RING=`<svg class="b-ring" viewBox="0 0 100 50" preserveAspectRatio="none" aria-hidden="true"><path d="M58 4.5C82 4 97 12 96 25c-1 14-24 21-49 21C21 46 3.5 38 4 25 4.6 11 25 4 47 5.5c9 .6 16 2 21 4.5" fill="none" stroke="#f8f0d9" stroke-width="2.6" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>`;
window.LBT.b=function(host,d){
  const {M,WS}=d;let wk='season',sk='pnl';
  const ROWS=[
    {k:'pnl',l:()=>WS[wk].lab,best:m=>M[m].win[wk].n?M[m].win[wk].pnl:null,v:m=>{const w=M[m].win[wk];if(!w.n)return `<b class="lb-n b-v b-nil">–</b><small class="b-s">no close</small>`;
      const mx=Math.max(1,...Object.values(M).map(x=>Math.abs(x.win[wk].pnl)));const h=(Math.abs(w.pnl)/mx*100).toFixed(1);
      return `<span class="b-sky"><i class="${w.pnl<0?'n':'p'}" style="--h:${h}%"></i></span><b class="lb-n b-v b-big b-key ${w.pnl<0?'dn':'up'}">${$f(w.pnl)}</b>`}},
    {k:'wl',l:()=>'W-L'+(wk==='season'?'':' · '+WS[wk].t.toLowerCase()),best:m=>M[m].win[wk].n?M[m].win[wk].W-M[m].win[wk].L:null,v:m=>{const w=M[m].win[wk];return `<b class="lb-n b-v b-key"><span class="up">${w.W}</span>-<span class="dn">${w.L}</span></b>`}},
    {k:'hit',l:()=>'Hit rate'+(wk==='season'?'':' · '+WS[wk].t.toLowerCase()),best:m=>M[m].win[wk].hit,v:m=>{const h=M[m].win[wk].hit;return h==null?`<b class="lb-n b-v b-nil">–</b><small class="b-s">under 5 trades</small>`:
      `<span class="b-dial" style="--a:${(h*180-90).toFixed(1)}deg"><i></i></span><b class="lb-n b-v b-key">${pc(h)}</b>`}},
    {k:'l5',l:()=>'Last 5 · newest right',v:m=>lamps(M[m].l5)},
    {k:'win',l:()=>wk==='season'?'24h  /  7 days':'Season  /  '+(wk==='d1'?'7 days':'24h'),v:m=>{const o=wk==='season'?['d1','d7']:wk==='d1'?['season','d7']:['season','d1'];
      return o.map(k=>{const w=M[m].win[k];return `<span class="b-pair"><b class="lb-n ${w.n?(w.pnl<0?'dn':'up'):'b-nil'}">${w.n?$k(w.pnl):'–'}</b></span>`}).join('')}},
    {k:'bw',l:()=>'Biggest W',best:m=>M[m].bw.v,v:m=>`${plate(M[m].bw)}<b class="lb-n up b-t b-key">${$k(M[m].bw.v)}</b>`},
    {k:'bl',l:()=>'Biggest L',best:m=>M[m].bl.v,v:m=>`${plate(M[m].bl)}<b class="lb-n dn b-t b-key">${$k(M[m].bl.v)}</b>`},
    {k:'sec',l:()=>'Best sector',v:m=>{const s=M[m].sec;return s?`<b class="b-sn">${esc(s.name)}</b><small class="b-s"><span class="${s.p<0?'dn':'up'}">${$k(s.p)}</span> · ${s.w}-${s.n-s.w}</small>`:'–'}}];
  const order=()=>d.rank(wk,sk);
  function corner(m,i){const x=M[m];
    return `<div class="b-co" data-m="${m}" style="--u:${x.c};--chip:url(media/chip15-${m.toLowerCase()}-1200.jpg)">
      <div class="b-hd" style="--rp:1;--rd:1"><div class="b-ph"><img src="${FND(m)}" alt="" decoding="async"><span class="b-rk lb-n">1</span>${m===d.gold?'<span class="b-gt">Golden ticket</span>':''}${patch(x.cc,26)}</div>
        <div class="b-id"><span class="b-mt">${mark(m,x.c)}</span><b class="lb-n b-nm">${esc(x.NAME)}</b></div><small class="b-ver">${esc(x.full)}</small></div>
      ${ROWS.map((r,j)=>`<div class="b-c b-${r.k}" data-row="${r.k}" style="--rp:${j*2+3};--rd:${j+2}"></div>`).join('')}</div>`}
  host.innerHTML=`<p class="lb-cap b-cap">Season 1 · ${d.N} rounds graded · $100K on every trade</p>
    <p class="b-lead" aria-live="polite"></p>
    <div class="b-ctl">${sw('Window',[{k:'season',t:'Season'},{k:'d1',t:'24h'},{k:'d7',t:'7 days'}],wk,'b-w')}<span class="b-ctr"><span class="lb-swl">Rank by</span>${sw('Rank by',[{k:'pnl',t:'P&L'},{k:'hit',t:'Hit rate'}],sk,'b-s2')}</span></div>
    <p class="b-when"></p>
    <div class="b-tape">${ROWS.map((r,j)=>`<div class="b-lab" data-row="${r.k}" style="--rp:${j*2+2};--rd:${j+2}"><span></span></div>`).join('')}${order().map(corner).join('')}</div>
    <p class="lb-fine">Ringed: the best in each row. Flat $100,000 on every trade, long on up and short on down, no leverage, before fees. Simulated. 24h = rounds graded at their exchange's close in the last 24 hours; 7 days = ${esc(WS.d7.when)}. Best sector = most P&L, 3 trades or more.</p>`;
  const tape=host.querySelector('.b-tape');
  function draw(anim){const o=order();
    if(anim)flip(tape,o,'data-m');else o.forEach(m=>tape.appendChild(tape.querySelector(`.b-co[data-m="${m}"]`)));
    [...tape.querySelectorAll('.b-co')].forEach((c,i)=>{c.querySelector('.b-rk').textContent=i+1;c.classList.toggle('b-1',i===0)});
    ROWS.forEach(r=>{tape.querySelector(`.b-lab[data-row="${r.k}"] span`).textContent=r.l();
      let bv=null;if(r.best)Object.keys(M).forEach(m=>{const v=r.best(m);if(v!=null&&(bv==null||v>bv))bv=v});
      Object.keys(M).forEach(m=>{const c=tape.querySelector(`.b-co[data-m="${m}"] [data-row="${r.k}"]`);const b=r.best&&bv!=null&&r.best(m)===bv;
        c.innerHTML=`<span class="b-val${b?' b-best':''}">${r.v(m)}</span>`;if(b){const k=c.querySelector('.b-key');k&&k.insertAdjacentHTML('beforeend',RING)}})});
    const a=M[o[0]],b=M[o[1]],w=WS[wk];
    host.querySelector('.b-when').textContent=w.when;
    host.querySelector('.b-lead').innerHTML=sk==='hit'?`<b class="lb-n">${esc(a.NAME)}</b> reads the market best: <b class="lb-n b-lv">${pc(a.win[wk].hit)}</b> right, ${b.name} ${pc(b.win[wk].hit)}`:
      (wk!=='season'&&!w.rs.length)?`<b class="lb-n">No close</b> in the last 24 hours. The fight resumes at the next bell.`:
      `<b class="lb-n">${esc(a.NAME)}</b> ${wk==='season'?'holds the golden ticket, ':'wins the '+w.t.toLowerCase()+', '} <b class="lb-n b-lv up">${$f(a.win[wk].pnl-b.win[wk].pnl).replace('+','')}</b> clear of ${b.name}`}
  wireSw(host,(g,k)=>{if(g.classList.contains('b-w'))wk=k;else sk=k;draw(true)});
  draw(false);
  window.__LBB=k=>{const t=host.querySelector(`.lb-sw button[data-k="${k}"]`);t&&t.click()};
};})();
