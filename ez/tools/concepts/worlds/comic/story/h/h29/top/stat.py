# /usr/bin/python3 stat.py <tag>... : per phone screen of the top (until Meet the models' head) from measure29's out/<tag>/m.json
import json,sys
for t in sys.argv[1:]:
    d=json.load(open(f'out/{t}/m.json'));print(t,'page',d['total'],'errs',len(d['errs']))
    for m in d['res'][:3]:print(' S%d y%d'%(m['k']+1,m['y']),'words',m['words'],'(+%d header)'%m['hdrWords'],'faces',sorted(m['fams']),'movers',m['moving'],[x['n'] for x in m['mvd']],m['vids'])
