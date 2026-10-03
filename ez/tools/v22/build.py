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
    '<nav class="nav" aria-label="Main"><a href="#/" data-r="board">Overview</a><a href="#/leaderboard" data-r="leaderboard">Leaderboard</a><a href="#/upcoming" data-r="upcoming">Upcoming</a><a href="#/buyback" data-r="buyback">Buyback</a></nav>')
# Season Live keeps Up next beside the standings (Season shows the last round)
rep('var BAND_RIGHT="last"','var BAND_RIGHT="next"')
# the page view, after the board
rep('</main>\n<footer>','</main>\n<main id="view" class="wrap" tabindex="-1" hidden></main>\n<footer>')
# standings: the row opens the model page (Season already shows right way and average miss)
rep("""'<span class="pc-t"><h3>'+nm(T.m)+'</h3></span>'+pcStats(T.m)+""",
    """'<span class="pc-t"><h3><a href="#/model/'+T.m.toLowerCase()+'">'+nm(T.m)+'</a></h3></span>'+pcStats(T.m)+""")
# card back: the round page next to Flip back
rep("""'<div class="cfoot"><button type="button" class="flipb" data-flip>↻ Flip back</button>'+shareBtn(r.n)+'</div></div></div>';""",
    """'<div class="cfoot"><button type="button" class="flipb" data-flip>↻ Flip back</button>'+shareBtn(r.n)+'</div></div></div>';""")
# up next: the title opens the round; All upcoming opens the upcoming page
rep("""unHTML='<div class="up-p"><h3 class="nm">'+coTitle(NX)+'</h3>'+""","""unHTML='<div class="up-p"><h3 class="nm"><a href="#/round/'+NX.n+'">'+coTitle(NX)+'</a></h3>'+""")
rep("""  unMore.addEventListener("click",function(){var i=SL.findIndex(function(s){return s.k!=="g"});if(i<0)i=SL.length-1;
    $("#record").scrollIntoView({behavior:reduce?"auto":"smooth",block:"start"});setTimeout(function(){go(i,true)},reduce?0:450)})}""",
    """  unMore.addEventListener("click",function(){location.hash="#/upcoming"})}""")
# the bullseye can draw one model (the model page) as well as all of them
rep("function targets(el){\n  el.innerHTML='<div class=\"tg-grid\">'+ACTIVE.map(","function targets(el,only){\n  el.innerHTML='<div class=\"tg-grid\">'+(only||ACTIVE).map(")
# the pages, at the end of the main script; Season Live plus the two experiments (window.EZ_EXP)
i=src.rindex('})();\n</script>'); base=src
NAV4='<nav class="nav" aria-label="Main"><a href="#/" data-r="board">Overview</a><a href="#/leaderboard" data-r="leaderboard">Leaderboard</a><a href="#/upcoming" data-r="upcoming">Upcoming</a><a href="#/buyback" data-r="buyback">Buyback</a></nav>'
NAV5='<nav class="nav" aria-label="Main"><a href="#/" data-r="board">Overview</a><a href="#/leaderboard" data-r="leaderboard">Leaderboard</a><a href="#/results" data-r="results">Results</a><a href="#/upcoming" data-r="upcoming">Upcoming</a><a href="#/buyback" data-r="buyback">Buyback</a></nav>'
for out,exp,title in [("v22-season-live.html","","EZ Season Live"),("v23-live-x1.html","x1","EZ Live X1"),("v24-live-x2.html","x2","EZ Live X2")]:
    page=base[:i]+'window.EZ_EXP="'+exp+'";\n'+js+base[i:]
    page=re.sub(r'<title>[^<]*</title>','<title>'+title+'</title>',page,1)
    if exp=="x1":
        assert page.count(NAV4)==1; page=page.replace(NAV4,NAV5)
    open(out,'w').write(page); print("ok",out,len(page))
