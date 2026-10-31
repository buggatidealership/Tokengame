/* Option 4, "The punched card": each AI's season as a data-processing card, the kind with the digits 0 to 9 printed in every column.
   A column is a round (R1 to the latest), the row is how far off the call was (row 2 = 2 to 3% off, row 9 = 9% or more), and the call
   is a rectangular hole punched out of the printed digit, the night showing through. A call that missed the direction is punched in
   an unprinted row at the foot (real cards keep their unprinted zone rows at the top; here the top would sit the worst calls next
   to the best, so it moved down), marked once with a red x. The card's outline, cut corner and digits are
   printed in ink on the ticket; the average sits on the card's top line, hot-foil for the leader. It also shows when: later columns
   sitting lower means calls getting closer. */
var A=window.__xam;
function card(m,j,lead,W,H){var s=A.S[m],N=A.N,lab=11,cw=(W-lab-4)/N,top=1,zr=1,rows=10,rh=(H-top-6)/(rows+zr),hw=Math.max(1.6,Math.min(4.6,cw*.5)),hh=Math.min(rh*.8,5);
  var dig='',holes='',x0=lab+2,ix={};s.calls.forEach(function(c){ix[c.i]=c});
  for(var col=0;col<N;col++){var x=x0+col*cw+cw/2,c=ix[col];
    for(var r=0;r<rows;r++){var y=top+r*rh+rh/2;if(c&&c.ok&&Math.min(9,Math.floor(c.off))===r)continue;dig+='<text x="'+x.toFixed(2)+'" y="'+(y+1.55).toFixed(2)+'">'+r+'</text>'}
    if(c){var rr=c.ok?Math.min(9,Math.floor(c.off)):rows,y=top+rr*rh+rh/2,jx=(((col*7)%5)-2)*.07;
      holes+='<rect x="'+(x-hw/2+jx).toFixed(2)+'" y="'+(y-hh/2).toFixed(2)+'" width="'+hw.toFixed(2)+'" height="'+hh.toFixed(2)+'" rx=".25"/>'}}
  /* the printed row digits in the margin, the zone row's label in red, the column numbers every 5 rounds under the card */
  var side='<text class="xam-zx" x="'+(lab-1.5)+'" y="'+(top+rows*rh+rh/2+2.2).toFixed(2)+'">×</text>';for(var r=0;r<rows;r++)side+='<text x="'+(lab-1.5)+'" y="'+(top+r*rh+rh/2+1.9).toFixed(2)+'">'+r+'</text>';
  var cols='';for(var col=0;col<N;col+=5)cols+='<text x="'+(x0+col*cw+cw/2).toFixed(2)+'" y="'+(H-.6).toFixed(2)+'">'+(col+1)+'</text>';
  var outline='M'+(lab+.5)+','+(top+6)+'L'+(lab+6.5)+','+top+'H'+(W-.5)+'V'+(H-6)+'H'+(lab+.5)+'Z';
  return '<svg class="xam-cd" width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" aria-hidden="true" focusable="false">'+
    '<filter id="xamc'+j+'" x="-2%" y="-5%" width="104%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="1.5" numOctaves="2" seed="'+(j+3)+'" result="t"/><feDisplacementMap in="SourceGraphic" in2="t" scale=".55" xChannelSelector="R" yChannelSelector="G"/></filter>'+
    '<g style="mix-blend-mode:multiply" filter="url(#xamc'+j+')"><path d="'+outline+'" fill="rgba(200,170,110,.08)" stroke="rgba(20,18,23,.55)" stroke-width=".8"/>'+
    '<path d="M'+(lab+2)+','+(top+rows*rh).toFixed(2)+'H'+(W-2)+'" stroke="rgba(176,36,28,.5)" stroke-width=".6" stroke-dasharray="2 1.6"/>'+
    '<g class="xam-dg">'+dig+'</g><g class="xam-sd">'+side+'</g><g class="xam-cn">'+cols+'</g></g>'+
    '<g fill="rgba(255,248,230,.95)" transform="translate(.2,.7)">'+holes+'</g><g fill="rgba(58,38,16,.7)" transform="translate(-.1,-.45)">'+holes+'</g><g fill="#0b0a14">'+holes+'</g></svg>'}
function draw(H){var w=A.body.clientWidth||300;
  A.put('xam-card',A.byMiss.map(function(m,i){var s=A.S[m];
      return '<div class="xam-row"><div class="xam-rh">'+A.who(m,i)+'<span class="xam-av"><span class="xam-k">avg</span>'+(i?A.pct(s.miss)+' off':A.fo(A.pct(s.miss)+' off'))+'</span></div>'+card(m,i,!i,Math.floor(w),H)+'</div>'}).join('')+
    '<p class="pt-cp">A column per round, R1 to R'+A.N+'. Each hole sits on how many % off it was, closest at the top. A hole in the red row at the foot missed the direction.</p>')}
/* the cards as tall as the ticket allows: start high, step down until nothing spills */
var H0=Math.min(76,Math.floor((A.body.clientHeight-62-4*20)/4));draw(H0);for(var g=0;g<20&&A.body.scrollHeight>A.body.clientHeight+.5&&H0>40;g++){H0-=1;draw(H0)}
