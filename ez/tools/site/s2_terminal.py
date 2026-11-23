#!/usr/bin/env python3
"""Season 2 on the EZ Terminal (owner, 2026-11-23: the site "still shows the old season... It should show season 2 because
obviously that's the live one. But... an obvious filter for you to go back to season 1"; the same layout, Season 2's companies,
AI models and calendar; no relegation rule on it yet). Patches the terminal page in place, once (marker S2SEASON):
  - loads s2-data.js (tools/site/make_s2.py) after ez-data.js; Season 2 is the default, ?s=1 is Season 1;
  - on Season 2: Gemini and Qwen join MODELS, ez-data.js's own build() runs on Season 2's rows, the AIs are the five,
    report times come from S2_REPORT, the tryouts block and the relegation label are left out;
  - a Season 2 | Season 1 switch at the top of every view.
Usage (from ez/): python3 tools/site/s2_terminal.py v53-terminal.html tools/concepts/hyperdash/index.html"""
import json, os, sys
EZ = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
M5 = json.load(open(os.path.join(EZ, 'tools/concepts/dopa/models5.json')))
def mdl(k, ver, app):
    m = M5[k]; o = {'name': k, 'ver': ver, 'app': app, 'c': '#fff', 'bg': m['bg'], 'fg': m['fg'], 'd': m['d']}
    if m.get('fr') and m['fr'] != 'None': o['fr'] = m['fr']
    return o
# Gemini: the owner's screenshots show the picker on Gemini 4 Neon (asked which to show; Neon until he says otherwise)
NEW = {'GEMINI': mdl('GEMINI', 'Gemini 4 Neon', 'Gemini'), 'QWEN': mdl('QWEN', 'Qwen 4 Max', 'Qwen')}
LOGO = {'INTU': 'S2-INTU.svg', 'KEYS': 'S2-KEYS.png', 'ESTC': 'S2-ESTC.svg', 'ZOOM': 'S2-ZOOM.png', 'SMTC': 'S2-SMTC.png', 'SYM': 'S2-SYM.png',
        'MDT': 'S2-MDT.png', 'ADI': 'S2-ADI.png', 'WDAY': 'S2-WDAY.png', 'AMBA': 'S2-AMBA.png', 'ADSK': 'S2-ADSK.png'}

BOOT = ('<script src="s2-data.js"></script><script>/*S2SEASON{*/(function(){var q=new URLSearchParams(location.search);'
        'window.__S=q.get("s")==="1"?1:2;var L=' + json.dumps({k: {'f': 'logos/' + v} for k, v in LOGO.items()}) + ';'
        'for(var k in L)if(!CO_LOGOS[k])CO_LOGOS[k]=L[k];if(window.__S!==2)return;'
        'var N=' + json.dumps(NEW) + ';for(var m in N)MODELS[m]=N[m];for(var t in S2_NAME)TICKERS[t]=S2_NAME[t];'
        'build(S2_HEADER,S2_SHEET)})();/*}S2SEASON*/</script>')

CSS = ('<style>/*S2SEASON*/.ssw{display:flex;gap:6px;margin-top:14px;padding:5px;border:1px solid var(--ln);border-radius:999px;background:var(--pn)}'
       '.ssw a{flex:1;display:flex;align-items:center;justify-content:center;gap:8px;padding:11px 10px;border-radius:999px;'
       'font:700 13px/1 var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--mu);text-decoration:none}'
       '.ssw a.on{background:var(--ac);color:var(--acx)}.ssw a small{font:500 10.5px/1 var(--mono);letter-spacing:.02em;text-transform:none;opacity:.8}'
       '.ssw a:not(.on):hover{color:var(--tx)}.ssw a:focus-visible{outline:2px solid var(--ac);outline-offset:2px}'
       '@media (max-width:370px){.ssw a small{display:none}}.ipill[hidden]{display:none!important}</style>')

