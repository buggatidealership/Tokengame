/* C "Fight night recap": the round told as a bout, in the site's fight-night voice (tonight, the bell, on the card). The four AIs
   step into a corner, bulls (up) or bears (down); an empty corner stays on the card, because that is the story too. The bell is the
   real move at the close; the decision names who won and how close; the belt is #1 on the board, kept or taken after this round. */
var W=["no","one","two","three","four"];
window.__r33back=function(card,n){var F=__r33F(n);if(!F)return;var e=F.esc,nc=F.calls.length,co=e(F.co);
  var plate=function(c){var win=F.win.some(function(w){return w.m===c.m});return '<li class="fn-p'+(c.ok?' ok':' no')+(win?' win':'')+'">'+F.logo(c.m,'fn-lg')+'<b>'+e(c.name)+'</b><em>'+(c.up?'▲':'▼')+F.mag(c.mg)+'</em></li>'};
  var corner=function(list,side){return '<div class="fn-cn fn-'+side+'"><p class="fn-ch">'+(side==='bu'?'Bulls ▲':'Bears ▼')+'</p>'+(list.length?'<ul>'+list.map(plate).join('')+'</ul>':'<p class="fn-mt">Empty corner</p>')+'</div>'};
  var wn=F.winNames.join(" & "),side=F.up?"Bulls":"Bears";
  var dec=!F.right.length?"Upset. All "+W[nc]+" were in the wrong corner. Nobody wins."
    :(F.right.length===nc?"Clean sweep for the "+side.toLowerCase()+". ":side+" win. ")+wn+(F.best<=0.1?" by a hair: ":" on points: ")+F.best.toFixed(2)+"% off.";
  var w0=F.win[0],run=w0?F.streak(w0.m):0,str=run>=2?F.nm(w0.m)+"'s run: "+run+" right calls in a row.":"";
  var belt=F.top1?(F.top0===F.top1?F.topName1+" keeps #1":F.topName1+" takes #1 from "+F.topName0)+" on the board, "+F.hr1(F.top1)+"% right.":"";
  var r=__r33fill(card,"r33c",
    '<p class="fn-tn"><span>Fight night</span><span>'+F.called.wd+' '+F.called.t+'</span></p>'+
    '<div class="fn-cs">'+corner(F.bulls,'bu')+'<i class="fn-vs">vs</i>'+corner(F.bears,'be')+'</div>'+
    '<div class="fn-bell"><p>The bell</p><b class="'+(F.up?'fn-g':'fn-r')+'">'+(F.up?'▲':'▼')+F.move+'</b><small>'+co+' at the close, '+F.resolves.wd+' '+F.resolves.t+(F.ratio>=2?'. About '+Math.round(F.ratio*10)/10+' times a normal move.':'')+'</small></div>'+
    '<div class="fn-dc"><p>The decision</p><span>'+e(dec)+'</span>'+(str?'<small>'+e(str)+'</small>':'')+'</div>'+
    (belt?'<div class="fn-bt"><p>The belt</p><span>'+e(belt)+'</span></div>':'')+'<span class="fn-st"></span>');
  if(r.K.stamp)r.el.querySelector('.fn-st').appendChild(r.K.stamp);
  var go=function(){var w=r.el.clientWidth;__r33grow(r.el,r.el.querySelector('.fn-dc span'),Math.min(w*.054,14),Math.min(w*.085,19))};go();if(document.fonts)document.fonts.ready.then(go)};
