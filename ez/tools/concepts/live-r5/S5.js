/* S5 · The fight card: the season as a run of week tickets. Weeks gone sit as a torn pile ("45 graded"), this week is the main event
   (big ticket, its big names, the dot), next week and the finale (NVIDIA, Bet #1, in gold) follow; late in the season Season 2 takes
   next week's place. */
(function(){var S=S5,s=lvState(),N=S.next,F=S.W[S.finWeek-1];
  function tk(cls,top,mid,foot){return '<li class="s5-tk pp '+cls+'"><small class="lab">'+top+'</small><span class="s5-m">'+mid+'</span><em class="lab">'+foot+'</em></li>'}
  var pile='<li class="s5-pile"><span class="s5-st"></span><span class="s5-st"></span><span class="s5-st pp"><small class="lab">Wk 1–'+(S.now-1)+'</small><b class="val pr">'+S.graded+'</b><small class="lab">graded</small></span></li>';
  var now=tk("s5-now",'<i class="lv-dot"></i>'+(S.late?"Final week":"This week")+' · Wk '+S.now,lvStack(S.cur.big,4).replace(/lv-chip/g,"lv-prt"),S.cur.R.length+" calls");
  var nx=S.late?tk("s5-s2","Next",'<b class="pr">Season 2</b>',"Mag 7 + more"):(N&&N.n!==S.finWeek?tk("s5-nx","Wk "+N.n,lvStack(N.big,2).replace(/lv-chip/g,"lv-prt"),N.R.length+" calls"):"");
  var fin=S.late?"":tk("s5-fin","Finale · Wk "+S.finWeek,lvLogo(S.fin,"lv-prt"),'<b class="gold">Bet #1</b>');
  var d=document.createElement("div");d.className="lv5 s5 lv-"+s.k+(S.late?" late":"");d.setAttribute("aria-label","Season 1, week "+S.now+" of "+S.weeks+". "+S.graded+" of "+S.total+" graded.");
  d.innerHTML='<div class="s5-hd"><b class="val">Season 1 · Week '+S.now+' <i>of '+S.weeks+'</i></b><span class="s5-bar"><i style="width:'+(S.pct*100).toFixed(1)+'%"></i></span><span class="lab">'+S.graded+'/'+S.total+'</span></div><ol class="s5-l">'+pile+now+nx+fin+'</ol>';
  lv4.mount(d)})();
