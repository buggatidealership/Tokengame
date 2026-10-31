# python3 make.py : writes ez/x2p-comic-remake.html = ez/v46-live-x2plus.html with comic2.css/js injected as build.py's world() does
import os
H=os.path.dirname(os.path.abspath(__file__));EZ=os.path.abspath(os.path.join(H,'../../../..'))
px=open(os.path.join(EZ,'v46-live-x2plus.html')).read();css=open(os.path.join(H,'comic2.css')).read();js=open(os.path.join(H,'comic2.js')).read()
w=px.replace('</head>','<script>window.__x2pLB=1;window.__x2pNeedWorld=1;window.__x2pWorldName="comic2"</script>\n<style id="x2p-world-css">%s</style>\n</head>'%css,1)
assert w.count('<title>EZ Live X2+</title>')==1
w=w.replace('<title>EZ Live X2+</title>','<title>EZ Comic Remake</title>')
w=w.replace('</body>','<script id="x2p-world-js">try{%s\n}catch(e){window.__x2pWorldErr=e;document.documentElement.classList.add("x2p-world");console.error(e)}</script>\n</body>'%js.replace('</script','<\\/script'),1)
open(os.path.join(EZ,'x2p-comic-remake.html'),'w').write(w);print('ok x2p-comic-remake.html',len(w))
