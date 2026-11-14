/* B · The board: Bet #1 is the lit chip in the first socket of a long board; the gold bus runs on through empty sockets #2, #3, #4 and
   off the edge. Season 2 is a bracket printed above the empty sockets (it carries the tab's words, so there is no tab); the empty label boxes wait for the companies.
   One small loop: a spark runs down the bus from the lit chip through the empty sockets (the same pool, the same rule, wired to the next bets). */
S2.go({id:'b',html({kick,tab,line}){
 const SK=[[732,550,'#2'],[1096,550,'#3'],[1449,550,'#4'],[1802,550,'More']];
 return `${kick}<div class="s2-art s2-bleed s2b-art" data-img="tools/concepts/worlds/comic/story/h/s2bets/img/s2b-sockets.jpg" data-crop="[110,250,1640,540]|[0,240,2048,560]" aria-hidden="true">
  <div class="s2b-br s2b-b2" data-span="[600,1990,398]"><span>Season 2 · Next earnings season</span></div>
  <div class="s2b-lb" data-at="[294,712]"><span>NVIDIA</span></div>
  ${SK.map(([x,y,t])=>`<div class="s2b-n${t==='More'?' s2b-m':''}" data-at="[${x},${y}]"><span>${t}</span></div>`).join('')}
  <div class="s2b-bus" data-span="[468,2048,551]"><i></i></div></div>
 <div class="s2b-ft">${line}</div>`},
 live(box,RM){if(RM)return;const a=box.querySelector('.s2b-art');new IntersectionObserver(es=>a.classList.toggle('s2-run',es[es.length-1].isIntersecting)).observe(a)}});
