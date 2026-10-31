/* Option 1, "Ring die": the targets kept, but made the way a printer would: the rings are blind-debossed into the card (no ink, only
   the dark wall and the pale lip a die leaves), the ring numbers in small red ink, every right-direction call an ink dot stamped into
   the stock (multiplied, a little uneven), a call that missed the direction a red-ink x outside, and each AI's average as one ring of
   its own: dashed red ink, hot-foil gold for the leader (the only gold in the view). No white or red fills: the card is the target. */
var A=window.__xam,R=60,C=73,ga=Math.PI*(3-Math.sqrt(5));
function target(m,j,lead){var s=A.S[m],id='xamr'+j,hits='',outs='';
  s.calls.forEach(function(c,i){var a=i*ga;
    if(c.ok){var r=Math.min(c.off,12)/12*R,op=(.8+((i*37)%17)/100).toFixed(2),rr=(2.15+((i*13)%5)/10).toFixed(2);
      hits+='<circle cx="'+(C+r*Math.cos(a)).toFixed(1)+'" cy="'+(C+r*Math.sin(a)).toFixed(1)+'" r="'+rr+'" fill="rgba(24,20,18,'+op+')"/>'}
    else{var q=R+6.5+(i%3)*2,x=C+q*Math.cos(a),y=C+q*Math.sin(a),k=1.6;
      outs+='<path d="M'+(x-k).toFixed(1)+','+(y-k).toFixed(1)+'L'+(x+k).toFixed(1)+','+(y+k).toFixed(1)+'M'+(x+k).toFixed(1)+','+(y-k).toFixed(1)+'L'+(x-k).toFixed(1)+','+(y+k).toFixed(1)+'"/>'}});
  /* the die: four rings and the centre, each a groove (a faint darkening), a dark wall above it and a pale lip below it */
  var rings=[1,2,3,4].map(function(k){return k/4*R}).concat([R/12]),groove='',wall='',lip='';
  rings.forEach(function(r){var c='cx="'+C+'" cy="'+C+'" r="'+r.toFixed(2)+'"';
    groove+='<circle '+c+' fill="none" stroke="rgba(120,86,40,.24)" stroke-width="3.2"/>';
    wall+='<circle '+c+' fill="none" stroke="rgba(52,34,12,.58)" stroke-width="1.05" transform="translate(0,-.85)"/>';
    lip+='<circle '+c+' fill="none" stroke="rgba(255,252,238,1)" stroke-width="1.15" transform="translate(0,1)"/>'});
  var nums=[3,6,9,12].map(function(v,i){return '<text x="'+(C+(i+1)/4*R-3.2).toFixed(1)+'" y="'+(C+2.1)+'" text-anchor="end">'+v+'</text>'}).join('');
  var av=Math.min(s.miss,12)/12*R,ring;
  if(lead)ring='<circle cx="'+C+'" cy="'+C+'" r="'+av.toFixed(2)+'" fill="none" stroke="rgba(255,250,232,.9)" stroke-width="1.6" transform="translate(0,.55)"/>'+
    '<circle cx="'+C+'" cy="'+C+'" r="'+av.toFixed(2)+'" fill="none" stroke="rgba(70,42,6,.6)" stroke-width="1.6" transform="translate(0,-.45)"/>'+
    '<circle cx="'+C+'" cy="'+C+'" r="'+av.toFixed(2)+'" fill="none" stroke="url(#'+id+'g)" stroke-width="1.7" filter="url(#'+id+'n)"/>';
  else ring='<circle cx="'+C+'" cy="'+C+'" r="'+av.toFixed(2)+'" fill="none" stroke="rgba(176,36,28,.9)" stroke-width="1.15" stroke-dasharray="3.2 2.2" style="mix-blend-mode:multiply" filter="url(#'+id+'s)"/>';
  return '<svg viewBox="0 0 146 146" aria-hidden="true" focusable="false"><defs>'+
    '<linearGradient id="'+id+'g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6dc93"/><stop offset=".3" stop-color="#e4b54a"/><stop offset=".52" stop-color="#c99227"/><stop offset=".7" stop-color="#e7bd5b"/><stop offset="1" stop-color="#bf8a22"/></linearGradient>'+
    '<filter id="'+id+'n" x="0" y="0" width="146" height="146" filterUnits="userSpaceOnUse"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="7" result="n"/><feColorMatrix in="n" type="saturate" values="0" result="g"/><feComponentTransfer in="g" result="h"><feFuncR type="linear" slope=".38" intercept=".7"/><feFuncG type="linear" slope=".38" intercept=".7"/><feFuncB type="linear" slope=".38" intercept=".7"/></feComponentTransfer><feBlend in="SourceGraphic" in2="h" mode="multiply" result="b"/><feComposite in="b" in2="SourceGraphic" operator="in"/></filter>'+
    '<filter id="'+id+'s" x="0" y="0" width="146" height="146" filterUnits="userSpaceOnUse"><feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="2" seed="'+(j+5)+'" result="t"/><feDisplacementMap in="SourceGraphic" in2="t" scale="1.1" xChannelSelector="R" yChannelSelector="G"/></filter></defs>'+
    '<g style="mix-blend-mode:multiply">'+groove+wall+'</g><g>'+lip+'</g>'+
    '<g class="xam-rn" style="mix-blend-mode:multiply" filter="url(#'+id+'s)">'+nums+'</g>'+
    ring+'<g style="mix-blend-mode:multiply" filter="url(#'+id+'s)">'+hits+'</g>'+
    '<g style="mix-blend-mode:multiply" stroke="rgba(176,36,28,.92)" stroke-width="1.15" stroke-linecap="round" fill="none" filter="url(#'+id+'s)">'+outs+'</g></svg>'}
A.put('xam-ring','<div class="xam-grid">'+A.byMiss.map(function(m,i){var s=A.S[m];
    return '<figure><figcaption>'+A.who(m,i)+'<span class="xam-av"><span class="xam-k">avg</span>'+(i?A.pct(s.miss)+' off':A.fo(A.pct(s.miss)+' off'))+'</span></figcaption>'+target(m,i,!i)+
      '<span class="xam-ww">'+s.wrong+' wrong way</span></figure>'}).join('')+'</div>'+
  '<p class="pt-cp">The centre is what the stock did. Rings every 3% off. One ink dot per call. A red x missed the direction. The inner ring is each average.</p>');
