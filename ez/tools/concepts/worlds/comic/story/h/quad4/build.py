# python3 build.py : writes _q4.js = tools/v22/story/x2p_top.js with beat 2 (frames + states) replaced by _frames.part.js / _states.part.js
import json,re
L=open('../../../../../../v22/story/x2p_top.js').read().split('\n')
assert L[89].startswith('/* ---------- beat 2') and L[132].startswith('/* ---------- top5: the numbered') and L[198].startswith('/* ---------- states') and L[211].strip().startswith('const v=sec')
fr=open('_frames.part.js').read().replace('__Q4JSON__',json.dumps({k:{'crop':v['crop'],'file':v['file'],'q':v['q']} for k,v in json.load(open('quads.json')).items()}))
st=open('_states.part.js').read()
src='\n'.join(L[0:89])+'\n'+fr+'\n'+'\n'.join(L[132:198])+'\n'+st+'\n'+'\n'.join(L[211:])
hdr='''/* H23 quad4: a drop-in replacement for tools/v22/story/x2p_top.js (round H23, area quad4; built by quad4/build.py). Only beat 2's four
   pictures, their surfaces and the frame states change: new zoomed-in paintings (media/top-h23-*.jpg), the figures big and lit in the glass,
   the facts visible from the start, small life in the world. Everything else (headline, chip, gutters, film) is x2p_top.js as of f180a6e.
   Laid over the built page as a mockup, it first takes out the live .t4 section. CSS: _q4.css, appended after x2p_top.css. */
'''
src=hdr+src
R=[("const sec=D.createElement('section');","D.querySelectorAll('section.t4').forEach(s=>s.remove());const sec=D.createElement('section');"),
 ("requestAnimationFrame(()=>place(sec));wire()","requestAnimationFrame(()=>{place(sec);q4k(sec)});wire()"),
 ("else place(sec)});","else{place(sec);q4k(sec)}});"),
 ("D.fonts&&D.fonts.ready.then(()=>place(sec));","D.fonts&&D.fonts.ready.then(()=>{place(sec);q4k(sec)});"),
 ("window.__x2pTopErr=e","window.__x2pTopErr=window.__q4Err=e")]
for a,b in R:
  assert a in src,a;src=src.replace(a,b,1)
src,n=re.subn(r"window.__t5=window.__t4=\{rebuild:build,place:\(\)=>place\(sec\),all:s=>[^\n]*\n","window.__t5=window.__t4={rebuild:build,place:()=>{place(sec);q4k(sec)},all:()=>{},\n",src);assert n==1
defs='''<linearGradient id="q4em" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffdf0"/><stop offset=".5" stop-color="#ffe9a8"/><stop offset="1" stop-color="#ffb43a"/></linearGradient>
 <linearGradient id="q4gd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6c8"/><stop offset=".55" stop-color="#ffd25a"/><stop offset="1" stop-color="#ff9d1c"/></linearGradient>
 <linearGradient id="q4up" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e2ffeb"/><stop offset=".4" stop-color="#6ff59e"/><stop offset="1" stop-color="#16b955"/></linearGradient>
 <linearGradient id="q4dn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe2da"/><stop offset=".4" stop-color="#ff6d5e"/><stop offset="1" stop-color="#e01f14"/></linearGradient>
 <filter id="q4etch" x="-5%" y="-10%" width="110%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".06" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="7" xChannelSelector="R" yChannelSelector="G"/></filter>
 </defs></svg>`;'''
assert "</defs></svg>`;" in src;src=src.replace("</defs></svg>`;",defs,1)
open('_q4.js','w').write(src)
