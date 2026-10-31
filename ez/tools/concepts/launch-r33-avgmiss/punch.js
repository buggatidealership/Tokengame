/* Option 2, "Conductor's punch": a fare-stage ticket. Every AI has a strip of printed stages, 0 to 12 (stage 2 = 2 to 3% off, 12 =
   12% or more), and one stage box printed in red, "Wrong way". Every call is a hole punched through the card in its stage, so the
   dark night shows through; each AI punches its own shape, as each conductor's punch did. One common scale for all four, so the eye
   compares positions (Cleveland and McGill). The average is a printed caret under the strip: red ink, hot-foil gold for the leader. */
var A=window.__xam,ST=13,SHP={GROK:'c',GPT:'d',CLAUDE:'s',KIMI:'t'};
var shape=function(k,x,y,r,rot){x=+x;y=+y;r=+r;var f=function(v){return v.toFixed(2)};if(k==='d')return '<path d="M'+f(x)+','+f(y-r*1.25)+'L'+f(x+r*1.05)+','+f(y)+'L'+f(x)+','+f(y+r*1.25)+'L'+f(x-r*1.05)+','+f(y)+'Z"/>';
  if(k==='s'){var q=r*.9;return '<rect x="'+f(x-q)+'" y="'+f(y-q)+'" width="'+f(2*q)+'" height="'+f(2*q)+'" rx=".35" transform="rotate('+rot+' '+f(x)+' '+f(y)+')"/>'}
  if(k==='t'){var h=r*1.2;return '<path d="M'+f(x)+','+f(y-h)+'L'+f(x+h*.95)+','+f(y+h*.7)+'L'+f(x-h*.95)+','+f(y+h*.7)+'Z" transform="rotate('+rot+' '+f(x)+' '+f(y)+')"/>'}
  return '<circle cx="'+f(x)+'" cy="'+f(y)+'" r="'+f(r)+'"/>'};
