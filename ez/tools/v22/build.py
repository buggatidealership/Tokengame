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
# EZ Season ranks by direction (owner, 2026-10-14: "rank them by accuracy as well", after X2), in v15-season.html itself:
# the RANK styles, the rule in "How we grade", the standings' script (ROWS sorted by direction, no wins in the rows, the
# scores bar) and the money list without gold. X3, X4 and X5 build from it (their extras: the x2..x5, x3 and X5 parts
# below). X1 is locked and ranks by wins: V15_BOTH and V15_X1 put v15's earlier text back, (today's text, X1's) in
# pairs, a regex where a comment is long. X2 ranked by direction first and keeps its text byte for byte: the RANK styles
# go (it has its own in x2-overview.css), and the parts it never shows ("How we grade" leaves its hero, the money list
# its Overview) and two style comments keep their earlier text (V15_BOTH); its standings' comments are X2's own (the x2
# branch).
RANK_CSS=re.compile(r'<!--RANK:.*?<!--/RANK-->\n',re.S)
V15_BOTH=[
    ('/* standings: one row per model. Rank, logo, name, how often it called the direction right (ranked by it: the RANK\n   styles, ROWS in the script). The leader (ROWS[0]) is lime and wears the crown. */',
     '/* standings: one row per model. Rank, logo, name, wins. The leader (LADDER[0]) is lime and wears the crown. */'),
    ("/* standings: the name on the logo's line, then how often it called the direction right (no wins since 2026-10-14) */",
     "/* standings: the name on the logo's line, then how often it called the direction right, then the wins */"),
    ('<li id="howRk"><b>Ranks.</b> Most accurate is #1. A tie goes to the smaller average miss.</li>',
     '<li><b>Ties.</b> Same wins? The one closer on average ranks higher.</li>'),
    (re.compile(r'  /\* one tile per AI, in money order: .*?\*/\n',re.S),
     '  /* one tile per AI: the return big, the dollars under it, and its path from the stake (dashed) round by round */\n'),
    ("""    return '<li class="ft"><span class="ft-w">'""","""    return '<li class="ft'+(i?'':' lead')+'"><span class="ft-w">'""")]
V15_X1=[
    (re.compile(r'/\* ---------- hero: the standings, ranked by direction \(owner, 2026-10-14\) ----------\n.*?\*/\n',re.S),
     "/* ---------- hero: the standings, a leaderboard of rounds won ----------\n"
     "   Order and tie-breaks come from LADDER (ez-data.js: wins, then the smaller average miss). Ties share the rank number.\n"
     "   The crown goes to LADDER[0]. A model with calls but none graded yet (Grok) joins the table below them with 0 wins. */\n"),
    (re.compile(r'/\* rank = direction \(owner, 2026-10-14: .*?Ranked after the rest\."\)\}\)\(\);\n',re.S),
     "/* rank = wins, then the smaller average miss (owner, 2026-10-08): equal wins no longer share a place */\n"
     "function rankOf(T){var a=parseFloat(T.avg);return 1+ROWS.filter(function(U){var b=parseFloat(U.avg);return U.won>T.won||(U.won===T.won&&!isNaN(b)&&(isNaN(a)||b<a))}).length}\n"),
    ("(rankOf(T)===1&&career(T.m).g>0?' r1':'')","(rankOf(T)===1&&T.won>0?' r1':'')"),
    ("pcStats(T.m)+'</li>'}).join(\"\");","pcStats(T.m)+\n    '<p class=\"pc-w\"><b>'+T.won+'</b><span>'+(T.won===1?'win':'wins')+'</span></p></li>'}).join(\"\");"),
    ("<small>'+(C.g<ROUNDS.length/2?C.right+' of '+C.g+' calls':'on direction')+'</small>","<small>'+(C.g<ROUNDS.length?C.right+' of '+C.g+' right':'hit rate')+'</small>"),
    ("'<b>Leaderboard</b> On direction: '+ROWS.map(function(T){var C=career(T.m);return nm(T.m)+' '+(!C.g?'n/a':C.g>=ROUNDS.length/2?Math.round(C.right/C.g*100)+'%':C.right+' of '+C.g)}).join(' · ')",
     "'<b>Leaderboard</b> '+ROWS.map(function(T){return nm(T.m)+' '+T.won}).join(' · ')"),
    ('$("#gpuLev").textContent=(SIM.leverage!=null?SIM.leverage:5)+"x";\n  var when=',
     '$("#gpuLev").textContent=(SIM.leverage!=null?SIM.leverage:5)+"x";\n  var lead=LADDER&&LADDER[0]?nm(LADDER[0].m):"";\n  var when=')]
def swap(page,pairs):   # each pair once: a string, or a regex (a long comment)
    for a,b in pairs:
        if isinstance(a,str): assert page.count(a)==1,a[:90]; page=page.replace(a,b)
        else: page,n=a.subn(lambda m:b,page,count=2); assert n==1,(n,a.pattern[:60])
    return page
