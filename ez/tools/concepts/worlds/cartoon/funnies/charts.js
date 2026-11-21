/* Hand-inked line charts for both pages: each model's line in its colour, cased in ink, its face (or its mark) where it ends.
   Draws in once when it comes into view; still with reduced motion. */
(function(){
var RM=function(){return matchMedia('(prefers-reduced-motion: reduce)').matches};
F.chart=function(host,o){var w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;
  var phone=w<420,padL=phone?42:50,padR=phone?80:90,padT=o.padT||(phone?46:52),padB=26,N=Math.max(1,o.N);
  var X=function(x){return padL+(x/N)*(w-padL-padR)},Y=function(y){return padT+(1-(y-o.ymin)/(o.ymax-o.ymin))*(h-padT-padB)};
  var ink=o.ink||'#1d1a18',halo=o.halo||'#efe2c2',id=host.id||('c'+Math.random().toString(36).slice(2,7));
  var s='<svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+F.esc(o.label||'Chart')+'">';
  o.ticks.forEach(function(t){var y=Y(t),b=t===o.base;s+='<line x1="'+padL+'" x2="'+(w-padR+8)+'" y1="'+y+'" y2="'+y+'" stroke="'+ink+'" stroke-opacity="'+(b?'.9':'.22')+'" stroke-width="'+(b?1.6:1)+'"'+(b?' stroke-dasharray="6 4"':'')+'/><text x="'+(padL-6)+'" y="'+(y+4)+'" text-anchor="end" font-family="Comic Neue" font-weight="700" font-size="11" fill="'+ink+'">'+o.axfmt(t)+'</text>'});
  (o.xl||[]).forEach(function(q){s+='<text x="'+X(q[0])+'" y="'+(h-8)+'" text-anchor="middle" font-family="Comic Neue" font-weight="700" font-size="11" fill="'+ink+'">'+F.esc(q[1])+'</text>'});
  var ends=[];
  F.ORDER.forEach(function(m){var pts=o.series[m];if(!pts||pts.length<2)return;
    var d=pts.map(function(p,i){return (i?'L':'M')+X(p.x).toFixed(1)+' '+Y(p.y).toFixed(1)}).join('');
    s+='<path class="ln" pathLength="1" d="'+d+'" fill="none" stroke="'+ink+'" stroke-width="'+(phone?4.4:5)+'" stroke-linejoin="round" stroke-linecap="round"/><path class="ln" pathLength="1" d="'+d+'" fill="none" stroke="'+F.COL[m]+'" stroke-width="'+(phone?2.4:2.8)+'" stroke-linejoin="round" stroke-linecap="round"/>';
    var last=pts[pts.length-1];ends.push({m:m,y:Y(last.y),v:last.y})});
  ends.sort(function(a,b){return a.y-b.y});for(var i=1;i<ends.length;i++)if(ends[i].y-ends[i-1].y<25)ends[i].y=ends[i-1].y+25;
  var over=ends.length?ends[ends.length-1].y-(h-padB-4):0;if(over>0)ends.forEach(function(e){e.y-=over});
  ends.forEach(function(e){var cx=w-padR+19;
    s+='<defs><clipPath id="'+id+e.m+'"><circle cx="'+cx+'" cy="'+e.y+'" r="10"/></clipPath></defs><circle cx="'+cx+'" cy="'+e.y+'" r="11.5" fill="'+F.COL[e.m]+'" stroke="'+ink+'" stroke-width="1.6"/>'+
      (o.face?'<image href="'+o.face(e.m)+'" x="'+(cx-17)+'" y="'+(e.y-12)+'" width="34" height="34" clip-path="url(#'+id+e.m+')" preserveAspectRatio="xMidYMin slice"'+(o.gray?' style="filter:grayscale(1) contrast(1.15)"':'')+'/>':'')+
      '<text x="'+(cx+15)+'" y="'+(e.y+4)+'" font-family="Comic Neue" font-weight="700" font-size="'+(phone?10.5:12.5)+'" fill="'+(o.signed?(e.v>=0?'#1f7a43':'#b52b25'):ink)+'" stroke="'+halo+'" stroke-width="3" paint-order="stroke">'+o.fmt(e.v)+'</text>'});
  s+='</svg>';host.innerHTML=s;
  if(!RM()&&!host.__drawn){host.__drawn=1;var ls=host.querySelectorAll('.ln');[].forEach.call(ls,function(p){p.style.strokeDasharray='1';p.style.strokeDashoffset='1'});
    var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){io.disconnect();[].forEach.call(host.querySelectorAll('.ln'),function(p){p.animate([{strokeDashoffset:1},{strokeDashoffset:0}],{duration:1400,easing:'cubic-bezier(.3,0,.2,1)',fill:'forwards'})})}},{threshold:.35});io.observe(host)}};
F.ticks=function(vals,step,floorTo){var mn=Math.floor(Math.min.apply(null,vals)/step)*step,mx=Math.ceil(Math.max.apply(null,vals)/step)*step,t=[];if(mx===mn)mx=mn+step;for(var v=mn;v<=mx+1e-9;v+=step)t.push(Math.round(v/step)*step);return {mn:mn,mx:mx,t:t}};
})();
