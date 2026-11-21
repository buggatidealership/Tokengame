# /usr/bin/python3 make.py : write the production drop-ins film4/x2p_top.js and film4/x2p_top.css from the live tools/v22/story files + f4.js / f4.css.
# Every replacement is asserted, so a changed live file stops the script instead of producing a half patch. Copy the two outputs over the live files.
import os,re,sys
H=os.path.dirname(os.path.abspath(__file__));LIVE=os.path.join(H,'../../../../../../v22/story/')
js=open(LIVE+'x2p_top.js').read();css=open(LIVE+'x2p_top.css').read();f4js=open(H+'/f4.js').read();f4css=open(H+'/f4.css').read()
def rep(s,a,b,n=1):
  assert s.count(a)==n,(a[:80],s.count(a));return s.replace(a,b)
# 1 the media list on line 1
l1=js.split('\n',1)[0]
assert l1.endswith(' */');js=rep(js,l1,l1[:-3]+' media/film4-rail-top.jpg media/film4-rail-bot.jpg media/film4-poster-blur.jpg media/film4-connector.jpg media/ez-landing-v4.webm */')
# 2 the old film beat -> film4
a=js.index('/* ---------- beat 3: the film on the board\'s own display ---------- */');b=js.index('/* ---------- mount ---------- */')
js=js[:a]+f4js+js[b:]
# 3 build(): no film head, no gutter before the film; the strip and the chapter connector
js=rep(js,"function build(){const wide=innerWidth>=1000,[fh,fs]=FILM[FH];","function build(){const wide=innerWidth>=1000;")
m=re.search(r"\n   \$\{beatGut\(\)\}\n   <div class=\"t4-b3\">.*?</div></div>`;",js,re.S);assert m,'b3'
js=js[:m.start()]+"\n   <div class=\"t4-b3 f4 f4-L${F4L}\" role=\"group\" aria-label=\"The whole game, the film\">${film4()}</div><div class=\"f4-cx\" aria-hidden=\"true\"></div>`;"+js[m.end():]
# 4 place(): fit the strip and the gaps after the gutters are drawn
js=rep(js,"requestAnimationFrame(()=>{root.querySelectorAll('.t5-bg').forEach(drawBeat);gutters(root)});","requestAnimationFrame(()=>{root.querySelectorAll('.t5-bg').forEach(drawBeat);gutters(root);f4fit()});")
# 5 wire(): the old play button and metadata handler -> f4wire()
m=re.search(r"\n  const v=sec\.querySelector\('\.t4-v'\),b=sec\.querySelector\('\.t4-play'\);.*?\}\)\}\}\n",js,re.S);assert m,'wire'
js=js[:m.start()]+"\n  f4wire()}\n"+js[m.end():]
assert 'FILM' not in js and 't4-play' not in js and 't4-v' not in js
open(H+'/x2p_top.js','w').write(js)
css=css.rstrip('\n')+'\n'+f4css
assert css.count('{')==css.count('}'),'braces'
open(H+'/x2p_top.css','w').write(css);print('ok',len(js),len(css))