for out,exp,title in [("v22-season-live.html","","EZ Season Live"),("v23-live-x1.html","x1","EZ Live X1"),("v24-live-x2.html","x2","EZ Live X2"),("v41-live-x3.html","x3","EZ Live X3"),("v42-live-x4.html","x4","EZ Live X4"),("v43-live-x5.html","x5","EZ Live X5")]:
    jx=js.replace('/*X5{*/','').replace('/*}X5*/','') if exp=="x5" else X5M.sub('',js)
    jx=jx.replace('/*X2{*/','').replace('/*}X2*/','') if exp=="x2" else X2M.sub('',jx)
    page=base[:i]+'window.EZ_EXP="'+exp+'";\n'+jx+base[i:]
    page=re.sub(r'<title>[^<]*</title>','<title>'+title+'</title>',page,1)
    if exp=="x1": page=re.sub(r'<!--WSJ:.*?<!--/WSJ-->\n','',page,flags=re.S)
    if exp=="":  # Season Live is retired (2026-10-14) and keeps its Wins column: v15's RANK grids would break its rows
        page,n=RANK_CSS.subn('',page); assert n==1,n
    if exp in ("x1","x2"):  # X1 ranks by wins; X2 keeps its own text (V15_BOTH, V15_X1, above)
        page,n=RANK_CSS.subn('',page); assert n==1,n
        page=swap(page,V15_BOTH+(V15_X1 if exp=="x1" else []))
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
        # standings: one number people care about, the percentage of calls right on direction: "on direction", or "x of y
        # calls" for an AI that called under half the rounds (EZ_FULL). The rows are ranked by it (v15, owner 2026-10-14),
        # so #1 is the most accurate AI (EZ_LEAD, the AI with graded calls on top) and its row says it makes the NVIDIA
        # call. The same rule decides every rank and leader mark on the routes (the ranking block below).
        H="var STAND_STAT=\"right\",FOL_EARLY=null;"
        assert page.count(H)==1
        page=page.replace(H,H+"function EZ_FULL(m){return career(m).g>=ROUNDS.length/2}function EZ_LEAD(){return ROWS[0]&&career(ROWS[0].m).g>0?ROWS[0].m:null}")
        for a,b in [("""<small>'+(C.g<ROUNDS.length/2?C.right+' of '+C.g+' calls':'on direction')+'</small>""","""<small>'+(!EZ_FULL(m)?C.right+' of '+C.g+' calls':'on direction')+'</small>"""),
                    ("(!C.g?'n/a':C.g>=ROUNDS.length/2?","(!C.g?'n/a':EZ_FULL(T.m)?")]:   # the scores strip
            assert page.count(a)==1,a; page=page.replace(a,b)
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
        # ranked by direction (owner, 2026-10-14: X2 first, "most people care about accuracy on directional calls ... it
        # makes more sense to go with the most accurate model"; then "rank them by accuracy as well" for EZ Season, X3, X4
        # and X5). Hit rate = calls right on direction / calls made. AIs that called at least half the graded rounds rank
        # first, by hit rate, a tie going to the smaller average miss; then the rest, the same way; no shared places (a
        # full tie keeps LADDER's order: wins, then the smaller average miss). ROWS is sorted once in v15, before anything
        # is drawn, so this one rule decides #1 everywhere: the Overview's standings, the Leaderboard tab, the Leads crown,
        # "In line for the call", the scores strip, the model pages and their order (and X3's race and leaderboard, the x3
        # branch; X5's "Who's leading now", its block in routes.js). Wins leave the standings rows (the number, the label and the Leaderboard tab's
        # column; the RANK styles in v15 take the column out of routes.css's grids, X2's own in x2-overview.css); each
        # round's winner stays on its card. The "Most accurate" tag goes (the top spot is the most accurate now). The
        # percentage reads "on direction"; an AI under half the rounds keeps "x of y calls". Every number comes from
        # ez-data.js.
        for a,b in [
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
            # stale now (the ranking is by direction): the comment, and the best direction record for the "Most accurate" tag
            ("the return on the stake, the last five rounds, and wins (what the ranking is decided on) on the far right.\n",
             "the return on the stake and the last five calls. X2: no wins column, the rows ranked by direction (build.py).\n"),
            ("/* X2: the best direction record among AIs that have called at least half the rounds */\n",""),
            ("function lbBest(){var b=null,bv=-1;RK.forEach(function(k){var C=CAR[k];if(C.g<ROUNDS.length/2)return;var v=C.right/C.g;if(v>bv){bv=v;b=k}});return b}\n","")]:
            assert page.count(a)==1,a[:90]; page=page.replace(a,b)
        # the "Longest winning streak" record: a tie goes to LADDER's order (WINS_ORDER, v15), as on the other pages and
        # as before the ranking changed (it fell to RK, which follows the direction ranking)
        a="RK.map(function(m){return run(m,winF,true)})"
        assert page.count(a)==2,page.count(a); page=page.replace(a,"WINS_ORDER.map(function(m){return run(m,winF,true)})")
    if exp in ("x3","x4","x5"):
        # "Getting smarter or just lucky?", ROI (owner, 2026-10-14): the standings rank by direction, so the Overview's money
        # tiles lose their rank numbers and the leader's gold (a gold "1 GPT" one scroll under "#1 Grok" read as a second
        # leader); they keep the money order and the up/down pills. X2 hides them in its styles (x2-overview.css); here the
        # Overview's tiles (#lqDist) are drawn without them, one grid area fewer (v15's RANK styles). The Leaderboard tab's
        # ROI stat keeps its numbers: it ranks by money. (X5's Overview has no ROI tiles; its Leaderboard tab is the same.)
        a="""return '<li'+(i?'':' class="lead"')+'><span class="pk-r">'+(i+1)+'</span>'+logo(f.m)"""
        assert page.count(a)==1; page=page.replace(a,"""return (face.id==="lqDist"?'<li>':'<li'+(i?'':' class="lead"')+'><span class="pk-r">'+(i+1)+'</span>')+logo(f.m)""")
    if exp=="x2":
        # X2 ranked by direction first (owner, 2026-10-14; the rule is v15's since EZ Season followed, the routes' parts are
        # the x2..x5 block above). X2 keeps its text byte for byte: its own comments on the standings, no "How we grade"
        # sentence (the rule is said on its Leaderboard tab), and the Overview's rows get the last five calls (formSq, as
        # on the Leaderboard tab; x2-overview.css), X2 alone.
        page=swap(page,[
            (re.compile(r'/\* ---------- hero: the standings, ranked by direction \(owner, 2026-10-14\) ----------\n.*?\*/\n',re.S),
             "/* ---------- hero: the standings. On X2 (build.py, owner 2026-10-14) ROWS starts in LADDER's order (ez-data.js:\n"
             "   wins, then the smaller average miss) and is sorted by direction below, before anything is drawn. The crown goes\n"
             "   to ROWS[0]. A model with calls but none graded yet joins below the others. */\n"),
            (re.compile(r'/\* rank = direction \(owner, 2026-10-14: .*?\*/\n',re.S),
             '/* X2: rank = direction (owner, 2026-10-14). Hit rate = calls right on direction / calls made; AIs that called at least half\n'
             '   the graded rounds first, by hit rate (compared as whole numbers, right x calls), a tie going to the smaller average\n'
             '   miss; then the rest the same way; an AI with no graded call last. No shared places: the place is the row\'s position.\n'
             '   WINS_ORDER keeps LADDER\'s order (wins, then the smaller average miss) from before the sort: the "Longest winning\n'
             '   streak" record breaks a tie with it, as on the other pages, so the ranking never moves a record. */\n'),
            (re.compile(r'\(function\(\)\{var h=\$\("#howRk"\).*?\n'),''),
            ("nm(T.m)+'</a></h3>'+(T.m===EZ_LEAD()?","nm(T.m)+'</a></h3><span class=\"lb-f2 x2o-f\">'+formSq(career(T.m))+'</span>'+(T.m===EZ_LEAD()?")])
        # X2's Overview order (owner, 2026-10-13): its styles, after the page's own (the code is the X2 block in routes.js)
        X2CSS=open(sys.argv[1]+'/x2-overview.css').read()
        # X2's dark mode (owner, 2026-10-13): X5's switch and dark C, colour only. tools/v22/skin-x2dark.css (dark C on
        # every route, generated by tools/v22/gen-skin-x2dark.py: rerun it after a CSS change; then the switch and the
        # hand fixes), after X2's own styles; the class x2d on <html> from the first paint; and a small script that sets
        # the theme before the first paint: the viewer's saved choice, else the host's data-theme on <html>, else the
        # phone's setting, else light. In light the page is X2 as it was (the browser bar keeps X2's colour too).
        DARK=open(sys.argv[1]+'/skin-x2dark.css').read()
        # the logo look (owner, 2026-10-18), X2 only, dark mode only: tools/v22/skin-x2logo.css after the dark skin, with Kalam
        LOGO=('<link id="x2-logo-fonts" href="https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&display=swap" rel="stylesheet">\n'
              '<style id="x2-logo">\n'+open(sys.argv[1]+'/skin-x2logo.css').read()+'\n</style>\n')
        THEME=('<script>/* X2 theme before the first paint (try/catch: storage can be blocked) */(function(){var d=document.documentElement,s=null,h=d.getAttribute("data-theme"),t,m;'
               'try{s=localStorage.getItem("ez-theme")}catch(e){}d.setAttribute("data-x2host",h||"");'
               't=s==="light"||s==="dark"?s:h==="light"||h==="dark"?h:window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";'
               'd.setAttribute("data-theme",t);d.style.colorScheme=t;m=document.querySelector(\'meta[name="color-scheme"]\');if(m)m.setAttribute("content",t);'
               'm=document.querySelector(\'meta[name="theme-color"]\');if(m){m.setAttribute("data-x2tc",m.getAttribute("content"));if(t==="dark")m.setAttribute("content",getComputedStyle(d).getPropertyValue("--field").trim()||"#1d1c1a")}})()</script>\n')
        # the model page's chart caption: "GPT in black, the others in grey." was wrong in X2 too (the line is yellow, gold in
        # dark) and the chart names every line at its end: the caption keeps the method only, as on X5
        for a,b in [("'+nmM+' in black, the others in grey. Simulated,","Simulated,"),
                    ('<html lang="en" class="pt">','<html lang="en" class="pt x2d">'),
                    ('</head>','<style id="x2-overview">\n'+X2CSS+'\n</style>\n<style id="x2-dark">\n'+DARK+'\n</style>\n'+LOGO+THEME+'</head>')]:
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
            # ranked by direction (owner, 2026-10-14), so wins no longer decide #1: the line says the rule in X3's words
            ("""'Most wins is #1. When the timer hits zero, we take #1\\'s NVIDIA call. Same wins? The one closer on average ranks higher.',lbBody);""",
             """'Most accurate is #1. '+(SIM.leadHours!=null?SIM.leadHours+' hours before NVIDIA reports, the leaderboard freezes. The AI in first place makes the call: up or down.':'When the timer hits zero, we take #1\\'s NVIDIA call.')+' Same rate? The one closer on average ranks higher.'+(ROWS.some(function(T){var g=career(T.m).g;return g>0&&g<ROUNDS.length/2})?' Called under half the rounds? Ranked after the rest.':''),lbBody);""")]:
            assert page.count(a)==1,a; page=page.replace(a,b)
        # X3 ranks by direction too (owner, 2026-10-14: "rank them by accuracy as well"; the order is v15's ROWS, so the
        # race, the #1 tags and the leaderboard follow it). Its standings figure is the share of calls right on direction,
        # "on direction" ("x of y calls" under half the rounds), not wins: the hero's line and race, and the leaderboard's
        # rows. The note under the rows keeps the late joiner's call count (its share is of fewer calls) and drops the
        # wins tally. The last round's card keeps its winner.
        for a,b in [
            ("' AIs call stocks before earnings. Most wins is #1.</p>'","' AIs call stocks before earnings. Most accurate is #1.</p>'"),
            ("""var race='<div class="x3-race" role="list" aria-label="Wins so far">'+RKS.map(function(T,i){var one=rankOf(T)===1;""",
             """var race='<div class="x3-race" role="list" aria-label="Right on direction so far">'+RKS.map(function(T,i){var one=rankOf(T)===1,C=career(T.m);"""),
            ("""'<b>'+nm(T.m)+'</b><strong>'+T.won+'</strong><small>'+(T.won===1?'win':'wins')+'</small></div>'}).join("")+'</div>';""",
             """'<b>'+nm(T.m)+'</b><strong>'+(C.g?pctOf(C.right,C.g)+'%':'n/a')+'</strong><small>'+(!C.g?'no calls yet':C.g>=ROUNDS.length/2?'on direction':C.right+' of '+C.g+' calls')+'</small></div>'}).join("")+'</div>';"""),
            ("/* ===== 02 THE LEADERBOARD: who makes the call; wins big, right way small, one tag ===== */",
             "/* ===== 02 THE LEADERBOARD: who makes the call; right on direction big, one tag (X3: ranked by direction, build.py) ===== */"),
            ("""  var tw=ROWS.reduce(function(a,T){return a+(T.won||0)},0),nob=ROUNDS.filter(function(r){return !r.win}).length,shr=ROUNDS.filter(function(r){return r.win&&r.win.indexOf(" & ")>-1}).length;\n"""
             """  var note=[];\n"""
             """  if(tw!==ROUNDS.length)note.push(tw+' wins in '+ROUNDS.length+' rounds: '+[nob?nob+(nob>1?' had':' had')+' no winner':'',shr?shr+(shr>1?' were':' was')+' shared':''].filter(Boolean).join(', ')+'.');\n""",
             """  var note=[];\n"""),
            ("""'<span class="x3-w"><b>'+T.won+'</b><small>'+(T.won===1?'win':'wins')+'</small></span></li>'""",
             """'<span class="x3-w"><b>'+(C.g?pctOf(C.right,C.g)+'%':'n/a')+'</b><small>'+(!C.g?'no calls yet':C.g>=ROUNDS.length/2?'on direction':C.right+' of '+C.g+' calls')+'</small></span></li>'""")]:
            assert page.count(a)==1,a[:90]; page=page.replace(a,b)
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

