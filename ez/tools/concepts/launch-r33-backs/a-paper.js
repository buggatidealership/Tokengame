/* A "The morning paper": the back is the next morning's tabloid front page about the round. Inverted pyramid (NN/g): the headline is
   the whole story in three or four words, the deck says the one number, the lede tells it in three short sentences (the pick, the
   bell, the verdict), and the box score (a newspaper's agate table) keeps the four calls for anyone who wants them. The GRADED stamp
   is inked onto the clipping. Every word is built from the round's facts (lib.js). */
__r33font("Pirata+One");__r33font("Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700");
var W=["no","one","two","three","four"];
window.__r33back=function(card,n){var F=__r33F(n);if(!F)return;var e=F.esc,co=e(F.co),nc=F.calls.length,up=F.up,win=F.winNames.join(" & ");
  /* the headline: the story in a few words */
  var hd=!F.right.length?co+" fools all "+W[nc]:F.best!=null&&F.best<=0.05?win+" nails it":F.E.gr===10?"Clean sweep":F.right.length===nc?win+" by a nose":win+" wins the split";
  var dk=!F.right.length?(up?"Up ":"Down ")+F.move+". They all said "+(up?"down":"up")+".":F.best<=0.05?"Off by "+F.best.toFixed(2)+"% on "+co:F.E.gr===10?"All four right, all four close":win+" closest, "+F.best.toFixed(2)+"% off";
  /* the lede: the pick, the bell, the verdict */
  var pick=F.bulls.length&&F.bears.length?(F.bulls.length===1?"One AI":W[F.bulls.length].replace(/^./,function(c){return c.toUpperCase()})+" AIs")+" said "+co+" would rise, "+W[F.bears.length]+" said it would fall."
      :"All "+W[nc]+" AIs said "+co+" would "+(F.bulls.length?"rise":"fall")+".";
  var bell="It "+(up?"rose":"fell")+" "+F.move+(F.ratio>=2?", about "+Math.round(F.ratio*10)/10+" times a normal move.":".");
  var w0=F.win[0],verdict=!F.right.length?"Nobody got the direction.":F.right.length===nc&&F.E.gr===10?"All "+W[nc]+" got the direction, "+F.E.av.toFixed(2)+"% off on average. "+(win)+" came closest.":
      win+" said "+(w0.up?"up ":"down ")+F.mag(w0.mg)+", "+__r33rankLine(F)+".";
  var after=F.top1?(F.top0===F.top1?F.topName1+" stays #1":F.topName1+" takes #1")+" on the board, "+F.hr1(F.top1)+"% right.":"";
  var box=F.calls.slice().sort(function(a,b){return (b.ok-a.ok)||(a.off-b.off)}).map(function(c){
    return '<li class="'+(c.ok?'ok':'no')+'"><b>'+e(c.name)+'</b><i></i><span>'+(c.up?'▲':'▼')+F.mag(c.mg)+'</span><em>'+(c.ok?c.off.toFixed(2)+'% off':'wrong way')+'</em></li>'}).join('');
  var r=__r33fill(card,"r33a",
    '<div class="pa-mast"><span class="pa-nm">The EZ Daily</span><span class="pa-st"></span></div>'+
    '<div class="pa-dl"><span>'+F.resolves.wd+' '+F.resolves.t+'</span><span>Round '+n+'</span><span>Season 1</span></div>'+
    '<h5 class="pa-hd">'+hd+'</h5><p class="pa-dk">'+dk+'</p>'+
    '<p class="pa-ld">'+pick+' '+bell+' '+verdict+'</p>'+
    '<div class="pa-bx"><p>Box score</p><ul>'+box+'</ul>'+(after?'<p class="pa-af">'+e(after)+'</p>':'')+'</div>');
  if(r.K.stamp)r.el.querySelector('.pa-st').appendChild(r.K.stamp);
  var go=function(){var w=r.el.clientWidth;__r33grow(r.el,r.el.querySelector('.pa-ld'),Math.min(w*.052,13),Math.min(w*.075,17.5))};go();if(document.fonts)document.fonts.ready.then(go)};
