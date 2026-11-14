/* D "Three panels": the round as a comic strip, as Topps card backs carried a cartoon beside the numbers (from 1953). Panel 1, the
   pick: the four AIs say their call in speech bubbles, the date and the split in the caption. Panel 2, the bell: the host holds up
   the close. Panel 3, the verdict: a burst with the one number that matters and the host's reaction (stamping a win, a facepalm when
   nobody got it). Ink outlines, flat fills and hard shadows, the site's cel look; captions in the yellow boxes comics use. */
__r33font("Bangers");
var W=["no","one","two","three","four"];
window.__r33back=function(card,n){var F=__r33F(n);if(!F)return;var e=F.esc,nc=F.calls.length,co=e(F.co),cap=function(s){return s.charAt(0).toUpperCase()+s.slice(1)};
  var media=typeof MEDIA!=="undefined"?MEDIA:"media/",host=function(f,cls){return '<img class="cm-h '+(cls||'')+'" src="'+media+'commissioner/web/'+f+'.webp" alt="" decoding="async">'};
  var split=F.bulls.length&&F.bears.length?cap(W[F.bulls.length])+" say up, "+W[F.bears.length]+" say down.":"All "+W[nc]+" say "+(F.bulls.length?"up":"down")+".";
  var bub=F.calls.map(function(c){var win=F.win.some(function(w){return w.m===c.m});
    return '<li class="cm-b'+(c.up?' cm-bu':' cm-bd')+(win?' win':'')+'"><span class="cm-sp">'+(c.up?'▲':'▼')+F.mag(c.mg)+'</span>'+F.logo(c.m,'cm-lg')+'</li>'}).join('');
  var nobody=!F.right.length,ten=F.E.gr===10;
  var burst=nobody?"Nobody!":F.best<=0.1?F.best.toFixed(2)+"% off!":ten?"Pristine 10!":F.best.toFixed(2)+"% off";
  var wn=F.winNames.join(" & "),rl=__r33rankLine(F);
  var say=nobody?"All "+W[nc]+" said "+(F.up?"down":"up")+". It went "+(F.up?"up ":"down ")+F.move+".":
    ten?wn+" closest. All "+W[nc]+" right, "+F.E.av.toFixed(2)+"% off on average.":
    wn+" wins."+(F.rank===1?(F.ties.length?" Tied for the closest call all season.":" The closest call all season."):"");
  var w0=F.win[0];
  var r=__r33fill(card,"r33d",
    '<div class="cm-p cm-p1"><p class="cm-c">'+F.called.wd+' '+F.called.t+'. '+split+'</p><ul class="cm-bs">'+bub+'</ul></div>'+
    '<div class="cm-p cm-p2"><p class="cm-c">'+F.resolves.wd+' '+F.resolves.t+', the close.</p>'+host('02-presenter')+
      '<div class="cm-sign '+(F.up?'cm-g':'cm-r')+'"><b>'+co+'</b><em>'+(F.up?'▲':'▼')+F.move+'</em></div></div>'+
    '<div class="cm-p cm-p3"><p class="cm-c">The verdict.</p>'+(nobody?host('10-facepalm','cm-hr'):host('03-stamping','cm-hr'))+
      '<div class="cm-v"><b class="cm-x'+(nobody?' cm-xr':'')+'">'+burst+'</b><span class="cm-say">'+e(say)+'</span></div></div>'+
    '<span class="cm-st"></span>');
  if(r.K.stamp)r.el.querySelector('.cm-st').appendChild(r.K.stamp);
  var go=function(){var w=r.el.clientWidth;__r33grow(r.el.querySelector('.cm-v'),r.el.querySelector('.cm-say'),Math.min(w*.05,12),Math.min(w*.066,15))};go();if(document.fonts)document.fonts.ready.then(go)};