# EZ Live X6 (owner, 2026-10-18: "Create a new X6 for it"): X2's page as built above, plus tools/v22/skin-x6.css (the logo's
# cel/anime look in dark mode, Dela Gothic One heads) and tools/v22/x6.js (the Overview reworded around "the tryout" and put
# in a newcomer's order). X2's handwriting trial (x2-logo) is left out. Every other page is untouched.
p6=open("v24-live-x2.html").read()
for a,b in [('<title>EZ Live X2</title>','<title>EZ Live X6</title>'),
            # X2's Overview keeps its sections in order each time it shows: X6's order puts the standings before the record
            ('var seq=[hero,top,rec,st,learn,get]','var seq=[hero,top,st,rec,learn,get]'),
            ('var k=0;[rec,st,learn,get].forEach','var k=0;[st,rec,learn,get].forEach')]:
    assert p6.count(a)==1,a; p6=p6.replace(a,b)
p6,k1=re.subn(r'<link id="x2-logo-fonts"[^>]*>\n','',p6)
p6,k2=re.subn(r'<style id="x2-logo">.*?</style>\n','',p6,flags=re.S)
assert (k1,k2)==(1,1),(k1,k2)
X6CSS=open(sys.argv[1]+'/skin-x6.css').read(); X6JS=open(sys.argv[1]+'/x6.js').read()
assert p6.count('</head>')==1 and p6.count('</body>')==1
p6=p6.replace('</head>','<link id="x6-fonts" href="https://fonts.googleapis.com/css2?family=Dela+Gothic+One&display=swap" rel="stylesheet">\n<style id="x6-skin">\n'+X6CSS+'\n</style>\n</head>')
p6=p6.replace('</body>','<script id="x6-words">\n'+X6JS+'\n</script>\n</body>')
open("v44-live-x6.html",'w').write(p6); print("ok v44-live-x6.html",len(p6))