function strip(m,j,lead,W,H){var s=A.S[m],ww=Math.max(34,W*.13),gap=5,sw=(W-ww-gap)/ST,bins=[];for(var k=0;k<ST;k++)bins.push([]);var wrong=[];
  s.calls.forEach(function(c,i){if(c.ok)bins[Math.min(ST-1,Math.floor(c.off))].push(i);else wrong.push(i)});
  /* the holes in a box: as many columns as fit, rows down from the stage number; the pitch shrinks only if a box would overflow */
  var lay=function(ix,x0,bw){var n=ix.length;if(!n)return '';var r=Math.min(2.5,bw/7),p=r*2+1.6,cols=Math.max(1,Math.floor((bw-3)/p)),rows=Math.ceil(n/cols);
      while(10+rows*p>H-2&&r>1.2){r-=.15;p=r*2+1.4;cols=Math.max(1,Math.floor((bw-3)/p));rows=Math.ceil(n/cols)}
      var out='';ix.forEach(function(ci,q){var cx=x0+(bw-Math.min(n,cols)*p)/2+p/2+(q%cols)*p+(((ci*7)%5)-2)*.12,cy=11+r+Math.floor(q/cols)*p+(((ci*11)%5)-2)*.12;
        out+=shape(SHP[m]||'c',cx.toFixed(2),cy.toFixed(2),r.toFixed(2),((ci*29)%40)-20)});return out};
  var lines='',nums='',holes='';
  for(var k=0;k<ST;k++){var x=k*sw;lines+='<rect x="'+(x+.4).toFixed(2)+'" y=".4" width="'+(sw-.8).toFixed(2)+'" height="'+(H-.8)+'"/>';
    nums+='<text x="'+(x+sw/2).toFixed(2)+'" y="8.2">'+(k===ST-1?'12+':k)+'</text>';holes+=lay(bins[k],x,sw)}
  var wx=W-ww;holes+=lay(wrong,wx,ww);
  var av=Math.min(s.miss,ST)/ST*(ST*sw),car=lead?
    '<path d="M'+av.toFixed(2)+','+(H+1.5)+'l4,6.2h-8z" fill="rgba(255,250,232,.9)" transform="translate(0,.6)"/><path d="M'+av.toFixed(2)+','+(H+1.5)+'l4,6.2h-8z" fill="rgba(70,42,6,.55)" transform="translate(0,-.45)"/><path d="M'+av.toFixed(2)+','+(H+1.5)+'l4,6.2h-8z" fill="url(#xamp'+j+'g)" filter="url(#xamp'+j+'n)"/>':
    '<path d="M'+av.toFixed(2)+','+(H+1.5)+'l4,6.2h-8z" fill="rgba(176,36,28,.9)" style="mix-blend-mode:multiply"/>';
  return '<svg class="xam-st" width="'+W+'" height="'+(H+9)+'" viewBox="0 0 '+W+' '+(H+9)+'" aria-hidden="true" focusable="false"><defs>'+
    '<linearGradient id="xamp'+j+'g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6dc93"/><stop offset=".35" stop-color="#e4b54a"/><stop offset=".6" stop-color="#c99227"/><stop offset="1" stop-color="#e7bd5b"/></linearGradient>'+
    '<filter id="xamp'+j+'n" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="7" result="n"/><feColorMatrix in="n" type="saturate" values="0" result="g"/><feComponentTransfer in="g" result="h"><feFuncR type="linear" slope=".38" intercept=".7"/><feFuncG type="linear" slope=".38" intercept=".7"/><feFuncB type="linear" slope=".38" intercept=".7"/></feComponentTransfer><feBlend in="SourceGraphic" in2="h" mode="multiply" result="b"/><feComposite in="b" in2="SourceGraphic" operator="in"/></filter>'+
    '<filter id="xamp'+j+'r" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="'+(j+9)+'" result="t"/><feDisplacementMap in="SourceGraphic" in2="t" scale=".8" xChannelSelector="R" yChannelSelector="G"/></filter></defs>'+
    /* the printed stages: hairlines and numbers in ink; the wrong-way box in red ink */
    '<g style="mix-blend-mode:multiply" filter="url(#xamp'+j+'r)"><g fill="none" stroke="rgba(20,18,23,.5)" stroke-width=".7">'+lines+'</g>'+
    '<rect x="'+(wx+.4).toFixed(2)+'" y=".4" width="'+(ww-.8).toFixed(2)+'" height="'+(H-.8)+'" fill="rgba(200,55,42,.07)" stroke="rgba(176,36,28,.8)" stroke-width=".8"/>'+
    '<g class="xam-sn">'+nums+'</g><text class="xam-wn" x="'+(wx+ww/2).toFixed(2)+'" y="8.2">Wrong way</text></g>'+
    /* the punches: the night through the hole, the cut edge's pale fibres below, its wall in shadow above */
    '<g fill="rgba(255,248,230,.95)" transform="translate(.25,.85)">'+holes+'</g><g fill="rgba(58,38,16,.7)" transform="translate(-.15,-.5)">'+holes+'</g><g fill="#0b0a14">'+holes+'</g><g fill="none" stroke="rgba(255,255,255,.07)" stroke-width=".5">'+holes+'</g>'+car+'</svg>'}
function draw(){var w=A.body.clientWidth||300,H=Math.max(38,Math.min(68,Math.floor((A.body.clientHeight-66-4*33)/4)));
  A.put('xam-punch','<div class="xam-ph"><span>One punch per call</span><span>Stage = % off</span></div>'+A.byMiss.map(function(m,i){var s=A.S[m];
      return '<div class="xam-row"><div class="xam-rh">'+A.who(m,i)+'<span class="xam-av"><span class="xam-k">avg</span>'+(i?A.pct(s.miss)+' off':A.fo(A.pct(s.miss)+' off'))+'</span></div>'+strip(m,i,!i,Math.floor(w),H)+'</div>'}).join('')+
    '<p class="pt-cp">Stage 2 means 2 to 3% off. Each AI punches its own shape. The caret is its average.</p>')}
draw();
