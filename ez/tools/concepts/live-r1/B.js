/* B · The crawl: a broadcast ticker inside the pill. The newest results and today's card, crawling slowly; a tap or a
   hover holds it (WCAG 2.2.2), and with reduced motion it stands still and scrolls by hand */
(function(){var L=LV,items=[];
  var arr=function(a){return a<0?'<i class="lv-dn">▼'+Math.abs(a).toFixed(2)+'%</i>':'<i class="lv-up">▲'+a.toFixed(2)+'%</i>'};
  if(L.atBell.length)items.push('<em>At the bell · '+L.left()+'</em> '+L.atBell.map(function(u){return lvE(L.short(u))}).join(" · "));
  if(L.waiting.length)items.push('<em>Bell rung</em> '+L.waiting.map(function(u){return lvE(L.short(u))}).join(" · ")+' · results soon');
  if(L.due.length)items.push('<em>Today · '+L.due.length+' calls due</em> '+L.due.map(function(u){return lvE(u.co)}).join(" · "));
  else if(!L.atBell.length&&!L.waiting.length&&L.nextDay.length)items.push('<em>'+lvE(L.nextLabel.split(" ")[0])+' · '+L.nextDay.length+' on the card</em> '+L.nextDay.map(function(u){return lvE(u.co)}).join(" · "));
  var day=L.lastLabel.split(" ")[0];
  items.push('<em>'+day+' close</em> '+L.lastBatch.slice().reverse().slice(0,4).map(function(r){return lvE(L.short(r))+' '+arr(r.a)+' '+(r.win?lvE(r.win.split(" & ").map(L.nm).join(" & ")):'nobody')}).join(' · '));
  items.push('<em>'+L.graded+' graded</em> '+L.upcoming+' to come');
  var run=items.map(function(t){return '<span class="lv-b-i">'+t+'</span>'}).join('<span class="lv-b-d" aria-hidden="true">◆</span>');
  var a=lvPill("lv-b",'<span class="lv-b-bug lv-dk">The wire</span><span class="lv-b-w lv-crawl"><span class="lv-b-r">'+run+'<span class="lv-b-d">◆</span><span aria-hidden="true">'+run+'<span class="lv-b-d">◆</span></span></span></span>',"");
  a.setAttribute("aria-label",a.querySelector(".lv-b-r").textContent.split("◆").slice(0,items.length).join(". "));
  a.addEventListener("click",function(e){if(!a.classList.contains("lv-held")){e.preventDefault();a.classList.add("lv-held")}});
  var r=a.querySelector(".lv-b-r");r.style.setProperty("--lv-dur",Math.round(r.scrollWidth/2/28)+"s");
})();