# EZ Live X2+ (owner, 2026-10-19: "Can you do a X2 plus"): X2's page as built above, every tab and route as it is, in X7's
# anime cel look (tools/v22/skin-x2plus.css), night only, with the owner's first-screen words of 2026-10-19
# (tools/v22/x2plus.js: the concept in four bullets, "Countdown to bet #1 · NVIDIA" under the chip, "pool"). The record
# opens on the newest round, centred (owner, 2026-10-20).
# X2's handwriting trial (x2-logo) is left out, as on X6. X2 itself is untouched.
pp=open("v24-live-x2.html").read()
XPMARK=open(sys.argv[1]+'/x2p-logo.svg').read().strip()   # the EZ. logo (the X avatar, traced; 2026-10-28: it was the $EZ mark, x2p-mark.svg), for the cover
for a,b in [('<title>EZ Live X2</title>','<title>EZ Live X2+</title>'),
            # (owner, 2026-10-23: "I want the current page to be the only page, not the makeover") the page arrives covered (x2p-cur) and
            # x2plus.js lifts the cover once the X2+ page is built; only a small $EZ mark shows meanwhile (skin-x2plus.css, CURTAIN)
            ('<html lang="en" class="pt x2d">','<html lang="en" class="pt x2d x2p x2p-cur" data-theme="dark">'),
            # a shared link to a graded round (#/round/43) opened X2's Results tab under its card, a tab X2+ does not have at launch, so
            # the cover waited 9.5 s and closing the card left the visitor there; on X2+ it opens over the Overview, where the record is
            ('if(X1&&(p[0]==="results"||(p[0]==="round"&&findR(+p[1])))){sec="results";if(p[0]==="round")openN=+p[1];',
             'if(p[0]==="round"&&findR(+p[1])){openN=+p[1]}\n    else if(X1&&(p[0]==="results"||(p[0]==="round"&&findR(+p[1])))){sec="results";if(p[0]==="round")openN=+p[1];'),
            # the browser's own colours are the night ones from the first byte (a phone's top bar and the canvas before the first paint
            # were white until X2's script switched them)
            ('<meta name="color-scheme" content="light">','<meta name="color-scheme" content="dark">'),
            ('<meta name="theme-color" content="#ffffff">','<meta name="theme-color" content="#0b0a14">'),
            # forced dark (2026-10-24: a visitor's Android phone repainted the page, ink on the tickets turned cream on cream, the gold
            # went brown and the printed logos vanished; Samsung Internet's dark mode and other forced-dark browsers darken a page they
            # take for a light one): the page says dark, and only dark, everywhere it states its colours, never light (X2's base sheet
            # opened with light), with a prefers-color-scheme rule as well, which older Samsung Internet looks for
            (':root{color-scheme:light;',':root{color-scheme:dark;color-scheme:only dark;'),
            ('html.x2d[data-theme="dark"]{color-scheme:dark}',
             'html.x2d[data-theme="dark"]{color-scheme:dark;color-scheme:only dark}@media (prefers-color-scheme:dark){html.x2d{color-scheme:only dark}}'),
            ('d.style.colorScheme=t;','d.style.colorScheme="only dark";'),
            ('root.style.colorScheme=t;','root.style.colorScheme=t==="dark"?"only dark":t;'),
            # the close is the market's word (owner, 2026-10-25: "instead of outcome, it should be market... across the entire website"):
            # the record back's close row, and everywhere else bkOut() draws it, reads Market on X2+ (v15 and the locked pages keep Outcome)
            ('const ACTUAL_WORD = "Outcome";','const ACTUAL_WORD = "Market";'),
            # a round with calls in but no grading date yet (2026-10-28, R59 GE Vernova) sorted first and took the "In play" pill
            # over the rounds graded today; it goes after every dated round (Infinity), so the pill shows the next close
            ('var PS=PENDING.slice().sort(function(a,b){return ((mmdd(a.resolves)||0)-(mmdd(b.resolves)||0))||(a.n-b.n)});',
             'var PS=PENDING.slice().sort(function(a,b){return ((mmdd(a.resolves)||Infinity)-(mmdd(b.resolves)||Infinity))||(a.n-b.n)});'),
            # (audit, 2026-10-28) the Upcoming score bar still led with "On direction" after the board moved to P&L, and printed an arrow
            # and a sign together ("▲+5.95%"): on X2+ it leads with each AI's P&L (the same account as the board: $100,000, the whole
            # balance on every call), and the move keeps its arrow only
            ("""'<b>Leaderboard</b> On direction: '+ROWS.map(function(T){var C=career(T.m);return nm(T.m)+' '+(!C.g?'n/a':EZ_FULL(T.m)?Math.round(C.right/C.g*100)+'%':C.right+' of '+C.g)}).join(' · ')""",
             """'<b>P&amp;L</b> '+(function(){var A={};ROUNDS.forEach(function(r){if(typeof r.a!=="number"||isNaN(r.a))return;r.calls.forEach(function(x){A[x[0]]=(A[x[0]]||100000)*(1+(/^DOWN/.test(x[1])?-1:1)*r.a/100)})});return Object.keys(A).sort(function(a,b){return A[b]-A[a]}).map(function(m){var v=A[m]-100000;return nm(m)+' '+(v>=0?'+$':'−$')+(Math.abs(v)/1000).toFixed(1)+'K'}).join(' · ')})()"""),
            ("""<span aria-hidden="true">'+(r.a>0?'▲':'▼')+'</span>'+r.out+'</span> · '+w)""",
             """<span aria-hidden="true">'+(r.a>0?'▲':'▼')+'</span>'+r.out.replace(/^[+−-]/,"")+'</span> · '+w)"""),
            # the first screen's fonts are asked for at once (window.__x2pF; x2plus.js waits for them before it lifts the cover), not when
            # the page first lays them out; the cover comes off by itself after 20 s whatever happens, and at once without scripts
            ('<body>','<body>\n<div id="x2pLoad" aria-hidden="true">'+XPMARK+'</div>\n'
             '<noscript><style>html.x2p-cur body>*:not(#x2pLoad):not(#x2pNs){opacity:1!important}#x2pLoad{display:none}</style></noscript>\n'
             '<script>(function(d){try{if(d.fonts&&d.fonts.load)window.__x2pF=Promise.all(["400 1em Anton","800 1em \'Barlow Condensed\'","800 1em Barlow","700 1em Barlow","500 1em Barlow","400 1em \'Alfa Slab One\'"]'
             '.map(function(f){return d.fonts.load(f)}))}catch(e){}setTimeout(function(){d.documentElement.classList.remove("x2p-cur")},20000)})(document)</script>'),
            # speed (2026-10-23): fitTitles re-measured the whole page about 1,500 times per run, mostly on titles X2+ hides (1px wide for
            # screen readers). On X2+: skip those, read every title before writing any, size each in one step (then a check), and refit
            # only when the width changes (phones fire a resize when the address bar hides). Same sizes, give or take half a pixel.
            ('''function fitTitles(){$$(FIT).forEach(function(e){e.style.fontSize="";e.style.whiteSpace="";e.style.overflowWrap="";
  if(e.scrollWidth<=e.clientWidth+1||!e.clientWidth)return;var f0=parseFloat(getComputedStyle(e).fontSize),f=f0;
  while(e.scrollWidth>e.clientWidth+1&&f>f0*.72){f-=.5;e.style.fontSize=f+"px"}
  if(e.scrollWidth>e.clientWidth+1){e.style.whiteSpace="normal";e.style.overflowWrap="anywhere"}})}''',
             '''function fitTitles(){var L=$$(FIT);L.forEach(function(e){e.style.fontSize="";e.style.whiteSpace="";e.style.overflowWrap=""});
  var M=L.map(function(e){var c=e.clientWidth;return c>8?[e,e.scrollWidth,c,parseFloat(getComputedStyle(e).fontSize)]:null}).filter(Boolean);
  M.forEach(function(m){if(m[1]>m[2]+1)m[0].style.fontSize=Math.max(m[3]*.72,Math.floor(m[3]*m[2]/m[1]*2)/2)+"px"});
  M.forEach(function(m){var e=m[0];if(!e.style.fontSize||e.scrollWidth<=e.clientWidth+1)return;var f=parseFloat(e.style.fontSize);
    while(e.scrollWidth>e.clientWidth+1&&f>m[3]*.72){f-=.5;e.style.fontSize=f+"px"}
    if(e.scrollWidth>e.clientWidth+1){e.style.whiteSpace="normal";e.style.overflowWrap="anywhere"}})}'''),
            ('var fitT=null;addEventListener("resize",function(){clearTimeout(fitT);fitT=setTimeout(fitTitles,140)});',
             'var fitT=null,fitW=innerWidth;addEventListener("resize",function(){if(innerWidth===fitW)return;fitW=innerWidth;clearTimeout(fitT);fitT=setTimeout(fitTitles,140)});'),
            # night only: the theme is dark before the first paint and stays dark (the switch is hidden in the skin)
            ('t=s==="light"||s==="dark"?s:h==="light"||h==="dark"?h:window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";','t="dark";'),
            ('function saved(){var s=null;try{s=localStorage.getItem("ez-theme")}catch(e){}return s==="light"||s==="dark"?s:null}','function saved(){return "dark"}'),
            ('function sys(){return window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}','function sys(){return "dark"}'),
            # Hall of fame (owner, 2026-10-20): the record that counts is calls right on direction, not wins: the
            # winning streak goes, the right-way streak (X1's hit streak, off on X2) comes in; x2plus.js names it
            ('if(wr.rs.length>1)out+=tile(X1?"Longest winning streak"','if(false&&wr.rs.length>1)out+=tile(X1?"Longest winning streak"'),
            ('if(rr.rs.length>1&&!X2)out+=tile(','if(rr.rs.length>1)out+=tile('),
            # the record opens on the newest round (its stats), centred as on X2 (owner, 2026-10-20: symmetry first), not
            # on the newest round with a film
            ('(function(){if(typeof SL==="undefined"||typeof go!=="function")return;for(var i=NR-1;i>=0;i--)if(SL[i]&&SL[i].d&&SL[i].d.film){',
             '(function(){return;for(var i=NR-1;i>=0;i--)if(SL[i]&&SL[i].d&&SL[i].d.film){'),
            # a round with a picture instead of a film (STILLS in ez-data.js; owner, 2026-10-23): the picture where the film goes,
            # no sound button; the card keeps its front and turns like a film card, and its back offers the picture
            ("function art(r){\n  if(!r.film)return '<div class=\"art\"><div class=\"soon\">",
             "function art(r){\n  if(!r.film&&r.still)return '<div class=\"art still\"><img src=\"'+MEDIA+r.still+'.jpg\" alt=\"\" loading=\"lazy\" decoding=\"async\"'+(r.stillx!=null?' style=\"object-position:'+r.stillx+'% 50%\"':'')+'></div>';\n  if(!r.film)return '<div class=\"art\"><div class=\"soon\">"),
            # a film whose board is not in the middle takes the same STILLX crop (R44, 2026-10-23): poster and video alike
            ('''<div class="art">'+(r.poster?'<img src="'+MEDIA+r.poster+'.jpg" alt="" loading="lazy" decoding="async">':'')+
    '<video playsinline muted loop preload="none" aria-label="Round '+r.n+' film">''',
             '''<div class="art">'+(r.poster?'<img src="'+MEDIA+r.poster+'.jpg" alt="" loading="lazy" decoding="async"'+(r.stillx!=null?' style="object-position:'+r.stillx+'% 50%"':'')+'>':'')+
    '<video playsinline muted loop preload="none"'+(r.stillx!=null?' style="object-position:'+r.stillx+'% 50%"':'')+' aria-label="Round '+r.n+' film">'''),
            ('var nf=!r.film,bk=backFace(r);','var nf=!r.film&&!r.still,bk=backFace(r);if(r.still&&!r.film)bk=bk.replace("\u21bb See the film","\u21bb See the picture");'),
            # speed (2026-10-27): the record's cards were all built whole at load, both faces, and their ~10,000 elements made up three
            # quarters of the page, so every style and layout pass before the cover lifted cost about 1 s each on a 4x slower phone.
            # The back of a graded card is unseen until that card is in front and turned, and from 351px wide it has no say in the
            # card's height (contain:size, skin-x2plus.css), so the backs of cards more than three places from the front are kept as
            # text and put in when the front card comes within three places (setCur), when a highlight or the round pop-up copies the
            # card (window.__x2pRecFill, x2plus.js), and all at once if the page narrows to 350px or less. A no-film card shows its back,
            # so it is always built whole. Once put in, a back is exactly what it was (x2plus.js labels it as before). Meanwhile the card
            # carries .x2p-bkw, so the one rule that told an upcoming card by its missing back rows (the grade's size, skin-x2plus.css)
            # still reads it as graded. Checked: every computed style of the cards and their fronts unchanged, and with every back put
            # in, the page's DOM is the old one. Never select a card by what its back holds without allowing for .x2p-bkw.
            ('car.innerHTML=SL.map(function(s,i){return s.k==="g"?gradedCard(s.d,i):s.k==="p"?pendingCard(s.d,i):sealedCard(s.d,i)}).join("");',
             'var RBK={},RMQ=window.matchMedia?matchMedia("(min-width:351px)"):null;\n'
             'car.innerHTML=SL.map(function(s,i){var h=s.k==="g"?gradedCard(s.d,i):s.k==="p"?pendingCard(s.d,i):sealedCard(s.d,i);\n'
             '  if(s.k==="g"&&RMQ&&RMQ.matches&&Math.abs(i-START)>3&&!/^<article class="[^"]*\\bnofilm\\b/.test(h)){var a=h.indexOf(\'<div class="face back"\'),e="</div></article>";\n'
             '    if(a>0&&h.slice(-e.length)===e){RBK[i]=h.slice(a,h.length-e.length);h=h.slice(0,a).replace(\'<article class="card \',\'<article class="card x2p-bkw \')+e}}\n'
             '  return h}).join("");'),
            ('slides.forEach(function(c){c.classList.remove("flipped");setFaces(c,false)});',
             'slides.forEach(function(c){c.classList.remove("flipped");setFaces(c,false)});\n'
             '/* a card whose back waits: its front as setFaces leaves it (setFaces stops when there is no back) */\n'
             'Object.keys(RBK).forEach(function(i){var fr=$(".face.front",slides[i]);if(fr){fr.setAttribute("aria-hidden","false");if("inert" in fr)fr.inert=false}});\n'
             'function recFill(i){var h=RBK[i],c=slides[i];if(h==null||!c)return false;delete RBK[i];$(".cin",c).insertAdjacentHTML("beforeend",h);c.classList.remove("x2p-bkw");setFaces(c,c.classList.contains("flipped"));return true}\n'
             'function recNear(i){var any=false;for(var j=i-3;j<=i+3;j++)if(recFill(j))any=true;if(any&&window.__x2pSlab)window.__x2pSlab(car)}\n'
             '/* n: a round number, or "all" */\n'
             'window.__x2pRecFill=function(n){var any=false;slides.forEach(function(c,i){if((n==="all"||+c.getAttribute("data-n")===+n)&&recFill(i))any=true});if(any&&window.__x2pSlab)window.__x2pSlab(car)};\n'
             'if(RMQ){var rmqF=function(){if(!RMQ.matches)window.__x2pRecFill("all")};if(RMQ.addEventListener)RMQ.addEventListener("change",rmqF);else if(RMQ.addListener)RMQ.addListener(rmqF)}'),
            ('function setCur(i){if(i===cur)return;cur=i;','function setCur(i){if(i===cur)return;cur=i;recNear(i);')]:
    assert pp.count(a)==1,a; pp=pp.replace(a,b)
