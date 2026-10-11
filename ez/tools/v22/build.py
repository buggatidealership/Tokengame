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
i=src.rindex('</style>',0,src.find('<!--WSJ:') if '<!--WSJ:' in src else len(src)); src=src[:i]+css+src[i:]
# header: brand to the board, the route nav
rep('<a class="brand" href="#top"','<a class="brand" href="#/"')
rep('<nav class="nav" aria-label="Sections"><a href="#upnext">Up next</a><a href="#record">The record</a><a href="#learn">Learning</a><a href="#bet">The buyback</a><a href="#calc">The math</a><a href="#road">What\'s next</a></nav>',
    '<nav class="nav" aria-label="Main"><a href="#/" data-r="board">Overview</a><a href="#/leaderboard" data-r="leaderboard">Leaderboard</a><a href="#/upcoming" data-r="upcoming">Upcoming</a><a href="#/buyback" data-r="buyback">Buyback</a></nav>')
# Season Live keeps Up next beside the standings (Season shows the last round)
rep('var BAND_RIGHT="last"','var BAND_RIGHT="next"')
# the page view, after the board
rep('</main>\n<footer>','</main>\n<main id="view" class="wrap" tabindex="-1" hidden></main>\n<footer>')
# standings: the row opens the model page (Season already shows right way and average miss)
rep("""'<span class="pc-t"><h3>'+nm(T.m)+'</h3></span>'+pcStats(T.m)+""",
    """'<span class="pc-t"><h3><a href="#/model/'+T.m.toLowerCase()+'">'+nm(T.m)+'</a></h3></span>'+pcStats(T.m)+""")
