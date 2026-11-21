/* Take F · The swim meet: the season as a race in a floodlit pool (painted lanes, painted swimmers in each model's cap), the wall as the
   start line, the meet's LED scoreboard as the timing tower, and each model's starting block as its card on the pit wall. */
(function(){window.LBT=window.LBT||{};window.LBT.pool=(h,d)=>R38.build(h,d,{id:'pool',img:'f',
  words:{bug:'Touch · R'+d.N,tower:'The scoreboard',pit:'On the blocks',start:'The wall, $0',startHit:'The wall, coin flip 50%'},
  pit:(m,x)=>{const {esc,$k,plate,mark,lamps,patch}=LBD;return `<div class="r-pit f-blk" data-m="${m}" style="--u:${x.c}">
    <div class="f-top"><span class="f-no lb-n">${'GROK CLAUDE GPT KIMI'.split(' ').indexOf(m)+1}</span><span class="r-ph"><span class="r-tmk">${mark(m,x.c)}</span><b>${esc(x.name)}</b>${patch(x.cc,18)}</span></div>
    <div class="r-pr"><span class="lb-lab">Biggest W</span><span class="r-tr2">${plate(x.bw)}<b class="lb-n up">${$k(x.bw.v)}</b></span></div>
    <div class="r-pr"><span class="lb-lab">Biggest L</span><span class="r-tr2">${plate(x.bl)}<b class="lb-n dn">${$k(x.bl.v)}</b></span></div>
    <div class="r-pr"><span class="lb-lab">Best sector</span><span class="r-sec">${x.sec?`<b>${esc(x.sec.name)}</b> <span class="lb-n ${x.sec.p<0?'dn':'up'}">${$k(x.sec.p)}</span>`:'–'}</span></div>
    <div class="r-pr"><span class="lb-lab">Last 5</span>${lamps(x.l5)}</div></div>`}})})();
