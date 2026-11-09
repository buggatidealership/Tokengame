#!/usr/bin/env python3
"""Upcoming, simpler (owner, 2026-11-09): Season 1 bar "Ends with NVIDIA (times in <zone>)", one explainer line,
Season 2 collapsed with its line beside the title, no closing note. Applies to the terminal source, its copy and site/index.html. Idempotent."""
import os
ROOT=os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'../../../../..'))
R=[
 ('<div class="sb"><b>SEASON 1</b><span>Ends with NVIDIA · Nov 17</span></div>',
  '<div class="sb"><b>SEASON 1</b><span>Ends with NVIDIA (times in \'+TZ+\')</span></div>'),
 ("'<div class=\"uz\">Times in your time zone ('+TZ+'). Each AI files long or short 1 to 2 hours before the report. The trade is priced from the last close before the report to the next close, nothing sold in between.</div>'",
  "'<div class=\"uz\">Each AI files long or short 1 hour before the earnings report. The trade closes at the next market close after earnings.</div>'"),
 ("return '<div class=\"sb s2\"><b>SEASON 2</b><span>Starts after NVIDIA · first reports late November</span></div>'+L.map(",
  "return '<div class=\"s2w\"><button type=\"button\" class=\"sb s2\" aria-expanded=\"false\" onclick=\"var w=this.parentNode;w.classList.toggle(\\'on\\');this.setAttribute(\\'aria-expanded\\',w.classList.contains(\\'on\\'))\"><b>SEASON 2</b><span>Starts after NVIDIA · first report late November</span><i class=\"cv\"></i></button><div class=\"s2l\">'+L.map("),
 ("x[2]+'</b></span></div>'}).join(\"\")}",
  "x[2]+'</b></span></div>'}).join(\"\")+'</div></div>'}"),
 ("+s2()+'<div class=\"note\">Season 2 dates are expected from last year\\u2019s calendar until each company confirms. HL = it has a Hyperliquid market, so you can follow the trade there. Long or short, filed before the report, graded at the next market close. Report times are the companies’ own; ~ means they published only the call time.</div></section>'}",
  "+s2()+'</section>'}"),
 (".sb.s2{margin-top:18px;background:#14181a}.sb.s2 b{color:#5ee0bf}",
  ".sb.s2{margin-top:18px;background:#14181a}.sb.s2 b{color:#5ee0bf}\n/* Season 2 collapsed (owner, 2026-11-09) */.s2w .sb.s2{width:100%;flex-wrap:nowrap;align-items:center;justify-content:flex-start;border-left:0;border-right:0;cursor:pointer;color:inherit;font:inherit;text-align:left}.s2w .sb.s2 span{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.s2w .cv{flex:none;width:8px;height:8px;border-right:2px solid var(--mu);border-bottom:2px solid var(--mu);transform:rotate(45deg);margin:-4px 2px 0 0;transition:transform .2s}.s2w.on .cv{transform:rotate(225deg);margin-top:4px}.s2l{display:none}.s2w.on .s2l{display:block}"),
 (".flt{display:flex;gap:8px;padding:0 20px 14px}",".flt{display:flex;gap:8px;padding:14px 20px}"),
]
for p in ['ez/v53-terminal.html','ez/tools/concepts/hyperdash/index.html','site/index.html']:
  f=os.path.join(ROOT,p);s=open(f).read()
  for a,b in R:
    if a in s: s=s.replace(a,b,1)
  open(f,'w').write(s)
print('simplified')
