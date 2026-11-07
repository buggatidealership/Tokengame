/* T2 Test your skill, pop art (gpt-image-2 paintings, Lichtenstein ink).
   Smart or lucky: the fairground booth (painted) opens the section; the chart hangs on the booth's velvet backboard (painted,
   bulbs top and bottom); under it each AI swings a hand-drawn high striker: the puck stops at its hit rate, the bell is out of
   reach, and the gold line on every post is the coin (50%).
   Leaderboard: the gloves collide over the bill (painted); the tape is a pop page of fighters; the proof on the night sky
   (painted), Target hits at the shooting gallery (painted). */
(function(){const Q=PQ,X=PQX,{NM,col,mark,founder,flag,torn,burst,coin}=Q;const I='tools/concepts/worlds/comic/story/h/proof/img/';
/* a high striker drawn as its own shapes: post with a scale, a puck at the rate, a bell, the coin line */
const striker=(m,rate,i)=>{const y=v=>(172-(Math.max(.3,Math.min(.8,v))-.3)/.5*150).toFixed(1);return `<svg class="t2-hs" viewBox="0 0 60 200" aria-hidden="true">
  <path d="M22 26 L38 26 L39 186 L21 186Z" fill="#f2e3b8" stroke="#0d0b10" stroke-width="2.4"/>${[...Array(11)].map((_,k)=>`<path d="M22 ${(172-k*15).toFixed(1)} h${k%2?6:10}" stroke="#0d0b10" stroke-width="1.6"/>`).join('')}
  <path d="M24 ${y(rate)} L36 ${y(rate)} L39 186 L21 186Z" fill="${col(m)}" opacity=".9"/><path d="M14 ${y(.5)} L46 ${y(.5)}" stroke="#0d0b10" stroke-width="5"/><path d="M14 ${y(.5)} L46 ${y(.5)}" stroke="#f5c542" stroke-width="2.6"/>
  <path d="M18 18 Q30 2 42 18 L44 24 L16 24Z" fill="#f5c542" stroke="#0d0b10" stroke-width="2.4"/><path d="M22 14 Q27 8 32 9" stroke="#fff7d0" stroke-width="2" fill="none" stroke-linecap="round"/>
  <g transform="translate(30 ${y(rate)}) rotate(${(Q.rnd(i)*10-5).toFixed(1)})"><path d="M-15 -8 L15 -8 L13 8 L-13 8Z" fill="#ffe14d" stroke="#0d0b10" stroke-width="2.4"/><path d="M-11 -5 L9 -5" stroke="#fff" stroke-width="2" stroke-linecap="round"/></g>
  <path d="M4 186 L56 186 L58 196 L2 196Z" fill="#c8262d" stroke="#0d0b10" stroke-width="2.4"/></svg>`};
window.PQT={id:'t2',
 sol(D){const s=X.sol(D,{gap:12});return `<div class="t2-hero" style="--tc:${torn(4,1,5)}"><div class="t2-img" style="background-image:url(${I}s2-booth-2k.jpg)"></div>
    <h2 class="t2-h"><span class="t2-h1">Smart</span><span class="t2-h2">or lucky?</span></h2><span class="t2-cap">Step right up! A coin hits 50%.<br>Who can beat it?</span></div>
   <div class="t2-vel" style="--tc:${torn(9,.8,6)}"><div class="t2-vi" style="background-image:url(${I}s2-velvet.jpg)"></div><p class="t2-k">Hit rate, round by round<span>${coin("pqx-coi")} line = a coin, 50%</span></p>${s.chart}</div>
   <ol class="t2-hss">${s.ord.map((m,i)=>{const a=D.acc[m],q=D.seqs[m];return `<li style="--mc:${col(m)}" class="${i===0?'t2-1':''}">${striker(m,a.rate,i)}<span class="t2-who">${mark(m,'t2-wm')}<b>${NM[m]}</b></span>
     <b class="t2-hr${a.rate<.5?' t2-un':''}">${Q.pc(a.rate)}</b><small class="t2-dr">${Q.pc(q.first)} ${q.second<q.first?'↘':'↗'} ${Q.pc(q.second)}<br>1st half, 2nd half</small></li>`}).join('')}</ol>
   <p class="t2-key"><i></i>Gold line on every post: the coin, 50%</p>`},
 bill(B,D){return `<div class="t2-bw">${X.bill(B,D,{art:I+'l4-pow.jpg',vsBurst:1,vsFill:'#ffe14d'})}</div>`},
 tape(x,D){return `<div class="t2-tp" style="--tc:${torn(33,.8,6)}">${X.tape(x,D,{faces:1,title:'Tale of the tape!'})}</div>`},
 proof(D){return `<div class="t2-pfw" style="--tc:${torn(55,.8,6)}"><div class="t2-sky" style="background-image:url(${I}l4-sky.jpg)"></div><div class="t2-gal" style="background-image:url(${I}l4-gallery.jpg)"></div>${X.proof(D)}</div>`},
 dock(D){return X.dock(D,{lab:'P&amp;L over'})},
 after(lb){const r=lb.querySelector('.pq-proof');if(r&&!r.dataset.t2){r.dataset.t2=1;const w=r.querySelector('.t2-pfw');const s=()=>{if(w.dataset.on!==r.dataset.on)w.dataset.on=r.dataset.on};new MutationObserver(s).observe(r,{attributes:true,attributeFilter:['data-on']});s()}}
};})();
