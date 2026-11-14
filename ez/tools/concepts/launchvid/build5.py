#!/usr/bin/env python3
# Builds vid5-built.html (or vidN) from its source: injects the EZ. logo SVG inner and the price path.
import sys,re,os
D=os.path.dirname(os.path.abspath(__file__));src=sys.argv[1] if len(sys.argv)>1 else 'vid5.html'
logo=open(os.path.join(D,'ez-logo-inner.svgfrag')).read()
path=open(os.path.join(D,sys.argv[2] if len(sys.argv)>2 else 'rddt-path.json')).read().strip()
s=open(os.path.join(D,src)).read().replace('__EZLOGO__',logo).replace('__PATH__',path)
open(os.path.join(D,src.replace('.html','-built.html')),'w').write(s);print('built',src)
if src=='vid5.html':
  import json
  c=json.load(open(os.path.join(D,'cuts5.json')))
  for k,v in c.items():
    inj='<script>window.CUT='+json.dumps(v['segs'])+'</script><script src="cut5.js"></script>'
    i=s.rfind('</script>')+len('</script>')
    open(os.path.join(D,f'vid5{k}-built.html'),'w').write(s[:i]+inj+s[i:]);print('cut',k,round(sum(x[0] for x in v['segs']),2),'s')
