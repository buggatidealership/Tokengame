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
# X5's code and its part of the flag line sit between X5 markers in routes.js: kept (markers dropped) for X5, removed
# with the markers for every other page, so X1, X2, X3, X4 and Season Live stay byte for byte
X5M=re.compile(r'[ \t]*/\*X5\{\*/.*?/\*\}X5\*/\n?',re.S)
# X2's own Overview (owner, 2026-10-13): its code sits between /*X2{*/ and /*}X2*/ in routes.js, kept (markers dropped)
# for X2 alone and removed with the markers from every other page (X3, X4 and X5 share X2's code but not this); its
# styles are tools/v22/x2-overview.css, put in X2 alone (below). So Season Live, X1, X3, X4 and X5 stay byte for byte.
X2M=re.compile(r'[ \t]*/\*X2\{\*/.*?/\*\}X2\*/\n?',re.S)
for out,exp,title in [("v22-season-live.html","","EZ Season Live"),("v23-live-x1.html","x1","EZ Live X1"),("v24-live-x2.html","x2","EZ Live X2"),("v41-live-x3.html","x3","EZ Live X3"),("v42-live-x4.html","x4","EZ Live X4"),("v43-live-x5.html","x5","EZ Live X5")]:
    jx=js.replace('/*X5{*/','').replace('/*}X5*/','') if exp=="x5" else X5M.sub('',js)
    jx=jx.replace('/*X2{*/','').replace('/*}X2*/','') if exp=="x2" else X2M.sub('',jx)
    page=base[:i]+'window.EZ_EXP="'+exp+'";\n'+jx+base[i:]
    page=re.sub(r'<title>[^<]*</title>','<title>'+title+'</title>',page,1)
    if exp=="x1": page=re.sub(r'<!--WSJ:.*?<!--/WSJ-->\n','',page,flags=re.S)
    if exp=="x1":  # X1 is locked: its one line under the headline as it was (v15's three lines, heroLines(), 2026-10-14;
        # bullets in a <ul>, later that day)
        page,n1=re.subn(r'<!--HL:.*?<!--/HL-->\n','',page,count=1,flags=re.S)
        page,n2=re.subn(r'<ul class="sub hero-ul" id="heroSub">.*?</ul>',lambda m:'<p class="sub" id="heroSub">AIs predict how stocks move after earnings. The one on top bets the fee pool on NVIDIA. Win, it buys back $EZ. Here\'s who\'s on top, and how the last round went.</p>',page,count=1,flags=re.S)
        page,n3=re.subn(r'/\* the three lines under the headline \(owner, 2026-10-14.*?\$\("#heroSub"\)\.innerHTML=heroLines\(\);\n',lambda m:'$("#heroSub").textContent=(NUMW[NM]||String(NM))+" AIs predict how stocks move after earnings. The one on top bets the fee pool on NVIDIA at "+(SIM.leverage!=null?SIM.leverage:5)+"x. Win, it buys back $EZ. Here\'s who\'s on top, and how the last round went.";\n',page,count=1,flags=re.S)
        assert (n1,n2,n3)==(1,1,1),(n1,n2,n3); assert 'heroLines' not in page and 'hero-ln' not in page and 'hero-ul' not in page
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
    if exp in ("x1","x2","x3","x4","x5"):
        assert page.count(NAV4)==1; page=page.replace(NAV4,NAV5)
        # X1: the last round beside the standings (like Season); model pages come after launch, so names are plain text
        page=page.replace('var BAND_RIGHT="next"','var BAND_RIGHT="last"')
        L="""'<span class="pc-t"><h3><a href="#/model/'+T.m.toLowerCase()+'">'+nm(T.m)+'</a></h3></span>'"""
        assert page.count(L)==1
        if exp=="x1": page=page.replace(L,"""'<span class="pc-t"><h3>'+nm(T.m)+'</h3></span>'""")
    if exp in ("x2","x3","x4","x5"):  # X4 = X2 exactly, only the colours change (skin-x4.css below); X5 = X2 plus its own Overview
        # standings: one number people care about. The percentage of calls right on direction; the leader's reads
        # "buyback odds" (its call decides the NVIDIA bet); the best eligible record gets a "Most accurate" tag.
        # X2 changes these again (ranked by direction, owner, 2026-10-14): see the x2 branch below.
        H="var STAND_STAT=\"right\",FOL_EARLY=null;"
        assert page.count(H)==1
        page=page.replace(H,H+"function EZ_FULL(m){return career(m).g>=ROUNDS.length/2}function EZ_BEST(){var b=null,bv=-1;ROWS.forEach(function(T){var C=career(T.m);if(!EZ_FULL(T.m))return;var v=C.right/C.g;if(v>bv){bv=v;b=T.m}});return b}function EZ_LEAD(){return ROWS[0]&&ROWS[0].won>0?ROWS[0].m:null}")
        S="""<b>'+Math.round(C.right/C.g*100)+'%</b><small>'+(C.g<ROUNDS.length?C.right+' of '+C.g+' right':'hit rate')+'</small>"""
        assert page.count(S)==1; page=page.replace(S,"""<b>'+Math.round(C.right/C.g*100)+'%</b><small>'+(!EZ_FULL(m)?C.right+' of '+C.g+' calls':m===EZ_LEAD()?'"""+("buyback odds" if exp in ("x2","x4") else "hit rate")+"""':'hit rate')+'</small>""")
        L2="""'<span class="pc-t"><h3><a href="#/model/'+T.m.toLowerCase()+'">'+nm(T.m)+'</a></h3></span>'"""
        assert page.count(L2)==1; page=page.replace(L2,"""'<span class="pc-t"><h3><a href="#/model/'+T.m.toLowerCase()+'">'+nm(T.m)+'</a></h3>'+(T.m===EZ_LEAD()?'<small class="pc-best">'+(SIM.leadHours!=null?"""+("(EZ5_FROZEN()?'Makes the call':EZ5_FREEZE()?'Makes the call if #1 on '+EZ5_FREEZE():'In line for the call')" if exp=="x5" else "'In line for the call'")+""":'Bets on NVIDIA')+'</small>':'')+'</span>'""")
        # the NVIDIA call, leverage and loss copy (owner, 2026-10-12): 24 hours before NVIDIA reports the leaderboard freezes
        # and the AI in first place makes the call; leverage is exactly SIM.leverage; no stop loss, so a wrong call can wipe
        # out the pot. Hours and leverage come from SIM; with SIM.leadHours unset the old copy shows. X1 and Season Live keep theirs.
        for a,b in [
            # the chip's line (Overview)
            ('on Hyperliquid. The call comes from the AI on top of the leaderboard at that moment.</p>','on Hyperliquid. <span id="gpuCall">The call comes from the AI on top of the leaderboard at that moment.</span></p>'),
            ('$("#gpuLev").textContent=(SIM.leverage!=null?SIM.leverage:5)+"x";','$("#gpuLev").textContent=(SIM.leverage!=null?SIM.leverage:5)+"x";if(SIM.leadHours!=null)$("#gpuCall").textContent=SIM.leadHours+" hours before NVIDIA reports, the leaderboard freezes. The AI in first place makes the call: up or down.";'),
            # where the money goes (Overview)
            ('<div class="mt-box"><p>Whichever AI is #1 on the leaderboard takes the pot','<div class="mt-box"><p><span id="mtWho">Whichever AI is #1 on the leaderboard</span> takes the pot'),
            ('if($("#mtLev"))$("#mtLev").textContent=(SIM.leverage!=null?SIM.leverage:5)+"x"})();','if($("#mtLev"))$("#mtLev").textContent=(SIM.leverage!=null?SIM.leverage:5)+"x";if(SIM.leadHours!=null&&$("#mtWho"))$("#mtWho").textContent="Whichever AI is #1 when the leaderboard freezes"})();'),
            # the calculator (Buyback tab): the leverage is set, not picked; the loss is the whole pot
            ("""$("#pLv").innerHTML=LEVS.map(function(v){""","""if(SIM.leverage!=null)$("#lLv").lastChild.textContent="Leverage";$("#pLv").innerHTML=(SIM.leverage!=null?[LEV0]:LEVS).map(function(v){"""),
            ("<p class=\"mx-lose\">If it's wrong, the pot bleeds. With leverage, fast.</p>","<p class=\"mx-lose\">If it's wrong, the pot can be wiped out.</p>"),
            # Leaderboard tab
            ('Ranked by rounds won, then by the smaller average miss. Whoever is on top trades the pot. Tap an AI for every call it made."',
             'Ranked by rounds won, then by the smaller average miss. "+(SIM.leadHours!=null?"The leaderboard freezes "+SIM.leadHours+"h before NVIDIA reports. #1 makes the call.":"Whoever is on top trades the pot.")+" Tap an AI for every call it made."'),
            # Buyback tab
            ("""of it fills this pool. The AI on top bets it on NVIDIA\\'s earnings at '+(SIM.leverage!=null?SIM.leverage:5)+'x. Win,""",
             """of it fills this pool. '+(SIM.leadHours!=null?SIM.leadHours+' hours before NVIDIA reports, the leaderboard freezes. The AI in first place makes the call: up or down. We bet the whole pool on that call'+(SIM.leverage!=null?' at '+SIM.leverage+'x':'')+'.':'The AI on top bets it on NVIDIA\\'s earnings at '+(SIM.leverage!=null?SIM.leverage:5)+'x.')+' Win,""")]:
            assert page.count(a)==1,a; page=page.replace(a,b)
    if exp=="x2":
        # X2 ranks by direction (owner, 2026-10-14: "most people care about accuracy on directional calls ... it makes
        # more sense to go with the most accurate model"). Hit rate = calls right on direction / calls made. AIs that called
        # at least half the graded rounds rank first, by hit rate, a tie going to the smaller average miss; then the rest,
        # the same way; no shared places (a full tie keeps LADDER's order: wins, then the smaller average miss). ROWS is
        # sorted once, before anything is drawn,
        # so this one rule decides #1 everywhere on X2: the Overview's standings, the Leaderboard tab, the Leads crown, "In
        # line for the call", the scores strip, the model pages and their order. Wins leave the standings rows (the number,
        # the label and the Leaderboard tab's column); each round's winner stays on its card. The "Most accurate" tag goes
        # (the top spot is the most accurate now). The percentage reads "on direction"; an AI under half the rounds keeps
        # "x of y calls". The Overview's rows get the last five calls (formSq, as on the Leaderboard tab; x2-overview.css).
        # X3, X4 and X5 keep ranking by wins. Every number comes from ez-data.js.
        for a,b in [
            ('/* rank = wins, then the smaller average miss (owner, 2026-10-08): equal wins no longer share a place */\nfunction rankOf(T){var a=parseFloat(T.avg);return 1+ROWS.filter(function(U){var b=parseFloat(U.avg);return U.won>T.won||(U.won===T.won&&!isNaN(b)&&(isNaN(a)||b<a))}).length}',
             '/* X2: rank = direction (owner, 2026-10-14). Hit rate = calls right on direction / calls made; AIs that called at least half\n'
             '   the graded rounds first, by hit rate (compared as whole numbers, right x calls), a tie going to the smaller average\n'
             '   miss; then the rest the same way; an AI with no graded call last. No shared places: the place is the row\'s position.\n'
             '   WINS_ORDER keeps LADDER\'s order (wins, then the smaller average miss) from before the sort: the "Longest winning\n'
             '   streak" record breaks a tie with it, as on the other pages, so the ranking never moves a record. */\n'
             'var WINS_ORDER=ROWS.map(function(T){return T.m});\n'
             'ROWS.sort(function(x,y){var a=career(x.m),b=career(y.m),fa=a.g>0&&a.g>=ROUNDS.length/2,fb=b.g>0&&b.g>=ROUNDS.length/2;\n'
             '  if(fa!==fb)return fa?-1:1;if(!a.g||!b.g)return (b.g?1:0)-(a.g?1:0);return (b.right*a.g-a.right*b.g)||(a.avg-b.avg)});\n'
             'function rankOf(T){return ROWS.indexOf(T)+1}'),
            ("function EZ_LEAD(){return ROWS[0]&&ROWS[0].won>0?ROWS[0].m:null}","function EZ_LEAD(){return ROWS[0]&&career(ROWS[0].m).g>0?ROWS[0].m:null}"),
            # the Overview's standings: no wins; "on direction"; the last five calls by the name
            ("<small>'+(!EZ_FULL(m)?C.right+' of '+C.g+' calls':m===EZ_LEAD()?'buyback odds':'hit rate')+'</small>","<small>'+(!EZ_FULL(m)?C.right+' of '+C.g+' calls':'on direction')+'</small>"),
            ("'<li class=\"pc'+(i?'':' lead')+(rankOf(T)===1&&T.won>0?' r1':'')+'\">'","'<li class=\"pc'+(i?'':' lead')+(rankOf(T)===1&&career(T.m).g>0?' r1':'')+'\">'"),
            ("nm(T.m)+'</a></h3>'+(T.m===EZ_LEAD()?","nm(T.m)+'</a></h3><span class=\"lb-f2 x2o-f\">'+formSq(career(T.m))+'</span>'+(T.m===EZ_LEAD()?"),
            ("pcStats(T.m)+\n    '<p class=\"pc-w\"><b>'+T.won+'</b><span>'+(T.won===1?'win':'wins')+'</span></p></li>'}).join(\"\");","pcStats(T.m)+'</li>'}).join(\"\");"),
            # the scores strip
            ("'<b>Leaderboard</b> '+ROWS.map(function(T){return nm(T.m)+' '+T.won}).join(' · ')",
             "'<b>Leaderboard</b> On direction: '+ROWS.map(function(T){var C=career(T.m);return nm(T.m)+' '+(!C.g?'n/a':EZ_FULL(T.m)?Math.round(C.right/C.g*100)+'%':C.right+' of '+C.g)}).join(' · ')"),
            # the Leaderboard tab: the rule in plain words, no Wins column, no "Most accurate", "on direction"
            ('"Ranked by rounds won, then by the smaller average miss. "+(SIM.leadHours',
             '"Ranked by how often each AI calls the direction right (up or down). A tie goes to the smaller average miss. "+(RK.some(function(k){return CAR[k].g<ROUNDS.length/2})?"AIs that called fewer than half the rounds rank below the rest. ":"")+(SIM.leadHours'),
            ('<span role="columnheader" class="lb-f">Last 5</span><span role="columnheader">Wins</span></div>','<span role="columnheader" class="lb-f">Last 5</span></div>'),
            ("(rkOf(m)===1&&C.won>0?' r1':'')","(rkOf(m)===1&&C.g>0?' r1':'')"),
            ("(X2&&m===lbBest()?'<small class=\"pc-best\">Most accurate</small>':'')","''"),
            ("<small>'+C.right+' of '+C.g+'</small></span>'+","<small>'+(!C.g?'No calls yet':C.g>=ROUNDS.length/2?'on direction':C.right+' of '+C.g+' calls')+'</small></span>'+"),
            ("'<span class=\"lb-f\" role=\"cell\">'+(X2?formSq(C):formDots(C))+'</span>'+\n    '<span class=\"lb-w pc-w\" role=\"cell\"><b>'+C.won+'</b><span>'+(C.won===1?'win':'wins')+'</span></span></li>'}",
             "'<span class=\"lb-f\" role=\"cell\">'+(X2?formSq(C):formDots(C))+'</span></li>'}"),
            # the model page: its place and its line say the direction record, not wins
            ("pos=rk===1?nmM+' leads with '+C.won+' '+(C.won===1?'win':'wins'):nmM+' is '+ord[rk]+' with '+C.won+' '+(C.won===1?'win':'wins'),tail='';\n"
             "  if(me&&hR===1)tail=' and the best hit rate';\n"
             "  else if(me&&mR===1)tail=' and the closest calls';\n"
             "  else if(me&&hR===full.length)tail=', but the worst hit rate';\n"
             "  else if(me&&mR===full.length)tail=', but misses by the most';\n"
             "  else if(!me)tail=' from '+C.g+' calls since joining late';",
             "pos=nmM+(rk===1?' leads':' is '+ord[rk])+(C.g?', right on direction '+C.right+' of '+C.g+' times':', with no graded call yet'),tail='';\n"
             "  if(me&&mR===1)tail=', with the closest calls';\n"
             "  else if(me&&mR===full.length)tail=', but misses by the most';\n"
             "  else if(!me&&C.g)tail=' since joining late';"),
            # the model page's gold tile marks the stat the ranking is decided on: Right way first and gold, Wins after it
            ("'<div class=\"pf-kpi\"><div class=\"pf-k gold\"><small>Wins</small><b>'+C.won+'</b><span>'+rankTag(place(m,function(k){return CAR[k].won},function(a,b){return a>b}))+'</span></div>'+\n"
             "    '<div class=\"pf-k\"><small>Right way</small><b>'+C.right+'<span>/'+C.g+'</span></b><span>'+rankTag(hR)+'</span></div>'+",
             "'<div class=\"pf-kpi\"><div class=\"pf-k gold\"><small>Right way</small><b>'+C.right+'<span>/'+C.g+'</span></b><span>'+rankTag(hR)+'</span></div>'+\n"
             "    '<div class=\"pf-k\"><small>Wins</small><b>'+C.won+'</b><span>'+rankTag(place(m,function(k){return CAR[k].won},function(a,b){return a>b}))+'</span></div>'+"),
            # the Leaderboard tab's "Every call, one square": its last column was the wins total over the right calls; the rows
            # follow the ranking now, so the column says what the ranking is decided on: the share right (big) over x/y
            # (small). The crowns stay in the squares (each round's winner)
            ("h=h.replace(/<\\/div>$/,'<span class=\"cg-sh\" role=\"columnheader\">Wins<br>Right</span></div>');",
             "h=h.replace(/<\\/div>$/,'<span class=\"cg-sh\" role=\"columnheader\">Right<br>way</span></div>');"),
            ("'<span class=\"cg-sum\" role=\"cell\"><b>'+GCROWN+t.w+'</b><small>'+t.ok+'/'+t.n+'</small></span></div>'",
             "'<span class=\"cg-sum\" role=\"cell\"><b>'+(t.n?pctOf(t.ok,t.n)+'%':'n/a')+'</b><small>'+t.ok+'/'+t.n+'</small></span></div>'"),
            # stale on X2 (the ranking is by direction): comments, and what nothing calls any more (the chip's leader by wins,
            # the best direction record for the "Most accurate" tag)
            ("/* ---------- hero: the standings, a leaderboard of rounds won ----------\n"
             "   Order and tie-breaks come from LADDER (ez-data.js: wins, then the smaller average miss). Ties share the rank number.\n"
             "   The crown goes to LADDER[0]. A model with calls but none graded yet (Grok) joins the table below them with 0 wins. */",
             "/* ---------- hero: the standings. On X2 (build.py, owner 2026-10-14) ROWS starts in LADDER's order (ez-data.js:\n"
             "   wins, then the smaller average miss) and is sorted by direction below, before anything is drawn. The crown goes\n"
             "   to ROWS[0]. A model with calls but none graded yet joins below the others. */"),
            ("the return on the stake, the last five rounds, and wins (what the ranking is decided on) on the far right.\n",
             "the return on the stake and the last five calls. X2: no wins column, the rows ranked by direction (build.py).\n"),
            ("  var lead=LADDER&&LADDER[0]?nm(LADDER[0].m):\"\";\n",""),
            ("function EZ_BEST(){var b=null,bv=-1;ROWS.forEach(function(T){var C=career(T.m);if(!EZ_FULL(T.m))return;var v=C.right/C.g;if(v>bv){bv=v;b=T.m}});return b}",""),
            ("/* X2: the best direction record among AIs that have called at least half the rounds */\n",""),
            ("function lbBest(){var b=null,bv=-1;RK.forEach(function(k){var C=CAR[k];if(C.g<ROUNDS.length/2)return;var v=C.right/C.g;if(v>bv){bv=v;b=k}});return b}\n","")]:
            assert page.count(a)==1,a[:90]; page=page.replace(a,b)
        # the "Longest winning streak" record: a tie goes to LADDER's order (WINS_ORDER, above), as on the other pages and
        # as before the ranking changed (it fell to RK, which follows the direction ranking on X2)
        a="RK.map(function(m){return run(m,winF,true)})"
        assert page.count(a)==2,page.count(a); page=page.replace(a,"WINS_ORDER.map(function(m){return run(m,winF,true)})")
        # X2's Overview order (owner, 2026-10-13): its styles, after the page's own (the code is the X2 block in routes.js)
        X2CSS=open(sys.argv[1]+'/x2-overview.css').read()
        # X2's dark mode (owner, 2026-10-13): X5's switch and dark C, colour only. tools/v22/skin-x2dark.css (dark C on
        # every route, generated by tools/v22/gen-skin-x2dark.py: rerun it after a CSS change; then the switch and the
        # hand fixes), after X2's own styles; the class x2d on <html> from the first paint; and a small script that sets
        # the theme before the first paint: the viewer's saved choice, else the host's data-theme on <html>, else the
        # phone's setting, else light. In light the page is X2 as it was (the browser bar keeps X2's colour too).
        DARK=open(sys.argv[1]+'/skin-x2dark.css').read()
        THEME=('<script>/* X2 theme before the first paint (try/catch: storage can be blocked) */(function(){var d=document.documentElement,s=null,h=d.getAttribute("data-theme"),t,m;'
               'try{s=localStorage.getItem("ez-theme")}catch(e){}d.setAttribute("data-x2host",h||"");'
               't=s==="light"||s==="dark"?s:h==="light"||h==="dark"?h:window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";'
               'd.setAttribute("data-theme",t);d.style.colorScheme=t;m=document.querySelector(\'meta[name="color-scheme"]\');if(m)m.setAttribute("content",t);'
               'm=document.querySelector(\'meta[name="theme-color"]\');if(m){m.setAttribute("data-x2tc",m.getAttribute("content"));if(t==="dark")m.setAttribute("content",getComputedStyle(d).getPropertyValue("--field").trim()||"#1d1c1a")}})()</script>\n')
        # the model page's chart caption: "GPT in black, the others in grey." was wrong in X2 too (the line is yellow, gold in
        # dark) and the chart names every line at its end: the caption keeps the method only, as on X5
        for a,b in [("'+nmM+' in black, the others in grey. Simulated,","Simulated,"),
                    ('<html lang="en" class="pt">','<html lang="en" class="pt x2d">'),
                    ('</head>','<style id="x2-overview">\n'+X2CSS+'\n</style>\n<style id="x2-dark">\n'+DARK+'\n</style>\n'+THEME+'</head>')]:
            assert page.count(a)==1,a; page=page.replace(a,b)
    if exp=="x3":
        # X3 re-skin (owner, 2026-10-11): its own stylesheet and fonts, so X1 and X2 stay byte for byte
        SKIN=open(sys.argv[1]+'/skin-x3.css').read()
        FONTS='<link id="x3-fonts" href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400..700&family=Instrument+Sans:wdth,wght@75..100,400..700&display=swap" rel="stylesheet">\n'
        assert page.count('</head>')==1; page=page.replace('</head>',FONTS+'<style id="x3-skin">\n'+SKIN+'\n</style>\n</head>')
        # X3 sets no text in Barlow, Anton, Archivo, Chivo Mono or Instrument Serif: drop those font requests
        page,n1=re.subn(r'<link id="pt-fonts"[^>]*>\n','',page)
        page,n2=re.subn(r'<link[^>]*family=Anton[^>]*>\n','',page)
        IS='(function(){var l=document.createElement("link");l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap";document.head.appendChild(l)})()'
        assert (n1,n2)==(1,1) and page.count(IS)==1,(n1,n2,page.count(IS)); page=page.replace(IS,'void 0')
        # X3's own lines on the NVIDIA call follow X2's (owner, 2026-10-12): the leaderboard freezes SIM.leadHours before NVIDIA reports
        for a,b in [
            ("""gt.innerHTML='At zero, we take #1\\'s NVIDIA call: up or down. We open it on Hyperliquid at <b>'""",
             """gt.innerHTML=(SIM.leadHours!=null?SIM.leadHours+' hours before NVIDIA reports, the leaderboard freezes. The AI in first place makes the call: up or down. At zero, we open the trade':'At zero, we take #1\\'s NVIDIA call: up or down. We open it')+' on Hyperliquid at <b>'"""),
            ("""'Most wins is #1. When the timer hits zero, we take #1\\'s NVIDIA call. Same wins?""",
             """'Most wins is #1. '+(SIM.leadHours!=null?SIM.leadHours+' hours before NVIDIA reports, the leaderboard freezes. The AI in first place makes the call: up or down.':'When the timer hits zero, we take #1\\'s NVIDIA call.')+' Same wins?""")]:
            assert page.count(a)==1,a; page=page.replace(a,b)
    if exp=="x4":
        # X4 (owner, 2026-10-12): X2's layout, type and geometry, in X3's colours. Colour only: tools/v22/skin-x4.css,
        # generated by tools/v22/gen-skin-x4.py (rerun it after a CSS change). The class is on <html> from the first paint.
        SKIN=open(sys.argv[1]+'/skin-x4.css').read()
        for a,b in [('<html lang="en" class="pt">','<html lang="en" class="pt x4">'),('<meta name="color-scheme" content="light">','<meta name="color-scheme" content="dark">'),
                    ('<meta name="theme-color" content="#ffffff">','<meta name="theme-color" content="#0b0e14">'),('</head>','<style id="x4-skin">\n'+SKIN+'\n</style>\n</head>')]:
            assert page.count(a)==1,a; page=page.replace(a,b)
    if exp=="x5":
        # X5 (owner's picks, 2026-10-12): layout A, dark C, font H. Its own stylesheet (tools/v22/skin-x5.css: font H,
        # the X5 Overview, and dark C on every route, generated by tools/v22/gen-skin-x5.py: rerun it after a CSS change),
        # the fonts' link, and a small script that sets the theme before the first paint: the viewer's saved choice, else
        # the host's data-theme on <html>, else the phone's setting, else light.
        SKIN=open(sys.argv[1]+'/skin-x5.css').read()
        FONTS='<link id="x5-fonts" href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&family=Geist:wght@100..900&family=Mona+Sans:wdth,wght@75..125,200..900&display=swap" rel="stylesheet">\n'
        THEME=('<script>/* X5 theme before the first paint (try/catch: storage can be blocked) */(function(){var d=document.documentElement,s=null,h=d.getAttribute("data-theme"),t;'
               'try{s=localStorage.getItem("ez-theme")}catch(e){}d.setAttribute("data-x5host",h||"");'
               't=s==="light"||s==="dark"?s:h==="light"||h==="dark"?h:window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";'
               'd.setAttribute("data-theme",t);d.style.colorScheme=t;var m=document.querySelector(\'meta[name="color-scheme"]\');if(m)m.setAttribute("content",t);'
               'm=document.querySelector(\'meta[name="theme-color"]\');if(m)m.setAttribute("content",getComputedStyle(d).getPropertyValue("--field").trim()||m.getAttribute("content"))})()</script>\n')
        for a,b in [('<html lang="en" class="pt">','<html lang="en" class="pt x5">'),('</head>',FONTS+'<style id="x5-skin">\n'+SKIN+'\n</style>\n'+THEME+'</head>')]:
            assert page.count(a)==1,a; page=page.replace(a,b)
        # X5 sets no text in Barlow, Anton, Archivo, Chivo Mono or Instrument Serif (font H covers every role; X2's serif
        # findings and highlight heads take the head face in skin-x5.css): drop those font requests, as X3 does
        page,n1=re.subn(r'<link id="pt-fonts"[^>]*>\n','',page)
        page,n2=re.subn(r'<link[^>]*family=Anton[^>]*>\n','',page)
        IS5='(function(){var l=document.createElement("link");l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap";document.head.appendChild(l)})()'
        assert (n1,n2)==(1,1) and page.count(IS5)==1,(n1,n2,page.count(IS5)); page=page.replace(IS5,'void 0')
        # "lock" is kept off X5, where the leaderboard freezes: the AIs' calls are "filed" before the report, as the footer says
        for a,b,n in [(' up or down, plus how much, locked before the report. ',' up or down, plus how much, filed before the report. ',1),
                      ('<b>Locked <span class="nw">','<b>Filed <span class="nw">',2),
                      # the model page's chart caption: X2's "GPT in black, the others in grey." is wrong in X5 (the line is
                      # yellow, gold in dark) and the chart names every line at its end: the caption keeps the method only
                      ("'+nmM+' in black, the others in grey. Simulated,","Simulated,",1),
                      # the model page's legend: each item stays whole ("wrong / way" broke at 360 px in font H)
                      ('<span class="pf-lg2"><i class="w"></i>won the round <i class="g"></i>right way <i class="r"></i>wrong way</span>',
                       '<span class="pf-lg2"><span class="x5lg"><i class="w"></i>won the round</span> <span class="x5lg"><i class="g"></i>right way</span> <span class="x5lg"><i class="r"></i>wrong way</span></span>',1),
                      # the Leaderboard tab's records head had the Overview record's id (recH): its own id on X5
                      ('<section class="blk xsec" aria-labelledby="recH">\'+xsh("05","Records","Hall of fame (and shame)","The three records that matter. Tap one for the story.",false,"recH")',
                       '<section class="blk xsec" aria-labelledby="recBk">\'+xsh("05","Records","Hall of fame (and shame)","The three records that matter. Tap one for the story.",false,"recBk")',1)]:
            assert page.count(a)==n,a; page=page.replace(a,b)
    open(out,'w').write(page); print("ok",out,len(page))
