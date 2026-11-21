/* live-r4 shared: a module under the explainer film, as wide as the film. Reads LV (live-r1/_model.js) and lvState (live-r3). */
window.lv4={
  mount:function(el){var vt=document.querySelector(".x2p-vt");vt.after(el);var c=getComputedStyle(vt);
    el.style.width=vt.getBoundingClientRect().width+"px";el.style.marginLeft=c.marginLeft;el.style.marginRight=c.marginRight;return el},
  /* the day a set of rounds is graded: the close of the earliest resolution date */
  res:function(R){var k=R.map(function(u){return LV.K(u.resolves)}).sort()[0];return k?(k===LV.today?"today":LV.kfmt(k,{long:1,date:false})):""},
  /* the next calls day after today, and its rounds */
  next:function(){var all=[].concat(PENDING,UPCOMING),ks=all.map(function(u){return LV.K(u.called)}).filter(function(k){return k>LV.today}).sort(),k=ks[0];
    return {k:k,R:all.filter(function(u){return LV.K(u.called)===k}),wd:k?LV.kfmt(k,{long:1,date:false}):"",wds:k?LV.kfmt(k,{date:false}):""}},
  /* the newest graded round worth naming: the biggest company of the last batch */
  last:function(){return lvBig(LV.lastBatch)[0]},
  win:function(r){return r.win?LV.nm(r.win)+" wins":"Nobody wins"},
  /* season week: weeks since the first round's call date */
  week:function(){var ks=ROUNDS.map(function(r){return LV.K(r.called)}).sort(),a=new Date(ks[0]+"T12:00:00Z"),b=new Date(LV.today+"T12:00:00Z");
    var mon=function(d){var w=d.getUTCDay();return d.getTime()-((w+6)%7)*864e5};return Math.floor((mon(b)-mon(a))/(7*864e5))+1},
  wordN:function(n){return ["no","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve"][n]||String(n)}
};
