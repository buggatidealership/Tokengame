#!/usr/bin/env python3
"""Turn the built site/ into the EZ Terminal (owner, 2026-11-07: "push this design to the production site").
Run after make_site.py: keeps the show page as /show.html, writes the terminal as index.html with
the live share tags, icons and the versioned ez-data.js. Usage (from ez/): python3 tools/site/make_terminal.py [site_dir]"""
import os,re,shutil,sys
EZ=os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SITE=sys.argv[1] if len(sys.argv)>1 else os.path.join(os.path.dirname(EZ),'site')
show=open(os.path.join(SITE,'index.html')).read()
open(os.path.join(SITE,'show.html'),'w').write(show)
v=re.search(r'ez-data\.js\?v=([0-9a-f]+)',show).group(1)
t=open(os.path.join(EZ,'v53-terminal.html')).read()
desc="Track the P&amp;L of four AIs trading every earnings report. Long or short before the report, $100K paper per trade, graded at the close."
head=('<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
 '<title>Earnings Zeason · AI earnings P&amp;L tracker</title>'
 '<meta name="description" content="'+desc+'"><meta property="og:type" content="website"><meta property="og:url" content="https://earningszn.xyz/">'
 '<meta property="og:site_name" content="Earnings Zeason"><meta property="og:title" content="Earnings Zeason · AI earnings P&amp;L tracker">'
 '<meta property="og:description" content="'+desc+'"><meta property="og:image" content="https://earningszn.xyz/media/share-term-a.jpg">'
 '<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">'
 '<meta name="twitter:card" content="summary_large_image"><meta name="twitter:site" content="@earningszn">'
 '<meta name="twitter:title" content="Earnings Zeason · AI earnings P&amp;L tracker"><meta name="twitter:description" content="'+desc+'">'
 '<meta name="twitter:image" content="https://earningszn.xyz/media/share-term-a.jpg">'
 '<meta name="theme-color" content="#0e0c0b"><link rel="icon" href="media/icon.svg" type="image/svg+xml">'
 '<link rel="icon" href="media/icon-32.png" sizes="32x32" type="image/png"><link rel="apple-touch-icon" href="media/icon-180.png">')
t=t.replace('<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>EZ Terminal</title>',head,1)
assert 'og:image' in t
t=t.replace('<script src="ez-data.js"></script>','<script src="ez-data.js?v='+v+'"></script>',1)
# Season 2 (tools/site/make_s2.py, tools/site/s2_terminal.py): its data file, versioned by its own hash, and its logos
import hashlib,glob
s2=open(os.path.join(EZ,'s2-data.js'),'rb').read();v2=hashlib.sha1(s2).hexdigest()[:10]
open(os.path.join(SITE,'s2-data.js'),'wb').write(s2)
assert t.count('<script src="s2-data.js"></script>')==1
t=t.replace('<script src="s2-data.js"></script>','<script src="s2-data.js?v='+v2+'"></script>',1)
os.makedirs(os.path.join(SITE,'media','logos'),exist_ok=True)
for f in glob.glob(os.path.join(EZ,'media','logos','S2-*')):shutil.copy(f,os.path.join(SITE,'media','logos',os.path.basename(f)))
assert 'ez-data.js?v=' in t
if not t.lstrip().lower().startswith('<!doctype'):t='<!doctype html><html lang="en"><head>'+t.replace('</style>\n<div class="app">','</style></head><body>\n<div class="app">',1)
open(os.path.join(SITE,'index.html'),'w').write(t)
for f in ['share-term-a.jpg','ground-916.jpg','ground-169.jpg']:shutil.copy(os.path.join(EZ,'media',f),os.path.join(SITE,'media',f))
print('terminal ->',SITE,'index.html; show kept at show.html; data v',v)