# two-tab launch (owner, 2026-10-22): the Overview builds its standings, stats and highlights from the Leaderboard and
# Results pages (x2plus.js), whose renderers live inside the page script: hand x2plus.js those three on X2+ only
a='addEventListener("hashchange",route);\nroute();'
assert pp.count(a)==1,a
pp=pp.replace(a,'window.__x2pR={vModels:vModels,wireModels:wireModels,vResults:vResults};'+a)
# ... and X2's Overview order, which the page re-applies on every tab change, follows the launch order: record (owner,
# 2026-10-26: "the record section as the number one section", the standings second; the standings came first from
# 2026-10-22), standings, proof, highlights (x2plus.js adds #highlights), the bet, Get $EZ; the section numbers follow it
# (owner, 2026-10-28: "the leaderboard is number one... and the record becomes number two") the standings first again
for a,b in [('var seq=[hero,top,rec,st,learn,get]','var seq=[hero,top,st,rec,learn,document.getElementById("highlights"),document.getElementById("x2pSt"),get]'),
            ('var k=0;[rec,st,learn,get]','var k=0;[st,rec,learn,document.getElementById("highlights"),document.getElementById("x2pSt"),get]'),
            # the NVIDIA chip sits in the bet section at the foot of the Overview since 2026-10-24 (x2plus.js BETSEC): it loads when reached
            ('if(im)im.loading="eager";','if(im)im.loading="lazy";')]:
    assert pp.count(a)==1,a; pp=pp.replace(a,b)
