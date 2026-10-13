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
        # X2's Overview order (owner, 2026-10-13): its styles, after the page's own (the code is the X2 block in routes.js)
        X2CSS=open(sys.argv[1]+'/x2-overview.css').read()
        assert page.count('</head>')==1; page=page.replace('</head>','<style id="x2-overview">\n'+X2CSS+'\n</style>\n</head>')
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
