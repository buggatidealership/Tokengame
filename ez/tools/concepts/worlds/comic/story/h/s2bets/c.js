/* C · The wafer: every bet is cut from the same wafer. Bet #1 is the die already cut out (the hole the gold light pours from); the next
   three dies in its row carry #2, #3, #4, and the rest of the wafer runs on into the dark. One small motion when it comes on screen: the
   three numbered dies catch the light one after the other, then stay as they are (the next bets, in order). */
S2.go({id:'c',html({kick,tab,line}){
 const H=[[518,398],[665,388],[688,475],[550,500]];
 const Q=[[[682,425],[787,405],[800,450],[695,472]],[[790,400],[900,380],[915,427],[802,450]],[[906,377],[1022,357],[1037,405],[917,425]]];
 return `<div class="s2c-g"><div class="s2c-w">${kick}<div class="s2c-tx">${tab}${line}</div></div>
 <div class="s2-art s2-bleed s2c-art" data-img="tools/concepts/worlds/comic/story/h/s2bets/img/s2c-wafer.jpg" data-crop="[290,130,1040,560]|[360,170,1360,780]" aria-hidden="true">
  <b class="s2c-h" data-q='${JSON.stringify(H)}'>#1</b>
  ${Q.map((q,i)=>`<b class="s2c-d" style="--i:${i}" data-q='${JSON.stringify(q)}'>#${i+2}</b>`).join('')}
 </div></div>`},
 live(box,RM){const a=box.querySelector('.s2c-art');if(RM){a.classList.add('s2-lit');return}
  const io=new IntersectionObserver(es=>{if(es[es.length-1].intersectionRatio>.55){a.classList.add('s2-lit');io.disconnect()}},{threshold:[0,.55,1]});io.observe(a)}});
