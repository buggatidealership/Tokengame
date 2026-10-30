# /usr/bin/python3 preview.py <site dir>: adds the look switcher (Today, G2, G5, M1, M3) to a make_site.py build of X3+ (files in <site>/ev/)
import os,sys,re
S=sys.argv[1];M=os.path.dirname(os.path.abspath(__file__));A=os.path.join(M,'..','a');rd=lambda p:open(p).read()
os.makedirs(os.path.join(S,'ev'),exist_ok=True)
gen=rd(os.path.join(M,'_mg.js'))
gen=gen.replace("if(!img||art.querySelector('canvas.sa-gc5')||!a.offsetParent)return;","if(!img||art.querySelector('canvas.sa-gc5')||!a.offsetParent||art.getBoundingClientRect().width<4)return;",1)
assert 'width<4' in gen
gen=gen.rstrip()
assert gen.endswith('})();');gen=gen[:-5]+'S.paintG=paint;})();\n'
s1=rd(os.path.join(A,'s1.js'))
js=rd(os.path.join(A,'_sa.js'))+'\n'+gen+'\nwindow.__evStamp=function(){'+s1+'};\n'+rd(os.path.join(M,'switch.js'))
css=''.join(rd(os.path.join(A,f)) for f in ['_sa.css','s1.css','s1s.css','g5.css'])+rd(os.path.join(M,'switch.css'))
open(os.path.join(S,'ev','ev.js'),'w').write(js);open(os.path.join(S,'ev','ev.css'),'w').write(css)
p=os.path.join(S,'index.html');h=rd(p);h=re.sub(r'\n?<link rel="stylesheet" href="ev/ev.css">\n?<script src="ev/ev.js"></script>\n?','',h)
i=h.rindex('</body>');h=h[:i]+'<link rel="stylesheet" href="ev/ev.css">\n<script src="ev/ev.js"></script>\n'+h[i:];open(p,'w').write(h);print('ok',len(js),len(css))
