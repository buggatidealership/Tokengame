import sys
S=sys.argv[1]
src=open('v15-season.html').read()
css=open(S+'/routes.css').read(); js=open(S+'/routes.js').read()
def rep(old,new,count=1):
    global src
    n=src.count(old)
    assert n==count,(n,old[:80])
    src=src.replace(old,new)
# title + header comment
import re
rep('<title>','<title>',1)
src=re.sub(r'<title>[^<]*</title>','<title>EZ Season Live</title>',src,1)
# css
i=src.rindex('</style>'); src=src[:i]+css+src[i:]
# header: brand to the board, the route nav
rep('<a class="brand" href="#top"','<a class="brand" href="#/"')
rep('<nav class="nav" aria-label="Sections"><a href="#upnext">Up next</a><a href="#record">The record</a><a href="#learn">Learning</a><a href="#bet">The buyback</a><a href="#calc">The math</a><a href="#road">The road</a></nav>',
    '<nav class="nav" aria-label="Main"><a href="#/" data-r="board">Board</a><a href="#/rounds" data-r="rounds">Rounds</a><a href="#/models" data-r="models">Models</a><a href="#/upcoming" data-r="upcoming">Upcoming</a><a href="#bet" data-r="buyback">Buyback</a></nav>')
# the page view, after the board
rep('</main>\n<footer>','</main>\n<main id="view" class="wrap" tabindex="-1" hidden></main>\n<footer>')
# standings: right way and average miss under the name, the row opens the model page
rep("""'<span class="rk"><sup>#</sup>'+rankOf(T)+'</span>'+logo(T.m)+'<h3>'+nm(T.m)+'</h3>'+""",
    """'<span class="rk"><sup>#</sup>'+rankOf(T)+'</span>'+logo(T.m)+'<span class="pc-t"><h3><a href="#/model/'+T.m.toLowerCase()+'">'+nm(T.m)+'</a></h3>'+pcStats(T.m)+'</span>'+""")
rep("var P0=PS[0]||null;","""/* a model's record over the graded rounds: calls, right way, average miss, wins, streak */
function career(m){var g=0,right=0,err=0,won=0,hist=[];
  ROUNDS.forEach(function(r){var c=callOf(r,m),wn=r.win?r.win.split(" & "):[];if(!c){hist.push({n:r.n,none:true});return}
    var ok=callOk(r,c);g++;right+=ok;err+=parseFloat(c[2]);var w=wn.indexOf(m)>-1;if(w)won++;hist.push({n:r.n,ok:ok,win:w,off:parseFloat(c[2]),said:c[1],r:r})});
  var streak=null,cs=hist.filter(function(h){return !h.none});
  if(cs.length){var last=cs[cs.length-1].ok,k=0;for(var i=cs.length-1;i>=0&&cs[i].ok===last;i--)k++;streak={ok:last,k:k}}
  return {m:m,g:g,right:right,won:won,avg:g?err/g:null,hist:hist,streak:streak}}
function pcStats(m){var C=career(m);if(!C.g)return '<span class="pc-s">No graded calls yet</span>';
  return '<span class="pc-s"><span><b>'+C.right+'/'+C.g+'</b> right</span><span><b>'+C.avg.toFixed(2)+'</b> avg miss</span></span>'}
var P0=PS[0]||null;""")
# card back: the round page next to Flip back
rep("""'<div class="cfoot"><button type="button" class="flipb" data-flip>↻ Flip back</button>'+shareBtn(r.n)+'</div></div></div>';""",
    """'<div class="cfoot"><button type="button" class="flipb" data-flip>↻ Flip back</button><a class="rpl" href="#/round/'+r.n+'">Round page →</a>'+shareBtn(r.n)+'</div></div></div>';""")
# up next: the title opens the round; All upcoming opens the upcoming page
rep("""unHTML='<div class="up-p"><h3 class="nm">'+coTitle(NX)+'</h3>'+""","""unHTML='<div class="up-p"><h3 class="nm"><a href="#/round/'+NX.n+'">'+coTitle(NX)+'</a></h3>'+""")
rep("""  unMore.addEventListener("click",function(){var i=SL.findIndex(function(s){return s.k!=="g"});if(i<0)i=SL.length-1;
    $("#record").scrollIntoView({behavior:reduce?"auto":"smooth",block:"start"});setTimeout(function(){go(i,true)},reduce?0:450)})}""",
    """  unMore.addEventListener("click",function(){location.hash="#/upcoming"})}""")
# the bullseye can draw one model (the model page) as well as all of them
rep("function targets(el){\n  el.innerHTML='<div class=\"tg-grid\">'+ACTIVE.map(","function targets(el,only){\n  el.innerHTML='<div class=\"tg-grid\">'+(only||ACTIVE).map(")
# the pages, at the end of the main script
i=src.rindex('})();\n</script>'); src=src[:i]+js+src[i:]
open('v22-season-live.html','w').write(src)
print("ok",len(src))
