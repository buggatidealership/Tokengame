/* Take E · The drag strip: four lanes of rubbered asphalt between the walls (painted), each model's dragster where its P&L puts it,
   the Christmas tree's lights in the leader line, the win-light scoreboard as the timing tower, and each model's timing slip as the pit wall. */
(function(){window.LBT=window.LBT||{};window.LBT.drag=(h,d)=>R38.build(h,d,{id:'drag',img:'e',
  words:{bug:'<i class="e-tree" aria-hidden="true"><i></i><i></i><i></i><i></i></i>',tower:'Win lights',pit:'Timing slips',start:'Starting line, $0',startHit:'Starting line, coin flip 50%'},
  pit:(m,x)=>{const {esc,$k,plate,mark}=LBD;return `<div class="r-pit e-slip" data-m="${m}" style="--u:${x.c}">
    <div class="r-ph"><span class="r-tmk">${mark(m,'#1b181c')}</span><b>${esc(x.name)}</b><small>${esc(x.ver)}</small></div>
    <div class="r-pr"><span class="lb-lab">Biggest W</span><span class="r-tr2">${plate(x.bw)}<b class="lb-n up">${$k(x.bw.v)}</b></span></div>
    <div class="r-pr"><span class="lb-lab">Biggest L</span><span class="r-tr2">${plate(x.bl)}<b class="lb-n dn">${$k(x.bl.v)}</b></span></div>
    <div class="r-pr"><span class="lb-lab">Best sector</span><span class="r-sec">${x.sec?`<b>${esc(x.sec.name)}</b> <span class="lb-n ${x.sec.p<0?'dn':'up'}">${$k(x.sec.p)}</span>`:'–'}</span></div>
    <div class="r-pr"><span class="lb-lab">Last 5</span><span class="e-l5" role="img" aria-label="Last 5, oldest to newest: ${x.l5.map(q=>q.w?'W':'L').join(' ')}">${x.l5.map(q=>`<i class="${q.w?'w':'l'}">${q.w?'W':'L'}</i>`).join('')}</span></div></div>`}})})();
