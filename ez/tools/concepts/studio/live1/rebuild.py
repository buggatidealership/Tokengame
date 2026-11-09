#!/usr/bin/env python3
"""Rebuild the LIVE1 blocks (live.js, live.css) inside the terminal source, its copy and site/index.html, and this folder's preview index.html.
Run from anywhere: python3 ez/tools/concepts/studio/live1/rebuild.py"""
import os,re
D=os.path.dirname(os.path.abspath(__file__));EZ=os.path.abspath(os.path.join(D,'../../../..'));ROOT=os.path.dirname(EZ)
js=open(os.path.join(D,'live.js')).read().replace('(function(){','',1);js=js[:js.rindex('})();')].replace('\ndraw();\n','\n')
css=open(os.path.join(D,'live.css')).read()
JSB='/*LIVE1{ (owner, 2026-11-09: W2\'s Live now card and Last matchday on Upcoming) */'+js+'/*}LIVE1*/\n'
CSSB='\n/*LIVE1{*/'+css+'/*}LIVE1*/'
OLD_DROP='<small>Trades drop</small><b>\'+rng(a,b)+\'</b>'
NEW_DROP='<small>Trades drop by</small><b>\'+tm(b)+\'</b>'
def put(s):
  s=re.sub(r'/\*LIVE1\{ \(owner[^\n]*?\*/.*?/\*\}LIVE1\*/\n','',s,flags=re.S)
  s=re.sub(r'\n/\*LIVE1\{\*/.*?/\*\}LIVE1\*/','',s,flags=re.S)
  a='var h0=(location.hash||"").slice(1);'
  assert s.count(a)==1
  s=s.replace(a,JSB+a).replace('</style>',CSSB+'</style>',1)
  if OLD_DROP in s:s=s.replace(OLD_DROP,NEW_DROP)
  assert NEW_DROP in s
  return s
for p in ['ez/v53-terminal.html','ez/tools/concepts/hyperdash/index.html','site/index.html']:
  f=os.path.join(ROOT,p);t=put(open(f).read());open(f,'w').write(t)
src=open(os.path.join(EZ,'tools/concepts/hyperdash/index.html')).read()
prev=src.replace('src="ez-data.js','src="../../../../ez-data.js').replace('src="media/\'+L.f+\'"','src="../../../../media/\'+L.f+\'"')
open(os.path.join(D,'index.html'),'w').write(prev)
print('rebuilt')