pp,k1=re.subn(r'<link id="x2-logo-fonts"[^>]*>\n','',pp)
pp,k2=re.subn(r'<style id="x2-logo">.*?</style>\n','',pp,flags=re.S)
assert (k1,k2)==(1,1),(k1,k2)
# Highlights in plain words (owner, 2026-10-20: "nobody understands points"): percentages and counts only, one sentence
# anyone gets, and a number worth caring about. All from the sheet, as X2 builds them.
HL=[("""'<span class="hx2-t"><span class="hx2-h">'+head+'</span><span class="hx2-p">'+body+'</span><span class="hx2-r">'+rec.map(function(q){return '<span><b>'+q[0]+'</b><small>'+q[1]+'</small></span>'}).join("")+'</span></span></a></li>'}""",
     """'<span class="hx2-t"><span class="hx2-h">'+head+'</span><span class="hx2-r">'+rec.map(function(q){return '<span><b>'+q[0]+'</b><small>'+q[1]+'</small></span>'}).join("")+'</span><span class="hx2-p">'+body+'</span></span></a></li>'}"""),
    ("""  var cc=callOf(close.r,close.m),out='<ul class="hx2s">';""",
     """  var cc=callOf(close.r,close.m),out='<ul class="hx2s">';
  function rt(r){return r.calls.filter(function(c){return isDn(c)===(r.a<0)}).length}function amt(r){return String(r.out).replace(/^[+−-]/,"")}
  function said(c){return isDn(c)?'fall':'rise'}function did(r){return r.a>0?'rose':'fell'}"""),
    ("""  out+=card("Closest call",close.r,nm(close.m)+' basically read '+esc(close.r.co)+'\\'s mind.','It called '+callAmt(cc)+'. '+esc(close.r.co)+' moved '+mv(close.r)+'.',
    [[close.off.toFixed(2)+' pts','off the real move'],[x(avgAll/close.off),'closer than a typical call']]);""",
     """  out+=card("Closest call",close.r,nm(close.m)+' basically read '+esc(close.r.co)+'\\'s mind.',nm(close.m)+' said '+esc(close.r.co)+' would '+said(cc)+' '+cc[1].split(" ")[1]+'. It '+did(close.r)+' '+amt(close.r)+'.',
    [[x(avgAll/close.off),'closer than a typical call'],['#1','closest of '+calls.length+' calls']]);"""),
    ("""  out+=card("Tightest race",tight.r,'All '+String(NUMW[tight.r.calls.length]||tight.r.calls.length).toLowerCase()+' AIs huddled around '+esc(tight.r.co)+'.',esc(tight.r.co)+' moved '+mv(tight.r)+'. Every call landed within a few points of it'+(td?', all calling '+td:'')+'.',
    [[tight.v.toFixed(2)+' pts','average miss that round'],[avgRnd.toFixed(1)+' pts','in a normal round']]);""",
     """  out+=card("Tightest race",tight.r,'All '+String(NUMW[tight.r.calls.length]||tight.r.calls.length).toLowerCase()+' AIs huddled around '+esc(tight.r.co)+'.',esc(tight.r.co)+' '+did(tight.r)+' '+amt(tight.r)+'. '+(td?'All '+String(NUMW[tight.r.calls.length]||tight.r.calls.length).toLowerCase()+' said it would '+(td==="down"?'fall':'rise')+', and all of them were close.':'Every call landed close.'),
    [[rt(tight.r)+' of '+tight.r.calls.length,'called the direction right'],[x(avgRnd/tight.v),'closer than a normal round']]);"""),
    ("""  out+=card("Biggest move",big,esc(big.co)+(big.a>0?' went vertical.':' fell off a cliff.'),esc(big.co)+' moved '+mv(big)+' after earnings'+(bd&&(bd==="down")!==(big.a<0)?', and every AI called it '+bd+'. Ouch.':'.'),
    [[mv(big),'in one day'],[x(Math.abs(big.a)/avgMv),'a normal earnings move']]);""",
     """  out+=card("Biggest move",big,esc(big.co)+(rt(big)===0?' fooled everyone.':big.a>0?' went vertical.':' fell off a cliff.'),esc(big.co)+' '+(big.a>0?'jumped ':'dropped ')+amt(big)+' in one day.'+(bd&&(bd==="down")!==(big.a<0)?' Every AI said it would '+(bd==="down"?'fall':'rise')+'. Ouch.':''),
    [[x(Math.abs(big.a)/avgMv),'a normal earnings move'],[rt(big)+' of '+big.calls.length,'AIs saw it coming']]);""")]