SW = ('function ssw(){var q=new URLSearchParams(location.search),h=location.hash,a=function(s){var p=new URLSearchParams(q);'
      'if(s===2)p.delete("s");else p.set("s","1");var x=p.toString();return (x?"?"+x:location.pathname)+h};'
      'return \'<nav class="ssw" aria-label="Season"><a href="\'+a(2)+\'" class="\'+(window.__S===2?"on":"")+\'"\'+(window.__S===2?\' aria-current="page"\':"")+\'>Season 2<small>Live</small></a>'
      '<a href="\'+a(1)+\'" class="\'+(window.__S===1?"on":"")+\'"\'+(window.__S===1?\' aria-current="page"\':"")+\'>Season 1<small>Final</small></a></nav>\'}\n')

def rep(s, a, b, n=1):
    c = s.count(a)
    assert c == n, (c, a[:80])
    return s.replace(a, b)

def patch(s):
    if 'S2SEASON' in s: print('  already patched'); return s
    s = rep(s, '<script src="ez-data.js"></script>', '<script src="ez-data.js"></script>' + BOOT)
    s = rep(s, '</style>\n<div class="app">', '</style>' + CSS + '\n<div class="app">')
    # the five on Season 2
    s = rep(s, 'FLAG={GROK:"US",CLAUDE:"US",GPT:"US",KIMI:"CN"};',
            'FLAG={GROK:"US",CLAUDE:"US",GPT:"US",KIMI:"CN"};if(window.__S===2){MK=["GPT","CLAUDE","GROK","GEMINI","QWEN"];LAB.GEMINI="Google";LAB.QWEN="Alibaba";FLAG.GEMINI="US";FLAG.QWEN="CN"}')
    s = rep(s, 'var APP={GROK:"Grok",CLAUDE:"Claude",GPT:"ChatGPT",KIMI:"Kimi"}', 'var APP={GROK:"Grok",CLAUDE:"Claude",GPT:"ChatGPT",KIMI:"Kimi",GEMINI:"Gemini",QWEN:"Qwen"}')
    s = rep(s, 'if(/^(grok|claude|gpt|kimi)$/i.test(h0))', 'if(/^(grok|claude|gpt|kimi|gemini|qwen)$/i.test(h0)&&MK.indexOf(h0.toUpperCase())>-1)')
    s = rep(s, 'grades all four', 'grades every trade', 2)
    # Season 2 report times (S2_REPORT: [utc, estimated, words])
    s = rep(s, 'var TZ=(function(){', 'if(window.__S===2){REPORT={};for(var _t in S2_REPORT)REPORT[_t]={t:S2_REPORT[_t][0],est:S2_REPORT[_t][1],w:S2_REPORT[_t][2]}}\nvar TZ=(function(){')
    # no relegation on Season 2 yet (owner, 2026-11-23: "no need. Don't do that yet")
    s = rep(s, "(w===\"ALL\"&&a.hr<.5?'<span class=\"rz\">", "(w===\"ALL\"&&a.hr<.5&&window.__S!==2?'<span class=\"rz\">")
    # Season 1 is final: the relegation is done and the newcomers are in
    s = rep(s, 'function tryouts(){', 'function tryouts(){if(window.__S===2)return "";return \'<section class="pn try"><div class="tabs"><button class="on">SEASON 2</button></div><div class="tr"><p><b>Under 50% hit rate at the end of Season 1 meant relegation.</b> Kimi was relegated.</p><p>New in Season 2:</p><div class="tm"><span>\'+flag("US")+\' Gemini</span><span>\'+flag("CN")+\' Qwen</span></div></div></section>\';')
    # Upcoming: the season bar says which season; Season 1's "Season 2 coming" fold only on Season 1
    s = rep(s, "'<div class=\"sb\"><b>SEASON 1</b><span>Ends with NVIDIA (times in '+TZ+')</span></div>'+upList()+s2()",
            "(window.__S===2?'<div class=\"sb\"><b>SEASON 2</b><span>Times in '+TZ+'</span></div>'+upList():'<div class=\"sb\"><b>SEASON 1</b><span>Ended with NVIDIA (times in '+TZ+')</span></div>'+upList()+s2())")
    # the switch, on top of every view
    s = rep(s, 'function draw(){', SW + 'function draw(){')
    s = rep(s, 'document.getElementById("main").innerHTML=h;', 'document.getElementById("main").innerHTML=ssw()+h;')
    return s

for f in sys.argv[1:]:
    p = os.path.join(EZ, f) if not os.path.isabs(f) else f
    print(f); s = patch(open(p).read()); open(p, "w").write(s)
