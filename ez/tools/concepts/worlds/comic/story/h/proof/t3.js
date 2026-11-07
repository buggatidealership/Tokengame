/* T3 The house, noir ink with one gold (seedream-50-pro paintings).
   Smart or lucky: the casino table under the lamp (painted) asks the question: is this a trading desk or a dice table? The chart
   is inked in gold on the felt (painted); each AI's record is a stack of its own chips, drawn chip by chip: one chip per 5% of hit
   rate, so the stacks stand side by side against a gold line at 50% (the house: a coin).
   Leaderboard: the scorekeeper's table (painted) carries the bill; the tape is the judges' scorecard on its clipboard (painted);
   the proof is inked on the felt, Target hits at the night range (painted). Founders in noir greys, gold the only colour. */
(function(){const Q=PQ,X=PQX,{NM,col,mark,founder,flag,torn}=Q;const I='tools/concepts/worlds/comic/story/h/proof/img/';
/* a stack of chips drawn one by one: ellipses with an ink rim, edge stripes and a slight sway per chip */
const stack=(m,rate,i)=>{const n=Math.round(rate*20),H=16+20*7,c=col(m)==='#15121a'?'#3a3644':col(m);let s='';for(let k=0;k<n;k++){const y=H-10-k*6.6,x=30+(Q.rnd(i*40+k)-.5)*3;
   s+=`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><ellipse cx="0" cy="3" rx="22" ry="6.4" fill="#0d0b10"/><path d="M-21.5 0 v3 a21.5 6 0 0 0 43 0 v-3" fill="${c}" stroke="#0d0b10" stroke-width="1.4"/><path d="M-16 4.2 v2.2 M-6 5.6 v2.4 M6 5.6 v2.4 M16 4.2 v2.2" stroke="#f3ead2" stroke-width="2.2"/><ellipse cx="0" cy="0" rx="21.5" ry="6" fill="${c}" stroke="#0d0b10" stroke-width="1.4"/><ellipse cx="0" cy="0" rx="13" ry="3.6" fill="none" stroke="#f3ead2" stroke-width="1.2" stroke-dasharray="3 3"/></g>`}
  const yc=H-10-10*6.6;return `<svg class="t3-st" viewBox="0 0 60 ${H+6}" aria-hidden="true">${s}<path d="M0 ${yc+3} H60" stroke="#0d0b10" stroke-width="4"/><path d="M0 ${yc+3} H60" stroke="#efe6d2" stroke-width="2.6" stroke-dasharray="1 5" stroke-linecap="round"/></svg>`};
window.PQT={id:'t3',
 sol(D){const s=X.sol(D,{gap:12});return `<div class="t3-hero" style="--tc:${torn(6,1.2,5)}"><div class="t3-img" style="background-image:url(${I}s3-table.jpg)"></div>
    <span class="t3-cap">Trading desk, or a dice table?</span><h2 class="t3-h">Smart <em>or</em> lucky?</h2></div>
   <div class="t3-felt" style="--tc:${torn(12,.8,6)}"><div class="t3-fi" style="background-image:url(${I}s3-felt.jpg)"></div><p class="t3-k">Hit rate, round by round. Dotted: a coin, 50%. Gold: the leader.</p>${s.chart}</div>
   <div class="t3-chips" style="--tc:${torn(14,.8,5)}"><div class="t3-fi" style="background-image:url(${I}s3-felt.jpg)"></div><p class="t3-k">One chip per 5% right. The house bets a coin: 10 chips.</p>
    <ol>${s.ord.map((m,i)=>{const a=D.acc[m],q=D.seqs[m];return `<li class="${i===0?'t3-1':''}" style="--mc:${col(m)}">${stack(m,a.rate,i)}<span class="t3-who">${mark(m,'t3-wm')}<b>${NM[m]}</b></span><b class="t3-hr">${Q.pc(a.rate)}</b><small>${a.W} of ${a.t}</small><small class="t3-dr">1st half ${Q.pc(q.first)}<br>2nd half ${Q.pc(q.second)}</small></li>`}).join('')}</ol></div>`},
 bill(B,D){return `<div class="t3-bw" style="--tc:${torn(21,.8,6)}">${X.bill(B,D,{art:I+'l3-table.jpg',h1:'Who’s winning?',vsBurst:0})}</div>`},
 tape(x,D){return `<div class="t3-tp" style="--tc:${torn(31,.8,6)}"><div class="t3-ti" style="background-image:url(${I}l3-card.jpg)"></div><div class="t3-sheet" style="--tc:${torn(32,.6,7)}">${X.tape(x,D,{title:'Judges’ scorecard'})}</div></div>`},
 proof(D){return `<div class="t3-pfw" style="--tc:${torn(41,.8,6)}"><div class="t3-fi" style="background-image:url(${I}s3-felt.jpg)"></div><div class="t3-rg" style="background-image:url(${I}l3-range.jpg)"></div>${X.proof(D)}</div>`},
 dock(D){return X.dock(D,{lab:'Score the'})},
 after(lb){const r=lb.querySelector('.pq-proof');if(r&&!r.dataset.t3){r.dataset.t3=1;const w=r.querySelector('.t3-pfw');const s=()=>{if(w.dataset.on!==r.dataset.on)w.dataset.on=r.dataset.on};new MutationObserver(s).observe(r,{attributes:true,attributeFilter:['data-on']});s()}}
};})();