for a,b in HL:
    assert pp.count(a)==1,a[:80]; pp=pp.replace(a,b)
XPCSS=open(sys.argv[1]+'/skin-x2plus.css').read(); XPJS=open(sys.argv[1]+'/x2plus.js').read()
# (owner, 2026-10-22) the standings tickets are cut from the "As it stands" ticket's own card: __PAPER__ in the TICKETS block
XPCSS=XPCSS.replace('__PAPER__',re.search(r'html\.x2p #standings \.x2p-ast \.tk\{.*?(url\("data:image/svg\+xml[^"]*"\))',XPCSS,re.S).group(1))
assert pp.count('</head>')==1 and pp.count('</body>')==1
# (owner, 2026-10-22) the bullet straps' condensed italic (Archivo has no italic in the page's own font link)
STRAPFONT='<link id="x2p-strap-font" href="https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@1,62..100,800..900&display=swap" rel="stylesheet">'
pp=pp.replace('</head>',STRAPFONT+'\n</head>')
pp=pp.replace('</head>','<style id="x2plus-skin">\n'+XPCSS+'\n</style>\n</head>')
pp=pp.replace('</body>','<script id="x2plus-words">\n'+XPJS+'\n</script>\n</body>')
# (owner, 2026-10-21) the Results highlights are slabs too (x2plus.js builds them in #x2pHl), and since 2026-10-23 the round
# opened over the page (#x2pRm, the record's own slab): every "#record .card" style
# also matches there, same specificity; only inside <style>, so the page's own scripts still see the Overview's cards alone
pp=re.sub(r'<style[^>]*>.*?</style>',lambda m:m.group(0).replace('#record .card',':is(#record,#x2pHl,#x2pRm) .card'),pp,flags=re.S)
# (owner, 2026-10-27: "logo cream flat... everywhere", "the gold from 5") X2+ only: every paper is the logo's cream with no grain (one
# texture shared by every ticket and card; lit flat, it renders as #f8f0d9), the gold foils in the logo's gold family; the film's
# bill keeps today's grainy paper ("he's like the market. He's gone through a lot"); the certificate's own stock goes white so it
# shows the same cream. X3+ (written from pp below) keeps its grain for the letterpress.
GRAINP="lighting-color='%23f1e6cc' surfaceScale='1.6'%3E%3CfeDistantLight azimuth='225' elevation='62'"
CREAMP="lighting-color='%23f8f0d9' surfaceScale='0'%3E%3CfeDistantLight azimuth='225' elevation='90'"
assert pp.count(GRAINP)>30
_i=pp.find(GRAINP);GRAIN=pp[pp.rfind('url("',0,_i):pp.find('")',_i)+2]
px=pp.replace(GRAINP,CREAMP)
# (owner, 2026-10-27, night) the inks: X2+ stamped (INKS), X3+ the lighter ink (INKL)
px=re.sub(r'/\*INKL\{\*/.*?/\*\}INKL\*/','',px,count=1,flags=re.S)
# (owner, 2026-10-27, night: "the [certificate] that is currently on the live website... I just prefer it") X2+ keeps CERTU2, not CERTL1
px=re.sub(r'/\*CERTL1\{.*?/\*\}CERTL1\*/','',px,count=1,flags=re.S)
for _a,_c in [(r'#f6dc93|#fbe8a8|#f6d77c','#fed98a'),(r'#e4b54a|#e7bd5b|#efc24a','#fdbc2a'),(r'#c99227|#bf8a22|#d39c1c|#c98a12','#d99a12')]:px=re.sub(_a,_c,px,flags=re.I)
px=px.replace('</head>','<style id="x2p-cream">html.x2p.x2d.x2pbt.x2pbill .x2p-vt .vb-bl .pa{background:'+GRAIN+' 0 0/240px 240px,#efe4c8!important}html.x2p.x2d.x2pbt.x2pbill .x2p-vt{--ko:'+GRAIN+' 0 0/240px 240px,#efe4c8!important}html.x2p .card .xc{background-color:#fff!important}</style>\n</head>',1)
# (owner, 2026-10-27) the certificate's Kanit (the logo's lettering), X2+ only
px=px.replace('</head>','<link id="x2p-kanit" href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@1,800;1,900&family=Saira+Condensed:wght@600;700;800&family=Alfa+Slab+One&display=swap" rel="stylesheet">\n</head>',1)
open("v46-live-x2plus.html",'w').write(px); print("ok v46-live-x2plus.html",len(px))
# The world pages (owner, 2026-10-29: "erase Easy Live X3 Plus and build the entire [comic book] one on [it]... create the arcade
# one on a new page called Easy Live X4 Plus"): X2+'s build with a world drawn over it (tools/v22/world-<name>.css/.js, from the
# overnight mockups in tools/concepts/worlds/), a Leaderboard tab (window.__x2pLB) and the cover waiting for the world
# (window.__x2pNeedWorld; the world adds html.x2p-world when it is drawn). The X3+ of 2026-10-28 (X2+ on flat cream) is history (git).
def world(name,title,out,layer=None):
    css=open("tools/v22/world-%s.css"%name).read();js=open("tools/v22/world-%s.js"%name).read()
    # an extra world layer drawn over the first (X5+: the comic in the header's dark colours); its css after the world's,
    # its script after the world's in its own try, so the world itself is untouched by a failure in the layer
    if layer:
        css+='\n'+open("tools/v22/world-%s.css"%layer).read()
        js+='\n}catch(e){window.__x2pWorldErr=e;document.documentElement.classList.add("x2p-world");console.error(e)}\ntry{'+open("tools/v22/world-%s.js"%layer).read()
    w=px.replace('</head>','<script>window.__x2pLB=1;window.__x2pNeedWorld=1;window.__x2pWorldName="%s"</script>\n<style id="x2p-world-css">%s</style>\n</head>'%(name,css),1)
    assert w.count('<title>EZ Live X2+</title>')==1
    w=w.replace('<title>EZ Live X2+</title>','<title>%s</title>'%title)
    assert w.count('</body>')==1
    # run at once at the end of <body> (not at DOMContentLoaded, which a slow phone reaches after the cover's 9.5 s net): each
    # world script waits for the page itself (x2p-launch, the film ticket, the data) before drawing
    w=w.replace('</body>','<script id="x2p-world-js">try{%s\n}catch(e){window.__x2pWorldErr=e;document.documentElement.classList.add("x2p-world");console.error(e)}</script>\n</body>'%js.replace('</script','<\\/script'),1)
    open(out,'w').write(w); print("ok",out,len(w))
world("comic","EZ Live X3+","v47-live-x3plus.html")
world("arcade","EZ Live X4+","v48-live-x4plus.html")
world("comic","EZ Live X5+","v49-live-x5plus.html","comicdark")
