/* U5 · The marquee: a cinema letter board under the film's bill, letters slotted in by hand. "Now" and "Next" change every weekday:
   the board looks like something someone updates. */
(function(){var L=LV,s=lvState(),nx=lv4.next(),R=s.rounds;
  var rows={due:["Now · "+R.length+" calls due today","Next · "+nx.R.length+" more "+nx.wd],bell:["Now · "+R.length+" graded at 4pm","Bell in "+L.left()],
    rung:["Bell rung · "+R.length+" graded","Results soon"],off:["Back "+nx.wd,nx.R.length+" calls · 4 AIs"]}[s.k];
  var seed=7;function rnd(){seed=(seed*9301+49297)%233280;return seed/233280}
  function row(t){return '<span class="lv4-mr">'+lvUp(t).split("").map(function(c){if(c===" ")return '<i class="sp"></i>';
    return '<i style="--r:'+((rnd()-.5)*2.4).toFixed(2)+'deg;--y:'+((rnd()-.5)*1.6).toFixed(2)+'px">'+lvE(c)+'</i>'}).join("")+'</span>'}
  var d=document.createElement("div");d.className="lv4 lv4-u5 lv-"+s.k;d.setAttribute("aria-label",rows.join(". "));
  d.innerHTML='<div class="lv4-mq"><span class="lv4-bl" aria-hidden="true"></span><div class="lv4-mb" aria-hidden="true">'+row(rows[0])+row(rows[1])+'</div><span class="lv4-bl" aria-hidden="true"></span></div>';
  lv4.mount(d)})();
