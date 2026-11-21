/* A · Sealed chips: four more chips of Bet #1's kind on the same dark bench, unlit and still in their film; Bet #1's warm light only
   touches the first one's pins. Their dies carry #2, #3, #4 and "more" as page text, pressed dark into the glass (nothing is lit yet). */
S2.go({id:'a',html({kick,tab,line}){
 const Q=[[[265,555],[495,540],[508,705],[280,718]],[[795,500],[1005,492],[1018,635],[812,645]],[[1262,460],[1475,450],[1485,572],[1300,588]],[[1675,410],[1875,405],[1895,520],[1740,540]]];
 const L=['#2','#3','#4','More'];
 const die=(q,i)=>`<b class="s2a-d${i===3?' s2a-m':''}" data-q='${JSON.stringify(q)}'>${L[i]}</b>`;
 return `${kick}<div class="s2-art s2-bleed s2a-art" data-img="tools/concepts/worlds/comic/story/h/s2bets/img/s2a-row.jpg" data-crop="[70,330,1940,570]|[40,300,1990,640]" aria-hidden="true">${Q.map(die).join('')}</div>
 <div class="s2a-ft">${tab}${line}</div>`}});
