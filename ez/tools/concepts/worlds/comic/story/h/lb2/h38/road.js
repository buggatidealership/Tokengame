/* Take H · The desert road (a Wacky Races comic): every lane a panel of painted road under a painted sky, each model's own cartoon car where
   its P&L puts it; a car in the red has spun round and faces backwards; dust behind the leaders. The standings painted on a roadside sign
   are the timing tower; each model's garage panel is the pit wall. */
(function(){window.LBT=window.LBT||{};window.LBT.road=(h,d)=>R38.build(h,d,{id:'road',img:'h',
  words:{bug:'Out front',tower:'The roadside sign',pit:'The garages',start:'Start line, $0',startHit:'Start line, coin flip 50%'},
  pit:(m,x)=>{const {esc,$k,plate,mark,lamps,patch}=LBD;return `<div class="r-pit h-gar" data-m="${m}" style="--u:${x.c}">
    <div class="r-ph"><span class="r-tmk">${mark(m,'#0d0b10')}</span><b>${esc(x.name)}</b><small>${esc(x.ver)}</small>${patch(x.cc,18)}</div>
    <img class="h-car" src="${R38.IMG}h-${m.toLowerCase()}.png" alt="">
    <div class="r-pr"><span class="lb-lab">Biggest W</span><span class="r-tr2">${plate(x.bw)}<b class="lb-n up">${$k(x.bw.v)}</b></span></div>
    <div class="r-pr"><span class="lb-lab">Biggest L</span><span class="r-tr2">${plate(x.bl)}<b class="lb-n dn">${$k(x.bl.v)}</b></span></div>
    <div class="r-pr"><span class="lb-lab">Best sector</span><span class="r-sec">${x.sec?`<b>${esc(x.sec.name)}</b> <span class="lb-n ${x.sec.p<0?'dn':'up'}">${$k(x.sec.p)}</span>`:'–'}</span></div>
    <div class="r-pr"><span class="lb-lab">Last 5</span>${lamps(x.l5)}</div></div>`}})})();
