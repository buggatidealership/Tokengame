/* Option 3, "The scorer's card": a printed scoring form, the way a range officer or a darts scorer keeps one. Ruled in ink, the
   column heads set small; every call is a tally stroke rubber-stamped into its column (four strokes and a fifth across, the scorer's
   gate), black ink for how close, red ink for the wrong way. The average is the last column, pressed in ink, hot-foil for the leader.
   It reads as a count you can check at a glance: how many calls landed within 1%, 1 to 3%, 3 to 6%, further, or the wrong way. */
var A=window.__xam,BANDS=[['Within 1%',0,1],['1 to 3%',1,3],['3 to 6%',3,6],['Over 6%',6,1e9]];
function tally(n,w,red,seed){if(!n)return '<span class="xam-nil">–</span>';
  var sh=2.7,gw=sh*3+1.4,gap=4.2,per=Math.max(1,Math.floor((w+gap)/(gw+gap))),gates=[],k=n;while(k>0){gates.push(Math.min(5,k));k-=5}
  var rows=Math.ceil(gates.length/per),H=12,lh=H+4,W=w,svg='';
  gates.forEach(function(g,i){var x0=(i%per)*(gw+gap)+1,y0=Math.floor(i/per)*lh+1.5,rot=(((seed*7+i*13)%9)-4)*.7,p='';
    for(var s=0;s<Math.min(g,4);s++){var x=x0+s*sh+(((seed+i+s)*5)%3-1)*.15;p+='M'+x.toFixed(2)+','+(y0+.3).toFixed(2)+'L'+(x+.25).toFixed(2)+','+(y0+H-.2).toFixed(2)}
    if(g===5)p+='M'+(x0-1.4).toFixed(2)+','+(y0+H*.78).toFixed(2)+'L'+(x0+sh*3+1.6).toFixed(2)+','+(y0+H*.2).toFixed(2);
    svg+='<path d="'+p+'" transform="rotate('+rot.toFixed(1)+' '+(x0+gw/2).toFixed(1)+' '+(y0+H/2).toFixed(1)+')"/>'});
  return '<svg class="xam-ty" width="'+W+'" height="'+(rows*lh)+'" viewBox="0 0 '+W+' '+(rows*lh)+'" aria-hidden="true" focusable="false">'+
    '<g fill="none" stroke="'+(red?'rgba(176,36,28,.95)':'rgba(22,19,21,.92)')+'" stroke-width="1.45" stroke-linecap="round" filter="url(#xamStamp'+(seed%3)+')">'+svg+'</g></svg>'}
function draw(){var w=A.body.clientWidth||300,nw=w<280?62:w<400?80:132,aw=w<280?42:52,cw=Math.floor((w-nw-aw)/5)-6;
  var defs='<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">'+[0,1,2].map(function(k){
    /* a rubber stamp: the ink catches unevenly (voids where the rubber did not meet the card) and spreads a hair at its edge */
    return '<filter id="xamStamp'+k+'" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="'+(1.6+k*.3)+'" numOctaves="2" seed="'+(21+k*5)+'" result="n"/>'+
      '<feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.4 2.05" result="m"/><feMorphology in="SourceGraphic" operator="dilate" radius=".15" result="d"/>'+
      '<feDisplacementMap in="d" in2="n" scale="1.1" xChannelSelector="R" yChannelSelector="G" result="s"/><feComposite in="s" in2="m" operator="in"/></filter>'}).join('')+'</svg>';
  var head='<tr><th scope="col"><span class="sr">AI</span></th>'+BANDS.map(function(b){return '<th scope="col">'+b[0]+'</th>'}).join('')+'<th scope="col" class="xam-rd">Wrong way</th><th scope="col">Avg off</th></tr>';
  var rows=A.byMiss.map(function(m,i){var s=A.S[m],R=s.calls.filter(function(c){return c.ok});
    return '<tr><th scope="row">'+A.who(m,i)+'</th>'+BANDS.map(function(b,j){var n=R.filter(function(c){return c.off>=b[1]&&c.off<b[2]||(b[1]===0&&c.off===0)}).length;
        return '<td><span class="sr">'+n+'</span>'+tally(n,cw,false,i*5+j)+'</td>'}).join('')+
      '<td><span class="sr">'+s.wrong+'</span>'+tally(s.wrong,cw,true,i*5+4)+'</td><td class="xam-avc">'+(i?A.pct(s.miss):A.fo(A.pct(s.miss)))+'</td></tr>'}).join('');
  A.put('xam-stamp',defs+'<table class="xam-tb"><colgroup><col style="width:'+nw+'px">'+BANDS.map(function(){return '<col>'}).join('')+'<col><col style="width:'+aw+'px"></colgroup>'+head+rows+'</table>'+
    '<p class="pt-cp">One stroke per call, by how far off it landed. Red strokes missed the direction. Avg off counts every call.</p>')}
draw();