# card back: the round page next to Flip back
rep("""'<div class="cfoot"><button type="button" class="flipb" data-flip>↻ See the film</button>'+shareBtn(r.n)+'</div></div></div>';""",
    """'<div class="cfoot"><button type="button" class="flipb" data-flip>↻ See the film</button>'+shareBtn(r.n)+'</div></div></div>';""")
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
    if exp=="x1": page=re.sub(r'<!--WSJ:.*?<!--/WSJ-->\n','',page,flags=re.S)
    if exp=="x1": page=page.replace("<h1>We’re putting","<h1>We're putting")
    if exp=="x1":  # X1 is locked: keep its chip and roadmap as they were
        CN='  /* no colon between hours and minutes on the gap between the two dies (owner, 2026-10-11); X1 keeps it (build.py) */\n'
        assert page.count(CN)==1; page=page.replace(CN,'  /* the colon between hours and minutes sits on the gap between the two dies */\n  mk("circle",{cx:999.5,cy:PY+21+2*P+CS/2,r:6,"class":"gc-on"});mk("circle",{cx:999.5,cy:PY+21+4*P+CS/2,r:6,"class":"gc-on"});\n')
        page=re.sub(r'[ \t]*/\*NX1\{\*/.*?/\*\}NX1\*/\n?','',page,flags=re.S)
        page=page.replace("(function(w){w=String(w);return w.charAt(0).toUpperCase()+w.slice(1)})(NUMW[ag.n]||ag.n)+' times, every AI that called picked the same direction. They were right '+(a>.5?'':'only ')+String(NUMW[ag.ok]||ag.ok).toLowerCase()+' times. '+(sp.n&&b>a?'When they argued, siding with the majority worked better.':'Agreement means nothing here.'),\n      [stat(ag.ok+' of '+ag.n,'times right when they all agreed')].concat(sp.n?[stat(sp.ok+' of '+sp.n,'times the majority was right when they split')]:[]),R.length+' rounds so far',now?'hot':'',now))}","(function(w){w=String(w);return w.charAt(0).toUpperCase()+w.slice(1)})(NUMW[ag.n]||ag.n)+' times, all four AIs picked the same direction. They were right only '+String(NUMW[ag.ok]||ag.ok).toLowerCase()+' times. '+(sp.n&&b>a?'When they argued, siding with the majority worked far better.':'Agreement means nothing here.'),\n      [stat(ag.ok+' of '+ag.n,'times right when all four agreed')].concat(sp.n?[stat(sp.ok+' of '+sp.n,'times the majority was right when they split')]:[]),ag.n+sp.n+' rounds so far',now?'hot':'',now))}")
        page=page.replace('\'<div class="cwin"><small>The market answers</small><span class="wv"><span class="wn">\'+(u.resolves?fmtDate(u.resolves):\'Date to come\')+\'</span></span></div>\'+','\'<div class="cwin"><small>The market answers</small><span class="wv"><span class="wn">\'+fmtDate(u.resolves)+\'</span></span></div>\'+')
        page=page.replace('\'<p class="cnote"><span>No calls yet.\'+(u.resolves?\' <b>The market answers <span class="nw">\'+fmtDate(u.resolves)+\'.</span></b>\':\'\')+\'</span>\'','\'<p class="cnote"><span>No calls yet. <b>The market answers <span class="nw">\'+fmtDate(u.resolves)+\'.</span></b></span>\'')
        page=page.replace('if(v.k==="p")return t+". The AIs have made their calls."+(v.resolves?" The market answers "+fmtDate(v.resolves)+".":"")+" $EZ";','if(v.k==="p")return t+". The AIs have made their calls. The market answers "+fmtDate(v.resolves)+". $EZ";')
        page=page.replace('/* rank = wins, then the smaller average miss (owner, 2026-10-08): equal wins no longer share a place */\nfunction rankOf(T){var a=parseFloat(T.avg);return 1+ROWS.filter(function(U){var b=parseFloat(U.avg);return U.won>T.won||(U.won===T.won&&!isNaN(b)&&(isNaN(a)||b<a))}).length}','function rankOf(T){return 1+ROWS.filter(function(U){return U.won>T.won}).length}')
        page=page.replace('["🤖","More models","Next into the arena, in order: Gemini, Qwen, Mistral and NVIDIA\'s Nemotron."]','["🤖","More models","Max plans on each AI\'s newest model. Gemini and Qwen are next, then Mistral and NVIDIA\'s Nemotron."]').replace('["⚙️","Engineering the pipeline so it runs itself","Calls, films and site updates run on their own. A human signs off."]','["⚙️","The pipeline runs itself","Calls, films and site updates run on their own. A human signs off."]')
    if exp in ("x1","x2"):
        assert page.count(NAV4)==1; page=page.replace(NAV4,NAV5)
        # X1: the last round beside the standings (like Season); model pages come after launch, so names are plain text
        page=page.replace('var BAND_RIGHT="next"','var BAND_RIGHT="last"')
        L="""'<span class="pc-t"><h3><a href="#/model/'+T.m.toLowerCase()+'">'+nm(T.m)+'</a></h3></span>'"""
        assert page.count(L)==1
        if exp=="x1": page=page.replace(L,"""'<span class="pc-t"><h3>'+nm(T.m)+'</h3></span>'""")
    if exp=="x2":
        # standings: one number people care about. The percentage of calls right on direction; the leader's reads
        # "buyback odds" (its call decides the NVIDIA bet); the best eligible record gets a "Most accurate" tag.
        H="var STAND_STAT=\"right\",FOL_EARLY=null;"
        assert page.count(H)==1
        page=page.replace(H,H+"function EZ_FULL(m){return career(m).g>=ROUNDS.length/2}function EZ_BEST(){var b=null,bv=-1;ROWS.forEach(function(T){var C=career(T.m);if(!EZ_FULL(T.m))return;var v=C.right/C.g;if(v>bv){bv=v;b=T.m}});return b}function EZ_LEAD(){return ROWS[0]&&ROWS[0].won>0?ROWS[0].m:null}")
        S="""<b>'+Math.round(C.right/C.g*100)+'%</b><small>'+(C.g<ROUNDS.length?C.right+' of '+C.g+' right':'hit rate')+'</small>"""
        assert page.count(S)==1; page=page.replace(S,"""<b>'+Math.round(C.right/C.g*100)+'%</b><small>'+(!EZ_FULL(m)?C.right+' of '+C.g+' calls':m===EZ_LEAD()?'buyback odds':'hit rate')+'</small>""")
        L2="""'<span class="pc-t"><h3><a href="#/model/'+T.m.toLowerCase()+'">'+nm(T.m)+'</a></h3></span>'"""
        assert page.count(L2)==1; page=page.replace(L2,"""'<span class="pc-t"><h3><a href="#/model/'+T.m.toLowerCase()+'">'+nm(T.m)+'</a></h3>'+(T.m===EZ_LEAD()?'<small class="pc-best">Bets on NVIDIA</small>':'')+'</span>'""")
    open(out,'w').write(page); print("ok",out,len(page))
