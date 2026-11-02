/* Take C · The race board: a broadcast of the season as a race on the board. Each model is a small chip running along its own copper
   trace, from the start line ($0, or the coin flip at 50% when the race is on hit rate) to where it stands; the trail behind it is lit
   green for profit, red for a loss. Beside it the timing tower (gap to the one ahead), under it the pit wall (biggest W and L with the
   company's logo, best sector, last 5). The window switch re-runs the race: chips slide to their new places, lanes swap on overtakes. */
(function(){window.LBT=window.LBT||{};
const {esc,$f,$k,pc,patch,mark,plate,lamps,sw,wireSw,flip,RM}=LBD;
window.LBT.c=function(host,d){
  const {M,WS}=d;let wk='season',mt='pnl';
  const order=()=>d.rank(wk,mt==='hit'?'hit':'pnl');
  const val=m=>mt==='hit'?M[m].win[wk].hit:(M[m].win[wk].n?M[m].win[wk].pnl:null);
  function scale(){if(mt==='hit')return {lo:.3,hi:.8,start:.5,ticks:[.3,.4,.5,.6,.7,.8],fmt:v=>Math.round(v*100)+'%',sl:'Coin flip'};
    const vs=Object.keys(M).map(val).filter(v=>v!=null);let lo=Math.min(0,...vs),hi=Math.max(0,...vs);
    const span=Math.max(hi-lo,20000),st=[10000,25000,50000,100000].find(s=>span/s<=6)||100000;
    lo=Math.floor((lo-span*.06)/st)*st;hi=Math.ceil((hi+span*.06)/st)*st;const t=[];for(let v=lo;v<=hi+1;v+=st)t.push(v);
    return {lo,hi,start:0,ticks:t,fmt:v=>v===0?'$0':(v<0?'−':'+')+'$'+Math.abs(v/1000)+'K',sl:'Start'}}
  /* the lane's usable run: room is kept on both ends for the figure beside the chip */
  const X=(v,s)=>14+(v-s.lo)/(s.hi-s.lo)*72;
  function lane(m){const x=M[m];return `<div class="c-ln" data-m="${m}" style="--u:${x.c}">
      <span class="c-nm"><b class="lb-n">${esc(x.NAME)}</b></span>
      <i class="c-tr"></i><i class="c-trail"></i>
      <span class="c-car" title="${esc(x.full)}"><span class="c-mk">${mark(m,'#0d0b10')}</span></span>
      <b class="lb-n c-val"></b></div>`}
  function trow(m){const x=M[m];return `<li class="c-tw" data-m="${m}" style="--u:${x.c}"><span class="c-pos lb-n">1</span>
      <span class="c-who"><span class="c-tmk">${mark(m,x.c)}</span><b class="lb-n">${esc(x.NAME)}</b>${patch(x.cc,22)}</span>
      <b class="lb-n c-gap"></b><b class="lb-n c-wl"></b><b class="lb-n c-hit"></b></li>`}
  function pit(m){const x=M[m];return `<div class="c-pit" data-m="${m}" style="--u:${x.c};--chip:url(media/chip15-${m.toLowerCase()}-1200.jpg)">
      <div class="c-ph"><span class="c-tmk">${mark(m,x.c)}</span><b class="lb-n">${esc(x.NAME)}</b><small>${esc(x.ver)}</small>${patch(x.cc,22)}</div>
      <div class="c-pr"><span class="lb-lab">Biggest W</span><span class="c-tr2">${plate(x.bw)}<b class="lb-n up">${$k(x.bw.v)}</b></span></div>
      <div class="c-pr"><span class="lb-lab">Biggest L</span><span class="c-tr2">${plate(x.bl)}<b class="lb-n dn">${$k(x.bl.v)}</b></span></div>
      <div class="c-pr"><span class="lb-lab">Best sector</span><span class="c-sec">${x.sec?`<b class="lb-n">${esc(x.sec.name)}</b> <span class="${x.sec.p<0?'dn':'up'}">${$k(x.sec.p)}</span>`:'–'}</span></div>
      <div class="c-pr"><span class="lb-lab">Last 5</span>${lamps(x.l5)}</div></div>`}
  host.innerHTML=`<p class="lb-cap c-cap">Season 1 · ${d.N} rounds graded · $100K on every trade</p>
    <div class="c-l3" aria-live="polite"><span class="c-bug lb-n">Round ${d.N}</span><div class="c-l3t"></div></div>
    <div class="c-ctl"><span class="c-cg"><span class="lb-swl">Race on</span>${sw('Race on',[{k:'pnl',t:'P&L'},{k:'hit',t:'Hit rate'}],mt,'c-m')}</span>${sw('Window',[{k:'season',t:'Season'},{k:'d1',t:'24h'},{k:'d7',t:'7 days'}],wk,'c-w')}</div>
    <div class="c-grid"><div class="c-board"><div class="c-ax"></div><div class="c-lanes">${order().map(lane).join('')}</div><p class="c-when"></p></div>
      <div class="c-tower"><div class="c-th"><span>Pos</span><span>Model</span><span class="c-gh">Gap</span><span>W-L</span><span>Hit</span></div><ol class="c-tws">${order().map(trow).join('')}</ol></div></div>
    <h3 class="c-pw">The pit wall · season</h3><div class="c-pits">${order().map(pit).join('')}</div>
    <p class="lb-fine">Flat $100,000 on every trade, long on up and short on down, no leverage, before fees. Simulated. Gap = to the model one place ahead. 24h = rounds graded at their exchange's close in the last 24 hours; 7 days = ${esc(WS.d7.when)}. Best sector = most P&L, 3 trades or more.</p>`;
  const lanes=host.querySelector('.c-lanes'),tws=host.querySelector('.c-tws'),pits=host.querySelector('.c-pits');
  function draw(anim){const o=order(),s=scale(),w=WS[wk];
    host.dataset.mt=mt;
    host.querySelector('.c-ax').innerHTML=s.ticks.map(t=>`<span class="c-tk${t===s.start?' c-t0':''}" style="left:${X(t,s).toFixed(2)}%">${s.fmt(t)}</span>`).join('')+
      `<i class="c-sl" style="left:${X(s.start,s).toFixed(2)}%"></i><span class="c-sll" style="left:${X(s.start,s).toFixed(2)}%">${s.sl}</span>`;
    host.style.setProperty('--x0',X(s.start,s).toFixed(2)+'%');
    if(anim){flip(lanes,o,'data-m');flip(tws,o,'data-m');flip(pits,o,'data-m')}else{o.forEach(m=>{lanes.appendChild(lanes.querySelector(`[data-m="${m}"]`));tws.appendChild(tws.querySelector(`[data-m="${m}"]`));pits.appendChild(pits.querySelector(`[data-m="${m}"]`))})}
    o.forEach((m,i)=>{const v=val(m),ln=lanes.querySelector(`[data-m="${m}"]`),x0=X(s.start,s),x=v==null?x0:X(v,s),neg=v!=null&&v<s.start;
      ln.style.setProperty('--x',x.toFixed(2)+'%');ln.style.setProperty('--a',Math.min(x,x0).toFixed(2)+'%');ln.style.setProperty('--w',Math.abs(x-x0).toFixed(2)+'%');
      ln.classList.toggle('neg',neg);ln.classList.toggle('nil',v==null);ln.classList.toggle('c-1',i===0);
      ln.querySelector('.c-val').textContent=v==null?(mt==='hit'?'under 5 trades':'no close'):mt==='hit'?pc(v):$f(v);
      const tw=tws.querySelector(`[data-m="${m}"]`),x2=M[m].win[wk];tw.querySelector('.c-pos').textContent=i+1;tw.classList.toggle('c-1',i===0);
      const pv=i?val(o[i-1]):null;tw.querySelector('.c-gap').textContent=i===0?'Leader':(v==null||pv==null)?'–':mt==='hit'?'−'+Math.round((pv-v)*1000)/10+'%':$f(v-pv);
      tw.querySelector('.c-gap').className='lb-n c-gap'+(i===0?' c-ldr':'');
      tw.querySelector('.c-wl').innerHTML=`<span class="up">${x2.W}</span>-<span class="dn">${x2.L}</span>`;tw.querySelector('.c-hit').textContent=x2.hit==null?'–':pc(x2.hit)});
    host.querySelector('.c-when').textContent=(mt==='hit'?'Hit rate · ':'')+w.t+' · '+w.when;
    const a=M[o[0]],b=M[o[1]],va=val(a.m),vb=val(b.m);
    host.querySelector('.c-l3t').innerHTML=(va==null)?`<b class="lb-n c-ln1">No close</b><span>in the last 24 hours · ${esc(w.when.replace(/^No close in 24h · /,''))}</span>`:
      `<b class="lb-n c-ln1" style="color:${a.c}">${esc(a.NAME)}</b><b class="lb-n c-ln2 ${mt==='hit'||va>=0?'up':'dn'}">${mt==='hit'?pc(va):$f(va)}</b><span>${mt==='hit'?'right on direction, '+b.name+' '+pc(vb):(wk==='season'?'leads by ':'takes the '+w.t.toLowerCase()+' by ')+$f(va-vb).replace('+','$').replace('$$','$')}</span>`}
  wireSw(host,(g,k)=>{if(g.classList.contains('c-w'))wk=k;else mt=k;draw(!RM())});
  draw(false);
  window.__LBC=k=>{const t=host.querySelector(`.lb-sw button[data-k="${k}"]`);t&&t.click()};
};})();
