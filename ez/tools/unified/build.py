"""Build the unified EZ page (ez/v50-unified.html) from tools/unified/: page.html with u.css, track.js, u.js and the logo inlined.
Run from anywhere: python3 tools/unified/build.py. The page reads every figure from ez-data.js at load, so a sheet sync needs no
rebuild of this file; make_site.py runs this build itself before it copies the page. The world's rules: tools/unified/RULES.md."""
import os, re
HERE = os.path.dirname(os.path.abspath(__file__)); EZ = os.path.dirname(os.path.dirname(HERE))
rd = lambda p: open(os.path.join(HERE, p), encoding='utf-8').read()
logo = open(os.path.join(EZ, 'tools', 'v22', 'x2p-logo.svg'), encoding='utf-8').read().strip()
page = rd('page.html')
for k, v in (('CSS', rd('u.css')), ('TRACK', rd('track.js')), ('JS', rd('u.js')), ('LOGO', logo)):
    assert '/*' + k + '*/' in page, k
    page = page.replace('/*' + k + '*/', v)
# every CSS file stays brace-balanced (the X2+ reduced-motion bug was one missing brace)
css = re.sub(r'/\*.*?\*/', '', rd('u.css'), flags=re.S)
assert css.count('{') == css.count('}'), 'u.css braces do not balance'
out = os.path.join(EZ, 'v50-unified.html')
open(out, 'w', encoding='utf-8').write(page)
print('wrote', os.path.relpath(out, EZ), len(page), 'bytes')
