/* U2 · Then / Now / Next: one ticket in three stubs: the last result, what is on today, what comes next. */
(function(){var L=LV,s=lvState(),R=s.rounds,nx=lv4.next(),r=lv4.last();
  var now={due:[R.length+" calls due","Today"],bell:["Graded · "+L.left(),"At the bell"],
    rung:["Results soon","Bell rung"],off:["Weekend","Off air"]}[s.k];
  var nowR=s.k==="off"?[]:R;
  var d=document.createElement("div");d.className="lv4 lv4-u2 lv-"+s.k;d.setAttribute("aria-label","Last result, "+r.co+" "+r.out+", "+lv4.win(r)+". "+s.aria+". Next: "+nx.wd+", "+nx.R.length+" calls.");
  d.innerHTML='<ol class="lv4-tk">'+
   '<li class="lv4-c lv4-then"><small>Last · '+lvE(L.kfmt(L.K(r.resolves),{date:false}))+'</small><span class="lv4-b">'+lvLogo(r,"lv-prt")+'<b class="'+(r.a>0?"up":"dn")+'">'+lvE(L.short(r))+' '+lvE(r.out)+'</b></span><em>'+lvE(lv4.win(r))+'</em></li>'+
   '<li class="lv4-c lv4-now"><small><i class="lv-dot"></i>'+lvE(now[1])+'</small><span class="lv4-b">'+(nowR.length?lvStack(nowR,3).replace(/lv-chip/g,"lv-prt"):'<b class="lv4-zz">Back '+lvE(nx.wds)+'</b>')+'</span><em>'+lvE(now[0])+'</em></li>'+
   '<li class="lv4-c lv4-next"><small>Next · '+lvE(nx.wds)+'</small><span class="lv4-b">'+lvStack(nx.R,3).replace(/lv-chip/g,"lv-prt")+'</span><em>'+nx.R.length+' calls</em></li></ol>';
  lv4.mount(d)})();
