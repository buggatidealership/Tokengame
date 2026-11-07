/* Take A · The big board: the pro standings table built from the page's own chips. Each row is its model's chip (the live chip15
   painting as the frame: its pins, its unit-coloured board), the inside one strip of black glass split by gold traces into columns.
   Every column the owner listed; Season P&L, 24h, 7 days and Hit rate rank the board (the switch, or a tap on the column's header). */
(function(){window.LBT=window.LBT||{};
const {esc,$f,$k,pc,patch,mark,plate,lamps,sw,wireSw,flip}=LBD;
const KEYS=[{k:'season',t:'Season P&L'},{k:'d1',t:'24h'},{k:'d7',t:'7 days'},{k:'hit',t:'Hit rate'}];
window.LBT.a=function(host,d){
  const {M,WS}=d;let key='season';
  const order=()=>key==='hit'?d.rank('season','hit'):d.rank(key,'pnl');
  const val=(m,k)=>k==='hit'?M[m].hit:k==='season'?M[m].pnl:M[m].win[k].pnl;
  const maxAbs=Math.max(...Object.values(M).map(x=>Math.abs(x.pnl)));
  function lead(){const o=order(),a=M[o[0]],b=M[o[1]];
    if(key==='hit')return `<b class="a-ln">${esc(a.NAME)}</b> calls it right most often: <b class="lb-n a-lv">${pc(a.hit)}</b> <span class="a-lo">of ${a.n} trades, ${b.name} ${pc(b.hit)}</span>`;
    const va=val(a.m,key),vb=val(b.m,key),w=WS[key];
    if(key!=='season'&&!w.rs.length)return `<b class="a-ln">No close</b> in the last 24 hours <span class="a-lo">${esc(w.when.replace(/^No close in 24h · /,''))}</span>`;
    return `<b class="a-ln">${esc(a.NAME)}</b> leads${key==='season'?'':' the '+w.t.toLowerCase()} by <b class="lb-n a-lv up">${$f(va-vb).replace('+','')}</b> <span class="a-lo">over ${b.name}: ${$f(va)} to ${$f(vb)}</span>`}
  const cell=(k,lab,inner,cls)=>`<div class="a-c a-${k} ${cls||''}" data-col="${k}"><span class="lb-lab a-cl">${lab}</span>${inner}</div>`;
  function row(m){const x=M[m],w1=x.win.d1,w7=x.win.d7,gt=m===d.gold;
    const bar=`<i class="a-bar ${x.pnl<0?'n':'p'}" style="--w:${(Math.abs(x.pnl)/maxAbs*50).toFixed(1)}%"></i>`;
    const gauge=`<span class="a-gg" style="--h:${(x.hit*100).toFixed(1)}%"><i></i><b></b></span>`;
    return `<li class="a-r${gt?' a-gt':''}" data-m="${m}" style="--u:${x.c};--chip:url(media/chip15-${m.toLowerCase()}-1200.jpg)">
      <div class="a-rk"><span class="a-tab lb-n">1</span>${gt?'<span class="a-tk" title="Holds the golden ticket">Golden<br>ticket</span>':''}</div>
      <div class="a-id"><span class="a-mt">${mark(m,'#0d0b10')}</span><span class="a-nm"><b class="lb-n">${esc(x.NAME)}</b><small>${esc(x.ver)}</small></span>${patch(x.cc,30)}</div>
      ${cell('season','Season P&L',`<b class="lb-n a-big ${x.pnl<0?'dn':'up'}">${$f(x.pnl)}</b>${bar}`)}
      ${cell('d1','24h',`<b class="lb-n a-v ${w1.n?(w1.pnl<0?'dn':'up'):'a-nil'}">${w1.n?$k(w1.pnl):'–'}</b><small class="a-s">${w1.n?w1.W+'-'+w1.L:'no close'}</small>`)}
      ${cell('d7','7 days',`<b class="lb-n a-v ${w7.n?(w7.pnl<0?'dn':'up'):'a-nil'}">${w7.n?$k(w7.pnl):'–'}</b><small class="a-s">${w7.n?w7.W+'-'+w7.L:'no close'}</small>`)}
      ${cell('wl','W-L',`<b class="lb-n a-v"><span class="up">${x.W}</span>-<span class="dn">${x.L}</span></b><small class="a-s">${x.n} trades</small>`)}
      ${cell('hit','Hit rate',`<b class="lb-n a-v">${pc(x.hit)}</b>${gauge}`)}
      ${cell('l5','Last 5',lamps(x.l5))}
      ${cell('bw','Biggest W',`<span class="a-tr">${plate(x.bw)}<b class="lb-n up">${$k(x.bw.v)}</b></span>`)}
      ${cell('bl','Biggest L',`<span class="a-tr">${plate(x.bl)}<b class="lb-n dn">${$k(x.bl.v)}</b></span>`)}
      ${cell('sec','Best sector',x.sec?`<b class="a-sn">${esc(x.sec.name)}</b><small class="a-s"><span class="${x.sec.p<0?'dn':'up'}">${$k(x.sec.p)}</span> · ${x.sec.w}-${x.sec.n-x.sec.w}</small>`:'–')}
    </li>`}
  host.innerHTML=`<p class="lb-cap a-cap">Season 1 · ${d.N} rounds graded · $100K on every trade</p>
    <div class="a-top"><p class="a-lead" aria-live="polite"></p><div class="a-ctl"><span class="lb-swl">Rank by</span>${sw('Rank by',KEYS,key,'a-sw')}</div></div>
    <div class="a-hd" aria-hidden="true">${['rk','#','id','Model','season','Season P&L','d1','24h','d7','7 days','wl','W-L','hit','Hit rate','l5','Last 5','bw','Biggest W','bl','Biggest L','sec','Best sector'].reduce((s,v,i,a)=>i%2?s:s+`<span class="a-h a-h-${v}" data-col="${v}">${KEYS.some(k=>k.k===v)?`<button type="button" tabindex="-1" data-k="${v}">${a[i+1]}<i></i></button>`:a[i+1]}</span>`,'')}</div>
    <ol class="a-rows">${order().map(row).join('')}</ol>
    <p class="lb-fine">Flat $100,000 on every trade, long on up and short on down, no leverage, before fees. Simulated. 24h = rounds graded at their exchange's close in the last 24 hours; 7 days = ${esc(WS.d7.when)}. Hit rate = trades right on direction. Best sector = most P&L, 3 trades or more.</p>`;
  const rows=host.querySelector('.a-rows'),ld=host.querySelector('.a-lead');
  function apply(anim){const o=order();if(anim)flip(rows,o,'data-m');else o.forEach(m=>rows.appendChild(rows.querySelector(`[data-m="${m}"]`)));
    [...rows.children].forEach((li,i)=>{li.querySelector('.a-tab').textContent=i+1;li.classList.toggle('a-1',i===0)});
    host.dataset.key=key;ld.innerHTML=lead();
    host.querySelectorAll('.a-hd button').forEach(b=>b.classList.toggle('on',b.dataset.k===key))}
  wireSw(host,(g,k)=>{key=k;apply(true)});
  host.querySelectorAll('.a-hd button').forEach(b=>b.addEventListener('click',()=>{const t=host.querySelector(`.a-sw button[data-k="${b.dataset.k}"]`);t&&t.click()}));
  apply(false);
  window.__LBA=k=>{const t=host.querySelector(`.a-sw button[data-k="${k}"]`);t&&t.click()};
};})();
