/* T4 Chalk and print. Smart or lucky in anime cel (gpt-image-2): an empty classroom at dusk (painted) with a coin on the chalk
   tray; the chart is chalked on the board (painted), lines in coloured chalk with a dust edge, the coin line a dashed chalk rule;
   the four AIs are photos taped to the board with their marks chalked beside them, the leader circled.
   Leaderboard in two-colour risograph (gpt-image-2): the bill on poster stock with the red and green gloves (painted); the tape
   printed on the fight poster pasted to the wall (painted, its red head band and green foot band hold the title and the footer);
   the proof printed on the same stock, the targets in red ink a hair off register. */
(function(){const Q=PQ,X=PQX,{NM,col,mark,founder,flag,torn}=Q;const I='tools/concepts/worlds/comic/story/h/proof/img/';
const CH={GPT:'#9fe8c6',KIMI:'#9cc8ff',CLAUDE:'#ffc29e',GROK:'#f4f1e6'};
window.PQT={id:'t4',
 sol(D){const s=X.sol(D,{gap:12});const chart=s.chart.replace(/style="--mc:([^"]+)" d=/g,(a,c)=>a).replace(/class="pq-ln( pq-ln-lead)?" data-m="(\w+)" pathLength="1" style="--mc:[^"]+"/g,(a,l,m)=>`class="pq-ln${l||''}" data-m="${m}" pathLength="1" style="--mc:${CH[m]}"`);
   return `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="t4chalk" x="-5%" y="-20%" width="110%" height="140%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3"/><feDisplacementMap in="SourceGraphic" scale="2.6"/><feComponentTransfer><feFuncA type="table" tableValues="0 .9 .75 1"/></feComponentTransfer></filter></svg>
   <div class="t4-hero" style="--tc:${torn(2,1,5)}"><div class="t4-img" style="background-image:url(${I}s4-class.jpg)"></div><h2 class="t4-h">Smart<br><em>or</em> lucky?</h2>
    <span class="t4-cap">After class: can they beat a coin toss?</span></div>
   <div class="t4-board" style="--tc:${torn(7,.7,6)}"><div class="t4-bi" style="background-image:url(${I}s4-board.jpg)"></div><p class="t4-k">Hit rate, round by round · dashes = a coin toss</p>${chart}
    <ol class="t4-ph">${s.ord.map((m,i)=>{const a=D.acc[m],q=D.seqs[m];return `<li class="${i===0?'t4-1':''}" style="--ch:${CH[m]};--r:${(Q.rnd(i+3)*6-3).toFixed(1)}deg"><span class="t4-pol">${founder(m,'t4-pf')}<i class="t4-tape"></i></span>
      <b class="t4-nm">${NM[m]}</b><b class="t4-hr">${Q.pc(a.rate)}</b><small>${Q.pc(q.first)} → ${Q.pc(q.second)}<br>1st half → 2nd half</small></li>`}).join('')}</ol></div>`},
 bill(B,D){return `<div class="t4-bw" style="--tc:${torn(17,.7,7)}"><div class="t4-stock" style="background-image:url(${I}l2-stock.jpg)"></div>${X.bill(B,D,{h1:'Who’s winning?'}).replace('<div class="pqx-bout">','<div class="t4-gl2" style="background-image:url('+I+'l2-gloves.jpg)"></div><div class="pqx-bout">')}</div>`},
 tape(x,D){return `<div class="t4-tp" style="border-image-source:url(${I}l2-poster.jpg)">${X.tape(x,D,{faces:0,title:'Tale of the tape'})}</div>`},
 proof(D){return `<div class="t4-pfw" style="--tc:${torn(27,.6,7)}"><div class="t4-stock" style="background-image:url(${I}l2-stock.jpg)"></div>${X.proof(D)}</div>`},
 dock(D){return X.dock(D,{lab:'Print the'})}
};})();
