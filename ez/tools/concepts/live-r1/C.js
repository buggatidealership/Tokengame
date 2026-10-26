/* C · Departures: a split-flap board. The round number and its status flap into place when the page opens and whenever
   the status changes (calls due -> at the bell 2:51 -> rung -> graded); a tap flips to the next round on the day's card.
   No rotation on a timer. */
(function(){var L=LV,list,st;
  if(L.atBell.length){list=L.atBell;st=function(){return {s:"Bell "+L.left().replace(/ /g,""),c:"g"}}}
  else if(L.waiting.length){list=L.waiting;st=function(){return {s:"Results soon",c:"r"}}}
  else if(L.due.length){list=L.due;st=function(){return {s:"Calls due",c:"a"}}}
  else{list=L.nextDay;st=function(){return {s:L.nextLabel.split(" ")[0]+" card",c:"a"}}}
  var i=0;
  function tiles(t,n,cls){t=String(t).toUpperCase();if(n)t=t.padEnd(n," ").slice(0,n);return '<span class="lv-c-ts '+(cls||"")+'">'+t.split("").map(function(ch,j){return '<i style="--d:'+(j*45)+'ms">'+(ch===" "?"&nbsp;":lvE(ch))+'</i>'}).join("")+'</span>'}
  function html(){var u=list[i],s=st(),nm=L.short(u);
    return '<span class="lv-c-ph lv-ph">'+tiles(u.n,2)+'<span class="lv-c-x"><b>'+lvE(nm)+'</b><small class="lv-c-'+s.c+'">'+lvE(s.s)+'</small></span></span>'+
      '<span class="lv-c-dk lv-dk">'+tiles("R"+u.n,3)+tiles(nm,8,"lv-c-nm")+tiles(s.s,11,"lv-c-st lv-c-"+s.c)+'<small class="lv-c-of">'+(i+1)+'/'+list.length+'</small></span>'}
  var a=lvPill("lv-c",html(),"");
  function lab(){var u=list[i];a.setAttribute("aria-label","Round "+u.n+", "+u.co+": "+st().s+". "+(i+1)+" of "+list.length+".")}lab();
  a.addEventListener("click",function(e){if(list.length<2)return;e.preventDefault();i=(i+1)%list.length;a.innerHTML=html();lab()});
})();
