/* r1041 shared (owner, 2026-10-28): the strip under the film as a breathing timeline, in new shapes. Content in the owner's words:
   Last round (who won, what they made, on which company), Today (on air / off air, the three biggest companies), Next (the two biggest),
   and the Season 1 bar (rounds graded of all rounds, NVIDIA's bet at the end). Reads LV, lvState, lv4, lvBig, lvLogo, __x2pPnl.
   Four live marks other than the antenna: lightbox, tally, meter, bug. */
window.q41=(function(){var L=LV,s=lvState(),all=[].concat(ROUNDS,PENDING,UPCOMING),nx=lv4.next(),P=window.__x2pPnl();
 /* the last round as of the moment: the newest resolution day before today (the sheet already holds later results), its biggest company */
 var G=ROUNDS.filter(function(u){return u.resolves&&L.K(u.resolves)<L.today}),lk=G.reduce(function(a,u){var k=L.K(u.resolves);return k>a?k:a},"0000"),
     r=lvBig(G.filter(function(u){return L.K(u.resolves)===lk}))[0];
 var wins=String(r.win||"").split(/\s*&\s*/).filter(Boolean),who=wins[0],pn;
 if(who)pn=P.A[who].per[r.n].v;else{who=r.calls.map(function(c){return c[0]}).sort(function(a,b){return P.A[b].per[r.n].v-P.A[a].per[r.n].v})[0];pn=P.A[who].per[r.n].v}
 var bell=s.k==="bell"||s.k==="rung",inb=function(u){return bell&&s.rounds.indexOf(u)>-1};
 var graded=ROUNDS.filter(function(u){return u.resolves&&L.K(u.resolves)<=L.today&&!inb(u)}).length;
 var preds=all.filter(function(u){return L.K(u.called)===L.today}),res=bell?s.rounds:[];
 var pl=function(n,w){return n+" "+w+(n===1?"":"s")};
 var now=s.k==="due"?{R:preds,v:pl(preds.length,"prediction"),s:"Before the reports"}
  :s.k==="bell"?{R:res,v:pl(res.length,"resolution"),s:"At the close · "+L.left()}
  :s.k==="rung"?{R:res,v:"Results soon",s:"The bell has rung"}
  :{R:[],v:"Back "+nx.wds,s:pl(nx.R.length,"prediction")};
 var nv=all.filter(function(u){return /NVDA/.test(u.ticker)})[0];
 var INK={GPT:"#1b181c",KIMI:"#1b181c",GROK:"#1b181c",CLAUDE:"#d97757"};
 var ai=function(m,cls,col){var M=MODELS[m];return '<svg class="q41-ai '+(cls||"")+'" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="'+(M.fr||"nonzero")+'" fill="'+(col||INK[m]||"#1b181c")+'" d="'+M.d+'"/></svg>'};
 var lg=function(R,n){return '<span class="q41-lgs">'+lvBig(R).slice(0,n).map(function(u){return lvLogo(u,"q41-lg")}).join("")+"</span>"};
 /* the live marks; lit and moving only on air */
 var mark=function(k,on){var w=on?"On air":"Off air",c="q41-mk q41-"+k+(on?" on":"");
  if(k==="lx")return '<span class="'+c+'"><b>'+w+'</b></span>';
  if(k==="ty")return '<span class="'+c+'"><i></i><b>'+w+'</b></span>';
  if(k==="me")return '<span class="'+c+'"><i><u></u><u></u><u></u><u></u></i><b>'+w+'</b></span>';
  return '<span class="'+c+'"><span><i></i><b>'+w+'</b></span></span>'};
 return {s:s,on:!!s.on,r:r,who:who,whoN:L.nm(who),won:wins.length>0,whoT:L.nm(who)+(wins.length?" won":" · top P&L"),pn:pn,usd:P.usd,lk:lk,
  last:{lb:"Last round",day:L.kfmt(lk,{date:false})},now:now,nx:nx,
  next:{lb:"Next · "+nx.wds,v:pl(nx.R.length,"prediction"),day:L.kfmt(nx.k)},
  graded:graded,total:all.length,todayN:now.R.length,nv:nv,wk:lv4.week(),ai:ai,lg:lg,mark:mark,
  /* the season bar: graded, today's (lit), still to come; NVIDIA's bet at the end */
  bar:function(cls){var g=graded/all.length*100,t=(bell||s.k==="due"?now.R.length:0)/all.length*100;
   return '<span class="q41-bar '+(cls||"")+'"><i class="g" style="width:'+g.toFixed(2)+'%"></i><i class="t" style="left:'+g.toFixed(2)+'%;width:'+t.toFixed(2)+'%"></i></span>'}}})();
