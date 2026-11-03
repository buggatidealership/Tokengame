/* lb2/h38 · the race board in other worlds (round H38, mockup overlay). One builder for every take: the same content as take C
   (race on P&L or hit rate, Season / 24h / 7 days, each AI's place from the start line, the leader and the gap, the timing tower,
   the pit wall), dressed by each take's own world (cfg + its css). Every figure comes from LBD.data() (lb/_d.js), nothing is typed.
   cfg: {id, img:prefix of the painted files, lane:'ground', bar:true (lanes are bars, no runner), words:{...}, lead(a,b,va,vb,w,mt,d), pit(m,x), lampCls} */
(function(){window.R38=window.R38||{};
const IMG='tools/concepts/worlds/comic/story/h/lb2/h38/img/';
R38.IMG=IMG;
R38.build=function(host,d,cfg){
  const {esc,$f,$k,pc,patch,mark,plate,lamps,sw,wireSw,flip,RM}=LBD;const {M,WS}=d,W=cfg.words;let wk='season',mt='pnl';
  const order=()=>d.rank(wk,mt==='hit'?'hit':'pnl');
  const val=m=>mt==='hit'?M[m].win[wk].hit:(M[m].win[wk].n?M[m].win[wk].pnl:null);
  function scale(){if(mt==='hit')return {lo:.3,hi:.8,start:.5,ticks:[.3,.4,.5,.6,.7,.8],fmt:v=>Math.round(v*100)+'%'};
    const vs=Object.keys(M).map(val).filter(v=>v!=null);let lo=Math.min(0,...vs),hi=Math.max(0,...vs);
    const span=Math.max(hi-lo,20000),st=[10000,25000,50000,100000].find(s=>span/s<=6)||100000;
    lo=Math.floor((lo-span*.06)/st)*st;hi=Math.ceil((hi+span*.06)/st)*st;const t=[];for(let v=lo;v<=hi+1;v+=st)t.push(v);
    return {lo,hi,start:0,ticks:t,fmt:v=>v===0?'$0':(v<0?'−':'+')+'$'+Math.abs(v/1000)+'K'}}
  const X=(v,s)=>(cfg.x0||12)+(v-s.lo)/(s.hi-s.lo)*(cfg.xs||76);
  const sprite=m=>cfg.img?`<img class="r-spr" src="${IMG}${cfg.img}-${m.toLowerCase()}.png" alt="" decoding="async">`:'';
  function lane(m,i){const x=M[m];return `<div class="r-ln" data-m="${m}" style="--u:${x.c};--i:${i}">
      <i class="r-gr"></i><span class="r-nm"><span class="r-nmk">${mark(m,cfg.markInk||x.c)}</span><b>${esc(x.name)}</b></span>
      <i class="r-trail"></i><span class="r-car" title="${esc(x.full)}">${cfg.bar?'':sprite(m)}</span>
      <b class="lb-n r-val"></b></div>`}
  function trow(m){const x=M[m];return `<li class="r-tw" data-m="${m}" style="--u:${x.c}"><span class="r-pos lb-n">1</span>
      <span class="r-who"><span class="r-tmk">${mark(m,cfg.towerInk||x.c)}</span><b>${esc(x.name)}</b>${patch(x.cc,20)}</span>
      <b class="lb-n r-gap"></b><b class="lb-n r-wl"></b><b class="lb-n r-hit"></b></li>`}
  const pitDef=(m,x)=>`<div class="r-pit" data-m="${m}" style="--u:${x.c}">
      <div class="r-ph"><span class="r-tmk">${mark(m,cfg.pitInk||x.c)}</span><b>${esc(x.name)}</b><small>${esc(x.ver)}</small>${patch(x.cc,20)}</div>
      <div class="r-pr"><span class="lb-lab">${W.bw||'Biggest W'}</span><span class="r-tr2">${plate(x.bw)}<b class="lb-n up">${$k(x.bw.v)}</b></span></div>
      <div class="r-pr"><span class="lb-lab">${W.bl||'Biggest L'}</span><span class="r-tr2">${plate(x.bl)}<b class="lb-n dn">${$k(x.bl.v)}</b></span></div>
      <div class="r-pr"><span class="lb-lab">${W.sec||'Best sector'}</span><span class="r-sec">${x.sec?`<b>${esc(x.sec.name)}</b> <span class="lb-n ${x.sec.p<0?'dn':'up'}">${$k(x.sec.p)}</span>`:'–'}</span></div>
      <div class="r-pr"><span class="lb-lab">Last 5</span>${lamps(x.l5)}</div></div>`;
  const pit=m=>(cfg.pit||pitDef)(m,M[m]);
  const root=host.closest('#lbx')||host;root.classList.add('r38','r38-'+cfg.id);
  host.innerHTML=`${cfg.top?cfg.top(d):''}<p class="lb-cap r-cap">Season 1 · ${d.N} rounds graded · $100K on every trade</p>
    <div class="r-lead" aria-live="polite"><span class="r-bug">${W.bug||'Round '+d.N}</span><div class="r-lt"></div></div>
    <div class="r-ctl"><span class="r-cg"><span class="lb-swl">${W.raceOn||'Race on'}</span>${sw('Race on',[{k:'pnl',t:'P&L'},{k:'hit',t:'Hit rate'}],mt,'r-m')}</span>${sw('Window',[{k:'season',t:'Season'},{k:'d1',t:'24h'},{k:'d7',t:'7 days'}],wk,'r-w')}</div>
    <div class="r-grid"><div class="r-board"><div class="r-ax"></div><div class="r-lanes">${order().map(lane).join('')}</div><p class="r-when"></p></div>
      <div class="r-tower"><div class="r-tt">${W.tower}</div><div class="r-th"><span>Pos</span><span>Model</span><span>Gap</span><span>W-L</span><span>Hit</span></div><ol class="r-tws">${order().map(trow).join('')}</ol></div></div>
    <h3 class="r-pw">${W.pit}</h3><div class="r-pits">${order().map(pit).join('')}</div>
    <p class="lb-fine">Flat $100,000 on every trade, long on up and short on down, no leverage, before fees. Simulated. Gap = to the model one place ahead. 24h = rounds graded at their exchange's close in the last 24 hours; 7 days = ${esc(WS.d7.when)}. Best sector = most P&L, 3 trades or more.</p>`;
  const lanes=host.querySelector('.r-lanes'),tws=host.querySelector('.r-tws'),pits=host.querySelector('.r-pits');
  function draw(anim){const o=order(),s=scale(),w=WS[wk];root.dataset.mt=mt;
    host.querySelector('.r-ax').innerHTML=s.ticks.map(t=>`<span class="r-tk${t===s.start?' r-t0':''}" style="left:${X(t,s).toFixed(2)}%"><b>${s.fmt(t)}</b></span>`).join('')+
      `<i class="r-sl" style="left:${X(s.start,s).toFixed(2)}%"></i>`;
    root.style.setProperty('--x0',X(s.start,s).toFixed(2)+'%');
    if(anim){flip(lanes,o,'data-m');flip(tws,o,'data-m');flip(pits,o,'data-m')}else o.forEach(m=>{[lanes,tws,pits].forEach(p=>p.appendChild(p.querySelector(`[data-m="${m}"]`)))});
    o.forEach((m,i)=>{const v=val(m),ln=lanes.querySelector(`[data-m="${m}"]`),x0=X(s.start,s),x=v==null?x0:X(v,s),neg=v!=null&&v<s.start;
      ln.style.setProperty('--x',x.toFixed(2)+'%');ln.style.setProperty('--a',Math.min(x,x0).toFixed(2)+'%');ln.style.setProperty('--w',Math.abs(x-x0).toFixed(2)+'%');ln.style.setProperty('--i',i);
      ln.classList.toggle('neg',neg);ln.classList.toggle('nil',v==null);ln.classList.toggle('r-1',i===0);ln.classList.toggle('lft',x<38);
      ln.querySelector('.r-val').textContent=v==null?(mt==='hit'?'under 5 trades':'no close'):mt==='hit'?pc(v):$f(v);
      const tw=tws.querySelector(`[data-m="${m}"]`),x2=M[m].win[wk];tw.querySelector('.r-pos').textContent=i+1;tw.classList.toggle('r-1',i===0);
      const pv=i?val(o[i-1]):null,g=tw.querySelector('.r-gap');g.textContent=i===0?'Leader':(v==null||pv==null)?'–':mt==='hit'?'−'+Math.round((pv-v)*1000)/10+'%':$f(v-pv);
      g.className='lb-n r-gap'+(i===0?' r-ldr':'');
      tw.querySelector('.r-wl').innerHTML=`<span class="up">${x2.W}</span>-<span class="dn">${x2.L}</span>`;tw.querySelector('.r-hit').textContent=x2.hit==null?'–':pc(x2.hit)});
    host.querySelector('.r-when').innerHTML=`<span class="r-key"><i></i>${mt==='hit'?(W.startHit||'Coin flip, 50%'):(W.start||'Start, $0')}</span><span>${(mt==='hit'?'Hit rate · ':'')+esc(w.t)+' · '+esc(w.when)}</span>`;
    const a=M[o[0]],b=M[o[1]],va=val(a.m),vb=val(b.m);
    host.querySelector('.r-lt').innerHTML=cfg.lead?cfg.lead(a,b,va,vb,w,mt,wk):(va==null)?`<b class="r-l1">No close</b><span>in the last 24 hours</span>`:
      `<b class="r-l1" style="color:${a.c}">${esc(a.name)}</b><b class="lb-n r-l2 ${mt==='hit'||va>=0?'up':'dn'}">${mt==='hit'?pc(va):$f(va)}</b><span>${mt==='hit'?'right on direction · '+esc(b.name)+' '+pc(vb):(wk==='season'?'leads by ':'takes the '+w.t.toLowerCase()+' by ')+$f(va-vb).replace('+','')}</span>`;
    cfg.after&&cfg.after(host,o,mt,wk)}
  wireSw(host,(g,k)=>{if(g.classList.contains('r-w'))wk=k;else mt=k;draw(!RM())});
  draw(false);
  window['__LB'+cfg.id.toUpperCase()]=k=>{const t=host.querySelector(`.lb-sw button[data-k="${k}"]`);t&&t.click()};
};
})();
