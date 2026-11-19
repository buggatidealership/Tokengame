#!/usr/bin/env python3
"""python3 mk-s2d.py : writes s2d.html from s2d.src.html, pasting in the Gemini and Qwen marks (NEW) and Intuit's wordmark (INTU)
from s2c.html, so the marks live in one place."""
import os, re
d = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(d, 's2c.html')).read().split('\n')
new = [i for i, l in enumerate(src) if l.startswith('const NEW = ')][0]
NEW = src[new] + '\n' + src[new + 1]
assert NEW.rstrip().endswith('};'), 'NEW is not two lines'
INTU = [l for l in src if l.startswith('const INTU = ')][0]
s = open(os.path.join(d, 's2d.src.html')).read()
assert '/*NEW*/' in s and '/*INTU*/' in s
s = s.replace('/*NEW*/', NEW, 1).replace('/*INTU*/', INTU, 1)
open(os.path.join(d, 's2d.html'), 'w').write(s)
print('s2d.html', len(s))
