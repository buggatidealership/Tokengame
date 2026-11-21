/* B "Where they landed": the story is one picture. A number line from up to down, the four calls on it where they were made,
   the real move as the marker they were aiming at, and the gap from the nearest call to the move drawn and labelled. One line
   above sets it up (how they split), one line below says what happened. Positions come from the values (one scale, to the
   pixel); labels that would touch are pushed apart and keep a leader line back to their true value. */
var W=["no","one","two","three","four"];
window.__r33back=function(card,n){var F=__r33F(n);if(!F)return;var e=F.esc,nc=F.calls.length,co=e(F.co),cap=function(s){return s.charAt(0).toUpperCase()+s.slice(1)};
  var top=F.bulls.length&&F.bears.length?cap(W[F.bulls.length])+" said up. "+cap(W[F.bears.length])+" said down.":"All "+W[nc]+" said "+(F.bulls.length?"up":"down")+".";
  var w0=F.win[0];
  var end=!F.right.length?co+" went "+(F.up?"up ":"down ")+F.move+" instead. Nobody got the direction."
    :F.right.length===nc?"All "+W[nc]+" got the direction. "+F.winNames.join(" & ")+" came closest, "+F.best.toFixed(2)+"% away."
    :cap(F.up?"up":"down")+" it went. "+F.winNames.join(" & ")+" landed "+F.best.toFixed(2)+"% away, "+__r33rankLine(F)+".";
  var r=__r33fill(card,"r33b",'<p class="nl-top">'+top+'</p><div class="nl-ch" aria-hidden="true"></div><p class="nl-end">'+end+'</p><span class="nl-st"></span>');
  if(r.K.stamp)r.el.querySelector('.nl-st').appendChild(r.K.stamp);
  var ch=r.el.querySelector('.nl-ch');
  var draw=function(){var H=ch.clientHeight,Wd=ch.clientWidth;if(!H)return;
    var lo=Math.min(F.lo,0),hi=Math.max(F.hi,0),span=hi-lo||1,pad=11,y=function(v){return pad+(hi-v)/span*(H-2*pad)};
    var ax=Math.round(Wd*.42);
    /* the nearest call to the move (right way or not), for the gap */
    var near=F.calls.slice().sort(function(a,b){return Math.abs(a.v-F.a)-Math.abs(b.v-F.a)})[0];
    /* call labels on the right of the axis: by value, pushed apart to 19px */
    var L=F.calls.map(function(c){return {c:c,y:y(c.v)}}).sort(function(a,b){return a.y-b.y}),gap=19;
    for(var i=1;i<L.length;i++)if(L[i].y-L[i-1].y<gap)L[i].y=L[i-1].y+gap;
    var over=L.length?L[L.length-1].y-(H-8):0;if(over>0)for(i=L.length-1;i>=0;i--){L[i].y-=over;if(i&&L[i].y-L[i-1].y>=gap)break}
    for(i=L.length-2;i>=0;i--)if(L[i+1].y-L[i].y<gap)L[i].y=L[i+1].y-gap;
    var ym=y(F.a),y0=y(0),yn=y(near.v),h='';
    h+='<i class="nl-ax" style="left:'+ax+'px"></i><i class="nl-z" style="top:'+y0.toFixed(1)+'px;left:'+(ax-5)+'px"></i><span class="nl-zl" style="top:'+y0.toFixed(1)+'px;right:'+(Wd-ax+8)+'px">no change</span>';
    /* the gap from the nearest call to the move */
    var g0=Math.min(ym,yn),g1=Math.max(ym,yn),off=Math.abs(near.v-F.a);
    h+='<i class="nl-gap'+(near.ok?' ok':' no')+'" style="left:'+(ax-3)+'px;top:'+g0.toFixed(1)+'px;height:'+Math.max(g1-g0,1.5).toFixed(1)+'px"></i>';
    /* the move: the marker everyone was aiming at */
    h+='<span class="nl-mv '+(F.up?'nl-up':'nl-dn')+'" style="top:'+ym.toFixed(1)+'px;right:'+(Wd-ax+7)+'px"><b>'+co+'</b><em>'+(F.up?'▲':'▼')+F.move+'</em></span><i class="nl-mk '+(F.up?'nl-up':'nl-dn')+'" style="top:'+ym.toFixed(1)+'px;left:'+ax+'px"></i>';
    /* a wrong-way gap is labelled beside the axis; a right-way one is the winner's gold bar (the line below gives its size) */
    if(!near.ok&&g1-g0>40)h+='<span class="nl-gl'+(near.ok?' ok':' no')+'" style="top:'+((g0+g1)/2).toFixed(1)+'px;right:'+(Wd-ax+7)+'px">'+off.toFixed(2)+'% off<br><small>the nearest</small></span>';
    L.forEach(function(o){var c=o.c,t=y(c.v),win=F.win.some(function(w){return w.m===c.m});
      h+='<i class="nl-tk" style="top:'+t.toFixed(1)+'px;left:'+(ax-4)+'px"></i>';
      h+='<svg class="nl-ld" style="left:'+ax+'px;top:0" width="18" height="'+H+'"><path d="M0 '+t.toFixed(1)+' L10 '+o.y.toFixed(1)+' L18 '+o.y.toFixed(1)+'"/></svg>';
      h+='<span class="nl-c'+(c.ok?' ok':' no')+(win?' win':'')+'" style="top:'+o.y.toFixed(1)+'px;left:'+(ax+19)+'px">'+F.logo(c.m,'nl-lg')+'<b>'+e(c.name)+'</b><em>'+(c.up?'▲':'▼')+F.mag(c.mg)+'</em></span>'});
    ch.innerHTML=h};
  draw();if(document.fonts)document.fonts.ready.then(draw)};
